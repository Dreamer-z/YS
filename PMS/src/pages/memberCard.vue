<template>
  <div class="menber-card">
    <!-- 会员卡级设置 -->
    <el-row class="optionsBtn">
      <el-button class="btn" @click="open()" type="primary" size="mini">新增</el-button>
    </el-row>
    <!-- 列表 -->
    <div class="table">
      <el-table :data="tableData" style="width: 100%;min-width:1120px;">
        <el-table-column label="序号" type="index" width="77">
            <!-- <template slot-scope="scope">{{scope.row.num}}</template> -->
        </el-table-column>
        <el-table-column label="等级">
            <template slot-scope="scope">{{scope.row.level}}</template>
        </el-table-column>
        <el-table-column label="名称">
            <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="房费折扣">
            <template slot-scope="scope">{{scope.row.discount}}</template>
        </el-table-column>
        <el-table-column label="卡费">
            <template slot-scope="scope">{{scope.row.card_fee}}</template>
        </el-table-column>
        <el-table-column label="权益">
            <template slot-scope="scope">{{scope.row.rights_name}}</template>
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="160">
            <template slot-scope="scope">
            <el-button @click="editFn(scope.row.id)" type="text" size="small">编辑</el-button>
            <el-button @click="details(scope.row.id)" type="text" size="small">查看详情</el-button>
            <el-button @click="tableDel(scope.row.id)" type="text" class="del" size="small"><span class="">删除</span></el-button>
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
      <transition name="popUps">
        <div v-if="popUps" class="pop-ups">
          <div class="edit">
            <!-- 头部 -->
            <div class="editTilte">
              <span>会员卡设置</span>
              <div class="close" @click="close()">
                <i class="el-icon-close"></i>
              </div>
            </div>
            <!-- content -->
            <div class="content">
              <!-- 操作员 -->
              <!-- <span class="operator">
                操作员：{{user.name}}
              </span> -->
              <!-- 基础设置 -->
              <div class="basis border-bottom ">
                <span class="tilte column particular">基本设置</span>
                <div class="name column">
                  <div class="nameTilte">
                      <span class="special">会员卡名称：</span>
                  </div>
                  <div class="in-block">
                    <el-input :disabled="edit" v-model="form.name" size="mini"></el-input>
                  </div>
                  <div class="in-block checked site" v-if="!edit">
                    <div class="nameTilte"></div>
                    <el-checkbox :disabled="edit" v-model="form.is_miniapp_">可小程序办理</el-checkbox>
                  </div>
                </div>
                <div class="level column">
                  <div class="nameTilte">
                      <span class="special">会员卡等级：</span>
                  </div>
                  <div class="in-block" :class="!edit?'comment':'sel'">
                    <el-select :disabled="edit" size="mini" v-model="form.level" placeholder="请选择">
                      <el-option
                        v-for="item in levelOption"
                        :key="item.id"
                        :label="item"
                        :value="item">
                      </el-option>
                    </el-select>
                  </div>
                  <div class="in-block site">
                    <div class="nameTilte">
                        <span class="special">卡费：</span>
                    </div>
                    <div class="in-block">
                      <el-input :disabled="edit" v-model="form.card_fee" size="mini"></el-input>
                    </div>
                  </div>
                </div>
                <div class="condition">
                  <div class="nameTilte">
                      <span class="">办理条件：</span>
                  </div>
                  <div class="in-block" :class="edit?'sel':''">
                    <el-select :disabled="edit" size="mini" v-model="form.condition_type" placeholder="请选择">
                      <el-option
                        v-for="item in conditionOption"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </div>
                  <div v-if="form.condition_type==1" :class="edit?'site':''" class="in-block">
                    <div :class="edit?'nameTilte':'in-block'">
                      <span><span v-if="!edit">&emsp;&emsp;</span>最低充值金额：</span>
                    </div>
                    <div class="in-block">
                      <el-input :disabled="edit" v-model="form.min_recharge_amount" size="mini"></el-input>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 会员权益设置 -->
              <div class="interest border-bottom">
                <span class="tilte in-block">会员权益设置</span>
                <div class="column discount">
                  <div class="nameTilte">
                      <span class="">房价折扣：</span>
                  </div>
                  <div class="in-block"  :class="!edit?'comment':''">
                    <el-input type="number" @blur="discountF()" :disabled="edit" v-model="form.discount" size="mini"></el-input>
                    <div v-if="discountError" class="error">请输入正确的折扣价</div>
                  </div>
                </div>
                <div class="priceHouse column">
                  <span class=" in-block">具体房价设置：</span>
                  <div class="priceHouseTable column in-block">
                    <el-table :data="form.rooms" style="width: 780px;">
                      <el-table-column label="房型">
                          <template slot-scope="scope">{{scope.row.room_type_name}}</template>
                      </el-table-column>
                      <el-table-column label="门市价">
                          <template slot-scope="scope">{{scope.row.room_type_price}}</template>
                      </el-table-column>
                      <el-table-column label="会员价">
                          <template slot-scope="scope">
                            <el-input v-if="scope.row.member_price!=0" :disabled="edit" v-model="scope.row.member_price" size="mini"></el-input>
                            <el-input v-if="scope.row.member_price==0" :disabled="edit" v-model="inputNull" size="mini"></el-input>
                          </template>
                      </el-table-column>
                    </el-table>
                  </div>
                </div>
                <div class="offer column">
                  <div class="in-block nameTilte">
                    <span>充值优惠：</span>  
                  </div>
                  <div class=" giveMoney in-block">
                    <span>充：</span>
                    <div class="in-block">
                      <el-input :disabled="edit" v-model="form.recharge_amount" size="mini"></el-input>
                    </div>
                    <span>&emsp;送：</span>
                    <div class="in-block">
                      <el-input :disabled="edit" v-model="form.gift_amount" size="mini"></el-input>
                    </div>
                  </div>
                </div>
              </div>
              <!--  小程序展示权益说明 -->
              <div class="description">
                <div class="mainBody">
                  <span class="tilte in-block">小程序展示权益说明&emsp;&emsp;</span><br>
                  <el-button v-if="!edit" @click="addBenefit()" size="mini" type="text" icon="el-icon-plus">添加权益</el-button>
                </div>
                <div class="benefitName column" v-if="benefit">
                  <div class="nameTilte">
                      <span class="">权益名称：</span>
                  </div>
                  <div class="in-block">
                    <el-input @blur="clearB()" v-model="benefitName" size="mini"></el-input>
                  </div>
                </div>
                <div class="benefitDescription" v-if="benefit">
                  <div class="nameTilte">
                      <span class="">权益说明：</span>
                  </div>
                  <div class="in-block">
                    <el-input @blur="clearB()" v-model="benefitDescription" size="mini"></el-input>
                  </div>
                </div>
                <div class="nameTilte"></div>
                <div class="table in-block descriptionTable column">
                  <el-table v-if="form.rights.length>0||edit" :data="form.rights" style="width: 780px;">
                    <el-table-column label="权益名称">
                        <template slot-scope="scope">{{scope.row.rights_name}}</template>
                    </el-table-column>
                    <el-table-column label="权益说明">
                        <template slot-scope="scope">{{scope.row.rights_info}}</template>
                    </el-table-column>
                    <el-table-column
                        v-if="!edit"
                        fixed="right"
                        label="操作"
                        width="103">
                        <template slot-scope="scope">
                          <el-button @click="getDel(scope.row.ite)" class="del" type="text" size="small"><span class="">删除</span></el-button>
                        </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </div>
            <!-- 底部按钮 -->
            <div class="but">
              <el-button @click="cancel()" size="mini" type="">取消</el-button>
              <el-button @click="submit()" v-if="!edit" size="mini" type="primary">确定</el-button>
              <el-button @click="popEdit()" v-if="edit" size="mini" type="primary">编辑</el-button>
            </div>
          </div>
        </div>
      </transition>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import API from "@/store/API/index";
