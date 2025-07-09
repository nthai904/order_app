import React from 'react';
import {
    Typography, Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
    Button,
    IconButton,
    Alert,
    Snackbar,
    Avatar,
    Checkbox,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import {
    Add as AddIcon,
    DeleteSweep as DeleteAllIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import DashboardCard from '../../../../components/shared/DashboardCard';
import { getProducts, deleteProduct } from '../../../../Api/API';
import { IconTrash, IconEdit, IconInfoCircle } from '@tabler/icons-react';

const ProductPerformance = () => {
    const navigate = useNavigate();
    const [products, setProducts] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [snackbar, setSnackbar] = React.useState({ open: false, message: '', severity: 'success' });
    const [selectedProducts, setSelectedProducts] = React.useState([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

    const loadProducts = async () => {
        setLoading(true);
        try {
            const response = await getProducts();
            // Sort
            const sortedProducts = (response.data || []).sort((a, b) => b.id - a.id);
            setProducts(sortedProducts);
        } catch (error) {
            console.error('Error loading products:', error);
            setSnackbar({ open: true, message: 'Lỗi khi tải danh sách sản phẩm', severity: 'error' });
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        loadProducts();
    }, []);

    const handleDelete = async (productId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
            try {
                await deleteProduct(productId);
                setSnackbar({ open: true, message: 'Xóa sản phẩm thành công', severity: 'success' });
                loadProducts();
            } catch (error) {
                console.error('Error deleting product:', error);
                setSnackbar({ open: true, message: 'Lỗi khi xóa sản phẩm', severity: 'error' });
            }
        }
    };

    const handleSelectProduct = (productId) => {
        setSelectedProducts(prev => {
            if (prev.includes(productId)) {
                return prev.filter(id => id !== productId);
            } else {
                return [...prev, productId];
            }
        });
    };

    const handleSelectAll = () => {
        if (selectedProducts.length === products.length) {
            setSelectedProducts([]);
        } else {
            setSelectedProducts(products.map(product => product.id));
        }
    };

    const handleDeleteSelected = async () => {
        try {
            const deletePromises = selectedProducts.map(productId => deleteProduct(productId));
            await Promise.all(deletePromises);
            setSnackbar({
                open: true,
                message: `Đã xóa thành công ${selectedProducts.length} sản phẩm`,
                severity: 'success'
            });
            setSelectedProducts([]);
            setDeleteDialogOpen(false);
            loadProducts();
        } catch (error) {
            console.error('Error deleting selected products:', error);
            setSnackbar({ open: true, message: 'Lỗi khi xóa sản phẩm đã chọn', severity: 'error' });
        }
    };


    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const handleViewDetail = (productId) => {
        navigate(`/product/detail/${productId}`);
    };

    const handleEdit = (productId) => {
        navigate(`/product/edit/${productId}`);
    };

    const handleAddNew = () => {
        navigate('/product/add');
    };

    return (
        <>
            <DashboardCard title="Danh sách sản phẩm">
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mb: 2 }}>
                    {/* <Typography variant="body2" color="textSecondary">
                        Tổng cộng: {products.length} sản phẩm
                    </Typography> */}
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        {selectedProducts.length > 0 && (
                            <Button
                                variant="outlined"
                                color="error"
                                startIcon={<DeleteAllIcon />}
                                onClick={() => setDeleteDialogOpen(true)}
                            >
                                Xóa đã chọn ({selectedProducts.length})
                            </Button>
                        )}
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={handleAddNew}
                            sx={{ backgroundColor: 'primary.main' }}
                        >
                            Thêm sản phẩm
                        </Button>
                    </Box>
                </Box>

                <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                    <Table
                        aria-label="products table"
                        sx={{
                            whiteSpace: "nowrap",
                            mt: 2
                        }}
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={selectedProducts.length === products.length && products.length > 0}
                                        indeterminate={selectedProducts.length > 0 && selectedProducts.length < products.length}
                                        onChange={handleSelectAll}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        ID
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        Hình ảnh
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        Tên sản phẩm
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        Danh mục
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        Mô tả
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
                                    <TableCell colSpan={8} align="center">
                                        <Typography>Đang tải...</Typography>
                                    </TableCell>
                                </TableRow>
                            ) : products.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={8} align="center">
                                        <Typography color="textSecondary">
                                            Không có sản phẩm nào
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                products.map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={selectedProducts.includes(product.id)}
                                                onChange={() => handleSelectProduct(product.id)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                sx={{
                                                    fontSize: "15px",
                                                    fontWeight: "500",
                                                }}
                                            >
                                                {product.id}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Avatar
                                                src={product.image_base64}
                                                alt={product.name}
                                                sx={{ width: 60, height: 60 }}
                                                variant="rounded"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                {product.name}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                sx={{
                                                    px: "4px",
                                                    backgroundColor: 'primary.main',
                                                    color: "#fff",
                                                }}
                                                size="small"
                                                label={product.category?.name || 'Không có danh mục'}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                variant="body2"
                                                color="textSecondary"
                                                sx={{
                                                    maxWidth: 200,
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                {product.desc || 'Không có mô tả'}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <IconButton
                                                color="info"
                                                onClick={() => handleViewDetail(product.id)}
                                                size="small"
                                                title="Xem chi tiết"
                                            >
                                                <IconInfoCircle />
                                            </IconButton>
                                            <IconButton
                                                color="primary"
                                                onClick={() => handleEdit(product.id)}
                                                size="small"
                                                title="Chỉnh sửa"
                                            >
                                                <IconEdit />
                                            </IconButton>
                                            <IconButton
                                                color="error"
                                                onClick={() => handleDelete(product.id)}
                                                size="small"
                                                title="Xóa"
                                            >
                                                <IconTrash />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </Box>
            </DashboardCard>

            {/* Delete Selected Products Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>
                    Xác nhận xóa sản phẩm đã chọn
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        Bạn có chắc chắn muốn xóa {selectedProducts.length} sản phẩm đã chọn?
                        Hành động này không thể hoàn tác.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>
                        Hủy
                    </Button>
                    <Button
                        onClick={handleDeleteSelected}
                        variant="contained"
                        color="error"
                    >
                        Xóa đã chọn
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar for notifications */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    );
};

export default ProductPerformance;
