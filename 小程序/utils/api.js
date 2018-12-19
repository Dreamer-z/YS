import Host from "./hosts.js";
// let hosts = 'https://api.yunsuit.com';//外网正式环境
// let hosts = 'https://demo.phpst.cn';//外网开发环境
let hosts = Host.getHost(); //外网测试环境
let api = {
  // 更新用户信息
  "userMsg": '/api/v1/user',
  // 登录
  "login": '/api/v1/token/user',
  // 身份验证
  "authentication": '/api/v1/token/verify',
  // 酒店列表
  "hotelList": '/api/v1/hotel',
  // 授权酒店列表
  "newHotelList": '/api/v1/hotel/auth',
  // 酒店详情
  "hotel": '/api/v1/hotel/',
  // 房型列表
  "roomTypeList": '/api/v1/hotel/room_type',
  // 酒店设施详情
  "hotelfacilityDetails": '/api/v1/hotel/detail/',
  // 房间详情
  "room": '/api/v1/roomtype/',
  // 新增预定单
  "reserve": '/api/v1/preorder',
  // 未支付订单重新支付
  "repeat": '/api/v1/preorder/repeat',
  // 查询支付方式
  "payway": '/api/v1/payway',
  // 微信预支付统一下单
  "prepay": '/api/v1/pay/prepay',
  // 查询订单详情
  "preorder": '/api/v1/preorder/',
  // 修改联系人信息
  "amend": '/api/v1/contact/',
  // 查询联系人信息
  "query": '/api/v1/contact/',
  // 查询联系人列表信息
  "queryList": '/api/v1/contact',
  // 添加联系人
  "add": '/api/v1/contact',
  // 个人订单查询
  'preorderStatus': '/api/v1/preorder',
  // 个人订单
  "myOrder": "/api/v1/preorder",
  // 取消订单
  'cancel': '/api/v1/preorder/',
  // 分享二维码
  "qrcode":"/api/v1/share/qrcode",
  // 续房
  'keepRoom': "/api/v1/service/keep",
  // 获取续房参数
  'keepRoomData': "/api/v1/pay/keep",
  // 获取退房验证码
  'checkOutCode': "/api/v1/captcha/show",
  // 验证退房验证码
  'verifyCode': "/api/v1/captcha/verify",
  // 退房
  'checkOut': "/api/v1/service/end",
  // 客房打扫
  'clear': '/api/v1/service/clean',
  // 投诉建议
  'complaint': "/api/v1/advice",
  // 酒店服务入住订单查询
  'hotelService': '/api/v1/user/order',
  // 分享房间权限
  'share': '/api/v1/user/order',
  // 账单列表
  'billList': '/api/v1/user/orderlist',
  // 账单详情
  'billDetails': '/api/v1/user/consume'
};

// 请求数据
let request = function({
  url,
  data,
  method,
  header = {
    'Content-Type': 'application/json',
    'Token': wx.getStorageSync("token")
  }
}) {
  wx.showToast({
    title: '加载中...',
    icon: 'loading'
  });
  // 地址，传参，请求方式，header
  return new Promise(function(resolve, reject) {
    wx.request({
      url: hosts + url,
      data: data,
      method: method,
      header: header,
      success: function(res) {
        wx.hideToast();
        let code = res.statusCode.toString();
        let startChar = code.charAt(0);
        if (startChar == '2' && res.data.error_code == 0) {
          resolve(res.data)
        } else {
          reject(res);
        }
      },
      fail: function (res) {
        wx.hideToast();
        reject(res)
      }
    })
  })
}

// 查询授权酒店列表
let authHotel = function(data) {
  return request({
    url: api.newHotelList,
    method: "GET",
    data: data
  });
}

// 更新用户信息
let userMsg = function(data) {
  return request({
    url: api.userMsg,
    method: "PUT",
    data: data
  });
}

// 查询支付方式
let payWay = function() {
  return request({
    url: api.payway,
    method: "GET"
  });
}

//酒店详情
let hotelDatail = function(hotelId) {
  return request({
    url: api.hotel + hotelId,
    method: 'GET'
  })
}

//房型列表
let roomTypeList = function(arg) {
  return request({
    url: api.roomTypeList,
    data: arg,
    method: "POST"
  });
}

// 查询订单
let preorder = function(id) {
  // 订单id
  return request({
    url: api.preorder + id,
    method: "GET"
  });
}

