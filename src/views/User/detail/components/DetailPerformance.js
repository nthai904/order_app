import React from 'react';

import {

    Card, CardMedia, CardContent, Typography, Stack, Box, Button,

    FormControl, InputLabel, Select, MenuItem, TextField, RadioGroup,

    FormControlLabel, Radio, IconButton, Grid

} from '@mui/material';

import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';

import CustomerInfoForm from '../../../../components/pay/CustomerInfoForm';
import Modal from '../../../../components/forms/modal/Modal';
import QR from '../../../../components/pay/QR';
import useCheckoutFlow from '../../../../components/pay/useCheckoutFlow';
import { useState } from 'react';

const DetailPerformance = ({

    product,

    selectedSizeId,

    setSelectedSizeId,

    sugar,

    setSugar,

    ice,

    setIce,

    quantity,

    setQuantity,

    notes,

    setNotes,

    handleSizeChange,

    handleQuantityChange,

    handleAddToCart,

    getSizeOptions,

    getSelectedVariantPrice,

    getSelectedVariantOriginalPrice,

    selectedVariantId

}) => {

    const currentPrice = getSelectedVariantPrice();

    const originalPrice = getSelectedVariantOriginalPrice();

    
    const [directOrderItems, setDirectOrderItems] = useState([]);
    const checkoutFlow = useCheckoutFlow({
        items: directOrderItems,
        onSuccess: () => {
            // Có thể reload hoặc callback nếu cần
        }
    });

    const handleDirectOrder = () => {
        if (!selectedSizeId || !selectedVariantId || !sugar || !ice) return;

        const item = {
            productId: product.id,
            variant_id: selectedVariantId,
            productName: product.name,
            variant_name: selectedSizeId,
            price: getSelectedVariantPrice(),
            quantity: quantity,
            sugar: sugar,
            ice: ice,
            notes: notes || null,
            productImage: product.image_base64 || '',
        };
        setDirectOrderItems([item]);
        checkoutFlow.setShowCustomerForm(true);
    };

    const sugarOptions = [

        { label: '0%', value: '0' },

        { label: '25%', value: '25%' },

        { label: '50%', value: '50%' },

        { label: '75%', value: '75%' },

        { label: '100%', value: '100%' },

    ];


    const iceOptions = [

        { label: 'Không đá', value: 'no' },

        { label: 'Ít đá', value: 'less' },

        { label: 'Vừa', value: 'normal' },

        { label: 'Nhiều đá', value: 'more' },

    ];

    const toTitleCase = (str) => {

        if (!str) return '';

        return str.toLowerCase().split(' ')

            .map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    };



    if (!product) return <Typography>Không tìm thấy sản phẩm</Typography>;

    return (

        <Card sx={{ borderRadius: 3, boxShadow: 3 }}>

            <Grid container>

                {/* Product Image */}

                <Grid item xs={12} md={6}>

                    <CardMedia

                        component="img"

                        image={product.image_base64 || 'https://via.placeholder.com/400x400?text=No+Image'}

                        alt={product.name}

                        sx={{

                            width: 400,

                            height: 400,

                            objectFit: 'contain',

                            p: 2

                        }}

                    />

                </Grid>

                {/* Product Info */}

                <Grid item xs={12} md={6}>

                    <CardContent sx={{ p: 3 }}>

                        <Typography variant="h4" fontWeight="bold" gutterBottom>

                            {toTitleCase(product.name)}

                        </Typography>

                        {product.desc && (

                            <Typography variant="body1" sx={{ mb: 3 }}>

                                {product.desc}

                            </Typography>

                        )}

                        {/* Price */}

                        <Box sx={{ mb: 3 }}>

                            <Stack direction="row" spacing={2} alignItems="center">

                                <Typography variant="h5" color="primary" fontWeight="bold">

                                    {currentPrice.toLocaleString()}đ

                                </Typography>

                                {originalPrice > currentPrice && (

                                    <Typography variant="h6" color="text.secondary" sx={{ textDecoration: 'line-through' }}>

                                        {originalPrice.toLocaleString()}đ

                                    </Typography>

                                )}

                            </Stack>

                        </Box>

                        {/* Size Selection */}

                        {product.variants && product.variants.length > 0 && (

                            <FormControl sx={{ mb: 3, width: '30%' }}>

                                <InputLabel>Size</InputLabel>

                                <Select

                                    value={selectedSizeId}

                                    label="Size"

                                    onChange={handleSizeChange}

                                >

                                    {getSizeOptions(product).map(size => (

                                        <MenuItem key={size.id} value={size.id}>

                                            <Typography variant="body1" fontWeight="bold">

                                                {size.value}

                                            </Typography>

                                        </MenuItem>

                                    ))}

                                </Select>

                            </FormControl>

                        )}


                        {/* Sugar Options */}

                        <Box sx={{ mb: 3 }}>

                            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }} required>

                                Đường

                            </Typography>

                            <RadioGroup

                                row

                                value={sugar}

                                onChange={(e) => setSugar(e.target.value)}

                                name="sugar-group"

                            >

                                {sugarOptions.map(opt => (

                                    <FormControlLabel

                                        key={opt.value}

                                        value={opt.value}

                                        control={<Radio />}

                                        label={opt.label}

                                    />

                                ))}

                            </RadioGroup>

                        </Box>


                        {/* Ice Options */}

                        <Box sx={{ mb: 3 }}>

                            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>

                                Đá

                            </Typography>

                            <RadioGroup

                                row

                                value={ice}

                                onChange={(e) => setIce(e.target.value)}

                                name="ice-group"

                            >

                                {iceOptions.map(opt => (

                                    <FormControlLabel

                                        key={opt.value}

                                        value={opt.value}

                                        control={<Radio />}

                                        label={opt.label}

                                    />

                                ))}

                            </RadioGroup>

                        </Box>



                        {/* Quantity */}

                        <Box sx={{ mb: 3 }}>

                            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>

                                Số lượng

                            </Typography>

                            <Stack direction="row" alignItems="center" spacing={2}>

                                <IconButton

                                    onClick={() => handleQuantityChange('decrease')}

                                    disabled={quantity <= 1}

                                >

                                    <RemoveIcon />

                                </IconButton>

                                <Typography variant="h6" sx={{ minWidth: 40, textAlign: 'center' }}>

                                    {quantity}

                                </Typography>

                                <IconButton onClick={() => handleQuantityChange('increase')}>

                                    <AddIcon />

                                </IconButton>

                            </Stack>

                        </Box>



                        {/* Notes */}

                        <TextField

                            fullWidth

                            label="Ghi chú"

                            multiline

                            rows={3}

                            value={notes}

                            onChange={(e) => setNotes(e.target.value)}

                            placeholder="Ghi chú cho đơn hàng..."

                            sx={{ mb: 3 }}

                        />



                        {/* Total Price */}

                        <Box sx={{ mb: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>

                            <Typography variant="h6" fontWeight="bold" textAlign="right">

                                Tổng tiền: {(currentPrice * quantity).toLocaleString()}đ

                            </Typography>

                        </Box>


                        <Stack direction="row" spacing={2} sx={{ mb: 1 }}>

                            <Button

                                variant="contained"

                                size="small"

                                sx={{ py: 1.5, flex: 1 }}

                                disabled={!selectedSizeId || !selectedVariantId || !sugar || !ice}

                                onClick={handleAddToCart}

                            >

                                Thêm vào giỏ hàng

                            </Button>

                            <Button

                                variant="contained"
                                size="small"
                                sx={{ py: 1.5, flex: 1 }}
                                onClick={handleDirectOrder}
                                disabled={!selectedSizeId || !selectedVariantId || !sugar || !ice}
                            >
                                Thanh toán

                            </Button>

                        </Stack>

                    </CardContent>

                </Grid>

            </Grid>

            {/* Customer Info Form cho đặt hàng trực tiếp */}
            <CustomerInfoForm
                open={checkoutFlow.showCustomerForm}
                onClose={() => checkoutFlow.setShowCustomerForm(false)}
                onSubmit={checkoutFlow.handleCustomerInfoSubmit}
            />
            {/* QR Modal */}
            <Modal
                open={checkoutFlow.showQR}
                onClose={checkoutFlow.handleConfirmPayment}
                title="Quét mã QR để thanh toán"
                content={<QR amount={getSelectedVariantPrice() * quantity} />}
                showCloseButton={true}
            />
            {/* Success Modal */}
            <Modal
                open={checkoutFlow.showSuccess}
                onClose={checkoutFlow.handleCloseSuccessModal}
                title="Thanh toán thành công!"
                content={
                    <Box>
                        <Typography variant="body1">
                            Cảm ơn bạn đã mua hàng! Đơn hàng của bạn đã được xác nhận và đang được xử lý.
                        </Typography>
                    </Box>
                }
                actions={
                    <Button onClick={checkoutFlow.handleCloseSuccessModal} color="primary" variant="contained">
                        Đóng
                    </Button>
                }
            />
        </Card>

    );

};



export default DetailPerformance;

