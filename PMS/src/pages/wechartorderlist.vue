<template>
	<div class="order-list">
		<div class="whitetext">
		  <div class="tatal-list">
		  	<ol class="search">
		  		<li class="middle">
		  			<p class="middle">
		  				<span class="middle">搜索条件</span>
		  				<span class="middle">：</span>
		  			</p>
		  			<!-- <input placeholder="订单编号/姓名/手机号码" style="width: 178px;" v-model="searchJson.condition" class="middle" type="text"> -->
						<p class="middle">
							<el-input v-model="searchJson.condition" placeholder="订单编号/姓名/手机号码" type="text" style="width: 178px;" size="mini"></el-input>
						</p>
		  		</li>
		  		<li style="margin: 0 60px;" class="middle">
		  			<p class="middle">
		  				<span class="middle">预入离时段</span>
		  				<span class="middle">：</span>
		  			</p>
						<p class="middle">
							<el-date-picker  v-model="searchJson.times" type="daterange" size="mini" range-separator="至" value-format="yyyy-MM-dd"></el-date-picker>
						</p>
		  			<!-- <div class="date middle">
		  				<el-date-picker ref="startDate" value-format="yyyy-MM-dd" size="mini" type="date" v-model="searchJson.come_time">
						  </el-date-picker>
						  <div @click="getStartDate" class="cover">
                <span>{{searchJson.come_time}}</span>
						  </div>
		  			</div>
		  			<span>至</span>
		  			<div class="date middle">
		  				<el-date-picker ref="endDate" value-format="yyyy-MM-dd" size="mini" type="date" v-model="searchJson.leave_time">
						  </el-date-picker>
						  <div @click="getEndDate" class="cover">
                <span>{{searchJson.leave_time}}</span>type="daterange"
						  </div>
		  			</div> -->
		  		</li>
          <li class="middle">
		  			<p class="middle">
		  				<span class="middle">订单状态</span>
		  				<span class="middle">：</span>
		  			</p>
            <div class="middle">
							<el-select style="width:178px" v-model="searchJson.order_status" size="mini" placeholder="请选择">
								<el-option
									v-for="item in statusArr"
									:key="item.id"
									:label="item.name"
									:value="item.id">
								</el-option>
							</el-select>
						</div>
		  		</li>
		  		<!-- <li @click="listCheckTable(1)" class="btnserch middle">
		  			<span>搜索预订</span>
		  		</li> -->
					<li class="middle">
						<el-button @click="listCheckTable(1)" style="width: 100px;" size="mini" type="primary">搜索预订</el-button>
					</li>
		  	</ol>
		  </div>
		  <div class="table">
		  	<ul class="thead tbody">
		  		<li style="flex:3;">订单号</li>
		  		<li class="one">预订人</li>
		  		<li class="two">预订手机</li>
		  		<li class="one">预订金额</li>
					<li class="two">预订房型</li>
		  		<li class="one">预订间数</li>
		  		<li class="two">预抵日期</li>
		  		<li class="two">预离日期</li>
		  		<li class="one">入住天数</li>
		  		<li class="one">状态</li>
		  		<li style="borderRight: 1px solid #e5e5e5;minWidth: 150px;" class="two">操作</li>
		  	</ul>
		  	<ul :key="index" v-for="(item, index) in orderListArr" class="tbody">
		  		<li style="borderLeft:1px solid #e5e5e5;flex:3;" :title= "item.order_no">{{item.order_no}}</li>
		  		<li :title= "item.user?item.user.nickname:''" class="one">{{item.user_name}}</li>
		  		<li class="two">{{item.mobile}}</li>
		  		<li class="one">{{item.sum}}</li>
					<li class="two">{{item.room_type_name}}</li>
		  		<li class="one">{{item.total_count}}</li>
		  		<li class="two">{{item.come_time}}</li>
		  		<li class="two">{{item.leave_time}}</li>
		  		<li class="one">{{setDays(item.come_time.split(' ')[0],item.leave_time.split(' ')[0])}}</li> 
		  		<li class="one">{{item.order_status}}</li>
          <li style="border-right: 1px solid #e5e5e5; color: #1dceb1;minWidth: 150px;" class="two">
            <div>
              <p style="width:100px;" class="middle">
                <span @click="letCheckBeStayShow(item.id,index)" style="cursor: pointer;" v-show="item.order_status_id == 1 && item.is_checkin">到店入住</span>
              </p>
              <p class="middle">
                <span @click="getOrderId(item.id)" style="cursor: pointer;">详情</span>
              </p>
            </div>
          </li>
          <!-- <li v-if="false" style="border-right: 1px solid #a9bfd6; cursor: pointer; color: #6a9df6;" class="two">NO SHOW</li>
		  		<li v-else-if="item.order_status_id == 2" style="border-right: 1px solid #a9bfd6; cursor: pointer; color: #ccc;background: #f2f2f2;" class="two">查看详情</li>
          <router-link v-else :to="{ name:'oneOrderList',params: { id: item.id,keepCatch: {keepArrJson,keepSearchJson,'keepIsSearch':keepIsSearch,'keepPage':keepPage}}}" tag="li" style="border-right: 1px solid #a9bfd6; cursor: pointer; color: #6a9df6;" class="two">查看详情</router-link> -->
		  	</ul>
        <div style="text-align: center; margin-top: 100px;">
          <el-pagination
            @current-change="currentChange"
            @prev-click="currentChange"
            @next-click="currentChange"
            :page-size="pageNum"
            :current-page.sync="currentPage"
            layout="prev, pager, next"
            :total="totalCount">
          </el-pagination>
        </div>
		  </div>
		</div>
    <checkBeStay :val="saveId" @checkBeStayNone="letCheckBeStayNone" v-if="isCheckBeStayShow"></checkBeStay>
		<wechartOrderMent @checkMemberNone="wechartOrderMentNone" v-if="wechartOrderMentShow" :val="orderId"></wechartOrderMent>
	</div>
