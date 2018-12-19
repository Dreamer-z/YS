<template>
    <div class="managementGuest">
        <!-- 住客管理 -->
        <!-- 按条件查询 -->
        <div class="inquire">
          <div class="row">
            <div class="name in-b cell">
              <div class="in-b span">姓名：</div>
              <div class="in-b">
                <el-input @blur="isName()" v-model="inquireForm.name" size="mini"></el-input>
              </div>
            </div>
            <div class="mobile in-b cell">
              <div class="in-b span">手机号：</div>
              <div class="in-b">
                <el-input @blur="isName()" type="number" v-model="inquireForm.mobile" size="mini"></el-input>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="typeCard in-b cell">
              <div class="in-b span">卡类型：</div>
              <div class="in-b">
                <el-select size="mini" v-model="inquireForm.member_level_id" placeholder="请选择">
                  <el-option
                    v-for="item in typeCardOption"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="vipCard in-b cell">
              <div class="in-b span">会员卡号：</div>
              <div class="in-b">
                <el-input @blur="isName()" type="number" v-model="inquireForm.card_number" size="mini"></el-input>
              </div>
            </div>
            <div class="in-b but">
              <el-button @click="getInquire()" size="mini" type="primary">搜索</el-button>
            </div>
          </div>
        </div>
        <!-- 列表 -->
        <div class="table" style="max-width:1495px;min-height:500px;">
            <el-table :data="tableData" style="">
                <el-table-column label="序号" fixed="left" width="94" type="index"></el-table-column>
                <el-table-column label="姓名" fixed="left"  width="128">
                    <template slot-scope="scope">{{scope.row.name}}</template>
                </el-table-column>
                <el-table-column label="手机号码" width="156">
                    <template slot-scope="scope">{{scope.row.mobile}}</template>
                </el-table-column>
                <el-table-column label="证件类型" width="150">
                    <template slot-scope="scope">{{scope.row.certificate_type | givePaperwork}}</template>
                </el-table-column>
                <el-table-column label="证件号" width="224">
                    <template slot-scope="scope">{{scope.row.idcard}}</template>
                </el-table-column>
                <el-table-column label="是否会员" width="140">
                    <template slot-scope="scope">{{scope.row.type | giveType}}</template>
                </el-table-column>
                <el-table-column label="会员卡号" width="166">
                    <template slot-scope="scope">{{scope.row.card_number}}</template>
                </el-table-column>
                <el-table-column label="卡类型" width="108">
                    <template slot-scope="scope">{{scope.row.card_level_name}}</template>
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="256">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.type==0" type="text" @click="upVip(scope.row.id)" size="small">转会员</el-button>
                        <el-button type="text" @click="edit(scope.row.id,scope.row.vip_id,scope.row.type)" size="small">编辑</el-button>
                        <el-button type="text" @click="details(scope.row.id,scope.row.vip_id,scope.row.type)" size="small">查看详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 分页 -->
        <div class="page" v-if="pages>1">
            <el-pagination
                layout="prev, pager, next"
                :current-page.sync="page"
                @current-change="givePages()"
                :page-size="1"
                :total="pages">
            </el-pagination>
        </div>
        <!-- 弹窗 -->
        <div class="pop-ups">
          <popup @popupOp="conf" ref="up" :popup="pop">
            <div class="content">
              <!-- 操作员 -->
              <!-- <span class="operator">
                  操作员：{{user.name}}
              </span> -->
              <!-- 姓名 -->
              <div class="name">{{client.name}}</div>
              <!-- 手机号 -->
              <div class="mobile row">
                <div class="title in-b">
                  <span>手机号：</span>
                </div>
                <div class="in-b">
                  <el-input v-model="client.mobile" size="mini"></el-input>
                </div>
              </div>
              <!-- 卡号类型 -->
              <div class="typeCard row ">
                <div class="title in-b special">
                  <span>卡类型：</span>
                </div>
                <div class="in-b">
                  <el-select @change="typeCard" size="mini" v-model="formUpVip.member_level_id" placeholder="请选择">
                    <el-option
                      v-for="item in typeCardOption"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </div>
                <div class="in-b right">
                  <span>卡费：{{formUpVip.card_fee}}</span>
                </div>
              </div>
              <!-- 注释蓝字 -->
              <div class="Comment row">
                <div class="title in-b"></div>
                <div class="in-b bul">
                  {{formUpVip.comment}}
                  <!-- 权益：房价折扣8折、延迟退房xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -->
                </div>
              </div>
              <!-- 会员卡号 -->
              <div class="vipCard row">
                <div class="title in-b special">
                  <span>会员卡号：</span>
                </div>
                <div class="long in-b">
                  <el-input v-model="formUpVip.card_number" @blur="errorVipCard" size="mini"></el-input>
                </div>
              </div>
              <!-- 到期时间 -->
              <div class="time row">
                <div class="title in-b">
                  <span>到期时间：</span>
                </div>
                <div class="in-b">
                  <!-- <el-input size="mini"></el-input> -->
                  <el-date-picker
                    size="mini"
                    v-model="formUpVip.expire_time"
                    @change="giveTime()"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </div>
              </div>
              <!-- 充值金额 -->
              <div class="fillMoney row">
                <div class="title in-b">
                  <span>充值金额：</span>
                </div>
                <div class="in-b">
                  <el-input @keyup.native="setFillMoney()" v-model="formUpVip.recharge_amount" size="mini"></el-input>
                </div>
              </div>
              <!-- 赠送金额 -->
              <div class="giveMoney row">
                <div class="title in-b">
                  <span>赠送金额：</span>
                </div>
                <div class="in-b">
                  <el-input v-model="formUpVip.gift_amount" size="mini"></el-input>
                </div>
                <div class="in-b right">
                  <span>充值赠送合计：</span>
                  <span class="org">
                    {{((parseFloat(formUpVip.recharge_amount)?parseFloat(formUpVip.recharge_amount):0)+(parseFloat(formUpVip.gift_amount)?parseFloat(formUpVip.gift_amount):0)).toFixed(2)}}
                  </span>
                </div>
              </div>
              <!-- 合计应收 -->
              <div class="allMoney row">
                <div class="title in-b">
                  <span>合计应收：</span>
                </div>
                <div class="in-b">
                  <span>{{((parseFloat(formUpVip.recharge_amount)?parseFloat(formUpVip.recharge_amount):0)+(parseFloat(formUpVip.card_fee)?parseFloat(formUpVip.card_fee):0)).toFixed(2)}}</span>
                </div>
              </div>
              <!-- 备注 -->
              <div class="exegesis row">
                <div class="title in-b">
                  <span>备注：</span>
                </div>
                <div class="in-b middle long lat">
                  <el-input type="textarea" resize="none" size="mini"></el-input>
                </div>
              </div>
            </div>
          </popup>
          <!-- 收款 -->
          <div class="receipt">
              <popup ref="receipt" @popupOp="receiptFn" :popup="receiptPopup">
                  <div class="content">
                      <!-- 操作员 -->
                      <!-- <span class="operator">
                          操作员：{{user.name}}
                      </span> -->
                      <div class="receiptMoney distance">
                          <div class="tetile">
                              <span class="">应收金额：</span>
                          </div>
                          <div class="in-block">
                              <span></span>
                              <span class="org">
                                  ￥{{((parseFloat(formUpVip.recharge_amount)?parseFloat(formUpVip.recharge_amount):0)+(parseFloat(formUpVip.card_fee)?parseFloat(formUpVip.card_fee):0)).toFixed(2)}}
                              </span>
                          </div>
                      </div>
                      <div class="mode">
                          <div class="type distance">
                              <div class="tetile">
                                  <span class="special">支付方式：</span>
                              </div>
                              <div class="in-block">
                                  <el-select size="mini" v-model="formUpVip.pay_way" placeholder="请选择">
                                      <el-option
                                      v-for="item in moneyTypeOption"
                                      :key="item.id"
                                      :label="item.name"
                                      :value="item.id">
                                      </el-option>
                                  </el-select>
                              </div>
                          </div>
                      </div>
                      <div class="actualMoney distance">
                          <div class="tetile">
                              <span class="special">实收金额：</span>
                          </div>
                          <div class="in-block">
                              <el-tooltip class="item" effect="dark" content="实收金额不得大于应收金额" placement="right">
                                  <el-input v-model="formUpVip.pay_amount" type="number" size="mini"></el-input>
                              </el-tooltip>
                          </div>
                      </div>
                      <div class="order distance">
                          <span class="tetile">单号：</span>
                          <div class="in-block">
                              <el-input v-model="formUpVip.transaction_id" type="number" size="mini"></el-input>
                          </div>
                      </div>
                      <div class="exegesis distance">
                          <span class="tetile">备注：</span>
                          <div class="in-block long ">
                              <el-input size="mini" v-model="formUpVip.remark" type="textarea" resize="none"></el-input>
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
let filtersThis;
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
    filtersThis = this;
    return {
      vipId: null, //会员id
      typeAll: true, //全部checkbox
      typeStaff: true, //在住人员checkbox
      typeVip: true, //全部会员checkbox
      typeUser: true, //全部普客checkbox
      //
      inquireForm: {
        name: "",
        mobile: "",
        member_level_id: "",
        card_number: ""
      }, //条件查找
      vipCardError: false, //会员卡号验证正确
      moneyTypeOption: [], //支付方式
      client: {}, //住客详情信息
      formUpVip: {
        card_fee: "0.00",
        card_number: "",
        pay_amount: "",
        pay_way: 7,
        recharge_amount: 0,
        gift_amount: 0,
        comment: ""
      }, //转会员弹窗数据
      paperworkType: [], //证件类型下拉选项
      page: 1, //当前页数
      pages: 1, //总页数
      typeCardOption: [], //会员卡的类型
      setTypeCard: {},
      tableData: [], //列表
      pop: {
        title: "绑定会员卡",
        width: 600,
        confirmText: "确认",
        cancelText: "取消"
      },
      receiptPopup: {
        title: "收款",
        width: 600,
        confirmText: "确认",
        cancelText: "取消"
      } //收款弹窗头部
    };
  },
  methods: {
    //
    isName() {
      this.inquireForm.name = this.inquireForm.name.replace(
        /(^\s*)|(\s*$)/g,
        ""
      );
      this.inquireForm.mobile = this.inquireForm.mobile.replace(
        /(^\s*)|(\s*$)/g,
        ""
      );
      this.inquireForm.card_number = this.inquireForm.card_number.replace(
        /(^\s*)|(\s*$)/g,
        ""
      );
    },
    // 全部多选按钮
    getTypeAll() {
      if (this.typeAll) {
        this.typeStaff = true;
        this.typeVip = true;
        this.typeUser = true;
      } else {
        this.typeStaff = false;
        this.typeVip = false;
        this.typeUser = false;
      }
    },
    // 在住人员多选按钮
    getTypeStaff() {
      //
      this.typeAll = false;
      this.ifTypeAll();
    },
    // 全部会员多选按钮
    getTypeVip() {
      //
      this.typeAll = false;
      this.ifTypeAll();
    },
    // 全部普客多选按钮
    getTypeUser() {
      //
      this.typeAll = false;
      this.ifTypeAll();
    },
    //是否为全选状态
    ifTypeAll() {
      if (
        this.typeStaff == true &&
        this.typeVip == true &&
        this.typeUser == true
      ) {
        this.typeAll = true;
      }
    },

    // 按条件搜索
    getInquire() {
      console.log(this.inquireForm);
      if (
        !this.inquireForm.name &&
        !this.inquireForm.mobile &&
        !this.inquireForm.card_number &&
        !this.inquireForm.member_level_id
      ) {
        this.init();
        return true;
      }
      API.get(
        "/pms/customer/search?hotel_id=" +
          this.hotel.id +
          "&name=" +
          this.inquireForm.name +
          "&mobile=" +
          this.inquireForm.mobile +
          "&card_number=" +
          this.inquireForm.card_number +
          "&member_level_id=" +
          this.inquireForm.member_level_id +
          "&page=" +
          this.page +
          "&num=10"
        // +this.inquireForm.type
      ).then(res => {
        console.log("搜索列表：", res);
        if (res.error_code == 0) {
          this.tableData = res.data.data;
          this.pages = Math.ceil(res.data.total_count / 10);
        } else {
          this.error(res.msg);
        }
      });
    },
    // 页码发生改变时
    givePages() {
      //
      //   console.log(this.page);
      if (
        !this.inquireForm.name &&
        !this.inquireForm.mobile &&
        !this.inquireForm.card_number &&
        !this.inquireForm.member_level_id
      ) {
        this.init();
        return true;
      } else {
        this.getInquire();
      }
    },
    //开启转会员弹窗
    upVip(num) {
      this.vipId = num;
      this.$refs.up.close();
      this.infoData(num);
    },
    // 卡类型下拉选项
    typeCard() {
      this.typeCardOption.forEach((v, i) => {
        if (this.formUpVip.member_level_id == v.id) {
          this.formUpVip.card_fee = v.card_fee; //获取卡费
          this.setTypeCard = v;
          this.formUpVip.recharge_amount = v.min_recharge_amount;
          this.formUpVip.gift_amount = (
            this.formUpVip.recharge_amount * this.setTypeCard.rate
          ).toFixed(2);
          if (v.rights.length > 0 || !v.rights) {
            v.rights.forEach((v, i) => {
              this.formUpVip.comment += v.rights_name + "，"; //获取权益
            });
          } else {
            this.formUpVip.comment = "无";
          }
        }
      });
      console.log(this.setTypeCard);
      this.formUpVip.card_number = this.client.card_number;
    },
    // 输入充值金额后计算赠送金额
    setFillMoney() {
      if (this.setTypeCard.rate == undefined) {
        this.error("请选择卡号！");
        // this.formUpVip.recharge_amount = 0;
        return false;
      }
      this.formUpVip.gift_amount = (
        this.formUpVip.recharge_amount * this.setTypeCard.rate
      ).toFixed(2);
    },
    // 会员卡验证
    errorVipCard() {
      // console.log(this.formUpVip.card_number.length);
      if (!this.formUpVip.card_number) {
        this.vipCardError = true;
      } else if (
        this.formUpVip.card_number.length > 20 ||
        this.formUpVip.card_number.length < 6
      ) {
        this.vipCardError = true;
      } else {
        this.vipCardError = false;
      }
      console.log("会员卡验证", this.vipCardError);
    },
    // 弹窗确定&&取消
    conf(type) {
      if (type == "cancel") {
        // 取消
        this.$refs.up.close();
        this.clearData();
        this.warning();
      } else {
        // 确定
        if (!this.formUpVip.member_level_id) {
          this.$message.error("请选择卡号类型！");
          return false;
        } else if (!this.formUpVip.card_number) {
          this.$message.error("请输入输入会员卡号！");
          return false;
        } else if (this.vipCardError == true) {
          this.$message.error("会员卡号长度不符合规则");
        } else {
          this.$refs.up.close();
          setTimeout(() => {
            this.$refs.receipt.close();
          }, 200);
        }
      }
    },
    // 收款弹窗 按键
    receiptFn(type) {
      //
      if (type == "cancel") {
        // 取消
        this.$refs.receipt.close();
        this.warning("已取消操作");
        this.clearData();
      } else {
        //
        if (
          (this.formUpVip.pay_amount
            ? parseFloat(this.formUpVip.pay_amount)
            : 0) >
          (
            (parseFloat(this.formUpVip.recharge_amount)
              ? parseFloat(this.formUpVip.recharge_amount)
              : 0) +
            (parseFloat(this.formUpVip.card_fee)
              ? parseFloat(this.formUpVip.card_fee)
              : 0)
          ).toFixed(2)
        ) {
          this.error("实际收费大于应收费");
          return false;
        }
        this.formUpVip.member_id = this.vipId;
        this.formUpVip.mobile = this.client.mobile;
        this.formUpVip.hotel_id = this.hotel.id;
        console.log(this.formUpVip);
        API.post("/pms/customer/upgrade", this.formUpVip).then(res => {
          console.log(res);
          if (res.error_code == 0) {
            this.$refs.receipt.close();
            this.success("操作成功");
            this.clearData();
            this.init();
          } else {
            this.error(res.msg);
          }
        });
      }
    },
    // 时间选择器
    giveTime() {
      //
    },
    // 编辑
    edit(num1, num2, e) {
      //
      if (e == 1) {
        this.$router.push({
          path: "/layerContainer/newVipModify",
          query: { edit: true, userId: num2 }
        });
      } else if (e == 0) {
        this.$router.push({
          path: "/layerContainer/ordinarydetailsedit",
          query: { edit: true, userId: num1 }
        });
      } else {
        this.error("找不到此住客");
      }
    },
    // 查看详情
    details(num1, num2, e) {
      //
      if (e == 1) {
        this.$router.push({
          path: "/layerContainer/newVipModify",
          query: { edit: false, userId: num2 }
        });
      } else if (e == 0) {
        this.$router.push({
          path: "/layerContainer/ordinarydetailsedit",
          query: { edit: false, userId: num1 }
        });
      } else {
        this.error("找不到此住客");
      }
    },
    //获取列表数据
    init() {
      API.get(
        "/pms/customer?id=" + this.hotel.id + "&page=" + this.page + "&num=10"
      ).then(res => {
        console.log("住客详情列表", res);
        if (res.error_code == 0) {
          this.tableData = res.data.data;
          this.pages = Math.ceil(res.data.total_count / 10);
        } else {
          this.error("获取住客列表失败");
        }
      });
    },
    //获取住客详情
    infoData(num) {
      API.get("/pms/customer/" + num).then(res => {
        console.log("住客详情：", res);
        if (res.error_code == 0) {
          this.client = res.data;
        } else {
          this.error("获取住客详情失败");
        }
      });
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
    // 数据清空
    clearData() {
      this.client = {};
      this.formUpVip = {
        card_fee: "0.00",
        pay_amount: "",
        pay_way: 7,
        recharge_amount: 0,
        gift_amount: 0,
        comment: ""
      };
      this.setTypeCard = {};
    }
  },
  mounted() {
    this.init();
    //获取证件类型
    API.get("/pms/common/certificate_type").then(res => {
      console.log("证件类型", res);
      if (res.error_code == 0) {
        this.paperworkType = res.data;
      } else {
        this.error("获取证件类型失败");
      }
    });
    //获取会员卡级
    API.get("/pms/memberlevel?id=" + this.hotel.id).then(res => {
      console.log("会员卡级：", res);
      if (res.error_code == 0) {
        res.data.unshift({
          id: "",
          name: "请选择"
        });
        this.typeCardOption = res.data;
      } else {
        this.error("获取会员垃圾失败");
      }
    });
    // 获取支付方式
    API.get("/pms/common/payway").then(res => {
      console.log("支付方式", res.data);
      this.moneyTypeOption = res.data;
    });
  },
  filters: {
    giveType(t) {
      let arr = ["普客", "会员"];
      return arr[t];
    },
    givePaperwork(t) {
      let match;
      filtersThis.paperworkType.forEach((v, i) => {
        if (t == v.id) {
          match = v.name;
        }
      });
      return match;
    },
    giveLevel(t) {
      let match;
      filtersThis.typeCardOption.forEach((v, i) => {
        // console.log(t)
        if (t == v.id) {
          console.log(t, v.id);
          match = v.name;
        } else {
          match = "非会员";
        }
      });
      return match;
    }
  }
};
</script>
<style lang="scss">
.managementGuest {
  height: 100%;
  * {
    box-sizing: border-box;
  }
  // 查看类型
  .lookType {
    display: flex;
    .typeTitle {
      margin-right: 29px;
      margin-top: 0.2em;
    }
    .el-checkbox:nth-of-type(1) {
      padding-right: 47px;
    }
    .el-checkbox + .el-checkbox {
      margin-right: 47px;
    }
  }
  // 按条件查询
  .inquire {
    width: 100%;
    padding: 0 35px;
    padding-bottom: 10px;
    background-color: #f2f2f2;
    .row {
      .cell {
        margin-right: 60px;
        padding: 5px 0;
        .span {
          width: 60px;
          text-align: right;
        }
      }
      .vipCard {
        margin-right: 10px;
      }
    }
    .el-input--mini {
      width: 180px;
    }
  }
  // 表格
  .table {
    // border-top: 1px solid #ddd;
    padding: 10px 35px;
    overflow-y: auto;
  }
  //   分页
  // .page {
  //   .el-pager li,
  //   .el-pagination .btn-next,
  //   .el-pagination button:disabled,
  //   .el-pagination .btn-prev {
  //     background: none;
  //   }
  // }

  // 弹窗
  & > .pop-ups {
    // 弹窗内容
    // 收款
    .receipt {
      .content {
        padding: 11px 0;
        position: relative;

        .rechargeMoney {
          .el-input--mini {
            width: 417px;
          }
        }
        .giveMoney {
          position: relative;
          .giveTotal {
            margin-left: 24px;
            margin-top: 0.4em;
          }
        }
        .receiptMoney {
          .in-block {
            vertical-align: top;
          }
        }
        .exegesis {
          textarea {
            width: 417px;
          }
        }
        .operator {
          position: absolute;
          right: 0;
          top: -10px;
        }
        .tetile {
          width: 80px;
          display: inline-block;
        }
        .distance {
          padding: 0.5em 0;
        }
        .special {
          position: relative;
        }
        .special::before {
          position: absolute;
          content: "*";
          color: #f00;
          left: -0.7em;
          top: 0.3em;
        }
        .long {
          textarea {
            width: 370px;
          }
        }
        .in-block {
          display: inline-block;
          vertical-align: text-top;
        }
        .org {
          color: #f4703c;
        }
        .receiptMoney {
          .in-block {
            vertical-align: top;
          }
        }
      }
    }
    .content {
      padding: 15px 20px 0;
      position: relative;
      // 操作员
      .operator {
        position: absolute;
        right: 24px;
        top: -0.5em;
      }
      // 名字
      .name {
        font-weight: bold;
        font-size: 16px;
        padding-bottom: 14px;
      }
      // 备注
      .exegesis {
        margin-top: 12px;
      }
      // 公共样式

      .row {
        padding: 5px 0;
        .title {
          width: 70px;
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
        .org {
          color: #f4703c;
        }
        .bul {
          color: #437ff9;
          font-size: 12px;
        }
        .long {
          .el-input--mini {
            width: 417px;
          }
        }
        .lat {
          .el-input--mini {
            height: 60px;
          }
        }
        .right {
          margin-left: 44px;
        }
        .middle {
          vertical-align: text-top;
        }
        .el-input--mini {
          width: 180px;
        }
        .el-input__prefix {
          display: none;
        }
        .el-input--prefix .el-input__inner {
          padding-left: 15px;
        }
      }
    }
    .popup .popup-head .el-icon-close {
      cursor: pointer;
    }
    button + button {
      margin-left: 10px;
    }
    .popup .popup-option {
      padding: 12px 0;
    }
  }
  // 公共样式
  .in-b {
    display: inline-block;
  }
}
</style>

