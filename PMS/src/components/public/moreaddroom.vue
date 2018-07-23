<template>
	<div class="dialg">
		<div class="context">
			<header>批量添加</header>
			<div class="mainbody">
				<div class="one">
					<p>楼层</p>
					<span v-show="val.name != ''">{{val.name}}楼</span>
					<span style="color: red;" v-show="val.name == ''">请点击取消，返回上一个操作</span>
					<span style="color: red;" v-show="theSameName">已有相同的房间</span>
				</div>
				<div class="two">
					<p>房间类型</p>
					<el-select size="medium" v-model="value2" placeholder="请选择房间类型">
					  <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
						</el-option>			 
				  </el-select>
				</div>
				<div class="three">
					<nav>
						<p>序号前缀</p>
						<input v-model="namenum" type="number">
					</nav>
					<section>
						<p>序号值</p>
						<input @focus="theSameName = false" ref="fornum" @blur="howMany" v-model="fornum" type="number">
						<span>添加的数量不可以超过20个</span>
					</section>
				</div>
				<p class="title">说明：房间批量生成的房号由房间数量和房号前缀生成，如输入房间数量"12"，房号前缀"03"，那么生成房号为0301......0312</p>
				<div class="maintxt">
					<p>房号预览</p>
					<ul>
						<li :key="index" v-for="(item, index) in roomnumarr">
							<span>{{item.name}}</span>
							<div>
								<span @click="deleroomnum(index)">×</span>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<footer>
				<div>
					<nav @click="tobenone">取消</nav>
					<section @click="giveadd">添加</section>
				</div>
			</footer>
		</div>
	</div>
</template>

<script>
import API from "@/store/API"
	export default{
		name: 'moreAddRoom',
		data() {
			return {
				fornum: '',
				namenum: '',
				roomnumarr: [],
				options2: [],
				room_type: '',
				value2: '',
				theSameName: false,
				checkNames: []
			}
		},
		props:['val'],
		methods: {
			getName() {
				let _this = this;
				API.getFloorHasedRoom(this.val.floor_id).then(res => {
					let arr = res.data;
					arr.forEach( function(element, index) {
						_this.checkNames.push(element.name)
					});
				})
				// API.get('/pms/room?id=' + this.val.floor_id).then(res => {
				// 	let arr = res.data;
				// 	arr.forEach( function(element, index) {
				// 		_this.checkNames.push(element.name)
				// 	});
				// })
			},
			getroomtype() {
				// console.log('eeeeeeeeeeeeee',this.val)
				let _this = this;
				API.getRoomType(this.val.hotel_id).then(res => {
					res.data.forEach( function(element, index) {
						_this.options2.push({
							label: element.name,
							value: element.id
						})
					})
				})
				// API.get('/pms/roomtype?id=' + this.val.hotel_id).then(res => {
				// 	res.data.forEach( function(element, index) {
				// 		_this.options2.push({
				// 			label: element.name,
				// 			value: element.id
				// 		})
				// 	})
				// })
			},
			giveadd() {
				if (this.theSameName || this.val.name == '') {return}
				if(this.roomnumarr.length == 0 || this.value2 == '') {
					this.$message({
	          message: '请填写房间信息',
	          type: 'warning'
	        })
					return
				}
				let _this =this
				let arrname = []
				this.options2.forEach( function(element, index) {
					if(element.value == _this.value2) {
						_this.room_type = element.label
					}
				})
				this.roomnumarr.forEach( function(element, index) {
					arrname.push(element.name)
				})
				let obj = {
					"build_id": this.val.build_id,  //	是	int	楼栋id
					"hotel_id": this.val.hotel_id,   //	是	int	酒店id
					"floor_id": this.val.floor_id,   //	是	int	楼层id
					"name": arrname,     //	是	string	房间名
					"room_type_id": this.value2     //	是	int	房型id
				}
				if(this.roomnumarr.length && typeof(Math.floor(this.value2) == 'number')){        //this.value2 != ''
					API.addMoreRooms(obj).then(res => {
						if(res.error_code == 0) {
							let arr = []
							res.data.forEach( function(element, index) {
								// _this.roomnumarr[index].id = element
								arr.push({
									'id': element,
									'name': _this.roomnumarr[index].name,
									'room_type_name': _this.room_type
								})
							})
							this.$emit('giveaddarr', {'arr': arr})
							arr = []
							this.tobenone()
							return
						}
					})
			  }
			},
			deleroomnum(i) {
				this.roomnumarr.splice(i, 1)
			},
			howMany(){
				let _this = this;
				let a = this.namenum;
				let b = Math.floor(this.fornum);
				let arr = []
				let forname = []
				if(b < 21){
					for(let i = 0; i < b; i++) {
						let num = (i + 1) < 10? '0'+ (i + 1) : (i + 1)
						arr.push({
							id: '',
							name: a + num
						})
						forname.push(a + num)
					}
				}
				forname.forEach( function(element, index) {
					if(_this.checkNames.includes(element)){
						_this.theSameName = true;
						// _this.$refs.fornum.blur() 
					}
				});
				if(this.theSameName) {
					return
				}
				this.roomnumarr = arr
				this.checkNames
				this.$refs.fornum.blur()
			  _this = ''
			  a = ''
			  b = ''
			  arr = []
			  forname = []
			},
			tobenone(){
				this.$emit('disnone', {})
				// console.log(this.val)
			}
		},
		created() {
			this.getName()
		},
		mounted() {
			this.getroomtype()
		}
	}
