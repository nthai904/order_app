import React from 'react';
import { Box, AppBar, Toolbar, styled, Stack, Button, IconButton } from '@mui/material';
import wrappixelLogo from '../../../assets/images/logos/logo-1-resized.jpg';

import { Link } from 'react-router-dom';
import { Icon } from "@iconify/react";
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';


const Topbar = (props) => {


  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: "none",
    background: theme.palette.white.main,
    justifyContent: "center",
    [theme.breakpoints.up("lg")]: {
      minHeight: "72px",
    },
    zIndex: 9,
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: "100%",
    color: theme.palette.text.secondary,
  }));

  const GhostButton = styled(Button)(({ theme }) => ({
    color: theme.palette.primary.main,
    backgroundColor: "#ffffff00",
    boxShadow: "none",
    borderRadius: "7px",
    fontWeight: 400,
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
    "& .MuiButton-startIcon": {
      marginRight: "4px",
    },
  }));

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled sx={{ padding: "16px 24px", justifyContent: "space-between", flexDirection: { md: "row", xs: "row" }, gap: "16px", display: "flex" }}>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/home" style={{ display: "flex" }}>
            <img src={wrappixelLogo} width={80} style={{ maxWidth: 147, width: { xs: 80, md: 147 } }} alt="logo" />
          </Link>
        </Box>

        <Stack
          direction="row"
          sx={{ gap: "16px", display: { xs: "none", lg: "flex" } }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Link
              to="/home/cart"
              style={{ display: "flex", height: "fit-content" }}
            >
              <GhostButton sx={{ gap: "8px", padding: "0", fontSize: "16px", ":hover": { color: (theme) => theme.palette.primary.main, backgroundColor: "transparent" } }}>
                <Icon icon="iconoir:cart" width={20} />
                Giỏ hàng
              </GhostButton>
            </Link>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Link
              to="/home/order-status"
              style={{ display: "flex", height: "fit-content" }}
            >
              <GhostButton sx={{ gap: "8px", padding: "0", fontSize: "16px", ":hover": { color: (theme) => theme.palette.primary.main, backgroundColor: "transparent" } }}>
                <Icon icon="material-symbols:receipt-long" width={20} />
                Đơn hàng
              </GhostButton>
            </Link>
          </Box>
        </Stack>

        {/* Hamburger menu trên mobile/tablet */}
        <Box sx={{ display: { xs: "flex", lg: "none" }, alignItems: "center" }}>
          <IconButton onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>
        </Box>

        {/* Drawer cho mobile menu */}
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <Box sx={{ width: 220, p: 2 }} role="presentation" onClick={() => setDrawerOpen(false)}>
            <Stack spacing={2}>
              <Link to="/home/cart" style={{ textDecoration: 'none' }}>
                <Button startIcon={<Icon icon="iconoir:cart" width={20} />} fullWidth variant="text">
                  Giỏ hàng
                </Button>
              </Link>
              <Link to="/home/order-status" style={{ textDecoration: 'none' }}>
                <Button startIcon={<Icon icon="material-symbols:receipt-long" width={20} />} fullWidth variant="text">
                  Đơn hàng
                </Button>
              </Link>
            </Stack>
          </Box>
        </Drawer>
      </ToolbarStyled>
    </AppBarStyled>
  );
};


export default Topbar;
