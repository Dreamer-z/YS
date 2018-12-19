<template>
  <div class="consumergoods">
    <div class="white-text">
      <div  style="background:#f2f2f2;paddingLeft:35px;">
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
              <span class="middle">班次</span>
              <span class="middle">：</span>
            </p>
            <!-- <input class="middle" type="text"> -->
            <el-select class="middle" v-model="woker" size="mini" filterable placeholder="请选择">
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
        </ol>
        <ul style="paddingBottom:10px;">
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
        </ul>
      </div>
      <div class="line"></div>
      <div style="paddingLeft:35px;paddingRight:35px;boxSize:borderBox;" id="tab-list">
        <table>
          <caption>
            <h2>商品消费明细</h2>
          </caption>
          <thead>
            <tr style="margin-top: 20px;margin-bottom: 10px;">
              <td style="flex:1;text-align: left;height: 40px;">
                <span>酒店：</span>
                <span>{{hotel.hotel_name}}</span>
              </td>
              <td style="text-align: center;height: 40px;">
                <span>开始营业日：</span>
                <span>{{dateTimes[0]}}</span>
              </td>
              <td style="text-align: right;height: 40px;">
                <span>结束营业日：</span>
                <span>{{dateTimes[1]}}</span>
              </td>
            </tr>
          </thead>
        </table>
        <table id="tab" style="border-color:#f2f2f2;" border="1">
          <tbody>
            <tr style="background: #f4f8ff;">
              <td colspan="1">房号</td>
              <td colspan="4">订单号</td>
              <td colspan="1">姓名</td>
              <td colspan="2">消费项目</td>
              <td colspan="1">数量</td>
              <td colspan="1">总价格</td>
              <td colspan="1">录入人</td>
              <td colspan="4">消费时间</td>
              <td colspan="1">收银员</td>
            </tr>
            <tr v-for="(item) in totalListArr">
              <td colspan="1">{{item.room_number}}</td>
              <td colspan="4">{{item.order_no}}</td>
              <td colspan="1">{{item.member_name}}</td>
              <td colspan="2">{{item.goods_name}}</td>
              <td colspan="1">{{item.goods_num}}</td>
              <td colspan="1">{{item.total}}</td>
              <td colspan="1">{{item.staff_name}}</td>
              <td colspan="4">{{item.create_time}}</td>
              <td colspan="1">{{item.staff_name}}</td>
            </tr>
          </tbody>
        </table>
        <p style="margin-top: 10px;" class="clearfix">
          <span class="fl">
            <span>第{{1}}页</span>
          </span>
          <span class="fr">
            <span v-if="isPrint">打印人：{{curUser.name}}</span>
            <span v-else>共：{{totalListArr.length}}条记录</span>
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
    name: 'consumerGoods',
    data() {
      return {
        dateTimes: [],
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now()
          }
        },
        isPrint: false,
        staff: '',
        woker: '',
        workListArr: [],
        staffListArr: [],
        startDateTime: '',
        endDateTime: '',
        totalListArr: [],
      }
    },
    methods: {
      setisPrint() {
        this.isPrint = !this.isPrint
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
        let obj = {
          id: this.hotel.id,// this.hotel.id
          staff_id: this.staff,
          work_id: this.woker,
          start_time: this.dateTimes[0],
          end_time: this.dateTimes[1]
        }
        // for(let name)
        API.post("/pms/finance/consumption",obj).then(res => {
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
      this.getWorkList()
      this.getStaffList()
      this.getTotalList()
    },
    mounted() {
    }
  }
</script>

<style lang="scss" scoped>
  .consumergoods {
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
      margin-bottom: 15px;
    }
    .search-li{
      margin-right: 14px;
    }
    .btnserch{
      width: 100px;
      border-radius: 4px;
      text-align: center;
    }
    .line{
      width: 100%;
      border-bottom: 1px solid #f2f2f2;
      margin-bottom: 20px;
    }
  }
</style>