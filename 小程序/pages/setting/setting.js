// pages/setting/setting.js
import { hosts, api} from "../../utils/api.js";
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    key:'',
    orderId: '', 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // if (options.share_key && options.order_id) {
    //   this.setData({
    //     key: options.share_key,
    //     orderId: options.order_id,
    //     op: options
    //   });
    // }
  },
  // 获取用户信息
  getUserInfoFn: function (e) {
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo;
      app.sendUserMsg(e.detail.userInfo);
      this.navigateBack();
    } else {
      this.openSetting();
      return
    }
  },
  navigateBack() {
    wx.navigateBack({
      delta:1
    });
  },
  //跳转设置页面授权
  openSetting: function () {
    var _this = this
    if (wx.openSetting) {
      wx.openSetting({})
    } else {
      wx.showModal({
        title: '授权提示',
        content: '小程序需要您的微信授权才能使用哦~ 错过授权页面的处理方法：删除小程序->重新搜索进入->点击授权按钮'
      })
    }
  },

})