<template>
  <div class="checkInTime-management">
    <div class="filter">
      <!-- <div class="filter-type">
        <span>快捷搜索：</span>
        <el-row>
          <el-button type="primary" data-index="1" size="mini" :plain="orderStatusValue==1?false:true" round @click="orderType($event)">在住</el-button>
          <el-button type="primary" data-index="2" size="mini" :plain="orderStatusValue==3?false:true" round @click="orderType($event)">预计今日退房</el-button>
        </el-row>
      </div> -->
      <div class="search">
        <!-- <div class="search-item">
          <span>订单状态：</span>
          <el-select v-model="searchKey.status" clearable placeholder="可选择" size="small">
            <el-option v-for="item in orderStatus" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div> -->
        <div class="search-item">
          <span>房号：</span>
          <el-input placeholder="" v-model="searchKey.room_name" clearable size="mini"></el-input>
        </div>
        <!-- <div class="search-item">
          <span>预订人：</span>
          <el-input placeholder="" v-model="searchKey.username" clearable size="small"></el-input>
        </div> -->
        <div class="search-item">
          <span>入住人：</span>
          <el-input placeholder="" v-model="searchKey.member" clearable size="mini"></el-input>
        </div>
        <!-- <div class="search-item">
          <span>订单号：</span>
          <el-input placeholder="" v-model="searchKey.order_no" clearable size="small"></el-input>
        </div> -->
        <div class="search-item">
          <span>时间段：</span>
          <el-date-picker v-model="searchKey.time" type="daterange" @change="datePicker" format="yyyy-M-d" value-format="yyyy-M-d" placeholder="选择日期" size="mini" ></el-date-picker>
        </div>
        <!-- <div class="search-item">
          <span>开始时间：</span>
          <el-date-picker v-model="searchKey.come_time" format="yyyy-M-d" value-format="yyyy-M-d" type="date" placeholder="选择日期" size="small"></el-date-picker>
        </div>
        <div class="search-item">
          <span>结束时间：</span>
          <el-date-picker v-model="searchKey.leave_time" format="yyyy-M-d" value-format="yyyy-M-d" type="date" placeholder="选择日期" size="small"></el-date-picker>
        </div> -->
        <!-- <div class="search-item">
          <span>客源类型：</span>
          <el-select v-model="searchKey.from" clearable placeholder="可选择" size="small">
            <el-option v-for="item in sourceArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div> -->
        <div class="search-item">
          <el-button type="primary" @click="search" size="mini">搜索</el-button>
          <el-button  @click="clearSearch" size="mini">清空搜索</el-button>
        </div>
      </div>
    </div>
    <div class="plan">
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" height="100%" style="width: 1482px">
        <el-table-column label="入住人" width="80">
          <template slot-scope="scope">{{scope.row.member_name}}</template>
        </el-table-column>
        <el-table-column label="预定手机号" width="120">
          <template slot-scope="scope">{{scope.row.mobile}}</template>
        </el-table-column>
        <el-table-column label="房型" width="120">
          <template slot-scope="scope">{{scope.row.room_type_name}}</template>
        </el-table-column>
        <el-table-column label="房号" width="100">
          <template slot-scope="scope">{{scope.row.room_name}}</template>
        </el-table-column>
        <el-table-column label="价格方案" width="120">
          <template slot-scope="scope">暂无</template>
        </el-table-column>
        <el-table-column label="总房费" width="120">
          <template slot-scope="scope">{{scope.row.total_price}}</template>
        </el-table-column>
        <el-table-column label="总消费" width="120">
          <template slot-scope="scope">{{scope.row.total_consume}}</template>
        </el-table-column>
        <el-table-column label="线上付款" width="120">
          <template slot-scope="scope">{{scope.row.sum}}</template>
        </el-table-column>
        <el-table-column label="门店预付款" width="120">
          <template slot-scope="scope">{{scope.row.pay_amount}}</template>
        </el-table-column>
        <el-table-column label="入住时间" width="110">
          <template slot-scope="scope">
            <div>{{scope.row.come_time}}</div>
          </template>
        </el-table-column>
        <el-table-column label="预离时间" width="110">
          <template slot-scope="scope">
            <div>{{scope.row.leave_time}}</div>
          </template>
        </el-table-column>
        <el-table-column label="入住状态" width="100">
          <template slot-scope="scope">{{scope.row.stay_status_name}}</template>
        </el-table-column>
        <!-- <el-table-column label="预计到店时间" width="140">
          <template slot-scope="scope">
            <div v-if="scope.row.preorder.arrive_time?true:false">{{scope.row.come_time.split(' ')[0]}}</div>
            <div v-if="scope.row.preorder.arrive_time?true:false">{{scope.row.preorder.arrive_time}}</div>
          </template>
        </el-table-column> -->
        <el-table-column label="操作" width="140">
          <template slot-scope="scope">
            <div class="option">
              <el-button type="primary" size="small" @click="check(scope.row)">查看</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination class="pagination" v-show="totalNum>0?true:false" background :page-size='pageSize' layout="prev, pager, next" :total="totalNum" @current-change="current"></el-pagination>
    <get-money :msg="msgForMoney" v-if="moneyShow" @getMoneyBeNone="setGetMoneyNone"></get-money>

  </div>
</template>

<script>
import getMoney from "@/components/public/getmoney"

