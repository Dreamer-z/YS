<template>     <!-- 消费清单 -->
	<div class="consumptionlist">
		<div class="box">			
			<header class="head clearfix">
				<p class="fl">查看更多住客</p>
				<p @click="guestNone" style="font-size: 30px;cursor:pointer;" class="fr">×</p>
			</header>
			<div class="contain">
				<div class="line"></div>
				<ul class="whypay clearfix">
					<li class="one">房间号</li>
					<li class="two">姓名</li>
					<li class="seven">性别</li>
					<li class="three">手机号</li>
					<li class="four">证件类型</li>
					<li class="five">证件号</li>
					<li class="six">会员卡号</li>
				</ul>
				<div style="height: 186px;overflow-y:auto;">
					<ul v-for="(item, index) in list" class="whypay clearfix">
						<li class="one">{{roomName}}</li>
						<li class="two">{{item.name}}</li>
						<li class="seven">{{item.sex == 0?'男':'女'}}</li>
						<li class="three">{{item.mobile}}</li>
						<li class="four">{{item.certificate_type}}</li>
						<li class="five">{{item.idcard}}</li>
						<li class="six">{{item.member_num?item.member_num:''}}</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import bus from "@/store/bus"
	export default{
		name: 'guest',
		props:['list','roomName'],
		data() {
			return {
				//roomName: this.list.room?this.list.room.room_type_name:''
			}
		},
		methods: {
			guestNone() {
				bus.ev.$emit('guestNone')
			}
		},
		mounted() {
			console.log(this.list)
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
				width: 109px;
			}
			.two{
				width: 105px;
			}
			.three{
				width: 130px;
			}
			.four{
				width: 122px;
			}
			.five{
				width: 220px;
			}
			.six{
				width: 151px;
				border-right: 1px solid #a9bfd6;
			}
			.seven{
				width: 90px;
			}
		}
	}
</style>