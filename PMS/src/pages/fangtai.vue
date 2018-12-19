<template>
	<div @keyup.116.prevent="doDiaolog" class="fangtai">
		<clum-bread :redStar="false" :data="['当前位置','房态中心','房态图']"></clum-bread>
    <div class="head">
    	<div class="one">
    		<p class="aligntop">房间状态：</p>
    		<div style="width: 92%" class="list aliTop">
    			<ul>
    				<li class="middle list-li">
    					<div @click="ClickStatuIdAll" class="middle">
    						<div class="checkbox middle">
	    						<nav style="margin-left: -2px;font-size: 20px;font-weight: bold; color: #6a9df6;" :class="{'icon-gou' : isClickStatuIdAll}" class="iconfont"></nav>
	    					</div>
	    					<span class="middle">全部</span>   <!--  @click="getvip('vip')" -->
    					</div>
    				</li><li @click="checkRoomStatu(item.status)" :key="index" class="middle list-li" v-for="(item, index) in roomStatuArr">
    					<div class="checkbox middle">
    						<nav style="margin-left: -2px;font-size: 20px;font-weight: bold; color: #6a9df6;" :class="{'icon-gou' : hasClickStatuIdArr.includes(item.status)}" class="iconfont"></nav>
    					</div>
    					<span class="middle">{{item.status_name}}（{{item.count}}）</span>
    				</li>
     			</ul>
    		</div>
    	</div>
    	<div class="one">
    		<p class="aligntop">房间标签：</p>
    		<div style="width: 92%" class="list middle">
    			<ul>
    				<li class="middle list-li">
    					<div @click="ClickTagsIdAll" class="middle">
	    					<div class="checkbox middle">
	    						<nav style="margin-left: -2px;font-size: 20px;font-weight: bold; color: #6a9df6;" :class="{'icon-gou' : isClickTagsIdAll}" class="iconfont"></nav>
	    					</div>
	    					<span style="margin-right: 0;" class="middle">全部</span>
	    				</div>
    				</li><li @click="checkTags(item.id)" class="middle list-li" :key="index" v-for="(item, index) in tagsArr">  <!-- tagsArr -->
    					<div class="checkbox middle">
    						<nav style="margin-left: -2px;font-size: 20px;font-weight: bold; color: #6a9df6;" :class="{'icon-gou' : hasClickTagsIdArr.includes(item.id)}" class="iconfont"></nav>
    					</div>
    					<span class="middle">{{item.name}}</span>
    				</li>
    			</ul>
    		</div>
    	</div>
    	<div class="one">
    		<p class="aligntop aliRight">房型：</p>
    		<div style="width: 92%" class="list middle">
    			<ul>
    				<li class="middle list-li">
    					<div @click="ClickRoomTypeIdAll" class="midle">
    						<div class="checkbox middle">
	    						<nav style="margin-left: -2px;font-size: 20px;font-weight: bold; color: #6a9df6;" :class="{'icon-gou' : isClickRoomTypeIdAll}" class="iconfont"></nav>
	    					</div>
	    					<span class="middle">全部</span>
    					</div>
    				</li><li @click="checkRoomType(item.id)" class="middle list-li" :key="index" v-for="(item, index) in roomTypeArr">
    					<div class="checkbox middle">
    						<nav style="margin-left: -2px;font-size: 20px;font-weight: bold; color: #6a9df6;" :class="{'icon-gou' : hasClickRoomTypeIdArr.includes(item.id)}" class="iconfont"></nav>
    					</div>
    					<span style="width:130px;"  class="middle ellipsis">{{item.name}}</span>
    				</li>
    			</ul>
    		</div>
    	</div>
    	<div class="color">
    		<ul>
    			<li class="middle">
    				<div class="middle bjone"></div>
    				<p class="middle">空净</p>
    			</li>
    			<li class="middle">
    				<div class="middle bjfour"></div>
    				<p class="middle">空脏</p>
    			</li>
    			<li class="middle">
    				<div class="middle bjfive"></div>
    				<p class="middle">住净</p>
    			</li>
    			<li class="middle">
    				<div class="middle bjsix"></div>
    				<p class="middle">住脏</p>
    			</li>
    			<li class="middle">
    				<div class="middle bjtwo"></div>
    				<p class="middle">停用房</p>
    			</li>
    			<li class="middle">
    				<div class="middle bjthree"></div>
    				<p class="middle">维修</p>
    			</li>
    		</ul>
    	</div>
    	<ol class="titel">
    		<li @click="getRoomNums(item.id,index)" :class="{'active': buildActive == index}" :key="index" v-for="(item, index) in builds" class="middle">{{item.build_num}}</li>
    	</ol>
    	<div class="contain">
				<div class="floor" :key="Index" v-for="(value, Index) in showFloor">
					<p :title="value.floor_num" class="aliTop floornum">{{value.floor_num}}楼：</p>
					<div class="aliTop roomnum">
						<ul>
							<li :class="[fourClassArr[fourNameArr.indexOf(item.status)].border,{'clickBorderColor': isClickShow == item}]" ref="boundingRect" @click="clickShow(item,index)" @mouseleave="setFalse" @mouseenter="checkBindHover(item)" class="aliTop" :key="index" v-for="(item, index) in value.rooms">
								<h6>{{item.name}} {{item.code}}</h6>
								<!-- <p>
									<span>{{item.message?item.message[0]:''}}</span>
									<span>{{item.message?item.message[1]:''}}</span>
								</p> -->
								<div style="line-height: 0px;" class="icon">
									<i :style="{'color': fourClassArr[fourNameArr.indexOf(item.status)].color}" style="font-size: 36px;" :class="item.icon" class="iconfont"></i>
								</div>
								<!--
								<nav :class="{'isshow': isBindHover == item}" class="bindHover">
									<p class="bindHoverTop">
										<span>来源渠道</span>
										<span>：</span>
										<span>手动阀手动阀</span>
									</p>
									<p>
										<span>来源渠道</span>
										<span>：</span>
										<span>手动阀手动阀</span>
									</p>
									<p class="bindHoverBottom">
										<span>来源渠道</span>
										<span>：</span>
										<span>手动阀手动阀</span>
									</p>
								</nav>  
								-->  
								<section :class="{'clickshow': isClickShow == item}" class="titlelog">
									<ol v-show="willBeList.length">
										<li @click="setListTo(value,item,element,Index,index,i)" :class="{'hasActive': hasActive == i, 'borderNone': i == willBeList.length - 1}" :key="i" v-for="(element, i) in willBeList" class="diaologList">{{element}}</li>
									</ol>
								</section>
							</li>
						</ul>
					</div>
				</div>
    	</div>
    </div>
		<!-- <new-stay :msg="msgForNewStay" @letNewStayNone="setStayBeNone" v-if="isNewStayShow"></new-stay> -->
		<new-stay-tai :msg="msgForNewStay" @letNewStayNone="setStayBeNone" v-if="isNewStayShow"></new-stay-tai>
    <other @getBeNone="setBeNone" v-show="otherShow"></other>
    <get-money :msg="msgForMoney" v-if="moneyShow" @getMoneyBeNone="setGetMoneyNone"></get-money>
    <exchange-room :list="changeRoom" v-if="exchangeroomShow"></exchange-room>
    <stop-use :val="forStopUse" v-if="stopUseShow"></stop-use>
    <re-new v-show="renewShow"></re-new>
	</div>
