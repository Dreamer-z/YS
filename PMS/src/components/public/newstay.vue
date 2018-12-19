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
          <span>{{roomMsg.room_type_name || total.room_type_name}}</span>
        </p>
        <p v-if="msg" class="mgt-26">
          <span style="marginRight: 36px;">房间号：</span>
          <span style="margin-right: 10px;">{{msg.value.buildName}}</span><span>{{roomMsg.name}}房间</span>
        </p>
        <p v-else-if="orderType" class="mgt-26">
          <span style="marginRight: 36px;">房间号：</span>
          <span style="margin-right: 10px;">{{orderType.room_name}}</span> <!-- </span><span>{{roomMsg.name}}房间 -->
        </p>
        <div style="margin-top: 18px;marginLeft:-12px;">
          <span class="red">*</span>
          <span style="marginRight: 22px;">单日房费：</span>
          <input v-model="roomPrice" style="marginRight: 40px;width: 178px; height: 28px;border: 1px solid #e6e6e6;borderRadius: 4px;" type="text">
          <!-- <span style="marginRight: 12px;">客户类型：</span>
          <el-select :disabled="orderType?true:false" @change="checkFromWay(fromWay)" v-model="fromWay" size="mini">
            <el-option v-for="item in wayList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
          <span v-show="isMember" style="marginLeft: 40px;">
            <span>会员号:</span>
            <input v-model="memberNum" style="width: 178px;marginLeft: 10px; height: 28px;border: 1px solid #e6e6e6;borderRadius: 4px;" type="text">
            <span @click="getMemberDiscount(memberNum)" style="font-size: 26px;cursor:pointer;" class="iconfont icon-sousuo middle"></span>
          </span>
          <span v-show="isAgreementUnit" style="marginLeft: 40px;">
            <span>协议单位:</span>
            <el-select @change="getagreementUnit(agreementUnit)" v-model="agreementUnit" style="marginLeft: 10px;" size="mini">
              <el-option v-for="item in agreementUnitArr" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </span> -->
        </div>
        <div style="margin-top: 18px;marginLeft:-12px;">
          <span class="red">*</span>
          <span style="marginRight: 23px;">客户类型：</span>
          <el-select :disabled="orderType?true:false" @change="checkFromWay(fromWay)" v-model="fromWay" size="mini">
            <el-option v-for="item in wayList" :key="item.type" :label="item.name" :value="item.type">
            </el-option>
          </el-select>
          <span v-if="fromWay == 1" @click="letCheckMemberShow" style="marginLeft: 10px;cursor:pointer;">选择会员</span>
        </div>
        <div v-if="fromWay == 1" class="test-box">
          <div style="marginBottom: 8px;">
            <p style="width:192px;" class="middle">
              <span>会员姓名：</span>
              <span>{{saveMemberMsg.name}}</span>
            </p>
            <p style="width:250px;" class="middle">
              <span>会员卡号：</span>
              <span>{{saveMemberMsg.card_number}}</span>
            </p>
            <p class="middle">
              <span>会员等级：</span>
              <span>{{saveMemberMsg.card_level}}</span>
            </p>
          </div>
        </div>
        <div style="margin-top: 18px;marginLeft:-12px;">
          <span class="red">*</span>
          <span style="marginRight: 23px;">入住类型：</span>
          <span :class="{'hour-room-active': !isHourRoom}" class="middle hour-room">全日租</span>
          <span class="middle hour-room">钟点房</span>
        </div>
        <p v-if="msg" style="margin-top: 18px;marginLeft:-12px;">
          <span class="red">*</span>
          <span style="marginRight: 22px;">入离日期：</span>
          <el-date-picker :disabled="true" value-format="yyyy-MM-dd HH:mm:ss" size="mini" type="datetime" :value="[taday,nowTime].join(' ')"></el-date-picker>
          <span style="margin: 0 12px;">至</span> 
          <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" size="mini" type="datetime" v-model="dateValue" :picker-options="pickerOptions"></el-date-picker>
          <span @click="deleOneDay" style="fontSize: 22px;margin: 0 12px;position:relative;" class="el-icon-remove-outline middle"></span>
          <span class="middle">{{stayHowManyDay}}</span>
          <span @click="addOneDay" style="margin: 0 12px;" class="el-icon-circle-plus check-sex middle"></span>
        </p>
        <p v-else-if="orderType" style="margin-top: 18px;marginLeft:-12px;pointerEvents: none;">
          <span class="red">*</span>
          <span style="marginRight: 22px;">入离日期：</span>
          <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" size="mini" type="datetime" :value="total.come_time"></el-date-picker>
          <span style="margin: 0 12px;">至</span> 
          <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" size="mini" type="datetime" :value="total.leave_time"></el-date-picker>
          <span @click="deleOneDay" style="fontSize: 22px;margin: 0 12px;position:relative;" class="el-icon-remove-outline middle"></span>
          <span class="middle">{{stayHowManyDay}}</span>
          <span @click="addOneDay" style="margin: 0 12px;" class="el-icon-circle-plus check-sex middle"></span>
        </p>
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
          <p @click="givePost" class="fr" style="color:#fff;background: #437ff9;">提交</p>
        </div>
      </footer>
    </div>
    <stay-money @letStayMoneyNOne="setStayMoneyNOne" :val="msgForMoney" v-if="isMOneyShow"></stay-money>
    <check-member @checkMemberNone="letCheckMemberNone" v-if="isCheckMemberShow"></check-member>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import API from "@/store/API"
