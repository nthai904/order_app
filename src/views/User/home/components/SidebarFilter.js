import React from 'react';
import {
  Box, Typography, Divider, Button, List, ListItemButton, ListItemIcon, ListItemText
} from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import DevicesIcon from '@mui/icons-material/Devices';
import CoffeeIcon from '@mui/icons-material/Coffee';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

const categoryIcons = {
  'Fashion': <CategoryIcon fontSize="small" />,
  'Books': <MenuBookIcon fontSize="small" />,
  'Toys': <EmojiEmotionsIcon fontSize="small" />,
  'Electronics': <DevicesIcon fontSize="small" />,
  'Khác': <CoffeeIcon fontSize="small" />,
};

const sortOptions = [
  // { value: 'newest', label: 'Mới nhất', icon: <AccessTimeIcon fontSize="small" /> },
  { value: 'price-desc', label: 'Giá cao đến thấp', icon: <ArrowDownwardIcon fontSize="small" /> },
  { value: 'price-asc', label: 'Giá thấp đến cao', icon: <ArrowUpwardIcon fontSize="small" /> },
  { value: 'discounted', label: 'Giảm giá', icon: <LocalOfferIcon fontSize="small" /> },
];

const SidebarFilter = ({
  categories = [],
  selectedCategory,
  setSelectedCategory,
 
  onReset,
  sortBy,
  setSortBy
}) => {
  return (
    <Box sx={{ border: '1px solid #eee', borderRadius: 3, p: { xs: 2, md: 3 }, boxShadow: { xs: 0, md: 1 }, bgcolor: 'background.paper', minWidth: 0 }}>
      <Typography variant="h6" gutterBottom fontWeight={600} fontSize={16}>
        Danh mục
      </Typography>
      <List disablePadding>
        <ListItemButton
          selected={selectedCategory === ''}
          onClick={() => setSelectedCategory('')}
          sx={{ borderRadius: 2, mb: 0.5 }}
        >
          <ListItemIcon><CategoryIcon fontSize="small" /></ListItemIcon>
          <ListItemText primary="Tất cả" />
        </ListItemButton>
        {categories.map(cat => (
          <ListItemButton
            key={cat}
            selected={selectedCategory === cat}
            onClick={() => setSelectedCategory(cat)}
            sx={{ borderRadius: 2, mb: 0.5 }}
          >
            <ListItemIcon>{categoryIcons[cat] || <CoffeeIcon fontSize="small" />}</ListItemIcon>
            <ListItemText primary={cat} />
          </ListItemButton>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom fontWeight={600} fontSize={16}>
        Giá
      </Typography>
      <List disablePadding>
        {sortOptions.map(opt => (
          <ListItemButton
            key={opt.value}
            selected={sortBy === opt.value}
            onClick={() => setSortBy(opt.value)}
            sx={{ borderRadius: 2, mb: 0.5 }}
          >
            <ListItemIcon>{opt.icon}</ListItemIcon>
            <ListItemText primary={opt.label} />
          </ListItemButton>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      <Box px={1}>
        <Button variant="outlined" fullWidth onClick={onReset} sx={{ mt: 1 }}>
          Đặt lại
        </Button>
      </Box>
    </Box>
  );
};

export default SidebarFilter;
