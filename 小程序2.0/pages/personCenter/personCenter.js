// pages/personCenter/personCenter.js
import newRes from "../../utils/api.js";
import Host from "../../utils/hosts.js";
let app = getApp();
//获取应用实例
Page({
  /* 页面的初始数据*/
  data: {
    msg: null,
    version: '',
    userMsg: {},
    isMember: true,
    popImg: null,
    popup: false,
    mode: true //true:小程序模式;false:小程序PMS模式
  },
  /* 生命周期函数--监听页面加载*/
  onLoad: function(options) {
    let _this = this;
    this.firstLogin();
    this.distributeCenter();
    this.setData({
      version: Host.hosts.version,
      userMsg: app.globalData.userInfo
    });
    this.setData({
      mode: wx.getStorageSync("miniapp_mode")
    });
  },
  onShow() {
    let msg = this.data.msg;
    if (msg) {
      this.distributeCenter();
    };
  },
  distributeCenter() {
    let _this = this;
    newRes.distributeCenter().then((res) => {
      _this.setData({
        msg: res.data,
      });
    }).catch((err) => {
      wx.showToast({
        title: '系统繁忙，请稍后再试',
        icon: "none",
        mask: true
      })
      console.log(err)
    });
  },
  // 验证是否首次进入小程序个人中心
  firstLogin() {
    let _this = this;
    try {
      let data = wx.getStorageSync("first_login");
      let popup = this.data.popup;
      let status = data.click_center;
      if (status == 0) {
        popup = true
      } else {
        popup = false
      };
      this.setData({
        popImg: data.center_img,
        popup: popup,
      });
    } catch (e) {
      console.log(e)
    };
  },
  // 第一次进入小程序弹窗
  pop() {
    this.setData({
      popup: false,
    });
    this.distribute()
  },
  // 查看所有订单
  allOrder: function() {
    wx.navigateTo({
      url: './page/myOrders/myOrders',
    })
  },
  // 退房账单
  bill: function(e) {
    wx.navigateTo({
      url: './page/bill/bill',
    })
    // wx.navigateTo({
    //   url: '/pages/personCenter/page/billDetails/billDetails?id='+0,
    // })
  },
  // 分享
  share() {
    wx.navigateTo({
      url: './page/share/share',
    })
  },
  // // 我的发票
  // invoice:function(e){
  //   wx.navigateTo({
  //     url: './page/myInvoice/myInvoice',
  //   })
  // },
  memberCenter() {
    wx.navigateTo({
      url: './page/chooseHotel/chooseHotel',
    })
  },
  distribute() {
    let msg = this.data.msg;
    wx.navigateTo({
      url: './page/distributeCenter/distributeCenter?msg=' + JSON.stringify(msg),
    })
  },
  hotelService() {
    wx.navigateTo({
      url: '/pages/hotelService/hotelService',
    })
  },
  // 常用旅客
  user: function() {
    wx.navigateTo({
      url: './page/commonUser/commonUser',
    });
  },
  // 投诉建议
  complaint: function() {
    wx.navigateTo({
      url: './page/complaint/complaint',
    });
  },
})