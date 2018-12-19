<template>
    <div class="settingCommission">
        <!-- 新增 -->
        <div class="newBut">
          <el-button size="mini" type="primary" @click="newSet()">新增</el-button>
        </div>
        <!-- 列表 -->
        <div class="table">
            <el-table :data="tableData" style="">
                <el-table-column label="分组名称" width="246">
                    <template slot-scope="scope">{{scope.row.level_name}}</template>
                </el-table-column>
                <el-table-column label="描述" width="373">
                    <template slot-scope="scope">{{scope.row.des}}</template>
                </el-table-column>
                <el-table-column label="分销商人数" width="176">
                    <template slot-scope="scope">{{scope.row.num}}</template>
                </el-table-column>
                <el-table-column label="消费项目" width="183">
                    <template slot-scope="scope">
                      <div :class="index%2==1?'rowColor':''" class="rowItem" v-for="(item,index) in scope.row.commission_log" :key="item.type">{{item.type　| setConsume}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="返利佣金" width="242">
                    <template slot-scope="scope">
                      <div :class="index%2==1?'rowColor':''" class="rowItem" v-for="(item,index) in scope.row.commission_log" :key="item.type">{{item.normal_rate}}%</div>
                    </template>
                </el-table-column>
                <el-table-column label="返利佣金（首次消费）" width="247">
                    <template slot-scope="scope">
                      <div :class="index%2==1?'rowColor':''" class="rowItem" v-for="(item,index) in scope.row.commission_log" :key="item.type">{{item.first_rate}}%</div>
                    </template>
                </el-table-column>
                <!-- <el-table-column label="一级佣金（首次消费）" width="242">
                    <template slot-scope="scope">
                        <div class="in-b" style="width:210px">
                          <el-input v-if="scope.row.edit" size="mini" v-model="scope.row.first_rate"></el-input>
                          <span v-if="!scope.row.edit">{{scope.row.first_rate}}%</span>
                        </div>
                        <span v-if="scope.row.edit">%</span>
                    </template>
                </el-table-column>
                <el-table-column label="一级佣金（后续消费）" width="247">
                    <template slot-scope="scope">
                        <div class="in-b" style="width:210px">
                          <el-input v-if="scope.row.edit" size="mini" v-model="scope.row.normal_rate"></el-input>
                          <span v-if="!scope.row.edit">{{scope.row.normal_rate}}%</span>
                        </div>
                        <span v-if="scope.row.edit">%</span>
                    </template>
                </el-table-column> -->
                <el-table-column
                fixed="right"
                label="操作"
                width="230">
                <template slot-scope="scope">
                    <el-button @click="newSet(scope.row.commission_id)" type="text" size="small">修改</el-button>
                    <el-button v-if="scope.row.level_type!=0" @click="setDel(scope.row.commission_id)" type="text" size="small">删除</el-button>
                    <!-- <el-button @click="setEdit(scope.row.commission_id)" v-if="!scope.row.edit" type="text" size="small">修改</el-button> -->
                    <!-- <el-button @click="setSave(scope.row.commission_id)" v-if="scope.row.edit" type="text" size="small">保存</el-button>
                    <el-button @click="setCancel(scope.row.commission_id)" v-if="scope.row.edit" type="text" size="small">取消</el-button> -->
                </template>
                </el-table-column>
            </el-table>
            <div class="caveat">注意：微信返利佣金最高不得设置超过50%</div>
        </div>
        <!-- 弹窗 -->
        <div class="pop-pus">
          <popup ref="retractCause"  @popupOp="CauseSet" :popup="num?Cause_:Cause">
            <div class="name row">
              <div class="title in-b">分组名称：</div>
              <div class="in-b">
                <!-- <el-tooltip class="item" effect="light" content="不能超过10个字" placement="top-start"> -->
                  <el-input placeholder="分组名称不能超过10个字" v-model="pupTable.level_name" maxlength="10" size="mini"></el-input>
                <!-- </el-tooltip> -->
              </div>
            </div>
            <div class="depict row">
              <div class="title in-b">描述：</div>
              <div class="in-b">
                <!-- <el-tooltip class="item" effect="light" content="不能超过200个字" placement="top-start"> -->
                  <el-input placeholder="描述信息不能超过200个字" v-model="pupTable.des" maxlength="200" resize="none" type="textarea" size="mini"></el-input>
                <!-- </el-tooltip> -->
              </div>
            </div>
            <div class="commission row">
              <div class="title">佣金设置：</div>
              <div class="popTable in-b">
                <div class="caveat">注意：微信返利佣金最高不得设置超过50%</div>
                <el-table :data="pupTable.log_arr?pupTable.log_arr:pupTable.commission_log" style="">
                    <el-table-column label="消费项目" width="150">
                        <template slot-scope="scope">{{scope.row.type | setConsume}}</template>
                    </el-table-column>
                    <el-table-column label="返利佣金" width="170">
                      <template slot-scope="scope">
                        <div class="textAlin">
                          <el-input @keyup.native="setInput($event)" oninput="if(value.length>5)value=value.slice(0,5)" v-model="scope.row.normal_rate" type="number" size="mini"></el-input>
                          <span class="text">%</span>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column label="返利佣金（首次消费）" width="170">
                      <template slot-scope="scope">
                        <div class="textAlin">
                          <el-input @keyup.native="setInput($event)" oninput="if(value.length>5)value=value.slice(0,5)" v-model="scope.row.first_rate" type="number" size="mini"></el-input>
                          <span class="text">%</span>
                        </div>
                      </template>
                    </el-table-column>
                </el-table>
              </div>
            </div>
          </popup>
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
      tableData: [], //主页面表格
      num: "", //列表项id
      backup: [], //备份主页面表格
      pupTable: {
        // level_type: 1,
        commission_log: [
          {
            first_rate: "0.00",
            normal_rate: "0.00",
            type: 1
          }
        ]
      }, //弹窗列表数据
      Cause: {
        title: "新增",
        width: 600,
        confirmText: "确认",
        cancelText: "关闭"
      },
      Cause_: {
        title: "修改",
        width: 600,
        confirmText: "确认",
        cancelText: "关闭"
      }
    };
  },
  methods: {
    setInput(e) {
      // console.log(e.target.value);
      if (!(0 < e.target.value < 50)) {
        this.error("返利佣金取值为0-50之间");
      }
    },
    //  修改 || 新增按钮
    newSet(num) {
      this.$refs.retractCause.close();
      if (num) {
        this.num = num;
        API.get(
          "/pms/sale/commission-detail?c_id=" +
            num +
            "&hotel_id=" +
            this.hotel.id
        ).then(res => {
          if (res.error_code == 0) {
            this.pupTable = res.data;
          } else {
            this.error(res.msg);
          }
        });
      } else {
        this.num = "";
      }
      console.log(this.num);
    },
    //  新增弹窗
    CauseSet(type) {
      if (type == "cancel") {
        this.$refs.retractCause.close();
        this.clearDate();
        this.warning();
      } else if (type == "confirm") {
        let err = false;
        let err1 = this.money();
        if (!err1) {
          this.error("佣金返利不能为0！");
          return false;
        }
        this.pupTable.commission_log.forEach((v, i) => {
          if (
            0 > v.first_rate ||
            v.first_rate > 50 ||
            0 > v.normal_rate ||
            v.normal_rate > 50
          ) {
            err = true;
          }
        });
        if (err) {
          this.error("微信返利佣金取值应为0-50之间");
          return false;
        }
        if (this.pupTable.level_type == undefined) {
          this.pupTable.level_type = 1;
        }
        this.pupTable.hotel_id = this.hotel.id;
        API.post("/pms/sale/commission-edit", this.pupTable).then(res => {
          console.log(res);
          if (res.error_code == 0) {
            this.success();
            this.$refs.retractCause.close();
            this.init();
            this.clearDate();
            err = false;
            err1 = true;
          } else {
            this.error(res.msg);
          }
        });
      }
    },
    // //  列表按钮修改
    // setEdit(num) {
    //   this.$refs.retractCause.close();
    // },
    setDel(num) {
      // this.error("删除成功！");
      console.log(num);
      API.get(
        "/pms/sale/commission-del?hotel_id=" + this.hotel.id + "&id=" + num
      ).then(res => {
        if (res.error_code == 0) {
          this.success();
          this.init();
        } else {
          this.error(res.msg);
        }
      });
    },
    // //  列表按钮取消
    // setCancel(num) {
    //   this.tableData.forEach((v, i) => {
    //     if (num == v.commission_id) {
    //       v.edit = false;
    //       this.tableData = this.backup;
    //     }
    //   });
    //   this.init();
    // },
    // // 列表按钮保存
    // setSave(num) {
    //   this.tableData.forEach((v, i) => {
    //     if (!(50 >= v.first_rate > 0)) {
    //       this.error("首次消费不能小于0%，不能超过20%");
    //       return false;
    //     } else if (!(50 >= v.normal_rate > 0)) {
    //       this.error("后续消费不能小于0%，不能超过20%");
    //       return false;
    //     }
    //     if (num == v.commission_id) {
    //       console.log(v);
    //       v.hotel_id = this.hotel.id;
    //       API.post("/pms/sale/commission-edit", v).then(res => {
    //         console.log(res);
    //         if (res.error_code == 0) {
    //           this.success();
    //           v.edit = false;
    //         } else {
    //           this.error(res.msg);
    //         }
    //       });
    //     }
    //   });
    // },
    money() {
      let err = true;
      this.pupTable.commission_log.forEach((v, i) => {
        if (v.first_rate == 0) {
          err = false;
        } else if (v.normal_rate == 0) {
          err = false;
        }
      });
      return err;
    },
    // 数据列表
    init() {
      API.get(
        "/pms/sale/commission-list?hotel_id=" +
          this.hotel.id +
          "&staff_id=" +
          this.user.staff_id
      ).then(res => {
        console.log("列表数据：", res);
        if (res.error_code == 0 || res.error_code == -1) {
          res.data.forEach((v, i) => {
            v.edit = false;
          });
          this.tableData = res.data;
          console.log(this.tableData);
        } else {
          this.error(res.msg);
        }
      });
    },
    clearDate() {
      this.num = "";
      this.pupTable = {
        commission_log: [
          {
            first_rate: "0.00",
            normal_rate: "0.00",
            type: 1
          }
        ]
      };
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
  },
  filters: {
    setConsume(t) {
      let arr = ["房费", "商品"];
      return arr[t - 1];
    }
  }
};
</script>
<style lang="scss">
.settingCommission {
  //
  padding: 0 35px;
  height: 100%;
  .newBut {
    padding: 10px 0 5px;
    .el-button--mini {
      padding: 8px 37px;
    }
  }
  .table {
    .el-table td {
      padding: 0;
    }
    .el-table__row {
      .cell {
        padding: 0;
        .rowItem {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 40px;
        }
        .rowColor {
          background: #f4f8ff;
          border-top: 1px solid #ebeef5;
        }
      }
    }
  }
  .pop-pus {
    .content {
      padding: 29px 54px !important;
      .row {
        padding: 7px 0;
        .title {
          width: 70px;
        }
        .in-b {
          vertical-align: middle;
        }
        textarea {
          width: 417px;
        }
      }
      .name {
        .el-input--mini {
          width: 417px;
        }
      }
      .popTable {
        padding-top: 16px;
        .textAlin {
          position: relative;
          .text {
            right: 40px;
            top: 3px;
            position: absolute;
          }
        }
        .has-gutter th {
          background: #f2f2f2;
          color: #333;
        }
        .el-input--mini {
          width: 140px;
          .el-input__inner {
            width: 100%;
          }
        }
        .el-table td{
          padding: 6px 0;
        }
      }
    }
    .el-icon-close {
      cursor: pointer;
    }
  }
  .in-b {
    display: inline-block;
  }
  .caveat {
    color: #ec5454;
    padding: 5px 0;
  }
}
</style>


