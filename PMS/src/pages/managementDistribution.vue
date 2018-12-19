<template>
    <div class="managementDistribution">
        <!-- 按条件查询 -->
        <div class="inquire">
            <div class="row">
                <span>搜索条件：</span>
                <div class="in-b">
                    <el-input @blur="isName()" v-model="name" placeholder="姓名、手机号码" size="mini"></el-input>
                </div>
            </div>
            <div class="condition row">
                <span>分销商组：</span>
                <div class="in-b">
                    <!-- <el-input @blur="isName()" v-model="name" placeholder="姓名、手机号码" size="mini"></el-input> -->
                    <el-select size="mini" v-model="customer" placeholder="请选择">
                        <el-option
                          v-for="item in customerOption_"
                          :key="item.commission_id"
                          :label="item.level_name"
                          :value="item.commission_id">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="but">
                <el-button @click="getInquire()" type="primary" size="mini">查询</el-button>
            </div>
        </div>
        <!-- 列表 -->
        <div class="table">
            <el-table :data="tableData" style="">
                <el-table-column  :render-header="renderHeader1" label="分销商 （分销商ID）" width="195" fixed="left">
                    <template slot-scope="scope">
                        <img v-if="scope.row.avatar_url" :src="scope.row.avatar_url" alt="">
                        <img v-if="!scope.row.avatar_url" src="../assets/images/wachatApply.png" alt="">
                        {{scope.row.nickname?scope.row.nickname:'匿名用户'}}<br/>
                        {{scope.row.invite_code}}
                    </template>
                </el-table-column>
                <el-table-column :render-header="renderHeader2" label="姓名 / 手机号码" width="135">
                    <template slot-scope="scope">
                        {{scope.row.name}}<br/>
                        {{scope.row.mobile}}
                    </template>
                </el-table-column>
                <el-table-column label="下级客户" width="170">
                    <template slot-scope="scope">{{scope.row.count}}</template>
                </el-table-column>
                <el-table-column label="注册时间" width="230">
                    <template slot-scope="scope">{{scope.row.create_time}}</template>
                </el-table-column>
                <el-table-column label="分销商组" width="230">
                    <template slot-scope="scope">{{scope.row.level_name}}</template>
                </el-table-column>
                <el-table-column label="累计佣金" width="140">
                    <template slot-scope="scope">{{scope.row.total_money}}</template>
                </el-table-column>
                <el-table-column label="已打款佣金" width="140">
                    <template slot-scope="scope">{{scope.row.draw_money}}</template>
                </el-table-column>
                <el-table-column label="剩余佣金" width="140">
                    <template slot-scope="scope">{{scope.row.amout_money}}</template>
                </el-table-column>
                <el-table-column
                fixed="right"
                label="操作"
                width="140">
                <template slot-scope="scope">
                    <el-button @click="seeDetails(scope.row.sale_id)" type="text" size="small">查看</el-button>
                    <el-button @click="seeModify(scope.row.sale_id)" type="text" size="small">修改</el-button>
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
        <!-- 弹窗 -->
        <div class="pop-ups">
            <div class="details">
                <popup ref="details"  @popupOp="details" :popup="detailsData">
                    <div class="content">
                        <!-- 上方信息 -->
                        <div class="basicInfo">
                            <div class="row left">
                                <div class="rowItem ">
                                    <div class="title">
                                        <span>分销商：</span>
                                    </div>
                                    <div class="content v-mid in-b">
                                        <!-- <p> -->
                                          <img v-if="myData.my.avatar_url" :src="myData.my.avatar_url" alt="">
                                          <img v-if="!myData.my.avatar_url" src="../assets/images/wachatApply.png" alt="">
                                          <span>{{myData.my.nickname?myData.my.nickname:'匿名用户'}}</span>
                                        <!-- </p> -->
                                        <br/>
                                        <span class="bul">{{myData.my.invite_code}}</span>
                                    </div>
                                </div>
                                <!-- <div class="rowItem ">
                                    <div class="title">
                                        <span>分销商 ID：</span>
                                    </div>
                                    <div class="content in-b">
                                        <span class="bul">{{myData.my.invite_code}}</span>
                                    </div>
                                </div> -->
                                <div class="rowItem ">
                                    <div class="title">
                                        <span>分销商组：</span>
                                    </div>
                                    <div class="content in-b">
                                        <span class="">{{myData.my.group_name}}</span>
                                    </div>
                                </div>
                                <div class="rowItem ">
                                    <div class="title">
                                        <span>用户姓名：</span>
                                    </div>
                                    <div class="content in-b">
                                        <span>{{myData.my.name}}</span>
                                    </div>
                                </div>
                                <div class="rowItem ">
                                    <div class="title">
                                        <span>手机号码：</span>
                                    </div>
                                    <div class="content in-b">
                                        <span>{{myData.my.mobile}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="row center">
                                <div class="rowItem ">
                                    <div class="title">
                                        <span>累计佣金：</span>
                                    </div>
                                    <div class="content in-b">
                                        <span class="red">{{myData.my.total_money}}</span>
                                    </div>
                                </div>
                                <div class="rowItem ">
                                    <div class="title">
                                        <span>已打款佣金：</span>
                                    </div>
                                    <div class="content in-b">
                                        <span class="red">{{myData.my.draw_money}}</span>
                                    </div>
                                </div>
                                <div class="rowItem ">
                                    <div class="title">
                                        <span>剩余佣金：</span>
                                    </div>
                                    <div class="content in-b">
                                        <span class="red">{{myData.my.amout_money}}</span>
                                    </div>
                                </div>
                                <div class="rowItem ">
                                    <div class="title">
                                        <span>注册时间：</span>
                                    </div>
                                    <div class="content in-b">
                                        <span class="">{{myData.my.create_time}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="row right">
                                <div class="rowItem ">
                                    <div class="title">
                                        <span>上级分销商：</span>
                                    </div>
                                    <div class="content v-mid in-b">
                                        <img v-if="myData.parentInfo.avatar_url" :src="myData.parentInfo.avatar_url" alt="">
                                        <img v-if="!myData.parentInfo.avatar_url&&myData.parentInfo.invite_code" src="../assets/images/wachatApply.png" alt="">
                                        <span v-if="myData.parentInfo.invite_code" class="">{{myData.parentInfo.nickname?myData.parentInfo.nickname:'匿名用户'}}</span>
                                        <br/>
                                        <span class="bul">{{myData.parentInfo.invite_code}}</span>
                                    </div>
                                </div>
                                <!-- <div class="rowItem ">
                                    <div class="title">
                                        <span>上级分销商ID：</span>
                                    </div>
                                    <div class="content in-b">
                                        <span class="bul">{{myData.parentInfo.invite_code}}</span>
                                    </div>
                                </div> -->
                                <div class="rowItem ">
                                    <div class="title">
                                        <span>上级分销商组：</span>
                                    </div>
                                    <div class="content in-b">
                                        <span class="">{{myData.parentInfo.group_name}}</span>
                                    </div>
                                </div>
                                <div class="rowItem ">
                                    <div class="title">
                                        <span>用户姓名：</span>
                                    </div>
                                    <div class="content in-b">
                                        <span class="">{{myData.parentInfo.name}}</span>
                                    </div>
                                </div>
                                <div class="rowItem ">
                                    <div class="title">
                                        <span>手机号码：</span>
                                    </div>
                                    <div class="content in-b">
                                        <span class="">{{myData.parentInfo.mobile}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 下方tab切换 -->
                        <div class="tab">
                            <div class="tabBut">
                                <div class="row" @click="setTabBut(1)" :class="tabBut?'':'activ'">下级客户</div>
                                <div class="row" @click="setTabBut(2)" :class="tabBut?'activ':''">分销订单</div>
                            </div>
                            <div class="contents">
                                <!-- 下级客户 -->
                                <div class="client" v-show="!tabBut">
                                    <div class="rough">
                                        <div class="row">
                                            <span class="blk">下级客户：</span>
                                            <span class="red">{{tableClient.total}}</span>
                                        </div>
                                    </div>
                                    <div class="clientTable">
                                        <el-table :data="tableClient.list" style="">
                                            <el-table-column :render-header="renderHeader3" label="分销商(微信/ID）" width="172" fixed="left">
                                                <template slot-scope="scope">
                                                    <img v-if="scope.row.avatar_url" :src="scope.row.avatar_url" alt="">
                                                    <img v-if="!scope.row.avatar_url" src="../assets/images/wachatApply.png" alt="">
                                                    {{scope.row.nickname?scope.row.nickname:'匿名用户'}}<br/>{{scope.row.invite_code}}
                                                </template>
                                            </el-table-column>
                                            <el-table-column :render-header="renderHeader4" label="分销商(姓名/手机号）" width="172">
                                                <template slot-scope="scope">{{scope.row.name}}<br/>{{scope.row.mobile}}</template>
                                            </el-table-column>
                                            <el-table-column label="注册时间" width="163">
                                                <template slot-scope="scope">{{scope.row.create_time}}</template>
                                            </el-table-column>
                                            <el-table-column label="分销商组" width="163">
                                                <template slot-scope="scope">{{scope.row.level_name}}</template>
                                            </el-table-column>
                                            <el-table-column label="累计佣金" width="114">
                                                <template slot-scope="scope">{{scope.row.total_money}}</template>
                                            </el-table-column>
                                            <el-table-column label="已打款佣金" width="114">
                                                <template slot-scope="scope">{{scope.row.draw_money}}</template>
                                            </el-table-column>
                                            <el-table-column label="剩余佣金" width="94">
                                                <template slot-scope="scope">{{scope.row.amout_money}}</template>
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                    <!-- 分页 -->
                                    <div class="page" v-if="pagesClient>1">
                                        <el-pagination
                                            layout="prev, pager, next"
                                            :current-page.sync="pageClient"
                                            @current-change="pageChangeClient"
                                            :page-size="1"
                                            :total="pagesClient">
                                        </el-pagination>
                                    </div>
                                </div>
                                <!-- 分销订单 -->
                                <div class="order" v-show="tabBut">
                                    <div class="rough">
                                        <div class="row">
                                            <span class="blk">订单数：</span>
                                            <span class="red">{{tableOrder.total}}</span>
                                        </div>
                                        <div class="row">
                                            <span class="blk">订单金额：</span>
                                            <span class="red">{{tableOrder.amount}}</span>
                                        </div>
                                        <div class="row">
                                            <span class="blk">佣金金额：</span>
                                            <span class="red">{{tableOrder.commission}}</span>
                                        </div>
                                    </div>
                                    <div class="orderTable">
                                        <el-table :data="tableOrder.list" style="">
                                            <el-table-column label="订单时间" width="160" fixed="left">
                                                <template slot-scope="scope">{{scope.row.create_time}}</template>
                                            </el-table-column>
                                            <el-table-column :render-header="renderHeader5" label="分销商（微信/ID）" width="133">
                                                <template slot-scope="scope">
                                                    <img v-if="scope.row.c_avatar_url" :src="scope.row.c_avatar_url?scope.row.c_avatar_url:''" alt="">
                                                    <img v-if="!scope.row.c_avatar_url" src="../assets/images/wachatApply.png" alt="">
                                                    {{scope.row.c_nickname?scope.row.c_nickname:'匿名用户'}}<br/>{{scope.row.c_invite_code}}
                                                </template>
                                            </el-table-column>
                                            <el-table-column :render-header="renderHeader6" label="提现人（姓名/手机号码）" width="148">
                                                <template slot-scope="scope">
                                                    {{scope.row.c_name}}<br/>{{scope.row.c_mobile}}
                                                </template>
                                            </el-table-column>
                                            <el-table-column label="消费项目" width="86">
                                                <template slot-scope="scope">{{scope.row.type | setType}}</template>
                                            </el-table-column>
                                            <!-- <el-table-column label="项目明细" width="230">
                                                <template slot-scope="scope">{{scope.row.num}}</template>
                                            </el-table-column> -->
                                            <el-table-column label="消费价格" width="98">
                                                <template slot-scope="scope">{{scope.row.amount}}</template>
                                            </el-table-column>
                                            <el-table-column label="佣金" width="84">
                                                <template slot-scope="scope">{{scope.row.commission}}</template>
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                    <!-- 分页 -->
                                    <div class="page" v-if="pagesOrder>1">
                                        <el-pagination
                                            layout="prev, pager, next"
                                            :current-page.sync="pageOrder"
                                            @current-change="pageChangeOrder"
                                            :page-size="1"
                                            :total="pagesOrder">
                                        </el-pagination>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </popup>
            </div>
            <div :class="popData.g_id == 0?'modify_':'modify'" class="">
                <popup ref="modify"  @popupOp="modify" :popup="modifyData">
                  <div class="operating">
                    <!-- <span>操作员：{{user.name}}</span> -->
                  </div>
                  <div class="customer row">
                    <div class="title">分销商：</div>
                    <div class="in-b text">
                      <img v-if="popData.avatar_url" :src="popData.avatar_url?popData.avatar_url:'null'" alt="">
                      <img v-if="!popData.avatar_url" src="../assets/images/wachatApply.png" alt="">
                      {{popData.nickname?popData.nickname:'匿名用户'}}<br/>{{popData.invite_code}}
                    </div>
                  </div>
                  <div class="customer row">
                    <div class="title">用户姓名：</div>
                    <div class="in-b">{{popData.name}}</div>
                  </div>
                  <div class="customer row">
                    <div class="title">手机号码：</div>
                    <div class="in-b">{{popData.mobile}}</div>
                  </div>
                  <div class="customer row">
                    <div class="special title">分销商组：</div>
                    <div class="in-b">
                      <el-select size="mini" v-model="popData.g_id" placeholder="请选择">
                        <el-option
                          v-for="item in customerOption"
                          :key="item.commission_id"
                          :label="item.level_name"
                          :value="item.commission_id">
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                </popup>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import API from "@/store/API/index";
import TreeMeun from "@/assets/js/treeMeun";
import Popup from "@/components/public/popup"; //弹窗
import RegEx from "@/assets/js/RegEx"; //正则验证
// import
export default {
  computed: {
    ...mapGetters({
      hotel: "currHotel",
      user: "user"
    })
  },
  components: {
    Popup
  },
  data() {
    return {
      //
      statusCertification: "", //认证状态
      page: 1, //当前页
      pages: 1, //总页数
      pageClient: 1, //
      pagesClient: 1, //
      pageOrder: 1, //
      pagesOrder: 1, //
      name: "", //搜索条件
      customer: "", //分销商组
      num: "", //用户id
      tableData: [], //主页面表格
      myData: {
        my: {},
        parentInfo: {}
      }, //弹窗上方列表数据
      popData: {}, //修改弹窗数据
      tableClient: {}, //下级客户
      tableOrder: {}, //分销订单
      //弹窗
      detailsData: {
        title: "查看详情",
        width: 1000,
        confirmText: "确认",
        cancelText: "关闭"
      }, //补卡登记弹窗头部
      modifyData: {
        title: "修改",
        width: 600,
        confirmText: "确认",
        cancelText: "关闭"
      }, //补卡登记弹窗头部
      tabBut: false, //tab栏切换按钮  false
      customerOption: [],
      customerOption_: []
    };
  },
  methods: {
    //按条件查询
    getInquire() {
      this.init();
    },
    //
    isName() {
      this.name = this.name.replace(/(^\s*)|(\s*$)/g, "");
    },
    //   打开查看详情弹窗
    async seeDetails(num) {
      this.$refs.details.close();
      this.num = num;
      let a = await this.getMyData(num);
      let b = await this.getClient(num);
    },
    //查看详情弹窗  确定 || 取消
    details(type) {
      //
      if (type == "confirm") {
        this.$refs.details.close();
        this.success();
      } else if (type == "cancel") {
        this.$refs.details.close();
        this.myData = {
          my: {},
          parentInfo: {}
        };
        this.tabBut = false;
        this.tableClient = {};
        this.tableOrder = {};
      }
    },
    // 打开修改弹窗
    seeModify(num) {
      this.$refs.modify.close();
      // this.getMyData(num);
      API.get(
        "/pms/sale/group-modify?sid=" + num + "&hotel_id=" + this.hotel.id
      ).then(res => {
        console.log("修改分销商", res);
        if (res.error_code == 0) {
          // if (res.data.g_id == 0) {
          //   res.data.g_id = this.customerOption[0].commission_id;
          // }
          this.popData = res.data;
        } else {
          this.error(res.msg);
        }
      });
    },
    // 修改弹窗  确定 || 取消
    modify(type) {
      if (type == "confirm") {
        if (this.popData.g_id == 0) {
          this.error("佣金设置列表，未设置佣金返利，无法修改！");
          return false;
        }
        this.popData.hotel_id = this.hotel.id;
        this.popData.commission_id = this.popData.g_id;
        API.post("/pms/sale/group-edit", this.popData).then(res => {
          if (res.error_code == 0) {
            this.$refs.modify.close();
            this.success();
            this.init();
          } else {
            this.error(res.msg);
          }
        });
      } else if (type == "cancel") {
        this.$refs.modify.close();
        this.tabBut = false;
        this.popData = {};
        this.tableClient = {};
        this.tableOrder = {};
        this.warning();
      }
    },
    // 分页页码发生改变时
    pageChange() {
      console.log(this.page);
      this.init();
    },
    pageChangeClient() {
      this.getClient();
    },
    pageChangeOrder() {
      //
      this.getOrder();
    },
    //tab按钮
    setTabBut(e) {
      if (e == 1) {
        this.tabBut = false;
      } else if (e == 2) {
        this.tabBut = true;
        this.getOrder();
      }
    },
    // 成功
    success() {
      this.$message({
        message: "操作成功",
        type: "success"
      });
    },
    // 取消
    warning() {
      this.$message({
        message: "已经取消操作",
        type: "warning"
      });
    },
    // 失败
    error(msg) {
      if (msg) {
        this.$message.error(msg);
      } else {
        this.$message.error("操作失败！");
      }
    },
    renderHeader1(h) {
      return h("span", [h("span", "分销商"), h("p", "（微信/ID）")]);
    },
    renderHeader2(h) {
      return h("span", [h("span", "分销商"), h("p", "（姓名/手机号）")]);
    },
    renderHeader3(h) {
      return h("span", [h("span", "分销商"), h("p", "（微信/ID）")]);
    },
    renderHeader4(h) {
      return h("span", [h("span", "分销商"), h("p", "（姓名/手机号）")]);
    },
    // 页面表格
    init() {
      API.centerDistributionApi(
        this.user.staff_id,
        this.name,
        this.page,
        this.customer,
        this.hotel.id
      ).then(res => {
        console.log(res);
        if (res.error_code == 0) {
          this.tableData = res.data.list;
          this.pages = res.data.pages;
          console.log(this.pages);
        } else {
          this.error("获取列表数据失败");
        }
      });
    },
    // 弹窗上方基础信息
    getMyData(num) {
      API.get("/pms/sale/info?sid=" + num + "&hid=" + this.hotel.id).then(
        res => {
          console.log("弹窗上方基础信息", res);
          if (res.error_code == 0) {
            this.myData = res.data;
          } else {
            this.error("获取基础信息失败");
          }
        }
      );
    },
    // 下级客户列表
    getClient(num) {
      if (!num) {
        num = this.num;
      }
      API.get(
        "pms/sale/my-list?sid=" +
          num +
          "&page=" +
          this.pageClient +
          "&pageNum=4" +
          "&hid=" +
          this.hotel.id
      ).then(res => {
        console.log("下级客户列表", res);
        if (res.error_code == 0) {
          this.tableClient = res.data;
          this.pagesClient = res.data.pages;
        } else {
          this.error("获取下级客户列表失败");
        }
      });
    },
    //  分销订单
    getOrder() {
      API.get(
        "/pms/sale/order-list?hid=" +
          this.hotel.id +
          "&name=" +
          this.name +
          "&stime=" +
          "&etime=" +
          "&page=" +
          this.pageOrder +
          "&pageNum=10&sid=" +
          this.num
      ).then(res => {
        console.log("分销订单：", res);
        if (res.error_code == 0) {
          this.tableOrder = res.data;
          this.pagesOrder = res.data.pages;
        } else {
          this.error("获取列表数据失败！");
        }
      });
    },
    renderHeader5(h) {
      return h("span", [h("span", "消费人"), h("p", "（微信/ID）")]);
    },
    renderHeader6(h) {
      return h("span", [h("span", "消费人"), h("p", "（姓名/手机号）")]);
    }
  },
  mounted() {
    //
    this.init();
    API.get("/pms/sale/hotel-clist?hotel_id=" + this.hotel.id).then(res => {
      console.log("酒店佣金列表", res);
      if (res.error_code == 0) {
        res.data.unshift({
          commission_id: "",
          level_name: "全部"
        });
        this.customerOption_ = res.data;
        this.customerOption_.forEach((v, i) => {
          if (i != 0) {
            this.customerOption.push(v);
          }
        });
        // this.customerOption=res.data.splice(1, 1);
        // this.customerOption = this.customerOption_.splice(1, 1);
      } else {
        this.error("获取酒店佣金列表失败！");
      }
    });
  },
  filters: {
    setType(t) {
      let arr = ["房费", "商品", "餐饮"];
      return arr[t - 1];
    }
  }
};
</script>
<style lang="scss">
.managementDistribution {
  //
  height: 100%;
  overflow: auto !important;
  //   按条件查询
  & > .inquire {
    padding: 0 35px;
    background: #f2f2f2;
    padding-bottom: 10px;
    display: flex;
    .row {
      margin-right: 60px;
    }
    .condition {
      margin-right: 10px;
    }
  }
  //   列表
  & > .table {
    width: 1525px;
    padding: 0 35px;
    img {
      width: 31px;
      height: 31px;
      vertical-align: middle;
      border-radius: 50%;
    }
    padding-top: 10px;
  }
  // 分页
  & > .page {
    padding: 0 35px;
    width: 1525px;
  }
  //   弹窗
  & > .pop-ups {
    * {
      box-sizing: border-box;
    }
    //   查看详情
    & > .details {
      font-weight: normal;
      .popup .popup-option > button + button {
        display: none;
      }
      //内容
      .content {
        //   上方信息
        .basicInfo {
          display: flex;
          padding-bottom: 4px;
          border-bottom: 1px solid #dfdfdf;
          .row {
            width: 33.3%;
            .rowItem {
              width: 80%;
              margin: 0 auto;
              padding: 10px 0;
              .v-mid {
                vertical-align: middle;
              }
              .title {
                width: 100px;
                display: inline-block;
                text-align: right;
              }
              img {
                width: 31px;
                height: 31px;
                vertical-align: middle;
                border-radius: 50%;
              }
            }
          }
          .row + .row {
            border-left: 1px solid #dfdfdf;
          }
        }
        // 下方tab切换
        .tab {
          padding: 20px 0;
          //   切换按钮
          .tabBut {
            // padding-bottom: 10px;
            display: flex;
            width: 200px;
            .row {
              width: 100px;
              height: 30px;
              text-align: center;
              line-height: 30px;
              cursor: pointer;
              border: 1px solid #d9d9d9;
              color: #626262;
            }
            .row:nth-of-type(1) {
              border-radius: 4px 0px 0px 4px;
              border-right: none;
            }
            .row:nth-last-child(1) {
              border-radius: 0px 4px 4px 0px;
            }
            .activ {
              color: #fff;
              border: 1px solid #00a8ff;
              border-right: none;
              background: #00a8ff;
            }
          }
          //   内容
          .contents {
            .client,
            .order {
              // height: 320px;
              overflow: auto;
              .rough {
                display: flex;
                padding: 10px 0;
                .row {
                  margin-right: 40px;
                }
              }
              .clientTable,
              .orderTable {
                width: 711px;
                // margin: 0 auto;
                img {
                  width: 31px;
                  height: 31px;
                  border-radius: 50%;
                  vertical-align: middle;
                }
              }
              .clientTable {
                // width: 995px;
                width: 100%;
                img {
                  width: 31px;
                  height: 31px;
                  border-radius: 50%;
                  vertical-align: middle;
                }
              }
            }
            .el-table th.is-leaf {
              background: #f2f2f2;
              color: #333;
            }
            .el-table__header-wrapper,
            .el-table__body-wrapper.is-scrolling-none,
            .el-table__body-wrapper.is-scrolling-left,
            .el-table__fixed-right-patch {
              background: #fff;
            }
          }
        }
      }
    }
    & > .modify_,
    & > .modify {
      .content {
        padding-left: 50px;
        position: relative;
        .operating {
          position: absolute;
          right: 50px;
          top: 15px;
          .text {
            text-align: center;
          }
        }
        .row {
          padding: 14px 0;
          .title {
            width: 70px;
            display: inline-block;
          }
          .in-b {
            vertical-align: middle;
          }
        }
      }
    }
    & > .modify_ {
      .popup-option {
        button + button {
          display: none;
        }
      }
    }
    .popup .popup-head .el-icon-close {
      cursor: pointer;
    }
  }
  img {
    width: 31px;
    height: 31px;
    border-radius: 50%;
    vertical-align: middle;
  }
  .in-b {
    display: inline-block;
  }
  .bul {
    color: #437ff9;
  }
  .red {
    color: #fb7b1d;
  }
  .blk {
    color: #000;
  }
  .special {
    position: relative;
  }
  .special::before {
    position: absolute;
    content: "*";
    color: #dc4233;
    left: -0.7em;
    top: 0.2em;
  }
  .el-table th {
    padding: 0;
  }
  .el-table .cell {
    line-height: 20px;
  }
  .el-table td{
    padding: 4px 0;
  }
}
</style>


