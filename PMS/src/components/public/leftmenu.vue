<template>
  <div class="leftmenu">
    <h3 class="title"></h3>
    <div class="scroll-bar">
      <el-row class="">
        <el-col :span="24">
          <el-menu style="text-align:center; border: none; font-size: 18px;" default-active="2" class="el-menu-vertical-demo" background-color="#292f45" text-color="#fff" active-text-color="#6a9df6" unique-opened>
            <el-submenu v-for="(item) in someArr" :key="item.id" :index="item.id+''" >
              <template slot="title">
                <span>{{item.name}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item v-for="(v) in item.children" :key="v.id" :index="v.id" >
                  <router-link tag="div" :to="v.url">{{v.name}}</router-link>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item v-for="(item) in oneArr" :key="item.id" :index="item.id+''" >
              <router-link slot="title" tag="div" :to="item.url">{{item.name}}</router-link>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import API from "@/store/API"
export default {
  name: 'leftMenu',
  data() {
    return {
      leftList: [],
      someArr: [],
      oneArr: []
    }
  },
  computed:{
    ...mapGetters({
      // 映射 `this.doneCount` 为 `store.getters.doneTodosCount`
      hotel:'currHotel',
      sleftList: 'leftList'
    })
  },
  beforeCreate() {
    // console.log('0007',this.sleftList)
    API.get("/pms/menu").then(res => {
      if (res.error_code == 0) {
        // this.$store.dispatch('setLeftList',res.data)
        this.leftList = res.data
        this.leftList.forEach((e,i) => {
          if (e.children) {
            this.someArr.push(e)
          } else {
            this.oneArr.push(e)
          }
        })
      }
    })
  },
  created() {
    console.log('0009',this.sleftList)
    // this.leftList.forEach((e,i) => {
    //   if (e.children) {
    //     this.someArr.push(e)
    //   } else {
    //     this.oneArr.push(e)
    //   }
    // })
  },
}
</script>

<style lang="scss" scoped>
.leftmenu {
  overflow-y: auto !important;
  .router-link-exact-active {
    color: #6a9df6;
  }
  position: fixed;
  width: 200px;
  overflow: hidden;
  min-height: 800px;
  height: 100%;
  background: #292f45;
  z-index: 91;
  h3 {
    font-weight: nomal;
    font-size: 20px;
    height: 50px;
    line-height: 100px;
    text-align: center;
    background: #1f262e;
    color: #fff;
  }
}

.el-menu-item,
.el-submenu__title {
  height: 45px;
  line-height: 45px;
}
</style>