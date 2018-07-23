<template>
	<div class="exchangeroom">
		<div class="text">
			<header class="clearfix">
				<p class="fl">换房</p>
				<p @click="exchangeroomBeNone" style="font-size: 30px;cursor:pointer;" class="fr">×</p>
			</header>
			<div class="contain">
				<div class="changeroom">
					<p style="margin-right: 20px;" class="middle">
						<span class="middle">换出房间</span>
						<span class="middle">：</span>
					</p>
					<nav class="middle nowroom">
						<span style="margin-right: 26px;" class="middle">{{message.room.name}}{{message.room.room_type_name}}</span>
						<span class="middle">{{message.room.price}}元/天</span>
					</nav>
				</div>
				<div style="margin: 10px 0;" class="changeroom">
					<p style="margin-right: 20px;" class="middle">
						<span class="middle">换入房间</span>
						<span class="middle">：</span>
					</p>
					<el-select size="medium" @change="getRoomNum" v-model="roomType" placeholder="请选择房间类型">
					  <el-option v-for="item in message.room_type" :key="item.id" :label="item.name" :value="item.id">
						</el-option>			 
				  </el-select>
				  <div style="margin-left: 52px;" class="middle">
				  	<el-select size="medium" v-model="roomNum" placeholder="请选择房间">
						  <el-option v-for="item in roomNumArr" :key="item.id" :label="item.name" :value="item.id">
							</el-option>			 
					  </el-select>
				  </div>
				</div>
				<!-- <div class="contain"> -->
				<!-- <div class="changeroom">
					<p style="margin-right: 20px;" class="middle">
						<span class="middle">换出房间</span>
						<span class="middle">：</span>
					</p>
					<el-select size="medium" v-model="value2" placeholder="请选择投诉类型">
						<el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
						</el-option>			 
					</el-select>
				</div> -->
				<div class="beizhu">
					<p class="mitop">
						<span class="middle">备注</span>
						<span class="middle">：</span>
					</p>
					<nav class="mitop beizhuArea">
						<textarea style="width: 100%;height: 100%;text-indent: 6px;"></textarea>
					</nav>
				</div>
				<div @click="setchoose" class="isclick">
					<section class="middle">
						<i style="font-size: 22px;font-weight: bold;margin-left: -2px;color: #6a9df6;" :class="{'icon-gou': choose}" class="iconfont"></i>
					</section>
					<p class="middle">勾选打扫</p>
				</div>
				<p style="width:100%;text-align:center;color:red"> {{exchangeRoomNoticeMsg}}</p>
				<footer class="clearfix">
					<nav @click="exchangeroomBeNone" class="fl">取消</nav>
					<section @click="givepost" class="fl">完成</section>
				</footer>
			</div>
		</div>
	</div>
</template>

<script>
import API from "@/store/API"
import { mapGetters } from 'vuex'
import bus from "@/store/bus"
	export default{
		name: 'exchangeRoom',
		props: ['list'],
		data() {
			return {
				choose: false,
				message: {
		        "room": {
		            "name": "101",
		            "room_type_name": "测试房型",
		            "price": "100.00"
		        },
		        "room_type": [
		            {
		                "id": 1,
		                "name": "测试房型"
		            },
		            {
		                "id": 2,
		                "name": "高级大床房"
		            },
		            {
		                "id": 3,
		                "name": "标准双人间"
		            }
		        ]
		    },
				roomType: '',
				roomNumArr: [],
				roomNum: '',
				exchangeRoomNoticeMsg:''
			}
		},
		computed:{
			...mapGetters({
				// 映射 `this.doneCount` 为 `store.getters.doneTodosCount`
				hotel:'currHotel'
			}),
			
		},
		watch:{
			roomNumArr:function(val,oldVal){
				   if(val.length <= 0){
				   	  this.exchangeRoomNoticeMsg ="该房型没有空净房间"
				   }else{
				   	  this.exchangeRoomNoticeMsg =""
				  }
			}
		},
		methods: {
			givepost() {
				let floorId = ''
				this.roomNumArr.forEach((e,i)=>{
					if (e.id == this.roomNum) {
						floorId = e.floorId
					}
				})
				if (this.roomNum == '') {
					this.$message({
	          message: '请选择要换入的房间',
	          type: 'warning'
	        })
	        return
				}
				let obj = {
					old_room_id: this.list.id,
					new_room_id: this.roomNum,
					order_id: this.list.order_id,
					clean: this.choose,
					hotel_id: this.hotel.id,
					remark: ''
				}
				API.exchangeroomPost(obj).then(res=>{
					if (res.error_code == 0) {
						this.$alert('操作成功', '', {
		          confirmButtonText: '确定',
		          callback: ()=>{
		          	this.list.newRoomId = this.roomNum
		          	this.list.floorId = floorId
		          	this.list.choose = this.choose
		          	bus.ev.$emit('exchangeroomBeNone',this.list)
		          }
		        })
					}
				})
			},
			getRoomNum(e) {
				this.roomNum = ''
				let array = []
				API.exchangeroomGetRoomNum(this.list.order_id, e).then(res=>{
					// console.log(res)
					if (res.error_code == 0) {
						let arr = res.data
						arr.forEach((e,i)=>{
							array.push({
								name: `${e.room_name}房  ${e.price}元/天`,
								id: e.room_id,
								floorId :e.floor_id
							})
						})
					   this.roomNumArr = array
					}

				})
			},
			setchoose() {
				this.choose = !this.choose
			},
			exchangeroomBeNone() {
				bus.ev.$emit('exchangeroomBeNone')
			},
			getRoomType() {
				let _this = this;
				API.getRoomType(this.hotel.id).then(res => {  // 传酒店的id过来
					res.data.forEach( function(element, index) {
						_this.roomTypeArr.push({
							label: element.name,
							value: element.id
						})
					})
				})
			}
		},
		created() {
			console.log(this.list)
			API.exchangeroomCreated(this.list.id).then(res=>{
				if (res.error_code == 0) {
					console.log(res)
					this.message = res.data
				}
			})
		}
	}
</script>

<style lang="scss" scoped>
	.exchangeroom{
		z-index: 888;
		position: fixed;
		top: 0;left: 0; right: 0; bottom: 0;
		background: rgba(0,0,0,.4);
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
			width: 625px;
			max-height: 500px;
			overflow-y: auto;
			top: 15%;
			left: 33%;
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
			width: 228px;
			height: 28px;
			border: 1px solid #e6e6e6;
			border-radius: 4px;
			text-align: center;
			line-height: 28px;
		}
		.contain{
			padding: 26px 30px;
			background: #fff;
		}
		.beizhu{
			margin: 10px 0;
		}
		.beizhuArea{
			width: 466px;
			height: 75px;
			border: 1px solid #ccc;
			margin-left: 46px;
		}
		.isclick{
			width: 200px;
			margin-left: 96px;
			section{
				width: 16px;
				height: 16px;
				border: 1px solid #ccc;
				border-radius: 1px;
				margin-right: 6px;
			}
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
			}
			nav{
				color: #437ff9;
				margin-right: 25px;
			}
			section{
				background: #437ff9;
				color: #fff;
			}
		}
	}
</style>