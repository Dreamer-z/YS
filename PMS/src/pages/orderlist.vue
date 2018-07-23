<template>  <!-- 预定单列表 -->
	<div class="order-list">
		<div class="whitetext">
			<header>
				<span class="middle">当前位置</span>
				<span style="margin-right: 18px;" class="middle">：</span>
				<span style="margin-right: 18px;" class="middle">预定管理</span>
				<span style="margin-right: 18px;" class="middle">></span>
				<span style="color: #437ff9;" class="middle">预定单列表</span>
		  </header>
		  <div class="tatal-list">
		  	<div class="time">
		  		<p class="middle">抵达时间：</p>
		  		<ul class="middle list-pre">
		  			<li @click="getAllArriveTimeClass" class="middle">
		  				<div class="box middle">
		  					<i style="font-size: 22px;font-weight: bold;margin-left:-2px;color: #6a9df6;" :class="{'icon-gou' : AllArriveTimeClass}" class="iconfont"></i>
		  				</div>
		  				<span class="middle">全部</span>
		  			</li>
		  			<li @click="setarriveTimeClass(item)" :key="index" v-for="(item, index) in ArriveTimeArr" class="middle">
		  				<div class="box middle">
		  					<i style="font-size: 22px;font-weight: bold;margin-left:-2px;color: #6a9df6;" :class="{'icon-gou' : arriveTimeClassArr.includes(item)}" class="iconfont"></i>
		  				</div>
		  				<span class="middle">{{item.name}}</span>
		  			</li>
		  		</ul>
		  	</div>
		  	<div class="time">
		  		<p style="width: 70px;" class="middle">状态：</p>
		  		<ul class="middle list-pre">
		  			<li @click="getAllOrderStatusClass" class="middle">
		  				<div class="box middle">
		  					<i style="font-size: 22px;font-weight: bold;margin-left:-2px;color: #6a9df6;" :class="{'icon-gou' : AllOrderStatusClass}" class="iconfont"></i>
		  				</div>
		  				<span class="middle">全部</span>
		  			</li>
		  			<li @click="setorderStatusClass(item)" v-for="item in orderStatusArr" class="middle">
		  				<div class="box middle">
		  					<i style="font-size: 22px;font-weight: bold;margin-left:-2px;color: #6a9df6;" :class="{'icon-gou' : orderStatusClassArr.includes(item)}" class="iconfont"></i>
		  				</div>
		  				<span class="middle">{{item.name}}</span>
		  			</li>
		  		</ul>
		  	</div>
		  	<div class="time">
		  		<p class="middle">排房状态：</p>
		  		<ul class="middle list-pre">
		  			<li @click="getAllreservationsClass" class="middle">
		  				<div class="box middle">
		  					<i style="font-size: 22px;font-weight: bold;margin-left:-2px;color: #6a9df6;" :class="{'icon-gou' : AllreservationsClass}" class="iconfont"></i>
		  				</div>
		  				<span class="middle">全部</span>
		  			</li>
		  			<li @click="setReservationsClass(item)" v-for="item in reservationsArr" class="middle">
		  				<div class="box middle">
		  					<i style="font-size: 22px;font-weight: bold;margin-left:-2px;color: #6a9df6;" :class="{'icon-gou' : reservationsClassArr.includes(item)}" class="iconfont"></i>
		  				</div>
		  				<span class="middle">{{item.name}}</span>
		  			</li>
		  		</ul>
		  	</div>
		  	<div class="time">
		  		<p class="middle">预订方式：</p>
		  		<ul class="middle list-pre">
		  			<li @click="getAllFromWayClass" class="middle">
		  				<div class="box middle">
		  					<i style="font-size: 22px;font-weight: bold;margin-left:-2px;color: #6a9df6;" :class="{'icon-gou' : AllFromWayClass}" class="iconfont"></i>
		  				</div>
		  				<span class="middle">全部</span>
		  			</li>
		  			<li @click="setfromWayClass(item)" v-for="item in fromWayArr" class="middle">
		  				<div class="box middle">
		  					<i style="font-size: 22px;font-weight: bold;margin-left:-2px;color: #6a9df6;" :class="{'icon-gou' : fromWayClassArr.includes(item)}" class="iconfont"></i>
		  				</div>
		  				<span class="middle">{{item.name}}</span>
		  			</li>
		  		</ul>
		  	</div>
		  	<ol class="search">
		  		<li class="middle">
		  			<p class="middle">
		  				<span class="middle">预订人</span>
		  				<span class="middle">：</span>
		  			</p>
		  			<input v-model="searchJson.username" class="middle" type="text">
		  		</li>
		  		<li class="middle">
		  			<p class="middle">
		  				<span class="middle">预订手机</span>
		  				<span class="middle">：</span>
		  			</p>
		  			<input v-model="searchJson.mobile" class="middle" type="text">
		  		</li>
		  		<li class="middle">
		  			<p class="middle">
		  				<span class="middle">订单号</span>
		  				<span class="middle">：</span>
		  			</p>
		  			<input :title="searchJson.order_no" v-model="searchJson.order_no" class="middle" type="text">
		  		</li>
		  		<li class="middle">
		  			<p class="middle">
		  				<span class="middle">预住日期</span>
		  				<span class="middle">：</span>
		  			</p>
		  			<div class="date middle">
		  				<el-date-picker ref="startDate" value-format="yyyy-MM-dd" size="mini" type="date" v-model="searchJson.come_time">
						  </el-date-picker>
						  <div @click="getStartDate" class="cover">
                <span>{{searchJson.come_time}}</span>
						  	<!-- <i>&nbsp;&nbsp;icon</i> -->
						  </div>
		  			</div>
		  			<span>至</span>
		  			<div class="date middle">
		  				<el-date-picker ref="endDate" value-format="yyyy-MM-dd" size="mini" type="date" v-model="searchJson.leave_time">
						  </el-date-picker>
						  <div @click="getEndDate" class="cover">
                <span>{{searchJson.leave_time}}</span>
						  	<!-- <i>&nbsp;&nbsp;icon</i> -->
						  </div>
		  			</div>
		  		</li>
		  		<li @click="listCheckTable(1)" class="btnserch middle">
		  			<span>搜索预订</span>
		  		</li>
		  	</ol>
		  </div>
		  <div class="table">
		  	<ul class="thead tbody">
		  		<li class="one">订单号</li>
		  		<li class="one">渠道</li>
		  		<li class="one">预订人</li>
		  		<li class="two">预订手机</li>
		  		<!-- <li class="two">房型</li> -->
		  		<!-- <li class="one">房间数</li> -->
		  		<li class="one">预订金额</li>
		  		<!-- <li class="one">担保状态</li> -->
		  		<li class="two">预抵日期</li>
		  		<li class="two">预离日期</li>
		  		<li class="one">入住天数</li>
		  		<!-- <li class="one">保留时效</li> -->
		  		<li class="one">状态</li>
		  		<!-- <li class="two">排房情况</li> -->
		  		<li style="border-right: 1px solid #a9bfd6;" class="two">操作</li>
		  	</ul>
		  	<ul :class="{'bj': index%2 == 0}" v-for="(item, index) in orderListArr" class="tbody">
		  		<li :title= "item.order_no" class="one">{{item.order_no}}</li>
		  		<li class="one">{{item.from_name}}</li>
		  		<li :title= "item.user?item.user.nickname:''" class="one">{{item.user?item.user.nickname:''}}</li>
		  		<li class="two">{{item.mobile}}</li>
		  		<!-- <li class="two">{{item.snap_items.name}}</li> -->
		  		<!-- <li class="one">{{item.snap_items.total_count}}</li> -->
		  		<li class="one">{{item.sum}}</li>   <!-- snap_items.total_price -->
		  		<li class="two">{{item.come_time}}</li>
		  		<li class="two">{{item.leave_time}}</li>
		  		<li class="one">{{item.days}}</li>
		  		<li class="one">{{item.order_status}}</li>
		  		<!-- <li class="two">{{item.set_status}}</li> -->
		  		<router-link :to="{ name:'oneOrderList',params: { id: item.id}}" tag="li" style="border-right: 1px solid #a9bfd6; cursor: pointer; color: #6a9df6;" class="two">查看详情</router-link>
		  	</ul>
        <div style="text-align: center; margin-top: 100px;">
          <el-pagination
            @current-change="currentChange"
            @prev-click="currentChange"
            @next-click="currentChange"
            :page-size="10"
            :current-page="currentPage"
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
        }
			}
		},
    computed: {
      ...mapGetters({
        hotel:'currHotel'
      }),
    },
    watch: {
      // AllFromWayClass(newval) {
      //   this.fromWayClassArr = []
      //   if(newval) {
      //     // this.fromWayClassArr = []
      //     this.fromWayArr.forEach((e, i)=>{
      //       this.fromWayClassArr.push(e)
      //     })
      //   }
      // },
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
          from.push(e.id)
        })
        let time = []
        this.arriveTimeClassArr.forEach((e, i)=>{
          time.push(e.id)
        })
        let set = []
        this.reservationsClassArr.forEach((e, i)=>{
          set.push(e.id)
        })
        let status = []  
        this.orderStatusClassArr.forEach((e, i)=>{
          status.push(e.id)
        })
        let object = {}
        let OBJ = this.searchJson
        for(let name in OBJ) {
          if (OBJ[name] != '') {
            object[name] = OBJ[name].trim()
          }
        }
        if (object.leave_time != '' && object.leave_time < object.come_time ) {
          this.$alert('请选择正确的日期时间', '', {
            confirmButtonText: '确定'
          });
          return
        }
        let obj = {
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
        // obj.    = this.currentPage
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
            this.totalCount = res.data.total_count
          }
        })
        this.isSearch = true
      },
      getOrderStatusArr () {
        API.getOrderStatusArr().then(res=>{
          if(res.error_code == 0) {
            this.orderStatusArr = res.data.data
          }
        })
      },
      getReservationsArr() {
        API.getReservationsArr().then(res=>{
          if(res.error_code == 0) {
            this.reservationsArr = res.data.data
          }
        })
      },
      getArriveTimeArr() {
        API.getArriveTimeArr().then(res=>{
          if(res.error_code == 0) {
            this.ArriveTimeArr = res.data.data
          }
        })
      },
      getAllreservationsClass() {
        this.AllreservationsClass = !this.AllreservationsClass
        if(this.AllreservationsClass) {
          this.reservationsClassArr = []
          this.reservationsArr.forEach((e, i)=>{
            this.reservationsClassArr.push(e)
          })
        } else {
          this.reservationsClassArr = []
        }
      },
      getAllOrderStatusClass() {
        this.AllOrderStatusClass = !this.AllOrderStatusClass
        if(this.AllOrderStatusClass) {
          this.orderStatusClassArr = []
          this.orderStatusArr.forEach((e, i)=>{
            this.orderStatusClassArr.push(e)
          })
        } else {
          this.orderStatusClassArr = []
        }
      },
      getAllArriveTimeClass() {
        this.AllArriveTimeClass = !this.AllArriveTimeClass
        if(this.AllArriveTimeClass) {
          this.arriveTimeClassArr = []
          this.ArriveTimeArr.forEach((e, i)=>{
            this.arriveTimeClassArr.push(e)
          })
        } else {
          this.arriveTimeClassArr = []
        }
      },
      getAllFromWayClass() {
        this.AllFromWayClass = !this.AllFromWayClass
        if(this.AllFromWayClass) {
          this.fromWayClassArr = []
          this.fromWayArr.forEach((e, i)=>{
            this.fromWayClassArr.push(e)
          })
        } else {
          this.fromWayClassArr = []
        }
      },
      setClass(arr,e) {
        if (arr.includes(e)) {
          let find = arr.indexOf(e)
          arr.splice(find, 1)
        } else {
          arr.push(e)
        }
      },
      setarriveTimeClass(e) {
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
        API.getFromWay().then(res=>{
          if(res.error_code == 0) {
            this.fromWayArr = res.data.data
          }
        })
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
          //console.log('121311323123132131231321',res)
          if(!res.error_code) {
            this.orderListArr = res.data.data
            this.totalCount = res.data.total_count
            // console.log(this.orderListArr)
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
        //console.log('eeeeee', this.currentPage)  // 页码

        if(this.isSearch) {
         this.listCheckTable(num)
        } else {
          API.currentChange(this.hotel.id,num).then(res=>{
            // console.log('121311323123132131231321',res)
            if(!res.error_code) {
              this.orderListArr = []
              this.orderListArr = res.data.data
            }
          })
        }
      }
		},
    mounted() {
      this.getOrderList()
      this.getFromWay()
      this.getArriveTimeArr()
      this.getReservationsArr()
      this.getOrderStatusArr()
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
  	padding-top: 50px;
  	font-size: 14px;
  	background: #f2f2f2;
  	position: relative;
  	input{
  		height: 28px;
  		border: 1px solid #f2f2f2;
  		border-radius: 4px;
  	}
  	.middle{
  		display: inline-block;
  		vertical-align: middle;
  	}
  	.whitetext{
  		width: 100%;
  		box-sizing: border-box;
  		padding-left: 250px;
  		background: #fff;
  		padding-top: 40px;
  		padding-right: 50px;
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
  			margin-bottom: 10px;
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
  	.table{
  		margin-top: 40px;
			.thead{
				li{
					border-bottom:none;
					background: #4b5967;
					color: #fff;
					height: 40px;
  			  line-height: 40px;
				}
			}
  	}
  	.tbody{
      &.bj{
        background: #f4f8ff;
      }
  		width: 100%;
  		display: flex;
  		flex: 21;
  		li{
  			height: 54px;
  			line-height: 54px;
  			border-left: 1px solid #a9bfd6;
  			border-bottom: 1px solid #a9bfd6;
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
  }
</style>