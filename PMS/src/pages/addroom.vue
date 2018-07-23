<template>
	<div class="ys-hotel-room" v-loading="loading2" element-loading-text="操作进行中" element-loadig-spinner="el-icon-loading" element-loading-background="rgba(0,0,0,.4)">
    <clum-bread :redStar="false" :data="['当前位置','基本资料','房间']"></clum-bread>
    <div style="width: 100%; overflow: hidden;">
    	<div class="room-sec">
      	<section class="sec">
  	  		<p>楼栋名</p>
  	  		<input @focus="thesamebuildname = false" ref="loudonginput" v-model="strloudong" type="text" placeholder="楼栋名称或代码和">
  	  		<div class="btn" @click="addLoudong">添加</div>
  	    </section>
  	    <div class="building clearfix">
          <div v-show="thesamebuildname" class="white"><span >请不要输入相同的楼栋</span></div>
  	    	<ul class="delete">    
	    			<li @click="getFloors(item.id, index)" :class="{'cg-bj': cgbjbuilding == index}" :key="index" v-for="(item, index) in loudong">
	    				<p v-show="!isChangeLoudongName">{{item.build_num}}</p>
              <input style="font-size: 12px;" ref="changeLoudongNameInput" v-show="isChangeLoudongName" v-model="item.build_num" type="text">
              <span v-show="item.status !=1" @click.stop="deleLoudong(index,item.id)">删除</span>
              <!-- <span v-show="!isChangeLoudongName" @click="changeLoudongName(index)"  style="margin-right: 12px; color: #6a9df6;">编辑</span> -->
              <span v-if="isChangeLoudongName && nowIndex == index" @click.stop="letchangeLoudongNameInputBlur(item,index)"  style="margin-right: 12px; color: #6a9df6;">确定</span>
              <span v-else @click.stop="changeLoudongName(item,index)"  style="margin-right: 12px; color: #6a9df6;">编辑</span>
	    			</li>
  	    	</ul>
          <img class="goonone" src="../assets/images/goon.png" alt=""/>
  	    </div>
      </div>
      <div class="room-sec">
      	<section class="sec">
  	  		<p>楼层名</p>
  	  		<input @focus="thesamefloor = false" ref="floornum" v-model="addfloornum" type="number" placeholder="请输入数字">
  	  		<div @click="addFloor" class="btn">添加</div>
  	    </section>
  	    <div class="building clearfix">
  	    	<div v-show="thesamefloor" class="white"><span >请不要输入相同的楼层</span></div>
  	    	<ul class="delete">
	    			<li @click="clickGetRoonNum(item, index)" :class="{'cg-bj': cgbjfloor == index}" :key="index" v-for="(item,index) in floor">
	    				<p>{{item.floor_num}}楼</p>
	    				<span @click.stop="deleFloor(index)">删除楼层</span>
	    			</li>
<!-- 	    			<li>
	    				<p>A栋</p>
	    				<span>删除楼层</span>
	    			</li>
	    			<li>
	    				<p>A栋</p>
	    				<span>删除楼层</span>
	    			</li> -->
  	    	</ul>
          <img class="goontwo" src="../assets/images/goon.png" alt=""/>
  	    </div>
      </div>
      <div id="last" class="room-sec last">
      	<section class="sec last-sec">
  	  		<p class="btn-l mar-r">{{loudong.length?loudong[cgbjbuilding].build_num:''}}
            【{{floor.length?floor[cgbjfloor].floor_num:''}}楼】
          </p>
  	  		<input @click="addRoomOnce" class="btn-l changecolor" type="button" value="添加房间">
  	  		<div @click="addForMore" class="btn btn-l">批量添加</div>  <!-- //addmore = true; -->
  	    </section>
  	    <div class="building clearfix">
  	    	<!-- <section class="sec">
  	    		<p>楼栋名</p>
  	    		<input type="text" placeholder="楼栋名称或代码和">
  	    		<div class="btn">添加</div>
  	    	</section> -->
  	    	<div class="white">
  	    		<ol class="num-head">
  	    			<li @click="testroomnum" class="first">序号</li>
  	    			<li class="first">房型</li>
  	    			<li class="secon">操作</li>
  	    		</ol>
  	    	</div>
  	    	<ul class="last-delete">
      			<li :key="index" v-for="(item, index) in roomNumber">
      				<p>{{item.name}}</p>
      				<span>{{item.room_type_name}}</span>
      				<div>
      					<nav @click.stop="setNameOnce(item, index)">编辑</nav>
      					<section @click.stop="deleRoom(index, item)">删除</section>
      				</div>
      			</li>
  	    	</ul>
  	    </div>
      </div>
    </div>
    <more-add-room :val="megformore" @giveaddarr="fromChild" @disnone="beshow" v-if="addmore"></more-add-room>
    <add-room @addonceAdd="addOneRoom" @addonce="changeOneRoom" :val="megforone" @distonone="behide" v-if="addone"></add-room>
    <dele-floor @givetrue="getTrue" @givefalse="getFalse" v-show="isdelefloor"></dele-floor>
	</div>