import RegEx from "@/assets/js/RegEx"; //正则验证
export default {
  computed: {
    ...mapGetters({
      hotel: "currHotel",
      user: "user"
    })
  },
  data() {
    return {
      edit: false, //是否为禁用
      edit_: false, //是否为编辑
      subm: false, //是否为查看转编辑
      num: "", //会员id
      popUps: false, //弹窗
      // checkedBasis: false, //是否可小程序办理
      condition: 0, //办理条件
      discount: false, //房价折扣按钮
      discountError: false, //验证正确
      offer: false, //优惠按钮
      benefit: false, //权益按钮下的内容是否显示
      benefitName: "", //权益名称
      benefitDescription: "", //权益说明：
      conditionOption: [], //充值条件
      levelOption: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], //会员等级下拉选项
      page: 1, //当前页数
      pages: 0, //总页数
      tableData: [
        {
          rights_name: "无"
        }
      ], // 表单数据
      form: {
        condition_type: 0,
        rooms: [],
        rights: [],
        is_miniapp_: false
      }, //弹窗数据提交
      inputNull: "",
      upVip: {} //转会员表单的数据
    };
  },
  methods: {
    open() {
      this.popUps = true;
      this.edit_ = false;
      API.get("/pms/roomtype?id=" + this.hotel.id).then(res => {
        console.log("房型", res);
        if (res.error_code == 0) {
          res.data.forEach((v, i) => {
            v.room_type_name = v.name;
            v.room_type_price = v.price;
            v.member_price = v.price;
          });
          this.form.rooms = res.data;
        } else {
          this.error("获取房型失败！");
        }
      });
      API.get("/pms/memberlevel/condition").then(res => {
        console.log("充值条件", res);
        if (res.error_code == 0) {
          this.conditionOption = res.data;
        } else {
          this.error("获取充值条件失败！");
        }
      });
    },
    close() {
      this.popUps = false;
      this.edit = false;
      this.subm = false;
      this.benefit = false;
      this.discountError = false;
      this.delAll();
    },
    // 页码发生改变时
    givePages() {
      //
      //   console.log(this.page);
    },
    // 打开弹窗  查看详情
    details(num) {
      this.open();
      this.edit = true;
      this.getForm(num);
      this.num = num;
    },
    // 打开弹窗  //编辑
    editFn(num) {
      this.open();
      this.getForm(num);
      this.edit_ = true;
      this.num = num;
    },
    // 点击删除按钮
    tableDel(num) {
      console.log(num);
      API.dele("/pms/memberlevel/" + num).then(res => {
        console.log(res);
        if (res.error_code == 0) {
          this.init();
          this.$message({
            message: "操作成功",
            type: "success"
          });
        } else {
          console.log(res.msg);
        }
      });
    },
    discountF() {
      // console.log(RegEx.discount(this.discountNum));
      if (RegEx.discount(this.form.discount) == false) {
        this.discountError = true;
      } else {
        this.discountError = false;
        for (var i = 0; i < this.form.rooms.length; i++) {
          this.form.rooms[i].member_price = (
            this.form.rooms[i].room_type_price * this.form.discount
          ).toFixed(0);
        }
        console.log(this.form);
      }
    },
    //取消
    cancel() {
      if (this.subm) {
        this.edit = true;
        this.edit_ = false;
        this.subm = false;
        this.benefit = false;
        this.$message({
          message: "已经取消操作",
          type: "warning"
        });
      } else {
        this.close();
      }
    },
    // 弹窗内部编辑
    popEdit() {
      this.edit = false;
      this.edit_ = true;
      this.subm = true;
    },
    // 弹窗内部确定
    submit() {
      this.form.hotel_id = this.hotel.id;
      if (this.form.is_miniapp_) {
        this.form.is_miniapp = 1;
      } else {
        this.form.is_miniapp = 0;
      }
      console.log(this.form);
      if (this.edit_) {
        console.log("编辑");
        API.put("/pms/memberlevel/" + this.num, this.form).then(res => {
          // console.log(res);
          if (res.error_code == 0) {
            this.success();
            this.close();
            this.init();
          } else {
            this.error(res.msg);
          }
        });
      } else {
        this.form.rooms.forEach((v, i) => {
          v.room_type_id = v.id;
        });
        console.log("新增");
        API.post("/pms/memberlevel", this.form).then(res => {
          console.log(res);
          if (res.error_code == 0) {
            this.success();
            this.close();
            this.init();
          } else {
            this.error(res.msg);
          }
        });
      }
      // return;
    },
    // 清除空格
    clearB() {
      this.benefitName = this.benefitName.replace(/(^\s*)|(\s*$)/g, "");
      this.benefitDescription = this.benefitDescription.replace(
        /(^\s*)|(\s*$)/g,
        ""
      );
    },
    // 添加权益按钮
    addBenefit() {
      if (this.benefit) {
        if (this.benefitName == "") {
          this.error("权益名称为空，请填写之后在添加");
          return false;
        } else if (this.benefitDescription == "") {
          this.error("权益说明为空，请填写之后在添加");
          return false;
        }
        this.form.rights.push({
          rights_name: this.benefitName,
          rights_info: this.benefitDescription,
          ite: new Date().getTime()
        });
        this.benefitName = "";
        this.benefitDescription = "";
        console.log(this.form.rights);
      } else {
        this.benefit = true;
      }
    },
    //删除权益列表的对应项
    getDel(e) {
      this.form.rights.forEach((v, i) => {
        if (e == v.ite) {
          this.form.rights.splice(i, 1);
        }
      });
    },
    // 列表数据
    init() {
      API.get("/pms/memberlevel?id=" + this.hotel.id).then(res => {
        console.log(res);
        if (res.error_code == 0) {
          res.data.forEach((v, i) => {
            // if()
            console.log(v.rights);
            if (v.rights.length == 0) {
              v.rights_name = "无";
            } else {
              v.rights_name = v.rights[0].rights_name;
            }
          });
          this.tableData = res.data;
          // this.pages;
        }
      });
    },
    // 会员卡级设置详情
    getForm(num) {
      API.get("/pms/memberlevel/" + num).then(res => {
        console.log("475----会员详情：", res);
        if (res.error_code == 0) {
          if (res.data.is_miniapp == 1) {
            res.data.is_miniapp_ = true;
          } else {
            res.data.is_miniapp_ = false;
          }
          this.form = res.data;
        }
      });
    },
    // 数据清空
    delAll() {
      this.form = {
        rooms: [],
        condition_type: 0,
        rights: [],
        checkedBasis: false
      };
      this.upVip = {};
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
  }
};
</script>

