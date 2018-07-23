// pages/shareVerify/shareVerify.js
import Reg from '../../utils/reg.js';
import { hosts, api, share } from "../../utils/api.js";
let app = getApp();
Page({
  data: {
    share_key:'',
    order_id:'',
    name:'',
    idcard:'',
    password:'',
  },
  onLoad: function (options) {
    if (options.share_key && options.order_id) {
      this.setData({
        share_key: options.share_key,
        order_id: options.order_id,
      });
    }
  },
  inpName(e){
    this.setData({ name: e.detail.value})
  },
  inpIdcard(e) {
    this.setData({ idcard: e.detail.value})
  },
  inpPassword(e) {
    this.setData({ password: e.detail.value})
  }, 
  navigate() {
    wx.switchTab({
      url: '../index/index',
    })
  },
  // 验证
  send(){
    let password = this.data.password;
    let name = this.data.name;
    let idcard = this.data.idcard;
    let key = this.data.share_key;
    let order_id = this.data.order_id;
    let _this = this;
    if (name == '' || name.length < 2) {
      wx.showToast({
        title: '请输入正确的姓名',
        icon: 'none'
      })
      return;
    };
    if (password == '' || password.length != 4){
      wx.showToast({
        title: '请输入4位正确的密码',
        icon:'none'
      })
      return;
    };
    if (idcard == '' || Reg.regIdCard(idcard) == false) {
      wx.showToast({
        title: '请输入正确的身份证号',
        icon: 'none'
      })
      return;
    };
    let arg = {
      share_key: key,
      order_id: order_id,
      password: password,
      name: name,
      idcard: idcard
    };
    share(arg).then(function (res) {
      wx.showToast({
        title: '验证成功',
        duration: 800,
      })
      setTimeout(function () {
        _this.navigate();
      }, 800)
    }).catch(function (err) {
      wx.showModal({
        title: '验证失败',
        content: err.data.msg,
      });
    })
  },
  // 判断用户是否授权
  authSetting: function (e) {
    let _this = this;
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              app.globalData.userInfo = res.userInfo;
            }
          });
          _this.send(e)
        } else {
          wx.navigateTo({
            url: '../setting/setting',
          })
        }
      }
    });
  },
})