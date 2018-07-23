<template>
  <div class="check-out-request">
    <bread-crumb :child-msg='router'></bread-crumb>
    <div class="request-type-box">
      <div class="request-type">
        <div data-type="0" class="request-type-li" :class="[requestType==0?'current-row':'']" @click="changeRequestType($event)">待查房({{allRequest['0'].length}})<img src="@/assets/images/icon_right_on.png" v-if="requestType==1"><img src="@/assets/images/icon_right.png" v-else></div>
        <div data-type="1" class="request-type-li" :class="[requestType==1?'current-row':'']" @click="changeRequestType($event)">查房中({{allRequest['1'].length}})<img src="@/assets/images/icon_right_on.png" v-if="requestType==2"><img src="@/assets/images/icon_right.png" v-else></div>
        <div data-type="2" class="request-type-li" :class="[requestType==2?'current-row':'']" @click="changeRequestType($event)">已查房({{allRequest['2'].length}})<img src="@/assets/images/icon_right_on.png" v-if="requestType==3"><img src="@/assets/images/icon_right.png" v-else></div>
        <div data-type="3" class="request-type-li" :class="[requestType==3?'current-row':'']" @click="changeRequestType($event)">退房待结({{allRequest['3'].length}})<img src="@/assets/images/icon_right_on.png" v-if="requestType==4"><img src="@/assets/images/icon_right.png" v-else></div>
        <div data-type="4" class="request-type-li" :class="[requestType==4?'current-row':'']" @click="changeRequestType($event)">退房已结({{allRequest['4'].length}})<img src="@/assets/images/icon_right_on.png" v-if="requestType==5"><img src="@/assets/images/icon_right.png" v-else></div>
      </div>
    </div>
    <el-table :data="tableData" border height="100%" style="width: 1222px">
      <el-table-column prop="num" label="序号" width="80">
        <template slot-scope="scope">{{scope.row.num}}</template>
      </el-table-column>
      <el-table-column prop="room_name" label="房号" width="280">
        <template slot-scope="scope">{{scope.row.room_name}}</template>
      </el-table-column>
      <el-table-column prop="from" label="发起来源" width="180">
        <template slot-scope="scope">{{scope.row.from}}</template>
      </el-table-column>
      <el-table-column prop="create_time" label="申请退房时间" width="240">
        <template slot-scope="scope">{{scope.row.create_time}}</template>
      </el-table-column>
      <el-table-column prop="staff_name" label="房间负责人" width="140">
        <template slot-scope="scope">{{scope.row.staff_name}}</template>
      </el-table-column>
      <el-table-column prop="status_name" label="状态" width="180">
        <template slot-scope="scope">{{scope.row.status_name}}</template>
      </el-table-column>
      <el-table-column prop="option" label="操作" width="120" fixed="right">
        <template slot-scope="scope">
          <div class="option">
            <el-button type="text" @click="datails(scope.row)">客房详情</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <get-money :msg="msgForMoney" v-if="moneyShow" @getMoneyBeNone="setGetMoneyNone"></get-money>
  </div>
</template>

<script>
import BreadCrumb from '@/components/public/breadcrumb' //面包屑导航栏
import { routs } from '@/assets/js/routs' //面包屑导航栏地址

import { mapGetters } from 'vuex'
import getMoney from '@/components/public/getmoney'
import API from '@/store/API/index'

export default {
  components: {
    BreadCrumb,
    getMoney
  },  
  computed: {
    ...mapGetters({
      hotel: 'currHotel'
    })
  },
  data() {
    return {
      // 面包屑导航路径及名称
      router: [routs.index, routs.checkOutRequest],
      requestType: 0,
      allRequest:{0:[],1:[],2:[],3:[],4:[]},
      tableData: [],
      //弹窗部分数据
      msgForMoney:{},
      moneyShow:false,
    }
  },
  methods: {
    changeRequestType(e) {
      this.requestType = e.currentTarget.dataset['type'];
      this.tableData = this.allRequest[this.requestType];
    },
    checkOutRequest(){
      let _this = this;
      API.checkOutRequest({
        id:this.hotel.id,
      }).then(function (res) {
        let newarr = res.data;
        for (let i = 0; i < newarr.length; i++) {
          if (newarr[i].status == 0) {
            newarr[i].num = _this.allRequest['0'].length+1;
            _this.allRequest['0'].push(newarr[i]);
          };
          if(newarr[i].status == 1){
            newarr[i].num = _this.allRequest['1'].length+1;
            _this.allRequest['1'].push(newarr[i]);
          };
          if(newarr[i].status == 2){
            newarr[i].num = _this.allRequest['2'].length+1;
            _this.allRequest['2'].push(newarr[i]);
          };
          if(newarr[i].status == 3){
            newarr[i].num = _this.allRequest['3'].length+1;
            _this.allRequest['3'].push(newarr[i]);
          };
          if(newarr[i].status == 4){
            newarr[i].num = _this.allRequest['4'].length+1;
            _this.allRequest['4'].push(newarr[i]);
          };
        };
        _this.tableData = _this.allRequest[_this.requestType];
      }).catch(function (err) {
        console.log(err);
      })
    },
    datails(row) {
      console.log(row);
      this.msgForMoney = {
        name:row.room_name,
        id:row.room_id,
        order_id:row.order_id
      }
      this.moneyShow = true;
    },
    setGetMoneyNone(e) {
			this.moneyShow = false
		},
  },
  mounted() {
    this.checkOutRequest();
  },
}
</script>

<style lang="scss">
.check-out-request {
  box-sizing: border-box;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto !important;
  font-size: 14px;
  padding-bottom: 30px;
  .request-type-box {
    max-width: 1222px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 18px;
    user-select: none;
    .request-type {
      display: flex;
      align-items: center;
      .request-type-li {
        display: flex;
        align-items: center;
        margin-right: 20px;
        cursor: pointer;
        img {
          margin-left: 20px;
        }
        &:nth-last-of-type(1) {
          margin-right: 0;
          img {
            display: none;
            margin-right: 0;
          }
        }
        &.current-row {
          color: #6a9df6;
        }
      }
    }
  }
  .has-gutter,// 固定表头背景色
  .el-table__fixed,//左侧
  .el-table__fixed-right {
    //右侧
    th {
      background-color: #f4f9ff;
    }
  }
  // .el-table{
  //   // align-self: center;
  // }
  .el-table thead {
    color: #333;
  }
}
</style>