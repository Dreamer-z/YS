<template>
    <div class="orderDistribution">
        <!-- 按条件查询 -->
        <div class="inquire">
            <div class="condition row">
                <span>搜索条件：</span>
                <div class="in-b">
                    <el-input @blur="isName()" v-model="name" placeholder="分销商姓名、手机号码" size="mini"></el-input>
                </div>
            </div>
            <div class="time status row">
                <span>订单时间：</span>
                <div class="in-b">
                    <el-date-picker
                        v-model="time"
                        size="mini"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                </div>
                <!-- <span>至</span>
                <div class="in-b">
                    <el-date-picker
                        v-model="endTime"
                        size="mini"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </div> -->
            </div>
            <div class="but">
                <el-button @click="getInquire()" type="primary" size="mini">查询</el-button>
            </div>
        </div>
        <!-- 列表 -->
        <div class="table">
            <div class="tableTitle">
                <div class="row">
                    <span>订单数：</span>
                    <span class="del">{{tableData.total}}</span>
                </div>
                <div class="row">
                    <span>订单金额：</span>
                    <span class="del">{{tableData.amount}}</span>
                </div>
                <div class="row">
                    <span>佣金金额：</span>
                    <span class="del">{{tableData.commission}}</span>
                </div>
            </div>
            <el-table :data="tableData.list" style="">
                <el-table-column label="订单号" width="212" fixed="left">
                    <template slot-scope="scope">{{scope.row.order_no}}</template>
                </el-table-column>
                <el-table-column label="订单时间" width="110" fixed="left">
                    <template slot-scope="scope">{{scope.row.create_time}}</template>
                </el-table-column>
                <el-table-column :render-header="renderHeader1" label="消费人（微信/ID）" width="190">
                    <template slot-scope="scope">
                        <img v-if="scope.row.c_avatar_url" :src="scope.row.c_avatar_url?scope.row.c_avatar_url:''" alt="">
                        <img v-if="!scope.row.c_avatar_url" src="../assets/images/wachatApply.png" alt="">
                        <span>{{scope.row.c_nickname?scope.row.c_nickname:'匿名用户'}}<br/>{{scope.row.c_invite_code}}</span>
                    </template>
                </el-table-column>
                <el-table-column :render-header="renderHeader2" label="消费人（姓名/手机号码）" width="180">
                    <template slot-scope="scope">
                        {{scope.row.c_name}}<br/>{{scope.row.c_mobile}}
                    </template>
                </el-table-column>
                <el-table-column label="消费项目" width="142">
                    <template slot-scope="scope">
                        {{scope.row.type | getType}}
                    </template>
                </el-table-column>
                <el-table-column label="消费价格" width="147">
                    <template slot-scope="scope">{{scope.row.amount}}</template>
                </el-table-column>
                <el-table-column :render-header="renderHeader3" label="分销商（微信/ID）" width="186">
                    <template slot-scope="scope">
                        <img v-if="scope.row.p_avatar_url" :src="scope.row.p_avatar_url?scope.row.p_avatar_url:''" alt="">
                        <img v-if="!scope.row.p_avatar_url" src="../assets/images/wachatApply.png" alt="">
                        {{scope.row.p_nickname?scope.row.p_nickname:'匿名用户'}}<br/>{{scope.row.p_invite_code}}
                    </template>
                </el-table-column>
                <el-table-column :render-header="renderHeader4" label="分销商（姓名/手机号码）" width="180">
                    <template slot-scope="scope">
                        {{scope.row.p_name}}<br/>{{scope.row.p_mobile}}
                    </template>
                </el-table-column>
                <el-table-column label="佣金" width="132">
                    <template slot-scope="scope">{{scope.row.commission}}</template>
                </el-table-column>
                <el-table-column
                label="操作"
                width="140"
                fixed="right">
                <template slot-scope="scope">
                    <el-button @click="setMoneyCapy(scope.row.preorder_id)" type="text" size="small">消费账单</el-button>
                    <!-- <router-link :to="{ name:'oneOrderList',params: { id: scope.row.preorder_id,keepCatch: {}}}" tag="button" class="el-button el-button--text el-button--small">消费账单</router-link> -->
                    <!-- 此处跳退房 -->
                </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 分页 -->
        <div class="page" v-if="pages>1">
            <el-pagination
                layout="prev, pager, next"
                :current-page.sync="page"
                @current-change="pageChange"
                :page-size="1"
                :total="pages">
            </el-pagination>
        </div>
        <!-- <getMoneyCapy @getMoneyBeNone="clearMoneyCapy" v-if="orderBox" :msg="{order_id: orderId}"></getMoneyCapy> -->
         <wechartOrderMent @checkMemberNone="clearMoneyCapy()" v-if="orderBox" :val="orderId"></wechartOrderMent>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import API from "@/store/API/index";
