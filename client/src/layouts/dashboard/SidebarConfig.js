// component
import Iconify from '../../components/Iconify';
// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const sidebarConfig = [
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
  // login 과 resister는 redux 도입 후에 로그인 상태 여부에 따라 렌더링 할 예정
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
  {
    title: 'profile',
    path: '/profile',
    icon: getIcon('eva:person-fill')
  }
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

export default sidebarConfig;
