import axios from 'axios';

let host = 'http://demo';
// var host = '';
const pmsHost = host;

const pmsHotelArea = '/pms/area'; //地区接口地址

//axios.defaults.headers.common['token'] = '111'

function setToken(token) {
    // console.log(axios)
    axios.defaults.headers.common['token'] = token
}

const put = (url, arg) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'put',
            url: url,
            data: arg,
            headers: {
                'Content-Type': 'application/json' //application/x-www-form-urlencoded
            }
        }).then((res) => {
            resolve(res.data);
        }).catch(() => {
            reject('put请求链接失败');
        });
    });
}
const get = (url, arg) => {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: arg,
            // withCredentials: true
        }).then((res) => {
            resolve(res.data);
        }, () => {
            reject('get请求链接失败');
        });
    });
}
const dele = (url, arg) => {
    return new Promise((resolve, reject) => {
        axios.delete(url, {
            params: arg
        }).then((res) => {
            resolve(res.data);
        }, () => {
            reject('dele请求链接失败');
        });
    });
}
const post = (url, arg) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: url,
            data: arg,
            headers: {
                'Content-Type': 'application/json' //application/x-www-form-urlencoded
            }
        }).then((res) => {
            resolve(res.data);
        }).catch(() => {
            reject('post请求链接失败');
        });
    });
}


