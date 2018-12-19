// pages/personCenter/page/addBankCard/addBankCard.js
import newRes from "../../../../utils/api.js";
Page({
  /* 页面的初始数据 */
  data: {
    cardMsg:null,
    showBank: false,
    bankNum: '',
    accountAddr:'',
    name:'',
  },
  /* 生命周期函数--监听页面加载 */
  onLoad: function(options) {

  },
  gatBankNum(e) {
    this.setData({
      bankNum: e.detail.value
    })
  },
  getBank(){
    let bankNum = this.data.bankNum;
    if (bankNum.length <= 8){
      return;
    };
    let _this=this;
    newRes.getCardMsg({
      bankNo: bankNum
    }).then((res)=>{
      _this.setData({
        showBank:true,
        cardMsg:res.data
      })
    }).catch((err)=>{
      console.log(err)
      wx.showToast({
        title: err.data.msg ? err.data.msg:"请检查银行卡号是否有误",
        icon:'none',
        mask: true
      })
    })
  },
  getAccountAddr(e) {
    this.setData({
      accountAddr: e.detail.value
    })
  },
  getName(e) {
    this.setData({
      name: e.detail.value
    })
  },
  save() {
    let _this = this;
    let cardMsg = this.data.cardMsg;
    let bankNum = this.data.bankNum;
    let accountAddr = this.data.accountAddr;
    let name = this.data.name;
    newRes.addBankCard({
      code: cardMsg.code,
      branch_bank: accountAddr,
      card_name: name,
      card_no: bankNum,
      card_type: cardMsg.card_type,
    }).then((res) => {
      wx.showToast({
        title: '添加成功',
        mask: true
      });
      _this.setData({
        showBank: false,
        bankNum: '',
        accountAddr:'',
        name:''
      });
      setTimeout(()=>{
        wx.navigateBack({
          delta: 1
        });
      },1000);
    }).catch((err) => {
      console.log(err)
      wx.showToast({
        title: err.data.msg ? err.data.msg : "系统繁忙，请稍后再试",
        icon: 'none',
        mask: true
      })
    })
  }
})