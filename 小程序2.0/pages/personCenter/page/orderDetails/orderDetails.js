// pages/personCenter/page/orderDetails/orderDetails.js
import newRes,{
  hosts,
  api,
  preorder,
  request
} from "../../../../utils/api.js";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    orderDetails: [],
    back: false,
    hotelDistribute: false,
    mode:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let preorder_id = options.preorder_id;
    let _this = this;
    this.getDetail(preorder_id); 
    this.setData({
      mode: wx.getStorageSync("miniapp_mode")
    })
    newRes.getHotelDistribute({
      hid: options.hotel_id
    }).then(res => {
      _this.setData({
        hotelDistribute: res.data.status
      })
    }).catch(err => {
      console.log(err)
    })
  },
  onShow(){
    let back = this.data.back;
    let preorder_id = this.data.preorder_id;
    if(back){
      this.getDetail(preorder_id);
      this.setData({
        back: false
      });
    };
  },
  getDetail(preorder_id){
    // 订单详情
    let _this = this;
    preorder(preorder_id).then(function (data) {
      _this.setData({
        preorder_id: preorder_id,
        orderDetails: data.data,
      })
    }).catch(function () {
      wx.showToast({
        title: '查询失败',
        icon: 'none',
        mask: true
      })
    });
  },
  // 关闭其他所有页面返回主页
  backIndex: function() {
    wx.switchTab({
      url: '/pages/index/index'
    })
  },
  // 地图
  map: function () {
    let that = this;
    let latitude = Number(this.data.orderDetails.hotel.lat);
    let longitude = Number(this.data.orderDetails.hotel.lng);
    wx.openLocation({
      latitude: latitude,
      longitude: longitude,
      scale: 14,
      name: that.data.orderDetails.hotel.hotel_name,
      address: that.data.orderDetails.hotel.address
    });
  },
  // 选房
  chooseRoom: function() {
    let orderDetails = this.data.orderDetails;
    this.setData({
      back:true
    });
    wx.navigateTo({
      url: '../../../chooseRoom/chooseRoom?room=' + JSON.stringify(orderDetails.snap) + '&come_time=' + orderDetails.come_time + '&leave_time=' + orderDetails.leave_time + "&hotel_id=" + orderDetails.hotel.id + "&preorder_id=" + orderDetails.id + "&room_type_name=" + orderDetails.room_type_name
    })
  },
  toPopularize() {
    wx.navigateTo({
      url: '/pages/personCenter/page/popularize/popularize'
    })
  }
})