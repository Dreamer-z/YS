// pages/personCenter/page/bankCard/bankCard.jsimport 
import newRes from "../../../../utils/api.js";
Page({
  /* 页面的初始数据 */
  data: {
    bankCard:null,
    cardIndex: null,
    display:false,
    req:false,
  },
  /* 生命周期函数--监听页面加载 */
  onLoad: function(options) {
    this.getCard();
  },
  onShow(){
    if(this.data.req){
      this.getCard();
    };
  },
  getCard(){
    let _this = this;
    newRes.gatBankCard().then((res)=>{
      let arr = res.data;
      _this.setData({
        bankCard: arr
      });
    }).catch((err)=>{
      console.log(err)
      wx.showToast({
        title: err.data.msg ? err.data.msg :"系统繁忙，请稍后再试",
        icon:"none",
        mask: true
      })
    });
  },
  touchStart(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      sX: e.changedTouches[0].pageX,
      cardIndex: index,
    })
  },
  touchMove(e) {
    let x = e.changedTouches[0].pageX;
    let sX = this.data.sX;
    if (sX - x < 0) {
      this.setData({
        display: false,
      });
    };
    if (sX - x > 0) {
      this.setData({
        display: true,
      });
    }
  },
  del(e){
    let index = e.currentTarget.dataset.index;
    let bankCard = this.data.bankCard;
    let _this = this;
    wx.showModal({
      title: '提示',
      content: '删除后不可恢复，您确定要删除吗？',
      success(res){
        if (res.confirm) {
          newRes.delBankCard({
            id: bankCard[index].id
          }).then((res) => {
            bankCard.splice(index, 1);
            _this.setData({
              bankCard: bankCard,
            })
          }).catch((err) => {
            console.log(err)
            wx.showToast({
              title: err.data.msg ? err.data.msg : "系统繁忙，请稍后再试",
              icon: "none",
              mask: true
            })
          })
        }; 
      }
    });
  },
  addCard(){
    this.setData({
      req:true,
      display:false
    });
    wx.navigateTo({
      url: '../addBankCard/addBankCard',
    })
  }
})