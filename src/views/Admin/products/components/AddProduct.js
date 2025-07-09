import React, { useEffect, useState } from "react";
import {
    Box, TextField, Button, Typography, MenuItem,
    Stack, Card, CardContent, Grid, IconButton, Alert,
    CircularProgress, FormControl, InputLabel, Select, Avatar
} from "@mui/material";
import {
    Save as SaveIcon,
    Clear as ClearIcon,
    PhotoCamera as PhotoCameraIcon
} from "@mui/icons-material";
import { getCategoriesData, getAttributes, createProduct } from "../../../../Api/API";
import BlankCard from "../../../../components/shared/BlankCard";
import Variants from "./Variants";

const AddProduct = () => {
    const [form, setForm] = useState({
        name: "",
        desc: "",
        id_cat: ""
    });
    const [categories, setCategories] = useState([]);
    const [attributes, setAttributes] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [variants, setVariants] = useState([
        { price: "", sale_price: "", attributes: {} }
    ]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        const fetchInit = async () => {
            setLoading(true);
            try {
                const [cats, attrsRes] = await Promise.all([
                    getCategoriesData(),
                    getAttributes()
                ]);
                console.log('Categories response:', cats);
                console.log('Attributes response:', attrsRes);
                setCategories(cats || []);
                setAttributes(attrsRes?.data || []);
            } catch (err) {
                console.error('Error fetching data:', err);
                setCategories([]);
                setAttributes([]);
                setMessage({ type: 'error', text: 'Không thể tải dữ liệu. Vui lòng thử lại!' });
            } finally {
                setLoading(false);
            }
        };
        fetchInit();
    }, []);

    const validateForm = () => {
        const newErrors = {};
        if (!form.name.trim()) newErrors.name = 'Tên sản phẩm là bắt buộc';
        if (!form.desc.trim()) newErrors.desc = 'Mô tả là bắt buộc';
        if (!form.id_cat) newErrors.id_cat = 'Vui lòng chọn danh mục';
        if (!imageFile) newErrors.image = 'Vui lòng chọn ảnh sản phẩm';
        variants.forEach((variant, index) => {
            if (!variant.price || parseFloat(variant.price) <= 0) newErrors[`variant_${index}_price`] = 'Giá phải lớn hơn 0';
            if (variant.sale_price && parseFloat(variant.sale_price) >= parseFloat(variant.price)) newErrors[`variant_${index}_sale_price`] = 'Giá khuyến mãi phải nhỏ hơn giá gốc';
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        if (errors[name]) setErrors({ ...errors, [name]: '' });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onload = (e) => setImagePreview(e.target.result);
            reader.readAsDataURL(file);
            if (errors.image) setErrors({ ...errors, image: '' });
        }
    };

    const resetForm = () => {
        setForm({ name: "", desc: "", id_cat: "" });
        setImageFile(null);
        setImagePreview(null);
        setVariants([{ price: "", sale_price: "", attributes: {} }]);
        setErrors({});
        setMessage({ type: '', text: '' });
    };
    const handleSubmit = async () => {
        if (!validateForm()) {
            setMessage({ type: 'error', text: 'Vui lòng kiểm tra lại thông tin!' });
            return;
        }
        setLoading(true);
        setMessage({ type: '', text: '' });
        const formData = new FormData();
        formData.append("name", form.name.trim());
        formData.append("desc", form.desc.trim());
        formData.append("id_cat", form.id_cat);
        if (imageFile) formData.append("images", imageFile);
        formData.append("variants", JSON.stringify(
            variants.map((v) => ({
                price: parseFloat(v.price),
                sale_price: v.sale_price ? parseFloat(v.sale_price) : null,
                attributes: Object.values(v.attributes || {})
            }))
        ));
        try {
            const res = await createProduct(formData);
            if (res.ok) {
                setMessage({ type: 'success', text: '✅ Thêm sản phẩm thành công!' });
                resetForm();
            } else {
                const msg = typeof res.data === 'string' ? res.data : (res.data.message || 'Có lỗi xảy ra');
                setMessage({ type: 'error', text: `❌ Thất bại: ${msg}` });
            }
        } catch (err) {
            setMessage({ type: 'error', text: '❌ Lỗi khi gửi form! Vui lòng thử lại.' });
        } finally {
            setLoading(false);
        }
    };
    if (loading && categories.length === 0) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
                <CircularProgress size={60} />
            </Box>
        );
    }
    return (
        <BlankCard>
            <Box sx={{ background: "#f8fafd", minHeight: "100vh", py: 4, mx: "auto" }}>
                <Card elevation={8} sx={{
                    borderRadius: 4,
                    boxShadow: "0 4px 24px rgba(102,126,234,0.10)",
                    p: 3, width: "100%", maxWidth: 1400, mx: "auto"
                }}>
                    <CardContent sx={{ p: 0 }}>
                        <Box textAlign="center" mb={4}>
                            <Typography variant="h4" gutterBottom sx={{
                                fontWeight: 700,
                                color: 'primary.main',
                                textShadow: '1px 1px 2px rgba(102,126,234,0.08)'
                            }}>
                                Thêm Sản Phẩm Mới
                            </Typography>
                        </Box>
                        {message.text && (
                            <Alert
                                severity={message.type}
                                sx={{
                                    mb: 3,
                                    borderRadius: 2,
                                    boxShadow: 2,
                                    fontSize: "1.1rem"
                                }}
                            >
                                {message.text}
                            </Alert>
                        )}
                        <Grid container spacing={2} alignItems="stretch">

                            <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'stretch' }} size={6}>
                                <Card elevation={0} sx={{
                                    background: "#fff",
                                    borderRadius: 3,
                                    boxShadow: "0 2px 8px rgba(102,126,234,0.08)",
                                    p: 3,
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    width: "500px"
                                }}>
                                    <Typography variant="h6" gutterBottom sx={{
                                        color: 'primary.main',
                                        fontWeight: 700,
                                        mb: 2
                                    }}>
                                        📝 Thông tin cơ bản
                                    </Typography>
                                    <Stack spacing={3}>
                                        <TextField
                                            label="Tên sản phẩm"
                                            name="name"
                                            value={form.name}
                                            onChange={handleFormChange}
                                            error={!!errors.name}
                                            helperText={errors.name}
                                            fullWidth
                                            required
                                            variant="outlined"
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: 2,
                                                    background: '#f8fafc',
                                                },
                                                '& .MuiInputLabel-root': {
                                                    fontWeight: 500
                                                }
                                            }}
                                        />
                                        <TextField
                                            label="Mô tả sản phẩm "
                                            name="desc"
                                            value={form.desc}
                                            onChange={handleFormChange}
                                            error={!!errors.desc}
                                            helperText={errors.desc}
                                            multiline
                                            rows={4}
                                            fullWidth
                                            required
                                            variant="outlined"
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: 2,
                                                    background: '#f8fafc',
                                                },
                                                '& .MuiInputLabel-root': {
                                                    fontWeight: 500,
                                                }
                                            }}
                                        />
                                        <FormControl fullWidth error={!!errors.id_cat} sx={{ minWidth: 220 }}>
                                            <InputLabel required sx={{ fontWeight: 500}}>Danh mục sản phẩm</InputLabel>
                                            <Select
                                                name="id_cat"
                                                value={form.id_cat}
                                                onChange={handleFormChange}
                                                label="Danh mục sản phẩm" 
                                                variant="outlined"
                                                sx={{
                                                    borderRadius: 2,
                                                    background: '#f8fafc',
                                                    fontWeight: 500,
                                                }}
                                            >
                                                {categories.map((cat) => (
                                                    <MenuItem key={cat.id} value={cat.id}>
                                                        {cat.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            {errors.id_cat && (
                                                <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                                                    {errors.id_cat}
                                                </Typography>
                                            )}
                                        </FormControl>
                                    </Stack>
                                </Card>
                            </Grid>
                            {/* Image Upload */}
                            <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'stretch' }} size={6}>
                                <Card elevation={0} sx={{
                                    background: "#fff",
                                    borderRadius: 3,
                                    boxShadow: "0 2px 8px rgba(102,126,234,0.08)",
                                    p: 3,
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    width: "500px"
                                }}>
                                    <Typography variant="h6" gutterBottom sx={{
                                        color: 'primary.main',
                                        fontWeight: 700,
                                        mb: 2
                                    }}>
                                        📸 Hình ảnh sản phẩm
                                    </Typography>
                                    <Stack spacing={3}>
                                        <Box
                                            sx={{
                                                border: '2px dashed',
                                                borderColor: errors.image ? 'error.main' : 'primary.main',
                                                borderRadius: 3,
                                                p: 3,
                                                textAlign: 'center',
                                                backgroundColor: '#f8fafc',
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    borderColor: 'primary.dark',
                                                    backgroundColor: '#e0e7ff',
                                                }
                                            }}
                                        >
                                            <input
                                                type="file"
                                                hidden
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                id="image-upload"
                                            />
                                            <label htmlFor="image-upload">
                                                <Box sx={{ cursor: 'pointer' }}>
                                                    {imagePreview ? (
                                                        <Box
                                                        sx={{
                                                          width: 150,
                                                          height: 150,
                                                          mx: 'auto',
                                                          mb: 2,
                                                          borderRadius: 2,
                                                          overflow: 'hidden',
                                                          border: '3px solid #e0e7ff',
                                                          boxShadow: 3,
                                                          display: 'flex',
                                                          alignItems: 'center',
                                                          justifyContent: 'center',
                                                          backgroundColor: '#fff',
                                                        }}
                                                      >
                                                        <Box
                                                          component="img"
                                                          src={imagePreview}
                                                          alt="Product preview"
                                                          sx={{
                                                            width: '100%',
                                                            height: '100%',
                                                            objectFit: 'contain',
                                                          }}
                                                        />
                                                      </Box>
                                                      
                                                      
                                                    ) : (
                                                        <Box sx={{
                                                            width: 140,
                                                            height: 140,
                                                            mx: 'auto',
                                                            mb: 2,
                                                            border: '2px dashed',
                                                            borderColor: 'primary.main',
                                                            borderRadius: '50%',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            backgroundColor: '#e0e7ff'
                                                        }}>
                                                            <PhotoCameraIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                                                        </Box>
                                                    )}
                                                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                                                        {imageFile ? imageFile.name : 'Click để chọn ảnh sản phẩm'}
                                                    </Typography>
                                                </Box>
                                            </label>
                                        </Box>
                                        {errors.image && (
                                            <Typography variant="caption" color="error" sx={{ textAlign: 'center' }}>
                                                {errors.image}
                                            </Typography>
                                        )}
                                    </Stack>
                                </Card>
                            </Grid>
                        </Grid>

                        {/* Variants Section */}
                        <Variants variants={variants} setVariants={setVariants} attributes={attributes}
                            errors={errors} setErrors={setErrors}
                        />


                        {/* Action Buttons */}
                        <Box display="flex" gap={3} justifyContent="center" mt={5}>
                            <Button
                                variant="outlined"
                                startIcon={<ClearIcon />}
                                onClick={resetForm}
                                disabled={loading}
                                size="large"
                                sx={{
                                    borderRadius: 2,
                                    px: 4,
                                    py: 1.5,
                                    fontSize: '1.1rem',
                                    fontWeight: 600
                                }}
                            >
                                Hủy
                            </Button>
                            <Button
                                variant="contained"
                                startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
                                onClick={handleSubmit}
                                disabled={loading}
                                size="large"
                                sx={{
                                    borderRadius: 2,
                                    px: 4,
                                    py: 1.5,
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                                    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .10)',
                                    '&:hover': {
                                        background: 'linear-gradient(45deg, #1976D2 30%, #1E88E5 90%)',
                                    }
                                }}
                            >
                                {loading ? 'Đang lưu...' : 'Lưu Sản Phẩm'}
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Box>

        </BlankCard>
    );
};

export default AddProduct;