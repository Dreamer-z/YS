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
  // 新增预订单
  "reserve": '/api/v1/preorder',
  // 余额支付
  "balancePay":'/api/v1/pay/preorder',
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
  'cancel': '/api/v1/preorder/cancel',
  // 分享二维码
  "qrcode": "/api/v1/share/qrcode",
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
  'billDetails': '/api/v1/user/consume',
  // 酒店会员列表
  "hotelMember": '/api/v1/member/hotel',
  // 查询会员卡等级
  "memberCard": '/api/v1/memberlevel',
  // 新增会员
  "addMember": '/api/v1/member/create',
  // 解密手机号
  "getMoblie": '/api/v1//mobile/decrypt',
  // 根据手机号判断是否已经是会员
  "isMenber": '/api/v1/is_member',
  // 已经是会员的快捷绑定
  "isMenberBind": '/api/v1/member/verify',
  // 会员充值预支付参数
  "memberRecharge": "/api/v1/pay/recharge",
  // 获取注册会员验证码
  "getMemberCode":'/api/v1/mobile/code',
  // 验证注册会员验证码
  'verifyMemberCode':'/api/v1/mobile/verify',
  // 查询单个酒店会员详情
  'getHotelMember':'/api/v1/member/center',
  // 会员卡充值
  "recharge":'/api/v1/member/recharge',
  // 查询会员信息
  "getMemberMsg":'/api/v1/member/info',
  // 修改会员资料
  "amendMemberMsg":'/api/v1/member',
  // 获取楼层和标签信息
  "getFloorAndTabs":'/api/v1/room/online',
  // 根据标签及楼层获取房间列表
  "getRooms":'/api/v1/room/choose',
  // 排房
  "setRoom":'/api/v1/preorder/set_room',
  // 银行卡
  'gatBankCard':'/api/sale/bank-list',
  // 通过银行卡号获取银行卡信息
  "getCardMsg":'/api/sale/bank-info',
  // 添加银行卡
  "addBankCard":'/api/sale/bank-add',
  // 删除银行卡
  "delBankCard":'/api/sale/bank-del',
  // 我的客户
  "myCustomer":'/api/sale/customer-list',
  // 酒店佣金列表
  "hotelBrokerage": '/api/draw/hotel-list',
  // 分销订单
  "distributeOrder": '/api/sale/order-list',
  // 单个酒店佣金信息
  "oneHotelBrokerage":'/api/draw/hotel-detail',
  // 佣金提现
  "withdraw":'/api/draw/add',
  // 佣金提现记录
  "withdrawRecord":'/api/draw/my-list',
  // 佣金提现记录详情
  "withdrawRecordDetails":'/api/draw/draw-info',
  // 查询分销账户是否身份验证
  "verifyWithdrawId":'/api/sale/check-verify',
  // 完善分销账户身份信息
  "modifyWithdrawId":'/api/sale/verify-modify',
  // 分销中心
  "distributeCenter":'/api/sale/center',
  // 酒店列表/分享
  "getHotel":'/api/sale/share-hotel',
  // 房型列表/分享
  "getRoomType":'/api/sale/share-room',
  // 验证是否首次进入小程序
  "firstLogin":'/api/sale/click-ad',
  // 发送首次进去状态
  "sendFirstLogin":'/api/sale/log-ad',
  // 分销分享绑定上级
  "distributeBind":'/api/sale/bind',
  // 查询小程序运行模式（小程序模式、小程序PMS模式）
  "getMode":'/api/v1/common/is_miniapp_mode',
  // 查询酒店分销是否开启
  "getHotelDistribute":'/api/sale/check-share',
  // 查询预订价格
  "getPreorderPrice":'/api/v1/preorder/price'
};

