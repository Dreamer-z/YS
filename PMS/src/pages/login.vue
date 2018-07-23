<template>  
  <div class="applogin">  
    <div class="left">
      <header>
        <img class="middle" src="../assets/images/ys.png" alt=""/>
        <h3 class="middle">湖南云宿智能酒店管理系统</h3>
      </header>
      <div style="width: 100%;height: 70%;">
        <ul style="width:76%;height: 70%;margin: 0 auto;" ref="autoplay">
          <transition-group name="fade">            
            <li :key="1" v-show="autoplay == 1">
              <img style="width: 100%;height: 100%;" src="../assets/images/rz.png" alt="">
            </li>
            <li :key="2" v-show="autoplay == 2">
              <img style="width: 100%;height: 100%;" src="../assets/images/ds.png" alt="">
            </li>
            <li :key="3" v-show="autoplay == 3">
              <img style="width: 100%;height: 100%;" src="../assets/images/bh.png" alt="">
            </li>
          </transition-group>
        </ul>
      </div>
      <ol class="ol-list">
        <li :class="{'bj': autoplay == 1}" class="middle"></li>
        <li :class="{'bj': autoplay == 2}" class="middle"></li>
        <li :class="{'bj': autoplay == 3}" class="middle"></li>
      </ol>
      <footer>
        <div>
          <nav class="middle">
            <p>长沙市开福区通泰街街道中山路589号开福万达广场B区商业综合体</p>
            <p>
              <span class="middle mgr">备案号：湘ICP156486465-1</span>
              <span class="middle">电话：0731-89722930</span>
            </p>
          </nav>
        </div>
      </footer>
    </div>
    <div class="right">
      <div class="log">
        <h3>登录</h3>
        <ul class="log-list">
          <li>
            <input @focus="isMobileFalse = false" @blur="checkMobile(mobile)" v-model="mobile" placeholder="手机号" type="text">
            <span style="color: red;position: absolute;top: 42px;left:0;z-index: 10;" v-show="isMobileFalse">手机号码输入有误</span>
          </li>
          <li>
            <input @blur="checkPassword(passWord)" v-model="passWord" placeholder="密码" type="password">
            <span style="color: red;position: absolute;top: 42px;left:0;z-index: 10;" v-show="isPasswordFalse">密码长度在6-20之间</span>
          </li>
          <li class="clearfix" style="margin-top: 20px;border: none;">
            <nav @click="setRemeber" style="cursor: pointer" class="fl">
              <div class="box middle">
                <i style="margin-left: -2px;font-weight: bold;color:#6a9df6;font-size: 20px;" :class="{'icon-gou': remeber}" class="iconfont"></i>
              </div>
              <span class="middle">记住密码</span>
            </nav>
            <section style="margin-top: 6px; cursor: pointer" class="fr">
              <div @click="setForget" class="box middle">
                <i style="margin-left: -2px;font-weight: bold;color:#6a9df6;font-size: 20px;" :class="{'icon-gou': forget}" class="iconfont"></i>
              </div>
              <span class="middle">忘记密码</span>
            </section>
          </li>
          <li style="font-size: 16px;" @click="login" class="bornone">
            登录
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import API from "@/store/API"
  import { mapActions } from 'vuex'
  let loc = window.localStorage
  export default {
    name: 'register',
    data() {
      return {
        isPasswordFalse: false,
        isMobileFalse: false,
        passWord: '',
        mobile: '',
        autoplay: 1,
        remeber: false,
        forget: false
      }
    },
    methods: {      
      ...mapActions([
        'setUser'
      ]),
      setForget() {
        this.forget = !this.forget
        this.remeber = false
        if (loc.userName) {
          loc.removeItem('userName')
          loc.removeItem('pass')
        }
      },
      setRemeber() {
        this.remeber = !this.remeber
        this.forget = false
      },
      checkPassword(e) {
        if(e.length == 0) {
          return this.isPasswordFalse = false
        }
        if(e.length < 6 || e.length > 20) {
          this.isPasswordFalse = true
        }else{
          this.isPasswordFalse = false
        }
      },
      checkMobile(e) {
        if(e.length == 0) {
          return this.isMobileFalse = false
        }
        let reg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0|3,5-9]))\d{8}$|^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(14[5|7])|(15([0-3]|[5-9]))|(18[0|3,5-9]))\d{8}$/;
        reg.test(e)? this.isMobileFalse = false : this.isMobileFalse = true
      },
      login() {
        //this.$router.push({ path: 'choicehotel' })
        if (!this.mobile.length || !this.passWord.length || this.isMobileFalse || this.isPasswordFalse) {
          this.$alert('请填写正确的帐号密码', '操作提示', {
            confirmButtonText: '确定'
          })
          return
        }
       
        var self = this 
        API.login({mobile:this.mobile,password:this.passWord}).then(res=>{
            if(res.error_code != 0){
                alert(res.msg)
                return  
            }
            console.log(res)
            console.log('login succeess')
             if (self.remeber) {
              loc.setItem('userName', self.mobile)
              loc.setItem('pass', self.passWord)
            }else{
              loc.removeItem('userName')
              loc.removeItem('pass')
            }
            self.setUser({
              name:res.data.name,
              username:res.data.username,
              mobile:self.mobile,
              websocketUri:res.data.url,
              roleId:res.data.role_id
            })
            self.$store.dispatch('setToken',res.data.token)
            self.$router.push({path:'/hotellist'})
        })
      },
      setauto() {
        setInterval(() => {
          this.autoplay++
          if(this.autoplay == 4){
            this.autoplay = 1
          }
        }, 3000)
      }
    },
    mounted() {
      this.setauto()
      if (loc.userName) {
        this.mobile = loc.userName
        this.passWord = loc.pass
        this.remeber = true 
      }
    }
  }
