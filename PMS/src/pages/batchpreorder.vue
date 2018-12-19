<template>  <!-- 批量预定 -->
	<div @click="setIndex" class="room-display">
		<div class="whitetext">
			<!-- <header>
				<span class="middle">当前位置</span>
				<span style="margin-right: 18px;" class="middle">：</span>
				<span style="margin-right: 18px;" class="middle">预订管理</span>
				<span style="margin-right: 18px;" class="middle">></span>
				<span style="color: #437ff9;" class="middle">批量预订</span>
		  </header> -->
		  <ul class="list">
        <li v-show="isFillInAll" style="color: red; position: absolute; top: 0;left: 50%; margin-left: -56px;font-size: 16px;">有必填项没有填写</li>
		  	<li class="title">基本信息</li>
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
		  			<!-- <input @blur="checkPhone(headjson.reservationPhone)" v-model="headjson.reservationPhone" style="width: 198px;" class="middle" type="text"> -->
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
		  			<el-date-picker @change="changeStartDate" value-format="yyyy-MM-dd HH:mm:ss" size="small" style="width:200px;" placehoder="2010-00-00" type="datetime" v-model="headjson.startDateTime" :picker-options="pickerOptions">
						</el-date-picker>
		  		</nav>
          <el-input-number style="margin:0 55px;" v-model="stayHowManyDay" @change="handleChange" :min="1" size="small"></el-input-number>
		  		<nav class="middle">
            <span style="margin-right: 4px;" class="middle red">*</span>
		  			<span class="middle">离店时间：</span>
		  			<el-date-picker @change="countHowManyDay" :default-time="hotel.leave_time" value-format="yyyy-MM-dd HH:mm:ss" size="small" style="width:200px;" placehoder="2010-00-00" type="datetime" v-model="headjson.endDateTime" :picker-options="pickerOptions">
						</el-date-picker>
		  		</nav>
		  	</li>
        <li class="two">
		  		<nav style="margin-right: 42px;" class="middle">
            <p style="width: 113px;" class="middle">
              <span class="mar-right4">*</span>
              <span>客户类型：</span>
            </p>
			  		<el-select v-model="headjson.reservationWay" style="width:200px;" size="small" filterable placeholder="请选择">
					    <el-option
					      v-for="item in sourceChannelArr" 
					      :key="item.type"
					      :label="item.name"
					      :value="item.type">
					    </el-option>
					  </el-select>
            <p  @click="letCheckMemberShow" v-if="headjson.reservationWay === 1" style="marginLeft:10px;cursor: pointer;" class="middle">
              <span style="color: #437ff9;">选择会员</span>
            </p>
		  		</nav>
          <div v-if="headjson.reservationWay === 1" class="test-box">
            <nav style="marginBottom:8px;">
              <p style="width:192px;" class="middle">
                <span>会员姓名：</span>
                <span>{{saveMemberMsg.name}}</span>
              </p>
              <p class="middle">
                <span>会员卡号：</span>
                <span>{{saveMemberMsg.card_number}}</span>
              </p>
            </nav>
          </div>
		  		<!-- <section style="position: relative;" class="middle">
		  			<span class="middle">会员卡号</span>
		  			<span class="middle">：</span>
		  			<input @blur="checkCardNumber(headjson.cardNumber)" v-model="headjson.cardNumber" style="width: 138px; margin-right: 8px;margin-left: 6px;" class="middle" type="text"><span style="position:absolute; top: 90%;left:80px; color: red;">{{cardNumberErrorText}}</span>
		  			<div @click="checkIsMember(headjson.cardNumber)" class="middle sou">搜索</div>
		  		</section> -->
		  		<!-- <section style="margin-left: 40px;" class="middle">
		  			<span class="middle">协议单位</span>
		  			<span class="middle">：</span>
		  			<input v-model="headjson.agreementunit" style="width: 138px; margin-right: 8px;margin-left: 6px;" class="middle" type="text">
		  			<div class="middle sou">搜索</div>
		  		</section> -->
		  	</li>
		  	<li class="four">
		  		<nav style="margin-right: 50px;" class="middle">
		  			<p style="width: 113px;" class="middle">
              <span class="mar-right4">*</span>
              <span>预订到达时间：</span>
            </p>
            <el-time-picker v-model="headjson.mayBeTime" size="small" format='HH:mm:ss'></el-time-picker>
		  		</nav>
		  	</li>
		  	<li class="four">
		  		<nav class="middle">
            <p style="width:113px;" class="middle">
              <span>是否团体：</span>
            </p>
		  			<el-select v-model="headjson.group" size="small" style="width:200px;" filterable placeholder="请选择">
					    <el-option
					      v-for="item in groupArr"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
		  		</nav>
		  		<nav v-show="headjson.group" style="margin-right: 50px;" class="middle">
		  			<span style="width: 56px; text-align: right" class="middle">名称</span>
		  			<span class="middle">：<span class="red">*</span></span>
		  			<input v-model="headjson.name" style="width: 168px;" class="middle" type="text">
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
            <!-- <div  @click="getTableList" class="new-btn middle">预订排房</div> -->
            <el-button @click="getTableList" type="primary">预订排房</el-button>
          </section>
		  	</li>
		  </ul>
		  <ul class="angeroom">
		  	<li class="title">排房</li>
		  <!--<li @click="automaticRoom" class="btn">自动排房</li> -->
         <li style="margin-top:20px;"></li>
		  	<li id="two-list" class="clearfix">
		  		<div class="left">
		  			<div class="left-head">
		  				<ul style="background: #f2f2f2;">
		  					<li>房型</li>
		  					<li>可预订数</li>
		  					<li>可超订数</li>
		  					<li style="border-right: 1px solid #e5e5e5;">预订数</li>
		  				</ul>
		  				<ul :key="index" v-for="(item, index) in roomTypeArr">
		  					<li :title="item.room_type_name" class="ellipsis">{{item.room_type_name}}</li>
		  					<li class="ellipsis">{{item.num}}</li>
		  					<li class="ellipsis">{{item.more}}</li>
		  					<li class="relative" style="border-right: 1px solid #e5e5e5;">
		  						{{item.number}}
		  						<nav class="absolute">
		  							<div @click="checkAddNum(item,index)" class="add">
		  								<img style="transform: rotate(180deg)" src="@/assets/images/sjx.png" width="" height="" alt="">
		  							</div>
		  							<div @click="checkDeleNum(item,index)" class="dele">
		  								<img src="@/assets/images/sjx.png" width="" height="" alt="">
		  							</div>
		  						</nav>
		  					</li>
		  				</ul>
		  			</div>
		  		</div>
		  		<div class="right">
		  			<div style="background: #f2f2f2;" class="angelist">
				  		<ul class="list-title">
				  			<li class="one">序号</li>
				  			<li class="two">房型</li>
				  			<!-- <li style="border-bottom: none;" class="two">价格方案</li> -->
				  			<li class="two">房号</li>
				  			<li class="one">房价</li>
                <li v-if="headjson.reservationWay === 1" class="one">会员房价</li>
				  			<li class="three">预抵</li>
				  			<li class="three">预离</li>
				  			<!-- <li style="border-bottom: none;" class="three">入住人</li> -->
				  			<li style="border-right: 1px solid #e5e5e5;" class="one last">操作</li>
				  		</ul>
				  	</div>
				  	<div ref="test" :key="index" v-for="(item, index) in selectedRoomTypeArr" class="angelist">
				  		<ul :key="num" v-for="(data, num) in item.arr" class="list-title">
				  			<li class="one">1</li>
				  			<li class="two">{{item.type}}</li>
				  			<!-- <li @click.stop="priceListShow(data)" class="two">
                  <span v-if="data.jiagefangan.length">{{data.jiagefangan}}</span>
                  <span style="color: #ccc;" v-else>请选择</span>
                  <div id="slider">
                    <img :class="{'rotate': isPriceListShow && nowIndex == data}" src="@/assets/images/sjx.png" width="" height="" alt="">
                  </div>
                  <ul v-show="isPriceListShow && nowIndex == data" class="slider-list">
                    <li @click.stop="getPriceWay(data, '123')">123</li>
                  </ul>
                </li> -->
				  			<li style="position: relative;cursor: pointer;" @click.stop="roomNumShow(item,index,num,selectedRoomTypeArr)" class="two">
                  <!-- <span v-if="data.fanghao.length">{{data.fanghao}}</span>
                  <span style="color: #ccc;" v-else>请选择</span>
                  <div id="slider">
                    <img :class="{'rotate': isRoomNumShow && nowIndex == data}" src="@/assets/images/sjx.png" width="" height="" alt="">
                  </div>
                  <ul v-show="isRoomNumShow && nowIndex == data" class="slider-list">
                    <li @click.stop="getRoomNum(data, '456')">456</li>
                  </ul> --> 
                  <!-- <el-cascader
                    ref="cascader"
                    :options="buildFloorRoomArr"
                    v-model="roomNumber"
                    @change="cascaderChange">
                  </el-cascader> -->
                  <div id="cascader">
                    <span v-if="data.room_name == ''" style="color: #1dceb1;">点击排房</span>
                    <span v-else>{{data.room_name}}</span>
                  </div>   
                </li>
				  			<li class="one">{{item.price}}</li>
                <li v-if="headjson.reservationWay === 1" class="one">{{item.memberPrice}}</li>
				  			<li style="overflow: hidden;" class="three start-time">
				  				<!-- <el-date-picker ref="startdate" value-format="yyyy-MM-dd HH:mm" size="mini" placehoder="2010-00-00" type="datetime" v-model="data.startDateTime" :picker-options="pickerOptions">
									</el-date-picker> -->
									<div style="font-size: 12px;" @click.stop="getdate(num)" class="absolute">
										<p>
                      <p class="middle">   <!-- v-if="data.startDateTime.length" -->
                        <span style="margin-right: 8px" class="middle">{{data.come_time}}</span>           
                      </p>
											<!-- <p v-else class="middle">
                        <span style="margin-right: 8px" class="middle">{{data.startDate}}</span>
                        <span style="margin-right: 8px" class="middle">{{data.startTime}}</span>           
                      </p> -->
                      <!--<span class="middle ">icon</span> -->
										</p>
									</div>
				  			</li>
				  			<li style="overflow: hidden;" class="three end-time">
				  				<!-- <el-date-picker ref="enddate" value-format="yyyy-MM-dd HH:mm" size="mini" placehoder="2010-00-00" type="datetime" v-model="data.endDateTime" :picker-options="pickerOptions">
									</el-date-picker> -->
									<div style="font-size: 12px;" @click.stop="getEnddate(num)" class="absolute">
										<p>
                      <p class="middle">  <!-- v-if="data.endDateTime.length" -->
                        <span style="margin-right: 8px" class="middle">{{data.leave_time}}</span>           
                      </p>
                      <!-- <p v-else class="middle">
                        <span style="margin-right: 8px" class="middle">{{data.endDate}}</span>
                        <span style="margin-right: 8px" class="middle">{{data.endTime}}</span>           
                      </p> -->
                      <!--<span class="middle ">icon</span> -->
										</p>
									</div>
				  			</li>
				  			<!-- <li class="three">
                  <input placeholder='多个用"|"分开' v-model="data.ruzhuren" ref="ruzhuren" id="ruzhuren" type="text">
                </li> --> 
				  			<li @click="rightDele(data,num,item,index)" style="border-right: 1px solid #e5e5e5; color: #1dceb1; cursor: pointer;" class="one">删除</li>
              </ul>
				  	</div>
		  		</div>
		  	</li>
		  </ul>
		  <footer @click="givePost">
        <el-button style="width:100px;" type="primary">确定</el-button>
      </footer>
		</div>
    <check-member @checkMemberNone="letCheckMemberNone" v-if="isCheckMemberShow"></check-member>
    <get-pay v-if="isGetPayShow" :name="'预收订金'" :payWayList="childPayWayList" :list="[{}]"></get-pay>
    <room-number :selected="seclectedArr" @giveNumSelected="getSelected" v-if="isRoomNumShow" @roomNumberBeNone="numberBeNone" :roomList="buildFloorRoomArr"></room-number>
	</div>
