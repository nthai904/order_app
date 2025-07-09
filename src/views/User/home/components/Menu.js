import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box, IconButton, Stack } from '@mui/material';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import { useNavigate } from 'react-router-dom';

const Menu = ({ id, name, desc, image_base64, variants, category }) => {
  const navigate = useNavigate();

  // Get the first variant's price information, or use default values
  const firstVariant = variants && variants.length > 0 ? variants[0] : null;
  const price = firstVariant?.sale_price || firstVariant?.price || 0;
  const originalPrice = firstVariant?.price || 0;


  const imageUrl = image_base64 || 'https://via.placeholder.com/300x200?text=No+Image';

  const toTitleCase = (str) => {
    if (!str) return '';
    return str.toLowerCase().split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };
  

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3, position: 'relative', width: "270px" }}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="200" width="200"
          image={imageUrl}
          alt={name}
          sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12, border: '1px solid #e0e0e0', objectFit: 'cover' }}
        />
        <IconButton
          sx={{
            position: 'absolute',
            top: 180,
            backgroundColor: (theme) => theme.palette.primary.dark,
            right: 8,
            color: (theme) => theme.palette.white.main,
            '&:hover': { backgroundColor: '#009ACD' },
          }}
          onClick={() => navigate(`/home/product-detail/${id}`)}
        >
          <ShoppingBasketOutlinedIcon />
        </IconButton>
      </Box>
      <CardContent>
        <Typography variant="subtitle1" fontWeight="bold" noWrap onClick={() => navigate(`/home/product-detail/${id}`)}
          sx={{'&:hover': { color: 'primary.main', cursor: 'pointer' }}}>
          {toTitleCase(name)}
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="subtitle2" color="primary" fontWeight="bold">
            {price.toLocaleString()}đ
          </Typography>
          {originalPrice > price && (
            <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
              {originalPrice.toLocaleString()}đ
            </Typography>
          )}
        </Stack>
        {/* {desc && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }} noWrap>
            {desc}
          </Typography>
        )} */}
      </CardContent>
    </Card>
  );
};

export default Menu;
