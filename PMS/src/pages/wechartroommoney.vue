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
        <span style="color: #437ff9;" class="middle">房费收入明细表</span>
      </header>
      <ol class="search">
        <li class="middle search-li">
          <p class="middle">
            <span class="middle">入住时段</span>
            <span class="middle">：</span>
          </p>
          <div class="date middle">
            <el-date-picker v-model="startDateTime" value-format="yyyy-MM-dd" size="mini" :picker-options="pickerOptions" type="date">
            </el-date-picker>
          </div>
          <span>至</span>
          <div class="date middle">
            <el-date-picker v-model="endDateTime" value-format="yyyy-MM-dd" size="mini" :picker-options="pickerOptions" type="date">
            </el-date-picker>
          </div>
        </li>
        <li @click="serach" class="btnserch middle search-li">
          <span>搜索</span>
        </li>
        <li @click="download" class="btnserch middle search-li">
          <a ref="load" href="#"><span>导出</span></a>
        </li>
        <li @click="setPrint" class="btnserch middle search-li">
          <span>打印</span>
        </li>
      </ol>
      <div style="width:1100px;margin:0 auto;display:none;" class="pre-table">
        <table border="1" style="width:1100px;table-layout:fixed;" ref="download">
          <tbody>
            <tr>
              <td style="textAlign:center;border:0;" colspan="13">
                <span style="fontSize:20px;fontWeight:bold;">房费收入明细表</span>
              </td>
            </tr>
            <tr>
              <td style="textAlign:left;border:0;height:40px;" colspan="4">
                <span>操作员：{{curUser.name}}</span>
              </td>
              <td style="textAlign:center;border:0;height:40px;" colspan="5">
                <span>入住时段：{{startDateTime}}至{{endDateTime}}</span>
              </td>
              <td style="textAlign:right;border:0;height:40px;" colspan="4">
                <span>打印时间：{{inDateTime}}</span>
              </td>
            </tr>
            <tr>
              <td style="textAlign:center;height:40px;" colspan="4"><span>订单号</span></td>
              <td style="textAlign:center;height:40px;" colspan="2"><span>创建时间</span></td>
              <td style="textAlign:center;height:40px;" colspan="2"><span>入离时段</span></td>
              <td style="textAlign:center;height:40px;" colspan="1"><span>订单金额</span></td>
              <td style="textAlign:center;height:40px;" colspan="1"><span>平台佣金</span></td>
              <td style="textAlign:center;height:40px;" colspan="1"><span>分销佣金</span></td>
              <td style="textAlign:center;height:40px;" colspan="1"><span>结算金额</span></td>
              <td style="textAlign:center;height:40px;" colspan="1"><span>订单状态</span></td>
              <!-- <td style="textAlign:center" colspan="1"><span>操作</span></td> -->
            </tr>
            <tr v-for="(item,index) in totalMsg.items" :key="index">
              <td style="textAlign:center;height:40px;" colspan="4"><span>{{item.orderNo}}</span></td>
              <td style="textAlign:center;height:40px;" colspan="2"><span>{{item.createTime}}</span></td>
              <td style="textAlign:center;height:40px;" colspan="2">
                <p>入{{item.comeTime}}<br>离{{item.leaveTime}}</p>
              </td>
              <td style="textAlign:center;height:40px;" colspan="1"><span>{{item.amount}}</span></td>
              <td style="textAlign:center;height:40px;" colspan="1"><span>{{item.platformCommission}}</span></td>
              <td style="textAlign:center;height:40px;" colspan="1"><span>{{item.commission}}</span></td>
              <td style="textAlign:center;height:40px;" colspan="1"><span>{{item.payAmount}}</span></td>
              <td style="textAlign:center;height:40px;" colspan="1"><span>{{item.status}}</span></td>
              <!-- <td style="textAlign:center" colspan="1"><span></span></td> -->
            </tr>
          </tbody>
        </table>
      </div>
      <div class="line"></div>
      <div id="tab-list">
        <div class="tab">
          <p style="textAlign:center;fontSize:16px;fontWeight:bold;color:#1a1a1a;">房屋收入明细表</p>
          <p style="fontSize:12px;display:flex;marginBottom:5px;marginTop:18px;">
            <span style="flex:1;">操作员：{{curUser.name}}</span>
            <span style="flex:1;textAlign:center;">入住时段：{{startDateTime}}至{{endDateTime}}</span>
            <span style="flex:1;textAlign:right;">打印时间：{{inDateTime}}</span>
          </p>
          <ol style="fontWeight:bold;fontSize:9px;borderTop:1px solid #ccc;borderLeft:1px solid #ccc;display:flex;boxSizing:borderBox;background:#f4f9ff;">
            <li style="textAlign:center;borderBottom:1px solid #ccc;borderRight:1px solid #ccc;boxSizing:borderBox;lineHeight:25px;width:209px;">
              <span>订单号</span>
            </li>
            <li style="textAlign:center;borderBottom:1px solid #ccc;borderRight:1px solid #ccc;boxSizing:borderBox;lineHeight:25px;width:160px;">
              <span>创建时间</span>
            </li>
            <li style="textAlign:center;borderBottom:1px solid #ccc;borderRight:1px solid #ccc;boxSizing:borderBox;lineHeight:25px;width:160px;">
              <span>入离时段</span>
            </li>
            <li style="textAlign:center;borderBottom:1px solid #ccc;borderRight:1px solid #ccc;boxSizing:borderBox;lineHeight:25px;width:95px;">
              <span>订单金额</span>
            </li>
            <li style="textAlign:center;borderBottom:1px solid #ccc;borderRight:1px solid #ccc;boxSizing:borderBox;lineHeight:25px;width:95px;">
              <span>平台佣金</span>
            </li>
            <li style="textAlign:center;borderBottom:1px solid #ccc;borderRight:1px solid #ccc;boxSizing:borderBox;lineHeight:25px;width:95px;">
              <span>分销佣金</span>
            </li>
            <li style="textAlign:center;borderBottom:1px solid #ccc;borderRight:1px solid #ccc;boxSizing:borderBox;lineHeight:25px;width:95px;">
              <span>结算金额</span>
            </li>
            <li style="textAlign:center;borderBottom:1px solid #ccc;borderRight:1px solid #ccc;boxSizing:borderBox;lineHeight:25px;width:95px;">
              <span>订单状态</span>
            </li>
            <li style="textAlign:center;borderBottom:1px solid #ccc;borderRight:1px solid #ccc;boxSizing:borderBox;lineHeight:25px;width:95px;">
              <span>操作</span>
            </li>
          </ol>
          <ol v-for="(item,index) in totalMsg.items" :key="index" style="fontSize:9px;borderLeft:1px solid #ccc;display:flex;boxSizing:borderBox;">
            <li style="textAlign:center;borderBottom:1px solid #ccc;borderRight:1px solid #ccc;boxSizing:borderBox;lineHeight:40px;width:209px;">
              <span>{{item.orderNo}}</span>
            </li>
            <li style="textAlign:center;borderBottom:1px solid #ccc;borderRight:1px solid #ccc;boxSizing:borderBox;lineHeight:40px;width:160px;">
              <span>{{item.createTime}}</span>
            </li>
            <li style="textAlign:center;borderBottom:1px solid #ccc;borderRight:1px solid #ccc;boxSizing:borderBox;lineHeight:40px;width:160px;">
              <div style="marginTop: -4px;" class="middle">
                <p style="lineHeight: 14px;">入{{item.comeTime}}</p>
                <p style="lineHeight: 12px;">离{{item.leaveTime}}</p>
              </div>
            </li>
            <li style="textAlign:center;borderBottom:1px solid #ccc;borderRight:1px solid #ccc;boxSizing:borderBox;lineHeight:40px;width:95px;">
              <span>{{item.amount}}</span>
            </li>
            <li style="textAlign:center;borderBottom:1px solid #ccc;borderRight:1px solid #ccc;boxSizing:borderBox;lineHeight:40px;width:95px;">
              <span>{{item.platformCommission}}</span>
            </li>
            <li style="textAlign:center;borderBottom:1px solid #ccc;borderRight:1px solid #ccc;boxSizing:borderBox;lineHeight:40px;width:95px;">
              <span>{{item.commission}}</span>
            </li>
            <li style="textAlign:center;borderBottom:1px solid #ccc;borderRight:1px solid #ccc;boxSizing:borderBox;lineHeight:40px;width:95px;">
              <span>{{item.payAmount}}</span>
            </li>
            <li style="textAlign:center;borderBottom:1px solid #ccc;borderRight:1px solid #ccc;boxSizing:borderBox;lineHeight:40px;width:95px;">
              <span>{{item.status}}</span>
            </li>
            <li @click="setShow(item.preorderId)" style="textAlign:center;borderBottom:1px solid #ccc;borderRight:1px solid #ccc;boxSizing:borderBox;lineHeight:40px;width:95px;">
              <span style="color:#437ff9;cursor:pointer;">详情</span>
            </li>
          </ol>
          <ol style="fontSize:9px;borderLeft:1px solid #ccc;display:flex;boxSizing:borderBox;background:#f4f9ff;">
            <li style="textAlign:center;borderBottom:1px solid #ccc;borderRight:1px solid #f4f9ff;boxSizing:borderBox;lineHeight:25px;width:209px;">
              <span></span>
            </li>
            <li style="textAlign:center;borderBottom:1px solid #ccc;borderRight:1px solid #f4f9ff;boxSizing:borderBox;lineHeight:25px;width:160px;">
              <span></span>
            </li>
            <li style="textAlign:center;borderBottom:1px solid #ccc;borderRight:1px solid #ccc;boxSizing:borderBox;lineHeight:25px;width:160px;">
              <span>合计</span>
            </li>
            <li style="textAlign:center;borderBottom:1px solid #ccc;borderRight:1px solid #ccc;boxSizing:borderBox;lineHeight:25px;width:95px;">
              <span>{{totalMsg.totalAmount}}</span>
            </li>
            <li style="textAlign:center;borderBottom:1px solid #ccc;borderRight:1px solid #ccc;boxSizing:borderBox;lineHeight:25px;width:95px;">
              <span>{{totalMsg.totalPlatformCommissions}}</span>
            </li>
            <li style="textAlign:center;borderBottom:1px solid #ccc;borderRight:1px solid #ccc;boxSizing:borderBox;lineHeight:25px;width:95px;">
              <span>{{totalMsg.totalCommissions}}</span>
            </li>
            <li style="textAlign:center;borderBottom:1px solid #ccc;borderRight:1px solid #ccc;boxSizing:borderBox;lineHeight:25px;width:95px;">
              <span>{{totalMsg.totalPayAmount}}</span>
            </li>
            <li style="textAlign:center;borderBottom:1px solid #ccc;borderRight:1px solid #ccc;boxSizing:borderBox;lineHeight:25px;width:95px;">
              <span></span>
            </li>
            <li style="textAlign:center;borderBottom:1px solid #ccc;borderRight:1px solid #ccc;boxSizing:borderBox;lineHeight:25px;width:95px;">
              <span></span>
            </li>
          </ol>
        </div>
        <div style="width:1005px;z-index:-999;position:relative;" ref="print" class="tab">
          <p style="textAlign:center;fontSize:16px;fontWeight:bold;color:#1a1a1a;">房费收入明细表</p>
          <p style="fontSize:12px;display:flex;marginBottom:5px;marginTop:18px;">
            <span style="flex:1;">操作员：{{curUser.name}}</span>
            <span style="flex:1;textAlign:center;">入住时段：{{startDateTime}}至{{endDateTime}}</span>
            <span style="flex:1;textAlign:right;">打印时间：{{inDateTime}}</span>
          </p>
          <ol style="fontWeight:bold;fontSize:9px;borderTop:1px solid #ccc;borderLeft:1px solid #ccc;display:flex;boxSizing:borderBox;background:#f4f9ff;">
            <li style="textAlign:center;borderBottom:1px solid #ccc;borderRight:1px solid #ccc;boxSizing:borderBox;lineHeight:25px;width:209px;">
              <span>订单号</span>
            </li>
            <li style="textAlign:center;borderBottom:1px solid #ccc;borderRight:1px solid #ccc;boxSizing:borderBox;lineHeight:25px;width:160px;">
              <span>创建时间</span>
            </li>
            <li style="textAlign:center;borderBottom:1px solid #ccc;borderRight:1px solid #ccc;boxSizing:borderBox;lineHeight:25px;width:160px;">
              <span>入离时段</span>
            </li>
            <li style="textAlign:center;borderBottom:1px solid #ccc;borderRight:1px solid #ccc;boxSizing:borderBox;lineHeight:25px;width:95px;">
              <span>订单金额</span>
            </li>
            <li style="textAlign:center;borderBottom:1px solid #ccc;borderRight:1px solid #ccc;boxSizing:borderBox;lineHeight:25px;width:95px;">
              <span>平台佣金</span>
            </li>
            <li style="textAlign:center;borderBottom:1px solid #ccc;borderRight:1px solid #ccc;boxSizing:borderBox;lineHeight:25px;width:95px;">
              <span>分销佣金</span>
            </li>
            <li style="textAlign:center;borderBottom:1px solid #ccc;borderRight:1px solid #ccc;boxSizing:borderBox;lineHeight:25px;width:95px;">
              <span>结算金额</span>
            </li>
            <li style="textAlign:center;borderBottom:1px solid #ccc;borderRight:1px solid #ccc;boxSizing:borderBox;lineHeight:25px;width:95px;">
              <span>订单状态</span>
            </li>
            <!-- <li style="textAlign:center;borderBottom:1px solid #ccc;borderRight:1px solid #ccc;boxSizing:borderBox;lineHeight:25px;width:95px;">
              <span>操作</span>
            </li> -->
          </ol>
          <ol v-for="(item,index) in totalMsg.items" :key="index" style="fontSize:9px;borderLeft:1px solid #ccc;display:flex;boxSizing:borderBox;">
            <li style="textAlign:center;borderBottom:1px solid #ccc;borderRight:1px solid #ccc;boxSizing:borderBox;lineHeight:40px;width:209px;">
              <span>{{item.orderNo}}</span>
            </li>
            <li style="textAlign:center;borderBottom:1px solid #ccc;borderRight:1px solid #ccc;boxSizing:borderBox;lineHeight:40px;width:160px;">
              <span>{{item.createTime}}</span>
            </li>
            <li style="textAlign:center;borderBottom:1px solid #ccc;borderRight:1px solid #ccc;boxSizing:borderBox;lineHeight:40px;width:160px;">
              <div style="marginTop: -4px;" class="middle">
                <p style="lineHeight: 14px;">入{{item.comeTime}}</p>
                <p style="lineHeight: 12px;">离{{item.leaveTime}}</p>
              </div>
            </li>
            <li style="textAlign:center;borderBottom:1px solid #ccc;borderRight:1px solid #ccc;boxSizing:borderBox;lineHeight:40px;width:95px;">
              <span>{{item.amount}}</span>
            </li>
            <li style="textAlign:center;borderBottom:1px solid #ccc;borderRight:1px solid #ccc;boxSizing:borderBox;lineHeight:40px;width:95px;">
              <span>{{item.platformCommission}}</span>
            </li>
            <li style="textAlign:center;borderBottom:1px solid #ccc;borderRight:1px solid #ccc;boxSizing:borderBox;lineHeight:40px;width:95px;">
              <span>{{item.commission}}</span>
            </li>
            <li style="textAlign:center;borderBottom:1px solid #ccc;borderRight:1px solid #ccc;boxSizing:borderBox;lineHeight:40px;width:95px;">
              <span>{{item.payAmount}}</span>
            </li>
            <li style="textAlign:center;borderBottom:1px solid #ccc;borderRight:1px solid #ccc;boxSizing:borderBox;lineHeight:40px;width:95px;">
              <span>{{item.status}}</span>
            </li>
            <!-- <li @click="setShow(item.preorderId)" style="textAlign:center;borderBottom:1px solid #ccc;borderRight:1px solid #ccc;boxSizing:borderBox;lineHeight:40px;width:95px;">
              <span style="color:#437ff9;cursor:pointer;">详情</span>
            </li> -->
          </ol>
          <ol style="fontSize:9px;borderLeft:1px solid #ccc;display:flex;boxSizing:borderBox;background:#f4f9ff;">
            <li style="textAlign:center;borderBottom:1px solid #ccc;borderRight:1px solid #f4f9ff;boxSizing:borderBox;lineHeight:25px;width:209px;">
              <span></span>
            </li>
            <li style="textAlign:center;borderBottom:1px solid #ccc;borderRight:1px solid #f4f9ff;boxSizing:borderBox;lineHeight:25px;width:160px;">
              <span></span>
            </li>
            <li style="textAlign:center;borderBottom:1px solid #ccc;borderRight:1px solid #ccc;boxSizing:borderBox;lineHeight:25px;width:160px;">
              <span>合计</span>
            </li>
            <li style="textAlign:center;borderBottom:1px solid #ccc;borderRight:1px solid #ccc;boxSizing:borderBox;lineHeight:25px;width:95px;">
              <span>{{totalMsg.totalAmount}}</span>
            </li>
            <li style="textAlign:center;borderBottom:1px solid #ccc;borderRight:1px solid #ccc;boxSizing:borderBox;lineHeight:25px;width:95px;">
              <span>{{totalMsg.totalPlatformCommissions}}</span>
            </li>
            <li style="textAlign:center;borderBottom:1px solid #ccc;borderRight:1px solid #ccc;boxSizing:borderBox;lineHeight:25px;width:95px;">
              <span>{{totalMsg.totalCommissions}}</span>
            </li>
            <li style="textAlign:center;borderBottom:1px solid #ccc;borderRight:1px solid #ccc;boxSizing:borderBox;lineHeight:25px;width:95px;">
              <span>{{totalMsg.totalPayAmount}}</span>
            </li>
            <li style="textAlign:center;borderBottom:1px solid #ccc;borderRight:1px solid #ccc;boxSizing:borderBox;lineHeight:25px;width:95px;">
              <span></span>
            </li>
            <!-- <li style="textAlign:center;borderBottom:1px solid #ccc;borderRight:1px solid #ccc;boxSizing:borderBox;lineHeight:25px;width:95px;">
              <span></span>
            </li> -->
          </ol>
        </div>
      </div>
       <wechartOrderMent @checkMemberNone="wechartOrderMentNone" v-if="wechartOrderMentShow" :val="orderId"></wechartOrderMent>
    </div>
  </div>