export default {
    addHotel(arg) {
        //     提交酒店注册     
        return post('/pms/hotel', arg)
    },
    getProvince(arg) {
        //   获取省份     
        return get("/pms/common/area", arg)
    },
    getCitys(id, arg) {
        //   获取城市     
        return get("/pms/common/area/id/" + id, arg)
    },
    getConty(id, arg) {
        //   获取区/县     
        return get("/pms/common/area/id/" + id, arg)
    },
    getPayway(arg) {
        //    获取支付方式   
        return get("/pms/common/payway", arg)
    },
    getFacility(arg) {
        //    获取默认会有的酒店设施
        return get("/pms/common/facility", arg)
    },
    //     以上是   yshotel.vue
    getRoomType(id, arg) {
        //   获取房型
        return get("/pms/roomtype?id=" + id, arg)
    },
    deleOneRoomtype(id, arg) {
        //    单个删除房型
        return dele("/pms/roomtype/" + id, arg)
    },
    deleSomeRoomtype(id, arg) {
        //  批量删除房型
        return dele("/pms/roomtype/" + id, arg)
    },
    //以上是fangxing.vue
    getRoomFacility(arg) {
        //获取房间的设施
        return get("/pms/common/roomfacility", arg)
    },
    addRoomType(arg) {
        // 添加房型
        return post("/pms/roomtype", arg)
    },
    changeRoomType(id, arg) {
        //   修改房型
        return put("/pms/roomtype/" + id, arg)
    },
    getRoomTypeById(id) {
        //   修改房型
        return get("/pms/roomtype/" + id)
    },
    // 以上是 添加房型   hotelroom.vue
    getFloorHasedRoom(id, arg) {
        //  获取某个楼层的已有房间
        return get("/pms/room?id=" + id, arg)
    },
    deleThisRoom(id, arg) {
        //  删除某个房间
        return dele("/pms/room/" + id, arg)
    },
    deleThisFloor(id, arg) {
        //  删除某个楼层
        return dele("/pms/floor/" + id, arg)
    },
    addNewFloor(arg) {
        // 添加楼层  已知楼栋
        return post("/pms/floor", arg)
    },
    addNewBuild(arg) {
        //  添加楼栋  已知酒店
        return post("/pms/build", arg)
    },
    deleThisBuild(id, arg) {
        //  删除某个楼栋  
        return dele("/pms/build/" + id, arg)
    },
    getHasedFloor(id, arg) {
        //  获取某个楼栋已有的楼层
        return get("/pms/floor?id=" + id, arg)
    },
    getHasedBuild(id, arg) {
        //  获取某个酒店已有的楼栋
        return get("/pms/build?id=" + id, arg)
    },
    //  以上的是yshotelroom.vue
    addNewRoom(arg) {
        //  单个的添加房间
        return post("pms/room", arg)
    },
    changeRoomName(id, arg) {
        //  修改已知房间的 内容
        return put("/pms/room/" + id, arg)
    },
    //  public   addroom.vue
    addMoreRooms(arg) {
        //   批量添加房间
        return post("/pms/moreroom", arg)
    },
    hotelUploadGetToken(arg) {
        return post("/pms/img/upload_token", arg)
    },
    //登陆
    login(arg) {
        return post("/pms/login", arg)
    },
    getHotelList(arg) {
        return get("/pms/hotel", arg)
    },
    uploadFile(requset) {
        let formData = new FormData();
        formData.append('token', requset.token)
        formData.append('file', requset.file)
        return axios({
            method: 'post',
            url: requset.url,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

    },
    removeHotelPhoto(id) {
        return dele("/pms/img/" + id)
    },
    // 商品列表操作
    ////商品列表
    goodsList(arg) {
        return get("/pms/goods", arg);
    },
    ////商品添加
    goodsAdd(arg) {
        return post("/pms/goods", arg);
    },
    ////商品删除
    goodsDel(id) {
        return dele("/pms/goods/" + id);
    },
    ////商品修改
    goodsAmend(id, arg) {
        return put("/pms/goods/" + id, arg);
    },
    // 商品分类操作
    ////商品分类列表
    goodsTypeList(arg) {
        return get("/pms/category", arg);
    },
    ////商品分类添加
    goodsTypeAdd(arg) {
        return post("/pms/category", arg);
    },
    ////商品分类删除
    goodsTypeDel(id) {
        return dele("/pms/category/" + id);
    },
    ////商品分类修改
    goodsTypeAmend(id, arg) {
        return put("/pms/category/" + id, arg);
    },
    // 部门管理
    ////部门列表
    departmentList(arg) {
        return get("/pms/department", arg);
    },
    ////部门添加
    departmentAdd(arg) {
        return post("/pms/department", arg);
    },
    ////部门修改
    departmentAmend(id, arg) {
        return put("/pms/department/" + id, arg);
    },
    ////部门删除
    departmentDel(id) {
        return dele("/pms/department/" + id);
    },
    // 岗位管理
    ////岗位列表
    stationList(arg) {
        return get("/pms/job", arg);
    },
    ////岗位添加
    stationAdd(arg) {
        return post("/pms/job", arg);
    },
    ////岗位修改
    stationAmend(id, arg) {
        return put("/pms/job/" + id, arg);
    },
    ////岗位删除
    stationDel(id) {
        return dele("/pms/job/" + id);
    },
    // 角色管理
    ////角色列表
    roleList(arg) {
        return get("/pms/role", arg);
    },
    ////角色添加
    roleAdd(arg) {
        return post("/pms/role", arg);
    },
    ////角色修改
    roleAmend(id, arg) {
        return put("/pms/role/" + id, arg);
    },
    ////角色删除
    roleDel(id) {
        return dele("/pms/role/" + id);
    },
    // 查询角色配置权限
    findMenu(arg) {
        return get("/pms/role/menu", arg);
    },
    // 角色配置权限
    deployMenu(arg) {
        return post("/pms/role/menu", arg);
    },
    // 员工管理
    ////员工列表
    staffList(arg) {
        return get("/pms/staff", arg);
    },
    ////员工添加
    addStaff(arg) {
        return post("/pms/staff", arg);
    },
    ////员工修改
    staffAmend(id, arg) {
        return put("/pms/staff/" + id, arg);
    },
    ////员工删除
    staffDel(id) {
        return dele("/pms/staff/" + id);
    },
    ////入住客源渠道
    getFromWayList(arg) {
        return get("/pms/common/from", arg)
    },
    // 菜单管理
    ////菜单列表
    backgroundMenuList(arg) {
        return get("/pms/menu", arg);
    },
    ////菜单添加
    addbackgroundMenu(arg) {
        return post("/pms/menu", arg);
    },
    ////菜单修改
    backgroundMenuAmend(id, arg) {
        return put("/pms/menu/" + id, arg);
    },
    ////菜单删除
    backgroundMenuDel(id) {
        return dele("/pms/menu/" + id);
    },

    getagreementUnitArr(id, arg) {
        return get("/pms/common/partner?id=" + id, arg)
    },
    // 合作单位管理
    ////合作单位列表
    cooperatorList(arg) {
        return get("/pms/partner", arg);
    },
    ////合作单位添加
    cooperatorAdd(arg) {
        return post("/pms/partner", arg);
    },
    ////合作单位修改
    cooperatorAmend(id, arg) {
        return put("/pms/partner/" + id, arg);
    },
    ////合作单位删除
    cooperatorDel(id) {
        return dele("/pms/partner/" + id);
    },
    // 会员等级管理
    ////会员等级列表
    memberLevelList(arg) {
        return get("/pms/memberlevel", arg);
    },
    ////会员等级添加
    memberLevelAdd(arg) {
        return post("/pms/memberlevel", arg);
    },
    ////会员等级修改
    memberLevelAmend(id, arg) {
        return put("/pms/memberlevel/" + id, arg);
    },
    ////会员等级删除
    memberLevelDel(id) {
        return dele("/pms/memberlevel/" + id);
    },
    // 会员管理
    // //会员添加
    memberAdd(arg) {
        return post("/pms/member", arg);
    },
    // //查询证件类型
    certificate() {
        return get("/pms/common/certificate_type");
    },
    // 查询阿姨角色
    auntList(arg) {
        return get("/pms/aunt", arg);
    },
    // 查询所有房间
    roomList(arg) {
        return get("/pms/aunt/room", arg);
    },
    // 指派房间给保洁员
    assignAunt(arg) {
        return post("/pms/aunt/set_room", arg);
    },
    getMemberList(id, arg) {
        return get("/pms/member?id=" + id, arg)
    },
    getMemberType(arg) {
        return get("/pms/common/member_type", arg)
    },
    getMemberInfo(id, arg) {
        return get("/pms/member/" + id, arg)
    },
    getMemberLevel(id, arg) {
        return get("/pms/memberlevel?id=" + id, arg)
    },
    getOrderType(arg) { //办理入住类型
        return get("/pms/common/order_type", arg)
    },
    getCardtypeArr(arg) {
        return get("/pms/common/certificate_type", arg)
    },
    getOrderList(num, arg) {
        return get("/pms/order/mobile?mobile=" + num, arg)
    },

    // 入住列表管理
    checkInList(arg) {
        return get("/pms/order", arg);
    },
    // 入住列表搜索
    searchCheckInList(arg) {
        return post("/pms/order/search", arg);
    },
    // 根据房型id查询房间列表
    checkRoomListAsRoomType(arg) {
        return get("/pms/roomtype/roomlist", arg)
    },
    // 客源类型
    getFrom(arg) {
        return get("/pms/common/from", arg)
    },
    searMember(arg) {
        return post("/pms/member/search", arg)
    },
    quickRoomAuto(arg) {
        return post("/pms/room/auto", arg)
    },
    fetchMaxDay(arg) {
        return post("/pms/preorder/roomtype", arg)
    },
    getGuaranteeArr(arg) {
        return get("/pms/assure", arg)
    },
    quickPost(arg) {
        return post("/pms/preorder/quick", arg)
    },
    getarrivalTimeArr(id, arg) {
        return get("/pms/hotel/arrive?id=" + id, arg)
    },
    getRoomNums(id, arg) {
        return get("/pms/roomstatus/build?id=" + id, arg)
    },
    getroomStatuArr(id, arg) {
        return get("/pms/status/" + id, arg)
    },
    getTagsArr(arg) {
        return get("/pms/tags", arg)
    },
    beDirty(id, arg) {
        return put("/pms/roomstatus/dirty/" + id, arg)
    },
    callClean(arg) {
        return post("/pms/roomstatus/clean", arg)
    },
    beClean(id, arg) {
        return put("/pms/roomstatus/clean/" + id, arg)
    },
    roomSearch(arg) {
        return post("/pms/roomstatus/search", arg)
    },
    listCheckTable(id, num, arg) {
        return post(`/pms/preorder/search?id=${id}&page=${num}&num=10`, arg)
    },
    getOrderStatusArr(arg) {
        return get("/pms/common/order_status", arg)
    },
    getReservationsArr(arg) {
        return get("/pms/common/set_status", arg)
    },
    getArriveTimeArr(arg) {
        return get("/pms/common/arrive_time", arg)
    },
    getFromWay(arg) {
        return get("/pms/common/from_search", arg)
    },
    getOrderList(id, arg) {
        return get("/pms/preorder?id=" + id, arg)
    },
    currentChange(id, num, arg) {
        return get(`/pms/preorder?id=${id}&page=${num}`, arg)
    },
    exchangeroomCreated(id, arg) {
        return get("/pms/roomstatus/exchange?id=" + id, arg)
    },
    exchangeroomPost(arg) {
        return post("/pms/roomstatus/exchange", arg)
    },
    exchangeroomGetRoomNum(id, num, arg) {
        return get(`/pms/roomstatus/room?order_id=${id}&room_type_id=${num}`, arg)
    },
    repairCreated(id, arg) {
        return get("/pms/roomstatus/repair/" + id, arg)
    },
    stopCreated(id, arg) {
        return get("/pms/roomstatus/stop/" + id, arg)
    },
    repairPost(arg) {
        return post("/pms/roomstatus/repair", arg)
    },
    stopPost(arg) {
        return post("/pms/roomstatus/stop", arg)
    },
    getMemberDiscount(id, arg) {
        return get("/pms/order/member_discount?number=" + id, arg)
    },
    bestayPost(arg) {
        return post("/pms/roomstatus/order", arg)
    },
    bestayCreated(id, arg) {
        return get("/pms/roomstatus/room/" + id, arg)
    },
    // 退房请求
    checkOutRequest(arg) {
        return get("/pms/message/end", arg)
    },
    get,
    post,
    dele,
    put,
    setToken
}