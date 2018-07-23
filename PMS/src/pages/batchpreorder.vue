<template>  <!-- 批量预定 -->
	<div @click="setIndex" class="room-display">
		<div class="whitetext">
			<header>
				<span class="middle">当前位置</span>
				<span style="margin-right: 18px;" class="middle">：</span>
				<span style="margin-right: 18px;" class="middle">预定管理</span>
				<span style="margin-right: 18px;" class="middle">></span>
				<span style="color: #437ff9;" class="middle">批量预定</span>
		  </header>
		  <ul class="list">
        <li v-show="isFillInAll" style="color: red; position: absolute; top: 0;left: 50%; margin-left: -56px;font-size: 16px;">有必填项没有填写</li>
		  	<li class="title">基本信息</li>
		  	<li class="one">
		  		<nav style="margin-right: 50px;" class="middle">
		  			<span style="width: 56px; text-align: right" class="middle">预定人</span>
		  			<span class="middle">：<span class="red">*</span></span>
		  			<input v-model="headjson.reservations" style="width: 168px;" class="middle" type="text">
		  		</nav>
		  		<section class="middle">
		  			<span class="middle">预定手机</span>
		  			<span class="middle">：<span class="red">*</span></span>
		  			<input @blur="checkPhone(headjson.reservationPhone)" v-model="headjson.reservationPhone" style="width: 168px;" class="middle" type="text">
            <span style="color: red;">{{phoneErrorText}}</span>
		  		</section>
		  	</li>
		  	<li class="two">
		  		<nav style="margin-right: 42px;" class="middle">
		  			<span class="middle">客源渠道</span>
			  		<span class="middle">：<span class="red">*</span></span>
			  		<!-- <input style="width: 168px;" class="middle" type="text"> -->
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
		  			<div class="middle sou">搜索</div>
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
		  			<el-date-picker @change="changeStartDate" value-format="yyyy-MM-dd HH:mm:ss" size="mini" placehoder="2010-00-00" type="datetime" v-model="headjson.startDateTime" :picker-options="pickerOptions">
						</el-date-picker>
						<!-- <span @click="choiceStartTime = true" class="middle choice">
							{{headjson.startTime}}
							<div class="select-icon"></div>
							<ul v-show="choiceStartTime" class="select-list">
								<li @click.stop="getStartTime(item)" v-for="(item, index) in hours" :key="index" class="select-list-li">{{item}}</li>
							</ul>
						</span> -->
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
		  			<el-date-picker @change="countHowManyDay" value-format="yyyy-MM-dd HH:mm:ss" size="mini" placehoder="2010-00-00" type="datetime" v-model="headjson.endDateTime" :picker-options="pickerOptions">
						</el-date-picker>
						<!-- <span @click="choiceEndTime = true" class="middle choice">
							{{headjson.endTime}}
							<div class="select-icon"></div>
							<ul v-show="choiceEndTime" class="select-list">
								<li @click.stop="getEndTime(item)" v-for="(item, index) in hours" :key="index" class="select-list-li">{{item}}</li>
							</ul>
						</span> -->
		  		</nav>
		  	</li>
		  	<li class="four">
		  		<!-- <nav style="margin-right: 42px;" class="middle">
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
		  		</nav> -->
		  		<!-- <nav style="margin-right: 44px;" class="middle">
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
		  			<!-- <input style="width: 168px;" class="middle" type="text"> -->
		  			<!-- <el-select v-model="headjson.mayBeTime" size="mini" filterable placeholder="请选择">
					    <el-option
					      v-for="item in arrivalTimeArr"
					      :key="item.id"
					      :label="item.name"
					      :value="item.id">
					    </el-option>
					  </el-select> -->
            <!-- <input v-model="headjson.mayBeTime" readonly type="text">  @change="mayBeTimeChange" -->
            <el-time-picker v-model="headjson.mayBeTime" size="mini" format='HH:mm:ss'></el-time-picker>
		  		</nav>
          <nav style="margin-right: 50px;position: relative;" class="middle">
            <span style="width: 56px; text-align: right" class="middle">预定定金</span>
            <span style="margin-right: 6px;" class="middle">：</span>
            <input @blur="checkReservationMoney(headjson.reservationMoney)" v-model="headjson.reservationMoney" style="width: 168px;" class="middle" type="number">
            <span style="position:absolute; top: 90%;left:88px; color: red;">{{reservationMoneyErrorText}}</span>
          </nav>
		  	</li>
		  	<li class="four">
		  		<!-- <nav style="margin-right: 50px;position: relative;" class="middle">
		  			<span style="width: 56px; text-align: right" class="middle">预定定金</span>
		  			<span style="margin-right: 6px;" class="middle">：</span>
		  			<input @blur="checkReservationMoney(headjson.reservationMoney)" v-model="headjson.reservationMoney" style="width: 168px;" class="middle" type="number">
            <span style="position:absolute; top: 90%;left:88px; color: red;">{{reservationMoneyErrorText}}</span>
		  		</nav> -->
		  		<nav style="margin-right: 72px;" class="middle">
		  			<span style="width: 56px; text-align: right" class="middle">是否团体</span>
		  			<span style="margin-right: 8px;" class="middle">：<span class="red"></span></span>
		  			<!-- <input style="width: 168px;" class="middle" type="text"> -->
		  			<el-select v-model="headjson.group" size="mini" filterable placeholder="请选择">
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
		  	<li @click="automaticRoom" class="btn">自动排房</li>
		  	
		  	<li id="two-list" class="clearfix">
		  		<div class="left">
		  			<div class="left-head">
		  				<ul style="color: #fff;background: #4b5967;">
		  					<li>房型</li>
		  					<li>可预定数</li>
		  					<li>可超订数</li>
		  					<li style="border-right: 1px solid #a9bfd6;">预定数</li>
		  				</ul>
		  				<ul v-for="(item, index) in roomTypeArr">
		  					<li>{{item.room_type_name}}</li>
		  					<li>{{item.num}}</li>
		  					<li>{{item.more}}</li>
		  					<li class="relative" style="border-right: 1px solid #a9bfd6;">
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
		  			<div style="color: #fff; background: #4b5967;" class="angelist">
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
				  	</div>
				  	<div ref="test" v-for="(item, index) in selectedRoomTypeArr" class="angelist">
				  		<ul  v-for="(data, num) in item.arr" class="list-title">
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
				  			<li style="position: relative;cursor: pointer;" @click.stop="roomNumShow(item,index,num)" class="two">
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
                    <span v-if="data.room_name == ''" style="color: #6a9df6;">点击排房</span>
                    <span v-else>{{data.room_name}}</span>
                  </div>   
                </li>
				  			<li class="one">{{item.price}}</li>
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
											<span class="middle ">icon</span>
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
											<span class="middle ">icon</span>
										</p>
									</div>
				  			</li>
				  			<li class="three">  <!-- @click.stop="getRuzhuren(data,num,index)" -->
                  <input placeholder='多个用"|"分开' v-model="data.ruzhuren" ref="ruzhuren" id="ruzhuren" type="text">
                </li> 
				  			<li @click="rightDele(data,num,item,index)" style="border-right: 1px solid #a9bfd6; color: red; cursor: pointer;" class="one">删除</li>
              </ul>
				  	</div>
		  		</div>
		  	</li>
		  </ul>
		  <footer @click="givePost">确定</footer>
		</div>
    <room-number @giveNumSelected="getSelected" v-if="isRoomNumShow" @roomNumberBeNone="numberBeNone" :roomList="buildFloorRoomArr"></room-number>
	</div>
