<template>
  <div class="ordinary-details">
    <!--  -->
    <div class="whitetext">
        <!-- 弹窗 -->
        <div class="pop-ups">
          <popup @popupOp="conf" ref="up" :popup="pop">
            <div class="content">
              <!-- 操作员 -->
              <!-- <span class="operator">
                  操作员：{{user.name}}
              </span> -->
              <!-- 姓名 -->
              <div class="name">{{formData.name}}</div>
              <!-- 手机号 -->
              <div class="mobile row">
                <div class="title in-b">
                  <span>手机号：</span>
                </div>
                <div class="in-b">
                  <el-input v-model="formData.mobile" size="mini"></el-input>
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
                  权益：房价折扣8折、延迟退房xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
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
                  <el-input v-model="formUpVip.recharge_amount" size="mini"></el-input>
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
      <p style="margin: 10px 0 20px;font-size: 12px;">住客基本资料：</p>
      <div class="mes-people">
        <div style="margin-bottom: 26px;">
          <p style="width: 33%" class="middle">
            <span style="width: 70px;text-align: right" class="middle">姓名：</span>
            <input :disabled="!edit" v-model="formData.name" type="text">
          </p>
          <p style="width: 33%" class="middle">
            <span style="width: 70px;text-align: right" class="middle">手机号：</span>
            <input :disabled="!edit" @blur="checkPhone(formData.mobile)" v-model="formData.mobile" type="number">
            <span v-show="isPhoneNumfalse" style="color: red;">请输入正确的手机号码</span>
          </p>
        </div>
        <div>
          <p style="width: 33%" class="middle" :class="!edit?'edit':''">
            <span style="width: 70px;text-align: right" class="middle">证件类型：</span>
            <el-select :disabled="!edit" v-model="formData.certificate_type" size="mini" filterable placeholder="请选择">
              <el-option
                v-for="item in cardtypeArr"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </p>
          <p style="width: 33%" class="middle">
            <span style="width: 70px;text-align: right" class="middle">证件号：</span>
            <input :disabled="!edit" @blur="checkIdcard(formData.idcard)" v-model="formData.idcard" type="text">
            <span v-show="isIdcardfalse" style="color: red;">请输入正确的证件号码</span>
          </p>
          <p v-if="edit&&!formData.card.create_time" style="width: 33%;text-align: right;" class="middle">
            <span @click="beMember(formData)" class="middle be-member">转为会员</span>
          </p>
        </div>
        <div class="line"></div>
        <div style="margin-bottom: 26px;">
          <p style="width: 33%" class="middle">
            <span style="width: 70px;text-align: right" class="middle">客房喜好：</span>
            <input :disabled="!edit" v-model="formData.info.room" type="text">
          </p>
          <p style="width: 33%" class="middle">
            <span style="width: 70px;text-align: right" class="middle">籍贯：</span>
            <input :disabled="!edit" v-model="formData.info.birthplace" type="text">
          </p>
          <p style="width: 33%" class="middle">
            <span style="width: 70px;text-align: right" class="middle">国家：</span>
            <input :disabled="!edit" v-model="formData.info.country" type="text">
          </p>
        </div>
        <div style="margin-bottom: 26px;">
          <p style="width: 33%" class="middle">
            <span style="width: 70px;text-align: right" class="middle">兴趣爱好：</span>
            <input :disabled="!edit" v-model="formData.info.hobby" type="text">
          </p>
          <p style="width: 33%" class="middle">
            <span style="width: 70px;text-align: right" class="middle">邮箱：</span>
            <input :disabled="!edit" @blur="checkEmail(formData.info.email)" v-model="formData.info.email" type="text">
            <span v-show="isEmailFalse" style="color: red;">邮箱格式不正确</span>
          </p>
          <p style="width: 33%" class="middle">
            <span style="width: 70px;text-align: right" class="middle">QQ：</span>
            <input :disabled="!edit" v-model="formData.info.QQ" type="number ">
          </p>
        </div>
        <div style="margin-bottom: 26px;">
          <p style="width: 33%" class="middle">
            <span style="width: 70px;text-align: right" class="middle">餐饮爱好：</span>
            <input :disabled="!edit" v-model="formData.info.food" type="text">
          </p>
          <p style="width: 33%" class="middle">
            <span style="width: 70px;text-align: right" class="middle">微信：</span>
            <input :disabled="!edit" v-model="formData.info.wechat" type="text">
          </p>
        </div>
        <div style="margin-bottom: 26px;">
          <p style="width: 100%" class="middle">
            <span style="width: 70px;text-align: right" class="middle">地址：</span>
            <input :disabled="!edit" v-model="formData.info.address" style="width: 46%;" type="text">
          </p>
        </div>
      </div>
      <footer>
        <!-- <div v-if="edit" class="middle" @click="givePost">确定</div>
        <nav @click="goBack" class="middle">返回</nav> -->
        <el-button v-if="edit" @click="givePost" style="width:98px;" size="mini" type="primary">确定</el-button>
        <el-button style="width:98px;" @click="goBack" size="mini" >返回</el-button>
      </footer>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import API from "@/store/API";
