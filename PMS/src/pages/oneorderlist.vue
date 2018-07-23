<template>  <!-- 预定单列表 -->
	<div @click="nowPriceIndex = -1" class="one-order-list">
		<div class="whitetext">
			<header>
				<span class="middle">当前位置</span>
				<span style="margin-right: 18px;" class="middle">：</span>
				<span style="margin-right: 18px;" class="middle">预定管理</span>
				<span style="margin-right: 18px;" class="middle">></span>
				<span style="margin-right: 18px;" class="middle">预定单列表</span>
				<span style="margin-right: 18px;" class="middle">></span>
				<span style="color: #437ff9;" class="middle">查看详情</span>
		  </header>
		  <ul class="title">
		  	<li>
		  		<h6 style="font-size: 16px;font-weight: bold;" class="mgb10">入住信息</h6>
		  		<p class="mgb10">
		  			<span class="middle">预订人</span>
		  			<span class="middle">：</span>
		  			<span class="middle">{{totalMessage.user?totalMessage.user.nickname:''}}</span>
		  		</p>
		  		<p class="mgb10">
		  			<span class="middle">手机号</span>
		  			<span class="middle">：</span>
		  			<span class="middle">{{totalMessage.mobile?totalMessage.mobile:''}}</span>
		  		</p>
		  		<p class="mgb10">
		  			<span class="middle">入住日期</span>
		  			<span class="middle">：</span>
		  			<span class="middle">{{totalMessage.come_time?totalMessage.come_time:''}}</span>
		  		</p>
		  		<p class="mgb10">
		  			<span class="middle">离店日期</span>
		  			<span class="middle">：</span>
		  			<span class="middle">{{totalMessage.leave_time?totalMessage.leave_time:''}}</span>
		  		</p>
		  	</li>
		  	<li class="line"></li>
		  	<li>
		  		<h6 style="font-size: 16px;font-weight: bold;" class="mgb10">其他信息</h6>
		  		<p class="mgb10">
		  			<span class="middle">渠道</span>
		  			<span class="middle">：</span>
		  			<span class="middle">{{totalMessage.from?totalMessage.from_name:''}}</span>
		  		</p>
		  		<!-- <p class="mgb10">
		  			<span class="middle">担保</span>
		  			<span class="middle">：</span>
		  			<span class="middle">{{totalMessage.is_assure?totalMessage.is_assure:''}}</span>
		  		</p> -->
		  		<p class="mgb10">
		  			<span class="middle">预订金额</span>
		  			<span class="middle">：</span>
		  			<span class="middle">{{totalMessage.sum?totalMessage.sum:''}}</span>
		  		</p>
		  		<p class="mgb10">
		  			<span class="middle">预计到店时间</span>
		  			<span class="middle">：</span>
		  			<span class="middle">{{totalMessage.arrive_time?totalMessage.arrive_time:''}}</span>
		  		</p>
		  		<p class="mgb10">
		  			<span class="middle">备注</span>
		  			<span class="middle">：</span>
		  			<span class="middle">{{totalMessage.remark?totalMessage.remark:''}}</span>
		  		</p>
		  	</li>
		  	<li class="line"></li>
		  	<li class="last">
		  		<div class="absolute">
		  			<p class="middle">
			  			<span class="middle">订单状态</span>
			  			<span class="middle">：</span>
			  			<span class="middle">{{totalMessage.order_status?totalMessage.order_status:''}}</span>
			  		</p>
			  		<nav @click="deleOrder" class="dele middle">
			  			<span>取消预订</span>
			  		</nav>
		  		</div>
		  	</li>
		  </ul>
		  <div class="play">
		  	<nav @click="automaticRoom" class="auto middle">
		  		<span>自动排房</span>
		  	</nav>
		  	<!-- <section @click="deleList" class="delebtn middle click">
		  		<span>删除</span>
		  	</section> -->
		  </div>
		  <div class="table">
		  	<ul class="thead tbody">
		  		<li @click="deleAll" class="one">
		  			<div :class="{'bor': isDeleAll}" class="squre">
		  				<div :class="{'bj': isDeleAll}" class="block"></div>
		  			</div>
		  		</li>
		  		<li class="two">序号</li>
		  		<li class="three">房型</li>
		  		<!-- <li class="three">价格方案</li> -->
		  		<li class="three">房号</li>
		  		<li class="four">房价</li>
		  		<li class="five">预抵</li>
		  		<li class="five">预离</li>
		  		<li class="five">入住人</li>
		  		<li class="six">入住状态</li>
		  		<li style="border-right: 1px solid #a9bfd6;" class="three">操作</li>
		  	</ul>
		  	<ul v-for="(item, index) in totalList" class="tbody">
		  		<li @click="mayBeDele(index)" class="one">
		  			<div :class="{'bor': willBeDele.includes(index)}" class="squre">
		  				<div :class="{'bj': willBeDele.includes(index)}" class="block"></div>
		  			</div>
		  		</li>
		  		<li class="two">{{index + 1}}</li>
		  		<li class="three">{{item.room_type_name}}</li>
		  		<!-- <li @click.stop="priceListShow(index)" class="three price-list">

		  			<div class="img">
		  				<img :class="{'ratate': isPriceListShow && nowPriceIndex == index}" src="@/assets/images/sjx.png" alt="">
		  			</div>
		  			<ul v-show="isPriceListShow && nowPriceIndex == index" class="pricelist">
		  				<li v-for="(data, num) in priceListArr" class="priceli">{{data.name}}</li>
		  			</ul>
		  		</li> -->
		  		<li @click="getRoomName(item,index)" style="position: relative;cursor: pointer;" class="three price-list"> <!-- @click.stop="roomNumShow(index)" -->
            <!-- <el-cascader
              ref="cascader"
              :options="buildFloorRoomArr"
              v-model="roomNumber"
              @change="cascaderChange">
            </el-cascader> -->
            <div id="cascader">
              <span style="color: #6a9df6;" v-if="item.room_name == ''">点击排房</span>
              <span v-else>{{item.room_name}}</span>
            </div>
		  			<!-- <div class="img">
		  				<img :class="{'ratate': isRoomNumShow && nowPriceIndex == index}" src="@/assets/images/sjx.png" alt="">
		  			</div> -->
		  			<!-- <el-collapse-transition> -->
			  			<!-- <ul v-show="isRoomNumShow && nowPriceIndex == index" class="pricelist">
			  				<li v-for="(data, num) in fanghaoArr" class="priceli">{{data.name}}</li>
			  			</ul> -->
			  		<!-- </el-collapse-transition> -->
		  		</li>
		  		<li class="four">{{item.price}}</li>  <!-- {{item.price}} -->
		  		<li class="five starttime">
		  			<!-- <el-date-picker @change="setStartModel(item.startdatetime)" v-show="cover" @blur="cover = false" ref="starttime" value-format="yyyy-MM-dd HH:mm" size="mini" type="datetime" v-model="item.startdatetime">
						</el-date-picker> -->
						<div @click="changeStartTime(index)" class="cover">
							<!-- <span>{{startDate}}&nbsp;</span>
							<span>{{startTime}}&nbsp;</span> -->
							{{item.come_time}}
							<!-- <i>icon</i> -->
						</div>
		  		</li>
		  		<li class="five endtime">
		  			<!-- <el-date-picker v-show="cover2" @blur="cover2 = false" ref="endtime" value-format="yyyy-MM-dd HH:mm" size="mini" type="datetime" v-model="item.enddatetime">
						</el-date-picker> -->
						<div @click="changeEndTime(index)" class="cover">
							{{item.leave_time}}
							<!-- <i>icon</i> -->
						</div>
		  		</li>
		  		<li class="five occupant">
		  			<!-- <span v-show="!isOccupantInputShow">{{occupant}}</span>
		  			<input v-show="isOccupantInputShow" @blur="occupantInputBeNone" ref="occupantInput" class="occupant-input" v-model="occupant" type="text"> -->
            <span>{{item.customer}}</span>
		  		</li>
		  		<li class="six">{{item.set_status_name}}</li>    <!-- open -->
		  		<li v-if="item.set_status == 0" @click="open" style="border-right: 1px solid #a9bfd6; color: #6a9df6;cursor: pointer;" class="three">办理入住</li>
          <li v-if="item.set_status == 1" @click="letOrderBestayShow(item,index)" style="border-right: 1px solid #a9bfd6; color: #6a9df6;cursor: pointer;" class="three">办理入住</li>
          <li v-if="item.set_status == 2" @click="letGetMoneyShow(item)" style="border-right: 1px solid #a9bfd6; color: #6a9df6;cursor: pointer;" class="three">查看客房详情</li>
          <li v-if="item.set_status == 3" style="border-right: 1px solid #a9bfd6; color: #ccc;cursor: pointer;" class="three">已经退房</li>
		  	</ul>
		  </div>
		  <footer>
		  	<nav @click="saveRoomId" class="middle">
		  		<span>确定</span>
		  	</nav>
		  	<section @click="goBack" class="middle">
		  		<span>返回</span>
		  	</section>
		  </footer>
		</div>
    <order-bestay @getStayBeNone="orderBestayNone" v-show="isorderBestayShow"></order-bestay>
    <order-getmoney v-show="isGetMoneyShow"></order-getmoney>
    <room-number @giveNumSelected="getSelected" v-if="isRoomNumberShow" @roomNumberBeNone="numberBeNone" :roomList="buildFloorRoomArr"></room-number>
	</div>