</template>

<script>
import newStayTai from "@/components/public/newstaytai"
import newStay from "@/components/public/newstay"
import clumBread from "@/components/public/clumbread"
import reNew from "@/components/public/renew"   //  xufang
import stopUse from "@/components/public/stopuse"   //  tingyong   weixiu
import exchangeRoom from "@/components/public/exchangeroom"  //换房
import bus from "@/store/bus"
import other from "@/components/public/other"     //  备注  其他？
import beStay from "@/components/public/bestay"   //   办理入住
import getMoney from "@/components/public/getmoney"    //  客房详情   就是这里的退房
import API from "@/store/API"
import { mapGetters } from 'vuex'
	export default{
		name: 'fangTai',
		data() {
			return {
				msgForNewStay: '',
				isNewStayShow: false,
        forStopUse: '',
				msgForMoney: '',
				saveItem: '',
				changeRoom: '',
				isClickRoomTypeIdAll: false,
				isClickTagsIdAll: false,
				isClickStatuIdAll: false,
				hasClickStatuIdArr: [],
				hasClickTagsIdArr: [],
				hasClickRoomTypeIdArr: [],
				roomTypeArr: [],
				renewShow: false,
				stopUseShow: false,
				exchangeroomShow: false,
				moneyShow: false,
				roomStatuArr: [],
				tagsArr: [],
				stayShow: false,
				otherShow: false,
				hasActive: -1,
				fourIconName:['','','',''],
				totalFloors: [             //初始化用   保存  结构赋值  解除关联
				],
				isClickShow: -1,
				isBindHover: -1,
				willBeOne: ['办理入住','转为空脏','转为维修','转为停用'],  //空净
				willBeTwo: ['转为维修','转为停用','通知打扫','转为空净'],  // kongzang
				willBeThree: ['账单','续房','换房'],    //zhujing  ,'备注'
				willBefour: ['账单','续房','换房','通知打扫'], // zhuzang   ,'备注'
				willBefive: ['查看停用','结束停用'],   //tingyong
				willBesix: ['查看维修','结束维修'],     // weixiu
				willBeList: [],
				buildActive: 0,
				builds: [
				],
				showFloor:[],
				fourClassArr: [
				  {border: 'tingyong', color: '#ebe250'},
				  {border: 'weixiu', color: '#da756b'},
				  {border: 'kongjing', color: '#79e2e0'},
				  {border: 'kongzang', color: '#cacbcc'},
				  {border: 'zhujing', color: '#f6a56a'},
				  {border: 'zhuzang', color: '#6a9df6'}],
				fourNameArr: [5, 4, 0, 1, 2, 3]
			}
		},
		methods: {
			successTitle() {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
      },
			getRoomNums(id,i,str) {
				// API.getRoomNums(id).then(res=>{
				// 	// console.log('jknfdkjldfslkjdfs',res)
				// 	if(res.error_code == 0) {
        //     // this.hasClickStatuIdArr = []
				// 		// this.showFloor = res.data
        //     this.getroomStatuArr()
				// 		if (str) {
				// 			this.showFloor = res.data
				// 		} else {
				// 			this.roomSearch()
				// 		}
				// 	}
				// })
				this.buildActive = i
            this.getroomStatuArr()
            this.roomSearch()
			},
			getHasedBuild() {
				API.getHasedBuild(this.hotel.id).then(res=>{
					// console.log('5456456456',res)
					if(res.error_code == 0) {
						this.builds = res.data
						this.getRoomNums(this.builds[0].id, 0,'str')
					} else {
          if (res.msg) {
            this.$message.error(`${res.msg}`)
          }
        }
				})
			},
			ClickTagsIdAll() {
				if(this.isClickTagsIdAll){
					this.hasClickTagsIdArr = [];
					this.isClickTagsIdAll = false
				}else{
          this.hasClickTagsIdArr = [];
					this.tagsArr.forEach((element,i)=>{
						this.hasClickTagsIdArr.push(element.id)
					})
					this.isClickTagsIdAll = true
				}
				this.roomSearch()
			},
			ClickRoomTypeIdAll() {
				if(this.isClickRoomTypeIdAll){
					this.hasClickRoomTypeIdArr = [];
					this.isClickRoomTypeIdAll = false
				}else{
          this.hasClickRoomTypeIdArr = [];
					this.roomTypeArr.forEach((element,i)=>{
						this.hasClickRoomTypeIdArr.push(element.id)
					})
					this.isClickRoomTypeIdAll = true
				}
				this.roomSearch()
			},
			ClickStatuIdAll() {
				if(this.isClickStatuIdAll){
					this.hasClickStatuIdArr = [];
					this.isClickStatuIdAll = false
				}else{
          this.hasClickStatuIdArr = [];
					this.roomStatuArr.forEach((element,i)=>{
						this.hasClickStatuIdArr.push(element.status)
					})
					this.isClickStatuIdAll = true
				}
				this.roomSearch()
			},
			getRoomTypeArr() {
				API.getRoomType(this.hotel.id).then(res=>{
					this.roomTypeArr = res.data
				})
			},
			// getRoomStatus() {
			// 	API.get("/pms/roomstatus?hotel_id=1&build_id=1").then(res=>{
			// 		// console.log('mmmmmmmmmm',res)
			// 	})
			// },
			setGetMoneyNone(e) {
        this.moneyShow = false
				if (e != null) {
					this.saveItem.status = 1
          this.roomStatuArr.forEach((val,i)=>{
            if (val.status == 1) {
              this.roomStatuArr[i].count++
            } else if (val.status == 2) {
              this.roomStatuArr[i].count--
            }
          })
					this.saveItem.icon = "icon-zangfang"   ///     要 有判断了
				}
			},
			getroomStatuArr() {
				API.getroomStatuArr(this.hotel.id).then(res => {
					if(res.error_code == 0) {
						this.roomStatuArr = []
						this.roomStatuArr = res.data
					} else {
          if (res.msg) {
            this.$message.error(`${res.msg}`)
          }
        }
				})
			},
			getTagsArr() {
				API.getTagsArr().then(res => {
					this.tagsArr = res.data
				})
			},
			doDiaolog() {

			},
			setStayBeNone(e) {
				// this.stayShow = false
				this.isNewStayShow = false
				if(e) {
					console.log('fdsfsdfhehehehehehe00',e)
					this.showFloor[e.floorIndex].rooms[e.roomIndex].status = 2
          this.showFloor[e.floorIndex].rooms[e.roomIndex].icon = 'icon-zaizhu'
          this.showFloor[e.floorIndex].rooms[e.roomIndex].order_id = e.order_id
          this.roomStatuArr.forEach((val,i)=>{
            if (val.status == 2) {
              this.roomStatuArr[i].count++
            } else if (val.status == 0) {
              this.roomStatuArr[i].count--
            }
          })
				}
			},
			setBeNone() {
				this.otherShow = false
			},
			setListTo(value,item, element, I,i,n) {   //原始项  父级项  自己项  原始项下表 父级的下标 
				// this.hasActive = n;
				switch(element) {
					case '办理入住':
						item.hotelId = this.hotel.id
						item.buildName = this.builds[this.buildActive].build_num
					  // bus.ev.$emit('willBeStay', {'value': item,'index': i, 'Index': I})
						// this.stayShow = true;
						this.msgForNewStay = {'value': item,'index': i, 'Index': I,status: 0}
						this.isNewStayShow = true
						this.willBeList = []
					return;
					case '转为空脏':
					  API.beDirty(item.id).then(res=>{
					  	if(res.error_code == 0) {
					  		item.status = 1
                this.roomStatuArr.forEach((val,i)=>{
                  if (val.status == 1) {
                    this.roomStatuArr[i].count++
                  } else if (val.status == 0) {
                    this.roomStatuArr[i].count--
                  }
                })
					  		item.icon = 'icon-zangfang'
					  		this.successTitle()
					  	} else {
                if (res.msg) {
                  this.$message.error(`${res.msg}`)
                }
              }
					  })
					  this.willBeList = []
					break;
					case '转为维修':
            // this.roomStatuArr.forEach((val,i)=>{
            //   if (val.status == item.status) {
            //     this.roomStatuArr[i].count++
            //   }
            // })
					  let obj = {'pagename': '维修','value': {...item},'index': i, 'Index': I}
					  // bus.ev.$emit('willBeStopUse', obj)
            this.forStopUse = obj;
						this.stopUseShow = true;
						this.willBeList = []
					break;
					case '转为停用':
					  let o = {'pagename': '停用','value': {...item},'index': i,'Index': I}
						// bus.ev.$emit('willBeStopUse', o)
            this.forStopUse = o;
						this.stopUseShow = true;
						this.willBeList = []
					break;
					case '通知打扫':
					  API.callClean({"hotel_id": this.hotel.id,"order_id":item.order_id, "room_id": item.id}).then(res=>{
					  	if(res.error_code == 0) {
					  		this.successTitle()
					  	} else {
                if (res.msg) {
                  this.$message.error(`${res.msg}`)
                }
              }
					  })
					break;
					case '转为空净':
					  API.beClean(item.id).then(res=>{
              this.willBeList = []
					  	if(res.error_code == 0) {
					  		item.status = 0
					  		item.icon = ''
                this.roomStatuArr.forEach((val,i)=>{
                  if (val.status == 0) {
                    this.roomStatuArr[i].count++
                  } else if (val.status == 1) {
                    this.roomStatuArr[i].count--
                  } 
                })
					  		this.successTitle()
					  	} else {
                if (res.msg) {
                  this.$message.error(`${res.msg}`)
                }
              }
					  })
					  // this.willBeList = []
					break;
					case '账单':
						this.moneyShow = true;
						this.msgForMoney = item
						// bus.ev.$emit('willBeGetMoney',item)
					break;
					case '续房':
						bus.ev.$emit('willBeRenew', item)
						this.renewShow = true
						this.willBeList = []
					break;
					case '换房':
						item.roomIndex = i
						item.floorIndex = I
					  this.changeRoom = item
					  this.exchangeroomShow = true
					break;
					case '备注':
					  // this.otherShow =true
					break;
					case '查看维修':
					  this.stopUseShow = true
					  // bus.ev.$emit('willBeStopUse', {'pagename': '维修','value': item})
            this.forStopUse = {'pagename': '维修','value': item}
					  this.willBeList = []
					break;
					case '查看停用':
					  this.stopUseShow = true
					  // bus.ev.$emit('willBeStopUse', {'pagename': '停用','value': item})
            this.forStopUse = {'pagename': '停用','value': item}
					  this.willBeList = []
					break;
					case '结束维修':
					  API.beDirty(item.id).then(res=>{
					  	if(res.error_code == 0) {
					  		item.status = 1
                item.icon = 'icon-zangfang'
                this.roomStatuArr.forEach((val,i)=>{
                  if (val.status == 1) {
                    this.roomStatuArr[i].count++
                  } else if (val.status == 4) {
                    this.roomStatuArr[i].count--
                  }
                })
					  		this.successTitle()
					  	} else {
                if (res.msg) {
                  this.$message.error(`${res.msg}`)
                }
              }
					  })
					  this.willBeList = []
					break;
					case '结束停用':
					  API.beDirty(item.id).then(res=>{
					  	if(res.error_code == 0) {
					  		item.status = 1
                item.icon = 'icon-zangfang'
                this.roomStatuArr.forEach((val,i)=>{
                  if (val.status == 1) {
                    this.roomStatuArr[i].count++
                  } else if (val.status == 5) {
                    this.roomStatuArr[i].count--
                  }
                })
					  		this.successTitle()
					  	} else {
                if (res.msg) {
                  this.$message.error(`${res.msg}`)
                }
              }
					  })
					  this.willBeList = []
					break;
				} 
			},
			noBeTheSame() {
				this.showFloor = [...this.totalFloors]
			},
			roomSearch() {
				let loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
				let obj = {
					"room_type": this.hasClickRoomTypeIdArr.join(','),
					"status": this.hasClickStatuIdArr.join(','),
					"tag": this.hasClickTagsIdArr.join(','),
					"build_id": this.builds[this.buildActive].id
				}
				API.roomSearch(obj).then(res=>{
					if (res.error_code == 0) {
						this.showFloor = res.data
						loading.close()
						loading = null
					}
				})
			},
			checkRoomStatu(id) {				
				if(this.hasClickStatuIdArr.includes(id)){
					let find = this.hasClickStatuIdArr.indexOf(id)
					this.hasClickStatuIdArr.splice(find, 1)
				}else{
					this.hasClickStatuIdArr.push(id)
				}
				this.roomSearch()

			},
			checkTags(id) {
				if(this.hasClickTagsIdArr.includes(id)){
					let find = this.hasClickTagsIdArr.indexOf(id)
					this.hasClickTagsIdArr.splice(find, 1)
				}else{
					this.hasClickTagsIdArr.push(id)
				}
				this.roomSearch()
			},
			checkRoomType(id) {
				if(this.hasClickRoomTypeIdArr.includes(id)){
					let find = this.hasClickRoomTypeIdArr.indexOf(id)
					this.hasClickRoomTypeIdArr.splice(find, 1)
				}else{
					this.hasClickRoomTypeIdArr.push(id)
				}
				this.roomSearch()
			},
			setFalse() {
				this.isBindHover = -1;
				this.isClickShow = -1
			},
			clickShow(item,i) {
				console.log('dsfdsfd102101201',this.$refs.boundingRect[i].getBoundingClientRect())
				this.saveItem = item;
				this.isBindHover = -1;
				switch (item.status) {
					case 0:
					  this.willBeList = []
						this.willBeList = this.willBeOne;
						break;
					case 1:
					  this.willBeList = []
					  this.willBeList = this.willBeTwo;
						break;
					case 2:
					  this.willBeList = []
					  this.willBeList = this.willBefour;  //willBeThree
						break;
					case 3:
					  this.willBeList = []
					  this.willBeList = this.willBefour;
						break;
					case 5:
					  this.willBeList = []
					  this.willBeList = this.willBefive;
						break;
					case 4:
					  this.willBeList = []
					  this.willBeList = this.willBesix;
						break;
					default:
					  this.isClickShow = -1
					  this.willBeList = []
					break;
				}
				this.isClickShow = item;
			},
			checkBindHover(i) {
				this.isBindHover = i
			}
		},
		watch: {
			hasClickStatuIdArr(newval) {
				if(newval.length == this.roomStatuArr.length && newval.length != 0) {
					this.isClickStatuIdAll = true
				}else{
					this.isClickStatuIdAll = false
				}
			},
			hasClickTagsIdArr(newval) {
        if(newval.length == this.tagsArr.length && newval.length != 0) {
        	this.isClickTagsIdAll = true
        }else{
        	this.isClickTagsIdAll = false
        }
			},
			hasClickRoomTypeIdArr(newval) {
        if(newval.length == this.roomTypeArr.length && newval.length != 0) {
        	this.isClickRoomTypeIdAll = true
        }else{
        	this.isClickRoomTypeIdAll = false
        }
			},
		},
		computed:{
			...mapGetters({
				// 映射 `this.doneCount` 为 `store.getters.doneTodosCount`
				hotel:'currHotel'
			})
		},
		mounted() {
			// this.getRoomStatus()
			// this.noBeTheSame()
			this.getroomStatuArr()
			// bus.ev.$on('getMoneyBeNone',(e)=>{
			// 	if (e) {
			// 		this.saveItem.status = 1
			// 		this.saveItem.icon = "icon-zangfang"
			// 	}
			// 	this.moneyShow = false
			// })
			bus.ev.$on('exchangeroomBeNone', (e) => {
				// console.log('<><><>>>>>',e,this.showFloor)    如果是住脏换房  在现有的基础上 住脏--  住净还要++
				let _this = this
				this.exchangeroomShow = false
				if (typeof e != "undefined") {
          this.roomStatuArr.forEach((val,i)=>{
            if (val.status == 1) {
              this.roomStatuArr[i].count++
            } else if (val.status == 0) {
              this.roomStatuArr[i].count--
            }
          })
					this.showFloor[e.floorIndex].rooms[e.roomIndex].status = 1
					this.showFloor[e.floorIndex].rooms[e.roomIndex].icon = 'icon-zangfang'
					for(let i = 0 ; i<_this.showFloor.length; i++){
						if(_this.showFloor[i].floor_id == e.floorId){
						  var rooms = _this.showFloor[i].rooms 
						  for(let n = 0 ; n < rooms.length ; n++){
					  	  if(rooms[n].id == e.newRoomId){
				  	  	  _this.showFloor[i].rooms[n].status = 2
								  _this.showFloor[i].rooms[n].icon = 'icon-zaizhu'
								  _this.showFloor[i].rooms[n].order_id = e.order_id
								  return 
					  	  }
						  }
						}
					}
				}
			})
			bus.ev.$on('stopUsebeNone', (e)=>{
				// console.log(e)
				this.stopUseShow = false
				if(e) {
					this.showFloor[e.floorIndex].rooms[e.roomIndex].status = e.statu
					this.showFloor[e.floorIndex].rooms[e.roomIndex].icon = e.statu == 5?'icon-tingyongfang':'icon-weixiu'
          this.roomStatuArr.forEach((val,i)=>{
            if (val.status == e.statu) {
              this.roomStatuArr[i].count++
            } else if (val.status == e.msg.value.status) {
              this.roomStatuArr[i].count--
            }
          })
				}
			})
			bus.ev.$on('renewBeNone', ()=>{
				this.renewShow = false
			})

			// console.log('-------',this.hotel.id)
		},
		created() {
			// this.getRoomNums()
			this.getHasedBuild()
			this.getRoomTypeArr()
			this.getTagsArr()
		},
		components: {
			newStay,
			reNew,
			stopUse,
			other,
			newStayTai,
			getMoney,
			exchangeRoom,
			clumBread
		}
	}
