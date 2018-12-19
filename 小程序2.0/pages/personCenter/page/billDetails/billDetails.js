// pages/personCenter/page/billDetails/billDetails.js
import { api, billDetails } from '../../../../utils/api.js';
Page({
  /*** 页面的初始数据 */
  data: {
    billData:null,
  },
  /*** 生命周期函数--监听页面加载 */
  onLoad: function (options) {
    this.bill(options.id)
  },
  bill(id){
    let _this = this;
    billDetails({
      id:id
    }).then(function (res) {
      let data = res.data;
      data.receive_amount = Number(res.data.night) + Number(res.data.consume);
      _this.setData({
        billData: data,
      });
    }).catch(function (err) {
      console.log(err)
      wx.showToast({
        title: '获取账单详情失败',
        icon: 'none',
        mask: true
      })
    })
  },
  invoice:function(e){
    wx.navigateTo({
      url: '../invoice/invoice',
    })
  }
})