import { api, request, payWay, authHotel } from "../../utils/api.js";
import newRes from "../../utils/api.js";
import token from '../../utils/token.js';
import Host from "../../utils/hosts.js";
let app = getApp()
Page({
  data: {
    addTap: false,
    starTap: false,
    sortTap: false,
    filterTap: false,
    mask: false,
    chooseCity: '',
    chooseDistrict: '',
    // slider: {
    //   step: 100,
    //   min: 0,
    //   max: 2000,
    //   size: 20,
    // },
    // sliderValue: '',
    star: ['经济型', '三星/舒适', '四星/高档', '五星/豪华'],
    starInd: '',
    starValue: '',
    price: [{
      label: '100-200',
      choose: false
    }, {
      label: '200-500',
      choose: false
    }, {
      label: '500-1000',
      choose: false
    }, {
      label: '1000-2000',
      choose: false
    }],
    priceValue: [],
    sort: ['距离优先', "低价优先", "高价优先", "好评优先"],
    sortValue: '',
    sortInd: '',
    house: ["大床房", "双人房", "三人房", "超大房"],
    houseValue: '',
    houseInd: '',
    payWay: [],
    payValue: '',
    payInd: '',
    facility: ["健身房", "游泳池", "会议室", "娱乐室"],
    facilityValue: '',
    facilityInd: '',
    address: [],
    curreentDistrict: "",
    district: [],
    hotelList: [],
    loading:false,
    shareMsg:null,
    loadMsg: '正在加载中...'
  },
  onLoad: function (options) {
    let _this = this;
    this.log(options);
    app.versionsDetection();
    // 分享
    wx.showShareMenu({
      withShareTicket: true
    });
    // this.addr();
    // this.setData({ chooseDistrict: 0 });
  },
  // 分销进入
  invitied(options){
    if (options.rt && options.rt != '' && options.rt != undefined){
      wx.navigateTo({
        url: './page/hotel/hotel?invitied_code=' + options.code + '&id=' + options.hid + '&room_id=' + options.rt,
      });
    } else if (options.hid && options.hid != '' && options.hid != undefined){
      wx.navigateTo({
        url: './page/hotel/hotel?invitied_code=' + options.code + '&id=' + options.hid,
      });
    }
  },
  log(options){
    let _this = this;
    // 登录、设置token
    token.getTokenFromServer(function (res) {
      if (res) {
        app.globalData.tokenData = true;
        if (options.code) {
          _this.invitied(options)
        };
        _this.firstLogin();
        _this.loadData(options);
        _this.getMode();
        if (options.scene) {
          let scene = decodeURIComponent(options.scene);
          let arrPara = scene.split("&");
          let arr = [];
          let op = {};
          for (let i in arrPara) {
            arr = arrPara[i].split("=");
            op[arr[0]] = arr[1]
          };
          if (op.code && op.rt && op.rt != '' && op.rt != undefined) {
            wx.navigateTo({
              url: './page/hotel/hotel?invitied_code=' + op.code + '&id=' + op.hid + '&room_id=' + op.rt,
            });
          } else if (op.code && op.hid && !op.rt) {
            wx.navigateTo({
              url: './page/hotel/hotel?invitied_code=' + op.code + '&id=' + op.hid,
            });
          }
        };
      };
    });
  },
  // 验证是否首次进入小程序
  firstLogin() {
    let _this = this;
    newRes.firstLogin().then((res) => {
      wx.setStorageSync('first_login', res.data)
    }).catch((err) => {
      console.log(err)
    })
  },
  // nowLocation: function () {
  //   let _this = this;
  //   this.loadData();
  //// 获取用户当前位置，并请求相应的酒店列表数据
  //   wx.getLocation({
  //     type: 'wgs84',
  //     success: function (res) {
  //       let latitude = res.latitude;
  //       let longitude = res.longitude;
  //       wx.setStorage({ key: "latitude", data: latitude });
  //       wx.setStorage({ key: "longitude", data: longitude });
  //     },
  //     fail:function(err){
  //       console.log(err);
  //       wx.showToast({
  //         title: '获取您的位置失败',
  //         icon: "none",
  //         duration: 800,
            // mask: true
  //       });
  //     }
  //   });
  // },
  // 获取当前模式
  getMode(){
    newRes.getMode().then(res => {
      wx.setStorage({
        key: 'miniapp_mode',
        data: res.data.is_miniapp_mode,
        // data:false
      })
    }).catch(err => {
      console.log(err)
    })
  },
  loadData: function (options) {
    let latitude = wx.getStorageSync("latitude");
    let longitude = wx.getStorageSync("longitude");
    let _this = this;
    let hotelList = [];
    // 授权酒店列表
    authHotel({
      key: Host.hosts.key
    }).then(function (data) {
      for (let i = 0; i < data.data.length; i++) {
        hotelList[i] = data.data[i];
        // hotelList[i].distance = (hotelList[i].distance / 1000).toFixed(1);
      };
      _this.setData({ 
        hotelList: hotelList,
        loadMsg: ''
      });
      if (!options.code && hotelList.length == 1){
        wx.navigateTo({
          url: '/pages/index/page/hotel/hotel?id=' + hotelList[0].id + '&photo=' + hotelList[0].logo,
        })
      };
    }).catch(function (err) {
      console.log(err)
      wx.showToast({
        title: err.data.msg,
        icon: "none",
        duration: 800,
        mask: true
      });
    });
  },
  requestData() {
    let _this = this;
    let hotelList = [];
    wx.request({
      url: Host.getHost() + api.newHotelList,
      data: { key: Host.hosts.key},
      header: {
        'Content-Type': 'application/json',
        'Token': wx.getStorageSync("token")
      },
      method: 'GET',
      success: function (data) {
        let res = data.data.data;
        for (let i = 0; i < res.length; i++) {
          hotelList[i] = res[i];
          // hotelList[i].distance = (hotelList[i].distance / 1000).toFixed(1);
        }
        _this.setData({ hotelList: hotelList, loading: false, });
        if (hotelList.length == 1) {
          wx.navigateTo({
            url: '/pages/index/page/hotel/hotel?id=' + hotelList[0].id + '&photo=' + hotelList[0].logo,
          })
        };
      },
      fail: function(err) {
        console.log(err)
      },
    })
  },
  // 下拉刷新
  onPullDownRefresh() {
    let _this = this;
    token.verify(function (res) {
      if (res) {
        app.globalData.tokenData = true;
        _this.requestData();
      } else {
        wx.showToast({
          title: '身份验证失败',
          mask: true
        })
      }
    });
    wx.stopPullDownRefresh();
  },
  // 设置分享信息
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      // console.log(res.target)
    } 
    wx.showShareMenu({
      withShareTicket: true
    });
    return {
      title: Host.hosts.shareMessage,
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
        wx.showToast({
          title: '转发成功',
          mask: true
        })
      },
      fail: function (res) {
        // 转发失败
        wx.showToast({
          title: '转发失败',
          icon: 'none',
          mask: true
        })
      }
    }
  },
  // 筛选位置
  change: function (e) {
    if (e.currentTarget.id == "addTap") {
      this.setData({
        addTap: !this.data.addTap,
        starTap: false,
        sortTap: false,
        filterTap: false,
        mask: true
      })
    };
    if (e.currentTarget.id == "starTap") {
      this.setData({
        addTap: false,
        starTap: !this.data.starTap,
        sortTap: false,
        filterTap: false,
        mask: true
      })
    };
    if (e.currentTarget.id == "sortTap") {
      this.setData({
        addTap: false,
        starTap: false,
        sortTap: !this.data.sortTap,
        filterTap: false,
        mask: true
      })
    };
    if (e.currentTarget.id == "filterTap") {
      this.setData({
        addTap: false,
        starTap: false,
        sortTap: false,
        filterTap: !this.data.filterTap,
        mask: true
      })
    };
    if (this.data.addTap == false && this.data.starTap == false && this.data.sortTap == false && this.data.filterTap == false) {
      this.setData({
        mask: false
      })
    };
  },
  // 选择地址：城市
  addr: function (e) {
    let district = this.data.district;
    let curreentDistrict = this.data.curreentDistrict;
    let chooseCity = this.data.chooseCity;
    if (!curreentDistrict) {
      curreentDistrict = district[0];
      chooseCity = 0;
      this.setData({
        curreentDistrict: curreentDistrict,
        chooseCity: chooseCity
      });
    } else {
      let currentId = e.currentTarget.dataset.id;
      curreentDistrict = district[currentId];
      chooseCity = currentId;
      this.setData({
        curreentDistrict: curreentDistrict,
        chooseCity: chooseCity,
        chooseDistrict: 0
      });
    }
  },
  // 选择地址：商圈/区域
  addr2: function (e) {
    let chooseDistrict = this.data.chooseDistrict;
    let currentId = e.currentTarget.dataset.id;
    chooseDistrict = currentId;
    this.setData({
      chooseDistrict: chooseDistrict
    });
  },
  // 选择星级
  radioChange: function (e) {
    this.setData({ starValue: e.detail.value });
  },
  radioChoose: function (e) {
    this.setData({ starInd: e.currentTarget.dataset.index });
  },
  // 价格区间
  priceChoose: function (e) {
    let price = this.data.price;
    let i = e.currentTarget.dataset.index;
    price[i].choose = !price[i].choose
    this.setData({ price: price });

    let priceValue = [];
    for (let i = 0; i < price.length; i++) {
      if (price[i].choose) {
        priceValue.push(price[i].label);
      }
    };
    let le = priceValue.length;
    if (le > 0) {
      if (le <= 1) {
        this.setData({ priceValue: priceValue[0] });
      } else {
        this.setData({ priceValue: priceValue[0].split('-')[0] + '-' + priceValue[le - 1].split('-')[1] });
      }
    } else {
      this.setData({ priceValue: '' });
    }
  },
  // // 价格滑块
  // sliderChange: function (e) {
  //   this.setData({
  //     sliderValue: e.detail.value
  //   });
  // },
  // 排序
  sortType: function (e) {
    this.setData({
      sortValue: e.currentTarget.dataset.value,
      sortInd: e.currentTarget.dataset.index,
    });
  },
  // 房型
  houseTap: function (e) {
    this.setData({ houseValue: e.detail.value });
  },
  houseChoose: function (e) {
    this.setData({ houseInd: e.currentTarget.dataset.index });
  },
  // payWayFn:function(){
  //   let _this = this;
  //   // 支付方式
  //   payWay().then(function (data) {
  //     _this.setData({
  //       payWay: data.data,
  //     })
  //   }).catch(function (err) {
  //     console.log(err)
  //   });
  // },
  // // 支付方式
  // payTap: function(e) {
  //   this.setData({ payValue: e.detail.value });
  // },
  payChoose: function (e) {
    this.setData({ payInd: e.currentTarget.dataset.index });
  },
  // 服务设施
  facilityTap: function (e) {
    this.setData({ facilityValue: e.detail.value });
  },
  facilityChoose: function (e) {
    this.setData({ facilityInd: e.currentTarget.dataset.index });
  },
  // 隐藏所有筛选选项
  hidden: function (e) {
    this.setData({
      addTap: false,
      starTap: false,
      sortTap: false,
      filterTap: false,
      mask: false
    });
  },
  // 清空筛选
  empty: function () {
    this.hidden();
    let price = this.data.price;
    for (let i = 0; i < price.length; i++) {
      price[i].choose = false
    };
    this.setData({
      chooseCity: '',
      chooseDistrict: '',
      // slider: {
      //   step: 100,
      //   min: 0,
      //   max: 2000,
      //   size: 20,
      // },
      starValue: '',
      starInd: '',
      sortValue: '',
      sortInd: '',
      houseValue: '',
      houseInd: '',
      payValue: '',
      payInd: '',
      facilityValue: '',
      facilityInd: '',
      priceValue: '',
      price: price,
    })
  },
  // 确认筛选位置
  confirm1: function () {

  },
  // 确认筛选星级/价格
  confirm2: function () {

  },
  // 确认排序方式
  confirm3: function () {

  },
  // 确认筛选类型
  confirm4: function () {

  },
  onHide: function () {
    this.setData({
      addTap: false,
      starTap: false,
      sortTap: false,
      filterTap: false,
      mask: false,
    });
  },
  // getHotelList:function(token){
  //   console.log('------------')
  //   console.log(token)
  // } 
})
