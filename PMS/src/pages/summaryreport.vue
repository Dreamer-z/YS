<template>
  <div class="summaryreport">
    <div class="white-text">
      <ol class="search">
        <li class="middle search-li">
          <p class="middle">
            <span class="middle">收银员</span>
            <span class="middle">：</span>
          </p>
          <!-- <input class="middle" type="text"> -->
          <el-select @change="setStaffer" v-model="staff" size="mini" filterable placeholder="请选择">
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
            <span class="middle">班次</span>
            <span class="middle">：</span>
          </p>
          <!-- <input class="middle" type="text"> -->
          <el-select @change="setWokerTime" v-model="woker" size="mini" filterable placeholder="请选择">
            <el-option
              v-for="item in workListArr"
              :key="item.work_id"
              :label="item.name"
              :value="item.work_id">
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
            <el-date-picker v-model="startDateTime" value-format="yyyy-MM-dd HH:mm:ss" size="mini" :picker-options="pickerOptions" type="datetime">
            </el-date-picker>
          </div>
          <span>至</span>
          <div class="date middle">
            <el-date-picker v-model="endDateTime" value-format="yyyy-MM-dd HH:mm:ss" size="mini" :picker-options="pickerOptions" type="datetime">
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
        <li @click="setPrint" class="btnserch middle search-li">
          <!-- <span>打印</span> -->
          <el-button style="width:100px;" type="primary" size="mini">打印</el-button>
        </li>
      </ol>
      <div class="line"></div>
      <div style="paddingLeft:35px;paddingRight:35px;boxSize:borderBox;" id="tab-list">
        <table>
          <caption style="margin-bottom: 10px;">
            <h2>收银入账汇总报表</h2>
          </caption>
          <thead>
            <tr>
              <td style="text-align: left;height: 30px;">
                <span>酒店：</span>
                <span>{{hotel.hotel_name}}</span>
              </td>
              <td style="text-align: cneter;height: 30px;">
                <span>开始营业时间：</span>
                <span>{{dateTimes[0]}}</span>
              </td>
              <td style="text-align: right;height: 30px;">
                <span>开始营业时间：</span>
                <span>{{dateTimes[1]}}</span>
              </td>
            </tr>
            <tr>
              <td style="text-align: left;height: 30px;">
                <span>收银员：</span>
                <span>{{staffer?staffer:'全部'}}</span>
              </td>
              <td style="text-align: cneter;height: 30px;">
                <span>班次：</span>
                <span>{{wokerTime?wokerTime:'全部'}}</span>
              </td>
              <td style="text-align: right;height: 30px;">
              </td>
            </tr>
          </thead>
        </table>
        <table id="tab" style="border-color:#f2f2f2;" border="1">
          <tbody>
            <tr style="background: #f4f8ff;">
              <td colspan="1">收银员</td>
              <td colspan="4">订单号</td>
              <td colspan="1">房号</td>
              <td colspan="1">姓名</td>
              <td colspan="2">原始凭证</td>
              <td colspan="1">消费</td>
              <td colspan="1">结算</td>
              <td colspan="3">发生日期</td>
              <!-- <td colspan="3">备注</td> -->
            </tr>
          </tbody>
          <tbody v-for="(item,index) in totalList" :key="index">
            <tr>
              <td style="text-indent: 10px;text-align: left;" colspan="14">
                <h3 style="font-weight: bold;">{{item.name}}</h3>
              </td>
            </tr>
            <tr v-for="(data,n) in item.list" :key="n">
              <td colspan="1">{{data.staff_name}}</td>
              <td colspan="4">{{data.order_no}}</td>
              <td colspan="1">{{data.room_number}}</td>
              <td colspan="1">{{data.name}}</td>
              <td colspan="2">{{data.voucher_number}}</td>
              <td colspan="1">{{data.total}}</td>
              <td colspan="1">{{data.total_pay}}</td>
              <td colspan="3">{{data.create_time}}</td>
              <!-- <td colspan="3">{{data.remark}}</td> -->
            </tr>
            <tr>
              <td style="text-align: right;" colspan="9">
                <span style="margin-right: 20px;">合计：</span>
              </td>
              <td colspan="1">{{item.total}}</td>
              <td colspan="1">{{item.total_pay}}</td>
              <td colspan="3"></td>
            </tr>
          </tbody>
        </table>
        <p style="margin-top: 10px;" class="clearfix">
          <span class="fl">
            <span>第{{1}}页</span>
          </span>
          <span class="fr">
            <span v-if="isPrint">打印人：{{curUser.name}}</span>
            <span v-else>共：{{totalListLength}}条记录</span> 
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
    name: 'summaryReport',
    data() {
      return {
        dateTimes:[],
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now()
          }
        },
        isPrint: false,
        wokerTime: '',
        staffer: '',
        woker: '',
        staff: '',
        totalList: {},
        workListArr: [],
        staffListArr: [],
        startDateTime: '',
        endDateTime: '',
      }
    },
    methods: {
      setPrint() {
        this.isPrint = !this.isPrint
        // console.log('111111111')
        // this.isPrint = true
        // let old = window.document.body.innerHTML
        // let printhtml = document.querySelector('#tab-list').innerHTML
        // window.document.body.innerHTML = printhtml
        // window.document.body.innerHTML=old;
        // window.print();
        // let sprnstr="<!--startprint-->";
        // let eprnstr="<!--endprint-->";
        // printhtml=printhtml.substring(printhtml.indexOf(sprnstr)+18);
        // printhtml=printhtml.substring(0,printhtml.indexOf(eprnstr));
        // window.print();
        //  window.document.body.innerHTML = old
        // window.reload()
      },
      setWokerTime(val) {
        this.workListArr.forEach((e,i)=>{
          if (e.work_id == val) {
            this.wokerTime = e.name
          }
        })
      },
      setStaffer(val) {
        this.staffListArr.forEach((e,i)=>{
          if (e.id == val) {
            this.staffer = e.name
          }
        })
      },
      getWorkList() {
        API.get("/pms/finance/work_list?id=" + this.hotel.id).then(res=> {
          if (res.error_code == 0) {
            this.workListArr = res.data
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
      getTotalList() {
        this.isPrint = false
        if (!this.dateTimes.length) {
          this.$message.error('请选择日期')
          return
        }
        let obj = {
          id: this.hotel.id,
          staff_id: this.staff,
          work_id: this.woker,
          start_time: this.dateTimes[0],
          end_time: this.dateTimes[1]
        }
        // for(let name)
        API.post("/pms/finance/incomeSummary",obj).then(res => {
          if (res.error_code == 0) {
            this.totalList = res.data
          } else {
            if (res.msg) {
              this.$message({
                message: `${res.msg}`,
                type: 'warning'
              })
            }
          }
        })
      }
    },
    computed: {
      ...mapGetters({
        hotel:'currHotel',
        curUser: 'user'
      }),
      totalListLength () {
        if (Object.keys(this.totalList).length) {
          let n = 0
          let arr = Object.values(this.totalList)
          arr.forEach((e,i) => {
            n += e.list.length
          })
          return n
        }
      }
    },
    created() {
      this.getTotalList()
      this.getWorkList()
      this.getStaffList()
    },
    mounted() {
    }
  }
</script>

<style lang="scss" scoped>
  .summaryreport {
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
      padding-bottom: 10px;
      padding-left:35px;
      .search-li{
        margin-right: 14px;
      }
      .btnserch{
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