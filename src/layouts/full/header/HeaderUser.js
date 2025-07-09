import React from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  styled,
  Typography,
} from '@mui/material';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

const HeaderUser = (props) => {
  const location = useLocation();

  const generateBreadcrumbs = () => {
    const pathnames = location.pathname.split('/').filter((x) => x);

    const breadcrumbNameMap = {
      home: 'Trang chủ',
      cart: 'Giỏ hàng',
      'product-detail': 'Chi tiết sản phẩm',
      'order-status': 'Trạng thái đơn hàng',
    };

    return (
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" component={RouterLink} to="/home">
          Trang chủ
        </Link>

        {/* Các breadcrumb còn lại */}
        {(() => {
          // Nếu là product-detail có id, chỉ hiện tới product-detail
          if (
            pathnames[1] === 'product-detail' &&
            pathnames.length === 3 // /home/product-detail/:id
          ) {
            return (
              <Typography color="text.primary">
                {breadcrumbNameMap['product-detail'] || 'product-detail'}
              </Typography>
            );
          }
          // Mặc định như cũ
          return pathnames.slice(1).map((value, index) => {
            const to = '/home/' + pathnames.slice(1, index + 2).join('/');
            const isLast = index === pathnames.length - 2;
            const label = breadcrumbNameMap[value] || value;

            return isLast ? (
              <Typography key={to} color="text.primary">
                {label}
              </Typography>
            ) : (
              <Link key={to} underline="hover" color="inherit" component={RouterLink} to={to}>
                {label}
              </Link>
            );
          });
        })()}
      </Breadcrumbs>
    );
  };

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    background: theme.palette.background.paper,
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    [theme.breakpoints.up('lg')]: {
      maxHeight: '50px',
    },
  }));

  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.secondary,
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  }));

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        {/* Sidebar toggle on mobile */}
        <Box display="flex" alignItems="center">

          {/* Breadcrumb */}
          <Box>{generateBreadcrumbs()}</Box>
        </Box>

      </ToolbarStyled>
    </AppBarStyled>
  );
};

export default HeaderUser;
