<template>     <!-- 消费清单 -->
	<div class="consumptionlist">
		<div class="box">			
			<header class="head clearfix">
				<p class="fl">{{mes}}房间消费清单</p>
				<p @click="consumptionListNone" style="font-size: 30px;cursor:pointer;" class="fr">×</p>
			</header>
			<div class="contain">
				<div class="line"></div>
				<ul class="whypay clearfix">
					<li class="one">消费项</li>
					<li class="two">数量</li>
					<li class="three">类别</li>
					<li class="four">消费金额</li>
					<li class="five">录入时间</li>
					<li class="six">录入人</li>
				</ul>
				<div style="height: 186px;overflow-y:auto;">
					<ul v-for="item in listArr" class="whypay clearfix">
						<li class="one">{{item.goods_name}}</li>
						<li class="two">{{item.count}}</li>
						<li class="three">{{item.category}}</li>
						<li class="four">{{Number(item.price) * item.count}}</li>
						<li class="five">{{item.create_time}}</li>
						<li class="six">{{item.name}}</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import API from "@/store/API"
import bus from "@/store/bus"
	export default{
		name: 'consumptionList',
		props: ['mes','orderId'],
		data() {
			return {
				listArr: []
			}
		},
		computed: {
			// API.get("/pms/roomstatus/consume?id=3").then(res=>{   // id = newval

				// })
			// getList() {
			// 	// API.get("/pms/roomstatus/consume?id=3").then(res=>{   // id = newval

			// 	// })
			// 	console.log(this)
			// }
		},
		methods: {
			consumptionListNone() {
				bus.ev.$emit('consumptionListNone')
			},
			getList() {
				API.get("/pms/roomstatus/consume?id=" + this.orderId).then(res=>{   // id = this.orderId
					if(res.error_code == 0) {
						this.listArr = res.data
					}
				})
			}
		},
		mounted() {
			this.getList()
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
			top: 36%;
			left: 22%;
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
		.contain{
			width: 100%;
			box-sizing: border-box;
			padding: 20px 30px;
		}
		.whypay,.line{
			width: 936px;
			border-bottom: 1px solid #a9bfd6;
		}
		.whypay{
			li{
				float: left;
				border-left: 1px solid #a9bfd6;
				height: 30px;
				line-height: 30px;
				text-align: center;
			}
			.one{
				width: 149px;
			}
			.two{
				width: 135px;
			}
			.three{
				width: 142px;
			}
			.four{
				width: 152px;
			}
			.five{
				width: 200px;
			}
			.six{
				width: 151px;
				border-right: 1px solid #a9bfd6;
			}
		}
	}
</style>