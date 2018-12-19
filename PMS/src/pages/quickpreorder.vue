<template>  <!-- 快速预定 -->
	<div @click="setIndex" class="batch-reservation" v-loading="orderLoading" element-loading-text="操作进行中" element-loadig-spinner="el-icon-loading" element-loading-background="rgba(0,0,0,.4)">
		<div class="whitetext">
		  <ul class="list">
		  	<li class="title">基本信息</li>
        <li v-show="isFillInAll" style="color: red; position: absolute; top: 0;left: 50%; margin-left: -56px;font-size: 16px;">有必填项没有填写</li>
		  	<li class="one">
		  		<nav style="margin-right: 260px;" class="middle">
            <p style="width: 113px;" class="middle">
              <span class="mar-right4">*</span>
              <span>预订人：</span>
            </p>
		  			<!-- <input v-model="headjson.reservations" style="width: 198px;" class="middle" type="text"> -->
            <el-input style="width: 198px;" size="small" class="middle" type="text" v-model="headjson.reservations"></el-input>
		  		</nav>
		  		<section class="middle">
		  			<span class="middle">预订手机：</span>
		  			<!-- <input @blur="checkPhone(headjson.reservationPhone)" v-model="headjson.reservationPhone" style="width: 198px;" class="middle" type="number"> -->
            <el-input @blur="checkPhone(headjson.reservationPhone)" style="width: 198px;" size="small" class="middle" type="number" v-model="headjson.reservationPhone"></el-input>
            <span style="color: red;">{{phoneErrorText}}</span>
		  		</section>
		  	</li>
        <li class="three">
		  		<nav class="middle">
            <p style="width: 113px;" class="middle">
              <span class="mar-right4">*</span>
              <span>入住时间：</span>
            </p>
		  			<el-date-picker @change="getStartDateTime" value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptions" size="small" style="width:200px;" type="datetime" v-model="headjson.startDateTime">
						</el-date-picker>
		  		</nav>
          <el-input-number style="margin:0 55px;" v-model="stayHowManyDay" @change="handleChange" :min="1" size="small"></el-input-number>
		  		<nav class="middle">
            <span style="margin-right: 4px;" class="middle red">*</span>
		  			<span class="middle">离店时间：</span>
		  			<el-date-picker @change="countHowManyDay" :default-time="hotel.leave_time" value-format="yyyy-MM-dd HH:mm:ss" size="small" style="width:200px;" :picker-options="pickerOptions" type="datetime" v-model="headjson.endDateTime">
						</el-date-picker>
            <span style="color: red;">{{dateTimeErrorText}}</span>
		  		</nav>
		  	</li>
		  	<li class="two">
		  		<nav style="margin-right: 42px;" class="middle">
            <p style="width: 113px;" class="middle">
              <span class="mar-right4">*</span>
              <span>客户类型：</span>
            </p>
			  		<el-select v-model="headjson.reservationWay" @change="letTotalRoomManyArrNone" style="width:200px;" size="small" filterable placeholder="请选择">
					    <el-option
					      v-for="item in sourceChannelArr" 
					      :key="item.type"
					      :label="item.name"
					      :value="item.type">
					    </el-option>
					  </el-select>
            <p v-if="headjson.reservationWay == 1" @click="letCheckMemberShow" style="marginLeft:10px;cursor: pointer;" class="middle">
              <span style="color: #437ff9;">选择会员</span>
            </p>
		  		</nav>
          <div v-if="headjson.reservationWay == 1" class="test-box">
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
		  	</li>
		  	<li class="four">
		  		<nav style="width: 564px;" class="middle">
            <p style="width: 113px;" class="middle">
              <span class="mar-right4">*</span>
              <span>房型：</span>
            </p>
		  			<el-select @change="checkDateTime(headjson)" v-model="headjson.roomType" style="width:200px;" size="small" filterable placeholder="请选择">
              <el-option
                v-for="item in roomTypeArr"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
		  		</nav>
		  		<nav class="middle">
            <p style="width:84px;" class="middle">
              <span class="mar-right4">*</span>
              <span>间数：</span>
            </p>
            <el-input-number @blur="checkRoomMany(headjson.roomMany)" v-model="headjson.roomMany" size="small" 
            controls-position="right" :min="0" :max="maxRoomManyShow" @change="handleChangeRoom"></el-input-number>
            <span style="color: red;marginLeft:16px;" class="middle">可预订数量{{maxRoomManyShow}}间</span>
		  		</nav>
		  	</li>
		  	<li class="four">
		  		<nav style="margin-right: 50px;" class="middle">
		  			<!-- <span class="middle">预计到达时间</span>
		  			<span class="middle">：<span class="red">*</span></span> -->
            <p style="width: 113px;" class="middle">
              <span class="mar-right4">*</span>
              <span>预订到达时间：</span>
            </p>
            <el-time-picker @change="mayBeTimeChange" v-model="headjson.mayBeTime" style="180px;" size="small" format='HH:mm:ss'></el-time-picker>
		  		</nav>
		  	</li>
		  	<li class="five">
		  		<nav style="margin-right: 16px;" class="middle">
		  			<p style="width:113px;" class="middle">
              <span>备注：</span>
            </p>
		  			<!-- <textarea v-model="headjson.remarks" class="listarea middle"></textarea> -->
            <el-input class="middle" style="width:740px;" v-model="headjson.remarks" type="textarea" placeholder="请输入内容"></el-input>
		  		</nav>
          <section class="middle checkbox">
            <!-- <nav @click="getTableList" class="prebox"> -->
              <!-- <div class="box middle">
                <span style="margin-left: -2px;font-size: 18px;font-weight: bold; color: #6a9df6;" :class="{'icon-gou' : iconShow}" class="iconfont"></span>
              </div>
              <span class="middle">预订排房</span>
            </nav> -->
            <!-- <div  @click="getTableList" class="new-btn middle">预订排房</div> -->
            <el-button @click="getTableList" type="primary">预订排房</el-button>
          </section>
		  	</li>
		  </ul>
		  <ul class="angeroom">
		  	<li class="title">排房</li>
		  	<!--<li @click="changeTotalRoomManyArr" class="btn">自动排房</li> -->
        <li style="margin-top:20px;"></li>
		  	<li style="background: #f2f2f2;" class="angelist">
		  		<ul class="list-title">
		  			<li class="one">序号</li>
		  			<li class="two">房型</li>
		  			<li class="two">房号</li>
		  			<li class="one">房价</li>
            <li class="one">会员房价</li>
		  			<li class="three">预抵</li>
		  			<li class="three">预离</li>
		  			<!-- <li style="border-bottom: none;" class="three">入住人</li> -->
		  			<li class="one last">操作</li>
		  		</ul>
		  	</li>
		  	<li style="borderBottom:1px solid #e5e5e5;" class="angelist">
		  		<ul v-for="(item, index) in totalRoomManyArr" :key="index" class="list-title">
		  			<li class="one">{{index + 1}}</li>
		  			<li class="two">{{item.room_type_name}}</li>
		  			<!-- <li @click.stop="letPriceListShow(index)" class="two">
              <span v-if="item.json.jiagefangan.length">{{item.json.jiagefangan}}</span>
              <span style="color: #ccc;" v-else>请选择</span>
              <div id="slider">
                <img src="@/assets/images/sjx.png" width="" height="" alt="">
              </div>
              <ul v-show="isPriceListShow && nowIndex == index" class="slider-list">
                <li @click.stop="getPriceName(item,data)" v-for="(data, num) in priceListArr" style="border: none;" id="slider-list-li">{{data.name}}</li>
              </ul>   
            </li> -->
		  			<li :title="item.name" style="position: relative;overflow:hidden;" @click.stop="letRoomNumShow(index,item)" class="two">
              <!-- <span v-if="item.fanghao.length">{{item.fanghao}}</span>
              <span style="color: #ccc;" v-else>请选择</span>
              <div id="slider">
                <img src="@/assets/images/sjx.png" width="" height="" alt="">
              </div>
              <ul v-show="isRoomNumShow && nowIndex == index" class="slider-list">
                <li @click.stop="getFanghaoName(item,data)" v-for="(data, num) in item.roomNumArr" :key="num" style="border: none;" id="slider-list-li">{{data.name}}</li>
              </ul> -->
              <!-- <el-cascader
                ref="cascader"
                :options="buildFloorRoomArr"
                v-model="roomNumber"
                @change="cascaderChange">
              </el-cascader> -->
              <div id="cascader">
                <span>{{item.room_name}}</span>
                <span v-show="item.room_name == ''" style="color: #1dceb1;" class="middle">点击排房</span>
              </div>   
            </li>
		  			<li class="one">{{item.price}}</li>
            <li class="one">{{item.member_price}}</li>
		  			<li style="overflow: hidden;" class="three start-time">
		  				<!-- <el-date-picker @change="startDateTimeChange" ref="startdate" value-format="yyyy-MM-dd HH:mm" size="mini" placehoder="2010-00-00" type="datetime" v-model="item.startDateTime">
							</el-date-picker> -->
							<div @click.stop="getdate(index)" class="absolute">
								<p>
									<!-- <span v-if="!item.startDateTime.length" style="margin-right: 8px" class="middle">{{item.startDate}}&nbsp;{{item.startTime}}</span> -->
                  <span style="margin-right: 8px" class="middle">{{item.come_time}}</span>
									<!-- <span class="middle ">icon</span> -->
								</p>
							</div>
		  			</li>
		  			<li style="overflow: hidden;" class="three end-time">
		  				<!-- <el-date-picker @change="endDateTimeChange(item)" ref="enddate" value-format="yyyy-MM-dd HH:mm" size="mini" placehoder="2010-00-00" type="datetime" v-model="item.endDateTime">
							</el-date-picker> -->
							<div @click.stop="getEnddate(index)" class="absolute">
								<p>
									<!-- <span v-if="!item.endDateTime.length" style="margin-right: 8px" class="middle">{{item.endDate}}&nbsp;{{item.endTime}}</span> -->
                  <span style="margin-right: 8px" class="middle">{{item.leave_time}}</span>
									<!-- <span class="middle ">icon</span> -->
								</p>
							</div>
		  			</li>
		  			<!-- <li @click.stop="getRuzhuren(index)" class="three">
              <span style="color: #ccc;" v-show="ruzhurenIndex != index && item.ruzhuren.length == 0">{{item.ruzhurenTitle}}</span>
              <input @blur="checkLength(item.ruzhuren)" v-show="ruzhurenIndex == index || item.ruzhuren.length != 0" v-model="item.ruzhuren" ref="ruzhuren" id="ruzhuren" type="text">     
            </li> -->
		  			<li @click="rightDele(index)" style="color:#1dceb1;cursor: pointer;" class="one">删除</li>
		  		</ul>
		  	</li>
		  </ul>
      <footer class="btn">
        <el-button style="width:98px;" type="primary" @click="givePost">确定</el-button>
      </footer>
		</div>
    <check-member @checkMemberNone="letCheckMemberNone" v-if="isCheckMemberShow"></check-member>
    <get-pay @letGetPayNone="setGetPayNone" v-if="isGetPayShow" :name="'预收订金'" :payWayList="childPayWayList" :id="preorder_id" :list="memberMsg"></get-pay>
    <room-number @giveNumSelected="getSelected" v-if="isRoomNumberShow" @roomNumberBeNone="numberBeNone" :selected="selectedArr" :roomList="buildFloorRoomArr"></room-number>
	</div>
