export default [
  //------------------ user -------------------------
  // name: 'dashboard',              //当前路由在菜单和面包屑中的名称
  // icon: 'dashboard',              //当前路由在菜单下的图标名
  // hideInMenu: true,               //当前路由在菜单中不展现，默认 false
  // hideChildrenInMenu: true,       //当前路由的子级在菜单中不展现，默认 false
  // hideInBreadcrumb: true,         //当前路由在面包屑中不展现，默认 false
  // authority: ['admin'],           //允许展示的权限，不设则都可见

  //我们把权限分为6个等级: guest(游客)==> user(有账号的用户)==> admin(普通管理员),
  // ==>systemadmin(系统管理员) ==> superadmin(超级管理员:老板专属) ==>hashlevel(散列等级,也可以称自定义等级)


  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/Login' },
      { path: '/user/register', name: 'register', component: './User/Register' },
      { path: '/user/register-result', name: 'register.result', component: './User/RegisterResult' },
      { component: '404' },
    ],
  },
  // ------------------  app  --------------------------

  {
    path: '/',
    component: '../layouts/BasicLayout',
    // Routes: ['src/pages/Authorized'],
    routes: [
      // dashboard
      // { path: '/', redirect: '/companyManage/businessPool', authority: ['admin', 'user'] }, //todo kim-stamp 权限设置
      { path: '/', redirect: '/workbench/messageCenter', authority: ['user', '/workbench/messageCenter'] }, //todo kim-stamp 用户登录后的默认路径


      // {
      //   name: 'dashboard',
      //   icon: 'dashboard',
      //   path: '/dashboard',
      //   authority: ['/dashboard'],
      //   routes: [
      //     {
      //       name: 'analysis',
      //       component: './Dashboard/Analysis',
      //       path: '/dashboard/analysis',
      //       authority: ['/dashboard/analysis'],
      //     },
      //     {
      //       name: 'users',
      //       component: './Dashboard/Analysis',
      //       path: '/dashboard/users',
      //       authority: ['/dashboard/users'],
      //
      //     },
      //     {
      //       name: 'monitor',
      //       component: './Dashboard/Monitor',
      //       path: '/dashboard/monitor',
      //       authority: ['/dashboard/monitor'],
      //     },
      //     {
      //       name: 'workplace',
      //       component: './Dashboard/Workplace',
      //       path: '/dashboard/workplace',
      //       authority: ['/dashboard/workplace'],
      //     },
      //   ],
      // },


      //workbench 工作台
      {
        name: 'workbench',
        icon: 'dashboard',
        path: '/workbench',
        authority: ['/workbench'],
        routes: [
          {
            name: 'messageCenter',
            component: './Dashboard/Analysis',
            path: '/workbench/messageCenter',
            authority: ['user', '/workbench/messageCenter'],
          },
        ],
      },


      //companyManage 境外供应商
      {
        name: 'companyManage',
        icon: 'customer-service',
        path: '/companyManage',
        authority: '/companyManage',
        routes: [
          {
            name: 'businessPool',
            component: './List/BasicList',
            path: '/companyManage/businessPool',
            authority: ['/companyManage/businessPool'],
          },
          {
            name: 'intendedCompany',
            component: './Forms/BasicForm',
            path: '/companyManage/intendedCompany',
            authority: '/companyManage/intendedCompany',
          },
          // {
          //   name: 'dealtCompany',
          //   component: './Forms/StepForm',
          //   path: '/companyManage/dealtCompany',
          //   authority: '/companyManage/dealtCompany',
          // },
          // {
          //   name: 'marketInfo',
          //   component: './Dashboard/Analysis',
          //   path: '/companyManage/marketInfo',
          //   authority: '/companyManage/marketInfo',
          // },

        ],
      },


      //costMaintenance 审核管理
      {
        name: 'costMaintenance',
        icon: 'read',
        path: '/costMaintenance',
        authority: '/costMaintenance',
        routes: [
          {
            name: 'declareFee',
            component: './Forms/StepForm',
            path: '/costMaintenance/declareFee',
            authority: '/costMaintenance/declareFee',
          },
          {
            name: 'trailerFee',
            component: './Dashboard/Analysis',
            path: '/costMaintenance/trailerFee',
            authority: '/costMaintenance/trailerFee',
          },
          {
            name: 'supplierFare',
            component: './Dashboard/Analysis',
            path: '/costMaintenance/supplierFare',
            authority: '/costMaintenance/supplierFare',
          },
          // {
          //   name: 'localFee',
          //   component: './Dashboard/Analysis',
          //   path: '/costMaintenance/localFee',
          //   authority: '/costMaintenance/localFee',
          // },
        ],
      },


      //profit  订单中心
      {
        name: 'profit',
        icon: 'read',
        path: '/profit',
        authority: '/profit',
        routes: [
          {
            name: 'declare',
            component: './Dashboard/Analysis',
            path: '/profit/declare',
            authority: '/profit/declare',
          },
          {
            name: 'trailer',
            component: './Dashboard/Analysis',
            path: '/profit/trailer',
            authority: '/profit/trailer',
          },
          // {
          //   name: 'freight',
          //   component: './Dashboard/Analysis',
          //   path: '/profit/freight',
          //   authority: '/profit/freight',
          // },
        ],
      },


      //logisticsOrder 资金管理
      {
        icon: 'read',
        name: 'logisticsOrder',
        path: '/logisticsOrder',
        authority: '/logisticsOrder',
        routes: [
          {
            name: 'deliveryReceipt',
            component: './Dashboard/Analysis',
            path: '/logisticsOrder/deliveryReceipt',
            authority: '/logisticsOrder/deliveryReceipt',
          },

          {
            name: 'orderQueryBus',
            component: './Dashboard/Analysis',
            path: '/logisticsOrder/orderQueryBus',
            authority: '/logisticsOrder/orderQueryBus',
          },

          {
            name: 'acceptOrders',
            component: './Dashboard/Analysis',
            path: '/logisticsOrder/acceptOrders',
            authority: '/logisticsOrder/acceptOrders',
          },
          //
          // {
          //   name: 'orderQueryOpe',
          //   component: './Dashboard/Analysis',
          //   path: '/logisticsOrder/orderQueryOpe',
          //   authority: '/logisticsOrder/orderQueryOpe',
          // },
          // {
          //   name: 'quickBooking',
          //   component: './Dashboard/Analysis',
          //   path: '/logisticsOrder/quickBooking',
          //   authority: '/logisticsOrder/quickBooking',
          // },
          // {
          //   name: 'revenue',
          //   component: './Dashboard/Analysis',
          //   path: '/logisticsOrder/revenue',
          //   authority: '/logisticsOrder/revenue',
          // },
          // {
          //   name: 'batchVerificate',
          //   component: './Dashboard/Analysis',
          //   path: '/logisticsOrder/batchVerificate',
          //   authority: '/logisticsOrder/batchVerificate',
          // }, {
          //   name: 'onlineBooking',
          //   component: './Dashboard/Analysis',
          //   path: '/logisticsOrder/onlineBooking',
          //   authority: '/logisticsOrder/onlineBooking',
          // },
        ],
      },


      //quotationSupport 基础数据
      {
        icon: 'read',
        name: 'quotationSupport',
        path: '/quotationSupport',
        authority: '/quotationSupport',
        routes: [
          {
            name: 'currencyRate',
            component: './Dashboard/Analysis',
            path: '/quotationSupport/currencyRate',
            authority: '/quotationSupport/currencyRate',
          },
          {
            name: 'airline',
            component: './Dashboard/Analysis',
            path: '/quotationSupport/airline',
            authority: '/quotationSupport/airline',
          },
          {
            name: 'berthingCompany',
            component: './Dashboard/Analysis',
            path: '/quotationSupport/berthingCompany',
            authority: '/quotationSupport/berthingCompany',
          },
          {
            name: 'port',
            component: './Dashboard/Analysis',
            path: '/quotationSupport/port',
            authority: '/quotationSupport/port',
          },
          {
            name: 'feeItem',
            component: './Dashboard/Analysis',
            path: '/quotationSupport/feeItem',
            authority: '/quotationSupport/feeItem',
          },
          {
            name: 'airCompany',
            component: './Dashboard/Analysis',
            path: '/quotationSupport/airCompany',
            authority: '/quotationSupport/airCompany',
          },

        ],
      },


      //profitReport 报表管理
      {
        icon: 'read',
        name: 'profitReport',
        path: '/profitReport',
        authority: '/profitReport',
        routes: [
          {
            name: 'statisticsReport',
            component: './Dashboard/Analysis',
            path: '/profitReport/statisticsReport',
            authority: '/profitReport/statisticsReport',
          },
          {
            name: 'ywUserYearReport',
            component: './Dashboard/Analysis',
            path: '/profitReport/ywUserYearReport',
            authority: '/profitReport/ywUserYearReport',
          },

          {
            name: 'cstYearReport',
            component: './Dashboard/Analysis',
            path: '/profitReport/cstYearReport',
            authority: '/profitReport/cstYearReport',
          },

          {
            name: 'receiptStatisticsReport',
            component: './Dashboard/Analysis',
            path: '/profitReport/receiptStatisticsReport',
            authority: '/profitReport/receiptStatisticsReport',
          },

          {
            name: 'revenueStatisticsReport',
            component: './Dashboard/Analysis',
            path: '/profitReport/revenueStatisticsReport',
            authority: '/profitReport/revenueStatisticsReport',
          },

          {
            name: 'payStatisticsReport',
            component: './Dashboard/Analysis',
            path: '/profitReport/payStatisticsReport',
            authority: '/profitReport/payStatisticsReport',
          },

          {
            name: 'financeStatisticsReport',
            component: './Dashboard/Analysis',
            path: '/profitReport/financeStatisticsReport',
            authority: '/profitReport/financeStatisticsReport',
          },

          {
            name: 'currencyProfitStatistics',
            component: './Dashboard/Analysis',
            path: '/profitReport/currencyProfitStatistics',
            authority: '/profitReport/currencyProfitStatistics',
          }, {
            name: 'marketInfoReport',
            component: './Dashboard/Analysis',
            path: '/profitReport/marketInfoReport',
            authority: '/profitReport/marketInfoReport',
          },
        ],
      },


      //auth 授权中心
      {
        icon: 'read',
        name: 'auth',
        path: '/auth',
        authority: '/auth',
        routes: [
          {
            name: 'user',
            component: './Dashboard/Analysis',
            path: '/auth/user',
            authority: '/auth/user',
          },
          {
            name: 'role',
            component: './Dashboard/Analysis',
            path: '/auth/role',
            authority: '/auth/role',
          }, {
            name: 'menu',
            component: './Dashboard/Analysis',
            path: '/auth/menu',
            authority: '/auth/menu',
          }, {
            name: 'rights',
            component: './Dashboard/Analysis',
            path: '/auth/rights',
            authority: '/auth/rights',
          }, {
            name: 'lessee',
            component: './Dashboard/Analysis',
            path: '/auth/lessee',
            authority: '/auth/lessee',
          }, {
            name: 'organization',
            component: './Dashboard/Analysis',
            path: '/auth/organization',
            authority: '/auth/organization',
          },


        ],
      },
      // --------------------------  分割线  ----------------------------------
      //
      // forms
      {
        name: 'form',
        icon: 'form',
        path: '/form',
        authority: '/form',
        routes: [
          {
            path: '/form/basic-form',
            name: 'basicform',
            component: './Forms/BasicForm',
          },
          {
            path: '/form/step-form',
            name: 'stepform',
            component: './Forms/StepForm',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/form/step-form',
                redirect: '/form/step-form/info',
              },
              {
                path: '/form/step-form/info',
                name: 'info',
                component: './Forms/StepForm/Step1',
              },
              {
                path: '/form/step-form/confirm',
                name: 'confirm',
                component: './Forms/StepForm/Step2',
              },
              {
                path: '/form/step-form/result',
                name: 'result',
                component: './Forms/StepForm/Step3',
              },
            ],
          },
          {
            path: '/form/advanced-form',
            name: 'advancedform',
            authority: [''],
            component: './Forms/AdvancedForm',
          },
        ],
      },


      // list
      {
        name: 'list',
        icon: 'table',
        path: '/list',
        authority: '/list',
        routes: [
          {
            path: '/list/table-list',
            name: 'searchtable',
            component: './List/TableList',
          },
          {
            path: '/list/basic-list',
            name: 'basiclist',
            component: './List/BasicList',
          },
          {
            path: '/list/card-list',
            name: 'cardlist',
            component: './List/CardList',
          },
          {
            path: '/list/search',
            name: 'searchlist',
            component: './List/List',
            routes: [
              {
                path: '/list/search',
                redirect: '/list/search/articles',
              },
              {
                path: '/list/search/articles',
                name: 'articles',
                component: './List/Articles',
              },
              {
                path: '/list/search/projects',
                name: 'projects',
                component: './List/Projects',
              },
              {
                path: '/list/search/applications',
                name: 'applications',
                component: './List/Applications',
              },
            ],
          },
        ],
      },


      // profile
      {
        name: 'profile',
        icon: 'profile',
        path: '/profile',
        authority: '/profile',
        routes: [
          {
            path: '/profile/basic',
            name: 'basic',
            component: './Profile/BasicProfile',
          },
          {
            path: '/profile/basic/:id',
            name: 'basic',
            hideInMenu: true,
            component: './Profile/BasicProfile',
          },
          {
            path: '/profile/advanced',
            name: 'advanced',
            authority: [''],
            component: './Profile/AdvancedProfile',
          },
        ],
      },


      {
        name: 'result',
        icon: 'check-circle-o',
        path: '/result',
        authority: '/result',
        routes: [
          // result
          {
            path: '/result/success',
            name: 'success',
            component: './Result/Success',
          },
          { path: '/result/fail', name: 'fail', component: './Result/Error' },
        ],
      },


      // exception
      {
        name: 'exception',
        icon: 'warning',
        path: '/exception',
        authority: '/exception',
        routes: [
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './Exception/403',
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './Exception/404',
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './Exception/500',
          },
          {
            path: '/exception/trigger',
            name: 'trigger',
            hideInMenu: true,
            component: './Exception/TriggerException',
          },
        ],
      },


      {
        name: 'account',
        icon: 'user',
        path: '/account',
        authority: '/account',
        routes: [
          {
            path: '/account/center',
            name: 'center',
            component: './Account/Center/Center',
            routes: [
              {
                path: '/account/center',
                redirect: '/account/center/articles',
              },
              {
                path: '/account/center/articles',
                component: './Account/Center/Articles',
              },
              {
                path: '/account/center/applications',
                component: './Account/Center/Applications',
              },
              {
                path: '/account/center/projects',
                component: './Account/Center/Projects',
              },
            ],
          },


          {
            name: 'settings',
            component: './Account/Settings/Info',
            path: '/account/settings',
            authority: '/account/settings',
            routes: [
              {
                path: '/account/settings',
                redirect: '/account/settings/base',
              },
              {
                path: '/account/settings/base',
                component: './Account/Settings/BaseView',
              },
              {
                path: '/account/settings/security',
                component: './Account/Settings/SecurityView',
              },
              {
                path: '/account/settings/binding',
                component: './Account/Settings/BindingView',
              },
              {
                path: '/account/settings/notification',
                component: './Account/Settings/NotificationView',
              },
            ],
          },
        ],
      },

      //  editor
      {
        name: 'editor',
        icon: 'highlight',
        path: '/editor',
        authority: '/editor',
        routes: [
          {
            path: '/editor/flow',
            name: 'flow',
            component: './Editor/GGEditor/Flow',
          },
          {
            path: '/editor/mind',
            name: 'mind',
            component: './Editor/GGEditor/Mind',
          },
          {
            path: '/editor/koni',
            name: 'koni',
            component: './Editor/GGEditor/Koni',
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
