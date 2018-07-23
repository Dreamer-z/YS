// pages/index/page/hotel/hotel.js
import { hosts, api, request, hotelDatail, roomTypeList } from "../../../../utils/api.js";
import { Calendar } from "../../../../utils/calendar.js";
let calendar = new Calendar;
let app = getApp();
Page({
  data: {
    hotel: [],
    zoomBoole: false,
    mask: false,
    mask1: false,
    zoomInd: 0,
    img: [],
    title: '',
    // 地图
    latitude: '28.25591',
    longitude: '112.98626',
    markers: [{
      latitude: '28.25591',
      longitude: '112.98626'
    }],
    // 日历
    currentDate: '',
    currentDayList: [],
    currentObj: '',
    checkIn: '',
    checkOut: '',
    checkIn1: '',
    checkOut1: '',
    checkIn2: '',
    checkOut2: '',
    today: '',
    // 房间
    room: '',
    showmore: false,
  },
  onLoad: function (options) {
    // 创建日历数据
    let currentObj = calendar.getCurrentDayString(this.data.currentObj);
    calendar.setSchedule(this);
    let week = [];
    let y = currentObj.getFullYear();
    let m = currentObj.getMonth();
    let d = currentObj.getDate();
    week[0] = calendar.weekDay(new Date(y, m, d).getDay());
    week[1] = calendar.weekDay(new Date(y, m, d + 1).getDay());
    let today = 0;
    let n = 0;
    for (let i = 0; i < this.data.currentDayList.length; i++) {
      if (this.data.currentDayList[i].choose != "dis") {
        if (this.data.currentDayList[i].value == d) {
          today = i;
        };
      };
    };
    this.setData({
      today: today,
      currentDate: y + '年' + (m + 1) + '月',
      currentObj: currentObj,
      checkIn: y + '年' + (m + 1) + '月' + d + '日',
      checkOut: y + '年' + (m + 1) + '月' + (d + 1) + '日',
      checkIn1: (m + 1) + '月' + d + '日',
      checkOut1: (m + 1) + '月' + (d + 1) + '日',
      checkIn2: y + '-' + (m + 1) + '-' + d,
      checkOut2: y + '-' + (m + 1) + '-' + (d + 1),
      week: week,
    });

    // 查询酒店信息
    let _this = this;
    wx.setStorage({
      key: 'hotelLogo',
      data: options.photo,
    });
    let hotelId = options.id;
    // 酒店信息
    hotelDatail(hotelId).then(function (data) {
      // 设置导航栏标题
      wx.setNavigationBarTitle({
        title: data.data.hotel_name
      })
      // 酒店相册
      let img = data.data.photos;

      _this.setData({
        hotel: data.data,
        img: img,
        hotelId: hotelId,
        latitude: Number(data.data.lat),
        longitude: Number(data.data.lng),
        markers: [{
          id: 1,
          title: data.data.hotel_name,
          latitude: data.data.lat,
          longitude: data.data.lng
        }],
      })
    }).catch(function () {
      wx.showToast({
        title: '查询酒店详情失败',
        icon: 'none'
      })
    });
    let arg = {
      hotel_id: hotelId,
      come_time:y + '-' + (m + 1) + '-' + d,
      leave_time:y + '-' + (m + 1) + '-' + (d + 1)
    }
    // 房型列表
    this.roomTypeLIstFn(arg);
  },
  // 房型数据查询
  roomTypeLIstFn: function (arg) {
    let _this = this;
    roomTypeList(arg).then(function (data) {
      let room = data.data;

      _this.setData({
        room: room,
      })
    }).catch(function () {
      wx.showToast({
        title: '查询房型失败',
        icon: 'none'
      })
    });
  },
  // 根据日期查询房型信息
  charRoomType: function () {
    let hotelId = this.data.hotelId;
    let arg = {
      hotel_id: hotelId,
      come_time: this.data.checkIn2,
      leave_time: this.data.checkOut2
    };
    // 房型列表
    this.roomTypeLIstFn(arg);
  },
  // 大图显示
  zoom: function (e) {
    this.setData({
      zoomInd: e.currentTarget.dataset.index,
      mask: true,
    })
  },
  // 大图隐藏
  zoomHide: function () {
    this.setData({
      zoomInd: 0,
      mask: false,
    })
  },
  // 地图
  map: function () {
    let that = this;
    let latitude = Number(that.data.hotel.lat);
    let longitude = Number(that.data.hotel.lng);

    wx.openLocation({
      latitude: latitude,
      longitude: longitude,
      scale: 15,
      name: that.data.hotel.hotel_name,
      address: that.data.hotel.address
    })
  },
  // 选择日期
  chooseDay: function (e) {
    calendar.choose(e, this);
  },
  // 渲染日历
  rander: function (e) {
    calendar.doDay(e, this);
  },
  // 日历显示隐藏
  calendarTap: function () {
    this.setData({
      mask1: true,
    })
  },
  slideStart: function (e) {
    calendar.slideStart(e);
  },
  slideEnd: function (e) {
    calendar.slideEnd(e, this);
  },
  closeCalendar: function () {
    let ms = calendar.chooseEnd();
    if (ms.length == 0) {
      this.setData({
        mask1: false,
      })
      return;
    };
    if (ms.length == 1) {
      wx.showToast({
        title: '请选择好入住日期和结束日期哦！',
        icon: 'none'
      })
    } else {
      this.charRoomType();
      this.setData({
        mask1: false,
      })
    };
  },
  // 跳转到房间详情
  navigate: function (e) {
    // console.log(e.currentTarget.dataset)
    let dataset = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../room/room?id=' + dataset.id + "&hotel_name=" + this.data.hotel.hotel_name + "&address=" + this.data.hotel.address + "&photo=" + this.data.hotel.photos + "&room_type=" + dataset.item.name + "&hotel_id=" + dataset.item.hotel_id + "&price=" + dataset.item.price + "&checkIn=" + this.data.checkIn2 + "&checkOut=" + this.data.checkOut2 + "&checkIn1=" + this.data.checkIn1 + "&checkOut1=" + this.data.checkOut1 + "&week=" + this.data.week + "&all_day=" + this.data.dayNum + "&photo=" + dataset.item.photos + "&is_preorder=" + dataset.item.is_preorder
    })
  },
  // 跳转到酒店详情
  navigateFacility: function () {
    wx.navigateTo({
      url: '../facility/facility?id=' + this.data.hotel.id
    })
  },
  reservations: function (e) {
    let dataset = e.currentTarget.dataset.item;
    let hotel = this.data.hotel;
    wx.navigateTo({
      url: '../reservations/reservations?id=' + dataset.id +'&hotel_name=' + hotel.hotel_name + "&address=" + hotel.address + "&photo=" + hotel.photos + "&room_type=" + dataset.name + "&hotel_id=" + dataset.hotel_id + "&price=" + dataset.price + "&checkIn=" + this.data.checkIn2 + "&checkOut=" + this.data.checkOut2 + "&checkIn1=" + this.data.checkIn1 + "&checkOut1=" + this.data.checkOut1 + "&week=" + this.data.week + "&all_day=" + this.data.dayNum
    })
  },  
  // 判断用户是否授权
  authSetting: function (e) {
    let _this = this;
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              app.globalData.userInfo = res.userInfo;
              app.sendUserMsg(res.userInfo);
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            }
          });
          _this.reservations(e)
        } else {
          wx.navigateTo({
            url: '../../../setting/setting',
          })
        }
      }
    });
  },
})