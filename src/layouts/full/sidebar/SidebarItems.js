import React from "react";
import { useLocation, NavLink, Link } from 'react-router-dom';
import { Box, Typography } from "@mui/material";
import {
  Logo,
  Sidebar as MUI_Sidebar,
  Menu,
  MenuItem,
  Submenu,
} from "react-mui-sidebar";
import { IconCircle } from '@tabler/icons-react';
import Menuitems from "./MenuItems";
import logoicn from "../../../assets/images/logos/logo-dark.svg";
import Upgrade from "./Upgrade";

const renderMenuItems = (items, pathDirect) => {


  return items.map((item) => {


    const Icon = item.icon ? item.icon : IconCircle;
    const itemIcon = <Icon stroke={1.5} size="1.3rem" />;

    if (item.subheader) {
      // Display Subheader

      return (
        <Box sx={{ margin: "0 -24px", textTransform: 'uppercase' }} key={item.subheader}>
          <Menu
            subHeading={item.subheader}
            key={item.subheader}

          />
        </Box>
      );
    }

    //If the item has children (submenu)
    if (item.children) {
      return (
        <Submenu
          key={item.id}
          title={item.title}
          icon={itemIcon}
        >
          {renderMenuItems(item.children, pathDirect)}
        </Submenu>
      );
    }

    // If the item has no children, render a MenuItem

    return (
      <MenuItem
        key={item.id}
        isSelected={pathDirect === item?.href}
        borderRadius='9px'
        icon={itemIcon}
        component="div"
        link={item.href && item.href !== "" ? item.href : undefined}
        target={item.href && item.href.startsWith("https") ? "_blank" : "_self"}
        badge={item.chip ? true : false}
        badgeContent={item.chip || ""}
        badgeColor='secondary'
        badgeTextColor="#1b84ff"
        disabled={item.disabled}
      >
        <Link to={item.href} target={item.href.startsWith("https") ? "_blank" : "_self"} rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography component='span' color={pathDirect === item?.href ? '#fff' : 'inherit'}>
            {item.title}</Typography>
        </Link>
      </MenuItem>


    );
  });
};

const SidebarItems = () => {
  const location = useLocation();
  const pathDirect = location.pathname;

  return (
    <Box sx={{ px: "24px", overflowX: 'hidden' }}>
      <MUI_Sidebar width={"100%"} showProfile={false} themeColor={"#1e4db7"} themeSecondaryColor={'#1a97f51a'}>
        <Box sx={{ margin: "0 -24px" }}>
          {/* <Logo img={logoicn} component={NavLink} to="/"></Logo> */}
        </Box>
        {renderMenuItems(Menuitems, pathDirect)}
      </MUI_Sidebar>
  
    </Box>
  );
};

export default SidebarItems;

