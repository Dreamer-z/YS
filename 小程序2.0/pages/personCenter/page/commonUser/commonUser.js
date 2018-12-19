// pages/personCenter/page/commonUser/commonUser.js
import {
  User
} from "../../../../utils/user.js";
let user = new User();
Page({
  /* 页面的初始数据 */
  data: {
    list: [],
    optionAdd: false,
  },
  /* 生命周期函数--监听页面加载 */
  onLoad: function () {
    this.getUserList();
  },
  onShow() {
    if (!this.data.optionAdd) {
      return;
    };
    this.setData({
      optionAdd: false
    });
    this.getUserList();
  },
  getUserList() {
    let _this = this;
    wx.getStorage({
      key: 'personNumber',
      success: function (res) {
        _this.setData({
          personNumber: res.data
        })
      }
    });
    user.queryList(function (res) {
      _this.setData({
        list: res,
      })
    })
  },
  addUser() {
    this.setData({
      optionAdd: true
    });
    wx.navigateTo({
      url: '../../../addUser/addUser',
    });
  },
  editUser(e) {
    wx.navigateTo({
      url: '../../../amendUser/amendUser?id=' + e.detail,
    });
  },
})