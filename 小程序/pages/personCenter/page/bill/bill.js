// pages/personCenter/page/bill/bill.js
Page({

  data: {
    billDetails:true,
  },

  onLoad: function (options) {
  
  },
  billDetails:function(e){
    wx.navigateTo({
      url: '../billDetails/billDetails',
    })
  }
})