// pages/index/page/room/room.js
import { hosts, api, request } from "../../../../utils/api.js";
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    roomData: [],
    roomImg: '',
    roomImgIndex: 1,
    roomImgLength: '',
    orderData:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderData: options
    });
    let roomId = options.id;
    let _this = this;
    // 请求房间信息
    request({
      url: api.room + roomId,
      method: 'GET'
    }).then(function (data) {
      if (data.data.photos){
        let roomImg = data.data.photos;
        _this.setData({
          roomData: data.data,
          roomImg: roomImg,
          roomImgLength: roomImg.length,
        })
      }else{
        _this.setData({
          roomData: data.data,
          roomImg: '',
          roomImgLength: 0,
        })
      }

    }).catch(function (err) {
      console.log(err)
      wx.showToast({
        title: '拉取数据失败',
        icon: 'none'
      })
    });
  },
  // 轮播图右下角角标
  roomPhoto: function (e) {
    let roomImgIndex = e.detail.current + 1;
    let roomImgLength = this.data.roomImgLength;
    this.setData({
      roomImgIndex: roomImgIndex
    })
  },
  reservations(){
    let orderData = this.data.orderData;
    wx.navigateTo({
      url: '../reservations/reservations?hotel_name='+orderData.hotel_name+'&address='+orderData.address+'&photo='+orderData.photo+'&room_type='+orderData.room_type+'&hotel_id='+orderData.hotel_id+'&id='+orderData.id+'&price='+orderData.price+'&checkIn='+orderData.checkIn+'&checkOut='+orderData.checkOut+'&checkIn1='+orderData.checkIn1+'&checkOut1='+orderData.checkOut1+'&week='+orderData.week
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