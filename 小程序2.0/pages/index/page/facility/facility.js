// pages/index/page/facility/facility.js
let WxParse = require('../../../../wxParse/wxParse.js');
import { hosts , api , request } from "../../../../utils/api.js";
Page({
  /* 页面的初始数据 */
  data: {
    hotel: '',
    tabs: 1,
    tabsVal: 1,
    height: '',
    tabsFacility: '',
    tabsPolicy: '',
    tabsPhoto: '',
    tabsAddr: '',
    markers:[],
  },
  /* 生命周期函数--监听页面加载 */
  onLoad: function(options) {
    var id = options.id;
    this.getFacility(id);
    this.getTabsFacility();
    this.getTabsPolicy();
    this.getTabsPhoto();
    this.getTabsAddr();
    this.getHeight();
  },
  chooseTabs(e) {
    var i = e.currentTarget.dataset.index;
    this.setData({
      tabs: i, 
      tabsVal: i,
    });
  },
  getFacility: function(id) {
    var _this = this;
    request({
      url: api.hotelfacilityDetails + id,
      method: 'GET'
    }).then(function (res) {
      var article = `<div style="background-color:#fff">${res.data.intro}</div>`;
      WxParse.wxParse('article', 'html', article, _this, 5);
      _this.setData({
        hotel: res.data,
        markers: [{
          latitude: res.data.lat,
          longitude: res.data.lng,
          title: res.data.intro,
        }],
      });
    }).catch(function(err) {
      console.log(err)
      wx.showToast({
        title: '请求数据失败',
        icon: 'none',
        mask: true
      })
    })
  },
  getTabsFacility() {
    var query = wx.createSelectorQuery();
    var _this = this;
    query.select('.tabs').boundingClientRect(function(rect) {
      _this.setData({
        tabsFacility: rect.height*2,
      });
    }).exec();
  },
  getTabsPolicy() {
    var _this = this;
    var query = wx.createSelectorQuery();
    query.select('.facilityServer').boundingClientRect(function(rect) {
      _this.setData({
        tabsPolicy: rect.height + _this.data.tabsFacility * 2,
      });
    }).exec();
  },
  getTabsPhoto() {
    var _this = this;
    var query = wx.createSelectorQuery();
    query.select('.hotelPolicy').boundingClientRect(function(rect) {
      _this.setData({
        tabsPhoto: rect.height + _this.data.tabsPolicy * 2,
      });
    }).exec();
  },
  getTabsAddr() {
    var _this = this;
    var query = wx.createSelectorQuery();
    query.select('.photoDetails').boundingClientRect(function(rect) {
      _this.setData({
        tabsAddr: rect.height + _this.data.tabsPhoto * 2,
      });
    }).exec();
  },
  getHeight() {
    var _this = this;
    var query = wx.createSelectorQuery();
    query.select('.hotel-addr').boundingClientRect(function(rect) {
      _this.setData({
        height: rect.height + _this.data.tabsAddr * 2,
      });
    }).exec();
  },
  getScroll(e) {
    var scrollTop  = e.detail.scrollTop;
    var tabs = 1;
    if (scrollTop == 0) {
      tabs = 1;
    };
    if (scrollTop > this.data.tabsFacility){
      tabs = 2;
    };
    if (scrollTop > this.data.tabsPolicy) {
      tabs = 3;
    };
    if (scrollTop > this.data.tabsPhoto) {
      tabs = 4;
    };
    this.setData({
      tabs: tabs,
    })
  },
  // 地图
  map: function () {
    let latitude = Number(this.data.markers[0].latitude);
    let longitude = Number(this.data.markers[0].longitude);
    wx.openLocation({
      latitude: latitude,
      longitude: longitude,
      scale: 15,
      name: this.data.markers[0].title,
      address: this.data.hotel.address
    })
  },
  watchRoomType(){
    wx.navigateBack({
      delta:1,
    })
  }
})