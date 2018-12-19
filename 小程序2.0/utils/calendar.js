// 日历
class Calendar {
  constructor() {
    this.currentObj = '';
    this.lastkey = [];
    this.firstkey = [];
    this.initYear = 0;
    this.initMonth = 0;
    this.nowYear = 0;
    this.nowMonth = 0;
    this.nowDate = 0;
    this.Year = 0;
    this.Month = 0;
    this.nowNum = 0;
    this.initNum = 0;
    this.firstNum = 0;
    this.lastNum = 0;
    this.dataarr = [];
    this.change = '';
    this.week = [];
    this.day = 0;
    this.today = -1;
    this.currentDayList = [];
    this.direction = null;
    this.startX = 0;
    this.endX = 0;
  }
  // 判断日期是否存在
  getCurrentDayString(objDate) {
    if (objDate != '') {
      this.initYear = objDate.getFullYear();
      this.nowYear = objDate.getFullYear();
      this.initMonth = objDate.getMonth();
      this.nowMonth = objDate.getMonth();
      this.nowDate = objDate.getDate();
      this.Year = this.nowYear;
      this.Month = this.nowMonth;
      this.Date = this.nowDate;
      this.currentObj = new Date(this.Year, this.Month, this.Date);
      return objDate
    } else {
      let c_obj = new Date();
      this.currentObj = c_obj;
      this.initYear = c_obj.getFullYear();
      this.nowYear = c_obj.getFullYear();
      this.initMonth = c_obj.getMonth();
      this.nowMonth = c_obj.getMonth();
      this.nowDate = c_obj.getDate();
      this.Year = this.nowYear;
      this.Month = this.nowMonth;
      this.Date = this.nowDate;
      return this.currentObj;
    }
  }
  // 创建当前月份数组
  setSchedule(hotel) {
    let Y = this.currentObj.getFullYear();
    let m = this.currentObj.getMonth();
    let d = this.currentObj.getDate();
    let currentDayNum = new Date(Y, m + 1, 0).getDate();
    let prevDayNum = new Date(Y, m, 0).getDate();
    let result = new Date(Y, m, 0, 0, 0, 0).getDay();
    let firstKey = result == 6 ? 0 : result + 1;
    let choose = [];
    let f = 0;
    let pf = prevDayNum - firstKey;
    let lf = 0;
    this.currentDayList = [];
    let _this = this;
    function a() {
      for (let i = 0; i < 42; i++) {
        if (i < firstKey) {
          pf++;
          _this.currentDayList.push({ "value": pf, "choose": "dis" });
        } else {
          if (f < currentDayNum) {
            f++;
            _this.currentDayList.push({ "value": f, "choose": false });
          } else if (f >= currentDayNum) {
            lf++;
            _this.currentDayList.push({ "value": lf, "choose": "dis" });
          }
        }
      };
      return b(_this.currentDayList);
    }
    a();
    function b(currentDayList) {
      let today = new Date().getDate();
      let year = new Date().getFullYear();
      let month = new Date().getMonth();
      if (_this.nowMonth == month && _this.nowYear == year) {
        for (let i = 0; i < currentDayList.length; i++) {
          if (currentDayList[i].choose != "dis") {
            if (currentDayList[i].value == today) {
              _this.today = i;
            };
          };
        }
      } else {
        _this.today = -1;
      }
      hotel.setData({
        today: _this.today,
        currentDayList: currentDayList,
      });
    };
  }
  init0(hotel) {
    for (let i = 0; i < this.currentDayList.length; i++) {
      if (this.currentDayList[i].choose != "dis") {
        this.currentDayList[i].choose = false;
        hotel.setData({ currentDayList: this.currentDayList });
      };
    };
    this.change = null;
    this.dataarr = [];
    this.firstkey = [];
    this.lastkey = [];
    this.lastNum = '';
    this.lastMonth = '';
    this.lastYear = '';
    wx.showModal({
      title: '温馨提示',
      content: '请选择正确的日期！',
      showCancel: false
    });
  };
  chooseEnd() {
    return this.dataarr;
  };
  // 选择时间段
  choose(e, hotel) {
    if (e.currentTarget.dataset.choose == 'dis') {
      return;
    }; 
    if (e.currentTarget.dataset.choose == true) {
      wx.showToast({
        title: '不能选在同一天哦',
        icon: "none",
        mask: true
      });
      return;
    };
    let week = [];
    let index = e.currentTarget.dataset.index;
    let first = '', last = '';
    let check = [];
    let currentDayNum = new Date(this.nowYear, (this.nowMonth + 1), 0).getDate();
    if (this.nowYear < this.initYear) {
      this.init0(hotel)
      return;
    };
    if (this.nowYear == this.initYear && this.nowMonth < this.initMonth) {
      this.init0(hotel)
      return;
    };
    if (this.nowYear == this.initYear && this.nowMonth == this.initMonth && index < this.today) {
      this.init0(hotel)
      return;
    };
    if (this.change && this.dataarr.length == 1) {
      let nowDate = '';
      let m = '';
      let num = 0;
      let that = this;
      m = this.Month;
      this.lastNum = this.nowNum;
      function a() {
        let Month = that.Month;
        for (let i = 0; i < that.currentDayList.length; i++) {
          if (that.currentDayList[i].choose != "dis") {
            num++;
            if (num == 1) {
              that.lastkey[0] = i;
            };
            if (num == currentDayNum) {
              that.lastkey[1] = i;
            }
          };
        };
        that.lastkey[2] = index;
        if (that.lastNum == that.firstNum) {
          that.dataarr[0] = that.firstkey[2];
          that.dataarr[1] = that.lastkey[2];
          if (that.firstkey[2] <= that.lastkey[2]) {
            that.week[1] = that.weekDay(new Date(that.nowYear, that.nowMonth, that.currentDayList[that.lastkey[2]].value).getDay());
            that.week[0] = that.weekDay(new Date(that.nowYear, that.nowMonth, that.currentDayList[that.firstkey[2]].value).getDay());
          } else {
            that.week[1] = that.weekDay(new Date(that.nowYear, that.nowMonth, that.currentDayList[that.firstkey[2]].value).getDay());
            that.week[0] = that.weekDay(new Date(that.nowYear, that.nowMonth, that.currentDayList[that.lastkey[2]].value).getDay());
          }
        };
        if (that.lastNum < that.firstNum) {
          that.dataarr[0] = that.lastkey[2];
          that.dataarr[1] = that.lastkey[1];
          that.week[1] = that.weekDay(new Date(that.nowYear, that.nowMonth, that.currentDayList[that.firstkey[2]].value).getDay());
          that.week[0] = that.weekDay(new Date(that.nowYear, that.nowMonth, that.currentDayList[index].value).getDay());
        };
        if (that.lastNum > that.firstNum) {
          that.dataarr[0] = that.lastkey[0];
          that.dataarr[1] = that.lastkey[2];
          that.week[0] = that.weekDay(new Date(that.nowYear, that.nowMonth, that.currentDayList[that.firstkey[2]].value).getDay());
          that.week[1] = that.weekDay(new Date(that.nowYear, that.nowMonth, that.currentDayList[index].value).getDay());
        }
        return b(that);
      };
      a();
      function b(that) {
        if (that.lastNum < that.firstNum) {
          first = that.dataarr[0];
          last = that.dataarr[1];
          check = that.dataarr;
          for (let i = 0; i < (last - first + 1); i++) {
            that.currentDayList[i + first].choose = true;
          };
          hotel.setData({
            currentDayList: that.currentDayList,
            checkIn: that.nowYear + '年' + (that.nowMonth + 1) + '月' + that.currentDayList[check[0]].value + '日',
            checkOut: that.Year + '年' + (that.Month + 1) + '月' + that.day + '日',
            checkIn1: (that.nowMonth + 1) + '月' + that.currentDayList[check[0]].value + '日',
            checkOut1: (that.Month + 1) + '月' + that.day + '日',
            checkIn2: that.nowYear + '-' + (that.nowMonth + 1) + '-' + that.currentDayList[check[0]].value,
            checkOut2: that.Year + '-' + (that.Month + 1) + '-' + that.day,
            week: that.week
          });
        } else if (that.lastNum == that.firstNum) {
          if (that.dataarr[0] < that.dataarr[1]) {
            first = that.dataarr[0];
            last = that.dataarr[1];
          } else {
            first = that.dataarr[1];
            last = that.dataarr[0];
          }
          for (let i = 0; i < (last - first + 1); i++) {
            that.currentDayList[i + first].choose = true;
          };
          hotel.setData({
            currentDayList: that.currentDayList,
            checkIn: that.nowYear + '年' + (that.nowMonth + 1) + '月' + that.currentDayList[first].value + '日',
            checkOut: that.Year + '年' + (that.Month + 1) + '月' + that.currentDayList[last].value + '日',
            checkIn1: (that.nowMonth + 1) + '月' + that.currentDayList[first].value + '日',
            checkOut1: (that.Month + 1) + '月' + that.currentDayList[last].value + '日',
            checkIn2: (that.nowYear + 1) + '-' + (that.nowMonth + 1) + '-' + that.currentDayList[first].value,
            checkOut2: that.Year + '-' + (that.Month + 1) + '-' + that.currentDayList[last].value,
            week: that.week
          });
        } else if (that.lastNum > that.firstNum) {
          first = that.dataarr[0];
          last = that.dataarr[1];
          for (let i = 0; i < (last - first + 1); i++) {
            that.currentDayList[i + first].choose = true;
          };
          hotel.setData({
            currentDayList: that.currentDayList,
            checkIn: that.Year + '年' + (that.Month + 1) + '月' + that.day + '日',
            checkOut: that.nowYear + '年' + (that.nowMonth + 1) + '月' + that.currentDayList[last].value + '日',
            checkIn1: (that.Month + 1) + '月' + that.day + '日',
            checkOut1: (that.nowMonth + 1) + '月' + that.currentDayList[last].value + '日',
            checkIn2: that.Year + '-' + (that.Month + 1) + '-' + that.day,
            checkOut2: that.nowYear + '-' + (that.nowMonth + 1) + '-' + that.currentDayList[last].value,
            week: that.week
          });
        };
      };
    } else if (this.dataarr.length < 2) {
      this.dataarr.push(index);
      if (this.dataarr.length <= 1) {
        this.Year = this.nowYear;
        this.Month = this.nowMonth;
        first = this.dataarr[0];
        this.day = this.currentDayList[index].value;
        this.currentDayList[first].choose = true;
        let num = 0;
        for (let i = 0; i < this.currentDayList.length; i++) {
          if (this.currentDayList[i].choose != "dis") {
            num++;
            if (num == 1) {
              this.firstkey[0] = i;
            };
            if (num == currentDayNum) {
              this.firstkey[1] = i;
            }
          };
        };
        this.firstNum = this.nowNum;
        this.lastNum = this.nowNum;
        this.firstkey[2] = index;
        this.week[0] = this.weekDay(new Date(this.nowYear, (this.nowMonth - 1), this.currentDayList[index].value).getDay());
        this.week[1] = this.week[0];
        hotel.setData({
          checkIn: this.nowYear + '年' + (this.nowMonth + 1) + '月' + this.currentDayList[first].value + '日',
          checkOut: this.nowYear + '年' + (this.nowMonth + 1) + '月' + this.currentDayList[first].value + '日',
          checkIn1: (this.nowMonth + 1) + '月' + this.currentDayList[first].value + '日',
          checkOut1: (this.nowMonth + 1) + '月' + this.currentDayList[first].value + '日',
          checkIn2: this.nowYear + '-' + (this.nowMonth + 1) + '-' + this.currentDayList[first].value,
          checkOut2: this.nowYear + '-' + (this.nowMonth + 1) + '-' + this.currentDayList[first].value,
          currentDayList: this.currentDayList,
          week: this.week
        })
      } else {
        if (this.dataarr[0] > this.dataarr[1]) {
          let mid = this.dataarr[0];
          this.dataarr[0] = this.dataarr[1];
          this.dataarr[1] = mid;
        };
        first = this.dataarr[0];
        last = this.dataarr[1];
        for (let i = 0; i < (last - first + 1); i++) {
          this.currentDayList[i + first].choose = true;
        };
        this.lastNum = this.nowNum;
        this.week[0] = this.weekDay(new Date(this.nowYear, this.nowMonth, this.currentDayList[first].value).getDay());
        this.week[1] = this.weekDay(new Date(this.nowYear, this.nowMonth, this.currentDayList[last].value).getDay());
        hotel.setData({
          currentDayList: this.currentDayList,
          checkIn: this.nowYear + '年' + (this.nowMonth + 1) + '月' + this.currentDayList[first].value + '日',
          checkOut: this.nowYear + '年' + (this.nowMonth + 1) + '月' + this.currentDayList[last].value + '日',
          checkIn1: (this.nowMonth + 1) + '月' + this.currentDayList[first].value + '日',
          checkOut1: (this.nowMonth + 1) + '月' + this.currentDayList[last].value + '日',
          checkIn2: this.nowYear + '-' + (this.nowMonth + 1) + '-' + this.currentDayList[first].value,
          checkOut2: this.nowYear + '-' + (this.nowMonth + 1) + '-' + this.currentDayList[last].value,
          week: this.week
        });
      };
    } else {
      this.dataarr = [];
      this.change = '';
      let num = 0;
      for (let i = 0; i < this.currentDayList.length; i++) {
        if (this.currentDayList[i].choose != "dis") {
          num++;
          if (num == 1) {
            this.firstkey[0] = i;
          };
          if (num == currentDayNum) {
            this.firstkey[1] = i;
          }
        };
      };
      this.day = this.currentDayList[index].value;
      this.firstkey[2] = index;
      this.Year = this.nowYear;
      this.Month = this.nowMonth;
      this.firstNum = this.nowNum;
      this.lastNum = '';
      this.lastMonth = '';
      this.lastYear = '';
      for (let i = 0; i < this.currentDayList.length; i++) {
        if (this.currentDayList[i].choose === true) {
          this.currentDayList[i].choose = false;
        }
      };
      this.currentDayList[index].choose = true;
      this.dataarr.push(index);
      hotel.setData({
        currentDayList: this.currentDayList,
      });
    }
  }
  // 切换日历月份及对已选择的日期进行渲染
  doDay(e, hotel) {
    let that = this;
    let Y = this.currentObj.getFullYear();
    let m = this.currentObj.getMonth();
    let d = this.currentObj.getDate();
    if (this.dataarr.length == 1) {
      this.change = this.dataarr[0];
    } else {
      this.change = '';
    };
    if (e.currentTarget.dataset.key && e.currentTarget.dataset.key == 'left') {
      this.direction = 'left'
    } else if (e.currentTarget.dataset.key && e.currentTarget.dataset.key == 'right') {
      this.direction = 'right'
    };
    if (this.direction == 'left') {
      if (m <= this.initMonth && Y <= this.initYear) {
        return;
      };
      this.nowNum--;
      m--;
      if (m < 0) {
        Y--;
        m = 11;
      };
      this.nowYear = Y;
      this.nowMonth = m;
      this.direction = e.currentTarget.dataset.key;
    } else {
      this.nowNum++;
      m++;
      if (m > 11) {
        Y++;
        m = 0;
      };
      this.nowYear = Y;
      this.nowMonth = m;
      this.direction = e.currentTarget.dataset.key;
    };
    this.currentObj = new Date(Y, m, 1);
    hotel.setData({
      currentDate: Y + '年' + (m + 1) + '月',
      currentObj: this.currentObj,
    });

    this.setSchedule(hotel);

    // 选定后再次渲染日历
    if (this.change == '') {
      for (let i = 0; i < this.currentDayList.length; i++) {
        // 两次选择在同一个月
        if (this.firstNum === this.lastNum && this.nowNum === this.firstNum) {
          if (i >= this.dataarr[0] && i <= this.dataarr[1]) {
            this.currentDayList[i].choose = true;
            hotel.setData({ currentDayList: this.currentDayList });
          }
        };
        // 两次选择为连续的两个月且第二次选择比第一次选择月份大
        if (this.firstNum === this.lastNum - 1) {
          if (this.nowNum === this.firstNum) {
            if (i >= this.firstkey[2] && i <= this.firstkey[1]) {
              this.currentDayList[i].choose = true;
              hotel.setData({ currentDayList: this.currentDayList });
            }
          };
          if (this.nowNum === this.lastNum) {
            if (i >= this.lastkey[0] && i <= this.lastkey[2]) {
              this.currentDayList[i].choose = true;
              hotel.setData({ currentDayList: this.currentDayList });
            }
          }
        };
        // 两次选择为不连续的两个月且第二次选择比第一次选择月份大
        if (this.firstNum < (this.lastNum - 1)) {
          if (this.nowNum === this.firstNum) {
            if (i >= this.firstkey[2] && i <= this.firstkey[1]) {
              this.currentDayList[i].choose = true;
              hotel.setData({ currentDayList: this.currentDayList });
            }
          };
          if (this.nowNum === this.lastNum) {
            if (i >= this.lastkey[0] && i <= this.lastkey[2]) {
              this.currentDayList[i].choose = true;
              hotel.setData({ currentDayList: this.currentDayList });
            }
          };
          if (this.firstNum < this.nowNum && this.nowNum < this.lastNum) {
            if (this.currentDayList[i].choose != "dis") {
              this.currentDayList[i].choose = true;
              hotel.setData({ currentDayList: this.currentDayList });
            };
          }
        };
        // 两次选择为连续的两个月且第二次选择比第一次选择月份小
        if (this.firstNum === this.lastNum + 1) {
          if (this.nowNum === this.lastNum) {
            if (i >= this.lastkey[2] && i <= this.lastkey[1]) {
              this.currentDayList[i].choose = true;
              hotel.setData({ currentDayList: this.currentDayList });
            }
          };
          if (this.nowNum === this.firstNum) {
            if (i >= this.firstkey[0] && i <= this.firstkey[2]) {
              this.currentDayList[i].choose = true;
              hotel.setData({ currentDayList: this.currentDayList });
            }
          }
        };
        // 两次选择为不连续的两个月且第二次选择比第一次选择月份小
        if (this.firstNum > this.lastNum + 1) {
          if (this.nowNum === this.lastNum) {
            if (i >= this.lastkey[2] && i <= this.lastkey[1]) {
              this.currentDayList[i].choose = true;
              hotel.setData({ currentDayList: this.currentDayList });
            }
          };
          if (this.nowNum === this.firstNum) {
            if (i >= this.firstkey[0] && i <= this.firstkey[2]) {
              this.currentDayList[i].choose = true;
              hotel.setData({ currentDayList: this.currentDayList });
            }
          };
          if (this.nowNum < this.firstNum && this.nowNum > this.lastNum) {
            if (this.currentDayList[i].choose != "dis") {
              this.currentDayList[i].choose = true;
              hotel.setData({ currentDayList: this.currentDayList });
            };
          }
        };
      }
    }
  }
  defaultDay() {
    let currentDayNum = new Date(this.nowYear, (this.nowMonth + 1), 0).getDate();
    let currentObj = this.currentObj;
    let num = 0;
    let today = -1;
    for (let i = 0; i < this.currentDayList.length; i++) {
      if (this.currentDayList[i].choose != "dis") {
        num++;
        if (num == 1) {
          this.firstkey[0] = i;
        };
        if (num == currentDayNum) {
          this.firstkey[1] = i;
        }
        if (num == currentObj.getDate()) {
          today = i;
        }
      };
    };
    this.firstNum = this.nowNum;
    this.firstkey[2] = today;
    this.dataarr.push(today);
    this.week[0] = this.weekDay(new Date(this.nowYear, this.nowMonth, currentObj.getDate()).getDay());
    let next = new Date(new Date(this.nowYear, this.nowMonth, currentObj.getDate()).getTime() + (60 * 60 * 24 * 1000));
    this.week[1] = this.weekDay(new Date(next.getFullYear(), next.getMonth(), next.getDate()).getDay());
  }; 
  init() {
    this.change = null;
    this.lastNum = '';
    this.lastMonth = '';
    this.lastYear = '';
    wx.showModal({
      title: '温馨提示',
      content: '请选择正确的日期！',
      showCancel: false
    });
  };
  //续费 选择时间
  chooseOne(e, hotel) {
    if (e.currentTarget.dataset.choose == 'dis') {
      return;
    };
    for (let i = 0; i < this.currentDayList.length; i++) {
      if (this.currentDayList[i].choose != 'dis') {
        this.currentDayList[i].choose = false;
      }
    };
    let week = [];
    let index = e.currentTarget.dataset.index;
    let first = '', last = '';
    let check = [];
    let currentDayNum = new Date(this.nowYear, (this.nowMonth + 1), 0).getDate();
    if (this.nowYear < this.initYear) {
      this.init()
      return;
    };
    if (this.nowYear == this.initYear && this.nowMonth < this.initMonth) {
      this.init()
      return;
    };
    if (this.nowYear == this.initYear && this.nowMonth == this.initMonth && index < this.today) {
      this.init()
      return;
    };  
    if (this.change) {
      let m = '';
      let num = 0;
      let that = this;
      m = this.Month;
      this.lastNum = this.nowNum;
      function a() {
        let Month = that.Month;
        let num = 0;
        for (let i = 0; i < that.currentDayList.length; i++) {
          if (that.currentDayList[i].choose != "dis") {
            num++;
            if (num == 1) {
              that.lastkey[0] = i;
            };
            if (num == currentDayNum) {
              that.lastkey[1] = i;
            }
          };
        };
        that.lastkey[2] = index;

          if (that.lastNum == that.firstNum) {
            that.dataarr[1] = index;
            if (that.firstkey[2] <= that.lastkey[2]) {
              that.week[1] = that.weekDay(new Date(that.nowYear, that.nowMonth, that.currentDayList[that.lastkey[2]].value).getDay());
            } else {
              that.week[1] = that.weekDay(new Date(that.nowYear, that.nowMonth, that.currentDayList[that.lastkey[2]].value).getDay());
            }
          };
          if (that.lastNum != that.firstNum) {
            that.dataarr[1] = index;
            that.week[1] = that.weekDay(new Date(that.nowYear, that.nowMonth, that.currentDayList[that.lastkey[2]].value).getDay());
          };
        // };
        return b(that);
      };
      a();
      function b(that) {
        for (let i = 0; i < that.currentDayList.length; i++) {
          if (that.currentDayList[i].choose != 'dis') {
            that.currentDayList[i].choose = false;
          }
        };
        if (that.lastNum < that.firstNum) {
          first = that.dataarr[0];
          last = that.dataarr[1];
          check = that.dataarr;
          for (let i = 0; i < (last - first + 1); i++) {
            that.currentDayList[i + first].choose = true;
          };
          hotel.setData({
            currentDayList: that.currentDayList,
            checkOut: that.Year + '年' + (that.Month + 1) + '月' + that.day + '日',
            checkOut1: (that.Month + 1) + '月' + that.day + '日',
            checkOut2: that.Year + '-' + (that.Month + 1) + '-' + that.day,
            week: that.week
          });
        } else if (that.lastNum == that.firstNum) {
          first = that.dataarr[0];
          last = that.dataarr[1];
          for (let i = 0; i < (last - first + 1); i++) {
            that.currentDayList[i + first].choose = true;
          };
          hotel.setData({
            currentDayList: that.currentDayList,
            checkOut: that.Year + '年' + (that.Month + 1) + '月' + that.currentDayList[last].value + '日',
            checkOut1: (that.Month + 1) + '月' + that.currentDayList[last].value + '日',
            checkOut2: that.Year + '-' + (that.Month + 1) + '-' + that.currentDayList[last].value,
            week: that.week
          });
        } else if (that.lastNum > that.firstNum) {
          last = that.dataarr[1];
          for (let i = 0; i < (last+1); i++) {
            if (that.currentDayList[i].choose != 'dis') {
              that.currentDayList[i].choose = true;
            }
          };
          hotel.setData({
            currentDayList: that.currentDayList,
            checkOut: that.nowYear + '年' + (that.nowMonth + 1) + '月' + that.currentDayList[last].value + '日',
            checkOut1: (that.nowMonth + 1) + '月' + that.currentDayList[last].value + '日',
            checkOut2: that.nowYear + '-' + (that.nowMonth + 1) + '-' + that.currentDayList[last].value,
            week: that.week
          });
        };
      };
    } else {
      this.dataarr[1] = index;
      this.Year = this.nowYear;
      this.Month = this.nowMonth;
      first = this.dataarr[0];
      last = this.dataarr[1];
      this.lastNum = this.nowNum;
      for (let i = 0; i < this.currentDayList.length; i++) {
        if (this.currentDayList[i].choose != 'dis') {
          this.currentDayList[i].choose = false;
        }
      };
      for (let i = 0; i < (last - first + 1); i++) {
        this.currentDayList[i + first].choose = true;
      };
      this.week[1] = this.weekDay(new Date(this.nowYear, this.nowMonth, this.currentDayList[last].value).getDay());
      hotel.setData({
        checkOut: this.nowYear + '年' + (this.nowMonth + 1) + '月' + this.currentDayList[last].value + '日',
        checkOut1: (this.nowMonth + 1) + '月' + this.currentDayList[last].value + '日',
        checkOut2: this.nowYear + '-' + (this.nowMonth + 1) + '-' + this.currentDayList[last].value,
        currentDayList: this.currentDayList,
        week: this.week
      })
    }
  }
  //续费 切换日历月份及对已选择的日期进行渲染
  doOneDay(e, hotel) {
    let that = this;
    let Y = this.currentObj.getFullYear();
    let m = this.currentObj.getMonth();
    let d = this.currentObj.getDate();
    this.change = this.dataarr[0];
    if (e.currentTarget.dataset.key && e.currentTarget.dataset.key == 'left') {
      this.direction = 'left'
    } else if (e.currentTarget.dataset.key && e.currentTarget.dataset.key == 'right') {
      this.direction = 'right'
    };
    if (this.direction == 'left') {
      if (m <= this.initMonth && Y <= this.initYear) {
        return;
      };
      this.nowNum--;
      m--;
      if (m < 0) {
        Y--;
        m = 11;
      };
      this.nowYear = Y;
      this.nowMonth = m;
    } else {
      this.nowNum++;
      m++;
      if (m > 11) {
        Y++;
        m = 0;
      };
      this.nowYear = Y;
      this.nowMonth = m;
    };
    this.currentObj = new Date(Y, m, d);
    hotel.setData({
      currentDate: Y + '年' + (m + 1) + '月',
      currentObj: this.currentObj,
    });
    this.setSchedule(hotel);

    // 选定后再次渲染日历
    if (this.dataarr.length == 2) {
      for (let i = 0; i < this.currentDayList.length; i++) {
        // 两次选择在同一个月
        if (this.firstNum === this.lastNum && this.nowNum === this.firstNum) {
          if (i >= this.dataarr[0] && i <= this.dataarr[1]) {
            this.currentDayList[i].choose = true;
            hotel.setData({ currentDayList: this.currentDayList });
          }
        };
        // 两次选择为连续的两个月且第二次选择比第一次选择月份大
        if (this.firstNum === this.lastNum - 1) {
          if (this.nowNum === this.firstNum) {
            if (i >= this.firstkey[2] && i <= this.firstkey[1]) {
              this.currentDayList[i].choose = true;
              hotel.setData({ currentDayList: this.currentDayList });
            }
          };
          if (this.nowNum === this.lastNum) {
            if (i >= this.lastkey[0] && i <= this.lastkey[2]) {
              this.currentDayList[i].choose = true;
              hotel.setData({ currentDayList: this.currentDayList });
            }
          }
        };
        // 两次选择为不连续的两个月且第二次选择比第一次选择月份大
        if (this.firstNum < (this.lastNum - 1)) {
          if (this.nowNum === this.firstNum) {
            if (i >= this.firstkey[2] && i <= this.firstkey[1]) {
              this.currentDayList[i].choose = true;
              hotel.setData({ currentDayList: this.currentDayList });
            }
          };
          if (this.nowNum === this.lastNum) {
            if (i >= this.lastkey[0] && i <= this.lastkey[2]) {
              this.currentDayList[i].choose = true;
              hotel.setData({ currentDayList: this.currentDayList });
            }
          };
          if (this.firstNum < this.nowNum && this.nowNum < this.lastNum) {
            if (this.currentDayList[i].choose != "dis") {
              this.currentDayList[i].choose = true;
              hotel.setData({ currentDayList: this.currentDayList });
            };
          }
        };
        // 两次选择为连续的两个月且第二次选择比第一次选择月份小
        if (this.firstNum === this.lastNum + 1) {
          if (this.nowNum === this.lastNum) {
            if (i >= this.lastkey[2] && i <= this.lastkey[1]) {
              this.currentDayList[i].choose = true;
              hotel.setData({ currentDayList: this.currentDayList });
            }
          };
          if (this.nowNum === this.firstNum) {
            if (i >= this.firstkey[0] && i <= this.firstkey[2]) {
              this.currentDayList[i].choose = true;
              hotel.setData({ currentDayList: this.currentDayList });
            }
          }
        };
        // 两次选择为不连续的两个月且第二次选择比第一次选择月份小
        if (this.firstNum > this.lastNum + 1) {
          if (this.nowNum === this.lastNum) {
            if (i >= this.lastkey[2] && i <= this.lastkey[1]) {
              this.currentDayList[i].choose = true;
              hotel.setData({ currentDayList: this.currentDayList });
            }
          };
          if (this.nowNum === this.firstNum) {
            if (i >= firstkey[0] && i <= firstkey[2]) {
              this.currentDayList[i].choose = true;
              hotel.setData({ currentDayList: this.currentDayList });
            }
          };
          if (this.nowNum < this.firstNum && this.nowNum > this.lastNum) {
            if (this.currentDayList[i].choose != "dis") {
              this.currentDayList[i].choose = true;
              hotel.setData({ currentDayList: this.currentDayList });
            };
          }
        };
      }
    }
  }
  // 星期
  weekDay(date) {
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
  }
  // 左右滑动切换月份
  slideStart(e, hotel) {
    this.startX = e.changedTouches[0].pageX;
  }

  slideEnd(e, hotel) {
    this.endX = e.changedTouches[0].pageX;
    if (Math.abs(this.startX - this.endX) < 60) {
      return;
    } else {
      if (this.startX - this.endX > 0) {
        this.direction = 'right';
      };
      if (this.startX - this.endX < 0) {
        this.direction = 'left';
      };
      this.doDay(e, hotel);
    }
  }
  slide2End(e, hotel) {
    this.endX = e.changedTouches[0].pageX;
    if (Math.abs(this.startX - this.endX) < 60) {
      return;
    } else {
      if (this.startX - this.endX > 0) {
        this.direction = 'right';
      };
      if (this.startX - this.endX < 0) {
        this.direction = 'left';
      };
      this.doOneDay(e, hotel);
    }
  }
}
export { Calendar }