</template>

<script>
import roomNumber from "@/components/public/roomnumber"
import orderBestay from "@/components/public/orderBestay"   //   办理入住yuding de
import orderGetmoney from "@/components/public/orderGetmoney"
import API from "@/store/API"
import bus from "@/store/bus"
	export default{
		name: 'oneOrderList',
		data() {
			return {
        paramsId: '',
        nowIndex: -1,
        isRoomNumberShow: false,
        isGetMoneyShow: false,
        isorderBestayShow: false,
        buildFloorRoomArr: [],
        roomNumber: [],
        totalMessage: {},
        fanghaoArr: [],
        priceListArr: [
          {
            ia: 1,
            name: 'shichangjia'
          },
          {
            ia: 2,
            name: 'huiyuanjia'
          },
          {
            ia: 3,
            name: 'dazhe'
          }
        ],
				isDeleAll: false,
        willBeDele: [],
				totalList: [], // [{startdatetime: '', enddatetime: ''},{startdatetime: '', enddatetime: ''},{startdatetime: '', enddatetime: ''}], //  再返回的数据里加上这样的属性 ， 用作model 展示也用
				isOccupantInputShow: false,
				nowPriceIndex: -1,
				occupant: '000',
				// isRoomNumShow: false,
				isPriceListShow: false,
				// dateValueStart: '',
				// dateValueEnd: '',
				cover: false,
				cover2: false,
        single: true
			}
		},
		watch: {
      willBeDele(a) {
        if(a.length == this.totalList.length){
          this.isDeleAll = true
        }else{
          this.isDeleAll = false
        }
      }
		},
    created() {
      this.fetchData()
      bus.ev.$on('getMoneyBeNone',()=>{
        this.isGetMoneyShow = false
      })
    },
		methods:{
      orderBestayNone(e) {
        this.isorderBestayShow =false
        if (typeof e != 'undefined') {
          // this.totalList[this.nowIndex].room_name = e.name
          // this.totalList[this.nowIndex].room_id = e.id
          this.totalList[this.nowIndex].set_status_name = '已入住'
          this.totalList[this.nowIndex].set_status = 2
          this.totalList[this.nowIndex].customer = e.nameStr
          this.totalList[this.nowIndex].order_id = e.order_id
          console.log(e)
        }
      },
      saveRoomId() {
        let arr = []
        this.totalList.forEach((e,i)=>{
          if (e.set_status == 1) {
            arr.push({
              "room_id": e.room_id,
              "snap_id": e.id
            })
          }
        })
        API.put("/pms/preorder/set_room",{"data": arr}).then(res=>{
          if (res.error_code == 0){
            this.$alert('操作成功', '操作提示', {
              confirmButtonText: '确定'
            })
          }
        })
        // console.log(this.totalList)
      },
      deleOrder() {
        console.log(this.totalMessage)
        API.put("/pms/preorder/" + this.totalMessage.id).then(res=>{
          if (res.error_code == 0) {
            this.$alert('取消成功', '操作提示', {
              confirmButtonText: '确定',
              callback: ()=>{
                this.$router.back()
              }
            })
          }
        })
      },
      getRoomName(e,i) {
        this.nowIndex = i;
        let obj = {
          "come_time": e.come_time,
          "leave_time": e.leave_time,
          "num":-1,
          "room_type_id": e.room_type_id
        }
        this.isRoomNumberShow = true
        API.post("/pms/room/auto", obj).then(res=>{
          if (res.error_code == 0) {
            let resData = res.data
            this.buildFloorRoomArr = []
            resData[0].rooms.forEach((e,i)=>{
              this.buildFloorRoomArr.push({
                id: e.id,
                name: e.room_name
              })
            })
          }
        })
      },
      getSelected(e) {
        // console.log('>>>>',e)
        if (e != '') {
          this.totalList[this.nowIndex].room_name = e.name
          this.totalList[this.nowIndex].room_id = e.id
          this.totalList[this.nowIndex].set_status_name = '已排房'
          this.totalList[this.nowIndex].set_status = 1
        }
        this.numberBeNone()
      },
      numberBeNone() {
        this.isRoomNumberShow = false
      },
      automaticRoom() {
        let res = {}
        let start = ''
        let end = ''
        let needAutoRoom = false
        this.totalList.forEach((e,i)=>{
            if (e.room_name == '') {
                needAutoRoom = true
            }
            if(typeof res[e.room_type_id] == 'undefined'){
                res[e.room_type_id] = 0
            }
            res[e.room_type_id]++
            start = e.come_time
            end = e.leave_time
          // }
        })

        if(!needAutoRoom){
           this.$message('已全部排房!');
           return 
        }

        let arr = Object.keys(res)
        let postArr = []
        arr.forEach((e,i)=>{
          postArr.push({
            "num":res[e],
            "room_type_id":e
          })
        })
        //console.log(postArr)
        let obj = {
          "data": postArr,
          "come_time": start,
          "leave_time": end
        }
        var existAutoRomm = {}
        API.post("/pms/room/more_auto", obj).then(res=>{
          if (res.error_code == 0) {
            let arr = []
            let object = res.data;
            for (let name in object) {
                var romms  = object[name]
                //console.log('1111',romms)
                romms.forEach((e,index)=>{
                  //console.log(e)
                  for(var i = 0 ; i < this.totalList.length ; i++ ){
                    if(this.totalList[i].room_id == 0 && 
                       this.totalList[i].room_type_id == name &&
                       typeof existAutoRomm[e.room_id]  == 'undefined'){
                        existAutoRomm[e.room_id] = 0
                        this.totalList[i].room_id = e.room_id
                        this.totalList[i].room_name = e.room_name
                        this.totalList[i].set_status = 1
                        this.totalList[i].set_status_name = '已排房'
                        //console.log(e.name)
                    }
                }
             })
            }
            /*
            console.log('>>>>>',arr)
            arr.forEach((e,index)=>{
             // if(this.totalList[i])
             for(var i = 0 ; i < this.totalList.length ; i++ ){
                if(this.totalList[i].room_id == 0 && this.totalList[i].room_type_id == )

             }
             this.totalList
              this.totalList[i].room_name = e.room_name
              this.totalList[i].set_status_name = '已排房'
              this.totalList[i].set_status = 1
              this.totalList[i].room_id = e.room_id
              this.totalList[i].id = e.id
            })
            */
          }
        })
      },
      letGetMoneyShow(item) {
        this.isGetMoneyShow = true
        item.orderId = this.totalMessage.id
        bus.ev.$emit('willBeOrderGetMoney', item)
      },
      letOrderBestayShow(item,i) {
        // console.log(item)
        // return
        this.nowIndex = i
        this.isorderBestayShow = true
      //  item.orderId = this.totalMessage.id
        bus.ev.$emit('willBeOrderBestay', item)
      },
      open() {
        this.$alert('请先排房', '操作提示', {
          confirmButtonText: '确定'
        })
      },
      threeOperation(e) {
        switch(e) {
          case '已排房':
          return '办理入住'
          case '已入住':
          return '查看客房详情'
          case '未排房':
          return '办理入住'
        }
      },
      getFocus(e) {
        console.log(e)
      },
      cascaderChange() {

      },
      // cascaderShow(i) {
      //   // console.log(this.$refs.cascader)
      //   this.$refs.cascader.focus();
      //   console.log('sdfdsf1111',this.$refs,this.$refs.cascader)
      // },
      goBack() {
        this.$router.back()
      },
      fetchData () {
        if(this.$route.params.id) {
          API.get("/pms/preorder/"+ this.$route.params.id).then(res=>{
            if(res.error_code == 0){
              let data = res.data;
              this.totalMessage = data
              // console.log('mmmmmmmmm',this.totalMessage)
              // data.customer.push(data.snap_items)
              this.totalList = data.snap
              this.totalList.forEach((e,i)=>{
                e.come_time = data.come_time
                e.leave_time = data.leave_time
              })
              // console.log('mmmmmmmmm>>>',data)
              // API.get()
            }
          })
        }else{
          window.history.go(-1)
        }
      },
      deleList() {
        this.willBeDele = this.willBeDele.sort().reverse()
        this.willBeDele.forEach((e, i)=>{
          this.totalList.splice(e, 1)
        })
        this.willBeDele = []
      },
      deleAll() {
        if(this.single){
          this.isDeleAll = true;
          this.willBeDele = []
          this.totalList.forEach((e, i)=>{
            this.willBeDele.push(i)
          })
          this.single = false
        }else{
          this.isDeleAll = false;
          this.willBeDele = []
          this.single = true
        }
      },
			setStartModel(e) {
				// console.log('mmmmmnnn',e)
				this.a = e
				let arr = e.split(' ')
				console.log(arr)
			},
			mayBeDele(i) {
				if(this.willBeDele.includes(i)) {
					let a = this.willBeDele.indexOf(i)
					this.willBeDele.splice(a, 1)
				}else{
					this.willBeDele.push(i)
				}
			},
			// roomNumShow(i) {
			// 	this.isPriceListShow = false;
			// 	// this.isRoomNumShow = true;
			// 	this.nowPriceIndex = i
   //    //  API.get()  //   获取弹窗的房号数组
			// },
			priceListShow(i) {
				// this.isRoomNumShow = false;
				this.isPriceListShow = true;
				this.nowPriceIndex = i
			},
			// occupantInputBeNone() {
			// 	this.isOccupantInputShow = false;
			// },
			// occupantInputShow(i) {
				// let _this = this;
				// this.isOccupantInputShow = true;
				// this.$nextTick().then(()=>{
				// 	this.$refs.occupantInput[i].focus()
				// })

				// this.$refs.occupantInput.focus()

				// setTimeout(function(){
				// 	_this.$refs.occupantInput[i].focus()
				// },50)
			// },
			changeStartTime(i) {
				// let _this = this;
				// this.cover = true
				// this.$nextTick().then(()=>{
				// 	this.$refs.starttime[i].focus()
				// })

				// setTimeout(function(){
				// 	_this.$refs.starttime.focus()
				// },50)
				// this.$refs.starttime[0].focus()
				//console.log(this.$refs.starttime[0])
			},
			changeEndTime(i) {
				// let _this = this;
				// this.cover2 = true
				// this.$nextTick().then(()=>{
				// 	this.$refs.endtime[i].focus()
				// })
				// setTimeout(function(){
				// 	_this.$refs.endtime[i].focus()
				// },50)
			}
		},
    components: {
      orderGetmoney,
      orderBestay,
      roomNumber
    }
	}
