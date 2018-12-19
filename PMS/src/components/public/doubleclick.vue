<template>
  <div class="stay-money">
    <div class="contain">
      <header class="clearfix">
        <p class="fl">设置价格</p>
				<span @click="setNone" class="fr spa">×</span>
      </header>
      <div class="text">
        <p style="text-align:right;">
          <span>操作员：{{curUser.name}}</span>
        </p>
        <h3 v-if="val.userType == 0" style="fontWeight:bold;margin-left: -7px;">【散客】门市价</h3>
        <h3 v-else style="fontWeight:bold;margin-left: -7px;">【会员】{{val.userTypeName}}</h3>
        <div class="type-time">
          <p class="middle" style="width: 280px;">
            <span>房型：</span>
            <span>{{val.roomTypeName}}</span>
          </p>
          <p class="middle">
            <span>日期：</span>
            <span>{{val.fullDate | checkDate}}</span>
          </p>
        </div>
        <p>
          <span>原价格：</span>
          <span>{{val.showPrice}}</span>
        </p>
        <p style="marginTop: 16px;marginBottom: 10px;marginLeft: -11px;">
          <span style="color:red;">*</span>
          <span>设置价格：</span>
          <input v-model="newPrice" style="width:178px;height:28px;" type="text"><span v-if="isPriceWrong" style="color:red;marginLeft:20px;">请输入正确的价格</span>
        </p>
        <p>
          <span class="middle">设置说明：</span>
          <textarea v-model="remark" class="remark middle"></textarea>
        </p>
      </div>
      <nav class="shadow"></nav>
      <footer>
        <div style="width: 220px;margin:0 auto;" class="clearfix">
          <!-- <p @click="setNone" class="fl">关闭</p> -->
          <el-button @click="setNone" style="width:100px;">关闭</el-button>
          <!-- <p @click="givepost" style="color:#fff;background: #437ff9;" class="fr">提交</p> -->
          <el-button @click="givepost" type="primary" style="width:100px;">提交</el-button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import API from "@/store/API"
import { mapGetters } from 'vuex'
  export default {
    name: 'doubleClickPrice',
    props: ['val'],
    data() {
      return {
        postOnce: true,
        isPriceWrong: false,
        remark: '',
        newPrice: '',
        startDateTime: '',
        roomTypes: [],
        ugcTime: ''
      }
    },
    filters: {
      checkDate(e) {
        let arr = e.split('.')
        arr[1] = arr[1] < 10 ? '0' + arr[1] : arr[1]
        return arr.join('.')
      }
    },
    watch: {
      newPrice(newval) {
        if (!newval.length){
          // this.isPriceWrong = false
          return
        }
        if (Number(newval)) {
          this.isPriceWrong = false
        } else {
          this.isPriceWrong = true
        }
      }
    },
    methods: {
      setNone() {
        this.$emit('doubleNone')
      },
      givepost() {
        if (this.isPriceWrong) {
          return
        }
        if (!this.postOnce) {
          return
        }
        this.postOnce = false
        let obj = { 
          hotelId: this.hotel.id, 
          userType: this.val.userType,   
          // price: this.newPrice, 
          start: this.ugcTime,
          end: this.ugcTime, 
          roomTypeIds: [{id:this.val.roomTypeId,price:this.newPrice}],  
          memberIds: this.val.memberId?[this.val.memberId]:[],
          remark: this.remark 
        }
        let object = Object.assign(this.val,obj)
        API.post("/pms/price/create",obj).then(res => {
          if (res.error_code == 0) {
            this.$message({
              message: '设置成功',
              type: 'success'
            })
            this.$emit('doubleNone',object)
          } else {
            this.postOnce = true
            if (res.msg) {
              this.$message.error(`${res.msg}`)
              // this.$alert(`${res.msg}`, '', {
              //   confirmButtonText: '确定',
              //   callback: ()=>{
              //     this.$emit('doubleNone')
              //   }
              // })
            }
          }
        })
      }
    },
    created() {
      this.ugcTime = this.val.fullDate.split('.').join('-')
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
		font-size: 12px;
		z-index: 666;
    display: flex;
    align-items:center;
    justify-content: center;
    .contain{
			width: 600px;
			background: #fff;
      header{
        font-size: 14px;
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
    .type-time{
      padding: 18px 0;
      border-bottom: 1px solid #f2f2f2;
      margin-bottom: 18px;
    }
    .remark{
      width: 414px;
      height: 58px;
    }
    .text{
      box-sizing: border-box;
      padding: 20px 50px 34px;
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
    input,textarea{
      border: 1px solid #cccccc;
      border-radius: 4px;
      text-indent: 6px;
    }
  }
</style>

