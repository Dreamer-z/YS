<template>
  <div class="ordinary-details">
    <div class="whitetext">
      <clum-bread :redStar="false" :data="['当前位置','住客管理','会员详情']"></clum-bread>
      <p style="margin: 10px 0 20px;font-size: 16px; color:#818181">会员基本资料</p>
      <div class="mes-people">
        <div style="margin-bottom: 26px;">
          <p style="width: 33%" class="middle">
            <span style="width: 70px;text-align: right" class="middle">姓名：</span>
            <input v-model="mes.name" type="text">
          </p>
          <p style="width: 33%" class="middle">
            <span style="width: 70px;text-align: right" class="middle">手机号：</span>
            <input @blur="checkPhone(mes.mobile)" v-model="mes.mobile" type="text">
            <span v-show="isPhoneNumfalse" style="color: red;">请输入正确的手机号码</span>
          </p>
        </div>
        <div>
          <p style="width: 33%" class="middle">
            <span style="width: 70px;text-align: right" class="middle">证件类型：</span>
            <el-select v-model="mes.certificate_type" size="small" filterable placeholder="请选择">
              <el-option
                v-for="item in cardtypeArr"
                :key="item.id"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </p>
          <p style="width: 33%" class="middle">
            <span style="width: 70px;text-align: right" class="middle">证件号：</span>
            <input @blur="checkIdcard(mes.idcard)" v-model="mes.idcard" type="text">
            <span v-show="isIdcardfalse" style="color: red;">请输入正确的证件号码</span>
          </p>
          <p style="width: 33%;text-align: right;" class="middle">
            <span @click="beMember(mes)" class="middle be-member">转为会员</span>
          </p>
        </div>
        <div class="line"></div>
        <div style="margin-bottom: 26px;">
          <p style="width: 33%" class="middle">
            <span style="width: 70px;text-align: right" class="middle">客房喜好：</span>
            <input v-model="mes.info.room" type="text">
          </p>
          <p style="width: 33%" class="middle">
            <span style="width: 70px;text-align: right" class="middle">籍贯：</span>
            <input v-model="mes.info.birthplace" type="text">
          </p>
          <p style="width: 33%" class="middle">
            <span style="width: 70px;text-align: right" class="middle">国家：</span>
            <input v-model="mes.info.country" type="text">
          </p>
        </div>
        <div style="margin-bottom: 26px;">
          <p style="width: 33%" class="middle">
            <span style="width: 70px;text-align: right" class="middle">兴趣爱好：</span>
            <input v-model="mes.info.hobby" type="text">
          </p>
          <p style="width: 33%" class="middle">
            <span style="width: 70px;text-align: right" class="middle">邮箱：</span>
            <input @blur="checkEmail(mes.info.email)" v-model="mes.info.email" type="text">
            <span v-show="isEmailFalse" style="color: red;">请输入正确的邮箱地址</span>
          </p>
          <p style="width: 33%" class="middle">
            <span style="width: 70px;text-align: right" class="middle">QQ：</span>
            <input v-model="mes.info.QQ" type="text">
          </p>
        </div>
        <div style="margin-bottom: 26px;">
          <p style="width: 33%" class="middle">
            <span style="width: 70px;text-align: right" class="middle">餐饮爱好：</span>
            <input v-model="mes.info.food" type="text">
          </p>
          <p style="width: 33%" class="middle">
            <span style="width: 70px;text-align: right" class="middle">微信：</span>
            <input v-model="mes.info.wechat" type="text">
          </p>
        </div>
        <div style="margin-bottom: 26px;">
          <p style="width: 100%" class="middle">
            <span style="width: 70px;text-align: right" class="middle">地址：</span>
            <input v-model="mes.info.address" style="width: 46%;" type="text">
          </p>
        </div>
      </div>
      <footer>
        <div class="middle" @click="givePost">确定</div>
        <nav @click="goBack" class="middle">返回</nav>
      </footer>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import API from "@/store/API"
