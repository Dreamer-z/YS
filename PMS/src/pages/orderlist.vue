<template>
	<div class="order-list">
		<div class="whitetext">
		  <div class="tatal-list">
		  	<div class="time">
		  		<p class="middle">抵达时间：</p>
		  		<ul class="middle list-pre">
            <el-checkbox style="marginRight:30px;" class="middle" v-model="AllArriveTimeClass" label="全部" @change="getAllArriveTimeClass"></el-checkbox>
            <el-checkbox-group class="middle" v-model="arriveTimeClassArr">
              <el-checkbox style="width:100px;" @click="setarriveTimeClass(item.id)" v-for="(item,index) in ArriveTimeArr" :label="item.id" :key="index">{{item.name}}</el-checkbox>
            </el-checkbox-group>
		  		</ul>
		  	</div>
		  	<div class="time">
		  		<p style="width: 60px;" class="middle">状态：</p>
		  		<ul class="middle list-pre">
            <el-checkbox style="marginRight:30px;" class="middle" v-model="AllOrderStatusClass" label="全部" @change="getAllOrderStatusClass"></el-checkbox>
            <el-checkbox-group class="middle" v-model="orderStatusClassArr">
              <el-checkbox style="width:100px;" @click="setorderStatusClass(item.id)" v-for="(item,index) in orderStatusArr" :label="item.id" :key="index">{{item.name}}</el-checkbox>
            </el-checkbox-group>
		  		</ul>
		  	</div>
		  	<!-- <div class="time">
		  		<p class="middle">排房状态：</p>
		  		<ul class="middle list-pre">
            <el-checkbox style="marginRight:30px;" class="middle" v-model="AllreservationsClass" label="全部" @change="getAllreservationsClass"></el-checkbox>
            <el-checkbox-group class="middle" v-model="reservationsClassArr">
              <el-checkbox style="width:100px;" @click="setReservationsClass(item.id)" v-for="(item,index) in reservationsArr" :label="item.id" :key="index">{{item.name}}</el-checkbox>
            </el-checkbox-group>
		  		</ul>
		  	</div> -->
		  	<div class="time">
		  		<p class="middle">客源渠道：</p>
		  		<ul class="middle list-pre">
            <el-checkbox style="marginRight:30px;" class="middle" v-model="AllFromWayClass" label="全部" @change="getAllFromWayClass"></el-checkbox>
            <el-checkbox-group class="middle" v-model="fromWayClassArr">
              <el-checkbox style="width:100px;" @click="setfromWayClass(item.id)" v-for="(item,index) in fromWayArr" :label="item.id" :key="index">{{item.name}}</el-checkbox>
            </el-checkbox-group>
		  		</ul>
		  	</div>
		  	<ol class="search">
		  		<li class="middle">
		  			<p class="middle">
		  				<span class="middle">预订人</span>
		  				<span class="middle">：</span>
		  			</p>
		  			<!-- <input v-model="searchJson.username" class="middle" type="text"> -->
            <p class="middle">
              <el-input placeholder="身份证号码" v-model="searchJson.username" style="width: 180px;" size="mini"></el-input>
            </p>
		  		</li>
		  		<li class="middle">
		  			<p class="middle">
		  				<span class="middle">预订手机</span>
		  				<span class="middle">：</span>
		  			</p>
		  			<!-- <input v-model="searchJson.mobile" class="middle" type="text"> -->
            <p class="middle">
              <el-input placeholder="手机号码" v-model="searchJson.mobile" style="width: 180px;" size="mini"></el-input>
            </p>
		  		</li>
		  		<li class="middle">
		  			<p class="middle">
		  				<span class="middle">订单号</span>
		  				<span class="middle">：</span>
		  			</p>
		  			<!-- <input :title="searchJson.order_no" v-model="searchJson.order_no" class="middle" type="text"> -->
            <p class="middle">
              <el-input placeholder="订单号码" v-model="searchJson.order_no" style="width: 180px;" size="mini"></el-input>
            </p>
		  		</li>
		  		<li class="middle">
		  			<p class="middle">
		  				<span class="middle">预入离时段</span>
		  				<span class="middle">：</span>
		  			</p>
            <div class="middle">
              <el-date-picker
                v-model="totalTimes"
                value-format="yyyy-MM-dd"
                size="mini"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </div>
		  		</li>
		  		<li @click="listCheckTable(1)" class="middle">  <!--  btnserch  -->
		  			<!-- <span>搜索预订</span> -->
            <el-button size="mini" type="primary">搜索预订</el-button>
		  		</li>
		  	</ol>
		  </div>
		  <div class="table">
		  	<ul class="thead tbody">
		  		<li class="one">订单号</li>
		  		<li class="one">客源渠道</li>
		  		<li class="one">预订人</li>
		  		<li class="two">预订手机</li>
		  		<li class="two">会员卡号</li>
		  		<!-- <li class="one">房间数</li> -->
		  		<li class="one">预订金额</li>
		  		<!-- <li class="one">担保状态</li> -->
		  		<li class="two">预抵日期</li>
		  		<li class="two">预离日期</li>
		  		<li class="one">入住天数</li>
		  		<!-- <li class="one">保留时效</li> -->
		  		<li class="one">状态</li>
		  		<!-- <li class="two">排房情况</li> -->
		  		<li class="two">操作</li>
		  	</ul>
		  	<ul :class="{'bj': index%2 == 0}" :key="index" v-for="(item, index) in orderListArr" class="tbody">
		  		<li style="border-left: 1px solid #e5e5e5;" :title= "item.order_no" class="one">{{item.order_no}}</li>
		  		<li class="one">{{item.from_name}}</li>
		  		<li :title= "item.user?item.user.nickname:''" class="one">{{item.user_name}}</li>   <!--item.user?item.user.nickname:''-->
		  		<li class="two">{{item.mobile}}</li>
		  		<li class="two">007</li>
		  		<!-- <li class="one">{{item.snap_items.total_count}}</li> -->
		  		<li class="one">{{item.sum}}</li>   <!-- snap_items.total_price -->
		  		<li class="two">{{item.come_time}}</li>
		  		<li class="two">{{item.leave_time}}</li>
		  		<li class="one">{{item.days}}</li>
		  		<li class="one">{{item.order_status}}</li>
		  		<!-- <li class="two">{{item.set_status}}</li> -->
          <!-- new Date(item.come_time.replace(/-/g, '/')).getTime() < new Date().getTime() -->
          <li v-if="false" style="border-right: 1px solid #e5e5e5;cursor: pointer; color: #bfbfbf;" class="two">NO SHOW</li>
		  		<li v-else-if="item.order_status == '已取消'" style="border-right: 1px solid #e5e5e5;cursor: pointer; color: #bfbfbf;" class="two">查看详情</li>
          <router-link v-else :to="{ name:'oneOrderList',params: { id: item.id,keepCatch: {keepArrJson,keepSearchJson,'keepIsSearch':keepIsSearch,'keepPage':keepPage}}}" tag="li" style="border-right: 1px solid #e5e5e5;cursor: pointer; color: #1dceb1;" class="two">查看详情</router-link>
		  	</ul>
        <div style="text-align: center; margin-top: 100px;">
          <el-pagination
            @current-change="currentChange"
            @prev-click="currentChange"
            @next-click="currentChange"
            :page-size="10"
            :current-page.sync="currentPage"
            layout="prev, pager, next"
            :total="totalCount">
          </el-pagination>
        </div> <!-- 10 -->
		  </div>
		</div>
    <!-- <be-stay v-if="isBeStayShow"></be-stay> -->
    <!-- <get-money v-if="isGetMoneyShow"></get-money> -->
    <!-- <order-bestay></order-bestay> -->
    <!-- <row-room></row-room> -->
	</div>