import { mapGetters } from 'vuex'
import API from '@/store/API/index'
export default {
  computed: {
    ...mapGetters({
      hotel: 'currHotel'
    })
  },
  components: {
    getMoney
  },
  data() {
    return {
      // 订单状态
      orderStatus: [
        {
          label: '在住',
          value: 1
        },
        {
          label: '预计今日退房',
          value: 2
        }
      ],
      sourceArr: [],
      orderStatusValue: '',
      searchKey: {
        // 查找的房号
        room_name: '',
        //   预订人
        username: '',
        //   入住人
        member: '',
        //   订单号
        order_no: '',
        // 时间段
        time: '',
        //   开始时间
        come_time: '',
        //   结束时间
        leave_time: '',
        //   客源类型
        from: '',
        page:1,
        num:10,
      },
      key:{},
      // 表单数据
      tableData: [],
      // 选中表单条目数据
      multipleSelection: [],
      currentPage:1,
      pageSize:10,
      totalNum:0,
      //弹窗部分数据
      msgForMoney:{},
      moneyShow:false,
    }
  },
  methods: {
    orderType(e) {
      this.orderStatusValue = e.currentTarget.getAttribute('data-index')
      if(e.currentTarget.getAttribute('data-index') == 1){
        this.checkInList()
      }
    },
    datePicker(){
      let time = this.searchKey.time;
      if(time){
        this.searchKey.come_time = time[0]
        this.searchKey.leave_time = time[1]
      }else{
        this.searchKey.come_time = ''
        this.searchKey.leave_time = ''
      }
    },
    //   搜索
    search() {
      let _this = this;
      this.currentPage = 1;
      this.orderStatusValue = '';
      for (let key in this.searchKey) {
        if (this.searchKey[key] != '' && this.searchKey[key] != undefined && key != 'time') {
          this.key[key] = this.searchKey[key]
        }
      };
      this.key.hotel_id = this.hotel.id;
      this.key.num = this.pageSize;
      this.key.page = this.currentPage;
      this.searchFn();
    },
    searchFn(){
      let _this = this
      API.searchCheckInList(this.key)
        .then(function(res) {
          if (res.error_code == 0) {
            _this.currentPage = 1;
            _this.tableData = res.data.data;
            _this.totalNum = res.data.total_count;
          } else {
            _this.$message({
              type: 'warning',
              message: res.msg
            })
          }
        }).catch(function(err){
          console.log(err);
          _this.$message({
            type: 'warning',
            message: '搜索失败'
          })
        })
    },
    clearSearch(){      
      this.searchKey = {
        hotel_id:'',
        // 查找的房号
        room_name: '',
        //   预订人
        username: '',
        //   入住人
        member: '',
        //   订单号
        order_no: '',
        // 时间段
        time: '',
        //   开始时间
        come_time: '',
        //   结束时间
        leave_time: '',
        //   客源类型
        from: '',
        total:0,
        pageSize:10,
        currentPage:1,
      },
      this.key = {};
      this.currentPage = 1;
      this.checkInList()
    },
    // 客源渠道
    getFromWay() {
      let _this = this
      API.getFrom()
        .then(function(res) {
          if (res.error_code == 0) {
            let arr = []
            for (let i = 0; i < res.data.length; i++) {
              arr.push({})
              arr[i].label = res.data[i].name
              arr[i].value = res.data[i].id
              arr[i].price = res.data[i].price
            }
            _this.sourceArr = arr
          } else {
            _this.$message({
              type: 'warning',
              message: '获取客源类型列表失败'
            })
          }
        })
        .catch(function(err) {
          _this.$message({
            type: 'warning',
            message: '获取客源类型列表失败'
          })
        })
    },
    checkInList() {
      let _this = this
      API.checkInList({
        id: this.hotel.id,
        page:this.currentPage,
        num:this.pageSize,
      })
        .then(function(res) {
          if (res.error_code == 0) {
            _this.totalNum = res.data.total_count;
            _this.tableData = res.data.data;
          } else {
            _this.$message({
              type: 'warning',
              message: '获取入住列表失败'
            })
          }
        })
        .catch(function(err) {
          console.log(err)
          _this.$message({
            type: 'warning',
            message: '获取入住列表失败'
          })
        })
    },
    current(n){
      if(this.key.room_name || this.key.username ||this.key.member ||this.key.order_no ||this.key.come_time ||this.key.leave_time ||this.key.from){
        console.log(1);
        this.key.page = n;
        this.searchFn();
      }else{
        this.currentPage = n;
        this.checkInList();
      }
    },	
    setGetMoneyNone(e) {
			this.moneyShow = false
		},
    check(row) {
      // console.log(row)
      this.msgForMoney = {
        name:row.room_name,
        id:row.room_id,
        order_id:row.order_id
      }
      this.moneyShow = true;
    },
  },
  mounted() {
    this.checkInList()
    this.getFromWay()
  }
}
</script>

<style lang="scss">
.checkInTime-management {
  box-sizing: border-box;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  .plan{
    box-sizing: border-box;
    padding: 10px 35px;
    padding-bottom: 30px;
    flex: 1;
    overflow: hidden;
  }
  .filter {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 0 35px;
    background-color: #f2f2f2;
    .filter-type {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      .el-row {
        margin: 0;
      }
    }
    .search {
      display: flex;
      flex-wrap: wrap;
      .search-item {
        display: flex;
        align-items: center;
        margin: 0 40px 0 0;
        padding-bottom: 10px;
        .el-input {
          flex: 1;
        }
      }
    }
  }
}
.checkInTime-management .pagination{
  width: 1480px;
  padding-bottom: 20px;
}
.part-title {
  color: #808080;
  margin-bottom: 20px;
}
.left {
  float: left;
}
.right {
  float: right;
}
.clear::after {
  content: '';
  width: 0;
  display: block;
  clear: both;
}

</style>