</script>

<style lang="scss" scoped>
  .applogin{
    ::-webkit-input-placeholder {
    color:    #e5e5e5;
    }
    :-moz-placeholder {
        color:    #e5e5e5;
    }
    ::-moz-placeholder {
        color:    #e5e5e5;
    }
    :-ms-input-placeholder {
        color:    #e5e5e5;
    }
    .fade-enter-active {
      transition: all .3s ease;
    }
    .fade-leave-active {
      transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .fade-enter, .fade-leave-to{
      transform: translateX(10px);
      opacity: 0;
    }   
    .middle{
      display: inline-block;
      vertical-align: middle
    }
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    .left{
      position: absolute;
      top: 0;left: 0;
      height: 100%;
      width: 50%;
      background: #fff;
      header{
        margin-top: 4%;
        margin-left: 4%;
        img{
          margin-right: 12px;
        }
        h3{
          font-size: 23px;
        }
      }
      footer{
        position: absolute;
        bottom: 0;
        font-size: 14px;
        width: 100%;
        height: 70px;
        div{
          width: 416px;
          height: 70px;
          margin: 0 auto;
          box-sizing: border-box;
          padding-top:20px;
          .mgr{
              margin-right: 80px;
          }
          p{
            margin-bottom: 10px;
          }
        }
      }
    }
    .ol-list{
      position: relative;
      width: 100px;
      margin: 0 auto;
      .bj{
        background: #6a9df6;
      }
      li{
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #e7e7e7;
        margin-right: 20px;
      }
    }
    .right{
      position: absolute;
      top: 0;right: 0;
      height: 100%;
      width: 50%;
      background: #fafafa;
      .log{
        width: 60%;
        height: 80%;
        background: #fff;
        margin: 0 auto;
        margin-top: 10%;
        box-sizing: border-box;
        padding: 15% 5% 13% 5%;
        h3{
          font-size: 22px;
          margin-bottom: 30px;
        }
        ul{
          width: 100%;
          .bornone{
            border: none;
            background: #6a9df6;
            color: #fff;
            text-align: center;
            line-height: 40px;
            border-radius: 4px;
            margin-top: 20px;
            cursor: pointer;
          }
          li{
            width: 100%;
            height: 40px;
            border-bottom: 1px solid #f9f9f9;
            margin-bottom: 10px;
            position: relative;
            .get{
              width: 100px;
              height: 40px;
              line-height: 40px;
              border-radius: 4px;
              color: #fff;
              background: #6a9df6;
              text-align: center;
              position: absolute;
              right: 0;
              bottom: 4px;
              cursor: pointer;
            }
            input{
              height: 40px;
              width: 100%;
            }
          }
        }
      }
    }
    .mobileError{
      position: absolute;
      bottom:0;
      left: 0;
      color: red;
    }
    .box{
      width: 15px;
      height: 15px;
      border-radius: 1px;
      border: 1px solid #ccc;
      margin-right: 10px;
    }
  }

</style>