<template>
	<div @click="isChoice = false" class="renew">
		<div class="text">
			<header class="clearfix">
				<p class="fl">续房</p>
				<p @click="renewBeNone" style="font-size: 30px;cursor:pointer;" class="fr">×</p>
			</header>
			<div class="contain">
				<div class="changeroom">
					<p style="margin-right: 16px;" class="middle">
						<span class="middle">续住房间</span>
						<span class="middle">：</span>
					</p>
					<nav class="middle nowroom">
						<span>{{roomNum}}</span>
						<span style="margin-left: 20px;">{{price}}元/天</span>
					</nav>
				</div>
				<div style="margin: 10px 0;" class="changeroom">
					<p style="margin-right: 20px;" class="middle">
						<span class="middle">预离时间：</span>
					</p>
					<div class="leavedate middle">{{leavedate}}&nbsp;{{leavetime}}</div>
					<!-- <div class="leavetime middle">{{leavetime}}</div> -->
				</div>
				<div style="margin: 10px 0;" class="changeroom">
					<p style="margin-right: 10px;" class="middle">
						<span class="middle">续住时间</span>
						<span class="middle">：<span style="color: red;">*</span></span>
					</p>
					<el-date-picker :picker-options="pickerOptions" @change="dateChange(dateValue)" v-model="dateValue" value-format="yyyy-MM-dd HH:mm:ss" size="mini"  type="datetime">
					</el-date-picker>
					<!-- <div @click.stop="isChoice = true" class="choice middle">
						<span>{{choiceTime}}</span>
						<div class="rotate"></div>
						<el-collapse-transition>
							<ul v-show="isChoice" class="list">
								<li @click.stop="changeChoiceTime(item)" :key="index" v-for="(item, index) in hours">{{item}}</li>
							</ul>
						</el-collapse-transition>
					</div> -->
				</div>
				<div class="addday">
					<p class="middle">
						<span class="middle">续住天数</span>
						<span class="middle">：<span style="color: red;">*</span></span>
					</p>
					<nav style="margin-left: 10px;" class="middle">
						<span style="cursor: pointer;" @click.stop="deleOneDay" class="middle dele"><span class="textdele">－</span></span>
						<span style="margin: 0 16px;" class="middle">{{stayHowManyDay}}</span>
						<span style="cursor: pointer;" @click.stop="addOneDay" class="middle add"><span class="textadd">＋</span></span>
					</nav>
				</div>
				<footer class="clearfix">
					<nav style="cursor: pointer;" @click="givePost" class="fl">确定</nav>
					<section style="cursor: pointer;" @click="renewBeNone" class="fl">取消</section>
				</footer>
			</div>
		</div>
		<continue-stay @continueBeNone="letContinueBeNone" :obj="childObj" :val="childMsg" v-if="isContinueStayShow"></continue-stay>
	</div>
</template>

