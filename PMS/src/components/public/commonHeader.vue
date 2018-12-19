<template>
  <div class="layer-container-header">
    <div class="header-left">
      <div class="company-logo">
        <img src="@/assets/images/logo.png" alt="logo">
        <div class="source-name">飞鸟云宿</div>
      </div>
      <div class="header-left-menu">
        <div class="item" :class="[topMenuId == val.id?'active':'']" v-for="(val,index) in headMenu" :key="index" @click="chooseMenu(val.id)">{{val.name}}</div>
      </div>
    </div>
    <div class="header-right">
      <div class="message">
        <!-- <div class="logo"><img src="@/assets/images/ys.png" alt=""></div> -->
        <div class="source-name">{{hotelName}}</div>
        <router-link tag="div" to="/hotellist" class="change-hotel">[切换酒店]</router-link>
        <div class="line"></div>
        <router-link tag="div" to="/layerContainer/checkOutRequest" class="message-column">
          <p><img src="@/assets/images/check_out_request.png"></img>退房请求</p>
          <span class="message-column-number" v-show="checkOutRequest>0?true:false">{{checkOutRequest
            <100?checkOutRequest: '···'}}</span>
        </router-link>
        <router-link tag="div" to="/layerContainer/systemMessage" class="message-column">
          <p><img src="@/assets/images/sys_message.png"></img>消息</p>
          <span class="message-column-number" v-show="sysMessage>0?true:false">{{sysMessage
            <100?sysMessage: '···'}}</span>
        </router-link>
        <div @mouseleave="iconDown = false" @mouseenter="iconDown = true" class=" login-msg">您好，{{user.name}}
          <div class="box" @click="logOut">
            <p @click="isPassWordShow = true" class="list-p"><i class="el-icon-iconName el-icon-bell"></i>修改密码</p>
            <router-link tag="p" to="/login" class="list-p"><i class="el-icon-iconName el-icon-error"></i>退出</router-link>
          </div>
        </div>
      </div>
      <div v-show="!iconDown" class="el-icon-caret-right"></div>
      <div v-show="iconDown" class="el-icon-caret-bottom"></div>
    </div>
    <changePassWord @passWordNone="letPassWordNone" v-if="isPassWordShow"></changePassWord>
  </div>
</template>

<script>
import changePassWord from "@/components/public/changepassword" 
import { mapGetters, mapActions } from 'vuex'
import Bus from '@/store/bus'

import API from '@/store/API/index'
export default {
  computed: {
    ...mapGetters({
      user: 'user',
      hotel: 'currHotel',
      checkOutRequest:"checkOutRequest",
      sysMessage:"sysMessage",
      topMenuId:"topMenuId",
      leftMenuId:"leftMenuId"
    })
  },
  data() {
    return {
      isPassWordShow: false,
      iconDown:false,
      hotelName :'云宿',
      headMenu:["菜单一","菜单二","菜单三","菜单四"]
    }
  },
  components: {
    changePassWord
  },
  methods: {  
    ...mapActions(['initWebsocket',"setSysMsg","setCheckOutReq","setTopMenuId","setLeftMenuId"]), 
    logOut(){
      this.setTopMenuId(null);
      this.setLeftMenuId(null);
      this.$emit("getLeftMenu",null,null);
    },
    getMenu() {
      let _this = this;
      let menu = null,index = null;
      API.get("/pms/menu").then(res => {
        if (res.error_code == 0) {
          let data = res.data;
          data.forEach((e, i) => {
            e.active = false;
            if(_this.topMenuId && e.id == _this.topMenuId){
              _this.setTopMenuId(e.id);
              menu = e;
            };
            if(e.children){
              e.children.forEach((a, j) => {
                a.active = false;
                if(_this.leftMenuId && a.id == _this.leftMenuId){
                  a.active = true;
                };
                if(a.children){
                  a.children.forEach((s, k) => {
                    s.active = false;
                    if(_this.leftMenuId && s.id == _this.leftMenuId){
                      s.active = true;
                    };
                  });
                }
              });
            };
          });
          for (let i = 0; i < data.length; i++) {
            if(data[i].children){
              for (let j = 0; j < data[i].children.length; j++) {
                if(_this.leftMenuId && data[i].children[j].id == _this.leftMenuId){
                  index = j;
                };
                if(data[i].children[j].children){
                  for (let s = 0; s < data[i].children[j].children.length; s++) {
                    if(_this.leftMenuId && data[i].children[j].children[s].id == _this.leftMenuId){
                      index = j;
                    };
                  }
                }            
              }
            }
          }
          console.log(menu,index);
          if(menu && (index||index=='0')){
            _this.$emit("getLeftMenu",menu,index);
          };
          _this.headMenu = data;
        }
      });
    },
    init(){
      this.headMenu.forEach((e, i) => {
        e.active = false;
        if(e.children){
          e.children.forEach((a, j) => {
            a.active = false;
            if(a.children){
              a.children.forEach((s, k) => {
                s.active = false;
              });
            }
          });
        }
      });
    },
    chooseMenu(id){
      this.init();
      this.setTopMenuId(id);
      let menu = null,index = null;
      this.headMenu.forEach((e,i)=>{
        if(e.id == id){
          menu = e;
        };
      });
      if(menu.children[0].children){
        menu.children[0].children[0].active = true;
        this.setLeftMenuId(menu.children[0].children[0].id);
        this.$router.push({
          path:menu.children[0].children[0].url
        })
      }else{
        menu.children[0].active = true;
        this.$router.push({
          path:menu.children[0].url
        })
      };
      this.$emit("getLeftMenu",menu,0);
    },
    letPassWordNone() {
      this.isPassWordShow = false
    },
    websocketMesssageRecevier: function(data) {
      let json = JSON.parse(data)
      console.log('websocketMesssageRecevier----', json)
      var title = json.message.data.title
      var content = json.message.data.content
      var el = this.$createElement(
        'p',
        { style: 'color: #000;padding:20px 0 10px 0' },
        content
      )
      let _this = this;
      this.$notify({
        title: title,
        message: el,
        position: 'bottom-right',
        onClick:function () {
          if(json.message.type == 'needCheck' || json.message.type == 'startCheck' || json.message.type == 'endCheck'){
            _this.$router.push({
              path:'checkOutRequest',
              name:'checkOutRequest',
              params:{
                type:json.message.type
              }
            })
          }else{
            _this.$router.push({
              path:'systemMessage',
              name:'systemMessage',
              params:{
                id:json.message.data.id
              }
            })
          }
        }
      })
      if(json.message.type == 'needCheck' || json.message.type == 'startCheck' || json.message.type == 'endCheck'){
        let q = _this.checkOutRequest;
        _this.setCheckOutReq(++q);
      }else{
        let s = _this.sysMessage
        
        _this.setSysMsg(++s);
      }
      Bus.ev.$emit("headerMsgSys",json.message.data.id)
      Bus.ev.$emit("headerMsgReq",json.message.type)
    },
        // 未读消息
    noReadMessage() {
      let _this = this
      API.noReadMessage({
        id: this.hotel.id,
        page: 1,
        num: 10,
        status: 0
      })
        .then(function(res) {
        _this.setSysMsg(res.data.total_count);
        })
        .catch(function(err) {
          console.log(err)
          _this.$message({
            type: 'warning',
            message: '请求未读消息列表失败'
          })
        })
    },
  },
  created: function() {
    this.getMenu();
    //thishotel
    var connectInfo = {}
    console.log(this.hotel)
    if(this.hotel != null &&  this.hotel.id != null){
      console.log(1111)
      connectInfo.username = this.user.mobile
      connectInfo.hotelId = this.hotel.id
      this.hotelName = this.hotel.hotel_name
      if (this.user.roleId.length > 1) {
        const QIANTAI_ROLE_ID = 2 //前台默认角色ID
        connectInfo.roleId = QIANTAI_ROLE_ID
      } else {
        connectInfo.roleId = this.user.roleId[0]
      }
      connectInfo.uri = this.user.websocketUri
      // connectInfo.uri = 'http://192.168.10.199:8877';
      connectInfo.callback = this.websocketMesssageRecevier
      // console.log(connectInfo)
       this.initWebsocket(connectInfo);
       this.noReadMessage();
    }
    else{
     // this.hotel = {}
     // this.hotel.hotel_name = '云宿'
    }
  }
  // props:{
  //     headData:Object
  // }
}
</script>

