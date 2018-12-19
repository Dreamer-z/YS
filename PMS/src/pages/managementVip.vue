<template>
    <div class="managementVip">
        <!-- 会员管理 -->
        <!-- 按条件查询 -->
        <div class="inquire">
          <div class="row">
            <div class="name cell">
                <span class="depict">姓名：</span>
                <div class="in-block">
                    <el-input @blur="isName()" size="mini" v-model="formInquire.name"></el-input>
                </div>
            </div>
            <div class="mobile cell">
                <span class="depict">手机：</span>
                <div class="in-block">
                    <el-input @blur="isName()" type="number" size="mini" v-model="formInquire.mobile"></el-input>
                </div>
            </div>
            <div class="idCard cell">
                <span class="depict">身份证号：</span>
                <div class="in-block">
                    <el-input @blur="isName()" type="number" size="mini" v-model="formInquire.idcard"></el-input>
                </div>
            </div>
          </div>
          <div class="row">
            <div class="cardType cell">
                <span class="depict">卡类型：</span>
                <div class="in-block">
                    <el-select size="mini" v-model="formInquire.member_level_id" placeholder="请选择">
                        <el-option
                        v-for="item in cardTypeOption"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="cardNumber cell">
                <span class="depict">会员卡号：</span>
                <div class="in-block">
                    <el-input @blur="isName()" type="number" size="mini" v-model="formInquire.card_number"></el-input>
                </div>
            </div>
            <div class="but cell">
                <el-button @click="inquire()" size="mini" type="primary">查询</el-button>
            </div>
          </div>
        </div>
        <!-- 新增会员按钮 -->
        <div class="newVip">
            <el-button @click="newVip()" size="mini" type="primary">新增会员</el-button>
        </div>
        <!-- 列表 -->
        <div class="table" style="min-height:500px;">
            <el-table :data="tableDataVip" style="">
                <el-table-column label="序号" width="94" type="index" fixed="left">
                    <!-- <template slot-scope="scope">{{scope.row.num}}</template> -->
                </el-table-column>
                <el-table-column label="姓名" width="128" fixed="left">
                    <template slot-scope="scope">{{scope.row.name}}</template>
                </el-table-column>
                <el-table-column label="手机号码" width="157">
                    <template slot-scope="scope">{{scope.row.mobile}}</template>
                </el-table-column>
                <el-table-column label="微信号" width="143">
                    <template slot-scope="scope">{{scope.row.wechat?scope.row.wechat:"无"}}</template>
                </el-table-column>
                <el-table-column label="证件类型" width="143">
                    <template slot-scope="scope">{{scope.row.certificate_type | credentials}}</template>
                </el-table-column>
                <el-table-column label="证件号" width="225">
                    <template slot-scope="scope">{{scope.row.idcard}}</template>
                </el-table-column>
                <el-table-column label="会员卡号" width="147">
                    <template slot-scope="scope">{{scope.row.card_number}}</template>
                </el-table-column>
                <el-table-column label="卡类型" width="137">
                    <template slot-scope="scope">{{scope.row.card_level_name}}</template>
                </el-table-column>
                <el-table-column label="当前余额" width="124">
                    <template slot-scope="scope">{{scope.row.balance?scope.row.balance:'0'}}</template>
                </el-table-column>
                <el-table-column label="卡状态" width="112">
                    <template slot-scope="scope">{{scope.row.card_status}}</template>
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="278">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.card_status=='正常'" type="text" @click="recha(scope.row.id,scope.row.card_id)" size="small">充值</el-button>
                        <el-button v-if="scope.row.card_status=='停用'" type="text" @click="actiO(scope.row.card_id)" size="small">激活</el-button>
                        <!-- <el-button v-if="scope.row.card_status==1" type="text" @click="stopO(scope.row.card_id)" size="small">停用</el-button> -->
                        <el-button type="text" @click="edit(scope.row.id)" size="small">编辑</el-button>
                        <el-button type="text" @click="details(scope.row.id)" size="small">查看详情</el-button>
                        <el-dropdown @visible-change="commandNum(scope.row.id,scope.row.card_id)" trigger="click"  @command="handleCommand">
                            <span class="el-dropdown-link">
                                <el-button v-if="scope.row.card_status=='正常'" type="text" @click="More!=More" size="small">更多</el-button>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="uppVip" >升级</el-dropdown-item>
                                <el-dropdown-item command="suppCard">补卡</el-dropdown-item>
                                <el-dropdown-item command="stopO" >停用</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
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
            <!-- 补卡登记 -->
            <div class="SupplementaryCard">
                <popup ref="sup"  @popupOp="supCard" :popup="SupplementaryCard">
                    <div class="content">
                        <!-- 操作员 -->
                        <!-- <span class="operator">
                            操作员：{{user.name}}
                        </span> -->
                        <div class="distance">
                          <span>{{oldVipData.name}}</span>
                        </div>
                        <div class="oldType distance">
                            <span class="tetile">原卡类型：</span>
                            <span>{{oldVipData.card.member_level_id | setCardType}}</span>
                        </div>
                        <div class="oldNumber distance">
                            <div class="number">
                                <span class="tetile">原卡号：</span>
                                <span>{{oldVipData.card.number}}</span>
                            </div>
                            <div class="balance">
                                <span class="">余额：</span>
                                <span>{{oldVipData.balance?oldVipData.balance:'0'}}元</span>
                            </div>
                        </div>
                        <div class="newCard distance">
                            <div class="tetile">
                                <span class=" special">新卡号：</span>
                            </div>
                            <div class="in-block">
                                <el-tooltip class="item" effect="dark" content="卡号不得与已有卡号重复" placement="bottom">
                                    <el-input type="number" v-model="Completion.new_card_number" size="mini"></el-input>
                                </el-tooltip>
                                
                            </div>
                        </div>
                        <div class="exegesis distance">
                            <span class="tetile">备注：</span>
                            <div class="in-block">
                                <el-input size="mini"  v-model="Completion.remark" type="textarea" resize="none"></el-input>
                            </div>
                        </div>
                    </div>
                </popup>
            </div>
            <!-- 升级会员卡 -->
            <div class="upgradeVip">
                <popup ref="up"  @popupOp="upVip" :popup="upgradeVip">
                    <div class="content">
                        <!-- 操作员 -->
                        <!-- <span class="operator">
                            操作员：{{user.name}}
                        </span> -->
                        <div class="distance">
                          <span>{{oldVipData.name}}</span>
                        </div>
                        <div class="oldType distance">
                            <span class="tetile">原卡类型：</span>
                            <span>{{oldVipData.card.member_level_id | setCardType}}</span>
                        </div>
                        <div class="oldNumber distance">
                            <div class="number">
                                <span class="tetile">原卡号：</span>
                                <span>{{oldVipData.card.number}}</span>
                            </div>
                            <div class="balance">
                                <span class="">余额：</span>
                                <span>{{oldVipData.balance?oldVipData.balance:'0'}}元</span>
                            </div>
                        </div>
                        <div class="cardType distance">
                            <div class="type">
                                <div class="tetile">
                                    <span class="special">卡号类型：</span>
                                </div>
                                <div class="in-block">
                                    <el-select size="mini" v-model="upgrade.new_member_level_id" placeholder="请选择">
                                        <el-option
                                        v-for="item in cardTypeOption"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                            <div class="Check">
                                <el-checkbox v-model="upVipCheck">是否需要更换卡号？</el-checkbox>
                            </div>
                        </div>
                        <div class="vipCard distance" v-if="upVipCheck">
                            <span class="tetile">会员卡号：</span>
                            <div class="in-block">
                                <el-input type="number" size="mini"  v-model="upgrade.new_card_number" resize="none"></el-input>
                            </div>
                        </div>
                        <div class="exegesis distance">
                            <span class="tetile">备注：</span>
                            <div class="in-block">
                                <el-input size="mini"  v-model="upgrade.remark" type="textarea" resize="none"></el-input>
                            </div>
                        </div>
                    </div>
                </popup>
            </div>
            <!-- 充值 -->
            <div class="recharge">
                <popup ref="re" :popup="rePopup"  @popupOp="onRecha">
                    <div class="content">
                        <!-- 操作员 -->
                        <!-- <span class="operator">
                            操作员：{{user.name}}
                        </span> -->
                        <div class="distance">
                          <span>{{oldVipData.name}}</span>
                        </div>
                        <div class="oldType distance">
                            <span class="tetile">原卡类型：</span>
                            <span>{{oldVipData.card.member_level_id | setCardType}}</span>
                        </div>
                        <div class="oldNumber distance">
                            <div class="number">
                                <span class="tetile">原卡号：</span>
                                <span>{{oldVipData.card.number}}</span>
                            </div>
                            <div class="balance">
                                <span class="">余额：</span>
                                <span>{{oldVipData.balance?oldVipData.balance:'0'}}元</span>
                            </div>
                        </div>
                        <div class="rechargeMoney distance">
                            <div class="tetile">
                                <span class="special">充值金额：</span>
                            </div>
                            <div class="in-block">
                                <el-input @keyup.native="setGiveMoney(oldVipData.card.member_level_id )" v-model="recharge.recharge_amount" type="number" size="mini"></el-input>
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
            <!-- 停用 -->
            <div class="stop">
                <popup ref="stop" @popupOp="stopStop" :popup="stopPopup">
                    <div class="content">
                        <div class="distance center">
                            <span>确定需要停用会员账户？</span>
                        </div>
                        <div class="stopMoney center">
                            <span>当前余额：</span>
                            <span>{{oldVipData.balance?oldVipData.balance:'0'}}元</span>
                        </div>
                    </div>
                </popup>
            </div>
            <!-- 激活 -->
            <div class="acti">
                <popup ref="acti" @popupOp="actiStop" :popup="actiPopup">
                    <div class="content">
                        <div class="distance center">
                            <span>确定需要激活会员账户？</span>
                        </div>
                        <div class="actiMoney center">
                            <span>当前余额：</span>
                            <span>{{oldVipData.balance?oldVipData.balance:'0'}}元</span>
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
      vipId: "", //会员id
      cardId: "", //会员卡id
      //   查询栏star
      formInquire: {
        name: "",
        idcard: "",
        mobile: "",
        member_level_id: "",
        card_number: ""
      }, //查询数据
      //   查询栏end
      tableDataVip: [], //列表数据
      //   弹窗部分star
      cardTypeOption: [], //卡类型下拉选项
      oldVipData: {
        card: {}
      }, //会员详细信息
      oldVipCard: "", //旧卡号id
      //   credentials: [], //证件号
      moneyTypeOption: [], //支付类型下拉选项
      //   receiptMoney: 100, //应收金额
      upVipCheck: false, //是否更换卡号
      //
      recharge: {
        pay_way: 7,
        gift_amount: "",
        recharge_amount: ""
      }, //充值数据
      upgrade: {}, //升级会员卡数据
      Completion: {}, //补卡数据
      More: false, //下拉菜单是否显示
      page: 1, //当前页数
      pages: 0, //总页数
      SupplementaryCard: {
        title: "补卡登记",
        width: 600,
        confirmText: "确认",
        cancelText: "取消"
      }, //补卡登记弹窗头部
      upgradeVip: {
        title: "升级会员卡",
        width: 600,
        confirmText: "确认",
        cancelText: "取消"
      }, //升级会员卡弹窗头部
      stopPopup: {
        title: "停用",
        width: 400,
        confirmText: "确认",
        cancelText: "取消"
      }, //停用弹窗头部
      actiPopup: {
        title: "激活",
        width: 400,
        confirmText: "确认",
        cancelText: "取消"
      }, //停用弹窗头部
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
    //
    isName() {
      this.formInquire.name = this.formInquire.name.replace(
        /(^\s*)|(\s*$)/g,
        ""
      );
      this.formInquire.idcard = this.formInquire.idcard.replace(
        /(^\s*)|(\s*$)/g,
        ""
      );
      this.formInquire.mobile = this.formInquire.mobile.replace(
        /(^\s*)|(\s*$)/g,
        ""
      );
      this.formInquire.card_number = this.formInquire.card_number.replace(
        /(^\s*)|(\s*$)/g,
        ""
      );
    },
    setGiveMoney(e) {
      this.cardTypeOption.forEach((v, i) => {
        if (e == v.id) {
          this.recharge.gift_amount = (
            this.recharge.recharge_amount * v.rate
          ).toFixed(2);
        }
      });
    },
    //按条件查询列表项
    inquire() {
      console.log(this.formInquire);
      this.formInquire.hotel_id = this.hotel.id;
      if (
        !this.formInquire.name &&
        !this.formInquire.idcard &&
        !this.formInquire.mobile &&
        !this.formInquire.member_level_id &&
        !this.formInquire.card_number
      ) {
        this.init();
        return true;
      }
      API.get(
        "/pms/member/search?hotel_id=" +
          this.hotel.id +
          "&name=" +
          this.formInquire.name +
          "&idcard=" +
          this.formInquire.idcard +
          "&mobile=" +
          this.formInquire.mobile +
          "&member_level_id=" +
          this.formInquire.member_level_id +
          "&card_number=" +
          this.formInquire.card_number +
          "&page=" +
          this.page +
          "&num=10"
      ).then(res => {
        console.log("搜索列表：", res);
        if (res.error_code == 0) {
          this.tableDataVip = res.data.data;
          this.pages = Math.ceil(res.data.total_count / 10);
        } else {
          this.error(res.msg);
        }
      });
    },
    // 开启补卡登记弹窗
    suppCard(num) {
      this.vipId = num;
      //   this.detailsVip(this.vipId);
      this.$refs.sup.close();
    },
    // 补卡登记弹窗   确定||取消&&关闭弹窗
    supCard(type) {
      console.log(this.vipId);
      if (type == "confirm") {
        if (!this.Completion.new_card_number) {
          this.$message.error("还未输入新的会员卡号！");
        } else {
          this.Completion.hotel_id = this.hotel.id;
          this.Completion.member_id = this.vipId;
          API.post("/pms/member_card/replace", this.Completion).then(res => {
            console.log("补卡：", res);
            if (res.error_code == 0) {
              this.$refs.sup.close();
              this.success();
              this.clearDate();
              this.init();
            } else {
              this.error(res.msg);
            }
          });
        }
      } else {
        this.$refs.sup.close();
        this.warning();
        this.clearDate();
      }
    },
    // 开启升级vip弹窗
    uppVip(num) {
      this.vipId = num;
      this.$refs.up.close();
    },
    // 升级vip弹窗   确定||取消&&关闭弹窗
    upVip(type) {
      console.log(this.vipId);
      if (type == "confirm") {
        if (!this.upgrade.new_member_level_id) {
          this.$message.error("请选择卡号类型！");
        } else {
          this.upgrade.hotel_id = this.hotel.id;
          this.upgrade.member_id = this.vipId;
          this.upgrade.id = this.oldVipData.card.id;
          console.log(this.upgrade);
          API.post("/pms/member_card/upgrade", this.upgrade).then(res => {
            console.log(res);
            if (res.error_code == 0) {
              this.$refs.up.close();
              this.success();
              this.init();
              this.clearDate();
            } else {
              this.error(res.msg);
            }
          });
        }
      } else {
        this.$refs.up.close();
        this.warning();
        this.clearDate();
      }
    },
    //开启停用弹窗
    stopO(num) {
      //   this.vipId = num;
      this.cardId = num;
      this.$refs.stop.close();
    },
    //停用弹窗   确定||取消&&关闭弹窗
    stopStop(type) {
      console.log(this.cardId);
      if (type == "confirm") {
        //   let id=this.
        API.put("/pms/member_card/disable/" + this.cardId).then(res => {
          console.log(res);
          if (res.error_code == 0) {
            this.$refs.stop.close();
            this.success();
            this.clearDate();
            this.init();
          } else {
            this.error(res.msg);
          }
        });
      } else {
        //取消按钮
        this.$refs.stop.close();
        this.warning();
        this.clearDate();
      }
    },
    //开启激活弹窗
    actiO(num) {
      this.$refs.acti.close();
      //   this.vipId = num;
      this.detailsVip(num);
      this.cardId = num;
    },
    //激活按钮弹窗   确定||取消&&关闭弹窗
    actiStop(type) {
      console.log(this.cardId);
      if (type == "confirm") {
        API.put("/pms/member_card/active/" + this.cardId).then(res => {
          console.log("激活：", res);
          if (res.error_code == 0) {
            this.$refs.acti.close();
            this.success();
            this.clearDate();
            this.init();
          } else {
            this.error(res.msg);
          }
        });
      } else {
        this.$refs.acti.close();
        this.warning();
        this.clearDate();
      }
    },
    // 开启充值弹窗
    recha(num, e) {
      console.log(num, e);
      this.vipId = num;
      this.cardId = e;
      this.detailsVip(num);
      this.$refs.re.close();
    },
    //充值弹窗   确定||取消&&关闭弹窗
    onRecha(type) {
      console.log(this.vipId);
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
      console.log(this.vipId);
      if (type == "confirm") {
        if (!this.recharge.pay_amount) {
          this.$message.error("请输入输入实收金额！");
          return false;
        } else {
          this.recharge.id = this.cardId;
          this.recharge.member_id = this.vipId;
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
    // 页码发生改变时
    givePages() {
      this.formInquire.hotel_id = this.hotel.id;
      if (
        !this.formInquire.name &&
        !this.formInquire.idcard &&
        !this.formInquire.mobile &&
        !this.formInquire.member_level_id &&
        !this.formInquire.card_number
      ) {
        this.init();
        return true;
      } else {
        this.inquire();
      }
    },
    // 更多
    handleCommand(command) {
      console.log(this.vipId);
      switch (command) {
        case "uppVip":
          this.uppVip();
          break;
        case "suppCard":
          this.suppCard();
          break;
        case "stopO":
          this.stopO();
          break;
      }
    },
    //获取vip和vip卡的id
    commandNum(num, e) {
      console.log("会员id：", num, "会员卡id：", e);
      this.vipId = num;
      this.cardId = e;
      this.detailsVip(this.vipId);
    },
    // 查看会员详情
    details(num) {
      this.$router.push({
        path: "/layerContainer/newVipModify",
        query: { edit: "", userId: num, vip: true }
      });
    },
    // 编辑会员
    edit(num) {
      //   console.log(num);
      this.$router.push({
        path: "/layerContainer/newVipModify",
        query: { edit: 1, userId: num, vip: true }
      });
    },
    // 新增会员
    newVip() {
      this.$router.push({
        path: "/layerContainer/newVip",
        query: { edit: true, newVip: true, vip: true }
      });
    },
    // 页面加载时获取列表数据
    init() {
      //获取列表
      API.get(
        "/pms/member?id=" + this.hotel.id + "&page=" + this.page + "&num=10"
      ).then(res => {
        console.log("列表：", res);
        if (res.error_code == 0) {
          console.log(res.data.data);
          this.tableDataVip = res.data.data;
          this.pages = Math.ceil(res.data.total_count / 10);
        } else {
          this.$message.error("获取列表数据失败");
        }
      });
    },
    //  获取会员详细信息
    detailsVip(num) {
      //   获取会员信息
      API.get("/pms/member/" + num).then(res => {
        console.log("会员信息", res);
        if (res.error_code == 0) {
          this.oldVipData = res.data;
        } else {
          console.log(res.msg);
        }
      });
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
    }
  },
  mounted() {
    this.init();
    this.recharge.pay_way = 7;
    //获取卡类型
    API.get("/pms/memberlevel?id=" + this.hotel.id).then(res => {
      console.log("卡类型：", res);
      if (res.error_code == 0) {
        res.data.unshift({
          id: "",
          name: "请选择"
        });
        this.cardTypeOption = res.data;
      } else {
        this.error("获取卡类型失败");
      }
    });
    //获取支付类型
    API.get("/pms/common/payway").then(res => {
      console.log("支付类型：", res);
      this.moneyTypeOption = res.data;
    });
  },
  filters: {
    credentials(t) {
      let arr = ["其他", "身份证"];
      return arr[t];
    },
    isVip(t) {
      let arr = ["普通用户", "会员"];
      return arr[t];
    },
    setCardType(t) {
      let a = "---";
      that.cardTypeOption.forEach((v, i) => {
        if (v.id == t) {
          a = v.name;
        }
      });
      return a;
    }
  }
};
</script>

<style lang="scss">
.managementVip {
  height: 100%;
  & * {
    box-sizing: border-box;
  }
  //  按条件查询
  .inquire {
    background: #f2f2f2;
    padding-bottom: 10px;
    .row {
      display: flex;
      flex-wrap: wrap;
      .cell {
        padding: 5px 0;
        margin-right: 60px;
        .depict {
          width: 80px;
          display: inline-block;
          text-align: right;
        }
        input {
          width: 180px;
        }
      }
      .cardNumber {
        margin-right: 10px;
      }
    }
  }
  //   新增会员
  & > .newVip {
    padding: 10px 35px 5px 35px;
    height: auto;
    border-top: 1px solid #ddd;
  }
  & > .table {
    padding: 0 35px;
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
        padding: 10px 0;
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
  }
  .in-block {
    display: inline-block;
  }
}
</style>

