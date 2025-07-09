import React from 'react'
import PageContainer from '../../../components/container/PageContainer'
import { Box, Typography } from '@mui/material'

const User = () => {
  return (
    <PageContainer title='Nhân viên' description='Trang quản lý nhân viên'>
      <Box>
        <Typography variant='h1'>Quản lý người dùng</Typography>
      </Box>
    </PageContainer>
  )
}

export default User;
