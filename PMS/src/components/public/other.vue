<template>
	<div class="other">
		<div class="text">
			<header>
				<p class="fl">其他备汇</p>
				<span @click="beNone" class="fr">×</span>
			</header>
			<div class="context">
				<p style="width:100%;text-align:right;line-height:30px;">操作员：007</p>
				<nav class="roomNum">
					<p class="middle threefont">房间号</p>
					<span class="middle">：</span>
					<input class="middle" type="text" readonly="readonly">
				</nav>
				<nav style="margin-right: 48px;" class="roomNum middle">
					<p class="middle">住客姓名</p>
					<span class="middle">：</span>
					<input class="middle" type="text" readonly="readonly">
				</nav>
				<nav class="roomNum middle">
					<p class="middle threefont">手机号</p>
					<span class="middle">：</span>
					<input class="middle" type="text" readonly="readonly">
				</nav>
				<ul class="list">
					<li :class="{'deposit': depositClass == 1}" @click="noDeposit" class="middle">外借（<span>1</span>）</li>
					<li :class="{'deposit': depositClass == 2}" @click="beDeposit" class="middle">寄存（<span>1</span>）</li>
					<li :class="{'deposit': depositClass == 3}" @click="changeOther" class="middle">其他（<span>1</span>）</li>
				</ul>
				<div v-if="!other">
					<p v-show="isAddAgain" class="error">不能重复添加同样的物品</p>
					<div :key="index" v-for="(item, index) in modelLength" class="goodsname">
						<nav style="margin-right: 46px" class="middle">
							<p class="middle">{{deposit}}</p>
							<span class="middle">：</span>
							<el-select v-if="depositNum == '物品数量'" @change="getAndCheck(item)" v-model="item.goodsname" size="mini">
		            <el-option v-for="item in goodsList" :key="item.id" :label="item.name" :value="item.id">
	            	</el-option>
		          </el-select>
		          <input v-model="item.goodsname" class="goodsInput middle" v-else type="text">
						</nav>
						<nav class="middle">
							<p class="middle">{{depositNum}}</p>
							<span class="middle">：</span>
							<input v-model="item.goodsnum" class="goodsInput middle" type="number">
						</nav>
					</div>
					<section class="remarks">
						<div @click="setData" class="new">
							<p v-if="depositNum == '物品数量'" class="middle">新增外借</p>
							<p class="middle" v-else>新增寄存</p>
							<span class="middle">：</span>
							<nav class="middle">＋</nav>
						</div>
						<div>
							<p class="middle two">备注</p>
							<textarea class="middle" name="" id="" cols="30" rows="10"></textarea>
						</div>
					</section>
					<ul class="goodslist backcolor">
						<li class="one">物品名称</li>
						<li v-if="depositNum == '物品数量'" class="two">数量</li>
						<li class="three">起始时间</li>
						<li class="four">结束时间</li>
						<li class="five">操作</li>
					</ul>
					<ul class="goodslist">
						<li class="one">
							<span v-if="depositNum == '物品数量'">物品名称</span>
							<span v-else>凭证号</span>
						</li>
						<li v-if="depositNum == '物品数量'" class="two">数量</li>
						<li class="three">起始时间</li>
						<li class="four">{{endTime}}</li>
						<li class="five">
						<span :class="{'hasback': statu != '领取'}" @click="hasGetBack" class="beblock">{{statu}}</span>
						</li>
					</ul>
				</div>
				<div class="changeOther" v-else>
					<nav class="middletop">
						<p class="middletop">内容</p>
						<span class="middletop">：</span>
					</nav>
					<textarea class="middletop" name="" id="" cols="30" rows="10"></textarea>
				</div>
				<div @click="setPost" class="foot">确定</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name: 'other',
		data() {
			return {
				other: false,
				depositClass: 1,
				deposit: '物品名称',
				depositNum: '物品数量',
				isAddAgain: false,
				howMany: [],
				// howManyIndex: [],
				modelLength : [
					{
						goodsname: '',
						goodsnum: ''
					}
				],
				// setModel: [],
				// setModelNumber: [],
				checkedList: '',
				goodsList: [
					{
						name: "衣架",
						id: 1
					},
					{
						name: "充电宝",
						id: 2
					},
					{
						name: "数据线",
						id: 3
					}
				],
				statu: '领取',
				endTime: '结束时间'
			}
		},
		methods: {
			changeOther() {
				this.other = true;
				this.depositClass = 3
			},
			noDeposit() {
				this.deposit = '物品名称'
				this.depositNum = '物品数量'
				this.depositClass = 1
				this.other = false
			},
			beDeposit() {
				this.deposit = '寄存内容'
				this.depositNum = '凭证号'
				this.depositClass = 2
				this.other = false
			},
			hasGetBack() {
				this.statu = '已归还'
				this.endTime = new Date().getFullYear()
				// API.dele()
			},
			getAndCheck(e) {
				if(!this.howMany.includes(e.goodsname)) {
					this.howMany.push(e.goodsname)
					this.isAddAgain = false
				} else {
					let a = this.howMany.indexOf(e.goodsname)
					this.howMany
					e.goodsname = ''
					this.isAddAgain = true
				}
			},
			getGoodsList() {
				// this.setModel = ['', '']
				// this.setModelNumber = ['','']
				// res.data.length      //动态变量 能有多少个
			},
			getValue() {
				// console.log(e)
			},
			setData() {
				this.modelLength.push({
					goodsname: '',
					goodsnum: ''
				})
			},
			beNone() {
				this.$emit('getBeNone')
			},
			setPost() {
				// this.$emit('')
				this.beNone()
				// console.log(this.setModel[1])
				// console.log(this.setModelNumber[1])
			}
		},
		created() {
			this.getGoodsList()
		}
	}
