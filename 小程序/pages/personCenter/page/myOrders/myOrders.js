// pages/personCenter/page/myOrders/myOrders.js
import { hosts, api, request, order, cancelOrder } from "../../../../utils/api.js";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    orderType: 1,
    orderType1: true,
    orderType2: false,
    orderType3: false,
    order: [],
    page: 1,
    num: 10,
    lock: false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.changeType();
  },
  // 上拉触底分页加载
  onReachBottom: function () {
    let _this = this;
    let lock = this.data.lock;
    let orderType = this.data.orderType;
    let page = this.data.page;
    let num = this.data.num;
    let order = this.data.order;
    if (lock) {
      return;
    };
    page++;
    this.setData({ page: page });
    this.od(orderType, page, num, function (res) {
      if (res.length == 0) {
        return;
      };
      lock = true;
      for (let i = 0; i < res.length; i++) {
        order.push(res[i]);
      };
      _this.setData({ order: order, lock: true });
      setTimeout(() => {
        _this.setData({ lock: false });
      }, 1000)
    });
  },
  changeType: function (e) {
    let _this = this;
    this.setData({order:[]});
    let orderType = this.data.orderType;
    if (e) {
      orderType = e.currentTarget.id;
      this.setData({ orderType: orderType });
    }
    if (e == undefined) {
      orderType = this.data.orderType;
    };
    this.od(orderType, this.data.page, this.data.num, function (res) {
      _this.setData({ order: res });
    })
    if (orderType == 1) {
      this.setData({
        orderType1: true,
        orderType2: false,
        orderType3: false,
      })
    };
    if (orderType == 2) {
      this.setData({
        orderType1: false,
        orderType2: true,
        orderType3: false,
      })
    };
    if (orderType == 3) {
      this.setData({
        orderType1: false,
        orderType2: false,
        orderType3: true,
      })
    };
  },
  // 订单
  od: function (orderType, page, num, callBack) {
    order({
      data: {
        status: orderType,
        page: page,
        num: num,
      },
    }).then(function (data) {
      console.log(data)
      let sj = data.data;
      if (sj.length == 0) {
        wx.showToast({
          title: '没有更多了',
          icon: 'none',
          duration: 500
        });
      };
      for (let i = 0; i < sj.length; i++) {
        if (sj[i].come_time && sj[i].leave_time){
          let come_time = sj[i].come_time.split("-");
          let leave_time = sj[i].leave_time.split("-");
          sj[i].come_time = come_time[0] + "年" +Number(come_time[1]) + "月" + come_time[2];
          sj[i].leave_time = leave_time[0] + "年" + Number(leave_time[1]) + "月" + leave_time[2];
        }
      };
      callBack(sj);
    });
  },
  // 取消订单
  cancelOrder: function (e) {
    let _this = this;
    cancelOrder({
      "el": e
    }).then(function (data) {
      wx.showToast({
        title: '取消成功',
        icon: "none",
        duration: 500
      });
      _this.od(_this.data.orderType, 1, _this.data.num, function (res) {
        _this.setData({ order: res });
      })
    }).catch(function (err) {
      wx.showModal({
        title: '取消失败',
        content: '请您稍后再试',
        showCancel: false,
      })
    });;
  },
  // 立即支付
  payNow: function (e) {
    wx.navigateTo({
      url: '../payForIt/payForIt?id=' + e.currentTarget.id,
    })
  },
  orderDetails:function(e){
    wx.navigateTo({
      url: '../orderDetails/orderDetails?preorder_id=' + e.currentTarget.id,
    });
  },
})