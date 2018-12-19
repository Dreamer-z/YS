<template>
  <div class="stay-money">
    <div class="contain">
      <header class="clearfix">
        <p class="fl">修改密码</p>
				<span @click="none" class="fr spa">×</span>
      </header>
      <div class="text">
        <div style="marginTop:10px;">
          <p style="width:100px;" class="middle">当前密码:</p>
          <input v-model="old_password" type="password">
        </div>
        <div style="margin: 20px 0;position:relative;">
          <p style="width:100px;" class="middle">新密码:</p>
          <input @focus="once = true" @blur="check(new_password)" :style="{'borderColor': error?'red':''}" v-model="new_password" type="password">
          <p v-show="once || error" :style="{'color':error?'red':''}" class="gray">请设置6-20位的密码</p>
        </div>
        <div style="marginBottom: 10px;position:relative;">
          <p style="width:100px;" class="middle">确认新密码:</p>
          <input  @blur="checkTheSame" :style="{'borderColor':!thesame?'red':''}" v-model="repassword" type="password">
          <p v-show="!once && !thesame" :style="{'color':!thesame?'red':''}" class="gray">两次密码不一致</p>
        </div>
      </div>
      <nav class="shadow"></nav>
      <footer>
        <div style="width: 220px;margin:0 auto;" class="clearfix">
          <p @click="none" style="color: #437ff9;" class="fl">取消</p>
          <p @click="givePost" style="color:#fff;background: #437ff9;" class="fr">确定</p>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import API from "@/store/API"
import { mapGetters } from 'vuex'
  export default {
    name: 'changePassWord',
    data() {
      return {
        thesame: true,
        once: true,
        error: false,
        new_password: '',
        old_password: '',
        repassword: ''
      }
    },
    methods: {
      none() {
        this.$emit('passWordNone')
      },
      checkTheSame() {
        if (!this.repassword.length) {
          this.thesame = true
          return
        }
        if (this.new_password === this.repassword) {
          this.thesame = true
        } else {
          this.thesame = false
        }
      },
      check(e) {
        if (!e.length){
          this.error = false
          return
        }
        if (e.length < 6 || e.length > 20) {
          this.error = true
        } else {
          this.error = false
        }
        this.once = false
      },
      givePost() {
        this.checkTheSame()
        if (this.error || !this.thesame) {
          return
        }
        API.post("/pms/password/modify",{
          "new_password": this.new_password,
          "old_password": this.old_password,
          "hotel_id": this.hotel.id,
          "repassword": this.repassword
        }).then(res => {
          if (res.error_code == 0) {
            this.$alert('修改成功', '', {
              confirmButtonText: '确定',
              callback: ()=>{
                this.$router.push('/login')
              }
            })
          } else {
            if (res.msg) {
              this.$message({
                message: `${res.msg}`,
                type: 'error'
              })
            }
          }
        })
      }
    },
    computed: {
			...mapGetters({
        hotel:'currHotel',
        curUser: 'user'
      })
    }
  }
</script>

<style lang="scss" scoped>
  .stay-money{
    position: fixed;
		top: 0; left: 0; right: 0; bottom: 0;
		background: rgba(0,0,0,.4);
		font-size: 14px;
		z-index: 666;
    display: flex;
    align-items:center;
    justify-content: center;
    .contain{
			width: 600px;
			background: #fff;
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
    }
    .gray{
      position: absolute;
      top: 32px;
      left: 104px;
      color: #b3b3b3;
    }
    .text{
      box-sizing: border-box;
      padding: 20px 50px 16px;
    }
    .shadow{
      width: 100%;
      border-bottom: 4px solid #f6f6f6;
    }
    footer{
      padding: 10px 0;
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
    input{
      width: 390px;height: 28px;
      border: 1px solid #cccccc;
      border-radius: 4px;
      text-indent: 6px;
    }
  }
</style>




