<template>
  <div id="app">
    <!-- <nav-header></nav-header>
    <left-menu></left-menu>
    <router-view class="app-main"/>
     -->
    <router-view class="applogin"></router-view>
  </div>
</template>

<script>

// import navHeader from './components/public/header';
// import leftMenu from './components/public/leftmenu';
export default {
  name: 'App'
  // components:{
  //   navHeader,
  //   leftMenu
  // }
}
</script>

<style lang="scss" scoped>
document,body{
  width: 100%;
  height: 100%;
}
</style>
