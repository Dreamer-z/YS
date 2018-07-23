<template>
  <el-breadcrumb class="bread-crumb-container" separator-class="el-icon-arrow-right">
    <span class="bread-crumb-remind">当前位置：</span>
    <el-breadcrumb-item class="bread-crumb-item" v-for="(item,index) in urlarr" :key="index" :to="{ path: item.url }">{{item.name}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  props: {
    childMsg: Array
  },
  data() {
    return {
      urlarr: this.childMsg
    }
  },
  methods: {}
}
</script>

<style lang="scss">
.bread-crumb-container {
  padding-bottom: 18px;
  padding-top: 24px;
  color: #b3b3b3;
}
.bread-crumb-remind {
  float: left;
}
</style>
