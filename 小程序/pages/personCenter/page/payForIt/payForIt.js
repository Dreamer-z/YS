// pages/personCenter/page/payForIt/payForIt.js
import { hosts, api, request, repeatOrder, payWay, preorder, cancelOrder} from "../../../../utils/api.js";
let app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    phoneNumber: '11111111111', 
    pay: false,
    payWayList:[],
    roomNumber:1,
    day:1,
    price:0,
    orderDetails:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    // 支付方式
    if (app.globalData.payWay == null) {
      payWay().then(function (data) {
        _this.setData({
          payWayList: data.data,
        })
        app.globalData.payWay = data.data;
      }).catch(function () {
        wx.showToast({
          title: '查询失败',
          icon: 'none'
        });
      });
    } else {
      this.setData({
        payWayList: app.globalData.payWay,
      })
    };
    // 订单详情
    preorder(options.id).then(function(data){
      console.log(data)
      _this.setData({
        orderDetails: data.data,
        price: data.data.total_price
      })
    });
  },
  // 查看地图
  map:function(){
    let latitude = parseFloat(wx.getStorageSync("latitude"));
    let longitude = parseFloat(wx.getStorageSync("longitude"));
    wx.openLocation({
      latitude: latitude,
      longitude: longitude,
      scale: 15,
      // name: '',
      // address: 
    });
  },
  // 拨打电话
  callMe:function(){
    let tel = this.data.orderDetails.hotel.reception_phone;
    if (tel) {
      wx.makePhoneCall({
        phoneNumber: tel,
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '该酒店暂未设置联系电话！',
        showCancel:false
      })
    }

  },
  pay: function () {
    this.setData({ pay: !this.data.pay });
  },
  // 取消订单
  cancelOrder: function (e) {
    cancelOrder(this,e);
  },
  // 立即支付
  payForIt: function (e) {
    let orderDetails = this.data.orderDetails;
    // let hotel_id = orderDetails.hotel.id;
    let id = orderDetails.id;
    // let room_type_id = orderDetails.snap_items.room_type_id;
    // let checkIn = orderDetails.come_time.split(' ')[0];
    // let checkOut = orderDetails.leave_time.split(' ')[0];
    // let roomNumber = orderDetails.snap_items.total_count;
    // let remark = orderDetails.remark;
    // let member = orderDetails.member;
    // let mobile = orderDetails.mobile;
    // let arrive_time = orderDetails.arrive_time;
    let _this = this;
    this.setData({
      pay: !this.data.pay,
    });
    repeatOrder({
      openUrl:'/pages/personCenter/page/orderDetails/orderDetails?preorder_id=', 
      id:id, 
      pay_way: Number(e.detail.value.payWay)
    });
  },
  orderDetails(){

  },
})