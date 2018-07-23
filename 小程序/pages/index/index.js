import { hosts, api, request, payWay } from "../../utils/api.js";
import token from '../../utils/token.js';
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
    address: [
      {
        city: "长沙"
      }, {
        city: "岳阳"
      }, {
        city: "长沙"
      }, {
        city: "岳阳"
      }, {
        city: "长沙"
      }, {
        city: "岳阳"
      },
    ],
    curreentDistrict: "",
    district: [
      {
        0: '五一商圈',
        1: '红星商圈',
        2: '长沙火车站',
        3: '五一商圈',
        4: '红星商圈',
        5: '长沙火车站',
        6: '五一商圈',
        7: '红星商圈',
        8: '长沙火车站',
      }, {
        0: '岳阳火车站',
        1: '岳阳火车南站',
        2: '洞庭汽车站',
        3: '岳阳火车站',
        4: '岳阳火车南站',
        5: '洞庭汽车站',
        6: '岳阳火车站',
        7: '岳阳火车南站',
        8: '洞庭汽车站',
      }, {
        0: '五一商圈',
        1: '红星商圈',
        2: '长沙火车站',
        3: '五一商圈',
        4: '红星商圈',
        5: '长沙火车站',
        6: '五一商圈',
        7: '红星商圈',
        8: '长沙火车站',
      }, {
        0: '岳阳火车站',
        1: '岳阳火车南站',
        2: '洞庭汽车站',
        3: '岳阳火车站',
        4: '岳阳火车南站',
        5: '洞庭汽车站',
        6: '岳阳火车站',
        7: '岳阳火车南站',
        8: '洞庭汽车站',
      }, {
        0: '五一商圈',
        1: '红星商圈',
        2: '长沙火车站',
        3: '五一商圈',
        4: '红星商圈',
        5: '长沙火车站',
        6: '五一商圈',
        7: '红星商圈',
        8: '长沙火车站',
      }, {
        0: '岳阳火车站',
        1: '岳阳火车南站',
        2: '洞庭汽车站',
        3: '岳阳火车站',
        4: '岳阳火车南站',
        5: '洞庭汽车站',
        6: '岳阳火车站',
        7: '岳阳火车南站',
        8: '洞庭汽车站',
      },
    ],
    hotelList: [],
  },
  onLoad: function () {
    let _this = this;
    // 登录、设置token
    token.verify(function (res) {
      if (res) {
        app.globalData.tokenData = true;
        _this.nowLocation();
      }
    });
    app.versionsDetection();
    this.addr();
    this.setData({ chooseDistrict: 0 });
    // 分享
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  nowLocation: function () {
    let _this = this;
    // 获取用户当前位置，并请求相应的酒店列表数据
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        let latitude = res.latitude;
        let longitude = res.longitude;
        wx.setStorage({ key: "latitude", data: latitude });
        wx.setStorage({ key: "longitude", data: longitude });
        _this.loadData(latitude, longitude);
      },
      fail:function(err){
        console.log(err);
        wx.showToast({
          title: '获取您的位置失败',
          icon: "none",
          duration: 800
        });
      }
    });
  },
  loadData: function (latitude, longitude) {
    let _this = this;
    let hotelList = [];
    request({
      url: api.hotelList,
      data: {
        lat: latitude,
        lng: longitude
      },
      method: 'GET',
    }).then(function (data) {
      for (let i = 0; i < data.data.length; i++) {
        hotelList[i] = data.data[i];
        hotelList[i].distance = (hotelList[i].distance / 1000).toFixed(1);
      }
      _this.setData({ hotelList: hotelList });
    }).catch(function (err) {
      wx.showToast({
        title: '拉取数据失败',
        icon: "none",
        duration: 800
      });
    });
    // 查询支付方式
    this.payWayFn();
  },
  // 设置分享信息
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      // console.log(res.target)
    }
    return {
      title: app.data.ShareMessage,
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
        wx.showToast({
          title: '转发成功',
        })
      },
      fail: function (res) {
        // 转发失败
        wx.showToast({
          title: '转发失败',
          icon: 'none'
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
  payWayFn:function(){
    let _this = this;
    // 支付方式
    payWay().then(function (data) {
      _this.setData({
        payWay: data.data,
      })
    }).catch(function () {
      wx.showToast({
        title: '查询失败',
        icon: 'none'
      });
    });
  },
  // 支付方式
  payTap: function(e) {
    this.setData({ payValue: e.detail.value });
  },
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
