import React from 'react'
import PageContainer from '../../../components/container/PageContainer'
import { Box, Grid } from '@mui/material'
import ProductPerformance from './components/ProductPerformance'

const Product = () => {
  return (
    <PageContainer title='Sản phẩm' description='Trang quản lý sản phẩm'>
      <Box>
        <Grid item size={{ xs: 12, lg: 8 }}>
            <ProductPerformance />
          </Grid> 
      </Box>
    </PageContainer>
  )
}

export default Product;
