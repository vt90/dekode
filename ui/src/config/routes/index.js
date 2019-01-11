import Loadable from 'react-loadable';
import Loading from 'components/Loading';

const AddressList = Loadable({
    loader: () => import('containers/Address/List'),
    loading: Loading,
});

const AddressDetail = Loadable({
    loader: () => import('containers/Address/Details'),
    loading: Loading,
});

const isRouteAvailable = (route, userInfo) => (route.isAvailable === undefined || route.isAvailable(userInfo));

const routes = [
    {
        path: '/address/:address',
        exact: true,
        component: AddressDetail,
        isAvailable: () => true,
    },
    {
        path: '/',
        exact: true,
        component: AddressList,
        isAvailable: () => true,
    },
];

export const getApplicationRoutes = (userInfo) => {
    return routes.filter((route) => isRouteAvailable(route, userInfo));
};