</template>

<script>
import roomNumber from "@/components/public/roomnumber"
import { mapGetters } from 'vuex'
import bus from "@/store/bus"
import API from "@/store/API"
	export default{
		name: 'batchPreorder',
		data() {
			return {
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
				dateValue: ''
			}
		},
    computed: {
      ...mapGetters({
        hotel:'currHotel'
      })
    },
		methods:{
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
        if (this.headjson.reservations == '' || this.headjson.reservationPhone == '' || this.headjson.reservationWay == '' || this.headjson.mayBeTime == '' || this.headjson.reservationWay == '' || this.headjson.startDateTime == '' || this.headjson.endDateTime == '') {
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
            if (v.ruzhuren != '') {
              v.ruzhuren.split('|').forEach(d=>{
                array.push({
                  name: d
                })
              })
            } else {
              /*
              this.$alert('入住人没有填写', '', {
                confirmButtonText: '确定'
              })
              return
              */
            }
            arr.push({
              room_id: v.roomId == ''?0:v.roomId,
              member: array,
              come_time: v.come_time,
              leave_time: v.leave_time,
              hotel_id: this.hotel.id,
              room_type_id: e.typeId
            })
          })
        })
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
        API.post("/pms/preorder", obj).then(res=>{
          if(res.error_code == 0) {
            // Object.assign(this.$data, this.$options.data())
            this.selectedRoomTypeArr = []
            this.roomTypeArr = []
            this.isOnce = true
            this.tableListLock = false;
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
              e.arr.forEach((v,n)=>{
                v.ruzhuren = ''
              })
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
        if(this.headjson.reservations == '' || this.headjson.reservationPhone == '' || this.headjson.reservationWay == '' || this.headjson.startDateTime == '' || this.headjson.endDateTime == '' || this.headjson.mayBeTime == '') {
          return this.isFillInAll = true
        }
        let obj = {
          "come_time": this.headjson.startDateTime,
          "leave_time": this.headjson.endDateTime,
          "hotel_id": this.hotel.id
        }
        API.post("/pms/preorder/batchroomtype", obj).then(res=>{
          if (res.error_code == 0) {
            let arr = res.data
            // console.log('>>>>',arr)
            arr.forEach((e,i)=>{
              e.number = 0
              e.maxNum = e.num + e.more
              e.srcNum = e.num
              e.srcMore = e.more
            })
            this.roomTypeArr = arr
          }
        })
        this.tableListLock = true;
        this.isFillInAll = false;
        this.isOnce = false
        this.iconShow = true
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
        let reg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0|3,5-9]))\d{8}$/;
        reg.test(e)? this.phoneErrorText = '' : this.phoneErrorText = '请输入正确的手机号码'
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
        this.selectedRoomTypeArr[this.nowIndex].arr[this.nowNum].room_name = e.name
        this.selectedRoomTypeArr[this.nowIndex].arr[this.nowNum].roomId = e.id
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
      roomNumShow(item,index,num) {
        this.isPriceListShow = false;
        let obj = {
          "come_time": this.headjson.startDateTime,
          "leave_time": this.headjson.endDateTime,
          "num":-1,
          "room_type_id": item.typeId       //item.typeId
        }
        if (item.totalList.length == 0) {
          API.post("/pms/room/auto", obj).then(res=>{
            if (res.error_code == 0) {
              let arr = res.data
              arr[0].rooms.forEach((e,i)=>{
                item.totalList.push({
                  id: e.id,
                  name: e.room_name
                })
              })
              this.buildFloorRoomArr = item.totalList
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
      addOneDay() {
        if(this.stayHowManyDay < 28) {
          this.stayHowManyDay++
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
        if(!this.isOnce) {
          this.iconShow = false
          this.roomTypeArr = []
          this.selectedRoomTypeArr = []
          this.roomTypeArr.forEach((e,i)=>{
            e.number = 0
          })
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
        if(!this.isOnce) {
          this.iconShow = false
          this.roomTypeArr = []
          this.selectedRoomTypeArr = []
          this.roomTypeArr.forEach((e,i)=>{
            e.number = 0
          })
        }
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
      this.getSourceChannelArr()
      this.getGuaranteeArr()
      this.start()
    },
    components: {
      roomNumber
    }
	}
</script>

<style lang="scss" scoped>
  .room-display{
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
  	footer{
  		width: 100px;
  		height: 40px;
  		line-height: 40px;
  		text-align: center;
  		background: #437ff9;
  		color: #fff;
  		border-radius: 6px;
			margin: 0 auto;
			margin-top: 30px;
			cursor: pointer;
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
  				border-left: 1px solid #a9bfd6;
  				border-bottom: 1px solid #a9bfd6;
          white-space: nowrap;
  				text-overflow:ellipsis;
  			}
  			.one{
  				flex: 2;
  			}
  			.two{
  				flex: 3;
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
                background: #6a9df6;
                color: #fff;
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
  				border-left: 1px solid #a9bfd6;
  				border-bottom: 1px solid #a9bfd6;
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