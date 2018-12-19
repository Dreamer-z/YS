// pages/personCenter/page/share/share.js
import Host from "../../../../utils/hosts.js";
import { qrCode } from "../../../../utils/api.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"",
    qrcode:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.hideShareMenu();
    this.setData({
      name: Host.hosts.shareMessage,
    })
    this.getcode();
  },
  getcode(){
    let _this = this;
    qrCode().then(function (res) {
      console.log(res)
      _this.setData({
        qrcode : "data:image/jpg;base64," + res.data.qrcode
      })
    }).catch(function(err){
      console.log(err)
      wx.showToast({
        title: '获取小程序二维码失败',
        icon:"none"
      })
    })
  },
  preview() {
    wx.previewImage({
      current: this.data.qrcode, // 当前显示图片的http链接
      urls: [this.data.qrcode] // 需要预览的图片http链接列表
    })
  },
  /* 用户点击右上角分享 */
  onShareAppMessage: function(res) {
    wx.hideShareMenu();
    if (res.from === 'button') {
      wx.showShareMenu({
        withShareTicket: true
      });
      wx.hideShareMenu();
      return {
        title: '分享',
        path: '/pages/index/index',
        imageUrl: '/images/share_bg.png'
      };
    }
  }
})