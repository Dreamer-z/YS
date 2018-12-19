// pages/personCenter/page/withdrawMaterial/withdrawMaterial.js
import newRes from "../../../../utils/api.js";
import Reg from "../../../../utils/reg.js";
Page({
  /* 页面的初始数据*/
  data: {
    time: 0,
    msg:{},
  },
  /* 生命周期函数--监听页面加载 */
  onLoad: function (options) {
    wx.showModal({
      content: '为了保障您的资金安全，能够迅速找到您，请完善您的资料。',
      confirmText: "完善资料",
      showCancel:false,
    });
  },
  name(e){
    let msg = this.data.msg;
    msg.name = e.detail.value;
    this.setData({
      msg: msg
    })
  },
  mobile(e) {
    let msg = this.data.msg;
    msg.mobile = e.detail.value;
    this.setData({
      msg: msg
    })
  },
  code(e) {
    let msg = this.data.msg;
    msg.code = e.detail.value;
    this.setData({
      msg: msg
    });
  },
  getCode() {
    let mobile = this.data.msg.mobile;
    let _this = this;
    if (!Reg.regTel(mobile)) {
      wx.showToast({
        title: '请检查手机号是否有误',
        icon: 'none',
        mask: true
      })
      return;
    };
    newRes.getMemberCode({
      mobile: mobile
    }).then((res) => {
      wx.showToast({
        title: '发送成功',
        icon: 'none',
        mask: true
      });
      _this.interval();
    }).catch((err) => {
      wx.showToast({
        title: '获取验证码失败，请稍后再试',
        icon: 'none',
        mask: true
      });
      console.log(err);
    });
  },
  interval() {
    let time = 59;
    this.setData({
      time: time,
    });
    let int = setInterval(() => {
      if (time == 0) {
        clearInterval(int);
      };
      this.setData({
        time: time--,
      });
    }, 1000)
  },
  send() {
    let mobile = this.data.msg.mobile;
    let name = this.data.msg.name;
    let code = this.data.msg.code;
    let _this = this;
    if (!code || code == '') {
      wx.showToast({
        title: '请输入验证码',
        icon: 'none',
        mask: true
      })
      return;
    };
    if (!name || name == '') {
      wx.showToast({
        title: '请填写姓名',
        icon: 'none',
        mask: true
      })
      return;
    };
    if (!Reg.regTel(mobile)) {
      wx.showToast({
        title: '请检查手机号是否有误',
        icon: 'none',
        mask: true
      })
      return;
    };
    newRes.verifyMemberCode({
      mobile: mobile,
      code: code
    }).then((res) => {
      _this.modifyWithdraw(mobile);
    }).catch((err) => {
      wx.showToast({
        title: err.data.msg ? err.data.msg : "系统繁忙，请稍后再试",
        icon: 'none',
        mask: true
      });
      console.log(err);
    });
  },
  modifyWithdraw(){
    let name = this.data.msg.name;
    let mobile = this.data.msg.mobile;
    newRes.modifyWithdrawId({
      name: name,
      mobile: mobile
    }).then((res)=>{
      wx.showToast({
        title: "提交成功",
        mask: true
      });
      setTimeout(()=>{
        wx.redirectTo({
          url: '../withdraw/withdraw',
        })
      },800)
    }).catch((err)=>{
      wx.showToast({
        title: err.data.msg ? err.data.msg : "系统繁忙，请稍后再试",
        icon: 'none',
        mask: true
      });
      console.log(err);
    });
  }
})