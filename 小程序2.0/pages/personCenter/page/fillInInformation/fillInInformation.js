// pages/personCenter/page/fillInInformation/fillInInformation.js
import newRes from "../../../../utils/api.js";
import Reg from "../../../../utils/reg.js";
Page({
  /* 页面的初始数据 */
  data: {
    sex: 1,
    // country: ['中国', '中国台湾', '中国香港', '中国澳门'],
    // countryIndex: 0,
    showMemberType: false,
    memberType: [],
    memberTypeIndex: 0,
    msg: {
      name: "",
      idcard: "",
      recharge_amount: 0,
      rate: 0,
      hotel_id: '',
    },
  },
  /* 生命周期函数--监听页面加载 */
  onLoad: function(options) {
    let op = options;
    let memberCard = JSON.parse(wx.getStorageSync("memberCard"));
    let ind = op.card_id;
    let msg = this.data.msg;
    let memberTypeIndex = this.data.memberTypeIndex;
    msg.mobile = op.mobile;
    msg.hotel_id = op.hotel_id;
    memberCard.forEach(function(v, i) {
      if (v.id == ind) {
        msg.recharge_amount = v.min_recharge_amount;
        msg.rate = v.rate * v.min_recharge_amount;
        memberTypeIndex = i;
      };
    });
    this.setData({
      memberTypeIndex: memberTypeIndex,
      memberType: memberCard,
      msg: msg
    })
  },
  getName(e) {
    let msg = this.data.msg;
    msg.name = e.detail.value;
    this.setData({
      msg: msg
    })
  },
  // 选择性别
  getSex(e) {
    let msg = this.data.msg;
    msg.sex = sex;
    this.setData({
      msg: msg
    });
  },
  // 选择证件类型
  // getIdType(e) {
  //   this.setData({
  //     idTypeIndex: e.detail.value,
  //     msg: {
  //       idType: this.data.idType[e.detail.value],
  //     }
  //   })
  // },
  getIdcard(e) {
    let msg = this.data.msg;
    msg.idcard = e.detail.value;
    this.setData({
      msg: msg
    })
  },
  // getCountry(e) {
  //   countryIndex: e.detail.value
  //   this.setData({
  //     msg: {
  //       country: this.data.country[e.detail.value],
  //     }
  //   })
  // },
  getMemberType() {
    this.setData({
      showMemberType: !this.data.showMemberType,
    });
  },
  getMoney(e) {
    let memberType = this.data.memberType;
    let memberTypeIndex = this.data.memberTypeIndex;
    let msg = this.data.msg;
    msg.recharge_amount = e.detail.value;
    msg.rate = memberType[memberTypeIndex].rate * e.detail.value;
    this.setData({
      msg: msg
    })
  },
  getType(e) {
    let memberType = this.data.memberType;
    let msg = this.data.msg;
    let ind = e.currentTarget.dataset.index;
    msg.recharge_amount = memberType[ind].min_recharge_amount;
    msg.rate = memberType[ind].rate * memberType[ind].min_recharge_amount;
    this.setData({
      memberTypeIndex: ind,
      msg: msg
    });
    this.getMemberType();
  },
  sendMsg() {
    let msg = this.data.msg;
    let memberType = this.data.memberType;
    let ind = this.data.memberTypeIndex;
    let _this = this;
    if (!msg.name) {
      wx.showToast({
        title: "请填写姓名",
        icon: "none",
        mask: true
      });
      return;
    };
    if (!msg.idcard || !Reg.regIdCard(msg.idcard)) {
      wx.showToast({
        title: "请填写正确的身份证号码哦",
        icon: "none",
        mask: true
      });
      return;
    };
    newRes.addMember({
      "mobile": msg.mobile,
      "hotel_id": msg.hotel_id,
      "member_level_id": memberType[ind].id,
      "idcard": msg.idcard,
      "name": msg.name,
      "recharge_amount": Number(msg.recharge_amount)
    }).then((res) => {
      let member_trade_id = res.data.member_trade_id;
      _this.memberRecharge(member_trade_id);
    }).catch((err) => {
      console.log(err)
      wx.showToast({
        title: err.data.msg,
        icon: "none",
        mask: true
      })
    })
  },
  memberRecharge(id) {
    let data = this.data.msg;
    newRes.memberRecharge({
      'id': id
    }).then((res) => {
      let msg = res.data;
      newRes.wxPayFor(msg.timeStamp, msg.nonceStr, msg.package, msg.signType, msg.paySign).then((res) => {
        wx.redirectTo({
          url: '../transactResult/transactResult?hotel_id=' + data.hotel_id,
        });
      }).catch((err) => {
        wx.showToast({
          title: '已取消支付',
          icon:"none",
          mask: true
        })
      });
    }).catch((err) => {
      console.log(err)
      wx.showToast({
        title: err.data.msg,
        icon: "none",
        mask: true
      })
    });
  }
})