import { hosts, api } from "./api.js";
import Host from "./hosts.js";
export default{
  // 判断登录状态
  verify(callBack){
    var token = wx.getStorageSync('token');
    if (!token || token == ''|| typeof token == undefined) {
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
        if (!valid) {
          that.getTokenFromServer(callBack);
        }else{
          wx.setStorageSync('valid', res.data.data.isValid);
          callBack && callBack(res.data.data.isValid);
        }
      }
    })
  },
  // 获取token
  getTokenFromServer(callBack) {
    var that = this;
    wx.login({
      success: function (data) {
        wx.request({
          url: hosts + api.login,
          method: 'POST',
          data: {
            code: data.code,
            key: Host.hosts.key
          },
          success: function (res) {
            let code = res.statusCode.toString();
            let startChar = code.charAt(0);
            if (startChar == '2' && res.data.error_code != 0) {
              wx.showToast({
                title: res.data.msg ? res.data.msg:'身份验证失败',
                icon: "none",
                mask: true
              });
            };
            wx.setStorageSync('token', res.data.data.token);
            wx.setStorageSync('invitied_code', res.data.data.invitied_code);
            wx.setStorageSync('sale_register', res.data.data.sale_register);
            wx.setStorageSync('valid', true);
            wx.setStorageSync('code', data.code);
            callBack && callBack(true);
          },
          fail:function(err){
            wx.showToast({
              title: '身份验证失败',
              icon:"none",
              mask: true
            })
          }
        })
      }
    })
  },
}
