// pages/personCenter/page/verifyTel/verifyTel.js
import newRes from "../../../../utils/api.js";
import Reg from "../../../../utils/reg.js";
Page({
  /* 页面的初始数据 */
  data: {
    id:'',
    card_id:'',
    time: 0,
    mobile: '',
    code: '',
    isMember: false
  },
  /* 生命周期函数--监听页面加载 */
  onLoad: function(options) {
    this.setData({
      id: options.hotel_id,
      card_id: options.card_id,
    });
  },
  getTel(e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  code(e) {
    this.setData({
      code: e.detail.value
    })
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
  send() {
    let mobile = this.data.mobile;
    let code = this.data.code;
    let _this = this;
    if (!code || code == '') {
      wx.showToast({
        title: '请输入验证码',
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
    }).then((res)=>{
      _this.member(mobile);
    }).catch((err)=>{
      wx.showToast({
        title: err.data.msg ? err.data.msg:"系统繁忙，请稍后再试",
        icon: 'none',
        mask: true
      });
      console.log(err);
    })
  },
  // 判断是否是会员
  member(mobile) {
    let _this = this;
    let cardId = this.data.card_id;
    newRes.isMember({
      'mobile': mobile,
      "hotel_id": this.data.id
    }).then(function (res) {
      if (res.data.is_member) {
        wx.redirectTo({
          url: '../binding/binding?mobile=' + mobile + '&hotel_id=' + _this.data.id + '&card_id=' + cardId,
        });
      } else {
        wx.redirectTo({
          url: '../fillInInformation/fillInInformation?mobile=' + mobile + '&hotel_id=' + _this.data.id + '&card_id=' + cardId,
        });
      }
    }).catch(function (err) {
      console.log(err)
    })
  },
})