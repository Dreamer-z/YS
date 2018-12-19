<template>
  <div class="cashierreceiptsreport">
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
          <el-date-picker
            v-model="totalTimes"
            value-format="yyyy-MM-dd"
            size="mini"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
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
          <span>搜索</span>
        </li>
        <li class="btnserch middle search-li">
          <span>导出</span>
        </li>
        <li @click="setPrint" class="btnserch middle search-li">
          <span>打印</span>
        </li>
      </ol>
      <div class="line"></div>
      <!--startprint-->
      <div style="paddingLeft:35px;paddingRight:35px;">
        <div ref="print" id="tab-list">
          <table>
            <caption style="margin-bottom:10px;">
              <h2>收银员收款报表</h2>
            </caption>
            <thead>
              <tr style="margin-top: 20px;">
                <td style="text-align: left;height: 30px;">
                  <span>酒店：</span>
                  <span>{{hotel.hotel_name}}</span>
                </td>
                <td style="text-align: cneter;height: 30px;">
                  <span>开始营业时间：</span>
                  <span>{{startDateTime}}</span>
                </td>
                <td style="text-align: right;height: 30px;">
                  <span>结束营业时间：</span>
                  <span>{{endDateTime}}</span>
                </td>
              </tr>
              <tr style="margin-top: 20px;">
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
          <div class="clearfix">
            <div style="border:1px solid #e5e5e5;borderBottom:none;" class="tab-left fl">
              <table style="border-color:#f2f2f2;">
                <tbody>
                  <tr style="background: #f2f2f2;">
                    <td style="height: 30px;text-align:left;" colspan="7">
                      <span style="margin-left: 16px;">收入</span>
                    </td>
                  </tr>
                  <tr class="hover" style="borderBottom:1px solid #e5e5e5;" v-for="(item,index) in getMoneyArr">
                    <td style="height: 30px;" colspan="1">{{index + 1}}</td>
                    <td style="height: 30px;" colspan="3">{{item.name}}</td>
                    <td style="height: 30px;" colspan="3">{{item.amount}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="tab-right fl">
              <table style="border-color:#f2f2f2;" border="1">
                <tbody>
                  <tr style="background: #f2f2f2;">
                    <td style="height: 30px;text-align:left;" colspan="7">
                      <span style="margin-left: 16px;">消费项目汇总</span>
                    </td>
                  </tr>
                  <tr class="hover" v-for="(item,index) in consumption.g_list">
                    <td style="height: 30px;borderRight:0;" colspan="1">{{index + 1}}</td>
                    <td style="height: 30px;" colspan="3">{{item.goods_name}}</td>
                    <td style="height: 30px;" colspan="3">{{item.goods_total}}</td>
                  </tr>
                  <tr>
                    <td style="height: 30px;text-align:right" colspan="4">
                      <span style="margin-right: 16px;">合计：</span>
                    </td>
                    <td style="height: 30px;text-align:right" colspan="3">
                      <span style="margin-right: 16px;">{{consumption.total}}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <p style="margin-top: 10px;" class="clearfix">
            <span class="fl">
              <span>第{{1}}页</span>
            </span>
            <span class="fr">
              <span v-if="isPrint">打印人：{{curUser.name}}</span>
              <!-- <span v-else>共计{{totalListArr.length}}条记录</span> -->
            </span>
          </p>
          <!--endprint-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import API from "@/store/API"
  export default {
    name: 'cashierReceiptsReport',
    data() {
      return {
        totalTimes:[],
        textprint: false,
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
        staffListArr: [],
        workListArr: [],
        getMoneyArr: [],
        consumption: {},
        endDateTime: '',
        startDateTime: ''
      }
    },
    methods: {
      setPrint() {
        this.textprint = true
        this.isPrint = !this.isPrint
        this.$print(this.$refs.print) // 使用
        
        // this.isPrint = true
        // let old = window.document.body.innerHTML
        // let printhtml = document.querySelector('#tab-list').innerHTML
        // let sprnstr="<!--startprint-->";
        // let eprnstr="<!--endprint-->";
        // printhtml=printhtml.substring(printhtml.indexOf(sprnstr)+18);
        // printhtml=printhtml.substring(0,printhtml.indexOf(eprnstr));
        // window.document.body.innerHTML=printhtml;
        // window.print();
        // window.document.body.innerHTML= old;
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
          id: this.hotel.id,// this.hotel.id
          staff_id: this.staff,
          work_id: this.woker,
          start_time: this.startDateTime,
          end_time: this.endDateTime
        }
        API.post("/pms/finance/finance_info",obj).then(res => {
          if (res.error_code == 0) {
            this.getMoneyArr = res.data.total_list
            this.consumption = res.data.goods_info
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
    },
    created() {
      this.getTotalList()
      this.getStaffList()
      this.getWorkList()
    },
    mounted() {
    }
  }
</script>

<style lang="scss" scoped>
  .cashierreceiptsreport {
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
    .hover:hover{
      background: #f0f9fe;
    }
    .white-text{
      width: 100%;
      box-sizing: border-box;
      // padding-left: 35px;
      background: #fff;
      // padding-top: 15px;
      padding-bottom: 30px;
      // padding-right: 35px;
    }
    .search{
      padding-right: 35px;
      padding-left: 35px;
      background: #f2f2f2;
      .search-li{
        margin-right: 14px;
        margin-bottom: 15px;
        // margin-top: 20px;
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
    .tab-right,.tab-left{
      width: 33%;
    }
    .tab-left{
      margin-right: 20px;
    }
  }
</style>