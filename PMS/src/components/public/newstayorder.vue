<template>
  <div class="new-stay">
    <div class="contain">
      <header class="clearfix">
        <p class="fl">办理入住</p>
				<span @click="letNewStayNone" class="fr spa">×</span>
      </header>
      <div class="text">
        <p class="cursor"> 操作员：{{curUser.name}}</p>
        <p style="fontSize: 16px;">入住信息</p>
        <p class="mgt-26">
          <span style="marginRight: 50px;">房型：</span>
          <span>001</span>
        </p>
        <p class="mgt-26">
          <span style="marginRight: 36px;">房间号：</span>
          <span style="margin-right: 10px;">001</span><span>001房间</span>
        </p>
        <div style="margin-top: 18px;marginLeft:-12px;">
          <span class="red">*</span>
          <span style="marginRight: 23px;">客户类型：</span>
          <el-select v-model="manListStr" size="mini">
            <el-option v-for="item in manListArr" :key="item.type" :label="item.name" :value="item.type">
            </el-option>
          </el-select>
          <span v-if="manListStr == 1" @click="letCheckMemberShow" style="marginLeft: 10px;cursor:pointer;">选择会员</span>
        </div>
        <div v-if="manListStr == 1" class="test-box">
          <div style="marginBottom: 8px;">
            <p style="marginBottom: 18px;">
              <span>会员姓名：</span>
              <span>{{saveMemberMsg.name}}</span>
            </p>
            <p style="marginBottom: 18px;">
              <span>会员卡号：</span>
              <span>{{saveMemberMsg.card_number}}</span>
            </p>
            <p>
              <span>会员等级：</span>
              <span>{{saveMemberMsg.card_level_name}}</span>
            </p>
          </div>
        </div>
        <div style="margin-top: 18px;marginLeft:-12px;">
          <span class="red">*</span>
          <span style="marginRight: 23px;">入住类型：</span>
          <span :class="{'hour-room-active': !isHourRoom}" class="middle hour-room">全日租</span>
          <span class="middle hour-room">钟点房</span>
        </div>
        <p style="margin-top: 18px;marginLeft:-12px;">
          <span class="red">*</span>
          <span style="marginRight: 22px;">入离日期：</span>
          <el-date-picker :disabled="true" value-format="yyyy-MM-dd HH:mm:ss" size="mini" type="datetime" :value="[taday,nowTime].join(' ')"></el-date-picker>
          <span style="margin: 0 12px;">至</span> 
          <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" size="mini" type="datetime" v-model="dateValue" :picker-options="pickerOptions"></el-date-picker>
          <span @click="deleOneDay" style="fontSize: 22px;margin: 0 12px;position:relative;" class="el-icon-remove-outline middle"></span>
          <span class="middle">{{stayHowManyDay}}</span>
          <span @click="addOneDay" style="margin: 0 12px;" class="el-icon-circle-plus check-sex middle"></span>
        </p>
        <div style="margin-top: 18px;marginLeft:-12px;">
          <span class="red">*</span>
          <span style="marginRight: 22px;">单日房费：</span>
          <input v-model="roomPrice" style="marginRight: 40px;width: 178px; height: 28px;border: 1px solid #e6e6e6;borderRadius: 4px;" type="text">
        </div>
        <p class="line"></p>
        <p style="fontSize: 16px;margin-bottom: 16px;">住客信息：</p>
        <div class="message">
          <ul>
            <li>
              <p>
                <span class="red">*</span>
                <span>住客姓名：</span>
                <input v-model="peopleJson.name" style="width: 178px; height: 28px;border: 1px solid #e6e6e6;borderRadius: 4px;marginRight:106px;" type="text">
                <span style="marginRight: 26px;">性别：</span>
                <span @click="peopleJson.sex = '男'">
                  <span :class="peopleJson.sex =='男'?'el-icon-circle-check check-sex middle':'yuan'"></span>
                  <span style="marginLeft:14px;marginRight:56px;">男</span>
                </span>
                <span @click="peopleJson.sex = '女'">
                  <span :class="peopleJson.sex =='女'?'el-icon-circle-check check-sex middle':'yuan'"></span>
                  <span style="marginLeft:14px;">女</span>
                </span>
              </p>
            </li>
            <li style="margin: 20px 0;">
              <p>
                <span class="red">*</span>
                <span>证件类型：</span>
                <el-select style="marginRight:106px;" v-model="peopleJson.certificate_type" size="mini">
                  <el-option v-for="item in cardtypeArr" :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
                <span style="position: relative;">
                  <span class="red">*</span>
                  <span style="marginRight: 6px;">证件号：</span>
                  <input @blur="checkPeopleId(peopleJson.idcard)" v-model="peopleJson.idcard" style="width: 356px; height: 28px;border: 1px solid #e6e6e6;borderRadius: 4px;" type="text">
                  <span style="position: absolute;bottom: -22px;left: 78px; color: red;">{{peopleIdErrorText}}</span>
                </span>
              </p>
            </li>
            <li>
              <p>
                <span style="position: relative;">
                  <span class="red">*</span>
                  <span>手机号码：</span>
                  <input @blur="checkPhone(peopleJson.mobile)" v-model="peopleJson.mobile" style="width: 178px;marginRight:106px;height: 28px;border: 1px solid #e6e6e6;borderRadius: 4px;" type="text">
                  <span style="position: absolute;bottom: -22px;left: 88px; color: red;">{{phoneErrorText}}</span>
                </span>
                <span style="position: relative;">
                  <span style="marginRight: 2px;">会员卡号：</span>
                  <input @blur="checkCardNumber(peopleJson.member_num)" v-model="peopleJson.member_num" style="width: 178px; height: 28px;border: 1px solid #e6e6e6;borderRadius: 4px;" type="text">
                  <span @click="beMember" class="middle ico">
                    <span style="font-size: 40px;margin-top: -6px;margin-left: -8px;" class="iconfont icon-tianjialianxiren middle"></span>
                  </span>
                  <span style="position: absolute;bottom: -22px;left: 78px; color: red;">{{cardNumberErrorText}}</span>
                </span>
              </p>
            </li>
          </ul>
          <p v-show="isPeopleMessageError" style="color: red;textAlign:center;margin:10px 0;">有必选项未填写</p>
          <p style="textAlign: right;">
            <span style="cursor: pointer;color:#437ff9;" @click="addOnePeople">
              <span class="el-icon-plus"></span>
              <span>新增入住人</span>
            </span>
          </p>
        </div>
        <table style="border-color:#f2f2f2;marginTop: 10px;" border="1">
          <tbody>
            <tr style="background: #f4f8ff;">
              <td colspan="2">姓名</td>
              <td colspan="2">性别</td>
              <td colspan="3">证件类型</td>
              <td colspan="4">证件号</td>
              <td colspan="3">手机号</td>
              <td colspan="2">会员卡号</td>
              <td colspan="2">操作</td>
            </tr>
            <tr v-for="(item,index) in howManyMan" :key="index">
              <td colspan="2">{{item.name}}</td>
              <td colspan="2">{{item.sex | sexName}}</td>
              <td colspan="3">身份证</td>  <!-- {{item.certificate_type_name}} -->
              <td colspan="4">{{item.idcard}}</td>
              <td colspan="3">{{item.mobile}}</td>
              <td colspan="2">{{item.member_num}}</td>
              <td @click="deleHowManyMan(index)" style="cursor:pointer;" class="red" colspan="2">删除</td>
            </tr>
          </tbody>
        </table>
        <div style="display:flex;lineHeight: 56px;margin: 20px 0;" class="beizhu">
          <p style="width: 56px;" class="middle">备注</p>
          <textarea v-model="peopleRemark" style="flex: 1;height: 56px;border: 1px solid #e6e6e6;borderRadius: 4px;"></textarea>
        </div>
      </div>
      <nav class="shadow"></nav>
      <div v-show="isLeakage" style="width: 200px;textAlign:center;margin: 0 auto;color: red;">有必填项没有填写</div>
      <footer>
        <div style="width: 220px;margin:0 auto;" class="clearfix">
          <p @click="letNewStayNone" class="fl">关闭</p>
          <p class="fr" style="color:#fff;background: #437ff9;">提交</p>
        </div>
      </footer>
    </div>
    <stay-money @letStayMoneyNOne="setStayMoneyNOne" :val="msgForMoney" v-if="isMOneyShow"></stay-money> <!--收钱-->
    <check-member @checkMemberNone="letCheckMemberNone" v-if="isCheckMemberShow"></check-member>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import API from "@/store/API"
