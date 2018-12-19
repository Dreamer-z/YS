// pages/personCenter/page/myOrders/myOrders.js
import {
  myOrder,
  cancelOrder
} from "../../../../utils/api.js";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    orderType: 0,
    orderType1: true,
    orderType2: false,
    order: [],
    page: 1,
    num: 10,
    canCancel:true,
    lock: false,
    back:false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.changeType();
  },
  onShow(){
    let back = this.data.back;
    if(back){
      this.changeType();
      this.setData({
        back: false
      });
    };
  },
  // 上拉触底分页加载
  onReachBottom: function() {
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
    this.od(orderType, page, num, function(res) {
      if (res.length == 0) {
        return;
      };
      for (let i = 0; i < res.length; i++) {
        order.push(res[i]);
      };
      _this.setData({
        order: order,
        page: page
      });
    });
  },
  changeType: function(e) {
    let _this = this;
    let orderType = this.data.orderType;
    if (e) {
      orderType = e.currentTarget.dataset.index;
      this.setData({
        orderType: orderType,
        page:1,
        num:10
      });
    }
    if (e == undefined) {
      orderType = this.data.orderType;
    };
    this.od(orderType, this.data.page, this.data.num, function(res) {
      _this.setData({
        order: res
      });
    })
    if (orderType == 0) {
      this.setData({
        orderType1: true,
        orderType2: false,
      })
    };
    if (orderType == 1) {
      this.setData({
        orderType1: false,
        orderType2: true,
      })
    };
  },
  // 订单
  od: function (orderType, page, num, callBack) {
    let _this  = this;
    this.setData({
      lock: true,
    });
    myOrder({
      data: {
        type: orderType,
        page: page,
        num: num,
      },
    }).then(function(data) {
      let sj = data.data;
      if (sj.length == 0) {
        wx.showToast({
          title: '没有更多了',
          icon: 'none',
          duration: 800,
          mask: true
        });
      };
      for (let i = 0; i < sj.length; i++) {
        if (sj[i].come_time && sj[i].leave_time) {
          let come_time = sj[i].come_time.split("-");
          let leave_time = sj[i].leave_time.split("-");
          sj[i].come_time = come_time[0] + "年" + Number(come_time[1]) + "月" + come_time[2];
          sj[i].leave_time = leave_time[0] + "年" + Number(leave_time[1]) + "月" + leave_time[2];
        }
      };
      callBack && callBack(sj); 
      _this.setData({
        lock: false
      });
    }).catch(err=>{
      console.log(err)
      wx.showToast({
        title: err.data.msg ? err.data.msg:'查询失败',
        icon:'none',
        mask: true
      });
    });
  },
  // 取消订单
  cancelOd: function(e) {
    let _this = this;
    let canCancel = this.data.canCancel;
    if (!canCancel){
      return;
    };
    let id = e.currentTarget.id;
    cancelOrder(id).then(function(data) {
      wx.showToast({
        title: '取消成功',
        icon: "none",
        duration: 800,
        mask: true
      });
      setTimeout(()=>{
        _this.setData({
          canCancel:true,
        });
        _this.od(_this.data.orderType, 1, _this.data.num, function (res) {
          _this.setData({
            order: res
          });
        })
      },800)
    }).catch(function (err) {
      _this.setData({
        canCancel: true,
      });
      wx.showModal({
        title: '取消失败',
        content: err.data.msg ? err.data.msg:"请稍后再试",
        showCancel: false,
      })
    });;
  },
  // 立即支付
  payNow: function (e) {
    this.setData({
      back: true
    });
    wx.navigateTo({
      url: '../payForIt/payForIt?id=' + e.currentTarget.id,
    })
  },
  orderDetails: function(e) {
    this.setData({
      back: true, 
      order: [],
      page: 1
    });
    wx.navigateTo({
      url: '../orderDetails/orderDetails?preorder_id=' + e.currentTarget.id + "&hotel_id=" + e.currentTarget.dataset.hotel,
    });
  },
})