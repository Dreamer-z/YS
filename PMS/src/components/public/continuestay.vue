<template>
  <div class="stay-money">
    <div class="contain">
      <header class="clearfix">
        <p class="fl">续住结账</p>
				<span @click="continueBeNone" class="fr spa">×</span>
      </header>
      <div class="text">
        <div class="gray">
          <p style="textAlign:right;fontWeight:bold;">操作员：{{curUser.name}}</p>
          <p style="marginBottom: 10px;fontWeight:bold;">续住账单金额</p>
          <p>
            <span style="marginRight:56px;">房费：</span>
            <span style="color: #f4703c;">￥</span><span style="fontWeight:bold;fontSize:18px;color: #f4703c;">{{val.keep_room_price}}</span>
          </p>
          <p class="line"></p>
          <p style="marginBottom: 10px;fontWeight:bold;">原有账单金额</p>
          <p>
            <span style="marginRight:56px;">房费：</span>
            <span style="color: #f4703c;">￥</span><span style="fontWeight:bold;fontSize:18px;color: #f4703c;">{{val.room_fee}}</span>
          </p>
          <p style="margin: 10px 0;">
            <span style="marginRight:56px;">押金：</span>
            <span style="color: #f4703c;">￥</span><span style="fontWeight:bold;fontSize:18px;color: #f4703c;">{{val.deposit}}</span>
          </p>
          <p>
            <span style="marginRight:56px;">合计：</span>
            <span style="color: #f4703c;">￥</span><span style="fontWeight:bold;fontSize:18px;color: #f4703c;">{{val.room_fee + val.deposit}}</span>
          </p>
          <p class="line"></p>
          <p>
            <span style="fontWeight:bold;marginRight:22px;">已收金额：</span>
            <span style="color: #f4703c;">￥</span><span style="fontWeight:bold;fontSize:18px;color: #f4703c;">{{val.receive_amount}}</span>
          </p>
        </div>
        <div class="white">
          <p style="marginLeft:30px;">
            <span style="fontWeight:bold;marginRight:22px;">应收金额：</span>
            <span style="color: #f4703c;">￥</span><span style="fontWeight:bold;fontSize:18px;color: #f4703c;">{{val.keep_room_price}}</span>
          </p>
          <p style="marginLeft: 15px;marginTop: 10px;">
            <span style="color:red; marginRight: 8px;">*</span><span style="marginRight:24px;">支付方式：</span>
            <el-select v-model="msgJson.pay_way" style="width: 300px" size="small" filterable>
              <el-option v-for="item in payWayList" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </p>
          <div class="test-box">
            <div class="clearfix" style="marginBottom: 16px;">
              <nav class="fl">
                <p style="width:100px;" class="middle">
                  <span>会员卡号：</span>
                </p>
                <p class="middle">
                  000000001
                </p>
              </nav>
              <nav class="fr">
                <p style="width:100px;" class="middle">
                  <span>可用余额：</span>
                </p>
                <p class="middle">
                  <span>11111</span>
                </p>
              </nav>
            </div>
            <div style="marginBottom: 16px;">
              <p style="width:100px;" class="middle">
                <span>已有担保金额：</span>
              </p>
              <p class="middle">200.000</p>
            </div>
          </div>
          <p style="marginLeft:15px;marginTop: 10px;marginBottom:10px;">
            <span style="color:red; marginRight: 8px;">*</span><span style="marginRight:24px;">实收金额：</span>
            <input v-model="msgJson.pay_amount" style="width: 178px; height: 28px;border: 1px solid #e6e6e6;borderRadius: 4px;" type="text"><span>元</span>
          </p>
          <p style="margin: 10px 0 10px 26px;">
            <span style="marginRight:56px;">单号：</span>
            <input v-model="msgJson.transaction_id" style="width: 298px; height: 28px;border: 1px solid #e6e6e6;borderRadius: 4px;" type="text">
          </p>
          <div style="marginLeft: 26px;">
            <span class="middle" style="marginRight:56px;">备注：</span>
            <textarea placeholder="最多输入20个字" v-model="msgJson.remark" class="beizhu middle"></textarea>
          </div>
        </div>
      </div>
      <nav class="shadow"></nav>
      <footer>
        <div style="width: 220px;margin:0 auto;" class="clearfix">
          <p @click="continueBeNone" class="fl">取消</p>
          <p @click="givePost" style="color:#fff;background: #437ff9;" class="fr">收款</p>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import API from "@/store/API"
import { mapGetters } from 'vuex'
  export default {
    name: 'continueStay',
    props: ['val','obj'],
    data() {
      return {
        payWayList: [],
        msgJson: {
          pay_way: '',
          pay_amount: '',
          transaction_id: '',
          remark: ''
        } 
      }
    },
    computed: {
			...mapGetters({
        hotel:'currHotel',
        curUser: 'user'
      })
    },
    methods: {
      givePost() {
        if (this.msgJson.remark.length > 20) {
          this.$message.error('备注栏目 - 最多只能输入20个字')
          return
        }
        let o = Object.assign(this.msgJson,this.obj)
        API.post("/pms/roomstatus/keep", o).then(res=>{
          if (res.error_code == 0) {
            this.$alert('操作成功', '', {
		          confirmButtonText: '确定',
		          callback: ()=>{
								this.continueBeNone()
		          }
		        })
          } else {
            if (res.msg) {
      				this.$message.error(`${res.msg}`)
      			}
          }
        })
      },
      continueBeNone() {
        this.$emit('continueBeNone')
      },
      getPayway() {
				API.getPayway().then(res=>{
					this.payWayList = res
				})
			}
    },
    created() {
      this.msgJson.pay_amount = this.val.keep_room_price
      this.getPayway()
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
			// max-height: 80%;
			// overflow-y: auto;
			position: absolute;
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
    .test-box{
      // width: 736px;
      background: #f4f9ff;
      margin-top:10px;
      box-sizing: border-box;
      padding: 14px 28px 1px;
    }
    .text{
      box-sizing: border-box;
      padding: 16px 16px 0;
    }
    .gray{
      box-sizing: border-box;
      padding: 10px 30px 16px;
      background: #f0f0f0;
      // font-size: 16px;
    }
    .line{
      width: 100%;
      border-bottom: 1px solid #d9d9d9;
      margin: 10px 0;
    }
    .shadow{
      width: 100%;
      border-bottom: 4px solid #f6f6f6;
    }
    .white{
      box-sizing: border-box;
      padding: 20px 0px 16px;
      // font-size: 16px;
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
  }
</style>

