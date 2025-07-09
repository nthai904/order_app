// src/views/User/cart/components/CartPerfomance.js
import React, { useState, useEffect } from 'react';
import {
    Button,
    Typography,
    Card,
    CardMedia,
    Box,
    Stack,
    IconButton,
    Grid,
    Divider,
    Alert
} from '@mui/material';
import {
    Add as AddIcon,
    Remove as RemoveIcon,
    Delete as DeleteIcon
} from '@mui/icons-material';
import BlankCard from '../../../../components/shared/BlankCard';
import Modal from '../../../../components/forms/modal/Modal';
import QR from '../../../../components/pay/QR';
import CustomerInfoForm from '../../../../components/pay/CustomerInfoForm';
import { createOrder } from '../../../../Api/API';

const CartPerfomance = ({ onCheckoutSuccess }) => {
    const [cartItems, setCartItems] = useState([]);
    const [showQRModal, setShowQRModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showCustomerForm, setShowCustomerForm] = useState(false);

    useEffect(() => {
        loadCartItems();
    }, []);

    const loadCartItems = () => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartItems(cart);
    };

    const updateCartItemQuantity = (index, newQuantity) => {
        if (newQuantity <= 0) {
            removeCartItem(index);
            return;
        }

        const updatedCart = [...cartItems];
        updatedCart[index].quantity = newQuantity;
        updatedCart[index].totalPrice = updatedCart[index].price * newQuantity;

        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const removeCartItem = (index) => {
        const updatedCart = cartItems.filter((_, i) => i !== index);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.totalPrice, 0);
    };

    const handleCheckout = () => {
        if (cartItems.length === 0) {
            alert('Giỏ hàng trống!');
            return;
        }
        setShowCustomerForm(true);
    };

    const handleCloseQRModal = () => {
        setShowQRModal(false);
        setShowConfirmModal(true);
    };

    const handleCustomerInfoSubmit = async (customerInfo) => {
        try {
            
            const orderData = {
                customer_name: customerInfo.customer_name,
                customer_phone: customerInfo.customer_phone,
                customer_address: customerInfo.customer_address,
                details: cartItems.map(item => ({
                    product_id: item.productId,
                    variant_id: item.variant_id,
                    product_name: item.productName,
                    variant_name: item.sizeName || null,
                    price: item.price,
                    quantity: item.quantity
                }))
            };

            const response = await createOrder(orderData);

            if (
                (response.ok && response.data) ||
                (response.data && (response.data.id || response.data.message?.includes('thành công')))
            ) {
                // Store the order ID in localStorage for tracking
                let orderId = null;
                if (response.data) {
                    if (response.data.id) {
                        orderId = response.data.id;
                    } else if (response.data.data && response.data.data.id) {
                        orderId = response.data.data.id;
                    }
                }
                if (orderId) {
                    // Lưu orderId
                    localStorage.setItem('userOrderId', orderId.toString());

                    // Lưu thông tin đường, đá, ghi chú vào localStorage
                    const orderDetails = cartItems.map(item => ({
                        product_id: item.productId,
                        product_name: item.productName,
                        sugar: item.sugar || null,
                        ice: item.ice || null,
                        notes: item.notes || null
                    }));

                    localStorage.setItem(`orderDetails_${orderId}`, JSON.stringify(orderDetails));
                }
                setShowQRModal(true);
            } else {
                alert('Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại.');
            }
        } catch (error) {
            console.error('Error creating order:', error);
            alert('Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại.');
        }
    };

    const handleConfirmPayment = async () => {
        setShowConfirmModal(false);

        // Clear cart
        localStorage.removeItem('cart');
        setCartItems([]);
        setShowSuccessModal(true);
        if (onCheckoutSuccess) {
            onCheckoutSuccess();
        }
    };

    const handleCloseSuccessModal = () => {
        setShowSuccessModal(false);
    };

    const getSugarLabel = (sugar) => {
        const sugarMap = {
            'no': 'Không đường',
            'less': 'Ít đường',
            'normal': 'Vừa',
            'more': 'Nhiều đường'
        };
        return sugarMap[sugar] || sugar;
    };

    const getIceLabel = (ice) => {
        const iceMap = {
            'no': 'Không đá',
            'less': 'Ít đá',
            'normal': 'Vừa',
            'more': 'Nhiều đá'
        };
        return iceMap[ice] || ice;
    };

    const toTitleCase = (str) => {
        if (!str) return '';
        return str.toLowerCase().split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    if (cartItems.length === 0) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '10vh',
                    width: '40vw',
                }}
            >
                <BlankCard>
                    <Box sx={{ textAlign: 'center', py: 4, minWidth: 180, maxWidth: 350, padding: 2 }}>
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                            Giỏ hàng trống
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Hãy thêm sản phẩm vào giỏ hàng để tiếp tục
                        </Typography>
                    </Box>
                </BlankCard>
            </Box>
        );
    }

    return (
        <>
            <BlankCard>
                <Box sx={{ p: 3 }}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        Giỏ hàng ({cartItems.length} sản phẩm)
                    </Typography>

                    <Stack spacing={2}>
                        {cartItems.map((item, index) => (
                            <Card key={index} sx={{ p: 2 }}>
                                <Grid container spacing={2} alignItems="center">
                                    {/* Product Image */}
                                    <Grid item xs={3} sm={2}>
                                        <Box
                                            sx={{
                                                width: 100,
                                                height: 100,
                                                overflow: 'hidden',
                                                borderRadius: 2,
                                                border: '1px solid #eee',
                                                boxShadow: 1,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                backgroundColor: '#fafafa',
                                            }}
                                        >
                                            <CardMedia
                                                component="img"
                                                image={item.productImage || 'https://via.placeholder.com/100x100?text=No+Image'}
                                                alt={item.productName}
                                                sx={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                }}
                                            />
                                        </Box>
                                    </Grid>

                                    {/* Product Info */}
                                    <Grid item xs={9} sm={4}>
                                        <Typography variant="subtitle1" fontWeight="bold" noWrap>
                                            {toTitleCase(item.productName)}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {item.sizeName} • {getSugarLabel(item.sugar)} • {getIceLabel(item.ice)}
                                        </Typography>
                                        {item.notes && (
                                            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                                                Ghi chú: {item.notes}
                                            </Typography>
                                        )}
                                    </Grid>


                                    {/* Quantity */}
                                    <Grid item xs={6} sm={2}>
                                        <Stack direction="row" alignItems="center" spacing={1}>
                                            <IconButton
                                                size="small"
                                                onClick={() => updateCartItemQuantity(index, item.quantity - 1)}
                                            >
                                                <RemoveIcon />
                                            </IconButton>
                                            <Typography variant="body2" sx={{ minWidth: 20, textAlign: 'center' }}>
                                                {item.quantity}
                                            </Typography>
                                            <IconButton
                                                size="small"
                                                onClick={() => updateCartItemQuantity(index, item.quantity + 1)}
                                            >
                                                <AddIcon />
                                            </IconButton>
                                        </Stack>
                                    </Grid>

                                    {/* Total Price */}
                                    <Grid item xs={6} sm={1}>
                                        <Typography variant="body2" color="text.secondary">
                                            Giá
                                        </Typography>
                                        <Typography variant="subtitle2" fontWeight="bold" color="primary">
                                            {item.totalPrice.toLocaleString()}đ
                                        </Typography>
                                    </Grid>

                                    {/* Delete Button */}
                                    <Grid item xs={6} sm={1}>
                                        <IconButton
                                            color="error"
                                            onClick={() => removeCartItem(index)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Card>
                        ))}
                    </Stack>

                    <Divider sx={{ my: 3 }} />

                    {/* Total Summary */}
                    <Box sx={{ textAlign: 'right', mb: 3 }}>
                        <Typography variant="h5" fontWeight="bold" color="primary">
                            Tổng cộng: {getTotalPrice().toLocaleString()}đ
                        </Typography>
                    </Box>

                    {/* Checkout Button */}
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                        onClick={handleCheckout}
                        sx={{ py: 1.5 }}
                    >
                        Thanh toán
                    </Button>
                </Box>
            </BlankCard>

            {/* Customer Info Form */}
            <CustomerInfoForm
                open={showCustomerForm}
                onClose={() => setShowCustomerForm(false)}
                onSubmit={handleCustomerInfoSubmit}
            />

            {/* QR Modal */}
            <Modal
                open={showQRModal}
                onClose={handleCloseQRModal}
                title="Quét mã QR để thanh toán"
                content={<QR amount={getTotalPrice()} />}
                showCloseButton={true}
            />

            {/* Confirmation Modal */}
            <Modal
                open={showConfirmModal}
                onClose={() => setShowConfirmModal(false)}
                title="Xác nhận thanh toán"
                content={
                    <Box>
                        <Typography variant="body1" gutterBottom>
                            Bạn đã hoàn thành việc thanh toán chưa?
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Tổng tiền: <strong>{getTotalPrice().toLocaleString()}đ</strong>
                        </Typography>
                    </Box>
                }
                actions={
                    <>
                        <Button onClick={() => setShowConfirmModal(false)} color="inherit">
                            Hủy
                        </Button>
                        <Button onClick={handleConfirmPayment} color="primary" variant="contained">
                            Đã thanh toán
                        </Button>
                    </>
                }
            />

            {/* Success Modal */}
            <Modal
                open={showSuccessModal}
                onClose={handleCloseSuccessModal}
                title="Thanh toán thành công!"
                content={
                    <Box>
                        <Alert severity="success" sx={{ mb: 2 }}>
                            Đơn hàng của bạn đã được xác nhận và đang được xử lý.
                        </Alert>
                        <Typography variant="body1">
                            Cảm ơn bạn đã mua hàng! Chúng tôi sẽ thông báo khi đơn hàng sẵn sàng.
                        </Typography>
                    </Box>
                }
                actions={
                    <Button onClick={handleCloseSuccessModal} color="primary" variant="contained">
                        Đóng
                    </Button>
                }
            />
        </>
    );
};

export default CartPerfomance;
