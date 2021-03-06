// pages/personCenter/page/commonUser/commonUser.js
import { User } from "../../../../utils/user.js";
import reg from "../../../../utils/reg.js";
let user = new User();
Page({
  /* 页面的初始数据 */
  data: {
    chooseNumber: 0,
    userLi: [],
    user: [],
    userName: '',
    userTel: '',
    userIdCard: '',
    title: ["新增旅客", "常用旅客"],
    cansend: true
  },

  /* 生命周期函数--监听页面加载 */
  onLoad: function (options) {
    let _this = this;
    user.queryList(function (res) {
      _this.setData({ userLi: res })
    })
  },
  // 获取用户输入姓名
  name: function (e) {
    let username = e.detail.value;
    this.setData({ userName: username });
  },
  // 获取用户输入电话号码
  tel: function (e) {
    let tel = e.detail.value;
    this.setData({ userTel: tel });
  },
  // 获取用户输入身份证号
  idCart: function (e) {
    let userIdCard = e.detail.value;
    this.setData({ userIdCard: userIdCard });
  },
  // 添加联系人
  addToUser: function () {
    this.setData({ cansend: false })
    let _this = this;
    let name = this.data.userName;
    let tel = this.data.userTel;
    let idcard = this.data.userIdCard;
    if (name == '') {
      wx.showToast({
        title: '请填写姓名',
        icon: "none"
      });
      this.setData({ cansend: true});
      return;
    };
    if (tel == '' || reg.regTel(tel) == false) {
      wx.showToast({
        title: '手机号有误',
        icon: "none"
      });
      this.setData({ cansend: true });
      return;
    };
    if (idcard == '' || reg.regIdCard(idcard) == false) {
      wx.showToast({
        title: '身份证号有误',
        icon: "none"
      });
      this.setData({ cansend: true });
      return;
    };
    user.addToUser(name, tel, idcard,function(res,status){
      if (status){
        _this.setData({
          userName: '',
          userTel: '',
          userIdCard: '',
        })
      };
      _this.setData({ 
        userLi:res,
        cansend: true
      })
    })
  },
  chooseUser:function(){
    return;
  },
  // 编辑联系人
  editUser: function (e) {
    user.editUser('../amendUser/amendUser?id=', e);
  },
})