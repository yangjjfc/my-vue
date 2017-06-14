const dashboard = r => require.ensure([], () => r(require('../pages/dashboard/Dashboard')), 'dashboard');
const customerList = r => require.ensure([], () => r(require('../pages/hospital/customer-list/customer-list')), 'customerList'); // 医院管理-客户列表
const newCustomer = r => require.ensure([], () => r(require('../pages/hospital/new-customer/new-customer')), 'newCustomer'); // 医院管理-客户列表
const charts = r => require.ensure([], () => r(require('../pages/echarts/echarts')), 'charts');
const account = r => require.ensure([], () => r(require('../pages/enterprise/account/account')), 'account');
import Auth from '../pages/auth/Auth';
export default [
    {
        path: '/', redirect: '/auth'
    },
    {
        path: '/auth',
        name: 'auth',
        component: Auth
    }, {
        path: '/dashboard',
        name: 'dashboard',
        component: dashboard,
        children: [
            { path: '/customerList', component: customerList, name: 'customerList' },
            { path: '/charts', component: charts, name: 'charts' },
            { path: '/newCustomer', component: newCustomer, name: 'newCustomer' },
            { path: '/account', component: account, name: 'account' }
        ]
    }
];

