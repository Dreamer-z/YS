// pages/components/addUser/addUser.js
import {
  User
} from "../../../utils/user.js";
import reg from "../../../utils/reg.js";
let user = new User();
Component({
  /* 组件的属性列表 */
  properties: {
    userId: String
  },
  /* 组件的初始数据 */
  data: {
    cansend: true,
    newName: '',
    newTel: '',
    newIdCard: '',
  },
  ready(){
    this.getUser(this.properties.userId);
  },
  /* 组件的方法列表 */
  methods: {
    getUser(id) {
      // 获取当前用户信息
      let _this = this;
      user.getInfo(id, function(res) {
        _this.setData({
          id:id,
          newName: res.data.name,
          newTel: res.data.mobile,
          newIdCard: res.data.idcard,
        })
      })
    },
    // 获取用户输入姓名
    newName: function(e) {
      let newName = e.detail.value;
      this.setData({
        newName: newName
      });
    },
    // 获取用户输入电话号码
    newTel: function(e) {
      let newTel = e.detail.value;
      this.setData({
        newTel: newTel
      });
    },
    // 获取用户输入身份证号
    newIdCard: function(e) {
      let newIdCard = e.detail.value;
      this.setData({
        newIdCard: newIdCard
      });
    },
    // 完成并提交新数据
    finish: function () {
      if(!this.data.cansend){
        return;
      };
      let userId = this.data.id;
      let newName = this.data.newName;
      let newTel = this.data.newTel;
      let newIdCard = this.data.newIdCard;
      let _this = this;
      if (newName == '') {
        wx.showToast({
          title: '请填写姓名',
          icon: "none",
          mask: true
        });
        return;
      };
      if (newTel == '' || reg.regTel(newTel) == false) {
        wx.showToast({
          title: '手机号有误',
          icon: "none",
          mask: true
        });
        return;
      };
      if (newIdCard == '' || reg.regIdCard(newIdCard) == false) {
        wx.showToast({
          title: '身份证号有误',
          icon: "none",
          mask: true
        });
        return;
      };
      this.setData({
        cansend:false,
      });
      user.finish(userId, newName, newTel, newIdCard, function (bl){
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          });
        }, 1000);
      })
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
  }
})