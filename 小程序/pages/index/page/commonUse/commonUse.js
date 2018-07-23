// pages/index/page/commonUse/commonUse.js
import { User } from "../../../../utils/user.js";
import reg from "../../../../utils/reg.js";
let user = new User();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    personNumber: '',
    chooseNumber: 0,
    userLi: [],
    user: [],
    userName: '',
    userTel: '',
    userIdCard: '',
    title: ["新增入住人","常用入住人"],
    cansend:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    user.queryList(function (res) {
      _this.setData({ userLi: res})
    })
  },
  onShow: function () {
    let _this = this;
    user.queryList(function (res) {
      _this.setData({ userLi: res })
    });
    wx.getStorage({
      key: 'personNumber',
      success: function (res) {
        _this.setData({
          personNumber: res.data
        })
      }
    });
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
    this.setData({ cansend :false})
    let _this = this;
    let name = this.data.userName;
    let tel = this.data.userTel;
    let idcard = this.data.userIdCard;
    if (name == ''){
      wx.showToast({
        title: '请填写姓名',
        icon: "none"
      });
      return;
    };
    if (tel == '' || reg.regTel(tel) == false) {
      wx.showToast({
        title: '手机号有误',
        icon: "none"
      });
      return;
    };
    if (idcard == '' || reg.regIdCard(idcard) == false) {
      wx.showToast({
        title: '身份证号有误',
        icon: "none"
      });
      return;
    };
    user.addToUser(name, tel, idcard,function(res){
      _this.setData({ 
        userLi:res,
        userName:'',
        userTel:'',
        userIdCard:'',
        cansend:true
      })
    })
  },
  // 选择常用联系人
  chooseUser: function (e) {
    let personNumber = this.data.personNumber;
    let userArr = this.data.userArr;
    let userLiIndex = e.currentTarget.dataset.index;
    let userLi = this.data.userLi;
    let chooseNumber = this.data.chooseNumber;
    if (userLi[userLiIndex].choose == true) {
      if (chooseNumber < 0) {
        return;
      };
      userLi[userLiIndex].choose = !userLi[userLiIndex].choose;
      chooseNumber--;
      this.setData({
        chooseNumber: chooseNumber,
        userLi: userLi,
      });
    } else {
      if (chooseNumber > personNumber - 1) {
        wx.showToast({
          title: '只能选取' + personNumber + '位哦',
          icon: 'none'
        });
        return;
      } else {
        chooseNumber++;
        userLi[userLiIndex].choose = !userLi[userLiIndex].choose;
        this.setData({
          chooseNumber: chooseNumber,
          userLi: userLi,
        });
      }
    };

  },
  navigateBack: function () {
    let userLi = this.data.userLi;
    let personNumber = this.data.personNumber;
    let user = [];
    for (let i = 0; i < userLi.length; i++) {
      if (userLi[i].choose) {
        user.push(userLi[i]);
      }
    };
    for (let j = 0; j < personNumber; j++) {
      if (user.length < personNumber) {
        user.push({});
      }
    };
    wx.setStorageSync("user", user);
    // 选中返回上一页
    wx.navigateBack({
      delta: 1
    });
    // wx.redirectTo({
    //   url: '../reservations/reservations'
    // })
  },
  // 编辑联系人
  editUser: function (e) {
    user.editUser('../amendUser/amendUser?id=',e);
  }
})