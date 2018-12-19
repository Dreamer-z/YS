<template>
	<div class="money">
		<div class="contain">
			<header class="head clearfix">
				<p class="fl">账单</p>
				<p @click="beNone" style="font-size: 30px;cursor:pointer;" class="fr">×</p>
			</header>
			<div class="text">
				<ul class="texthead clearfix">
					<li class="one">
						<h5>入住信息</h5>
						<p>
							<span class="middle">姓名</span>
							<span class="middle">：</span>
							<span style="margin-right: 54px;" class="middle">{{message.member?message.member[0].name:''}}</span>
							<!-- <span @click="consumptionListNone = true" style="color: #6c9ef7;cursor: pointer;" class="middle">消费清单</span> -->
						</p>
						<p>
							<span class="middle">房间号</span>
							<span class="middle">：</span>
							<span class="middle">{{message.room_name?message.room_name:''}}</span>
						</p>
						<p>
							<span class="middle">房型</span>
							<span class="middle">：</span>
							<span class="middle">{{message.room_type_name?message.room_type_name:''}}</span>
						</p>
            <p>
							<span class="middle">入住方式</span>
							<span class="middle">：</span>
							<span v-if="message.check_in_type === 0" class="middle">日租房</span>
              <span v-else-if="message.check_in_type === 1" class="middle">日租房</span>
              <span v-else-if="message.check_in_type == 2" class="middle">钟点房</span>
						</p>
						<p>
							<span class="middle">入住时间</span>
							<span class="middle">：</span>
							<span style="margin-right: 10px;" class="middle">{{message.come_time?message.come_time:''}}</span>
							<!-- <span class="middle">20:00</span> -->
						</p>
						<p>
							<span class="middle">离店时间</span>
							<span class="middle">：</span>
							<span style="margin-right: 10px;" class="middle">{{message.leave_time?message.leave_time:''}}</span>
							<!-- <span class="middle">20:00</span> -->
						</p>
					</li>
					<li class="two"></li>
					<li class="three">
						<h5>收款信息</h5>    
						<p>
							<span class="middle">累计收款</span>
							<span class="middle">：</span>
							<span style="margin-right: 0px;" class="middle">{{message.receive_amount?message.receive_amount:0}}</span>
							<!-- <span style="color: #6c9ef7;" class="middle">消费清单</span> -->
						</p>
            <p>
              <span class="middle">预订定金</span>
              <span class="middle">：</span>
              <span class="middle">{{message.preorder_sum?message.preorder_sum:0}}</span>
            </p>
						<p>
							<span class="middle">总消费额</span>
							<span class="middle">：</span>
							<span class="middle">{{message.all_amount?message.all_amount:0}}</span>
						</p>
					</li>
					<li class="two"></li>
					<li class="four">
						<h5>住客信息</h5>
						<p>
							<span class="middle">姓名</span>
							<span class="middle">：</span>
							<span style="margin-right: 54px;" class="middle">{{message.member?message.member[0].name:''}}</span>
							<!-- <span @click="seeMore(message.member)" style="cursor:pointer;color: #6c9ef7;" class="middle">查看更多人</span>  v-show="message.member.length > 1" -->
						</p>
						<p>
							<span class="middle">性别</span>
							<span class="middle">：</span>
							<span class="middle">{{message.member?message.member[0].sex == 0?'男':'女':''}}</span>
						</p>
						<p>
							<span class="middle">证件类型</span>
							<span class="middle">：</span>
							<span class="middle">{{message.member?message.member[0].certificate_type:''}}</span>
						</p>
						<p>
							<span class="middle">证件号</span>
							<span class="middle">：</span>
							<span class="middle">{{message.member?message.member[0].idcard:''}}</span>
							<!-- <span class="middle">20:00</span> -->
						</p>
						<p>
							<span class="middle">手机号</span>
							<span class="middle">：</span>
							<span style="margin-right: 10px;" class="middle">{{message.member?message.member[0].mobile:''}}</span>
							<!-- <span class="middle">20:00</span> -->
						</p>
						<p>
							<span class="middle">会员号</span>
							<span class="middle">：</span>
							<span class="middle">{{message.customer?message.customer[0].member_num:''}}</span>
						</p>
					</li>
					<li class="two"></li>
					<!-- <li class="five">
						<div @click="checkRoomStatu" style="margin-right: 18px;background: #6c9ef7;" class="ico">
							<nav style="background: #6c9ef7;">
								<i style="font-size: 46px;margin-top: -4px;" class="iconfont icon-faqichafang middle"></i>
							</nav>
							<p>发起查房</p>
						</div>
					</li> -->
				</ul>
				<h4 class="moneytitle">财务信息</h4>
				<div class="list clearfix">
					<ul>
						<!-- <li @click="clickListNum=3" :class="{'active': clickListNum == 3}" style="border-right: 1px solid #6c9ef7;"  class="fl">全部</li> -->
					</ul>
				</div>
        <table id="tab" style="border-color:#f2f2f2;" border="1">
          <tbody>
            <tr style="background: rgb(242,249,255);">
              <td style="width: 46px;">
                <div class="btn-box">
                  <nav :class="{'cg-bj': 0}" class="box"></nav>
                </div>
              </td>
              <td colspan="4">时间</td>
              <td colspan="3">项目类型</td>
              <td colspan="4">项目名称</td>
              <td colspan="8">项目详情</td>
              <td colspan="2">数量</td>
              <td colspan="3">金额</td>
              <td colspan="4">备注</td>
              <td colspan="4">操作人</td>
              <!-- <td colspan="3">备注</td> -->
            </tr>
            <tr v-for="(item,index) in moneyListArr" :key="index">
              <td style="width: 46px;">
                <div class="btn-box">
                  <nav :class="{'cg-bj': 1}" class="box"></nav>
                </div>
              </td>
              <td colspan="4">
                <p>{{item.createTime.split(' ')[0]}}</p>
                <p>{{item.createTime.split(' ')[1]}}</p>
              </td>
              <td colspan="3">{{item.itemType}}</td>
              <td colspan="4">{{item.itemName}}</td>
              <td colspan="8">{{item.itemDetail}}</td>
              <td colspan="2">{{item.count}}</td>
              <td colspan="3">{{item.amount}}</td>
              <td colspan="4">{{item.remark}}</td>
              <td colspan="4">{{item.username}}</td>
              <!-- <td colspan="3">备注</td> -->
            </tr>
          </tbody>
        </table>
				<div class="addpay clearfix">
					<ul class="middle addpaylist">
						<li class="one">
							<span class="middle">记录项</span>
							<span class="middle">：</span>
							<span class="middle">{{iconClassArr.length}}/{{consumptionList.consume ? (consumptionList.consume.count + consumptionList.night.count): ''}}</span>
						</li>
						<li class="two">
							<span class="middle">共消费</span>
							<span class="middle">：</span>
							<span class="middle">{{message.all_amount?message.all_amount:0}}</span>
						</li>
						<li class="three">
							<span class="middle">已收金额</span>
							<span class="middle">：</span>
							<span class="middle">{{message.receive_amount?message.receive_amount:0}}</span>
						</li>
						<li>
							<span class="middle">应结金额</span>
							<span class="middle">：</span>
							<span class="middle">{{(consumption - collection).toFixed(2)}}</span>
						</li>
					</ul>
          <!-- <p @click="isAddRoomMoneyShow = true" style="width:100px;" class="middle addbtn">
						<span style="font-size: 16px;" class="middle">＋</span>
						<span style="cursor: pointer;" class="middle">添加房费</span>
					</p>
					<p @click="setConsumpItemNone" style="width:142px;" class="middle addbtn">
						<span style="font-size: 16px;" class="middle">＋</span>
						<span style="cursor: pointer;" class="middle">添加其他消费项</span>
					</p> -->
				</div>
				<div style="width: 100%;border-bottom: 1px solid #e6e6e6;"></div>
				<footer class="clearfix box-pre">
					<!-- <p class="footdo">处理</p> -->
          <div style="color:#000;background:#fff;" id="print" ref="print" class="alert-box">
            <div class="box">
              <p style="fontSize:22px;fontWeight:bold;textAlign:center;">U+电竞智慧酒店</p>
              <p style="fontSize:22px;fontWeight:bold;textAlign:center;marginTop:12px;marginBottom:28px;">明细账单</p>
              <p style="marginBottom:5px;">
                <span>打印时间：</span>
                <span>2018-10-1-01 12:11:22</span>
              </p>
              <p>
                <span>订单编号：</span>
                <span>2121121131321231312313</span>
              </p>
              <p class="line"></p>
              <p style="marginBottom:5px;">
                <span>入住人：</span>
                <span>黑旋风</span>
              </p>
              <p style="marginBottom:5px;">
                <span>房型：</span>
                <span>高级呵呵呵呵呵呵呵呵</span>
              </p>
              <p style="marginBottom:5px;">
                <span>房号：</span>
                <span>001002</span>
              </p>
              <p style="marginBottom:5px;">
                <span>订单号：</span>
                <span>23121112123131212313</span>
              </p>
              <p style="marginBottom:5px;">
                <span>会员号：</span>
                <span>21211213121213123121231</span>
              </p>
              <p style="marginBottom:5px;">
                <span>会员卡类型：</span>
                <span>哈哈哈哈哈哈哈哈哈哈</span>
              </p>
              <p style="marginBottom:5px;">
                <span>入住时间</span>
                <span>2018-10-1-01 12:11:22</span>
              </p>
              <p>
                <span>离店时间：</span>
                <span>2018-10-1-01 12:11:22</span>
              </p>
              <p style="border-bottom: 1px solid #ccc;" class="line"></p>
            </div>
            <!-- <iframe width="902px;" height="1000px;" ref="print" src="../../../static/print.html"></iframe> -->
          </div>
					<!-- <div class="footdolist">
						<ul>
							<li @click="ToDo(item, index)" :class="{'mrgtop': index > 5, 'clickbac': clickbac == index}" :key="index" v-for="(item, index) in footDoList">
								{{item.name}}	
							</li>
						</ul>
					</div> -->
				</footer>
				<!-- <button @click="aa= !aa">click</button> -->
			</div>
		</div>
    <add-room-money @letAddRoomManeyNOne="letAddRoomMoneyNone" v-if="isAddRoomMoneyShow"></add-room-money>
    <checkoutsettlement :paywayList="paywayListArr"  :msg="memeberMsg" :orderId="orderId"  v-if="checkOutNone"></checkoutsettlement> <!-- (consumption - collection) --> 
		<consumption-list :mes="message.room?message.room.name:''" :orderId="orderId" v-if="consumptionListNone"></consumption-list>
		<guest :roomName="message.room_name" :list="message.member?message.member:[]" v-if="guestNone"></guest>
		<consump-item :orderId="orderId" :mes="roomMsg" v-if="consumpItemNone"></consump-item>
	</div>