import clumBread from "@/components/public/clumbread"
  export default {
    name: 'ordinaryDetails',
    data() {
      return {
        isPhoneNumfalse: false,
        isEmailFalse: false,
        isIdcardfalse: false,
        cardtypeArr: [],
        mes: {
          "id": 211,
          "hotel_id": 1,
          "name": "张三",
          "idcard": "430903199207070631",
          "mobile": "13012341234",
          "sex": "男",
          "certificate_type": "身份证",
          "info": {
              "id": '',
              "email": "",
              "address": "",
              "QQ": '',
              "wechat": "",
              "country": "",
              "birthplace": "",
              "hobby": "",
              "room": "",
              "food": "",
              "member_id": '',
              "level_name":''
          }
        },
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
      // goBack() {
      //   this.$router.back()
      // },
      givePost() {
        this.cardtypeArr.forEach((e, i)=>{
          if (e.name == this.mes.certificate_type) {
            this.mes.certificate_type = e.id
          }
        })
        let obj = {
          "name": this.mes.name,
          "mobile": this.mes.mobile,
          "idcard": this.mes.idcard,
          "certificate_type": this.mes.certificate_type,
          "hotel_id": this.mes.hotel_id,
          "info": {
              "email": this.mes.info.email,
              "address": this.mes.info.address,
              "QQ": this.mes.info.QQ,
              "wechat": this.mes.info.wechat,
              "country": this.mes.info.country,
              "birthplace": this.mes.info.birthplace,
              "hobby": this.mes.info.hobby,
              "room": this.mes.info.room,
              "food": this.mes.info.food,
          }
        }
        // console.log(this.mes)
        API.put("/pms/member/"+this.mes.id, obj).then(res=>{
          if(res.error_code == 0) {
            this.$alert('操作成功', '', {
              confirmButtonText: '确定',
              callback: ()=>{
                this.$router.back()
              }
            })
          }
        })
      },
      getCardtypeArr() {
        API.getCardtypeArr().then(res=>{
          if (res.error_code == 0) {
            this.cardtypeArr = res.data
          }
        })
      },
      checkIdcard(e) {
        let reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/
        reg.test(e)? this.isIdcardfalse = false : this.isIdcardfalse = true
      },
      checkEmail(e) {
        let reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
        reg.test(e)? this.isEmailFalse = false : this.isEmailFalse = true
      },
      checkPhone(e) {
        let reg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0|3,5-9]))\d{8}$/;
        console.log(reg.test(e))
        if (reg.test(e)) {
          this.isPhoneNumfalse = false
        } else {
          this.isPhoneNumfalse = true
        }
      },
      beMember(e) {
        this.$router.push({
            path: '/container/routeraddmember',
            query: e
        })
      },
      goBack() {
        this.$router.back()
      }
    },
    mounted() {
      this.memberId = this.$route.query.mes.id
      API.getMemberInfo(this.memberId).then(res=>{
        if(res.error_code == 0) {
          if (res.data.info == null) {
            res.data.info = {
              "id": '',
              "email": "",
              "address": "",
              "QQ": '',
              "wechat": "",
              "country": "",
              "birthplace": "",
              "hobby": "",
              "room": "",
              "food": "",
              "member_id": '',
              "level_name":''
            }
          }
          this.mes = res.data
          console.log('this.mes.certificate_type',this.mes)
        }
      })
      this.getCardtypeArr()
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
  .ordinary-details{
    user-select: none;
    padding-top: 50px;
    font-size: 14px;
    background: #f2f2f2;
    position: relative;
    input{
      border: 1px solid #ccc;
      width: 200px;
      height: 30px;
      text-indent: 6px;
      border-radius: 4px;
    }
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
      width: 280px;
      margin: 0 auto;
      margin-top: 50px;
      div{
        width: 120px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background: #6a9df6;
        color: #fff;
        border-radius: 4px;
        margin-right: 20px; 
        cursor: pointer;
      }
      nav{
        width: 120px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background: #6a9df6;
        color: #fff;
        border-radius: 4px;
        cursor: pointer;
      }
    }
    .be-member{
      width: 100px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background: #6a9df6;
      color: #fff;
      border-radius: 4px;
      cursor:pointer;
    }
  }
</style>