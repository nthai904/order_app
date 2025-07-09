import React from 'react';
import { Grid } from '@mui/material';
import PageContainer from '../../../components/container/PageContainer';
import Orders from './components/Orders';

const OrderStatus = () => {
  return (
    <PageContainer title='Trạng thái đơn hàng' description='Trang trạng thái đơn hàng'>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={10} md={8} lg={6}>
            <Orders />
          </Grid>
        </Grid>
      
    </PageContainer>
  );
};

export default OrderStatus;
