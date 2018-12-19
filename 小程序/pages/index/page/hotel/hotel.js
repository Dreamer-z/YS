// pages/index/page/hotel/hotel.js
import {
  hosts,
  api,
  request,
  hotelDatail,
  roomTypeList
} from "../../../../utils/api.js";
import {
  Calendar
} from "../../../../utils/calendar.js";
let calendar = new Calendar;
let app = getApp();
Page({
  data: {
    hotel: [],
    // mask: false,
    mask1: false,
    // zoomInd: 0,
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
    hide: true,
    checkIn: '',
    checkOut: '',
    checkIn1: '',
    checkOut1: '',
    checkIn2: '',
    checkOut2: '',
    week: [],
    day: 1,
    // 房间
    room: '',
    showmore: false,
    roomkey: [],
  },
  onLoad: function(options) {
    // 查询酒店信息
    let _this = this;
    wx.setStorage({
      key: 'hotelLogo',
      data: options.photo,
    });
    let hotelId = options.id;
    this.setData({
      hotelId: hotelId,
    });
    // 酒店信息
    hotelDatail(hotelId).then(function(data) {
      // 设置导航栏标题
      wx.setNavigationBarTitle({
        title: data.data.hotel_name
      })
      // 酒店相册
      let img = data.data.photos;
      _this.setData({
        hotel: data.data,
        img: img,
      })
    }).catch(function() {
      wx.showToast({
        title: '查询酒店详情失败',
        icon: 'none'
      })
    });
    // 房型列表
  },
  // 展开日历
  choseDate() {
    this.setData({
      hide: !this.data.hide,
    })
  },
  // 日历时间
  getDate(e) {
    let date = e.detail;
    let ci = new Date(e.detail.checkIn2).getTime();
    let co = new Date(e.detail.checkOut2).getTime();
    let day = (new Date(e.detail.checkOut2).getTime() - new Date(e.detail.checkIn2).getTime()) / (60 * 60 * 24 * 1000);
    this.setData({
      checkIn: date.checkIn,
      checkIn1: date.checkIn1,
      checkIn2: date.checkIn2,
      checkOut: date.checkOut,
      checkOut1: date.checkOut1,
      checkOut2: date.checkOut2,
      week: date.week,
      day: day,
    });
    if (ci == this.data.checkIn2 && co == this.data.checkOut2){
      return;
    } else {
      let arg = {
        hotel_id: this.data.hotelId,
        come_time: date.checkIn2,
        leave_time: date.checkOut2
      }
      this.roomTypeLIstFn(arg);
    }
  },
  chooseEnd(e) {
    let date = e.detail;
    let day = (new Date(e.detail.checkOut2).getTime() - new Date(e.detail.checkIn2).getTime()) / (60 * 60 * 24 * 1000);
    this.setData({
      hide: !this.data.hide,
      checkIn: date.checkIn,
      checkIn1: date.checkIn1,
      checkIn2: date.checkIn2,
      checkOut: date.checkOut,
      checkOut1: date.checkOut1,
      checkOut2: date.checkOut2,
      week: date.week,
      day: day,
    });
  },
  // 房型数据查询
  roomTypeLIstFn: function(arg) {
    let _this = this;
    let roomkey = [];
    roomTypeList(arg).then(function(data) {
      let room = data.data;
      for (let i = 0; i < room.length; i++) {
        roomkey[i] = false;
      };
      _this.setData({
        room: room,
        roomkey: roomkey
      })
    }).catch(function() {
      wx.showToast({
        title: '查询房型失败',
        icon: 'none'
      })
    });
  },
  // 查看酒店相册 大图显示
  zoom: function (e) {
    // this.setData({
    //   zoomInd: e.currentTarget.dataset.index,
    //   mask: true,
    // })
    let ind = e.currentTarget.dataset.index;
    wx.previewImage({
      current: this.data.img[ind], // 当前显示图片的http链接
      urls: this.data.img // 需要预览的图片http链接列表
    })
  },
  // // 大图隐藏
  // zoomHide: function() {
  //   this.setData({
  //     zoomInd: 0,
  //     mask: false,
  //   })
  // },
  // 地图
  map: function() {
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
  // 房间价格详情
  roomSlideDown: function(e) {
    let roomkey = this.data.roomkey;
    for (let i = 0; i < roomkey.length; i++) {
      if (e.currentTarget.dataset.index == i) {
        roomkey[i] = !roomkey[i];
      }
    };
    this.setData({
      roomkey: roomkey,
    });
  },
  // 选择日期
  chooseDay: function(e) {
    calendar.choose(e, this);
  },
  // 渲染日历
  rander: function(e) {
    calendar.doDay(e, this);
  },
  // 日历显示
  calendarTap: function() {
    this.setData({
      mask1: true,
    })
  },
  slideStart: function(e) {
    calendar.slideStart(e);
  },
  slideEnd: function(e) {
    calendar.slideEnd(e, this);
  },
  closeCalendar: function() {
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
  navigate: function(e) {
    let dataset = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../room/room?id=' + dataset.id + "&hotel_name=" + this.data.hotel.hotel_name + "&address=" + this.data.hotel.address + "&photo=" + this.data.hotel.photos + "&room_type=" + dataset.item.name + "&hotel_id=" + dataset.item.hotel_id + "&price=" + dataset.item.price + "&checkIn=" + this.data.checkIn2 + "&checkOut=" + this.data.checkOut2 + "&checkIn1=" + this.data.checkIn1 + "&checkOut1=" + this.data.checkOut1 + "&week=" + this.data.week + "&photo=" + dataset.item.photos + "&is_preorder=" + dataset.item.is_preorder
    })
  },
  // 跳转到酒店详情
  navigateFacility: function() {
    wx.navigateTo({
      url: '../facility/facility?id=' + this.data.hotel.id
    })
  },
  reservations: function(e) {
    let dataset = e.currentTarget.dataset.item;
    let hotel = this.data.hotel;
    wx.navigateTo({
      url: '../reservations/reservations?id=' + dataset.id + '&hotel_name=' + hotel.hotel_name + "&address=" + hotel.address + "&photo=" + hotel.photos + "&room_type=" + dataset.name + "&hotel_id=" + dataset.hotel_id + "&price=" + dataset.price + "&checkIn=" + this.data.checkIn2 + "&checkOut=" + this.data.checkOut2 + "&checkIn1=" + this.data.checkIn1 + "&checkOut1=" + this.data.checkOut1 + "&week=" + this.data.week
    })
  },
  // 判断用户是否授权
  authSetting: function(e) {
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