import React, { useState, useEffect, useCallback } from 'react';
import {
    Box,
    Typography,
    Stepper,
    Step,
    StepLabel,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Alert,
    CircularProgress,
    IconButton,
    Chip, Paper, Stack
} from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';
import { getOrderById } from '../../../../Api/API';

const steps = ['Chờ thanh toán', 'Đang xử lý', 'Đơn của bạn đã chuẩn bị xong!!!'];

const Orders = () => {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [paymentSuccessModal, setPaymentSuccessModal] = useState(false);
    const [pickupModal, setPickupModal] = useState(false);
    const [currentStatus, setCurrentStatus] = useState('pending');

    const loadUserOrder = useCallback(async () => {
        try {
            setLoading(true);
            const orderId = localStorage.getItem('userOrderId');
            if (!orderId) {
                setError('Không tìm thấy đơn hàng. Vui lòng tạo đơn hàng mới.');
                setLoading(false);
                return;
            }

            const response = await getOrderById(orderId);
            const orderData = response.data;

            const statusChanged = orderData.status !== currentStatus;
            setOrder(orderData);
            setCurrentStatus(orderData.status);

            if (statusChanged) {
                if (orderData.status === 'processing') {
                    const alreadyClosed = localStorage.getItem('paymentModalClosed');
                    if (!alreadyClosed) {
                        setPaymentSuccessModal(true);
                    }
                } else if (orderData.status === 'completed') {
                    setPaymentSuccessModal(false);
                    setPickupModal(true);
                }
            }
        } catch (err) {
            console.error('Error loading order:', err);
            setError('Không thể tải thông tin đơn hàng. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    }, [currentStatus]);

    useEffect(() => {
        loadUserOrder();
        const interval = setInterval(() => {
            loadUserOrder();
        }, 10000);

        return () => clearInterval(interval);
    }, [loadUserOrder]);

    const getActiveStep = () => {
        switch (currentStatus) {
            case 'pending': return 0;
            case 'processing': return 1;
            case 'completed': return 2;
            default: return 0;
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case 'pending': return 'Chờ thanh toán';
            case 'processing': return 'Đang xử lý';
            case 'completed': return 'Hoàn thành';
            default: return status;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'warning';
            case 'processing': return 'info';
            case 'completed': return 'success';
            default: return 'default';
        }
    };

    const handleClosePaymentModal = () => {
        setPaymentSuccessModal(false);
        localStorage.setItem('paymentModalClosed', 'true');
    };

    const handleClosePickupModal = () => {
        setPickupModal(false);
        localStorage.removeItem('userOrderId');
        localStorage.removeItem('paymentModalClosed');
        if (order?.id) {
            localStorage.removeItem(`orderDetails_${order.id}`);
        }
    };

    const toTitleCase = (str) => {
        if (!str) return '';
        return str.toLowerCase().split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 3, background: '#fff', borderRadius: 3 }}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    if (!order) {
        return (
            <Box sx={{ p: 3, background: '#fff', borderRadius: 3 }}>
                <Typography variant="h6" textAlign="center" color="textSecondary">
                    Không có đơn hàng nào
                </Typography>
            </Box>
        );
    }

    return (
        <>
            <Box sx={{ p: 3, background: '#fff', borderRadius: 3, width: "100%" }}>
                {/* Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Box>
                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                            Đơn hàng #{order.id}
                        </Typography>
                        <Chip
                            label={getStatusLabel(currentStatus)}
                            color={getStatusColor(currentStatus)}
                            size="medium"
                            sx={{ fontWeight: 'bold' }}
                        />
                    </Box>
                    <IconButton onClick={loadUserOrder} disabled={loading} title="Làm mới trạng thái">
                        <RefreshIcon />
                    </IconButton>
                </Box>

                {/* Stepper */}
                <Stepper activeStep={getActiveStep()} alternativeLabel sx={{ mb: 4 }}>
                    {steps.map((label, idx) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                {/* Product Table */}
                <Table sx={{ mb: 4 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Sản phẩm</b></TableCell>
                            <TableCell align="center"><b>Số lượng</b></TableCell>
                            <TableCell align="right"><b>Giá</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {order.details?.length > 0 ? (
                            order.details.map((detail, idx) => (
                                <TableRow key={idx}>
                                    <TableCell>
                                        <Typography fontWeight={500}>{toTitleCase(detail.product_name)}</Typography>
                                        {detail.variant_name && (
                                            <Typography variant="body2" color="textSecondary">
                                                {detail.variant_name}
                                            </Typography>
                                        )}
                                    </TableCell>
                                    <TableCell align="center">{detail.quantity}</TableCell>
                                    <TableCell align="right">{parseFloat((detail.price * detail.quantity) || 0).toLocaleString()}đ</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3} align="center">Không có sản phẩm trong đơn hàng</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                {/* Order Info */}
                <Paper elevation={1} sx={{ p: 3, borderRadius: 2, maxWidth: 700, mx: 'auto' }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Thông tin đơn hàng
                    </Typography>
                    <Stack spacing={1.5}>
                        <Typography><b>Tên khách hàng:</b> {order.customer_name}</Typography>
                        <Typography><b>Số điện thoại:</b> {order.customer_phone}</Typography>
                        <Typography><b>Địa chỉ:</b> {order.customer_address}</Typography>
                        <Box textAlign="right" mt={2}>
                            <Typography fontWeight="bold" fontSize="1.2rem">
                                Tổng tiền: {parseFloat(order.total_price).toLocaleString()}đ
                            </Typography>
                        </Box>
                    </Stack>
                </Paper>
            </Box>


            {/* Payment Success Modal */}
            <Dialog
                open={paymentSuccessModal}
                onClose={handleClosePaymentModal}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>
                    <Typography variant="h6" color="success.main" textAlign="center">
                        Thanh toán thành công!
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography variant="body1" textAlign="center" sx={{ mt: 2 }}>
                        Đơn hàng của bạn đang được chuẩn bị.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClosePaymentModal} color="primary" variant="contained">
                        Đóng
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Pickup Modal */}
            <Dialog
                open={pickupModal}
                onClose={handleClosePickupModal}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>
                    <Typography variant="h6" color="primary.main" textAlign="center">
                        Mời bạn đến quầy nhận đơn!!!
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography variant="body1" textAlign="center" sx={{ mt: 2 }}>
                        Đơn hàng của bạn đã chuẩn bị xong. Vui lòng đến quầy để nhận đơn.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClosePickupModal} color="primary" variant="contained">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Orders;