import stayMoney from "@/components/public/staymoney"
import checkMember from "@/components/public/checkmember"
  export default {
    name: 'newStay',
    props: ['msg','orderType'],
    data () {
      return {
        saveMemberMsg: {},
        isCheckMemberShow: false,
        isHourRoom: false,
        isLeakage:false,
        msgForMoney: {},
        peopleRemark: '',
        isPeopleMessageError: false,
        cardNumberErrorText: '',
        phoneErrorText: '',
        peopleIdErrorText: '',
        agreementUnit: '',
        memberNum: '',
        fromWay: '',
        wayList: [], // keyuan leixing
        stayHowManyDay: 0,
        pickerOptions: {
					disabledDate(time) {
						return time.getTime() < (Date.now() - 24*60*60*1000)
					}
				},
        dateValue: '',
        nowTime: '',
				taday: '',
        isMOneyShow: false,
        roomPrice: '',
        agreementUnitArr: [], //xieyidanwei
        cardtypeArr: [], //shenfenzhen
        isMember: false,
        isAgreementUnit: false,
        roomMsg: {
          name: '',//	string	房间名
          room_type_name: '',//	int	房型名称
          price: '',//	float	房型价格
          floor_num: '',//	int:	楼层号
          people_num: '',//	int	可住人数
          deposit: '',//	int	押金
        },
        peopleJson: {
					name: '',
					sex: '男',
					mobile: '',
					idcard: '',
					member_num: '',
					certificate_type: '' // 证件类型
        },
        howManyMan: [],
        snap_id: '',
        member_id: '',
        total: {},
        member_id: 0,
        partner_id: 0
      }
    },
    watch: {
      fromWay(newval) {
        if (newval === 0) {
          let obj = {
            id: this.hotel.id, 
            userType: newval, 
            start: this.taday, 
            end: this.dateValue.split(' ')[0], 
            roomTypeIds: [this.roomMsg.room_type_id], 
            memberIds: [],
          }
          API.post("/pms/price/search", obj).then(res => {
            console.log(res)
          }) 
        } else if (newval === 1) {

        }
      }
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
    methods: {
      letCheckMemberShow() {
        this.isCheckMemberShow = true
      },
      letCheckMemberNone(e) {
        this.isCheckMemberShow = false
        if (e) {
          this.saveMemberMsg = {...e}
        }
      },
      setStayMoneyNOne(e) {
        this.isMOneyShow = false
        if (e) {
          // this.msg
          if (this.msg) {
            e.floorIndex = this.msg.Index
            e.roomIndex = this.msg.index
            this.$emit('letNewStayNone',e)
          } else if (this.orderType) {
            this.$emit('letNewStayNone',e)
          }
        } 
      },
      givePost() {
				if(this.fromWay == '') {return this.isLeakage = true} //this.stayHowManyDay < 1
				this.isLeakage = false;
				if (this.msg) {
          if (typeof this.fromWay == 'string') {
            this.wayList.forEach((e,i) => {
              if (e.name == this.fromWay) {
                this.fromWay = e.type
              }
            })
          }
          var obj = {
            hotel_id: this.hotel.id,
            room_id: this.roomMsg.id,
            come_time: [this.taday,this.nowTime].join(' '),
            leave_time: this.dateValue,
            total_count: 1,
            remark: this.peopleRemark,
            from: this.fromWay,
            // pay_way: this.price,
            // sum: this.amountCollected,
            // order_type: this.hourRoom?2:1,
            member_num: this.memberNum
            //,member_id	否	int	会员id
          }
        } else if (this.orderType) {
          var obj = {
            "preorder_id": this.total.id,
            "hotel_id": this.total.hotel_id,
            "room_id": this.total.room_id,
            "remark": this.total.remark,
            // "pay_way": this.priceWay,
            // "sum": this.amountCollected,
            "snap_id": this.snap_id
          }
        }
        if (this.orderType) {
          obj.come_time = this.total.come_time
          obj.leave_time = this.total.leave_time
        }
				if (obj.come_time == obj.leave_time) {
					this.$alert('入住和离店时间不能一样', '', {
	          confirmButtonText: '确定'
	        });
	        return
				}
				if (this.howManyMan.length) {
					obj.customer = this.howManyMan
				} else {
					if(this.peopleJson.name == '' || this.peopleJson.certificate_type == '' || !this.peopleIdErrorText == '' || !this.phoneErrorText == '' || this.peopleJson.mobile == '' || this.peopleJson.idcard == '') {
						this.$alert('请填写入住人信息', '', {
		          confirmButtonText: '确定'
		        });
		        return
					}
				}
				if(this.peopleJson.name != '' && this.peopleJson.certificate_type != '' && this.peopleJson.mobile != '' && this.peopleJson.idcard != ''){
          let o = {...this.peopleJson}
          if (typeof o.certificate_type == 'number') {
            this.cardtypeArr.forEach((e,i)=>{
              if(e.id == o.certificate_type) {
                o.certificate_type_name = e.name
              }
            })
          } else if (typeof o.certificate_type == 'string') {
            o.certificate_type_name = o.certificate_type
          }

					// this.cardtypeArr.forEach((e,i)=>{
					// 	if(e.id == o.certificate_type) {
					// 		o.certificate_type_name = e.name
					// 	}
					// })
					if (this.howManyMan.length) {
						this.howManyMan.push(o)
					  obj.customer = this.howManyMan
					} else {
            this.howManyMan = [o]
            obj.customer = this.howManyMan
						// obj.customer = [o]
					}
					this.peopleJson.name = ''
					this.peopleJson.certificate_type = ''
					this.peopleJson.mobile = ''
          this.peopleJson.idcard = ''
          this.peopleJson.member_num = ''
				}
				if(obj.customer.length > this.roomMsg.people_num) {
					this.$alert('入住人数超过房型标准', '操作提示', {
            confirmButtonText: '确定'
          })
					return
				}
				obj.customer.forEach((e,i)=>{
					e.sex == '男'?e.sex = 0:e.sex = 1
        })
        if (this.msg) {
          obj.member_id = this.member_id
          obj.partner_id = this.partner_id
          let o = {...this.roomMsg}
          o.price = this.roomPrice
          this.msgForMoney = {
            object: obj,
            room: o,
            days: this.stayHowManyDay,
            status: 0
          }
          this.isMOneyShow = true
        } else if (this.orderType) {
          this.msgForMoney = {
            object: obj,
            room: {...this.total},
            days: this.stayHowManyDay,
            status: 1,
          }
          this.isMOneyShow = true
        }
			},
      deleHowManyMan(i) {
				this.howManyMan.splice(i, 1)
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
      getCardtypeArr() {
				API.getCardtypeArr().then(res=>{
					if (res.error_code == 0) {
						this.cardtypeArr = res.data
					}
				})
			},
      // getagreementUnit(e) {
			// 	if (e.length == 0) {return}
			// 	this.agreementUnitArr.forEach((v,i)=>{
			// 		if(v.id == e) {
      //       this.roomPrice = Number(this.roomMsg.price) * Number(v.discount)
      //       this.partner_id = e
			// 		}
			// 	})
      // },
      getMemberDiscount(e) {
				if (e.length == 0) {return}
        API.get(`/pms/order/member_discount?number=${e}&room_id=${this.msg.value.id}`).then(res => {
          if (res.error_code == 0) {
            this.roomPrice = res.data.room_price
            this.member_id = res.data.member_id
          } else {
            if (res.msg) {
			  			this.$message.error(`${res.msg}`)
			  		}
          }
        })
      },
      beMember() {
				this.$router.push("/container/addMember")
			},
      checkFromWay(e) {
        this.memberNum = ''  
        this.agreementUnit = ''
        switch(e) {
          case 1:       //小程序
            this.isAgreementUnit = false;
            this.isMember = false;
            this.roomPrice = this.roomMsg.price
            break;
          // case 2:       //门店
          //   this.isMember = false;
          //   this.isAgreementUnit = false;
          //   this.roomPrice = this.roomMsg.price
          //   break;
          case 2:       //  会员
            this.isAgreementUnit = false;
            this.isMember = true;
            this.roomPrice = ''
            break;
            case 3:      // 协议
            this.isMember = false;
            this.isAgreementUnit = true;
            this.roomPrice = ''
            break;
          default:
        }
      },
      getagreementUnitArr() { //  xieyidanwei
				API.getagreementUnitArr(this.hotel.id).then(res=>{
					if (res.error_code == 0) {
						this.agreementUnitArr = res.data
					}
				})
			},
      letNewStayNone() {
        this.$emit('letNewStayNone')
      },
      getWayList() {
				// API.getFromWayList().then(res => {
				// 	let arr = res.data
        //   this.wayList = res.data.splice(1,arr.length)
        //   this.fromWay = this.wayList[0].name
        // })
        API.get("/pms/usertype").then(res => {
          if (res.error_code == 0) {
            this.wayList = res.data
            // this.fromWay = this.wayList[0].type
          }
        })
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
      checkCardNumber(e) {
        if (e.length == 0){return}  // && isPostAll 价格判断条件是不是  post 提交所有的时候
          let reg = /^[a-zA-Z\d]+$/
          reg.test(e)?this.cardNumberErrorText = '': this.cardNumberErrorText = '请输入正确的会员号码'
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
    },
    components: {
      stayMoney,
      checkMember
    },
    created() {
      // console.log('0007007007',this.hotel)
      this.getCardtypeArr()
      this.getagreementUnitArr()
      this.getDateNow()
      this.getWayList()
      if (this.msg) {
        this.addOneDay()
        API.bestayCreated(this.msg.value.id).then(res=>{
          if (res.error_code == 0) {
            this.roomMsg = res.data
            // this.roomPrice = this.roomMsg.price
          }
        })
      } else if (this.orderType){
          // bus.ev.$on('willBeOrderBestay', (e)=>{
          console.log('willBeOrderBestay',this.orderType)
          let e = this.orderType
          this.snap_id = e.id
          this.member_id = e.member_id
          API.get(`/pms/order/preorder?preorder_id=${e.preorder_id}&room_id=${e.room_id}&snap_id=${e.id}`).then(res=>{
            // console.log(res)
            if (res.error_code == 0) {
              let data = res.data
              this.total = data
              this.roomPrice = data.price
              this.fromWay = data.from_name
              this.stayHowManyDay = data.days
              this.roomMsg.people_num = data.people_num
              if (this.total.member.length > 0) {
                if (this.total.member.length == 1) {
                  this.peopleJson.name = this.total.member[0].name
                  this.peopleJson.sex = this.total.member[0].sex?this.total.member[0].sex:'男'
                  this.peopleJson.certificate_type = this.total.member[0].certificate_type
                  this.peopleJson.member_num = this.total.member[0].member_num?this.total.member[0].member_num:''
                  this.peopleJson.idcard = this.total.member[0].idcard
                  this.peopleJson.mobile = this.total.member[0].mobile
                } else {
                  this.peopleJson.name = this.total.member[0].name
                  this.peopleJson.sex = this.total.member[0].sex?this.total.member[0].sex:'男'
                  this.peopleJson.certificate_type = this.total.member[0].certificate_type
                  this.peopleJson.member_num = this.total.member[0].member_num?this.total.member[0].member_num:''
                  this.peopleJson.idcard = this.total.member[0].idcard
                  this.peopleJson.mobile = this.total.member[0].mobile
                  this.howManyMan = this.total.member.splice(1,this.total.member.length-1)
                }
              }
            } else {
              if (res.msg) {
                this.$message.error(`${res.msg}`)
              }
              // this.letNewStayNone()
            }
          })
          // this.getDateNow()
          // this.getWayList()
          // this.getPayway()
          // this.getagreementUnitArr()
          // this.getOrderType()
          // this.getCardtypeArr()
        // })
      }
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
    .red{
      color:red;
    }
    .contain{
			width: 1020px;
			max-height: 80%;
			overflow-y: auto;
			position: absolute;
			background: #fff;
			top: 10%;
			left: 25%;
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
      margin-left: 96px;
      margin-top:10px;
      box-sizing: border-box;
      padding: 14px 16px 6px;
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
      // max-height:10%;
			// overflow-y: auto;
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

