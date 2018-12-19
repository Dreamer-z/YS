<template>
  <div class="historicalroomexchange">
    <div class="white-text">
      <ol class="search">
        <li class="middle search-li">
          <p class="middle">
            <span class="middle">日期</span>
            <span class="middle">：</span>
          </p>
          <el-date-picker class="middle" :picker-options="pickerOptions" v-model="dateTimes" value-format="yyyy-MM-dd" size="mini" type="daterange" range-separator="至"></el-date-picker>
          <!-- <div class="date middle">
            <el-date-picker v-model="startDateTime" :picker-options="pickerOptions" value-format="yyyy-MM-dd HH:mm:ss" size="mini" type="datetime">
            </el-date-picker>
          </div>
          <span>至</span>
          <div class="date middle">
            <el-date-picker v-model="endDateTime" :picker-options="pickerOptions" value-format="yyyy-MM-dd HH:mm:ss" size="mini" type="datetime">
            </el-date-picker>
          </div> -->
        </li>
        <li @click="getTotalList" class="btnserch middle search-li">
          <!-- <span>搜索</span> -->
          <el-button style="width:100px;" type="primary" size="mini">搜索</el-button>
        </li>
        <li class="btnserch middle search-li">
          <!-- <span>导出</span> -->
          <el-button style="width:100px;" type="primary" size="mini">导出</el-button>
        </li>
        <li class="btnserch middle search-li">
          <!-- <span>打印</span> -->
          <el-button style="width:100px;" type="primary" size="mini">打印</el-button>
        </li>
      </ol>
      <div class="line"></div>
      <div style="paddingLeft:35px;paddingRight:35px;boxSize:borderBox;" id="tab-list">
        <table>
          <caption>
            <h2>历史换房报表</h2>
          </caption>
          <thead>
            <tr style="margin-top: 20px;margin-bottom: 10px;">
              <td style="flex:1;text-align: left;height: 30px;">
                <span>酒店：</span>
                <span>{{hotel.hotel_name}}</span>
              </td>
              <td style="text-align: right;height: 30px;">
                <span>制表时间：</span>
                <span>{{startDate}}</span>
              </td>
            </tr>
          </thead>
        </table>
        <table id="tab" style="border-color:#f2f2f2;" border="1">
          <tbody>
            <tr style="background: #f4f8ff;">
              <td style="width: 50px;">序号</td>
              <td colspan="1">姓名</td>
              <td colspan="1">原房号</td>
              <td colspan="2">原房型</td>
              <td colspan="1">原房价</td>
              <td colspan="1">目地房号</td>
              <td colspan="2">目地房型</td>
              <td colspan="1">目地房价</td>
              <!-- <td colspan="1">换房理由</td> -->
              <td colspan="4">入住时间</td>
              <td colspan="4">操作时间</td>
              <td colspan="4">订单号</td>
              <td colspan="1">操作人</td>
              <!-- <td colspan="2">备注</td> -->
            </tr>
            <tr v-for="(item,index) in totalListArr">
              <td style="width: 50px;">{{index + 1}}</td>
              <td colspan="1">{{item.customer}}</td>
              <td colspan="1">{{item.old_room_info?item.old_room_info.room_number:''}}</td>
              <td colspan="2">{{item.old_room_info?item.old_room_info.room_name:''}}</td>
              <td colspan="1">{{item.old_room_info?item.old_room_info.price:''}}</td>
              <td colspan="1">{{item.new_room_info?item.new_room_info.room_number:''}}</td>
              <td colspan="2">{{item.new_room_info?item.new_room_info.room_name:''}}</td>
              <td colspan="1">{{item.new_room_info?item.new_room_info.price:''}}</td>
              <!-- <td colspan="1">学号</td> -->
              <td colspan="4">{{item.come_time}}</td>
              <td colspan="4">{{item.create_time}}</td>
              <td :title="item.order_no" colspan="4">{{item.order_no}}</td>
              <td colspan="1">{{item.operator}}</td>
              <!-- <td :title="item.remack" colspan="2">{{item.remack}}</td> -->
            </tr>
          </tbody>
        </table>
        <p style="margin-top: 10px;" class="clearfix">
          <span class="fl">
            <span>第{{1}}页</span>
          </span>
          <span class="fr">
            <span v-if="isPrint">打印人：{{curUser.name}}</span>
            <span v-else>共记：{{totalListArr.length}}条记录</span>
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import API from "@/store/API"
  export default {
    name: 'historicalRoomExchange',
    data() {
      return {
        dateTimes: [],
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now()
          }
        },
        isPrint: false,
        startDate: '',
        endDate: '',
        startDateTime: '',
        endDateTime: '',
        totalListArr: []
      }
    },
    methods: {
      setisPrint() {
        this.isPrint = !this.isPrint
      },
      getTotalList() {
        this.isPrint = false
        if (!this.dateTimes.length) {
          this.$message.error('请选择日期')
          return
        }
        let obj = {
          id: this.hotel.id,
          start_time: this.dateTimes[0],
          end_time: this.dateTimes[1]
        }
        API.post("/pms/finance/changeRoom",obj).then(res => {
          if (res.error_code == 0) {
            this.totalListArr = res.data
          } else {
            if (res.msg) {
              this.$message({
                message: `${res.msg}`,
                type: 'warning'
              })
            }
          }
        })
      },
      start() {
        let d = new Date()
        let yaer = d.getFullYear()
        let month = d.getMonth() + 1
        let date = d.getDate()
        let hour = d.getHours()
        let min = d.getMinutes()
        let sec = d.getSeconds()
        let str = d.getDay()
        this.startDate = [`${yaer}-${month<10?'0'+month:month}-${date<10?'0'+date:date}`,`${hour<10?'0'+hour:hour}:${min<10?'0'+min:min}:${sec<10?'0'+sec:sec}`].join(' ')
        this.endDate = this.startDate
      }
    },
    computed: {
      ...mapGetters({
        hotel:'currHotel',
        curUser: 'user'
      }),
    },
    created() {
      this.start()
      this.getTotalList()
    },
    mounted() {
    }
  }
</script>

<style lang="scss" scoped>
  .historicalroomexchange {
    user-select: none;
    font-size: 12px;
    position: relative;
    input{
      height: 28px;
      border: 1px solid #f2f2f2;
      border-radius: 4px;
    }
    table{
      table-layout:fixed;
      word-break:break-all;
    }
    td{
      height: 40px;
      text-align: center;
      word-wrap: break-word;
    }
    .white-text{
      width: 100%;
      box-sizing: border-box;
      background: #fff;
      padding-bottom: 30px;
    }
    .search{
      padding-left: 35px;
      background: #f2f2f2;
      padding-bottom:10px;
      .search-li{
        margin-right: 14px;
      }
      .btnserch{
        dispaly: block;
        background: #437ff9;
        color: #fff;
        cursor: pointer;
        line-height: 28px;
        width: 100px;
        border-radius: 4px;
        text-align: center;
      }
    }
    .line{
      width: 100%;
      border-bottom: 1px solid #f2f2f2;
      margin-bottom: 20px;
    }
  }
</style>