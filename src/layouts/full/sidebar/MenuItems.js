
import { uniqueId } from 'lodash';

import {
  IconCopy, IconLayoutDashboard, IconMoodHappy, IconTypography,
  IconAward,
  IconBoxMultiple,
  IconPoint,
  IconAlertCircle,
  IconNotes,
  IconCalendar,
  IconMail,
  IconTicket,
  IconEdit,
  IconCurrencyDollar,
  IconApps,
  IconFileDescription,
  IconFileDots,
  IconFiles,
  IconBan,
  IconStar,
  IconMoodSmile,
  IconBorderAll,
  IconBorderHorizontal,
  IconBorderInner,
  IconBorderVertical,
  IconBorderTop,
  IconUserCircle,
  IconPackage,
  IconMessage2,
  IconBasket,
  IconChartLine,
  IconChartArcs,
  IconChartCandle,
  IconChartArea,
  IconChartDots,
  IconChartDonut3,
  IconChartRadar,
  IconLogin,
  IconUserPlus,
  IconRotate,
  IconBox,
  IconShoppingCart,
  IconAperture,
  IconLayout,
  IconSettings,
  IconHelp,
  IconZoomCode,
  IconBoxAlignBottom,
  IconBoxAlignLeft,
  IconBorderStyle2,
  IconAppWindow,
  IconNotebook,
  IconFileCheck,
  IconChartHistogram,
  IconChartPie,
  IconChartScatter,
  IconChartPpf,
  IconChartArcs3,
  IconListTree,
  IconLayoutSidebar,
  IconLock, IconAlignBoxLeftBottom, IconCheckbox, IconRadar, IconSlideshow, IconCaretUpDown, IconTable,
  IconForms,
  IconUser
} from '@tabler/icons-react';


