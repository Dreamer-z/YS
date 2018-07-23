// pages/personCenter/personCenter.js
//获取应用实例
const app = getApp()
Page({
  /* 页面的初始数据*/
  data: {
    version: '',
    userMsg:{},
  },
  /* 生命周期函数--监听页面加载*/
  onLoad: function (options) {
    this.setData({ 
      version:app.data.version,
      userMsg: app.globalData.userInfo
    })
  },
  // 查看所有订单
  allOrder:function(){
    wx.navigateTo({
      url: './page/myOrders/myOrders',
    })
  },
  // 退房账单
  bill:function(e){
    wx.navigateTo({
      url: './page/bill/bill',
    })
  },
  // 我的发票
  invoice:function(e){
    wx.navigateTo({
      url: './page/myInvoice/myInvoice',
    })
  },
  // 常用旅客
  user:function(){
    wx.navigateTo({
      url: './page/commonUser/commonUser',
    })
  },
  // 投诉建议
  complaint: function () {
    wx.navigateTo({
      url: './page/complaint/complaint',
    })
  },
})