<template>
  <div class="hotel-calendar">
    <!-- 房型 -->
    <div class="room-type-box" ref="roomTypeBox">
      <!-- <ul ref="roomType" class="room-type-list" :style="{width:roomTypeWidth+'px'}">
      <div class="room-type-box" ref="roomTypeBox" @mouseup="slideFnEnd($event)" @mousleave="slideFnEnd($event)">
        <ul ref="roomType" class="room-type-list" :style="{width:roomTypeWidth+'px',transform:'translateX('+moveDistance+'px)'}" @mousedown="slideFnStar($event)" @mousemove="slideFn($event)">
        <li class="room-type" :class="key == roomTypeChoose?'choose':''" :data-index="key" v-for="(value,key) in roomType" :key="key" @click.stop="changeRoomType(key)">
          <span>{{value}}</span>
          <i class="el-icon-caret-top"></i>
        </li>
      </ul> -->
      <swiper class="room-type-list" :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiper-slide class="room-type" :class="key == roomTypeChoose?'choose':''" :data-index="key" v-for="(value,key) in roomType" :key="key">
          <div @click="changeRoomType(key,value.value)">
            <span>{{value.label}}</span>
            <i class="el-icon-caret-top"></i>
          </div>
        </swiper-slide>
        <!-- Optional controls -->
        <!-- <div class="swiper-pagination"  slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
        <div class="swiper-scrollbar"   slot="scrollbar"></div> -->
      </swiper>
    </div>

    <div class="calendar">
      <ul class="date">
        <li class="day" :class="[hoverDay === key?'hover':'',today==value?'today':'']" v-for="(value,key) in day" :key="key">
          <div class="day-num">{{value}}</div>
        </li>
      </ul>
      <div class="date-picker">
        <el-date-picker v-model="datePicker" format="yyyy-M-d" :clearable="false" type="date" placeholder="选择日期" size="small"></el-date-picker>
      </div>
      <div class="calendar-container">
        <ul class="room">
          <li class="room-number" :class="hoverRoom === key?'hover':''" v-for="(value,key) in room" :key="key">{{value.label}}</li>
        </ul>
        <transition name="calendar-fade">
          <ul class="room-status" v-if="show" @mouseup.prevent="clock2()">
            <li class="row" v-for="(value1,key1) in ststus" :key="key1">
              <ul class="room-day-status">
                <li class="col" v-for="(value2,key2) in value1.st" :key="key2" :data-index="key2" :data-status="value2.label" :class="value2.choose?'choose':''" @click="cl(key1,key2,$event)" @mouseleave.prevent="cLeave" @mouseover.prevent="calendarHover(key1,key2,$event)" @mousemove.prevent="move($event,value1.room)" @mousedown.prevent="clock1($event,value1.room,key2)">
                  <div class="room-status">{{value2.status}}</div>
                  <div class="box normal" :class="[clickDay === key1 && clickRoom === key2?'show':'',areaX?'change-directionX':'',areaY?'change-directionY':'',areaX && areaY?'change-directionX':'',areaX && areaY?'change-directionY':'']" @mouseover.stop="clickClock">
                    <div class="room-option" v-if="value2.label == '1'">
                      <div class="room-option-li" @click.stop.prevent="singleReserve(key1,key2)">预订</div>
                    </div>
                    <div class="room-option" v-else-if="value2.label == '0'">
                      <div class="room-option-li" @click.stop.prevent="">查看</div>
                    </div>
                  </div>
                  <div class="msg" :class="[hoverDay === key2 && hoverRoom === key1?'show':'',areaX?'change-directionX':'',areaY?'change-directionY':'',hoverDay === key2 && hoverRoom === key1?'transiton05-delay1':'']" @mousedown.stop="" @click.stop="">
                    <div class="msg-li">来源渠道：
                      <span>门店</span>
                    </div>
                    <div class="msg-li">客人姓名：
                      <span>张三</span>
                    </div>
                    <div class="msg-li">入住房型：
                      <span>豪华大床房</span>
                    </div>
                    <div class="msg-li">入住房间：
                      <span>1</span>间</div>
                    <div class="msg-li">抵店时间：
                      <span>2018-4-10 12：00</span>
                    </div>
                    <div class="msg-li">预离时间：
                      <span>2018-4-11 12：00</span>
                    </div>
                    <div class="msg-li">价格方案：
                      <span>门市价199</span>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </transition>
      </div>
    </div>
    <transition name="direction">
      <div class="directionBth el-icon-arrow-left" :class="direction?'bgcolor':''" style="left:205px;" @mouseenter="direction = !direction" @mouseleave="direction = !direction" @click="calendarShow"></div>
    </transition>
    <transition name="direction">
      <div class="directionBth el-icon-arrow-right" :class="direction1?'bgcolor':''" style="right:5px;" @mouseover="direction1 = !direction1" @mouseleave="direction1 = !direction1" @click="calendarShow"></div>
    </transition>
    <popup ref="popup" :popup="popup" @popupOp="popupOp" class="popup-calendar">
      <div class="checkInMsg">
        <div class="msg-li">
          <div class="title required">客源类型：</div>
          <el-select v-model="sendData.passenger" placeholder="请选择" size="small">
            <el-option v-for="item in passenger" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
        <div class="msg-li member" v-show="sendData.passenger === 3?true:false">
          <div class="title required">会员卡号：</div>
          <el-input v-model="sendData.member" type="text" placeholder="会员卡号" clearable size="small"></el-input>
          <el-button type="primary" size="small">搜索</el-button>
        </div>
        <div class="msg-li" v-show="sendData.passenger === 4?true:false">
          <div class="title required">协议单位：</div>
          <el-select v-model="sendData.unit" placeholder="请选择" size="small">
            <el-option v-for="item in unit" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
      </div>
      <div class="checkInMsg">
        <div class="msg-li check-in">
          <div class="title required">入住时间：</div>
          <el-date-picker format="yyyy-M-d HH:mm:ss" value-format="yyyy-M-d HH:mm:ss" size="small" type="datetime" v-model="sendData.checkIn" :clearable='false' :picker-options="pickerOptions" :default-time="defaultTime" @blur="checkTime" @change="checkTime"></el-date-picker>
        </div>
        <div class="msg-li count">
          <span class="el-icon-minus" @click="count('sub')" :class="countType == 'sub'?'active':''"></span>
          <div class="count-input"><input type="number" v-model="sendData.day_number">天</div>
          <span class="el-icon-plus" @click="count('add')" :class="countType == 'add'?'active':''"></span>
        </div>
        <div class="msg-li check-in">
          <div class="title required">离店时间：</div>
          <el-date-picker format="yyyy-M-d HH:mm:ss" value-format="yyyy-M-d HH:mm:ss" size="small" type="datetime" v-model="sendData.checkOut" :clearable='false' :picker-options="pickerOptions" :default-time="defaultTime" @blur="checkTime" @change="checkTime"></el-date-picker>
        </div>
      </div>
      <div class="checkInMsg">
        <div class="msg-li">
          <div class="title required">预订人：</div>
          <el-input type="text" v-model="sendData.people" placeholder="请输入预订人姓名" clearable size="small"></el-input>
        </div>
        <div class="msg-li">
          <div class="title required">预定手机：</div>
          <el-input type="text" v-model="sendData.mobile" placeholder="请输入手机号" clearable size="small"></el-input>
        </div>
        <div class="msg-li">
          <div class="title required">预计抵达时间：</div>
          <el-time-select v-model="sendData.arrival_time" :picker-options="{start: '00:00',step: '00:30',end: '23:30'}" placeholder="选择时间" size="small"></el-time-select>
        </div>
      </div>
      <div class="checkInMsg">
        <div class="msg-li">
          <div class="title required">预定定金：</div>
          <el-input type="text" v-model="sendData.money" placeholder="请输入金额" clearable size="small"></el-input>
        </div>
        <div class="msg-li">
          <div class="title">备注：</div>
          <el-input type="textarea" autosize resize="none" placeholder="请输入内容" v-model="sendData.remind"></el-input>
        </div>
      </div>
      <el-table ref="multipleTable" :data="choose" tooltip-effect="dark" style="width: 100%">
        <el-table-column label="序号" width="56">
          <template slot-scope="scope">{{scope.row.num}}</template>
        </el-table-column>
        <el-table-column label="房型" width="98">
          <template slot-scope="scope">{{scope.row.room_type}}</template>
        </el-table-column>
        <el-table-column label="房号" width="93">
          <template slot-scope="scope">{{scope.row.room_number.label}}</template>
        </el-table-column>
        <el-table-column label="房价" width="70">
          <template slot-scope="scope">{{scope.row.room_price}}</template>
        </el-table-column>
        <el-table-column label="预抵" width="160">
          <template slot-scope="scope">{{scope.row.checkIn}}</template>
        </el-table-column>
        <el-table-column label="预离" width="160">
          <template slot-scope="scope">{{scope.row.checkOut}}</template>
        </el-table-column>
        <el-table-column label="入住人" width="222">
          <template slot-scope="scope">
            <el-input type="text" v-model="scope.row.people" :disabled='scope.row.disable' placeholder="多个用“|”隔开" size="small"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="75">
          <template slot-scope="scope">
            <div class="option">
              <el-button type="text" @click="localDel(scope.row.num)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- <div class="time" v-for="item in choose">{{roomTypeValue}}&nbsp;&nbsp;房号 {{item.room}} : {{item.start}}&nbsp;日&nbsp;12:00&nbsp;&nbsp;到&nbsp;&nbsp;&nbsp; {{item.end}}&nbsp;日&nbsp;12:00</div> -->
    </popup>
  </div>