</template>

<script>wechartOrderMent
import checkBeStay from "@/components/public/checkbestay"   //   办理入住小程序
import wechartOrderMent from "@/components/public/wechartorderment"   //   办理入住小程序
import { mapGetters } from 'vuex'
import API from "@/store/API"
	export default{
		name: 'wechartOrderList',
		data() {
			return {
				statusArr: [],
				wechartOrderMentShow: false,
				orderId: '',
        isCheckBeStayShow: false,
        isSearch: false,
        totalCount: 1,    //  总条目数   后台传来
        currentPage: 1,   //  当前的页码   搜索的时候变为1
        orderStatusArr: [],
        reservationsArr: [],  // 排放状态
        orderListArr: [],
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < (Date.now() - 24*60*60*1000)  //Date.now()
          }
        },
				searchJson: {
          come_time: '',
          leave_time: '',
          order_status: '',
					condition: '',
					times:[]
        },
        keepSearchJson: {},
        keepArrJson: {},
        keepPage: '',
				keepIsSearch: false,
				pageNum: 10,
				saveIndex: '',
				saveId: ''
			}
    },
    created() {
			API.get("/pms/common/order_status").then(res => {
				if (res.error_code == 0) {
					this.statusArr = res.data.data
				}
			})
    },
    computed: {
      ...mapGetters({
        hotel:'currHotel'
      }),
    },
    watch: {
    },
		methods:{
			letCheckBeStayShow(id,i) {
				this.saveIndex = i
				this.saveId = id
				this.isCheckBeStayShow = true
			},
			wechartOrderMentNone() {
				this.wechartOrderMentShow = false
			},
			getOrderId(id) {
				this.orderId = id
				this.wechartOrderMentShow = true
			},
      letCheckBeStayNone(e) {
				this.isCheckBeStayShow = false
				if (e) {
					this.orderListArr[this.saveIndex].order_status = '已入住'
					this.orderListArr[this.saveIndex].order_status_id = 3
				}
      },
      setDays(start,end) {
        let startTime = new Date(start).getTime()
        let endTime = new Date(end).getTime()
        let days = Math.ceil((endTime - startTime)/(24*60*60*1000))
        return days
      },
      listCheckTable(num) {
        if (this.searchJson.times.length) {
          this.$alert('请选择正确的日期时间', '', {
            confirmButtonText: '确定'
          });
          return
				}
				this.searchJson.come_time = this.searchJson.times[0]
				this.searchJson.leave_time = this.searchJson.times[1]
        let object = {}
        let OBJ = this.searchJson
        for(let name in OBJ) {
          if (OBJ[name] !== '') {
						if (typeof OBJ[name] == 'string') {
							object[name] = OBJ[name].trim()
						} else {
							object[name] = OBJ[name]
						}
          }
        }
        object.id = this.hotel.id
        object.page = num
        object.num = this.pageNum
        API.get("/pms/preorder/miniapp_search",object).then(res => {
          if (res.error_code == 0) {
            this.isSearch = true
            this.orderListArr = res.data.data
            this.totalCount = res.data.total
          } else {
            if (res.msg) {
              this.$message.error(`${res.msg}`)
            }
          }
        })
      },
      getOrderList() {
        API.get(`/pms/preorder/miniapp?id=${this.hotel.id}&page=1&num=${this.pageNum}`).then(res => {
          if (res.error_code == 0) {
            this.orderListArr = res.data.data
            this.totalCount = res.data.total
          } else {
						if (res.msg) {
							this.$message.error(`${res.msg}`)
						}
					}
        })
      },
      getStartDate() {
        this.$refs.startDate.focus()
      },
      getEndDate() {
        this.$refs.endDate.focus()
      },
      currentChange(num) {
        if(this.isSearch) {
         this.listCheckTable(num) 
        } else {
          API.get(`/pms/preorder/miniapp?id=${this.hotel.id}&page=${num}&num=10`).then(res => {
            if (res.error_code == 0) {
              this.orderListArr = []
              this.orderListArr = res.data.data
              this.totalCount = res.data.total
              this.currentPage = num
            } else {
							if (res.msg) {
								this.$message.error(`${res.msg}`)
							}
						}
          })
        }
      },
    },
    mounted() {
      // this.currentPage = 3
      // this.getTags()
    },
    beforeMount() {
      this.getOrderList()
    },
    components: {
			checkBeStay,
			wechartOrderMent
    }
	}