</template>

<script>
import addRoomMoney from "@/components/public/addroommoney";
import { mapGetters } from "vuex";
import API from "@/store/API";
import bus from "@/store/bus";
import checkOut from "@/components/public/checkout"; // 单房结账   结账
import consumpItem from "@/components/public/consumpitem"; //  添加其他消费项
import guest from "@/components/public/guest"; //查看跟多入住人
import consumptionList from "@/components/public/consumptionlist"; // 消费清单
import checkoutsettlement from "@/components/public/checkoutsettlement"; //  收钱

export default {
  props: ["msg"],
  name: "getMoneyCapy",
  data() {
    return {
      paywayListArr: [],
      memeberMsg: {},
      moneyListArr: [],
      isAddRoomMoneyShow: false,
      orderId: "",
      message: {},
      roomMsg: {
        roomId: "",
        roomName: "",
        orderId: ""
      },
      consumpItemNone: false,
      guestNone: false,
      consumptionListNone: false,
      checkOutNone: false,
      imgRotate: [],
      iconClassArr: [],
      clickbac: -1,
      footDoList: [
        {
          id: "",
          name: "打印"
        },
        {
          id: "",
          name: "退房"
        }
      ],
      clickListNum: 3,
      clickListNumber: 5,
      starheight: "",
      consumptionList: {}
    };
  },
  components: {
    addRoomMoney,
    checkOut,
    consumptionList,
    guest,
    consumpItem,
    checkoutsettlement
  },
  watch: {
    clickListNumber(newval) {
      switch (newval) {
        case 4: //mingxi
          // let n = 0;
          for (let name in this.consumptionListName) {
            this.imgRotate.push(name);
            // n++
          }
          break;
        case 5: //fenlei
          this.imgRotate = [];
          break;
      }
    }
  },
  computed: {
    ...mapGetters({
      // 映射 `this.doneCount` 为 `store.getters.doneTodosCount`
      hotel: "currHotel"
    }),
    collection() {
      return Number(
        this.message.receive_amount ? this.message.receive_amount : 0
      );
    },
    consumption() {
      return Number(this.message.all_amount ? this.message.all_amount : 0);
    },
    consumptionListLength() {
      let len = 0;
      for (let name in this.consumptionList) {
        len++;
      }
      return len;
    },
    consumptionListName() {
      let len = 0;
      for (let name in this.consumptionList) {
        len++;
      }
      if (len) {
        return this.consumptionList;
      }
    }
  },
  methods: {
    textPrint() {
      let divPrint = document.getElementById('print')
      let newstr = divPrint.innerHTML
      let oldstr = document.body.innerHTML
      document.body.innerHTML = newstr
      window.print()
      window.location.reload()
      document.body.innerHTML = oldstr
      return false
    },
    letAddRoomMoneyNone() {
      this.isAddRoomMoneyShow = false
    },
    checkRoomStatu() {
      // 	console.log(this.roomId)
      // return
      if (!this.message.stay_status) {
        this.$message({
          message: "该房间已经退房了！无法执行该操作！",
          type: "warning"
        });
        return;
      }
      let obj = {
        hotel_id: this.hotel.id,
        room_id: this.roomMsg.roomId,
        order_id: this.orderId
      };
      API.post("/pms/roomstatus/check", obj).then(res => {
        if (res.error_code == 0) {
          this.$message({
            message: `${res.msg}`,
            type: "success"
          });
        } else {
          if (res.msg) {
            this.$message({
              message: `${res.msg}`,
              type: "warning"
            });
          }
        }
      });
    },
    seeMore(e) {
      this.guestNone = true;
    },
    setIconClassArr(e) {
      if (!this.iconClassArr.includes(e)) {
        this.iconClassArr.push(e);
      } else {
        let a = this.iconClassArr.indexOf(e);
        this.iconClassArr.splice(a, 1);
      }
    },
    setConsumpItemNone() {
      if (!this.message.stay_status) {
        this.$message({
          message: "该房间已经退房了！无法执行该操作！",
          type: "warning"
        });
        return;
      }
      this.consumpItemNone = true;
    },
    ToDo(e, i) {
      if (!this.message.stay_status) {
        this.$message({
          message: "该房间已经退房了！无法执行该操作！",
          type: "warning"
        });
        return;
      }
      this.clickbac = i;
      switch (e.name) {
        case "退房":
          this.checkOutNone = true;
          break;
        case "部分结账":
          console.log(2);
          break;
        case "冲账":
          console.log(3);
          break;
        case "打印":
          console.log(4);
          // this.$print(this.$refs.print) // 使用
          // this.textPrint()
          break;
        case "预授权":
          console.log(5);
          break;
        case "备注":
          console.log(6);
          break;
        case "联房结账":
          console.log(7);
          break;
        case "加收房费":
          console.log(8);
          break;
        case "调整":
          console.log(9);
          break;
        case "换房":
          console.log(10);
          break;
        default:
          // statements_def
          break;
      }
    },
    changeImgRotate(k, item) {
      if (!this.imgRotate.includes(k)) {
        this.imgRotate.push(k);
      } else {
        let a = this.imgRotate.indexOf(k);
        this.imgRotate.splice(a, 1);
      }
    },
    beNone() {
      //	bus.ev.
      this.$emit("getMoneyBeNone");
    },
    resize() {
      let _this = this;
      let preheight = this.$refs.wrap.clientHeight;
      let childheight = this.$refs.textheight.clientHeight;
      let scale = preheight / childheight;
      console.log(preheight, childheight, scale);
    },
    getclien() {
      this.$nextTick(this.resize());
      this.aa = !this.aa;
    }
  },
  mounted() {
    bus.ev.$on("checkoutNone", e => {
      // console.log('fsdfsdfdsf<><><',e)
       console.log('checkoutNone',e)
      if (e != null) {
        //	bus.ev
        console.log('checkoutNone')
        this.$emit("getMoneyBeNone", e);
      }
      this.checkOutNone = false;
    });
    bus.ev.$on("consumptionListNone", () => {
      this.consumptionListNone = false;
    });
    bus.ev.$on("guestNone", () => {
      this.guestNone = false;
    });
    bus.ev.$on("consumpItemNone", () => {
      setTimeout(() => {
        API.get("/pms/roomstatus/order/" + this.orderId).then(res => {
          //this.roomId
          if (res.error_code == 0) {
            this.message = res.data;
          }
        });
        API.get("/pms/roomstatus/bill?id=" + this.orderId).then(res => {
          this.consumptionList = res.data;
        });
      }, 0);
      this.$nextTick().then(() => {
        this.consumpItemNone = false;
      });
    });
  },
  created() {
    // this.roomMsg.roomId = this.msg.id;
    // this.roomMsg.roomName = this.msg.name;
    this.roomMsg.orderId = this.msg.order_id;
    this.orderId = this.msg.order_id;
    API.get("/pms/roomstatus/order/" + this.orderId).then(res => {
      //this.roomId
      if (res.error_code == 0) {
        this.message = res.data;
        if (res.data.vip_id > 0) {
          API.get("/pms/vip/balance?id=" + res.data.member_id).then(res => {
            if (res.error_code == 0) {
              this.memeberMsg = res.data
            }
          })
          API.get("/pms/common/payway?vip=" +1).then(res => {
            if (res.error_code == 0) {
              this.paywayListArr = res.data
            }
          })
        } else {
          API.get("/pms/common/payway").then(res => {
            if (res.error_code == 0) {
              this.paywayListArr = res.data
            }
          })
        }
      }
    });
    API.get("/pms/roomstatus/bill?id=" + this.orderId).then(res => {
      // this.consumptionList = res.data;
      if (res.error_code == 0) {
        this.moneyListArr = res.data
      }
    });
  },
  destroyed() {
    bus.ev.$off("consumpItemNone");
    bus.ev.$off("willBeGetMoney");
  }
};
</script>

