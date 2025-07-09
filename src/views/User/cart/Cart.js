import React, { useState } from 'react';
import { Grid, Box } from '@mui/material';
import PageContainer from '../../../components/container/PageContainer';
import CartPerfomance from './components/CartPerfomance';
import Modal from '../../../components/forms/modal/Modal';

const Cart = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleCheckoutSuccess = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <PageContainer title='Giỏ hàng' description='Trang giỏ hàng'>
      <Box sx={{ mx: 30, width: '100%' }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <CartPerfomance onCheckoutSuccess={handleCheckoutSuccess} />
          </Grid>
        </Grid>
        {/* <Modal
          open={openModal}
          onClose={handleCloseModal}
        /> */}
      </Box>
    </PageContainer>
  );
};

export default Cart;
