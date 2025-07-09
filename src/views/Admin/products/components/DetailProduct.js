import React from 'react';
import {
    Typography, Box,
    Card,
    CardContent,
    Grid,
    Avatar,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button,
    Alert,
    Snackbar,
    CircularProgress
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    Edit as EditIcon
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardCard from '../../../../components/shared/DashboardCard';
import { getProductDetail } from '../../../../Api/API';

const DetailProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [snackbar, setSnackbar] = React.useState({ open: false, message: '', severity: 'success' });

    const loadProductDetail = async () => {
        setLoading(true);
        try {
            const response = await getProductDetail(id);
            console.log('Product detail response:', response);
            console.log('Product data:', response.data);
            console.log('Product variants:', response.data.variants);
            if (response.data.variants) {
                response.data.variants.forEach((variant, index) => {
                    console.log(`Variant ${index}:`, variant);
                    console.log(`Variant ${index} attributes:`, variant.variant_attributes);
                });
            }
            setProduct(response.data);
        } catch (error) {
            console.error('Error loading product detail:', error);
            setSnackbar({ open: true, message: 'Lỗi khi tải chi tiết sản phẩm', severity: 'error' });
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        loadProductDetail();
    }, [id]);

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const handleBack = () => {
        navigate('/product');
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
                <CircularProgress size={60} />
            </Box>
        );
    }

    if (!product) {
        return (
            <DashboardCard title="Chi tiết sản phẩm">
                <Alert severity="error">
                    Không tìm thấy sản phẩm
                </Alert>
            </DashboardCard>
        );
    }

    return (
        <>
            <DashboardCard title="Chi tiết sản phẩm">
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Button
                        variant="outlined"
                        startIcon={<ArrowBackIcon />}
                        onClick={handleBack}
                    >
                        Quay lại
                    </Button>
                    
                </Box>

                <Grid container spacing={2}  alignItems="stretch">
                    <Grid item xs={12} md={6} size={5}>
                        <Card elevation={3} sx={{ borderRadius: 3, overflow: 'hidden' }}>
                            <Box sx={{ p: 2, textAlign: 'center' }}>
                                <Avatar
                                    src={product.image_base64}
                                    alt={product.name}
                                    sx={{
                                        width: '100%',
                                        height: 300,
                                        borderRadius: 2,
                                        objectFit: 'cover'
                                    }}
                                    variant="rounded"
                                />
                            </Box>
                        </Card>
                    </Grid>

                    {/* Product Information */}
                    <Grid item xs={12} md={6} size={7}>
                        <Card elevation={3} sx={{ borderRadius: 3, height: '100%' }}>
                            <CardContent sx={{ p: 3}}>
                                <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
                                    {product.name}
                                </Typography>

                                {/* <Box sx={{ mb: 3 }}>
                                    <Chip
                                        label={product.category?.name || 'Không có danh mục'}
                                        color="primary"
                                        sx={{ mb: 2 }}
                                    />
                                </Box> */}

                                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                                    Mô tả sản phẩm:
                                </Typography>
                                <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
                                    {product.desc || 'Không có mô tả'}
                                </Typography>

                                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                                    ID sản phẩm:
                                </Typography>
                                <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
                                    {product.id || 'Không có id'}
                                </Typography>
                                        
                                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                                    Danh mục:
                                </Typography>
                                <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
                                    {product.category?.name || 'Không có'}
                                </Typography>
                              
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid> 

                {/* Variants Section */}
                {product.variants && product.variants.length > 0 && (
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                            Danh sách biến thể
                        </Typography>
                        <Card elevation={3} sx={{ borderRadius: 3 }}>
                            <CardContent sx={{ p: 0 }}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                <Typography variant="subtitle2" fontWeight={600}>
                                                    ID
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="subtitle2" fontWeight={600}>
                                                    Giá gốc
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="subtitle2" fontWeight={600}>
                                                    Giá khuyến mãi
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="subtitle2" fontWeight={600}>
                                                    Thuộc tính
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {product.variants.map((variant) => (
                                            <TableRow key={variant.id}>
                                                <TableCell>
                                                    <Typography variant="body2">
                                                        {variant.id}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="body2" fontWeight={600}>
                                                        {variant.price?.toLocaleString('vi-VN')} ₫
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="body2" color="error" fontWeight={600}>
                                                        {variant.sale_price ? `${variant.sale_price.toLocaleString('vi-VN')} ₫` : 'Không có'}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                                        {variant.variant_attributes && variant.variant_attributes.length > 0 ? (
                                                            variant.variant_attributes.map((attr) => {
                                                                console.log('Attribute data:', attr);
                                                                const attrName = attr.attribute_value?.attribute?.name || 'Unknown';
                                                                const attrValue = attr.attribute_value?.value || 'Unknown';
                                                                return (
                                                                    <Chip
                                                                        key={attr.id}
                                                                        label={`${attrName}: ${attrValue}`}
                                                                        size="small"
                                                                        color="primary"
                                                                        variant="outlined"
                                                                    />
                                                                );
                                                            })
                                                        ) : (
                                                            <Typography variant="body2" color="textSecondary">
                                                                Không có thuộc tính
                                                            </Typography>
                                                        )}
                                                    </Box>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </Box>
                )}
            </DashboardCard>

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

export default DetailProduct;
