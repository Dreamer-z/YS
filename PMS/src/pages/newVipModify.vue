<template>
  <div  class="newVip2">
    <!-- 会员基本资料 -->
    <div class="material">
        <div class="title">会员基本资料</div>
        <div class="box">
            <div class="row">
                <div class="title">
                    <span class="special">姓名：</span>
                </div>
                <div class="item">
                    <el-input v-model="editData.name" :disabled="!edit" size="mini"></el-input>
                </div>
            </div>
            <div class="row">
                <div class="title">
                    <span class="special">手机号：</span>
                </div>
                <div class="item">
                    <el-input type="number" v-model="editData.mobile" :disabled="!edit" size="mini"></el-input>
                </div>
            </div>
            <div class="row">
                <div class="title">
                    <span class="special">证件类型：</span>
                </div>
                <div class="item" :class="!edit?'dis':''">
                    <el-select :disabled="!edit" size="mini" v-model="editData.certificate_type" placeholder="请选择">
                        <el-option
                        v-for="item in credentialsOption"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="row long">
                <div class="title">
                    <span class="special">证件号：</span>
                </div>
                <div class="item">
                    <el-input type="number" v-model="editData.idcard" :disabled="!edit" size="mini"></el-input>
                </div>
            </div>
        </div>
    </div>
    <!-- 会员卡信息 -->
    <div class="message">
        <div class="title">会员卡信息</div>
        <div class="box boxTop">
            <div class="row">
                <div class="title">
                    <span class="special">卡类型：</span>
                </div>
                <div class="item dis">
                    <el-select :disabled="true" size="mini" v-model="editData.card.member_level_id" placeholder="请选择">
                        <el-option
                        v-for="item in cardOption"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="row">
                <div class="title">
                    <span class="special">卡号：</span>
                </div>
                <div class="item">
                    <el-input v-model="editData.card.number" :disabled="true" size="mini"></el-input>
                </div>
            </div>
            <div class="row" v-if="!edit">
                <div class="title">
                    <span class="">发卡酒店：</span>
                </div>
                <div class="item">
                    <el-input v-model="editData.hotel_name" :disabled="!edit" size="mini"></el-input>
                </div>
            </div>
            <div class="row" v-if="!edit">
                <div class="title">
                    <span class="">状态：</span>
                </div>
                <div class="item">
                    <el-input v-model="editData.card.status" :disabled="!edit" size="mini"></el-input>
                </div>
            </div>
            <div class="row" v-if="!edit">
                <div class="title">
                    <span class="">发卡时间：</span>
                </div>
                <div class="item">
                    <el-input v-model="editData.card.create_time" :disabled="!edit" size="mini"></el-input>
                </div>
            </div>
            <div class="row">
                <div class="title">
                    <span class="">到期时间：</span>
                </div>
                <div v-if="true" class="item">
                    <el-date-picker
                        @change="giveTime()"
                        value-format="yyyy-MM-dd"
                        :disabled="!edit"
                        size="mini"
                        v-model="editData.card.expire_time"
                        type="date"
                        placeholder="">
                    </el-date-picker>
                </div>
            </div>
            <div class="row">
                <div class="title">
                    <span class="">会员卡权益：</span>
                </div>
                <div class="item" :class="!edit?'vary':''">
                    <el-input type="textarea" resize="none" v-model="editData.benefit" :disabled="true" size="mini"></el-input>
                </div>
            </div>
        </div>
        <div class="box boxBottom" v-if="!edit">
            <div class="line"></div>
            <div class="row">
                <div class="title">
                    <span class="">当前余额：</span>
                </div>
                <div class="item">
                    <el-input v-model="editData.balance" :disabled="!edit" size="mini"></el-input>
                </div>
            </div>
            <div class="row">
                <div class="title">
                    <span class="">累计消费：</span>
                </div>
                <div class="item">
                    <el-input v-model="editData.all_consume" :disabled="!edit" size="mini"></el-input>
                </div>
            </div>
            <div class="row">
                <div class="title">
                    <span class="">累计充值金额：</span>
                </div>
                <div class="item">
                    <el-input v-model="editData.all_recharge" :disabled="!edit" size="mini"></el-input>
                </div>
            </div>
            <div class="row">
                <div class="title">
                    <span class="">累计赠送金额：</span>
                </div>
                <div class="item">
                    <el-input v-model="editData.all_gift" :disabled="!edit" size="mini"></el-input>
                </div>
            </div>
        </div>
    </div>
    <!-- 会员其他信息 -->
    <div class="other">
        <div class="title">会员其他信息</div>
        <div class="box">
            <div class="row">
                <div class="title">
                    <span class="">微信：</span>
                </div>
                <div class="item">
                    <el-input v-model="editData.info.wechat" :disabled="!edit" size="mini"></el-input>
                </div>
            </div>
            <div class="row">
                <div class="title">
                    <span class="">QQ：</span>
                </div>
                <div class="item">
                    <el-input type="number" v-model="editData.info.QQ" :disabled="!edit" size="mini"></el-input>
                </div>
            </div>
            <div class="row">
                <div class="title">
                    <span class="">邮箱：</span>
                </div>
                <div class="item">
                    <el-input v-model="editData.info.email" :disabled="!edit" size="mini"></el-input>
                </div>
            </div>
            <div class="row">
                <div class="title">
                    <span class="">籍贯：</span>
                </div>
                <div class="item">
                    <el-input v-model="editData.info.birthplace" :disabled="!edit" size="mini"></el-input>
                </div>
            </div>
            <div class="row">
                <div class="title">
                    <span class="">国家：</span>
                </div>
                <div class="item">
                    <el-input v-model="editData.info.country" :disabled="!edit" size="mini"></el-input>
                </div>
            </div>
            <div class="row long">
                <div class="title">
                    <span class="">地址：</span>
                </div>
                <div class="item">
                    <el-input v-model="editData.info.address" :disabled="!edit" size="mini"></el-input>
                </div>
            </div>
            <div class="row long">
                <div class="title">
                    <span class="">兴趣爱好：</span>
                </div>
                <div class="item">
                    <el-input v-model="editData.info.hobby" :disabled="!edit" size="mini"></el-input>
                </div>
            </div>
            <div class="row long">
                <div class="title">
                    <span class="">餐饮爱好：</span>
                </div>
                <div class="item">
                    <el-input v-model="editData.info.food" :disabled="!edit" size="mini"></el-input>
                </div>
            </div>
            <div class="row long lat">
                <div class="title">
                    <span class="">客房喜好：</span>
                </div>
                <div class="item">
                    <el-input v-model="editData.info.room" resize="none" type="textarea" :disabled="!edit" size="mini"></el-input>
                </div>
            </div>
        </div>
    </div>
    <!-- 底部按钮 -->
    <div class="but">
        <el-button @click="cancel()" size="mini" type="">返回</el-button>
        <el-button v-if="newVip||edit" @click="define()" size="mini" type="primary">确定</el-button>
        <el-button v-if="!edit" @click="chargeMoney()" size="mini" type="primary">充值</el-button>
    </div>
    <!-- 弹窗 -->
    <div class="pop-ups">
        <!-- 充值 -->
        <div class="recharge">
            <popup ref="re" :popup="rePopup"  @popupOp="onRecha">
                <div class="content">
                    <!-- 操作员 -->
                    <!-- <span class="operator">
                        操作员：{{user.name}}
                    </span> -->
                    <div class="distance">
                        <span>{{editData.name}}</span>
                    </div>
                    <div class="oldType distance">
                        <span class="tetile">原卡类型：</span>
                        <span>{{editData.card.member_level_id | setCardType}}</span>
                    </div>
                    <div class="oldNumber distance">
                        <div class="number">
                            <span class="tetile">卡号：</span>
                            <span>{{editData.card.number}}</span>
                        </div>
                        <div class="balance">
                            <span class="">余额：</span>
                            <span v-if="editData.balance">{{0}}</span>
                            <span v-if="!editData.balance">{{editData.balance?oldVipData.balance:'0'}}</span>
                            <span>元</span>
                        </div>
                    </div>
                    <div class="rechargeMoney distance">
                        <div class="tetile">
                            <span class="special">充值金额：</span>
                        </div>
                        <div class="in-block">
                            <el-input @keyup.native="setGiveMoney(editData.card.member_level_id)" v-model="recharge.recharge_amount" type="number" size="mini"></el-input>
                        </div>
                    </div>
                    <div class="giveMoney">
                        <span class="tetile">赠送金额：</span>
                        <div class="in-block">
                            <el-input v-model="recharge.gift_amount" type="number" size="mini"></el-input>
                        </div>
                        <div class="in-block giveTotal">
                            <span>充值赠送合计：</span>
                            <!-- <span v-if="!recharge.recharge_amount" class="org">0.00</span> -->
                            <span class="org">
                                {{((parseFloat(recharge.recharge_amount)?parseFloat(recharge.recharge_amount):0)+(recharge.gift_amount?parseFloat(recharge.gift_amount):0)).toFixed(2)}}
                            </span>
                        </div>
                    </div>
                    <div class="exegesis distance">
                        <span class="tetile">备注：</span>
                        <div class="in-block">
                            <el-input size="mini" v-model="recharge.recharge_remark" type="textarea" resize="none"></el-input>
                        </div>
                    </div>
                </div>
            </popup>
        </div>
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
                                ￥{{((parseFloat(recharge.recharge_amount)?parseFloat(recharge.recharge_amount):0)).toFixed(2)}}
                            </span>
                        </div>
                    </div>
                    <div class="mode">
                        <div class="type distance">
                            <div class="tetile">
                                <span class="special">支付方式：</span>
                            </div>
                            <div class="in-block">
                                <el-select size="mini" v-model="recharge.pay_way" placeholder="请选择">
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
                                <el-input v-model="recharge.pay_amount" type="number" size="mini"></el-input>
                            </el-tooltip>
                        </div>
                    </div>
                    <div class="order distance">
                        <span class="tetile">单号：</span>
                        <div class="in-block">
                            <el-input v-model="recharge.transaction_id" type="number" size="mini"></el-input>
                        </div>
                    </div>
                    <div class="exegesis distance">
                        <span class="tetile">备注：</span>
                        <div class="in-block">
                            <el-input size="mini" v-model="recharge.remark" type="textarea" resize="none"></el-input>
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
let that;
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
    that = this;
    return {
      edit: false, //是否为编辑状态
      edit_: true, //编辑状态下是否为禁用状态
      userId: "", //会员id
      newVip: false, //是否为新增会员
      credentials: "", //证件类型：
      card: "", //卡类型
      editData: {
        info: {
          wechat: "",
          QQ: "",
          email: "",
          birthplace: "",
          country: "",
          address: "",
          hobby: "",
          food: "",
          room: ""
        }, //会员其他信息
        card: {} //会员卡信息
      }, //提交数据
      cardOption: [], //卡类型option
      credentialsOption: [], //证件类型：option
      oldVipData: [],
      moneyTypeOption: [],
      recharge: {
        pay_way: 7,
        gift_amount: "",
        recharge_amount: ""
      }, //充值数据
      rePopup: {
        title: "充值",
        width: 600,
        confirmText: "确认",
        cancelText: "取消"
      }, //充值弹窗头部
      receiptPopup: {
        title: "收款",
        width: 600,
        confirmText: "确认",
        cancelText: "取消"
      } //收款弹窗头部
    };
  },
  methods: {
    setGiveMoney(e) {
      this.cardOption.forEach((v, i) => {
        if (e == v.id) {
          this.recharge.gift_amount = (
            this.recharge.recharge_amount * v.rate
          ).toFixed(2);
        }
      });
    },
    // 返回按钮
    cancel() {
      this.$router.back();
    },
    // 确定按钮
    define() {
      //   console.log(this.userId);
      this.editData.id = this.userId;
      console.log(this.editData);
      API.put("/pms/member/" + this.userId, this.editData).then(res => {
        if (res.error_code == 0) {
          this.success();
          this.$router.push({
            path: "/layerContainer/managementVip"
          });
        } else {
          this.error(res.msg);
        }
      });
    },
    //充值按钮
    chargeMoney() {
      this.$refs.re.close();
    },
    //充值弹窗   确定||取消&&关闭弹窗
    onRecha(type) {
      //   console.log(this.vipId);
      if (type == "confirm") {
        //确定按钮
        if (!this.recharge.recharge_amount) {
          this.$message.error("请输入输入充值金额！");
          return false;
        }
        this.$refs.re.close();
        setTimeout(() => {
          this.$refs.receipt.close();
        }, 200);
      } else {
        //取消按钮
        this.$refs.re.close();
        this.warning();
        this.clearDate();
      }
    },
    //收款弹窗   确定||取消&&关闭弹窗
    receiptFn(type) {
      if (type == "confirm") {
        if (!this.recharge.pay_amount) {
          this.$message.error("请输入输入实收金额！");
          return false;
        } else {
          this.recharge.id = this.editData.card.id;
          this.recharge.member_id = this.userId;
          this.recharge.hotel_id = this.hotel.id;
          console.log(this.recharge);
          API.post("/pms/member_card/recharge", this.recharge).then(res => {
            console.log(res);
            if (res.error_code == 0) {
              this.$refs.receipt.close();
              this.success();
              this.clearDate();
              this.init();
            } else {
              this.error(res.msg);
            }
          });
        }
      } else {
        this.$refs.receipt.close();
        this.clearDate();
        this.warning();
      }
    },
    // 时间选择器
    giveTime() {
      //   console.log(this.time);
    },
    // 页面加载时加载数据
    init() {
      //   获取会员信息
      API.get("/pms/member/" + this.userId).then(res => {
        console.log("会员信息", res);
        if (res.error_code == 0) {
          res.data.benefit = "";
          if (res.data.info == null) {
            res.data.info = {};
          }
          if (res.data.card == null) {
            res.data.card = {};
          }
          if (res.data.card.rights != null) {
            for (let i = 0; i < res.data.card.rights.length; i++) {
              if (res.data.card.rights[i].rights_name) {
                res.data.benefit += res.data.card.rights[i].rights_info + ",";
              }
            }
          }
          console.log(res.data.benefit);
          this.editData = res.data;
        } else {
          this.error(res.msg);
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
    //数据清空
    clearDate() {
      setTimeout(() => {
        this.order = ""; //订单号清空
        this.exegesis = ""; //备注信息清空
        this.newCardNumber = ""; //新卡号清空
        this.upVipCheck = false; //是否更换卡号清空
        this.newCardType = ""; //升级会员卡号类型清空
        this.cardType = ""; //卡类型清空
        this.recharge = {
          pay_way: 7,
          gift_amount: "",
          recharge_amount: ""
        }; //充值数据清空
        this.upgrade = {}; //升级会员卡数据清空
        this.Completion = {}; //补卡数据清空
        console.log("清除完毕");
      }, 200);
    }
  },
  mounted() {
    this.edit = this.$route.query.edit;
    this.edit_ = this.$route.query.edit;
    this.userId = this.$route.query.userId;
    // console.log(this.edit);
    if (this.edit == undefined) {
      this.edit = true;
    }
    if (!this.userId) {
      this.userId = "";
    }
    console.log("userId", this.userId);
    this.init();
    //获取支付类型
    API.get("/pms/common/payway").then(res => {
      console.log("支付类型：", res);
      this.moneyTypeOption = res.data;
    });
    //获取证件类型
    API.get("/pms/common/certificate_type").then(res => {
      console.log("证件类型", res);
      if (res.error_code == 0) {
        this.credentialsOption = res.data;
      } else {
        this.error(res.msg);
      }
    });
    //获取卡类型
    API.get("/pms/memberlevel?id=" + this.hotel.id).then(res => {
      console.log("卡类型", res);
      if (res.error_code == 0) {
        this.cardOption = res.data;
      } else {
        this.$message.error("获取卡类型失败！");
      }
    });
  },
  filters: {
    setCardType(t) {
      let item = "";
      that.cardOption.forEach((v, i) => {
        if (t == v.level) {
          item = v.name;
        }
      });
      return item;
    }
  }
};
</script>
<style lang="scss">
.newVip2 {
  height: 100%;
  padding: 10px 35px;
  overflow-y: auto;
  * {
    box-sizing: border-box;
  }
  .material,
  .message,
  .other {
    & > .title {
      color: #323232;
      margin-bottom: 14px;
      font-weight: bold;
    }
    .dis {
      .el-input__suffix {
        display: none;
      }
    }
    .box {
      background-color: #f4f9ff;
      width: 1081px;
      padding: 20px 0;
      margin-bottom: 30px;
      display: flex;
      flex-wrap: wrap;
      .row {
        width: 33%;
        padding: 11px 0;
        .title {
          width: 100px;
          display: inline-block;
          text-align: right;
          .special {
            position: relative;
          }
          .special::before {
            position: absolute;
            content: "*";
            left: -1em;
            color: #dc4233;
          }
        }
        .item {
          display: inline-block;
          .el-input--mini {
            width: 180px;
          }
          .el-textarea {
            width: 284%;
            vertical-align: text-top;
          }
          input:disabled,
          textarea:disabled {
            background: #f4f9ff;
            cursor: text;
            border: none;
          }
          .el-input__prefix {
            display: none;
          }
          .el-input--prefix .el-input__inner {
            padding-left: 15px;
          }
        }
      }
    }
    .boxTop {
      margin-bottom: 0;
      .vary {
        vertical-align: text-top;
        margin-top: 0.2em;
        padding-left: 15px;
      }
    }
    .boxBottom {
      margin-top: -30px;
      .line {
        width: 94%;
        margin: 0 auto 12px;
        border-top: 1px solid #e6e6e6;
      }
    }
  }
  .material {
    .long {
      width: 40%;
      .item {
        .el-input--mini {
          width: 308px;
        }
      }
    }
  }
  .other {
    margin-top: 30px;
    .long {
      width: 80% !important;
      .item {
        .el-input--mini {
          width: 538px !important;
        }
      }
    }
    .lat {
      .item {
        vertical-align: text-top !important;
        .el-input--mini {
          textarea {
            height: 60px !important;
          }
        }
      }
    }
  }
  .but {
    padding: 1em;
    text-align: center;
    width: 1081px;
    .el-button--mini {
      padding: 10px 37px;
    }
  }

  //   弹窗
  & > .pop-ups {
    //补卡登记
    .SupplementaryCard,
    .upgradeVip,
    .recharge {
      font-weight: normal;
      .oldNumber {
        position: relative;
        .balance {
          position: absolute;
          right: 0;
          top: 0.5em;
        }
      }
      .newCard {
        input {
          width: 414px;
        }
      }
    }
    // 升级会员卡
    .upgradeVip {
      .cardType {
        position: relative;
        .type {
          .el-select > .el-input {
            width: 180px;
          }
        }
        .Check {
          position: absolute;
          right: 0;
          top: 0.7em;
        }
      }
      .vipCard {
        input {
          width: 414px;
        }
      }
    }
    // 充值
    .recharge {
      .rechargeMoney {
        .el-input--mini {
          width: 414px;
        }
      }
      .giveMoney {
        position: relative;
        .giveTotal {
          margin-left: 24px;
          margin-top: 0.4em;
        }
      }
    }
    // 收款
    .receipt {
      .content {
        .receiptMoney {
          .in-block {
            vertical-align: top;
          }
        }
      }
    }
    // 公用部分
    .content {
      padding: 11px 0;
      position: relative;
      .exegesis {
        textarea {
          width: 414px;
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
      .center {
        text-align: center;
      }
      .fwb {
        font-weight: bold;
        font-size: 18px;
      }
      .in-block {
        vertical-align: text-top;
      }
      .org {
        color: #f4703c;
      }
    }
    .popup-head {
      .el-icon-close {
        cursor: pointer;
      }
    }
    .popup .popup-option > button {
      height: 30px;
    }
  }
  .in-block {
    display: inline-block;
  }
}
</style>