<style lang="scss">
.menber-card {
  box-sizing: border-box;
  font-size: 14px;
  padding: 10px 35px;
  overflow-y: auto;
  .optionsBtn {
    .el-button--mini {
      padding: 8px 37px;
    }
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
  .popUps-enter-active,
  .popUps-leave-active {
    transition: opacity 0.3s;
  }
  .popUps-enter,
  .popUps-leave-to {
    opacity: 0;
  }
  // 弹窗
  & > .pop-ups {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 100;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    overflow-y: auto;
    justify-content: center;
    align-items: center;
    padding-top: 50px;
    box-sizing: border-box;
    .edit {
      width: 1000px;
      position: relative;
      max-height: 98%;
      display: flex;
      // flex-wrap: wrap;
      flex-direction: column;
      // 头部
      & > * {
        width: 100%;
        box-sizing: border-box;
      }
      .editTilte {
        padding: 0 20px;
        height: 35px;
        line-height: 35px;
        background: #00a8ff;
        width: 100%;
        // position: absolute;
        // top: 0;
        // z-index: 1;
        & * {
          color: #fff;
        }
        .close {
          position: absolute;
          right: 20px;
          cursor: pointer;
          top: 2px;
          i {
            font-size: 18px;
          }
        }
      }
      // content
      .content {
        padding: 10px 40px;
        background: #fff;
        box-sizing: border-box;
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        position: relative;
        // z-index: 0;
        // 操作员
        .operator {
          position: absolute;
          right: 40px;
        }
        // 基础设置
        .basis {
          padding-bottom: 2em;
          .particular {
            margin-top: 12px;
            display: inline-block;
          }
          .checked {
            margin-left: 3em;
          }
          .name {
            input {
              width: 474px;
            }
          }
          .name,
          .level,
          .condition {
            position: relative;
            .site {
              position: absolute;
              right: 0;
            }
          }
          .comment::before {
            content: "（数字越大等级越高）";
          }
        }
        // 会员权益设置
        .interest {
          padding-bottom: 2em;
          .column {
            input {
              width: 178px;
            }
            .error {
              position: absolute;
              left: 30px;
              color: #f85252;
              top: -1em;
            }
          }
          .comment::before {
            content: "（如：78折优惠，则此处输入 0.78）";
          }
          .giveMoney {
            input {
              width: 100px;
            }
          }
          .priceHouse {
            .in-block {
              vertical-align: text-top;
            }
          }
        }
        // 权益说明
        .description {
          padding-bottom: 2em;
          .mainBody {
            .el-icon-plus {
              font-size: 15px;
              font-weight: bold;
              vertical-align: middle;
            }
          }
          .benefitName {
            input {
              width: 355px;
            }
          }
          .benefitDescription {
            input {
              width: 780px !important;
            }
          }
        }
        .has-gutter th,
        .el-table__fixed-right th {
          background: #f2f2f2;
          * {
            color: #333;
          }
        }
        .el-table__body-wrapper.is-scrolling-none {
          background: #fff;
        }
      }
      // 底部按钮
      .but {
        text-align: center;
        width: 100%;
        background: #fff;
        padding: 10px;
        .el-button--mini {
          padding: 7px 37px;
        }
        button + button {
          margin-left: 10px;
        }
      }
      // 公共样式
      .tilte {
        padding: 20px 0;
      }
      .sel {
        .el-input__suffix {
          display: none;
        }
      }
      .comment {
        position: relative;
      }
      .comment::before {
        position: absolute;
        width: 210px;
        left: 180px;
        top: 0.4em;
        font-size: 12px;
        color: #437ff9;
      }
      .column {
        padding: 8px 0;
      }
      .in-block {
        display: inline-block;
        position: relative;
      }
      .nameTilte {
        display: inline-block;
        width: 100px;
        // margin-right: 24px;
        // text-align: right;
      }
      .special {
        position: relative;
      }
      .special::before {
        position: absolute;
        content: "*";
        color: #f00;
        left: -0.7em;
        top: 0.4em;
      }
      .border-bottom {
        border-bottom: 1px solid #e6e6e6;
      }
    }
    input:disabled {
      background: #fff;
      color: #626262;
      border: none;
    }
  }
  .del {
    * {
      color: #f85252;
    }
  }
}
</style>
