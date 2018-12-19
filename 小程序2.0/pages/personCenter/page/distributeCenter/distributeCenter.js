// pages/personCenter/page/distributeCenter/distributeCenter.js
import newRes from "../../../../utils/api.js";
import Host from "../../../../utils/hosts.js";
let app = getApp();
Page({
  /* 页面的初始数据 */
  data: {
    hotel:[],
    msg: null,
    verify:false,
    back: false,
    popImg: null,
    popup: false,
  },
  /* 生命周期函数--监听页面加载 */
  onLoad: function(options) {
    this.verifyWithdraw();
    this.distributeCenter();
    this.firstLogin();
    this.getHotel();
  },
  onShow(){
    let back = this.data.back;
    if(back){
      this.verifyWithdraw();
      this.distributeCenter();
      this.setData({
        back: false,
      });
    };
  },
  // 验证是否首次进入小程序个人中心
  firstLogin() {
    let _this = this;
    try {
      let data = wx.getStorageSync("first_login");
      let popup = this.data.popup;
      let status = data.click_center;
      if (status == 0) {
        popup = true
      } else {
        popup = false
      };
      this.setData({
        popImg: data.center_img,
        popup: popup,
      });
    } catch (e) {
      console.log(e)
    }
  },
  // 发送首次进去状态
  sendFirstLogin() {
    let _this = this;
    newRes.sendFirstLogin({
      type: 2
    }).catch((err) => {
      console.log(err)
    });
  },
  // 第一次进入小程序弹窗
  pop() {
    this.setData({
      popup: false,
    });
    this.sendFirstLogin();
    try {
      let data = wx.getStorageSync("first_login");
      data.click_center = 1;
      wx.setStorage({
        key: 'first_login',
        data: data,
      });
    } catch (e) {
      console.log(e)
    };
  },
  getHotel() {
    let _this = this; 
    wx.showLoading({
      title: '加载中...',
      mask:true
    })
    newRes.getHotel({
      key: Host.hosts.key
    }).then(function (res) {
      wx.hideLoading();
      let msg = res.data;
      _this.setData({
        hotel: msg.hotel
      });
    }).catch(function (err) {
      console.log(err)
    });
  },
  distributeCenter() {
    let _this = this;
    newRes.distributeCenter().then((res) => {
      _this.setData({
        msg: res.data,
      });
    }).catch((err) => {
      wx.showToast({
        title: '系统繁忙，请稍后再试',
        icon: "none",
        mask: true
      })
      console.log(err)
    });
  },
  // 查询分销账户是否身份验证
  verifyWithdraw() {
    let _this = this;
    newRes.verifyWithdrawId().then((res) => {
      _this.setData({
        verify: res.data.status,
      });
    }).catch((err) => {
      wx.showToast({
        title: '身份验证失败',
        icon: "none",
        mask: true
      })
      console.log(err)
    });
  },
  withdraw() {
    let verify = this.data.verify;
    this.setData({
      back: true,
    });
    if(verify){
      wx.navigateTo({
        url: '../withdraw/withdraw',
      })
    }else{
      wx.navigateTo({
        url: '../withdrawMaterial/withdrawMaterial',
      })
    }
  },
  // 判断用户是否授权
  authSetting: function (e) {
    let _this = this;
    let hotel = this.data.hotel;
    if(hotel.length < 1){
      wx.showModal({
        title: '温馨提示',
        content: '推广返利活动暂未开通，敬请期待！',
        showCancel:false
      });
      return;
    }
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              app.globalData.userInfo = res.userInfo;
              app.sendUserMsg(res.userInfo);
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            }
          });
          _this.popularize();
        } else {
          wx.navigateTo({
            url: '../../../setting/setting',
          })
        }
      }
    });
  },
  popularize() {
    let hotel = this.data.hotel;
    if (hotel.length == 0){
      wx.showToast({
        title: '分销活动已结束，敬请期待！',
        icon:'none',
        mask: true
      });
      return;
    };
    this.setData({
      back: true,
    });
    wx.navigateTo({
      url: '../popularize/popularize',
    })
  },
  bankCard() {
    this.setData({
      back: true,
    });
    wx.navigateTo({
      url: '../bankCard/bankCard',
    })
  },
  getDistributeBrokerage() {
    this.setData({
      back: true,
    });
    wx.navigateTo({
      url: '../distributeBrokerage/distributeBrokerage',
    })
  },
  distributeOrder() {
    this.setData({
      back: true,
    });
    wx.navigateTo({
      url: '../distributeOrder/distributeOrder',
    });
  },
  myClientele() {
    this.setData({
      back: true,
    });
    wx.navigateTo({
      url: '../myClientele/myClientele',
    })
  },
  getRecord() {
    this.setData({
      back: true,
    });
    wx.navigateTo({
      url: '../withdrawRecord/withdrawRecord',
    })
  }
})