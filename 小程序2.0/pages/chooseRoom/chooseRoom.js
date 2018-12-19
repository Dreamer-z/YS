// pages/index/page/chooseRoom/chooseRoom.js
import newRes from "../../utils/api.js";
Page({
  /* 页面的初始数据 */
  data: {
    rooms: '',
    come_time: '',
    leave_time: '',
    tabs: [],
    choose: [],
    popup: false,
    floors: [],
    floorIndex: 0,
    room: [],
    roomIndex: null,
    max: 0,
  },
  /* 生命周期函数--监听页面加载 */
  onLoad: function(options) {
    let rooms = JSON.parse(options.room);
    let come_time = options.come_time.split(" ")[0];
    let leave_time = options.leave_time.split(" ")[0];
    let hotel_id = options.hotel_id;
    let preorder_id = options.preorder_id;
    this.setData({
      rooms: rooms,
      come_time: come_time,
      leave_time: leave_time,
      hotel_id: hotel_id,
      preorder_id: preorder_id,
      room_type_name: options.room_type_name
    })
    this.tabsAndFloor(rooms[0].room_type_id, come_time, leave_time);
  },
  // 获取标签和楼层信息
  tabsAndFloor(roomTypeId, comeTime, leaveTime) {
    let _this = this;
    let choose = this.data.choose;
    newRes.getFloorAndTabs({
      roomTypeId: roomTypeId,
      comeTime: comeTime,
      leaveTime: leaveTime,
    }).then((res) => {
      let floors = res.data.floors;
      let tabs = res.data.tags;
      for (let i = 0; i < tabs.length; i++) {
        tabs[i].choose = false;
      };
      _this.setData({
        floors: floors,
        tabs: tabs,
      });
      _this.getRooms(floors[0].floorId, choose)
    }).catch((err) => {
      wx.showToast({
        title: '出了点问题，请稍后再试！',
        icon: 'none',
        mask: true
      })
      console.log(err)
    })
  },
  // 刷新
  refresh(){
    let roomTypeId = this.data.rooms[0].room_type_id;
    let come_time = this.data.come_time;
    let leave_time = this.data.leave_time;
    this.setData({
      roomIndex: null,
      floorIndex: 0,
    })
    this.tabsAndFloor(roomTypeId, come_time, leave_time);
  },
  // 根据标签及楼层获取房间列表
  getRooms(floorId) {
    let _this = this;
    let rooms = this.data.rooms;
    let come_time = this.data.come_time;
    let leave_time = this.data.leave_time;
    let choose = this.data.choose;
    this.clear();
    newRes.getRooms({
      roomTypeId: rooms[0].room_type_id,
      comeTime: come_time,
      leaveTime: leave_time,
      floorId: floorId,
      tagIds: choose
    }).then((res) => {
      let room = res.data;
      for (let i = 0; i < room.length; i++) {
        room[i].choose = false;
      };
      _this.setData({
        room: room
      })
    }).catch((err) => {
      wx.showToast({
        title: '出了点问题，请稍后再试！',
        icon: 'none',
        mask: true
      })
      console.log(err)
    })
  },
  getTabs(e) {
    let i = e.currentTarget.dataset.index;
    let floors = this.data.floors;
    let floorIndex = this.data.floorIndex;
    let tabs = this.data.tabs;
    tabs[i].choose = !tabs[i].choose;
    let choose = [];
    tabs.forEach(function(val, index, tabs) {
      if (val.choose) {
        choose.push(val.tagId);
      };
    });
    this.setData({
      tabs: tabs,
      choose: choose,
    });
    this.getRooms(floors[floorIndex].floorId)
  },
  more() {
    this.setData({
      popup: !this.data.popup
    });
  },
  search() {
    this.setData({
      popup: !this.data.popup
    });
  },
  getFloor(e) {
    let i = e.currentTarget.dataset.index;
    let floors = this.data.floors;
    let floorIndex = this.data.floorIndex;
    let choose = this.data.choose;
    this.setData({
      floorIndex: i,
    });
    this.getRooms(floors[i].floorId)
  },
  getRoom(e) {
    let i = e.currentTarget.dataset.index;
    let room = this.data.room;
    for (let i = 0; i < room.length; i++) {
      room[i].choose = false;
    };
    room[i].choose = !room[i].choose;
    this.setData({
      room: room,
      max: 1,
      roomIndex: i,
    });
  },
  clear() {
    let room = this.data.room;
    for (let i = 0; i < room.length; i++) {
      room[i].choose = false;
    };
    this.setData({
      room: room,
      roomIndex: null,
    });
  },
  send() {
    let roomIndex = this.data.roomIndex;
    let preorder_id = this.data.preorder_id;
    let hotel_id = this.data.hotel_id;
    let room = this.data.room;
    if (!roomIndex && roomIndex != 0) {
      wx.showToast({
        title: '请选择房间',
        icon: "none",
        mask: true
      })
      return;
    };
    newRes.setRoom({
      preorder_id: preorder_id,
      room_id: room[roomIndex].roomId,
      hotel_id: hotel_id,
    }).then((res) => {
      wx.showModal({
        title: '选房成功',
        content: '您可以继续其他操作，或者前往个人中心查看订单详情',
        showCancel: false,
        success:(res)=>{
          if (res.confirm) {
            wx.navigateBack({
              delta:1
            })
          }
        }
      });
    }).catch((err) => {
      console.log(err)
      wx.showToast({
        title: err.data.msg ? err.data.msg :"系统繁忙，请稍后再试！",
        icon:"none",
        mask: true
      })
    })
  },
})