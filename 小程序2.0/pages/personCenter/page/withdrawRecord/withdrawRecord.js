// pages/personCenter/page/withdrawRecord/withdrawRecord.js
import newRes from "../../../../utils/api.js";
Page({
  /* 页面的初始数据 */
  data: {
    record: [], 
    page: 1,
    pageNum: 10,
    lock: false,
  },
  /* 生命周期函数--监听页面加载 */
  onLoad: function(options) {
    let page = this.data.page;
    let pageNum = this.data.pageNum;
    this.getRecord(page, pageNum);
  },
  getRecord(page,pageNum,callback){
    let lock = this.data.lock;
    if (lock) {
      return;
    }; 
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    let _this = this;
    let record = this.data.record;
    this.setData({
      lock: true,
    })
    newRes.withdrawRecord({
      page: page,
      pageNum: pageNum
    }).then((res) => {
      wx.hideLoading(); 
      if (page > res.data.pages) {
        wx.showToast({
          title: '没有更多了',
          icon: 'none',
          mask: true
        });
        _this.setData({
          lock: false,
        });
        return;
      };
      if (res.data.list.length > 0) {
        for (let i = 0; i < res.data.list.length; i++) {
          record.push(res.data.list[i]);
        };
        _this.setData({
          lock: false,
          record: record,
        });
      } else {
        _this.setData({
          lock: false,
        });
      };
      callback && callback()
    }).catch((err) => {
      console.log(err)
      wx.showToast({
        title: err.data.msg ? err.data.msg : "系统繁忙，请稍后再试",
        icon: "none",
        mask: true
      })
    });
  },
  onReachBottom: function () {
    let page = this.data.page;
    let pageNum = this.data.pageNum;
    let _this = this;
    page++;
    this.getRecord(page, pageNum, function () {
      _this.setData({
        page: page
      });
    });
  },
  getDetails(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../withdrawBill/withdrawBill?id=' + id,
    })
  }
})