import stayMoney from "@/components/public/staymoney"
import checkMember from "@/components/public/checkmember"
  export default {
    name: 'newStayOrder',
    props: ['msg','orderType'],
    data () {
      return {
        phoneErrorText: '',
        peopleIdErrorText: '',
        cardNumberErrorText: '',
        roomPrice: '',
        isMOneyShow: false,
        saveMemberMsg: {},  //   会员列表返回的数据
        isCheckMemberShow: false,
        manListStr: '',
        manListArr: [],
        isHourRoom: false,
        dateValue: '', //  离开日期
        stayHowManyDay: 0,
        taday: '',
        nowTime: '',
        cardtypeArr: [],      //身份证
        isPeopleMessageError: false,
        peopleJson: {
					name: '',
					sex: '男',
					mobile: '',
					idcard: '',
					member_num: '',
					certificate_type: '' // 证件类型
        },
        howManyMan: [],
        peopleRemark: '',
        isLeakage: false,
        pickerOptions: {
					disabledDate(time) {
						return time.getTime() < (Date.now() - 24*60*60*1000)
					}
        }
      }
    },
    methods: {
      getUserType() {
        API.get("/pms/usertype").then(res => {
          if (res.error_code == 0) {
            this.manListArr = res.data
            this.manListStr= this.manListArr[0].type
          }
        })
      },
      letCheckMemberShow() {
        this.isCheckMemberShow = true
      },
      letCheckMemberNone(e) {
        this.isCheckMemberShow = false
        if (e) {
          this.saveMemberMsg = {...e}
        }
      },
      checkPeopleId(e) {
				if(e.length == 0){return this.peopleIdErrorText = ''}
        let reg = /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/
				reg.test(e)? this.peopleIdErrorText = '' : this.peopleIdErrorText = '请输入正确的身份证号码'
      },
      checkPhone(e) {
        if (e.length == 0){return this.phoneErrorText = ''}
        let reg = /^1\d{10}$/;
        reg.test(e)? this.phoneErrorText = '' : this.phoneErrorText = '请输入正确的手机号码'
      },
      checkCardNumber(e) {
        if (e.length == 0){return}  // && isPostAll 价格判断条件是不是  post 提交所有的时候
          let reg = /^[a-zA-Z\d]+$/
          reg.test(e)?this.cardNumberErrorText = '': this.cardNumberErrorText = '请输入正确的会员号码'
      },
      addOnePeople() {
				if(this.peopleJson.name == '' || this.peopleJson.certificate_type == '' || this.peopleJson.mobile == '' || this.peopleJson.idcard == ''){
					return this.isPeopleMessageError = true
				}
				this.isPeopleMessageError = false;
				if(this.cardNumberErrorText != '' && this.peopleIdErrorText != '' && this.phoneErrorText != ''){return}
        let obj = {...this.peopleJson}
        if (typeof obj.certificate_type == 'number') {
          this.cardtypeArr.forEach((e,i)=>{
            if(e.id == obj.certificate_type) {
              obj.certificate_type_name = e.name
            }
          })
        } else if (typeof obj.certificate_type == 'string') {
          obj.certificate_type_name = obj.certificate_type
        }
				this.howManyMan.push(obj)
				this.peopleJson.name = ''
				this.peopleJson.sex = '男'
				this.peopleJson.certificate_type = ''
				this.peopleJson.idcard = ''
				this.peopleJson.mobile = ''
				this.peopleJson.member_num = ''
			},
      letNewStayNone() {
        this.$emit('letNewStayNone')
      },
      addOneDay() {
				if(this.stayHowManyDay < 28) {
					this.stayHowManyDay++
					let mydate = new Date()
					let year = mydate.getFullYear()
					let month = Math.floor(mydate.getMonth())
					let date = mydate.getDate()   
					let days = new Date(year, month + 1, 0).getDate()
					let newdate;
					if((Math.floor(date) + Math.floor(this.stayHowManyDay)) > Math.floor(days)) {
						month = (month + 2) < 10 ? '0' + (month + 2) :(month + 2)
						if(Math.floor(month) <= 12) {
							newdate = Math.floor(this.stayHowManyDay) - (Math.floor(days) - Math.floor(date))
							newdate = newdate < 10? '0' + newdate : newdate
							this.dateValue = `${year}-${month}-${newdate}${' ' + this.hotel.leave_time}`
						}else{
							year = Math.floor(mydate.getFullYear()) + 1
							month = '01'
							newdate = Math.floor(this.stayHowManyDay) - (Math.floor(days) - Math.floor(date))
							newdate = newdate < 10? '0' + newdate : newdate
							this.dateValue = `${year}-${month}-${newdate}${' ' + this.hotel.leave_time}`
						}
					}else{
						newdate =  (Math.floor(date) + Math.floor(this.stayHowManyDay))
						this.dateValue = `${year}-${month + 1 < 10?'0'+(month + 1):month + 1}-${newdate < 10?'0'+newdate:newdate}${' ' + this.hotel.leave_time}`
					}
				}
			},
			deleOneDay() {
				if (this.stayHowManyDay > 1) {
					this.stayHowManyDay--
					let mydate = new Date()
					let year = mydate.getFullYear()
					let month = mydate.getMonth()
					let date = mydate.getDate()   
					let days = new Date(year, month + 1, 0).getDate()
					let newdate;
					if((Math.floor(date) + Math.floor(this.stayHowManyDay)) > Math.floor(days)) {
						month = (Math.floor(month) + 2) < 10 ? '0' + (Math.floor(month) + 2) :(Math.floor(month) + 2)
						if(Math.floor(month)<=12) {
							newdate = Math.floor(this.stayHowManyDay) - (Math.floor(days) - Math.floor(date))
							newdate = newdate < 10? '0' + newdate : newdate
							this.dateValue = `${year}-${month}-${newdate}${' ' + this.hotel.leave_time}`
						}else{
							year = Math.floor(mydate.getFullYear()) + 1
							month = '01'
							newdate = Math.floor(this.stayHowManyDay) - (Math.floor(days) - Math.floor(date))
							newdate = newdate < 10? '0' + newdate : newdate
							this.dateValue = `${year}-${month}-${newdate}${' ' + this.hotel.leave_time}`
						}
					}else{
						newdate =  (Math.floor(date) + Math.floor(this.stayHowManyDay))
						this.dateValue = `${year}-${month + 1<10?'0'+(month + 1):month + 1}-${newdate < 10?'0'+newdate:newdate}${' ' + this.hotel.leave_time}`
					}
				}
      },
      getDateNow() {
				let mydate = new Date()
				let year = mydate.getFullYear()
				let month = (mydate.getMonth() + 1) < 10 ? '0' + (mydate.getMonth() + 1) : mydate.getMonth() + 1
				let date = mydate.getDate() < 10 ? '0' + mydate.getDate() : mydate.getDate()
				let taday = `${year}-${month}-${date}`
				let hour = mydate.getHours()
				let minutes = mydate.getMinutes()
				let seconds = mydate.getSeconds();
				this.taday = taday;
				this.nowTime = `${hour<10?'0'+hour:hour}:${minutes<10?'0'+minutes:minutes}:${seconds<10?'0'+seconds:seconds}`
        this.dateValue = [taday, this.hotel.leave_time].join(' '); //`${hour<10?'0'+hour:hour}:${minutes<10?'0'+minutes:minutes}:${seconds<10?'0'+seconds:seconds}`
        this.addOneDay()
      },
      beMember() {
				this.$router.push("/container/addMember")
			},
    },
    filters: {
      sexName(sex) {
        if (typeof sex == 'number') {
          if (sex == 0) {
            return '男'
          } else {
            return '女'
          }
        } else {
          return sex
        }
      }
    },
    computed: {
			...mapGetters({
        hotel:'currHotel',
        curUser: 'user'
      })
		},
    components: {
      stayMoney,
      checkMember
    },
    created() {
      this.getDateNow()
      this.getUserType()
    }
  }
