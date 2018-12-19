// pages/index/page/orderDetail/orderDetail.js
import { hosts, api, preorder, request } from "../../../../utils/api.js";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    orderDetails: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let preorder_id = options.preorder_id;
    let _this = this;
    wx.showLoading({
      title: '',
    })
    // 订单详情
    preorder(preorder_id).then(function (data) {
      wx.hideLoading();
      _this.setData({
        orderDetails: data.data,
      })
    }).catch(function () {
      wx.showToast({
        title: '查询失败',
        icon: 'none'
      })
    });
  },
  // 关闭其他所有页面返回主页
  backIndex: function () {
    wx.switchTab({
      url: '../../index'
    })
  },
  // 再来一单
  buyAgain: function () {
    let hotel_id = this.data.orderDetails.customer.hotel_id;
    wx.setStorageSync("hotel_id", hotel_id)
    wx.switchTab({
      url: '/pages/index'
    })
  }
})