import clumBread from "@/components/public/clumbread";
import Popup from "@/components/public/popup"; //弹窗
export default {
  name: "ordinaryDetails",
  data() {
    return {
      edit: false, //编辑状态
      time: "", //到期时间
      // typeCard: "普通会员", //会员类型
      typeCardOption: ["普通会员", "超级会员"],
      isPhoneNumfalse: false,
      isEmailFalse: false,
      isIdcardfalse: false,
      cardtypeArr: [],

      vipCardError: false, //会员卡号验证正确
      moneyTypeOption: [], //支付方式
      // client: {}, //住客详情信息
      memberId: "", //住客id
      formUpVip: {
        card_fee: "0.00",
        pay_amount: "",
        pay_way: 7,
        recharge_amount: 0,
        gift_amount: 0
      }, //转会员弹窗数据
      paperworkType: [], //证件类型下拉选项
      page: 1, //当前页数
      pages: 0, //总页数
      typeCardOption: [], //会员卡的类型
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
      }, //收款弹窗头部
      formData: {
        info: {},
        card: {}
      }
    };
  },
  watch: {
    memberId(newval, oldval) {
      if (typeof newval == "undefined") {
        this.goBack();
      }
    }
  },
  methods: {
    // 时间选择器
    giveTime() {
      //
    },
    //开启转会员弹窗
    upVip(num) {
      this.vipId = num;
      this.$refs.up.close();
      this.infoData(num);
    },
    //
    typeCard() {
      // let _this = this;
      this.typeCardOption.forEach((v, i) => {
        if (this.formUpVip.member_level_id == v.id) {
          this.formUpVip.card_fee = v.card_fee;
        }
      });
      console.log(this.formUpVip);
    },
    // 会员卡验证
    errorVipCard() {
      console.log(this.formUpVip.card_number.length);
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
        } else if (!this.errorVipCard) {
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
        // if (!this.formUpVip.expire_time) {
        //   this.formUpVip.expire_time = 0;
        // }
        this.formUpVip.member_id = this.memberId;
        this.formUpVip.mobile = this.formData.mobile;
        this.formUpVip.hotel_id = this.hotel.id;
        console.log(this.formUpVip);
        API.post("/pms/customer/upgrade", this.formUpVip).then(res => {
          console.log(res);
          if (res.error_code == 0) {
            this.$refs.receipt.close();
            this.success("操作成功");
            this.$router.push({
              path: "/layerContainer/managementGuest"
            });
            // this.clearData();
            // this.init();
          } else {
            this.error(res.msg);
          }
        });
      }
    },
    givePost() {
      console.log("确定");
      // this.
      let setData = {};
      setData = this.formData;
      setData.hotel_id = this.hotel.id;
      setData.member_id = this.memberId;
      setData.address = this.formData.info.address;
      setData.wechat = this.formData.info.wechat;
      setData.country = this.formData.info.country;
      setData.birthplace = this.formData.info.birthplace;
      setData.hobby = this.formData.info.hobby;
      setData.room = this.formData.info.room;
      setData.email = this.formData.info.email;
      setData.QQ = this.formData.info.QQ;
      setData.food = this.formData.info.food;
      console.log(setData);
      API.put("/pms/customer/" + this.memberId, setData).then(res => {
        console.log(res);
        if (res.error_code == 0) {
          // this.success();
          this.$router.push({
            path: "/layerContainer/managementGuest"
          });
        } else {
          this.error(res.msg);
        }
      });
    },
    getCardtypeArr() {
      API.getCardtypeArr().then(res => {
        if (res.error_code == 0) {
          this.cardtypeArr = res.data;
        }
      });
    },
    checkIdcard(e) {
      let reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
      reg.test(e) ? (this.isIdcardfalse = false) : (this.isIdcardfalse = true);
    },
    checkEmail(e) {
      let reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
      reg.test(e) ? (this.isEmailFalse = false) : (this.isEmailFalse = true);
    },
    checkPhone(e) {
      let reg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0|3,5-9]))\d{8}$/;
      console.log(reg.test(e));
      if (reg.test(e)) {
        this.isPhoneNumfalse = false;
      } else {
        this.isPhoneNumfalse = true;
      }
    },
    // 转会员按钮
    beMember(e) {
      // this.$router.push({
      //   path: "/layerContainer/routeraddmember",
      //   query: e
      // });
      this.$refs.up.close();
    },
    goBack() {
      this.$router.back();
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
    clearData() {
      setTimeout(() => {
        this.order = ""; //订单号清空
        this.exegesis = ""; //备注信息清空
        this.newCardNumber = ""; //新卡号清空
        this.upVipCheck = false; //是否更换卡号清空
        this.newCardType = ""; //升级会员卡号类型清空
        this.cardType = ""; //卡类型清空
        this.recharge = {}; //充值数据清空
        this.upgrade = {}; //升级会员卡数据清空
        this.Completion = {}; //补卡数据清空
        this.formUpVip = {
          card_fee: "0.00",
          pay_amount: "",
          pay_way: 7,
          recharge_amount: 0,
          gift_amount: 0
        };
        console.log("清除完毕");
      }, 200);
    },
    init() {
      //用户详细信息：
      API.get("/pms/customer/" + this.memberId).then(res => {
        console.log("用户详细信息：", res);
        // this.mes = res.data;
        if (res.error_code == 0) {
          if (res.data.info == null) {
            res.data.info = {};
          }
          if (res.data.card == null) {
            res.data.card = {};
          }
          this.formData = res.data;
        } else {
          this.error("获取用户信息失败");
        }
      });
    }
  },
  mounted() {
    // this.memberId = this.$route.query.mes.id;
    this.memberId = this.$route.query.userId;
    this.edit = this.$route.query.edit;
    if (!this.edit) {
      this.edit = false;
    }
    if (!this.memberId) {
      this.memberId = "";
    }
    //用户详细信息：
    this.init();
    //获取会员卡级
    API.get("/pms/memberlevel?id=" + this.hotel.id).then(res => {
      console.log("会员卡级：", res);
      if (res.error_code == 0) {
        this.typeCardOption = res.data;
      } else {
        this.error("获取会员垃圾失败");
      }
    });
    // 获取支付方式
    API.get("/pms/common/payway").then(res => {
      console.log("支付方式", res);
      this.moneyTypeOption = res;
    });
    this.getCardtypeArr();
  },
  computed: {
    ...mapGetters({
      hotel: "currHotel",
      user: "user"
    })
  },
  components: {
    clumBread,
    Popup
  }
};
</script>

