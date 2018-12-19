// pages/chooseDate/chooseDate.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    checkIn:null,
    checkOut:null,
    continueMode:false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let continue_mode = false;
    if (options.continue_mode == 'false'){
      continue_mode = false;
    }else{
      continue_mode = true;
    };
    this.setData({
      checkIn: options.check_in,
      checkOut: options.check_out,
      continueMode: continue_mode
    });
  },
  getDate(data){
    wx.setStorage({
      key: 'check_time',
      data: data.detail,
    });
    wx.navigateBack({
      delta:1
    });
  }
})