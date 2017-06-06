const MENU = [{
  name: '首页',
  icon: 'el-icon-message',
  son: [
    {
      name: '销售趋势',
      state: 'chart'
    },
    {
      name: '订单趋势',
      state: 'chart'
    }
  ]
}, {
  name: '企业信息',
  icon: 'el-icon-menu',
  son: [
    {
      name: '列表',
      state: 'table'
    },
    {
      name: '图片上传demo',
      state: 'File'
    }
  ]
}]
export default MENU