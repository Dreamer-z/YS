<template>
	<div class="dialog">
		<div>
			<h4>温馨提示</h4>
			<p>删除楼层后，与它相连的所有房间将同时删除，您确定此操作吗？</p>
			<footer>
				<section @click="givefalse">取消</section>
				<nav @click="givetrue">确定</nav>
			</footer>
		</div>
	</div>
</template>

<script>
	export default{
		name: 'deleFloor',
		data() {
			return {

			}
		},
		methods: {
			givetrue() {
				this.$emit('givetrue')
			},
			givefalse() {
				this.$emit('givefalse')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.dialog{
		position:fixed;
		top:0;left:0;right:0;bottom:0;
		background: rgba(0,0,0,.4);
		div{
			position: absolute;
			top: 30%;
			left: 45%;
			width: 300px;
			height: 180px;
			border-radius: 4px;
			background: #fff;
			box-sizing: border-box;
			padding: 5px 20px 20px 20px;
			h4{
				font-size: 14px;
				color: #91b4fc;
				line-height: 44px;
				text-align: center;
			}
			p{
				line-height: 24px;
			}
			footer{
				width: 224px;
				margin: 0 auto;
				margin-top: 28px;
				section,nav{
					display: inline-block;
					width: 88px;
					height: 28px;
					line-height: 28px;
					text-align: center;
					border:1px solid #437ff9;
					border-radius: 4px;
					vertical-align: middle;
					cursor: pointer;
				}
				section{
					color: #437ff9;
					line-height: 28px;
					margin-right:30px;
				}
				nav{
					color: #fff;
					background: #437ff9;
				}
			}
		}
	}
</style>