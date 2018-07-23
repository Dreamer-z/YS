<template>
  <div class="money">
    <div class="contain">
      <header class="head clearfix">
        <p class="fl">客房详情</p>
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
              <span @click="consumptionListNone = true" style="color: #6c9ef7;cursor: pointer;" class="middle">消费清单</span>
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
            <!-- <p>
              <span class="middle">剩余预授权</span>
              <span class="middle">：</span>
              <span class="middle">￥11.00</span>
            </p> -->
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
              <span @click="guestNone = true" style="cursor:pointer;color: #6c9ef7;" class="middle">查看更多人</span>
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
          <li class="five">
            <div @click="checkRoomStatu" style="margin-right: 18px;background: #6c9ef7;" class="ico">
              <nav style="background: #6c9ef7;">
                <i style="font-size: 46px;margin-top: -4px;" class="iconfont icon-faqichafang middle"></i>
              </nav>
              <p>发起查房</p>
            </div>
            <!-- <div class="ico">
              <nav>
                <i></i>
              </nav>
              <p>发起查房</p>
            </div>
            <div style="margin-right: 18px;margin-top: 18px;" class="ico">
              <nav>
                <i></i>
              </nav>
              <p>发起查房</p>
            </div>
            <div style="margin-top: 18px;" class="ico">
              <nav>
                <i></i>
              </nav>
              <p>发起查房</p>
            </div> -->
          </li>
        </ul>
        <h4 class="moneytitle">财务信息</h4>
        <div class="list clearfix">
          <ul>
            <!-- <li @click="clickListNum=1" :class="{'active': clickListNum == 1}"  class="fl">未结算</li>
            <li @click="clickListNum=2" :class="{'active': clickListNum == 2}"  class="fl">已结算</li> -->
            <li @click="clickListNum=3" :class="{'active': clickListNum == 3}" style="border-right: 1px solid #6c9ef7;"  class="fl">全部</li>
            <li @click="clickListNumber=4" :class="{'active': clickListNumber == 4}" style="border-right: 1px solid #6c9ef7;" class="fr">明细</li>
            <li @click="clickListNumber=5" :class="{'active': clickListNumber == 5}"  class="fr">分类</li>
          </ul>
        </div>
        <ul class="table clearfix bj">
          <li class="one">
            <span class="middle">
              <!-- <i class="mitop"></i> -->
              <em class="mitop"></em>
            </span>
          </li>
          <li class="two">
            项目
          </li>
          <li class="three">笔数</li>
          <li class="four bor-none">金额</li>
        </ul>
        <div ref="wrap" class="listtable">
          <div v-for="(item, key, index) in consumptionListName" class="clienheight">
            <ul @click="changeImgRotate(key,item)" class="table clearfix bj bortopnone">
              <li class="one">
                <span class="">
                  <img :class="{'imgrotate': imgRotate.includes(key)}" width="10" height="6" src="@/assets/images/sjx.png" class="mitop imgabsolute"></img>
                  <!-- <i style="margin-right: -20px;" :class="{'icon-wifi' : imgRotate.includes(key)}" class="mitop iconfont"></i> -->
                  <em style="line-height: 12px;" :class="{'icon-wifi' : 0}" class="mitop iconfont"></em>
                </span>
              </li>
              <li class="two">
                <p>{{item.name}}</p>
              </li>
              <li class="three">{{item.count}}</li>
              <li class="four bor-none">{{item.total_price}}</li>
            </ul>
            <el-collapse-transition>
              <div v-show="imgRotate.includes(key)">
                <ul @click="setIconClassArr(data)" v-for="(data, i) in item.data" class="table clearfix bj bortopnone">
                  <li class="one">
                    <span class="middle">
                      <i style="margin-right: -20px;font-weight:bold;color:#6a9df6;" :class="{'icon-gou' : iconClassArr.includes(data)}" class="mitop iconfont"></i>
                      <em class="mitop"></em>
                    </span>
                  </li>
                  <li class="two">
                    <!-- <p><span>【{{data.roonName}}】</span><span>{{data.name}}</span><span>【{{data.whoDid}}】</span><span>【{{data.date}}</span>
                      <span>{{data.time}}】</span>
                    </p> -->
                    <p>{{data.name}}</p>
                  </li>
                  <li class="three">1</li>
                  <li class="four bor-none">{{data.price * Math.floor(data.count)}}.00</li>
                </ul>
              </div>
            </el-collapse-transition>
          </div>   <!-- 下面的是凑数的 -->
          <div v-if="consumptionListLength < 6">
            <ul v-for="item in (6 - consumptionListLength)" class="table clearfix bj bortopnone">
              <li class="one">
                <span class="middle">
                  <i class="mitop"></i>
                  <em class="mitop"></em>
                </span>
              </li>
              <li class="two">
                <p></p>
              </li>
              <li class="three"></li>
              <li class="four bor-none"></li>
            </ul>
          </div>
        </div>
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
              <span class="middle">已付款</span>
              <span class="middle">：</span>
              <span class="middle">{{message.receive_amount?message.receive_amount:0}}</span>
            </li>
            <li>
              <span class="middle">还需支付</span>
              <span class="middle">：</span>
              <span class="middle">{{consumption - collection}}</span>
            </li>
          </ul>
          <p @click="setConsumpItemNone" class="middle addbtn">
            <span style="font-size: 16px;" class="middle">＋</span>
            <span style="cursor: pointer;" class="middle">添加其他消费项</span>
          </p>
        </div>
        <div style="width: 100%;border-bottom: 1px solid #e6e6e6;"></div>
        <footer class="clearfix">
          <p class="footdo">处理</p>
          <div class="footdolist">
            <ul>
              <li @click="ToDo(item, index)" :class="{'mrgtop': index > 5, 'clickbac': clickbac == index}" v-for="(item, index) in footDoList">
                {{item.name}}<span>（F{{index + 1}}）</span>  
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </div>
    <check-out :memberId="memberId" :orderId="orderId" :mes="(consumption - collection)" v-if="checkOutNone"></check-out>
    <consumption-list :mes="message.room?message.room.name:''" :orderId="orderId" v-if="consumptionListNone"></consumption-list>
    <guest :roomName="message.room_name" :list="message.member?message.member:[]" v-if="guestNone"></guest>
    <consump-item :orderId="orderId" :mes="roomId" :roomName="message.room_name?message.room_name:''" v-if="consumpItemNone"></consump-item>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import API from "@/store/API"
