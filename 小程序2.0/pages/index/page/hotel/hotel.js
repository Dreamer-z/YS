// pages/index/page/hotel/hotel.js
import {
  hosts,
  api,
  request,
  hotelDatail,
  roomTypeList
} from "../../../../utils/api.js";
import newRes from "../../../../utils/api.js";
import token from '../../../../utils/token.js';
import {
  Calendar
} from "../../../../utils/calendar.js";
let calendar = new Calendar;
let app = getApp();
let oneDay = 3600 * 24 * 1000;
Page({
  data: {
    options_room_id: '',
    hotel: [],
    img: [],
    imgIndex: 1,
    imgLength: '',
    title: '',
    popImg: null,
    distribute: false,
    // 日历
    check_in: null,
    check_out: null,
    checkIn: '',
    checkOut: '',
    checkIn1: '',
    checkOut1: '',
    checkIn2: '',
    checkOut2: '',
    week: [],
    day: 1,
    chooseDate:false,
    // 房间
    room: '',
    showmore: false,
    roomkey: [],
    // 房间详情
    chooseRoomIndex: null,
    roomDetailsHide: true,
    roomData: [],
    roomImg: [],
    currentRoomPhoto: 0,
    roomImgIndex: 1,
    roomImgLength: 0,
    getMoreVal: false,
    navLock:false,
    back:false
  },
  onLoad: function(options) {
    // 查询酒店信息
    let _this = this;
    wx.setStorage({
      key: 'hotelLogo',
      data: options.photo,
    });
    let hotelId = options.id;
    this.firstLogin();
    if (options.invitied_code) {
      let sale_register = wx.getStorageSync("sale_register");
      this.binding(options.invitied_code, sale_register);
      if (options.room_id && options.room_id != '' && options.room_id != undefined) {
        this.setData({
          options_room_id: options.room_id
        });
      };
    };
    let check_in = new Date();
    let check_in_year = check_in.getFullYear();
    let check_in_month = check_in.getMonth() + 1;
    let check_in_day = check_in.getDate();
    let check_out = new Date(new Date(check_in).getTime() + oneDay);
    let check_out_year = check_out.getFullYear();
    let check_out_month = check_out.getMonth() + 1;
    let check_out_day = check_out.getDate();
    let week = [this.getWeek(new Date(check_in).getDay()), this.getWeek(new Date(check_out).getDay())];
    let daySec = new Date(check_out).getTime() - new Date(check_in).getTime();
    let day = daySec / oneDay;
    this.setData({
      hotelId: hotelId,
      checkIn: `${check_in_year}年${check_in_month}月${check_in_day}日`,
      checkIn1: `${check_in_month}月${check_in_day}日`,
      checkIn2: `${check_in_year}/${check_in_month}/${check_in_day}`,
      checkOut: `${check_out_year}年${check_out_month}月${check_out_day}日`,
      checkOut1: `${check_out_month}月${check_out_day}日`,
      checkOut2: `${check_out_year}/${check_out_month}/${check_out_day}`,
      week: week,
      day: day
    });
    let arg = {
      hotel_id: hotelId,
      come_time: `${check_in_year}/${check_in_month}/${check_in_day}`,
      leave_time: `${check_out_year}/${check_out_month}/${check_out_day}`
    };
    this.getHotel(hotelId);
    this.roomTypeLIstFn(arg);
  },
  onShow(){
    let back = this.data.back;
    let chooseDate = this.data.chooseDate;
    let _this = this;
    if(back){
      let arg = {
        hotel_id: this.data.hotelId,
        come_time: this.data.checkIn2,
        leave_time: this.data.checkOut2
      };
      this.roomTypeLIstFn(arg);
      this.setData({
        back:false
      });
    };
    if (chooseDate){
      let check_time = wx.getStorage({
        key: 'check_time',
        success: function(res) {
          if (!res.data) return;
          _this.setData({
            checkIn: `${res.data.arriveTime[0]}年${res.data.arriveTime[1]}月${res.data.arriveTime[2]}日`,
            checkIn1: `${res.data.arriveTime[1]}月${res.data.arriveTime[2]}日`,
            checkIn2: `${res.data.arriveTime[0]}/${res.data.arriveTime[1]}/${res.data.arriveTime[2]}`,
            checkOut: `${res.data.leaveTime[0]}年${res.data.leaveTime[1]}月${res.data.leaveTime[2]}日`,
            checkOut1: `${res.data.leaveTime[1]}月${res.data.leaveTime[2]}日`,
            checkOut2: `${res.data.leaveTime[0]}/${res.data.leaveTime[1]}/${res.data.leaveTime[2]}`,
            week: res.data.week,
            day: res.data.days,
            chooseDate: false
          });
          let arg = {
            hotel_id: _this.data.hotelId,
            come_time: `${res.data.arriveTime[0]}/${res.data.arriveTime[1]}/${res.data.arriveTime[2]}`,
            leave_time: `${res.data.leaveTime[0]}/${res.data.leaveTime[1]}/${res.data.leaveTime[2]}`
          };
          _this.roomTypeLIstFn(arg);
          wx.setStorage({
            key: 'check_time',
            data: null,
          });
        },
        fail:function(err){
          wx.showToast({
            title: '缓存错误',
            icon:"none",
            mask:true
          })
        }
      })
    }
  },
  getHotel(hotelId) {
    // 酒店信息
    let _this = this;
    hotelDatail(hotelId).then(function (data) {
      if (data.data.length < 1) {
        return
      };
      // 设置导航栏标题
      wx.setNavigationBarTitle({
        title: data.data.hotel_name
      });
      // 酒店相册
      let img = data.data.photos;
      _this.setData({
        hotel: data.data,
        img: img,
        imgLength: img.length
      })
    }).catch(function() {
      wx.showToast({
        title: '查询酒店详情失败',
        icon: 'none',
        mask: true
      })
    });
  },
  // 分销绑定上级
  binding(invitied_code, sale_register) {
    if (sale_register) {
      return;
    };
    newRes.distributeBind({
      invitied_code: invitied_code
    }).then((res) => {
      // wx.showModal({
      //   title: '绑定',
      //   content: '绑定成功',
      // })
    }).catch((err) => {
      console.log(err)
      // wx.showModal({
      //   title: '绑定',
      //   content: err.data.msg ? err.data.msg:'系统繁忙，请稍后再试！',
      // })
    })
  },
  onHide() {
    this.setData({
      roomDetailsHide: true,
      roomImgIndex: 1,
      currentRoomPhoto: 0,
      chooseRoomIndex: null
    });
  },
  // 验证是否首次进入小程序
  firstLogin() {
    let _this = this;
    try {
      let distribute = this.data.distribute;
      let data = wx.getStorageSync("first_login");
      let status = data.click_index;
      if (status == 0) {
        distribute = true
      } else {
        distribute = false
      };
      this.setData({
        popImg: data.index_img,
        distribute: distribute,
      });
    } catch (e) {
      console.log(e)
    }
  },
  // 发送首次进去状态
  sendFirstLogin() {
    let _this = this;
    newRes.sendFirstLogin({
      type: 1
    }).then((res) => {}).catch((err) => {
      console.log(err)
    });
  },
  // 第一次进入小程序弹窗
  closeDistribute() {
    this.setData({
      distribute: false,
    });
    this.sendFirstLogin();
    try {
      let data = wx.getStorageSync("first_login");
      data.click_index = 1;
      wx.setStorage({
        key: 'first_login',
        data: data,
      });
    } catch (e) {
      console.log(e)
    };
  },
  distributeCenter() {
    this.closeDistribute();
    wx.switchTab({
      url: '/pages/personCenter/personCenter',
    })
  },
  // 酒店图片轮播图右下角角标
  hotelPhoto: function(e) {
    let imgIndex = e.detail.current + 1;
    let imgLength = this.data.imgLength;
    this.setData({
      imgIndex: imgIndex
    })
  },
  // 日历
  choseDate() {
    let checkIn = this.data.checkIn2.split("/");
    let checkOut = this.data.checkOut2.split("/");
    let check_in = new Date(checkIn[0],checkIn[1]-1,checkIn[2]);
    let check_out = new Date(checkOut[0], checkOut[1]-1, checkOut[2]);
    this.setData({
      chooseDate:true
    });
    wx.navigateTo({
      url: `/pages/chooseDate/chooseDate?check_in=${check_in}&check_out=${check_out}&continue_mode=false`,
    });
  },
  getWeek(date) {
    let week = '';
    switch (date) {
      case 0:
        week = "日";
        break;
      case 1:
        week = "一";
        break;
      case 2:
        week = "二";
        break;
      case 3:
        week = "三";
        break;
      case 4:
        week = "四";
        break;
      case 5:
        week = "五";
        break;
      case 6:
        week = "六";
        break;
    };
    return week;
  },
  // 日历时间
  // getDate(e) {
  //   let date = e.detail;
  //   console.log(date)
    // let iY = date.checkIn2.split("/")[0];
    // let iM = date.checkIn2.split("/")[1];
    // let iD = date.checkIn2.split("/")[2];
    // let oY = date.checkOut2.split("/")[0];
    // let oM = date.checkOut2.split("/")[1];
    // let oD = date.checkOut2.split("/")[2];
    // let nTime = new Date(oY, (oM - 1), oD).getTime() - new Date(iY, (iM - 1), iD).getTime();
    // let day = parseInt(nTime / (60 * 60 * 24 * 1000));
    // this.setData({
    //   checkIn: date.checkIn,
    //   checkIn1: date.checkIn1,
    //   checkIn2: date.checkIn2,
    //   checkOut: date.checkOut,
    //   checkOut1: date.checkOut1,
    //   checkOut2: date.checkOut2,
    //   week: date.week,
    //   day: day,
    // });
  // },
  // chooseEnd(e) {
  //   let date = e.detail;
  //   let iY = date.checkIn2.split("/")[0];
  //   let iM = date.checkIn2.split("/")[1];
  //   let iD = date.checkIn2.split("/")[2];
  //   let oY = date.checkOut2.split("/")[0];
  //   let oM = date.checkOut2.split("/")[1];
  //   let oD = date.checkOut2.split("/")[2];
  //   let nTime = new Date(oY, (oM - 1), oD).getTime() - new Date(iY, (iM - 1), iD).getTime();
  //   let day = parseInt(nTime / (60 * 60 * 24 * 1000));
  //   this.setData({
  //     hide: !this.data.hide,
  //     checkIn: date.checkIn,
  //     checkIn1: date.checkIn1,
  //     checkIn2: date.checkIn2,
  //     checkOut: date.checkOut,
  //     checkOut1: date.checkOut1,
  //     checkOut2: date.checkOut2,
  //     week: date.week,
  //     day: day,
  //   });
  // },
  // 房型数据查询
  roomTypeLIstFn: function(arg) {
    let _this = this;
    let roomkey = [];
    let room_id = this.data.options_room_id;
    roomTypeList(arg).then(function(data) {
      let room = data.data;
      for (let i = 0; i < room.length; i++) {
        roomkey[i] = false;
        if (room_id != '' && room_id != undefined) {
          let index = '';
          if (room[i].id == room_id) {
            _this.setData({
              chooseRoomIndex: i
            });
            _this.openRoomDetail(room_id, i);
          };
        };
      };
      _this.setData({
        room: room,
        roomkey: roomkey
      })
    }).catch(function() {
      wx.showToast({
        title: '查询房型失败',
        icon: 'none',
        mask: true
      })
    });
  },
  // 地图
  map: function() {
    let that = this;
    let latitude = Number(that.data.hotel.lat);
    let longitude = Number(that.data.hotel.lng);
    wx.openLocation({
      latitude: latitude,
      longitude: longitude,
      scale: 14,
      name: that.data.hotel.hotel_name,
      address: that.data.hotel.address
    });
  },
  // 房间价格详情
  roomSlideDown: function(e) {
    let roomkey = this.data.roomkey;
    for (let i = 0; i < roomkey.length; i++) {
      if (e.currentTarget.dataset.index == i) {
        roomkey[i] = !roomkey[i];
      }
    };
    this.setData({
      roomkey: roomkey,
    });
  },
  // // 选择日期
  // chooseDay: function(e) {
  //   calendar.choose(e, this);
  // },
  // // 渲染日历
  // rander: function(e) {
  //   calendar.doDay(e, this);
  // },
  // // 日历显示
  // calendarTap: function() {
  //   this.setData({
  //     mask1: true,
  //   })
  // },
  // slideStart: function(e) {
  //   calendar.slideStart(e);
  // },
  // slideEnd: function(e) {
  //   calendar.slideEnd(e, this);
  // },
  // closeCalendar: function() {
  //   let ms = calendar.chooseEnd();
  //   if (ms.length == 0) {
  //     this.setData({
  //       mask1: false,
  //     })
  //     return;
  //   };
  //   if (ms.length == 1) {
  //     wx.showToast({
  //       title: '请选择好入住日期和结束日期哦！',
  //       icon: 'none',
  //       mask: true
  //     })
  //   } else {
  //     this.charRoomType();
  //     this.setData({
  //       mask1: false,
  //     })
  //   };
  // },
  // 打开房间详情弹窗
  navigate: function(e) {
    let id = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.item;
    this.openRoomDetail(id, index);
  },
  // 打开房间详情弹窗
  openRoomDetail(id, index) {
    this.getRoomDetails(id);
    this.setData({
      roomDetailsHide: false,
      roomImgIndex: 1,
      currentRoomPhoto: 0,
      chooseRoomIndex: index
    });
  },
  // 关闭房间详情弹窗
  closeRoomDetailsPopup() {
    this.setData({
      roomDetailsHide: true,
      currentRoomPhoto: 0,
      getMoreVal:false
    });
  },
  // 查询房间详情
  getRoomDetails(id) {
    let _this = this;
    // 请求房间信息
    request({
      url: api.room + id,
      method: 'GET'
    }).then(function(data) {
      if (data.data.photos) {
        let roomImg = data.data.photos;
        _this.setData({
          roomData: data.data,
          roomImg: roomImg,
          roomImgLength: roomImg.length,
        })
      } else {
        _this.setData({
          roomData: data.data,
          roomImg: '',
          roomImgLength: 0,
        })
      }

    }).catch(function(err) {
      console.log(err)
      wx.showToast({
        title: '拉取数据失败',
        icon: 'none',
        mask: true
      })
    });
  },
  // 房间详情轮播图右下角角标
  roomPhoto: function(e) {
    let roomImgIndex = e.detail.current + 1;
    let roomImgLength = this.data.roomImgLength;
    this.setData({
      roomImgIndex: roomImgIndex
    })
  },
  // 查看更多设施
  getMore() {
    this.setData({
      getMoreVal: !this.data.getMoreVal
    })
  },
  // 跳转到酒店详情
  navigateFacility: function() {
    wx.navigateTo({
      url: '../facility/facility?id=' + this.data.hotel.id
    })
  },
  reservations: function(item) {
    let room = this.data.room;
    let hotel = this.data.hotel;
    let bed = room[item].bed_type == 1 ? "单人床" : room[item].bed_type == 2 ? "双人床" : "";
    let window = room[item].window == 0 ? "无窗" : "有窗";
    this.setData({
      back:true,
    });
    wx.navigateTo({
      url: '../reservations/reservations?id=' + room[item].id + '&hotel_name=' + hotel.hotel_name + "&address=" + hotel.address + "&photo=" + hotel.photos + "&room_type=" + room[item].name + "&hotel_id=" + room[item].hotel_id + "&price=" + room[item].price + "&checkIn=" + this.data.checkIn2 + "&checkOut=" + this.data.checkOut2 + "&checkIn1=" + this.data.checkIn1 + "&checkOut1=" + this.data.checkOut1 + "&week=" + this.data.week + "&bed=" + bed + "&window=" + window
    })
  },
  // 判断用户是否授权
  authSetting: function(e) {
    let _this = this;
    let room = this.data.room;
    let navLock = this.data.navLock;
    let item = e.currentTarget.dataset.item;
    if (!room[item].is_preorder || navLock) {
      return;
    };
    this.setData({
      navLock:true
    });
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              app.globalData.userInfo = res.userInfo;
              app.sendUserMsg(res.userInfo);
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            }
          });
          _this.reservations(item)
          // wx.navigateTo({
          //   url: '../orderDetail/orderDetail',
          // })
        } else {
          wx.navigateTo({
            url: '../../../setting/setting',
          })
        }
        _this.setData({
          navLock: false
        });
      },
      fail:err =>{
        _this.setData({
          navLock: false
        });
      }
    });
  },
})