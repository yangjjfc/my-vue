const MENU = [{
    name: '首页',
    icon: 'el-icon-message',
    state: '/charts'
}, {
    name: '企业信息',
    icon: 'el-icon-menu',
    son: [
        {
            name: '账户管理',
            state: '/account'
        },
        {
            name: '企业信息',
            state: '/supplier'
        },
        {
            name: '员工管理',
            state: '/staff'
        },
        {
            name: '电子签章',
            state: '/signature'
        }
    ]
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
}, {
    name: '产品管理',
    icon: 'el-icon-menu',
    state: '/product'
}, {
    name: '证件管理',
    icon: 'el-icon-menu',
    son: [
        {
            name: '产品注册证',
            state: '/cert_register'
        },
        {
            name: '经销授权书',
            state: '/cert_auth'
        },
        {
            name: '生产厂商',
            state: '/cert_entrust'
        },
        {
            name: '法人委托书',
            state: '/signature'
        },
        {
            name: '销售承诺书',
            state: '/cert_promise'
        },
        {
            name: '证件过期提醒',
            state: '/cert_expire'
        }
    ]
}, {
    name: '配送订单',
    icon: 'el-icon-menu',
    state: '/logistic'
}, {
    name: '设备管理',
    icon: 'el-icon-menu',
    son: [
        {
            name: '设备合同',
            state: '/eqInfo'
        },
        {
            name: '设备列表',
            state: '/eqList'
        },
        {
            name: '设备统计',
            state: '/eqcount'
        },
        {
            name: '数据字典',
            state: '/dictionary'
        }
    ]
}, {
    name: '分销管理',
    icon: 'el-icon-menu',
    son: [
        {
            name: '分销订单',
            state: '/orderSales'
        },
        {
            name: '分销客户',
            state: '/sales_vendor'
        }
    ]
}, {
    name: '医院库存',
    icon: 'el-icon-menu',
    state: '/stock'
}, {
    name: '统计分析',
    icon: 'el-icon-menu',
    son: [
        {
            name: '销售统计',
            state: '/chart'
        }
    ]
}, {
    name: '消息提醒',
    icon: 'el-icon-menu',
    state: '/message'
}];
export default MENU;