import bus from "@/store/bus"
import checkOut from "@/components/public/checkout"     // 单房结账   结账
import consumpItem from "@/components/public/consumpItem"  //  添加其他消费项
import guest from "@/components/public/guest"     //查看跟多入住人
import consumptionList from "@/components/public/consumptionlist"   // 消费清单
  export default{
    name: 'orderGetMoney',
    data() {
      return {
        memberId: '',
        orderId: '',
        message: {},
        roomId: '',
        consumpItemNone: false,
        guestNone: false,
        consumptionListNone: false,
        checkOutNone: false,
        imgRotate: [],
        iconClassArr: [],
        clickbac: -1,
        footDoList: [
          {
            id: '',
            name: '单房结账'
          },
          {
            id: '',
            name: '打印'
          }
        ],
        clickListNum: 3,
        clickListNumber: 5,
        starheight: '',
        // consumption: this.message.receive?this.message.receive.all_amount:0,   //gongxiaofei
        // collection: this.message.receive_amount?this.message.receive_amount:0,   //gongshoukuan
        consumptionList: {}
      }
    },
    components: {
      checkOut,
      consumptionList,
      guest,
      consumpItem
    },
    watch: {
      clickListNumber(newval) {
        switch (newval) {
          case 4:   //mingxi
            // let n = 0;
            for(let name in this.consumptionListName) {
              this.imgRotate.push(name)
              // n++
            }
            break;
          case 5:   //fenlei
            this.imgRotate = []
            break;
        }
      }
    },
    computed: {
      ...mapGetters({
        // 映射 `this.doneCount` 为 `store.getters.doneTodosCount`
        hotel:'currHotel'
      }),
      collection() {
        return Number(this.message.receive_amount?this.message.receive_amount:0)
      },
      consumption() {
        return Number(this.message.all_amount?this.message.all_amount:0)
      },
      consumptionListLength() {
        let len = 0
        for(let name in this.consumptionList) {  
            len++;  
        }  
        return len;
      },
      consumptionListName() {
        let len = 0
        for(let name in this.consumptionList) {  
            len++;  
        }  
        if(len) {
          return this.consumptionList;
        }
      }
    },
    methods: {
      checkRoomStatu() {
        let obj = {
          hotel_id: this.hotel.id,
          room_id: this.roomId
        }
        API.post("/pms/roomstatus/check", obj).then(res=>{
          if (res.error_code == 0) {
            this.$message({
              message: '发起查房成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: '该房间没有负责人，请指定',
              type: 'warning'
            })
          }
        })
      },
      setIconClassArr(e) {
        if(!this.iconClassArr.includes(e)) {
          this.iconClassArr.push(e)
        }else{
          let a = this.iconClassArr.indexOf(e)
          this.iconClassArr.splice(a, 1)
        }
      },
      setConsumpItemNone() {
        this.consumpItemNone = true
        // bus.ev.$emit('setConsumpItem',{"roomId": this.roomId})
        // this.forChild = [this.roomId]
      },
      ToDo(e, i) {
        this.clickbac = i;
        switch (e.name) {
          case '单房结账':
            this.checkOutNone = true;
            break;
          case '部分结账':
            console.log(2)
            break;
          case '冲账':
            console.log(3)
            break;
          case '打印':
            console.log(4)
            break;
          case '预授权':
            console.log(5)
            break;
          case '备注':
            console.log(6)
            break;
          case '联房结账':
            console.log(7)
            break;
          case '加收房费':
            console.log(8)
            break;
          case '调整':
            console.log(9)
            break;
          case '换房':
            console.log(10)
            break;
          default:
            // statements_def
            break;
        }
      },
      changeImgRotate(k,item) {
        // console.log('nn',i)
        if(!this.imgRotate.includes(k)) {
          this.imgRotate.push(k)
          // item.data.forEach((e,i)=>{
          //  if (!this.iconClassArr.includes(e)){
          //    this.iconClassArr.push(e)
          //  }
          // })
        }else{
          let a = this.imgRotate.indexOf(k)
          this.imgRotate.splice(a, 1)
          // item.data.forEach((e,i)=>{
          //  if (this.iconClassArr.includes(e)){
          //    let find = this.iconClassArr.indexOf(e)
          //    this.iconClassArr.splice(find, 1)
          //  }
          // })
        }
      },
      beNone() {
        bus.ev.$emit('getMoneyBeNone')
      },
      resize(){
        let _this = this;
        let preheight = this.$refs.wrap.clientHeight;
        let childheight = this.$refs.textheight.clientHeight; 
        let scale = preheight / childheight;
        console.log(preheight,childheight,scale)
      }
    },
    mounted() {
      bus.ev.$on('checkoutNone',(e) => {
        this.checkOutNone = false
        if (typeof e != 'undefined') {
          this.beNone()
          // this.$router.push("/containerwhite/orderlist")
        }
      })
      bus.ev.$on('consumptionListNone', () => {
        this.consumptionListNone = false
      })
      bus.ev.$on('guestNone', () => {
        this.guestNone = false
      })
      bus.ev.$on('consumpItemNone', () => {
        setTimeout(()=>{
        //   API.get("/pms/roomstatus/bill?id=" + this.orderId).then(res=>{
        //   console.log('tuifang000491cfu',res)
        //   this.consumptionList = res.data
        // })
        API.get("/pms/roomstatus/order/" + this.orderId).then(res=>{   //this.roomId
          if(res.error_code == 0) {
            this.message = res.data
            // this.orderId = res.data.id
            API.get("/pms/roomstatus/bill?id=" + this.orderId).then(res=>{
              this.consumptionList = res.data
            })
          }
        })
        },0)
        this.$nextTick().then(()=>{
          this.consumpItemNone = false
        })
      })
    },  
    created() {
      bus.ev.$on('willBeOrderGetMoney',(e)=>{
        console.log('tuifang000',e)
        this.orderId = e.order_id
        this.roomId = e.room_id
        this.memberId = e.member_id
        API.get("/pms/roomstatus/order/" + this.orderId).then(res=>{
         console.log('tuifang000',res)
         if(res.error_code == 0) {
           this.message = res.data
           // this.orderId = res.data.id
           API.get("/pms/roomstatus/bill?id=" + this.orderId).then(res=>{
             console.log('tuifang000491',res)
             this.consumptionList = res.data
           })
         }
        })
      })
    },
    destroyed(){
      bus.ev.$off('consumpItemNone')
      bus.ev.$off('willBeOrderGetMoney')
    }
  }
