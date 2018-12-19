// pages/personCenter/page/complaint/complaint.js
import { complaint } from "../../../../utils/api.js";
Page({
  /* 页面的初始数据 */
  data: {
    length: 200,
    value: '',
  },
  /* 生命周期函数--监听页面加载 */
  onLoad: function (options) {

  },
  val: function (e) {
    let value = e.detail.value;
    this.setData({ value: value });
  },
  push: function () {
    let val = this.data.value;
    let _this = this;
    if (val.length == 0) {
      wx.showToast({
        title: '内容为空',
        icon: 'none',
        mask: true
      })
      return;
    };
    wx.showModal({
      title: '确认发送？',
      content: "",
      showCancel: true,
      cancelText: '否',
      cancelColor: '#333',
      confirmText: '是',
      confirmColor: '#6a9df6',
      success: function (res) {
        if (res.confirm) {
          complaint({ data: { content: val } }).then(function (res) {
            wx.showToast({
              title: '提交成功',
              duration: 800,
              mask: true
            });
            _this.setData({ value: '' });
          }).catch(function () {
            wx.showToast({
              title: '提交失败',
              icon:'none',
              duration: 800,
              mask: true
            });
          });
        } else {
          return;
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
})