<template>
  <div class="ys-header">
    <ul class="left">
      <li>
        <p>消息</p>
        <div>
          9
        </div>
      </li>
    </ul>
    <ul class="right">
      <li>
        <p>您好xxx，欢迎您回来</p>
      </li>
      <li class="logout">
        【退出登录】
      </li>
    </ul>
  </div>
</template>


<script>
  export default {
  name: 'navHeader',
    data () {
      return {
      }
    }
  }
</script>

<style lang="scss" scoped>
  .ys-header{
  	z-index: 90;
    position: fixed;
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    min-width: 1024px;
    width: 100%;
    border: 1px solid #fff;
    background: #fff;
    box-sizing: border-box;
    padding-left: 250px;
    padding-right: 50px;
    overflow: hidden;
    .left{
      float: left;
      p{
        display: inline-block;
        font-size: 14px;
      }
      div{
        display:inline-block;
        width: 18px;
        height: 18px;
        line-height: 18px;
        text-align: center;
        padding: 2px;
        border-radius: 50%;
        background: red;
        margin-left: 8px;
        color: #fff;
      }
    }
    .right{
      float: right;line-height: 40px;
      li{
        display: inline-block;
      }
      .logout{
          margin-left: 32px;
          color: red;
          cursor: pointer;
        }
    }
  }
</style>