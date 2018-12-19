import Vue from 'vue'
import Vuex from 'vuex'
import API from './API'
import io from 'socket.io-client';

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        route: null,
        topMenuId: null,
        leftMenuId: null,
        routers: [],
        token: null,
        hotelList: [],
        currHotel: null,
        user: {},
        socket: null,
        checkOutRequest: 0,
        sysMessage: 0
    },
    getters: {
        route: (state, getters) => {
            return state.route
        },
        topMenuId: (state, getters) => {
            state.topMenuId = sessionStorage.getItem('_setTopMenuId');
            return state.topMenuId
        },
        leftMenuId: (state, getters) => {
            state.leftMenuId = sessionStorage.getItem('_setLeftMenuId');
            return state.leftMenuId
        },
        routers: (state, getters) => {
            return state.routers
        },
        token: (state, getters) => {
            state.token = sessionStorage.getItem('token')
            return state.token
        },
        currHotel: (state, getters) => {
            if (state.currHotel != null) {
                return state.currHotel
            }
            state.currHotel = JSON.parse(sessionStorage.getItem('currHotel'))
            return state.currHotel
        },
        user: (state, getters) => {
            state.user = JSON.parse(sessionStorage.getItem('user'))
            return state.user
        },
        socket: (state, getters) => {
            return state.socket
        },
        checkOutRequest: (state, getters) => {
            return state.checkOutRequest
        },
        sysMessage: (state, getters) => {
            return state.sysMessage
        },
    },
    mutations: {
        'setRoute': (state, route) => {
            state.route = route
        },
        'setTopMenuId': (state, index) => {
            state.topMenuId = index;
            sessionStorage.setItem('_setTopMenuId', index)
        },
        'setLeftMenuId': (state, index) => {
            state.leftMenuId = index;
            sessionStorage.setItem('_setLeftMenuId', index)
        },
        'setRouters': (state, routers) => {
            state.routers = routers
        },
        'setToken': (state, token) => {
            state.token = token
            API.setToken(state.token)
            sessionStorage.setItem('token', token)
        },
        'setHotelList': (state, hotelList) => {
            sessionStorage.setItem('hotelList', JSON.stringify(hotelList))
            state.hotelList = hotelList
        },
        'setCurrHotel': (state, hotel) => {
            sessionStorage.setItem('currHotel', JSON.stringify(hotel))
            state.currHotel = hotel
        },
        'setUser': (state, user) => {
            state.user = user
                //setToken(state.token)
            sessionStorage.setItem('user', JSON.stringify(user))
        },
        'setSocket': (state, socket) => {
            state.socket = socket
        },
        'setCheckOutRequest': (state, checkOutRequest) => {
            state.checkOutRequest = checkOutRequest
        },
        'setSysMessage': (state, sysMessage) => {
            state.sysMessage = sysMessage
        },
    },
    actions: {
        setRoute({ commit }, route) {
            commit('setRoute', route);
        },
        setTopMenuId({ commit }, index) {
            commit('setTopMenuId', index);
        },
        setLeftMenuId({ commit }, index) {
            commit('setLeftMenuId', index);
        },
        generateRoutes({ commit }) {
            // return new Promise((reslove, reject) => {
            /*
            var rts = [{
                    path: '/choiceHotel',
                    name: 'choiceHotel',
                    component: resolve => require(['@/components/choicehotel'], resolve)
                },

                {
                    path: '/whitecontainText',
                    name: 'whiteContainText',
                    component: resolve => require(['@/components/whitecontainText'], resolve),
                    children: [{
                            path: '',
                            name: 'roomDisplay',
                            component: resolve => require(['@/components/roomdisplay'], resolve)
                        },
                        {
                            path: '/batchreservation',
                            name: 'batchReservation',
                            component: resolve => require(['@/components/batchreservation'], resolve)
                        }
                    ]
                },
                {
                    path: '/containtext',
                    name: 'containText',
                    component: resolve => require(['@/components/containtext'], resolve),
                    children: [{
                            path: 'hotelupload',
                            name: 'hotelUpload',
                            component: resolve => require(['@/components/hotelupload'], resolve)
                        },
                        {
                            path: 'fangtai',
                            name: 'fangTai',
                            component: resolve => require(['@/components/fangtai'], resolve)
                        },
                        {
                            path: 'fangxing',
                            name: 'fangxing',
                            component: resolve => require(['@/components/fangxing'], resolve)
                        },
                        {
                            path: 'yshotelroom',
                            name: 'ysHotelRoom',
                            component: resolve => require(['@/components/yshotelroom'], resolve)
                        },
                        {
                            path: 'hotelroom',
                            name: 'hotelRoom',
                            component: resolve => require(['@/components/hotelroom'], resolve)
                        },
                        {
                            path: 'yshotel',
                            name: 'ysHotel',
                            component: resolve => require(['@/components/yshotel'], resolve)
                        }
                    ]
                }
            ]
            */
            /*
                console.log('-----')
                API.getMenus().then(res => {
                    var menus = res.data
                    var rts = []
                    menus.forEach(el => {
                        var rt = {}
                        rt.path = el.path
                        rt.name = ''
                        var path = `${el.component}`
                        rt.component = r => require(["@/" + path + ".vue"], r)
                        rts.push(rt)
                    })
                    let arr = rts.slice(0)
                    commit('setRouters', rts);
                    reslove()
                })
            })
            */
        },
        setToken({ commit }, token) {
            if (token == null) return
            commit('setToken', token);
        },
        setCurrHotel({ commit }, hotel) {
            commit('setCurrHotel', hotel);
        },
        setHotelList({ commit }, hotelList) {
            commit('setHotelList', hotelList);
        },
        setUser({ commit }, user) {
            if (user == null) return
            commit('setUser', user);
        },
        initWebsocket({ commit }, connectInfo) {

            var webserverUri = connectInfo.uri + '?id=' + connectInfo.username + '&platform=web&tag=' + connectInfo.hotelId + '-' + connectInfo.roleId
            var socket = io(webserverUri)
            var callback = connectInfo.callback
            console.log(webserverUri)
            socket.on('connect', function() {
                console.log('---connect succeed')
                commit('setSocket', socket);
            });
            socket.on('push', function(data) {
                console.log('---push data: ', JSON.stringify(data))
                callback(data)
            });
            socket.on('disconnect', function() {
                console.log('---disconnect')
            });
        },
        setCheckOutReq({ commit }, checkOutRequest) {
            if (checkOutRequest < 0) {
                checkOutRequest = 0
            }
            commit('setCheckOutRequest', checkOutRequest);
        },
        setSysMsg({ commit }, sysMessage) {
            if (sysMessage < 0) {
                sysMessage = 0
            }
            commit('setSysMessage', sysMessage);
        },
    }
})