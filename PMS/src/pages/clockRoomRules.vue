<template>
    <div class="clockRoomRules">
      <div class="Inquire">
        <div class="name inline">
          <span>规则名称：</span>
          <div class="inline">
            <el-input v-model="nameInquire" size="mini"></el-input>
          </div>
        </div>
        <el-button class="butInquire" size="mini" type="primary" @click="Inquire">查询</el-button>
        <el-button class="addInquire" size="mini" type="primary" @click="openNew()">新增</el-button>
      </div>  
      <div class="talbe" style="min-height:550px">
        <el-table :data="tableData" style="width: 100%;min-width:1120px;">
          <el-table-column label="规则名称">
            <template slot-scope="scope">{{scope.row.name}}</template>
          </el-table-column>
          <el-table-column label="时长">
            <template slot-scope="scope">{{scope.row.time_length}}</template>
          </el-table-column>
          <el-table-column label="计起步价时长">
            <template slot-scope="scope">{{scope.row.start_time_length}}</template>
          </el-table-column>
          <el-table-column label="计全价时长">
            <template slot-scope="scope">{{scope.row.normal_time}}</template>
          </el-table-column>
          <el-table-column label="超时缓冲时长">
            <template slot-scope="scope">{{scope.row.over_time_length}}</template>
          </el-table-column>
          <el-table-column label="超多少分钟转正常入住">
            <template slot-scope="scope">{{scope.row.end_time_length}}</template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="160">
            <template slot-scope="scope">
              <el-button @click="openLook(scope.row.price_plan_id)" type="text" size="small">查看</el-button>
              <el-button @click="openRectify(scope.row.price_plan_id)" type="text" size="small">修改</el-button>
              <el-button @click="del(scope.row.price_plan_id)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="block" v-if="pages>1">
        <el-pagination
          @current-change="handleSizeChange"
          :page-size="100"
          layout="prev, pager, next, jumper"
          :current-page.sync="page"
          :total="pages*100">
        </el-pagination>
      </div>
      <transition name="info">
            <div class="Cover" v-if="cover">
                <div class="pup">
                    <div class="title">
                        <div class="text">
                            <span>钟点入住标准</span>
                        </div>
                        <div class="close"  @click="close">
                            <i class="el-icon-close"></i>
                        </div>
                    </div>
                    <div class="content">
                      <!-- <span class="staff">操作员：{{user.name}}</span> -->
                      <!-- 基础信息 -->
                      <div class="infoBox">
                          <span class="boxTitle">基础信息</span>
                          <div class="box">
                            <div class="important name wMini">
                              <span>名称：</span>
                              <div class="input">
                                <el-input :disabled="readonly" v-model="name" size="mini"></el-input>
                              </div>
                            </div>
                            <div class="important time wMini">
                              <span>时长：</span>
                              <div class="input">
                                <el-input  type="number" :disabled="readonly" @keyup.native="timeInteger" v-model="time" size="mini"></el-input>
                              </div>
                            </div>
                            <div class="important depict"> 
                              <span>描述：</span>
                              <div class="input">
                                <el-input type="text" :disabled="readonly" v-model="depict" size="mini"></el-input>
                              </div>
                            </div>
                          </div>
                      </div>
                      <!-- 限制时段 -->
                      <div class="period">
                          <span class="boxTitle">基础信息</span>
                          <div class="important live">
                            <span class="lh">入住起步收费：</span>
                            <div>
                              <span>入住</span>
                              <span class="input">
                                <el-input type="number" :disabled="readonly" @keyup.native="liveSectionInteger" v-model="liveSection" size="mini"></el-input>
                              </span>
                              <span>分钟收起步价房费，</span>
                              <span class="input">
                                <el-input type="number" :disabled="readonly" @keyup.native="liveAllInteger" v-model="liveAll" size="mini"></el-input>
                              </span>
                              <span>分钟收全价房费</span>
                            </div>
                          </div>
                          <div class="important live recede">
                            <span class="lh">退房超时收费：</span>
                            <div>
                              <span>超过</span>
                              <span class="input">
                                <el-input type="number" :disabled="readonly" @keyup.native="recedeSectionInteger" v-model="recedeSection" size="mini"></el-input>
                              </span>
                              <span>分钟开始加收，</span>
                              <span class="input">
                                <el-input type="number" :disabled="readonly" @keyup.native="recedeAllInteger" v-model="recedeAll" size="mini"></el-input>
                              </span>
                              <span>分钟转正常入住</span>
                              <el-checkbox class="Checkbox" :disabled="readonly" v-model="cap">封顶</el-checkbox>
                            </div>
                          </div>
                      </div>
                      <!-- 房价设置 -->
                      <div class="price">
                          <span class="important boxTitle">房价设置</span>
                          <div class="pup-talbe">
                            <el-table :data="pupTableData" style="width: 100%">
                                <el-table-column label="房型">
                                  <template slot-scope="scope">{{scope.row.room_name}}</template>
                                </el-table-column>
                                <el-table-column label="全价">
                                  <template slot-scope="scope">
                                      <el-input type="number" :disabled="readonly" size="mini" v-model="scope.row.normal_price"></el-input>
                                  </template>
                                </el-table-column>
                                <el-table-column label="起步价">
                                  <template slot-scope="scope">
                                    <el-input type="number" :disabled="readonly" size="mini" v-model="scope.row.start_price"></el-input>
                                  </template>
                                </el-table-column>  
                                <el-table-column label="单位时间加收价">
                                  <template slot-scope="scope">
                                    <el-input type="number" :disabled="readonly" size="mini" v-model="scope.row.add_price"></el-input>
                                  </template>
                                </el-table-column>
                                <el-table-column label="封顶额">
                                  <template slot-scope="scope">
                                    <el-input type="number" :disabled="readonly" size="mini" v-model="scope.row.max_price"></el-input>
                                  </template>
                                </el-table-column>
                                <el-table-column label="预收金额">
                                  <template slot-scope="scope">
                                    <el-input type="number" :disabled="readonly" size="mini" v-model="scope.row.pre_price"></el-input>
                                  </template>
                                </el-table-column>
                                <el-table-column label="备注">
                                  <template slot-scope="scope">
                                    <el-input size="mini" :disabled="readonly" v-model="scope.row.remark"></el-input>
                                  </template>
                                </el-table-column>
                            </el-table>
                          </div>
                      </div>
                    </div>
                    <div class="button">
                        <el-button size="mini" type="" @click="close">关闭</el-button>
                        <el-button size="mini" v-show="!readonly" @click="submitData" :loading="loading" type="primary">确定</el-button>
                    </div>
                </div>
            </div>
      </transition>
      <!-- <div>
        <el-button>to</el-button>
      </div> -->
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import API from "@/store/API/index";
import TreeMeun from "@/assets/js/treeMeun";
export default {
  computed: {
    ...mapGetters({
      hotel: "currHotel",
      user: "user"
    })
  },
  data() {
    return {
      //
      cover: false, //弹窗是否显示
      cap: true, //封顶按钮
      loading: false,
      tableData: [], //页面表格数据
      pupTableData: [], //弹框表格数据
      nameInquire: "", //查询输入的名称
      name: "", //名称
      time: "", //时长
      depict: "", //描述
      liveSection: "", //入住起步分钟
      liveAll: "", //入住全价分钟
      recedeSection: "", //退房开始加收
      recedeAll: "", //退房正常入住
      readonly: false, //禁用弹窗的input框
      rectify: false, //是否为修改
      num: null, //房型id
      page: 1, //当前页数
      pages: 0 //总页数
    };
  },
  methods: {
    //打开弹窗
    openNew(num) {
      this.cover = true;
      this.roomList();
      // console.log("num=fasle");
    },
    //关闭弹窗
    close() {
      this.cover = false;
      this.readonly = false;
      this.clearData();
    },
    //按规则查询
    Inquire() {
      this.init();
    },
    // 查看列表详情
    openLook(num) {
      this.readonly = true;
      this.cover = true;
      API.get("/pms/price/detail?planId=" + num + "&hid=" + this.hotel.id).then(
        res => {
          console.log(res);
          if (res.error_code == 0) {
            this.giveVul(res);
          }
        }
      );
    },
    // 修改列表详情
    openRectify(num) {
      this.openLook(num);
      this.readonly = false;
      this.rectify = true;
      this.num = num;
    },
    // 删除列表项
    del(num) {
      API.get("/pms/price/del?id=" + num + "&hotel_id=" + this.hotel.id).then(
        res => {
          if (res.error_code == 0) {
            this.$message({
              message: "操作成功！",
              type: "success"
            });
            this.init();
          }
        }
      );
    },
    // 页码改变时
    handleSizeChange() {
      console.log(this.page);
      this.close();
      this.init();
    },
    ///////
    timeInteger() {
      this.integer(this.time);
      this.time = parseInt(this.time);
    },
    liveSectionInteger() {
      this.integer(this.liveSection);
      this.liveSection = parseInt(this.liveSection);
    },
    liveAllInteger() {
      this.integer(this.liveAll);
      this.liveAll = parseInt(this.liveAll);
    },
    recedeSectionInteger() {
      this.integer(this.recedeSection);
      this.recedeSection = parseInt(this.recedeSection);
    },
    recedeAllInteger() {
      this.integer(this.recedeAll);
      this.recedeAll = parseInt(this.recedeAll);
    },
    //数据提交
    submitData() {
      if (!this.name) {
        this.$message.error("名称不能为空！");
        return false;
      }
      if (!this.time) {
        this.$message.error("时长不能为空！");
        return false;
      }
      if (!this.depict) {
        this.$message.error("描述不能为空！");
        return false;
      }
      if (!this.liveSection) {
        this.$message.error("起步价房费不能为空！");
        return false;
      }
      if (!this.liveAll) {
        this.$message.error("全价房费不能为空！");
        return false;
      }
      if (!this.recedeSection) {
        this.$message.error("超时加费时间不能为空！");
        return false;
      }
      if (!this.recedeAll) {
        this.$message.error("转正常入住不能为空！");
        return false;
      }
      let arrData = [],
        fort = false,
        air = false;
      for (let i = 0; i < this.pupTableData.length; i++) {
        for (let key in this.pupTableData[i]) {
          arrData.push(this.pupTableData[i][key]);
          if (!isNaN(parseFloat(this.pupTableData[i][key]))) {
            if (
              parseInt(this.pupTableData[i][key]) !=
              parseFloat(this.pupTableData[i][key])
            ) {
              this.$message({
                message: "房价设置价格存在小数！",
                type: "error"
              });
              fort = true;
              return false;
            }
            if (!this.pupTableData[i][key]) {
              air = true;
            }
          }
        }
      }
      if (fort) {
        this.$message({
          message: "房价设置价格存在小数！",
          type: "error"
        });
        return false;
      }
      if (air) {
        this.$message({
          message: "房价设置价格有未填写项！",
          type: "error"
        });
        return false;
      }
      console.log(arrData);
      // return;
      let data = {
        hotel_id: this.hotel.id, //酒店id
        name: this.name, //名称
        staff_id: this.user.roleId[0], //操作员id
        time_length: this.time, //时长
        description: this.depict, //描述
        start_time_length: this.liveSection, //入住起步分钟
        over_time_length: this.liveAll, //入住全价分钟
        normal_time: this.recedeSection, //退房开始加收
        end_time_length: this.recedeAll, //退房正常入住
        log_arr: this.pupTableData //表单数据
      };
      if (this.cap) {
        data.type = 1;
      } else {
        data.type = 0;
      }
      console.log(data);
      this.loading = true;
      //判断是新增还是修改
      let api = "";
      if (this.rectify) {
        //修改接口
        data.price_plan_id = this.num;
        api = "/pms/price/edit";
      } else {
        //新增接口
        api = "/pms/price/add";
      }
      API.post(api, data).then(res => {
        console.log(res);
        if (res.error_code == 0) {
          //
          this.$message({
            message: "操作成功！",
            type: "success"
          });
          this.loading = false;
          this.close();
          this.init();
        } else {
          //
          let err = res.msg;
          if (res.msg.indexOf("为空") > 0) {
            // 为空
            err = "必填项为空！";
          }
          this.$message.error(err);
          this.loading = false;
        }
      });
    },
    integer(num) {
      if (num.toString().indexOf(".") != -1) {
        this.$message.error("该弹框的数据，只允许输入正整数");
      }
    },
    //数据清空
    clearData() {
      this.pupTableData = [];
      // this.tableData = [];
      this.name = "";
      this.time = "";
      this.depict = "";
      this.liveSection = "";
      this.liveAll = "";
      this.recedeSection = "";
      this.recedeAll = "";
      this.num = "";
      this.rectify = false;
    },
    // 页面初始化加载列表
    init() {
      API.get(
        "/pms/price/index?id=" +
          this.hotel.id +
          "&page=" +
          this.page +
          "&pageNum=10" +
          "&name=" +
          this.nameInquire
      ).then(res => {
        console.log(res);
        if (res.error_code == 0) {
          this.tableData = res.data.list;
          this.pages = res.data.pages;
        }
      });
    },
    // 加载弹窗列表的名称
    roomList() {
      API.get("/pms/price/room-type-list?id=" + this.hotel.id).then(res => {
        console.log(res);
        if (res.error_code == 0) {
          let data = [];
          res.data.forEach(v => {
            data.push({
              room_name: v.room_name,
              room_type_id: v.room_type_id
            });
          });
          this.pupTableData = data;
        }
      });
    },
    // 赋值
    giveVul(res) {
      this.name = res.data.name; //名称
      this.time = res.data.time_length; //时长
      this.depict = res.data.description; //
      this.liveSection = res.data.start_time_length; //
      this.liveAll = res.data.over_time_length; //
      this.recedeSection = res.data.normal_time; //
      this.recedeAll = res.data.end_time_length; //
      this.pupTableData = res.data.log_arr;
    }
  },
  mounted() {
    this.init();
  }
};
</script>
<style lang="scss">
.clockRoomRules {
  //
  height: 100%;
  // box-sizing: border-box;
  & * {
    box-sizing: border-box;
  }
  //弹窗动画
  .info-enter-active,
  .info-leave-active {
    transition: opacity 0.3s;
  }
  .info-enter,
  .info-leave-to {
    opacity: 0;
  }
  // 查询
  .Inquire {
    padding: 0 35px;
    padding-bottom: 10px;
    background: #f2f2f2;
    & > .name {
      //
      font-weight: normal;
    }
    .inline {
      display: inline-block;
    }
    .butInquire {
      margin-left: 20px;
    }
  }
  // 表格
  .talbe {
    padding: 0 35px;
    padding-top: 10px;
  }
  // 弹窗
  .Cover {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    background: rgba(0, 0, 0, 0.5);
    z-index: 5;
    .pup {
      margin: 90px auto;
      width: 1000px;
      height: 766px;
      background-color: #fff;
      position: relative;
      .title {
        z-index: 10;
        height: 35px;
        width: 100%;
        font-size: 14px;
        line-height: 35px;
        background-color: #00a8ff;
        box-shadow: 0px 1px 2px 0px rgba(127, 127, 127, 0.2);
        position: absolute;
        top: 0;
        padding: 0 20px;
        & > * {
          color: #fff;
        }
        .close {
          cursor: pointer;
          position: absolute;
          right: 20px;
          top: 0;
          i {
            font-size: 14px;
          }
        }
      }
      .content {
        overflow-y: auto;
        position: relative;
        height: 100%;
        margin: 0 auto;
        padding: 55px 40px 70px 40px;
        box-sizing: border-box;
        * {
          font-size: 12px;
        }
        .staff {
          position: absolute;
          right: 5%;
        }
        //基础信息
        .infoBox {
          .box {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            width: 77%;
            .name,
            .time,
            .depict {
              padding: 5px 0;
            }
            .wMini {
              .input {
                width: 180px;
              }
            }
            .time {
              margin-right: 14px;
            }
            .depict {
              width: 100%;
              .input {
                display: inline-block;
                width: 633px;
              }
            }
          }
        }
        //限制时段
        .period {
          margin-top: 29px;
          .live {
            position: relative;
            margin-bottom: 25px;
            .input {
              width: 120px;
            }
          }
          .Checkbox {
            margin-left: 130px;
          }
          .el-input--mini .el-input__inner {
            width: 100%;
          }
        }
        // 房价设置
        .price {
          .el-table--striped .el-table__body tr.el-table__row--striped td {
            background: #e6e6e6;
          }
          .important::before{
            top: -6px;
          }
          .el-table td {
            padding: 6px 0;
          }
          .el-table th {
            padding: 8px 0;
          }
          .el-input--mini .el-input__inner {
            width: 100%;
          }
        }
      }
      .button {
        z-index: 10;
        text-align: center;
        position: absolute;
        width: 100%;
        bottom: 0;
        padding: 10px;
        background-color: #fff;
        .el-button--mini {
          width: 98px;
        }
      }
    }
  }
  .important {
    position: relative;
    .input {
      display: inline-block;
    }
  }
  .important::before {
    position: absolute;
    content: "*";
    color: #dc4233;
    left: -1em;
    font-size: 16px;
    line-height: 34px;
  }
  .boxTitle {
    padding-bottom: 12px;
    font-weight: bold;
    display: inline-block;
  }
  .lh {
    line-height: 26px;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
  }
}
</style>
