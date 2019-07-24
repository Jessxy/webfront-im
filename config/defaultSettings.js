module.exports = {
  title: 'ZBT-物流系统',
  pwa: true,
  navTheme: 'dark',                         // 主题导航菜单 params:'light' or  'dark'
  primaryColor: '#1890FF',                  // 标准色(全局主色) 
  layout: 'sidemenu',                       // 导航菜单位置 params: sidemenu or topmenu
  contentWidth: 'Fluid',                    // 内容布局 params: Fluid or Fixed ,仅当布局为TopMenu时才有效
  fixedHeader: true,                        // sticky header
  autoHideHeader: true,                     // auto hide header
  fixSiderbar: false,                       // 是否固定侧边
  menu: { disableLocal: false },            //菜单是否禁止使用国际化
  // 自定义IConfont符号脚本URL
  // eg：//at.alicdn.com/t/font_1039637_btcrd5co4w.js
  // 注意：如果需要图标多色，Iconfont 图标项目里要进行批量去色处理
  // Usage: https://github.com/ant-design/ant-design-pro/pull/3517
  iconfontUrl: '',
  //------------------   分割线    ----------------------------
  linkColor: '#1890ff',                                                  //链接色
  successColor: '#52c41a',                                               //成功色
  warningColor: '#faad14',                                               //警告色
  errorColor: '#f5222d',                                                 //错误色
  fontSizeBase: '14px',                                                  //主字号
  headingColor: 'rgba(0, 0, 0, 0.75)',                                   //标题色
  textColor: 'rgba(0, 0, 0, 0.75)',                                      //主文本色
  textColorSecondary: 'rgba(0, 0, 0, 0.65)',                             //次文本色
  disabledColor: 'rgba(0, 0, 0, .35)',                                   //失效色
  borderRadiusBase: '4px',                                               //组件/浮层圆角
  borderColorBase: '#d9d9d9',                                            //边框色
  boxShadowBase: '0 2px 8px rgba(0, 0, 0, 0.15)',                        //浮层阴影
  collapse: true,                                                        // 设置后是否关闭设置抽屉
};