// 支付
let pay = function({
  data,
  openUrl
}) {
  // 传参、调用当前页面this（方便setData）
  if (!data.pay_way) {
    wx.showToast({
      title: '请选择支付方式',
      icon: "none"
    });
    return;
  };
  // 预订单
  pOrder(data, openUrl)
};
// 预订单
function pOrder(data, openUrl) {
  wx.showToast({
    title: '正在努力提交',
    icon: "loading",
    mask: true,
  });
  request({
    url: api.reserve,
    data: data,
    method: 'POST',
  }).then(function(data) {
    wx.setStorageSync('personNumber', '');
    wx.setStorageSync('user', '');
    if (data.data.pass) {
      let preorder_id = data.data.preorder_id
      if (!data.data.is_pay) {
        wx.showToast({
          title: '预订成功',
          duration: 800
        });
        setTimeout(() => {
          wx.reLaunch({
            url: openUrl + preorder_id
          });
        }, 800)
      };
      if (data.data.is_pay) {
        // 预订单，获取微信支付信息
        wxMsg(openUrl, preorder_id);
      }
    }
  }).catch(function(err) {
    wx.showModal({
      title: '预定失败',
      content: err.data.msg,
      showCancel: false,
    })
  });
};
// 未支付订单重新支付下单
let repeatOrder = function({
  openUrl,
  id,
  pay_way
}) {
  if (!pay_way) {
    wx.showToast({
      title: '请选择支付方式',
      icon: "none"
    });
    return;
  };
  request({
    url: api.repeat,
    method: 'PUT',
    data: {
      "id": id,
      "pay_way": pay_way
    }
  }).then(function(res) {
    console.log(res)
    if (res.data.pass) {
      let preorder_id = res.data.preorder_id
      if (!res.data.is_pay) {
        wx.showToast({
          title: '预订成功',
          duration: 800
        });
        wx.navigateTo({
          url: openUrl + preorder_id
        });
      };
      if (res.data.is_pay) {
        // 预订单，获取微信支付信息
        wxMsg(openUrl, preorder_id);
      }
    }
  }).catch(function(err) {
    wx.showModal({
      title: '预定失败',
      content: err.data.msg,
      showCancel: false,
    })
  })
}
// 获取微信支付信息
function wxMsg(openUrl, preorder_id) {
  request({
    url: api.prepay,
    method: 'POST',
    data: {
      id: preorder_id
    }
  }).then(function(res) {
    let timeStamp = res.data.timeStamp;
    let nonceStr = res.data.nonceStr;
    let packAge = res.data.package;
    let signType = res.data.signType;
    let paySign = res.data.paySign;
    let odType = "new";
    // 调用微信支付功能
    wxP(timeStamp, nonceStr, packAge, signType, paySign, openUrl, preorder_id, odType);
  }).catch(function(err) {
    wx.showModal({
      title: '支付失败',
      content: err.data.msg,
      showCancel: false,
    })
  });
};
// 调用微信支付功能
function wxP(timeStamp, nonceStr, packAge, signType, paySign, openUrl, preorder_id, odType) {
  wx.requestPayment({
    'timeStamp': timeStamp,
    'nonceStr': nonceStr,
    'package': packAge,
    'signType': signType,
    'paySign': paySign,
    'success': function(res) {
      wx.showToast({
        title: '操作成功',
        duration: 1000
      });
      if (odType == 'new') {
        wx.navigateTo({
          url: openUrl + preorder_id
        });
      } else {
        setTimeout(function(){
          wx.navigateBack({
            delta: 1
          });
        },1000)
      }
    },
    'fail': function(res) {
      if (odType == 'new') {
        wx.showModal({
          title: '支付未完成',
          content: '您可以在个人中心继续完成订单或取消',
          showCancel: false,
        })
      } else {
        wx.showToast({
          title: '支付未完成',
          icon: 'none'
        })
      }
    }
  })
};

// 微信支付
let wxPay = function(data, openUrl) {
  // 传参、调用当前页面this（方便setData）
  // 预订单
  keepRoom(data, openUrl)
};

