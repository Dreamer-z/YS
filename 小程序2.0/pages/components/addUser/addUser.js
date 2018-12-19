// pages/components/addUser/addUser.js
import {
  User
} from "../../../utils/user.js";
import reg from "../../../utils/reg.js";
let user = new User();
Component({
  /* 组件的属性列表 */
  properties: {

  },
  /* 组件的初始数据 */
  data: {
    cansend:true,
    userName:'',
    userTel:'',
    userIdCard:'',
  },
  /* 组件的方法列表 */
  methods: {
    // 获取用户输入姓名
    newName: function (e) {
      let username = e.detail.value;
      this.setData({ userName: username });
    },
    // 获取用户输入电话号码
    newTel: function (e) {
      let tel = e.detail.value;
      this.setData({ userTel: tel });
    },
    // 获取用户输入身份证号
    newIdCard: function (e) {
      let userIdCard = e.detail.value;
      this.setData({ userIdCard: userIdCard });
    },
    // 添加联系人
    addToUser: function () {
      if (!this.data.cansend){
        return;
      };
      this.setData({ cansend: false })
      let _this = this;
      let name = this.data.userName;
      let tel = this.data.userTel;
      let idcard = this.data.userIdCard;
      if (name == '') {
        wx.showToast({
          title: '请填写姓名',
          icon: "none",
          mask: true
        });
        this.setData({ cansend: true })
        return;
      };
      if (tel == '' || reg.regTel(tel) == false) {
        wx.showToast({
          title: '手机号有误',
          icon: "none",
          mask: true
        });
        this.setData({ cansend: true })
        return;
      };
      if (idcard == '' || reg.regIdCard(idcard) == false) {
        wx.showToast({
          title: '身份证号有误',
          icon: "none",
          mask: true
        });
        this.setData({ cansend: true })
        return;
      };
      user.addToUser(name, tel, idcard, function (res) {
        if (res){
          _this.setData({
            userName: '',
            userTel: '',
            userIdCard: '',
            cansend: true
          });
          setTimeout(()=>{
            wx.navigateBack({
              delta: 1
            });
          },1000)
        }else{
          _this.setData({
            cansend: true
          });
        }
      })
    },
  }
})
