import React from 'react'
import { Grid, Box } from '@mui/material'
import PageContainer from '../../components/container/PageContainer'

// components
import SalesOverview from './components/SalesOverview'
import YearlyBreakup from './components/YearlyBreakup'
import RecentTransactions from './components/RecentTransactions'
import ProductPerformance from './components/ProductPerformance'
import Blog from './components/Blog'
import MonthlyEarnings from './components/MonthlyEarnings'

const Dashboard = () => {
  return (
    <PageContainer title='Bảng điều khiển' description='Trang bảng điêu khiển'>
      <Box>
        <Grid container spacing={3}>
          <Grid item size={{ xs: 12 }}>
            <SalesOverview />
          </Grid>
          <Grid item size={{ xs: 12, lg: 4 }}>
            <RecentTransactions />
          </Grid>
          <Grid item size={{ xs: 12, lg: 8 }}>
            <ProductPerformance />
          </Grid>
          <Grid item size={{ xs: 12 }}>
            <Blog />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  )
}

export default Dashboard
