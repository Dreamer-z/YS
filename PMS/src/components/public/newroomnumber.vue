<template>
  <div class="new-room-number">
    <div class="contain">
      <header class="clearfix">
        <p class="fl">手动排房</p>
				<span @click="newRoomNumberNone" class="fr spa">×</span>
      </header>
      <div class="text">
        <p style="width: 100%;textAlign: right;marginTop: 18px;"><span style="marginRight: 58px;">操作员：{{curUser.name}}</span></p>
        <div v-for="item in 2">
          <p class="floor-name">
            <span>1lou</span>
          </p>
          <ul class="room-list clearfix">
            <li @click="isChecked = item" :class="{'checked': isChecked == item}" v-for="item in 20" class="list-li fl">
              <span>00{{item}}</span>
            </li>
          </ul>
        </div>
      </div>
      <footer>
        <div style="width: 220px;margin:0 auto;" class="clearfix">
          <p @click="newRoomNumberNone" class="fl">关闭</p>
          <p class="fr" style="color:#fff;background: #437ff9;">提交</p>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import API from "@/store/API"
  export default {
    name: 'newRoomNumber',
    data() {
      return {
        isChecked: ''
      }
    },
    methods: {
      newRoomNumberNone() {
        this.$emit('letNewRoomNumberNone')
      }
    },
    computed: {
			...mapGetters({
        hotel:'currHotel',
        curUser: 'user'
      })
		},
  }
</script>

<style lang="scss" scoped>
  .new-room-number{
    position: fixed;
		top: 0; left: 0; right: 0; bottom: 0;
		background: rgba(0,0,0,.4);
		font-size: 14px;
		z-index: 999;
    display: flex;
    align-items:center;
    justify-content: center;
    header{
      width: 100%;
      overflow: hidden;
      box-sizing: border-box;
      padding: 0 30px;
      line-height: 40px;
      background: #437ff9;
      color: #fff;
      .spa{
        font-size: 30px;
        cursor: pointer;
      }
    }
    .contain{
      width: 1000px;
      background: #fff;
      height: 60%;
    }
    .text{
      height: 84%;
      overflow-y: auto;
      box-sizing: border-box;
      // padding-bottom: 30px;
    }
    .floor-name{
      span{
        display: inline-block;
        width: 60px;height: 35px;
        line-height: 35px;
        text-align: center;
        background: #437ff9;
        color: #fff;
      }
    }
    .room-list{
      width: 986px;
      box-sizing: border-box;
      padding: 12px 0 16px 60px;
      .list-li{
        width: 98px;
        height: 33px;
        line-height: 33px;
        text-align: center;
        border: 1px solid #cccccc;
        border-radius: 6px;
        margin-right: 15px;
        margin-bottom: 10px;
      }
      .checked{
        border-color: #437ff9;
        background: #437ff9;
        color: #fff;
      }
    }
    footer{
      padding: 10px 0;
      // line-height: 55px;
      position:   relative;
      background: #fff;
      border-top: 6px solid #f6f6f6;
      p{
        width: 98px;
        height: 33px;
        line-height: 33px;
        text-align: center;
        border: 1px solid #437ff9;
        border-radius: 4px;
        cursor: pointer;
      }
    }
  }
</style>

