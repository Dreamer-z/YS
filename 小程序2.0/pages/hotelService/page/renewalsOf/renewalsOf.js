// pages/hotelService/page/renewalsOf/renewalsOf.js
import { hosts, api, request, wxPay} from "../../../../utils/api.js";
Page({
  data: {
    leave_time: null,
    hide: true,
    date: null,
    day: 1,
    hotelData:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let hotelData = JSON.parse(options.hotel);
    let leave_time = hotelData.leave_time.split(' ')[0];
    this.setData({
      leave_time: leave_time,
      hotelData: hotelData,
    })
  },
  // 展开日历
  choseDate() {
    this.setData({
      hide: !this.data.hide,
    })
  },
  // 日历时间
  getDate(e) {
    let checkIn = e.detail.checkIn2;
    let checkOut = e.detail.checkOut2;
    let iY = checkIn.split("/")[0];
    let iM = checkIn.split("/")[1];
    let iD = checkIn.split("/")[2];
    let oY = checkOut.split("/")[0];
    let oM = checkOut.split("/")[1];
    let oD = checkOut.split("/")[2];
    let nTime = new Date(oY, (oM - 1), oD).getTime() - new Date(iY, (iM - 1), iD).getTime();
    let day = parseInt(nTime / (60 * 60 * 24 * 1000));
    this.setData({
      date: e.detail,
      day: day,
    })
  },
  chooseEnd(e) {
    let checkIn = e.detail.checkIn2;
    let checkOut = e.detail.checkOut2;
    let iY = checkIn.split("/")[0];
    let iM = checkIn.split("/")[1];
    let iD = checkIn.split("/")[2];
    let oY = checkOut.split("/")[0];
    let oM = checkOut.split("/")[1];
    let oD = checkOut.split("/")[2];
    let nTime = new Date(oY, (oM - 1), oD).getTime() - new Date(iY, (iM - 1), iD).getTime();
    let day = parseInt(nTime / (60 * 60 * 24 * 1000));
    this.setData({
      hide: !this.data.hide,
      date: e.detail,
      day: day,
    })
  },
  // 微信直接支付
  payForIt: function (e) {
    let hotel_id = this.data.hotelData.hotel_id;
    let room_id = this.data.hotelData.room_id;
    let checkOut = this.data.date.checkOut2;
    let order_id = this.data.hotelData.order_id;
    let data = {
      "hotel_id": hotel_id,
      "room_id": room_id,
      "leave_time": checkOut,
      "order_id": order_id,
      "prepay_id": e.detail.formId,
      "action": 2
    };
    // let url = '/pages/hotelService/page/orderDetails/orderDetails?id=';
    let url = "";
    // 调用微信支付功能
    wxPay(data,url);
  }
})