</template>

<script>
let loc = window.sessionStorage
import orderBestay from "@/components/public/orderBestay"   //   办理入住小程序
import { mapGetters } from 'vuex'
import API from "@/store/API"
import beStay from "@/components/public/bestay"
import getMoney from "@/components/public/getmoney"
// import rowRoom from "@/components/public/rowroom"
	export default{
		name: 'orderList',
		data() {
			return {
        totalTimes: [],
        isSearch: false,
        totalCount: 1,    //  总条目数   后台传来
        currentPage: 1,   //  当前的页码   搜索的时候变为1
        orderStatusArr: [],
        orderStatusClassArr: [],
        AllOrderStatusClass: false,
        ArriveTimeArr: [],
        arriveTimeClassArr: [],
        AllArriveTimeClass: false,
        reservationsArr: [],  // 排放状态
        reservationsClassArr: [],
        AllreservationsClass: false,
        AllFromWayClass: false,
        fromWayClassArr: [],
        fromWayArr: [],
        isRowRoomShow: false,
        isGetMoneyShow: false,
        isBeStayShow: false,
        orderListArr: [],
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < (Date.now() - 24*60*60*1000)  //Date.now()
          }
        },
				searchJson: {
          come_time: '',
          leave_time: '',
          username: '',
          mobile: '',
          order_no: ''
        },
        keepSearchJson: {},
        keepArrJson: {},
        keepPage: '',
        keepIsSearch: false
			}
    },
    beforeCreate() {
      // if (this.$route.params) {
      //   if (this.$route.params.keepIsSearch) {
      //     this.isSearch = this.$route.params.keepIsSearch
      //     let NameArr = this.$route.params.keepArrJson
      //     for (let name in NameArr) {
      //       this[name] = NameArr[name]
      //     }
      //   }
      // }
    },
    computed: {
      ...mapGetters({
        hotel:'currHotel'
      }),
    },
    watch: {
      reservationsClassArr(newval) {
        let len = newval.length
        let old = this.reservationsArr.length
        if (len == old) {
          this.AllreservationsClass = true
        } else {
          this.AllreservationsClass = false
        }
      },
      orderStatusClassArr(newval) {
        let len = newval.length
        let old = this.orderStatusArr.length
        if (len == old) {
          this.AllOrderStatusClass = true
        } else {
          this.AllOrderStatusClass = false
        }
      },
      arriveTimeClassArr(newval) {
        let len = newval.length
        let old = this.ArriveTimeArr.length
        if (len == old) {
          this.AllArriveTimeClass = true
        } else {
          this.AllArriveTimeClass = false
        }
      },
      fromWayClassArr(newval) {
        let len = newval.length
        let old = this.fromWayArr.length
        if (len == old) {
          this.AllFromWayClass = true
        } else {
          this.AllFromWayClass = false
        }
      }
    },
		methods:{
      listCheckTable(num) {
        let from = []
        this.fromWayClassArr.forEach((e, i)=>{
          from.push(e)
        })
        let time = []
        this.arriveTimeClassArr.forEach((e, i)=>{
          time.push(e)
        })
        let set = []
        this.reservationsClassArr.forEach((e, i)=>{
          set.push(e)
        })
        let status = []
        this.orderStatusClassArr.forEach((e, i) => {
          status.push(e)
        })
        // this.orderStatusClassArr.forEach((e, i)=>{
        //   status.push(e.id)
        // })
        let object = {}
        let OBJ = this.searchJson
        for(let name in OBJ) {
          if (OBJ[name] != '') {
            object[name] = OBJ[name].trim()
          }
        }
        if (!this.totalTimes ) {
          this.$alert('请选择正确的日期时间', '', {
            confirmButtonText: '确定'
          });
          return
        }
        
        let obj = {
          "come_time": this.totalTimes[0],
          "leave_time": this.totalTimes[1],
          "time": this.arriveTimeClassArr.length == this.ArriveTimeArr.length?'all': time,
          "status": this.orderStatusClassArr.length == this.orderStatusArr.length?'all': status,
          "set": this.reservationsClassArr.length == this.reservationsArr.length?'all': set,
          "from": this.fromWayClassArr.length == this.fromWayArr.length?'all': from,
          "hotel_id": this.hotel.id,
        }
        if (object != {}) {
          obj = Object.assign(obj,object)
        }
        this.currentPage = num

        this.keepSearchJson = {...this.searchJson}
        this.keepArrJson = {
          fromWayClassArr: this.fromWayClassArr,
          arriveTimeClassArr: this.arriveTimeClassArr,
          reservationsClassArr: this.reservationsClassArr,
          orderStatusClassArr: this.orderStatusClassArr
        }
        this.keepPage = num
        // if (loc.searchJson){
        //   loc.removeItem('searchJson')
        //   loc.setItem('searchJson', JSON.stringify(locObj))
        // } else {
        //   loc.setItem('searchJson', JSON.stringify(locObj))
        // }
        
        // console.log(obj)
        // return
        //  在这里把分页变成 1 传递过去    还要再返回查询条件的totalCount
        // API.post("/pms/preorder/search", obj).then(res=>{
        //   console.log('sfsdfdsfd000.0.0.0',res)
        //   if (res.error_code == 0) {
        //     this.orderListArr = res.data.data
        //   //  this.totalCount
        //   }
        // })
        API.listCheckTable(this.hotel.id,num,obj).then(res=>{
          if (res.error_code == 0) {
            this.orderListArr = res.data.data
            this.totalCount = res.data.total
          }
        })
        this.isSearch = true
        this.keepIsSearch = true
      },
      getOrderStatusArr () {
        return API.getOrderStatusArr()
        // .then(res=>{
        //   if(res.error_code == 0) {
        //     this.orderStatusArr = res.data.data
        //   }
        // })
      },
      getReservationsArr() {
        return API.getReservationsArr()
        // .then(res=>{
        //   if(res.error_code == 0) {
        //     this.reservationsArr = res.data.data
        //   }
        // })
      },
      getArriveTimeArr() {
        return  API.getArriveTimeArr()
        // return API.getArriveTimeArr().then(res=>{
        //   if(res.error_code == 0) {
        //     this.ArriveTimeArr = res.data.data
        //   }
        // })
      },
      getAllreservationsClass() {
        if(this.AllreservationsClass) {
          this.reservationsClassArr = []
          this.reservationsArr.forEach((e, i)=>{
            this.reservationsClassArr.push(e.id)
          })
        } else {
          this.reservationsClassArr = []
        }
      },
      getAllOrderStatusClass() {
        if(this.AllOrderStatusClass) {
          this.orderStatusClassArr = []
          this.orderStatusArr.forEach((e, i)=>{
            this.orderStatusClassArr.push(e.id)
          })
        } else {
          this.orderStatusClassArr = []
        }
      },
      getAllArriveTimeClass() {
        if(this.AllArriveTimeClass) {
          this.arriveTimeClassArr = []
          this.ArriveTimeArr.forEach((e, i)=>{
            this.arriveTimeClassArr.push(e.id)
          })
        } else {
          this.arriveTimeClassArr = []
        }
      },
      getAllFromWayClass() {
        if(this.AllFromWayClass) {
          this.fromWayClassArr = []
          this.fromWayArr.forEach((e, i)=>{
            this.fromWayClassArr.push(e.id)
          })
        } else {
          this.fromWayClassArr = []
        }
      },
      setClass(arr,e) {
        // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
        if (arr.includes(e)) {
          let find = arr.indexOf(e)
          arr.splice(find, 1)
        } else {
          arr.push(e)
        }
      },
      setarriveTimeClass(e) {
        console.log('aaaaaaaaaaaaaaaa')
        this.setClass(this.arriveTimeClassArr,e)
      },
      setorderStatusClass(e) {
        this.setClass(this.orderStatusClassArr,e)
      },
      setReservationsClass(e) {
        this.setClass(this.reservationsClassArr,e)
      },
      setfromWayClass(e) {
        this.setClass(this.fromWayClassArr,e)
      },
      getFromWay() {
        return API.getFromWay()
        // .then(res=>{
        //   if(res.error_code == 0) {
        //     this.fromWayArr = res.data.data
        //   }
        // })
      },
      letChildShow(e) {
        switch(e) {
          case '已排房':
          return this.isBeStayShow = true
          case '已入住':
          return this.isGetMoneyShow = true
          case '未排房':
          return '排房'
        }
      },
      threeOperation(e) {
        switch(e) {
          case '已排房':
          return '办理入住'
          case '已入住':
          return '查看详情'
          case '未排房':
          return '排房'
        }
      },
      getOrderList() {
        API.getOrderList(this.hotel.id).then(res=>{
          // console.log('121311323123132131231321',res)
          if(res.error_code == 0) {
            this.orderListArr = res.data.data
            this.totalCount = res.data.total
            // console.log(this.orderListArr)
            // this.currentPage = 3
          }
        })
      },
      getStartDate() {
        this.$refs.startDate.focus()
      },
      getEndDate() {
        this.$refs.endDate.focus()
      },
      currentChange(num) {
        if(this.isSearch) {
         this.listCheckTable(num) 
        } else {
          API.currentChange(this.hotel.id,num).then(res=>{
            // console.log('121311323123132131231321',res)
            if(res.error_code == 0) {
              this.keepPage = num
              this.keepIsSearch = false
              this.orderListArr = []
              this.orderListArr = res.data.data
              this.totalCount = res.data.total
              this.currentPage = num
              
            }
          })
        }
      },
      async getTags(){
          //this.getOrderList()
          let R = await this.getFromWay()
          this.fromWayArr = R.data.data
          var res =  await this.getArriveTimeArr()
          this.ArriveTimeArr = res.data.data
          let Res = await this.getReservationsArr()
          this.reservationsArr = Res.data.data
          let es = await this.getOrderStatusArr()
          this.orderStatusArr = es.data.data
        if (this.$route.params.keepPage) {
          let backMsg = this.$route.params
          let NameArr = backMsg.keepArrJson
          for (let name in NameArr) {
            if (NameArr[name].length) {
              this[name] = [...NameArr[name]]
            }
          }
          if (this.$route.params.keepIsSearch) {
            this.isSearch = backMsg.keepIsSearch
            this.searchJson = backMsg.keepSearchJson
            this.currentPage = backMsg.keepPage
            this.listCheckTable(this.currentPage)
          } else {
            // this.currentPage = backMsg.keepPage
            console.log('00070008009',this.currentPage)
            this.currentChange(backMsg.keepPage)
          }
        } 
      }
    },
    mounted() {
      // this.currentPage = 3
      this.getTags()
    },
    beforeMount() {
      if (!this.$route.params.keepPage) {
        this.getOrderList()
      }
    },
    components: {
      beStay,
      getMoney,
      orderBestay
    }
	}
