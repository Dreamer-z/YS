import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            redirect: { path: '/login' }
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
            path: '/containerwhite',
            name: 'containerwhite',
            component: resolve => require(['@/pages/containerwhite'], resolve),
            children: [{
                    path: 'ordinarydetails',
                    name: 'ordinaryDetails',
                    component: resolve => require(['@/pages/ordinarydetails'], resolve)
                },
                {
                    path: 'ordinarydetailsedit',
                    name: 'ordinaryDetailsEdit',
                    component: resolve => require(['@/pages/ordinarydetailsedit'], resolve)
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
                    component: resolve => require(['@/pages/taskmanagement'], resolve)//,
                    //keepAlive: true
                },
                {
                    path: 'oneorderlist',
                    name: 'oneOrderList',
                    component: resolve => require(['@/pages/oneorderlist'], resolve)
                },
                {
                    path: 'orderlist',
                    name: 'orderList',
                    component: resolve => require(['@/pages/orderlist'], resolve) //,
                    // keepAlive: true
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
                }
            ]
        },
        {
            path: '/container',
            name: 'container',
            component: resolve => require(['@/pages/container'], resolve),
            children: [{
                    path: 'routeraddmember',
                    name: 'routerAddMember',
                    component: resolve => require(['@/pages/routeraddmember'], resolve)
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