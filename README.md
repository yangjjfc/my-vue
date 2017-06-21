# fed-vue2

> 基于ElementUi + vue2 + axios + vuex + vue-router 的前端脚手架项目   

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## todo 要做的东西
> 文件上传 + 预览   √

> doshboard 主面板的布局，功能整合 √

> 表格树控件

> 登录以及验证用户相关 √

> 弹出框 daulog √

> 时间组件 √

> 地址组件 √

> 分页组件 √

> 权限控制 √


## eslint 代码检测工具
在visual下使用时,在文件-设置-visualcode下修改报错后自动格式化文件
更目录下.eslintigonre文件中可配置需要忽略的文件,不然很多引用的插件有报错 

# 项目布局

```
.
├── build                                       // webpack配置文件
├── config                                      // 项目打包路径
├── elm                                         // 上线项目文件，放在服务器即可正常访问
├── src                                         // 源码目录
|   ├── assets                                  // 资源
│   │   ├── images                              // 项目图片目录
│   │   ├── js                                  // 第三方插件
│   │   ├── style                               // 公共样式
│   ├── components                              // 组件
│   │   ├── Dailog.vue                          // 弹框组件
│   │   ├── dataPicker.vue                      // 时间组件
│   │   ├── FileUpload.vue                      // 图片上传组件
│   │   ├── global.common.js                    // 公共的js方法
│   │   ├── pagination.vue                      // 分页组件
│   │   ├── address                             // 地址目录
│   │   │   ├── ReginPicker.vue                 // 地址组件
│   ├── config                                  // 基本配置
│   │   ├── app.config.js                       // 项目配置文件
│   │   ├── menu.js                             // 菜单地址
│   ├── directive                               // 自定义指令目录
│   │   │   ├── vueDirective.vue                // 自定义指令
│   ├── pages                                   // 页面
│   │   ├── auth
│   │   │   ├── auth.vue                        // 登录页面
│   │   │   └── img                             // 登录页面相关图片
│   │   ├── dashboard                          
│   │   │   ├── dashboard.vue                   // 所有页面的父组件
│   │   ├── echarts                 
│   │   │   └── echarts.vue                     // index页
│   │   ├── enterprise
│   │   │   ├── account
│   │   │   │   ├── account.vue                 // 账户管理页
│   │   │   │   ├── mods
│   │   │   │   │   ├── changeEmail.vue         // 更改邮箱
│   │   │   │   │   └── changeName.vue          // 更改名字
│   │   │   │   │   └── changePasswd.vue        // 更改密码
│   │   │   │   │   └── changePhone.vue         // 更改电话
│   │   │   │   │   └── viewDailog.vue          // 登入日志
│   │   │   └── staff                           
│   │   │   │   ├── staff.vue                   // 员工管理页
│   │   │   │   ├── mods
│   │   │   │   │   ├── addUser.vue             // 添加用户/编辑用户
│   │   │   │   │   ├── authHospital.vue        // 启用/禁用
│   │   │   │   │   ├── orderSpeciallist.vue    // 设置订单专员
│   │   │   │   │   ├── permission.vue          // 设置权限
│   │   ├── hospital
│   │   │   └── customer-list                  
│   │   │   │   ├── customer-list.vue           // 客户列表
│   │   │   │   ├── mods
│   │   │   │   │   ├── addUser.vue             // 添加用户
│   │   │   │   │   ├── eidtUser.vue            // 编辑用户
│   │   │   │   │   ├── relieve.vue             // 解除关系
│   │   │   └── new-customer                  
│   │   │   │   ├── new-customer.vue            // 新客户
│   ├── router
│   │   └── index.js                            // 配置组件路由
│   │   └── router.js                           // 路由配置
│   ├── service                                 // 数据交互统一调配
│   │   ├── Http.js                             // axios配置
│   │   └── interceptor.js                      // axios拦截器
│   │   └── iview-config.js                     // iview配置
│   │   └── sweetalert.js                       // alert2配置
│   ├── store                                   // vuex的状态管理
│   │   ├── action.js                           // 配置actions
│   │   ├── getters.js                          // 配置getters
│   │   ├── index.js                            // 引用vuex，创建store
│   │   ├── modules                             // store模块
│   │   ├── mutation-types.js                   // 定义常量muations名
│   │   └── mutations.js                        // 配置mutations
│   ├── App.vue                                 // 页面入口文件
│   ├── main.js                                 // 程序入口文件，加载各种公共组件
├── favicon.ico                                 // 图标
├── index.html                                  // 入口html文件