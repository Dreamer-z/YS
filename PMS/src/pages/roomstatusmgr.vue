<template>
  <div class="price-scheme">
    <div ref="bar" class="white">
      <div class="seclect-list">
        <div class="middle">
          <span class="middle">日期：</span>
          <p @click="changeDate(item.start, item.end,  index)" :class="[dateIndex == index?'cg-bj':'']" v-for="(item,index) in dateArr" :key="index" class="middle month-list">{{item.name}}</p>
        </div>
        <!-- <div style="margin-left:150px;" class="middle">
          <span>客户类型：</span>
          <p @click="changeType(dateArr[dateIndex].start,dateArr[dateIndex].end,item.type,index)" v-for="(item,index) in typeArr" :key="index" :class="[typeIndex == index?'cg-bj':'']" class="middle peo-list">{{item.name}}</p>
        </div> -->
      </div>
      <div class="text">
        <div class="check">
          <el-button @click="letCheckoutShow" style="width:100px;" size="small" type="primary">批量设置房态</el-button>
          <el-button @click="letTypePriceShow" style="width:100px;" size="small" type="primary">日志记录</el-button>
        </div>
        <div @mouseleave="rowIndex = -1;cowIndex = -1" class="box clearfix">
          <table class="fl" border="0">
            <tbody>
              <tr style="background: #f2f2f2;border: 1px solid #e5e5e5;">
                <td style="width: 120px;height:40px;">房型名称</td>
              </tr>
            </tbody>
            <tbody v-for="(item,index) in romTypeArr" :key="index">
              <tr :style="{background: index == cowIndex?'cyan':''}" style="border: 1px solid #e5e5e5;">
                <td>
                  <span>{{item.name}}</span>
                </td>
              </tr>
            </tbody>
          </table>
          <div ref="setWidth" :style="{'overflowX': isHeighter?'hidden':'auto'}" class="text-tab fl">
            <div ref="truthWidth" :style="{width: dateHead.length*91 + 'px'}" class="text-body">
              <ul class="clearfix">
                <li :style="{background: index == rowIndex?'cyan':''}" v-for="(item,index) in dateHead" :key="index" style="border-top: 1px solid #e5e5e5;border-bottom: 1px solid #e5e5e5;background: #f2f2f2;" class="text-body-li fl">{{item.month+'.'+item.date+'('+item.week+')'}}</li>
              </ul>
              <ul :style="{background: index == cowIndex?'cyan':''}" class="clearfix" v-for="(item,index) in allListArr" :key="index"> <!-- ||num < rowIndex&&index==cowIndex?'cyan':'' -->
                <li :style="{background: num==rowIndex?'cyan':''}" @mouseover="rowIndex = num" @mouseenter="cowIndex = index" v-for="(val,num) in item" :key="num" style="lineHeight:60px;height:60px;border-bottom: 1px solid #e5e5e5;" class="text-body-li fl">
                  <div @click="setDoubleClick(val,num,index)" :class="{'is-close': val.isClose === 1,'is-thesame' :val.bookingNum == val.roomNum && val.bookingNum !== 0}" style="cursor:pointer;">
                    <div class="middle">
                      <p v-if="val.isClose === 0" style="lineHeight:normal;textAlign:left;">
                        <span>房数：</span>
                        <span>{{Number(val.roomNum) === 0?'无限':val.roomNum}}</span>
                      </p>
                      <p v-else style="lineHeight:normal;textAlign:left;">
                        <span>关闭</span>
                      </p>
                      <p style="lineHeight:normal;textAlign:left;">
                        <span>已订：</span>
                        <span style="color:#1dceb1;">{{val.bookingNum}}</span>
                      </p>
                      <p style="lineHeight:normal;textAlign:left;color:#333;">
                        <span>￥{{val.price}}</span>
                      </p>
                    </div>
                  </div>
                  <!-- <p style="background:#f4f8ff;height:39px;">
                    <span>{{val.price}}</span>
                  </p> -->
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="isHeighter && isWidther" ref="xBar" class="x-bar">
      <nav ref="scrollX" class="scroll-x"></nav>
    </div>
    <wechartTypeReport @typePriceNone="letTypePriceNone" v-if="isTypePriceShow"></wechartTypeReport>
    <wechartRoomType :typeArr="romTypeArr" @checkoutNone="letCheckoutNone" v-if="isCheckoutShow"></wechartRoomType>       <!-- :typeList="checkOutMsg" -->
    <wechartTypeOne :val="doubleMsg" @doubleNone="setDoubleNone" v-if="isDoubleShow"></wechartTypeOne>
  </div>
</template>