<style lang="scss">
.ordinary-details {
  user-select: none;
  font-size: 12px;
  position: relative;
  box-sizing: border-box;
  input {
    border: 1px solid #ccc;
    width: 200px;
    height: 30px;
    text-indent: 6px;
    border-radius: 4px;
  }
  .whitetext {
    width: 100%;
    box-sizing: border-box;
    padding: 0 35px;
    background: #fff;

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
            right: 40px;
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
      .popup .popup-option > button {
        height: 35px;
      }
      .popup .popup-option {
        box-shadow: 0px -1px 8px 0px rgba(178, 178, 178, 0.2);
        padding: 12px 0;
      }
    }
    // 公共样式
    .in-b {
      display: inline-block;
    }
  }
  .mes-people {
    box-sizing: border-box;
    padding: 34px 20px 26px;
    border: 1px solid #ccc;
  }
  .line {
    width: 96%;
    border-top: 1px solid #ccc;
    margin: 26px auto 34px;
  }

  // 页面禁用状态下的样式
  input:disabled {
    background: #fff;
    border: none;
    cursor: not-allowed;
  }
  .edit {
    .el-input__suffix {
      display: none;
    }
  }
  footer {
    width: 280px;
    margin: 0 auto;
    margin-top: 50px;
    div {
      width: 120px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background: #6a9df6;
      color: #fff;
      border-radius: 4px;
      margin-right: 20px;
      cursor: pointer;
    }
    nav {
      width: 120px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background: #6a9df6;
      color: #fff;
      border-radius: 4px;
      cursor: pointer;
    }
  }
  .be-member {
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background: #6a9df6;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
  }
}
</style>