// pages/personCenter/page/memberCenter/memberCenter.js
import newRes from "../../../../utils/api.js";
Page({
  /* 页面的初始数据 */
  data: {
    hotel_id: '',
    msg: null,
  },
  /* 生命周期函数--监听页面加载 */
  onLoad: function(options) {
    this.setData({
      hotel_id: options.id
    })
    this.getHotelMember(options.id);
  },
  getHotelMember(hotel_id) {
    let _this = this;
    newRes.getHotelMember({
      hotel_id: hotel_id
    }).then((res) => {
      _this.setData({
        msg: res.data,
      })
    }).catch((err) => {
      wx.showToast({
        title: '查询会员信息失败',
        icon: "none",
        mask: true
      })
      console.log(err)
    })
  },
  recharge() {
    wx.navigateTo({
      url: '../recharge/recharge?rate=' + this.data.msg.rate + "&hotel_id=" + this.data.hotel_id + "&id=" + this.data.msg.id,
    })
  },
  memberInformation() {
    wx.navigateTo({
      url: '../memberInformation/memberInformation?hotel_id=' + this.data.hotel_id,
    })
  }
})