<script>
import wechartTypeReport from "@/components/public/wecharttypereport"  // 日志
import wechartTypeOne from "@/components/public/wecharttypeone"     // 双击
import wechartRoomType from "@/components/public/wechartroomtype"     //批量
import clumBread from "@/components/public/clumbread"
import API from "@/store/API"
import { mapGetters } from 'vuex'
  export default{
    name: 'roomStatusMgr',
    data() {
      return {
        cowIndex: -1,
        rowIndex:-1,
        isHeighter: false,
        isWidther: false,
        roomTypeIds: [],
        romTypeArr: [],
        dateIndex: 0,
        typeIndex: 0,
        isTypePriceShow: false,
        isDoubleShow: false,
        isCheckoutShow: false,
        weeks: ['日','一','二','三','四','五','六'],
        dateArr: [],
        typeArr: [],
        startDate: 1,
        endDate: 30,
        startDay: -1,
        dateHead: [],
        totalArr: [],
        saveTotalArr: [],
        num: 21,
        allListArr: [],
        saveAllListArr: [],
        nowYear: '',
        doubleMsg: {},
        // checkOutMsg: []
      }
    },
    methods: {
      changeDate(start,end,index) {
        this.dateIndex = index
        this.allListArr = []
        this.dateHead = []
        this.creatDateList(start*1000, end*1000)
        this.getTypePriceList()
        let oScrollX = document.getElementsByClassName('scroll-x')[0]
        oScrollX.style.left = 0
      },
      letTypePriceNone() {
        this.isTypePriceShow = false
      },
      letTypePriceShow() {
        this.isTypePriceShow = true
      },
      setDoubleClick(item,num,index) {
        this.doubleMsg = {...item}
        this.doubleMsg.num = num
        this.doubleMsg.index = index
        this.doubleMsg.roomTypeId = this.romTypeArr[index].id
        this.doubleMsg.roomTypeName = this.romTypeArr[index].name
        this.isDoubleShow = true
      },
      setDoubleNone(e) {
        this.isDoubleShow = false
        if (e) {
          this.allListArr[e.index][e.num].isClose = e.isClose
          this.allListArr[e.index][e.num].roomNum = e.roomNum
        }
      },
      letCheckoutNone(e) {
        this.isCheckoutShow = false
        if (e) {
          let loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          this.allListArr = []
          this.dateHead = []
          this.creatDateList(this.dateArr[this.dateIndex].start*1000, this.dateArr[this.dateIndex].end*1000)
          this.getTypePriceList()
          loading.close()
				  loading = null
        }
      },
      letCheckoutShow() {
        // let arr = [...this.typeArr]
        // this.checkOutMsg = arr.splice(1)
        this.isCheckoutShow = true
      },
      getTypePriceList() {
        let loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        let start = `${this.nowYear}-${this.dateHead[0].showDate.split('.')[0]}-${this.dateHead[0].showDate.split('.')[1]}`
        let end = `${this.nowYear}-${this.dateHead[this.dateHead.length - 1].showDate.split('.')[0]}-${this.dateHead[this.dateHead.length - 1].showDate.split('.')[1]}`
        var self = this
        self.allListArr = []
        let obj = {
          id: this.hotel.id, //	是	int	酒店id
          roomTypeIds: this.roomTypeIds,   //	是	array	包含房型id,房型id的对象数组
          start,         //	是	string	Y-M-D日期格式
          end           //	是	string	Y-M-D日期格式
        }
        API.post("/pms/num/search", obj).then(res => {
          loading.close()
				  loading = null
          if (res.error_code == 0) {
            let arr = res.data
            arr.forEach(e => {
              this.allListArr.push(e.data)
            })
            this.isShowBar()
          } else {
          if (res.msg) {
            this.$message.error(`${res.msg}`)
          }
        }
        })
      },
      creatDateList(start,end) {
        let sdate = new Date(start)
        let edate = new Date(end)
        this.nowYear = sdate.getFullYear()
        let startMonth = sdate.getMonth()    //  这个月份
        this.startDay = sdate.getDay()
        this.startDate = sdate.getDate()
        // console.log('00100200300.0.0',sdate.getDate(),edate.getDate())
        let startNum = 0
        for (let i = sdate.getDate(); i <= edate.getDate(); i++) {
          this.dateHead.push({
            month: startMonth + 1,
            date: (this.startDate + startNum) < 10? '0'+(this.startDate + startNum):(this.startDate + startNum),
            week: this.weeks[(this.startDay + startNum)%7],
            showDate:`${startMonth+1}.${(this.startDate + startNum) < 10? '0'+(this.startDate + startNum):(this.startDate + startNum)}` 
          })
          startNum++
        }
      },
      isShowBar() {
        this.$nextTick(() => {
          let oText = document.getElementsByClassName('text-tab')[0]
          let oWhite = document.getElementsByClassName('white')[0]
          let textBody = document.getElementsByClassName('text-body')[0]
          let oScrollX = document.getElementsByClassName('scroll-x')[0]
          let oxBar = document.getElementsByClassName('x-bar')[0]

          if (oWhite.offsetHeight > window.innerHeight) {
            this.isHeighter = true
            let tWidth = textBody.offsetWidth
            let tHeight = textBody.offsetHeight
            oText.style.height = tHeight +'px'
            oxBar.style.width = oText.offsetWidth -12 +'px'    //this.$refs.setWidth.offsetWidth +'px'       //style.width
            textBody.style.position = 'absolute'   // this.$refs.truthWidth
            oScrollX.style.width = (oText.offsetWidth / tWidth) * oText.offsetWidth - 13 +'px'
            
            this.setMoveLeft()
          } else {
            this.isHeighter = false
          }
          if (textBody.offsetWidth > window.innerWidth - 500) {
            this.isWidther = true
          } else {
            this.isWidther = false
            // let oScrollX = document.getElementsByClassName('scroll-x')[0]
            // let oBody = document.getElementsByClassName('text-body')[0]
            textBody.style.position = 'relative'
            oScrollX.style.left = 0 + 'px'
            textBody.style.left = 0 + 'px'
            return
          }
        })
      },
      setMoveLeft() {
        // if (!this.isHeighter || !this.isWidther) {return}
        let oxBar = document.getElementsByClassName('x-bar')[0]
        let oScrollX = document.getElementsByClassName('scroll-x')[0]
        let oBody = document.getElementsByClassName('text-body')[0]
        let left = 0
        let scale
        function getDownX (ev) {
          let downX = ev.clientX
          function getMoveX(ev) {
            left += ev.clientX - downX
            if (left <= 0) {
              left = 0
            }
            if (left >= (oxBar.offsetWidth - oScrollX.offsetWidth)) {
              left = (oxBar.offsetWidth - oScrollX.offsetWidth)
            }
            oScrollX.style.left = left + 'px'
            scale = left / oxBar.offsetWidth
            oBody.style.left = -scale*oBody.offsetWidth + 'px'
            downX = ev.clientX
            ev.preventDefault()
            ev.stopPropagation()
          }
          document.addEventListener('mousemove',getMoveX,false)
          document.addEventListener('mouseup',getUp,false)
          function getUp() {
            // oScrollX.removeEventListener("mousedown",getDownX,false)
            document.removeEventListener("mousemove",getMoveX,false)
            document.removeEventListener("mouseup",getUp,false)
          }
        }
        oScrollX.addEventListener('mousedown',getDownX,false)
      }
    },
    mounted() {
      // window.onresize = () => {
      //   this.isShowBar()
      // }
    },
    created() {
      API.get("/pms/num/info?id=" + this.hotel.id).then(res => {
        if (res.error_code == 0) {
          this.dateArr = res.data.date
          if (!res.data.roomTypes.length){
            this.$message.error('请先创建房型')
            // this.$router.push('/container/roomtypelist')
            return
          }
          this.romTypeArr = res.data.roomTypes
          this.creatDateList(res.data.date[0].start*1000,res.data.date[0].end*1000)
          this.romTypeArr.forEach(e => {
            this.roomTypeIds.push(e.id)
          })
          this.getTypePriceList()
        } else {
          if (res.msg) {
            this.$message.error(`${res.msg}`)
          }
        }
      })
    },
    components: {
      wechartTypeReport,
      wechartTypeOne,
      clumBread,
      wechartRoomType
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
  .price-scheme{
    width: 100%;
    height: 100%;
    position: relative;
    color: #333;
    .white{
      width: 100%;
    }
    .seclect-list{
      box-sizing: border-box;
      padding-bottom: 10px;
      margin-bottom: 10px;
      background: #f2f2f2;
      padding-left: 35px;
      padding-right: 35px;
      border-bottom: 1px solid #ccc;
      .month-list{
        width: 58px;
        height: 28px;
        line-height: 30px;
        text-align: center;
        border:1px solid #d9d9d9;
        margin: 0 8px;
        cursor: pointer;
        border-radius: 2px;
        background: #fff;
      }
      .peo-list{
        padding: 0 16px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background: #e6e6e6;
        margin: 0 8px;
        cursor: pointer;
      }
      .cg-bj{
        background: #fcdc6d;
      }
    }
    .check{
      margin-bottom: 5px;
    }
    .box,.check{
      box-sizing: border-box;
      padding-left:35px;
      padding-right:35px;
    }
    table{
      table-layout:fixed;
      word-break:break-all;
      // overflow-x: auto;
      width: 200px;
    }
    td{
      height: 60px;
      text-align: center;
      word-wrap: break-word;
      // overflow: hidden;
      // white-space: nowrap;
      // text-overflow:ellipsis;
    }
    .text-tab{
      width: calc(100% - 200px);
      position: relative;
      // overflow-x: auto;
    }
    .is-thesame{
      background: rgba(236,84,84,.08);
      color: #ec5454;
    }
    .is-close{
      background: rgba(103,123,222,.08);
      color:#677bde;
      // color: #fff;
    }
    .text-body{
      // position: absolute;
    }
    .text-body-li{
      width: 90px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-right: 1px solid #e5e5e5;
    }
    .x-bar{
      height: 16px;
      position: fixed;
      bottom:0;
      left:450px;
      .scroll-x{
        height: 16px;
        position: absolute;
        top:0;left:0;
        border-radius: 50px;
        background: rgb(194,194,194)
      }
    }
  }
</style>


