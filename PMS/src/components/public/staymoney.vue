<template>
  <div class="stay-money">
    <div v-loading="loading" class="contain">
      <header class="clearfix">
        <p class="fl">入住结账</p>
				<span @click="letStayMoneyNOne" class="fr spa">×</span>
      </header>
      <div class="text">
        <div class="gray">
          <p style="textAlign:right;fontWeight:bold;">操作员：{{curUser.name}}</p>
          <p style="marginBottom: 15px;fontWeight:bold;">账单金额</p>
          <p>
            <span style="marginRight:40px;">房费：</span>
            <span style="color: #f4703c;">￥</span><span style="fontWeight:bold;fontSize:18px;color: #f4703c;">{{val.totalPrice}}</span>
            <span class="middle price-list">明细
              <div style="zIndex:999" class="hover-box">
                <p :class="{'box-list-border': index !== val.prices[0].prices.length - 1}" v-for="(item,index) in val.prices[0].prices" :key="index" class="clearfix box-list">
                  <span class="fl">{{item.date}}</span>
                  <span class="fr">{{item.price}}</span>
                </p>
                <!-- <p class="clearfix box-list">
                  <span class="fl">001</span>
                  <span class="fr">002</span>
                </p> -->
              </div>
            </span>
          </p>
          <p style="margin: 14px 0;">
            <span style="marginRight:40px;">押金：</span>
            <span style="color: #f4703c;">￥</span><span style="fontWeight:bold;fontSize:18px;color: #f4703c;">{{val.deposit}}</span>
          </p>
          <p>
            <span style="marginRight:40px;">合计：</span>
            <span style="color: #f4703c;">￥</span><span style="fontWeight:bold;fontSize:18px;color: #f4703c;">{{val.payAmount}}</span>
          </p>
          <p class="line"></p>
          <p>
            <span style="fontWeight:bold;marginRight:18px;">已收金额：</span>
            <span style="color: #f4703c;">￥</span><span style="fontWeight:bold;fontSize:18px;color: #f4703c;">{{val.sum}}</span>
          </p>
        </div>
        <div class="white">
          <p style="marginLeft:30px;">
            <span style="fontWeight:bold;marginRight:18px;">应收金额：</span>   <!-- (heji - yishou) < 0 ? 0:(heji - yishou) -->
            <span style="color: #f4703c;">￥</span><span style="fontWeight:bold;fontSize:18px;color: #f4703c;">{{(val.payAmount - val.sum).toFixed(2)}}</span>
          </p>
          <p style="marginLeft:15px;marginTop: 10px;">
            <span style="color:red; marginRight: 8px;">*</span><span style="marginRight:24px;">支付方式：</span>
            <el-select v-model="payWay" size="mini" filterable>
              <el-option v-for="item in payWayList" :key="item.id" :label="item.name" :value="item.id">
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
                  {{memeberMsg.card_number}}
                </p>
              </nav>
              <nav class="fr">
                <p style="width:80px;" class="middle">
                  <span>会员类型：</span>
                </p>
                <p style="width:90px;" class="middle">
                  <span>{{memeberMsg.card_level_name}}</span>
                </p>
              </nav>
            </div>
            <div class="clearfix" style="marginBottom: 16px;">
              <nav class="fl">
                <p style="width:100px;" class="middle">
                  <span>已有担保余额：</span>
                </p>
                <p class="middle">
                  {{memeberMsg.security_deposit}}
                </p>
              </nav>
              <nav class="fr">
                <p style="width:80px;" class="middle">
                  <span>可用余额：</span>
                </p>
                <p style="width:90px;" class="middle">
                  <span>{{memeberMsg.balance}}</span>
                </p>
              </nav>
            </div>
          </div>
          <p style="marginLeft:15px;marginTop: 10px;marginBottom:10px;">
            <span style="color:red; marginRight: 8px;">*</span><span style="marginRight:24px;">实收金额：</span>
            <!-- <input v-model="receivable" style="width: 178px; height: 28px;border: 1px solid #e6e6e6;borderRadius: 4px;" type="text"><span>元</span> -->
            <el-input style="width: 180px;" type="text" size="mini" v-model="receivable"></el-input>
            <span>元</span>
          </p>
          <p style="margin: 10px 0 10px 26px;">
            <span style="marginRight:50px;">单号：</span>
            <!-- <input v-model="orderNum" style="width: 298px; height: 28px;border: 1px solid #e6e6e6;borderRadius: 4px;" type="text"> -->
            <span style="width: 300px;" class="ord">
              <el-input  size="mini" v-model="orderNum"></el-input>
            </span>
          </p>
          <div style="marginLeft: 26px;display:flex;">
            <span style="width:110px;lineHeight:48px;">备注：</span>
            <!-- <textarea v-model="payRemark" class="beizhu middle"></textarea> -->
            <el-input v-model="payRemark" type="textarea"></el-input>
          </div>
        </div>
      </div>
      <nav class="shadow"></nav>
      <footer>
        <div style="width: 220px;margin:0 auto;" class="clearfix">
          <!-- <p @click="letStayMoneyNOne" class="fl">取消</p> -->
          <el-button style="width:100px;" @click="letStayMoneyNOne">取消</el-button>
          <!-- <p @click="postAll" style="color:#fff;background: #437ff9;" class="fr">收款</p> -->
          <el-button style="width:100px;" @click="postAll" type="primary">收款</el-button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import API from "@/store/API"