<style lang="scss">
.layer-container-header {
  position: relative;
  // top: 0;
  z-index: 998;
  height: 50px;
  width: 100%;
  font-size: 14px;
  background-color: #192138;
  color: #fff;
  box-shadow: 0 0 10px rgba(178, 178, 178, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
  .login-msg{
    height: 50px;
    line-height: 50px;
    cursor: pointer;
    &:hover .box{
      display: block;
    }
    &:hover .list-p{
      text-decoration: none;
    }
  }
  .box{
    display: none;
    position: absolute;
    top: 100%;
    right: 32px;
  }
  .list-p{
    box-sizing: border-box;
    width: 150px;
    height: 50px;
    line-height: 50px;
    padding: 0 20px;
    cursor: pointer;
    background: #192138;
    color:#fff;
    i{
      font-size: 16px;
      margin-right: 20px;
    }
    &:hover{
      background: #383f5a;
    }
  }
  .header-left {
    height: 100%; 
    display: flex;
    align-items: center;   
    .company-logo{
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50px;
      width: 150px;
      padding: 0 10px;
      font-size: 16px;
      img{
        width: 36px;
        height: 36px;
        margin-right: 8px;
      }
    }
    .header-left-menu{
      height: 100%;
      line-height: 50px;
      text-align: center;
      display: flex;
      align-items: center;
      .item{
        box-sizing: border-box;
        height: 100%;
        padding: 0 15px;
        &.active{
          background-color: #677bde;
        }
        &:hover{
          background-color: #677bde;
          cursor: pointer;
        }
      }
    }
  }
  .header-right {
    display: flex;
    align-items: center;
    margin-right: 35px;
    // .logo {
    //   width: 39px;
    //   height: 39px;
    //   margin-left: 65px;
    //   margin-right: 10px;
    //   img {
    //     height: 100%;
    //     width: 100%;
    //   }
    // }
    // .source-name {

    // }
    .change-hotel {
      margin-left: 20px;
      color: rgb(127, 126, 131);
      cursor: pointer;
      &:hover {
        color: #6a9df6;
      }
    }
    .line{
      height: 14px;
      width: 1px;
      background-color: #fff;
      margin: 0 30px;
    }
    .message {
      display: flex;
      align-items: center;
      .message-column {
        margin-right: 25px;
        display: flex;
        align-items: center;
        cursor: pointer;
        &:hover {
          // text-decoration:underline;
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
          box-sizing: border-box;
          display: block;
          padding: 0 2px;
          min-width: 20px;
          height: 20px;
          border-radius: 10px;
          line-height: 20px;
          margin-left: 1px;
          text-align: center;
          background-color: #dc4233;
          color: #fff;
          font-size: 12px;
        }
      }
      .message-column:nth-of-type(3) {
        margin-right: 10px;
      }
      button {
        color: #333;
      }
    }
    .log-out:hover .el-button {
      color: #dc4233;
    }
  }
}
</style>
