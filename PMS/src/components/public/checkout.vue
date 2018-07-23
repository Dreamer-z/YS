<template>
	<div class="checkout">
		<div class="text">
			<header class="head clearfix">
				<p class="fl">客房详情</p>
				<p @click="checkoutNone" style="font-size: 30px;cursor:pointer;" class="fr">×</p>
			</header>
			<div class="caontain">
				<p class="worker">操作员：<span>007</span></p>
				<div class="receivable">
					<p class="middle">应收金额</p>
					<span class="middle">：</span>
					<input style="text-indent: 8px;" v-model="mes.toFixed(2)" class="middle" type="text" readonly>
				</div>
				<div class="receivable">
					<p class="middle">实收金额</p>
					<span class="middle">：</span>
					<input @blur="checkMoney(money)" v-model="money" style="text-indent: 8px;" class="middle" type="text">
				</div>
				<div class="receivable">
					<p class="middle">结算类型</p>
					<span class="middle">：</span>
					<el-select size="mini" v-model="paywayId" placeholder="请选择结算类型">
            <el-option v-for="item in paywayListArr" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
				</div>
				<!-- <div class="receivable">
					<p class="middle">付款人</p>
					<span style="margin-right: 14px;" class="middle">：</span>
					<el-select size="mini" v-model="value2" placeholder="请选择房间类型">
            <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
				</div> -->
				<div class="receivable">
					<p class="middle">还需支付</p>
					<span class="middle">：</span>
					<ul class="middle smallchange">
						<li class="middle">{{neededMoney.toFixed(2)}}</li>
						<!-- <li class="middle">
							<div class="middle"></div>
							<p class="middle">进行抹零</p>
						</li>
						<li class="middle">
							<div class="middle"></div>
							<p class="middle">继续结算</p>
						</li> -->
					</ul>
				</div>
				<footer>
				<ol class="payway">
					<li v-show="mes > 0">扫码(F8)</li>
					<li @click="givePut">确定(Enter)</li>
					<li @click="checkoutNone">取消(Esc)</li>
				</ol>
			</footer>
			</div>
		</div>
	</div>
</template>

<script>
import API from "@/store/API"
import bus from "@/store/bus"
	export default{
		name: 'checkOut',
		props: ['mes','orderId','memberId'],
		data() {
			return {
				paywayListArr: [],
				paywayId: '',
				money: ''
			}
		},
		computed: {
			neededMoney() {
				return Number(this.mes) - this.money
			}
		},
		methods: {
			checkMoney(e) {
				if(e.length) {
					// if(Number(e) <= 0) {
					// 	this.money = ''
					// } else {
						if(e.indexOf('.') != -1) {
							let str0 = Number(e.split('.')[0])
							let str1 = e.split('.')[1]
							str1 = str1.substring(0,2)
							this.money = [str0, str1].join('.')
						} else {
							this.money = Number(e)
						}
				// 	}
				// } else {
				// 	this.money = ''
				}
			},
			givePut() {
				let obj = {
					order_id: this.orderId,
					member_id: this.memberId,
					pay_way: this.paywayId,
					pay_amount: Number(this.money)
				}
				if (obj.pay_way == '') {
					this.$alert('没有支付方式', '', {
	          confirmButtonText: '确定'
	        })
	        return
				}
				API.put("/pms/roomstatus/end", obj).then(res=>{
					// console.log(res)
					if(res.error_code == 0) {
						this.$alert('操作成功', '', {
		          confirmButtonText: '确定',
		          callback: ()=>{
		          	bus.ev.$emit('checkoutNone',this.mes)
		          }
		        })
					}
				})
			},
			checkoutNone() {
				bus.ev.$emit('checkoutNone')
			},
			getPayway() {
				API.getPayway().then(res=>{
					this.paywayListArr = res
				})
			}
		},
		mounted() {
			this.getPayway()
		}
	}
</script>

<style lang="scss" scoped>
	.checkout{
		position: fixed;
		top: 0;left: 0;right: 0;bottom: 0;
		background: rgba(0,0,0,.4);
		.middle{
			display: inline-block;
			vertical-align: middle;
		}
		.text{
			width: 626px;
			position: absolute;
			top: 30%;
			left: 30%;
			background: #fff;
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
		.worker{
			text-align: right;
			line-height: 34px;
		}
		.caontain{
			box-sizing: border-box;
			padding: 0 30px 30px 30px;
		}
		.receivable{
			margin-bottom: 10px;			
			input{
				width: 176px;
				height: 28px;
				border: 1px solid #e6e6e6;
				border-radius: 4px;
			}
		}
		.smallchange{
			li{
				margin-right: 36px;
				div{
					width: 16px;
					height: 16px;
					border-radius: 2px;
					border: 1px solid #ccc;
				}
			}
		}
		footer{
			margin-top: 30px;
			.payway{
				width: 410px;
				margin: 0 auto;
				li{
					width: 120px;
					height: 40px;
					line-height: 40px;
					text-align: center;
					border-radius: 6px;
					color: #fff;
					background: #437ff9;
					margin-right: 13px;
					display: inline-block;
					cursor: pointer;
				}
			}
		}
	}
</style>