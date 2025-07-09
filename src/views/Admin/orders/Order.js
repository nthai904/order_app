import React from 'react'
import PageContainer from '../../../components/container/PageContainer'
import { Box,  Grid } from '@mui/material'
import OrderPerformance from '../orders/components/OrderPerformance'

const Order = () => {
  return (
    <PageContainer title='Đơn hàng' description='Trang quản lý đơn hàng'>
      <Box>
        <Grid item size={{ xs: 12, lg: 8 }}>
            <OrderPerformance />
          </Grid> 
      </Box>
    </PageContainer>
  )
}

export default Order;
