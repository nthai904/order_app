import React, { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
// import PrivateRoute from '../components/auth/PrivateRoute';

/* ***Layouts**** */
const FullLayout = lazy(() => import('../layouts/full/FullLayout'));
const BlankLayout = lazy(() => import('../layouts/blank/BlankLayout'));
const UserLayout = lazy(() => import('../layouts/full/UserLayout'));

/* ****Admin Pages***** */
const Dashboard = lazy(() => import('../views/Admin/dashboard/Dashboard'));
const Product = lazy(() => import('../views/Admin/products/Product'));
const ElementProduct = lazy(() => import('../views/Admin/products/ElementProduct'));
const CatList = lazy(() => import('../views/Admin/products/CatList'));
const AddProduct = lazy(() => import('../views/Admin/products/components/AddProduct'));
const UpdateProduct = lazy(() => import('../views/Admin/products/components/UpdateProduct'));
const DetailProduct = lazy(() => import('../views/Admin/products/components/DetailProduct'));

const Order = lazy(() => import('../views/Admin/orders/Order'));
const User = lazy(() => import('../views/Admin/users/User'));
const BasicTable = lazy(() => import("../views/Admin/tables/BasicTable"));

/* ****User Pages***** */
const Homepage = lazy(() => import('../views/User/home/Homepage'));
const Cart = lazy(() => import('../views/User/cart/Cart'));
const ProductDetail = lazy(() => import('../views/User/detail/ProductDetail'));
const OrderStatus = lazy(() => import('../views/User/status/OrderStatus'));


const SamplePage = lazy(() => import('../views/sample-page/SamplePage'));
const Error = lazy(() => import('../views/authentication/Error'));
const Register = lazy(() => import('../views/authentication/Register'));
const Login = lazy(() => import('../views/authentication/Login'));


const ExAutoComplete = lazy(() =>
  import("../views/form-elements/ExAutoComplete")
);
const ExButton = lazy(() => import("../views/form-elements/ExButton"));
const ExCheckbox = lazy(() => import("../views/form-elements/ExCheckbox"));
const ExRadio = lazy(() => import("../views/form-elements/ExRadio"));
const ExSlider = lazy(() => import("../views/form-elements/ExSlider"));
const ExSwitch = lazy(() => import("../views/form-elements/ExSwitch"));
const FormLayouts = lazy(() => import("../views/form-layouts/FormLayouts"));

const Router = [
  {
    // path: '/',
    // element: <PrivateRoute />, 
    // children: [
    //   {
        path: '/',
        element: <FullLayout />,
        children: [
          { path: '/', element: <Navigate to="/dashboard" /> },
          { path: '/dashboard', exact: true, element: <Dashboard /> },
          { path: '/product', exact: true, element: <Product /> },
          { path: '/product/add', exact: true, element: <AddProduct /> },
          { path: '/product/edit/:id', exact: true, element: <UpdateProduct /> },
          { path: '/product/detail/:id', exact: true, element: <DetailProduct /> },
          { path: '/element-product', exact: true, element: <ElementProduct /> },
          { path: '/cat-list', exact: true, element: <CatList /> },
          { path: '/order', exact: true, element: <Order /> },
          { path: '/user', exact: true, element: <User /> },

          { path: '/sample-page', exact: true, element: <SamplePage /> },
          { path: "/tables/basic-table", element: <BasicTable /> },
          { path: "/form-layouts", element: <FormLayouts /> },
          { path: "/form-elements/autocomplete", element: <ExAutoComplete /> },
          { path: "/form-elements/button", element: <ExButton /> },
          { path: "/form-elements/checkbox", element: <ExCheckbox /> },
          { path: "/form-elements/radio", element: <ExRadio /> },
          { path: "/form-elements/slider", element: <ExSlider /> },
          { path: "/form-elements/switch", element: <ExSwitch /> },

          { path: '*', element: <Navigate to="/auth/404" /> },
        ],
      // },
    // ],
  },
  {
    path: '/admin',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: 'register', element: <Register /> },
      { path: '', element: <Login /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },

  {
    path: '/home',
    element: <UserLayout />,
    children: [
      { path: '/home', exact: true, element: <Homepage /> },
      { path: '/home/cart', exact: true, element: <Cart /> },
      { path: '/home/product-detail/:id', exact: true, element: <ProductDetail /> },
      { path: '/home/order-status', exact: true, element: <OrderStatus /> },
      { path: '*', element: <Navigate to="/home/404" /> },

    ],
  },
];

const router = createBrowserRouter(Router);

export default router;
