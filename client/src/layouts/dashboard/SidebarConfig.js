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
