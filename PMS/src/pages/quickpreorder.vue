<template>  <!-- 快速预定 -->
	<div @click="setIndex" class="batch-reservation" v-loading="orderLoading" element-loading-text="操作进行中" element-loadig-spinner="el-icon-loading" element-loading-background="rgba(0,0,0,.4)">
		<div class="whitetext">
			<header>
				<span class="middle">当前位置</span>
				<span style="margin-right: 18px;" class="middle">：</span>
				<span style="margin-right: 18px;" class="middle">预定管理</span>
				<span style="margin-right: 18px;" class="middle">></span>
				<span style="color: #437ff9;" class="middle">快速预定</span>
		  </header>
		  <ul class="list">
		  	<li class="title">基本信息</li>
        <li v-show="isFillInAll" style="color: red; position: absolute; top: 0;left: 50%; margin-left: -56px;font-size: 16px;">有必填项没有填写</li>
		  	<li class="one">
		  		<nav style="margin-right: 50px;" class="middle">
		  			<span style="width: 56px; text-align: right" class="middle">预定人</span>
		  			<span class="middle">：<span class="red">*</span></span>
		  			<input v-model="headjson.reservations" style="width: 168px;" class="middle" type="text">
		  		</nav>
		  		<section class="middle">
		  			<span class="middle">预定手机</span>
		  			<span class="middle">：<span class="red">*</span></span>
		  			<input @blur="checkPhone(headjson.reservationPhone)" v-model="headjson.reservationPhone" style="width: 168px;" class="middle" type="number">
            <span style="color: red;">{{phoneErrorText}}</span>
		  		</section>
		  	</li>
		  	<li class="two">
		  		<nav style="margin-right: 42px;" class="middle">
		  			<span class="middle">客源渠道</span>
			  		<span class="middle">：<span class="red">*</span></span>
			  		<el-select v-model="headjson.reservationWay" size="mini" filterable placeholder="请选择">
					    <el-option
					      v-for="item in sourceChannelArr"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
		  		</nav>
		  		<section style="position: relative;" class="middle">
		  			<span class="middle">会员卡号</span>
		  			<span class="middle">：</span>
		  			<input @blur="checkCardNumber(headjson.cardNumber)" v-model="headjson.cardNumber" style="width: 138px; margin-right: 8px;margin-left: 6px;" class="middle" type="text"><span style="position:absolute; top: 90%;left:80px; color: red;">{{cardNumberErrorText}}</span>
		  			<div @click="checkIsMember(headjson.cardNumber)" class="middle sou">搜索</div>
		  		</section>
		  		<section style="margin-left: 40px;" class="middle">
		  			<span class="middle">协议单位</span>
		  			<span class="middle">：</span>
		  			<input v-model="headjson.agreementunit" style="width: 138px; margin-right: 8px;margin-left: 6px;" class="middle" type="text">
		  			<div class="middle sou">搜索</div>
		  		</section>
		  	</li>
		  	<li class="three">
		  		<nav class="middle">
		  			<span class="middle">入住时间</span>
		  			<span style="margin-right: 14px;" class="middle red">*</span>
		  			<el-date-picker @change="getStartDateTime" value-format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptions" size="mini" type="datetime" v-model="headjson.startDateTime">
						</el-date-picker>
		  		</nav>
		  		<div style="margin: 0 30px;" class="middle">
		  			<span @click="deleOneDay" class="middle dele">
		  				<span class="del"></span>
		  			</span>
		  			<span class="middle num">{{stayHowManyDay}}</span>
		  			<span>天</span>
		  			<span @click="addOneDay" class="middle add">＋</span>
		  		</div>
		  		<nav class="middle">
		  			<span class="middle">离店时间</span>
		  			<span style="margin-right: 14px;" class="middle red">*</span>
		  			<el-date-picker @change="countHowManyDay" value-format="yyyy-MM-dd HH:mm:ss" size="mini" :picker-options="pickerOptions" type="datetime" v-model="headjson.endDateTime">
						</el-date-picker>
            <span style="color: red;">{{dateTimeErrorText}}</span>
		  		</nav>
		  	</li>
		  	<li class="four">
		  		<nav style="margin-right: 50px;" class="middle">
		  			<span style="width: 56px; text-align: right" class="middle">房型</span>
		  			<span class="middle">：<span class="red">*</span></span>
		  			<el-select @change="checkDateTime(headjson)" v-model="headjson.roomType" size="mini" filterable placeholder="请选择">
              <el-option
                v-for="item in roomTypeArr"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
		  		</nav>
		  		<nav style="margin-right: 72px;" class="middle">
		  			<span style="width: 56px; text-align: right" class="middle">间数</span>
		  			<span class="middle">：<span class="red">*</span></span>
		  			<div class="middle room-number-click">
              <input @blur="checkRoomMany(headjson.roomMany)" v-model="headjson.roomMany" style="width: 168px;" class="middle" type="text">
              <nav class="many-block">
                <div @click="checkAddRoomMany" class="addmany">
                  <img style="transform: rotate(180deg);" class="img" src="@/assets/images/sjx.png" alt="">
                </div>
                <div @click="checkDeleRoomMany" class="delemany">
                  <img class="img" src="@/assets/images/sjx.png" alt="">
                </div>
              </nav>  
            </div>
            <span style="color: red;" class="middle">可预订数量{{maxRoomManyShow}}间</span>
		  		</nav>
		  		<nav style="margin-right: 50px;position: absolute;" class="middle">
		  			<span style="width: 56px; text-align: right" class="middle">预定定金</span>
		  			<span class="middle">：<span class="red"></span></span>
		  			<input @blur="checkReservationMoney(headjson.reservationMoney)" v-model="headjson.reservationMoney" style="width: 168px;" class="middle" type="text">
            <span style="position:absolute; top: 90%;left:88px; color: red;">{{reservationMoneyErrorText}}</span>
		  		</nav>
		  	</li>
		  	<li class="four">
		  		<!-- <nav style="margin-right: 50px;" class="middle">
		  			<span style="width: 56px; text-align: right" class="middle">担保</span>
		  			<span class="middle">：<span class="red">*</span></span>
		  			<el-select v-model="headjson.guarantee" size="mini" filterable placeholder="请选择">
              <el-option
                v-for="item in guaranteeArr"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
		  		</nav>
		  		<nav style="margin-right: 44px;" class="middle">
		  			<span style="width: 56px; text-align: right" class="middle">保留时效</span>
		  			<span class="middle">：<span class="red">*</span></span>
		  			<el-select v-model="headjson.retentionTime" size="mini" filterable placeholder="请选择">
              <el-option
                v-for="item in retentionTimeArr"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
		  		</nav> -->
		  		<nav style="margin-right: 50px;" class="middle">
		  			<span class="middle">预计到达时间</span>
		  			<span class="middle">：<span class="red">*</span></span>
            <el-time-picker @change="mayBeTimeChange" v-model="headjson.mayBeTime" size="mini" format='HH:mm:ss'></el-time-picker>
		  			<!-- <el-select v-model="headjson.mayBeTime" size="mini" filterable placeholder="请选择">
              <el-option
                v-for="item in arrivalTimeArr":key="item.value"
                :label="item.label"
                :value="item.value"
                >
              </el-option>
            </el-select> -->
            <!-- <input v-model="headjson.mayBeTime" style="width: 168px;" class="middle" type="text"> -->
		  		</nav>
		  	</li>
		  	<li class="five">
		  		<nav style="margin-right: 50px;" class="middle">
		  			<span style="width: 56px; text-align: right" class="middle">备注</span>
		  			<span class="middle">：</span>
		  			<textarea v-model="headjson.remarks" style="margin-left: 8px;" class="listarea middle"></textarea>
		  		</nav>
          <section class="middle checkbox">
            <nav @click="getTableList" class="prebox">
              <div class="box middle">
                <span style="margin-left: -2px;font-size: 18px;font-weight: bold; color: #6a9df6;" :class="{'icon-gou' : iconShow}" class="iconfont"></span>
              </div>
              <span class="middle">预订并排房</span>
            </nav>
          </section>
		  	</li>
		  </ul>
		  <ul class="angeroom">
		  	<li class="title">排房</li>
		  	<li @click="changeTotalRoomManyArr" class="btn">自动排房</li>
		  	<li style="color: #fff; background: #4b5967;" class="angelist">
		  		<ul class="list-title">
		  			<li style="border-bottom: none;" class="one">序号</li>
		  			<li style="border-bottom: none;" class="two">房型</li>
		  			<!-- <li style="border-bottom: none;" class="two">价格方案</li> -->
		  			<li style="border-bottom: none;" class="two">房号</li>
		  			<li style="border-bottom: none;" class="one">房价</li>
		  			<li style="border-bottom: none;" class="three">预抵</li>
		  			<li style="border-bottom: none;" class="three">预离</li>
		  			<li style="border-bottom: none;" class="three">入住人</li>
		  			<li style="border-right: 1px solid #a9bfd6;border-bottom: none;" class="one last">操作</li>
		  		</ul>
		  	</li>
		  	<li class="angelist">
		  		<ul v-for="(item, index) in totalRoomManyArr" class="list-title">
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
		  			<li :title="item.name" style="position: relative;overflow:hidden;" @click.stop="letRoomNumShow(index)" class="two">
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
                <span v-show="item.room_name == ''" style="color: #437ff9;" class="middle">点击排房</span>
              </div>   
            </li>
		  			<li class="one">{{item.price}}</li>
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
		  			<li @click.stop="getRuzhuren(index)" class="three">
              <span style="color: #ccc;" v-show="ruzhurenIndex != index && item.ruzhuren.length == 0">{{item.ruzhurenTitle}}</span>
              <input @blur="checkLength(item.ruzhuren)" v-show="ruzhurenIndex == index || item.ruzhuren.length != 0" v-model="item.ruzhuren" ref="ruzhuren" id="ruzhuren" type="text">     
            </li>
		  			<li @click="rightDele(index)" style="border-right: 1px solid #a9bfd6; color: red; cursor: pointer;" class="one">删除</li>
		  		</ul>
		  	</li>
		  </ul>
      <footer @click="givePost" class="btn">确定</footer>
		</div>
    <room-number @giveNumSelected="getSelected" v-if="isRoomNumberShow" @roomNumberBeNone="numberBeNone" :roomList="buildFloorRoomArr"></room-number>
	</div>