</template>
<script>
import clumBread from "@/components/public/clumbread"
import deleFloor from "@/components/public/delefloor"
import moreAddRoom from "@/components/public/moreaddroom"
import addRoom from "@/components/public/addroom"
import API from "@/store/API"
import { mapGetters } from 'vuex'
	export default {
		name:'addlRoom',
		data() {
			return {
        nowIndex: -1,
        isChangeLoudongName: false,
        loading2: false,
        thesamebuildname: false,
        megformore: {},
        megforone: {},
        maybuildingname: '',
        bedelefloornum: '',
        isdelefloor: 0,
        thesamefloor: false,
        resetname: 1,
        cgbjbuilding: 0,
        cgbjfloor: 0,
        addfloornum: '',
        addone: false,
        addmore: false,
        strloudong: '',
        loudong: [
        ],
        floor: [
        ],
        roomNumber: [],
        build_id:'',
        floor_num: '',
        hotel_id: 1,
        beChangeNameIndex: ''
			}
		},
    methods: {
      letchangeLoudongNameInputBlur(e,i) {
        API.put("/pms/build/" + e.id, {build_num: e.build_num}).then(res=>{
          if (res.error_code == 0) {
            this.$message({
              message: '编辑成功',
              type: 'success'
            })
          }
          // this.$alert('修改成功', '', {
          //   confirmButtonText: '确定'
          // })
        })
        setTimeout(()=>{
          this.isChangeLoudongName = false
        },0)
      },
      changeLoudongName(e,i) {
        console.log(e,i)
        this.nowIndex = i
        this.isChangeLoudongName = true;
        this.$nextTick().then(()=>{
          this.$refs.changeLoudongNameInput[i].focus()
        })      
      },
      testroomnum() {
        console.log(this.roomNumber)
      },
      clickGetRoonNum(e,i){
        this.cgbjfloor = i;
        this.floor_id = e.id;
        // API.get('/pms/room?id=' + e.id).then(res =>{
        //   this.roomNumber = res.data
        // })
        API.getFloorHasedRoom(e.id).then(res => {
          if(res.data) {
            this.roomNumber = res.data
          }
        })
      },
      deleRoom(i,e){
        // API.dele('/pms/room/' + e.id).then(res =>{
        //   if(!res.error_code){
        //     this.roomNumber.splice(i, 1)
        //   }
        // })
        console.log('???',e)
        API.deleThisRoom(e.id).then(res => {
          // console.log('dsfsd000',res)
          if(res.error_code == 0) {
            this.roomNumber.splice(i, 1)
          }
        })
      },
      changeOneRoom(e) {
        if(e.msg) {
          console.log('????',e)
          // this.roomNumber.push(e.msg)   要替换到点击编辑的位置
          this.roomNumber.splice(this.beChangeNameIndex, 1, e.msg)
          this.addone = false;
        }else{
          this.addone = false;
        }
      },
      addOneRoom(e){
        console.log('???>><><><',e)
        if(e.msg) {
          this.roomNumber.push(e.msg)
          this.addone = false;
        }else{
          this.addone = false;
        }
      },
      addForMore() {
        this.addmore = true;
        this.megformore = {}
        this.megformore = {
          build_id: this.loudong.length? this.loudong[this.cgbjbuilding].id : '', 
          hotel_id: this.hotel.id,  
          floor_id: this.floor.length? this.floor[this.cgbjfloor].id : '',
          name: this.floor.length? this.floor[this.cgbjfloor].floor_num : ''
        }
      },
      addRoomOnce() {
        this.addone = true;
        this.megforone = {}
        this.megforone = {
          build_id: this.loudong.length? this.loudong[this.cgbjbuilding].id : '', 
          hotel_id: this.hotel.id,  
          floor_id: this.floor.length? this.floor[this.cgbjfloor].id : '',
          name: this.floor.length? this.floor[this.cgbjfloor].floor_num : ''
        }
        // this.megforone = {
        //   build_id: 1,
        //   hotel_id: 1,
        //   floor_id: 1,
        //   name: 1
        // }
      },
      setNameOnce(e, i){
        let _this = this;
        this.beChangeNameIndex = i;
        this.addone = true;
        this.megforone = {}
        this.megforone = {
          roomname: e.name,
          room_type: e.room_type_name,  //  编辑  传的是名字
          id: e.id,
          build_id: this.loudong[_this.cgbjbuilding].id, 
          hotel_id: this.hotel.id,  
          floor_id: this.floor[_this.cgbjfloor].id,
          name: this.floor[_this.cgbjfloor].floor_num
        }
        console.log('>>???',this.megforone)
      },
      getTrue() {
        this.loading2 = true;
        let id = this.floor[this.bedelefloornum].id
        this.isdelefloor = 0
        // this.floor.splice(this.bedelefloornum, 1)
        API.dele('/pms/floor/' + id).then(res =>{
          if(res.error_code == 0){
            this.floor.splice(this.bedelefloornum, 1)
            this.loading2 = false;
            this.roomNumber = []
          } else {
            if (res.msg) {
              this.$message.error(`${res.msg}`)
              this.loading2 = false;
            }
          }
        })
      },
      getFalse() {
        this.isdelefloor = 0
      },
      doneSetbuilding(){
        this.resetname = 1;
        this.loudong[0].build_num = this.$refs.setbuilding.value
      },
      setBuildingName(){
        let _this = this;
        this.resetname = 0;
        this.$nextTick(function(){
          _this.$refs.setbuilding.focus()
        })
      },
      addFloor() {
        this.loading2 = true
        let _this = this;
        this.floor.forEach(function(e, i){
          if(e.floor_num == _this.addfloornum) {
            _this.thesamefloor = true
          }
        })
        if(this.loudong.length && this.addfloornum.length && !this.thesamefloor) {
          let obj = {
            build_id: this.build_id,
            floor_num: this.addfloornum,
            hotel_id: this.hotel.id
          }
          API.post('/pms/floor',{
            build_id: this.build_id,
            floor_num: this.addfloornum,
            hotel_id: this.hotel.id
          }).then(res =>{
            if(!res.error_code){
              let obj = {
                id: res.data,
                floor_num: this.addfloornum,
                hotel_id: this.hotel.id,
                build_id: this.build_id
              }
              this.floor.push(obj)
              this.clickGetRoonNum(obj,this.floor.length - 1) 
              this.addfloornum = ''
              this.$refs.floornum.focus()
            }
          })
        }
        this.loading2 = false
      },
      deleFloor(i) {
        this.isdelefloor = 1;
        this.bedelefloornum = i
      },
      fromChild(e){
        let _this = this;
        if(e.arr) {
          e.arr.forEach( function(element, index) {
            _this.roomNumber.push(element)
          })
          // this.roomNumber.concat(e.arr)
        }
        // console.log(this.roomNumber)
      },
      beshow(){
        this.addmore = false
      },
      behide() {
        this.addone = false
      },
      addLoudong(){
        let _this = this;
        this.loudong.forEach(function(e, i){
          if(e.build_num == _this.strloudong){
            _this.thesamebuildname = true;
            _this.$refs.loudonginput.blur()
          }
        })
        if(this.strloudong.length && !this.thesamebuildname) {
          this.loading2 = true;
          let obj = {
            build_num: this.strloudong,
            hotel_id: this.hotel.id    
          }
          API.addNewBuild(obj).then(res => {
            if(res.error_code == 0){
              let buildId = res.data.build_id;
              this.loudong.push({build_num: this.strloudong,id:buildId})
              this.getFloors(buildId,this.loudong.length - 1)
              this.strloudong = ''
              this.$refs.loudonginput.focus()
            }
            this.loading2 = false
          })
        }
      },
      deleLoudong(i, id) {
        this.$confirm('删除楼栋后，与它相连的所有房间将同时删除，您确定此操作吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          API.dele('/pms/build/'+id).then(res => {
            if(res.error_code == 0){
              this.loudong.splice(i, 1)
              this.floor = []
              this.roomNumber = []
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            } else {
              if (res.msg) {
                this.$message.error(`${res.msg}`)
              }
            }
          })
        })
      },
      async getloudong(){
        let _this = this
        try{
          let res =  await API.getHasedBuild(_this.hotel.id) //API.get('/pms/build?id=' + _this.hotel_id)
          _this.loudong = res.data.length? res.data : []
         
          if(_this.loudong.length <= 0) {
            return
          }
          _this.build_id = this.loudong[0].id
          let data =  await API.getHasedFloor(this.build_id)  //API.get('/pms/floor?id=' + this.build_id)
           _this.floor = data.data.length? data.data : []
           if(!_this.floor.length) {
            return
           }
            console.log( _this.floor)
           _this.floor_id = _this.floor[0].id
          let item = await API.getFloorHasedRoom(this.floor_id) //API.get('/pms/room?id=' + _this.floor_id)

           _this.roomNumber = item.data.length? item.data : []
           // console.log('mmmmmmmmmmmmmmmmmmmmmmm',_this.roomNumber)
        }catch(e){
           console.log(e)
        }
      },
      getFloors(id, i) {
        let _this = this;
        this.cgbjbuilding = i;
        this.build_id = id;
        API.getHasedFloor(id).then(res => {
          if(res.data){
            _this.floor = res.data
            if (_this.floor.length) {
              API.getFloorHasedRoom(_this.floor[0].id).then(res => {
                _this.roomNumber = res.data? res.data : []
              })
              // API.get('/pms/room?id=' + this.floor[0].id ).then(res => {
              //   this.roomNumber = res.data? res.data : []
              // })
              _this.cgbjfloor = 0
            }else{
              _this.roomNumber = []
            }
          }
        })
        // API.get('/pms/floor?id=' + id).then(res =>{
        //   if(res.data){
        //     // this.hotel_id = res.data[0].hotel_id
        //     // this.build_id = res.data[0].build_id
        //     this.floor = res.data
        //     if (this.floor.length) {
        //       API.get('/pms/room?id=' + this.floor[0].id ).then(res => {
        //         this.roomNumber = res.data? res.data : []
        //       })
        //       this.cgbjfloor = 0
        //     }else{
        //       this.roomNumber = []
        //     }
        //   }
        // })
      }
    },
  computed:{
			...mapGetters({
				hotel:'currHotel'
			})
	},
    mounted() {
        this.getloudong()             //测试已经知道酒店id
        //this.getfloors()                    //根据获得的楼栋 默认第一项去获取楼层
    },
		components: {
			moreAddRoom,
      addRoom,
      deleFloor,
      clumBread
		}
	}