import TreeMeun from "@/assets/js/treeMeun";
import Popup from "@/components/public/popup"; //弹窗
import RegEx from "@/assets/js/RegEx"; //正则验证
import getMoneyCapy from "@/components/public/getmoney_capy"; //  客房详情   就是这里的退房
import wechartOrderMent from "@/components/public/wechartorderment"; //订单详情
// import
export default {
  computed: {
    ...mapGetters({
      hotel: "currHotel",
      user: "user"
    })
  },
  components: {
    Popup,
    getMoneyCapy,
    wechartOrderMent
  },
  data() {
    return {
      //
      time: "",
      name: "",
      orderBox: false, //
      orderId: "",
      page: 1,
      pages: 1,
      timeOption: [],
      tableData: {} //主页面表格
    };
  },
  methods: {
    //   搜索
    getInquire() {
      if (this.time == null) {
        this.time = "";
      }
      if (this.time == "") {
        this.init();
        return true;
      }
      // if (new Date(this.strTime).getTime() > new Date(this.endTime).getTime()) {
      //   this.error("请核对时间段是否正确！");
      //   return false;
      // }
      this.init();
    },
    setMoneyCapy(e) {
      this.orderBox = true;
      this.orderId = e;
      console.log(e);
    },
    clearMoneyCapy() {
      this.orderBox = false;
    },
    //
    isName() {
      this.name = this.name.replace(/(^\s*)|(\s*$)/g, "");
      this.name = this.name.replace(/(^\s*)|(\s*$)/g, "");
    },
    // 页码发生改变时
    pageChange() {
      this.init();
    },
    renderHeader1(h) {
      return h("span", [h("span", "消费人"), h("p", "（微信/ID）")]);
    },
    renderHeader2(h) {
      return h("span", [h("span", "消费人"), h("p", "（姓名/手机号码）")]);
    },
    renderHeader3(h) {
      return h("span", [h("span", "分销商"), h("p", "（微信/ID）")]);
    },
    renderHeader4(h) {
      return h("span", [h("span", "分销商"), h("p", "（姓名/手机号码）")]);
    },
    init() {
      let strTime, endTime;
      if (!this.time) {
        this.time = "";
      } else {
        strTime = this.time[0];
        endTime = this.time[1];
      }
      API.get(
        "/pms/sale/order-list?hid=" +
          this.hotel.id +
          "&name=" +
          this.name +
          "&stime=" +
          strTime +
          "&etime=" +
          endTime +
          "&page=" +
          this.page +
          "&pageNum=10&sid="
      ).then(res => {
        console.log(res);
        if (res.error_code == 0) {
          this.tableData = res.data;
          this.pages = res.data.pages;
        } else {
          this.error("获取列表数据失败！");
        }
      });
    },
    // 失败
    error(msg) {
      if (msg) {
        this.$message.error(msg);
      } else {
        this.$message.error("操作失败！");
      }
    }
  },
  mounted() {
    this.init();
  },
  filters: {
    getType(t) {
      let arr = ["房费", "商品", "餐饮"];
      return arr[t - 1];
    }
  }
};
</script>
<style lang="scss">
.orderDistribution {
  //
  height: 100%;
  overflow: auto !important;
  //   按条件查询
  & > .inquire {
    padding: 0 35px;
    background: #f2f2f2;
    padding-bottom: 10px;
    display: flex;
    .el-input--mini {
      width: 180px;
    }
    .row {
      margin-right: 60px;
    }
    .time {
      margin-right: 10px;
      .el-date-editor {
        width: 280px;
      }
    }
  }
  //   列表
  & > .table {
    padding: 0 35px;
    padding-top: 10px;
    min-width: 1000px;
    border-top: 1px solid #dfdfdf;
    .tableTitle {
      display: flex;
      padding: 10px 0;
      .row {
        margin-right: 41px;
        .del {
          color: #f22e2e;
        }
      }
    }
    .el-table th {
      padding: 0;
    }
    .el-table .cell {
      line-height: 20px;
    }
    .el-table td {
      padding: 4px 0;
    }
    img {
      width: 31px;
      height: 31px;
      border-radius: 50%;
      vertical-align: middle;
    }
  }
  // 分页
  // & > .page {
  //   .el-pager li,
  //   .el-pagination button:disabled,
  //   .el-pagination .btn-next,
  //   .el-pagination .btn-prev {
  //     background: #f2f2f2;
  //   }
  // }
  .in-b {
    display: inline-block;
  }
}
</style>


