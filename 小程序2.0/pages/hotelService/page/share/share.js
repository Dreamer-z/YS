// pages/hotelService/page/share/share.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotel: {},
    remind: ['1.分享后请将权限密钥告知入住人或访客', '2.一键分享后，您的朋友可通过入住权限密钥与您共享房间内智慧客控服务', '3.入住人或访客输入相对应密码后，必须填写个人身份信息才可使用其功能'],
    password: '',
    shareKey: '',
    orderId: '',
    checked: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let hotel = JSON.parse(options.hotel);
    this.setData({
      hotel: hotel,
      password: hotel.password,
      shareKey: hotel.share_key,
      orderId: hotel.order_id
    });
    wx.hideShareMenu();
  },
  // 复制密码
  copy: function (e) {
    let password = e.currentTarget.dataset.password;
    wx.setClipboardData({
      data: password.toString(),
      success: function (res) {
        wx.showToast({
          title: '已复制到粘贴板',
          icon: 'none',
          mask: true
        })
      }
    })
  },
  // 判断是否选中已经阅读
  checkboxChange: function (e) {
    let val = e.detail.value;
    let checked = this.data.checked;

    if (val.length == 1) {
      this.setData({ checked: true });
    } else {
      this.setData({ checked: false });
    }
  },
  // 分享房间权限
  onShareAppMessage(res) {
    let share_key = this.data.shareKey;
    let order_id = this.data.orderId;
    if (res.from === 'button') {
      wx.showShareMenu({
        withShareTicket: true
      })
      return {
        title: '房间分享',
        path: '/pages/shareVerify/shareVerify?share_key=' + share_key + '&order_id=' + order_id,
        imageUrl: '/images/share_bg.png'
      };
    }
    wx.hideShareMenu();
  }
})