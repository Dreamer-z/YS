<template>
	<div class="stopuse">
		<div class="text">
			<header class="clearfix">
				<p class="fl">{{pageName}}</p>
				<p @click="stopUsebeNone" style="font-size: 30px;cursor:pointer;" class="fr">×</p>
			</header>
			<div class="contain">
				<div class="changeroom">
					<p style="margin-right: 16px;" class="middle">
						<span class="middle">房间号</span>
						<span class="middle">：</span>
					</p>
					<!-- <nav class="middle nowroom">
							{{roonNumber}}
					</nav> -->
					<el-input disabled style="width:180px;" size="mini" v-model="roonNumber"></el-input>
				</div>
				<div style="margin: 10px 0;" class="changeroom">
					<p style="margin-right: 20px;" class="middle">
						<span class="middle">开始日期</span>
					</p>
					<el-date-picker class="middle" v-model="startDate" :disabled="isLook" :picker-options="pickerOptions" value-format="yyyy-MM-dd HH:mm:ss" size="mini" placehoder="2010-00-00" type="datetime">
					</el-date-picker>
				  <div style="margin-left: 35px;" class="middle">
				  	<p style="margin-right: 20px;" class="middle">
							<span class="middle">结束日期</span>
						</p>
						<el-date-picker class="middle" v-model="endDate" :disabled="isLook" :picker-options="pickerOptions" value-format="yyyy-MM-dd HH:mm:ss" size="mini" placehoder="2010-00-00" type="datetime">
						</el-date-picker>
				  </div>
				</div>
				<div class="beizhu">
					<p class="mitop">
						<span class="middle">备注</span>
						<span class="middle">：</span>
						<span style="color: red;" class="middle">*</span>
					</p>
					<nav class="mitop beizhuArea">
						<!-- <textarea style="width: 100%;height: 100%;" v-model="stopuseTextarea"></textarea> -->
						<el-input v-model="stopuseTextarea" type="textarea"></el-input>
					</nav>
				</div>
				<p style="text-align:right;">
					<span>操作员：</span>
					<span>{{curUser.name}}</span>
				</p>
				<footer class="clearfix">
					<!-- <nav @click="stopUsebeNone" class="fl">取消</nav> -->
					<el-button style="width:100px;" @click="stopUsebeNone">取消</el-button>
					<!-- <section v-if="!isLook" @click="finish" class="fl">完成</section> -->
					<el-button type="primary" style="width:100px;" @click="finish">完成</el-button>
				</footer>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import API from "@/store/API"