<script>
import continueStay from "@/components/public/continuestay"
import bus from "@/store/bus"
import API from "@/store/API"
import { mapGetters } from 'vuex'
	export default {
		name: 'reNew',
		data() {
			return {
				childMsg: {},
				childObj: {},
				isContinueStayShow: false,
				// hotelId: 1,
				orderId: '',
				roomId: '',
				roomNum: '',
				price: '',
				leavedate: '',
				leavetime: '',
				dateValue: '',
				stayHowManyDay: 0,
				choiceTime: '12:00',
				isChoice: false,
				hours: ['24:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00'
				],
				pickerOptions: {
					disabledDate(time) {
						return time.getTime() < (new Date() - 24*60*60*1000)
					}
				}
			}
		},
		components: {
			continueStay
		},
		computed:{
			...mapGetters({
				// 映射 `this.doneCount` 为 `store.getters.doneTodosCount`
				hotel:'currHotel'
			})
		},
		methods: {
      givePost() {
      	let obj={
      		room_id: this.roomId,
      		hotel_id: this.hotel.id,
      		order_id: this.orderId,
      		leave_time: this.dateValue
				}
				this.childObj = obj
      	// API.post("/pms/roomstatus/keep", obj).then(res=>{
				API.post("/pms/keep/order", obj).then(res =>{
      		if(res.error_code == 0) {
						this.childMsg = res.data
						this.isContinueStayShow = true
						this.stayHowManyDay = 0
						this.dateValue = ''
      		} else {
      			if (res.msg) {
      				this.$message.error(`${res.msg}`)
      			}
      		}
      	})
			},
			letContinueBeNone() {
				this.isContinueStayShow = false
				bus.ev.$emit('renewBeNone')
			},
			renewBeNone() {
				Object.assign(this.$data, this.$options.data())
				bus.ev.$emit('renewBeNone')
			},
			changeChoiceTime(e) {
				this.choiceTime = e;
				this.isChoice = false
			},
			addOneDay() {
				if(this.stayHowManyDay < 28) {
					this.stayHowManyDay++
					let mydate = new Date(this.leavedate)
					let year = mydate.getFullYear()
					let month = Math.floor(mydate.getMonth())
					let date = mydate.getDate()   
					let days = new Date(year, month + 1, 0).getDate()
					let newdate;
					let oldTime = this.dateValue.split(' ')[1]
					if((Math.floor(date) + Math.floor(this.stayHowManyDay)) > Math.floor(days)) {
						month = (month + 2) < 10 ? '0' + (month + 2) :(month + 2)
						if(Math.floor(month) <= 12) {
							newdate = Math.floor(this.stayHowManyDay) - (Math.floor(days) - Math.floor(date))
							newdate = newdate < 10? '0' + newdate : newdate
							this.dateValue = `${year}-${month}-${newdate}${' '+oldTime}`
						}else{
							year = Math.floor(mydate.getFullYear()) + 1
							month = '01'
							newdate = Math.floor(this.stayHowManyDay) - (Math.floor(days) - Math.floor(date))
							newdate = newdate < 10? '0' + newdate : newdate
							this.dateValue = `${year}-${month}-${newdate}${' '+oldTime}`
						}
					}else{
						newdate =  (Math.floor(date) + Math.floor(this.stayHowManyDay))
						this.dateValue = `${year}-${month + 1 < 10?'0'+(month + 1):month + 1}-${newdate < 10?'0'+newdate:newdate}${' '+oldTime}`
					}
				}
			},
			deleOneDay() {
				if (this.stayHowManyDay > 1) {
					this.stayHowManyDay--
					let mydate = new Date(this.leavedate)
					let year = mydate.getFullYear()
					let month = mydate.getMonth()
					let date = mydate.getDate()   
					let days = new Date(year, month + 1, 0).getDate()
					let newdate;
					let oldTime = this.dateValue.split(' ')[1]
					if((Math.floor(date) + Math.floor(this.stayHowManyDay)) > Math.floor(days)) {
						month = (Math.floor(month) + 2) < 10 ? '0' + (Math.floor(month) + 2) :(Math.floor(month) + 2)
						if(Math.floor(month)<12) {
							newdate = Math.floor(this.stayHowManyDay) - (Math.floor(days) - Math.floor(date))
							newdate = newdate < 10? '0' + newdate : newdate
							this.dateValue = `${year}-${month}-${newdate}${' '+oldTime}`
						}else{
							year = Math.floor(mydate.getFullYear()) + 1
							month = '01'
							newdate = Math.floor(this.stayHowManyDay) - (Math.floor(days) - Math.floor(date))
							newdate = newdate < 10? '0' + newdate : newdate
							this.dateValue = `${year}-${month}-${newdate}${' '+oldTime}`
						}
					}else{
						newdate =  (Math.floor(date) + Math.floor(this.stayHowManyDay))
						this.dateValue = `${year}-${month + 1<10?'0'+(month + 1):month + 1}-${newdate < 10?'0'+newdate:newdate}${' '+oldTime}`
					}
				}
			},
			// getDateNow() {
			// 	let mydate = new Date()
			// 	let year = mydate.getFullYear()
			// 	let month = (mydate.getMonth() + 1) < 10 ? '0' + (mydate.getMonth() + 1) : mydate.getMonth() + 1
			// 	let date = (mydate.getDate() + 1) < 10 ? '0' + (mydate.getDate() + 1) : (mydate.getDate() + 1)
			// 	let nextday = `${year}-${month}-${date}`
			// 	let hour = mydate.getHours()
			// 	let minutes = mydate.getMinutes()
			// 	this.dateValue = nextday
			// },
			dateChange(e) {
				let getDateTime = new Date(this.dateValue).getTime()
				let nowDateTime = new Date(this.leavedate).getTime()
				this.stayHowManyDay = Math.ceil((getDateTime - nowDateTime)/(24*60*60*1000))
			}
		},
		created() {
			// this.getDateNow()
			bus.ev.$on('willBeRenew', (e)=>{
				console.log('15151515151', e)
				API.get(`/pms/roomstatus/keep?order_id=${e.order_id}&room_id=${e.id}`).then(res=>{
					if(res.error_code == 0) {
						// this.getDateNow()
						let data = res.data
						this.roomId = e.id;   //e.id
						this.orderId = data.order_id;
						this.roomNum = data.room_name + data.room_type_name;
						this.price = data.price
						this.leavedate = data.last_leave_time.split(' ')[0]
						this.leavetime = data.last_leave_time.split(' ')[1]
						this.dateValue = data.last_leave_time
						this.addOneDay()
					}
				})
			})
		}
	}
