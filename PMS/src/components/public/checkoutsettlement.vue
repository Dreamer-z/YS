<template>
  <div class="stay-money">
    <div class="contain">
      <header class="clearfix">
        <p class="fl">退房结账</p>
				<span class="fr spa" @click="checkoutNone">×</span>
      </header>
      <div class="text">
        <div class="gray">
          <p style="textAlign:right;fontWeight:bold;">操作员：{{curUser.name}}</p>
          <p style="marginBottom: 20px;fontWeight:bold;">消费金额</p>
          <p>
            <span style="marginRight:56px;">房费：</span>
            <span style="color: #f4703c;">￥</span><span style="fontWeight:bold;fontSize:18px;color: #f4703c;">{{roomCharge}}</span>
          </p>
          <p style="margin: 14px 0;">
            <span style="marginRight:24px;">客房消费：</span>
            <span style="color: #f4703c;">￥</span><span style="fontWeight:bold;fontSize:18px;color: #f4703c;">{{consumption}}</span>
          </p>
          <p>
            <span style="marginRight:56px;">合计：</span>
            <span style="color: #f4703c;">￥</span><span style="fontWeight:bold;fontSize:18px;color: #f4703c;">{{totalAmout}}</span>
          </p>
          <p class="line"></p>
          <p>
            <span style="fontWeight:bold;marginRight:22px;">已收金额：</span>
            <span style="color: #f4703c;">￥</span><span style="fontWeight:bold;fontSize:18px;color: #f4703c;">{{recvAmount}}</span>
          </p>
        </div>
        <div class="white">
          <p>
            <span style="fontWeight:bold;marginRight:22px;">应结金额：</span>
            <span style="color: #f4703c;">￥</span><span style="fontWeight:bold;fontSize:18px;color: #f4703c;">{{refundAmount}}</span>
          </p>
          <p style="marginLeft:-15px;marginTop: 20px;marginBottom:10px;">
            <span style="color:red; marginRight: 8px;">*</span><span style="marginRight:24px;">实结金额：</span>
            <input style="width: 178px; height: 28px;border: 1px solid #e6e6e6;borderRadius: 4px;" type="text" v-model="payAmount"><span>元</span>
          </p>
          <p style="marginLeft:-15px;"> 
            <span style="color:red; marginRight: 8px;">*</span><span style="marginRight:24px;">支付方式：</span>
            <el-select v-model="payWay" style="width: 300px" size="small" filterable>
              <el-option v-for="item in paywayList" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </p>
          <div v-show="payWay == 5" class="test-box">
            <div class="clearfix" style="marginBottom: 16px;">
              <nav class="fl">
                <p style="width:100px;" class="middle">
                  <span>会员卡号：</span>
                </p>
                <p class="middle">
                  {{msg.card_number}}
                </p>
              </nav>
              <nav class="fr">
                <p style="width:80px;" class="middle">
                  <span>会员类型：</span>
                </p>
                <p style="width:90px;" class="middle">
                  <span>{{msg.card_level_name}}</span>
                </p>
              </nav>
            </div>
            <div class="clearfix" style="marginBottom: 16px;">
              <nav class="fl">
                <p style="width:100px;" class="middle">
                  <span>已有担保余额：</span>
                </p>
                <p class="middle">
                  {{msg.security_deposit}}
                </p>
              </nav>
              <nav class="fr">
                <p style="width:80px;" class="middle">
                  <span>可用余额：</span>
                </p>
                <p style="width:90px;" class="middle">
                  <span>{{msg.balance}}</span>
                </p>
              </nav>
            </div>
          </div>
          <p style="margin: 10px 0;">
            <span style="marginRight:56px;">单号：</span>
            <input style="width: 298px; height: 28px;border: 1px solid #e6e6e6;borderRadius: 4px;" type="text" v-model="orderNo">
          </p>
          <div>
            <span class="middle" style="marginRight:56px;">备注：</span>
            <textarea class="beizhu middle" v-model="remark"></textarea>
          </div>
        </div>
      </div>
      <nav class="shadow"></nav>
      <footer>
        <div style="width: 220px;margin:0 auto;" class="clearfix">
          <p class="fl"  @click="checkoutNone">取消</p>
          <p style="color:#fff;background: #437ff9;" class="fr" @click="checkout">结账</p>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import API from "@/store/API"
import bus from "@/store/bus"

  export default {
    name: 'checkoutsettlement',
    props: ['orderId','item','msg','paywayList'],
    data() {
      return {
        aa: '',
        roomCharge:0,
        consumption:0,
        recvAmount:0,
        payAmount:0,
        // paywayListArr:[],
        payWay: '',
        remark:'',
        orderNo:''
      }
    },
    computed: {
			...mapGetters({
        hotel:'currHotel',
        curUser: 'user'
      }),
      totalAmout:function(){
        return this.roomCharge + this.consumption
      },
      refundAmount:function(){
       this.payAmount = (this.totalAmout - this.recvAmount).toFixed(2)
       return (this.totalAmout - this.recvAmount).toFixed(2) //this.payAmount
               

      } 
    },
    methods: {
      checkout() {
				let obj = {
					order_id: this.orderId,
					pay_way: this.payWay,
					pay_amount: Number(this.payAmount)
				}
				if (obj.pay_way == '') {
	        this.$message.error(`请选择支付方式`)
	        return
        }
        
    
				API.put("/pms/roomstatus/end", obj).then(res=>{
					// console.log(res)
					if(res.error_code == 0) {
						this.$alert('操作成功', '', {
		          confirmButtonText: '确定',
		          callback: ()=>{
		          	bus.ev.$emit('checkoutNone',this.item?this.item:'this.mes')
		          }
		        })
					} else {
						if (res.msg) {
							this.$message.error(`${res.msg}`)
						}
					}
				})
			},
			checkoutNone() {
				bus.ev.$emit('checkoutNone')
			},
      // getPayway() {
			// 	API.getPayway().then(res=>{
			// 		this.paywayListArr = res
			// 	})
      // },
      getBill(){
        var self = this 
        API.get("/pms/roomstatus/order/" + this.orderId).then(res => {
          if (res.error_code == 0) {
            console.log(res.data) 
            self.recvAmount = Number(res.data.receive_amount)   // Number(res.data.preorder_sum) + 
            self.roomCharge = res.data.roomPricesSum
            self.consumption = res.data.goodsPricesSum
          }else{
             this.$message.error('网络错误,请稍后重试')
          }
        })
      }
      
    },
    created() {
      this.getBill()
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
    .contain{
			width: 600px;
			// max-height: 80%;
			// overflow-y: auto;
			position: absolute;
			background: #fff;
			top: 20%;
			left: 36%;
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
    .text{
      box-sizing: border-box;
      padding: 16px 16px 0;
    }
    .gray{
      box-sizing: border-box;
      padding: 10px 30px 16px;
      background: #f0f0f0;
      font-size: 16px;
    }
    .line{
      width: 100%;
      border-bottom: 1px solid #d9d9d9;
      margin: 18px 0;
    }
    .shadow{
      width: 100%;
      border-bottom: 4px solid #f6f6f6;
    }
    .white{
      box-sizing: border-box;
      padding: 30px 30px 16px;
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
      text-indent: 6px;
    }
    .beizhu{
      width: 298px;
      height: 58px;
      border: 1px solid #e6e6e6;
      border-radius: 4px;
    }
    .test-box{
      // width: 736px;
      background: #f4f9ff;
      margin-top:10px;
      // box-sizing: border-box;
      // padding: 14px 28px 1px;
    }
  }
</style>

