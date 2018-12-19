<template>
	<div class="dialg">
		<div class="context">
			<header v-if="this.val.id">编辑房间</header>
			<header v-else>添加房间</header>
			<div class="main">
				<div class="one">
					<p style="width:98px;marginLeft:10px;" class="blue">楼层</p>
					<span v-show="val.name !=''">{{val.name}}楼</span>
					<span style="color: red;" v-show="val.name == ''">请点击取消，返回上一个操作</span>
					<span style="color: red;" v-show="thesamename">已有相同的房间</span>
				</div>
				<div class="two">
					<p style="width:108px;" class="blue">
						<span style="color:red;">*</span>
						<span>房间类型：</span>
					</p>
					<el-select size="medium" v-model="value2" placeholder="请选择房间类型">  <!-- @change="cons"-->
            <el-option v-for="item in roomType" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
					<span style="color:red;margin-left:108px;">*</span>
					<p class="blue">房号：</p>
					<input @focus="thesamename = false" @blur="checkName" v-model="roomname" type="text">
				</div>
				<div class="two tag">
					<div class="ver-top">
						<p style="width:98px;marginLeft:10px;" class="blue">房间标签：</p>
					  <!-- <input @focus="thesamename = false" @blur="checkName" v-model="roomname" type="text"> -->
					</div>
					<nav style="maxWidth:87%;" class="ver-top">
						<p @click="setNeedTagsArr(item.id)" :class="{'active': needTagsArr.includes(item.id)}" v-for="(item, index) in tagsArr" :key="index" class="middle tag-list">{{item.name}}</p>
					</nav>
				</div>
				<div class="three">
					<p style="width:98px;marginLeft:10px;" class="blue middle">备注：</p>
					<!-- <input v-model="remark" placeholder="不要超过20个汉字" type="text"> -->
					<textarea v-model="remark" placeholder="不要超过20个汉字" class="remark middle"></textarea>
				</div>
				<p @click="isshow = true;" v-show="!isshow" class="more">更多设置</p>
				<p @click="isshow = false;" v-show="isshow" class="more">收起</p>
				<el-collapse-transition>
					<div v-show="isshow" class="moretext">
						<div class="four">
							<p class="blue">房间电话</p>
							<input v-model="phone" type="number">
						</div>
						<div class="five">
							<p class="blue">房间锁号</p>
							<input v-model="lock_num" type="text">
							<p class="ft12">（房间的锁号是根据门锁软件中的对应号来设置的）</p>
						</div>
						<div class="five">
							<p class="blue">门锁密钥</p>
							<input v-model="lock_secret" type="text">
						</div>
					</div>
				</el-collapse-transition>
			</div>
			<footer>
				<div>
					<nav @click="tonone">取消</nav>
					<section v-if="this.val.id" @click="tononeagain">完成</section>
					<section v-else @click="tononeagainAdd">添加</section>
				</div>
			</footer>
		</div>
	</div>
</template>

