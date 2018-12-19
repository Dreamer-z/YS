<template>
  <div class="outofstorereport">
    <div class="white-text">
      <ol class="search">
        <li class="middle search-li">
          <p class="middle">
            <span class="middle">收银员</span>
            <span class="middle">：</span>
          </p>
          <!-- <input class="middle" type="text"> -->
          <el-select class="middle" v-model="staff" size="mini" filterable placeholder="请选择">
            <el-option
              v-for="item in staffListArr"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </li>
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
        <li @click="getLeaveList" class="btnserch middle search-li">
          <!-- <span>搜索</span> -->
          <el-button style="width:100px;" type="primary" size="mini">搜索</el-button>
        </li>
        <li @click="download" class="btnserch middle search-li">
          <!-- <a ref="load" href="#"><span>导出</span></a> -->
          <el-button style="width:100px;" type="primary" size="mini">搜索</el-button>
        </li>
        <li @click="printOut" class="btnserch middle search-li">
          <!-- <span>打印</span> -->
          <el-button style="width:100px;" type="primary" size="mini">打印</el-button>
        </li>
      </ol>
      <div class="line"></div>
      <div style="paddingLeft:35px;paddingRight:35px;boxSize:borderBox;" ref="print" id="tab-list">
        <table>
          <caption>
            <h2>历史离店报表</h2>
          </caption>
          <thead>
            <tr style="lineHeight: 30px;">
              <td style="text-align: left;">
                <span>酒店：</span>
                <span>{{hotel.hotel_name}}</span>
              </td>
              <td style="text-align: right;">
                <span>开始营业日：</span>
                <span>{{dateTimes[0]}}</span>
              </td>
            </tr>
          </thead>
          <!-- <tr>
            <td >订单号</td>
          </tr> -->
        </table>
        <table id="tab" style="border-color:#f2f2f2;" border="1">
          
          <tbody>
            <!-- <tr>
              <td style="textAlign:center;" colspan="27">历史离店报表</td>
            </tr> -->
            <tr style="background: #f4f8ff;">
              <td rowspan="2" colspan="4">订单号</td>
              <td rowspan="2" colspan="1">房号</td>
              <td rowspan="2" colspan="2">房间类型</td>
              <td rowspan="2" colspan="1">房价</td>
              <td rowspan="2" colspan="1">姓名</td>
              <td rowspan="2" colspan="2">入住时间</td>
              <td rowspan="2" colspan="2">离店时间</td>
              <td colspan="4">消费</td>
              <td colspan="8">结算</td>
              <td rowspan="2" colspan="2">操作员</td>
            </tr>
            <tr style="background: #f4f8ff;">
              <td>房费</td>
              <td>商品</td>
              <td>其他</td>
              <td>合计</td>
              <td>微信</td>
              <td>支付宝</td>
              <td>储蓄卡</td>
              <td>信用卡</td>
              <td>积分</td>
              <td>余额</td>
              <td>现金</td>
              <td>合计</td>
            </tr>
            <tr :key="index" v-if="totalListArr.length" v-for="(item,index) in totalListArr">
              <td style="textAlign:center;" colspan="4">{{item.order_no.toString()}}</td>
              <td colspan="1">{{item.room_number}}</td>
              <td colspan="2">{{item.room_name}}</td>
              <td colspan="1">{{item.room_price}}</td>
              <td colspan="1">{{item.name}}</td>
              <td colspan="2">
                <p>{{item.come_time.split(' ')[0]}}</p>
                <p>{{item.come_time.split(' ')[1]}}</p>
              </td>
              <td colspan="2">
                <p>{{item.leave_time.split(' ')[0]}}</p>
                <p>{{item.leave_time.split(' ')[1]}}</p>
              </td>
              <td colspan="1">{{item.room_fee}}</td>
              <td colspan="1">{{item.goods_total}}</td>
              <td colspan="1">{{item.other_total}}</td>
              <td colspan="1">{{Number(item.room_fee) + Number(item.goods_total) + Number(item.other_total)}}</td>
              <td colspan="1">{{item.pay_list['wx']?item.pay_list['wx'].amount:''}}</td>
              <td colspan="1">{{item.pay_list['ali']?item.pay_list['ali'].amount:''}}</td>
              <td colspan="1">{{item.pay_list['bank']?item.pay_list['bank'].amount:''}}</td>
              <td colspan="1">{{item.pay_list['xingyong']?item.pay_list['xingyong'].amount:''}}</td>
              <td colspan="1">{{item.pay_list['jifen']?item.pay_list['jifen'].amount:''}}</td>
              <td colspan="1">{{item.pay_list['yuer']?item.pay_list['yuer'].amount:''}}</td>
              <td colspan="1">{{item.pay_list['cash']?item.pay_list['cash'].amount:''}}</td>
              <td colspan="1">{{item.settle_money}}</td>
              <td colspan="2">{{item.operator}}</td>
            </tr>
          </tbody>
        </table>
        <p style="margin-top: 10px;" class="clearfix">
          <span class="fl">
            <span>第{{1}}页,</span>
            <!-- <span>共{{10}}页</span> -->
          </span>
          <span class="fr">
            <span v-if="isPrint">打印人：{{curUser.name}}</span>
            <span v-else>共计{{totalListArr.length}}条记录</span>
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
    name: 'outOfStoreReport',
    data() {
      return {
        dateTimes:[],
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now()
          }
        },
        staff: '',
        totalListArr: [],
        staffListArr: [],
        isPrint: false,
        startDateTime: '',
        endDateTime: ''
      }
    },
    methods: {
      download() {
        // 使用outerHTML属性获取整个table元素的HTML代码（包括<table>标签），然后包装成一个完整的HTML文档，设置charset为urf-8以防止中文乱码
        let html = "<html><head><meta charset='utf-8' /></head><body>" + this.$refs.print.outerHTML + "</body></html>";
        // console.log(this.$refs.print.outerHTML)

        // 实例化一个Blob对象，其构造函数的第一个参数是包含文件内容的数组，第二个参数是包含文件类型属性的对象

        let blob = new Blob([html], { type: "application/vnd.ms-excel" })

        let a = this.$refs.load

        // 利用URL.createObjectURL()方法为a元素生成blob URL
        a.href = URL.createObjectURL(blob);
        // 设置文件名，目前只有Chrome和FireFox支持此属性
        a.download = "aaaa.xls";
        a = null
      },
      getStaffList() {//this.hotel.id
        API.get("/pms/finance/get_staff_list?id=" + this.hotel.id).then(res => {
          if (res.error_code == 0) {
            this.staffListArr = res.data
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
      getLeaveList() {
        this.isPrint = false
        if (this.startDateTime != '' || this.endDateTime != '') {
          let start = new Date(this.startDateTime).getTime()
          let end = new Date(this.endDateTime).getTime()
          if (start >= end) {
            this.$message({
              message: '日期选择错误',
              type: 'warning'
            })
            return          
          }
        }
        let obj = {
          id:1,// this.hotel.id,    //  1,
          staff_id: this.staff,
          start_time: this.startDateTime,
          end_time: this.endDateTime
        }
        API.post("/pms/finance/leave",obj).then(res=>{
          if (res.error_code == 0) {
            this.totalListArr = res.data
          } else {
            if (res.msg) {
              this.$message.error(`${res.msg}`)
            }
          }
        })
      },
      serchList() {
        this.isPrint = false
      },
      printOut() {
        this.isPrint = !this.isPrint
        this.$print(this.$refs.print) // 使用
      }
    },
    computed: {
      ...mapGetters({
        hotel:'currHotel',
        curUser: 'user'
      }),
    },
    created() {
      this.getLeaveList()
      this.getStaffList()
    },
    mounted() {
    }
  }
</script>

<style lang="scss" scoped>
  .outofstorereport {
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
      padding-left:35px;
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