</script>

<style lang="scss" scoped>
  .new-stay{
    position: fixed;
		top: 0; left: 0; right: 0; bottom: 0;
		background: rgba(0,0,0,.4);
		font-size: 14px;
		z-index: 666;
    display: flex;
    align-items:center;
    justify-content: center;
    .red{
      color:red;
    }
    .contain{
			width: 1000px;
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
      position: absolute;
      top: 96px;right: 52px;
      width: 224px;
      height: 120px;
      box-sizing: border-box;
      background: #f4f9ff;
      margin-top:10px;
      padding: 22px 0 22px 15px;
    }
    .mgt-26{
      margin-top: 26px;
    }
    .mgl-14{
      margin-left: 14px;
    }
    .hour-room{
      width: 60px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      cursor: pointer;
      background: #e6e6e6;
      margin-right: 14px;
    }
    .text{
      max-height: 500px;
			overflow-y: auto;
      box-sizing: border-box;
      padding: 20px 50px 0 50px;
      .hour-room-active{
        background: #fcdc6d;
      }
    }
    .cursor{
      width: 100%;
      text-align: right;
    }
    .line{
      width: 100%;
      border-bottom: 1px solid #f2f2f2;
      margin: 24px 0;
    }
    .message{
      box-sizing: border-box;
      padding: 24px 15px 15px 20px;
      background: #fafafa;
    }
    table{
      table-layout:fixed;
      word-break:break-all;
    }
    td{
      height: 40px;
      text-align: center;
      word-wrap: break-word;
    }
    .yuan{
      display: inline-block;
      vertical-align: middle;
      width: 20px;height: 20px;
      border: 1px solid #eaeaea;
      border-radius: 50%;
    }
    .check-sex{
      font-size: 22px;
      color: #437ff9;
    }
    .shadow{
      width: 100%;
      border-bottom: 6px solid #f6f6f6;
      box-shadow: 0 -6px 6px #fff
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
    .ico{
			width: 26px;
			height: 26px;
			margin-left: 10px;
			color: #6a9df6;
			cursor: pointer;
		}
  }
</style>

