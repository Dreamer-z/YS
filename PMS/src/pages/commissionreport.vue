<template>
  <div class="summaryreport">
    <div class="white-text">
      <header>
        <span class="middle">当前位置</span>
        <span style="margin-right: 18px;" class="middle">：</span>
        <span style="margin-right: 18px;" class="middle">首页</span>
        <span style="margin-right: 18px;" class="middle">></span>
        <span style="margin-right: 18px;" class="middle">财报管理</span>
        <span style="margin-right: 18px;" class="middle">></span>
        <span style="color: #437ff9;" class="middle">佣金账务报表</span>
      </header>
      <ol class="search">
        <!-- <li class="middle search-li">
          <p class="middle">
            <span class="middle">入离时段</span>
            <span class="middle">：</span>
          </p>
          <div class="date middle">
            <el-date-picker v-model="startDateTime" value-format="yyyy-MM-dd HH:mm:ss" size="mini" :picker-options="pickerOptions" type="datetime">
            </el-date-picker>
          </div>
          <span>至</span>
          <div class="date middle">
            <el-date-picker v-model="endDateTime" value-format="yyyy-MM-dd HH:mm:ss" size="mini" :picker-options="pickerOptions" type="datetime">
            </el-date-picker>
          </div>
        </li>
        <li class="btnserch middle search-li">
          <span>搜索</span>
        </li> -->
        <li @click="download" class="btnserch middle search-li">
          <a ref="load" href="#"><span>导出</span></a>
        </li>
        <li @click="setPrint" class="btnserch middle search-li">
          <span>打印</span>
        </li>
      </ol>
      <div style="width:1100px;margin:0 auto;display:none;" class="pre-table">
        <table border="1" style="width:1100px;table-layout:fixed;" ref="download">
          <tr>
            <td style="textAlign:center;border:0;height:40px;" colspan="8"><span style="fontSize:20px;fontWeight:bold;">佣金账务报表</span></td>
          </tr>
          <tr>
            <td style="textAlign:left;border:0;height:40px;" colspan="4"><span>操作员：{{curUser.name}}</span></td>
            <td style="textAlign:right;border:0;height:40px;" colspan="4"><span>打印时间：{{inDateTime}}</span></td>
          </tr>
          <tr>
            <td style="textAlign:left;height:40px;" colspan="8">佣金账务报表</td>
          </tr>
          <tr>
            <td style="textAlign:center;height:40px;" colspan="4"><span>营业总收入</span></td>
            <td style="textAlign:center;height:40px;" colspan="4"><span>{{totalMsg.totalAmount}}</span></td>
          </tr>
          <tr>
            <td style="textAlign:center;height:40px;" colspan="4"><span>入住订单数</span></td>
            <td style="textAlign:center;height:40px;" colspan="4"><span>{{totalMsg.orderNum}}</span></td>
          </tr>
          <tr>
            <td style="textAlign:center;height:40px;" colspan="4"><span>入住订单数（分销订单）</span></td>
            <td style="textAlign:center;height:40px;" colspan="4"><span>{{totalMsg.saleOrderNum}}</span></td>
          </tr>
          <tr>
            <td style="textAlign:left;height:40px;" colspan="8">平台佣金统计</td>
          </tr>
          <tr>
            <td style="textAlign:center;height:40px;" colspan="4"><span>平台佣金总计</span></td>
            <td style="textAlign:center;height:40px;" colspan="4"><span>{{totalMsg.totalPlatformCommissions}}</span></td>
          </tr>
          <!-- <tr>
            <td style="textAlign:center;height:40px;" colspan="4"><span>已成功打款佣金</span></td>
            <td style="textAlign:center;height:40px;" colspan="4"><span>{{totalMsg.payPlatformCommissions}}</span></td>
          </tr>
          <tr>
            <td style="textAlign:center;height:40px;" colspan="4"><span>平台剩余佣金</span></td>
            <td style="textAlign:center;height:40px;" colspan="4"><span>{{totalMsg.leftPlatformCommissions}}</span></td>
          </tr> -->
          <tr>
            <td style="textAlign:left;height:40px;" colspan="8">分销佣金统计</td>
          </tr>
          <tr>
            <td style="textAlign:center;height:40px;" colspan="4"><span>分销佣金总计</span></td>
            <td style="textAlign:center;height:40px;" colspan="4"><span>{{totalMsg.totalCommissions}}</span></td>
          </tr>
          <tr>
            <td style="textAlign:center;height:40px;" colspan="4"><span>已成功打款佣金</span></td>
            <td style="textAlign:center;height:40px;" colspan="4"><span>{{totalMsg.payCommissions}}</span></td>
          </tr>
          <tr>
            <td style="textAlign:center;height:40px;" colspan="4"><span>剩余提现佣金</span></td>
            <td style="textAlign:center;height:40px;" colspan="4"><span>{{totalMsg.leftCommissions}}</span></td>
          </tr>
        </table>
      </div>
      <div class="line"></div>
      <div id="tab-list">
        <div ref="print" class="tab">
          <p style="textAlign:center;fontSize:16px;fontWeight:bold;color:#1a1a1a;">佣金账务报表</p>
          <p style="fontSize:9px;display:flex;marginBottom:5px;marginTop:18px;">
            <span style="flex:1;">操作员：{{curUser.name}}</span>
            <span style="flex:1;textAlign:right;">打印时间：{{inDateTime}}</span>
          </p>
          <p style="borderBottom: 1px solid #ccc;"></p>
          <div style="fontSize:9px;borderLeft:1px solid #ccc;boxSizing:borderBox;">
            <p style="fontSize:9px;boxSizing:borderBox;paddingLeft: 8px;background:#f4f9ff;fontWeight:bold;borderRight:1px solid #ccc;borderBottom:1px solid #ccc;lineHeight:25px;">
              <span style="">营业状况统计</span>
            </p>
            <div style="fontSize:9px;display:flex;textAlign:center;">
              <p style="fontSize:9px;boxSizing:borderBox;width:339px;borderRight:1px solid #ccc;borderBottom:1px solid #ccc;lineHeight:25px;">营业总收入</p>
              <p style="boxSizing:borderBox;width:760px;borderRight:1px solid #ccc;borderBottom:1px solid #ccc;lineHeight:25px;">{{totalMsg.totalAmount}}</p>
            </div>
            <div style="fontSize:9px;display:flex;textAlign:center;">
              <p style="fontSize:9px;boxSizing:borderBox;width:339px;borderRight:1px solid #ccc;borderBottom:1px solid #ccc;lineHeight:25px;">入住订单数</p>
              <p style="fontSize:9px;boxSizing:borderBox;width:760px;borderRight:1px solid #ccc;borderBottom:1px solid #ccc;lineHeight:25px;">{{totalMsg.orderNum}}</p>
            </div>
            <div style="fontSize:9px;display:flex;textAlign:center;">
              <p style="fontSize:9px;boxSizing:borderBox;width:339px;borderRight:1px solid #ccc;borderBottom:1px solid #ccc;lineHeight:25px;">入住订单数（分销订单）</p>
              <p style="fontSize:9px;boxSizing:borderBox;width:760px;borderRight:1px solid #ccc;borderBottom:1px solid #ccc;lineHeight:25px;">{{totalMsg.saleOrderNum}}</p>
            </div>
          </div>
          <div style="fontSize:9px;borderLeft:1px solid #ccc;boxSizing:borderBox;">
            <p style="fontSize:9px;boxSizing:borderBox;paddingLeft: 8px;background:#f4f9ff;fontWeight:bold;borderRight:1px solid #ccc;borderBottom:1px solid #ccc;lineHeight:25px;">
              <span style="">平台佣金统计</span>
            </p>
            <div style="fontSize:9px;display:flex;textAlign:center;">
              <p style="fontSize:9px;boxSizing:borderBox;width:339px;borderRight:1px solid #ccc;borderBottom:1px solid #ccc;lineHeight:25px;">平台佣金总计</p>
              <p style="fontSize:9px;boxSizing:borderBox;width:760px;borderRight:1px solid #ccc;borderBottom:1px solid #ccc;lineHeight:25px;">{{totalMsg.totalPlatformCommissions}}</p>
            </div>
            <!-- <div style="fontSize:9px;display:flex;textAlign:center;">
              <p style="fontSize:9px;boxSizing:borderBox;width:339px;borderRight:1px solid #ccc;borderBottom:1px solid #ccc;lineHeight:25px;">已成功打款佣金</p>
              <p style="fontSize:9px;boxSizing:borderBox;width:760px;borderRight:1px solid #ccc;borderBottom:1px solid #ccc;lineHeight:25px;">{{totalMsg.payPlatformCommissions}}</p>
            </div>
            <div style="fontSize:9px;display:flex;textAlign:center;">
              <p style="fontSize:9px;boxSizing:borderBox;width:339px;borderRight:1px solid #ccc;borderBottom:1px solid #ccc;lineHeight:25px;">平台剩余佣金</p>
              <p style="fontSize:9px;boxSizing:borderBox;width:760px;borderRight:1px solid #ccc;borderBottom:1px solid #ccc;lineHeight:25px;">{{totalMsg.leftPlatformCommissions}}</p>
            </div> -->
          </div>
          <div style="fontSize:9px;borderLeft:1px solid #ccc;boxSizing:borderBox;">
            <p style="fontSize:9px;boxSizing:borderBox;paddingLeft: 8px;background:#f4f9ff;fontWeight:bold;borderRight:1px solid #ccc;borderBottom:1px solid #ccc;lineHeight:25px;">
              <span style="">分销佣金统计</span>
            </p>
            <div style="display:flex;fontSize:9px;textAlign:center;">
              <p style="fontSize:9px;boxSizing:borderBox;width:339px;borderRight:1px solid #ccc;borderBottom:1px solid #ccc;lineHeight:25px;">分销佣金总计</p>
              <p style="fontSize:9px;boxSizing:borderBox;width:760px;borderRight:1px solid #ccc;borderBottom:1px solid #ccc;lineHeight:25px;">{{totalMsg.totalCommissions}}</p>
            </div>
            <div style="display:flex;fontSize:9px;textAlign:center;">
              <p style="fontSize:9px;boxSizing:borderBox;width:339px;borderRight:1px solid #ccc;borderBottom:1px solid #ccc;lineHeight:25px;">已成功打款佣金</p>
              <p style="fontSize:9px;boxSizing:borderBox;width:760px;borderRight:1px solid #ccc;borderBottom:1px solid #ccc;lineHeight:25px;">{{totalMsg.payCommissions}}</p>
            </div>
            <div style="fontSize:9px;display:flex;fontSize:9px;textAlign:center;">
              <p style="fontSize:9px;boxSizing:borderBox;width:339px;borderRight:1px solid #ccc;borderBottom:1px solid #ccc;lineHeight:25px;">剩余提现佣金</p>
              <p style="fontSize:9px;boxSizing:borderBox;width:760px;borderRight:1px solid #ccc;borderBottom:1px solid #ccc;lineHeight:25px;">{{totalMsg.leftCommissions}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import API from "@/store/API"
  export default {
    name: 'commissionReport',
    data() {
      return {
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now()
          }
        },
        isPrint: false,
        startDateTime: '',
        endDateTime: '',
        totalMsg: {},
        inDateTime: ''
      }
    },
    methods: {
      download() {
        // 使用outerHTML属性获取整个table元素的HTML代码（包括<table>标签），然后包装成一个完整的HTML文档，设置charset为urf-8以防止中文乱码
        let html = "<html><head><meta charset='utf-8' /></head><body>" + this.$refs.download.outerHTML + "</body></html>";
        // console.log(this.$refs.print.outerHTML)

        // 实例化一个Blob对象，其构造函数的第一个参数是包含文件内容的数组，第二个参数是包含文件类型属性的对象

        let blob = new Blob([html], { type: "application/vnd.ms-excel" })

        let a = this.$refs.load

        // 利用URL.createObjectURL()方法为a元素生成blob URL
        a.href = URL.createObjectURL(blob);
        // 设置文件名，目前只有Chrome和FireFox支持此属性
        a.download = "佣金账务报表.xls";
        a = null
      },
      setPrint() {
        this.isPrint = !this.isPrint
        this.$print(this.$refs.print) // 使用
      },
    },
    computed: {
      ...mapGetters({
        hotel:'currHotel',
        curUser: 'user'
      })
    },
    created() {
      let time = new Date(new Date().getTime() - 24*60*60*1000)
      let endYear = time.getFullYear()
      let endMonth = time.getMonth() + 1
      let endDate = time.getDate()

      let d = new Date()
      let yaer = d.getFullYear()
      let month = d.getMonth() + 1
      let date = d.getDate()
      let hour = d.getHours()
      let min = d.getMinutes()
      let sec = d.getSeconds()
      this.inDateTime = `${yaer}-${month}-${date} ${hour}:${min}:${sec}`
      this.startDateTime = `${endYear}-${endMonth}-${endDate}`
      this.endDateTime = `${yaer}-${month}-${date}`
      API.get("/pms/report/summary?id=" + this.hotel.id).then(res => {
        if (res.error_code == 0) {
          this.totalMsg = res.data
        }
      })
    },
    mounted() {
    }
  }
</script>

<style lang="scss" scoped>
  .summaryreport {
    padding-top: 60px;
    font-size: 14px;
    background: #f2f2f2;
    position: relative;
    color: #444;
    input{
      height: 28px;
      border: 1px solid #f2f2f2;
      border-radius: 4px;
    }
    .white-text{
      width: 100%;
      box-sizing: border-box;
      padding-left: 250px;
      background: #fff;
      padding-top: 20px;
      padding-bottom: 30px;
      padding-right: 50px;
    }
    .search{
      .search-li{
        margin-right: 14px;
        margin-bottom: 30px;
        margin-top: 20px;
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
    .tab{
      width: 1100px;
      margin: 0 auto;
    }
  }
</style>