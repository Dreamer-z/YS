<template>
  <div class="adMem-container">
    <div class="title">会员基本资料</div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" v-loading="loading">
      <div class="column requiredColumn">
        <div class="title">必填项目</div>
        <el-form-item label="姓名：" prop="name">
          <el-input v-model="ruleForm.name" @change="nameReg(ruleForm.name)" size="small"></el-input>
        </el-form-item>
        <el-form-item label="手机号：" prop="mobile">
          <el-input type="number" v-model="ruleForm.mobile" @change="telReg(ruleForm.mobile)" size="small"></el-input>
        </el-form-item>
        <el-form-item label="证件类型：" prop="certificate_type">
          <el-select v-model="ruleForm.certificate_type" placeholder="请选择证件类型" default-first-option size="small">
            <el-option v-for="item in certificate_type" :key="item.key" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="idcard" label="证件号：" prop="idcard" @change="idReg(ruleForm.idcard)">
          <el-input v-model="ruleForm.idcard" size="small"></el-input>
        </el-form-item>
      </div>
      <div class="column chooseColumn">
        <div class="title">选填项目</div>
        <el-form-item label="客房喜好：" prop="room">
          <el-input v-model="ruleForm.info.room" size="small"></el-input>
        </el-form-item>
        <el-form-item label="餐饮喜好：" prop="food">
          <el-input v-model="ruleForm.info.food" size="small"></el-input>
        </el-form-item>
        <el-form-item label="籍贯：" prop="birthplace">
          <el-input v-model="ruleForm.info.birthplace" size="small"></el-input>
        </el-form-item>
        <el-form-item label="兴趣爱好：" prop="hobby">
          <el-input v-model="ruleForm.info.hobby" size="small"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" prop="email">
          <el-input type="email" v-model="ruleForm.info.email" size="small"></el-input>
        </el-form-item>
        <el-form-item label="国家：" prop="country">
          <el-select v-model="ruleForm.info.country" filterable placeholder="请选择" default-first-option size="small">
            <el-option v-for="item in country" :key="item.key" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="QQ：" prop="QQ">
          <el-input v-model="ruleForm.info.QQ" size="small"></el-input>
        </el-form-item>
        <el-form-item label="微信：" prop="WeChat">
          <el-input v-model="ruleForm.info.wechat" size="small"></el-input>
        </el-form-item>
        <el-form-item class="addr" label="地址：" prop="addr">
          <el-input v-model="ruleForm.info.address" size="small"></el-input>
        </el-form-item>
      </div>
      <div class="optionColumn">
        <el-form-item label="卡等级：" prop="card.member_leve_id">
          <el-select v-model="ruleForm.card.member_level_id" placeholder="请选择会员等级" default-first-option size="small">
            <el-option v-for="item in menberLevel" :key="item.key" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="卡号：" prop="card.number">
          <el-input v-model="ruleForm.card.number" size="small"></el-input>
        </el-form-item>
        <el-form-item label="发卡酒店：" prop="hotel">
          <el-input v-model="ruleForm.hotel" disabled size="small"></el-input>
        </el-form-item>
        <!-- <el-form-item label="有效期" prop="validity">
                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.validity" style="width: 100%;" size="small"></el-date-picker>
                </el-form-item>
                <el-form-item label="卡费" prop="cardPrice">
                     v-model="ruleForm.cardPrice"></el-input>
                </el-form-item> -->
      </div>
      <div class="form-option">
        <el-form-item class="submit">
          <el-button type="primary" @click="submitForm('ruleForm')">保存信息并激活</el-button>
          <el-button @click="resetForm('ruleForm')">返回</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import API from '@/store/API/index'
