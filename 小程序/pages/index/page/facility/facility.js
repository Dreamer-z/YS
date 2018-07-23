// pages/index/page/facility/facility.js
import { hosts, api, request } from "../../../../utils/api.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotel:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;
    this.getFacility(id);
  },
  getFacility:function(id){
    let _this = this;
    request({
      url: api.hotelfacilityDetails + id,
      method: 'GET'
    }).then(function (res) {
      console.log(res)
      _this.setData({ hotel : res.data});
    }).catch(function(err){
      console.log(err)
      wx.showToast({
        title: '请求数据失败',
        icon:'none'
      })
    })
  }
})