</template>

<script>
import checkMember from "@/components/public/checkmember"
import getPay from "@/components/public/getpay"
import roomNumber from "@/components/public/roomnumber"
import { mapGetters } from 'vuex'
import API from "@/store/API"
	export default{
		name: 'quickPreorder',
		data() {
			return {
        memberMsg: {},
        preorder_id: '',  //  预订押金要的ID
        saveRoomId: '',
        isCheckMemberShow: false,
        isGetPayShow: false,
        childPayWayList: [],
        selectedArr: [],
        isRoomNumberShow: false,
        iconShow: false,
        checkpointNum: 0,
        isOnce: true,
        buildFloorRoomArr: [],
        roomNumber: [],
        ruzhurenIndex: -1,
        orderLoading: false,
        isFillInAll: false,
        dateTimeLock: false,
        dateTimeErrorText: '',
        reservationMoneyErrorText: '',
        cardNumberErrorText: '',
        phoneErrorText: '',
        roomTypeArr: [],       //房型
        sourceChannelArr: [],  //客户类型
        arrivalTimeArr: [],    //预抵时间
        retentionTimeArr: [],  //保留失效
        guaranteeArr: [],      //担保
        isRuzhurenShow: false,
        priceListArr: [
          {
            id: 1,
            name: 'shichangjia'
          },
          {
            id: 2,
            name: 'xieyijia'
          }
        ],
        roomNumArr: [],
        totalRoomManyArr: [],
        isRoomNumShow: false,
        isPriceListShow: false,
        stayHowManyDay: 0,
        isEndTimeShow: false,
        isStartTimeShow: false,
        hoursArr: ['01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00','24:00'],
        headjson: {
          reservations: '',      //yudingren
          reservationPhone: '',
          reservationWay: '',
          cardNumber: '',
          agreementunit: '',
          arrivalTime: '',
          roomType: '',
          roomMany: '',   //jianshu
          maxRoomMany: 0,
          remarks: '',   //beizhu
          guarantee: '',  //danbao
          retentionTime: '',   // baoliushixiao
          mayBeTime: '',        //  yujidaodashijian
          reservationMoney: '',  //yudingjin
          jiagefangan: '',
          fanghao: '',
          // ruzhuren: '',
          // ruzhurenTitle: '多个用"|"分开',
          startDateTime: '',
          endDateTime: ''
        },
        maxRoomManyShow: 0,
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < (Date.now() - 24*60*60*1000)
          }
        },
				dateValue: '',
        nowIndex: -1,
        // hotelId: 1,
        roomId: '',
        tablistJsonArr: [],
        saveMemberMsg: {}
			}
		},
    computed: {
      ...mapGetters({
        hotel:'currHotel'
      })
    },
		methods:{
      setGetPayNone(e) {
        this.isGetPayShow = false
        if (e) {
          
        }
      },
      letTotalRoomManyArrNone() {
        if (this.totalRoomManyArr.length > 0) {
          this.totalRoomManyArr = []
        }
      },
      letCheckMemberNone(e) {
        this.isCheckMemberShow = false
        if (e) {
          this.headjson.member_id = e.id
          this.saveMemberMsg = {...e}
          this.memberMsg = {}
          API.get("/pms/vip/balance?id=" + e.id).then(res => {
            if (res.error_code == 0) {
              this.memberMsg = {
                balance: res.data.balance,
                card_level_name: res.data.card_level_name,
                card_number: res.data.card_number,
                security_deposit: res.data.security_deposit
              }
            }
          })
        }
      },
      letCheckMemberShow() {
        this.isCheckMemberShow = true
      },
      getPayWayList() {
        API.get("/pms/common/payway?vip=" + 1).then(res => {
          if (res.error_code == 0) {
            this.childPayWayList = res.data
          } else {
            this.childPayWayList = []
          }
        })
      },
      checkIsMember(e) {
        
      },
      getTypes() {
        API.get("/pms/usertype").then(res => {
          if (res.error_code == 0) {
            this.sourceChannelArr = res.data
          }
        })
      },
      start() {
        let d = new Date()
        let yaer = d.getFullYear()
        let month = d.getMonth() + 1
        let date = d.getDate()
        // let hour = d.getTime()
        let hour = d.getHours()
        let min = d.getMinutes()
        let sec = d.getSeconds()
        // let str = d.getDay()
        this.headjson.startDateTime = [`${yaer}-${month<10?'0'+month:month}-${date<10?'0'+date:date}`,`${hour<10?'0'+hour:hour}:${min<10?'0'+min:min}:${sec<10?'0'+sec:sec}`].join(' ')
      },
      getSelected(e) {
        // console.log('mmmmmm>>>>>>',e)
        if (e) {
          // this.selectedArr = []
          if (this.saveRoomId !== '') {
            let find = this.selectedArr.indexOf(this.saveRoomId)
            this.selectedArr.splice(find, 1)
          }
          this.selectedArr.push(e.id)
          this.totalRoomManyArr[this.nowIndex].room_name = e.name
          this.totalRoomManyArr[this.nowIndex].id = e.id
        }
        // console.log('mmmmmm>>>>>>',this.nowIndex)
        // console.log('mmmmmm>>>>>>',this.totalRoomManyArr)
        this.numberBeNone()
      },
      numberBeNone() {
        this.isRoomNumberShow = false
      },
      changeRuzhurenArr(arr) {
        let Array = []
        arr.forEach((e,i)=>{
          Array.push({
            "name": e
          })
        })
        return Array
      },
      cascaderChange() {

      },
      mayBeTimeChange(e) {
        let h = e.getHours()
        let m = e.getMinutes()
        let s = e.getSeconds()
        this.headjson.arrivalTime = [h,m<10?'0'+m:m,'00'].join(':')
      },
      getarrivalTimeArr(){
        API.getarrivalTimeArr(this.hotel.id).then(res=>{
          if(res.error_code == 0) {
            let arr = res.data.arrive_time.split(':')
            this.headjson.mayBeTime = new Date(2010, 11, 11, arr[0], arr[1])
            this.headjson.arrivalTime = [arr[0], arr[1],'00'].join(':')
          }
        })
      },
      givePost() {
        let arr = []
        this.totalRoomManyArr.forEach((v,i)=>{
          // if (v.ruzhuren.length == 0) {
          //   this.$alert('住客信息不完整', '', {
          //     confirmButtonText: '确定'
          //   })
          //   return
          // }
          console.log('mmmmmmmmmmmm',v)
          let n = typeof(v.id)
          arr.push({
            "room_id": n == 'undefined'?0:v.id, //v.id,
            // "member": this.changeRuzhurenArr(v.ruzhuren.split('|')),
            "come_time": v.come_time,
            "leave_time": v.leave_time,
            "room_type_id":v.room_type_id,
            "hotel_id": this.hotel.id
          })
        })
        if(arr.length) {
          let obj = {
            username: this.headjson.reservations,
            mobile: this.headjson.reservationPhone,
            arrive_time: this.headjson.arrivalTime,
            come_time: this.headjson.startDateTime,
            leave_time: this.headjson.endDateTime,
            total_count: this.headjson.roomMany,
            member_num: this.headjson.cardNumber,
            member_id: this.headjson.member_id?this.headjson.member_id:0,
            vip_card_num: this.saveMemberMsg.card_number?this.saveMemberMsg.card_number:'',
            partner_id: 0,
            hotel_id: this.hotel.id,
            remark: this.headjson.remarks,
            from: this.headjson.reservationWay,
            // is_assure: this.headjson.guarantee,
            sum: this.headjson.reservationMoney,
            room_type_id: arr[0].room_type_id,
            room: arr
          }
          API.quickPost(obj).then(res=>{
            if (res.error_code == 0) {
              this.totalRoomManyArr = []
              this.iconShow = false
              this.isOnce = true
              this.headjson.reservations = ''
              this.headjson.roomType = ''
              this.headjson.reservationPhone = ''
              this.headjson.arrivalTime = ''
              // this.headjson.startDateTime = ''
              this.headjson.endDateTime = ''
              this.headjson.roomMany = ''
              this.headjson.cardNumber = ''
              this.dateTimeLock = false
              // member_id: 0,
              // partner_id: 0,              
              this.headjson.remarks = ''
              this.headjson.reservationWay = ''
              this.phoneErrorText = ''
              this.stayHowManyDay = 0
              this.maxRoomManyShow = 0
              this.preorder_id = res.data.id
              this.$alert('操作成功', '', {
                confirmButtonText: '确定',
                callback: ()=>{
                  this.getarrivalTimeArr()
                  this.buildFloorRoomArr = []
                  this.isGetPayShow = true
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
      endDateTimeChange(e) {
      },
      startDateTimeChange(e) {
        // console.log('fsdffds1010101',e)
      },
      checkLength(e,i) {
        // if(!e.length) {
        //   this.isRuzhurenShow = false
        //   this.nowIndex = i
        // }
      },
      setIndex() {
        this.ruzhurenIndex = -1
      },
      getMaxDay() {
        this.checkpointNum = 0    //////////////
        let obj = {
          come_time: this.headjson.startDateTime,
          hotel_id: this.hotel.id,
          room_type_id: this.headjson.roomType,
          leave_time: this.headjson.endDateTime
        }
        API.fetchMaxDay(obj).then(res=>{
          // console.log('21321213',res)
          if(res.error_code == 0) {
            let data = res.data
            this.headjson.maxRoomMany = data.num;
            this.maxRoomManyShow = data.num;
            // this.roomNumArr = res.data.rooms

          }
        })
      },
      checkDateTime(e) {
        if(e.startDateTime == '' || e.endDateTime == '') {
          this.dateTimeErrorText ='请选择完整的日期时间'
          return this.dateTimeLock = true;
        }
        this.dateTimeErrorText = ''
        this.dateTimeLock = true;
        this.getMaxDay()
        if(!this.isOnce) {
          this.totalRoomManyArr = []
          this.iconShow = false
          this.headjson.roomMany = 0
        }
      },
      getGuaranteeArr() {  //担保
        API.getGuaranteeArr().then(res=>{
          if(!res.Error_code) {
            let arr = res.data
            arr.forEach((e, i)=>{
              this.guaranteeArr.push({
                label: e.name,
                value: e.id
              })
            })
          }
        })
      },
      // getSourceChannelArr() { //客户类型
      //   API.getFromWayList().then(res=>{
      //     if(res.error_code == 0) {
      //       // 
      //       this.sourceChannelArr = res.data
      //       // arr.forEach((e, i)=>{
      //       //   this.sourceChannelArr.push({
      //       //     label: e.name,
      //       //     value: e.id
      //       //   })
      //       // })
      //     }
      //   })
      // },
      getRoomType() {  //房型
        API.getRoomType(this.hotel.id).then(res=>{
          if(!res.Error_code) {
            let arr = res.data
            arr.forEach((e, i)=>{
              this.roomTypeArr.push({
                label: e.name,
                value: e.id
              })
            })
          }
        })
      },
      checkReservationMoney(e) {
        if (e.length == 0){
          this.reservationMoneyErrorText = ''
          return
        }
        let reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
        reg.test(e)?this.totalRoomManyArr: this.reservationMoneyErrorText = '请输入正确的金额格式'
      },
      checkCardNumber(e) {
        if (e.length == 0){return}
          let reg = /^[a-zA-Z\d]+$/
          reg.test(e)?this.cardNumberErrorText = '': this.cardNumberErrorText = '请输入正确的会员号码'
      },
      checkPhone(e) {
        if (e.length == 0){return}
        let reg = /^1\d{10}$/; //$|^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}
        reg.test(e)? this.phoneErrorText = '' : this.phoneErrorText = '请输入正确的手机号码'
      },
      // getFanghaoName(e,v) {
      //   this.roomId = v.id
      //   e.fanghao = v.name;
      //   this.isRoomNumShow = false
      // },
      getPriceName(e,v) {
        e.jiagefangan = v.name;
        this.isPriceListShow = false
      },
      rightDele(i) {
        this.totalRoomManyArr.splice(i, 1)
        this.headjson.roomMany -= 1
        this.maxRoomManyShow ++
        if (this.totalRoomManyArr.length == 0) {
          this.iconShow = false
        }
      },
      getRuzhuren(i) {
        this.ruzhurenIndex = i
        // this.isRuzhurenShow = true;
        this.$nextTick().then(()=>{
          this.$refs.ruzhuren[i].focus()
        })
      },
      countHowManyDay(e) {
        if (e == null) {
          this.headjson.startDateTime = ''
          this.headjson.endDateTime = ''
          return
        }
        if (this.headjson.startDateTime == '') {
          return
        }
        if (this.headjson.startDateTime == this.headjson.endDateTime) {
          this.$alert('时间不能相同', '', {
            confirmButtonText: '确定'
            // callback: ()=>{
            //   this.stayHowManyDay = 0
            //   this.headjson.endDateTime = ''
            //   this.headjson.startDateTime = ''
            // }
          })
          return
        }
        let end = new Date(e.split(' ')[0]).getTime()
        let start = new Date(this.headjson.startDateTime.split(' ')[0]).getTime()
        this.stayHowManyDay = Math.ceil((end - start)/(24*60*60*1000))
        if (this.stayHowManyDay < 0) {
          this.$alert('时间不能倒流', '', {
            confirmButtonText: '确定',
            callback: ()=>{
              this.stayHowManyDay = 0
              this.headjson.endDateTime = ''
              this.headjson.startDateTime = ''
            }
          })
          return
        }
        if(this.dateTimeLock) {
          this.getMaxDay()
          this.dateTimeErrorText = ''
        }
        if(!this.isOnce) {
          this.totalRoomManyArr = []
          this.iconShow = false
          this.headjson.roomMany = 0
        }
      },
      // letPriceListShow(i) {
      //   this.nowIndex = i;
      //   this.isPriceListShow = true;
      //   this.isRoomNumShow = false
      // },
      async letRoomNumShow(i, e) {
        if (this.buildFloorRoomArr.length == 0) {
          let data = {
            member_id: this.headjson.member_id,
            come_time: this.headjson.startDateTime,
            num: -1,
            room_type_id: this.headjson.roomType,
            leave_time: this.headjson.endDateTime
          }
          let resData = await API.quickRoomAuto(data).then(res=>{
            if(res.error_code == 0) {
              return res.data
            }
          })
          if (!resData[0].rooms.length) {
            this.$message.error(`该房型没有可预订房间`)
            return
          }
          // this.buildFloorRoomArr = []
          resData[0].rooms.forEach((e,i)=>{
            this.buildFloorRoomArr.push({
              id: e.id,
              name: e.room_name
            })
          })
        }
        if (e.id) {
          this.saveRoomId = e.id
        }
        this.nowIndex = i;
        this.isRoomNumberShow = true
      },
      changeTotalRoomManyArr() {
        let data = {
          come_time: this.headjson.startDateTime,
          num: this.headjson.roomMany,
          room_type_id: this.headjson.roomType,
          leave_time: this.headjson.endDateTime
        }
        API.quickRoomAuto(data).then(res=>{
          if(res.error_code == 0) {
            let arr = res.data[0].rooms
            arr.forEach((e,i)=>{
              e.ruzhuren = '';
              e.ruzhurenTitle = '多个用"|"分开';
              e.room_type_name = this.headjson.roomTypeName;
              e.room_type_id = this.headjson.roomType
            })
            this.totalRoomManyArr = arr
          }
        })
      },
      async getTableList() {
        // || this.headjson.reservationWay == ''   客户类型
        if(this.headjson.reservations == '' || this.headjson.reservationWay === '' || this.headjson.reservationPhone == ''  || this.headjson.startDateTime == '' || this.headjson.endDateTime == ''  || this.headjson.mayBeTime == '' || this.headjson.roomType == '' || this.headjson.roomMany <= 0) {
          return this.isFillInAll = true
        }
        if (this.headjson.reservationWay == 1) {
          if (!this.headjson.member_id) {
            this.$message.error('请选择会员')
            return
          }
          this.getPayWayList()
        } else if (this.headjson.reservationWay == 0) {
          API.get("/pms/common/payway?").then(res => {
            if (res.error_code == 0) {
              this.childPayWayList = res.data
            } else {
              this.childPayWayList = []
            }
          })
        }
        this.iconShow = true;
        this.roomNumArr = []
        this.isFillInAll = false;
        let obj = {
          id: this.hotel.id, 
          userType: this.headjson.reservationWay,  
          start: this.headjson.startDateTime.split(' ')[0], 
          end: this.headjson.endDateTime.split(' ')[0],
          roomTypeIds: this.headjson.roomType?[this.headjson.roomType]:[], 
          memberIds: this.headjson.member_id?[this.headjson.member_id]:[]
        }
        API.post("/pms/price/search", obj).then(res => {
          if (res.error_code == 0) {
            this.totalRoomManyArr = []
            this.roomTypeArr.forEach((e, i)=>{
              if(e.value == this.headjson.roomType) {
                this.headjson.roomTypeName = e.label
              }
            })
            if (obj.userType === 0) {
              for(let i = 0; i < this.headjson.roomMany; i++) {
                let json = {
                  member_id: this.headjson.member_id,
                  room_name: '',
                  room_type_id: this.headjson.roomType,
                  come_time: this.headjson.startDateTime,
                  leave_time: this.headjson.endDateTime,
                  room_type_name: this.headjson.roomTypeName,
                  price: res.data[0].prices[0].price,
                  member_price: '',
                  ruzhuren: '',
                  ruzhurenTitle: '多个用"|"分开',
                }
                this.totalRoomManyArr.push(json)
              }
            } else if(obj.userType === 1) {
              for(let i = 0; i < this.headjson.roomMany; i++) {
                let json = {
                  member_id: this.headjson.member_id,
                  room_name: '',
                  room_type_id: this.headjson.roomType,
                  come_time: this.headjson.startDateTime,
                  leave_time: this.headjson.endDateTime,
                  room_type_name: this.headjson.roomTypeName,
                  price: res.data[0].prices[0].roomTypePrice,
                  member_price: res.data[0].prices[0].price,
                  ruzhuren: '',
                  ruzhurenTitle: '多个用"|"分开',
                }
                this.totalRoomManyArr.push(json)
              }
            }
            this.isOnce = false
            this.checkpointNum = this.headjson.roomMany
          } else {
            if (res.msg) {
              this.$message.error(`${res.msg}`)
            }
          }
        })

        // if (!resData[0].rooms.length) {
        //   this.$message.error(`该房型没有可预订房间`)
        //   return
        // }
        // resData[0].rooms.forEach((e,i)=>{
        //   this.buildFloorRoomArr.push({
        //     id: e.id,
        //     name: e.room_name
        //   })
        // })
        // this.totalRoomManyArr = []
        // this.roomTypeArr.forEach((e, i)=>{
        //   if(e.value == this.headjson.roomType) {
        //     this.headjson.roomTypeName = e.label
        //   }
        // })
        // for(let i = 0; i < this.headjson.roomMany; i++) {
        //   let json = {
        //     room_name: '',
        //     room_type_id: this.headjson.roomType,
        //     come_time: this.headjson.startDateTime,
        //     leave_time: this.headjson.endDateTime,
        //     room_type_name: this.headjson.roomTypeName,
        //     price: resData[0].rooms[0].price,
        //     ruzhuren: '',
        //     ruzhurenTitle: '多个用"|"分开',
        //   }
        //   this.totalRoomManyArr.push(json)
        // }
        // this.isOnce = false
        // this.checkpointNum = this.headjson.roomMany
      },
      checkRoomMany(e) {
        if(Math.floor(e) > Math.floor(this.headjson.maxRoomMany)){
          this.headjson.roomMany = this.headjson.maxRoomMany
          this.maxRoomManyShow = 0
        }else{
          this.maxRoomManyShow = this.headjson.maxRoomMany - this.headjson.roomMany
        }
      },
      checkAddRoomMany() {
        if(!this.isOnce) {
          this.totalRoomManyArr = []
          this.iconShow = false
        }
        if(Math.floor(this.headjson.roomMany) <  Math.floor(this.headjson.maxRoomMany)) {
          this.headjson.roomMany++
          this.maxRoomManyShow--
        }
      },
      checkDeleRoomMany() {
        if(!this.isOnce) {
          this.totalRoomManyArr = []
          this.iconShow = false
        }
        if(Math.floor(this.headjson.roomMany) >  0) {
          this.headjson.roomMany--
          this.maxRoomManyShow++
        }
      },
      getStartDateTime(e) {
        if ( e == null) {
          this.headjson.startDateTime = ''
          this.headjson.endDateTime = ''
          return
        }
        if (this.headjson.endDateTime != '' && this.headjson.startDateTime != '') {
          let end = new Date(this.headjson.endDateTime).getTime()
          let start = new Date(this.headjson.startDateTime).getTime()
          this.stayHowManyDay = Math.ceil((end - start)/(24*60*60*1000))
          if (this.stayHowManyDay < 0) {
            this.$alert('时间不能倒流', '', {
              confirmButtonText: '确定',
              callback: ()=>{
                this.stayHowManyDay = 0
                this.headjson.endDateTime = ''
                // this.headjson.startDateTime = ''
                return
              }
            })
          }
        }
        if(this.dateTimeLock) {
          this.getMaxDay()
          this.dateTimeErrorText = ''
        }
        if(!this.isOnce) {
          this.totalRoomManyArr = []
          this.iconShow = false
          this.headjson.roomMany = 0
        }
      },
      getStartTime(e) {
        this.headjson.startTime = e;
        this.isStartTimeShow = false
      },
      getEndTime(e) {
        this.headjson.endTime = e;
        this.isEndTimeShow = false
      },
			getdate(i) {
				// this.$refs.startdate[i].focus()
			},
			getEnddate(i) {
				// this.$refs.enddate[i].focus()
      },
      handleChangeRoom(value) {
        if(!this.isOnce) {
          this.totalRoomManyArr = []
          this.iconShow = false
        }
      },
      handleChange(value){
        let start = (new Date(this.headjson.startDateTime)).getTime()/1000
        let end = (start+value*24*3600)*1000;
        this.headjson.endDateTime =  this.formatDateTime(end)
      },
      formatDateTime(inputTime) {  
        var date = new Date(inputTime);
        var y = date.getFullYear();  
        var m = date.getMonth() + 1;  
        m = m < 10 ? ('0' + m) : m;  
        var d = date.getDate();  
        d = d < 10 ? ('0' + d) : d;  
    //     var h = date.getHours();
    //     h = h < 10 ? ('0' + h) : h;
    //     var minute = date.getMinutes();
    //     var second = date.getSeconds();
    //     minute = minute < 10 ? ('0' + minute) : minute;  
    //     second = second < 10 ? ('0' + second) : second; 
        return y + '-' + m + '-' + d+' '+this.hotel.leave_time;  
      }
    },
    watch: {
      stayHowManyDay(newval) {
        this.handleChange(newval)
      }
    },
    components: {
      roomNumber,
      getPay,
      checkMember
    },
    created() {
      this.getTypes()
      this.start()
      this.getRoomType()
      // this.getSourceChannelArr()
      this.getGuaranteeArr()
      this.getarrivalTimeArr()
    }
	}
</script>

<style lang="scss" scoped>
  .batch-reservation{
    user-select: none;
  	font-size: 12px;
  	position: relative;
  	input{
  		height: 28px;
  		border: 1px solid #f2f2f2;
  		border-radius: 4px;
  	}
  	.middle{
  		display: inline-block;
  		vertical-align: middle;
  	}
  	.red{
  		color: red;
  	}
    .test-box{
      width: 736px;
      background: #f4f9ff;
      margin-left: 118px;
      margin-top:10px;
      box-sizing: border-box;
      padding: 14px 16px 6px;
    }
  	.whitetext{
  		width: 100%;
  		box-sizing: border-box;
  		padding-left: 35px;
  		background: #fff;
  		padding-top: 15px;
  		padding-right: 35px;
  	}
    .mar-right4{
      margin-right: 4px;
      color: red;
    }
  	header{
  		margin-bottom: 30px;
  	}
  	.end-time,.start-time{
  		position: relative;
  		.absolute{
  			width: 100%;
  			height: 100%;
  			position: absolute;
  			top: 0;
  			left: 0;
  			background: #fff;
  			white-space: nowrap;
  			text-overflow:ellipsis;
  			overflow:hidden;
  		}
  	}
    .room-number-click{
      position: relative;
      .many-block{
        height: 100%;
        width: 17px;
        position: absolute;
        top: 0;
        right: 0;
        .addmany,.delemany{
          width: 17px;
          height: 14px;
          position: absolute;
          right: 0;
          background: #f2f2f2;
          text-align: center;
          cursor: pointer;
          &:active{
            background: #ccc;
          }
          .img{
            margin-bottom: 2px;
          }
        }
        .addmany{
          top: 0;
        }
        .delemany{
          bottom: 0;
        }
      }
    }
  	.angelist{
  		width: 100%;
  		.list-title{
  			width: 100%;
  			display: flex;
  			flex: 33;
        border:1px solid #e5e5e5;
        border-bottom:none;
  			li{
  				height: 40px;
  				line-height: 40px;
  				text-align: center;  				
  				// border-left: 1px solid #e5e5e5;
  				// border-bottom: 1px solid #e5e5e5;
          position: relative;
  			}
  			.one{
  				flex: 2;
  			}
  			.two{
  				flex: 3;
  			}
  			.three{
  				flex: 4;
  			}
  		} 
  	}
  	.angeroom{
  		margin-top: 35px;
  		width: 100%;
  		position: relative;
			border: 1px solid #e6e6e6;
			box-sizing: border-box;
			padding: 0 24px 40px 24px;
			.title{
		  	position: absolute;
		  	top: -7px; left: 16px;
		  	background: #fff;
		  	display: inline-block;
		  	padding: 0 16px;
		  }
		  .btn{
		  	width: 80px;
		  	height: 30px;
		  	background: #6a9df6;
		  	color: #fff;
		  	line-height: 30px;
		  	text-align: center;
		  	margin-top: 25px;
		  	border-radius: 4px;
		  	margin-bottom: 10px;
        cursor: pointer;
		  }
  	}
    .new-btn{
		  	width: 80px;
		  	height: 30px;
		  	background: #6a9df6;
		  	color: #fff;
		  	line-height: 30px;
		  	text-align: center;
		  	// margin-top: 25px;
		  	border-radius: 4px;
		  	// margin-bottom: 10px;
        cursor: pointer;
		  }
  	.list{
  		width: 100%;
  		position: relative;
			border: 1px solid #e6e6e6;
			box-sizing: border-box;
			padding: 23px 0 16px 23px;
			li{
				margin-bottom: 10px;
			}
		  .title{
		  	position: absolute;
		  	top: -7px; left: 10px;
		  	background: #fff;
		  	display: inline-block;
		  	padding: 0 16px;
		  }
		  .two{
		  	.sou{
		  		width: 50px;
		  		height: 30px;
		  		line-height: 30px;
		  		background: #6a9df6;
		  		text-align: center;
		  		border-radius: 4px;
		  		color: #fff;
          cursor: pointer;
		  	}
		  }
		  .three{
		  	.choice{
		  		position: relative;
		  		width: 98px;
		  		height: 28px;
          line-height: 28px;
          text-align: center;
		  		border: 1px solid #f2f2f2;
		  		border-radius: 4px;
		  		position: relative;
          .select-list{
            width: 100%;
            height: 100px;
            overflow-y: auto;
            position: absolute;
            top: 100%;
            left: -1px;
            z-index: 666;
            background: #fff;
            border: 1px solid #f2f2f2;
            box-shadow: 0 0 3px;
            .li{
              width: 100%;
              height: 30px;
              line-height: 30px;
              border: none;
              margin-bottom: 0;
              cursor: pointer;
              &:hover{
                background: #6a9df6;
                color: #fff;
              }
            }
          }
		  	}
		  	.num{
		  		height: 26px;
		  		line-height: 26px;
		  		padding: 0 10px;
		  		color: #6a9df6;
		  		border: 1px solid #f2f2f2;
		  		border-radius: 2px;
		  	}
		  	.add{
		  		width: 26px;
		  		height: 26px;
		  		border-radius: 50%;
		  		background: #6a9df6;
		  		color: #fff;
		  		font-size: 26px;
		  		line-height: 22px;
		  		margin-left: 10px;
		  	}
		  	.dele{
		  		width: 24px;
		  		height: 24px;
		  		position: relative;
		  		border: 1px solid #f2f2f2;
		  		border-radius: 50%;
		  		margin-right: 10px;
		  		.del{
		  			width: 14px;
		  			border-bottom: 1px solid #d9d9d9;
		  			position: absolute;
		  			top: 50%;left: 50%;
		  			margin-left: -7px;
		  		}
		  	}
		  }
      .el-date-editor.el-input, .el-date-editor.el-input__inner{
        width: 200px;
      }
		  .five{
		  	.listarea{
		  		border: 1px solid #f2f2f2;
		  		border-radius: 6px;
		  		width: 738px;
		  		height: 48px;
		  	}
		  }
  	}
  	.select-icon{
  		width: 6px;
  		height: 6px;
  		border-right: 1px solid #ccc;
  		border-bottom: 1px solid #ccc;
  		position: absolute;
  		top: 10px;right: 10px;
      transform: rotate(45deg);
  	}
    .checkbox{
      position: relative;
      height: 50px;
      line-height: 50px;
    }
    #slider{
      position: absolute;
      top: 0;
      right: 10px;
    }
    .slider-list{
      width: 100%;
      height: 100px;
      overflow-y: auto;
      border: 1px solid #f2f2f2;
      z-index: 666;
      background: #fff;
      box-shadow: 0 0 3px;
      position: absolute;
      top: 100%;
      left: -1px;
      #slider-list-li{
        height: 30px;
        line-height: 30px;
        border: none;
        cursor: pointer;
        &:hover{
          background: #6a9df6;
          color: #fff;
        }
      }
    }
    #ruzhuren{
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding-left: 6px;
    }
    footer.btn{
      width: 100%;
      height: 40px;
      border-radius: 4px;
      line-height: 40px;
      text-align: center;
      margin: 0 auto;
      margin-top: 50px;
      cursor: pointer;
    }
    #cascader{
      width: 100%;
      height: 100%;
      pointer-events: none;
      position: absolute;
      top:0;left:0;
      background: #fff;
    }
  }
</style>