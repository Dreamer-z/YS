<template>
	<div class="fangxing">
    <div class="two-btn">
		<!-- <section ><nav @click="addRoomType">新增</nav></section> -->
		  <el-button @click="addRoomType" size="small" type="primary">新增</el-button>
			<el-button @click="deleSome" size="small" type="danger">批量删除</el-button>
    	<!-- <section @click="deleSome">批量删除</section> -->
    </div>
    <div class="btn-table">
			<el-table
			  ref="multipleTable"
			  :row-style = "{height: '40px'}"
				:data="roomOption"
				@selection-change="handleSelectionChange"
				style="width: 100%">
				<el-table-column
					type="selection"
					width="55">
				</el-table-column>
				<el-table-column
					prop="code"
					label="房型代码"
					width="180">
				</el-table-column>
				<el-table-column
					prop="name"
					label="名称"
					width="200">
				</el-table-column>
				<el-table-column
					prop="price"
					label="门市价"
					width="160">
				</el-table-column>
				<el-table-column>
					<template slot="header" slot-scope="scope">操作</template>
					<template slot-scope="scope">
						<el-button
						  @click="routerJamp(scope.$index, scope.row)"
							size="mini">编辑</el-button>
						<el-button
							@click="deleOne(scope.$index, scope.row.id)"
							size="mini"
							type="danger">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
    	<!-- <ul>
    		<li @click="deleAll" class="four">
          <i :class="{'change-bder': maybeclass.length == roomOption.length}"><em :class="{'change-bj': maybeclass.length == roomOption.length}" class="em"></em></i>
        </li>
    		<li class="first">房型代码</li>
    		<li class="secton">名称</li>
    		<li class="secton">门市价</li>
    		<li class="third">操作</li>
    	</ul>
    	<ol>
    		<li v-for='(item, index) in roomOption' :key="index">
    			<div class="one">
    				<i :class="{'change-bder': maybeclass.includes(item)}" @click="mayBe(item)"><em :class="{'change-bj': maybeclass.includes(item)}"></em></i>
    			</div>
    			<div class="two">
    				<p>{{item.code}}</p>
    			</div>
					<div class="three">
						<p style="word-wrap:break-word;">{{item.name}}</p>
					</div>
					<div class="three">
						<p>{{item.price}}</p>
					</div>
					<div class="four">
						<nav @click="routerJamp(item)">编辑</nav>
						<section @click="deleOne(index,item.id)">删除</section>
					</div>
    		</li>
    	</ol> -->
    </div>
	</div>
</template>

<script>
import API from "@/store/API"
import { mapGetters } from 'vuex'
	export default {
		name: 'roomtypelist',
		data() {
			return {
				msg: '',
				maybeclass: [],
				roomOption: [
				]
			}
		},
		methods: {
			handleSelectionChange(val) {
				this.maybeclass = val;
				console.log(val)
      },
      deleAll() {
        let a = this.maybeclass.length
        let b = this.roomOption.length
        if (a == b) {
          this.maybeclass = []
        } else {
          this.maybeclass = []
          this.roomOption.forEach((e,i)=>{
            this.maybeclass.push(e)
          })
        }
      },
			getRoomfacily() {
				// API.get('/pms/roomtype?id=' + this.hotel_id).then(res => {
				// 	this.roomOption = res.data
				// })
				API.getRoomType(this.hotel.id).then(res => {
					if(res.error_code != 0){
						alert(res.msg)
						return 
					}
					this.roomOption = res.data
				})
			},
			addRoomType(){
				this.$router.push({
					path: '/layerContainer/addroomtype',
					query: { 
						mode:'add',
						hostId:this.hotel.id 
					}
        		})
			},
			routerJamp(i,val){
				this.$router.push({
					path: '/layerContainer/addroomtype',
					query: { 
						roomTypeId: val.id,
						mode:'edit' 
					}
        		})
			},
			deleOne(i, id) {
				// API.dele('/pms/roomtype/' + id).then(res =>{
				// 	if(!error_code){
				// 		this.roomOption.splice(i, 1)
				// 	}
				// })
				API.deleOneRoomtype(id).then(res => {
					if(res.error_code == 0) {
						this.roomOption.splice(i, 1)
					} else {
						if (res.msg) {
							this.$message.error(`${res.msg}`)
						}
					}
				})
			},
			mayBe(i) {
				if(this.maybeclass.includes(i)) {
					let a = this.maybeclass.indexOf(i)
					this.maybeclass.splice(a, 1)
					a = ''
				}else{
					this.maybeclass.push(i)
				}
			},
			deleSome() {
				let _this = this;
				this.maybeclass.forEach( function(element, index) {
					if(_this.roomOption.includes(element)){
						let a = _this.roomOption.indexOf(element)
						API.deleSomeRoomtype(element.id).then(res => {
							if(res.error_code == 0) {
								_this.roomOption.splice(a, 1)
							} else {
								if (res.msg) {
									_this.$message.error(`${res.msg}`)
								}
							}
						})
					}
				});
				//a = '';
				this.maybeclass = []
			}
		},
		computed:{
			...mapGetters({
				hotel:'currHotel'
			})
		},
		mounted() {
			this.getRoomfacily()
		}
	}
