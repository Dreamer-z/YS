// pages/personCenter/page/myInvoice/myInvoice.js
Page({
  /* 页面的初始数据 */
  data: {
    invoice:true,
    invoiceEmpty:true,
    history:false,
    historyEmpty:true,
    checked:false,
    next:false,
  },
  /* 生命周期函数--监听页面加载 */
  onLoad: function (options) {

  },
  // 切换顶部tab
  changeType:function(e){
    if(e.currentTarget.id == "type1"){
      this.setData({
        invoice: true,
        history: false
      })
    }else{
      this.setData({
        invoice: false,
        history: true
      })
    }
  },
  // 判断下一步按钮是否为选中
  invoice:function(e){
    if (e.detail.value.length > 0) {
      this.setData({ next: true })
    } else {
      this.setData({ next: false })
    }
  },
  // 全选按钮
  selectAll:function(e){
    if (e.detail.value.length > 0){
      this.setData({ checked: true})
    }else{
      this.setData({ checked: false })
    }
  },
  // 下一步操作
  start:function(){
    wx.navigateTo({
      url: '../invoice/invoice',
    })
  },
})