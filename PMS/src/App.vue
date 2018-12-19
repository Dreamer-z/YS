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
import { route } from "@/assets/js/menu.js";
import { mapActions } from 'vuex';
export default {
  name: 'App',
  data () {
    return {
      route:{
        path:null,
        nowRoute:["未配置","未配置"]
      }
    }
  },
  created() {
    this.route = route;
  },
  watch: {
    $route: "pathChange"
  },
  methods: {
    ...mapActions(['setRoute',"setTopMenuId","setLeftMenuId"]),
    pathChange() {
      var route = {};
      let path = this.$route.path
        .split("/")
        .filter(function(val, index, arr) {
          return val != "" && val != "layerContainer";
        })
        .join();
      route.path = path;
      if(path == "systemMessage" || path == "checkOutRequest"){
        this.setTopMenuId(null);
        this.setLeftMenuId(null);
      }
      for (let key in this.route) {
        if (key == path) {
          route.nowRoute = this.route[key];
          this.setRoute(route);
        };
      }
      this.setRoute(route);
    }
  }
}
</script>
<style lang="scss" scoped>
document,body{
  width: 100%;
  height: 100%;
  color: #333;
}
</style>