import RegEx from '@/assets/js/RegEx'
export default {
  name: 'routerAddMember',
  computed: {
    ...mapGetters({
      hotel: 'currHotel'
    })
  },
  // beforeRouteEnter(to, from, next) {
  //   next((vm) => {
  //   console.log(vm.$route)
  //   })
  //   //console.log(this.$route.query)
  // },
  data() {
    return {
      ruleForm: {
        hotel_id: '',
        name: '',
        mobile: '',
        certificate_type: '',
        idcard: '',
        info: {
          room: '',
          food: '',
          birthplace: '',
          hobby: '',
          email: '',
          country: '',
          QQ: '',
          wechat: '',
          address: ''
        },
        card: {
          member_level_id: '',
          number: '',
          status: 1,
        },
        hotel: ''
      },
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        mobile: [
          { required: true, message: '请输入正确的手机号码', trigger: 'blur' }
        ],
        certificate_type: [
          { required: true, message: '请选择证件类型', trigger: 'change' }
        ],
        idcard: [
          { required: true, message: '请输入正确的证件号码', trigger: 'blur' }
        ],
        validity: [
          { required: true, message: '请选择有效期', trigger: 'change' }
        ],
        card: {
          member_level_id: [
          { required: true, message: '请选择会员等级', trigger: 'change' }
        ],
        number: [{ required: true, message: '请输入卡号', trigger: 'blur' }]
        }
      },
      // 加载
      loading: true,
      // 证件类型
      certificate_type: [],
      // 会员等级列表
      menberLevel: [],
      country: [
        {
          label: '中国大陆',
          value: 1
        },
        {
          label: '中国香港',
          value: 2
        },
        {
          label: '中国澳门',
          value: 3
        },
        {
          label: '中国台湾',
          value: 4
        }
      ],
      memberId: ''
    }
  },
  methods: {
    memberLevelList() {
      let _this = this
      this.ruleForm.hotel_id = this.hotel.id
      this.ruleForm.hotel = this.hotel.hotel_name
      API.memberLevelList({
        id: this.hotel.id
      })
        .then(function(res) {
          if (res.data.length == 0) {
            _this.$alert(
              '，您还没有设置会员卡等级，请先设置会员卡等级再执行添加会员操作！',
              '提示',
              {
                confirmButtonText: '确定',
                showCancelButton: false
              }
            )
          }
          _this.loading = false
          let arr = []
          for (let i = 0; i < res.data.length; i++) {
            arr.push({})
            arr[i].label = res.data[i].name
            arr[i].value = res.data[i].id
          }
          _this.menberLevel = arr
        })
        .catch(function(err) {
          console.log(err)
          _this.$message({
            type: 'warning',
            message: '请求会员等级列表失败！'
          })
        })
    },
    // 证件类型查询
    certificate() {
      let _this = this
      API.certificate()
        .then(function(res) {
          let arr = []
          for (let i = 0; i < res.data.length; i++) {
            arr.push({})
            arr[i].label = res.data[i].name
            arr[i].value = res.data[i].id
          }
          _this.certificate_type = arr
        })
        .catch(function(err) {
          console.log(err)
          _this.$message({
            type: 'warning',
            message: '请求会员等级列表失败！'
          })
        })
    },
    submitForm(formName) {
      this.certificate_type.forEach((e,i)=>{
        if (this.ruleForm.certificate_type == e.label) {
          this.ruleForm.certificate_type = e.value    // Number(e.id)
        }
      })
      // console.log(this.ruleForm)
      // return
      let _this = this
      if (this.ruleForm.info.email != '') {
        if (!RegEx.email(this.ruleForm.info.email)) {
          this.$message({
            type: 'warning',
            message: '请检查邮箱格式！'
          })
          return
        }
      }
      if (this.ruleForm.info.QQ != '') {
        if (!RegEx.qq(this.ruleForm.info.QQ)) {
          this.$message({
            type: 'warning',
            message: '请检查qq格式！'
          })
          return
        }
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          // API.memberAdd(this.ruleForm)
          this.ruleForm.card.hotel_id = this.hotel.id
          API.put("/pms/member/" + this.memberId, this.ruleForm)
            .then(function(res) {
              // _this.$message({
              //   type: 'success',
              //   message: '新增会员成功！'
              // })
              _this.$alert('操作成功', '', {
                confirmButtonText: '确定',
                callback: ()=>{
                  _this.$router.back()
                }
              })
              _this.ruleForm = {
                name: '',
                mobile: '',
                certificate_type: '',
                idcard: '',
                info: {
                  room: '',
                  food: '',
                  birthplace: '',
                  hobby: '',
                  email: '',
                  country: '',
                  QQ: '',
                  wechat: '',
                  address: ''
                },
                card: {
                  member_level_id: '',
                  number: ''
                }
              }
              _this.$refs[formName].resetFields()
            })
            .catch(function(err) {
              console.log(err)
              _this.$message({
                type: 'warning',
                message: '新增会员失败！'
              })
            })
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      // this.$refs[formName].resetFields()
      this.$router.back()
    },
    // 姓名验证
    nameReg(name) {
      if (RegEx.name(name) == false) {
        this.ruleForm.name = ''
      }
    },
    // 手机号验证
    telReg(tel) {
      if (RegEx.telReg(tel) == false) {
        this.ruleForm.mobile = ''
      }
    },
    // 身份证号验证
    idReg(idcard) {
      if (!RegEx.idReg(idcard)) {
        this.ruleForm.idcard = ''
      }
    }
  },
  created() {
// certificate_type: "身份证"
// id: 4 
// idcard: "430422199901012222"
// mobile: "15266666666"
// name: "辅导费"
// sex: 0 
// type: 0

// ruleForm: {
//   hotel_id: '',
//   name: '',
//   mobile: '',
//   certificate_type: '',
//   idcard: '',
//   info: {
//     room: '',
//     food: '',
//     birthplace: '',
//     hobby: '',
//     email: '',
//     country: '',
//     QQ: '',
//     wechat: '',
//     address: ''
//   },
//   card: {
//     member_leve_id: '',
//     number: ''
//   },
//   hotel: ''
// }



    let obj = this.$route.query
    console.log('<>',obj,obj)
    this.memberId = obj.id
    API.getMemberInfo(obj.id).then(res=>{
      if (res.error_code == 0) {
        this.ruleForm= res.data
        if (!res.info) {
          this.ruleForm.info = {
                  room: '',
                  food: '',
                  birthplace: '',
                  hobby: '',
                  email: '',
                  country: '',
                  QQ: '',
                  wechat: '',
                  address: ''
                }
        }
        // this.ruleForm.info = res.data.info
        this.ruleForm.card = {
          member_level_id: '',
          number: '',
          status: 1,
        }
      }
    })

    // this.ruleForm.name = obj.name
    // this.memberId = obj.id
    // this.ruleForm.mobile = obj.mobile
    // this.ruleForm.idcard = obj.idcard
    // this.ruleForm.certificate_type = obj.certificate_type
    // if (obj.info){
    //   this.ruleForm.info = obj.info
    // }
    this.memberLevelList()
    this.certificate()
  }
}
</script>

