import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
    Typography
} from '@mui/material';

const CustomerInfoForm = ({ open, onClose, onSubmit, initialData = {} }) => {
    const [formData, setFormData] = useState({
        customer_name: initialData.customer_name || '',
        customer_phone: initialData.customer_phone || '',
        customer_address: initialData.customer_address || ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (field) => (event) => {
        setFormData({
            ...formData,
            [field]: event.target.value
        });
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors({
                ...errors,
                [field]: ''
            });
        }
    };

    const handleSubmit = () => {
        // Không cần validate, luôn submit
        onSubmit({
            customer_name: formData.customer_name || '',
            customer_phone: formData.customer_phone || '',
            customer_address: formData.customer_address || ''
        });
        onClose();
    };

    const handleClose = () => {
        setFormData({
            customer_name: '',
            customer_phone: '',
            customer_address: ''
        });
        setErrors({});
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                <Typography variant="h6">Thông tin khách hàng</Typography>
            </DialogTitle>
            <DialogContent>
                <Box sx={{ pt: 1 }}>
                    <TextField
                        fullWidth
                        label="Tên khách hàng"
                        value={formData.customer_name}
                        onChange={handleChange('customer_name')}
                        error={!!errors.customer_name}
                        helperText={errors.customer_name}
                        margin="normal"

                        sx={{
                            '& .MuiInputBase-root': {
                                borderRadius: '10px'
                            }
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Số điện thoại"
                        value={formData.customer_phone}
                        onChange={handleChange('customer_phone')}
                        error={!!errors.customer_phone}
                        helperText={errors.customer_phone}
                        margin="normal"

                        sx={{
                            '& .MuiInputBase-root': {
                                borderRadius: '10px'
                            }
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Địa chỉ"
                        value={formData.customer_address}
                        onChange={handleChange('customer_address')}
                        error={!!errors.customer_address}
                        helperText={errors.customer_address}
                        margin="normal"
                        multiline
                        rows={3}

                        sx={{
                            '& .MuiInputBase-root': {
                                borderRadius: '10px'
                            }
                        }}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="inherit">
                    Hủy
                </Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    Xác nhận
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CustomerInfoForm; 