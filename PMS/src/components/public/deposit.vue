<template>
	<div class="deposit">
		<div class="box">
			<header class="head clearfix">
				<p class="fl">订金</p>
				<p @click="beNone" style="font-size: 30px;cursor:pointer;" class="fr">×</p>
			</header>
			<div class="contain">
				<p style="width: 100%; text-align:right;margin-top: 10px;margin-bottom: 20px;">
					<span>操作员：007</span>
				</p>
				<table style="border-color:#a9bfd6;" border="1">
					<tbody>
						<tr style="background: #4b5967; color: #fff;">
							<td style="width: 50px;">
								<div :style="{borderColor: 1>0?'#27a9e3':'#d9d9d9'}" style="width: 10px;height:10px;border:1px solid #d9d9d9;border-radius:1px;display: inline-block;">
									<nav :style="{background: 1>0?'#27a9e3':'#fff'}" style="width:6px;height:6px;background: cyan;margin-top:2px;margin-left:2px;"></nav>
								</div>
							</td>
							<td style="width: 158px;">订单号</td>
							<td style="width: 105px;">金额</td>
							<td style="width: 158px;">项目详情</td>
							<td style="width: 105px;">属性</td>
							<td style="width: 158px;">备注</td>
							<td style="width: 211px;">操作时间</td>
						</tr>
					</tbody>
				</table>
				<div class="tab" style="height: 94px; overflow-y:auto;">
					<table style="border-color:#a9bfd6;" border="1">
						<tbody>
							<tr>  <!--v-for="(item, index) in depositList" :key="index" -->
								<td style="width: 50px;">
									<div :style="{borderColor: 1>0?'#27a9e3':'#d9d9d9'}" style="width: 10px;height:10px;border:1px solid #d9d9d9;border-radius:1px;display: inline-block;">
										<nav :style="{background: 1>0?'#27a9e3':'#fff'}" style="width:6px;height:6px;background: #fff;margin-top:2px;margin-left:2px;"></nav>
									</div>
								</td>
								<td style="width: 158px;">订单号</td>
								<td style="width: 105px;">金额</td>
								<td style="width: 158px;">项目详情</td>
								<td style="width: 105px;">属性</td>
								<td style="width: 158px;">备注</td>
								<td colspan="1">操作时间</td>
							</tr>
							<tr>
								<td style="width: 50px;">
									<div :style="{borderColor: 1>2?'#27a9e3':'#d9d9d9'}" style="width: 10px;height:10px;border:1px solid #d9d9d9;border-radius:1px;display: inline-block;">
										<nav :style="{background: 1>2?'#27a9e3':'#fff'}" style="width:6px;height:6px;background: #fff;margin-top:2px;margin-left:2px;"></nav>
									</div>
								</td>
								<td style="width: 158px;">订单号</td>
								<td style="width: 105px;">金额</td>
								<td style="width: 158px;">项目详情</td>
								<td style="width: 105px;">属性</td>
								<td style="width: 158px;">备注</td>
								<td colspan="1">操作时间</td>
							</tr>
							<tr>
								<td style="width: 50px;">
									<div :style="{borderColor: 1>2?'#27a9e3':'#d9d9d9'}" style="width: 10px;height:10px;border:1px solid #d9d9d9;border-radius:1px;display: inline-block;">
										<nav :style="{background: 1>2?'#27a9e3':'#fff'}" style="width:6px;height:6px;background: #fff;margin-top:2px;margin-left:2px;"></nav>
									</div>
								</td>
								<td style="width: 158px;">订单号</td>
								<td style="width: 105px;">金额</td>
								<td style="width: 158px;">项目详情</td>
								<td style="width: 105px;">属性</td>
								<td style="width: 158px;">备注</td>
								<td colspan="1">操作时间</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="line"></div>
				<p class="list">
					<span @click="setReceivingDeposit" :class="{actived: receivingDeposit}" class="list-span middle">收订金</span>
					<span @click="setFlushing" :class="{actived: flushing}" class="list-span middle">冲调</span>
				</p>
				<div v-if="receivingDeposit">
					<ul class="payway">
						<li class="payway-li middle">
							<span>支付类型：</span>
						</li>
						<li v-for="(item, index) in payways" :key="index" class="payway-li middle">
							<div @click="setSelectedPayway(item)" style="cursor: pointer;">
								<p class="font-bor middle">
									<i style="font-size:22px;margin-left:-3px;font-weight:bold;color:#6a9df6;" class="iconfont" :class="{'icon-gou': selectedPayway.includes(item)}"></i>
								</p>
								<span class="middle">{{item.name}}</span>
							</div>
						</li>
					</ul>
					<div class="clearfix" style="width: 85%;">
						<div>
							<div class="fl">
								<span>金额：</span>
								<input style="width: 298px; height: 28px;border: 1px solid #e6e6e6;border-radius: 4px;text-indent:6px;" type="text"/>
								<span style="color: red;">*</span>
							</div>
							<nav class="fr">
								<span>凭单号：</span>
								<input style="width: 298px; height: 28px;border: 1px solid #e6e6e6;border-radius: 4px;text-indent:6px;" type="text"/>
							</nav>
						</div>
					</div>
					<div style="width: 85%;margin-top: 10px;display:flex;">
						<span>备注：&nbsp;</span>
						<textarea style="flex:1;height: 58px;border: 1px solid #e6e6e6;border-radius: 4px;text-indent:6px;"></textarea>
					</div>
					<div class="foot">
						<span>确定</span>
					</div>
				</div>
				<div v-if="flushing">
					<div style="width: 85%;display:flex;">
						<span>冲调原因：&nbsp;</span>
						<textarea style="flex:1;height: 118px;border: 1px solid #e6e6e6;border-radius: 4px;text-indent:6px;"></textarea>
					</div>
					<div class="foot">
						<span>确定</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import API from "@/store/API"
  export default {
		name: 'deposit',
		data() {
			return {
				selectedPayway: [],
				flushing: false,  //冲调
				receivingDeposit: false,  // 收定金
				payways: [],
				depositList: []
			}
		},
		methods: {
			setSelectedPayway(e) {
				if (this.selectedPayway.includes(e)) {
					let find = this.selectedPayway.indexOf(e)
					this.selectedPayway.splice(find,1)
				} else {
					this.selectedPayway.push(e)
				}
			},
			getPayWays() {
				API.get("/pms/common/paytype").then(res => {
					if (res.error_code == 0) {
						this.payways = res.data 
					} else {
						if (res.msg) {
							this.$message({
                message: `${res.msg}`,
                type: 'warning'
              })
						}
					}
				})
			},
			setFlushing() {
				this.receivingDeposit = false
				this.flushing = !this.flushing
			},
			setReceivingDeposit() {
				this.flushing = false
				this.receivingDeposit = !this.receivingDeposit
			},
			beNone() {
				this.$emit('depositNone')
			}
		},
		computed: {
      ...mapGetters({
        hotel:'currHotel',
        curUser: 'user'
      }),
    },
		created() {
			this.getPayWays()
			let ws = new WebSocket('/pms/message?id=1&status=0')
			ws.onopen = function(event){
				alert("已经与服务器建立了连接rn当前连接状态："+this.readyState)
			}
			ws.onmessage = function(event){
				alert("接收到服务器发送的数据：rn"+event.data)
			}
			ws.onclose = function(event){
				alert("已经与服务器断开连接rn当前连接状态："+this.readyState)
			}
			ws.onerror = function(event){
				alert("WebSocket异常！")
			}
			function SendData() {
				try{
					ws.send("beston");
				} catch(ex) {
				alert(ex.message);
				}
			}
			function seestate(){
			  alert(ws.readyState);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.deposit{
		position: fixed;
		top: 0;left: 0;right: 0;bottom: 0;
		background: rgba(0,0,0,.4);
		.box{
			width: 1013px;
			position: absolute;
			top: 34%;
			left: 22%;
			margin-top: -2px;
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
			padding: 0 30px 30px;
		}
		table{
      table-layout:fixed;
      word-break:break-all;
    }
    td{
      height: 30px;
      text-align: center;
      word-wrap: break-word;
    }
		.line{
			width: 100%;
			border-bottom: 1px solid #e6e6e6;
			margin: 10px 0;
		}
		.list{
			margin-bottom: 20px;
			.list-span{
				width: 88px;height: 28px;
				line-height: 28px;
				text-align: center;
				border: 1px solid #437ff9;
				border-radius: 4px;
				color: #437ff9;
				cursor: pointer;
			}
			.actived {
				background: #437ff9;
				color: #fff;
			}
		}
		.payway{
			// margin-bottom: 20px;
			.payway-li{
				padding-right: 26px;
				margin-bottom: 10px;
			}
			.font-bor{
				width: 16px;height: 16px;
				border: 1px solid #ccc;
				border-radius: 1px;
			}
		}
		.foot{
			width: 90px;height: 30px;
			line-height: 30px;
			text-align: center;
			cursor: pointer;
			border-radius: 4px;
			background: #437ff9;
			color: #fff;
			margin: 0 auto;
			margin-top: 30px;
		}
	}
</style>
