<template>
  <div class="room-number">
    <div class="contain">
      <header>
        <p class="fl">排房</p>
        <span @click="beNone" class="fr">×</span>
      </header>
      <div class="text">
        <ul class="tab">
          <li @click="letSelect(item)" :class="{'select': selectedArr == item}" v-for="item in roomList" class="tab-li middle">
            <span>{{item.name}}</span>
          </li>
        </ul>
      </div>
      <footer @click="giveSelected">确定</footer>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'roomNumber',
    props: ['roomList','selected'],
    data() {
      return {
        selectedArr: ''
      }
    },
    watch: {
    },
    methods: {
      letSelect(e) {
        // console.log(this.selected)
        // return
        if(this.selected.includes(e.id)) {
          this.$message({
          message: '不能选择相同的房间',
          type: 'warn'
        })
        } else {
          this.selectedArr = e
        }
      },
      giveSelected() {
        this.$emit('giveNumSelected', this.selectedArr)
      },
      beNone() {
        this.$emit('roomNumberBeNone')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .room-number{
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,.4);
    font-size: 14px;
    z-index: 666;
    .contain{
      width: 1000px;
      max-height: 800px;
      overflow-y: auto;
      position: absolute;
      background: #fff;
      top: 8%;
      left: 22%;
      header{
        width: 100%;
        overflow: hidden;
        box-sizing: border-box;
        padding: 0 30px;
        line-height: 40px;
        background: #437ff9;
        color: #fff;
        span{
          font-size: 30px;
          cursor: pointer;
        }
      }
    }
    .text{
      width: 100%;
      box-sizing: border-box;
      padding: 30px;
      background: #fff;
    }
    .tab-li{
      box-sizing: border-box;
      padding: 5px 10px;
      border: 1px solid #ccc;
      margin-right: 10px;
      margin-bottom: 10px;
    }
    .select{
      background: #6a9df6;
      color: #fff;
    }
    footer{
      width: 110px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background: #6a9df6;
      color: #fff;
      margin: 0 auto;
      border-radius: 6px;
    }
  }
</style>