</template>

<script>
import Popup from '@/components/public/popup' //弹窗
import Reg from '@/assets/js/RegEx.js' //正则
import Vue from 'vue'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

import { mapGetters } from 'vuex'
import API from '@/store/API/index'
// require styles
import 'swiper/dist/css/swiper.css'

export default {
  components: {
    Popup,
    swiper,
    swiperSlide
  },
  computed: {
    ...mapGetters({
      hotel: 'currHotel'
    }),
    // 房型列表盒子宽度
    roomTypeWidth: function() {
      return this.roomType.length * 130
    },
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  data() {
    const generateData = (date) => {
      let dayTime = 60 * 60 * 24 * 1000
      let day = []
      let today = date.getTime()
      for (let i = 0; i < 15; i++) {
        day.push(
          new Date(today)
            .toLocaleString()
            .split(' ')[0]
            .replace(/\//g, '-')
        )
        today += dayTime
      }
      return day
    }
    return {
      swiperOption: {
        // some swiper options/callbacks
        // 所有的参数同 swiper 官方 api 参数
        // ...
        slidesPerView: 10,
        slideToClickedSlide: true,
        preventClicks: false
      },
      // 弹窗
      popup: {
        title: '日历订房',
        width: 1000,
        confirmText: '完成',
        cancelText: '取消',
        z_index: 1000
      },
      roomType: [],
      roomTypeChoose: 0,
      roomTypeValue: '',
      initX: 0,
      moveDistance: 0,
      slide: false,
      canChange: true,
      areaX: false,
      areaY: false,
      room: [],
      roomBoxHeight:'',
      roomLiHeight:'60',
      ststus: [
        {
          room: 1,
          st: [
            { label: 1, status: '空净', choose: false },
            { label: 1, status: '空净', choose: false },
            { label: 1, status: '空净', choose: false },
            { label: 1, status: '空净', choose: false },
            { label: 1, status: '空净', choose: false },
            { label: 4, status: '已预订', choose: false },
            { label: 1, status: '空净', choose: false },
            { label: 1, status: '空净', choose: false },
            { label: 1, status: '空净', choose: false },
            { label: 1, status: '空净', choose: false },
            { label: 1, status: '空净', choose: false },
            { label: 1, status: '空净', choose: false },
            { label: 1, status: '空净', choose: false },
            { label: 1, status: '空净', choose: false },
            { label: 1, status: '空净', choose: false }
          ]
        },
        {
          room: 2,
          st: [
            { label: 0, status: '某个状态', choose: false },
            { label: 0, status: '某个状态', choose: false },
            { label: 0, status: '某个状态', choose: false },
            { label: 0, status: '某个状态', choose: false },
            { label: 4, status: '已预订', choose: false },
            { label: 0, status: '某个状态', choose: false },
            { label: 0, status: '某个状态', choose: false },
            { label: 4, status: '已预订', choose: false },
            { label: 0, status: '某个状态', choose: false },
            { label: 0, status: '某个状态', choose: false },
            { label: 0, status: '某个状态', choose: false },
            { label: 0, status: '某个状态', choose: false },
            { label: 0, status: '某个状态', choose: false },
            { label: 0, status: '某个状态', choose: false },
            { label: 0, status: '某个状态', choose: false }
          ]
        },
        {
          room: 3,
          st: [
            { label: 0, status: '某个状态', choose: false },
            { label: 0, status: '某个状态', choose: false },
            { label: 1, status: '空净', choose: false },
            { label: 1, status: '空净', choose: false },
            { label: 1, status: '空净', choose: false },
            { label: 1, status: '空净', choose: false },
            { label: 0, status: '某个状态', choose: false },
            { label: 4, status: '已预订', choose: false },
            { label: 0, status: '某个状态', choose: false },
            { label: 0, status: '某个状态', choose: false },
            { label: 0, status: '某个状态', choose: false },
            { label: 3, status: '停用', choose: false },
            { label: 3, status: '停用', choose: false },
            { label: 0, status: '某个状态', choose: false },
            { label: 0, status: '某个状态', choose: false }
          ]
        },
        {
          room: 4,
          st: [
            { label: 0, status: '某个状态', choose: false },
            { label: 2, status: '空脏', choose: false },
            { label: 2, status: '空脏', choose: false },
            { label: 0, status: '某个状态', choose: false },
            { label: 0, status: '某个状态', choose: false },
            { label: 4, status: '已预订', choose: false },
            { label: 0, status: '某个状态', choose: false },
            { label: 1, status: '空净', choose: false },
            { label: 1, status: '空净', choose: false },
            { label: 1, status: '空净', choose: false },
            { label: 1, status: '空净', choose: false },
            { label: 0, status: '某个状态', choose: false },
            { label: 0, status: '某个状态', choose: false },
            { label: 0, status: '某个状态', choose: false },
            { label: 0, status: '某个状态', choose: false }
          ]
        },
        {
          room: 5,
          st: [
            { label: 0, status: '某个状态', choose: false },
            { label: 0, status: '某个状态', choose: false },
            { label: 4, status: '已预订', choose: false },
            { label: 0, status: '某个状态', choose: false },
            { label: 0, status: '某个状态', choose: false },
            { label: 0, status: '某个状态', choose: false },
            { label: 0, status: '空脏', choose: false },
            { label: 0, status: '空净', choose: false },
            { label: 0, status: '空脏', choose: false },
            { label: 0, status: '空净', choose: false },
            { label: 1, status: '空净', choose: false },
            { label: 1, status: '空净', choose: false },
            { label: 1, status: '空净', choose: false },
            { label: 1, status: '空净', choose: false },
            { label: 0, status: '空脏', choose: false }
          ]
        },
        {
          room: 6,
          st: [
            { label: 0, status: '空脏', choose: false },
            { label: 1, status: '空净', choose: false },
            { label: 1, status: '空净', choose: false },
            { label: 0, status: '空净', choose: false },
            { label: 0, status: '空脏', choose: false },
            { label: 0, status: '空净', choose: false },
            { label: 0, status: '空脏', choose: false },
            { label: 0, status: '空净', choose: false },
            { label: 0, status: '空脏', choose: false },
            { label: 0, status: '空净', choose: false },
            { label: 0, status: '空脏', choose: false },
            { label: 0, status: '空净', choose: false },
            { label: 0, status: '空脏', choose: false },
            { label: 1, status: '空净', choose: false },
            { label: 1, status: '空净', choose: false }
          ]
        },
        {
          room: 7,
          st: [
            { label: 0, status: '空脏', choose: false },
            { label: 0, status: '空净', choose: false },
            { label: 0, status: '空脏', choose: false },
            { label: 0, status: '空净', choose: false },
            { label: 0, status: '空脏', choose: false },
            { label: 0, status: '空净', choose: false },
            { label: 0, status: '空脏', choose: false },
            { label: 0, status: '空净', choose: false },
            { label: 0, status: '空脏', choose: false },
            { label: 0, status: '空净', choose: false },
            { label: 0, status: '空脏', choose: false },
            { label: 0, status: '空净', choose: false },
            { label: 0, status: '空脏', choose: false },
            { label: 0, status: '空净', choose: false },
            { label: 0, status: '空脏', choose: false }
          ]
        },
        {
          room: 8,
          st: [
            { label: 0, status: '空脏', choose: false },
            { label: 0, status: '空净', choose: false },
            { label: 0, status: '空脏', choose: false },
            { label: 0, status: '空净', choose: false },
            { label: 0, status: '空脏', choose: false },
            { label: 0, status: '空净', choose: false },
            { label: 0, status: '空脏', choose: false },
            { label: 0, status: '空净', choose: false },
            { label: 0, status: '空脏', choose: false },
            { label: 0, status: '空净', choose: false },
            { label: 0, status: '空脏', choose: false },
            { label: 0, status: '空净', choose: false },
            { label: 0, status: '空脏', choose: false },
            { label: 0, status: '空净', choose: false },
            { label: 0, status: '空脏', choose: false }
          ]
        },
        {
          room: 9,
          st: [
            { label: 0, status: '空脏', choose: false },
            { label: 0, status: '空净', choose: false },
            { label: 0, status: '空脏', choose: false },
            { label: 0, status: '空净', choose: false },
            { label: 0, status: '空脏', choose: false },
            { label: 0, status: '空净', choose: false },
            { label: 0, status: '空脏', choose: false },
            { label: 0, status: '空净', choose: false },
            { label: 0, status: '空脏', choose: false },
            { label: 0, status: '空净', choose: false },
            { label: 0, status: '空脏', choose: false },
            { label: 0, status: '空净', choose: false },
            { label: 0, status: '空脏', choose: false },
            { label: 0, status: '空净', choose: false },
            { label: 0, status: '空脏', choose: false }
          ]
        }
      ],
      datePicker: new Date()
        .toLocaleString()
        .split(' ')[0]
        .replace(/\//g, '-'),
      day: generateData(new Date()),
      today: '',
      nowYear: '',
      nowMonth: '',
      nowDay: '',
      hoverDay: '',
      hoverRoom: '',
      clickDay: '',
      clickRoom: '',
      clk: true,
      first: { room: 0, index: 0 },
      last: { room: 0, index: 0 },
      choose: [],
      show: true,
      direction: false,
      direction1: false,
      // 日历订房展示数据
      // //房价
      price: '299.00',
      passenger: [],
      unit: [],
      team: [{ label: '是', value: 1 }, { label: '否', value: 0 }],
      countType: '',
      defaultTime: '14:00:00',
      lastInd: '',
      // 日历订房提交数据
      sendData: {
        people: '',
        mobile: '',
        passenger: '',
        member: '',
        unit: '',
        checkIn: '',
        checkOut: '',
        arrival_time: '',
        money: '',
        team: '',
        team_name: '',
        remind: '',
        day_number: 1
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 24 * 60 * 60 * 1000
        }
      },
      sW: document.body.clientWidth,
      sH: document.body.clientHeight
    }
  },
  methods: {
    calendarShow() {
      this.show = !this.show
      this.hoverDay = ''
      this.hoverRoom = ''
      this.clickDay = ''
      this.clickRoom = ''
      this.first = { room: 0, index: 0 }
      this.last = { room: 0, index: 0 }
      this.choose = []
      this.calenderInit()
      setTimeout(() => {
        this.show = !this.show
      }, 1000)
    },
    // 切换房型
    changeRoomType(key, id) {
      if (this.canChange) {
        this.roomTypeChoose = key
        this.roomTypeValue = this.roomType[key].label
        this.checkRoomListAsRoomType(id)
        this.calendarShow()
        this.canChange = false
      } else {
        return
      }
      setTimeout(() => {
        this.canChange = true
      }, 1000)
    },
    // 获取今天月、日
    td() {
      this.today = this.datePicker
      this.nowYear = Number(this.datePicker.split('-')[0])
      this.nowMonth = Number(this.datePicker.split('-')[1])
      this.nowDay = Number(this.datePicker.split('-')[2])
      this.roomTypeValue = this.roomType[this.roomTypeChoose]
    },
    canClick(index) {
      let y = Number(this.day[index].split('-')[0])
      let m = Number(this.day[index].split('-')[1])
      let d = Number(this.day[index].split('-')[2])
      if (y < this.nowYear) {
        this.$alert('当天之前的房间不可以操作', '消息', {
          confirmButtonText: '确定'
        })
        return false
      } else if (y >= this.nowYear && m < this.nowMonth) {
        this.$alert('当天之前的房间不可以操作', '消息', {
          confirmButtonText: '确定'
        })
        return false
      } else if (y >= this.nowYear && m == this.nowMonth && d < this.nowDay) {
        this.$alert('当天之前的房间不可以操作', '消息', {
          confirmButtonText: '确定'
        })
        return false
      } else {
        return true
      }
    },
    // 点击某天某个房间
    cl(room, index, e) {
      let clickYear = this.day[index].split('-')[0]
      let clickMonth = this.day[index].split('-')[1]
      let clickDay = this.day[index].split('-')[2]
      let nowYear = this.nowYear
      let nowMonth = this.nowMonth
      let nowDay = this.nowDay
      let status = e.currentTarget.dataset.status
      if (!this.canClick(index)) {
        return
      }
      if (status == '2' || status == '3' || status == '4') {
        this.$message({
          type: 'warning',
          message: '维修房和停用房不可预定'
        })
        return
      }
      if (clickYear < nowYear) {
        console.log('可以查看')
      } else {
        if ((clickMonth == nowMonth) & (clickDay >= nowDay)) {
          this.clickDay = room
          this.clickRoom = index
          this.hoverDay = ''
          this.hoverRoom = ''
          this.clickChoose(room, index)
        }
        if (clickMonth < nowMonth) {
          console.log('可以查看')
        }
        if (clickMonth > nowMonth) {
          this.clickDay = room
          this.clickRoom = index

          this.hoverDay = ''
          this.hoverRoom = ''
          this.clickChoose(room, index)
        }
      }
    },
    // 单个预定
    singleReserve(i, j) {
      this.cLeave()
      let cs = []
      cs.push({
        num: 1,
        room_type: this.roomTypeValue,
        room_number: this.room[i],
        room_price: this.price,
        checkIn: this.day[j] + ' ' + this.defaultTime,
        checkOut: this.day[j + 1] + ' ' + this.defaultTime,
        people: '',
        day_number: 1
      })
      this.choose = cs
      this.sendData.checkIn = cs[0].checkIn
      this.sendData.checkOut = cs[0].checkOut
      this.sendData.day_number = cs[0].day_number
      this.lastIndex()
      this.$refs.popup.close()
    },
    // 鼠标离开，清空状态
    cLeave() {
      this.clickDay = ''
      this.clickRoom = ''
      this.hoverDay = ''
      this.hoverRoom = ''
    },
    // 选中某天某个房间
    clickChoose(room, index) {
      if (!this.canClick(index)) {
        return
      }
      this.clickClock()
      this.calenderInit()
      this.first = { room: 0, index: 0 }
      this.last = { room: 0, index: 0 }
      this.choose = []
      this.ststus[room].st[index].choose = true
      this.choose.push({
        room: this.room[room],
        start: this.day[index],
        end: this.day[index + 1]
      })
    },
    // 点击时阻止mousemove事件
    clickClock() {
      this.hoverDay = ''
      this.hoverRoom = ''
    },
    // 日历选中状态初始化
    calenderInit() {
      for (let i = 0; i < this.ststus.length; i++) {
        for (let j = 0; j < this.ststus[i].st.length; j++) {
          this.ststus[i].st[j].choose = false
        }
      }
    },
    // 弹窗点击按钮状态
    popupOp(res) {
      if (res == 'cancel') {
        this.choose = []
        this.calenderInit()
        this.$refs.popup.close()
      } else {
        this.choose = []
        this.calenderInit()
        this.$refs.popup.close()
      }
    },
    clock1(e, room, day) {
      if (!this.canClick(day)) {
        return
      }
      this.hoverDay = ''
      this.hoverRoom = ''
      this.sendData = {
        people: '',
        mobile: '',
        passenger: '',
        member: '',
        unit: '',
        checkIn: '',
        checkOut: '',
        arrival_time: '',
        money: '',
        team: '',
        team_name: '',
        remind: '',
        day_number: 1
      }
      this.clk = false
      let index = Number(e.currentTarget.getAttribute('data-index'))
      this.first = { room: room, index: index }
    },
    clock2() {
      this.hoverDay = ''
      this.hoverRoom = ''
      this.clk = true
      if (this.choose.length > 1) {
        this.$refs.popup.close()
      } else if (this.choose.length == 1) {
        console.log(this.choose)
        if (this.choose[0].day_number > 0) {
          this.$refs.popup.close()
        } else {
          return
        }
      } else {
        return
      }
    },
    move(e, room) {
      if (!this.clk) {
        this.hoverDay = ''
        this.hoverRoom = ''
        let index = Number(e.currentTarget.getAttribute('data-index'))
        this.last = { room: room, index: index }
        this.column()
      }
    },
    column() {
      let arr = this.ststus
      let cs = []
      let _this = this
      this.calenderInit()
      if (
        this.first.room <= this.last.room &&
        this.first.index <= this.last.index
      ) {
        for (let i = 0; i < arr.length; i++) {
          if (this.first.room <= arr[i].room) {
            if (arr[i].room <= this.last.room) {
              for (let j = 0; j < arr[i].st.length; j++) {
                if (this.first.index <= j) {
                  if (j <= this.last.index) {
                    arr[i].st[j].choose = true
                  }
                }
              }
              cs.push({
                num: cs.length + 1,
                room_type: this.roomTypeValue,
                room_number: this.room[i],
                room_price: this.price,
                checkIn: this.day[this.first.index] + ' ' + this.defaultTime,
                checkOut: this.day[this.last.index] + ' ' + this.defaultTime,
                people: '',
                day_number: this.last.index - this.first.index
              })
            }
          }
        }
      }
      if (
        this.first.room <= this.last.room &&
        this.first.index > this.last.index
      ) {
        for (let i = 0; i < arr.length; i++) {
          if (this.first.room <= arr[i].room) {
            if (arr[i].room <= this.last.room) {
              for (let j = 0; j < arr[i].st.length; j++) {
                if (this.first.index >= j) {
                  if (j >= this.last.index) {
                    arr[i].st[j].choose = true
                  }
                }
              }
              cs.push({
                num: cs.length + 1,
                room_type: this.roomTypeValue,
                room_number: this.room[i],
                room_price: this.price,
                checkIn: this.day[this.last.index] + ' ' + this.defaultTime,
                checkOut: this.day[this.first.index] + ' ' + this.defaultTime,
                people: '',
                day_number: this.first.index - this.last.index
              })
            }
          }
        }
      }
      if (
        this.first.room > this.last.room &&
        this.first.index < this.last.index
      ) {
        for (let i = 0; i < arr.length; i++) {
          if (this.first.room >= arr[i].room) {
            if (arr[i].room >= this.last.room) {
              for (let j = 0; j < arr[i].st.length; j++) {
                if (this.first.index <= j) {
                  if (j <= this.last.index) {
                    arr[i].st[j].choose = true
                  }
                }
              }
              cs.push({
                num: cs.length + 1,
                room_type: this.roomTypeValue,
                room_number: this.room[i],
                room_price: this.price,
                checkIn: this.day[this.first.index] + ' ' + this.defaultTime,
                checkOut: this.day[this.last.index] + ' ' + this.defaultTime,
                people: '',
                day_number: this.last.index - this.first.index
              })
            }
          }
        }
      }
      if (
        this.first.room > this.last.room &&
        this.first.index > this.last.index
      ) {
        for (let i = 0; i < arr.length; i++) {
          if (this.first.room >= arr[i].room) {
            if (arr[i].room >= this.last.room) {
              for (let j = 0; j < arr[i].st.length; j++) {
                if (this.first.index >= j) {
                  if (j >= this.last.index) {
                    arr[i].st[j].choose = true
                  }
                }
              }
              cs.push({
                num: cs.length + 1,
                room_type: this.roomTypeValue,
                room_number: this.room[i],
                room_price: this.price,
                checkIn: this.day[this.last.index] + ' ' + this.defaultTime,
                checkOut: this.day[this.first.index] + ' ' + this.defaultTime,
                people: '',
                day_number: this.first.index - this.last.index
              })
            }
          }
        }
      }

      this.choose = cs
      this.sendData.checkIn = cs[0].checkIn
      let nextDay = new Date(cs[0].checkOut).getTime()+(60 * 60 * 24 * 1000);
      let checkOut = new Date(nextDay).toLocaleDateString() + ' ' + this.defaultTime;
      // this.sendData.checkOut = cs[0].
      this.sendData.checkOut = checkOut
      this.sendData.day_number = cs[0].day_number
      this.lastIndex()
    },
    calendarHover(row, col, e) {
      this.hoverDay = col
      this.hoverRoom = row
      if (this.sW - e.clientX < (this.sW/2)) {
        this.areaX = true
      } else {
        this.areaX = false
      }
      if (this.sH - e.clientY < (this.sH/2)) {
        this.areaY = true
      } else {
        this.areaY = false
      }
    },
    // 获取离店日期，计算年、月、日
    lastIndex() {
      if (this.first.index <= this.last.index) {
        this.lastInd = this.last.index
      } else {
        this.lastInd = this.first.index
      }
    },
    // 计算天数、离店日期
    count(type) {
      this.countType = type
      let daySeconds = 60 * 60 * 24 * 1000
      let checkOutDate = new Date(this.sendData.checkOut).getTime()
      if (type == 'sub') {
        if (this.sendData.day_number <= 1) {
          return
        }
        this.sendData.day_number--
        checkOutDate -= daySeconds
      } else {
        this.sendData.day_number++
        checkOutDate += daySeconds
      }
      this.sendData.checkOut =
        new Date(checkOutDate)
          .toLocaleString()
          .split(' ')[0]
          .replace(/\//g, '-') +
        ' ' +
        this.defaultTime
      for (let i = 0; i < this.choose.length; i++) {
        this.choose[i].checkIn = this.sendData.checkIn
        this.choose[i].checkOut = this.sendData.checkOut
      }
    },
    // 选择日期
    checkTime() {
      for (let i = 0; i < this.choose.length; i++) {
        this.choose[i].checkIn = this.sendData.checkIn
        this.choose[i].checkOut = this.sendData.checkOut
      }
      this.sendData.day_number =
        (new Date(this.sendData.checkOut).getTime() -
          new Date(this.sendData.checkIn).getTime()) /
        (60 * 60 * 24 * 1000)
    },
    // 未保存添加条目删除
    localDel(num) {
      for (let j = 0; j < this.choose.length; j++) {
        if (num == this.choose[j].num) {
          this.choose.splice(j, 1)
        }
      }
    },
    // 获取房型
    getRoomType() {
      let _this = this
      API.getRoomType(this.hotel.id)
        .then(function(res) {
          if (res.error_code == 0) {
            console.log(res)
            let arr = []
            for (let i = 0; i < res.data.length; i++) {
              arr.push({})
              arr[i].label = res.data[i].name
              arr[i].value = res.data[i].id
              arr[i].price = res.data[i].price
            }
            _this.roomType = arr
            _this.roomTypeValue = res.data[_this.roomTypeChoose].name
            _this.checkRoomListAsRoomType(res.data[0].id)
          } else {
            _this.$message({
              type: 'warning',
              message: '获取房型列表失败'
            })
          }
        })
        .catch(function(err) {
          _this.$message({
            type: 'warning',
            message: '获取房型列表失败'
          })
        })
    },
    // 获取客源类型
    getFromWay() {
      let _this = this
      API.getFrom()
        .then(function(res) {
          if (res.error_code == 0) {
            let arr = []
            for (let i = 0; i < res.data.length; i++) {
              arr.push({})
              arr[i].label = res.data[i].name
              arr[i].value = res.data[i].id
            }
            _this.passenger = arr
          } else {
            _this.$message({
              type: 'warning',
              message: '获取客源类型列表失败'
            })
          }
        })
        .catch(function(err) {
          _this.$message({
            type: 'warning',
            message: '获取客源类型列表失败'
          })
        })
    },
    // 合作单位
    cooperator() {
      let _this = this
      API.cooperatorList({
        id: this.hotel.id
      })
        .then(function(res) {
          if (res.error_code == 0) {
            let arr = []
            for (let i = 0; i < res.data.length; i++) {
              arr.push({})
              arr[i].label = res.data[i].name
              arr[i].value = res.data[i].id
            }
            _this.unit = arr
          } else {
            _this.$message({
              type: 'warning',
              message: '请求合作单位列表失败'
            })
          }
        })
        .catch(function(err) {
          console.log(err)
          _this.$message({
            type: 'warning',
            message: '请求合作单位列表失败'
          })
        })
    },
    // 根据房型查询房间
    checkRoomListAsRoomType(roomId) {
      let _this = this
      API.checkRoomListAsRoomType({
        id: roomId
      })
        .then(function(res) {
          if (res.error_code == 0) {
            let arr = []
            for (let i = 0; i < res.data.length; i++) {
              arr.push({})
              arr[i].label = res.data[i].name
              arr[i].value = res.data[i].id
            }
            _this.roomBoxHeight = res.data.length * _this.roomLiHeight;
            _this.room = arr
          } else {
            _this.$message({
              type: 'warning',
              message: '查询房间列表失败'
            })
          }
        })
        .catch(function(err) {
          console.log(err)
          _this.$message({
            type: 'warning',
            message: '查询房间列表失败'
          })
        })
    }
  },
  created() {
    this.getRoomType()
    this.getFromWay()
    this.cooperator()
    this.td()
  },
  mounted() {}
}
</script>

<style lang="scss">
.hotel-calendar {
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  padding-left: 250px;
  padding-top: 50px;
  padding-right: 50px;
  background: #f2f2f2;
  font-size: 14px;
  overflow: hidden;
  .directionBth {
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 32px;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    border-radius: 50%;
    position: absolute;
    top: 40%;
    transition: all 0.5s ease;
  }
  .bgcolor {
    background-color: #6a9df6;
    color: #e6e6e6;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.5);
  }
  .room-type-box {
    width: 100%;
    position: fixed;
    top: 50px;
    left: 250px;
    z-index: 99;
    background-color: #f2f2f2;
    .room-type-list {
      height: 70px;
      user-select: none;
      .room-type {
        box-sizing: border-box;
        float: left;
        width: 121px !important;
        height: 100%;
        text-align: center;
        background-color: #fff;
        & > div {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          position: relative;
        }
        & > div > span {
          display: inline-block;
          width: 100%;
          height: 40px;
          line-height: 40px;
          border-right: 1px solid #f2f2f2;
        }
        &:last-of-type > div > span {
          border-right: 0;
        }
        & > div > i {
          position: absolute;
          width: 16px;
          height: 6px;
          line-height: 6px;
          font-size: 16px;
          color: #f2f2f2;
          left: calc(50% - 8px);
          bottom: 0;
          display: none;
        }
        &.choose {
          background-color: #6a9df6;
          color: #fff;
          span {
            border-right: 1px solid #6a9df6;
          }
          i {
            display: block;
          }
        }
      }
    }
  }
  .calendar {
    box-sizing: border-box;
    padding-top: 70px;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    user-select: none;
    position: relative;
    border: 1px solid #e6e6e6;
    overflow: auto;
    &::-webkit-scrollbar-corner {
      background-color: #f2f2f2;
    }
    .date {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      height: 60px;
      line-height: 60px;
      text-align: center;
      padding-left: 121px;
      .day {
        box-sizing: border-box;
        background-color: #e6e6e6;
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 115px;
        height: 100%;
        border-left: 1px solid #fff;
        &.today {
          // background-color: #6a9df6;
          color: #6a9df6;
        }
        &.hover {
          background-color: #b2b2b2;
        }
      }
    }
    .date-picker {
      width: 121px;
      height: 60px;
      line-height: 60px;
      position: absolute;
      left: 0;
      top: 70px;
      .el-date-editor.el-input {
        width: 100%;
        height: 100%;
        .el-input__inner {
          border-radius: 0;
          font-size: 12px;
          display: inline-block;
          height: 100%;
          color: #6a9df6;
        }
        .el-input__prefix {
          color: #6a9df6;
        }
      }
    }
    .calendar-container {
      // height: 100%;
      display: flex;
      .room {
        text-align: center;
        height: 100%;
        width: 121px;
        .room-number {
          box-sizing: border-box;
          background-color: #f5f5f5;
          width: 121px;
          height: 60px;
          line-height: 60px;
          border-bottom: 1px solid #e6e6e6;
          border-right: 1px solid #e6e6e6;
          // &:last-of-type {
          //   border-bottom: 0;
          // }
          &.hover {
            background-color: #b2b2b2;
          }
        }
      }
      .empty {
        width: 121px;
        height: 100%;
      }
    }
    .room-status {
      flex: 1;
      width: 100%;
      height: 100%;
      .row {
        box-sizing: border-box;
        width: 100%;
        height: 60px;
        cursor: pointer;
        .room-day-status {
          box-sizing: border-box;
          width: 100%;
          height: 60px;
          display: flex;
          .col {
            box-sizing: border-box;
            // flex: 1;
            width: 115px;
            height: 60px;
            text-align: center;
            line-height: 60px;
            transform-origin: 0 0;
            background-color: #fff;
            border-top: 1px solid #e6e6e6;
            border-left: 1px solid #e6e6e6;
            position: relative;
            .box {
              position: absolute;
              z-index: 100;
              width: 200px;
              display: none;
              & > .room-option {
                box-sizing: border-box;
                padding: 0 26px;
                background-color: rgba(0, 0, 0, 0.5);
                color: #fff;
                .room-option-li {
                  height: 45px;
                  line-height: 45px;
                  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
                  &:hover {
                    color: #6a9df6;
                  }
                  &:last-of-type {
                    border-bottom: 0;
                  }
                }
              }
              &.show {
                display: block;
              }
            }
            .box.normal {
              left: 90px;
              top: 35px;
            }
            .box.change-directionX {
              left: -175px;
            }
            .box.change-directionY {
              top: -25px;
            }
            .box.change-directionX.change-directionY {
              top: -25px;
              left: -175px;
            }
            .msg {
              position: absolute;
              left: 90px;
              top: 35px;
              z-index: 90;
              transform-origin: 0 0;
              box-sizing: border-box;
              width: 355px;
              padding: 18px 0;
              background-color: rgba(0, 0, 0, 0.5);
              color: #fff;
              transform: scale(0);
              .msg-li {
                box-sizing: border-box;
                line-height: 20px;
                padding: 0 16px;
                text-align: left;
                margin-bottom: 6px;
                &:last-of-type {
                  margin: 0;
                }
              }
              &.show {
                transform: scale(1);
              }
            }
            .msg.change-directionX {
              left: -335px;
              transform-origin: 100% 0;
            }
            .msg.change-directionY {
              top: -190px;
              transform-origin: 0 100%;
            }
            .msg.change-directionX.change-directionY {
              transform-origin: 100% 100%;
            }
          }
          .col.choose {
            background-color: #b4ddf9;
            border-top: 1px solid #b4ddf9;
            border-left: 1px solid #b4ddf9;
            // color: #fff;
          }
        }
      }
    }
  }
  .time {
    font-size: 16px;
    line-height: 40px;
    text-align: center;
  }
  .checkInMsg {
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .msg-li {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      margin-right: 35px;
      .title {
        box-sizing: border-box;
        padding-right: 10px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        min-width: 100px;
      }
      .el-input.el-input--suffix {
        width: 170px;
      }
      .el-button {
        margin-left: 10px;
      }
      .el-textarea {
        width: 100%;
        .el-textarea__inner {
          width: 829px;
        }
      }
    }
    .msg-li.member {
      .el-input.el-input--suffix {
        width: 140px;
      }
    }
    .msg-li.check-in {
      .el-input.el-input--suffix {
        width: 200px;
      }
    }
    .msg-li.count {
      text-align: center;
      span {
        box-sizing: border-box;
        display: inline-block;
        width: 26px;
        height: 26px;
        border-radius: 50%;
        border: 1px solid #ccc;
        color: #ccc;
        line-height: 26px;
        &.active {
          background-color: #6a9df6;
          border: 1px solid #6a9df6;
          color: #fff;
        }
      }
      .count-input {
        margin: 0 10px;
        input {
          width: 28px;
          height: 28px;
          text-align: center;
          line-height: 28px;
          border-radius: 2px;
          border: 1px solid #ccc;
          margin: 0 4px;
        }
      }
    }
  }
}
.popup-calendar {
  .popup {
    height: 80%;
    max-height: 600px;
    .content {
      height: 100%;
      overflow-y: auto !important;
    }
  }
}

.el-table {
  margin-top: 20px;
}
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */

// 日历切换动画
.calendar-fade-enter-active {
  transition: all 0.5s ease;
}
.calendar-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.calendar-fade-enter, .calendar-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(200px);
  opacity: 0;
}
</style>
