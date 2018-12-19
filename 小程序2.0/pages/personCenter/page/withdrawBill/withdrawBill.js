// pages/personCenter/page/withdrawBill/withdrawBill.js
import newRes from "../../../../utils/api.js";
Page({
  /* 页面的初始数据 */
  data: {
    msg:null,
  },
  /* 生命周期函数--监听页面加载 */
  onLoad: function (options) {
    let id = options.id;
    this.withdrawRecordDetails(id)
  },
  withdrawRecordDetails(id){
    let _this = this;
    newRes.withdrawRecordDetails({
      did:id
    }).then((res)=>{
      _this.setData({
        msg:res.data
      })
    }).catch((err)=>{
      console.log(err)
      wx.showToast({
        title: err.data.msg ? err.data.msg : "系统繁忙，请稍后再试",
        icon: "none",
        mask: true
      })
    })
  }
})