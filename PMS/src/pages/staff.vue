<template>
	<div class="staff">
		<p class="head">
			<span style="color: #c5c5c5;" class="middle">当前位置</span>
			<span style="color: #c5c5c5;" class="middle">：</span>
			<span style="color: #6a9df6" class="middle">员工管理</span>
		</p>
		<div class="contain">
			<ul class="addlist">
				<li>新增</li>
				<li>停用</li>
				<li>删除</li>
				<li>保存</li>
			</ul>
			<!-- <p v-show="isFalse" style="font-size: 20px;color: red;text-align:center;">有必填项没有填写</p> -->
			<div class="line"></div>
			<ul class="listhead clearfix">
				<li class="one"></li>
				<li class="one"></li>
				<li class="one"></li>
				<li class="one"></li>
				<li class="one"></li>
				<li class="one"></li>
				<li class="one"></li>
				<li class="one"></li>
				<li class="one"></li>
				<li class="one"></li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'staff',
		data() {
			return {

			}
		},
		components: {
		}
	}
</script>

<style lang="scss" scoped>
	.staff{
		font-size: 14px;
		.middle{
			display: inline-block;
			vertical-align: middle;
		}
		.head{
			margin-top: 30px;
			margin-bottom: 20px;
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
		.line{
			width: 100%;
			border-bottom: 1px solid red;;
		}
		.listhead{
			width: 100%;
			li{
				float: left;
			}
		}
	}
</style>