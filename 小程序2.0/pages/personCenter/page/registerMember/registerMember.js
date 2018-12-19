// pages/personCenter/page/registerMember/registerMember.js
import newRes from "../../../../utils/api.js";
import hosts from "../../../../utils/hosts.js";
import token from "../../../../utils/token.js";
let app = getApp();
Page({
  /* 页面的初始数据 */
  data: {
    noHave:false,
    id: '',
    memberCard: [],
    newData: [],
    transform: true,
    cardInd: 2,
    indicatorInd: 0,
    cardWidth: 0,
    boxWidth: 0,
    sX: 0,
    eX: 0,
    moveX: 0,
  },
  /* 生命周期函数--监听页面加载 */
  onLoad: function(options) {
    let id = options.id;
    let _this = this;
    this.setData({
      id: id,
    })
    this.getMemberCard(id);
    wx.login({
      success: function (data) {
        _this.setData({
          code:data.code
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var _this = this;
    var query = wx.createSelectorQuery();
    query.select('.item').boundingClientRect(function(rect) {
      _this.setData({
        cardWidth: rect.width,
        boxWidth: rect.width * _this.data.newData.length
      });
    }).exec();
  },
  moveStart(e) {
    this.setData({
      transform: true,
      canMove: true,
      sX: e.changedTouches[0].pageX,
    })
  },
  move(e) {
    if (!this.data.canMove) {
      return;
    };
    let x = e.changedTouches[0].pageX;
    let sX = this.data.sX;
    this.setData({
      moveX: x - sX,
    });
  },
  moveEnd(e) {
    let cardWidth = this.data.cardWidth;
    let cardInd = this.data.cardInd;
    let moveX = this.data.moveX;
    let indicatorInd = this.data.indicatorInd;
    let _this = this;
    this.setData({
      moveX: 0,
      eX: e.changedTouches[0].pageX,
    })
    if (moveX < 0) {
      cardInd++;
      indicatorInd++;
      this.setData({
        cardInd: cardInd,
        indicatorInd: indicatorInd,
        canMove: false,
      });
      if (cardInd > this.data.newData.length - 2) {
        cardInd = 1;
        indicatorInd = 0;
        setTimeout(() => {
          this.setData({
            transform: false,
            indicatorInd: indicatorInd,
            cardInd: cardInd,
          });
        }, 200)
      };
      cardInd++;
    } else if (moveX > 0) {
      cardInd--;
      indicatorInd--;
      this.setData({
        cardInd: cardInd,
        indicatorInd: indicatorInd,
        canMove: false,
      });
      if (cardInd == 1) {
        cardInd = _this.data.newData.length - 2;
        indicatorInd = 2;
        setTimeout(() => {
          this.setData({
            cardInd: cardInd,
            indicatorInd: indicatorInd,
            transform: false,
          });
        }, 200)
      };
    };
  },
  // 查询会员卡等级
  getMemberCard(id) {
    let _this = this;
    newRes.memberCard({
      id: id
    }).then(function(res) {
      let memberCard = res.data;
      if (memberCard.length == 0){
        _this.setData({
          noHave:true
        })
        return;
      };
      let newData = [...memberCard];
      let len = memberCard.length;
      newData.unshift(memberCard[len - 1]);
      newData.unshift(memberCard[len - 2]);
      newData.push(memberCard[0]);
      wx.setStorage({
        key: 'memberCard',
        data: JSON.stringify(memberCard),
      });
      _this.setData({
        memberCard: memberCard,
        newData: newData
      });
    }).catch(function(err) {
      console.log(err)
    })
  },
  // 解析手机号
  getMoblie(encryptedData, iv) {
    let _this = this;
    newRes.getMoblie({
      "code": this.data.code,
      "key": hosts.hosts.key,
      'encryptedData': encryptedData,
      "iv": iv
    }).then(function(res) {
      _this.member(res.data.phoneNumber);
    }).catch(function(err) {
      console.log(err)
    })
  },
  // 判断是否是会员
  member(mobile) {
    let _this = this;
    let cardInd = this.data.cardInd;
    let newData = this.data.newData;
    newRes.isMember({
      'mobile': mobile,
      "hotel_id": this.data.id
    }).then(function(res) {
      if (res.data.is_member) {
        wx.redirectTo({
          url: '../binding/binding?mobile=' + mobile + '&hotel_id=' + _this.data.id + '&card_id=' + newData[cardInd].id,
        });
      } else {
        wx.redirectTo({
          url: '../fillInInformation/fillInInformation?mobile=' + mobile + '&hotel_id=' + _this.data.id + '&card_id=' + newData[cardInd].id,
        });
      }
    }).catch(function(err) {
      console.log(err)
    })
  },
  transact(e) {
    if(this.data.noHave){
      return;
    };
    let encryptedData = e.detail.encryptedData;
    let iv = e.detail.iv;
    let _this = this;
    let cardInd = this.data.cardInd;
    let newData = this.data.newData;
    if (e.detail.encryptedData && e.detail.iv) {
      this.getMoblie(encryptedData, iv);
    } else {
      wx.redirectTo({
        url: '../verifyTel/verifyTel?hotel_id=' + _this.data.id + '&card_id=' + newData[cardInd].id,
      });
    };
  }
})