</script>

<style lang="scss" scoped>
	.other{
		.changeOther{
			nav{
				width: 50px;
			}
			textarea{
				width: 90%;
				height: 60px;
				border: 1px solid #e6e6e6;
				border-radius: 4px;
			}
		}
		.error{
			width: 198px;
			margin: 0 auto;
			margin-bottom: 10px;
			color: red;
			font-size: 18px;
		}
		.middle{
			display: inline-block;
			vertical-align: middle;
		}
		.middletop{
			display: inline-block;
			vertical-align: top;
		}
		position: fixed;
		top: 0; left: 0; right: 0; bottom: 0;
		background: rgba(0,0,0,.4);
		z-index: 1000;
		.text{
			font-size: 14px;
			width: 630px;
			max-height: 600px;
			overflow-y: auto;
			position: absolute;
			top: 6%;
			left: 50%;
			margin-left: -315px;
			header{
				width: 100%;
				overflow: hidden;
				box-sizing: border-box;
				padding: 0 30px;
				line-height: 40px;
				background: #437ff9;
				color: #fff;
				span{
					font-size: 30px;
					cursor: pointer;
				}
			}
			.context{
				background: #fff;
				box-sizing: border-box;
				padding:30px;
				padding-top: 0;
				.roomNum{
					margin-bottom: 8px;
					margin-right: 0px;
					.threefont{
						width: 56px;
						text-align: right;
					}
					input{
						width: 172px;
						height: 28px;
						border: 1px solid #f2f2f2;
						border-radius: 4px;
						box-sizing: border-box;
						padding-left: 18px;
					}
				}
				.list{
					margin-top: 20px;
					box-sizing: border-box;
					padding: 20px 0;
					border-top: 1px solid  #e6e6e6;
					.deposit{
						background: #6a9df6;
						color: #fff;
					}
					li{
						width: 118px;
						line-height: 28px;
						text-align: center;
						border: 1px solid #6a9df6;
						border-radius: 4px;
						color: #6a9df6;
						margin-right: 20px;
					}
				}
				.goodsname{
					margin-bottom: 10px;
					.goodsInput{
						width: 168px;
						height: 28px;
						border: 1px solid #f2f2f2;
						border-radius: 4px;
						box-sizing: border-box;
						padding-left: 12px;
					}
				}
				.remarks{
					.new{
						color: #6a9df6;
					}
					.two{
						width: 76px;
					}
					textarea{
						border: 1px solid #f2f2f2;
						border-radius: 4px;
						height: 58px;
						width: 85%;
						margin-top: 12px;
					}
				}
				ul.backcolor{
					background: #f4f8ff;
					margin-top: 20px;
				}
				.goodslist{
					overflow: hidden;
					line-height: 40px;
					border-bottom: 1px solid #f2f2f2;
					li{
						span.hasback{
							background: #f2f2f2;
							color: #c2c2c2;
						}
						.beblock{
							display: inline-block;
							width: 100px;
							height: 100%;
							background: #6a9df6;
							color: #fff;
						}
						text-align: center;
						float: left;
					}
					.one{
						width: 98px;
					}
					.two{
						width: 57px;
					}
					.three{
						width: 150px;
					}
					.four{
						width: 150px;
					}
					.five{
						width: 95px; 
					}
					.istrue{
						border-radius: 4px;
						background: #437ff9;
						color: #fff;
					}
					.isfalse{
						background: #ccc;
					}
				}
				.foot{
					width: 100px;
					line-height: 40px;
					text-align: center;
					border-radius: 4px;
					background: #437ff9;
					color: #fff;
					margin: 0 auto;
					margin-top: 30px;
					cursor: pointer;
				}
			}
		}
	}
</style>