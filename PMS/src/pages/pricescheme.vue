<template>
  <div class="price-scheme">
    <div class="white">
      <div class="seclect-list">
        <div class="middle">
          <span class="middle">日期：</span>
          <p @click="changeDate(item.start, item.end, typeArr[typeIndex].type, index)" :class="[dateIndex == index?'cg-bj':'']" v-for="(item,index) in dateArr" :key="index" class="middle month-list">{{item.name}}</p>
        </div>
        <div style="margin-left:150px;" class="middle">
          <span>客户类型：</span>
          <p @click="changeType(dateArr[dateIndex].start,dateArr[dateIndex].end,item.type,index)" v-for="(item,index) in typeArr" :key="index" :class="[typeIndex == index?'cg-bj':'']" class="middle peo-list">{{item.name}}</p>
        </div>
      </div>
      <div class="text">
        <div class="check">
          <el-button style="width:114px;" @click="letCheckoutShow" type="primary">批量设置价格</el-button>
          <!-- <p @click="letCheckoutShow" class="check-list">
            <span>批量设置价格</span>
          </p>
          <p @click="letTypePriceShow" style="margin-left: 20px;" class="check-list">
            <span>
              日志记录
            </span>
          </p> -->
          <el-button style="width:100px;" @click="letTypePriceShow" type="primary">日志记录</el-button>
        </div>
        <div class="box clearfix">
          <table class="fl" border="0">
            <tbody>
              <tr style="background: #f2f2f2;border:1px solid #e5e5e5;">
                <td style="width: 120px;border:1px solid #e5e5e5;">类型</td>
                <td style="width: 160px;">房型</td>
              </tr>
            </tbody>
            <tbody v-for="(item,index) in totalArr" :key="index">
              <tr style="border:1px solid #e5e5e5;">
                <td :rowspan="item.data.length+1" style="width: 120px;border:1px solid #e5e5e5;">
                  <div v-if="item.type == 1">
                    <p>【会员】</p>
                    <p>{{item.name}}</p>
                  </div>
                  <div v-if="item.type == 0">
                    <p>【散客】</p>
                    <p>门市价</p>
                  </div>
                </td>
              </tr>
              <tr style="border:1px solid #e5e5e5;" v-for="(val,num) in item.data" :key="num">
                <td style="width: 160px;">{{val.roomTypeName}}</td>
              </tr>
            </tbody>
          </table>
          <div class="text-tab fl">
            <div :style="{width: dateHead.length*91 + 'px'}" class="text-body">
              <ul class="clearfix">
                <li v-for="(item,index) in dateHead" :key="index" style="border-top: 1px solid #e5e5e5;border-bottom: 1px solid #e5e5e5;background: #f2f2f2;" class="text-body-li fl">{{item.month+'.'+item.date+'('+item.week+')'}}</li>
              </ul>
              <ul class="clearfix" v-for="(item,index) in allListArr" :key="index">
                <li v-for="(val,num) in item" :key="num" @dblclick="setDoubleClick(val,num,index)" style="border-bottom: 1px solid #e5e5e5;cursor:pointer;" class="text-body-li fl">{{val.price}}</li>
              </ul>
            </div>
          </div> 
        </div>
      </div>
    </div>
    <type-price-report @typePriceNone="letTypePriceNone" v-if="isTypePriceShow"></type-price-report>
    <checkout-price-cheme :typeList="checkOutMsg" @checkoutNone="letCheckoutNone" v-if="isCheckoutShow"></checkout-price-cheme>
    <double-click-price :val="doubleMsg" @doubleNone="setDoubleNone" v-if="isDoubleShow"></double-click-price>
  </div>
</template>

