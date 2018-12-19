<template>
  <div class="get-pay">
    <div class="contain">
      <header>
				<p class="fl">{{name}}</p>
				<span @click="letGetPayNone" class="fr">×</span>
			</header>
      <div class="text">
        <p class="admin">操作员：{{curUser.name}}</p>
        <ul class="list">
          <li class="list-li mg-b12">
            <p style="width:110px;" class="middle">
              <span style="color:red;marginRight:6px;" class="middle">*</span>
              <span class="middle">收取订金：</span>
            </p>
            <input v-model="amount" style="width:178px;" class="middle h28" type="text">
            <p style="margin-left:8px;" class="middle">元</p>
          </li>
          <li class="list-li mg-b12">
            <p style="width:110px;" class="middle">
              <span style="color:red;marginRight:6px;" class="middle">*</span>
              <span class="middle">支付方式：</span>
            </p>
            <el-select v-model="payWay" style="width: 400px" size="small" filterable>
              <el-option v-for="item in payWayList" :key="item.id" :label="item.name" :value="item.id">  <!-- :key="item.id" :label="item.name" :value="item.id" -->
              </el-option>
            </el-select>
          </li>
          <li v-show="payWay == 5" class="pre-box">
            <div v-show="1" class="test-box">
              <div class="clearfix" style="marginBottom: 16px;">
                <nav class="fl">
                  <p style="width:100px;" class="middle">
                    <span>会员卡号：</span>
                  </p>
                  <p class="middle">
                    {{list.card_number}}
                  </p>
                </nav>
                <nav class="fr">
                  <p style="width:80px;" class="middle">
                    <span>会员类型：</span>
                  </p>
                  <p style="width:90px;" class="middle">
                    <span>{{list.card_level_name}}</span>
                  </p>
                </nav>
              </div>
              <div class="clearfix" style="marginBottom: 16px;">
                <nav class="fl">
                  <p style="width:100px;" class="middle">
                    <span>已有担保余额：</span>
                  </p>
                  <p class="middle">
                    {{list.security_deposit}}
                  </p>
                </nav>
                <nav class="fr">
                  <p style="width:80px;" class="middle">
                    <span>可用余额：</span>
                  </p>
                  <p style="width:90px;" class="middle">
                    <span>{{list.balance}}</span>
                  </p>
                </nav>
              </div>
            </div>
          </li>
          <li class="list-li mg-b12">
            <p style="width:110px;" class="middle padding-left18">
              <span class="middle">单号：</span>
            </p>
            <input v-model="orderNum" style="width: 400px;" class="middle h28" type="text">
          </li>
          <li class="list-li mg-b12">
            <p style="width:110px;" class="middle padding-left18">
              <span class="middle">备注：</span>
            </p>
            <!-- <input style="width: 400px;" class="middle h28" type="text"> -->
            <textarea v-model="remark" class="h70 middle"></textarea>
          </li>
        </ul>
        <div class="line"></div>
        <footer class="foot">
          <ul>    <!-- v-for="(item,index) in list" :key="index" -->
            <li @click="letGetPayNone" class="foot-li middle">取消</li>
            <li @click="givePost" class="foot-li middle change">收款</li>
          </ul>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import API from "@/store/API"
  export default {
    name: 'getPay',
    props: ['name','list','payWayList','id'],
    data() {
      return {
        remark: '',
        orderNum: '',
        amount: '',
        payWay: '',
        onece: true
      }
    },
    methods: {
      letGetPayNone() {
        this.$emit('letGetPayNone')
      },
      givePost() {
        if (!this.onece) {
          return
        }
        this.onece = false
        let obj = {
          preorder_id: this.id,
          amount: this.amount,
          pay_way: this.payWay,
          remark: this.remark
        }
        API.post("/pms/preorder/amount", obj).then(res => {
          // console.log('000000',res)
          if (res.error_code == 0) {
            this.$emit('letGetPayNone',res)
          } else {
            if (res.msg) {
              this.$message.error(`${res.msg}`)
              this.onece = true
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
  .get-pay{
    position: fixed;
		top: 0; left: 0; right: 0; bottom: 0;
		background: rgba(0,0,0,.4);
		font-size: 14px;
    z-index: 666;
    display: flex;
    align-items:center;
    justify-content: center;
    textarea,input{
      border: 1px solid #e6e6e6;
      border-radius: 4px;
      text-indent: 12px;
    }
    .h28{
      height: 28px;
    }
    .h70{
      height: 70px;
      width: 400px
    }
    .mg-b12{
      margin-bottom:12px;
    }
    .padding-left18{
      box-sizing: border-box;
      padding-left: 18px;
    }
    .pre-box{
      box-sizing: border-box;
      padding-right: 60px;
      margin-bottom: 10px;
    }
    .test-box{
      // width: 736px;
      background: #f4f9ff;
      margin-top:10px;
      box-sizing: border-box;
      padding: 14px 28px 1px;
    }
    .contain{
      width: 610px;
      height: 500px;
      // background: #fff;
      header{
				width: 100%;
				overflow: hidden;
				box-sizing: border-box;
				padding: 0 20px;
				line-height: 40px;
				background: #437ff9;
				color: #fff;
				span{
					font-size: 30px;
					cursor: pointer;
				}
			}
    }
    .text{
      background: #fff;
      padding-top: 24px;
    }
    .admin{
      text-align: right;
      box-sizing: border-box;
      padding-right: 48px;
      font-weight: bold;
      font-size: 16px;
    }
    .list{
      margin-top: -16px;
      box-sizing: border-box;
			padding-left: 34px;
    }
    .line{
      width: 100%;
      height: 20px;
      background: linear-gradient(#fff, #f6f6f6);
      margin-top: 24px;
    }
    .foot{
      height: 60px;
      display: flex;
      align-items:center;
      justify-content: center;
      .foot-li{
        width: 98px;
        height: 34px;
        text-align: center;
        line-height: 34px;
        border: 1px solid #437ff9;
        margin-right: 14px;
        border-radius: 4px;
        color:#437ff9;
        cursor: pointer;
      }
      .change{
        background: #437ff9;
        color: #fff; 
      }
    }
  }
</style>

