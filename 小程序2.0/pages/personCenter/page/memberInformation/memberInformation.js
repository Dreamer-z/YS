// pages/personCenter/page/memberInformation/memberInformation.js
import newRes from "../../../../utils/api.js";
Page({
  /* 页面的初始数据 */
  data: {
    hotel_id: '',
    msg:null,
    back:false,
  },
  /* 生命周期函数--监听页面加载 */
  onLoad: function(options) {
    this.setData({
      hotel_id: options.hotel_id
    });
    this.getMemberMsg(options.hotel_id);
  },
  onShow() {
    let back = this.data.back;
    if (back){
      this.setData({
        back: false,
      })
      this.getMemberMsg(this.data.hotel_id);
    }
  },
  getMemberMsg(id) {
    let _this = this;
    newRes.getMemberMsg({
      hotel_id: id
    }).then((res) => {
      _this.setData({
        msg: res.data
      })
    }).catch((err) => {
      console.log(err)
    });
  },
  amend() {
    let msg = this.data.msg;
    this.setData({
      back:true,
    })
    wx.navigateTo({
      url: '../amendMsg/amendMsg?hotel_id=' + this.data.hotel_id + "&name=" + msg.name + "&idcard=" + msg.idcard + "&mobile=" + msg.mobile + "&card_level_name=" + msg.card_level_name,
    })
  }
})