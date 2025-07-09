import React, { useState, useEffect, useRef } from 'react';
import {
    Typography, Box, Dialog, DialogTitle, DialogContent, DialogActions,
    Button, Chip, Stack, Paper, Divider, Grid
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
// import ReactToPrint from 'react-to-print';

const OrderDetail = ({ open, onClose, order }) => {
    const [localOrderDetails, setLocalOrderDetails] = useState([]);
    // const printRef = useRef();

    useEffect(() => {
        if (order?.id) {
            const storedDetails = localStorage.getItem(`orderDetails_${order.id}`);
            try {
                setLocalOrderDetails(storedDetails ? JSON.parse(storedDetails) : []);
            } catch (err) {
                console.error('Lỗi đọc chi tiết đơn hàng:', err);
                setLocalOrderDetails([]);
            }
        }
    }, [order]);

    const getStatusColor = (status) => ({
        pending: 'warning',
        processing: 'info',
        completed: 'success',
    }[status] || 'default');

    const getStatusLabel = (status) => ({
        pending: 'Chờ thanh toán',
        processing: 'Đang xử lý',
        completed: 'Hoàn thành',
    }[status] || status);

    const getSugarLabel = (sugar) => ({
        no: 'Không đường', less: 'Ít đường', normal: 'Vừa', more: 'Nhiều đường'
    }[sugar] || sugar);

    const getIceLabel = (ice) => ({
        no: 'Không đá', less: 'Ít đá', normal: 'Vừa', more: 'Nhiều đá'
    }[ice] || ice);

    const formatDate = (dateString) => new Date(dateString).toLocaleString('vi-VN');

    const formatCurrency = (value) => parseFloat(value).toLocaleString('vi-VN') + 'đ';

    if (!order) return null;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            {/* <DialogTitle>📦 Chi tiết đơn #{order.id}</DialogTitle> */}

            {/* <DialogContent ref={printRef}> */}
            <DialogContent>
                {/* THÔNG TIN KHÁCH HÀNG */}
                <Paper elevation={0} sx={{ p: 2, backgroundColor: '#f9f9f9', borderRadius: 2, mb: 3 }}>
                    <Typography variant="h5" fontWeight={600} gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                        <PersonIcon sx={{ mr: 1 }} /> Thông tin khách hàng
                    </Typography>
                    <Stack spacing={1}>
                        <Typography><strong>Họ và tên:</strong> {order.customer_name}</Typography>
                        <Typography><strong>Số điện thoại:</strong> {order.customer_phone}</Typography>
                        <Typography><strong>Địa chỉ:</strong> {order.customer_address}</Typography>
                    </Stack>
                </Paper>

                {/* THÔNG TIN ĐƠN HÀNG */}
                <Paper elevation={0} sx={{ p: 2, borderRadius: 2, mb: 3 }}>
                    <Typography variant="h5" fontWeight={600} gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                        <ShoppingCartIcon sx={{ mr: 1 }} /> Thông tin đơn hàng
                    </Typography>
                    <Stack spacing={1}>
                        <Typography><strong>Mã đơn hàng:</strong> {order.id}</Typography>
                        <Typography>
                            <strong>Trạng thái:</strong>{' '}
                            <Chip label={getStatusLabel(order.status)} color={getStatusColor(order.status)} size="small" sx={{ ml: 1 }} />
                        </Typography>
                        <Typography><strong>Ngày tạo:</strong> {formatDate(order.created_at)}</Typography>
                    </Stack>
                </Paper>

                <Typography variant="h6" fontWeight={600} gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    🧾 Chi tiết đơn
                </Typography>

                <Divider sx={{ my: 1 }} />
                {order.details?.map((detail, index) => {
                    const localDetail = localOrderDetails.find(local =>
                        local.product_id === detail.product_id &&
                        local.product_name === detail.product_name
                    );

                    return (
                        <Box key={index} sx={{ py: 2 }}>
                            
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 0.5 }}>
                                <Typography fontWeight={600} sx={{ color: 'primary.main' }}>
                                    {detail.product_name}
                                </Typography>
                                <Typography fontWeight={600} sx={{ minWidth: 80, textAlign: 'right' }}>
                                    {formatCurrency(detail.total)}
                                </Typography>
                            </Box>

                            <Typography variant="body2" sx={{ mb: 0.3 }}>
                                Size: {detail.variant_name || null}
                            </Typography>

                            <Typography variant="body2" sx={{ mb: 0.3 }}>
                                Số lượng: {detail.quantity} x {formatCurrency(detail.price)}
                            </Typography>

                            {(localDetail?.sugar || localDetail?.ice) && (
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.3 }}>
                                    {localDetail.sugar && getSugarLabel(localDetail.sugar)}
                                    {localDetail.sugar && localDetail.ice && ' • '}
                                    {localDetail.ice && getIceLabel(localDetail.ice)}
                                </Typography>
                            )}

                            {localDetail?.notes && (
                                <Typography variant="body2" color="text.secondary" fontStyle="italic">
                                    Ghi chú: {localDetail.notes}
                                </Typography>
                            )}

                            {index < order.details.length - 1 && <Divider sx={{ my: 1 }} />}
                        </Box>
                    );
                })}


                <Box sx={{ textAlign: 'right', mt: 4 }}>
                    <Typography variant="h6" fontWeight={700} color="primary" sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <ReceiptLongIcon sx={{ mr: 1 }} />
                        Tổng cộng: {formatCurrency(order.total_price)}
                    </Typography>
                </Box>
            </DialogContent>

            <DialogActions>
                {/* Bật khi dùng in hóa đơn */}
                {/* 
                <ReactToPrint
                    trigger={() => (
                        <Button variant="outlined" color="secondary">
                            In hóa đơn
                        </Button>
                    )}
                    content={() => printRef.current}
                />
                */}
                <Button onClick={onClose} variant="contained">
                    Đóng
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default OrderDetail;
