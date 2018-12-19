<template>
  <div class="manager-statement">
    <header>
      <clum-bread :redStar="false" :data="['当前位置','报表','经理日报表']"></clum-bread>
      <div style="marginTop: 10px;">
        <span>营业日：</span>
        <el-date-picker
          v-model="startDate"
          align="right"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择日期"
          :picker-options="json.pickerOptions">
        </el-date-picker>
        <p @click="getSearch(startDate)" style="width:60px;marginLeft:10px;" class="btn middle">查询</p>
        <p style="width:60px;marginLeft:10px;" class="btn middle">导出</p>
        <p  @click="printOut" style="width:60px;marginLeft:10px;" class="btn middle">打印</p>
        <p style="width:100px;" class="btn fr">计算公式</p>
      </div>
      <p class="line"></p>
    </header>
    <div v-if="data.length" ref="print" style="fontSize: 9px;" class="contain">  <!-- be-none -->
      <h2 style="textAlign:center;fontWeight: bold;fontSize: 16px;marginBottom: 35px;">经理日报表</h2>
      <table style="table-layout:fixed;">
        <thead>
          <tr style="fontSize: 9px;"> <!--  margin-top: 20px;margin-bottom: 10px; -->
            <td style="text-align: left;">
              <span>操作员：</span>
              <span>{{curUser.name}}</span>
            </td>
            <td style="text-align: center;">
              <span>营业日：</span>
              <span>{{startDate}}</span>
            </td>
            <td style="text-align: right;">
              <span>打印时间：</span>
              <span>{{printTime}}</span>
            </td>
          </tr>
        </thead>
      </table>
      <table style="border-color:#000;margin-top:10px;table-layout:fixed;" border="1">
        <tr style="fontSize:6px;textAlign:center;fontWeight: bold;background: #f5f5f5;">
          <td style="lineHeight:18px;height: 18px;" colspan="20">项目</td>
          <td style="lineHeight:18px;height: 18px;" colspan="9">本日发生</td>
          <td style="lineHeight:18px;height: 18px;" colspan="10">本月累计</td>
          <td style="lineHeight:18px;height: 18px;" colspan="10">上月同期</td>
          <td style="lineHeight:18px;height: 18px;" colspan="10">上年同月</td>
          <td style="lineHeight:18px;height: 18px;" colspan="12">本年累计</td>
          <td style="lineHeight:18px;height: 18px;" colspan="12">上年同期</td>
          <td style="lineHeight:18px;height: 18px;" colspan="8">年增长率</td>
        </tr>
        <tbody v-for="(item,index) in noneMegerArr" :key="index">
          <tr>
            <td style="lineHeight:18px;height: 18px;textAlign:left;fontWeight: bold;fontSize:6px;background: #f5f5f5;" colspan="91">{{item.name}}</td>
          </tr>
          <tr v-for="(v,n) in item.data[0].list" :key="n" style="fontSize:6px;textAlign:center;">
            <td v-if="n == 0" :rowspan="item.data[0].list.length" colspan="4">{{item.data[0].name}}</td>
            <td style="lineHeight:18px;height: 18px;textAlign:left;textIndent:24px;" colspan="16">{{v.name}}</td>
            <td style="lineHeight:18px;height: 18px;" colspan="9">{{v.today_total}}</td>
            <td style="lineHeight:18px;height: 18px;" colspan="10">{{v.month_total}}</td>
            <td style="lineHeight:18px;height: 18px;" colspan="10">{{v.last_month_same_period}}</td>
            <td style="lineHeight:18px;height: 18px;" colspan="10">{{v.last_year_month}}</td>
            <td style="lineHeight:18px;height: 18px;" colspan="12">{{v.year_total}}</td>
            <td style="lineHeight:18px;height: 18px;" colspan="12">{{v.last_year_same_period}}</td>
            <td style="lineHeight:18px;height: 18px;" colspan="8">{{v.year_growth_rate}}</td>
          </tr>
        </tbody>
      </table>
      <table style="border-color:#000;table-layout:fixed;border-top:0;" border="1" v-for="(item,index) in needMergeArr" :key="index">
        <tr>
          <td style="lineHeight:18px;height: 18px;textAlign:left;fontWeight: bold;fontSize:6px;background: #f5f5f5;" colspan="91">{{item.name}}</td>
        </tr>
        <tbody v-for="(val,num) in item.data" :key="num">
          <tr v-for="(v,n) in val.list" :key="n" style="fontSize:4px;textAlign:center;">
            <td style="lineHeight:25px;" v-if="n == 0" :rowspan="val.list.length" colspan="4">{{val.name}}</td>
            <td style="lineHeight:18px;height: 18px;textAlign:left;textIndent:24px;" colspan="16">{{v.name}}</td>
            <td style="lineHeight:18px;height: 18px;" colspan="9">{{v.today_total}}</td>
            <td style="lineHeight:18px;height: 18px;" colspan="10">{{v.month_total}}</td>
            <td style="lineHeight:18px;height: 18px;" colspan="10">{{v.last_month_same_period}}</td>
            <td style="lineHeight:18px;height: 18px;" colspan="10">{{v.last_year_month}}</td>
            <td style="lineHeight:18px;height: 18px;" colspan="12">{{v.year_total}}</td>
            <td style="lineHeight:18px;height: 18px;" colspan="12">{{v.last_year_same_period}}</td>
            <td style="lineHeight:18px;height: 18px;" colspan="8">{{v.year_growth_rate}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else style="width:100%;color:red;textAlign:center;fontSize:18px;">暂无数据</p>
  </div>
</template>

<script>
import API from "@/store/API"
import { mapGetters } from 'vuex'
import clumBread from "@/components/public/clumbread"
  export default {
    name: 'managerStatement',
    data() {
      return {
        nowHour: '',
        json: {
          // pickerOptions: {
          //   disabledDate(time) {
          //     // console.log('0010.0',new Date().getHours())
          //     return time.getTime() > Date.now()
          //   }
          // }
        },
        startDate: '',
        printTime: '',
        needMergeArr: [],
        noneMegerArr: [],
        payWay: '',
        data: []
        //002
      }
    },
    components: {
      clumBread
    },
    methods: {
      getSearch(Date) {
        API.get(`/pms/finance/manager?id=${this.hotel.id}&checkdate=${Date}`).then(res => {
          if (res.error_code == 0) {
            // alert(res.data)
            this.data = res.data
            let arr = res.data
            this.needMergeArr = []
            this.noneMegerArr = []
            arr.forEach((e,i) => {
              if (e.data[0].name) {
                this.needMergeArr.push(e)
              } else {
                this.noneMegerArr.push(e)
              }
            })
          }
        })
      },
      printOut() {
        this.getDateNow()
        this.$nextTick(() => {
          this.$print(this.$refs.print)
        })
      },
      getDateNow() {
				let mydate = new Date()
				let year = mydate.getFullYear()
				let month = (mydate.getMonth() + 1) < 10 ? '0' + (mydate.getMonth() + 1) : mydate.getMonth() + 1
				let date = mydate.getDate() < 10 ? '0' + mydate.getDate() : mydate.getDate()
				let taday = `${year}-${month}-${date}`
				let hour = mydate.getHours()
				let minutes = mydate.getMinutes()
				let seconds = mydate.getSeconds();
        this.printTime = [taday, `${hour<10?'0'+hour:hour}:${minutes<10?'0'+minutes:minutes}:${seconds<10?'0'+seconds:seconds}`].join(' ');
			}
    },
    created() {
      let date = new Date()
      let year = date.getFullYear()
      let month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
      let dat = (date.getDate() - 1) < 10 ? '0' + (date.getDate() - 1) : (date.getDate() - 1)
      this.startDate = `${year}-${month}-${dat}`
      this.getSearch(this.startDate)
      
      // this.nowHour = date.getHours()
      if (date.getHours() >= 15) {
        this.$set(this.json,"pickerOptions",
          {
            disabledDate(time) {
              return time.getTime() > Date.now()
            }
          }
        )
      } else {
        this.$set(this.json,"pickerOptions",
          {
            disabledDate(time) {
              return time.getTime() > Date.now() - 24*60*60*1000
            }
          }
        )
      }
    },
    computed: {
			...mapGetters({
        hotel:'currHotel',
        curUser: 'user'
      })
		}
  }
    
</script>

<style lang="scss" scoped>
  .manager-statement{
    width: 100%;
    // min-height: px;
    min-height: 100%;
    // overflow-y: auto;
    .btn{
      height: 30px;
      background: #437ff9;
      line-height: 30px;
      text-align: center;
      color: #fff;
      cursor: pointer;
      border-radius: 4px;
    }
    .be-none{
      display: none;
    }
    .line{
      width: 100%;
      border-bottom: 1px solid #e6e6e6;
      margin-top: 10px;
      margin-bottom: 20px;
    }
    table{
      table-layout:fixed;
      word-break:break-all;
    }
    td{
      // height: 25px;
      text-align: center;
      word-wrap: break-word;
    }
    .deep{
      background: #f5f5f5;
    }
    .tab-head{
      width: 100%;
      display:flex;
      margin-bottom: 10px;
      p{
        flex: 1;
      }
    }
    .contain{
      width: 830px;
      box-sizing: border-box;
      padding: 45px 20px 64px;
      background: #fff;
      margin: 0 auto;
    }
  }
</style>

