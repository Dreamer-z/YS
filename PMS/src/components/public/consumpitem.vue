<template>     <!-- 消费清单 -->
	<div @click="goodsTypeShow = 0" class="consumptionlist">
		<div class="box">			
			<header class="head clearfix">
				<p class="fl">添加消费项</p>
				<p @click="consumpItemNone" style="font-size: 30px;cursor:pointer;" class="fr">×</p>
			</header>
			<div class="contain">
				<ul class="addlist">
					<li @click="addGoodsListModel">新增</li>
					<li @click="deleFromAPI">删除</li>
					<li @click="setGoodsList">保存</li>
				</ul>
				<p v-show="isFalse" style="font-size: 20px;color: red;text-align:center;">有必填项没有填写</p>
				<div class="line"></div>
				<ul class="whypay clearfix bj">
					<li @click="isDeleAll = !isDeleAll" class="one">
						<div :class="{'borcolor': isDeleAll}">
							<nav :class="{'beij': isDeleAll}"></nav>
						</div>
					</li>
					<li class="two">类型</li>
					<li class="seven">商品</li>
					<li class="three">客房</li>
					<li class="four">数量</li>
					<li class="five">金额</li>
					<li class="six">凭证号</li>
				</ul>
				<ul v-for="(item, index) in goodsListModel" :key="index" class="whypay clearfix">  <!-- 选择项 -->
					<li @click="setGoodsListModelClassArr(index)" class="one">
						<div :class="{'borcolor': goodsListModelClassArr.includes(index)}">
							<nav :class="{'beij': goodsListModelClassArr.includes(index)}"></nav>
						</div>
					</li>
					<li @click.stop="typeBeShow(index)" class="two">
						{{item.category}}
						<img style="position:absolute;top:12px;right:10px;" src="@/assets/images/sjx.png" alt="">
						<el-collapse-transition>
							<ul v-show="goodsTypeShow == 1 && goodsTypeIndex == index" class="leixing">
								<li @click.stop="giveType(item,data)" :key="i" v-for="(data, i) in typeArr">{{data.name}}</li>
							</ul>
						</el-collapse-transition>
					</li>
					<li @click.stop="goodsBeShow(index)" class="seven">
						{{item.goods_name}}
						<img style="position:absolute;top:12px;right:10px;" src="@/assets/images/sjx.png" alt="">
						<el-collapse-transition>
							<ul v-show="goodsTypeShow == 2 && goodsTypeIndex == index" class="goods">
								<li @click.stop="giveGoodsName(item,value)" :key="n" v-for="(value, n) in item.goodsArr">{{value.name}}</li>
							</ul>
						</el-collapse-transition>
					</li>
					<li class="three">
						{{item.roomNum}}
						<!-- <img style="position:absolute;top:12px;right:10px;" src="@/assets/images/sjx.png" alt=""> -->
						<!-- 客房 -->
					</li>
					<li class="four">
						{{item.count}}
						<div class="addnum">
							<nav @click="addNum(item)">
								<img src="@/assets/images/sjx.png" alt="dele">
							</nav>
							<section @click="deleNum(item)">
								<img src="@/assets/images/sjx.png" alt="add">
							</section>
						</div>
					</li>
					<li class="five">
						<input v-model="item.totalPrice" class="numinput" type="number">
					</li>
					<li class="six">
						<span v-if="item.idnum != ''">{{item.idnum}}</span>
						<input v-else style="text-indent: 6px;height: 1005;width: 100%;" type="text">
					</li>
				</ul>
				<div>
					<ul v-for="(item, index) in fromAPI" :key="index" class="whypay clearfix">
						<li @click="setBackground(item)" class="one">
							<div :class="{'borcolor': setBackColor.includes(item)}">
								<nav :class="{'beij': setBackColor.includes(item)}"></nav>
							</div>
						</li>
						<li class="two">
							{{item.category}}
						</li>
						<li class="seven">{{item.goods_name}}</li>
						<li class="three">{{mes.roomName}}</li>
						<li class="four">{{item.count}}</li>
						<li class="five">{{Number(item.price) * item.count}}</li>
						<li class="six">{{item.idnum}}</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import API from "@/store/API"