</script>

<style lang="scss" scoped>
  .order-list{
  	position: relative;
  	.middle{
  		display: inline-block;
  		vertical-align: middle;
  	}
    input{
      height: 26px;
      border: 1px solid #f2f2f2;
      border-radius: 4px;
      text-indent: 6px;
    }
  	.whitetext{
  		width: 100%;
  		box-sizing: border-box;
  	}
  	header{
  		margin-bottom: 20px;
  	}
  	.time{
  		margin-bottom: 10px;
  	}
  	.date{
  		width: 152px;
  		height: 28px;
  		line-height: 28px;
  		border: 1px solid #f2f2f2;
  		border-radius: 4px;
  		overflow: hidden;
  		position: relative;
  		.cover{
  			width: 100%;
  			height: 100%;
  			background: #fff;
  			position: absolute;
  			top: 0;left: 0;
  			text-align: center;
  			box-sizing: border-box;
  			padding-right: 8px;
  		}
  	}
  	.box{
  		width: 18px;
  		height: 18px;
  		border: 1px solid #ccc;
  		border-radius: 2px;
  	}
  	.list-pre{
  		width: 90%;
  		margin-left: 28px;
  		li{
  			width: 102px;
  		}
  	}
  	.search{
			background: #f2f2f2;
			box-sizing: border-box;
			padding: 0 35px;
			padding-bottom: 10px;
  		li{
  			margin-right: 14px;
  		}
  	}
  	.btnserch{
  		width: 100px;
  		height: 30px;
  		line-height: 30px;
  		text-align: center;
  		color: #fff;
  		background: #437ff9;
  		margin-left: 30px;
  		border-radius: 6px;
  		cursor: pointer;
  	}
  	.table{
  		margin-top: 10px;
			box-sizing: border-box;
			padding: 0 35px;
			.thead{
				li{
					border-bottom:none;
					background: #f2f2f2;
					height: 40px;
  			  line-height: 40px;
				}
			}
  	}
  	.tbody{
      &:hover {
				background: #f0f9fe;
			}
  		width: 100%;
  		display: flex;
  		flex: 21;
  		li{
  			height: 40px;
  			line-height: 40px;
  			border-bottom: 1px solid #e5e5e5;
  			text-align: center;
        overflow: hidden;
  			white-space: nowrap;
  			text-overflow:ellipsis;
  		}
  		.one{
  			flex: 1;
  		}
  		.two{
  			flex: 2;
  		}
  	}
  }
</style>