<style lang="scss" >
.adMem-container {
  box-sizing: border-box;
  height: 100%;
  font-size: 14px;
  overflow: auto !important;
  & > .title {
    font-size: 16px;
    color: #7d7d7d;
    margin-bottom: 20px;
  }
  .column {
    box-sizing: border-box;
    padding: 20px;
    margin-bottom: 30px;
    width: 1000px;
    border: 1px solid #e6e6e6;
    border-radius: 4px;
    // background-color: #fff;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    position: relative;
    & > .title {
      color: #7d7d7d;
      line-height: 36px;
      background-color: #f2f2f2;
      padding: 0 10px;
      position: absolute;
      left: 40px;
      top: -18px;
    }
  }
  .requiredColumn {
    .el-form-item {
      width: 33.3333%;
      .el-input,
      .el-input--suffix {
        width: 170px;
        .el-input__inner {
          width: 100%;
        }
      }
    }
    .idcard {
      width: 100%;
      .el-input {
        width: 300px;
      }
    }
  }
  .chooseColumn {
    .el-form-item {
      width: 33.3333%;
      margin-bottom: 12px;
      .el-input {
        width: 170px;
        .el-input__inner {
          width: 100%;
        }
      }
    }
    .addr {
      width: 100%;
      .el-input {
        width: 840px;
      }
    }
  }
  .optionColumn {
    box-sizing: border-box;
    width: 1000px;
    padding: 20px;
    background-color: #f4f9ff;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .el-form-item {
      width: 33.3333%;
      .el-input {
        width: 170px;
        .el-input__inner {
          width: 100%;
        }
      }
    }
  }
  .form-option {
    width: 1000px;
    margin-top: 20px;
    .submit {
      width: 100%;
      text-align: center;
    }
  }
  .el-form-item__content {
    margin: 0 !important;
  }
}
</style>