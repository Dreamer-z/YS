// pages/personCenter/page/amendMsg/amendMsg.js
import newRes from "../../../../utils/api.js";
import Reg from "../../../../utils/reg.js";
Page({
  /* 页面的初始数据 */
  data: {
    time: 0,
    hotel_id: '',
    name: '',
    idcard: '',
    mobile: '',
    code: '',
    canSend: true
  },
  /* 生命周期函数--监听页面加载 */
  onLoad: function(options) {
    this.setData({
      hotel_id: options.hotel_id,
      name: options.name,
      idcard: options.idcard,
      mobile: options.mobile,
      card_level_name: options.card_level_name
    });
  },
  getName(e) {
    this.setData({
      name: e.detail.value
    });
  },
  getIdcard(e) {
    this.setData({
      idcard: e.detail.value
    });
  },
  // getCountry(e) {
  //   this.setData({
  //     country: e.detail.value
  //   });
  // },
  getMobile(e) {
    this.setData({
      mobile: e.detail.value
    });
  },
  getCode() {
    let mobile = this.data.mobile;
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
  getCodeVal(e) {
    this.setData({
      code: e.detail.value
    });
  },
  send() {
    let canSend = this.data.canSend;
    let _this = this;
    if (!canSend) {
      return;
    };
    let hotel_id = this.data.hotel_id;
    let name = this.data.name;
    let idcard = this.data.idcard;
    let mobile = this.data.mobile;
    let code = this.data.code;
    if (!Reg.regTel(mobile)) {
      wx.showToast({
        title: '请检查手机号是否有误',
        icon: 'none',
        mask: true
      })
      return;
    };
    if (!Reg.regIdCard(idcard)) {
      wx.showToast({
        title: '请检查身份证号是否有误',
        icon: 'none',
        mask: true
      });
      return;
    };
    this.setData({
      canSend: false
    });
    newRes.verifyMemberCode({
      mobile: mobile,
      code: code
    }).then((res) => {
      _this.amendMsg(hotel_id, name, idcard, mobile, code);
    }).catch((err) => {
      _this.setData({
        canSend: true
      });
      wx.showToast({
        title: err.data.msg ? err.data.msg : "系统繁忙，请稍后再试",
        icon: 'none',
        mask: true
      });
      console.log(err);
    });
  },
  amendMsg(hotel_id, name, idcard, mobile, code) {
    let _this = this;
    newRes.amendMemberMsg({
      'hotel_id': hotel_id,
      'name': name,
      'idcard': idcard,
      'mobile': mobile,
      'code': code,
    }).then((res) => {
      wx.showToast({
        title: '修改成功',
        icon:"none",
        mask: true
      });
      _this.setData({
        canSend: true,
        code:'',
      });
    }).catch((err) => {
      console.log(err)
      wx.showToast({
        title: '修改失败，请稍后再试',
        icon: "none",
        mask: true
      });
      _this.setData({
        canSend: true
      });
    });
  }
})