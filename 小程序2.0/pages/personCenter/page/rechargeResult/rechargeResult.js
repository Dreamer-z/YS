// pages/personCenter/page/transactResult/transactResult.js
Page({
  /* 页面的初始数据 */
  data: {
    msg:{
      result: true,
    },
    recharge_amount:'',
    give_amount:"",
  },
  /* 生命周期函数--监听页面加载 */
  onLoad: function (options) {
    this.setData({
      recharge_amount: options.recharge_amount,
      give_amount: options.give_amount,
    })
  },
  getDetails(){
    wx.navigateBack({
      delta:2
    })
  },
  again(){
    wx.navigateBack({
      delta: 1
    })
  }
})