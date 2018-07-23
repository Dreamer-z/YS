<template>
  <div class="container-header">
    <div class="header-left">
      <div class="logo"><img src="@/assets/images/ys.png" alt=""></div>
      <div class="source-name">{{hotel.hotel_name}}管理系统</div>
      <router-link tag="div" to="/hotellist" class="change-hotel">[切换酒店]</router-link>
    </div>
    <div class="header-right">
      <div class="message">
        <router-link tag="div" to="/container/checkOutRequest" class="message-column">
          <p><img src="@/assets/images/check_out_request.png"></img>退房请求</p>
          <span class="message-column-number" v-show="checkOutRequest>0?true:false">{{checkOutRequest
            <100?checkOutRequest: '···'}}</span>
        </router-link>
        <router-link tag="div" to="/container/systemMessage" class="message-column">
          <p><img src="@/assets/images/sys_message.png"></img>消息</p>
          <span class="message-column-number" v-show="sysMessage>0?true:false">{{sysMessage
            <100?sysMessage: '···'}}</span>
        </router-link>
        <div class="message-column login-msg">您好，{{user.name}}</div>
      </div>
      <div class="line"></div>
      <router-link tag="div" to="/login" class="log-out">
        <el-button type="text">退出</el-button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      user: 'user',
      hotel: 'currHotel'
    })
  },
  data() {
    return {
      checkOutRequest: 0,
      sysMessage: 0
    }
  },
  methods: {
    ...mapActions(['initWebsocket']),
    websocketMesssageRecevier: function(data) {
      console.log('websocketMesssageRecevier----', data)
      var title = data.message.title
      var content = data.message.content
      var el = this.$createElement('p', { style: 'color: #000;padding:20px 0 10px 0'}, content)
      this.$notify({
        title: title,
        message: el
      })
      this.sysMessage++
    }
  },

  created: function() {
    var connectInfo = {}
    connectInfo.username = this.user.mobile
    connectInfo.hotelId = this.hotel.id
    if (this.user.roleId.length > 1) {
      const QIANTAI_ROLE_ID = 2 //前台默认角色ID
      connectInfo.roleId = QIANTAI_ROLE_ID
    } else {
      connectInfo.roleId = this.user.roleId[0]
    }
    connectInfo.uri = this.user.websocketUri
    connectInfo.callback = this.websocketMesssageRecevier
    console.log(connectInfo)
    // this.initWebsocket(connectInfo)
  }
  // props:{
  //     headData:Object
  // }
}
</script>

<style lang="scss">
.container-header {
  position: fixed;
  top: 0;
  z-index: 998;
  height: 50px;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(178, 178, 178, 0.2);
  color: #333;
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
  .header-left {
    display: flex;
    align-items: center;
    .logo {
      width: 39px;
      height: 39px;
      margin-left: 65px;
      margin-right: 10px;
      img {
        height: 100%;
        width: 100%;
      }
    }
    .source-name {
      font-size: 20px;
    }
    .change-hotel {
      color: #6a9df6;
      margin-left: 20px;
      cursor: pointer;
    }
  }
  .header-right {
    display: flex;
    align-items: center;
    margin-right: 31px;
    .message {
      display: flex;
      align-items: center;
      .message-column {
        margin-right: 36px;
        display: flex;
        align-items: center;
        cursor: pointer;
        & > :hover {
          text-decoration: underline;
          color: #6a9df6;
        }
        & > p {
          display: flex;
          align-items: center;
          img {
            width: 15px;
            height: 13px;
            margin-right: 5px;
          }
        }
        .message-column-number {
          display: block;
          width: 19px;
          height: 19px;
          border-radius: 50%;
          line-height: 19px;
          margin-left: 1px;
          text-align: center;
          background-color: #dc4233;
          color: #fff;
          font-size: 12px;
        }
      }
      .message-column:nth-of-type(3) {
        margin-right: 20px;
      }
      button {
        color: #333;
      }
    }
    .line {
      height: 11px;
      border-right: 1px solid #d9d9d9;
      margin-right: 20px;
    }
    .log-out:hover .el-button{
      color: #dc4233;
    }
  }
}
</style>