</script>

<style lang="scss" scoped>
	.fangxing{
		min-width: 1024px;
		min-height: 800px;
		overflow: hidden;
		padding:0 35px;
		.ys-breadcrumb{
      line-height: 64px;
    }
    .btn-table{
    	width: 900px;
    	// ul{
    	// 	width: 100%;
			// 	height: 40px;
    	// 	overflow: hidden;
    	// 	li{
    	// 		float: left;
    	// 		height: 40px;
    	// 		line-height: 40px;
    	// 		text-align: center;
    	// 		border-right: 1px solid #556778;
    	// 		background: #4b5967;
    	// 		color: #fff;
    	// 		box-sizing: border-box;
    	// 	}
    	// 	.first{
    	// 		width: 20%;
    	// 	}
    	// 	.secton{
    	// 		width: 20%;
    	// 	}
    	// 	.third{
    	// 		width: 35%;
    	// 		text-align: left;
    	// 		box-sizing: border-box;
    	// 		padding-left: 100px;
    	// 		border-right: none;
    	// 	}
    	// 	.four{
    	// 		width: 5%;
    	// 		border-right: none;
      //     .change-bder{
      //       border-color: #27a9e3;
      //     }
    	// 		i{
    	// 			display: inline-block;
    	// 			width: 10px;
    	// 			height: 10px;
    	// 			border: 1px solid #e2e2e2;
      //       .change-bj{
      //         background: #27a9e3;
      //       }
      //       .em{
      //         display: block;
      //         width: 6px;
      //         height: 6px;
      //         margin-top: 2px;
      //         margin-left: 2px;
      //       }
    	// 		}
    	// 	}
    	// }
    	// ol{
    	// 	width: 100%;
    	// 	li{
			// 		width: 100%;
			// 		height: 40px;
			// 		.li-bj{
			// 			background: #dce5ee;
			// 		}
			// 		div{
			// 			box-sizing: border-box;
			// 			float: left;
			// 			line-height: 40px;
			// 			text-align: center;
			// 		}
			// 		.one{
			// 			height: 40px;
			// 			width: 5%;
			// 			.bj{
			// 					background: #27a9e3;
			// 				}
			// 			.b-c{
			// 				border-color: #27a9e3;
			// 			}
			// 			.change-bder{
			// 				border-color: #27a9e3;
			// 			}
			// 			i{
			// 				display: inline-block;
			// 				box-sizing: border-box;
			// 				width: 12px;
			// 				height: 12px;
			// 				border: 1px solid rgba(0,0,0,.5);
			// 				padding: 2px;
			// 				.change-bj{
			// 					background: #27a9e3;
			// 				}
			// 				em{
			// 					display: block;
			// 					width: 6px;
			// 					height: 6px;
			// 				}
			// 			}
			// 		}
			// 		.two,.three{
			// 			width: 20%;
			// 		}
			// 		.four{
			// 			width: 35%;
			// 			box-sizing: border-box;
			// 			text-align: left;
			// 			padding-left: 12px;
			// 			line-height: 40px;
			// 			nav,section{
			// 				display: inline-block;
			// 				width: 100px;
			// 				height: 40px;
			// 				text-align: center;
			// 				cursor: pointer;
			// 			}
			// 			nav{
			// 				color: #81a8f4;
			// 			}
			// 			section{
			// 			color: #e8a099;
			// 		}
			// 		}
    	// 	}
    	// }
    }
    .two-btn{
    	margin: 10px 0;
    	nav,section{
    		width: 80px;
    		height: 40px;
    		line-height: 40px;
    		text-align: center;
    		border-radius: 3px;
    		display: inline-block;
    		cursor: pointer;
    	}
    	section{
    		background: #fff;
    		color: #e8857c;
    	}
    	nav{
    		margin-right: 10px;
    		background: #6a9df6;
    		color: #fff;
    	}
    }
	}
</style>