</script>

<style lang="scss" scoped>
  .order-list{
  	font-size: 12px;
  	position: relative;
    color: #626262;
  	.middle{
  		display: inline-block;
  		vertical-align: middle;
  	}
    input{
      height: 26px;
      border: 1px solid #f2f2f2;
      border-radius: 4px;
      text-indent: 6px;
    }
  	.whitetext{
  		width: 100%;
  		box-sizing: border-box;
  		padding-left: 35px;
  		background: #fff;
  		padding-top: 15px;
  		padding-right: 35px;
  	}
  	header{
  		margin-bottom: 20px;
  	}
  	.time{
  		margin-bottom: 10px;
  	}
  	.date{
  		width: 152px;
  		height: 28px;
  		line-height: 28px;
  		border: 1px solid #f2f2f2;
  		border-radius: 4px;
  		overflow: hidden;
  		position: relative;
  		.cover{
  			width: 100%;
  			height: 100%;
  			background: #fff;
  			position: absolute;
  			top: 0;left: 0;
  			text-align: center;
  			box-sizing: border-box;
  			padding-right: 8px;
  		}
  	}
  	.box{
  		width: 18px;
  		height: 18px;
  		border: 1px solid #ccc;
  		border-radius: 2px;
  	}
  	.list-pre{
  		width: 90%;
  		margin-left: 28px;
  		li{
  			width: 102px;
  		}
  	}
  	.search{
  		li{
  			margin-right: 14px;
  			// margin-bottom: 10px;
  		}
  	}
  	.btnserch{
  		width: 100px;
  		height: 30px;
  		line-height: 30px;
  		text-align: center;
  		color: #fff;
  		background: #437ff9;
  		margin-left: 30px;
  		border-radius: 6px;
  		cursor: pointer;
  	}
  	.tbody{
      &:hover{
        background: #f0f9fd;
      }
  		width: 100%;
  		display: flex;
  		flex: 21;
  		li{
  			height: 40px;
  			line-height: 40px;
  			// border-left: 1px solid #a9bfd6;
  			border-bottom: 1px solid #e5e5e5;
  			text-align: center;
        overflow: hidden;
  			white-space: nowrap;
  			text-overflow:ellipsis;
  		}
  		.one{
  			flex: 1;
  		}
  		.two{
  			flex: 2;
  		}
  	}
    .table{
  		margin-top: 10px;
			.thead{
        background: #f2f2f2;
        color: #626262;
        &:hover{
          background: #f2f2f2;
        }
				li{
					border-bottom:none;
					// background: #4b5967;
					height: 40px;
  			  line-height: 40px;
				}
			}
  	}
  }
</style>