</template>

<script>
import checkMember from "@/components/public/checkmember"
import getPay from "@/components/public/getpay"
import roomNumber from "@/components/public/roomnumber"
import { mapGetters } from 'vuex'
import bus from "@/store/bus"
import API from "@/store/API"
	export default{
		name: 'batchPreorder',
		data() {
			return {
        isCheckMemberShow: false,
        isGetPayShow: false,
        childPayWayList: [],
        seclectedArr: [],
        changeStartDateAgain: false,
        iconShow: false,
        isOnce: true,
        buildFloorRoomArr: [],
        roomNumber: [],
        isFillInAll: false,
        tableListLock: false,
        reservationMoneyErrorText: '',
        cardNumberErrorText:'',
        phoneErrorText: '',
        roomTypeArr: [],       //房型
        sourceChannelArr: [],  //客源渠道
        arrivalTimeArr: [],    //预抵时间
        retentionTimeArr: [],  //保留失效
        guaranteeArr: [],      //担保
        groupArr: [
          {
            label: '是',
            value: 1
          },
          {
            label: '否',
            value: 0
          }
        ],         // 团体
        nowIndex: -1,
        nowNum: -1,
        isPriceListShow: false,
        isRoomNumShow: false,
        stayHowManyDay: 0,
				headjson: {
					reservations: '',  //预定人
					reservationPhone: '',   // 预定手机
					reservationWay: '',   // 渠道
					cardNumber: '',      //  会员号码
					agreementunit: '',    // 协议单位
					guarantee: '',  //担保
					retentionTime: '',  //保留时效
					mayBeTime: '',     //余地
					reservationMoney: '',   //定金
					group: '',  //tuanti
					name: '',   //  tuanduidemingzi
					remarks: '',   //备注
          jiagefangan: '',   
          fanghao: '',
          ruzhuren: '',
          startDateTime: '',
          endDateTime: '',
          preorderNums:[]
				},
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < (Date.now() - 24*60*60*1000)
          }
        },
				selectedRoomTypeArr: [
				],
				choiceEndTime: false,
				// startTime: '',
				choiceStartTime: false,
				hours: ['01:00','02:00','03:00','04:00','05:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00','24:00'],
				dateValueStart: '',
				dateValueEnd: '',
        dateValue: '',
        saveMemberMsg: {}
			}
		},
    computed: {
      ...mapGetters({
        hotel:'currHotel'
      })
    },
    watch: {
      stayHowManyDay(newval) {
        this.handleChange(newval)
      }
    },
		methods:{
      handleChange(value){
        let start = (new Date(this.headjson.startDateTime)).getTime()/1000
        let end = (start+value*24*3600)*1000;
        this.headjson.endDateTime =  this.formatDateTime(end)
        if(!this.isOnce) {
          this.iconShow = false
          this.roomTypeArr = []
          this.selectedRoomTypeArr = []
          this.roomTypeArr.forEach((e,i)=>{
            e.number = 0
          })
        }
      },
      formatDateTime(inputTime) {  
        var date = new Date(inputTime);
        var y = date.getFullYear();  
        var m = date.getMonth() + 1;  
        m = m < 10 ? ('0' + m) : m;  
        var d = date.getDate();  
        d = d < 10 ? ('0' + d) : d; 
        return y + '-' + m + '-' + d+' '+this.hotel.leave_time;  
      },
      letCheckMemberNone(e) {
        this.isCheckMemberShow = false
        if (e) {
          // console.log('<><><><><><><>',e)
          this.headjson.member_id = e.id
          this.saveMemberMsg = {...e}
        }
      },
      letCheckMemberShow() {
        this.isCheckMemberShow = true
      },
      getTypes() {
        API.get("/pms/usertype").then(res => {
          if (res.error_code == 0) {
            this.sourceChannelArr = res.data
          }
        })
      },
      getPayWayList() {
        API.get("/pms/common/paytype").then(res => {
          if (res.error_code == 0) {
            this.childPayWayList = res.data
          } else {
            this.childPayWayList = []
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
      givePost() {
        // || this.headjson.reservationWay == ''
        if (this.headjson.reservations == '' || this.headjson.reservationPhone == ''  || this.headjson.mayBeTime == ''  || this.headjson.startDateTime == '' || this.headjson.endDateTime == '') {
          this.$alert('有必填项没有填写', '', {
            confirmButtonText: '确定'
          })
          return
        }
        let arr = []
        let num = 0;
        this.selectedRoomTypeArr.forEach((e,i)=>{
          num += e.arr.length
          e.arr.forEach((v,n)=>{
            let array = []
            // if (v.ruzhuren != '') {
            //   v.ruzhuren.split('|').forEach(d=>{
            //     array.push({
            //       name: d
            //     })
            //   })
            // } else {
            //   /*
            //   this.$alert('入住人没有填写', '', {
            //     confirmButtonText: '确定'
            //   })
            //   return
            //   */
            // }
            arr.push({
              room_id: v.roomId == ''?0:v.roomId,
              // member: array,
              come_time: v.come_time,
              leave_time: v.leave_time,
              hotel_id: this.hotel.id,
              room_type_id: e.typeId
            })
          })
        })
        if (arr.length == 0) {
          this.$message.error(`请选择房间`)
          return
        }
        let obj = {
          "username": this.headjson.reservations,
          "mobile": this.headjson.reservationPhone,
          "member_num": 12345,
          "arrive_time": this.mayBeTimeChange(this.headjson.mayBeTime),
          "come_time": this.headjson.startDateTime,
          "leave_time": this.headjson.endDateTime,
          "hotel_id": this.hotel.id,
          "total_count": num,
          "remark": this.headjson.remarks,
          "from": this.headjson.reservationWay,
          "member_id":0,
          "partner_id":0,
          "sum" : this.headjson.reservationMoney,
          "room": arr
        }
        // console.log(this.headjson.mayBeTime)
        API.post("/pms/preorder/batch", obj).then(res=>{
          if(res.error_code == 0) {
            // Object.assign(this.$data, this.$options.data())
            this.selectedRoomTypeArr = []
            this.roomTypeArr = []
            this.isOnce = true
            this.tableListLock = false
            this.iconShow = false
            this.headjson.reservations = ''
            this.headjson.reservationPhone = ''
            this.headjson.reservationWay = ''
            this.headjson.startDateTime = ''
            this.headjson.endDateTime = ''
            this.stayHowManyDay = 0
            this.headjson.reservationMoney = ''
            this.headjson.remarks = ''
            this.phoneErrorText = ''

            this.$alert('操作成功', '', {
              confirmButtonText: '确定',
              callback: ()=>{
                this.getArriveTime()
                this.buildFloorRoomArr = []
              }
            })
          }else {
            if (res.msg) {
              this.$message.error(`${res.msg}`)
            }
          }
        })
      },
      automaticRoom() {
        let arr = []
        this.selectedRoomTypeArr.forEach((e,i)=>{
          arr.push({
            "num": e.arr.length,
            "room_type_id": e.typeId
          })
        })
        let obj = {
          "data": arr,
          "come_time": this.headjson.startDateTime,
          "leave_time": this.headjson.endDateTime
        }
        API.post("/pms/room/more_auto", obj).then(res=>{
          if (res.error_code == 0) {
            let object = res.data;
            this.selectedRoomTypeArr.forEach((e,i)=>{
              e.arr = object[e.typeId]
              // e.arr.forEach((v,n)=>{
              //   v.ruzhuren = ''
              // })
            })
          }
        })
      },
      setIndex() {
        // this.nowIndex = -1
        // this.isRuzhurenShow = -1
      },
      getArriveTime() {
        API.get("/pms/hotel/arrive?id=" + this.hotel.id).then(res=>{
          if(res.error_code == 0) {
            let arr = res.data.arrive_time.split(':')
            this.headjson.mayBeTime =  new Date(2010, 11, 11, arr[0], arr[1], arr[2])
            // this.headjson.arrivalTime = [arr[0], arr[1],'00'].join(':')
            // this.headjson.arrivalTime = [arr[0], arr[1]].join(':')
            // let e = new Date(2010, 11, 11, arr[0], arr[1], arr[2])
            // let h = e.getHours()
            // let m = e.getMinutes()
            // let s = e.getSeconds()
            // this.headjson.arrivalTime = [h,m<10?'0'+m:m,'00'].join(':')
            // console.log('<><><><??',this.headjson.mayBeTime)
          }
        })
      },
      getTableList() {
        // || this.headjson.reservationWay == ''
        if(this.headjson.reservations == '' || this.headjson.reservationWay === '' || this.headjson.reservationPhone == ''  || this.headjson.startDateTime == '' || this.headjson.endDateTime == '' || this.headjson.mayBeTime == '') {
          return this.isFillInAll = true
        }
        if (this.headjson.reservationWay == 1) {
          if (!this.headjson.member_id) {
            this.$message.error('请选择会员')
            return
          }
        }
        let obj = {
          "come_time": this.headjson.startDateTime,
          "leave_time": this.headjson.endDateTime,
          "hotel_id": this.hotel.id
        }
        API.post("/pms/preorder/batchroomtype", obj).then(res=>{
          if (res.error_code == 0) {
            let arr = res.data
            let typeArr = []
            arr.forEach(e=>{
              typeArr.push(e.room_type_id)
            })
            if (this.headjson.reservationWay === 1 && this.saveMemberMsg.id) {
              let object = {
                id: this.hotel.id,
                userType: 1,
                roomTypeIds: typeArr,
                memberIds:[this.saveMemberMsg.id],//	是	array	选择会员时,选择的会员id数组,选择散客时，传空数组
                start: this.headjson.startDateTime.split(' ')[0],//	是	string	Y-M-D日期格式
                end: this.headjson.endDateTime.split(' ')[0] //	是	string	Y-M-D日期格式
              }
              API.post("/pms/price/search",object).then(res => {
                if (res.error_code == 0) {
                  let data = res.data
                  console.log('????????',data)
                  data.forEach(v =>{
                    arr.forEach((e,i)=>{
                      if (e.room_type_id == v.roomTypeId) {
                        e.memberPrice = v.prices[0].price
                      }
                    })
                  })
                  arr.forEach((e,i)=>{
                    e.number = 0
                    e.maxNum = e.num + e.more
                    e.srcNum = e.num
                    e.srcMore = e.more
                  })
                  this.roomTypeArr = arr
                  this.tableListLock = true;
                  this.isFillInAll = false;
                  this.isOnce = false
                  this.iconShow = true
                } 
              })
            } else {
              arr.forEach((e,i)=>{
                e.number = 0
                e.maxNum = e.num + e.more
                e.srcNum = e.num
                e.srcMore = e.more
              })
              this.roomTypeArr = arr
              this.tableListLock = true;
              this.isFillInAll = false;
              this.isOnce = false
              this.iconShow = true
            }
            //       this.roomTypeArr = arr
            // this.tableListLock = true;
            // this.isFillInAll = false;
            // this.isOnce = false
            // this.iconShow = true
          }
        })
      },
      getGuaranteeArr() {  //担保
        API.get("/pms/assure").then(res=>{
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
      checkReservationMoney(e) {
        if (e.length == 0){return}
        let reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
        reg.test(e)?this.reservationMoneyErrorText = '': this.reservationMoneyErrorText = '请输入正确的金额格式'
      },
      checkCardNumber(e) {
        if (e.length == 0){return}  // && isPostAll 价格判断条件是不是  post 提交所有的时候
          let reg = /^[a-zA-Z\d]+$/
          reg.test(e)?this.cardNumberErrorText = '': this.cardNumberErrorText = '请输入正确的会员号码'
      },
      checkPhone(e) {
        if (e.length == 0){return}
        let reg = /^1\d{10}$/;
        reg.test(e)? this.phoneErrorText = '' : this.phoneErrorText = '请输入正确的手机号码'
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
        let end = new Date(e).getTime()
        let start = new Date(this.headjson.startDateTime).getTime()
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
        }
        if(!this.isOnce) {
          this.iconShow = false
          this.roomTypeArr = []
          this.selectedRoomTypeArr = []
          this.roomTypeArr.forEach((e,i)=>{
            e.number = 0
          })
        }
      },
      getSelected(e) {
        if (e) {
          this.selectedRoomTypeArr[this.nowIndex].arr[this.nowNum].room_name = e.name
          this.selectedRoomTypeArr[this.nowIndex].arr[this.nowNum].roomId = e.id
        }
        this.numberBeNone()
      },
      numberBeNone() {
        this.isRoomNumShow = false
      },
      mayBeTimeChange(e) {
        let h = new Date(e).getHours()
        let m = new Date(e).getMinutes()
        return [h, m<10?'0'+m:m, '00'].join(':')
      },
      roomNumShow(item,index,num,selectedRoomTypeArr) {
        // console.log('007007007',selectedRoomTypeArr)
        this.seclectedArr = []
        // selectedRoomTypeArr.forEach((item,index => {
        //   item.arr.forEach((val,n) => {
        //     if (!val.room_name == '') {
        //       this.seclectedArr.push(val.room_name)
        //     }
        //   })
        // }))
        this.isPriceListShow = false;
        let obj = {
          "come_time": this.headjson.startDateTime,
          "leave_time": this.headjson.endDateTime,
          "num":-1,
          "room_type_id": item.typeId       //item.typeId
        }
        item.arr.forEach((e,i) => {
          if (!e.roomId == '') {
            this.seclectedArr.push(e.roomId)
          }
        })
        
        if (item.totalList.length == 0) {
          API.post("/pms/room/auto", obj).then(res=>{
            if (res.error_code == 0) {
              let arr = res.data
              if (arr[0].rooms.length) {
                arr[0].rooms.forEach((e,i)=>{
                  item.totalList.push({
                    id: e.id,
                    name: e.room_name
                  })
                })
                this.buildFloorRoomArr = item.totalList
              } else {
                  this.buildFloorRoomArr = []
                  this.$message.error(`该房型没有可预订房间`)
                  // return
              }
            }
          })
          this.isRoomNumShow = true;
        } else {
          this.buildFloorRoomArr = item.totalList
          this.isRoomNumShow = true;
        }
        this.nowIndex = index
        this.nowNum = num
      },
      priceListShow(i) {
        // this.isRoomNumShow = false;
        // this.isPriceListShow = true;
        // this.nowIndex = i
      },
      // getRuzhuren(e,i,index) {
      //   this.isRuzhurenShow = e;
      //   // this.$nextTick().then(()=>{
      //   //   console.log(this.$refs.ruzhuren)
      //   // })
      // },
      // getRoomNum(data, val) {
      //   data.fanghao = val;
      //   this.isRoomNumShow = false
      // },
      getPriceWay(data, val) {
        data.jiagefangan = val;
        this.isPriceListShow = false
      },
      rightDele(data,num,item,index) {
        //item.arr.splice(num, 1)
          this.roomTypeArr.forEach((e, i)=>{
            if(e.room_type_name == item.type){
              //e.number -= 1
              console.log(e)
            
              this.checkDeleNum(e)
            }
          })
        },
      changeStartDate(e) {
        if (e == null) {
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
        if (this.changeStartDateAgain) {
          this.headjson.endDateTime = ''
          this.stayHowManyDay = 0
        }
        this.headjson.startDateTime = e;
        this.changeStartDateAgain = true

        // this.addOneDay()

        if(!this.isOnce) {
          this.iconShow = false
          this.roomTypeArr = []
          this.selectedRoomTypeArr = []
          this.roomTypeArr.forEach((e,i)=>{
            e.number = 0
          })
        }
      },
			checkAddNum(e, i) {
        console.log(e)
        if(!this.tableListLock){
          return 
        }

        if(e.num <=0 && e.more <=0 ){
          return 
        }

        e.number++

        if(e.srcNum >= e.number){
          e.num = e.srcNum - e.number
        } else if(e.srcNum <e.number){
           e.more -= (e.number-e.srcNum)
           if(e.more <0 ){
              e.more = 0 
              return 
            }
        }
          // let obj = Object.assign({},this.headjson, e)
          let obj = {
            come_time: this.headjson.startDateTime,
            leave_time: this.headjson.endDateTime,
            ruzhuren: '',
            room_name: '',
            roomId: ''
          }
          let find = false;
          this.selectedRoomTypeArr.forEach((v, n)=>{
            if(v.type == e.room_type_name){
              v.arr.push(obj)
              find = true
            }
          })
          if(!find){
            this.selectedRoomTypeArr.push({
              totalList: [],
              type: e.room_type_name,
              typeId: e.room_type_id,
              price: e.price,
              memberPrice:e.memberPrice,
              arr: [obj]
            })
          }

				
        // console.log('>>>>???', this.selectedRoomTypeArr)
        // if(!this.isOnce) {
        //   this.selectedRoomTypeArr = []
        // }

			},
			checkDeleNum(e, i) {
        console.log(e.number,e.num,e.srcNum)
        if(e.number <= 0){
          return 
        }

        if(e.num >= e.srcNum){
          return 
        }
         e.number--
        if(e.num == e.srcNum && e.more <  e.srcMore){
            e.more += 1
            if(e.number > 0) {
                this.selectedRoomTypeArr.forEach((element, index)=>{
                  if(element.type == e.room_type_name) {
                    element.arr.splice((element.arr.length - 1), 1)
                    return
                  }
                })
                return
              }
        }

        if(e.num < e.srcNum){
         
          e.num += 1
          this.selectedRoomTypeArr.forEach((element, index)=>{
            if(element.type == e.room_type_name) {
              element.arr.splice((element.arr.length - 1), 1)
              return 
            }
          })
        }
			},
			getEndTime(e) {
				this.headjson.endTime = e;
				this.choiceEndTime = false
			},
			getStartTime(e) {
				this.headjson.startTime = e;
				this.choiceStartTime = false
			},
			getdate(i) {
				// this.$refs.startdate[i].focus()
			},
			getEnddate(i) {
				// this.$refs.enddate[i].focus()
			}
		},
    created() {
      this.getArriveTime()
      // this.getSourceChannelArr()
      this.getTypes()
      this.getGuaranteeArr()
      this.start()
      this.getPayWayList()
    },
    components: {
      roomNumber,
      getPay,
      checkMember
    }
	}
</script>

<style lang="scss" scoped>
  .room-display{
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
  	.whitetext{
  		width: 100%;
  		box-sizing: border-box;
  		padding-left: 35px;
  		background: #fff;
  		padding-top: 15px;
  		padding-right: 35px;
  	}
    .ellipsis{
			white-space: nowrap;
			overflow : hidden;
			text-overflow: ellipsis;
		}
  	header{
  		margin-bottom: 30px;
  	}
    .mar-right4{
      margin-right: 4px;
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
  	footer{
  		width: 100%;
  		// height: 40px;
  		// line-height: 40px;
  		text-align: center;
  		// background: #437ff9;
  		// color: #fff;
  		// border-radius: 6px;
			margin: 0 auto;
			margin-top: 30px;
			// cursor: pointer;
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
    .new-btn{
      width: 80px;
      height: 30px;
      background: #6a9df6;
      color: #fff;
      line-height: 30px;
      text-align: center;
      border-radius: 4px;
      cursor: pointer;
    }
  	#two-list{
  		width: 100%;
  		display: flex;
  		flex: 1;
  		.right{
  			margin-left: 18px;
  			flex: 1;
  		}
  	}
  	.angelist{
  		width: 100%;
  		.list-title{
  			width: 100%;
  			display: flex;
  			flex: 33;
  			li{
          position: relative;
  				height: 40px;
  				line-height: 40px;
  				text-align: center;  				
  				border-left: 1px solid #e5e5e5;
  				border-bottom: 1px solid #e5e5e5;
          white-space: nowrap;
  				text-overflow:ellipsis;
  			}
  			.one{
  				flex: 2;
          overflow:hidden;
          white-space: nowrap;
          text-overflow:ellipsis;
  			}
  			.two{
  				flex: 3;
          overflow:hidden;
          white-space: nowrap;
          text-overflow:ellipsis;
          .slider-list{
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
            li{
              width: 100%;
              height: 30px;
              line-height: 30px;
              border: none;
              cursor: pointer;
              &:hover{
                // background: #6a9df6;
                // color: #fff;
              }
            }
          }
  			}
  			.three{
  				flex: 4;
  			}
  		} 
  	}
  	.left-head{
  		width: 406px;
  		ul{
  			width: 100%;
  			display: flex;
  			flex: 4;
  			li{
  				flex: 1;
  				height: 40px;
  				line-height: 40px;
  				text-align: center;
  				border-left: 1px solid #e5e5e5;
  				border-bottom: 1px solid #e5e5e5;
  			}
  		}
  	}
  	.relative{
  		position: relative;
  		.absolute{
  			position: absolute;
  			width: 17px;
				height: 40px;
  			top: 0; right: 0;
  			.dele,.add{
					width: 17px;
					height: 19px;
					background: #e6e6e6;
					position: absolute;
					img{
						position: absolute;
						top: 6px; left: 5px;
					}
  			}
  			.add{
  				top: 0;right: 0
  			}
  			.dele{
  				bottom: 0; right: 0;
  			}
  		}
  	}
    .el-date-editor.el-input, .el-date-editor.el-input__inner{
        width: 200px;
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
		  }
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
  	.select-list{
  		position: absolute;
  		top: 100%;
  		left: -1px;
  		width: 100%;
  		height: 100px;
  		overflow-y: auto;
  		border: 1px solid #f2f2f2;
  		background: #fff;
  		z-index: 666;
  		.select-list-li{
  			height: 26px;
  			line-height: 26px;
  			box-sizing: border-box;
  			padding-left: 8px;
  			margin-bottom: 0;
  			cursor: pointer;
  			&:hover{
  				background: #6a9df6;
  				color: #fff;
  			}
  		}
  	}
    #slider{
      position: absolute;
      top: 0;
      right: 10px;
    }
    #ruzhuren{
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding-left: 6px;
    }
    .rotate{
      transform: rotate(180deg);
    }
    .checkbox{
      position: relative;
      height: 50px;
      line-height: 50px;
    }
    #cascader{
      width: 100%;
      height: 100%;
      pointer-events: none;
      position: absolute;
      top:0;left:0;
      background: #fff;
      overflow:hidden;
      white-space: nowrap;
      text-overflow:ellipsis;
    }
  }
</style>