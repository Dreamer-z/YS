// pages/personCenter/page/billDetails/billDetails.js
Page({
  /*** 页面的初始数据 */
  data: {
  
  },
  /*** 生命周期函数--监听页面加载 */
  onLoad: function (options) {

  },
  invoice:function(e){
    wx.navigateTo({
      url: '../invoice/invoice',
    })
  }
})