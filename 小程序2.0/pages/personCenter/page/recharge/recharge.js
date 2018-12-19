// pages/personCenter/page/recharge/recharge.js
import newRes from "../../../../utils/api.js";
Page({
  /* 页面的初始数据 */
  data: {
    rate:0,
    hotel_id:'',
    id:'',
    quick: [100, 200, 300, 500, 1000, 2000],
    quickIndex:0,
    amount:0,
    give_amount:0
  },
  /* 生命周期函数--监听页面加载 */
  onLoad: function (options) {
    let rate = options.rate;
    let hotel_id = options.hotel_id;
    let id = options.id;
    let amount = this.data.quick[this.data.quickIndex];
    this.setData({
      hotel_id: hotel_id,
      id: id,
      rate: rate,
      amount: amount,
      give_amount: amount * rate
    })
  },
  check(e){
    let amount = this.data.quick[e.currentTarget.dataset.index];
    let rate = this.data.rate;
    this.setData({
      quickIndex:e.currentTarget.dataset.index,
      amount: amount,
      give_amount: amount * rate
    });
  },
  getAmount(e) {
    let amount = e.detail.value == "" ? 0 : Number(e.detail.value);
    let rate = this.data.rate;
    this.setData({
      amount: amount,
      give_amount: amount * rate
    })
  },
  recharge(){
    let _this = this;
    newRes.recharge({
      hotel_id: this.data.hotel_id,
      member_id: this.data.id,
      recharge_amount: this.data.amount
    }).then((res)=>{   
      let member_trade_id = res.data.member_trade_id;
      _this.memberRecharge(member_trade_id);
    }).catch((err)=>{
      console.log(err)
      });          
    // wx.redirectTo({
    //   url: '../rechargeResult/rechargeResult',
    // })
  },
  memberRecharge(id) {
    let data = this.data.msg;
    let recharge_amount = this.data.amount;
    let give_amount = this.data.give_amount;
    let _this = this;
    newRes.memberRecharge({
      'id': id
    }).then((res) => {
      let msg = res.data;
      newRes.wxPayFor(msg.timeStamp, msg.nonceStr, msg.package, msg.signType, msg.paySign).then((res) => {
        wx.navigateTo({
          url: '../rechargeResult/rechargeResult?hotel_id=' + _this.data.hotel_id + "&recharge_amount=" + recharge_amount + "&give_amount=" + give_amount,
        });
      }).catch((err) => {
        wx.showToast({
          title: '已取消支付',
          icon: "none",
          mask: true
        });
      });
    }).catch((err) => {
      console.log(err)
      wx.showToast({
        title: err.data.msg,
        icon: "none",
        mask: true
      })
    });
  }
})