<style lang="scss" scoped>
.money {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 999;
  img.imgrotate {
    transform: rotate(0deg);
  }
  .imgabsolute {
    margin-top: 10px;
    margin-right: 30px;
    transform: rotate(-90deg);
  }
  .btn-box{
    line-height: 17px;
    .box{
      display: inline-block;
      width: 10px;
      height: 10px;
      border:1px solid #ccc;
      border-radius: 1px;
    }
    .cg-bj{
      background: #437ff9;
    }
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
  .middle {
    display: inline-block;
    vertical-align: middle;
  }
  .mitop {
    display: inline-block;
    vertical-align: top;
  }
  .contain {
    width: 1030px;
    position: absolute;
    top: 10%;
    left: 22%;
    max-height: 600px;
    overflow-y: auto;
    background: #fff;
    font-size: 14px;
  }
  .head {
    width: 100%;
    height: 40px;
    background: #437ff9;
    box-sizing: border-box;
    padding: 0 30px;
    color: #fff;
    line-height: 40px;
  }
  .text {
    width: 100%;
    box-sizing: border-box;
    padding: 26px 30px 40px 30px;
  }
  .texthead {
    width: 100%;
    position: relative;
    border-bottom: 1px solid #e6e6e6;
    li {
      float: left;
      h5 {
        font-size: 16px;
        margin-bottom: 14px;
        font-weight: bold;
      }
      p {
        margin-bottom: 11px;
      }
    }
    .two {
      height: 140px;
      border-left: 1px solid #e6e6e6;
      margin-top: 4px;
      margin-left: 30px;
      margin-right: 30px;
    }
    .five {
      padding-top: 4px;
      width: 162px;
      overflow: hidden;
      .ico {
        float: left;
        width: 70px;
        height: 70px;
        background: #6c9ef7;
        color: #fff;
        text-align: center;
        border-radius: 4px;
        cursor: pointer;
        nav {
          width: 70px;
          height: 36px;
          background: cyan;
          margin: 7px 0;
        }
      }
    }
  }
  .moneytitle {
    font-size: 16px;
    font-weight: bold;
    margin: 12px 0;
  }
  .list {
    margin-bottom: 5px;
    ul {
      width: 100%;
      border-right: none;
      li {
        height: 28px;
        width: 88px;
        text-align: center;
        line-height: 28px;
        border: 1px solid #6c9ef7;
        border-right: none;
        color: #6c9ef7;
        cursor: pointer;
      }
      .active {
        background: #6c9ef7;
        color: #fff;
      }
    }
  }
  .bj {
    background: #f4f8ff;
  }
  .listtable {
    height: 155px;
    overflow-y: auto;
    position: relative;
    .bortopnone {
      border-top: none;
    }
    .table {
      // width: 99%;
      width: 935px;
      border-right: none;
      cursor: pointer;
      li.four {
        width: 180px;
        border-right: 1px solid #e6e6e6;
      }
    }
  }
  .table {
    width: 100%;
    border: 1px solid #a9bfd6;
    li {
      float: left;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border-right: 1px solid #ccc;
    }
    .one {
      position: relative;
      width: 66px;
      em {
        position: absolute;
        top: 8px;
        right: 16px;
        width: 12px;
        height: 12px;
        border: 1px solid #ccc;
        border-radius: 2px;
      }
    }
    .two {
      width: 550px;
      p {
        width: 100%;
        text-align: left;
        box-sizing: border-box;
        padding-left: 52px;
      }
    }
    .three {
      width: 133px;
    }
    .four {
      width: 180px;
    }
    .bor-none {
      border-right: none;
    }
  }
  .addpay {
    margin: 10px 0;
    .addpaylist {
      width: 682px;
      height: 30px;
      line-height: 30px;
      color: #fff;
      background: #424f5b;
      li {
        float: left;
      }
      .one {
        margin-left: 10px;
        margin-right: 80px;
      }
      .two {
        margin-right: 70px;
      }
      .three {
        margin-right: 70px;
      }
    }
    .addbtn {
      height: 28px;
      line-height: 28px;
      border: 1px solid #424f5b;
      color: #424f5b;
      box-sizing: border-box;
      padding-left: 16px;
      margin-left: 12px;
    }
  }
  footer {
    width: 930px;
    margin-top: 20px;
    .footdo {
      float: left;
      margin-top: 8px;
      margin-right: 16px;
    }
    .footdolist {
      float: left;
      ul {
        width: 880px;
        li {
          width: 120px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          background: #437ff9;
          color: #fff;
          border-radius: 4px;
          margin-right: 10px;
          display: inline-block;
          cursor: pointer;
        }
        .clickbac {
          background: #b3b3b3;
        }
        .mrgtop {
          margin-top: 8px;
        }
      }
    }
  }
  .box-pre{
    position: relative;
    .alert-box{
      display: none;
      position:absolute;
      color: #000;
       background: #fff;
      bottom:100%;
      // width: 300px;height: 300px;
      padding: 0 10px;
      // overflow-y: auto;
      // z-index: -100;
      // background: cyan;

    }
    .box{
      background: #fff;
      .line{
        width: 100%;
        // border-bottom: 1px solid #ccc;
        margin: 18px 0;
      }
    }
  }
}
</style>