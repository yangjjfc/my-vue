const MENU = [{
    name: '首页',
    icon: 'el-icon-message',
    state: '/charts'
}, {
    name: '客户管理',
    icon: 'el-icon-menu',
    son: [
        {
            name: '客户列表',
            state: '/customerList'
        },
        {
            name: '新客户',
            state: '/newCustomer'
        }
    ]
}];
export default MENU;
