import React from 'react';
import {
    Box, TextField, Button, Typography, MenuItem,
    Stack, Card, CardContent, Grid, IconButton, Alert,
    FormControl, InputLabel, Select, Chip
} from "@mui/material";
import {
    Add as AddIcon,
    Delete as DeleteIcon
} from "@mui/icons-material";

const Variants = ({ variants, setVariants, attributes, errors, setErrors }) => {
    // Filter only size attributes
    const sizeAttributes = attributes.filter(attr => attr.name.toLowerCase() === 'size');

    const addVariant = () => {
        setVariants([...variants, { price: "", sale_price: "", attributes: {} }]);
    };

    const removeVariant = (index) => {
        const newVariants = variants.filter((_, i) => i !== index);
        setVariants(newVariants);

        // Clear errors for removed variant
        const newErrors = { ...errors };
        Object.keys(newErrors).forEach(key => {
            if (key.startsWith(`variant_${index}_`)) {
                delete newErrors[key];
            }
        });
        setErrors(newErrors);
    };

    const updateVariant = (index, field, value) => {
        const newVariants = [...variants];
        newVariants[index] = { ...newVariants[index], [field]: value };
        setVariants(newVariants);

        // Clear error for this field
        if (errors[`variant_${index}_${field}`]) {
            setErrors({ ...errors, [`variant_${index}_${field}`]: '' });
        }
    };

    const updateVariantAttribute = (index, attributeId, value) => {
        const newVariants = [...variants];
        if (!newVariants[index].attributes) {
            newVariants[index].attributes = {};
        }
        newVariants[index].attributes[attributeId] = value;
        setVariants(newVariants);
    };

    return (
        <Card elevation={0} sx={{
            background: "#fff",
            borderRadius: 3,
            boxShadow: "0 2px 8px rgba(102,126,234,0.08)",
            p: 3,
            mt: 3
        }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{
                    color: 'primary.main',
                    fontWeight: 700
                }}>
                    🎯 Biến thể sản phẩm
                </Typography>
                <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={addVariant}
                    sx={{
                        borderRadius: 2,
                        fontWeight: 600
                    }}
                >
                    Thêm biến thể
                </Button>
            </Box>

            {variants.length === 0 && (
                <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
                    Chưa có biến thể nào. Hãy thêm ít nhất một biến thể cho sản phẩm.
                </Alert>
            )}

            <Stack spacing={3}>
                {variants.map((variant, index) => (
                    <Card key={index} elevation={2} sx={{
                        borderRadius: 2,
                        border: '1px solid #e0e7ff',
                        background: '#fafbff'
                    }}>
                        <CardContent sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
                                    Biến thể {index + 1}
                                </Typography>
                                {variants.length > 1 && (
                                    <IconButton
                                        color="error"
                                        onClick={() => removeVariant(index)}
                                        size="small"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                )}
                            </Box>

                            <Grid container spacing={2}>
                                {/* Price */}
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="Giá gốc (₫)"
                                        type="number"
                                        value={variant.price}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (parseFloat(value) >= 0 || value === "") {
                                                updateVariant(index, 'price', value);
                                            }
                                        }}
                                        error={!!errors[`variant_${index}_price`]}
                                        helperText={errors[`variant_${index}_price`] || "**Giá phải lớn hơn 0"}
                                        fullWidth
                                        required
                                        variant="outlined"
                                        slotProps={{ input: { min: 0 } }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 2,
                                                backgroundColor: '#f8fafc',
                                            }
                                        }}
                                    />

                                </Grid>

                                {/* Sale Price */}
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="Giá khuyến mãi (₫)"
                                        type="number"
                                        value={variant.sale_price}
                                        onChange={(e) => updateVariant(index, 'sale_price', e.target.value)}
                                        error={!!errors[`variant_${index}_sale_price`]}
                                        helperText={errors[`variant_${index}_sale_price`]}
                                        fullWidth
                                        variant="outlined"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 2,
                                                background: '#fff',
                                            }
                                        }}
                                    />
                                </Grid>

                                {/* Size Attributes */}
                                {sizeAttributes.map((attr) => (
                                    <Grid item xs={12} md={6} key={attr.id}>
                                        <FormControl fullWidth sx={{ minWidth: 220 }}>
                                            <InputLabel sx={{ fontWeight: 500 }}>
                                                {attr.name}
                                            </InputLabel>
                                            <Select
                                                value={variant.attributes?.[attr.id] || ''}
                                                onChange={(e) => updateVariantAttribute(index, attr.id, e.target.value)}
                                                label={attr.name}
                                                variant="outlined"
                                                sx={{
                                                    borderRadius: 2,
                                                    background: '#fff',
                                                    fontWeight: 500
                                                }}
                                            >
                                                {attr.values?.map((value) => (
                                                    <MenuItem key={value.id} value={value.id}>
                                                        {value.value}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                ))}
                            </Grid>

                            {/* Selected Attributes Display */}
                            {Object.keys(variant.attributes || {}).length > 0 && (
                                <Box sx={{ mt: 2 }}>
                                    <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                                        Thuộc tính đã chọn:
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                        {Object.entries(variant.attributes).map(([attrId, valueId]) => {
                                            const attr = sizeAttributes.find(a => String(a.id) === String(attrId));
                                            const value = attr?.values?.find(v => String(v.id) === String(valueId));
                                            return (
                                                <Chip
                                                    key={attrId}
                                                    label={
                                                        attr && value
                                                            ? `${attr.name}: ${value.value}`
                                                            : "Thuộc tính không xác định"
                                                    }
                                                    size="small"
                                                    color="primary"
                                                    variant="outlined"
                                                />
                                            );
                                        })}
                                    </Box>
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </Stack>

        </Card>
    );
};

export default Variants;