</script>

<style lang="scss" scoped>
  .one-order-list{
  	padding-top: 50px;
  	font-size: 14px;
  	background: #f2f2f2;
  	position: relative;
  	input{
  		height: 28px;
  		border: 1px solid #f2f2f2;
  		border-radius: 4px;
  	}
  	.mgb10{
  		margin-bottom: 10px;
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
  		padding-top: 20px;
  		padding-right: 50px;
  	}
  	header{
  		margin-bottom: 20px;
  	}
  	.title{
  		width: 100%;
  		border-bottom: 1px solid #e6e6e6;
  		box-sizing: border-box;
  		padding-bottom: 20px;
  		li{
  			display: inline-block;
  			vertical-align: top;
  		}
  	}
  	.line{
  		height: 143px;
  		border-right: 1px solid #e6e6e6;
  		margin-right: 66px;
  		margin-left: 78px; 
  	}
  	.last{
  		position: relative;
  		width: 260px;
  		height: 140px;
  	}
  	.dele{
  		width: 80px;
  		height: 30px;
  		line-height: 30px;
  		text-align: center;
  		color: #fff;
  		margin-left: 30px;
  		cursor: pointer;
  		background: #437ff9;
  		border-radius: 4px;
  	}
  	.absolute{
  		margin-top: 48px;
  	}
  	.play{
  		margin-top: 20px;
  		margin-bottom: 10px;
  		.auto{
  			margin-right: 8px;
  		}
  		.auto,.delebtn{
  			width: 78px;
  			height: 28px;
  			line-height: 30px;
  			text-align: center;
  			border: 1px solid #437ff9;
  			border-radius: 4px;
  			color: #437ff9;
  			cursor: pointer;
  		}
  		.click{
  			color: #fff;
  			background: #437ff9;
  		}
  	}
  	.thead{
			li{
				background: #4b5967;
				color: #fff;
				border-bottom-color: #4b5967;
			}
  	}
  	.tbody{
  		width: 100%;
  		display: flex;
  		flex: 87;
  		li{
  			height: 39px;
  			line-height: 39px;
  			text-align: center;
  			border-left: 1px solid #a9bfd6;
  			border-bottom: 1px solid #a9bfd6;
  			white-space: nowrap;
  			text-overflow:ellipsis;
  		}
  		.one{
  			flex: 2;
  			position: relative;
  			div.bor{
  				border-color: #27a9e3
  			}
  			.squre{
  				width: 10px;
  				height: 10px;
  				border: 1px solid #d9d9d9;
  				border-radius: 2px;
  				position: absolute;
  				top: 50%;left: 50%;
  				margin-top: -5px;
  				margin-left: -5px;
  				.block{
  					width: 6px;
  					height: 6px;
  					position: absolute;
  					top: 50%;
  					left: 50%;
  					margin-top: -3px;
  				  margin-left: -3px;
  				}
  				.bj{
  					background: #27a9e3
  				}
  			}
  		}
  		.two{
  			flex: 3;
  		}
  		.three{
  			flex: 9;
  		}
  		.four{
  			flex: 4;
  		}
  		.five{
  			flex: 12;
  		}
  		.six{
  			flex: 6;
  		}
  	}
  	.starttime,.endtime{
  		position: relative;
  		overflow: hidden;
  		.cover{
  			z-index: 100;
  			width: 100%;
  			height: 100%;
  			position: absolute;
  			top: 0;left: 0;right: 0;bottom: 0;
  			background: #fff;
  			white-space: nowrap;
  			text-overflow:ellipsis;
  		}
  	}
  	footer{
  		margin: 0 auto;
  		margin-top: 240px;
  		width: 260px;
  		section,nav{
  			width: 100px;
  			height: 40px;
  			line-height: 40px;
  			text-align: center;
  			color: #fff;
  			background: #437ff9;
  			margin-right: 20px;
  			border-radius: 4px;
        cursor: pointer;
  		}
  	}
  	.price-list{
  		position: relative;
  		.ratate{
  			transform: rotate(180deg);
  		}
  		.img{
  			width: 10px;
  			height: 6px;
  			position: absolute;
  			right: 10%;
  		}
  		.pricelist{
  			width: 100%;
  			position: absolute;
  			left: -1px;top: 100%;
  			height: 160px;
  			overflow-y: auto;
  			border: 1px solid #f2f2f2;
        box-shadow: 0 0 3px;
  			background: #fff;
  			z-index: 666;
  			.priceli{
  				width: 99%;
  				height: 30px;
          line-height: 30px;
  				border: none;
  				&:hover{
  					background: #6a9df6;
            color: #fff;
  				}
  			}
  		}
  	}
  	.occupant{
  		overflow: hidden;
			.occupant-input{
				width: 100%;
				height: 100%;
			}
  	}
    #cascader{
      width: 100%;
      height: 100%;
      pointer-events: none;
      position: absolute;
      top:0;left:0;
      background: #fff;
    }
  }
</style>