</template>

<script>
import wechartOrderMent from "@/components/public/wechartorderment"
import { mapGetters } from 'vuex'
import API from "@/store/API"
  export default {
    name: 'wechartRoomMoney',
    data() {
      return {
        orderId: '',
        wechartOrderMentShow: false,
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now()
          }
        },
        isPrint: false,
        startDateTime: '',
        endDateTime: '',
        inDateTime: '',
        totalMsg: {
          items: [],
          totalAmount: '',  //	float	订单金额合计
          totalPlatformCommissions: '',  //	float	平台佣金合计
          totalCommissions: '',  //	float	佣金合计
          totalPayAmount: ''  //	float	结算金额合计
        }
      }
    },
    components: {
      wechartOrderMent
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
        a.download = "房屋收入明细表.xls";
        a = null
      },
      getToatalMsg() {
        API.get("/pms/report/orderlist",{
          id: this.hotel.id,
          start: this.startDateTime,
          end: this.endDateTime
        }).then(res => {
          if (res.error_code == 0) {
            // this.listArr = res.data.items
            this.totalMsg = res.data
          } else {
            if (res.msg) {
              this.$message.error(`${res.msg}`)
            }
          }
        })
      },
      serach() {
        let num = Math.ceil((new Date(this.endDateTime).getTime() - new Date(this.startDateTime).getTime())/(24*60*60*1000))
        if (num <= 1) {
          this.$message.error('请选择正确的时间段，至少间隔一天')
        } else {
          this.getToatalMsg()
        }
      },
      wechartOrderMentNone() {
        this.wechartOrderMentShow = false
      },
      setShow(id) {
        this.orderId = id
        this.wechartOrderMentShow = true
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
      this.getToatalMsg()
      // API.get("/pms/report/orderlist",{
      //   id: this.hotel.id,
      //   start: this.startDateTime,
      //   end: this.endDateTime
      // }).then(res => {
      //   if (res.error_code == 0) {
      //     // this.listArr = res.data.items
      //     this.totalMsg = res.data
      //   } else {
      //     if (res.msg) {
      //       this.$message.error(`${res.msg}`)
      //     }
      //   }
      // })
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
    td{
      height: 40px;
      text-align: center;
      word-wrap: break-word;
    }
    .line{
      width: 100%;
      border-bottom: 1px solid #f2f2f2;
      margin-bottom: 20px;
    }
    .tab{
      width: 1100px;
      margin: 0 auto;
      font-size: 12px;
    }
    // .tab-head{
    //   text-align: center;
    //   font-size: 16px;
    //   font-weight: bold;
    //   color: #1a1a1a;
    // }
    // .tab-time{
    //   display: flex;
    //   margin-bottom: 5px;
    //   margin-top: 18px;
    //   .tab-time-list{
    //     flex: 1;
    //   }
    // }
    // .tab-body{
    //   box-sizing: border-box;
    //   border-top: 1px solid #ccc;
    //   border-left: 1px solid #ccc;
    //   .tab-body-thead{
    //     display: flex;
    //     height: 24px;
    //     line-height: 24px;
    //     text-align: center;
    //     background: #f4f9ff;
    //   }
    //   .tab-body-contain{
    //     display: flex;
    //     height: 44px;
    //     line-height: 44px;
    //     text-align: center;
    //   }
    //   li{
    //     box-sizing: border-box;
    //     border-right: 1px solid #ccc;
    //     border-bottom: 1px solid #ccc;
    //   }
    //   .one{
    //     width: 209px;
    //   }
    //   .two{
    //     width: 160px;
    //   }
    //   .three{
    //     width: 95px;
    //   }
    // }
  }
</style>