import { mapGetters } from 'vuex'
  export default {
    name: 'stayMoney',
    props: ['val'],
    data() {
      return {
        memeberMsg: {},
        choicePayWay: null,
        loading: false,
        receivable: '',
        payWay: '',
        payWayList: [], //zhifu fangshi
        payRemark: '',
        orderNum: '',
        onlyOnce: true
      }
    },
    // watch: {
    //   payWay(newval) {
    //     if (newval == 5) {}
    //   }
    // },
    computed: {
			...mapGetters({
        hotel:'currHotel',
        curUser: 'user'
      }),
      heji() {
        return this.val.days * Number(this.val.room.price) + Number(this.val.room.deposit)
      },
      yishou() {
        if (this.val.status === 0) {
          return 0
        } else if (this.val.status === 1) {
          return this.val.room.sum
        }
      }
    },
    methods: {
      letStayMoneyNOne() {
        this.$emit('letStayMoneyNOne')
      },
      postAll() {
        if (!this.payWay) {
          this.$message.error('请选择支付方式')
          return
        }
        if (!this.onlyOnce) {
          return
        }
        this.onlyOnce = false
        this.loading = true
        if (this.val.status === 0) {
          this.val.object.pay_way = this.payWay,
          this.val.object.sum =  this.receivable,
          this.val.object.order_type = 1
          API.bestayPost(this.val.object).then(res=>{
            this.loading = false
            if(res.error_code == 0) {
              this.$alert('办理入住成功', '', {
                confirmButtonText: '确定',
                callback: ()=>{
                  this.$emit('letStayMoneyNOne',{orderId: res.data.order_id, statu: 2})
                  // Object.assign(this.$data, this.$options.data())
                }
              })
            } else {
              if (res.msg) {
                this.$alert(`${res.msg}`, '', {
                  confirmButtonText: '确定',
                  callback: ()=>{
                    // this.beNone()
                    this.onlyOnce = true
                  }
                })
              }
            }
          })
        } else if (this.val.status === 1) {
          let object = this.val
          let obj = {
            "hotel_id": object.hotel_id,
            "room_id": object.room_id,
            "come_time": object.come_time,
            "leave_time": object.leave_time,
            "total_count": 0,
            "plan_id": object.planId,
            "customer": object.customer,
            "remark": object.remark,
            "order_type": object.order_type,
            // "from": 2,   //预订来源
            "pay_way": this.payWay,   //支付方式
            "sum": Number(this.receivable),   //实收
            "member_id": object.member_id,
            // "partner_id":1,   协议单位
            "customer_type": object.customer_type,
            "pay_remark": this.payRemark
          }
          API.post("/pms/roomstatus/order", obj).then(res=>{
            this.loading = false
            if (res.error_code == 0) {
              this.$alert('操作成功', '', {
                confirmButtonText: '确定',
                callback: ()=>{
                  // Object.assign(this.$data, this.$options.data())
                  // this.$data = JSON.parse(JSON.stringify(this.$data))
                  // this.val.room.nameStr = strArr.join('|')
                  this.val.order_id = res.data.order_id
                  this.$emit('letStayMoneyNOne',{...this.val})
                }
              })
            } else {
              if (res.msg) {
                this.$message.error(`${res.msg}`)
              }
            }
          })
        }
      },
      // getPayway() {
			// 	API.getPayway().then(res=>{
			// 		this.payWayList = res
			// 	})
			// }
    },
    created() {
      console.log('0000',this.val)
      if (this.val.member_id === 0){
        API.get("/pms/common/payway").then(res => {
          if (res.error_code == 0) {
            this.payWayList = res.data
          }
        })
      } else {
        API.get("/pms/common/payway?vip=" +1).then(res => {
          if (res.error_code == 0) {
            this.payWayList = res.data
          }
        })
      }
      this.receivable = (this.val.payAmount - this.val.sum).toFixed(2)
      API.get("/pms/vip/balance?id=" + this.val.member_id).then(res => {
        if (res.error_code == 0) {
          this.memeberMsg = res.data
        }
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
    .contain{
			width: 550px;
			// max-height: 80%;
			// overflow-y: auto;
			position: absolute;
			background: #fff;
			top: 20%;
			left: 36%;
      header{
        font-size: 14px;
				width: 100%;
				overflow: hidden;
				box-sizing: border-box;
				padding: 0 20px;
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
      padding: 20px 20px 0;
      .ord{
        width: 300px;
        display: inline-block;
        .el-input--mini{
          width: 100%;
          .el-input__inner{
            width: 300px;
          }
        }
      }
    }
    .gray{
      box-sizing: border-box;
      padding: 10px 30px 16px;
      background: #f0f0f0;
      .price-list{
        width: 50px;
        position: relative;
        margin-left: 100px;
        color: #437ff9;
        cursor: pointer;
        &:hover .hover-box{
          display: block;
        }
        .hover-box{
          display: none;
          position: absolute;
          width: 200px;
          box-sizing: border-box;
          padding: 0 20px;
          top:0;
          left: 40px;
          background: #606060;
          color: #fff;
        }
      }
      .box-list{
        box-sizing: border-box;
        padding-top: 16px;
        padding-bottom: 10px; 
      }
      .box-list-border{
        border-bottom: 1px solid #808080
      }
    }
    .line{
      width: 100%;
      border-bottom: 1px solid #d9d9d9;
      margin: 15px 0;
    }
    .shadow{
      width: 100%;
      border-bottom: 4px solid #f6f6f6;
    }
    .white{
      box-sizing: border-box;
      padding: 15px 0px 16px;
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

