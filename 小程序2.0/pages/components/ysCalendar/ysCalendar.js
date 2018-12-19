// pages/components/ysCalendar/ysCalendar.js
let oneDay = 3600 * 24 * 1000;
let festival = [{
    month: 1,
    day: 1,
    name: "元旦"
  },{
    month: 2,
    day: 14,
    name: "情人节"
  },{
    month: 3,
    day: 8,
    name: "妇女节"
  },{
    month: 3,
    day: 12,
    name: "植树节"
  },{
    month: 3,
    day: 15,
    name: "消费者权益日"
  },{
    month: 4,
    day: 1,
    name: "愚人节"
  },{
    month: 5,
    day: 1,
    name: "劳动节"
  },{
    month: 5,
    day: 4,
    name: "青年节"
  },{
    month: 5,
    day: 12,
    name: "护士节"
  },{
    month: 6,
    day: 1,
    name: "儿童节"
  },{
    month: 7,
    day: 1,
    name: "建党节"
  },{
    month: 8,
    day: 1,
    name: "建军节"
  },{
    month: 9,
    day: 10,
    name: "教师节"
  },{
    month: 9,
    day: 28,
    name: "孔子诞辰"
  },{
    month: 10,
    day: 1,
    name: "国庆节"
  },{
    month: 10,
    day: 6,
    name: "老人节"
  },{
    month: 10,
    day: 24,
    name: "联合国日"
  },{
    month: 12,
    day: 24,
    name: "平安夜"
  },{
    month: 12,
    day: 25,
    name: "圣诞节"
  }
]
Component({
  /* 组件的属性列表 */
  properties: {
    continueMode: {
      type: Boolean,
      value: false
    },
    arrive: {
      type: String,
      // value: new Date()
      value:''
    },
    leave:{
      type: String,
      // value: new Date(new Date().getTime() + oneDay)
      value: ''
    }
  },
  /* 组件的初始数据 */
  data: {
    week: ["日", "一", "二", "三", "四", "五", "六"],
    currentDate: '', 
    currentYear: '',
    currentMonth: '',
    currentDay: '',
    date: [],
    inInd: null,
    outInd: null,
    arriveTime: null,
    leaveTime:null,
  },
  ready: function() {
    this.getDate();
    this.getCheckDay();
  },
  /* 组件的方法列表 */
  methods: {
    init() {
      let date = this.data.date;
      date.forEach((e, i) => {
        e.dateArr.forEach((ce, j) => {
          ce.active = false;
          ce.tag = '';
        });
      });
      this.setData({
        date: date
      })
    },
    getDate() {
      let continueMode = this.properties.continueMode;
      let arrive = this.properties.arrive;
      let leave = this.properties.leave;
      let currentDate = '';
      let year = '',
        month = '',
        day = '';
      if (continueMode) {
        currentDate = new Date(arrive);
        year = currentDate.getFullYear();
        month = currentDate.getMonth();
        day = currentDate.getDate();
      } else {
        currentDate = new Date();
        year = currentDate.getFullYear();
        month = currentDate.getMonth();
        day = currentDate.getDate();
        // console.log(year, month, day);
      };
      let arriveTimeYear = new Date(arrive).getFullYear();
      let arriveTimeMonth = new Date(arrive).getMonth();
      let arriveTimeDay = new Date(arrive).getDate();
      let leaveTimeDay = new Date(leave).getDate();
      let leaveTimeYear = new Date(leave).getFullYear();
      let leaveTimeMonth = new Date(leave).getMonth();
      let daySec = new Date(leave).getTime() - new Date(arrive).getTime();
      let days = daySec / oneDay;
      let arriveTimeWeek = this.getWeek(new Date(arrive).getDay());
      let leaveTimeWeek = this.getWeek(new Date(leave).getDay());
      let date = this.data.date;
      let inInd = this.data.inInd;
      let outInd = this.data.outInd;
      let data = {
        arriveTime: [arriveTimeYear, arriveTimeMonth + 1, arriveTimeDay],
        leaveTime: [leaveTimeYear, leaveTimeMonth + 1, leaveTimeDay],
        days: days,
        week: [arriveTimeWeek, leaveTimeWeek]
      };
      // console.log(data)
      this.setData({
        currrentDate: currentDate,
        currentYear: new Date(currentDate).getFullYear(),
        currentMonth: new Date(currentDate).getMonth(),
        currentDay: new Date(currentDate).getDate(),
        arriveTime: [year, month + 1, day],
        leaveTime: [leaveTimeYear, leaveTimeMonth + 1, leaveTimeDay],
      });
      // console.log(todayIndex);
      // return;
      for (let i = 0; i < 6; i++) {
        let dateArr = [];
        if (month > 11) {
          year++;
          month = 0;
          dateArr = this.creatMonth(year, month);
        } else {
          dateArr = this.creatMonth(year, month);
        };
        date.push({
          year: year,
          month: month + 1,
          dateArr: dateArr
        });
        month++;
      };
      // console.log(date);
      this.setData({
        date: date,
        inInd: this.getClickDate(date, data.arriveTime),
        outInd: this.getClickDate(date, data.leaveTime)
      });
      // this.triggerEvent('getDate', data);
    },
    getFestival(month,dateArr){
      festival.forEach((a,j)=>{
        if ((month+1) == a.month) {
          let arr = a;
          dateArr.forEach((e, i) => {
            if (arr.day == e.day){
              e.fiesta = arr.name;
            }
          });
        }
      });
      return dateArr;
    },
    creatMonth(year, month) {
      let currentYear = this.data.currentYear;
      let currentMonth = this.data.currentMonth;
      let currentDay = this.data.currentDay;
      let dayNum = new Date(year, month + 1, 0).getDate();
      let todayIndex = new Date(year, month, 1).getDay();
      let currentDayIndex = new Date(year, month, currentDay).getDay();
      let days = 0;
      let dateArr = [];
      let maxLength = 0;
      if (currentMonth == month){
        maxLength = (currentDayIndex + dayNum - currentDay + 1) % 7 > 0 ? Math.ceil((currentDayIndex + dayNum - currentDay + 1) / 7) * 7 : currentDayIndex + dayNum - currentDay + 1; 
        for (let i = 0; i < maxLength; i++) {
          if (i < currentDayIndex) {
            dateArr.push({
              dis: true,
              day: '',
              active: false,
              tag: '',
              // fiesta:'',
            });
          };
          if (currentDayIndex <= i) {
            if (currentDay > dayNum) {
              dateArr.push({
                dis: true,
                day: '',
                active: false,
                tag: '',
                // fiesta: '',
              });
            } else {
              dateArr.push({
                dis: false,
                day: currentDay,
                active: false,
                tag: '',
                // fiesta: '',
              });
              currentDay++;
            }
          }
        };
      } else {
        if (currentMonth != month && todayIndex + dayNum < 36) {
          maxLength = 35;
        } else if (currentMonth != month && todayIndex + dayNum >= 36) {
          maxLength = 42;
        };
        for (let i = 0; i < maxLength; i++) {
          if (i < todayIndex) {
            dateArr.push({
              dis: true,
              day: '',
              active: false,
              tag: '',
              // fiesta: '',
            });
          };
          if (todayIndex <= i) {
            days++
            if (days > dayNum) {
              dateArr.push({
                dis: true,
                day: '',
                active: false,
                tag: '',
                // fiesta: '',
              });
            } else {
              dateArr.push({
                dis: false,
                day: days,
                active: false,
                tag: '',
                // fiesta: '',
              });
            }
          }
        };
      }
      dateArr = this.getFestival(month,dateArr);
      return dateArr;
    },
    getClickDate(date, time) {
      let obj = {};
      date.forEach((e, i) => {
        if (e.year == time[0] && e.month == time[1]) {
          obj.parent = i;
          e.dateArr.forEach((ce, j) => {
            if (ce.day == time[2]) {
              obj.child = j;
            }
          });
        };
      });
      return obj;
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
    getOneCheckDay() {
      let date = this.data.date;
      let inInd = this.data.inInd;
      date.forEach((e, i) => {
        if (i == inInd.parent) {
          e.dateArr.forEach((ce, j) => {
            if (j == inInd.child) {
              ce.active = true;
              ce.tag = "in";
            }
          });
        };
      });
      this.setData({
        date: date
      });
    },
    getCheckDay(){
      let inInd = this.data.inInd;
      let outInd = this.data.outInd;
      // console.log(inInd, outInd)
      let date = this.data.date;
      date.forEach((e, i) => {
        if (inInd.parent == outInd.parent && inInd.parent == i) {
          e.dateArr.forEach((ce, j) => {
            if (inInd.child <= j && j <= outInd.child) {
              ce.active = true;
              if (inInd.child == j) ce.tag = "in";
              if (outInd.child == j) ce.tag = "out";
            };
          });
        };
        if (inInd.parent != outInd.parent){
          if (inInd.parent == i){
            e.dateArr.forEach((ce, j) => {
              if (inInd.child <= j && !ce.dis) {
                ce.active = true;
              };
              if (inInd.child == j) ce.tag = "in";
            });
          };
          if ( i == outInd.parent) {
            e.dateArr.forEach((ce, j) => {
              if (j <= outInd.child && !ce.dis) {
                ce.active = true;
              };
              if (outInd.child == j) ce.tag = "out";
            });
          };
          if (inInd.parent < i && i < outInd.parent){
            e.dateArr.forEach((ce, j) => {
              if (!ce.dis) {
                ce.active = true;
              };
            });
          };
        }
      });
      this.setData({
        date: date
      });
      // console.log(this.data.date);
    },
    chooseDate(e) {
      let date = this.data.date;
      let inInd = this.data.inInd;
      let outInd = this.data.outInd;
      let arriveTime = this.data.arriveTime;
      let leaveTime = this.data.leaveTime;
      let parent = e.currentTarget.dataset.parent;
      let child = e.currentTarget.dataset.child;
      let year = date[parent].year;
      let month = date[parent].month;
      let day = date[parent].dateArr[child].day;
      if (date[parent].dateArr[child].dis){
        return;
      };
      let time = [year, month, day];
      let out = this.getClickDate(date, time);
      let nowDate = new Date(year, month - 1, day);
      if (inInd && !outInd) {
        if (out.parent == inInd.parent && out.child == inInd.child) {
          wx.showToast({
            title: '入住、离店不能在同一天',
            icon: 'none',
            mask: true
          });
          return;
        };
        let newInInd = [];
        let newOutInd = [];
        let daySec = nowDate.getTime() - new Date(arriveTime[0], arriveTime[1]-1, arriveTime[2]).getTime();
        let days = Math.abs(daySec / oneDay);
        let arriveTimeWeek = this.getWeek(new Date(arriveTime[0], arriveTime[1]-1, arriveTime[2]).getDay());
        let leaveTimeWeek = this.getWeek(new Date(year, month-1, day).getDay());
        let data = {};
        if (out.parent == inInd.parent && out.child > inInd.child){
          data = {
            arriveTime: arriveTime,
            leaveTime: [year, month, day],
            days: days,
            week: [arriveTimeWeek, leaveTimeWeek]
          };
          newInInd = inInd;
          newOutInd = out;
        }; 
        if (out.parent == inInd.parent && out.child < inInd.child) {
          data = {
            arriveTime: [year, month, day],
            leaveTime: arriveTime,
            days: days,
            week: [leaveTimeWeek, arriveTimeWeek]
          };
          newInInd = out;
          newOutInd =  inInd;
        };
        if (out.parent > inInd.parent) {
          data = {
            arriveTime: arriveTime,
            leaveTime: [year, month, day],
            days: days,
            week: [arriveTimeWeek, leaveTimeWeek]
          };
          newInInd = inInd;
          newOutInd = out;
        }; 
        if (out.parent < inInd.parent) {
          data = {
            arriveTime: [year, month, day],
            leaveTime: arriveTime,
            days: days,
            week: [leaveTimeWeek, arriveTimeWeek]
          };
          newInInd = out;
          newOutInd = inInd;
        };
        this.setData({
          inInd: newInInd,
          outInd: newOutInd
        });
        this.getCheckDay();
        this.triggerEvent('getDate', data);
      };
      if (inInd && outInd){
        this.init();
        this.setData({
          inInd: null,
          outInd: null
        });
        let arriveTime = [year, month, day];
        this.setData({
          inInd: this.getClickDate(date, arriveTime),
          arriveTime: arriveTime
        });
        this.getOneCheckDay();
      };
      if (!inInd && !outInd) {
        let arriveTime = [year, month, day];
        this.setData({
          inInd: this.getClickDate(date, arriveTime),
          arriveTime: arriveTime
        });
        this.getOneCheckDay();
      }
    },
    chooseContinueDate(e) {
      let date = this.data.date;
      let inInd = this.data.inInd;
      let outInd = this.data.outInd;
      let arriveTime = this.data.arriveTime;
      let leaveTime = this.data.leaveTime;
      let parent = e.currentTarget.dataset.parent;
      let child = e.currentTarget.dataset.child;
      let year = date[parent].year;
      let month = date[parent].month;
      let day = date[parent].dateArr[child].day;
      if (date[parent].dateArr[child].dis) {
        return;
      };
      let time = [year, month, day];
      let out = this.getClickDate(date, time);
      if (out.parent == inInd.parent && out.child == inInd.child) {
        wx.showToast({
          title: '入住、离店不能在同一天',
          icon: 'none',
          mask: true
        });
        return;
      };
      this.init();
      let nowDate = new Date(year, month - 1, day);
      let newInInd = [];
      let newOutInd = [];
      let daySec = nowDate.getTime() - new Date(arriveTime[0], arriveTime[1] - 1, arriveTime[2]).getTime();
      let days = Math.abs(daySec / oneDay);
      let arriveTimeWeek = this.getWeek(new Date(arriveTime[0], arriveTime[1] - 1, arriveTime[2]).getDay());
      let leaveTimeWeek = this.getWeek(new Date(year, month - 1, day).getDay());
      let data = {};
      if (out.parent == inInd.parent && out.child > inInd.child) {
        data = {
          arriveTime: arriveTime,
          leaveTime: [year, month, day],
          days: days,
          week: [arriveTimeWeek, leaveTimeWeek]
        };
        newInInd = inInd;
        newOutInd = out;
      };
      if (out.parent == inInd.parent && out.child < inInd.child) {
        data = {
          arriveTime: [year, month, day],
          leaveTime: arriveTime,
          days: days,
          week: [leaveTimeWeek, arriveTimeWeek]
        };
        newInInd = out;
        newOutInd = inInd;
      };
      if (out.parent > inInd.parent) {
        data = {
          arriveTime: arriveTime,
          leaveTime: [year, month, day],
          days: days,
          week: [arriveTimeWeek, leaveTimeWeek]
        };
        newInInd = inInd;
        newOutInd = out;
      };
      if (out.parent < inInd.parent) {
        data = {
          arriveTime: [year, month, day],
          leaveTime: arriveTime,
          days: days,
          week: [leaveTimeWeek, arriveTimeWeek]
        };
        newInInd = out;
        newOutInd = inInd;
      };
      this.setData({
        inInd: newInInd,
        outInd: newOutInd
      });
      this.getCheckDay();
      this.triggerEvent('getDate', data);
    },
  }
})