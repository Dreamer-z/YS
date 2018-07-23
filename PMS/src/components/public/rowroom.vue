<template>
  <div class="row-room">
    <div class="text">
      <header class="clearfix">
        <p class="fl">排房</p>
        <p style="font-size: 30px;cursor:pointer;" class="fr">×</p>
      </header>
      <div class="container">
        <div class="type">
          <span>房型：</span>
          <span style="color: #437ff9;">12312</span>
        </div>
        <ul class="room-list">
          <li v-for="(item, index) in roomNumArr" class="bed middle">
            <div @click="checkRoomNum(index)" class="middle">
              <i class="middle" :class="{'cg-bor': nowIndex == index}"><em :class="{'cg-bj': nowIndex == index}"></em></i>
              <span class="middle">{{item.name}}</span>
            </div>
          </li>
        </ul>
        <footer>
          <nav class="middle">确定排房</nav>
          <section class="middle">取消</section>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'rowRoom',
    props:{
      list: {
        type: Array,
        default: []
      }

    },
    data() {
      return {
        nowIndex: -1,
        roomNumArr: this.props.list
      }
    },
    methods: {
      checkRoomNum(i) {
        this.nowIndex = i
      } 
    }
  }
</script>

<style lang="scss" scoped>
  .row-room{
    z-index: 666;
    position: fixed;
    top: 0;left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,.4);
    header{
      width: 100%;
      height: 40px;
      background: #437ff9;
      box-sizing: border-box;
      padding: 0 30px;
      color: #fff;
      line-height: 40px;
    }
    .type{
      margin-bottom: 10px;
    }
    .text{
      width: 600px;
      position: absolute;
      top: 100px;
      left: 50%;
      margin-left: -300px;
    }
    .room-list{
      border: 1px solid #ddd;
      box-sizing: border-box;
      padding: 10px 10px 0; 
    }
    .container{
      box-sizing: border-box;
      padding: 30px;
      background: #fff;
    }
    .bed{
      .cg-bor{
        border-color: #6a9df6;
      }
      .cg-bj{
        background: #6a9df6;
      }
      margin-right: 10px;
      margin-bottom: 10px;
      width: 85px;
      overflow: hidden;
      div{
        margin: 0 4px;
        box-sizing: border-box;
        display: inline-block;
        p{
          display: inline-block;
          vertical-align: middle;
        }
        i{
          width: 16px;
          height: 16px;
          display: inline-block;
          box-sizing: border-box;
          padding: 2px;
          border-radius: 50%;
          border: 1px solid #e2e2e2;
          text-align: center;
          line-height: 8px;
          em{
            width: 8px;
            height: 8px;
            background: #e2e2e2;
            border-radius: 50%;
            display: inline-block;
          }
        }
      }
    }
    footer{
      width: 230px;
      margin: 20px auto 0;
      nav,section{
        width: 98px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        border: 1px solid #437ff9;
        border-radius: 4px;
        cursor: pointer;
      }
      nav{
        background: #437ff9;
        color: #fff;
        margin-right: 20px;
      }
      section{
        color: #437ff9;
      }
    }
  }
</style>