</script>

<style lang="scss" scoped>
	.dialg{
		position: fixed;
		top:0;left:0;right:0;bottom:0;
		background: rgba(0,0,0,.4);
		z-index: 166;
		font-size: 16px;
		.context{
			padding-bottom: 30px;
			width: 78%;
			margin-left: 300px;
			background: #f5f5f5;
			p{
				display: inline-block;
				color: #9dbbf7;
			}
			.mainbody{
				width: 100%;
				box-sizing: border-box;
				padding: 0 30px;
				.maintxt{
					ul{
						padding: 26px;
						background: #fff;
						box-sizing: border-box;
						margin-top: 10px;
						max-height: 100px;
						overflow-y: auto;
						li{
							width: 108px;
							line-height: 28px;
							border: 1px solid #e2e2e2;
							border-radius: 4px;
							text-align: center;
							position: relative;
							margin-right: 40px;
							display: inline-block;
							margin-bottom: 26px;
							div{
								width: 18px;
								height: 18px;
								border-radius: 50%;
								background: #dc4233;
								color: #fff;
								line-height: 18px;
								text-align: center;
								position: absolute;
								top: 0;right: 0;
								transform: translate(50%, -50%);
								cursor: pointer;
							}
						}
					}
				}
				.title{
					color: #adadad;
					line-height: 80px;
					font-size: 12px;
				}
				.one{
					p{
						margin-right: 50px;
						line-height: 50px;
					}
				}
				.two{
					margin-bottom: 10px;
					p{
						margin-right: 22px;
					}
				}
				.three{
					nav,section{
						display: inline-block;
						input{
							height: 36px;
							width: 150px;
							margin-left: 22px;
						}
					}
					section{
						margin-left: 14%;
							span{
								font-size: 9px;
								color: #e68c7e;
							}
						}
					}
				}
			header{
				line-height: 60px;
				border-top-left-radius: 6px;
				border-top-right-radius: 6px;
				text-align: center;
				background: #437ff9;
				font-size: 18px;
				color: #fff;
				margin-bottom: 16px;
				margin-top: 60px;
			}
		}
		footer{
			width: 100%;
			div{
				margin: 30px auto;
				width: 240px;
				text-align: center;
				nav{
					width: 98px;
					line-height: 48px;
					border: 1px solid #bacef6;
					border-radius: 4px;
					color: #437ff9;					
					text-align: center;
					margin-right: 30px;
					display: inline-block;
					cursor: pointer;
				}
				section{
					width: 98px;
					line-height: 48px;
					border: 1px solid #437ff9;
					border-radius: 4px;
					color: #fff;
					text-align: center;
					display: inline-block;
					background: #437ff9;
					cursor: pointer;
				}
			}
		}
	}
</style>