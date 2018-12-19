// pages/index/page/commonUse/commonUse.js
import {
  User
} from "../../../../utils/user.js";
let user = new User();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    optionAdd:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getUserList();
  },
  onShow(){
    if (!this.data.optionAdd){
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
      success: function(res) {
        _this.setData({
          personNumber: res.data
        })
      }
    });
    user.queryList(function(res) {
      _this.setData({
        list: res,
      })
    })
  },
  init() {
    let list = this.data.list;
    for (let i = 0; i < list.length; i++) {
      list[i].choose = false;
    };
    this.setData({
      list: list
    });
  },
  addUser() {
    this.setData({
      optionAdd:true
    });
    this.init();
    wx.navigateTo({
      url: '../../../addUser/addUser',
    });
  },
  editUser(e) {
    this.setData({
      optionAdd: true
    });
    this.init();
    wx.navigateTo({
      url: '../../../amendUser/amendUser?id=' + e.detail,
    });
  },
})