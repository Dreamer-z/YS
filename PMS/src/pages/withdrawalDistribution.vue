<template>
    <div class="withdrawalDistribution asdas" style="">
        <!-- 按条件查询 -->
        <div class="inquire">
            <div class="row">
              <div class="condition cell">
                  <span>搜索条件：</span>
                  <div class="in-b">
                      <el-input @blur="isName()" v-model="name" placeholder="手机号码、银行名称，银行卡号" size="mini"></el-input>
                  </div>
              </div>
              <div class="status cell rowMargin">
                  <span>提现时间：</span>
                  <div class="in-b">
                    <el-date-picker
                      size="mini"
                      v-model="time"
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
                      size="mini"
                      v-model="endTime"
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="选择日期时间">
                    </el-date-picker>
                  </div> -->
              </div>
            </div>
            <div class="row">
                <div class="status cell ">
                    <span>订单状态：</span>
                    <div class="in-b">
                        <el-select size="mini" v-model="status" placeholder="请选择">
                            <el-option
                            v-for="item in statusOption"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="status cell commission">
                    <span>申请佣金：</span>
                    <div class="in-b">
                        <el-input @blur="isName()" type="number" v-model="minMoeny" placeholder="最小佣金" size="mini"></el-input>
                    </div>
                    <span>至</span>
                    <div class="in-b">
                        <el-input @blur="isName()" type="number" v-model="maxMoeny" placeholder="最大佣金" size="mini"></el-input>
                    </div>
                </div>
                <div class="but">
                    <el-button @click="clickInquire" type="primary" size="mini">查询</el-button>
                </div>
            </div>
        </div>
        <!-- 列表 -->
        <div class="table">
            <el-table :data="tableData" style="width:1700px;">
                <el-table-column label="订单号" width="220" fixed="left">
                    <template slot-scope="scope">{{scope.row.draw_no}}</template>
                </el-table-column>
                <el-table-column :render-header="renderHeader1" label="提现人（微信/ID）" width="180" fixed="left">
                    <template slot-scope="scope">
                      <img v-if="scope.row.avatar_url" :src="scope.row.avatar_url" alt="">
                      <img v-if="!scope.row.avatar_url" src="../assets/images/wachatApply.png" alt="">
                      <span>{{scope.row.nickname?scope.row.nickname:'匿名用户'}}<br/>{{scope.row.invite_code}}</span>
                    </template>
                </el-table-column>
                <el-table-column :render-header="renderHeader2" label="提现人（姓名/手机号码）" width="220">
                    <template slot-scope="scope">{{scope.row.name}}<br/>{{scope.row.mobile}}</template>
                </el-table-column>
                <el-table-column label="申请佣金" width="111">
                    <template slot-scope="scope">{{scope.row.money}}</template>
                </el-table-column>
                <el-table-column label="提现银行" width="167">
                    <template slot-scope="scope">
                      {{scope.row.bank_name}}<br/>
                      {{scope.row.card_no}}
                    </template>
                </el-table-column>
                <el-table-column label="提现时间" width="170">
                    <template slot-scope="scope">{{scope.row.create_time}}</template>
                </el-table-column>
                <el-table-column label="打款时间" width="173">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status==1">{{scope.row.pay_time}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="状态" width="116">
                    <template slot-scope="scope">{{scope.row.status | getStatus}}</template>
                </el-table-column>
                <el-table-column label="拒绝原因" width="170">
                    <template slot-scope="scope">
                      <span v-if="scope.row.status==2">{{scope.row.remark}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                fixed="right"
                label="操作"
                width="170">
                <template slot-scope="scope">
                    <el-button @click="seeDetails(scope.row.draw_id)" type="text" size="small">查看</el-button>
                    <el-button v-if="scope.row.status==0" @click="seeCheck(scope.row.draw_id)" type="text" size="small">审核</el-button>
                    <el-button v-if="scope.row.status==1&&scope.row.tag==false" @click="seeRetract(scope.row.draw_id)" type="text" size="small">撤回</el-button>
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
            <!-- 打款 -->
            <transition name="chec">
                <div class="check" v-if="checkOpen">
                    <div class="checkBox">
                        <!-- title -->
                        <div class="checkTitle">
                            <span>打款</span>
                            <span @click="checkClose" class="close"><i class="el-icon-close"></i></span>
                        </div>
                        <!-- 内容 -->
                        <div class="checkContent">
                            <!-- 基础信息 -->
                            <div class="basisInfo">
                                <div class="name row">
                                    <div class="textTitle fwb">
                                        <span>提现人：</span>
                                    </div>
                                    <div class="in-b">
                                        <span>{{pupData.name}}</span>
                                    </div>
                                </div>
                                <div class="mobile row">
                                    <div class="textTitle fwb">
                                        <span>手机号码</span>
                                    </div>
                                    <div class="in-b">
                                        <span>{{pupData.mobile}}</span>
                                    </div>
                                </div>
                            </div>
                            <!-- 金额信息 -->
                            <div class="moneyInfo">
                                <div class="nameBank row">
                                    <div class="textTitle">
                                        <span>提现银行：</span>
                                    </div>
                                    <div class="in-b">
                                        <span>{{pupData.bank_name}}</span>
                                    </div>
                                </div>
                                <div class="nameBranch row">
                                    <div class="textTitle">
                                        <span>开户支行：</span>
                                    </div>
                                    <div class="in-b">
                                        <span>{{pupData.branch_bank}}</span>
                                    </div>
                                </div>
                                <div class="numberBank row">
                                    <div class="textTitle">
                                        <span>银行卡号：</span>
                                    </div>
                                    <div class="in-b">
                                        <span>{{pupData.card_no}}</span>
                                    </div>
                                </div>
                                <div class="userCardName row">
                                    <div class="textTitle">
                                        <span>持卡人姓名：</span>
                                    </div>
                                    <div class="in-b">
                                        <span>{{pupData.card_name}}</span>
                                    </div>
                                </div>
                                <div class="applyMoney row">
                                    <div class="textTitle fwb">
                                        <span>申请佣金：</span>
                                    </div>
                                    <div class="in-b org">
                                        <span>{{pupData.money}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="numberOrder">
                                <div class="numberCard row">
                                    <div class="textTitle">
                                        <span class="special">备注：</span>
                                    </div>
                                    <div class="in-b">
                                      <el-input  @blur="isName()" v-model="pay_no" placeholder="请输入文字，不得多于200字" type="textarea" resize="none" rows="4"></el-input>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 按钮 -->
                        <div class="checkbut">
                            <el-button @click="submit()" type="primary" size="mini">提交打款</el-button>
                            <el-button @click="refuse()" size="mini">拒绝打款</el-button>
                        </div>
                    </div>
                </div>
            </transition>
            <!-- 拒绝原因 -->
            <div class="reason">
                <popup ref="reason"  @popupOp="reasonSet" :popup="reason">
                    <el-input  @blur="isName()" v-model="cause" placeholder="请输入文字，不得多于200字" type="textarea" resize="none" rows="4"></el-input>
                </popup>
            </div>
            <!-- 撤回 -->
            <div class="retract">
                <popup ref="retract"  @popupOp="retractSet" :popup="retract">
                    <div class="contents">
                        <span>您确定要撤回“已打款”操作吗？</span>
                    </div>
                </popup>
            </div>
            <!-- 撤回原因 -->
            <div class="retractCause">
                <popup ref="retractCause"  @popupOp="CauseSet" :popup="Cause">
                    <div class="contents">
                        <el-input @blur="isName()" v-model="retractCauseText" placeholder="请输入文字，不得多于200字" type="textarea" resize="none" rows="4"></el-input>
                    </div>
                </popup>
            </div>
            <!-- 提现详情 -->
            <div class="details">
                <popup ref="details"  @popupOp="detailsSet" :popup="details">
                    <div class="content">
                        <!-- 上方信息 -->
                        <div class="basicInfo">
                            <div class="row left">
                                <div class="rowItem ">
                                    <div class="title">
                                        <span>订单号：</span>
                                    </div>
                                    <div class=" in-b">
                                        <span class="text">{{pupData.draw_no}}</span>
                                    </div>
                                </div>
                                <div class="rowItem ">
                                    <div class="title">
                                        <span>提现人：</span>
                                    </div>
                                    <div class=" in-b">
                                        <span class=" in-b">
                                          <img v-if="pupData.avatar_url" :src="pupData.avatar_url" alt="">
                                          <img v-if="!pupData.avatar_url" src="../assets/images/wachatApply.png" alt="">
                                        </span>
                                        <span class=" in-b">
                                            <span>{{pupData.nickname?pupData.nickname:'匿名用户'}}</span><br/>
                                            <span class="bul">{{pupData.invite_code}}</span>
                                        </span>
                                    </div>
                                </div>
                                <div class="rowItem ">
                                    <div class="title">
                                        <span>用户姓名：</span>
                                    </div>
                                    <div class=" in-b">
                                        <span>{{pupData.name}}</span>
                                    </div>
                                </div>
                                <div class="rowItem ">
                                    <div class="title">
                                        <span>手机号码：</span>
                                    </div>
                                    <div class=" in-b">
                                        <span>{{pupData.mobile}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="row center">
                                <div class="rowItem ">
                                    <div class="title">
                                        <span>提现银行：</span>
                                    </div>
                                    <div class=" in-b">
                                        <span class="">{{pupData.bank_name}}</span>
                                    </div>
                                </div>
                                <div class="rowItem ">
                                    <div class="title">
                                        <span>开户支行：</span>
                                    </div>
                                    <div class=" in-b">
                                        <span class="">{{pupData.branch_bank}}</span>
                                    </div>
                                </div>
                                <div class="rowItem ">
                                    <div class="title">
                                        <span>银行卡号：</span>
                                    </div>
                                    <div class=" in-b">
                                        <span class="">{{pupData.card_no}}</span>
                                    </div>
                                </div>
                                <div class="rowItem ">
                                    <div class="title">
                                        <span>持卡人姓名：</span>
                                    </div>
                                    <div class=" in-b">
                                        <span class="">{{pupData.card_name}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="row right">
                                <div class="rowItem ">
                                    <div class="title">
                                        <span>提现佣金：</span>
                                    </div>
                                    <div class=" in-b">
                                        <span class="red">{{pupData.money?pupData.money:'0.00'}}</span>
                                    </div>
                                </div>
                                <div class="rowItem ">
                                    <div class="title">
                                        <span>已成功提现佣金：</span>
                                    </div>
                                    <div class=" in-b">
                                        <span class="red">{{pupData.sale_info.draw_money?pupData.sale_info.draw_money:'0.00'}}</span>
                                    </div>
                                </div>
                                <div class="rowItem ">
                                    <div class="title">
                                        <span>截止剩余佣金：</span>
                                    </div>
                                    <div class=" in-b">
                                        <span class="red">{{pupData.sale_info.amout_money?pupData.sale_info.amout_money:'0.00'}}</span>
                                    </div>
                                </div>
                                <div class="rowItem ">
                                    <div class="title">
                                        <span>提现状态：</span>
                                    </div>
                                    <div class=" in-b">
                                        <span class="">{{pupData.status | getStatus}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 操作 -->
                        <div class="operating">
                            <div class="title">操作记录</div>
                            <div class="operatingTable">
                                <el-table :data="pupData.log_list" style="width:100%">
                                    <el-table-column label="操作人" width="200">
                                        <template slot-scope="scope">
                                          <span class=" in-b">
                                            <img v-if="scope.row.avatar_url" :src="scope.row.avatar_url?scope.row.avatar_url:''" alt="">
                                            <img v-if="!scope.row.avatar_url&&scope.row.type==1" src="../assets/images/wachatApply.png" alt="">
                                          </span>
                                          <span class=" in-b">{{scope.row.name?scope.row.name:'匿名用户'}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="操作动作" width="124">
                                        <template slot-scope="scope">{{scope.row.operate_behavior}}</template>
                                    </el-table-column>
                                    <el-table-column label="状态" width="116">
                                        <template slot-scope="scope">{{scope.row.status | getStatus}}</template>
                                    </el-table-column>
                                    <el-table-column label="操作时间" width="190">
                                        <template slot-scope="scope">{{scope.row.create_time}}</template>
                                    </el-table-column>
                                    <el-table-column label="备注" width="265">
                                        <template slot-scope="scope">{{scope.row.remark}}</template>
                                    </el-table-column>
                                </el-table>
                            </div>
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
      status: "",
      time: "",
      name: "",
      maxMoeny: "",
      minMoeny: "",
      checkOpen: false, //打款弹窗
      num: "", //列表id
      pay_no: "", //订单号
      cause: "", //拒绝理由
      retractCauseText: "", //撤回原因
      page: 1, //当前页
      pages: 1, //总页数
      pupData: {
        log_list: [],
        sale_info: {}
      }, //弹窗数据
      statusOption: [
        {
          id: "",
          name: "全部"
        },
        {
          id: 0,
          name: "待审核"
        },
        {
          id: 1,
          name: "已打款"
        },
        {
          id: 2,
          name: "拒绝"
        }
      ], //认证状态下拉选项
      tableData: [], //主页面表格数据
      retract: {
        title: "撤回",
        width: 400,
        confirmText: "确认",
        cancelText: "关闭"
      },
      details: {
        title: "提现详情",
        width: 1000,
        confirmText: "确认",
        cancelText: "关闭"
      },
      reason: {
        title: "拒绝原因",
        width: 600,
        confirmText: "确认",
        cancelText: "关闭"
      },
      Cause: {
        title: "撤回原因",
        width: 600,
        confirmText: "提交",
        cancelText: "关闭"
      }
    };
  },
  methods: {
    //
    isName() {
      this.name = this.name.replace(/(^\s*)|(\s*$)/g, "");
      this.cause = this.cause.replace(/(^\s*)|(\s*$)/g, "");
      this.pay_no = this.pay_no.replace(/(^\s*)|(\s*$)/g, "");
      this.retractCauseText = this.retractCauseText.replace(
        /(^\s*)|(\s*$)/g,
        ""
      );
    },
    clickInquire() {
      if (this.time == null) {
        this.time = "";
      }
      if (this.time == "" && this.maxMoeny == "") {
        console.log(1);
        this.init();
        return true;
      }
      if (this.time == "" && this.maxMoeny != "") {
        if (parseFloat(this.maxMoeny) < parseFloat(this.minMoeny)) {
          this.error("请输入正确的佣金范围");
          return false;
        }
      } else if (this.maxMoeny == "" && this.time != "") {
        if (new Date(this.time).getTime() > new Date(this.time).getTime()) {
          this.error("请正确输入时间段");
          return false;
        }
      }
      console.log(4);
      this.init();
    },
    // 分页页码发生改变时
    pageChange() {
      console.log(this.page);
      this.init();
    },
    //   打开查看详情弹窗
    seeDetails(num) {
      this.$refs.details.close();
      console.log(num);
      this.infoDetails(num);
    },
    infoDetails(num) {
      API.get("/pms/draw/detail?hid=" + this.hotel.id + "&did=" + num).then(
        res => {
          console.log("弹窗详情：", res);
          if (res.error_code == 0) {
            if (res.data.sale_info == null) {
              res.data.sale_info = {};
            }
            this.pupData = res.data;
          } else {
            this.error();
          }
        }
      );
    },
    // 详情弹窗确定取消按钮
    detailsSet(type) {
      if (type == "confirm") {
        this.$refs.details.close();
        this.success();
      } else if (type == "cancel") {
        this.$refs.details.close();
        this.clearDate();
      }
    },
    // 打开审核弹窗
    seeCheck(num) {
      this.checkOpen = true;
      this.num = num;
      this.infoDetails(num);
    },
    // 关闭审核弹窗
    checkClose(num) {
      this.checkOpen = false;
      this.warning();
      this.pay_no = "";
      this.clearDate();
    },
    // 提交打款
    submit() {
      if (!this.pay_no) {
        this.error("打款备注为空！");
        return false;
      }
      let data = {
        hotel_id: this.hotel.id,
        staff_id: this.user.staff_id,
        remark: this.pay_no,
        did: this.num
      };
      API.post("/pms/draw/success", data).then(res => {
        console.log(res);
        if (res.error_code == 0) {
          this.checkOpen = false;
          this.success();
          this.init();
          this.pay_no = "";
        } else {
          this.error(res.msg);
        }
      });
    },
    // 拒绝打款
    refuse() {
      this.checkOpen = false;
      setTimeout(() => {
        this.$refs.reason.close();
        this.pay_no = "";
      }, 200);
    },
    // 拒绝原因弹窗确定取消按钮
    reasonSet(type) {
      if (type == "confirm") {
        if (this.cause) {
          let data = {
            hotel_id: this.hotel.id,
            staff_id: this.user.staff_id,
            remark: this.cause,
            did: this.num
          };
          API.post("/pms/draw/refuse", data).then(res => {
            console.log(res);
            if (res.error_code == 0) {
              this.$refs.reason.close();
              this.cause = "";
              this.success();
              this.init();
            } else {
              this.error(res.msg);
            }
          });
        } else {
          this.error("请输入拒绝原因！");
        }
      } else if (type == "cancel") {
        this.$refs.reason.close();
        this.warning();
        this.clearDate();
      }
    },
    // 打开撤回弹窗
    seeRetract(num) {
      this.$refs.retract.close();
      this.num = num;
    },
    // 撤回确定取消按钮
    retractSet(type) {
      if (type == "confirm") {
        this.$refs.retract.close();
        setTimeout(() => {
          this.$refs.retractCause.close();
        }, 200);
      } else if (type == "cancel") {
        this.$refs.retract.close();
        this.warning();
      }
    },
    // 撤回原因确定&&取消按钮
    CauseSet(type) {
      if (type == "confirm") {
        if (this.retractCauseText) {
          let data = {
            hotel_id: this.hotel.id,
            staff_id: this.user.staff_id,
            did: this.num,
            remark: this.retractCauseText
          };
          console.log(data);
          API.post("/pms/draw/reset", data).then(res => {
            console.log(res);
            if (res.error_code == 0) {
              this.success();
              this.$refs.retractCause.close();
              this.init();
            } else {
              this.error(res.msg);
            }
          });
        } else {
          this.error("撤回原因为空！");
        }
      } else if (type == "cancel") {
        this.$refs.retractCause.close();
        this.warning();
        this.clearDate();
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
    //页面初始表格
    init() {
      let endTime, startTime;
      if (this.time) {
        endTime = this.time[1];
        startTime = this.time[0];
      }
      API.get(
        "/pms/draw/list?hid=" +
          this.hotel.id +
          "&page=" +
          this.page +
          "&pageNum=10" +
          "&name=" +
          this.name +
          "&status=" +
          this.status +
          "&min_moeny=" +
          this.minMoeny +
          "&max_moeny=" +
          this.maxMoeny +
          "&etime=" +
          endTime +
          "&stime=" +
          startTime
      ).then(res => {
        console.log("页面列表：", res);
        if (res.error_code == 0) {
          // res.data.list.forEach((v, i) => {
          //   if (v.status == 1) {
          //     console.log(v.pay_time.split(" ")[0]);
          //     v.isGetTime =
          //       new Date().getTime() -
          //         new Date(v.pay_time.split(" ")[0]).getTime() >
          //       1296000000;
          //   }
          // });
          this.tableData = res.data.list;
          this.pages = res.data.pages;
        } else {
          this.error(res.msg);
        }
      });
    },
    clearDate() {
      this.pupData = {
        log_list: [],
        sale_info: {}
      };
      this.cause = "";
      this.retractCauseText = "";
      this.pay_no = "";
      this.num = "";
    }
  },
  mounted() {
    this.init();
  },
  filters: {
    getStatus(t) {
      let arr = ["待审核", "已打款", "拒绝"];
      return arr[t];
    }
  }
};
</script>
<style lang="scss">
.withdrawalDistribution {
  //   按条件查询
  & > .inquire {
    padding: 0 35px;
    background: #f2f2f2;
    .row {
      display: flex;
      flex-wrap: wrap;
      .cell {
        margin-right: 60px;
        padding: 5px 0;
      }
      .commission {
        margin-right: 10px;
      }
    }
    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
      width: 180px;
    }
    .el-range-editor--mini.el-input__inner {
      width: 380px;
    }
  }
  //   列表
  & > .table {
    padding: 0 35px;
    overflow: auto;
    max-width: 100%;
    // height: 700px;
    padding-top: 30px;
    border-top: 1px solid #dfdfdf;
    img {
      vertical-align: middle;
    }
    .el-table {
      user-select: text;
      // user-select: none;
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
  }
  // 分页
  // & > .page {
  //   padding-bottom: 20px;
  //   .el-pager li,
  //   .el-pagination button:disabled,
  //   .el-pagination .btn-next,
  //   .el-pagination .btn-prev {
  //     background: #f2f2f2;
  //   }
  // }
  //   弹窗
  & > .pop-ups {
    * {
      box-sizing: border-box;
    }
    // 提现详情
    .details {
      .content {
        //   上方信息
        .basicInfo {
          display: flex;
          padding-bottom: 2em;
          .row {
            width: 33.3%;
            .rowItem {
              width: 90%;
              margin: 0 auto;
              padding: 1.25em 0;
              display: flex;
              align-items: center;

              & > .in-b {
                vertical-align: middle;
                width: 155px;
                .text {
                  display: block;
                  overflow: hidden;
                  height: 14px;
                  word-wrap: break-word;
                  word-break: break-all;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-line-clamp: 1; //几行之后就显示 "..."
                  -webkit-box-orient: vertical;
                }
              }
              .title {
                width: 120px;
                display: inline-block;
                text-align: right;
              }
              .bul {
                color: #437ff9;
              }
              .red {
                color: #f4703c;
              }
            }
          }
          .row + .row {
            border-left: 1px solid #e6e6e6;
          }
        }
        // 操作
        .operating {
          border-top: 1px solid #e6e6e6;
          margin: 0 2em;
          padding: 2em 0;
          .operatingTable {
            padding-top: 1em;
            img {
              vertical-align: middle;
            }
            .el-table th.is-leaf {
              background: #f2f2f2;
              .cell {
                color: #333;
              }
            }
            .el-table__empty-block {
              background: #fff;
            }
          }
        }
      }
      .popup .popup-option > button + button {
        display: none;
      }
    }

    // 打款
    .chec-enter-active,
    .chec-leave-active {
      transition: opacity 0.3s;
    }
    .chec-enter,
    .chec-leave-to {
      opacity: 0;
    }
    // 打款弹窗
    .check {
      position: fixed;
      width: 100%;
      height: 100%;
      z-index: 100;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      .checkBox {
        display: flex;
        flex-direction: column;
        width: 600px;
        background: #fff;
        // title
        .checkTitle {
          background: #437ff9;
          padding: 1em 2em;
          position: relative;
          * {
            color: #fff;
          }
          .close {
            cursor: pointer;
            position: absolute;
            top: 1em;
            right: 2em;
          }
        }
        // 内容
        .checkContent {
          width: 90%;
          margin: 32px auto 27px;
          .moneyInfo {
            margin-top: 9px;
            padding-top: 18px;
            background: #f0f0f0;
            .applyMoney {
              padding-top: 19px;
              border-top: 1px solid #d9d9d9;
            }
          }
          .numberOrder {
            margin-top: 14px;
            .in-b {
              width: 380px;
              vertical-align: top;
            }
          }
          //公用部分
          .textTitle {
            width: 85px;
            display: inline-block;
          }
          .org {
            color: #f4703c;
          }
          .special {
            position: relative;
          }
          .special::before {
            position: absolute;
            content: "*";
            left: -0.7em;
            color: #dc4233;
          }
          .fwb {
            font-weight: bold;
          }
          .row {
            padding: 10px 0;
            margin: 0 31px;
          }
        }
        // 按钮
        .checkbut {
          text-align: center;
          padding: 1.5em;
          background: #fff;
          box-shadow: 0px -1px 8px 0px rgba(178, 178, 178, 0.2);
        }
        .el-button--mini {
          padding: 10px 25px;
        }
      }
    }
    // 撤回
    .retract {
      .contents {
        padding: 22px 0;
        text-align: center;
      }
      .popup .popup-option > button {
        height: 30px;
        width: 80px;
      }
    }
    .popup .popup-head .el-icon-close {
      cursor: pointer;
    }
    .popup .popup-option > button {
      height: 35px;
    }
  }
  .in-b {
    display: inline-block;
  }
  img {
    width: 31px;
    height: 31px;
    border-radius: 50%;
  }
}
</style>


