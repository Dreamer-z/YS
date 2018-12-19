// pages/components/cal/calendar.js
Component({
  /*** 组件的属性列表 */
  properties: {
    continue: { //日历类型，false可选择入住离店时间，true为续房
      type: Boolean,
      value: false     
    },
    date: null,// 续房时间,续房日历必填,
  },
  /*** 组件的初始数据 */
  data: {
    objDate:'',
    currentObj: '',
    lastkey: [],
    firstkey: [],
    initYear: 0,
    initMonth: 0,
    nowYear: 0,
    nowMonth: 0,
    nowDate: 0,
    year: 0,
    month: 0,
    date: 0,
    nowNum: 0,
    initNum: 0,
    firstNum: 0,
    lastNum: 0,
    dataarr: [],
    change: '',
    week: [],
    day: 0,
    today: -1,
    check:{},
    currentDayList: [],
    direction: 'none',
    startX: 0,
    endX: 0,
    checkInDate: '',
    checkOutDate: '',
    checkIn:'',
    checkOut:'',
    currentDate:'',
    outInd:0,
  },
  ready: function() {
    //组件生命周期函数，在组件实例进入页面节点树时执行
    let modal = this.properties.continue;
    if (!modal) {
      this.getCurrentDayString();
      this.setSchedule();
    }else{
      this.setData({
        objDate: new Date(this.properties.date),
      })
      this.getCurrentDayString();
      this.setSchedule();
      this.defaultDay();
    }
  },
  /*** 组件的方法列表 */
  methods: {
    // 判断日期是否存在
    getCurrentDayString: function () {
      let modal = this.properties.continue;
      let objDate = this.data.objDate;
      let c_obj = new Date();
      if (modal) {
        let next = new Date(objDate.getTime() + (60 * 60 * 24 * 1000));
        let week = [];
        week[0] = this.weekDay(objDate.getDay());
        week[1] = this.weekDay(next.getDay());
        let date = {
          checkIn: objDate.getFullYear() + '年' + (objDate.getMonth() + 1) + '月' + objDate.getDate() + '日',
          checkOut: next.getFullYear() + '年' + (next.getMonth() + 1) + '月' + next.getDate() + '日',
          checkIn1: (objDate.getMonth() + 1) + '月' + objDate.getDate() + '日',
          checkOut1: (next.getMonth() + 1) + '月' + next.getDate() + '日',
          checkIn2: objDate.getFullYear() + '/' + (objDate.getMonth() + 1) + '/' + objDate.getDate(),
          checkOut2: next.getFullYear() + '/' + (next.getMonth() + 1) + '/' + next.getDate(),
          week: week
        };
        this.setData({
          initYear: objDate.getFullYear(),
          nowYear: objDate.getFullYear(),
          initMonth: objDate.getMonth(),
          nowMonth: objDate.getMonth(),
          nowDate: objDate.getDate(),
          year: objDate.getFullYear(),
          month: objDate.getMonth(),
          date: objDate.getDate(),
          currentObj: objDate,
          checkInDate: objDate,
          checkOutDate: next,
          check:{
            checkIn: date.checkIn,
            checkIn1: date.checkIn1,
            checkIn2: date.checkIn2,
          },
          checkIn: date.checkIn,
          checkOut: date.checkOut,
          checkDate: date,
          currentDate: objDate.getFullYear() + '年' + (objDate.getMonth() + 1) + '月',
        });
        this.triggerEvent('getDate', date);
      } else {
        let next = new Date(c_obj.getTime() + (60 * 60 * 24 * 1000));
        let week = [];
        week[0] = this.weekDay(c_obj.getDay());
        week[1] = this.weekDay(next.getDay());
        let date = {
          checkIn: c_obj.getFullYear() + '年' + (c_obj.getMonth() + 1) + '月' + c_obj.getDate() + '日',
          checkOut: next.getFullYear() + '年' + (next.getMonth() + 1) + '月' + next.getDate() + '日',
          checkIn1: (c_obj.getMonth() + 1) + '月' + c_obj.getDate() + '日',
          checkOut1: (next.getMonth() + 1) + '月' + next.getDate() + '日',
          checkIn2: c_obj.getFullYear() + '/' + (c_obj.getMonth() + 1) + '/' + c_obj.getDate(),
          checkOut2: next.getFullYear() + '/' + (next.getMonth() + 1) + '/' + next.getDate(),
          week: week
        };

        this.setData({
          initYear: c_obj.getFullYear(),
          nowYear: c_obj.getFullYear(),
          initMonth: c_obj.getMonth(),
          nowMonth: c_obj.getMonth(),
          nowDate: c_obj.getDate(),
          year: c_obj.getFullYear(),
          month: c_obj.getMonth(),
          date: c_obj.getDate(),
          currentObj: c_obj,
          checkInDate: c_obj,
          checkOutDate: next,
          checkIn: c_obj.getFullYear() + '年' + (c_obj.getMonth() + 1) + '月' + c_obj.getDate() + '日',
          checkOut: next.getFullYear() + '年' + (next.getMonth() + 1) + '月' + next.getDate() + '日',
          checkDate: date,
          currentDate: c_obj.getFullYear() + '年' + (c_obj.getMonth() + 1) + '月',
        });
        this.triggerEvent('getDate', date);
      }
    },
    // 创建当前月份数组
    setSchedule: function() {
      let Y = this.data.currentObj.getFullYear();
      let m = this.data.currentObj.getMonth();
      let d = this.data.currentObj.getDate();
      let currentDayNum = new Date(Y, m + 1, 0).getDate();
      let prevDayNum = new Date(Y, m, 0).getDate();
      let result = new Date(Y, m, 0, 0, 0, 0).getDay();
      let firstKey = result == 6 ? 0 : result + 1;
      let choose = [];
      let f = 0;
      let pf = prevDayNum - firstKey;
      let lf = 0;
      let currentDayList = [];
      let _this = this;
      let today = new Date().getDate();
      this.setData({
        currentDayNum: currentDayNum,
      });
      function a() {
        for (let i = 0; i < 42; i++) {
          if (i < firstKey) {
            pf++;
            currentDayList.push({
              "value": pf,
              "choose": "dis",
              "lose": true,
              "tag":null,
            });
          } else {
            if (_this.data.initNum == _this.data.nowNum) {
              if (f < currentDayNum) {
                f++;
                if (today > f) {
                  currentDayList.push({
                    "value": f,
                    "choose": false,
                    "lose":true,
                    "tag": null,
                  });
                }else{
                  currentDayList.push({
                    "value": f,
                    "choose": false,
                    "lose": false,
                    "tag": null,
                  });
                }
              } else if (f >= currentDayNum) {
                lf++;
                currentDayList.push({
                  "value": lf,
                  "choose": "dis",
                  "lose": true,
                  "tag": null,
                });
              }
            }else{
              if (f < currentDayNum) {
                f++;
                currentDayList.push({
                  "value": f,
                  "choose": false,
                  "lose": false,
                  "tag": null,
                });
              } else if (f >= currentDayNum) {
                lf++;
                currentDayList.push({
                  "value": lf,
                  "choose": "dis",
                  "lose": true,
                  "tag": null,
                });
              }
            }
          }
        };
        return b(currentDayList, _this);
      }
      a();

      function b(currentDayList,_this) {
        let today = new Date().getDate();
        let modal = _this.properties.continue;
        if (_this.data.nowNum == 0) {
          for (let i = 0; i < currentDayList.length; i++) {
            if (currentDayList[i].choose != "dis") {
              if (currentDayList[i].value == today) {
                _this.setData({
                  today: i
                });
              };
              if (modal){
                let out = _this.data.check.checkIn2;
                let outday = new Date(out).getDate();
                if (currentDayList[i].value == outday) {
                  _this.setData({
                    outInd: i
                  });
                };
              }
            };
          }
        } else {
          _this.setData({
            today: -1
          });
        }
        _this.setData({
          currentDayList: currentDayList
        });
      };
    },
    init0(){
      let currentDayList = this.data.currentDayList;
      for (let i = 0; i < currentDayList.length; i++) {
        if (currentDayList[i].choose != "dis") {
          currentDayList[i].choose = false;
          currentDayList[i].tag = null;
        };
      };
      this.setData({
        currentDayList: currentDayList,
        change: null,
        dataarr: [],
        firstkey: [],
        lastkey: [],
      });
      wx.showModal({
        title: '温馨提示',
        content: '请选择正确的日期！',
        showCancel: false
      });
    },
    // 选择时间段
    choose(e, hotel) {
      if (e.currentTarget.dataset.choose == 'dis') {
        return;
      };
      if (e.currentTarget.dataset.choose == true && this.data.dataarr.length < 2) {
        wx.showToast({
          title: '不能选在同一天哦',
          icon:"none",
          mask: true
        });
        return;
      };
      let week = [];
      let index = e.currentTarget.dataset.index;
      var first = '',
        last = '';
      let check = [];
      let currentDayNum = new Date(this.data.nowYear, (this.data.nowMonth + 1), 0).getDate();
      if (this.data.nowYear < this.data.initYear) {
        this.init0()
        return;
      };
      if (this.data.nowYear == this.data.initYear && this.data.nowMonth < this.data.initMonth) {
        this.init0()
        return;
      };
      if (this.data.nowYear == this.data.initYear && this.data.nowMonth == this.data.initMonth && index < this.data.today) {
        this.init0()
        return;
      };
      if (this.data.change && this.data.dataarr.length == 1) {
        var date = {};
        let nowDate = '';
        let m = '';
        let num = 0;
        let _this = this;
        m = this.data.month;
        this.setData({
          lastNum: this.data.nowNum
        })

        function a() {
          let month = _this.data.month;
          let firstkey = _this.data.firstkey;
          let lastkey = _this.data.lastkey;
          lastkey[2] = index;
          for (let i = 0; i < _this.data.currentDayList.length; i++) {
            if (_this.data.currentDayList[i].choose != "dis") {
              num++;
              if (num == 1) {
                lastkey[0]  = i;
              };
              if (num == currentDayNum) {
                lastkey[1]  = i;
              }
            };
          }; 
          let dataarr = [];
          let week = [];
          if (_this.data.lastNum == _this.data.firstNum) {
            dataarr[0] = firstkey[2];
            dataarr[1] = lastkey[2];
            if (_this.data.firstkey[2] <= _this.data.lastkey[2]) {
              week[1] = _this.weekDay(new Date(_this.data.nowYear, _this.data.nowMonth, _this.data.currentDayList[_this.data.lastkey[2]].value).getDay());
              week[0] = _this.weekDay(new Date(_this.data.nowYear, _this.data.nowMonth, _this.data.currentDayList[_this.data.firstkey[2]].value).getDay());
            } else {
              week[1] = _this.weekDay(new Date(_this.data.nowYear, _this.data.nowMonth, _this.data.currentDayList[_this.data.firstkey[2]].value).getDay());
              week[0] = _this.weekDay(new Date(_this.data.nowYear, _this.data.nowMonth, _this.data.currentDayList[_this.data.lastkey[2]].value).getDay());
            };
          };
          if (_this.data.lastNum < _this.data.firstNum) {
            dataarr[0] = lastkey[2];
            dataarr[1] = lastkey[1];
            week[1] = _this.weekDay(new Date(_this.data.nowYear, _this.data.nowMonth, _this.data.currentDayList[_this.data.firstkey[2]].value).getDay());
            week[0] = _this.weekDay(new Date(_this.data.nowYear, _this.data.nowMonth, _this.data.currentDayList[index].value).getDay());
          };
          if (_this.data.lastNum > _this.data.firstNum) {
            dataarr[0] = lastkey[0];
            dataarr[1] = lastkey[2];
            week[0] = _this.weekDay(new Date(_this.data.nowYear, _this.data.nowMonth, _this.data.currentDayList[_this.data.firstkey[2]].value).getDay());
            week[1] = _this.weekDay(new Date(_this.data.nowYear, _this.data.nowMonth, _this.data.currentDayList[index].value).getDay());
          };
          _this.setData({
            lastkey: lastkey,
            dataarr: dataarr,
            week: week
          });
          return b(_this);
        };
        a();

        function b(_this) {
          let currentDayList = _this.data.currentDayList;
          if (_this.data.lastNum < _this.data.firstNum) {
            first = _this.data.dataarr[0];
            last = _this.data.dataarr[1];
            for (let i = 0; i < (last - first + 1); i++) {
              currentDayList[i + first].choose = true;
              currentDayList[first].tag = 'in';
            };
            date = {
              currentDate: _this.data.nowYear + '年' + (_this.data.nowMonth + 1) + '月',
              checkIn: _this.data.nowYear + '年' + (_this.data.nowMonth + 1) + '月' + _this.data.currentDayList[first].value + '日',
              checkOut: _this.data.year + '年' + (_this.data.month + 1) + '月' + _this.data.day + '日',
              checkIn1: (_this.data.nowMonth + 1) + '月' + _this.data.currentDayList[first].value + '日',
              checkOut1: (_this.data.month + 1) + '月' + _this.data.day + '日',
              checkIn2: _this.data.nowYear + '/' + (_this.data.nowMonth + 1) + '/' + _this.data.currentDayList[first].value,
              checkOut2: _this.data.year + '/' + (_this.data.month + 1) + '/' + _this.data.day,
              week: _this.data.week
            };
          } else if (_this.data.lastNum == _this.data.firstNum) {
            if (_this.data.dataarr[0] < _this.data.dataarr[1]) {
              first = _this.data.dataarr[0];
              last = _this.data.dataarr[1];
            } else {
              first = _this.data.dataarr[1];
              last = _this.data.dataarr[0];
            }
            for (let i = 0; i < (last - first + 1); i++) {
              currentDayList[i + first].choose = true;
              currentDayList[first].tag = 'in';
              currentDayList[last].tag = 'out';
            };
            date = {
              currentDate: _this.data.nowYear + '年' + (_this.data.nowMonth + 1) + '月',
              checkIn: _this.data.nowYear + '年' + (_this.data.nowMonth + 1) + '月' + _this.data.currentDayList[first].value + '日',
              checkOut: _this.data.year + '年' + (_this.data.month + 1) + '月' + _this.data.currentDayList[last].value + '日',
              checkIn1: (_this.data.nowMonth + 1) + '月' + _this.data.currentDayList[first].value + '日',
              checkOut1: (_this.data.month + 1) + '月' + _this.data.currentDayList[last].value + '日',
              checkIn2: (_this.data.nowYear + 1) + '/' + (_this.data.nowMonth + 1) + '/' + _this.data.currentDayList[first].value,
              checkOut2: _this.data.year + '/' + (_this.data.month + 1) + '/' + _this.data.currentDayList[last].value,
              week: _this.data.week
            };
          } else if (_this.data.lastNum > _this.data.firstNum) {
            let first = _this.data.dataarr[0];
            let last = _this.data.dataarr[1];
            for (let i = 0; i < (last - first + 1); i++) {
              currentDayList[i + first].choose = true;
              currentDayList[last].tag = 'out';
            };
            date = {
              currentDate: _this.data.nowYear + '年' + (_this.data.nowMonth + 1) + '月',
              checkIn: _this.data.year + '年' + (_this.data.month + 1) + '月' + _this.data.day + '日',
              checkOut: _this.data.nowYear + '年' + (_this.data.nowMonth + 1) + '月' + _this.data.currentDayList[last].value + '日',
              checkIn1: (_this.data.month + 1) + '月' + _this.data.day + '日',
              checkOut1: (_this.data.nowMonth + 1) + '月' + _this.data.currentDayList[last].value + '日',
              checkIn2: _this.data.year + '/' + (_this.data.month + 1) + '/' + _this.data.day,
              checkOut2: _this.data.nowYear + '/' + (_this.data.nowMonth + 1) + '/' + _this.data.currentDayList[last].value,
              week: _this.data.week
            };
          };
          _this.setData({
            checkIn: date.checkIn,
            checkOut: date.checkOut,
            checkDate: date,
            currentDate: date.currentDate,
            currentDayList: currentDayList,
          })
        };
      } else if (this.data.dataarr.length < 2) {
        let dataarr = this.data.dataarr;
        dataarr.push(index);
        if (dataarr.length <= 1) {
          first = this.data.dataarr[0];
          let num = 0;
          let currentDayList = this.data.currentDayList;
          currentDayList[first].choose = true;
          let first0 = 0;
          let first1 = 0;
          for (let i = 0; i < this.data.currentDayList.length; i++) {
            if (this.data.currentDayList[i].choose != "dis") {
              num++;
              if (num == 1) {
                first0 = i;
              };
              if (num == currentDayNum) {
                first1 = i;
              };
              currentDayList[index].tag = "in";
            };
          };
          let week = [];
          let indate = new Date(this.data.nowYear, this.data.nowMonth, this.data.currentDayList[index].value);
          let outdate = new Date(new Date(indate.getTime()+(60*60*24*1000)));
          week[0] = this.weekDay(indate.getDay());
          week[1] = week[0];
          date = {
            checkIn: this.data.nowYear + '年' + (this.data.nowMonth + 1) + '月' + this.data.currentDayList[first].value + '日',
            checkOut: outdate.getFullYear() + '年' + (outdate.getMonth() + 1) + '月' + outdate.getDate() + '日',
            checkIn1: (this.data.nowMonth + 1) + '月' + this.data.currentDayList[first].value + '日',
            checkOut1: (outdate.getMonth() + 1) + '月' + outdate.getDate() + '日',
            checkIn2: this.data.nowYear + '/' + (this.data.nowMonth + 1) + '/' + this.data.currentDayList[first].value,
            checkOut2: outdate.getFullYear() + '/' + (outdate.getMonth() + 1) + '/' + outdate.getDate(),
            week: this.data.week
          };
          this.setData({
            checkIn: date.checkIn,
            checkOut: date.checkOut,
            checkDate: date,
            dataarr: dataarr,
            year: this.data.nowYear,
            month: this.data.nowMonth,
            day: this.data.currentDayList[index].value,
            currentDayList: currentDayList,
            firstNum: this.data.nowNum,
            lastNum: this.data.nowNum,
            firstkey: [first0, first1, index],
            week: week
          })
        } else {
          let dataarr = this.data.dataarr;
          let currentDayList = this.data.currentDayList;
          if (dataarr[0] > dataarr[1]) {
            let mid = dataarr[0];
            dataarr[0] = dataarr[1];
            dataarr[1] = mid;
          };
          first = dataarr[0];
          last = dataarr[1];
          for (let i = 0; i < (last - first + 1); i++) {
            currentDayList[i + first].choose = true;
            currentDayList[first].tag = 'in';
            currentDayList[last].tag = 'out';
          };
          let week = [];
          week[0] = this.weekDay(new Date(this.data.nowYear, this.data.nowMonth, this.data.currentDayList[first].value).getDay());
          week[1] = this.weekDay(new Date(this.data.nowYear, this.data.nowMonth, this.data.currentDayList[last].value).getDay());
          date = {
            checkIn: this.data.nowYear + '年' + (this.data.nowMonth + 1) + '月' + this.data.currentDayList[first].value + '日',
            checkOut: this.data.nowYear + '年' + (this.data.nowMonth + 1) + '月' + this.data.currentDayList[last].value + '日',
            checkIn1: (this.data.nowMonth + 1) + '月' + this.data.currentDayList[first].value + '日',
            checkOut1: (this.data.nowMonth + 1) + '月' + this.data.currentDayList[last].value + '日',
            checkIn2: this.data.nowYear + '/' + (this.data.nowMonth + 1) + '/' + this.data.currentDayList[first].value,
            checkOut2: this.data.nowYear + '/' + (this.data.nowMonth + 1) + '/' + this.data.currentDayList[last].value,
            week: week
          };
          this.setData({
            dataarr: dataarr,
            currentDayList: currentDayList,
            lastNum: this.data.nowNum,
            week: week,
            checkIn: date.checkIn,
            checkOut: date.checkOut,
            checkDate: date,
            week: date.week
          });
        };
      } else {
        let currentDayList = this.data.currentDayList;
        let dataarr = this.data.dataarr;
        let firstkey = this.data.firstkey;
        let num = 0;
        for (let i = 0; i < currentDayList.length; i++) {
          if (currentDayList[i].choose != "dis") {
            num++;
            if (num == 1) {
              firstkey[0] = i;
            };
            if (num == currentDayNum) {
              firstkey[1] = i;
            }
          };
        };
        firstkey[2] = index;
        for (let i = 0; i < currentDayList.length; i++) {
          if (currentDayList[i].choose === true) {
            currentDayList[i].choose = false;
          }
          if (currentDayList[i].tag) {
            currentDayList[i].tag = null;
          }
        };
        first = dataarr[0];
        last = dataarr[1];
        dataarr = [];
        currentDayList[index].choose = true;
        currentDayList[index].tag = "in";
        dataarr.push(index);
        this.setData({
          dataarr: dataarr,
          change: null,
          day: currentDayList[index].value,
          firstkey: firstkey,
          year: this.data.nowYear,
          month: this.data.nowMonth,
          firstNum: this.data.nowNum,
          lastNum: '',
          lastMonth: '',
          lastYear: '',
          currentDayList: currentDayList
        });
        let indate = new Date(this.data.nowYear, this.data.nowMonth, this.data.currentDayList[first].value);
        let outdate = new Date(new Date(indate.getTime() + (60 * 60 * 24 * 1000)));
        date = {
          checkIn: this.data.nowYear + '年' + (this.data.nowMonth + 1) + '月' + this.data.currentDayList[first].value + '日',
          checkOut: outdate.getFullYear() + '年' + (outdate.getMonth() + 1) + '月' + outdate.getDate() + '日',
          checkIn1: (this.data.nowMonth + 1) + '月' + this.data.currentDayList[first].value + '日',
          checkOut1: (outdate.getMonth() + 1) + '月' + outdate.getDate() + '日',
          checkIn2: this.data.nowYear + '/' + (this.data.nowMonth + 1) + '/' + this.data.currentDayList[first].value,
          checkOut2: outdate.getFullYear() + '/' + (outdate.getMonth() + 1) + '/' + outdate.getDate(),
          week: this.data.week
        };
      };

      this.triggerEvent('getDate', date);
    },
    // 切换日历月份及对已选择的日期进行渲染
    doDay(e, hotel) {
      let _this = this;
      let Y = this.data.currentObj.getFullYear();
      let m = this.data.currentObj.getMonth();
      let d = this.data.currentObj.getDate();
      let direction = this.data.direction;
      let nowNum = this.data.nowNum;
      let initNum = this.data.initNum;
      let nowYear = this.data.nowYear;
      let nowMonth = this.data.nowMonth;
      let currentObj = this.data.currentObj;
      if (this.data.dataarr.length == 1) {
        this.setData({
          change: this.data.dataarr[0]
        })
      } else {
        this.setData({
          change: ''
        })
      };
      if (e.currentTarget.dataset.key && e.currentTarget.dataset.key == 'left') {
        direction = 'left'
      } else if (e.currentTarget.dataset.key && e.currentTarget.dataset.key == 'right') {
        direction = 'right'
      };
      this.setData({
        direction: direction,
      });
      if (direction == 'left') {
        if (m <= this.data.initMonth && Y <= this.data.initYear) {
          wx.showToast({
            title: '不能选择过去的时间！',
            icon: 'none',
            mask: true
          })
          return;
        };
        nowNum--;
        m--;
        if (m < 0) {
          Y--;
          m = 11;
        };
        nowYear = Y;
        nowMonth = m;
        direction = e.currentTarget.dataset.key;
      } else if (direction == 'right')  {
        if (nowNum - initNum >= 3){
          return;
        };
        nowNum++;
        m++;
        if (m > 11) {
          Y++;
          m = 0;
        };
        nowYear = Y;
        nowMonth = m;
        direction = e.currentTarget.dataset.key;
      };
      currentObj = new Date(Y, m, 1);
      this.setData({
        currentDate:Y+'年'+ (m+1)+'月',
        nowNum: nowNum,
        nowYear: nowYear,
        nowMonth: nowMonth,
        currentObj: currentObj,
      });
      this.setSchedule();

      // 选定后再次渲染日历
      if (this.data.change == '') {
        let currentDayList = this.data.currentDayList;
        let dataarr = this.data.dataarr;
        let firstkey = this.data.firstkey;
        let lastkey = this.data.lastkey;
        for (let i = 0; i < currentDayList.length; i++) {
          // 两次选择在同一个月
          if (this.data.firstNum === this.data.lastNum && this.data.nowNum === this.data.firstNum) {
            if (i >= this.data.dataarr[0] && i <= this.data.dataarr[1]) {
              currentDayList[i].choose = true;
              currentDayList[dataarr[0]].tag = 'in';
              currentDayList[dataarr[1]].tag = 'out';
            }
          };
          // 两次选择为连续的两个月且第二次选择比第一次选择月份大
          if (this.data.firstNum === this.data.lastNum - 1) {
            if (this.data.nowNum === this.data.firstNum) {
              if (i >= this.data.firstkey[2] && i <= this.data.firstkey[1]) {
                currentDayList[i].choose = true;
                currentDayList[firstkey[2]].tag = 'in';
              }
            };
            if (this.data.nowNum === this.data.lastNum) {
              if (i >= this.data.lastkey[0] && i <= this.data.lastkey[2]) {
                currentDayList[i].choose = true;
                currentDayList[lastkey[2]].tag = 'out';
              }
            }
          };
          // 两次选择为不连续的两个月且第二次选择比第一次选择月份大
          if (this.data.firstNum < (this.data.lastNum - 1)) {
            if (this.data.nowNum === this.data.firstNum) {
              if (i >= this.data.firstkey[2] && i <= this.data.firstkey[1]) {
                currentDayList[i].choose = true;
                currentDayList[firstkey[2]].tag = 'in';
              }
            };
            if (this.data.nowNum === this.data.lastNum) {
              if (i >= this.data.lastkey[0] && i <= this.data.lastkey[2]) {
                currentDayList[i].choose = true;
                currentDayList[lastkey[2]].tag = 'out';
              }
            };
            if (this.data.firstNum < this.data.nowNum && this.data.nowNum < this.data.lastNum) {
              if (currentDayList[i].choose != "dis") {
                currentDayList[i].choose = true;
              };
            }
          };
          // 两次选择为连续的两个月且第二次选择比第一次选择月份小
          if (this.data.firstNum === this.data.lastNum + 1) {
            if (this.data.nowNum === this.data.lastNum) {
              if (i >= this.data.lastkey[2] && i <= this.data.lastkey[1]) {
                currentDayList[i].choose = true;
                currentDayList[lastkey[2]].tag = 'in';
              }
            };
            if (this.data.nowNum === this.data.firstNum) {
              if (i >= this.data.firstkey[0] && i <= this.data.firstkey[2]) {
                currentDayList[i].choose = true;
                currentDayList[firstkey[2]].tag = 'out';
              }
            }
          };
          // 两次选择为不连续的两个月且第二次选择比第一次选择月份小
          if (this.data.firstNum > this.data.lastNum + 1) {
            if (this.data.nowNum === this.data.lastNum) {
              if (i >= this.data.lastkey[2] && i <= this.data.lastkey[1]) {
                currentDayList[i].choose = true;
                currentDayList[lastkey[2]].tag = 'in';
              }
            };
            if (this.data.nowNum === this.data.firstNum) {
              if (i >= this.data.firstkey[0] && i <= this.data.firstkey[2]) {
                currentDayList[i].choose = true;
                currentDayList[firstkey[2]].tag = 'out';
              }
            };
            if (this.data.nowNum < this.data.firstNum && this.data.nowNum > this.data.lastNum) {
              if (currentDayList[i].choose != "dis") {
                currentDayList[i].choose = true;
              };
            }
          };
        };
        this.setData({
          currentDayList: currentDayList
        })
      }
    },
    // 续房操作时设置默认离店时间
    defaultDay() {
      let currentDayNum = this.data.currentDayNum;
      let currentDayList = this.data.currentDayList; 
      let currentObj = this.data.currentObj;
      let today = -1;
      let num = 0;
      let firstkey = this.data.firstkey;
      let dataarr = this.data.dataarr;
      for (let i = 0; i < currentDayList.length; i++) {
        if (currentDayList[i].choose != "dis") {
          num++;
          if (num == 1) {
            firstkey[0] = i;
          };
          if (num == currentDayNum) {
            firstkey[1] = i;
          };
          if (num == currentObj.getDate()) {
            today = i;
            currentDayList[i].choose = true;
            currentDayList[i].tag = 'in';
          };
        };
      };
      this.firstNum = this.nowNum;
      firstkey[2] = this.data.outInd;
      dataarr.push(this.data.outInd);
      let week = [];
      week[0] = this.weekDay(new Date(this.data.nowYear, this.data.nowMonth, this.data.nowDate).getDay());
      let next = new Date(new Date(this.data.nowYear, this.data.nowMonth, currentObj.getDate()).getTime() + (60 * 60 * 24 * 1000));
      week[1] = this.weekDay(new Date(next.getFullYear(), next.getMonth(), next.getDate()).getDay());
      this.setData({
        currentDayList: currentDayList,
        firstkey: firstkey,
        firstNum: this.data.nowNum,
        dataarr: dataarr,
        week:week,
      });
      this.triggerEvent('getnextDate', this.data.checkOutDate);
    },
    init() {
      let currentDayList = this.data.currentDayList;
      for (let i = 0; i < currentDayList.length; i++) {
        if (currentDayList[i].choose != "dis") {
          currentDayList[i].choose = false;
          currentDayList[i].tag = null;
        };
      };
      this.setData({
        currentDayList: currentDayList,
        lastkey: [],
      });
      wx.showModal({
        title: '温馨提示',
        content: '请选择正确的日期！',
        showCancel: false
      });
    },
    //续费 选择时间
    chooseOne(e) {
      if (e.currentTarget.dataset.choose == 'dis') {
        return;
      };
      var week = [];
      var index = e.currentTarget.dataset.index;
      var first = '';
      var last = '';
      var check = [];
      var date = {};
      if (this.data.nowNum == this.data.initNum && index == this.data.outInd) {
        wx.showToast({
          title: '不能选择当前离店日期哦',
          icon: "none",
          mask: true
        });
        return;
      };
      let currentDayList = this.data.currentDayList;
      // for (let i = 0; i < currentDayList.length; i++) {
      //   if (currentDayList[i].choose != 'dis') {
      //     currentDayList[i].choose = false;
      //     currentDayList[i].tag = null;
      //   };
      // };
      this.setData({
        currentDayList: currentDayList,
      });
      if (this.data.nowYear < this.data.initYear) {
        this.init()
        return;
      };
      if (this.data.nowYear == this.data.initYear && this.data.nowMonth < this.data.initMonth) {
        this.init()
        return;
      };
      if (this.data.nowYear == this.data.initYear && this.data.nowMonth == this.data.initMonth && index < this.data.outInd) {
        this.init()
        return;
      };
      if (this.data.change) {
        let m = '';
        let num = 0;
        let _this = this;
        m = this.data.month;
        this.setData({
          lastNum: this.data.nowNum
        });
        function a() {
          let month = _this.data.month;
          let currentDayList = _this.data.currentDayList;
          let lastkey = _this.data.lastkey;
          let firstkey = _this.data.firstkey;
          let dataarr = _this.data.dataarr;
          let week = _this.data.week;
          let currentDayNum = _this.data.currentDayNum;
          let num = 0;
          for (let i = 0; i < currentDayList.length; i++) {
            if (currentDayList[i].choose != "dis") {
              num++;
              if (num == 1) {
                lastkey[0] = i;
              };
              if (num == currentDayNum) {
                lastkey[1] = i;
              }
            };
          };
          lastkey[2] = index;
          if (_this.data.lastNum == _this.data.firstNum) {
            dataarr[1] = index;
            if (firstkey[2] <= lastkey[2]) {
              week[1] = _this.weekDay(new Date(_this.data.nowYear, _this.data.nowMonth, currentDayList[lastkey[2]].value).getDay());
            } else {
              week[1] = _this.weekDay(new Date(_this.data.nowYear, _this.data.nowMonth, currentDayList[lastkey[2]].value).getDay());
            }
          };
          if (_this.data.lastNum != _this.data.firstNum) {
            dataarr[1] = index;
            week[1] = _this.weekDay(new Date(_this.data.nowYear, _this.data.nowMonth, currentDayList[lastkey[2]].value).getDay());
          };
          _this.setData({
            lastkey: lastkey,
            dataarr: dataarr,
            week: week
          });
          return b(_this);
        };
        a();

        function b(_this) {
          let lastkey = _this.data.lastkey;
          let firstkey = _this.data.firstkey;
          let currentDayList = _this.data.currentDayList;
          for (let i = 0; i < currentDayList.length; i++) {
            if (currentDayList[i].choose != 'dis') {
              currentDayList[i].choose = false;
              currentDayList[i].tag = null;
            }
          };
          if (_this.data.lastNum < _this.data.firstNum) {
            let last = _this.data.dataarr[1];
            check = _this.data.dataarr;
            for (let i = 0; i < (last - first + 1); i++) {
              currentDayList[i + first].choose = true;
              currentDayList[lastkey[2]].tag = 'in';
            };
            date = {
              currentDate: _this.data.nowYear + '年' + (_this.data.nowMonth + 1) + '月',
              checkIn: _this.data.check.checkIn,
              checkIn1: _this.data.check.checkIn1,
              checkIn2: _this.data.check.checkIn2,
              checkOut: _this.data.year + '年' + (_this.data.month + 1) + '月' + _this.data.day + '日',
              checkOut1: (_this.data.month + 1) + '月' + _this.data.day + '日',
              checkOut2: _this.data.year + '/' + (_this.data.month + 1) + '/' + _this.data.day,
              week: _this.data.week
            };
          } else if (_this.data.lastNum == _this.data.firstNum) {
            let first = _this.data.dataarr[0];
            let last = _this.data.dataarr[1];
            for (let i = 0; i < (last - first + 1); i++) {
              currentDayList[i + first].choose = true;
              currentDayList[firstkey[2]].tag = 'in';
              currentDayList[lastkey[2]].tag = 'out';
            };
            date = {
              currentDate: _this.data.year + '年' + (_this.data.month + 1) + '月',
              checkIn: _this.data.check.checkIn,
              checkIn1: _this.data.check.checkIn1,
              checkIn2: _this.data.check.checkIn2,
              checkOut: _this.data.year + '年' + (_this.data.month + 1) + '月' + currentDayList[last].value + '日',
              checkOut1: (_this.data.month + 1) + '月' + currentDayList[last].value + '日',
              checkOut2: _this.data.year + '/' + (_this.data.month + 1) + '/' + currentDayList[last].value,
              week: _this.data.week
            };
          } else if (_this.data.lastNum > _this.data.firstNum) {
            let last = _this.data.dataarr[1];
            for (let i = 0; i < (last + 1); i++) {
              if (currentDayList[i].choose != 'dis') {
                currentDayList[i].choose = true;
                currentDayList[lastkey[2]].tag = 'out';
              }
            };
            date = {
              currentDate: _this.data.nowYear + '年' + (_this.data.nowMonth + 1) + '月',
              checkIn: _this.data.check.checkIn,
              checkIn1: _this.data.check.checkIn1,
              checkIn2: _this.data.check.checkIn2,
              checkOut: _this.data.nowYear + '年' + (_this.data.nowMonth + 1) + '月' + currentDayList[last].value + '日',
              checkOut1: (_this.data.nowMonth + 1) + '月' + currentDayList[last].value + '日',
              checkOut2: _this.data.nowYear + '/' + (_this.data.nowMonth + 1) + '/' + currentDayList[last].value,
              week: _this.data.week
            };
          };
          _this.setData({
            currentDayList: currentDayList,
            checkOut: date.checkOut,
            checkOut1: date.checkOut1,
            checkOut2: date.checkOut2,
            checkDate: date,
            week: date.week
          });
        };
      } else {
        let dataarr = this.data.dataarr;
        let currentDayList = this.data.currentDayList;
        let week = this.data.week;
        dataarr[1] = index;
        first = dataarr[0];
        last = dataarr[1];
        for (let i = 0; i < currentDayList.length; i++) {
          if (currentDayList[i].choose != 'dis') {
            currentDayList[i].choose = false;
            currentDayList[i].tag = null;
          }
        };
        for (let i = 0; i < (last - first + 1); i++) {
          currentDayList[i + first].choose = true;
          currentDayList[first].tag = 'in';
          currentDayList[last].tag = 'out';
        };
        week[1] = this.weekDay(new Date(this.data.nowYear, this.data.nowMonth, currentDayList[last].value).getDay());
        date = {
          currentDate: this.data.nowYear + '年' + (this.data.nowMonth + 1) + '月',
          checkIn: this.data.check.checkIn,
          checkIn1: this.data.check.checkIn1,
          checkIn2: this.data.check.checkIn2,
          checkOut: this.data.nowYear + '年' + (this.data.nowMonth + 1) + '月' + currentDayList[last].value + '日',
          checkOut1: (this.data.nowMonth + 1) + '月' + currentDayList[last].value + '日',
          checkOut2: this.data.nowYear + '/' + (this.data.nowMonth + 1) + '/' + currentDayList[last].value,
          week: week
        };
        this.setData({
          checkOut: this.data.nowYear + '年' + (this.data.nowMonth + 1) + '月' + currentDayList[last].value + '日',
          checkOut1: (this.data.nowMonth + 1) + '月' + currentDayList[last].value + '日',
          checkOut2: this.data.nowYear + '/' + (this.data.nowMonth + 1) + '/' + currentDayList[last].value,
          checkDate: date,
          currentDayList: currentDayList,
          week:week,
          year: this.data.nowYear,
          month: this.data.nowMonth,
          lastNum: this.data.nowNum,
          dataarr: dataarr
        })
      };
      this.triggerEvent('getDate', date);
    },
    //续费 切换日历月份及对已选择的日期进行渲染
    doOneDay(e, hotel) {
      let _this = this;
      let Y = this.data.currentObj.getFullYear();
      let m = this.data.currentObj.getMonth();
      let d = this.data.currentObj.getDate();
      let dataarr = this.data.dataarr;
      let direction = this.data.direction;
      let nowNum = this.data.nowNum;
      let initNum = this.data.initNum;
      let nowYear = this.data.nowYear;
      let nowMonth = this.data.nowMonth;
      let currentObj = this.data.currentObj;
      if (e.currentTarget.dataset.key && e.currentTarget.dataset.key == 'left') {
        direction = 'left'
      } else if(e.currentTarget.dataset.key && e.currentTarget.dataset.key == 'right'){
        direction = 'right'
      };
      if (direction == 'left') {
        if (m <= this.data.initMonth && Y <= this.data.initYear) {
          return;
        };
        nowNum--;
        m--;
        if (m < 0) {
          Y--;
          m = 11;
        };
        nowYear = Y;
        nowMonth = m;
      } else if (direction == 'right') {
        if (nowNum - initNum >= 3) {
          return;
        };
        nowNum++;
        m++;
        if (m > 11) {
          Y++;
          m = 0;
        };
        nowYear = Y;
        nowMonth = m;
      };
      currentObj = new Date(Y, m, 1);
      this.setData({
        currentDate: Y + '年' + (m + 1) + '月',
        direction: direction,
        nowNum: nowNum,
        nowYear: nowYear,
        nowMonth: nowMonth,
        currentObj: currentObj,
        change: dataarr[0]
      });
      this.setSchedule(hotel);

      // 选定后再次渲染日历
      if (this.data.dataarr.length == 2) {
        let lastkey = _this.data.lastkey;
        let firstkey = _this.data.firstkey;
        let currentDayList = this.data.currentDayList;
        for (let i = 0; i < currentDayList.length; i++) {
          // 两次选择在同一个月
          if (this.data.firstNum === this.data.lastNum && this.data.nowNum === this.data.firstNum) {
            if (i >= this.data.dataarr[0] && i <= this.data.dataarr[1]) {
              currentDayList[i].choose = true;
              currentDayList[dataarr[0]].tag = 'in';
              currentDayList[dataarr[1]].tag = 'out';
            }
          };
          // 两次选择为连续的两个月且第二次选择比第一次选择月份大
          if (this.data.firstNum === this.data.lastNum - 1) {
            if (this.data.nowNum === this.data.firstNum) {
              if (i >= this.data.firstkey[2] && i <= this.data.firstkey[1]) {
                currentDayList[i].choose = true;
                currentDayList[firstkey[2]].tag = 'in';
              }
            };
            if (this.data.nowNum === this.data.lastNum) {
              if (i >= this.data.lastkey[0] && i <= this.data.lastkey[2]) {
                currentDayList[i].choose = true;
                currentDayList[lastkey[2]].tag = 'out';
              }
            }
          };
          // 两次选择为不连续的两个月且第二次选择比第一次选择月份大
          if (this.data.firstNum < (this.data.lastNum - 1)) {
            if (this.data.nowNum === this.data.firstNum) {
              if (i >= this.data.firstkey[2] && i <= this.data.firstkey[1]) {
                currentDayList[i].choose = true;
                currentDayList[firstkey[2]].tag = 'in';
              }
            };
            if (this.data.nowNum === this.data.lastNum) {
              if (i >= this.data.lastkey[0] && i <= this.data.lastkey[2]) {
                currentDayList[i].choose = true;
                currentDayList[lastkey[2]].tag = 'out';
              }
            };
            if (this.data.firstNum < this.data.nowNum && this.data.nowNum < this.data.lastNum) {
              if (currentDayList[i].choose != "dis") {
                currentDayList[i].choose = true;
              };
            }
          };
          // 两次选择为连续的两个月且第二次选择比第一次选择月份小
          if (this.data.firstNum === this.data.lastNum + 1) {
            if (this.data.nowNum === this.data.lastNum) {
              if (i >= this.data.lastkey[2] && i <= this.data.lastkey[1]) {
                currentDayList[i].choose = true;
                currentDayList[lastkey[2]].tag = 'in';
              }
            };
            if (this.data.nowNum === this.data.firstNum) {
              if (i >= this.data.firstkey[0] && i <= this.data.firstkey[2]) {
                currentDayList[i].choose = true;
                currentDayList[firstkey[2]].tag = 'out';
              }
            }
          };
          // 两次选择为不连续的两个月且第二次选择比第一次选择月份小
          if (this.data.firstNum > this.data.lastNum + 1) {
            if (this.data.nowNum === this.data.lastNum) {
              if (i >= this.data.lastkey[2] && i <= this.data.lastkey[1]) {
                currentDayList[i].choose = true;
                currentDayList[lastkey[2]].tag = 'in';
              }
            };
            if (this.data.nowNum === this.data.firstNum) {
              if (i >= this.data.firstkey[0] && i <= this.data.firstkey[2]) {
                currentDayList[i].choose = true;
                currentDayList[firstkey[2]].tag = 'out';
              }
            };
            if (this.data.nowNum < this.data.firstNum && this.data.nowNum > this.data.lastNum) {
              if (currentDayList[i].choose != "dis") {
                currentDayList[i].choose = true;
              };
            }
          };
        };
        this.setData({
          currentDayList: currentDayList
        })
      }
    },
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
    },
    // 左右滑动切换月份
    slideStart(e) {
      this.setData({
        startX: e.changedTouches[0].pageX,
      })
    },
    slideEnd(e) {
      var direction = this.data.direction;
      this.setData({
        endX: e.changedTouches[0].pageX,
      });
      if (Math.abs(this.data.startX - this.data.endX) < 60) {
        return;
      } else {
        if (this.data.startX - this.data.endX > 0) {
          direction = 'right';
        };
        if (this.data.startX - this.data.endX < 0) {
          direction = 'left';
        };
        this.setData({
          direction: direction
        })
        if (!this.properties.continue){
          this.doDay(e);
        }else{
          this.doOneDay(e);
        }
      }
    },
    // 匹配汉字
    regZh(account) {
      let arr = account.replace(/[\u4e00-\u9fa5]/g,'/');
      arr = arr.replace(/(\/)$/, '');
      return arr;
    },
    // 点击完成按钮
    closeCalendar() {
      let date = {};
      let dataarr = this.data.dataarr;
      if (dataarr.length < 2){
        wx.showToast({
          title: '请选择离店日期',
          icon:'none',
          mask: true
        });
        return;
      };
      let checkIn = this.data.checkIn;
      let arr1 = new Date(this.regZh(checkIn));
      let Y = arr1.getFullYear();
      let M = arr1.getMonth()+1;
      let D = arr1.getDate();
      let checkOut = this.data.checkOut;
      let arr2 = new Date(this.regZh(checkOut));
      let y = arr2.getFullYear();
      let m = arr2.getMonth()+1;
      let d = arr2.getDate();
      let week = this.data.week;
      let currentDate = this.data.currentDate;
      if (!this.properties.continue) {
        date = {
          checkIn: checkIn,
          checkIn1: M + '月' + D + '日',
          checkIn2: this.regZh(checkIn),
          checkOut: checkOut,
          checkOut1: m + '月' + d + '日',
          checkOut2: this.regZh(checkOut),
          week: week
        };
      } else {
        date = {
          currentDate: currentDate, 
          checkIn: this.data.check.checkIn,
          checkIn1: this.data.check.checkIn1,
          checkIn2: this.data.check.checkIn2,
          checkOut: checkOut,
          checkOut1: m + '月' + d + '日',
          checkOut2: this.regZh(checkOut),
          week: week
        };
      }
      this.triggerEvent('chooseEnd', date);
    }
  }
})