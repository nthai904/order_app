import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import { getOrders } from '../../../../Api/API';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const SalesOverview = () => {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalQuantity: 0,
    totalOrders: 0,
  });

  useEffect(() => {
    async function fetchAndCompute() {
      try {
        const result = await getOrders();
        const orders = result.data;
        let totalRevenue = 0;
        let totalQuantity = 0;
        let totalOrders = 0;
        const today = new Date();
        const todayStr = today.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
        for (const order of orders) {
          if (order.status !== 'completed') continue;
          const d = new Date(order.createdAt || order.created_at);
          const orderDateStr = d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
          if (orderDateStr !== todayStr) continue;
          totalOrders++;
          totalRevenue += parseFloat(order.total_price);
          for (const detail of order.details) {
            totalQuantity += detail.quantity;
          }
        }
        setStats({ totalRevenue, totalQuantity, totalOrders });
      } catch (e) {
        console.error('Lỗi tính thống kê FE:', e);
      }
    }
    fetchAndCompute();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4} sx={{ width: '30%' }}>
        <Card>
          <CardContent sx={{ p: 5}}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Tổng Doanh Thu
                </Typography>
                <Box display="flex" alignItems="baseline" gap={2}>
                  <Typography variant="h4" component="span">
                    <b style={{ color: '#111' }}>{stats.totalRevenue.toLocaleString()}</b>
                  </Typography>
                  <Typography variant="subtitle1" color="text.disabled" component="span">
                    VNĐ
                  </Typography>
                </Box>
              </Box>
              <AttachMoneyIcon sx={{ color: 'success.main', fontSize: 35}} />
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4} sx={{ width: '25%' }}>
        <Card>
          <CardContent sx={{ p: 5 }}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Số Ly
                </Typography>
                <Box display="flex" alignItems="baseline" gap={2}>
                  <Typography variant="h4" component="span">
                    <b style={{ color: '#111' }}>{stats.totalQuantity}</b>
                  </Typography>
                  <Typography variant="subtitle1" color="text.disabled" component="span">
                    ly
                  </Typography>
                </Box>
              </Box>
              <LocalCafeIcon sx={{ color: 'primary.main', fontSize: 35}} />
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4} sx={{ width: '25%' }}>
        <Card>
          <CardContent sx={{ p: 5 }}>
            <Box display="flex" alignItems="center" justifyContent="space-between" >
              <Box>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Đơn Hàng
                </Typography>
                <Box display="flex" alignItems="baseline" gap={2}>
                  <Typography variant="h4" component="span">
                    <b style={{ color: '#111' }}>{stats.totalOrders}</b>
                  </Typography>
                  <Typography variant="subtitle1" color="text.disabled" component="span">
                    đơn
                  </Typography>
                </Box>
              </Box>
              <ShoppingCartIcon sx={{ color: 'info.main', fontSize: 35}} />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default SalesOverview;
