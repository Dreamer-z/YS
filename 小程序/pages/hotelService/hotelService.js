// pages/hotelService/hotelService.js
import { hotelService, clear,request} from "../../utils/api.js";
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    door: 1,
    noCheckIn:false,
    noCheckInMsg:'',
    hotelMsgArr:[],
    hotelMsg:{},
    hotel:'',
    ewm:'',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onShow:function(){
    let _this = this;
    let arrRoomIndex = 0;

    hotelService().then(res => {
      let arrRoom = app.globalData.hotelServiceRoom;
      for (let i = 0; i < res.data.length;i++){
        if (res.data[i].hotel_id == arrRoom.hotel_id && res.data[i].room_id == arrRoom.room_id){
          arrRoomIndex = i;
        }
      };
      let hotelMsg = res.data[arrRoomIndex];
      _this.setData({
        hotelMsgArr: res.data,
        hotelMsg: hotelMsg,
        hotel: JSON.stringify(hotelMsg),
        noCheckIn: true,
        noCheckInMsg:'',
      })
    }).catch(err => {
      let code = err.statusCode.toString();
      let startChar = code.charAt(0);
      if (startChar == '2'){
        _this.setData({
          noCheckIn:false,
          noCheckInMsg: err.data.msg
        })
      }
    })
  },
  // 切换房间
  bindPickerChange: function (e) {
    let index = e.detail.value;
    let hotelMsgArr = this.data.hotelMsgArr;
    app.globalData.hotelServiceRoom = hotelMsgArr[index];
    this.setData({
      hotelMsg: hotelMsgArr[index],
      hotel: JSON.stringify(hotelMsgArr[index]),
    })
  },
  // 开门
  openDoor: function () {
    let _this = this;
    let door = this.data.door;
    if (door != 1) {
      this.setData({ door: 1 });
      return;
    }
    this.setData({ door: 2 });
    setTimeout(() => {
      _this.setData({ door: 3 });
    }, 500);
  },
  // 分享
  share:function(){
    wx.navigateTo({
      url: './page/share/share?hotel=' + this.data.hotel,
    });
  },
  mode:function(){
    wx.showToast({
      title: '该功能暂未开放！',
      icon:'none'
    })
  },
  // 拨打电话
  tel: function () {
    let moblie = this.data.hotelMsg.reception_phone;
    wx.showModal({
      title: '酒店电话',
      content: '酒店电话：' + moblie,
      confirmText: '拨打',
      success: function (res) {
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber: moblie //仅为示例，并非真实的电话号码
          })
        } else if (res.cancel) {
          return;
        }
      }
    });
  },
  // 呼叫打扫
  clear: function () {
    let hotelMsg = this.data.hotelMsg;
    if (hotelMsg.end_status != '0') {
      wx.showModal({
        title: '温馨提示',
        content: '该房间正在退房中',
        showCancel:false
      })
    } else {
      wx.showModal({
        title: '温馨提示',
        content: '每天只能呼叫一次酒店打扫，确认现在打扫吗？',
        success: function (res) {
          if (res.confirm) {
            clear({
              room_id: hotelMsg.room_id,
              hotel_id: hotelMsg.hotel_id,
              action: 1,
              order_id: hotelMsg.order_id,
            }).then(function (res) {
              wx.showToast({
                title: '呼叫打扫成功！',
                icon: 'none'
              })
            }).catch(function (err) {
              console.log(err)
              wx.showToast({
                title: '请求失败',
                icon: 'none'
              })
            })
          } else if (res.cancel) {
            wx.showToast({
              title: '已取消',
              icon: 'none'
            })
          }
        }
      });
    }
  },
  // wifi密码
  wifi: function () {
    let _this = this;
    wx.showModal({
      title: 'wifi密码',
      content: 'WiFi密码：' + '88888888',
      confirmText:'复制',
      success: function (res) {
        if (res.confirm){
          wx.setClipboardData({
            data: '88888888',
            success: function (res) {
              wx.showToast({
                title: '已复制到粘贴板',
                icon:'none'
              })
            }
          })
        }
      }
    });
  },
  // 跳转到客房控制
  roomControl: function () {
    // let hotelMsg = this.data.hotelMsg;
    // if (hotelMsg.end_status != '0'){
    //   wx.showModal({
    //     title: '温馨提示',
    //     content: '该房间正在退房中，哦',
    //   })
    // }else{
      wx.showToast({
        title: '该功能暂只作展示！',
        icon: 'none',
        duration:800
      })
      setTimeout(()=>{
        wx.navigateTo({
          url: './page/roomControl/roomControl',
        })
      },800)

    // }
  },
})