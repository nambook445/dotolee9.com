// component
import Iconify from '../../components/Iconify';
// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const unLoginedConfig = [
  {
    title: 'dashboard',
    path: '/app',
    icon: getIcon('eva:pie-chart-2-fill')
  },
  {
    title: 'paper',
    path: '/paper',
    icon: getIcon('jam:pen-f')
  },
  {
    title: 'blog',
    path: '/blog',
    icon: getIcon('eva:file-text-fill')
  },
  {
    title: 'login',
    path: '/login',
    icon: getIcon('eva:lock-fill')
  },
  {
    title: 'register',
    path: '/register',
    icon: getIcon('eva:person-add-fill')
  },
  // 404 페이지
  // ,
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon('eva:alert-triangle-fill')
  // },
  // 프로덕트 페이지 책추천 api있으면 시도해볼듯
  // {
  //   title: 'product',
  //   path: '/dashboard/products',
  //   icon: getIcon('eva:shopping-bag-fill')
  // },
  // 회원정보 관리 페이지로 사용해보자
  // {
  //   title: 'user',
  //   path: '/dashboard/user',
  //   icon: getIcon('eva:people-fill')
  // },
];

const loginedConfig = [
  {
    title: 'dashboard',
    path: '/app',
    icon: getIcon('eva:pie-chart-2-fill')
  },
  {
    title: 'paper',
    path: '/paper',
    icon: getIcon('jam:pen-f')
  },
  {
    title: 'blog',
    path: '/blog',
    icon: getIcon('eva:file-text-fill')
  },
  {
    title: 'profile',
    path: '/profile',
    icon: getIcon('eva:person-fill')
  }
];
export { loginedConfig };
export { unLoginedConfig };