import bus from "@/store/bus"
  export default {
  	name: 'stopUse',
    props: ['val'],
  	data() {
  		return {
  			isLook: false,
  			roomId: '',
  			startDate: '',
  			endDate: '',
  			stopuseTextarea: '',
  			roonNumber: '',
  			pickerOptions: {
					disabledDate(time) {
						return time.getTime() < (Date.now() - 24*60*60*1000)
					}
				},
  			pageName: '',
  			options2: [],
  			value2: '',
  			floorIndex: '',
  			roomIndex: '',
        message: ''
  		}
  	},
  	computed:{
      ...mapGetters({
        // 映射 `this.doneCount` 为 `store.getters.doneTodosCount`
        hotel:'currHotel',
        curUser: 'user'
      }),
    },
  	methods: {
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
        this.startDate = [`${yaer}-${month<10?'0'+month:month}-${date<10?'0'+date:date}`,`${hour<10?'0'+hour:hour}:${min<10?'0'+min:min}:${sec<10?'0'+sec:sec}`].join(' ')
      },
  		finish() {
        let start = new Date(this.startDate).getTime()
        let end = new Date(this.endDate).getTime()
        if (end < start || this.startDate == '' || this.endDate == '') {
          this.$alert('日期选择错误', '操作提示', {
            confirmButtonText: '确定'
          })
          return
        }
        if (this.stopuseTextarea.trim() == '') {
          this.$alert('有必填项没有填写', '操作提示', {
            confirmButtonText: '确定'
          })
          return
        }
  			let obj = {
  				room_id: this.roomId,
					start_time: this.startDate,
					end_time: this.endDate,
					remark: this.stopuseTextarea
  			}
        if(this.pageName == '维修') {
          API.repairPost(obj).then(res=>{
            // console.log('000.0.0.0',res)
            if(res.error_code == 0) {
              bus.ev.$emit('stopUsebeNone', {msg: this.message,statu: this.pageName == '维修'?4:5, floorIndex: this.floorIndex, roomIndex: this.roomIndex})
              Object.assign(this.$data, this.$options.data())
            } else {
              if (res.msg) {
                this.$message.error(`${res.msg}`)
                Object.assign(this.$data, this.$options.data())
              }
            }
          })
        } 
        if(this.pageName == '停用') {
          API.stopPost(obj).then(res=>{
            // console.log('000.0.0.0',res)
            if(res.error_code == 0) {
              bus.ev.$emit('stopUsebeNone', {msg: this.message,statu: this.pageName == '维修'?4:5, floorIndex: this.floorIndex, roomIndex: this.roomIndex})
              Object.assign(this.$data, this.$options.data())
            } else {
              if (res.msg) {
                this.$message.error(`${res.msg}`)
                Object.assign(this.$data, this.$options.data())
              }
            }
          })
        }
  		},
  		stopUsebeNone() {
  			Object.assign(this.$data, this.$options.data())
  			bus.ev.$emit('stopUsebeNone')
        this.start()
  		}
  	},
    mounted() {
      this.start()
    },
  	created() {
  		let _this = this
  		// bus.ev.$on('willBeStopUse', (e)=> {
        this.message = this.val
        let e = this.val
  			if (typeof e.Index != 'undefined' ) {
  				this.pageName = e.pagename;
	  			this.roonNumber = e.value.name
	  			this.roomId = e.value.id
	  			this.floorIndex = e.Index
	  			this.roomIndex = e.index
  			} else {
  				this.isLook = true;
  				if(e.pagename == '维修') {
            this.pageName = '维修'
  					API.repairCreated(e.value.id).then(res=>{
  						if(res.error_code == 0) {
  							this.roonNumber = e.value.name;
  							this.startDate = res.data.start_time;
  							this.endDate = res.data.end_time;
  							this.stopuseTextarea = res.data.remark
  						}
  					})
  				} else {
            this.pageName = '停用'
  					API.stopCreated(e.value.id).then(res=>{
  						if(res.error_code == 0) {
  							this.roonNumber = e.value.name;
  							this.startDate = res.data.start_time;
  							this.endDate = res.data.end_time;
  							this.stopuseTextarea = res.data.remark
  						}
  					})
  				}
  			}
  			// console.log(e)
  		// })
  	},
  	destoryed() {
  		bus.ev.$off('willBeStopUse')
  	}
  }
</script>

<style lang="scss" scoped>
	.stopuse{
		font-size: 12px;
		z-index: 666;
		position: fixed;
		top: 0;left: 0; right: 0; bottom: 0;
		background: rgba(0,0,0,.4);
		display: flex;
    align-items:center;
    justify-content: center;
		.middle{
			display: inline-block;
			vertical-align: middle;
		}
		.mitop{
			display: inline-block;
			vertical-align: top;
		}
		.text{
			width: 700px;
			max-height: 500px;
			overflow-y: auto;
		}
		header{
			font-size: 14px;
			width: 100%;
			height: 40px;
			background: #437ff9;
			box-sizing: border-box;
			padding: 0 20px;
			color: #fff;
			line-height: 40px;
		}
		.nowroom{
			width: 200px;
			height: 28px;
			border: 1px solid #e6e6e6;
			border-radius: 4px;
			line-height: 28px;
			box-sizing: border-box;
			padding-left: 10px;
		}
		.contain{
			padding: 26px 30px;
			background: #fff;
		}
		.beizhu{
			margin: 10px 0;
		}
		.beizhuArea{
			width: 466px;
			height: 75px;
			margin-left: 20px;
		}
		footer{
			width: 226px;
			margin: 0 auto;
			margin-top: 20px;
			text-align: center;
			// nav,section{
			// 	text-align: center;
			// 	line-height: 38px;
			// 	width: 98px;
			// 	height: 38px;
			// 	border-radius: 6px;
			// 	border: 1px solid #437ff9;
			// }
			// nav{
			// 	color: #437ff9;
			// 	margin-right: 25px;
      //   cursor: pointer;
			// }
			// section{
			// 	background: #437ff9;
			// 	color: #fff;
      //   cursor: pointer;
			// }
		}
	}
</style>