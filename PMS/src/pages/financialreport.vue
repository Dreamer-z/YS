<template>
  <div class="financialreport">
    <div class="white-text">
      <div style="background:#f2f2f2;paddingLeft:35px;paddingRight:35px;boxSize:borderBox;">
        <div class="list aliTop">
          <ul>
            <el-checkbox style="marginRight:20px;" v-model="isCheckAll" class="middle" label="all" @change="getAllArriveTimeClass">全部</el-checkbox>
            <el-checkbox-group class="middle" v-model="selectedTagArr">
              <el-checkbox v-for="(val,key,index) in tagListArr" :label="key"
              :key="index">{{val.name}}</el-checkbox>
            </el-checkbox-group>
          </ul>
        </div>
        <ol class="search">
          <li class="middle search-li">
            <p class="middle">
              <span class="middle">收银员</span>
              <span class="middle">：</span>
            </p>
            <el-select class="middle" @change="setStaffer" v-model="staff" size="mini" filterable placeholder="请选择">
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
            <el-select class="middle" @change="setWokerTime" v-model="woker" size="mini" filterable placeholder="请选择">
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
          <li @click="setisPrint" class="btnserch middle search-li">
            <!-- <span>打印</span> -->
            <el-button style="width:100px;" type="primary" size="mini">打印</el-button>
          </li>
        </ol>
      </div>
      <div class="line"></div>
      <div style="paddingLeft:35px;paddingRight:35px;boxSize:borderBox;" ref="print" id="tab-list">
        <table>
          <caption>
            <h2>
              收银入账明细报表
            </h2>
          </caption>
          <thead>
            <tr>
              <td style="text-align: left;">
                <span>酒店：</span>
                <span>{{hotel.hotel_name}}</span>
              </td>
              <td style="text-align: center;">
                <span>开始营业日：</span>
                <span>{{dateTimes[0]}}</span>
              </td>
              <td style="text-align: right;">
                <span>结束营业日：</span>
                <span>{{dateTimes[1]}}</span>
              </td>
            </tr>
            <tr>
              <td style="text-align: left;">
                <span>收银员：</span>
                <span>{{staffer?staffer:'全部'}}</span>
              </td>
              <td style="text-align: center;">
                <span>班次：</span>
                <span>{{worerTime?worerTime:'全部'}}</span>
              </td>
              <td  style="text-align: right;">
              </td>
            </tr>
          </thead>
        </table>
        <table id="tab" style="border-color:#f2f2f2;" border="1">
          <tbody>
            <tr style="background: #f4f8ff;">
              <td style="width: 50px;">序号</td>
              <td colspan="1">收银员</td>
              <td colspan="1">项目</td>
              <td colspan="4">订单号</td>
              <td colspan="1">房号</td>
              <td colspan="1">房型</td>
              <td colspan="1">姓名</td>
              <td colspan="2">原始凭证</td>
              <td colspan="1">消费</td>
              <td colspan="1">结算</td>
              <td colspan="3">备注</td>
              <!-- <td colspan="1">收银员</td> -->
              <td colspan="3">发生日期</td>
              <!-- <td colspan="2">备注</td> -->
            </tr>
            <tr :key="index" v-for="(item, index) in totalListArr">
              <td style="width: 50px;">{{index + 1}}</td>
              <td colspan="1">{{item.staff_name}}</td>
              <td colspan="1">{{item.project_name}}</td>
              <td colspan="4">{{item.order_no}}</td>
              <td colspan="1">{{item.room_number}}</td>
              <td colspan="1">{{item.room_name}}</td>
              <td colspan="1">{{item.name}}</td>
              <td colspan="2">{{item.voucher_number}}</td>
              <td colspan="1">{{item.total}}</td>
              <td colspan="1">{{item.total_pay}}</td>
              <td :title="item.remark" colspan="3">{{item.remark}}</td>
              <td colspan="3">{{item.create_time}}</td>
              <!-- <td colspan="2">{{item.remark}}</td> -->
            </tr>
          </tbody>
        </table>
        <p style="margin-top: 10px;" class="clearfix">
          <span class="fl">
            <span>第{{1}}页</span>
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
    name: 'financialReport',
    data() {
      return {
        dateTimes: [],
        isCheckAll:false,
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now()
          }
        },
        isPrint: false,
        totalListArr: [],
        tagListArr: [],
        staff:'',
        woker: '',
        worerTime: '',
        workListArr: [],
        staffListArr: [],   
        startDateTime: '',
        endDateTime: '',
        selectedTagArr: [],
        forPostselectedTagArr: [],
        staffer: ''
      }
    },
    watch: {
      selectedTagArr(newval,oldval) {
        console.log(newval)
        if (newval.length == 8) {
          this.isCheckAll = true
          this.forPostselectedTagArr = ['all']
        } else {
          this.isCheckAll = false
          this.forPostselectedTagArr = newval
        }
      }
    },
    methods: {
      getAllArriveTimeClass(e) {
        if(e) {
          this.selectedTagArr = []
          for (let name in this.tagListArr) {
            this.selectedTagArr.push(name)
          }
        } else {
          this.selectedTagArr = []
        }
      },
      setisPrint() { 
        this.isPrint = !this.isPrint
        this.$print(this.$refs.print) // 使用
      },
      setWokerTime(val) {
        this.workListArr.forEach((e,i)=>{
          if (e.work_id == val) {
            this.worerTime = e.name
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
      getTagList() {
        API.get("/pms/finance/search_meu?id=" + this.hotel.id).then(res=> {
          if (res.error_code == 0) {
            delete res.data.all
            this.tagListArr = res.data
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
          end_time: this.dateTimes[1],
          project: this.forPostselectedTagArr
        }
        API.post("/pms/finance/logList",obj).then(res => {
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
      }
    },
    computed: {
      ...mapGetters({
        hotel:'currHotel',
        curUser: 'user'
      }),
    },
    created() {
      this.getTagList()
      this.getTotalList()
      this.getStaffList()
      this.getWorkList()
    },
    mounted() {
    }
  }
</script>

<style lang="scss" scoped>
  .financialreport {
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
      // overflow: hidden;
      // white-space: nowrap;
      // text-overflow:ellipsis;
    }
    .white-text{
      width: 100%;
      box-sizing: border-box;
      background: #fff;
      padding-bottom: 30px;
    }
    .aliTop{
      display: inline-block;
      vertical-align: top;
    }
    .list{
      ul{
        li{
          margin-bottom: 6px;
          cursor: pointer;
          width: 126px;
          text-align: left;
          .checkbox{
            width: 18px;
            height: 18px;
            border: 1px solid #e5e5e5;
            border-radius: 2px;
            box-sizing: border-box;
          }
        }
      }
    }
    .search{
      .search-li{
        margin-right: 14px;
        margin-bottom: 15px;
        margin-top: 15px;
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