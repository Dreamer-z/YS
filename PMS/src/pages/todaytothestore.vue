<template>
  <div class="todaytothestore">
    <div class="white-text">
      <ol class="search">
        <li class="btnserch middle search-li">
          <span>导出</span>
        </li>
        <li @click="setisPrint" class="btnserch middle search-li">
          <span>打印</span>
        </li>
      </ol>
      <div class="line"></div>
      <div style="paddingLeft:35px;paddingRight:35px;boxSize:borderBox;" id="tab-list">
        <table>
          <caption>
            <h2>今日到店成员报表</h2>
          </caption>
          <thead>
            <tr style="margin-top: 20px;margin-bottom: 10px;">
              <td style="text-align: left;height:30px;">
                <span>酒店：</span>
                <span>{{hotel.hotel_name}}</span>
              </td>
              <td style="text-align: right;height:30px;">
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
              <td colspan="3">房型</td>
              <td colspan="1">房号</td>
              <td colspan="1">价格</td>
              <td colspan="4">到达时间</td>
              <td colspan="4">预离时间</td>
              <td colspan="1">姓名</td>
              <td colspan="1">性别</td>
              <td colspan="2">电话</td>
              <td colspan="1">证件类型</td>
              <td colspan="4">证件号</td>
            </tr>
            <tr :key="index" v-for="(item,index) in totalListArr">
              <td style="width: 50px;">{{index + 1}}</td>
              <td colspan="3">{{item.room_name}}</td>
              <td colspan="1">{{item.room_number}}</td>
              <td colspan="1">{{item.room_price}}</td>
              <td colspan="4">{{item.come_time}}</td>
              <td colspan="4">{{item.leave_time}}</td>
              <td colspan="1">{{item.name}}</td>
              <td colspan="1">{{item.member_sex}}</td>
              <td colspan="2">{{item.member_mobile}}</td>
              <td colspan="1">{{item.member_idcard_type}}</td>
              <td colspan="4">{{item.member_idCard}}</td>
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
    name: 'todayToTheStore',
    data() {
      return {
        isPrint: false,
        totalListArr: [],
        startDate: '',
        endDate: ''
      }
    },
    methods: {
      setisPrint() {
        this.isPrint = !this.isPrint
      },
      getTotalList() {
        this.isPrint = false
        API.post("pms/finance/today", {id: this.hotel.id}).then(res =>{
          if (res.error_code == 0 ){
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
  .todaytothestore {
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
      background: #f2f2f2;
      padding-bottom:10px;
      padding-left:35px;
      .search-li{
        margin-right: 14px;
      }
      .btnserch{
        display: inline-block;
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
      margin-bottom: 10px;
    }
  }
</style>