const Menuitems = [
  {
    id: uniqueId(),
    title: 'Bảng điều khiển',
    icon: IconLayoutDashboard,
    href: '/dashboard',
  },

  // {
  //   id: uniqueId(),
  //   title: 'Analytical',
  //   icon: IconChartPie,
  //   href: 'https://flexy-react-main.netlify.app/dashboards/analytical',
  //   chip: 'Pro',
  //   chipColor: 'secondary',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'eCommerce',
  //   icon: IconShoppingCart,
  //   href: 'https://flexy-react-main.netlify.app/dashboards/ecommerce',
  //   chip: 'Pro',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Modern',
  //   icon: IconAperture,
  //   href: 'https://flexy-react-main.netlify.app/dashboards/modern',
  //   chip: 'Pro',
  // },
  {
    id: uniqueId(),
    title: 'Quản lý sản phẩm',
    icon: IconAppWindow,
    href: '',

    children: [
      {
        id: uniqueId(),
        title: 'Danh sách sản phẩm',
        icon: IconPoint,
        href: '',

      },
      {
        id: uniqueId(),
        title: 'Danh sách danh mục',
        icon: IconPoint,
        href: '',

      },
      {
        id: uniqueId(),
        title: 'Thuộc tính sản phẩm',
        icon: IconPoint,
        href: '',
      },
      // {
      //   id: uniqueId(),
      //   title: 'StatusPage',
      //   icon: IconPoint,
      //   href: '',

      // },

    ],
  },
  // {
  //   navlabel: true,
  //   subheader: 'Utilities',
  // },
  {
    id: uniqueId(),
    title: 'Quản lý nhân viên',
    icon: IconUser,
    href: '/form-elements/autocomplete',
  },
  {
    id: uniqueId(),
    title: 'Quản lý đơn hàng',
    icon: IconBasket,
    href: '/form-elements/button',
  },
  // {
  //   id: uniqueId(),
  //   title: 'Checkbox',
  //   icon: IconCheckbox,
  //   href: '/form-elements/checkbox',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Radio',
  //   icon: IconRadar,
  //   href: '/form-elements/radio',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Slider',
  //   icon: IconSlideshow,
  //   href: '/form-elements/slider',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Switch',
  //   icon: IconCaretUpDown,
  //   href: '/form-elements/switch',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Tables',
  //   icon: IconTable,
  //   href: '/tables/basic-table',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Form Layouts',
  //   icon: IconForms,
  //   href: '/form-layouts',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Sample Page',
  //   icon: IconAperture,
  //   href: '/sample-page',
  // },
  // {
  //   navlabel: true,
  //   subheader: 'Apps',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Contacts',
  //   icon: IconPackage,
  //   chipColor: 'secondary',
  //   href: 'https://flexy-react-main.netlify.app/apps/contacts',
  //   chip: 'Pro',
  // },


  // {
  //   id: uniqueId(),
  //   title: 'Chats',
  //   icon: IconMessage2,
  //   href: 'https://flexy-react-main.netlify.app/apps/chats',
  //   chip: 'Pro',
  // },

  // {
  //   id: uniqueId(),
  //   title: 'Notes',
  //   icon: IconNotes,
  //   href: 'https://flexy-react-main.netlify.app/apps/notes',
  //   chip: 'Pro',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Calendar',
  //   icon: IconCalendar,
  //   href: 'https://flexy-react-main.netlify.app/apps/calendar',
  //   chip: 'Pro',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Email',
  //   icon: IconMail,
  //   href: 'https://flexy-react-main.netlify.app/apps/email',
  //   chip: 'Pro',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Tickets',
  //   icon: IconTicket,
  //   href: 'https://flexy-react-main.netlify.app/apps/tickets',
  //   chip: 'Pro',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Kanban',
  //   icon: IconNotebook,
  //   href: 'https://flexy-react-main.netlify.app/apps/kanban',
  //   chip: 'Pro',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Users',
  //   icon: IconUserCircle,
  //   href: 'https://flexy-react-main.netlify.app/user-profile',
  //   chip: 'Pro',
  //   children: [
  //     {
  //       id: uniqueId(),
  //       title: 'Profile',
  //       icon: IconPoint,
  //       href: 'https://flexy-react-main.netlify.app/user-profile',

  //       chip: 'Pro',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Followers',
  //       icon: IconPoint,
  //       href: 'https://flexy-react-main.netlify.app/apps/followers',

  //       chip: 'Pro',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Friends',
  //       icon: IconPoint,
  //       href: 'https://flexy-react-main.netlify.app/apps/friends',

  //       chip: 'Pro',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Gallery',
  //       icon: IconPoint,
  //       href: 'https://flexy-react-main.netlify.app/apps/gallery',

  //       chip: 'Pro',
  //     },
  //   ],
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Blog',
  //   icon: IconChartDonut3,
  //   href: 'https://flexy-react-main.netlify.app/frontend-pages/blog/',
  //   chip: 'Pro',
  //   children: [
  //     {
  //       id: uniqueId(),
  //       title: 'Posts',
  //       icon: IconPoint,
  //       href: 'https://flexy-react-main.netlify.app/frontend-pages/blog/',

  //       chip: 'Pro',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Detail',
  //       icon: IconPoint,
  //       href: 'https://flexy-react-main.netlify.app/frontend-pages/blog/detail/streaming-video-way-before-it-was-cool-go-dark-tomorrow',

  //       chip: 'Pro',
  //     },
  //   ],
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Ecommerce',
  //   icon: IconBasket,
  //   href: 'https://flexy-react-main.netlify.app/apps/ecommerce/',
  //   chip: 'Pro',
  //   children: [
  //     {
  //       id: uniqueId(),
  //       title: 'Shop',
  //       icon: IconPoint,
  //       href: 'https://flexy-react-main.netlify.app/apps/ecommerce/shop',

  //       chip: 'Pro',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Detail',
  //       icon: IconPoint,
  //       href: 'https://flexy-react-main.netlify.app/apps/ecommerce/detail/1',

  //       chip: 'Pro',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'List',
  //       icon: IconPoint,
  //       href: 'https://flexy-react-main.netlify.app/apps/ecommerce/eco-product-list',

  //       chip: 'Pro',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Checkout',
  //       icon: IconPoint,
  //       href: 'https://flexy-react-main.netlify.app/apps/ecommerce/eco-checkout',

  //       chip: 'Pro',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Add Product',
  //       icon: IconPoint,
  //       href: 'https://flexy-react-main.netlify.app/apps/ecommerce/add-product',

  //       chip: 'Pro',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Edit Product',
  //       icon: IconPoint,
  //       href: 'https://flexy-react-main.netlify.app/apps/ecommerce/edit-product',

  //       chip: 'Pro',
  //     },
  //   ],
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Invoice',
  //   icon: IconFileCheck,
  //   href: 'https://flexy-react-main.netlify.app/apps/invoice/list',
  //   chip: 'Pro',
  //   children: [
  //     {
  //       id: uniqueId(),
  //       title: 'List',
  //       icon: IconPoint,
  //       href: 'https://flexy-react-main.netlify.app/apps/invoice/list',

  //       chip: 'Pro',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Details',
  //       icon: IconPoint,
  //       href: 'https://flexy-react-main.netlify.app/apps/invoice/detail/PineappleInc',

  //       chip: 'Pro',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Create',
  //       icon: IconPoint,
  //       href: 'https://flexy-react-main.netlify.app/apps/invoice/create',

  //       chip: 'Pro',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Edit',
  //       icon: IconPoint,
  //       href: 'https://flexy-react-main.netlify.app/apps/invoice/edit/PineappleInc',

  //       chip: 'Pro',
  //     },
  //   ],
  // },

  // {
  //   navlabel: true,
  //   subheader: 'Pages',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Pages',
  //   icon: IconLayoutSidebar,
  //   href: 'https://flexy-react-main.netlify.app/pages/pricing',
  //   chip: 'Pro',
  //   children: [
  //     {
  //       id: uniqueId(),
  //       title: 'Pricing',
  //       icon: IconCurrencyDollar,
  //       href: 'https://flexy-react-main.netlify.app/pages/pricing',
  //       chip: 'Pro',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Account Setting',
  //       icon: IconUserCircle,
  //       href: 'https://flexy-react-main.netlify.app/pages/account-settings',
  //       chip: 'Pro',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'FAQ',
  //       icon: IconHelp,
  //       href: 'https://flexy-react-main.netlify.app/pages/faq',
  //       chip: 'Pro',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Landingpage',
  //       icon: IconAppWindow,
  //       href: 'https://flexy-react-main.netlify.app/landingpage',
  //       chip: 'Pro',
  //     },
  //   ]
  // },

  // {
  //   id: uniqueId(),
  //   title: 'Widgets',
  //   icon: IconLayout,
  //   href: 'https://flexy-react-main.netlify.app/widgets/cards',
  //   chip: 'Pro',
  //   children: [
  //     {
  //       id: uniqueId(),
  //       title: 'Cards',
  //       icon: IconPoint,
  //       href: 'https://flexy-react-main.netlify.app/widgets/cards',

  //       chip: 'Pro',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Banners',
  //       icon: IconPoint,
  //       href: 'https://flexy-react-main.netlify.app/widgets/banners',

  //       chip: 'Pro',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Charts',
  //       icon: IconPoint,
  //       href: 'https://flexy-react-main.netlify.app/widgets/charts',

  //       chip: 'Pro',
  //     },
  //   ],
  // },
  // {
  //   navlabel: true,
  //   subheader: 'Forms',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Form Elements',
  //   icon: IconApps,
  //   href: 'https://flexy-react-main.netlify.app/forms/form-elements/autocomplete',
  //   chip: 'Pro',
  //   children: [
  //     {
  //       id: uniqueId(),
  //       title: 'Autocomplete',
  //       icon: IconPoint,
  //       href: 'https://flexy-react-main.netlify.app/forms/form-elements/autocomplete',

  //       chip: 'Pro',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Button',
  //       icon: IconPoint,
  //       href: 'https://flexy-react-main.netlify.app/forms/form-elements/button',

  //       chip: 'Pro',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Checkbox',
  //       icon: IconPoint,
  //       href: 'https://flexy-react-main.netlify.app/forms/form-elements/checkbox',

  //       chip: 'Pro',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Radio',
  //       icon: IconPoint,
  //       href: 'https://flexy-react-main.netlify.app/forms/form-elements/radio',

  //       chip: 'Pro',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Date Time',
  //       icon: IconPoint,
  //       href: 'https://flexy-react-main.netlify.app/forms/form-elements/date-time',

  //       chip: 'Pro',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Slider',
  //       icon: IconPoint,
  //       href: 'https://flexy-react-main.netlify.app/forms/form-elements/slider',

  //       chip: 'Pro',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Switch',
  //       icon: IconPoint,
  //       href: 'https://flexy-react-main.netlify.app/forms/form-elements/switch',

  //       chip: 'Pro',
  //     },
  //   ],
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Form Layout',
  //   icon: IconFileDescription,
  //   href: 'https://flexy-react-main.netlify.app/forms/form-layouts',
  //   chip: 'Pro',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Form Horizontal',
  //   icon: IconBoxAlignBottom,
  //   href: 'https://flexy-react-main.netlify.app/forms/form-horizontal',
  //   chip: 'Pro',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Form Vertical',
  //   icon: IconBoxAlignLeft,
  //   href: 'https://flexy-react-main.netlify.app/forms/form-vertical',
  //   chip: 'Pro',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Form Custom',
  //   icon: IconFileDots,
  //   href: 'https://flexy-react-main.netlify.app/forms/form-custom',
  //   chip: 'Pro',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Form Wizard',
  //   icon: IconFiles,
  //   href: 'https://flexy-react-main.netlify.app/forms/form-wizard',
  //   chip: 'Pro',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Form Validation',
  //   icon: IconFiles,
  //   href: 'https://flexy-react-main.netlify.app/forms/form-validation',
  //   chip: 'Pro',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Tiptap Editor',
  //   icon: IconEdit,
  //   href: 'https://flexy-react-main.netlify.app/forms/form-tiptap',
  //   chip: 'Pro',
  // },
  // {
  //   navlabel: true,
  //   subheader: 'Tables',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Tables',
  //   icon: IconBorderAll,
  //   href: 'https://flexy-react-main.netlify.app/tables/basic',
  //   chip: 'Pro',
  //   children: [
  //     {
  //       id: uniqueId(),
  //       title: 'Basic',
  //       icon: IconBorderAll,
  //       href: 'https://flexy-react-main.netlify.app/tables/basic',
  //       chip: 'Pro',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Collapsible',
  //       icon: IconBorderHorizontal,
  //       href: 'https://flexy-react-main.netlify.app/tables/collapsible',
  //       chip: 'Pro',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Enhanced',
  //       icon: IconBorderInner,
  //       href: 'https://flexy-react-main.netlify.app/tables/enhanced',
  //       chip: 'Pro',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Fixed Header',
  //       icon: IconBorderVertical,
  //       href: 'https://flexy-react-main.netlify.app/tables/fixed-header',
  //       chip: 'Pro',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Pagination',
  //       icon: IconBorderTop,
  //       href: 'https://flexy-react-main.netlify.app/tables/pagination',
  //       chip: 'Pro',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Search',
  //       icon: IconBorderStyle2,
  //       href: 'https://flexy-react-main.netlify.app/tables/search',
  //       chip: 'Pro',
  //     },
  //   ]
  // },

  // {
  //   id: uniqueId(),
  //   title: 'React Table',
  //   icon: IconBorderStyle2,
  //   href: 'https://flexy-react-main.netlify.app/react-tables/basic',
  //   chip: 'Pro',
  //   children: [
  //     {
  //       id: uniqueId(),
  //       title: 'Basic',
  //       icon: IconPoint,
  //       href: 'https://flexy-react-main.netlify.app/react-tables/basic',

  //       chip: 'Pro',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Dense',
  //       icon: IconPoint,
  //       href: 'https://flexy-react-main.netlify.app/react-tables/dense',

  //       chip: 'Pro',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Filter',
  //       icon: IconPoint,
  //       href: 'https://flexy-react-main.netlify.app/react-tables/filter',

  //       chip: 'Pro',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Row Selection',
  //       icon: IconPoint,
  //       href: 'https://flexy-react-main.netlify.app/react-tables/row-selection',

  //       chip: 'Pro',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Pagination',
  //       icon: IconPoint,
  //       href: 'https://flexy-react-main.netlify.app/react-tables/pagination',

  //       chip: 'Pro',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Sorting',
  //       icon: IconPoint,
  //       href: 'https://flexy-react-main.netlify.app/react-tables/sorting',

  //       chip: 'Pro',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Column Visibility',
  //       icon: IconPoint,
  //       href: 'https://flexy-react-main.netlify.app/react-tables/column-visiblity',

  //       chip: 'Pro',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Editable',
  //       icon: IconPoint,
  //       href: 'https://flexy-react-main.netlify.app/react-tables/editable',

  //       chip: 'Pro',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Expanding',
  //       icon: IconPoint,
  //       href: 'https://flexy-react-main.netlify.app/react-tables/expanding',

  //       chip: 'Pro',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Sticky',
  //       icon: IconPoint,
  //       href: 'https://flexy-react-main.netlify.app/react-tables/sticky',

  //       chip: 'Pro',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Empty',
  //       icon: IconPoint,
  //       href: 'https://flexy-react-main.netlify.app/react-tables/empty',

  //       chip: 'Pro',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Drag & Drop',
  //       icon: IconPoint,
  //       href: 'https://flexy-react-main.netlify.app/react-tables/drag-drop',

  //       chip: 'Pro',
  //     },
  //   ],
  // },
  // {
  //   navlabel: true,
  //   subheader: 'Mui Charts',
  // },

  // {
  //   id: uniqueId(),
  //   title: 'BarCharts',
  //   icon: IconChartHistogram,
  //   href: 'https://flexy-react-main.netlify.app/muicharts/barcharts',
  //   chip: 'Pro',
  // },

  // {
  //   id: uniqueId(),
  //   title: 'PieCharts',
  //   icon: IconChartPie,
  //   href: 'https://flexy-react-main.netlify.app/muicharts/piecharts',
  //   chip: 'Pro',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'ScatterCharts',
  //   icon: IconChartScatter,
  //   href: 'https://flexy-react-main.netlify.app/muicharts/scattercharts',
  //   chip: 'Pro',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'SparklineCharts',
  //   icon: IconChartPpf,
  //   href: 'https://flexy-react-main.netlify.app/muicharts/sparklinecharts',
  //   chip: 'Pro',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'GaugeCharts',
  //   icon: IconChartArcs3,
  //   href: 'https://flexy-react-main.netlify.app/muicharts/gaugecharts',
  //   chip: 'Pro',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'LineCharts',
  //   icon: IconChartLine,
  //   href: 'https://flexy-react-main.netlify.app/muicharts/linecharts/line',
  //   chip: 'Pro',
  //   children: [
  //     {
  //       id: uniqueId(),
  //       title: 'Lines',
  //       icon: IconPoint,
  //       href: 'https://flexy-react-main.netlify.app/muicharts/linecharts/line',

  //       chip: 'Pro',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Area',
  //       icon: IconPoint,
  //       href: 'https://flexy-react-main.netlify.app/muicharts/linecharts/area',

  //       chip: 'Pro',
  //     },
  //   ],
  // },
  // {
  //   navlabel: true,
  //   subheader: 'Mui Trees',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'SimpleTreeView',
  //   icon: IconListTree,
  //   href: 'https://flexy-react-main.netlify.app/mui-trees/simpletree/simpletree-items',
  //   chip: 'Pro',
  //   children: [
  //     {
  //       id: uniqueId(),
  //       title: 'Items',
  //       icon: IconPoint,
  //       href: 'https://flexy-react-main.netlify.app/mui-trees/simpletree/simpletree-items',

  //       chip: 'Pro',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Selection',
  //       icon: IconPoint,
  //       href: 'https://flexy-react-main.netlify.app/mui-trees/simpletree/simpletree-selection',

  //       chip: 'Pro',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Expansion',
  //       icon: IconPoint,
  //       href: 'https://flexy-react-main.netlify.app/mui-trees/simpletree/simpletree-expansion',

  //       chip: 'Pro',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Customization',
  //       icon: IconPoint,
  //       href: 'https://flexy-react-main.netlify.app/mui-trees/simpletree/simpletree-customization',

  //       chip: 'Pro',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Focus',
  //       icon: IconPoint,
  //       href: 'https://flexy-react-main.netlify.app/mui-trees/simpletree/simpletree-focus',

  //       chip: 'Pro',
  //     },
  //   ],
  // },
  // {
  //   navlabel: true,
  //   subheader: 'UI',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Ui Components',
  //   icon: IconBox,
  //   href: 'https://flexy-react-main.netlify.app/ui-components/alert',
  //   chip: 'Pro',
  //   children: [
  //     {
  //       id: uniqueId(),
  //       title: 'Alert',
  //       icon: IconPoint,
  //       href: 'https://flexy-react-main.netlify.app/ui-components/alert',

  //       chip: 'Pro',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Accordion',
  //       icon: IconPoint,
  //       href: 'https://flexy-react-main.netlify.app/ui-components/accordion',

  //       chip: 'Pro',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Avatar',
  //       icon: IconPoint,
  //       href: 'https://flexy-react-main.netlify.app/ui-components/avatar',

  //       chip: 'Pro',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Chip',
  //       icon: IconPoint,
  //       href: 'https://flexy-react-main.netlify.app/ui-components/chip',

  //       chip: 'Pro',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Dialog',
  //       icon: IconPoint,
  //       href: 'https://flexy-react-main.netlify.app/ui-components/dialog',

  //       chip: 'Pro',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'List',
  //       icon: IconPoint,
  //       href: 'https://flexy-react-main.netlify.app/ui-components/list',

  //       chip: 'Pro',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Popover',
  //       icon: IconPoint,
  //       href: 'https://flexy-react-main.netlify.app/ui-components/popover',

  //       chip: 'Pro',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Rating',
  //       icon: IconPoint,
  //       href: 'https://flexy-react-main.netlify.app/ui-components/rating',

  //       chip: 'Pro',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Tabs',
  //       icon: IconPoint,
  //       href: 'https://flexy-react-main.netlify.app/ui-components/tabs',

  //       chip: 'Pro',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Tooltip',
  //       icon: IconPoint,
  //       href: 'https://flexy-react-main.netlify.app/ui-components/tooltip',

  //       chip: 'Pro',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Transfer List',
  //       icon: IconPoint,
  //       href: 'https://flexy-react-main.netlify.app/ui-components/transfer-list',

  //       chip: 'Pro',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Typography',
  //       icon: IconPoint,
  //       href: 'https://flexy-react-main.netlify.app/ui-components/typography',

  //       chip: 'Pro',
  //     },
  //   ],
  // },

  // {
  //   navlabel: true,
  //   subheader: 'Charts',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Line',
  //   icon: IconChartLine,
  //   href: 'https://flexy-react-main.netlify.app/charts/line-chart',
  //   chip: 'Pro',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Gredient',
  //   icon: IconChartArcs,
  //   href: 'https://flexy-react-main.netlify.app/charts/gredient-chart',
  //   chip: 'Pro',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Area',
  //   icon: IconChartArea,
  //   href: 'https://flexy-react-main.netlify.app/charts/area-chart',
  //   chip: 'Pro',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Candlestick',
  //   icon: IconChartCandle,
  //   href: 'https://flexy-react-main.netlify.app/charts/candlestick-chart',
  //   chip: 'Pro',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Column',
  //   icon: IconChartDots,
  //   href: 'https://flexy-react-main.netlify.app/charts/column-chart',
  //   chip: 'Pro',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Doughtnut & Pie',
  //   icon: IconChartDonut3,
  //   href: 'https://flexy-react-main.netlify.app/charts/doughnut-pie-chart',
  //   chip: 'Pro',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'RadialBar & Radar',
  //   icon: IconChartRadar,
  //   href: 'https://flexy-react-main.netlify.app/charts/radialbar-chart',
  //   chip: 'Pro',
  // },
  // {
  //   navlabel: true,
  //   subheader: 'Auth',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Login',
  //   icon: IconLogin,
  //   href: '/auth/login',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Register',
  //   icon: IconUserCircle,
  //   href: '/auth/register',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Auth Pages',
  //   icon: IconLock,
  //   href: '/auth/login',
  //   chip: 'Pro',
  //   children: [
  //     {
  //       id: uniqueId(),
  //       title: 'Side Login',
  //       icon: IconPoint,
  //       href: 'https://flexy-react-main.netlify.app/auth/login',
  //       chip: 'Pro',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Side Register',
  //       icon: IconPoint,
  //       href: 'https://flexy-react-main.netlify.app/auth/register',
  //       chip: 'Pro',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Forgot Pwd',
  //       icon: IconRotate,
  //       href: 'https://flexy-react-main.netlify.app/auth/forgot-password',
  //       chip: 'Pro',
  //       children: [
  //         {
  //           id: uniqueId(),
  //           title: 'Side Frt Pwd',
  //           icon: IconPoint,
  //           href: 'https://flexy-react-main.netlify.app/auth/forgot-password',
  //           chip: 'Pro',
  //         },
  //         {
  //           id: uniqueId(),
  //           title: 'Boxed Frt Pwd',
  //           icon: IconPoint,
  //           href: 'https://flexy-react-main.netlify.app/auth/forgot-password2',
  //           chip: 'Pro',
  //         },
  //       ],
  //     },

  //     {
  //       id: uniqueId(),
  //       title: 'Two Steps',
  //       icon: IconZoomCode,
  //       href: 'https://flexy-react-main.netlify.app/auth/two-steps',
  //       chip: 'Pro',
  //       children: [
  //         {
  //           id: uniqueId(),
  //           title: 'Side Two Steps',
  //           icon: IconPoint,
  //           href: 'https://flexy-react-main.netlify.app/auth/two-steps',
  //           chip: 'Pro',
  //         },
  //         {
  //           id: uniqueId(),
  //           title: 'Boxed Two Steps',
  //           icon: IconPoint,
  //           href: 'https://flexy-react-main.netlify.app/auth/two-steps2',
  //           chip: 'Pro',
  //         },
  //       ],
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Error',
  //       icon: IconAlertCircle,
  //       href: 'https://flexy-react-main.netlify.app/400',
  //       chip: 'Pro',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Maintenance',
  //       icon: IconSettings,
  //       href: 'https://flexy-react-main.netlify.app/auth/maintenance',
  //       chip: 'Pro',
  //     },
  //   ]
  // },
  // {
  //   navlabel: true,
  //   subheader: 'Other',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Menu Level',
  //   icon: IconBoxMultiple,
  //   href: 'https://flexy-react-main.netlify.app/menulevel/',
  //   chip: 'Pro',
  //   children: [
  //     {
  //       id: uniqueId(),
  //       title: 'Level 1',
  //       icon: IconPoint,
  //       href: 'https://flexy-react-main.netlify.app/l1',
  //       chip: 'Pro',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Level 1.1',
  //       icon: IconPoint,
  //       href: 'https://flexy-react-main.netlify.app/l1.1',

  //       chip: 'Pro', children: [
  //         {
  //           id: uniqueId(),
  //           title: 'Level 2',
  //           icon: IconPoint,
  //           href: 'https://flexy-react-main.netlify.app/l2',

  //           chip: 'Pro',
  //         },
  //         {
  //           id: uniqueId(),
  //           title: 'Level 2.1',
  //           icon: IconPoint,
  //           href: 'https://flexy-react-main.netlify.app/l2.1',

  //           chip: 'Pro', children: [
  //             {
  //               id: uniqueId(),
  //               title: 'Level 3',
  //               icon: IconPoint,
  //               href: 'https://flexy-react-main.netlify.app/l3',

  //               chip: 'Pro',
  //             },
  //             {
  //               id: uniqueId(),
  //               title: 'Level 3.1',
  //               icon: IconPoint,
  //               href: 'https://flexy-react-main.netlify.app/l3.1',

  //               chip: 'Pro',
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  // },

  // {
  //   id: uniqueId(),
  //   title: 'SubCaption',
  //   subtitle: 'This is the sutitle',
  //   icon: IconStar,
  //   href: 'https://flexy-react-main.netlify.app/',
  //   chip: 'Pro',
  // },

  // {
  //   id: uniqueId(),
  //   title: 'Chip',
  //   icon: IconAward,
  //   href: 'https://flexy-react-main.netlify.app/',
  //   chip: 'Pro',
  //   chipColor: 'primary',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Outlined',
  //   icon: IconMoodSmile,
  //   href: 'https://flexy-react-main.netlify.app/',
  //   chip: 'Pro',
  //   variant: 'outlined',
  //   chipColor: 'primary',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'External Link',
  //   external: true,
  //   icon: IconStar,
  //   href: 'https://google.com',
  //   chip: 'Pro',
  // },

];

export default Menuitems;
