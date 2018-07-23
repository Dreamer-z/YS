<template>
	<div class="calendar">
		<div class="whitetext">
			<ul class="roomtype">
				<li @click="changeRoomType(index)" :style="{background: roomtypeIndex == index? '#6a9df6':''}" v-for="(item, index) in roomtypeArr" class="roomtype-li middle">
					<div :style="{borderColor: roomtypeIndex == index? '#6a9df6':'',color:roomtypeIndex == index? '#fff':''}" class="roomtype-name middle">{{item.name}}</div>
				</li>
			</ul>
			<div class="contain">
				<div style="box-shadow: -3px 0 5px -3px #d7d7d7;" class="left">
					<table>
						<tr>
							<td class="left-td left-td-time">
								<span>2018-00-00</span>
								<span>icon</span>
							</td>
						</tr>
						<tr v-for="(item, index) in roomNumArr">
							<td class="left-td">
								<span>{{item.name}}</span>
							</td>
						</tr>
					</table>
				</div>
				<transition name="table-fade">
					<div v-show="isRoomTypeChange" class="right ">
						<table class="right-head">
							<tr>
								<td v-for="(item, index) in dateArr">
									<div class="right-td right-head-td">{{item.name}}</div>
								</td>
							</tr>
						</table>
						<table class="right-text">
							<tr v-for="(item, index) in roomNumArr">
								<td @click="alert" v-for="(data, num) in item.statu">
									<div class="right-td">{{item.name}}</div>
								</td>
							</tr>
						</table>
						<div class="next-btn">
							
						</div>
					</div>
				</transition>
			</div>
		</div>
    <calendar-diaolog v-show="isCalendarDiaoloShow"></calendar-diaolog>
    <nav class="btn-pre"></nav>
    <nav class="btn-next"></nav>
	</div>
</template>

<script>
import API from "@/store/API"
import bus from "@/store/bus"
import calendarDiaolog from "@/components/public/calendardiaolog"
	export default{
		name: 'calendar',
		data() {
			return {
        roomtypeArr: [],
        isCalendarDiaoloShow: false,
				preRoomTypeIndex: -1,
				istrnasform: false,
				isRoomTypeChange: true,
				dateArr: [
  				{
  					name: '5.01'
  				},
  				{
  					name: '5.02'
  				},
  				{
  					name: '5.03'
  				},
  				{
  					name: '5.04'
  				},
  				{
  					name: '5.05'
  				},
  				{
  					name: '5.06'
  				},
  				{
  					name: '5.07'
  				},
  				{
  					name: '5.08'
  				},
  				{
  					name: '5.09'
  				},
  				{
  					name: '5.10'
  				},
  				{
  					name: '5.11'
  				},
  				{
  					name: '5.12'
  				},
  				{
  					name: '5.13'
  				},
  				{
  					name: '5.14'
  				},
  				{
  					name: '5.15'
  				}
  			],
				roomNumArr:[
  				{
  					name: '101',
  					statu: [
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: '预订'
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: '在住'
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						}
  					]
  				},
  				{
  					name: '102',
  					statu: [
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: '预订'
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: '在住'
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						}
  					]
  				},
  				{
  					name: '103',
  					statu: [
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: '预订'
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: '在住'
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						}
  					]
  				},
  				{
  					name: '104',
  					statu: [
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: '预订'
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: '在住'
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						}
  					]
  				},
  				{
  					name: '105',
  					statu: [
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: '预订'
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: '在住'
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						}
  					]
  				},
  				{
  					name: '106',
  					statu: [
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: '预订'
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: '在住'
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						}
  					]
  				},
  				{
  					name: '107',
  					statu: [
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: '预订'
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: '在住'
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						},
  						{
  							statu: ''
  						}
  					]
  				},
  			],
				roomtypeIndex: 0,
        hotelId: 1
			}
		},
		methods: {
      getRoomType() {
        API.getRoomType(this.hotelId).then(res=>{
          if(res.error_code == 0) {
            this.roomtypeArr = res.data
          }
        })
      },
			alert(){
				// alert(1)
        this.isCalendarDiaoloShow = true
			},
			changeRoomType(i) {
				this.isRoomTypeChange = false;
				this.roomtypeIndex = i;
				setTimeout(()=>{
					this.preRoomTypeIndex = i;
					this.isRoomTypeChange = true
				},1000)
			}
		},
    created() {
      this.getRoomType()
      bus.ev.$on('calendarDiaoloBenone',()=>{
        this.isCalendarDiaoloShow = false
      })
    },
    components: {
      calendarDiaolog
    }
	}
</script>

<style lang="scss" scoped>
	.calendar{
  	padding-top: 50px;
  	font-size: 14px;
  	background: #f2f2f2;
  	position: relative;
  	over-flow: hidden;
  	.table-fade-enter-active {
		  transition: all .3s ease;
		}
		.table-fade-leave-active {
		  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
		}
		.table-fade-enter, .table-fade-leave-to,{
		  transform: translateX(100%);
		  opacity: 0;
		}
  	.whitetext{
  		width: 100%;
  		box-sizing: border-box;
  		padding-left: 210px;
  		background: #fff;
  	}
  	.contain{
  		position: relative;
  		display: flex;
  		flex: 1;
  	}
  	.roomtype{
			li{
				position: relative;
			}
  	}
  	.next-btn{
  		position: fixed;
  		width: 100px;
  		height: 200px;
  		background: cyan;
  		top: 50%;
  		margin-top: -100px;
  		right: 0;
  		opacity: 0;
  		pointer-events:none;
  		&:hover{
  			opacity: 1;
  		}

  	}
  	.right{
  		flex: 1;
  		overflow-x: auto;
      position: relative;
			.right-td{
				width: 132px;
  		  height: 60px;
  		  line-height: 60px;
  		  text-align: center;
  		  border-right: 1px solid #f2f2f2;
  		  border-bottom: 1px solid #f2f2f2;
  		  pointer-events:auto;
			}
			.right-head-td{
				background: #e6e6e6;
				border-right: 1px solid #fff;
			}
  	}
  	.left{
  		border-left: 1px solid #d7d7d7;
  		width: 132px;
  		.left-td{
				width: 132px;
  		  height: 60px;
  		  line-height: 60px;
  		  text-align: center;
  		  background: #f5f5f5;
  		  border-left: 1px solid #fff;
  		  border-right: 1px solid #f2f2f2;
  		  border-bottom: 1px solid #f2f2f2;
  	  }
  	  .left-td-time{
				background: #e6e6e6;
				border-right: 1px solid #fff;
  		}
  	}
  	.roomtype-li{
  		width: 132px;
  		height: 70px;
  		line-height: 70px;
			.roomtype-name {
				width: 100%;
				height: 28px;
				line-height: 28px;
				text-align: center;
				box-sizing: border-box;
				border-right: 1px solid #f2f2f2;
				cursor: pointer;
			}
		}
    .btn-next,.btn-pre{
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: cyan;
      position: fixed;
      top: 50%;
      margin-top: -25px;
      &:hover {
        background: red;
      }
    }
    .btn-pre{
      left: 342px;
    }
    .btn-next{
      right: 0;
    }
  }
</style>