<script>
import typePriceReport from "@/components/public/typepricereport"  // 日志
import doubleClickPrice from "@/components/public/doubleclick"     // 双击
import checkoutPriceCheme from "@/components/public/checkoutpricecheme"     //批量
import clumBread from "@/components/public/clumbread"
import API from "@/store/API"
import { mapGetters } from 'vuex'
  export default{
    name: 'priceScheme',
    data() {
      return {
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
        checkOutMsg: []
      }
    },
    methods: {
      changeType(start, end, type, index) {
        this.typeIndex = index
        this.allListArr = []
        this.dateHead = []
        this.creatDateList(start*1000, end*1000)
        this.getTypePriceList(start, end, type)
      },
      changeDate(start,end,type,index) {
        this.dateIndex = index
        this.allListArr = []
        this.dateHead = []
        this.creatDateList(start*1000, end*1000)
        this.getTypePriceList(start, end, type)
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
        this.isDoubleShow = true
      },
      setDoubleNone(e) {
        this.isDoubleShow = false
        if (e) {
          this.allListArr[e.index][e.num].price = e.roomTypeIds[0].price
        }
      },
      letCheckoutNone(e) {
        this.isCheckoutShow = false
        if (e) {
          this.loading = true
          this.allListArr = []
          this.dateHead = []
          this.creatDateList(this.dateArr[this.dateIndex].start*1000, this.dateArr[this.dateIndex].end*1000)
          this.getTypePriceList(this.dateArr[this.dateIndex].start, this.dateArr[this.dateIndex].end, this.typeArr[this.typeIndex].type)
          this.loading = false
        }
      },
      letCheckoutShow() {
        let arr = [...this.typeArr]
        this.checkOutMsg = arr.splice(1)
        this.isCheckoutShow = true
      },
      getTypePriceList(start,end,type) {
        let loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        var self = this
        self.allListArr = []
        API.get(`/pms/price/query?id=${this.hotel.id}&start=${start}&end=${end}&type=${type}`).then(res => { // 返回不*1000  我自己用要*1000 
          if (res.error_code == 0) {
            let arr = res.data
            if (!arr[0].data.length) {
              loading.close()
              loading = null
              this.$message.error('请先创建房型')
              return
            }
            this.totalArr = arr
            this.saveTotalArr = [...this.totalArr]
            let listArr = []
            arr.forEach((e,index) => { //4
              var id = arr[index].id
              var userType = arr[index].type
              var userTypeName = arr[index].name
              e.data.forEach(v => {
                var hasPirces = {}
                v.prices.forEach(price => {
                  hasPirces[price.date] = price.price
                })
                for(var i = 0 ; i < self.dateHead.length ; i++){
                  var findDate = self.dateHead[i].showDate
                  // var price = v.roomTypePrice
                  let price = ''
                  if(typeof hasPirces[findDate] != 'undefined'){
                    price = hasPirces[findDate]
                  }
                  listArr.push({
                    date:findDate,
                    roomTypeId:v.roomTypeId,
                    roomTypeName: v.roomTypeName,
                    userType:userType,
                    userTypeName,
                    memberId:id,
                    price:price,
                    showPrice: price || v.roomTypePrice,
                    fullDate: `${this.nowYear}.${findDate}`
                  })
                }
                self.allListArr.push([...listArr]) 
                listArr = []   
              })
            })
            this.saveAllListArr = [...this.allListArr]
            loading.close()
						loading = null
          } else {
            loading.close()
            loading = null
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
      }
    },
    beforeCreate() {
      
    },
    created() {
      API.get("/pms/price/info?id=" + this.hotel.id).then(res => {
        if (res.error_code == 0) {
          this.dateArr = res.data.date
          this.typeArr = res.data.type
          this.creatDateList(res.data.date[0].start*1000,res.data.date[0].end*1000)
          this.getTypePriceList(res.data.date[0].start, res.data.date[0].end, this.typeArr[0].type)
        } else {
          if (res.msg) {
            this.$message.error(`${res.msg}`)
          }
        }
      })
    },
    components: {
      typePriceReport,
      doubleClickPrice,
      clumBread,
      checkoutPriceCheme
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
    .white{
      width: 100%;
      // box-sizing: border-box;
      // padding-left: 35px;
      // padding-right: 35px;
    }
    .seclect-list{
      padding-bottom: 10px;
      border-bottom: 1px solid #ccc;
      margin-bottom:10px;
      background: #f2f2f2;
      box-sizing: border-box;
      padding-right: 35px;
			padding-left: 35px;
      .month-list{
        width: 60px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background: #fff;
        border:1px solid #d9d9d9;
        border-radius: 2px;
        margin: 0 8px;
        cursor: pointer;
      }
      .peo-list{
        padding: 0 16px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background: #fff;
        border:1px solid #d9d9d9;
        border-radius: 2px;
        margin: 0 8px;
        cursor: pointer;
      }
      .cg-bj{
        background: #fcdc6d;
      }
    }
    .check{
      padding-bottom:5px;
    }
    .box,.check{
      box-sizing: border-box;
      padding-left:35px;
      padding-right:35px;
    }
    .check-list{
      display: inline-block;
      margin-bottom: 10px;
      width: 100px;
      height: 30px;
      border-radius: 4px;
      line-height: 30px;
      text-align: center;
      color: #fff;
      background: #437ff9;
      cursor: pointer;
    }
    table{
      table-layout:fixed;
      word-break:break-all;
      // overflow-x: auto;
      width: 200px;
    }
    td{
      height: 40px;
      text-align: center;
      word-wrap: break-word;
      // overflow: hidden;
      // white-space: nowrap;
      // text-overflow:ellipsis;
    }
    .text-tab{
      width: calc(100% - 284px);
      overflow-x: auto;
    }
    .text-body{
      
    }
    .text-body-li{
      width: 90px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-right: 1px solid #e5e5e5;
    }
  }
</style>


