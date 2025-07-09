import React from 'react'
import PageContainer from '../../../components/container/PageContainer'
import { Box, Typography, Grid } from '@mui/material'
import ElementPerformance from './components/ElementPerformance'

const ElementProduct = () => {
  return (
    <PageContainer title='Thuộc tính sản phẩm' description='Trang quản lý thuộc tính sản phẩm'>
      <Box>
        
        <Grid item size={{ xs: 12, lg: 8 }}>
            <ElementPerformance />
          </Grid> 
      </Box>
    </PageContainer>
  )
}   

export default ElementProduct;
