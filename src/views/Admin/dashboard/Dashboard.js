import React from 'react'
import { Grid, Box } from '@mui/material'
import PageContainer from '../../../components/container/PageContainer'

// components
import SalesOverview from './components/SalesOverview';
import RevenueOverview from './components/RevenueOverview';


const Dashboard = () => {
  return (
    <PageContainer title='Bảng điều khiển' description='Trang bảng điêu khiển'>
      <Box>
        <Grid container spacing={3}>
          <Grid item size={{ xs: 12 }}>
            <SalesOverview />
          </Grid>
          <Grid item size={{ xs: 12 }}>
            <RevenueOverview /> 
          </Grid>
          
        </Grid>
      </Box>
    </PageContainer>
  )
}

export default Dashboard;