</script>

<style lang="scss" scoped>
	.fangtai{
		box-sizing: border-box;
		min-height: 800px;
		padding-bottom: 200px;
		.aliTop{
			display: inline-block;
			vertical-align: top;
		}
	  .aligntop{
			display: inline-block;
			vertical-align: top;
			width: 70px;
			color: #f5b859;
		}
		font-size: 14px;
		.ys-breadcrumb{
    	line-height: 64px;
  	}
  	.head{
  		width: 100%;
  	}
  	.one{
  		margin-bottom: 10px;
			width: 100%;
			.aliRight{
				text-align: right;
			}
			p{
				margin-right: 24px;
			}
			.list{
				.list-li{
					margin-bottom: 6px;
					cursor: pointer;
					height: 18px;
					width: 156px;
					.checkbox{
						width: 18px;
						height: 18px;
						border: 1px solid #e5e5e5;
						border-radius: 2px;
						box-sizing: border-box;
					}
				}
			}
		}
		.ellipsis{
			white-space: nowrap;
			overflow : hidden;
			text-overflow: ellipsis;
		}
		.color{
			width: 100%;
			height: 30px;
			border-bottom: 1px solid #e5e5e5;
			ul{
				li{
					margin-right: 17px;
					.bjone{
						background: #7ce2e0;
					}
					.bjtwo{
						background: #ebe250;
					}
					.bjthree{
						background: #da756b;
					}
					.bjfour{
						background: #cacbcc;
					}
					.bjfive{
						background: #f6a56a;
					}
					.bjsix{
						background: #6a9df6;
					}
					div{
						width: 15px;
						height: 15px;
						margin-right: 7px;
						border-radius: 50%;
					}
				}
			}
		}
		.titel{
			margin-top: 18px;
			.active{
				background: #fff;
				color: #6a9df6;
			}
			li{
				height: 38px;
				width: 123px;
				background: #f2f2f2;
				line-height: 38px;
				text-align: center;
				cursor: pointer;
			}
		}
		.contain{
			box-sizing:border-box;
			padding-top: 15px;
			width: 100%;
			background: #fff;
			.floor{
				width: 100%;
				.floornum{
					width: 48px;
					white-space: nowrap;
					text-overflow:ellipsis; 
					height: 30px;
					line-height: 30px;
					text-align: center;
					background: #6a9df6;
					color: #fff;
					margin-right: 42px;
				}
				.roomnum{
					max-width: 91%;
					border-bottom: 1px solid #fbfbfb;
					margin-bottom: 10px;
					ul{
						width: 100%;
						li.clickBorderColor{
								border-color: #808080;
							}
						.weixiu{
							border-color: #da756b;
						}
						.tingyong{
							border-color: #ebe250;
						}
						.kongjing{
							border-color: #79e2e0;
						}
						.kongzang{
							border-color: #cacbcc;
						}
						.zhujing{
							border-color: #f6a56a;
						}
						.zhuzang{
							border-color: #6a9df6;
						}
						li{
							nav.isshow{
								display: block;
							}
							.bindHover{
								display: none;
								position: absolute;
								top: 50%;
								left: 75%;
								background: rgba(0,0,0,.8);
								color: #fff;
								width: 350px;
								z-index: 666;
								.bindHoverTop{
									margin-top: 16px;
								}
								.bindHoverBottom{
									margin-bottom: 16px;
								}
							  p{
									margin-left: 16px;
									margin-bottom: 8px;
								}
							}
							section.clickshow{
								display: block;
							}
							.titlelog{
								display: none;
								position: absolute;
								width: 200px;
								background: rgba(0,0,0,.8);
								top: 50%;
								left: 75%;
								z-index: 666;
								ol{
									margin: 6px 24px 3px 20px;
								}
								.diaologList{
									cursor: pointer;
									border: none;
									border-radius: 0;
									box-sizing: border-box;
									padding-left: 6px;
									height: 40px;
									color: #fff;
									border-bottom: 1px solid #6d6d6d;
                  &:hover{
                    color: #6a9df6;
                  }
								}
								.borderNone{
									border: none;
								}
								.hasActive{
									color: #6a9df6;
								}
							}
							width: 146px;
							height: 76px;
							border: 2px solid;
							border-radius: 4px;
							box-sizing:border-box;
							padding: 12px 10px 6px 12px;
							position: relative;
							margin-right: 16px;
							margin-bottom: 10px;
							cursor: pointer;
							h6{
								font-weight: bold;
								margin-bottom: 10px;
							}
							.icon{
								position: absolute;
								right:6px;;bottom:0;
								width: 28px;
								height: 28px;
								font-size: 66px;
							}
							.iconcolor{
								color: #a6ecea;
							}
						}
						.bordercolor{
							border-color: #a6ecea;
						}
					}
				}
			}
		}
	}
</style>