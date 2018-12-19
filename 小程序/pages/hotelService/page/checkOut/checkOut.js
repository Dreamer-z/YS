// pages/hotelService/page/checkOut/checkOut.js
import { api, request, checkOutCode, verifyCheckOutCode, checkOut } from '../../../../utils/api.js';
Page({
  /* 页面的初始数据 */
  data: {
    out: true,
    readRules: true,
    codeImg: '',
    codeNum: '',
    hotelData:{},
    doing:false,
  },
  /* 生命周期函数--监听页面加载 */
  onLoad: function (options) {
    let hotelData = JSON.parse(options.hotel);
    let doing = this.data.doing;
    if (hotelData.end_status != '0'){
      doing = true;
    }else{
      doing = false;
    }
    this.setData({
      hotelData: hotelData,
      doing: doing,
    })
  },
  // 判断入驻规则是否选定
  rules: function (e) {
    if (e.detail.value.length == 0) {
      this.setData({
        readRules: false,
      });
    } else {
      this.setData({
        readRules: true,
      });
    }
  },
  // 退房
  checkOut: function (e) {
    if (!this.data.readRules) {
      wx.showModal({
        title: '温馨提示',
        content: '请先同意自助续房规则并在前打钩！',
        showCancel: false,
        confirmColor: "#437ff9",
      });
      return;
    };
    this.setData({
      formId: e.detail.formId,
      out: !this.data.out,
    });
    this.code();
  },
  // 获取系统验证码
  code: function () {
    let _this = this;
    checkOutCode().then(function (res) {
      _this.setData({
        codeImg: "data:image/jpg;base64," + res.data
      })
    })
  },
  // 获取用户输入的验证码
  getCode: function (e) {
    this.setData({
      codeNum: e.detail.value,
    });
  },
  // 检测验证码
  verifyCode: function (e) {
    let _this = this;
    let hotelData = this.data.hotelData;
    let formId = this.data.formId;
    let code = this.data.codeNum;
    if (code.length != 4) {
      wx.showToast({
        title: "请输入四位验证码！",
        icon:"none"
      });
      return;
    };
    verifyCheckOutCode(code).then(function (res) {
      console.log(res)
      wx.showToast({
        title: '验证成功',
        icon: 'none',
        duration:500
      });
      _this.setData({
        codeNum:'',
        out: !_this.data.out,
      });
      checkOut({
        data:{
          room_id: hotelData.room_id,
          hotel_id: hotelData.hotel_id,
          action: 3,
          order_id: hotelData.order_id,
          form_id: formId
        }
      }).then(function(res){
        wx.showToast({
          title: "退房成功"
        });
        _this.setData({
          doing:true
        });
      }).catch(function(err){
        console.log(err)
        wx.showToast({
          title: err.data.msg,
          icon: "none"
        });
      });
    }).catch(function () {
      wx.showToast({
        title: '验证码错误',
        icon: "none"
      });
      _this.setData({
        codeNum: "",
      });
      _this.code();
    });
  },
  closeCheckOut: function () {
    this.setData({
      out: !this.data.out,
      code:'',
    })
  }
})