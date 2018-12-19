// pages/personCenter/page/payForIt/payForIt.js
import { hosts, api, request, payWay, preorder, cancelOrder } from "../../../../utils/api.js";
import newRes from "../../../../utils/api.js";
let app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    phoneNumber: '11111111111', 
    pay: false,
    payWayList:[],
    payWay:1,
    roomNumber:1,
    day:1,
    price:0,
    orderDetails:[],
    total_price:null,
    canCancel: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    // 订单详情
    preorder(options.id).then(function(data){
      _this.setData({
        orderDetails: data.data,
        price: data.data.price,
        total_price: data.data.total_price
      })
    });
  },
  // 查看地图
  map:function(){
    let latitude = Number(this.data.orderDetails.hotel.lat);
    let longitude = Number(this.data.orderDetails.hotel.lng);
    wx.openLocation({
      latitude: latitude,
      longitude: longitude,
      scale: 15,
      name: this.data.orderDetails.hotel.hotel_name,
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
  // 打开支付窗口
  close() {
    this.setData({ pay: !this.data.pay });
  },
  // 取消订单
  cancelOrder: function (e) {
    let canCancel = this.data.canCancel;
    let id = e.currentTarget.dataset.id;
    if (!canCancel){
      return;
    };
    this.setData({
      canCancel:false
    });
    cancelOrder(id).then(res=>{
      wx.showToast({
        title: '取消成功',
        mask:true,
        duration:1000
      });
      setTimeout(()=>{
        wx.navigateBack({
          delta:1
        });
      },1000)
    }).catch(err=>{
      wx.showToast({
        title: err.data.msg ? err.data.msg : '取消失败，请稍后再试',
        mask: true,
        icon:'none'
      });
      this.setData({
        canCancel: true
      });
      console.log(err)
    });
  },
  // 立即支付
  payFor: function (e) {
    let orderDetails = this.data.orderDetails;
    let hotel_id = orderDetails.hotel.id;
    let id = orderDetails.id;
    let _this = this;
    payWay(hotel_id, id, function (preorder_id, res) {
      _this.close();
      _this.setData({
        preorder_id: preorder_id,
        payWayList: res.data,
      });
      wx.setStorageSync("wx_pay", res.wxpay_parms);
    });
  },
  getWay(e) {
    this.setData({
      payWay: e.detail.value
    })
  },
  payForIt() {
    let payWay = this.data.payWay;
    let orderDetails = this.data.orderDetails;
    let hotel_id = orderDetails.hotel.id;
    let preorder_id = orderDetails.id;
    let _this = this;
    this.close();
    wx.showLoading({
      mask: true
    });
    if (payWay == 1) {
      let wxpay_parms = wx.getStorageSync("wx_pay");
      let timeStamp = wxpay_parms.timeStamp;
      let nonceStr = wxpay_parms.nonceStr;
      let packAge = wxpay_parms.package;
      let signType = wxpay_parms.signType;
      let paySign = wxpay_parms.paySign;
      // 调用微信支付功能
      newRes.wxPayFor(timeStamp, nonceStr, packAge, signType, paySign).then((res) => {
        wx.hideLoading();
        wx.showToast({
          title: '支付成功',
          duration: 1000,
          mask: true
        });
        setTimeout(() => {
          wx.redirectTo({
            url: "/pages/personCenter/page/orderDetails/orderDetails?preorder_id=" + preorder_id + "&hotel_id=" + hotel_id
          });
        }, 1000)
      }).catch((err) => {
        wx.hideLoading();
        wx.showModal({
          title: '已取消支付',
          content: '您已取消支付，可在个人中心订单列表继续完成支付',
          showCancel:false
        });
      })
    } else if (payWay == 5) {
      newRes.balancePay({
        hotel_id: hotel_id,
        preorder_id: preorder_id,
        pay_way: 5
      }).then((res) => {
        wx.hideLoading();
        wx.showToast({
          title: '支付成功',
          duration: 1000,
          mask: true
        });
        setTimeout(() => {
          wx.navigateTo({
            url: "/pages/personCenter/page/orderDetails/orderDetails?preorder_id=" + preorder_id + "&hotel_id=" + hotel_id
          });
        }, 1000)
      }).catch((err) => {
        wx.showToast({
          title: err.data.msg ? err.data.msg : '积分支付失败，请稍后再试',
          icon: "none"
        })
      })
    };
  },
})