<template>
  <div class="new-hello">
    <div class="text">
      <h3>欢迎进入</h3>
      <p>云宿智慧酒店PMS管理系统</p>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'newHello',
    data() {
      return {

      }
    }
  }
</script>

<style lang="scss" scoped>
  .new-hello{
    width: 100%;
    height: 100%;
    display: flex;
    align-items:center;
    justify-content:center;
    .text{
      width: 500px;
      height: 300px;
      // background: #fff;
      h3{
        font-size: 60px;
        font-weight: bold;
        text-align: center;
        margin-bottom:30px;
      }
      p{
        font-size: 40px;
        font-weight: bold;
        text-align: center;
      }
    }
  }
</style>

