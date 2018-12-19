// pages/personCenter/page/distributeOrder/distributeOrder.js
import newRes from "../../../../utils/api.js";
Page({
  /* 页面的初始数据 */
  data: {
    list: [],
    page: 1,
    pageNum: 10,
    lock: false,
  },
  /* 生命周期函数--监听页面加载 */
  onLoad: function(options) {
    let page = this.data.page;
    let pageNum = this.data.pageNum;
    this.distributeOrder(page, pageNum)
  },
  distributeOrder(page, pageNum,callback) {
    let lock = this.data.lock;
    if (lock) {
      return;
    };
    let _this = this;
    let list = this.data.list;
    this.setData({
      lock: true,
    })
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    newRes.distributeOrder({
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
          list.push(res.data.list[i]);
        };
        list = res.data.list;
        _this.setData({
          lock: false,
          withdrawList: res.data,
          list: list,
        });
      } else {
        _this.setData({
          lock: false,
          withdrawList: res.data,
        });
      };
      callback && callback();
    }).catch((err) => {
      console.log(err)
      wx.showToast({
        title: err.data.msg ? err.data.msg : '系统繁忙，请稍后再试',
        icon: "none",
        mask: true
      })
    })
  },
  onReachBottom() {
    let page = this.data.page;
    let pageNum = this.data.pageNum;
    let _this = this;
    page++;
    this.distributeOrder(page, pageNum, function () {
      _this.setData({
        page: page
      });
    });
  },
})