</script>

<style lang="scss" scoped>
  .money{
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,.4);
    z-index: 999;
    img.imgrotate{
      transform: rotate(0deg);
    }
    .imgabsolute{
      margin-top: 10px;
      margin-right: 30px;
      transform: rotate(-90deg);
    }
    .middle{
      display: inline-block;
      vertical-align: middle;
    }
    .mitop{
      display: inline-block;
      vertical-align: top;
    }
    .contain{
      width: 1030px;
      position: absolute;
      top: 10%;
      left: 22%;
      max-height: 600px;
      overflow-y: auto;
      background: #fff;
      font-size: 14px;
    }
    .head{
      width: 100%;
      height: 40px;
      background: #437ff9;
      box-sizing: border-box;
      padding: 0 30px;
      color: #fff;
      line-height: 40px;
    }
    .text{
      width: 100%;
      box-sizing: border-box;
      padding: 26px 30px 40px 30px;
    }
    .texthead{
      width: 100%;
      position: relative;
      border-bottom: 1px solid #e6e6e6;
      li{
        float: left;
        h5{
          font-size: 16px;
          margin-bottom: 14px;
          font-weight: bold;
        }
        p{
          margin-bottom: 11px;
        }
      }
      .two{
        height: 140px;
        border-left: 1px solid #e6e6e6;
        margin-top: 4px;
        margin-left: 30px;
        margin-right: 30px;
      }
      .five{
        padding-top: 4px;
        width: 162px;
        overflow: hidden;
        .ico{
          float: left;
          width: 70px;
          height: 70px;
          background: #6c9ef7;
          color: #fff;
          text-align: center;
          border-radius: 4px;
          cursor: pointer;
          nav{
            width: 70px;
            height: 36px;
            background: cyan;
            margin: 7px 0;
          }
        }
      }
    }
    .moneytitle{
      font-size: 16px;
      font-weight: bold;
      margin: 12px 0;
    }
    .list{
      margin-bottom: 5px;
      ul{
        width: 100%;
        // boder: 1px solid #e6e6e6;
        border-right: none;
        li{
          height: 28px;
          width: 88px;
          text-align: center;
          line-height: 28px;
          border: 1px solid #6c9ef7;
          border-right: none;
          color: #6c9ef7;
          cursor: pointer;
        }
        .active{
          background: #6c9ef7;
          color: #fff;
        }
      }
    }
    .bj{
      background: #f4f8ff;
    }
    .listtable{
      height: 155px;
      overflow-y: auto;
      position: relative;
      .bortopnone{
        border-top: none;
      }
      .table{
        // width: 99%;
        width: 935px;
        border-right: none;
        cursor: pointer;
        li.four{
          width: 180px;
          border-right: 1px solid #e6e6e6;
        }
      }
    }
    .table{
      width: 100%;
      border: 1px solid #a9bfd6;
      li{
        float: left;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-right: 1px solid #ccc;
      }
      .one{
        position: relative;
        width: 66px;
        em{
          position: absolute;
          top: 8px;
          right: 16px;
          width: 12px;
          height: 12px;
          border: 1px solid #ccc;
          border-radius: 2px;
        }
      }
      .two{
        width: 550px;
        p{
          width: 100%;
          text-align: left;
          box-sizing: border-box;
          padding-left: 52px;
        }
      }
      .three{
        width: 133px;
      }
      .four{
        width: 180px;
      }
      .bor-none{
        border-right: none;
      }
    }
    .addpay{
      margin: 10px 0;
      .addpaylist{
        width: 773px;
        height: 30px;
        line-height: 30px;
        color: #fff;
        background: #424f5b;
        li{
          float: left;
        }
        .one{
          margin-left: 10px;
          margin-right: 80px;
        }
        .two{
          margin-right: 70px;
        }
        .three{
          margin-right: 70px;
        }
      }
      .addbtn{
        width: 148px;
        height: 28px;
        line-height: 28px;
        border: 1px solid #424f5b;
        color: #424f5b;
        box-sizing: border-box;
        padding-left: 16px;
        margin-left: 14px;
      }
    }
    footer{
      width: 930px;
      margin-top: 20px;
      .footdo{
        float: left;
        margin-top: 8px;
        margin-right: 16px;
      }
      .footdolist{
        float: left;
        ul{
          width: 880px;
          li{
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
          .clickbac{
            background: #b3b3b3;
          }
          .mrgtop{
            margin-top: 8px;
          }
        }
      }
    }
  }
</style>