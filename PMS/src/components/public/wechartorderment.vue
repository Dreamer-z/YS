<template>
  <div class="stay-money">
    <div class="contain">
      <header class="clearfix">
        <p class="fl">详情</p>
				<span @click="setNone" class="fr spa">×</span>
      </header>
      <div class="text">
        <div style="boxSizing:border-box;paddingLeft:10px;" class="msg-box">
          <div style="width:270px;" class="middle">
            <p style="fontWeight: bold;fontSize: 16px;">入住信息</p>
            <div style="height:136px;">
              <p style="marginBottom:20px;marginTop:20px;">
                <span style="width:90px;" class="middle">预订人：</span>
                <span class="middle">{{totalMsg.user_name}}</span>
              </p>
              <p style="marginBottom:20px;">
                <span style="width:90px;" class="middle">手机号：</span>
                <span class="middle">{{totalMsg.mobile}}</span>
              </p>
              <p style="marginBottom:20px;">
                <span style="width:90px;" class="middle">入住日期：</span>
                <span class="middle">{{totalMsg.come_time}}</span>
              </p>
              <p>
                <span style="width:90px;" class="middle">离店日期：</span>
                <span class="middle">{{totalMsg.leave_time}}</span>
              </p>
            </div>
          </div>
          <div style="height:144px;borderLeft:1px solid #e6e6e6;marginRight:62px;marginTop:33px;" class="middle"></div>
          <div style="width:270px;" class="middle">
            <p style="fontWeight: bold;fontSize: 16px;">其它信息</p>
            <div style="height:136px;">
              <p style="marginBottom:26px;marginTop:20px;">
                <span style="width:90px;" class="middle">客源渠道：</span>
                <span class="middle">小程序</span>
              </p>
              <p style="marginBottom:20px;">
                <span style="width:90px;" class="middle">预订金额：</span>
                <span class="middle">{{totalMsg.sum}}</span>
              </p>
              <p style="marginBottom:20px;">
                <span style="width:90px;" class="middle">预抵时间：</span>
                <span class="middle">{{totalMsg.arrive_time}}</span>
              </p>
              <p>
                <span style="width:90px;" class="middle">备注：</span>
                <span class="middle">{{totalMsg.remark}}</span>
              </p>
            </div>
          </div>
          <div style="height:144px;borderLeft:1px solid #e6e6e6;marginRight:62px;marginTop:33px;" class="msg-line middle"></div>
          <div style="width:138px;" class="middle">
            <div style="height:136px;lineHeight:136px;">
              <p style="marginBottom:20px;marginTop:20px;">
                <span>订单状态：</span>
                <span>{{totalMsg.order_status}}</span>
              </p>
            </div>
          </div>
        </div>
        <div class="line"></div>
        <table border="0">
          <tbody>
            <tr style="background: #f2f2f2;border:1px solid #e5e5e5;">
              <td style="height: 40px;" colspan="5">序号</td>
              <td style="height: 40px;" colspan="11">房型</td>
              <td style="height: 40px;" colspan="6">房费</td>
              <td style="height: 40px;" colspan="12">预抵</td>
              <td style="height: 40px;" colspan="12">预离</td>
            </tr>
            <tr style="border:1px solid #e5e5e5;" v-for="(item, index) in totalMsg.snap" :key="index">
              <td style="height: 40px;" colspan="5">{{index + 1}}</td>
              <td style="height: 40px;" colspan="11">{{item.room_type_name}}</td>
              <td style="height: 40px;" colspan="6">{{item.price}}</td>
              <td style="height: 40px;" colspan="12">{{item.come_time}}</td>
              <td style="height: 40px;" colspan="12">{{item.leave_time}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav class="shadow"></nav>
      <footer>
        <div style="width: 220px;margin:0 auto;" class="clearfix">
          <!-- <p @click="setNone" style="color: #437ff9;" class="middle">取消</p> -->
          <el-button @click="setNone" style="width:100px;">取消</el-button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import API from "@/store/API"
import { mapGetters } from 'vuex'
  export default {
    name: 'wechartOrderMent',
    props: ['val'],
    data() {
      return {
        totalMsg: {},
      }
    },
    methods: {
      setNone() {
        this.$emit('checkMemberNone')
      }
    },
    created() {
      API.get("/pms/preorder/" + this.val).then(res => {
        if (res.error_code == 0) {
          this.totalMsg = res.data
        } else {
          if (res.msg) {
            this.$message.error(`${res.msg}`)
          }
        }
      })
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
			width: 950px;
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
    .text{
      box-sizing: border-box;
      padding: 20px 50px 16px;
    }
    .line{
      width: 100%;
      border-bottom: 1px solid #e6e6e6;
      margin: 24px 0;
    }
    table{
      table-layout:fixed;
      word-break:break-all;
    }
    td{
      text-align: center;
      height: 40px;
      // word-wrap: break-word;
      overflow: hidden;
      white-space: nowrap;
      text-overflow:ellipsis;
    }
    .shadow{
      width: 100%;
      border-bottom: 4px solid #f6f6f6;
    }
    footer{
      padding: 10px 0;
      text-align: center;
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

