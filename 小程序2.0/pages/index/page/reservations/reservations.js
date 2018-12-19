// pages/index/page/reservations/reservations.js
import newRes, {
  hosts,
  api,
  request,
  hotelDatail,
  payWay,
  pay
} from "../../../../utils/api.js";
import reg from "../../../../utils/reg.js";
let app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hotel: '',
    hotel_name: '',
    address: '',
    photo: '',
    room_type: '',
    window: '',
    bed: '',
    checkIn: '',
    checkOut: '',
    checkIn1: '',
    checkOut1: '',
    week: [],
    hotel_id: '',
    room_type_id: '',
    price: '',
    token: '',
    name: [],
    idcard: [],
    mobile: '',
    remark: '',
    payWayVal: 1,
    arrive_time: '',
    countType: '',
    roomNumber: 1,
    detail: false,
    realNameBox: true,
    realName: true,
    payWayList: [],
    preorder_id: '',
    pay: false,
    canPay: true,
    // 预计到店
    store: false,
    storeTime: [],
    storeTimeChoose: null,
    storeTimeValue: '14:00:00',
    // 判断积分
    integral: false,
    // 判断余额
    remainPrice: false,
    user: [{}],
    day: '',
    order: [],
    details: null,
    total_price: null,
  },
  /* 生命周期函数--监听页面加载 */
  onLoad: function(options) {
    let _this = this;
    this.getPreorderPrice(options.hotel_id, options.id, options.checkIn, options.checkOut, this.data.roomNumber);
    this.getHotel(options.hotel_id);
    // 到店时间
    let storeTime = [{
      date: '14:00:00',
      guarantee: ''
    }, {
      date: '15:00:00',
      guarantee: ''
    }, {
      date: '16:00:00',
      guarantee: ''
    }, {
      date: '17:00:00',
      guarantee: ''
    }, {
      date: '18:00:00',
      guarantee: ''
    }, {
      date: '19:00:00',
      guarantee: ''
    }, {
      date: '20:00:00',
      guarantee: ''
    }, {
      date: '21:00:00',
      guarantee: ''
    }, {
      date: '22:00:00',
      guarantee: ''
    }, {
      date: '23:00:00',
      guarantee: '299'
    }, {
      date: '00:00:00',
      guarantee: '299'
    }, {
      date: '次日01:00:00',
      guarantee: '299'
    }, {
      date: '次日02:00:00',
      guarantee: '299'
    }];
    // 明细
    wx.getStorage({
      key: 'token',
      success: function(res) {
        let checkIn = options.checkIn;
        let checkOut = options.checkOut;
        let iY = checkIn.split("/")[0];
        let iM = checkIn.split("/")[1];
        let iD = checkIn.split("/")[2];
        let oY = checkOut.split("/")[0];
        let oM = checkOut.split("/")[1];
        let oD = checkOut.split("/")[2];
        let nTime = new Date(oY, (oM - 1), oD).getTime() - new Date(iY, (iM - 1), iD).getTime();
        let day = parseInt(nTime / (60 * 60 * 24 * 1000));
        let order = [];
        let t = new Date(iY, iM, 0).getDate();
        for (let i = 0; i < day; i++) {
          if (iD > t) {
            iM++;
            iD = 1;
            order.push({
              y: iY,
              m: iM,
              d: iD
            });
            t = new Date(iY, iM, 0).getDate();
          } else if (iM > 12) {
            iY++;
            iM = 1;
            order.push({
              y: iY,
              m: iM,
              d: iD
            });
            t = new Date(iY, iM, 0).getDate();
          } else {
            order.push({
              y: iY,
              m: iM,
              d: iD
            });
          }
          iD++;
        };
        _this.setData({
          hotel_name: options.hotel_name,
          address: options.address,
          photo: wx.getStorageSync("hotelLogo"),
          room_type: options.room_type,
          window: options.window,
          bed: options.bed,
          checkIn: options.checkIn,
          checkOut: options.checkOut,
          checkIn1: options.checkIn1,
          checkOut1: options.checkOut1,
          week: options.week,
          hotel_id: options.hotel_id,
          room_type_id: options.id,
          price: options.price,
          token: res.data,
          day: day,
          order: order,
          storeTime: storeTime
        });
      },
    });
  },
  onShow: function() {
    let users = [];
    let that = this;
    wx.getStorage({
      key: 'user',
      success: function(res) {
        users = res.data;
        let personNumber = wx.getStorageSync("personNumber");
        let user = [];
        let roomNumber = that.data.roomNumber;
        if (users && users != '') {
          for (let i = 0; i < roomNumber; i++) {
            if (users[i]) {
              user.push(users[i]);
            } else {
              user.push('{}');
            }
            that.setData({
              user: users
            });
          }
        } else {
          for (let i = 0; i < roomNumber; i++) {
            user[i] = {};
          };
          that.setData({
            user: user
          });
        };
        if (personNumber) {
          that.setData({
            roomNumber: personNumber
          });
        };
        wx.setStorageSync('personNumber', '');
        wx.setStorageSync('user', '')
      }
    })
  },
  getHotel(hotelId) {
    // 酒店信息
    let _this = this;
    hotelDatail(hotelId).then(function(data) {
      _this.setData({
        hotel: data.data,
      })
    }).catch(function() {
      wx.showToast({
        title: '查询酒店详情失败',
        icon: 'none',
        mask: true
      })
    });
  },
  getPreorderPrice(hotel_id, room_type_id, come_time, leave_time, total_count) {
    let _this = this;
    newRes.getPreorderPrice({
      hotel_id: hotel_id,
      room_type_id: room_type_id,
      come_time: come_time,
      leave_time: leave_time,
      total_count: total_count,
    }).then(res => {
      _this.setData({
        details: res.data,
        total_price: res.data.total_price
      })
    }).catch(err => {
      console.log(err);
      wx.showToast({
        title: err.data.msg ? err.data.msg : '查询预订明细失败',
        icon: 'none',
        mask: true
      })
    });
  },
  // 真实姓名
  popup: function() {
    this.setData({
      realName: true,
      realNameBox: true
    });
  },
  closePopup: function() {
    this.setData({
      realName: false,
      realNameBox: true
    });
  },
  // 选择常用入住人
  choosePerson: function() {
    let roomNumber = this.data.roomNumber;
    wx.setStorageSync('personNumber', roomNumber);
    wx.navigateTo({
      url: '../commonUse/commonUse',
    });
  },
  // 实名认证
  quickCheckIn: function() {
    this.setData({
      realNameBox: true
    });
  },
  // 房间数
  count: function(e) {
    let countType = e.currentTarget.dataset.type;
    let roomNumber = this.data.roomNumber;
    let user = this.data.user;
    this.setData({
      countType: countType
    });
    if (countType == "sub") {
      if (roomNumber == 1) {
        wx.showToast({
          title: "不能再少了哦",
          icon: "none",
          mask: true
        });
        return;
      };
      roomNumber--;
      user.pop();
      this.setData({
        roomNumber: roomNumber,
        user: user,
      });
    } else {
      roomNumber++;
      user.push({
        name: '',
        idcard: ''
      });
      this.setData({
        roomNumber: roomNumber,
        user: user
      });
    }
  },
  // 手动输入房间数
  inputRoomNumber(e) {
    let num = e.detail.value;
    let user = [];
    if (num == '') {
      num = 1;
    };
    for (let i = 0; i < num; i++) {
      user.push({
        name: '',
        idcard: ''
      });
    };
    this.setData({
      roomNumber: num,
      user: user
    });
  },
  // 订单明细
  detail: function() {
    this.setData({
      detail: !this.data.detail,
      pay: false,
      store: false
    });
  },
  // 订单明细隐藏
  detailNone: function() {
    this.setData({
      detail: false
    })
  },
  // // 提交订单
  // pay: function() {
  //   let user = this.data.user;
  //   let mobile = user[0].mobile;
  //   let arrive_time = this.data.storeTimeValue;
  //   for (let i = 0; i < user.length; i++) {
  //     if (user[i].name == '') {
  //       wx.showModal({
  //         title: '提示',
  //         content: '请核对您输入的姓名哦！',
  //         showCancel: false,
  //       });
  //       return;
  //     };
  //     if (user[i].idcard == '' || reg.regIdCard(user[i].idcard) == false) {
  //       wx.showModal({
  //         title: '提示',
  //         content: '请核对您输入的身份证哦！',
  //         showCancel: false,
  //       });
  //       return;
  //     };
  //   };
  //   if (mobile == '' || reg.regTel(mobile) == false) {
  //     wx.showModal({
  //       title: '提示',
  //       content: '请核对您输入的手机号哦！',
  //       showCancel: false,
  //     });
  //     return;
  //   };
  //   if (!arrive_time) {
  //     wx.showModal({
  //       title: '提示',
  //       content: '请核对预计到达的时间！',
  //       showCancel: false,
  //     });
  //     return;
  //   };
  //   this.setData({
  //     pay: !this.data.pay,
  //     detail: false,
  //     store: false
  //   });
  // },
  // 入住人姓名
  getName: function(e) {
    let index = e.currentTarget.dataset.index;
    let roomNumber = this.data.roomNumber;
    let name = this.data.name;
    let user = this.data.user;
    for (let i = 0; i < roomNumber; i++) {
      if (index == i) {
        name[i] = e.detail.value;
        user[i].name = e.detail.value;
      }
    }
    this.setData({
      name: name,
      user: user
    })
  },
  // 身份证号
  getIdCard: function(e) {
    let index = e.currentTarget.dataset.index;
    let roomNumber = this.data.roomNumber;
    let idcard = this.data.idcard;
    let user = this.data.user;
    // if (reg.regIdCard(e.detail.value) == false) {
    //   wx.showToast({
    //     title: '身份证号有误',
    //     icon: "none",
    //      mask: true
    //   })
    // } else {
    for (let i = 0; i < roomNumber; i++) {
      if (index == i) {
        idcard[i] = e.detail.value;
        user[i].idcard = e.detail.value;
      }
    }
    this.setData({
      idcard: idcard,
      user: user
    })
    // }
  },
  // 手机号
  getTel: function(e) {
    let mobile = e.detail.value;
    let user = this.data.user;
    user[0].mobile = e.detail.value;
    // if (reg.regTel(e.detail.value) == false) {
    //   wx.showToast({
    //     title: '手机号有误',
    //     icon: "none",
          // mask: true
    //   });
    // } else {
    this.setData({
      mobile: mobile,
      user: user
    })
    // }
  },
  // 获取备注信息
  getRemark: function(e) {
    let remark = e.detail.value;
    this.setData({
      remark: remark,
    })
  },
  // 打开支付窗口
  open() {
    this.setData({
      pay: !this.data.pay,
      detail: false,
      store: false,
    });
  },
  close() {
    this.setData({
      pay: !this.data.pay,
      canPay: true
    });
    wx.showModal({
      title: '已取消支付',
      content: '您已取消支付，可在个人中心订单列表继续完成支付',
      confirmText: '去支付',
      cancelText: "留在这",
      success(res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/personCenter/page/myOrders/myOrders',
          });
        }
      },
    });
  },
  // 立即支付
  pay(e) {
    let canPay = this.data.canPay;
    let user = this.data.user;
    let hotel_id = this.data.hotel_id;
    let room_type_id = this.data.room_type_id;
    let checkIn = this.data.checkIn;
    let checkOut = this.data.checkOut;
    let roomNumber = this.data.roomNumber;
    let remark = this.data.remark;
    let arrive_time = this.data.storeTimeValue;
    let name = [];
    let idcard = [];
    let mobile = '';
    let member = [];
    let _this = this;
    for (let i = 0; i < user.length; i++) {
      name[i] = user[i].name;
      idcard[i] = user[i].idcard;
      mobile = user[0].mobile;
      member.push({
        name: user[i].name,
        idcard: user[i].idcard
      });
      if (user[i].name == '') {
        wx.showModal({
          title: '提示',
          content: '请核对您输入的姓名哦！',
          showCancel: false,
        });
        canPay = false;
      };
      if (user[i].idcard == '' || reg.regIdCard(user[i].idcard) == false) {
        wx.showModal({
          title: '提示',
          content: '请核对您输入的身份证哦！',
          showCancel: false,
        });
        canPay = false;
      };
    };
    if (mobile == '' || reg.regTel(mobile) == false) {
      wx.showModal({
        title: '提示',
        content: '请核对您输入的手机号哦！',
        showCancel: false,
      });
      canPay = false;
    };
    if (!arrive_time) {
      wx.showModal({
        title: '提示',
        content: '请核对预计到达的时间！',
        showCancel: false,
      });
      canPay = false;
    };
    if (!canPay) {
      return;
    };
    let data = {
      "hotel_id": hotel_id,
      "room_type_id": room_type_id,
      "come_time": checkIn,
      "leave_time": checkOut,
      "total_count": roomNumber,
      "member": member,
      "remark": remark,
      "prepay_id": e.detail.formId,
      "mobile": mobile,
      "from": 1,
      "arrive_time": arrive_time,
    };
    wx.showToast({
      icon: "loading",
      mask: true,
    });
    this.setData({
      canPay: false,
    });
    pay(data).then(function(res) {
      wx.hideToast();
      wx.setStorageSync('personNumber', '');
      wx.setStorageSync('user', '');
      payWay(data.hotel_id, res.data.preorder_id, function(preorder_id, res) {
        _this.open();
        _this.setData({
          payWayList: res.data,
          preorder_id: preorder_id,
          canPay: true
        });
        wx.setStorageSync("wx_pay", res.wxpay_parms);
      });
    }).catch(function (err) {
      _this.setData({
        canPay: true
      });
      wx.showModal({
        title: '预订失败',
        content: err.data.msg ? err.data.msg:'系统繁忙，请稍后再试',
        showCancel: false,
      })    
      _this.setData({
        canPay: false,
      });
    });;
  },
  getWay(e) {
    this.setData({
      payWayVal: e.detail.value
    })
  },
  payForIt() {
    let payWayVal = this.data.payWayVal;
    let preorder_id = this.data.preorder_id;
    let hotel_id = this.data.hotel_id;
    let _this = this;
    wx.showLoading({
      mask:true
    });
    if (payWayVal == 1) {
      let wxpay_parms = wx.getStorageSync("wx_pay");
      let timeStamp = wxpay_parms.timeStamp;
      let nonceStr = wxpay_parms.nonceStr;
      let packAge = wxpay_parms.package;
      let signType = wxpay_parms.signType;
      let paySign = wxpay_parms.paySign;
      // 调用微信支付功能
      newRes.wxPayFor(timeStamp, nonceStr, packAge, signType, paySign).then((res) => {
        wx.hideLoading();
        wx.showToast({
          title: '支付成功',
          duration: 1000,
          mask: true
        });
        setTimeout(() => {
          wx.navigateTo({
            url: "/pages/index/page/orderDetail/orderDetail?preorder_id=" + preorder_id + "&hotel_id=" + hotel_id
          });
        }, 1000)
      }).catch((err) => {
        wx.hideLoading();
        wx.showModal({
          title: '已取消支付',
          content: '您已取消支付，可在个人中心订单列表继续完成支付',
          confirmText: '去支付',
          cancelText: "留在这",
          success(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/personCenter/page/myOrders/myOrders',
              });
            }
          },
        });
      })
    } else if (payWayVal == 5) {
      newRes.balancePay({
        hotel_id: hotel_id,
        preorder_id: preorder_id,
        pay_way: 5
      }).then((res) => {
        wx.hideLoading();
        wx.showToast({
          title: '支付成功',
          duration: 1000,
          mask: true
        });
        setTimeout(() => {
          wx.navigateTo({
            url: "/pages/index/page/orderDetail/orderDetail?preorder_id=" + preorder_id + "&hotel_id=" + hotel_id
          });
        }, 1000)
      }).catch((err) => {
        wx.showToast({
          title: err.data.msg ? err.data.msg : '积分支付失败，请稍后再试',
          icon: "none",
          mask: true
        })
      })
    };
    this.open();
  },
  // 到店窗口
  store: function() {
    this.setData({
      store: !this.data.store,
      detail: false,
      pay: false,
    })
  },
  // 到店时间的值 
  storeTimeFn: function(e) {
    this.setData({
      storeTimeChoose: e.currentTarget.id,
      storeTimeValue: e.currentTarget.dataset.val, //选中的预到时间
      store: !this.data.store
    })
  }
})