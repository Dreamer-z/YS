import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            redirect: {
                path: '/login'
            }
        },
        {
            path: '/hotellist',
            name: 'hotelList',
            component: resolve => require(['@/pages/hotellist'], resolve)
        },
        {
            path: '/login',
            name: 'login',
            component: resolve => require(['@/pages/login'], resolve) ///login   分开的时候
        },
        {
            path: '/register',
            name: 'register',
            component: resolve => require(['@/pages/register'], resolve) ///login   分开的时候
        },
        {
            path: '/layerContainer',
            name: 'layerContainer',
            component: resolve => require(['@/components/public/layerContainer'], resolve),
            children: [{
                    path: 'ordinarydetails',
                    name: 'ordinaryDetails',
                    component: resolve => require(['@/pages/ordinarydetails'], resolve)
                }, //wechartPrice
                {
                    path: 'newfangtai',
                    name: 'newFangTai',
                    component: resolve => require(['@/pages/newfangtai'], resolve)
                },
                {
                    path: 'roomstatusmgr', // 批量设置价格    小程序
                    name: 'roomStatusMgr',
                    component: resolve => require(['@/pages/roomstatusmgr'], resolve)
                },
                {
                    path: 'pricescheme', // 批量设置价格
                    name: 'priceScheme',
                    component: resolve => require(['@/pages/pricescheme'], resolve)
                },
                {
                    path: 'ordinarydetailsedit',
                    name: 'ordinaryDetailsEdit',
                    component: resolve => require(['@/pages/ordinarydetailsedit'], resolve)
                },
                {
                    path: 'financialreport',
                    name: 'financialReport', //  历史入账明细
                    component: resolve => require(['@/pages/financialreport'], resolve)
                },
                {
                    path: 'commissionreport',
                    name: 'commissionReport', //  佣金账务报表
                    component: resolve => require(['@/pages/commissionreport'], resolve)
                },
                {
                    path: 'wechartroommoney',
                    name: 'wechartRoomMoney', //  小程序房费报表
                    component: resolve => require(['@/pages/wechartroommoney'], resolve)
                },
                {
                    path: 'outofstorereport',
                    name: 'outOfStoreReport', //  历史离店
                    component: resolve => require(['@/pages/outofstorereport'], resolve)
                },
                {
                    path: 'todaytothestore',
                    name: 'todayToTheStore', //   今日导电
                    component: resolve => require(['@/pages/todaytothestore'], resolve)
                },
                {
                    path: 'historicalroomexchange',
                    name: 'historicalRoomExchange', //历史换房
                    component: resolve => require(['@/pages/historicalroomexchange'], resolve)
                },
                {
                    path: 'consumergoods',
                    name: 'consumerGoods', //   消费品明细报表
                    component: resolve => require(['@/pages/consumergoods'], resolve)
                },
                {
                    path: 'summaryreport',
                    name: 'summaryReport', //入账汇总报表
                    component: resolve => require(['@/pages/summaryreport'], resolve)
                },
                {
                    path: 'cashierreceiptsreport',
                    name: 'cashierReceiptsReport', //   收银员收款报表
                    component: resolve => require(['@/pages/cashierreceiptsreport'], resolve)
                },
                {
                    path: 'memberdetails',
                    name: 'memberDetails',
                    component: resolve => require(['@/pages/memberdetails'], resolve)
                },
                {
                    path: 'memberdetailsedit',
                    name: 'memberDetailsEdit',
                    component: resolve => require(['@/pages/memberdetailsedit'], resolve)
                },
                {
                    path: 'taskmanagement',
                    name: 'taskManagement',
                    component: resolve => require(['@/pages/taskmanagement'], resolve)
                },
                {
                    path: 'oneorderlist',
                    name: 'oneOrderList',
                    component: resolve => require(['@/pages/oneorderlist'], resolve)
                },
                {
                    path: 'wechartorderList', //  小程序的预订列表
                    name: 'wechartOrderList',
                    component: resolve => require(['@/pages/wechartorderlist'], resolve)
                },
                {
                    path: 'orderlist',
                    name: 'orderList',
                    component: resolve => require(['@/pages/orderlist'], resolve)
                },
                {
                    path: 'batchpreorder', // 批量预定
                    name: 'batchPreorder',
                    component: resolve => require(['@/pages/batchpreorder'], resolve)
                },
                {
                    path: 'quickpreorder',
                    name: 'quickpreorder',
                    component: resolve => require(['@/pages/quickpreorder'], resolve)
                },
                {
                    path: 'forwardcalendar',
                    name: 'forwardCalendar',
                    component: resolve => require(['@/pages/forwardcalendar'], resolve)
                },
                {
                    path: 'routeraddmember',
                    name: 'routerAddMember',
                    component: resolve => require(['@/pages/routeraddmember'], resolve)
                },
                {
                    path: 'newhello', // 欢迎
                    name: 'newHello',
                    component: resolve => require(['@/pages/newhello'], resolve)
                },
                {
                    path: 'managerstatement', // 经理日报表
                    name: 'managerStatement',
                    component: resolve => require(['@/pages/managerstatement'], resolve)
                },
                {
                    path: 'hotelphotos',
                    name: 'hotelPhotos',
                    component: resolve => require(['@/pages/hotelphotos'], resolve)
                },
                {
                    path: 'roomtypephotos',
                    name: 'roomtypeUpload',
                    component: resolve => require(['@/pages/roomtypephotos'], resolve)
                },
                {
                    path: 'fangtai',
                    name: 'fangTai',
                    component: resolve => require(['@/pages/fangtai'], resolve)
                },
                {
                    path: 'roomtypelist',
                    name: 'roomtypelist',
                    component: resolve => require(['@/pages/roomtypelist'], resolve)
                },
                {
                    path: 'addroom',
                    name: 'addroom',
                    component: resolve => require(['@/pages/addroom'], resolve)
                },
                {
                    path: 'addroomtype',
                    name: 'addroomtype',
                    component: resolve => require(['@/pages/addroomtype'], resolve)
                },
                {
                    path: 'addhotel',
                    name: 'addHotel',
                    component: resolve => require(['@/pages/addhotel'], resolve)
                },
                {
                    path: 'edithotel', //  酒店信息
                    name: 'editHotel',
                    component: resolve => require(['@/pages/edithotel'], resolve)
                },
                {
                    path: 'hotelCalendar',
                    name: 'hotelCalendar',
                    component: resolve => require(['@/pages/hotelCalendar'], resolve)
                },
                {
                    path: 'staffManagement', //员工管理

                    name: 'staffManagement',
                    component: resolve => require(['@/pages/staffManagement'], resolve)
                },
                {
                    path: 'roleManagement', //角色管理
                    name: 'roleManagement',
                    component: resolve => require(['@/pages/roleManagement'], resolve)
                },
                {
                    path: 'backgroundMenu', //菜单管理
                    name: 'backgroundMenu',
                    component: resolve => require(['@/pages/backgroundMenu'], resolve)
                },
                {
                    path: 'addMenu', //添加菜单
                    name: 'addMenu',
                    component: resolve => require(['@/pages/addMenu'], resolve)
                },
                {
                    path: 'classes', //班次
                    name: 'classes',
                    component: resolve => require(['@/pages/classes'], resolve)
                }, {
                    path: 'addMember', //添加会员
                    name: 'addMember',
                    component: resolve => require(['@/pages/addMember'], resolve)
                }, {
                    path: 'goodsType', //商品类型
                    name: 'goodsType',
                    component: resolve => require(['@/pages/goodsType'], resolve)
                }, {
                    path: 'goodsManagement', //商品
                    name: 'goodsManagement',
                    component: resolve => require(['@/pages/goodsManagement'], resolve)
                }, {
                    path: 'checkInManagement', //入住管理
                    name: 'checkInManagement',
                    component: resolve => require(['@/pages/checkInManagement'], resolve)
                }, {
                    path: 'department', //部门设置
                    name: 'department',
                    component: resolve => require(['@/pages/department'], resolve)
                }, {
                    path: 'station', //岗位设置
                    name: 'station',
                    component: resolve => require(['@/pages/station'], resolve)
                }, {
                    path: 'auntManagement', //阿姨管理
                    name: 'auntManagement',
                    component: resolve => require(['@/pages/auntManagement'], resolve)
                }, {
                    path: 'memberCard', //会员卡级设置
                    name: 'memberCard',
                    component: resolve => require(['@/pages/memberCard'], resolve)
                }, {
                    path: 'cooperator', //合作单位管理
                    name: 'cooperator',
                    component: resolve => require(['@/pages/cooperator'], resolve)
                }, {
                    path: 'systemMessage', //系统消息、通知
                    name: 'systemMessage',
                    component: resolve => require(['@/pages/systemMessage'], resolve)
                }, {
                    path: 'checkOutRequest', //退房请求
                    name: 'checkOutRequest',
                    component: resolve => require(['@/pages/checkOutRequest'], resolve)
                }, {
                    path: 'clockRoomRules', //钟点房
                    name: 'clockRoomRules',
                    component: resolve => require(['@/pages/clockRoomRules'], resolve)
                }, {
                    path: 'managementVip', //会员管理
                    name: 'managementVip',
                    component: resolve => require(['@/pages/managementVip'], resolve)
                }, {
                    path: 'newVip', //新建会员
                    name: 'newVip',
                    component: resolve => require(['@/pages/newVip'], resolve)
                }, , {
                    path: 'newVipModify', //新建会员//提供修改部分
                    name: 'newnewVipModifyVip',
                    component: resolve => require(['@/pages/newVipModify'], resolve)
                }, {
                    path: 'managementGuest', //住客管理
                    name: 'managementGuest',
                    component: resolve => require(['@/pages/managementGuest'], resolve)
                }, {
                    path: 'managementDistribution', //分销商管理
                    name: 'managementDistribution',
                    component: resolve => require(['@/pages/managementDistribution'], resolve)
                }, {
                    path: 'orderDistribution', //分销订单
                    name: 'orderDistribution',
                    component: resolve => require(['@/pages/orderDistribution'], resolve)
                }, {
                    path: 'withdrawalDistribution', //分销提现管理
                    name: 'withdrawalDistribution',
                    component: resolve => require(['@/pages/withdrawalDistribution'], resolve)
                }, {
                    path: 'settingsDistribution', //分销设置
                    name: 'settingsDistribution',
                    component: resolve => require(['@/pages/settingsDistribution'], resolve)
                }, {
                    path: 'settingCommission', //佣金设置
                    name: 'settingCommission',
                    component: resolve => require(['@/pages/settingCommission'], resolve)
                }
            ]
        }
    ]
})

// {
//       path: '',
//       name: 'hotelUpload',
//       component: resolve => require(['@/components/hotelupload'], resolve)
//     },
// meta: {
//     keepAlive: true
// }