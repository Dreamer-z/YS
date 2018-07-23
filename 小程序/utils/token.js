import { hosts, api } from "./api.js";
export default{
  // 判断登录状态
  verify(callBack){
    var token = wx.getStorageSync('token');
    if (!token) {
      this.getTokenFromServer(callBack);
    }
    else {
      this._veirfyFromServer(token, callBack);
    }
  },
  // 身份验证
  _veirfyFromServer(token, callBack) {
    var that = this;
    wx.request({
      url: hosts + api.authentication,
      method: 'POST',
      data: {
        token: token
      },
      success: function (res) {
        var valid = res.data.data.isValid;
        // wx.showToast({
        //   title: '身份验证：'+valid,
        // })
        wx.setStorageSync('valid', res.data.data.isValid);
        callBack && callBack(res.data.data.isValid);
        if (!valid) {
          that.getTokenFromServer(callBack);
        }
      }
    })
  },
  // 获取token
  getTokenFromServer(callBack) {
    var that = this;
    wx.login({
      success: function (res) {
        wx.request({
          url: hosts + api.login,
          method: 'POST',
          data: {
            code: res.code
          },
          success: function (res) {
            wx.setStorageSync('token', res.data.data.token); 
            wx.setStorageSync('valid', true);
            callBack && callBack(true);
          }
        })
      }
    })
  },
}
