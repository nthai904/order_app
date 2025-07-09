import React, { useEffect, useState } from "react";
import {
    Box, TextField, Button, Typography, MenuItem,
    Stack, Card, CardContent, Grid, IconButton, Alert,
    CircularProgress, FormControl, InputLabel, Select, Avatar
} from "@mui/material";
import {
    Save as SaveIcon,
    Clear as ClearIcon,
    PhotoCamera as PhotoCameraIcon,
    ArrowBack as ArrowBackIcon
} from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import { getCategoriesData, getAttributes, getProductDetail, updateProduct } from "../../../../Api/API";
import BlankCard from "../../../../components/shared/BlankCard";
import Variants from "./Variants";

const UpdateProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        desc: "",
        id_cat: ""
    });
    const [categories, setCategories] = useState([]);
    const [attributes, setAttributes] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [currentImage, setCurrentImage] = useState(null);
    const [variants, setVariants] = useState([
        { price: "", sale_price: "", attributes: {} }
    ]);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        const fetchData = async () => {
            setInitialLoading(true);
            try {
                const [cats, attrsRes, productRes] = await Promise.all([
                    getCategoriesData(),
                    getAttributes(),
                    getProductDetail(id)
                ]);

                setCategories(cats || []);
                setAttributes(attrsRes?.data || []);

                const product = productRes.data;
                setForm({
                    name: product.name || "",
                    desc: product.desc || "",
                    id_cat: product.id_cat || ""
                });

                if (product.image_base64) {
                    setCurrentImage(product.image_base64);
                    setImagePreview(product.image_base64);
                }

                // Convert variants to the format expected by the form
                if (product.variants && product.variants.length > 0) {
                    const formattedVariants = product.variants.map(variant => {
                        const attributes = {};
                        if (variant.variant_attributes) {
                            variant.variant_attributes.forEach(attr => {
                                attributes[attr.attribute_value.attribute.id] = attr.attribute_value.id;
                            });
                        }
                        return {
                            price: variant.price?.toString() || "",
                            sale_price: variant.sale_price?.toString() || "",
                            attributes
                        };
                    });
                    setVariants(formattedVariants);
                }
            } catch (err) {
                setMessage({ type: 'error', text: 'Không thể tải dữ liệu sản phẩm. Vui lòng thử lại!' });
            } finally {
                setInitialLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const validateForm = () => {
        const newErrors = {};
        if (!form.name.trim()) newErrors.name = 'Tên sản phẩm là bắt buộc';
        if (!form.desc.trim()) newErrors.desc = 'Mô tả là bắt buộc';
        if (!form.id_cat) newErrors.id_cat = 'Vui lòng chọn danh mục';
        if (!imageFile && !currentImage) newErrors.image = 'Vui lòng chọn ảnh sản phẩm';
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
        // Reset to original values
        window.location.reload();
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
        // formData.append("variants", JSON.stringify(
        //     variants.map((v) => ({
        //         price: parseFloat(v.price),
        //         sale_price: v.sale_price ? parseFloat(v.sale_price) : null,
        //         attributes: v.attributes || {}
        //     }))
        // ));
        try {
            const res = await updateProduct(id, formData);
            if (res.ok) {
                setMessage({ type: 'success', text: '✅ Cập nhật sản phẩm thành công!' });
                setTimeout(() => {
                    navigate('/product');
                }, 2000);
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

    const handleBack = () => {
        navigate('/product');
    };

    if (initialLoading) {
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
                                Cập Nhật Sản Phẩm
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
                                                    fontWeight: 500,
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
                                        <FormControl fullWidth error={!!errors.id_cat} required sx={{ minWidth: 220 }}>
                                            <InputLabel sx={{ color: 'primary.main', fontWeight: 500 }}>Danh mục sản phẩm</InputLabel>
                                            <Select
                                                name="id_cat"
                                                value={form.id_cat}
                                                onChange={handleFormChange}
                                                label="Danh mục sản phẩm"
                                                variant="outlined"
                                                sx={{
                                                    borderRadius: 2,
                                                    background: '#f8fafc',
                                                    fontWeight: 500
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
                                                        <Avatar
                                                            src={imagePreview}
                                                            sx={{
                                                                width: 120,
                                                                height: 120,
                                                                mx: 'auto',
                                                                mb: 2,
                                                                border: '3px solid #e0e7ff',
                                                                boxShadow: 3
                                                            }}
                                                        />
                                                    ) : (
                                                        <Box sx={{
                                                            width: 120,
                                                            height: 120,
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
                                                        {imageFile ? imageFile.name : (currentImage ? 'Ảnh hiện tại (click để thay đổi)' : 'Click để chọn ảnh sản phẩm')}
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
                                startIcon={<ArrowBackIcon />}
                                onClick={handleBack}
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
                                Quay lại
                            </Button>
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
                                Làm mới
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
                                {loading ? 'Đang cập nhật...' : 'Cập nhật Sản Phẩm'}
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Box>

        </BlankCard>
    );
};

export default UpdateProduct;
