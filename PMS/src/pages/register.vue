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
				<h3>注册</h3>
				<ul class="log-list">
					<li>
						<input @focus="isMobileFalse = false" @blur="checkMobile(mobile)" v-model="mobile" placeholder="手机号" type="text">
            <span v-show="isMobileFalse" class="mobileError">手机号码输入有误</span>
					</li>
					<li>
						<input v-model="mobileCode" placeholder="验证码" type="text">
						<div @click="getMobileCode" class="get">
							获取验证码
						</div>
					</li>
					<li>
						<input @blur="checkName(name)" v-model="name" placeholder="姓名" type="text">
            <span v-show="isNameFalse" class="mobileError">输入有特殊字符</span>
					</li>
					<li>
						<input @blur="checkPassword(passWord)" v-model="passWord" placeholder="密码" type="password">
            <span v-show="isPasswordFalse" class="mobileError">密码长度在6-20之间</span>
					</li>
					<li>
						<input @blur="checkPasswordAgain(passWordAgain)" v-model="passWordAgain" placeholder="确认密码" type="password">
            <span v-show="isPasswordAgainFalse" class="mobileError">两次密码输入不一致</span>
					</li>
					<li style="font-size: 16px;" @click="login" class="bornone">
						注册
					</li>
				</ul>
			</div>
		</div>
  </div>
</template>

<script>
  import API from "@/store/API"
	export default {
		name: 'register',
		data() {
			return {
        isPasswordAgainFalse: false,
        isPasswordFalse: false,
        isNameFalse: false,
        isMobileFalse: false,
        passWordAgain: '',
        passWord: '',
        name: '',
        mobileCode: '',
        mobile: '',
        autoplay: 1
			}
		},
    methods: {
      checkPasswordAgain(e) {
        if(e.length == 0) {
          return this.isPasswordAgainFalse = false
        }
        if(e === this.passWord) {
          this.isPasswordAgainFalse = false
        }else{
          this.isPasswordAgainFalse = true
        }
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
      checkName(e) {
        if(e.length == 0) {
          return this.isNameFalse = false
        }
        let reg = new RegExp("[~'!@#￥$%^&*()-+_=:<>]","g");     // new RegExp("[\\u4E00-\\u9FFF]+","g") 
        reg.test(e)? this.isNameFalse = true : this.isNameFalse = false
      },
      checkMobile(e) {
        if(e.length == 0) {
          return this.isMobileFalse = false
        }
        let reg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$|^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
        reg.test(e)? this.isMobileFalse = false : this.isMobileFalse = true
      },
      login() {
				var self = this 
				API.login({mobile:'13808454644',password:'123456'}).then(res=>{
						if(res.error_code != 0){
								alert(res.msg)
								return 	
						}
						console.log(res.error_code)
						console.log('login succeess')
						self.$store.dispatch('setToken',res.data.token)
						self.$router.push({path:'/'})
				})
      },
      getMobileCode() {
        API.post("/pms/mobile/code",{mobile: '18607454757'}).then(res =>{
          console.log(res)
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
    }
	}
</script>

<style lang="scss" scoped>
	.applogin{
		::-webkit-input-placeholder { /* WebKit browsers */
    color:    #e5e5e5;
    }
    :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color:    #e5e5e5;
    }
    ::-moz-placeholder { /* Mozilla Firefox 19+ */
        color:    #e5e5e5;
    }
    :-ms-input-placeholder { /* Internet Explorer 10+ */
        color:    #e5e5e5;
    }
    .fade-enter-active {
      transition: all .3s ease;
    }
    .fade-leave-active {
      transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .fade-enter, .fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
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
	}

</style>