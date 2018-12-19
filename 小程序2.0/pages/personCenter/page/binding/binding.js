// pages/personCenter/page/transactResult/transactResult.js
import newRes from "../../../../utils/api.js";
Page({
  /* 页面的初始数据 */
  data: {
    hotel_id: '',
    mobile: '',
    msg: {}
  },
  /* 生命周期函数--监听页面加载 */
  onLoad: function(options) {
    this.bind(options.hotel_id, options.mobile);
    this.setData({
      hotel_id: options.hotel_id,
      mobile: options.mobile
    });
  },
  bind(hotel_id, mobile) {
    let _this = this;
    newRes.isMenberBind({
      hotel_id: hotel_id,
      mobile: mobile
    }).then((res) => {
      _this.setData({
        msg: {
          result: true,
          hotel_id: res.data.hotel_id,
          level_name: res.data.level_name,
          member_right: res.data.member_right,
        }
      })
    }).catch((err) => {
      console.log(err)
      _this.setData({
        msg: {
          result: false,
          error_msg: err.data.msg,
        }
      })
    });
  },
  getDetails() {
    let msg = this.data.msg;
    wx.redirectTo({
      url: '../memberCenter/memberCenter?hotel_id=' + msg.hotel_id,
    })
  },
  again() {
    wx.redirectTo({
      url: '../registerMember/registerMember',
    })
  }
})