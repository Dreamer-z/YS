// pages/index/page/amendUser/amendUser.js
import {User} from "../../../../utils/user.js";
let user = new User();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    newName: '',
    newTel: '',
    newIdCard: '',
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取当前用户信息
    let userId = options.id; 
    let _this = this;
    user.getInfo(userId,function(res){
      _this.setData({
        id: userId,
        newName: res.data.name,
        newTel: res.data.mobile,
        newIdCard: res.data.idcard,
      })
    })
  },
  // 获取用户输入姓名
  newName: function (e) {
    let newName = e.detail.value;
    this.setData({ newName: newName });
  },
  // 获取用户输入电话号码
  newTel: function (e) {
    let newTel = e.detail.value;
    this.setData({ newTel: newTel });
  },
  // 获取用户输入身份证号
  newIdCard: function (e) {
    let newIdCard = e.detail.value;
    this.setData({ newIdCard: newIdCard });
  },
  // 完成并提交新数据
  finish: function () {
    let userId = this.data.id;
    let newName = this.data.newName;
    let newTel = this.data.newTel;
    let newIdCard = this.data.newIdCard;
    let _this = this;
    user.finish(userId, newName, newTel, newIdCard)
  },
  // delete: function () {
  //   wx.showToast({
  //     title: '删除成功',
  //     icon: "success"
  //   })
  //   setTimeout(function(){
  //     wx.navigateBack({
  //       delta: 1
  //     });
  //   },1000)
  // },
})