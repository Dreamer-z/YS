<template>
	<div class="containtext">
		<common-header></common-header>
		<!-- <nav-header></nav-header> -->
		<left-menu v-if="isShow"></left-menu>
		<router-view ref="view" :class="{'change-padding': !isShow}" class="app-main"/>
	</div>
</template>

<script>
//容器类
// import navHeader from '@/components/public/header';
import CommonHeader from '@/components/public/commonHeader';
import leftMenu from '@/components/public/leftmenu';
	export default {
		name: 'container',
		data() {
			return {
				isShow: true
			}
		},
		components: {
			// navHeader,
			leftMenu,
			CommonHeader
		},
		created() {
			if(this.$router.history.current.name == "addHotel") {
				this.isShow = false
			}
		}
	}
</script>

<style lang="scss" scoped>
.containtext{
	min-width: 1024px;
	.app-main{
    padding-left: 250px;
    padding-top: 50px;
    padding-right: 50px;
    background: #f2f2f2;
    overflow: hidden;
  }
  .change-padding{
  	padding-left: 50px;
  }
}
// #app {
//   // min-width: 1024px;
//   .app-main{
//     padding-left: 250px;
//     padding-top: 40px;
//     padding-right: 50px;
//     background: #f2f2f2;
//     overflow: hidden;
//   }
// }
</style>