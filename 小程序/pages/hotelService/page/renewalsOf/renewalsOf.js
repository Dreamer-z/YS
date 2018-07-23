// pages/hotelService/page/renewalsOf/renewalsOf.js
import { hosts, api, request, wxPay} from "../../../../utils/api.js";
import { Calendar } from "../../../../utils/calendar.js";
let calendar = new Calendar;
Page({
  data: {
    calendar: true,
    currentObj: '',
    currentDayList: [],
    checkIn: '',
    checkOut: '',
    checkOut1: '',
    checkOut2: '',
    today: '',
    week: [],
    day: '',
    hotelData:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let hotelData = JSON.parse(options.hotel);
    let date = hotelData.leave_time.split(" ")[0];
    let currentObj = new Date(date);
    currentObj = calendar.getCurrentDayString(currentObj);
    calendar.setSchedule(this);
    calendar.defaultDay();
    let week = [];
    let y = currentObj.getFullYear();
    let m = currentObj.getMonth();
    let d = currentObj.getDate();
    let today = 0;
    for (let i = 0; i < this.data.currentDayList.length; i++) {
      if (this.data.currentDayList[i].choose != "dis") {
        if (this.data.currentDayList[i].value == d) {
          today = i;
        };
      };
    };
    // 初始星期
    week[0] = calendar.weekDay(new Date(y, m, d).getDay());
    let nextWeekDay = new Date(y, m, d).getTime() + (60 * 60 * 24 * 1000);
    let nY = new Date(nextWeekDay).getFullYear();
    let nM = new Date(nextWeekDay).getMonth();
    let nD = new Date(nextWeekDay).getDate();
    week[1] = calendar.weekDay(new Date(nY, nM, nD).getDay());
    this.setData({
      currentObj: currentObj,
      currentDate: y + '年' + (m + 1) + '月',
      currentObj: currentObj,
      checkIn: y + '年' + (m +1) + '月' + d + '日',
      checkIn1: (m + 1) + '月' + d + '日',
      checkIn2: y + '-' + (m + 1) + '-' + d,
      checkOut: y + '年' + (m + 1) + '月' + (d + 1) + '日',
      checkOut1: (m + 1) + '月' + (d + 1) + '日',
      checkOut2: y + '-' + (m + 1) + '-' + (d + 1),
      week: week,
      today: today,
      hotelData: hotelData,
    });
  },
  // 打开日历窗口
  showCalendar: function () {
    this.setData({ calendar: !this.data.calendar });
  },
  // 关闭日历弹窗
  closeCalendar: function () {
    this.setData({ calendar: !this.data.calendar });
  },
  // 滑动切换开始
  slideStart: function (e) {
    calendar.slideStart(e);
  },
  // 滑动切换结束
  slideEnd: function (e) {
    calendar.slideEnd(e, this);
  },
  // 选择日期
  chooseDay: function (e) {
    calendar.chooseOne(e, this);
    let checkIn = this.data.checkIn2;
    let checkOut = this.data.checkOut2;
    let iY = checkIn.split("-")[0];
    let iM = checkIn.split("-")[1];
    let iD = checkIn.split("-")[2];
    let oY = checkOut.split("-")[0];
    let oM = checkOut.split("-")[1];
    let oD = checkOut.split("-")[2];
    let nTime = new Date(oY, oM, oD).getTime() - new Date(iY, iM, iD).getTime();
    let day = Math.floor(nTime / 86400000);
    this.setData({ day: day })
  },
  // 切换月份渲染
  rander: function (e) {
    calendar.doOneDay(e, this);
  },
  // 微信直接支付
  payForIt: function (e) {
    let hotel_id = this.data.hotelData.hotel_id;
    let room_id = this.data.hotelData.room_id;
    let checkOut = this.data.checkOut2;
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