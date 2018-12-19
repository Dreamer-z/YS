// pages/personCenter/page/transactResult/transactResult.js
import newRes from "../../../../utils/api.js";
Page({
  /* 页面的初始数据 */
  data: {
    hotel_id:'',
    result: false,
    msg:null,
  },
  /* 生命周期函数--监听页面加载 */
  onLoad: function (options) {
    this.setData({
      hotel_id: options.hotel_id,
    })
    this.getHotelMember(options.hotel_id);
  },
  getHotelMember(hotel_id){
    let _this = this;
    newRes.getHotelMember({
      hotel_id:hotel_id
    }).then((res) => {
      _this.setData({
        msg:res.data,
        result:true,
      })
    }).catch((err)=>{
      wx.showToast({
        title: '查询会员信息失败',
        icon:"none",
        mask: true
      })
      console.log(err)
    })
  },
  getDetails(){
    wx.redirectTo({
      url: '../memberCenter/memberCenter?id=' + this.data.hotel_id,
    })
  },
  again(){
    wx.redirectTo({
      url: '../chooseHotel/chooseHotel',
    })
  }
})