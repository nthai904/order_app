import React, { useEffect, useState } from 'react';
import { Grid, Typography, Box, TextField, CircularProgress, Alert } from '@mui/material';
import Menu from './components/Menu';
import SidebarFilter from './components/SidebarFilter';

import PageContainer from '../../../components/container/PageContainer';
import { getProductsData } from '../../../Api/API';

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const productsData = await getProductsData();
        setProducts(productsData);
        setFilteredProducts(productsData);
      } catch (err) {
        setError('Không thể tải danh sách sản phẩm');
        setProducts([]);
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter and sort products
  useEffect(() => {
    let filtered = products;
    if (selectedCategory) {
      filtered = filtered.filter(p => p.category?.name === selectedCategory);
    }
    filtered = filtered.filter(p => {
      const price = p.variants?.[0]?.sale_price || p.variants?.[0]?.price || 0;
      return price >= priceRange[0] && price <= priceRange[1];
    });
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.category && product.category.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (product.desc && product.desc.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    // Sort
    let sorted = [...filtered];
    if (sortBy === 'price-asc') {
      sorted.sort((a, b) => {
        const pa = a.variants?.[0]?.sale_price || a.variants?.[0]?.price || 0;
        const pb = b.variants?.[0]?.sale_price || b.variants?.[0]?.price || 0;
        return pa - pb;
      });
    } else if (sortBy === 'price-desc') {
      sorted.sort((a, b) => {
        const pa = a.variants?.[0]?.sale_price || a.variants?.[0]?.price || 0;
        const pb = b.variants?.[0]?.sale_price || b.variants?.[0]?.price || 0;
        return pb - pa;
      });
    } else if (sortBy === 'discounted') {
      sorted = filtered
        .filter(a => (a.variants?.[0]?.sale_price ?? a.variants?.[0]?.price) < (a.variants?.[0]?.price ?? 0))
        .sort((a, b) => {
          const da = ((a.variants?.[0]?.price ?? 0) - (a.variants?.[0]?.sale_price ?? a.variants?.[0]?.price ?? 0));
          const db = ((b.variants?.[0]?.price ?? 0) - (b.variants?.[0]?.sale_price ?? b.variants?.[0]?.price ?? 0));
          return db - da;
        });
    } 
    setFilteredProducts(sorted);
  }, [searchTerm, products, selectedCategory, priceRange, sortBy]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleResetFilter = () => {
    setSelectedCategory('');
    setPriceRange([0, 1000000]);
  };

  // Lấy danh sách danh mục duy nhất
  const categories = [...new Set(products.map(p => p.category?.name || 'Khác'))];

  if (loading) {
    return (
      <PageContainer title="Menu" description="Menu">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer title="Menu" description="Menu">
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </PageContainer>
    );
  }

  return (
    <PageContainer title="Menu" description="Menu">
      {/* <Box sx={{ px: { xs: 1, md: 2 }, py: 2 }}> */}
      <Grid container spacing={2} alignItems="stretch">
        {/* Sidebar Filter bên trái */}
        <Grid item xs={12} md={3} lg={2} alignItems="stretch" size={3}>
          <SidebarFilter
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            onReset={handleResetFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </Grid>

        {/* Danh sách sản phẩm bên phải */}
        <Grid item xs={12} md={9} lg={10} alignItems="stretch" size={9}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
            flexWrap="wrap"
            gap={2}
          >
            <Typography variant="h6" fontWeight="bold">Menu</Typography>
            <TextField
              placeholder="Tìm kiếm..."
              variant="outlined"
              size="small"
              sx={{ width: { xs: '100%', sm: '300px' } }}
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Box>

          <Grid container spacing={2}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item.id || index}>
                  <Menu {...item} />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography textAlign="center" color="text.secondary">
                  {searchTerm || selectedCategory || priceRange[0] !== 0 || priceRange[1] !== 1000000
                    ? 'Không tìm thấy sản phẩm phù hợp'
                    : 'Không có sản phẩm nào'}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>

      {/* </Box> */}
    </PageContainer>
  );

};

export default Homepage;
