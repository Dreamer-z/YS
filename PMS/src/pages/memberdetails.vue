<template>
  <div class="member-details">
    <div class="whitetext">
      <clum-bread :redStar="false" :data="['当前位置','住客管理','会员详情']"></clum-bread>
      <p style="margin: 10px 0 20px;font-size: 16px; color:#818181">会员基本资料</p>
      <div class="mes-people">
        <div style="margin-bottom: 26px;">
          <p style="width: 33%" class="middle">
            <span style="width: 70px;text-align: right" class="middle">姓名：</span>
            <span>{{mes.name?mes.name:''}}</span>
          </p>
          <p style="width: 33%" class="middle">
            <span style="width: 70px;text-align: right" class="middle">手机号：</span>
            <span>{{mes.mobile?mes.mobile:''}}</span>
          </p>
          <p style="width: 33%" class="middle">
            <span style="width: 70px;text-align: right" class="middle">是否会员：</span>
            <span>是</span>
          </p>
        </div>
        <div>
          <p style="width: 33%" class="middle">
            <span style="width: 70px;text-align: right" class="middle">证件类型：</span>
            <span>{{mes.certificate_type?mes.certificate_type:''}}</span>
          </p>
          <p style="width: 33%" class="middle">
            <span style="width: 70px;text-align: right" class="middle">证件号：</span>
            <span>{{mes.idcard?mes.idcard:''}}</span>
          </p>
        </div>
        <div class="line"></div>
        <div style="margin-bottom: 26px;">
          <p style="width: 33%" class="middle">
            <span style="width: 70px;text-align: right" class="middle">客房喜好：</span>
            <span>{{mes.info?mes.info.room:''}}</span>
          </p>
          <p style="width: 33%" class="middle">
            <span style="width: 70px;text-align: right" class="middle">籍贯：</span>
            <span>{{mes.info?mes.info.birthplace:''}}</span>
          </p>
          <p style="width: 33%" class="middle">
            <span style="width: 70px;text-align: right" class="middle">国家：</span>
            <span>{{mes.info?mes.info.country:''}}</span>
          </p>
        </div>
        <div style="margin-bottom: 26px;">
          <p style="width: 33%" class="middle">
            <span style="width: 70px;text-align: right" class="middle">兴趣爱好：</span>
            <span>{{mes.info?mes.info.hobby:''}}</span>
          </p>
          <p style="width: 33%" class="middle">
            <span style="width: 70px;text-align: right" class="middle">邮箱：</span>
            <span>{{mes.info?mes.info.email:''}}</span>
          </p>
          <p style="width: 33%" class="middle">
            <span style="width: 70px;text-align: right" class="middle">QQ：</span>
            <span>{{mes.info?mes.info.QQ:''}}</span>
          </p>
        </div>
        <div style="margin-bottom: 26px;">
          <p style="width: 33%" class="middle">
            <span style="width: 70px;text-align: right" class="middle">餐饮爱好：</span>
            <span>{{mes.info?mes.info.food:''}}</span>
          </p>
          <p style="width: 33%" class="middle">
            <span style="width: 70px;text-align: right" class="middle">微信：</span>
            <span>{{mes.info?mes.info.wechat:''}}</span>
          </p>
          <p style="width: 33%" class="middle">
            <span style="width: 70px;text-align: right" class="middle">地址：</span>
            <span>{{mes.info?mes.info.address:''}}</span>
          </p>
        </div>
      </div>
      <p style="margin: 30px 0 20px;font-size: 16px; color:#818181">会员卡信息</p>
      <div class="mes-people">
        <div style="margin-bottom: 26px;">
          <p style="width: 33%" class="middle">
            <span style="width: 70px;text-align: right" class="middle">卡等级：</span>
            <span>{{mes.card?mes.card.level_name:''}}</span>
          </p>
          <p style="width: 33%" class="middle">
            <span style="width: 70px;text-align: right" class="middle">卡号：</span>
            <span>{{mes.card?mes.card.number:''}}</span>
          </p>
          <p style="width: 33%" class="middle">
            <span style="width: 70px;text-align: right" class="middle">发卡酒店：</span>
            <span>{{mes.card?mes.card.hotel_name:''}}</span>
          </p>
        </div>
        <div style="margin-bottom: 26px;">
          <p style="width: 33%" class="middle">
            <span style="width: 70px;text-align: right" class="middle">状态：</span>
            <span>{{mes.card?mes.card.status:''}}</span>
          </p>
          <p style="width: 33%" class="middle">
            <span style="width: 70px;text-align: right" class="middle">发卡时间：</span>
            <span>{{mes.card?mes.card.create_time:''}}</span>
          </p>
        </div>
      </div>
      <footer @click="goBack">返回</footer>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import API from "@/store/API"
import clumBread from "@/components/public/clumbread"
  export default {
    name: 'memberDetails',
    data() {
      return {
        mes: {},
        memberId: ''
      }
    },
    watch:{
      memberId(newval, oldval) {
        if (typeof newval == 'undefined') {
          this.goBack()
        }
      }
    },
    methods: {
      goBack() {
        this.$router.back()
      }
    },
    mounted() {
      this.memberId = this.$route.query.mes.id
      API.getMemberInfo(this.memberId).then(res=>{
        if(res.error_code == 0) {
          this.mes = res.data
          console.log(this.mes)
        }
      })
    },
    computed:{
      ...mapGetters({
        hotel:'currHotel'
      })
    },
    components: {
      clumBread
    }
  }
</script>

<style lang="scss" scoped>
  .member-details{
    user-select: none;
    padding-top: 50px;
    font-size: 14px;
    background: #f2f2f2;
    position: relative;
    .whitetext{
      width: 100%;
      box-sizing: border-box;
      padding-left: 250px;
      padding-top: 10px;
      background: #fff;
      padding-right: 50px;
    }
    .mes-people{
      box-sizing: border-box;
      padding: 34px 20px 26px;
      border: 1px solid #ccc;
    }
    .line{
      width: 96%;
      border-top: 1px solid #ccc;
      margin: 26px auto 34px;
    }
    footer{
      width: 120px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background: #6a9df6;
      color: #fff;
      border-radius: 4px;
      margin: 50px auto;
      cursor: pointer;
    }
  }
</style>