</script>

<style lang="scss" scoped>
	.renew{
		z-index: 666;
		position: fixed;
		top: 0;left: 0; right: 0; bottom: 0;
		background: rgba(0,0,0,.4);
		display: flex;
		align-items:center;
    justify-content: center;
		.middle{
			display: inline-block;
			vertical-align: middle;
		}
		.mitop{
			display: inline-block;
			vertical-align: top;
		}
		.text{
			position: absolute;
			width: 700px;
			max-height: 500px;
			overflow-y: auto;
		}
		header{
			width: 100%;
			height: 40px;
			background: #437ff9;
			box-sizing: border-box;
			padding: 0 30px;
			color: #fff;
			line-height: 40px;
		}
		.nowroom{
			width: 280px;
			height: 28px;
			border: 1px solid #e6e6e6;
			border-radius: 4px;
			line-height: 28px;
			box-sizing: border-box;
			padding-left: 10px;
		}
		.leavedate,.leavetime{
			height: 28px;
			line-height: 28px;
			text-align: center;
			border: 1px solid #f2f2f2;
			border-radius: 6px;
		}
		.leavedate{
			width: 218px;
		}
		.leavetime{
			width: 98px;
			margin-left: 12px;
		}
		.choice{
			width: 98px;
			height: 28px;
			line-height: 28px;
			box-sizing: border-box;
			border: 1px solid #e5e5e5;
			border-radius: 6px;
			padding-left: 10px;
			position: relative;
			margin-left: 12px;
			.rotate{
				width: 6px;
				height: 6px;
				border-bottom: 1px solid #d5d5d5;
				border-right: 1px solid #d5d5d5;
				transform: rotate(45deg);
				position: absolute;
				top: 35%;
				right: 8px;
			}
			.list{
				width: 95px;
				border: 1px solid #e5e5e5;
				border-top: none;
				max-height: 118px;
				overflow-y: auto;
				position: absolute;
				left: 0;top: 100%;
				margin-top: -1px;
				z-index: 266;
				background: #fff;
				li{
					border-bottom: 1px solid #e5e5e5;
					box-sizing: border-box;
					padding-left: 10px;
					line-height: 28px;
					cursor: pointer;
					&:hover{
						background: #6a9df6;
						color: #fff;
					}
				}
			}
		}
		.addday{
			.add,.dele{
				width: 24px;
				height: 24px;
				border-radius: 50%;
				font-size: 30px;
				position: relative;
			}
			.dele{
				background: #f2f2f2;
				color: #b3b3b3;
				.textdele{
					position: absolute;
					top: -28%;
					left: -12%;
				}
			}
			.add{
				background: #6a9df6;
				color: #fff;
				.textadd{
					position: absolute;
					top: -28%;
					left: -10%;
				}
			}
		}
		.contain{
			padding: 26px 30px;
			background: #fff;
		}
		footer{
			width: 226px;
			margin: 0 auto;
			margin-top: 20px;
			nav,section{
				text-align: center;
				line-height: 38px;
				width: 98px;
				height: 38px;
				border-radius: 6px;
				border: 1px solid #437ff9;
				background: #437ff9;
				color: #fff;
			}
			nav{
				margin-right: 25px;
			}
		}
	}
</style>