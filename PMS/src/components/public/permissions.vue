<template>
	<div class="permissions">
		<div class="text">
			<header class="clearfix">
				<p class="fl">权限管理</p>
				<p style="font-size: 30px;cursor:pointer;" class="fr">×</p>
			</header>
			<div class="contain">
				<div>
					<div class="tree">
						<el-tree :data="data2" show-checkbox node-key="id" :default-expanded-keys="[2, 3]" :default-checked-keys="[5]">
							<!-- :data="data3"
								 :props="defaultProps"
						  show-checkbox
						  node-key="id"
						  :default-expanded-keys="[2, 3]"
						  :default-checked-keys="[5]" -->
						</el-tree>
					</div>
				</div>
				<footer class="clearfix">
					<nav class="fl">取消</nav>
					<section class="fl">完成</section>
				</footer>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'permissions',
		data() {
			return {
				// data2: []
				data2: [
					{
	          id: 1,
	          label: '一级 2',
	          children: [
	            {
		            id: 3,
		            label: '二级 2-1',
		            children: [
			            {
			              id: 4,
			              label: '三级 3-1-1'
			            }, 
			            {
			              id: 5,
			              label: '三级 3-1-2',
			              disabled: true,
			              children: [
			              	{
			              		id: 6,
			              		label: 'siji 401'
			              	}
			              ]
			            }
		          	]
	          	}
	          ]
	        }
	        // {
	        //   id: 1,
	        //   label: '一级 2',
	        //   children: [
	        //     {
		       //      id: 3,
		       //      label: '二级 2-1',
		       //      children: [
			      //       {
			      //         id: 4,
			      //         label: '三级 3-1-1'
			      //       }, 
			      //       {
			      //         id: 5,
			      //         label: '三级 3-1-2',
			      //         disabled: true,
			      //         children: [
			      //         	{
			      //         		id: 6,
			      //         		label: 'siji 401'
			      //         	}
			      //         ]
			      //       }
		       //    	]
	        //   	}
	        //   ]
	        // },
	        // {
	        //   id: 1,
	        //   label: '一级 2',
	        //   children: [
	        //     {
		       //      id: 3,
		       //      label: '二级 2-1',
		       //      children: [
			      //       {
			      //         id: 4,
			      //         label: '三级 3-1-1'
			      //       }, 
			      //       {
			      //         id: 5,
			      //         label: '三级 3-1-2',
			      //         disabled: true,
			      //         children: [
			      //         	{
			      //         		id: 6,
			      //         		label: 'siji 401'
			      //         	}
			      //         ]
			      //       }
		       //    	]
	        //   	}
	        //   ]
	        // },
	        // {
	        //   id: 1,
	        //   label: '一级 2',
	        //   children: [
	        //     {
		       //      id: 3,
		       //      label: '二级 2-1',
		       //      children: [
			      //       {
			      //         id: 4,
			      //         label: '三级 3-1-1'
			      //       }, 
			      //       {
			      //         id: 5,
			      //         label: '三级 3-1-2',
			      //         disabled: true,
			      //         children: [
			      //         	{
			      //         		id: 6,
			      //         		label: 'siji 401'
			      //         	}
			      //         ]
			      //       }
		       //    	]
	        //   	}
	        //   ]
	        // },
	        // {
	        //   id: 1,
	        //   label: '一级 2',
	        //   children: [
	        //     {
		       //      id: 3,
		       //      label: '二级 2-1',
		       //      children: [
			      //       {
			      //         id: 4,
			      //         label: '三级 3-1-1'
			      //       }, 
			      //       {
			      //         id: 5,
			      //         label: '三级 3-1-2',
			      //         disabled: true,
			      //         children: [
			      //         	{
			      //         		id: 6,
			      //         		label: 'siji 401'
			      //         	}
			      //         ]
			      //       }
		       //    	]
	        //   	}
	        //   ]
	        // },
	        // {
	        //   id: 1,
	        //   label: '一级 2',
	        //   children: [
	        //     {
		       //      id: 3,
		       //      label: '二级 2-1',
		       //      children: [
			      //       {
			      //         id: 4,
			      //         label: '三级 3-1-1'
			      //       }, 
			      //       {
			      //         id: 5,
			      //         label: '三级 3-1-2',
			      //         disabled: true,
			      //         children: [
			      //         	{
			      //         		id: 6,
			      //         		label: 'siji 401'
			      //         	}
			      //         ]
			      //       }
		       //    	]
	        //   	}
	        //   ]
	        // },
	        // {
	        //   id: 1,
	        //   label: '一级 2',
	        //   children: [
	        //     {
		       //      id: 3,
		       //      label: '二级 2-1',
		       //      children: [
			      //       {
			      //         id: 4,
			      //         label: '三级 3-1-1'
			      //       }, 
			      //       {
			      //         id: 5,
			      //         label: '三级 3-1-2',
			      //         disabled: true,
			      //         children: [
			      //         	{
			      //         		id: 6,
			      //         		label: 'siji 401'
			      //         	}
			      //         ]
			      //       }
		       //    	]
	        //   	}
	        //   ]
	        // },
	        // {
	        //   id: 1,
	        //   label: '一级 2',
	        //   children: [
	        //     {
		       //      id: 3,
		       //      label: '二级 2-1',
		       //      children: [
			      //       {
			      //         id: 4,
			      //         label: '三级 3-1-1'
			      //       }, 
			      //       {
			      //         id: 5,
			      //         label: '三级 3-1-2',
			      //         disabled: true,
			      //         children: [
			      //         	{
			      //         		id: 6,
			      //         		label: 'siji 401'
			      //         	}
			      //         ]
			      //       }
		       //    	]
	        //   	}
	        //   ]
	        // },
	        // {
	        //   id: 1,
	        //   label: '一级 2',
	        //   children: [
	        //     {
		       //      id: 3,
		       //      label: '二级 2-1',
		       //      children: [
			      //       {
			      //         id: 4,
			      //         label: '三级 3-1-1'
			      //       }, 
			      //       {
			      //         id: 5,
			      //         label: '三级 3-1-2',
			      //         disabled: true,
			      //         children: [
			      //         	{
			      //         		id: 6,
			      //         		label: 'siji 401'
			      //         	}
			      //         ]
			      //       }
		       //    	]
	        //   	}
	        //   ]
	        // },
	        // {
	        //   id: 1,
	        //   label: '一级 2',
	        //   children: [
	        //     {
		       //      id: 3,
		       //      label: '二级 2-1',
		       //      children: [
			      //       {
			      //         id: 4,
			      //         label: '三级 3-1-1'
			      //       }, 
			      //       {
			      //         id: 5,
			      //         label: '三级 3-1-2',
			      //         disabled: true,
			      //         children: [
			      //         	{
			      //         		id: 6,
			      //         		label: 'siji 401'
			      //         	}
			      //         ]
			      //       }
		       //    	]
	        //   	}
	        //   ]
	        // }
				]
			}
		}
	}
</script>

<style lang="scss" scoped>
	.permissions{
		z-index: 100;
		position: fixed;
		top: 0;left: 0; right: 0; bottom: 0;
		background: rgba(0,0,0,.4);
		.text{
			position: absolute;
			width: 625px;
			max-height: 500px;
			overflow-y: auto;
			top: 15%;
			left: 33%;
		}
		header{
			width: 100%;
			height: 40px;
			background: #437ff9;
			box-sizing: border-box;
			padding: 0 30px;
			color: #fff;
			line-height: 40px;
		}
		.contain{
			padding: 26px 30px;
			background: #fff;
		}
		footer{
			width: 226px;
			margin: 0 auto;
			margin-top: 20px;
			nav,section{
				text-align: center;
				line-height: 38px;
				width: 98px;
				height: 38px;
				border-radius: 6px;
				border: 1px solid #437ff9;
			}
			nav{
				color: #437ff9;
				margin-right: 25px;
			}
			section{
				background: #437ff9;
				color: #fff;
			}
		}
	}
</style>