import bus from "@/store/bus"
import { mapGetters } from 'vuex'
	export default{
		name: 'consumpItem',
		props: ['mes',"orderId","roomName"],  // ,'roomName'
		data() {
			return {
				// roomId: this.props.mes,
				isDeleAll: false,
				goodsListModelClassArr: [],
				isFalse: false,
				setBackColor: [],
				fromAPI: [],
				goodsTypeIndex: -1,
				goodsTypeShow: 0,
				goodsListModel: [
					{
						category: '',
						typeId: '',
						goods_name: '',
						goodsId: '',
						price: '',
						roomNum: this.mes.roomName?this.mes.roomName:this.roomName,
						goodsArr: [],
						count: 1,
						totalPrice: '',
						idnum: ''
					}
				],
				// goodsArr: [],
				typeArr: []
			}
		},
		computed: {
			...mapGetters({
				hotel:'currHotel'
			})
		},
		watch: {
			isDeleAll(newval) {
				if(newval) {
					this.setBackColor = []
					this.goodsListModelClassArr = []
					this.fromAPI.forEach((e, i)=>{
						this.setBackColor.push(i)
					})
					this.goodsListModel.forEach((e, i)=>{
						this.goodsListModelClassArr.push(i)
					})
				} else {
					this.setBackColor = []
					this.goodsListModelClassArr = []
				}
			}
		},
		methods: {
			getFromAPI() {
				API.get("/pms/roomstatus/consume?id=" + this.orderId).then(res=>{
					if(res.error_code == 0) {
						this.fromAPI = res.data
					}
				})
			},
			setGoodsListModelClassArr(i) {
				if(this.goodsListModelClassArr.includes(i)){
					let a = this.goodsListModelClassArr.indexOf(i)
					this.goodsListModelClassArr.splice(a, 1)
				}else{
					this.goodsListModelClassArr.push(i)
				}
			},
			getListOfGoods() {
				API.get("/pms/goods?id=" + this.hotel.id).then(res=>{
					if(res.error_code == 0) {
						this.goodsArr = res.data
					}
				})
				// console.log('0000.00.0.0.0.0.0.0.0.0.0.0',this.mes)
			},
			getCommodityType() {
				API.get("/pms/category?id=" + this.hotel.id).then(res=>{
					if(res.error_code == 0) {
						this.typeArr = res.data
					}
				})
			},
			deleFromAPI() {
				let _this = this;
				let str = '';
				let arr = []
				this.setBackColor = this.setBackColor.sort().reverse()
				this.goodsListModelClassArr = this.goodsListModelClassArr.sort().reverse()
				this.setBackColor.forEach(function(element, index) {
					// _this.fromAPI.splice(element, 1)
					arr.push(element.id)
					str = arr.join(',')
				})
				API.dele("/pms/consume?ids=" + str).then(res=>{
					if(res.error_code == 0) {
						this.setBackColor.forEach((e,i)=>{
							if(this.fromAPI.includes(e)) {
								let find = this.fromAPI.indexOf(e)
								this.fromAPI.splice(find, 1)
							}
						})
						this.setBackColor = []
					}
				})
				this.goodsListModelClassArr.forEach(function(element, index) {
					_this.goodsListModel.splice(element, 1)
				})
				// this.setBackColor = []
				this.goodsListModelClassArr = []
			},
			setBackground(e) {
				if(this.setBackColor.includes(e)){
					let a = this.setBackColor.indexOf(e)
					this.setBackColor.splice(a, 1)
				}else{
					this.setBackColor.push(e)
				}
			},
			setGoodsList() {
				// console.log(this.mes)
				// return
				let _this = this;
				let n = true;
				this.goodsListModel.forEach( function(element, index) {
					// for(let name in element) {
						if(element['category'] == '' || element['goods_name'] == '') {
							_this.isFalse = true;
							n = false;
						}
						if(!n){return}
					// }
					// if(!n){return}
				})
			  if(n) {
			  	let arr = []
			  	this.goodsListModel.forEach((e,i)=>{
			  		arr.push({
			  			goods_id: e.goodsId,
			  			count: e.count
			  		})
			  	})
				  this.isFalse = false;
			    let obj={
			    	"room_id": this.mes.roomId?this.mes.roomId:this.mes,  //.roomId
						"order_id": this.orderId,
						"consume": arr,
						"hotel_id": this.hotel.id
			    }
				    API.post("/pms/roomstatus/consume", obj).then(res=>{
				    	if (res.error_code == 0) {
				    		this.$message({
				          message: '添加成功',
				          type: 'success'
				        })
				    	} else {
				    		if (res.msg) {
				    			this.$message.error(`${res.msg}`)
				    		}
				    	}
				    })
				  
				  this.fromAPI = this.fromAPI.concat(this.goodsListModel)
				  this.goodsListModel = [{
						category: '',
						typeId: '',
						goods_name: '',
						goodsId: '',
						price: '',
						roomNum: this.mes.roomName?this.mes.roomName:this.roomName,
						goodsArr: [],
						count: 1,
						totalPrice: '',
						idnum: ''
					}]
			  }
			},
			addNum(e) {
				if (e.goodsPrice != '') {
					e.count++
					e.totalPrice = e.price * e.count
				}
			},
			deleNum(e) {
				if(e.count > 1) {
					e.count--
					e.totalPrice = e.price * e.count
				}
			},
			giveGoodsName(e, v){
				e.price = v.price;
				e.totalPrice = v.price * e.count
				e.goods_name = v.name
				e.goodsId = v.id
				this.goodsTypeShow = 0
			},
			giveType(e, d) {
				e.category = d.name
				e.typeId = d.id
				this.goodsTypeShow = 0
				API.get("/pms/roomstatus/goods?id=" + d.id).then(res=>{
					if (res.error_code == 0 ) {
						e.goodsArr = res.data
					}
				})
			},
			typeBeShow(i) {
				this.goodsTypeIndex = i;
				this.goodsTypeShow = 1
			},
			goodsBeShow(i) {
				this.goodsTypeIndex = i;
				this.goodsTypeShow = 2
			},
			addGoodsListModel() {
				this.goodsListModel.push(
				  {
						category: '',
						typeId: '',
						goods_name: '',
						goodsId: '',
						price: '',
						roomNum: this.mes.roomName?this.mes.roomName:this.roomName,
						goodsArr: [],
						count: 1,
						totalPrice: '',
						idnum: ''
					})
			},
			consumpItemNone() {
				bus.ev.$emit('consumpItemNone')
			}
		},
		mounted() {
			console.log(this.mes,this.orderId)
			this.getFromAPI()
			this.getCommodityType()
			this.getListOfGoods()
		}
	}