export default {
  // 查询预订价格
  getPreorderPrice(data) {
    return request({
      url: api.getPreorderPrice,
      method: "POST",
      data: data
    })
  },
  // 查询酒店分销是否开启
  getHotelDistribute(data) {
    return request({
      url: api.getHotelDistribute,
      method: "GET",
      data: data
    })
  },
  // 查询小程序运行模式（小程序模式、小程序PMS模式）
  getMode() {
    return request({
      url: api.getMode,
      method: "GET"
    })
  },
  // 余额支付
  balancePay(data) {
    return request({
      url: api.balancePay,
      method: "POST",
      data: data
    })
  },
  // 分销分享绑定上级
  distributeBind(data) {
    return request({
      url: api.distributeBind,
      method: "GET",
      data: data
    })
  },
  // 发送首次进去状态
  sendFirstLogin(data) {
    return request({
      url: api.sendFirstLogin,
      method: "GET",
      data: data
    })
  },
  // 验证是否首次进入小程序
  firstLogin(data) {
    return request({
      url: api.firstLogin,
      method: "GET",
      data: data
    })
  },
  // 房型列表/分享
  getRoomType(data) {
    return request({
      url: api.getRoomType,
      method: "GET",
      data: data
    })
  },
  // 酒店列表/分享
  getHotel(data) {
    return request({
      url: api.getHotel,
      method: "GET",
      data: data
    })
  },
  // 分销中心
  distributeCenter() {
    return request({
      url: api.distributeCenter,
      method: "GET"
    })
  },
  // 完善分销账户身份信息
  modifyWithdrawId(data) {
    return request({
      url: api.modifyWithdrawId,
      method: "POST",
      data: data
    })
  },
  // 查询分销账户是否身份验证
  verifyWithdrawId(data) {
    return request({
      url: api.verifyWithdrawId,
      method: "GET",
      data: data
    })
  },
  // 佣金提现记录详情
  withdrawRecordDetails(data) {
    return request({
      url: api.withdrawRecordDetails,
      method: "GET",
      data: data
    })
  },
  // 佣金提现记录
  withdrawRecord(data) {
    return request({
      url: api.withdrawRecord,
      method: "GET",
      data: data
    })
  },
  // 佣金提现
  withdraw(data) {
    return request({
      url: api.withdraw,
      method: "POST",
      data: data
    })
  },
  // 单个酒店佣金信息
  oneHotelBrokerage(data) {
    return request({
      url: api.oneHotelBrokerage,
      method: "GET",
      data: data
    })
  },
  // 酒店佣金列表
  hotelBrokerage(data) {
    return request({
      url: api.hotelBrokerage,
      method: "GET",
      data: data
    })
  },
  // 分销订单
  distributeOrder(data) {
    return request({
      url: api.distributeOrder,
      method: "GET",
      data: data
    })
  },
  // 我的客户
  myCustomer(data){
    return request({
      url: api.myCustomer,
      method: "GET",
      data: data
    })
  },
  // 删除银行卡
  delBankCard(data){
    return request({
      url: api.delBankCard,
      method: "GET",
      data: data
    })
  },
  // 添加银行卡
  addBankCard(data) {
    return request({
      url: api.addBankCard,
      method: "POST",
      data: data
    })
  },
  // 通过银行卡号获取银行卡信息
  getCardMsg(data){
    return request({
      url: api.getCardMsg,
      method: "GET",
      data: data
    })
  },
  // 银行卡
  gatBankCard(){
    return request({
      url: api.gatBankCard,
      method: "GET"
    }) 
  },
  // 排房
  setRoom(data){
    return request({
      url: api.setRoom,
      method: "POST",
      data: data
    })
  },
  // 根据标签及楼层获取房间列表
  getRooms(data){
    return request({
      url: api.getRooms,
      method: "POST",
      data: data
    })
  },
  // 获取楼层和标签信息
  getFloorAndTabs(data){
    return request({
      url: api.getFloorAndTabs,
      method: "POST",
      data: data
    })
  },
  // 修改会员资料
  amendMemberMsg(data){
    return request({
      url: api.amendMemberMsg,
      method: "PUT",
      data: data
    })
  },
  // 查询会员信息
  getMemberMsg(data){
    return request({
      url: api.getMemberMsg,
      method: "GET",
      data: data
    })
  },
  // 会员卡充值
  recharge(data){
    return request({
      url: api.recharge,
      method: "POST",
      data: data
    })
  },
  // 查询单个酒店会员详情
  getHotelMember(data){
    return request({
      url: api.getHotelMember,
      method: "GET",
      data: data
    })
  },
  // 验证注册会员验证码
  verifyMemberCode(data){
    return request({
      url: api.verifyMemberCode,
      method: "POST",
      data: data
    })
  },
  // 获取注册会员验证码
  getMemberCode(data){
    return request({
      url: api.getMemberCode,
      method: "POST",
      data: data
    })
  },
  // 已经是会员的快捷绑定
  isMenberBind(data) {
    return request({
      url: api.isMenberBind,
      method: "POST",
      data: data
    })
  },
  // 解密手机号
  getMoblie(data) {
    return request({
      url: api.getMoblie,
      method: "POST",
      data: data
    })
  },
  // 根据手机号判断是否已经是会员
  isMember(data) {
    return request({
      url: api.isMenber,
      method: "POST",
      data: data
    })
  },
  // 调用微信支付
  wxPayFor(timeStamp, nonceStr, packAge, signType, paySign) {
    return new Promise(function(resolve, reject) {
      wx.requestPayment({
        'timeStamp': timeStamp,
        'nonceStr': nonceStr,
        'package': packAge,
        'signType': signType,
        'paySign': paySign,
        'success': function(res) {
          resolve(true)
        },
        'fail': function(err) {
          
          reject(err)
        }
      })
    })
  },
  // 会员充值预支付参数
  memberRecharge(data) {
    return request({
      url: api.memberRecharge,
      method: "POST",
      data: data
    });
  },
  // 新增会员
  addMember(data) {
    return request({
      url: api.addMember,
      method: "POST",
      data: data
    });
  },
  // 查询会员卡等级
  memberCard(data) {
    return request({
      url: api.memberCard,
      method: "GET",
      data: data
    })
  },
  // 酒店会员列表
  hotelMember(data) {
    return request({
      url: api.hotelMember,
      method: "GET",
      data: data
    })
  },
}

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
  // 地址，传参，请求方式，header
  return new Promise(function(resolve, reject) {
    wx.request({
      url: hosts + url,
      data: data,
      method: method,
      header: header,
      success: function(res) {
        let code = res.statusCode.toString();
        let startChar = code.charAt(0);
        if (startChar == '2' && res.data.error_code == 0) {
          resolve(res.data)
        } else {
          reject(res);
        }
      },
      fail: function(res) {
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

// 查询支付方式并获取支付参数
let payWay = function (hotel_id, preorder_id,callback) {
  request({
    url: api.payway, 
    data: {
      hotel_id: hotel_id,
      preorder_id: preorder_id
    },
    method: "GET"
  }).then((res) => {
    callback && callback(preorder_id,res.data);
  }).catch((err) => {
    console.log(err);
    wx.showToast({
      title: err.data.msg ? err.data.msg : "系统繁忙，请稍后再试",
      icon: "none",
      mask: true
    })
  });
}

// 支付
let pay = function(data) {
  return request({
    url: api.reserve,
    data: data,
    method: "POST"
  });
};

// // 未支付订单重新支付下单
// let repeatOrder = function(id) {
//   request({
//     url: api.repeat,
//     method: 'PUT',
//     data: {
//       "id": id
//     }
//   }).then(function(res) {
//     console.log(res)
//     if (res.data.pass) {
//       let preorder_id = res.data.preorder_id
//       if (!res.data.is_pay) {
//         wx.showToast({
//           title: '预订成功',
//           duration: 800
//         });
//         setTimeout(() => {
//           wx.navigateTo({
//             url: openUrl + preorder_id
//           });
//         }, 800)
//       };
//       if (res.data.is_pay) {
//         // 预订单，获取微信支付信息
//         wxMsg(openUrl, preorder_id);
//       }
//     }
//   }).catch(function(err) {
//     wx.showModal({
//       title: '预订失败',
//       content: err.data.msg,
//       showCancel: false,
//     })
//   })
// }
// // 获取微信支付信息
// function wxMsg(openUrl, preorder_id) {
//   request({
//     url: api.prepay,
//     method: 'POST',
//     data: {
//       id: preorder_id
//     }
//   }).then(function(res) {
//     let timeStamp = res.data.timeStamp;
//     let nonceStr = res.data.nonceStr;
//     let packAge = res.data.package;
//     let signType = res.data.signType;
//     let paySign = res.data.paySign;
//     let odType = "new";
//     // 调用微信支付功能
//     wxP(timeStamp, nonceStr, packAge, signType, paySign, openUrl, preorder_id, odType);
//   }).catch(function(err) {
//     wx.showModal({
//       title: '支付失败',
//       content: err.data.msg,
//       showCancel: false,
//     })
//   });
// };
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
        duration: 1000,
        mask: true
      });
      if (odType == 'new') {
        wx.navigateTo({
          url: openUrl + preorder_id
        });
      } else {
        setTimeout(function() {
          wx.navigateBack({
            delta: 1
          });
        }, 1000)
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
          icon: 'none',
          mask: true
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
      icon: "none",
      mask: true
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
let myOrder = function({
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
// let cancelOrder = function (data) {
//   // 分享二维码
//   return request({
//     url: api.cancel,
//     method: 'PUT',
//     data:data
//   })
// }
let cancelOrder = function (id) {
  // 当前元素element
  return new Promise(function(resolve, reject) {
    wx.showModal({
      title: '确认取消？',
      content: "确认要取消该订单吗？",
      success: function(res) {
        if (res.cancel) {
          return;
        };
        if (res.confirm) {
          wx.showToast({
            icon: 'loading',
            mask: true
          });
          wx.request({
            url: hosts + api.cancel,
            method: 'POST',
            data:{
              "preorder_id": id
            }, 
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
let qrCode = function() {
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
let billList = function(data) {
  return request({
    url: api.billList,
    method: 'GET',
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
  hotelDatail, //酒店详情
  roomTypeList, //房型列表
  payWay,// 查询支付方式并获取支付参数
  preorder, //预订单
  pay, //支付
  wxPay, //直接wx支付
  order, //订单列表（废弃）
  myOrder, //个人订单列表
  qrCode, // 分享二维码
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