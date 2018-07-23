<template>
	<div class="containtext">
		<common-header></common-header>
		<!-- <nav-header></nav-header> -->
		<left-menu></left-menu>
		<router-view class="app-main"/>


		<!-- <keep-alive>
        <router-view class="app-main" v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view class="app-main" v-if="!$route.meta.keepAlive"></router-view> -->
	</div>
</template>

<script>
// import navHeader from '@/components/public/header';
import CommonHeader from '@/components/public/commonHeader';
import leftMenu from '@/components/public/leftmenu';
	export default {
		name: 'containerwhite',
		data() {
			return {
			}
		},
		components: {
			// navHeader,
			leftMenu,
			CommonHeader
		}
	}
</script>

<style lang="scss" scoped>
.containtext{
	min-width: 1024px;
	.app-main{
  }
}
</style>