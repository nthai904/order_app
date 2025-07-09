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
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    IconButton,
    Alert,
    Snackbar,
    Pagination,
    InputAdornment
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import DashboardCard from '../../../../components/shared/DashboardCard';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../../../../Api/API';

const CategoryProduct = () => {
    const [categories, setCategories] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [editingCategory, setEditingCategory] = React.useState(null);
    const [formData, setFormData] = React.useState({ name: '', desc: '' });
    const [snackbar, setSnackbar] = React.useState({ open: false, message: '', severity: 'success' });
    const [searchTerm, setSearchTerm] = React.useState('');
    const [currentPage, setCurrentPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(1);
    const [totalCategories, setTotalCategories] = React.useState(0);

    const loadCategories = async (page = 1, search = '') => {
        setLoading(true);
        try {
            const response = await getCategories();
            // Sort
            const sortedCategories = (response.data || []).sort((a, b) => b.id - a.id);
            setCategories(sortedCategories);
            setCurrentPage(response.currentPage || 1);
            setTotalPages(response.totalPages || 1);
            setTotalCategories(response.totalCategory || 0);
        } catch (error) {
            console.error('Error loading categories:', error);
            setSnackbar({ open: true, message: 'Lỗi khi tải danh sách danh mục', severity: 'error' });
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        loadCategories(currentPage, searchTerm);
    }, [currentPage, searchTerm]);

    const handleOpenDialog = (category = null) => {
        if (category) {
            setEditingCategory(category);
            setFormData({ name: category.name, desc: category.desc });
        } else {
            setEditingCategory(null);
            setFormData({ name: '', desc: '' });
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditingCategory(null);
        setFormData({ name: '', desc: '' });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            if (editingCategory) {
                await updateCategory(editingCategory.id, formData);
                setSnackbar({ open: true, message: 'Cập nhật danh mục thành công', severity: 'success' });
            } else {
                await createCategory(formData);
                setSnackbar({ open: true, message: 'Thêm danh mục thành công', severity: 'success' });
            }
            handleCloseDialog();
            loadCategories(currentPage, searchTerm);
        } catch (error) {
            console.error('Error saving category:', error);
            setSnackbar({ open: true, message: 'Lỗi khi lưu danh mục', severity: 'error' });
        }
    };

    const handleDelete = async (categoryId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa danh mục này?')) {
            try {
                await deleteCategory(categoryId);
                setSnackbar({ open: true, message: 'Xóa danh mục thành công', severity: 'success' });
                loadCategories(currentPage, searchTerm);
            } catch (error) {
                console.error('Error deleting category:', error);
                setSnackbar({ open: true, message: 'Lỗi khi xóa danh mục', severity: 'error' });
            }
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };


    return (
        <>
            <DashboardCard title="Danh sách danh mục sản phẩm">
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mb: 2 }}>
                    {/* <TextField
                        placeholder="Tìm kiếm danh mục..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        size="small"
                        sx={{ width: 300 }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    /> */}
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => handleOpenDialog()}
                        sx={{ backgroundColor: 'primary.main' }}
                    >
                        Thêm danh mục
                    </Button>
                </Box>

                <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                    <Table
                        aria-label="categories table"
                        sx={{
                            whiteSpace: "nowrap",
                            mt: 2
                        }}
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        ID
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        Tên danh mục
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
                                    <TableCell colSpan={4} align="center">
                                        <Typography>Đang tải...</Typography>
                                    </TableCell>
                                </TableRow>
                            ) : categories.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} align="center">
                                        <Typography color="textSecondary">
                                            Không có danh mục nào
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                categories.map((category) => (
                                    <TableRow key={category.id}>
                                        <TableCell>
                                            <Typography
                                                sx={{
                                                    fontSize: "15px",
                                                    fontWeight: "500",
                                                }}
                                            >
                                                {category.id}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                {category.name}
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
                                                label={category.desc || 'Không có mô tả'}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <IconButton
                                                color="primary"
                                                onClick={() => handleOpenDialog(category)}
                                                size="small"
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                color="error"
                                                onClick={() => handleDelete(category.id)}
                                                size="small"
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


                {totalPages > 1 && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={handlePageChange}
                            color="primary"
                            showFirstButton
                            showLastButton
                        />
                    </Box>
                )}


                <Box sx={{ mt: 2, textAlign: 'center' }}>

                </Box>
            </DashboardCard>


            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {editingCategory ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 2 }}>
                        <TextField
                            fullWidth
                            label="Tên danh mục"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            margin="normal"
                            required
                        />
                        <TextField
                            fullWidth
                            label="Mô tả"
                            name="desc"
                            value={formData.desc}
                            onChange={handleInputChange}
                            margin="normal"
                            multiline
                            rows={3}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Hủy</Button>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        disabled={!formData.name.trim()}
                    >
                        {editingCategory ? 'Cập nhật' : 'Thêm'}
                    </Button>
                </DialogActions>
            </Dialog>


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

export default CategoryProduct;
