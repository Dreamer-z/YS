// pages/personCenter/page/bill/bill.js
import { api, billList } from '../../../../utils/api.js';
Page({
  data: {
    billDetails:true,
    billData:[],
  },
  onLoad: function (options) {
    this.bill()
  },
  bill(){
    let _this = this;
    billList().then(function(res){
      let billDetails = true;
      if (res.data.length > 0){
        billDetails = false;
      };
      _this.setData({
        billDetails: billDetails,
        billData: res.data,
      });
    }).catch(function(err){
      console.log(err)
      wx.showToast({
        title: '获取账单列表失败',
        icon:'none',
        mask: true
      })
    })
  },
  billDetails:function(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../billDetails/billDetails?id='+ id,
    })
  }
})