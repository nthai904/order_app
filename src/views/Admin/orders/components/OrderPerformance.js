import React from 'react';
import {
    Typography, Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip, Select, MenuItem, Button, IconButton,
    Dialog, DialogTitle, DialogContent, DialogActions,
    Alert, Snackbar, Pagination
} from '@mui/material';
import {
    Info as InfoIcon,
    Delete as DeleteIcon
} from '@mui/icons-material';
import DashboardCard from '../../../../components/shared/DashboardCard';
import CustomerInfoForm from '../../../../components/pay/CustomerInfoForm';
import OrderDetail from './OrderDetail';
import { getOrders, deleteOrder, getOrderById, createOrder, updateOrderStatus } from '../../../../Api/API';

const OrderPerformance = () => {
    const [orders, setOrders] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [selectedOrder, setSelectedOrder] = React.useState(null);
    const [detailDialogOpen, setDetailDialogOpen] = React.useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
    const [orderToDelete, setOrderToDelete] = React.useState(null);
    const [statusDialogOpen, setStatusDialogOpen] = React.useState(false);
    const [orderToUpdate, setOrderToUpdate] = React.useState(null);
    const [newStatus, setNewStatus] = React.useState('');
    const [customerFormOpen, setCustomerFormOpen] = React.useState(false);
    const [snackbar, setSnackbar] = React.useState({ open: false, message: '', severity: 'success' });
    const [currentPage, setCurrentPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(1);
    const [totalOrders, setTotalOrders] = React.useState(0);
    const [allOrders, setAllOrders] = React.useState([]);

    const loadOrders = () => {
        setLoading(true);
        getOrders()
            .then((res) => {
                console.log("Orders API response:", res);
                const allOrdersData = res.data || [];
                setAllOrders(allOrdersData);
                setTotalOrders(allOrdersData.length);

                // Tính toán phân trang
                const itemsPerPage = 10;
                const totalPagesCount = Math.ceil(allOrdersData.length / itemsPerPage);
                setTotalPages(totalPagesCount);

                // Lấy dữ liệu cho trang hiện tại
                const startIndex = (currentPage - 1) * itemsPerPage;
                const endIndex = startIndex + itemsPerPage;
                const currentOrders = allOrdersData.slice(startIndex, endIndex);
                setOrders(currentOrders);
            })
            .catch((err) => {
                console.error("Error loading orders:", err);
                setOrders([]);
                setAllOrders([]);
                setTotalOrders(0);
                setTotalPages(1);
                showSnackbar('Lỗi khi tải danh sách đơn hàng', 'error');
            })
            .finally(() => setLoading(false));
    };

    React.useEffect(() => {
        loadOrders();
    }, [currentPage]);

    
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleViewDetails = async (orderId) => {
        try {
            const response = await getOrderById(orderId);
            setSelectedOrder(response.data);
            setDetailDialogOpen(true);
        } catch (error) {
            console.error("Error fetching order details:", error);
            showSnackbar('Lỗi khi tải chi tiết đơn hàng', 'error');
        }
    };

    const handleDeleteOrder = (order) => {
        setOrderToDelete(order);
        setDeleteDialogOpen(true);
    };


    const confirmDeleteOrder = async () => {
        try {
            await deleteOrder(orderToDelete.id);
            showSnackbar('Xóa đơn hàng thành công', 'success');
            loadOrders(); // Reload orders
        } catch (error) {
            console.error("Error deleting order:", error);
            showSnackbar('Lỗi khi xóa đơn hàng', 'error');
        } finally {
            setDeleteDialogOpen(false);
            setOrderToDelete(null);
        }
    };

    const confirmUpdateStatus = async () => {
        try {
            await updateOrderStatus(orderToUpdate.id, newStatus);
            showSnackbar('Cập nhật trạng thái đơn hàng thành công', 'success');
            loadOrders(); // Reload orders
        } catch (error) {
            console.error("Error updating order status:", error);
            showSnackbar('Lỗi khi cập nhật trạng thái đơn hàng', 'error');
        } finally {
            setStatusDialogOpen(false);
            setOrderToUpdate(null);
            setNewStatus('');
        }
    };

    
    const handleQuickUpdateStatus = async (order) => {
        let nextStatus = '';
        if (order.status === 'pending') nextStatus = 'processing';
        else if (order.status === 'processing') nextStatus = 'completed';
        else return;
        try {
            await updateOrderStatus(order.id, nextStatus);
            showSnackbar('Cập nhật trạng thái đơn hàng thành công', 'success');
            loadOrders();
        } catch (error) {
            console.error("Error updating order status:", error);
            showSnackbar('Lỗi khi cập nhật trạng thái đơn hàng', 'error');
        }
    };


    const handleCustomerInfoSubmit = (customerInfo) => {
        const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');

        // Create order data from cart
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

        createOrder(orderData)
            .then((response) => {
                if (response.ok) {
                    showSnackbar('Tạo đơn hàng từ giỏ hàng thành công', 'success');
                    localStorage.removeItem('cart'); // Clear cart
                    loadOrders(); // Reload orders
                } else {
                    showSnackbar('Lỗi khi tạo đơn hàng', 'error');
                }
            })
            .catch((error) => {
                console.error("Error creating order:", error);
                showSnackbar('Lỗi khi tạo đơn hàng', 'error');
            });
    };

    const showSnackbar = (message, severity = 'success') => {
        setSnackbar({ open: true, message, severity });
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'warning';
            case 'processing': return 'info';
            case 'completed': return 'success';
            default: return 'default';
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


    return (
        <>
            <DashboardCard title="Quản lý đơn hàng">
                <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                    <Table
                        aria-label="orders table"
                        sx={{
                            whiteSpace: "nowrap",
                            mt: 2
                        }}
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        Mã đơn hàng
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        Khách hàng
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        Tên món
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        Số lượng
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        Tổng tiền
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        Trạng thái
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        Cập nhật
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        Thao tác
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={7} align="center">
                                        <Typography>Đang tải...</Typography>
                                    </TableCell>
                                </TableRow>
                            ) : orders.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} align="center">
                                        <Typography color="textSecondary">
                                            Không có đơn hàng nào
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                orders.map((order) => (
                                    <TableRow key={order.id}>
                                        <TableCell>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                #{order.id}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle2">
                                                {order.customer_name}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2">
                                                {order.details.map((detail) => detail.product_name).join(', ')}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                {order.details.map((detail) => detail.quantity).join(', ')}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2"  fontWeight={600}>
                                                {parseFloat(order.total_price).toLocaleString()}đ
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={getStatusLabel(order.status)}
                                                color={getStatusColor(order.status)}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            
                                            {order.status === 'pending' && (
                                                <Button
                                                    variant="outlined"
                                                    color="info"
                                                    size="small"
                                                    onClick={() => handleQuickUpdateStatus(order)}
                                                >
                                                    Đang xử lý
                                                </Button>
                                            )}
                                            {order.status === 'processing' && (
                                                <Button
                                                    variant="outlined"
                                                    color="success"
                                                    size="small"
                                                    onClick={() => handleQuickUpdateStatus(order)}
                                                >
                                                    Hoàn thành
                                                </Button>
                                            )}
                                            
                                        </TableCell>
                                        <TableCell align="center">
                                            <IconButton
                                                color="info"
                                                size="small"
                                                onClick={() => handleViewDetails(order.id)}
                                                title="Xem chi tiết"
                                            >
                                                <InfoIcon />
                                            </IconButton>
                                            {/* <IconButton
                                                color="info"
                                                size="small"
                                                onClick={() => handleUpdateStatus(order)}
                                                title="Cập nhật trạng thái"
                                            >
                                                <EditIcon />
                                            </IconButton> */}
                                            <IconButton
                                                color="error"
                                                size="small"
                                                onClick={() => handleDeleteOrder(order)}
                                                title="Xóa đơn hàng"
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </Box>

                {/* Pagination */}
                {totalPages > 1 && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
                        <Typography variant="body2" color="textSecondary">
                            Hiển thị {orders.length}/{totalOrders} đơn hàng
                        </Typography>
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={handlePageChange}
                            color="primary"
                            showFirstButton
                            showLastButton
                            size="large"
                        />
                    </Box>
                )}
            </DashboardCard>

            {/* Order Details Dialog */}
            <OrderDetail
                open={detailDialogOpen}
                onClose={() => setDetailDialogOpen(false)}
                order={selectedOrder}
            />

            {/* Status Update Dialog */}
            <Dialog
                open={statusDialogOpen}
                onClose={() => setStatusDialogOpen(false)}
            >
                <DialogTitle>
                    Cập nhật trạng thái đơn hàng #{orderToUpdate?.id}
                </DialogTitle>
                <DialogContent>
                    <Typography variant="body1" gutterBottom>
                        Chọn trạng thái mới cho đơn hàng:
                    </Typography>
                    <Select
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        <MenuItem value="pending">Chờ thanh toán</MenuItem>
                        <MenuItem value="processing">Đang xử lý</MenuItem>
                        <MenuItem value="completed">Hoàn thành</MenuItem>
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setStatusDialogOpen(false)}>
                        Hủy
                    </Button>
                    <Button onClick={confirmUpdateStatus} color="primary" variant="contained">
                        Cập nhật
                    </Button>
                </DialogActions>
            </Dialog>


            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
            >
                <DialogTitle>
                    Xác nhận xóa đơn hàng
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        Bạn có chắc chắn muốn xóa đơn <strong>#{orderToDelete?.id}</strong>?
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                        Hành động này không thể hoàn tác.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>
                        Hủy
                    </Button>
                    <Button onClick={confirmDeleteOrder} color="error" variant="contained">
                        Xóa
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Customer Info Form */}
            <CustomerInfoForm
                open={customerFormOpen}
                onClose={() => setCustomerFormOpen(false)}
                onSubmit={handleCustomerInfoSubmit}
            />

            {/* Snackbar for notifications */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default OrderPerformance;