</template>

<script>
import roomNumber from "@/components/public/roomnumber"
import { mapGetters } from 'vuex'
import API from "@/store/API"
	export default{
		name: 'quickPreorder',
		data() {
			return {
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
        sourceChannelArr: [],  //客源渠道
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
        tablistJsonArr: []
			}
		},
    computed: {
      // start() {
      //   let d = new Date()
      //   let yaer = d.getFullYear()
      //   let month = d.getMonth()
      //   let date = d.getDate()
      //   // let hour = d.getTime()
      //   let hour = d.getHours()
      //   let min = d.getMinutes()
      //   let sec = d.getSeconds()
      //   // let str = d.getDay()
      //   return [`${yaer}-${month<10?'0'+month:month}-${date<10?'0'+date:date}`,`${hour<10?'0'+hour:hour}:${min<10?'0'+min:min}:${sec<10?'0'+sec:sec}`].join(' ')
      // },
      ...mapGetters({
        hotel:'currHotel'
      })
    },
		methods:{
      checkIsMember(e) {
        
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
        this.totalRoomManyArr[this.nowIndex].room_name = e.name
        this.totalRoomManyArr[this.nowIndex].id = e.id
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
          let n = typeof(v.id)
          arr.push({
            "room_id": n == 'undefined'?0:v.id, //v.id,
            "member": this.changeRuzhurenArr(v.ruzhuren.split('|')),
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
            member_id: 0,
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
              this.headjson.startDateTime = ''
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
              this.$alert('操作成功', '', {
                confirmButtonText: '确定',
                callback: ()=>{
                  this.getarrivalTimeArr()
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
        // let obj = {
        //   come_time: this.headjson.startDateTime,
        //   hotel_id: this.hotelId,
        //   room_type_id: this.headjson.roomType,
        //   leave_time: this.headjson.endDateTime
        // }
        // API.post("/pms/preorder/roomtype", obj).then(res=>{
        //   // console.log('21321213',res)
        //   if(res.error_code == 0) {
        //     this.headjson.maxRoomMany = res.data.num;
        //     this.maxRoomManyShow = res.data.num;
        //     this.roomNumArr = res.data.rooms

        //   }
        // })
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
      getSourceChannelArr() { //客源渠道
        API.getFromWayList().then(res=>{
          if(!res.Error_code) {
            let arr = res.data
            arr.forEach((e, i)=>{
              this.sourceChannelArr.push({
                label: e.name,
                value: e.id
              })
            })
          }
        })
      },
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
        if (e.length == 0){return}
        let reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
        reg.test(e)?this.reservationMoneyErrorText = '': this.reservationMoneyErrorText = '请输入正确的金额格式'
      },
      checkCardNumber(e) {
        if (e.length == 0){return}
          let reg = /^[a-zA-Z\d]+$/
          reg.test(e)?this.cardNumberErrorText = '': this.cardNumberErrorText = '请输入正确的会员号码'
      },
      checkPhone(e) {
        if (e.length == 0){return}
        let reg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0|3,5-9]))\d{8}$/; //$|^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}
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
      letRoomNumShow(i) {
        this.nowIndex = i;
        // this.isPriceListShow = false;
        // this.isRoomNumShow = true
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
        if(this.headjson.reservations == '' || this.headjson.reservationPhone == '' || this.headjson.reservationWay == '' || this.headjson.startDateTime == '' || this.headjson.endDateTime == ''  || this.headjson.mayBeTime == '' || this.headjson.roomtype == '' || this.headjson.roomMany <= 0) {
          return this.isFillInAll = true
        }
        this.iconShow = true;
        this.roomNumArr = []
        this.isFillInAll = false;
        let data = {
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
        // console.log('>>>>>',resData)
        resData[0].rooms.forEach((e,i)=>{
          this.buildFloorRoomArr.push({
            id: e.id,
            name: e.room_name
          })
        })
        this.totalRoomManyArr = []
        this.roomTypeArr.forEach((e, i)=>{
          if(e.value == this.headjson.roomType) {
            this.headjson.roomTypeName = e.label
          }
        })
        // let num = this.headjson.roomMany - this.checkpointNum
        for(let i = 0; i < this.headjson.roomMany; i++) {
          let json = {
            room_name: '',
            room_type_id: this.headjson.roomType,
            come_time: this.headjson.startDateTime,
            leave_time: this.headjson.endDateTime,
            room_type_name: this.headjson.roomTypeName,
            price: resData[0].rooms[0].price,
            ruzhuren: '',
            ruzhurenTitle: '多个用"|"分开',
          }
          this.totalRoomManyArr.push(json)
        }
        // console.log('nnnnnmmmmmmnnnmmm00', this.headjson)
        // console.log('nnnnnmmmmmmnnnmmm', this.totalRoomManyArr)
        this.isOnce = false
        this.checkpointNum = this.headjson.roomMany
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
      addOneDay() {
        if(this.stayHowManyDay < 28) {
          if (this.headjson.startDateTime == '') {return}
          this.stayHowManyDay++
          let mydate = new Date(this.headjson.startDateTime.split(' ')[0])  //this.headjson.startDateTime.split(':')[0]
          let year = mydate.getFullYear()
          let month = Math.floor(mydate.getMonth())
          let date = mydate.getDate()   
          let days = new Date(year, month + 1, 0).getDate()
          let newdate;
          if((Math.floor(date) + Math.floor(this.stayHowManyDay)) > Math.floor(days)) {
            month = (month + 2) < 10 ? '0' + (month + 2) :(month + 2)
            if(Math.floor(month) < 12) {
              newdate = Math.floor(this.stayHowManyDay) - (Math.floor(days) - Math.floor(date))
              newdate = newdate < 10? '0' + newdate : newdate
              this.headjson.endDateTime = [`${year}-${month}-${newdate}`, this.headjson.startDateTime.split(' ')[1]].join(' ')
            }else{
              year = Math.floor(mydate.getFullYear()) + 1
              month = '01'
              newdate = Math.floor(this.stayHowManyDay) - (Math.floor(days) - Math.floor(date))
              newdate = newdate < 10? '0' + newdate : newdate
              this.headjson.endDateTime = [`${year}-${month}-${newdate}`, this.headjson.startDateTime.split(' ')[1]].join(' ')   //`${year}-${month}-${newdate}`
            }
          }else{
            newdate =  (Math.floor(date) + Math.floor(this.stayHowManyDay))
            this.headjson.endDateTime = [`${year}-${month + 1 < 10?'0'+(month + 1):month + 1}-${newdate < 10?'0'+newdate:newdate}`, this.headjson.startDateTime.split(' ')[1]].join(' ')
          }
        }
        if(this.dateTimeLock) {
          this.getMaxDay()
        }
        if(!this.isOnce) {
          this.totalRoomManyArr = []
          this.iconShow = false
          this.headjson.roomMany = 0
        }
      },
      deleOneDay() {
        if(this.stayHowManyDay > 0) {
          this.stayHowManyDay--
          let mydate = new Date(this.headjson.startDateTime.split(' ')[0])
          let year = mydate.getFullYear()
          let month = Math.floor(mydate.getMonth())
          let date = mydate.getDate()   
          let days = new Date(year, month + 1, 0).getDate()
          let newdate;
          if((Math.floor(date) + Math.floor(this.stayHowManyDay)) > Math.floor(days)) {
            month = (month + 2) < 10 ? '0' + (month + 2) :(month + 2)
            if(Math.floor(month) < 12) {
              newdate = Math.floor(this.stayHowManyDay) - (Math.floor(days) - Math.floor(date))
              newdate = newdate < 10? '0' + newdate : newdate
              this.headjson.endDateTime = [`${year}-${month}-${newdate}`, this.headjson.startDateTime.split(' ')[1]].join(' ')
            }else{
              year = Math.floor(mydate.getFullYear()) + 1
              month = '01'
              newdate = Math.floor(this.stayHowManyDay) - (Math.floor(days) - Math.floor(date))
              newdate = newdate < 10? '0' + newdate : newdate
              this.headjson.endDateTime = [`${year}-${month}-${newdate}`, this.headjson.startDateTime.split(' ')[1]].join(' ')   //`${year}-${month}-${newdate}`
            }
          }else{
            newdate =  (Math.floor(date) + Math.floor(this.stayHowManyDay))
            this.headjson.endDateTime = [`${year}-${month + 1 < 10?'0'+(month + 1):month + 1}-${newdate < 10?'0'+newdate:newdate}`, this.headjson.startDateTime.split(' ')[1]].join(' ')
          }
        }
        if(this.dateTimeLock) {
          this.getMaxDay()
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
			}
		},
    components: {
      roomNumber
    },
    created() {
      this.start()
      this.getRoomType()
      this.getSourceChannelArr()
      this.getGuaranteeArr()
      this.getarrivalTimeArr()
    }
	}
</script>

<style lang="scss" scoped>
  .batch-reservation{
    user-select: none;
  	padding-top: 50px;
  	font-size: 14px;
  	background: #f2f2f2;
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
  		padding-left: 250px;
  		background: #fff;
  		padding-top: 40px;
  		padding-right: 50px;
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
  			li{
  				height: 40px;
  				line-height: 40px;
  				text-align: center;  				
  				border-left: 1px solid #a9bfd6;
  				border-bottom: 1px solid #a9bfd6;
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
		  .one{
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
		  .four{

		  }
		  .five{
		  	.listarea{
		  		border: 1px solid #f2f2f2;
		  		border-radius: 6px;
		  		width: 856px;
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
      width: 100px;
      .prebox{
        position: absolute;
        left: 0; bottom: 0;
        .box{
          width: 14px;
          height: 14px;
          border: 1px solid #ccc;
          border-radius: 1px;
        }
      }
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
      width: 100px;
      height: 40px;
      border-radius: 4px;
      line-height: 40px;
      text-align: center;
      color: #fff;
      background: #6a9df6;
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