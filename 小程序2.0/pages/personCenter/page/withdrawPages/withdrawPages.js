// pages/personCenter/page/withdrawPages/withdrawPages.js
import newRes from "../../../../utils/api.js"
import Reg from "../../../../utils/reg.js"
Page({
  /* 页面的初始数据 */
  data: {
    msg:null,
    id: null,    
    hotel_id: null,
    amout_money: '',
    min_money: '',
    money: '',
    chooseBank: false,
    bankCard: null,
    index: 0,
    back: false,
    canOption: true,
  },
  /* 生命周期函数--监听页面加载 */
  onLoad: function(options) {
    let hotel_id = options.hotel_id;
    let id = options.id;
    this.setData({
      id: options.id,
      hotel_id: hotel_id,
    });
    this.getCard();
    this.oneHotel(id);
  },
  oneHotel(id) {
    let _this = this;
    newRes.oneHotelBrokerage({
      id:id
    }).then((res) => {
      _this.setData({
        msg:res.data,
        amout_money: res.data.amout_money,
        min_money: res.data.min_money,
        money: res.data.amout_money
      });
    })
    
  },
  onShow() {
    let back = this.data.back;
    let id = this.data.id;
    if (back) {
      this.getCard();
      this.oneHotelBrokerage(id);
    };
  },
  getCard() {
    let _this = this;
    newRes.gatBankCard().then((res) => {
      let arr = res.data;
      _this.setData({
        bankCard: arr
      });
    }).catch((err) => {
      console.log(err)
      wx.showToast({
        title: err.data.msg ? err.data.msg : "系统繁忙，请稍后再试",
        icon: "none",
        mask: true
      })
    });
  },
  getBankPop() {
    this.setData({
      chooseBank: !this.data.chooseBank
    });
  },
  choose(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      index: index
    });
    this.getBankPop();
  },
  getMoney(e) {
    let money = e.detail.value;
    if (!Reg.float(money)){
      money = money == '' ? '' : Math.floor(money * 100) / 100;
    };
    this.setData({
      money: money,
    })
  },
  // setMoney() {
  //   let money = Number(this.data.money);
  //   let amout_money = Number(this.data.amout_money);
  //   let min_money = Number(this.data.min_money);
  //   if (money < min_money) {
  //     wx.showToast({
  //       title: '提现金额不能小于最小金额哦',
  //       icon: "none"
  //     });
  //     money = min_money;
  //   };
  //   if (money > amout_money) {
  //     wx.showToast({
  //       title: '提现金额不能大于可提现金额哦',
  //       icon: "none"
  //     });
  //     money = amout_money;
  //   };
  //   this.setData({
  //     money: money,
  //   })
  // },
  // 全部提取
  allWithdraw() {
    this.setData({
      money: this.data.amout_money
    });
  },
  // 提现到银行卡
  withdraw() {
    let canOption = this.data.canOption;
    let bankCard = this.data.bankCard;
    let hotel_id = this.data.hotel_id;
    let id = this.data.id;
    let money = Number(this.data.money);
    let min_money = Number(this.data.min_money);
    let amout_money = Number(this.data.amout_money);
    let index = this.data.index;
    let bank_id = bankCard[index].id;
    let _this = this;
    if (money == ''){
      wx.showToast({
        title: '请输入提取金额',
        icon: "none",
        mask: true
      });
      return;
    };
    if (bankCard.length == 0) {
      wx.showToast({
        title: '请先添加银行卡',
        icon: "none",
        mask: true
      });
      return;
    };
    if (money < min_money) {
      wx.showToast({
        title: '提现金额不能小于最小金额哦',
        icon: "none",
        mask: true
      });
      return;
    };
    if (money > amout_money) {
      wx.showToast({
        title: '提现金额不能大于可提现金额哦',
        icon: "none",
        mask: true
      });
      return;
    };
    if (!canOption){
      return;
    };
    this.setData({
      canOption: false
    });
    newRes.withdraw({
      hotel_id: hotel_id,
      money: money,
      bank_id: bank_id,
    }).then((res) => {
      wx.showToast({
        title: "操作成功",
        duration: 1000,
        mask: true
      });
      setTimeout(() => {
        _this.setData({
          canOption: true
        });
        wx.navigateBack({
          delta:1
        });
      }, 1000);
    }).catch((err) => {
      console.log(err)        
      _this.setData({
        canOption: true
      });
      wx.showToast({
        title: err.data.msg ? err.data.msg : "系统繁忙，请稍后再试",
        icon: "none",
        mask: true
      })
    });
  },
  oneHotelBrokerage() {
    let _this = this;
    newRes.oneHotelBrokerage({
      id: this.data.id
    }).then((res) => {
      _this.setData({
        amout_money: res.data.amout_money,
      });
    }).catch((err) => {
      console.log(err)
      wx.showToast({
        title: err.data.msg ? err.data.msg : '系统繁忙，请稍后再试',
        icon: "none",
        mask: true
      })
    })
  },
  addNewCard() {
    this.setData({
      back: true
    });
    this.getBankPop();
    wx.navigateTo({
      url: '../addBankCard/addBankCard',
    })
  }
})