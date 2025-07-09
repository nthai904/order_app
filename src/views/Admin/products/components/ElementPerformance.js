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
    Snackbar
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import DashboardCard from '../../../../components/shared/DashboardCard';
import { getAttributes, createAttribute, updateAttribute, deleteAttribute } from '../../../../Api/API';

const ElementPerformance = () => {
    const [attributes, setAttributes] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [editingAttribute, setEditingAttribute] = React.useState(null);
    const [formData, setFormData] = React.useState({ name: '', desc: '' });
    const [snackbar, setSnackbar] = React.useState({ open: false, message: '', severity: 'success' });

    const loadAttributes = async () => {
        setLoading(true);
        try {
            const response = await getAttributes();
            // Sort
            const sortedAttributes = (response.data || []).sort((a, b) => b.id - a.id);
            setAttributes(sortedAttributes);
        } catch (error) {
            console.error('Error loading attributes:', error);
            setSnackbar({ open: true, message: 'Lỗi khi tải danh sách thuộc tính', severity: 'error' });
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        loadAttributes();
    }, []);

    const handleOpenDialog = (attribute = null) => {
        if (attribute) {
            setEditingAttribute(attribute);
            setFormData({ name: attribute.name, desc: attribute.desc });
        } else {
            setEditingAttribute(null);
            setFormData({ name: '', desc: '' });
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditingAttribute(null);
        setFormData({ name: '', desc: '' });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            if (editingAttribute) {
                await updateAttribute(editingAttribute.id, formData);
                setSnackbar({ open: true, message: 'Cập nhật thuộc tính thành công', severity: 'success' });
            } else {
                await createAttribute(formData);
                setSnackbar({ open: true, message: 'Thêm thuộc tính thành công', severity: 'success' });
            }
            handleCloseDialog();
            loadAttributes();
        } catch (error) {
            console.error('Error saving attribute:', error);
            setSnackbar({ open: true, message: 'Lỗi khi lưu thuộc tính', severity: 'error' });
        }
    };

    const handleDelete = async (attributeId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa thuộc tính này?')) {
            try {
                await deleteAttribute(attributeId);
                setSnackbar({ open: true, message: 'Xóa thuộc tính thành công', severity: 'success' });
                loadAttributes();
            } catch (error) {
                console.error('Error deleting attribute:', error);
                setSnackbar({ open: true, message: 'Lỗi khi xóa thuộc tính', severity: 'error' });
            }
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <>
            <DashboardCard title="Danh sách thuộc tính sản phẩm">
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => handleOpenDialog()}
                        sx={{ backgroundColor: 'primary.main' }}
                    >
                        Thêm thuộc tính
                    </Button>
                </Box>

                <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                    <Table
                        aria-label="attributes table"
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
                                        Tên thuộc tính
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
                            ) : attributes.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} align="center">
                                        <Typography color="textSecondary">
                                            Không có thuộc tính nào
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                attributes.map((attribute) => (
                                    <TableRow key={attribute.id}>
                                        <TableCell>
                                            <Typography
                                                sx={{
                                                    fontSize: "15px",
                                                    fontWeight: "500",
                                                }}
                                            >
                                                {attribute.id}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle2" fontWeight={600}>
                                                {attribute.name}
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
                                                label={attribute.desc || 'Không có mô tả'}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <IconButton
                                                color="primary"
                                                onClick={() => handleOpenDialog(attribute)}
                                                size="small"
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                color="error"
                                                onClick={() => handleDelete(attribute.id)}
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
            </DashboardCard>

            {/* Dialog for Add/Edit Attribute */}
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {editingAttribute ? 'Chỉnh sửa thuộc tính' : 'Thêm thuộc tính mới'}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 2 }}>
                        <TextField
                            fullWidth
                            label="Tên thuộc tính"
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
                        {editingAttribute ? 'Cập nhật' : 'Thêm'}
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

export default ElementPerformance;