<script>
import API from "@/store/API"
	export default{
		name: 'addRoom',
		data() {
			return {
				roomobj: {},
				value2: this.val.room_type?this.val.room_type:'',
				roomType: [],
				room_type: '',
				isshow: false,
				roomname: this.val.roomname?this.val.roomname:'',    //  fangjianming
				remark:'',    //beizhu
				phone:'',
				toward:'',  //chaoxiang
				lock_num:'',
				lock_secret:'',   //miyao
				checkNames: [],
				thesamename: false,
				tagsArr: [],
				needTagsArr: [],
				onece: true
			}
		},
		props: ['val'],
		methods: {
			setNeedTagsArr(id) {
				if (this.needTagsArr.includes(id)) {
					let find = this.needTagsArr.indexOf(id)
					this.needTagsArr.splice(find , 1)
				} else {
					this.needTagsArr.push(id)
				}
			},
			getTags() {
				API.get("/pms/room/tags").then(res => {
					if (res.error_code == 0) {
						this.tagsArr = res.data
					}
				})
			},
			getName() {
				let _this = this;
				API.getFloorHasedRoom(this.val.floor_id).then(res => {
					let arr = res.data;
					arr.forEach( function(element, index) {
						_this.checkNames.push(element.name)
					});
				})
			},
			checkName() {
				if(this.checkNames.includes(this.roomname)) {
					this.thesamename  = true;
				}
			},
			getroomtype() {
				// console.log('mmmmmmmmmmmmm',this.val)
				let _this = this;
				 API.getRoomType(this.val.hotel_id).then(res => {  
				 	if(res.data) {
				 		// console.log('mmmmmmmmmmmmmm', res.data)
				 		res.data.forEach( function(element, index) {
				 			_this.roomType.push({
				 				label: element.name,
				 				value: element.id
				 			})
				 		})
				 	}
				 })
			},
			tonone() {
				this.$emit('distonone', {})
			},
			tononeagainAdd() {  //添加房间的
				if (this.thesamename) {return}
				if (!this.onece){return}
				this.onece = false
				let _this = this;
				if(this.roomname && this.value2) {
					let obj = {
						'build_id': this.val.build_id,
						'hotel_id': this.val.hotel_id,
						'floor_id': this.val.floor_id,
						'name': this.roomname,   //	是	string	房间名
						'room_type_id': Math.floor(this.value2),   //	是	int	房型id
						'remark': this.remark,     //	是	string	备注
						'phone': this.phone,   //	是	string	房间电话
						'toward': this.toward,    //	是	string	房间朝向
						'lock_num': this.lock_num,    //	是	string	房间锁号
						'lock_secret': this.lock_secret,    //	是	string	门锁秘钥
						'tags': this.needTagsArr
					}
					API.addNewRoom(obj).then(res => {
						let str;
						if(res.error_code == 0) {
							this.onece = true
							this.roomType.forEach( function(element, index) {
								if(element.value == _this.value2){        //value是 id。 this.value2拿到的也是id
									str = element.label          //  让this.value2  还是id    
								}
						  })
						  this.$alert('操作成功', '', {
			          confirmButtonText: '确定',
			          callback: ()=>{
			          	this.roomobj = {
					          // 'room_type_id': this.room_type,
					          'name': this.roomname,
					          'room_type_name': str,
					          'id': res.data.id
				        	}
				        	this.$emit('addonceAdd', {'msg': this.roomobj})
			          }
			        })
						} else {
							this.onece = true
							if (res.msg) {
	              this.$message.error(`${res.msg}`)
	            }
						}
					})
				} else {
					// this.$emit('addonce',{'msg': ''})
					this.$message({
	          message: '请填写房间信息',
	          type: 'warning'
	        })
				}
			},
			tononeagain() {     //  编辑用的
				if (this.thesamename) {return}
				if (!this.onece) {return}
				this.onece = false
				let _this = this;
				let str;
				if(typeof this.val.id != 'undefined') {
					if(typeof this.value2 != 'number') {
						this.roomType.forEach( function(element, index) {
							if(element.label == _this.value2){  //  label 是名字  value 是id
								str = element.value      //   让  this.value2  保持是个名字
							}
						})
					}else{
						str = this.value2
						this.roomType.forEach( function(element, index) {
							if(element.value == _this.value2){  //  label 是名字  value 是id
								_this.value2 = element.label      //   让  this.value2  保持是个名字
							}
						})
					}
					let obj = {
						'build_id': this.val.build_id,
						'hotel_id': this.val.hotel_id,
						'floor_id': this.val.floor_id,
						'name': this.roomname,   //	是	string	房间名
						'room_type_id': Math.floor(str),   //	是	int	房型id
						'remark': this.remark,     //	是	string	备注
						'phone': this.phone,   //	是	string	房间电话
						'toward': this.toward,    //	是	string	房间朝向
						'lock_num': this.lock_num,    //	是	string	房间锁号
						'lock_secret': this.lock_secret,   //	是	string	门锁秘钥
						'tags': this.needTagsArr
					}
					API.changeRoomName(this.val.id, obj).then(res =>{
						if(res.error_code == 0){
							this.onece = true
							this.$alert('操作成功', '', {
			          confirmButtonText: '确定',
			          callback: ()=>{
			          	this.roomobj = {
					          // 'room_type_id': this.room_type,
					          'name': this.roomname,
					          'room_type_name': this.value2,
					          'id': this.val.id
				        	}
				        	this.$emit('addonce', {'msg': this.roomobj})
			          }
			        })
						} else {
							this.onece = true
							if (res.msg) {
	              this.$message.error(`${res.msg}`)
	            }
						}
					})
				}else{
					// this.$emit('addonce',{'msg': ''})
				}
			}
		},
		mounted() {
			this.getroomtype()
		},
		created() {
			this.getTags()
			this.getName()
			if (this.val.id) {
				API.get("/pms/room/" + this.val.id).then(res => {
					if (res.error_code == 0) {
						let data = res.data
						this.remark = data.remark    //beizhu
						this.phone = data.phone
						this.toward = data.toward  //chaoxiang
						this.lock_num= data.lock_num
						this.lock_secret = data.lock_secret
						res.data.tags.forEach(e => {
							this.needTagsArr.push(e.tag_id)
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.dialg{
		.moretext{
			width: 100%;
			overflow: hidden;
			.mar{
				margin-left: 8%;
			}
			.four{
				display: inline-block;
				margin-bottom: 10px;
				input{
					margin-left: 26px;
					height: 36px;
					width: 200px;
				}
			}
			.five{
				margin-bottom: 10px;
				input{
					height: 36px;
					width: 42%;
					margin-left: 26px;
				}
			}
		}
		position: fixed;
		top:0;left:0;right:0;bottom:0;
		background: rgba(0,0,0,.4);
		z-index: 166;
		font-size: 14px;
		display: flex;
    align-items:center;
    justify-content: center;
		.ver-top{
			display: inline-block;
			vertical-align: top;
		}
		.context{
			.more{
				width:100%; text-align: right;
				margin-bottom: 18px;
				cursor: pointer;
			}
			// border-radius: 4px;
			width: 1000px;
			background: #f5f5f5;
			p{
				display: inline-block;
			}
			header{
				line-height: 60px;
				text-align: center;
				background: #437ff9;
				font-size: 18px;
				color: #fff;
				margin-bottom: 16px;
			}
			.main{
				width: 100%;
				box-sizing: border-box;
				padding: 0 30px;
				.blue{
					color: #94b4f7;
				}
				.one{
					line-height: 48px;
					p,span{
						display: inline-block;
					}
				}
				.mar-lf{
						margin-left: 26px;
					}
				.two{
					.mar-r{
						margin-right: 22px;
					}
					margin-bottom: 10px;
					p{
						display: inline-block;
						vertical-align: middle;
						// margin-right: 30px;
					}
					input{
						height: 36px;
						width: 200px;
					}
				}
				.three{
					margin-bottom: 36px;
					// p{
					// 	margin-right: 30px;
					// }
				}
				.tag-list{
					width: 80px;height: 30px;
					line-height: 30px;
					text-align: center;
					background: #e6e6e6;
					margin-right: 10px;
					margin-bottom: 14px;
					cursor: pointer;
				}
				.active{
					background: #fcdc6d;
				}
			}
		}
		.remark{
			width: 804px;
			height: 40px;
			border-radius: 4px;
			text-indent: 6px;
		}
		footer{
			width: 100%;
			padding-bottom: 15px;
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