</script>

<style lang="scss" scoped>
::-webkit-input-placeholder { /* WebKit browsers */
    color:    #f2f2f2;
    box-sizing: border-box;
    padding-left: 10px;
    }
    :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color:    #f2f2f2;
    }
    ::-moz-placeholder { /* Mozilla Firefox 19+ */
        color:    #f2f2f2;
    }
    :-ms-input-placeholder { /* Internet Explorer 10+ */
        color:    #f2f2f2;
    }
	.ys-hotel-room{
    position: ralative;
    .goonone{
      position: absolute;
      width: 50px;
      height: 50px;
      top: 26%;
      left: 102%;
      z-index: 100;
    }
    .goontwo{
      position: absolute;
      width: 50px;
      height: 50px;
      top: 27%;
      left: 102%;
    }
		min-height: 800px;
		min-width: 1024px;
		// font-size: 16px;
		overflow: hidden;
		.ys-breadcrumb{
      line-height: 64px;
    }
    .white{
      span{
      color: red;
      }
    	height: 36px;
      line-height: 36px;
      text-align: center;
    }
    .num-head{
    	overflow: hidden;
    	width: 100%;
    	background: #d1dff8;
    	height: 36px;
    	line-height: 36px;
    	text-align: center;
    	li{
    		float: left;
    	}
    	.first{
    		width: 20%;
    		border-right: 1px solid #e2e2e2;
    	}
    	.secon{
    		width:59%;
    		text-align: left;
    		box-sizing: border-box;
    		padding-left: 100px;
    	}
    }
    .room-sec{
    	// display: inline-block;
    	float: left;
    	width: 22%;
    	margin-right: 60px;
    }
    .last-delete{
    	width: 100%;
 			overflow: hidden;
    	li{
    		border-bottom: 1px solid #e2e2e2;
    		overflow: hidden;
				p,span,div{
					float:left;
					line-height: 36px;
				}
				p,span{
					width: 20%;
					line-height: 36px;
					text-align: center;
				}
				div{
					width: 60%;
					nav,section{
						float:left;
						width: 110px;
						height: 36px;
						line-height: 36px;
						text-align: center;
						cursor: pointer;
					}
					section{
						color: #e88177;
					}
					nav{
						color: #b2cbfd;
					}
				}
    	}
    }
    .last{
    	width: 43%;
    	margin-right: 0;
    	overflow:hidden;
    	.last-sec{
    		width: 90%;
    		input{
    			width: 20%;
    			background: #fff;
    		}
    		.mar-r{
    			margin-right: 6%;
    			margin-top: 12px;
    			font-weight: bold;
    		}
    		.btn-l{
    			float: left;
          border-radius: 4px;
          cursor: pointer;
    		}
        .changecolor{
          box-sizing: border-box;
          border: 1px solid #6a9df6;
          color: #6a9df6;
        }
    	}
    }
    .sec{
    		width: 100%;
    		overflow: hidden;
    		p{
    			display: inline-block;
    			vertical-align: middle;
          color: #6a9df6;
    			// float: left;
    		}
    		input{
    			height: 36px;vertical-align: middle;
    			margin: 0 4% 0 2%; 
    			width: 50%;
    		}
    		.btn{
    			// float: right;
    			display: inline-block;
    			vertical-align: middle;
    			height: 36px;
    			width: 20%;
    			line-height: 36px;
    			text-align: center;
    			background: #6a9df6;
          color: #fff;
          border-radius: 4px;
          cursor: pointer;
    		}
    	}
    .building{
      position: relative;
    	width: 100%;
    	min-height: 698px;
    	background: #fff;
    	margin-top: 6px;
    	// overflow: hidden;
    	.add-house{
    		width: 100%;
    		overflow: hidden;
    		box-sizing: border-box;
    		padding: 42px 34px 12px 12px;
    		background: #fff;
    		margin-top: 10px;
        .repeatadd{
          position: absolute;
          top: 46%;
          left: 24%;
          color: red;
        }
        input{
          // float: left;
          width: 118px;
          height: 28px;
          line-height: 28px;
          text-align: center;
          border: 1px solid #e2e2e2;
          display: inline-block;
          vertical-align: middle;
          border: 1px solid #e2e2e2;
        }
    		nav{
    			// float: left;
    			width: 118px;
    			height: 28px;
    			line-height: 28px;
    			text-align: center;
    			border: 1px solid #e2e2e2;
    			display: inline-block;
    			vertical-align: middle;
    		}
    		p{
    			float: right;
    			line-height: 28px;
    			color: #6a9df6;
    			cursor: pointer;
    		}
    	}
    }
    .delete{
    	width: 100%;
      .cg-bj{
        background: #e7eef9;
      }
    	li{
    		width: 100%;
    		height: 40px;
    		line-height: 40px;
    		background: #fff;
    		box-sizing: border-box;
    		padding: 0 34px 0 18px;
    		&:hover{
    			// background: #e7eef9;
    		}
    		&:hover span{
    			color: #e07f79;
    		}
    		p{
    			float: left;
    		}
    		span{
    			float: right;
    			cursor: pointer;
          color: #e19592;
    		}
    	}
    }
	}
</style>