</script>

<style lang="scss" scoped>
	.consumptionlist{
		position: fixed;
		top: 0;left: 0;right: 0;bottom: 0;
		background: rgba(0,0,0,.4);
		.box{
			width: 1013px;
			position: absolute;
			top: 20%;
			left: 22%;
			background: #fff;
			min-height: 500px;
			overflow-y: auto;
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
		.contain{
			width: 100%;
			box-sizing: border-box;
			padding: 20px 30px;
		}
		.addlist{
			margin-bottom: 8px;
			li{
				display: inline-block;
				width: 58px;
				height: 28px;
				line-height: 28px;
				text-align: center;
				border: 1px solid #6a9df6;
				border-radius: 4px;
				color: #6a9df6;
				margin-right: 10px;
			}
		}
		.whypay,.line{
			width: 936px;
			border-bottom: 1px solid #a9bfd6;
		}
		.bj{
			background: #4b5967;
			color: #fff;
		}
		.whypay{
			li{
				float: left;
				border-left: 1px solid #a9bfd6;
				height: 30px;
				line-height: 30px;
				text-align: center;
				position: relative;
			}
			.one{
				width: 30px;
				.borcolor{
					border-color: #27a9e3;
				}
				.beij{
					background: #27a9e3;
				}
				div{
					width: 10px;
					height: 10px;
					border: 1px solid #d9d9d9;
					border-radius: 2px;
					margin-top:9px;
					margin-left: 9px;
					background: #fff;
					nav{
						width: 6px;
						height: 6px;
						background: #fff;
						margin-top: 2px;
						margin-left: 2px;
					}
				}
			}
			.two{
				width: 125px;
			}
			.three{
				width: 150px;
			}
			.four{
				width: 112px;
			}
			.five{
				width: 155px;
			}
			.six{
				width: 181px;
				border-right: 1px solid #a9bfd6;
			}
			.seven{
				width: 175px;
			}
		}
		.numinput{
			width: 100%;
			height: 100%;
			box-sizing: border-box;
			padding-left: 10px;
			font-size: 16px;
		}
		.addnum{
			nav,section{
				width: 15px;
				height: 14px;
				background: #e6e6e6;
				position: absolute;
				right: 0;
				&:active{
					background: #ccc;
				}
			}
			nav{
				top: 0;
				img{
					position: absolute;
					transform: rotateX(180deg);
					top:4px;
					right: 2px;
				}
			}
			section{
				bottom: 0;
				img{
					position: absolute;
					top:4px;
					right: 2px;
				}
			}
		}
		.goods{
			z-index: 100;
			height: 160px;
			width: 175px;
			overflow-y: auto;
			position: absolute;
			left: -1px;
			top: 100%;
			border: 1px solid #f2f2f2;
			box-shadow: 0 0 3px #f2f2f2;
			background: #fff;
			li{
				width: 158px;
				border: none;
				box-sizing: border-box;
				padding-left: 15px;
				text-align: left;
				cursor: pointer;
				&:hover{
					background: #6a9df6;
					color: #fff;
				}
			}
		}
		.leixing{
			z-index: 100;
			height: 160px;
			width: 125px;
			overflow-y: auto;
			position: absolute;
			left: -1px;
			top: 100%;
			background: #fff;
			border: 1px solid #f2f2f2;
		  box-shadow: 0 0 3px #f2f2f2;
			li{
				border: none;
				width: 115px;
				height: 30px;
				box-sizing: border-box;
				padding-left: 15px;
				text-align: left;
				cursor: pointer;
				&:hover{
					background: #6a9df6;
					color: #fff;
				}
			}
		}
	}
</style>