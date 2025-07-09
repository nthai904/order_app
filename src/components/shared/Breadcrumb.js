import React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

const Breadcrumb = ({ items = [] }) => {
  return (
    <nav aria-label="breadcrumb">
      <Breadcrumbs aria-label="breadcrumb">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          if (isLast) {
            return (
              <Typography key={index} color="text.primary">
                {item.label}
              </Typography>
            );
          }

          return (
            <Link
              key={index}
              underline="hover"
              color="inherit"
              href={item.href}
            >
              {item.label}
            </Link>
          );
        })}
      </Breadcrumbs>
    </nav>
  );
};

export default Breadcrumb;
