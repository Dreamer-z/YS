// pages/personCenter/page/popularize/popularize.js
import newRes from "../../../../utils/api.js";
import Host from "../../../../utils/hosts.js";
Page({
  /* 页面的初始数据 */
  data: {
    msg: null,
    tabsInd: 1,
    open: false,
    open2: false,
    sharePop: false,
    hotel: null,
    chooseInd: 0,
    room: null,
    goods: null,
    goodsType: 0,
    type: null,
    hote_id: null,
    room_id: null,
    index: null,
  },
  /* 生命周期函数--监听页面加载 */
  onLoad: function (options) {
    this.getHotel();
    wx.hideShareMenu();
  },
  getHotel() {
    let _this = this;
    let hotel = this.data.hotel;
    let hotel_picker = this.data.hotel_picker;
    // 授权酒店列表
    wx.showLoading({
      title: '加载中...', 
      mask: true
    });
    newRes.getHotel({
      key: Host.hosts.key
    }).then(function (res) {
      wx.hideLoading();
      let msg = res.data;
      _this.setData({
        msg: msg,
        hotel: msg.hotel
      });
      _this.getGoods();
    }).catch(function (err) {
      console.log(err)
      wx.showToast({
        title: err.data.msg ? err.data.msg : '系统繁忙，请稍后再试',
        icon: "none",
        mask: true
      });
    });
  },
  getGoods() {
    let hotel = this.data.hotel;
    let chooseInd = this.data.chooseInd;
    let _this = this;
    let roomkey = [];
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    newRes.getRoomType({
      hotel_id: hotel[chooseInd].id
    }).then(function (res) {
      wx.hideLoading();
      let goods = res.data.room_type;
      for (let i = 0; i < goods.length; i++) {
        roomkey[i] = false;
      };
      _this.setData({
        goods: goods,
        room: res.data,
        roomkey: roomkey,
      })
    }).catch(function (err) {
      console.log(err)
      wx.showToast({
        title: '查询房型失败',
        icon: 'none',
        mask: true
      })
    });
  },
  getTabs(e) {
    this.setData({
      tabsInd: e.currentTarget.dataset.index
    });
  },
  openShare(e) {
    let index = e.currentTarget.dataset.index;
    let chooseInd = this.data.chooseInd;
    let type = e.currentTarget.dataset.type;
    let hotel = this.data.hotel;
    let goods = this.data.goods;
    if (type == 2) {
      this.setData({
        sharePop: !this.data.sharePop,
        type: type,
        hotel_id: hotel[index].id,
        index: index
      });
    } else if (type == 1) {
      this.setData({
        sharePop: !this.data.sharePop,
        type: type,
        hotel_id: hotel[chooseInd].id,
        room_id: goods[index].id,
        index: index
      });
    }
  },
  closeShare() {
    this.setData({
      sharePop: !this.data.sharePop,
    });
  },
  share() {
    let type = this.data.type;
    let hotel_id = this.data.hotel_id;
    let room_id = this.data.room_id;
    let hotel = this.data.hotel;
    let goods = this.data.goods;
    let index = this.data.index;
    let hotel_img = this.data.hotel_img;
    let hotel_msg = null, goods_msg = null;
    if (type == 2) {
      hotel_msg = JSON.stringify(hotel[index]);
      hotel_img = hotel[index].logo ? hotel[index].logo : hotel[index].share_info.hotel_default_img;
    } else if (type == 1) {
      goods_msg = JSON.stringify(goods[index]);
      hotel_img = goods[index].logo ? goods[index].logo : goods[index].share_info.room_default_img;
    };
    this.setData({
      sharePop: !this.data.sharePop
    });
    wx.navigateTo({
      url: '../popularizeDetails/popularizeDetails?type=' + type + '&hotel_id=' + hotel_id + '&hotel_img=' + hotel_img + '&room_id=' + room_id + '&hotel_msg=' + hotel_msg + '&goods_msg=' + goods_msg,
    })
  },
  open() {
    this.setData({
      open: !this.data.open,
    });
  },
  open2() {
    this.setData({
      open2: !this.data.open2
    });
  },
  cut(e) {
    this.setData({
      chooseInd: e.detail.value
    });
    this.getGoods();
  },
  onShareAppMessage: function (res) {
    let hotel = this.data.hotel;
    let goods = this.data.goods;
    let type = this.data.type;
    let index = this.data.index;
    let invitied_code = wx.getStorageSync("invitied_code");
    wx.hideShareMenu();
    this.closeShare();
    if (type == 2) {
      // console.log({
      //   type: type,
      //   title: hotel[index].share_info.hotel_share_title,
      //   imageUrl: hotel[index].share_info.hotel_share_img ? hotel[index].share_info.hotel_share_img : hotel[index].share_info.hotel_default_img,
      //   path: '/pages/index/index?hid=' + this.data.hotel_id + '&code=' + invitied_code
      // })
      return {
        title: hotel[index].share_info.hotel_share_title,
        imageUrl: hotel[index].share_info.hotel_share_img ? hotel[index].share_info.hotel_share_img : hotel[index].share_info.hotel_default_img,
        path: '/pages/index/index?hid=' + this.data.hotel_id + '&code=' + invitied_code
      }
    } else if (type == 1) {
      // console.log({
      //   type: type,
      //   title: goods[index].share_info.room_share_title,
      //   imageUrl: goods[index].share_info.room_share_img ? goods[index].share_info.room_share_img : goods[index].share_info.room_default_img,
      //   path: '/pages/index/index?hid=' + this.data.hotel_id + '&rt=' + this.data.room_id + '&code=' + invitied_code
      // })
      return {
        title: goods[index].share_info.room_share_title,
        imageUrl: goods[index].share_info.room_share_img ? goods[index].share_info.room_share_img : goods[index].share_info.room_default_img,
        path: '/pages/index/index?hid=' + this.data.hotel_id + '&rt=' + this.data.room_id + '&code=' + invitied_code
      }
    }
  }
})