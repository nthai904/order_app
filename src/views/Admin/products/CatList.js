import React from 'react';
import PageContainer from '../../../components/container/PageContainer';
import { Box, Typography, Grid } from '@mui/material';
import CategoryProduct from './components/CategoryProduct';

const CatList = () => {
  return (
    <PageContainer title='Danh mục sản phẩm' description='Trang danh mục sản phẩm'>
      <Box>
        <Grid item size={{ xs: 12, lg: 8 }}>
            <CategoryProduct />
          </Grid> 
      </Box>
    </PageContainer>
  )
}

export default CatList;