// 续房预订单
let keepRoom = function(data, openUrl) {
  wx.showToast({
    title: '正在努力提交',
    icon: "loading",
    mask: true,
  });
  request({
    url: api.keepRoom,
    data: data,
    method: 'POST',
  }).then(function(res) {
    keepRoomData(openUrl, res.data.service_id);
  }).catch(function(err) {
    wx.showToast({
      title: err.data.msg,
      icon: "none"
    });
    console.log(err)
  })
}
// 获取续房参数
let keepRoomData = function(openUrl, service_id) {
  request({
    url: api.keepRoomData,
    method: 'POST',
    data: {
      id: service_id
    }
  }).then(function(res) {
    let timeStamp = res.data.timeStamp;
    let nonceStr = res.data.nonceStr;
    let packAge = res.data.package;
    let signType = res.data.signType;
    let paySign = res.data.paySign;
    let odType = "keep";
    // 调用微信支付功能
    wxP(timeStamp, nonceStr, packAge, signType, paySign, openUrl, service_id, odType);
  }).catch(function(err) {
    console.log(err)
    wx.showModal({
      title: '支付失败',
      content: err.data.msg,
      showCancel: false,
    })
  })
}

// 个人订单（废弃）
let order = function({
  data
}) {
  // 传参
  return request({
    url: api.preorderStatus,
    data: data,
    method: 'GET',
  });
};

// 个人订单
let myOrder = function ({
  data
}) {
  // 传参
  return request({
    url: api.myOrder,
    data: data,
    method: 'GET',
  });
};

// 取消订单
let cancelOrder = function({
  el
}) {
  // 当前元素element
  return new Promise(function(resolve, reject) {
    let id = el.currentTarget.id;
    wx.showModal({
      title: '确认取消？',
      content: "确认要取消该订单吗？",
      success: function(res) {
        if (res.cancel) {
          return;
        };
        if (res.confirm) {
          wx.showToast({
            title: '',
            icon: 'loading'
          });
          wx.request({
            url: hosts + api.cancel + id,
            method: 'PUT',
            header: {
              'Content-Type': 'application/json',
              'Token': wx.getStorageSync("token")
            },
            success: function(res) {
              wx.hideToast();
              let code = res.statusCode.toString();
              let startChar = code.charAt(0);
              if (startChar == '2' && res.data.error_code == 0) {
                resolve(res)
              } else {
                reject(res);
              }
            },
            fail: function(res) {
              wx.hideToast();
              reject(res)
            }
          })
        };
      }
    });
  });
};

// 分享二维码
let qrCode = function(){
  // 分享二维码
  return request({
    url: api.qrcode,
    method: 'GET'
  })
}


// 获取退房验证码
let checkOutCode = function() {
  return request({
    url: api.checkOutCode
  })
};
// 验证退房验证码
let verifyCheckOutCode = function(code) {
  // 用户输入验证码
  return request({
    url: api.verifyCode,
    method: "POST",
    data: {
      "code": code
    }
  });
};
// 退房
let checkOut = function({
  data
}) {
  // 传参
  return request({
    url: api.checkOut,
    method: "POST",
    data: data
  });
};
// 客房打扫
let clear = function(data) {
  // 参数
  return request({
    url: api.clear,
    method: "POST",
    data: data,
  });
};
// 投诉建议
let complaint = function({
  data
}) {
  // 传参
  return request({
    url: api.complaint,
    data: data,
    method: 'POST'
  })
};

// 酒店服务入住订单查询
let hotelService = function() {
  return request({
    url: api.hotelService,
    method: 'GET'
  })
}

// 分享房间权限
let share = function(arg) {
  return request({
    url: api.share,
    method: 'POST',
    data: arg
  })
}

// 账单列表
let billList = function() {
  return request({
    url: api.billList,
    method: 'GET'
  })
}

// 账单详情
let billDetails = function(arg) {
  return request({
    url: api.billDetails,
    method: 'GET',
    data: arg
  })
}

export {
  hosts, //hosts地址
  api, //请求类型拼接地址
  request, //promise封装request
  authHotel, // 查询授权酒店列表
  userMsg, // 更新用户信息
  payWay, //支付方式
  hotelDatail, //酒店详情
  roomTypeList, //房型列表
  preorder, //预订单
  pay, //支付
  repeatOrder, //未支付订单重新支付
  wxPay, //直接wx支付
  order, //订单列表（废弃）
  myOrder,//个人订单列表
  qrCode,// 分享二维码
  cancelOrder, //取消订单
  checkOutCode, //退房验证码
  verifyCheckOutCode, //验证退房验证码
  checkOut, //退房
  clear, //客房打扫
  complaint, //投诉建议
  hotelService, // 酒店服务入住订单查询
  share, // 分享房间权限
  billList, // 账单列表
  billDetails, // 账单详情
};