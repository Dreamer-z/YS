//app.js
import { hosts, api, userMsg } from "./utils/api.js";
import token from './utils/token.js';
App({
  data: {
    version: '1.1.0.719',
    loginSuccessCallback: null,
    ShareMessage: '云宿'
  },
  onShow: function () {
    // 网络状态
    wx.onNetworkStatusChange(function (res) {
      console.log(res.isConnected);
      if (!res.isConnected) {
        wx.showToast({
          title: '请检查您的网络',
          icon: 'none'
        })
      }
      console.log(res.networkType);
    });
    let _this = this;
    let tokenData = this.globalData.tokenData;
    if (tokenData) {
      // 登录、设置token
      token.verify(function (res) {
        if (res) {
          _this.globalData.showBtn = false
        }
      });
    };
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);
  },  
  sendUserMsg: function (arg) {
    userMsg({
      "nickname": arg.nickName,
      "gender": arg.gender,
      "language": arg.language,
      "city": arg.city,
      "province": arg.province,
      "country": arg.country,
      "avatar_url": arg.avatarUrl
    }).then(res => {
      // console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  versionsDetection: function () {
    let _this = this;
    // wx.getUpdateManager 在 1.9.90 才可用，请注意兼容
    const updateManager = wx.getUpdateManager();
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      if (res.hasUpdate) {
        wx.setStorageSync('versions', 'old');
        wx.showToast({
          title: '有新版本需要升级',
          icon: 'none'
        });
      } else {
        wx.setStorageSync('versions', 'new');
        return
      }
    });
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否马上重启小程序？',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    });
    updateManager.onUpdateFailed(function (err) {
      wx.showModal({
        title: '更新提示',
        content: '更新失败！',
        showCancel: false
      })
    });
  },
  globalData: {
    tokenData: false,
    userInfo: null,
    payWay: null, //支付方式
    hotelServiceRoom: 0,
  }
})