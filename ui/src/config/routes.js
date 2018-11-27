// import groupBy from 'lodash/groupBy';
import Loadable from 'react-loadable';
import Loading from '../components/Loading';

const AddressDetails = Loadable({
  loader: () => import('../containers/Address/Details'),
  loading: Loading,
});

const Dashboard = Loadable({
  loader: () => import('../containers/Dashboard'),
  loading: Loading,
});

// const isLoggedIn = (userInfo) => !!(userInfo);

const isRouteAvailable = (route, userInfo) => (route.isAvailable === undefined || route.isAvailable(userInfo));

// export const MENU_GROUPS = {
//   IDENTITY: 'Identity',
//   NOTARY: 'Notary',
//   ADMIN: 'Administration',
// };

const routes = [
  {
    path: '/address/:address',
    component: AddressDetails,
    exact: true,
    isAvailable: () => true,
  },
  {
    path: '/',
    exact: true,
    component: Dashboard,
    isAvailable: () => true,
  },
];

export const getApplicationRoutes = (userInfo) => {
  return routes.filter((route) => isRouteAvailable(route, userInfo));
};

// export const getMenuRoutes = (userInfo) => {
//   const availableMenuRoutes = getApplicationRoutes(userInfo).filter((route) => route.showInMenu);
//
//   const groupedRoutes = groupBy(availableMenuRoutes, 'parent');
//
//   let menuRoutes = [];
//
//   Object.keys(groupedRoutes)
//     .forEach(key => {
//       if (key === 'undefined') {
//         // here are the routes that have no parent
//         menuRoutes = [...menuRoutes, ...groupedRoutes[key]];
//       }
//       else {
//         menuRoutes = [...menuRoutes, {name: key, children: groupedRoutes[key]}];
//       }
//     });
//
//   return menuRoutes;
// };
