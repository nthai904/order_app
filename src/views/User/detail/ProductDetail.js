import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Alert,
  CircularProgress
} from '@mui/material';
import PageContainer from '../../../components/container/PageContainer';
import DetailPerformance from './components/DetailPerformance';
import { getProductDetail } from '../../../Api/API';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form states
  const [quantity, setQuantity] = useState(1);
  const [selectedSizeId, setSelectedSizeId] = useState('');
  const [selectedVariantId, setSelectedVariantId] = useState('');
  const [sugar, setSugar] = useState('');
  const [ice, setIce] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await getProductDetail(id);
        console.log('Product detail response:', response);
        setProduct(response.data);

        // Set default size if variants exist
        if (response.data.variants && response.data.variants.length > 0) {
          const firstSizeAttr = response.data.variants[0].variant_attributes?.find(attr =>
            attr.attribute_value?.attribute?.name?.toLowerCase() === 'size'
          );
          if (firstSizeAttr) {
            setSelectedSizeId(firstSizeAttr.attribute_value.id);
            setSelectedVariantId(response.data.variants[0].id);
          }
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Không thể tải thông tin sản phẩm');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product?.variants && product.variants.length > 0) {
      const firstSizeAttr = product.variants[0].variant_attributes?.find(attr =>
        (attr.attribute_value?.attribute?.name || '').toLowerCase().includes('size')
      );
      if (firstSizeAttr) {
        setSelectedSizeId(firstSizeAttr.attribute_value.id);
        // Tìm variant đầu tiên có size này
        const matchedVariant = product.variants.find(variant =>
          variant.variant_attributes?.some(attr =>
            (attr.attribute_value?.attribute?.name || '').toLowerCase().includes('size') &&
            attr.attribute_value?.id === firstSizeAttr.attribute_value.id
          )
        );
        if (matchedVariant) setSelectedVariantId(matchedVariant.id);
      }
    }
  }, [product]);

  const handleQuantityChange = (type) => {
    if (type === 'increase') {
      setQuantity(prev => prev + 1);
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleSizeChange = (e) => {
    const sizeId = e.target.value;
    setSelectedSizeId(sizeId);

    // Tìm variant có size này
    const matchedVariant = product.variants.find(variant =>
      variant.variant_attributes?.some(attr =>
        (attr.attribute_value?.attribute?.name || '').toLowerCase().includes('size') &&
        attr.attribute_value?.id === sizeId
      )
    );
    if (matchedVariant) {
      setSelectedVariantId(matchedVariant.id);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSizeId || !selectedVariantId || !sugar || !ice) {
      alert('Vui lòng chọn đầy đủ thông tin!');
      return;
    }
    const variant = getSelectedVariant();
    if (!variant) {
      alert('Không tìm thấy biến thể phù hợp!');
      return;
    }

    // Construct variant name from all attribute values
    const sizeName = constructVariantName(variant);

    const cartItem = {
      productId: product.id,
      productName: product.name,
      productImage: product.image_base64,
      quantity,
      notes,
      price: getSelectedVariantPrice(),
      totalPrice: getSelectedVariantPrice() * quantity,
      variant_id: selectedVariantId,
      sizeName, // Add the constructed sizeName
      sugar,
      ice,
    };

    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');

    // Check if item already exists with same options
    const existingItemIndex = existingCart.findIndex(item =>
      item.productId === cartItem.productId &&
      item.sizeId === cartItem.sizeId &&
      item.sugar === cartItem.sugar &&
      item.ice === cartItem.ice
    );

    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      existingCart[existingItemIndex].quantity += cartItem.quantity;
      existingCart[existingItemIndex].totalPrice = existingCart[existingItemIndex].price * existingCart[existingItemIndex].quantity;
    } else {
      // Add new item
      existingCart.push(cartItem);
    }

    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(existingCart));
    alert('Đã thêm vào giỏ hàng!');
  };

  const getSelectedVariant = () => {
    return product.variants.find(variant => variant.id === selectedVariantId);
  };

  const getSelectedVariantPrice = () => {
    const variant = getSelectedVariant();
    return variant ? (variant.sale_price || variant.price) : 0;
  };

  const getSelectedVariantOriginalPrice = () => {
    const variant = getSelectedVariant();
    return variant ? variant.price : 0;
  };

  const constructVariantName = (variant) => {
    if (!variant || !variant.variant_attributes) return null;

    const variantAttributes = variant.variant_attributes;
    const attributeNames = variantAttributes.map(attr =>
      attr.attribute_value?.value || ''
    ).filter(Boolean);

    return attributeNames.length > 0 ? attributeNames.join(' - ') : null;
  };

  const getSizeOptions = (product) => {
    if (!product?.variants) return [];
    const sizes = product.variants
      .map(variant => {
        const sizeAttr = variant.variant_attributes?.find(attr =>
          (attr.attribute_value?.attribute?.name || '').toLowerCase().includes('size')
        );
        return sizeAttr?.attribute_value;
      })
      .filter(Boolean);

    // Lọc trùng theo id
    const uniqueSizes = [];
    const seen = new Set();
    for (const size of sizes) {
      if (!seen.has(size.id)) {
        uniqueSizes.push(size);
        seen.add(size.id);
      }
    }
    return uniqueSizes;
  };

  if (loading) {
    return (
      <PageContainer title='Chi tiết sản phẩm' description='Trang chi tiết sản phẩm'>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      </PageContainer>
    );
  }

  if (error || !product) {
    return (
      <PageContainer title='Chi tiết sản phẩm' description='Trang chi tiết sản phẩm'>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error || 'Không tìm thấy sản phẩm'}
        </Alert>
      </PageContainer>
    );
  }

  return (
    <PageContainer title={product.name} description='Trang chi tiết sản phẩm'>
      <Box maxWidth="lg" mx="auto">
        <DetailPerformance
          product={product}
          selectedSizeId={selectedSizeId}
          setSelectedSizeId={setSelectedSizeId}
          sugar={sugar}
          setSugar={setSugar}
          ice={ice}
          setIce={setIce}
          quantity={quantity}
          setQuantity={setQuantity}
          notes={notes}
          setNotes={setNotes}
          handleSizeChange={handleSizeChange}
          handleQuantityChange={handleQuantityChange}
          handleAddToCart={handleAddToCart}
          getSizeOptions={getSizeOptions}
          getSelectedVariantPrice={getSelectedVariantPrice}
          getSelectedVariantOriginalPrice={getSelectedVariantOriginalPrice}
          selectedVariantId={selectedVariantId}
        />
      </Box>
    </PageContainer>
  );
};

export default ProductDetail;
