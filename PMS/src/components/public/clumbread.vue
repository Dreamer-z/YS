<template>
	<div class="bread">
	  <nav style="margin-top: 16px;">
     <span class="middle">{{data[0]}}：</span>
     <span class="middle" v-for="(item, index) in data" v-if="index >= 1 ">
       <span class="middle" :style="{color: index ==(data.length - 1)? '#6a9df6' : ''}">{{item}}</span>
       <span style="margin: 0 8px;" :style="{display: index ==(data.length - 1)? 'none' : ''}" class="middle">></span>
     </span> 
    </nav>
    <p v-if="redStar" class="Page-introduction">（带
      <span style="color: red;">*</span>
      的为必填项目）
    </p>
	</div>
</template>

<script>
export default{
	name: 'clumBread',
  props:　{
    data: {
      type: Array,
      default: ['首页']
    },
    redStar: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
  .bread{
    .middle{
      display: inline-block;
      vertical-align: top;
    }
    line-height: 34px;
  }
</style>