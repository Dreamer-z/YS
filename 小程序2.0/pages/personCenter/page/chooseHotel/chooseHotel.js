// pages/personCenter/page/chooseHotel/chooseHotel.js
import newRes from "../../../../utils/api.js";
import hosts from "../../../../utils/hosts.js";
Page({
  /* 页面的初始数据 */
  data: {
    hotel: [],
    back: false,
  },
  /* 生命周期函数--监听页面加载 */
  onLoad: function(options) {
    this.getHotel();
  },
  onShow() {
    let back = this.data.back;
    if (back) {
      this.getHotel();
    };
  },
  getHotel() {
    let _this = this;
    wx.showLoading({
      title: '请稍后',
      mask: true
    })
    newRes.hotelMember({
      key: hosts.hosts.key
    }).then((res) => {
      wx.hideLoading();
      _this.setData({
        hotel: res.data,
      })
    }).catch((err) => {
      console.log(err)
    })
  },
  memberCenter(e) {
    let hotel = this.data.hotel;
    let i = e.currentTarget.dataset.index;
    if (hotel[i].is_member) {
      wx.navigateTo({
        url: '../memberCenter/memberCenter?id=' + hotel[i].id,
      }); 
      // wx.navigateTo({
      //   url: '../transactResult/transactResult?hotel_id=' + hotel[i].id,
      // });
    } else {
      let back = this.data.back;
      this.setData({
        back: true,
      });
      wx.navigateTo({
        url: '../registerMember/registerMember?id=' + hotel[i].id,
      });
    }
  },
})