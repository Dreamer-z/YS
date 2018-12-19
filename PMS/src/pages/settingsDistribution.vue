<template>
    <div class="settingsDistribution">
        <!-- 分销设置 -->
        <div class="setDistribution">
            <div class="ite">
                <div class="row">
                    <div class="title">分销中心开关：</div>
                    <div v-if="!edit" class="in-b" :class="!(edit&&edit_)?'blu':''">
                      <el-input :disabled="true" size="mini" :value="edit_?'已开启':'已关闭'"></el-input>
                    </div>
                    <div v-if="edit" class="in-b">
                      <!-- 滑块  以弃用 -->
                      <!-- <el-switch
                        v-model="edit_"
                        active-text="开"
                        inactive-text="关">
                      </el-switch> -->
                      <!-- 单选按钮 -->
                      <el-radio v-model="edit_" :label="true">开</el-radio>
                      <el-radio v-model="edit_" :label="false">关</el-radio>
                    </div>
                </div>
                <div class="row">
                    <div :class="(edit&&edit_)?'special':''" class="title">提现申请预计：</div>
                    <div class="in-b">
                      <el-input type="number" oninput="if(value.length>3)value=value.slice(0,3)"  @blur="workDay()" v-model="pageData.work_day" v-if="(edit&&edit_)" :disabled="!(edit&&edit_)" size="mini"></el-input>
                    </div>
                    <div class="in-b">
                      <span :class="!(edit&&edit_)?'mag':''" v-if="!(edit&&edit_)">{{pageData.work_day}}</span>
                      <span>个工作日到账</span>
                    </div>
                </div>
                <div class="row">
                    <div :class="(edit&&edit_)?'special':''" class="title">最低提现金额：</div>
                    <div class="in-b">
                      <el-input type="number" @keyup.native="minMoney()" v-if="(edit&&edit_)" :disabled="!(edit&&edit_)" v-model="pageData.min_money" size="mini"></el-input>
                    </div>
                    <div class="in-b">
                      <span :class="!(edit&&edit_)?'mag':''" v-if="!(edit&&edit_)">{{pageData.min_money?pageData.min_money:'0'}}</span>
                      <span>元</span>
                    </div>
                </div>
            </div>
            <div class="ite">
                <div class="row">
                    <div :class="(edit&&edit_)?'special':''" class="title">小程序名称：</div>
                    <div class="in-b AppleInput">
                      <el-input :placeholder="(edit&&edit_)?'请输入文字，不得多于10字':''" maxlength="10" :disabled="!(edit&&edit_)" v-model="pageData.mini_name" size="mini"></el-input>
                    </div>
                </div>
                <div class="row">
                    <div :class="(edit&&edit_)?'special':''" class="title">分享返利规则说明：</div>
                    <div class="in-b count">
                      <el-input placeholder="请输入文字，不得多于200字" maxlength="200" v-model="pageData.des" :rows="6" :disabled="!(edit&&edit_)" size="mini" type="textarea" resize="none"></el-input>
                      <div v-if="(edit&&edit_)" class="countWord"><span  :class="pageData.des.length>200?'error':''">{{pageData.des.length}}</span>/200</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 分享小程序内容设置 -->
        <div class="setDistributionApplet">
          <div class="boxCard">
            <div class="card cardTop" v-for="(item,index) in pageData.share_img" :key="item.id">
              <!-- 每一项的名称 -->
              <div class="nameCard row">
                {{index | nameCard}}
              </div>
            </div>
          </div>
          <!-- 小程序展示卡片列表 -->
          <div class="boxTitle">
            <span>分享至好友内容设置：</span>
          </div>
          <div class="boxCard">
            <!-- 小程序展示卡片 -->
            <div class="card" v-for="(item,index) in pageData.share_img" :key="item.id">
              <div class="contentCard">
                <!-- 小程序名称和图片 -->
                <div class="nameApplet row">
                  <div class="imgIcon in-b">
                    <img src="../assets/images/ys.png" alt="">
                  </div>
                  <span>小程序名称</span>
                </div>
                <!-- 小程序描述 -->
                <div class="descriptionApplet row count">
                  <el-input placeholder="请输入文字，不得多于30字" maxlength="30" v-model="item.title" :disabled="!(edit&&edit_)" type="textarea" resize="none"></el-input>
                  <div v-if="(edit&&edit_)" class="countWord"><span  :class="item.title.length>30?'error':''">{{item.title.length}}</span>/30</div>
                </div>
                <!-- 小程序图片 -->
                <div class="imgApplet row" v-loading="item.loding">
                  <div class="img">
                    <img v-if="item.sale_img_id!=0" :src="item.url" alt="">
                    <img v-if="item.sale_img_id==0&&item.type==1" src="../assets/images/imgAppletHotel.png" alt="">
                    <img v-if="item.sale_img_id==0&&item.type==2" src="../assets/images/imgAppletRoom.png" alt="">
                  </div>
                  <div class="cover" v-if="(edit&&edit_)">
                    <div class="but" @mousedown="getImgId(item.ite,index)">
                      <span>选取</span>
                      <el-upload
                        class="getUp"
                        ref="up"
                        action="https://upload-z2.qiniup.com"
                        list-type="picture-card"
                        :on-preview="uploadPreview"
                        :on-success="uploadSuccess"
                        :before-upload="uploadBefore"
                        :on-remove="uploadRemove"
                        :on-error="uploadError"
                        :http-request="upload"
                        :file-list="fileArray"
                        >
                      </el-upload>
                    </div>
                    <div @click="setDelImg(item.ite,item.sale_img_id,item.image_id)" class="but del">删除</div>
                  </div>
                </div>
                <div class="applet">
                  <div class="iconAppletImg in-b">
                    <img src="../assets/images/iconAppletImg.png" alt="">
                  </div>
                  <div class="text in-b">
                    <span>小程序名称</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 小程序展示卡片列表 -->
          <div class="boxTitle">
            <span>分享至朋友圈推广文案：</span>
          </div>
          <div class="boxCard">
            <div :class="(edit&&edit_)?'cardNomr':''" class="card" v-for="(item,index) in pageData.share_img" :key="index">
              <!-- 小程序说明 -->
              <div class="directions row count">
                <el-input placeholder="请输入文字，不得多于200字" maxlength="200" @keyup="caption(2)" v-model="item.des" rows="10" :disabled="!(edit&&edit_)" type="textarea" resize="none"></el-input>
                  <div v-if="(edit&&edit_)" class="countWord"><span  :class="item.des.length>200?'error':''">{{item.des.length}}</span>/200</div>
              </div>
            </div>
          </div>
          <!-- 说明 -->
          <div class="description">
            <div class="row">说明：</div>
            <div class="row del">"请上传提交 5：4 比例的图片</div>
            <!-- <div class="row">#酒店名称#、#房型名称#、#商品名称#、#餐饮名称#  为通配符；</div>
            <div class="row">小程序分享出去之后，相对应通配符则将对应显示其 酒店的名称 或 商品的名称</div> -->
          </div>
        </div>
        <!-- 保存but -->
        <div class="but">
            <el-button @click="editSet()" v-if="edit" type="primary" size="mini">保存</el-button>
            <el-button @click="editSet()" v-if="!edit" type="primary" size="mini">修改</el-button>
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
      int: /^\d+$/, //整数正则
      edit: false, //编辑状态
      edit_: false, //滑块
      upload_token: "", //七牛上传图片的token
      index: false, //
      isUp: false, //是否上传成功
      imgIte: "", //识别是哪个卡片
      fileArray: [], //element组件上传成功之后的盛放图片容器
      isUp: false, //页面是否上传过一次图片
      pageData: {
        // work_day:"",
        min_money: 0,
        share_img: []
      }, //页面数据
      getData: true
    };
  },
  methods: {
    //  保存&&修改
    editSet() {
      //
      let brk = true;
      if (!this.edit) {
        console.log("开启修改");
        // if (this.getData == false) {
        //   this.error("请先设置佣金！");
        //   return false;
        // }
        this.edit = !this.edit;
      } else {
        if (
          this.pageData.work_day == "" ||
          this.pageData.work_day == undefined ||
          this.pageData.work_day <= 0
        ) {
          this.error("到账工作日不能为空并且不能小于等于0！");
          return false;
        } else if (
          this.pageData.min_money == "" ||
          this.pageData.min_money == undefined ||
          this.pageData.min_money <= 0
        ) {
          this.error("最低提现金额不能为空并且不能小于等于0！");
          return false;
        } else if (
          this.pageData.mini_name == "" ||
          this.pageData.mini_name == undefined
        ) {
          this.error("小程序名称不能为空！");
          return false;
        } else if (this.pageData.des == "" || this.pageData.des == undefined) {
          this.error("分享返利规则说明不能为空！");
          return false;
        }
        // console.log("保存成功");
        this.pageData.hotel_id = this.hotel.id;
        this.pageData.staff_id = this.user.staff_id;
        if (this.edit_ == true) {
          this.pageData.status = 1;
        } else {
          this.pageData.status = 0;
        }
        this.pageData.share_img.forEach((v, i) => {
          if (!v.des) {
            brk = false;
          }
          if (v.type == undefined) {
            v.type = i + 1;
          }
        });
        if (brk == false) {
          this.error("请输入推广文案！");
          return false;
        }
        console.log(this.pageData);
        API.post("/pms/sale/config-edit", this.pageData).then(res => {
          console.log("提交数据：", res);
          if (res.error_code == 0) {
            this.success();
            this.edit = !this.edit;
            this.init();
            this.isUp = false;
          } else {
            if (res.msg.indexOf("空")) {
              this.error("重要信息未填写！");
            } else {
              this.error(res.msg);
            }
          }
        });
      }
    },
    //  预计到账整数
    workDay() {
      if (this.pageData.work_day) {
        if (!this.int.test(this.pageData.work_day)) {
          console.log(1);
          this.pageData.work_day = parseInt(this.pageData.work_day);
          this.error("预计到账工作日只允许输入整数！");
        }
      }
    },
    //  最低提现金额
    minMoney() {
      if (this.pageData.min_money) {
        if (!this.int.test(this.pageData.min_money)) {
          console.log(2);
          this.pageData.min_money = parseInt(this.pageData.min_money);
          this.error("最低提现金额只允许输入整数！");
        }
      }
    },
    // 不能超过30个字符
    caption(e) {
      //
    },
    getImgId(num, e) {
      //
      console.log("imgIte", num);
      this.imgIte = num;
      this.index = e;
    },
    // 文件已上传时
    uploadPreview(content) {
      //
      console.log("文件已上传时", content);
      this.pageData.share_img[this.index].loding = false;
    },
    // 文件上传之前
    uploadBefore() {
      //
      // this.loding = true;
      this.pageData.share_img[this.index].loding = true;
      console.log(this.pageData.share_img[this.index].loding == true);
    },
    // 移除七牛文件
    uploadRemove() {
      //
    },
    //删除图片
    setDelImg(num, e, id) {
      // console.log("删除成功");
      if (e == 0) {
        this.error("默认图片无法删除");
      } else {
        console.log(num, e, id);
        // config-img-del
        if (id == undefined) {
          id = 0;
        }
        if (this.isUp) {
          id = 0;
        }
        API.get(
          "/pms/sale/config-img-del?hid=" +
            this.hotel.id +
            "&share_img_id=" +
            e +
            "&img_id=" +
            id
        ).then(res => {
          if (res.error_code == 0) {
            this.pageData.share_img.forEach((v, i) => {
              if (v.sale_img_id == e) {
                v.sale_img_id = 0;
                console.log(1);
              }
              console.log(v);
            });
            this.success();
            this.isUp = false;
            console.log(this.pageData.share_img);
          } else {
            this.error(res.msg);
          }
        });
      }
    },
    // 图片上传成功
    uploadSuccess(content) {
      //
      this.pageData.share_img[this.index].loding = false;
      this.fileArray = [];
    },
    // 图片上传失败
    uploadError(err, file, fileList) {
      this.$message.error("上传图片失败," + err);
      this.pageData.share_img[this.index].loding = false;
    },
    // 上传图片
    upload(content) {
      //
      let that = this;
      console.log(content);
      API.uploadFile({
        url: content.action,
        token: this.upload_token,
        file: content.file
      }).then(res => {
        console.log(res);
        if (res.data.error_code == 0) {
          this.isUp = true;
          that.pageData.share_img.forEach((v, i) => {
            if (v.ite == that.imgIte) {
              v.url = res.data.data.url;
              v.sale_img_id = res.data.data.img_id;
            }
          });
          content.onSuccess();
        }
      });
    },
    // 获取上传图片的token
    getToken() {
      API.get(
        "/pms/sale/get-token?hid=" + this.hotel.id + "&type=1&sid=1"
      ).then(res => {
        if (res.error_code == 0) {
          this.upload_token = res.data.token;
        }
      });
    },
    // 页面初始化数据
    init() {
      API.get("/pms/sale/config-detail?hotel_id=" + this.hotel.id).then(res => {
        console.log("页面初始数据", res);
        if (res.error_code == 0) {
          if (res.data.status == 0) {
            this.edit_ = false;
          } else if (res.data.status == 1) {
            this.edit_ = true;
          }
          res.data.share_img.forEach((v, i) => {
            v.ite = new Date().getTime() + i;
          });
          res.data.min_money = parseInt(res.data.min_money);
          this.pageData = res.data;
        } else if (res.error_code == -1) {
          res.data = {
            work_day: 1,
            min_money: 0,
            des:
              "1、将酒店小程序分享给您的微信好友。\n" +
              "2、好友通过此分享链接进入小程序，成为该小程序的新用户，此类新用户通过小程序产生的费用支出（房费、商品等），都将由酒店抽取一定比例佣金奖励返现给您。即消费即返佣，上不封顶，随时可提现！\n" +
              "3、活动期间永久有效，一切解释权归酒店所有。\n"
          };
          res.data.share_img = [
            {
              sale_img_id: 0,
              type: 1, //酒店
              title: "邀请好友都来“白住”、“白拿”~奖励不封顶，随时可提现",
              des:
                "邀你“白住又白拿”啦！！\n订酒店还上团购你就OUT了#扫我#订房分享可得现金，不订房分享给好友亦可赚“小费”！\n不封顶，随时可提现。\n小伙伴们赶紧上车~",
              loding: false,
              ite: new Date().getTime() + 1
            },
            {
              sale_img_id: 0,
              type: 2, //房型
              title: "酒店房型那么多，总有一款是你的“量身定做”~",
              des:
                "邀你“白住又白拿”啦！！\n订酒店还上团购你就OUT了#扫我#订房分享可得现金，不订房分享给好友亦可赚“小费”！\n不封顶，随时可提现。\n小伙伴们赶紧上车~",
              loding: false,
              ite: new Date().getTime() + 2
            }
          ];
          this.edit_ = false;
          this.pageData = res.data;
          console.log(this.pageData);
        } else {
          this.error("页面初始化失败" + res.msg);
        }
      });
      // API.get(
      //   "/pms/sale/commission-list?hotel_id=" +
      //     this.hotel.id +
      //     "&staff_id=" +
      //     this.user.staff_id
      // ).then(res => {
      //   console.log("佣兵", res);
      //   if (res.error_code == -1) {
      //     this.getData = false;
      //   } else if (res.error_code == 0) {
      //     this.getData = true;
      //   }
      // });
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
    this.getToken();
    this.init();
  },
  filters: {
    nameCard(t) {
      let arr = [
        "分享酒店（预览）",
        "分享房型（预览）",
        "分享商品（预览）",
        "分享餐饮（预览）"
      ];
      return arr[t];
    }
  }
};
</script>
<style lang="scss">
.settingsDistribution {
  //
  padding: 25px 35px;
  & > .but {
    width: 1264px;
    padding-bottom: 60px;
    text-align: center;
    .el-button--mini {
      padding: 8px 37px;
    }
  }
  & > .setDistribution,
  & > .setDistributionApplet {
    width: 1264px;
    position: relative;
    box-sizing: border-box;
    border: 1px solid #e6e6e6;
    padding: 24px 30px;
    margin: 8px 0 55px;
  }
  & > .setDistribution::before,
  & > .setDistributionApplet::before {
    position: absolute;
    background: #fff;
    content: "分销设置";
    padding: 0 41px 0 27px;
    left: 12px;
    top: -0.5em;
    color: #808080;
  }
  & > .setDistributionApplet::before {
    content: "分享小程序内容设置";
  }
  // 分销设置
  & > .setDistribution {
    display: flex;
    .ite:nth-of-type(1) {
      width: 550px;
    }
    .ite {
      .row {
        padding: 20px 0;
        .title {
          width: 112px;
          display: inline-block;
          margin-right: 43px;
        }
        .blu {
          * {
            color: #437ff9;
          }
        }
        .AppleInput {
          .el-input--mini {
            width: 273px;
          }
        }
        .mag {
          margin-left: 12px;
        }
      }
    }
    .ite + .ite {
      .row {
        .title {
          width: 126px;
        }
        .in-b {
          width: 440px;
          vertical-align: text-top;
          line-height: 24px;
        }
      }
    }
    .el-switch {
      height: 28px;
      vertical-align: middle;
    }
  }
  // 分享小程序内容设置
  & > .setDistributionApplet {
    padding: 70px 75px 23px;
    margin: 8px 0 20px;
    .boxTitle {
      padding: 20px 0;
    }
    .boxCard {
      display: flex;
      // justify-content: space-between;
      .card + .card {
        margin-left: 48px;
      }
      .cardTop {
        border: none !important;
        // padding: 20px 0;
        font-weight: bold;
        font-size: 18px;
        text-align: center;
      }
      .cardNomr {
        border: none !important;
      }
      .card {
        box-sizing: border-box;
        width: 230px;
        // height: 300px;
        border: 1px solid #ccc;
        position: relative;
        .contentCard {
          padding: 12px 0 0 0;
          // 每一项的名称
          .nameCard {
            position: absolute;
            top: -35px;
          }
          // 小程序名称和图片
          .nameApplet {
            .imgIcon {
              width: 21px;
              height: 23px;
              vertical-align: middle;
              img {
                width: 100%;
                height: 100%;
              }
            }
          }
          // 小程序描述
          .descriptionApplet {
            .countWord {
              right: 14px;
              bottom: 6px;
            }
            textarea {
              line-height: 17px;
            }
          }
          // 小程序图片
          .imgApplet {
            margin-left: 2px;
            position: relative;
            .img,
            .cover {
              width: 204px;
              height: 164px;
            }
            .img {
              display: flex;
              overflow: hidden;
              justify-content: center;
              align-items: center;
              img {
                width: 100%;
              }
            }
            .cover {
              position: absolute;
              top: 3px;
              background: rgba($color: #000, $alpha: 0.5);
              justify-content: center;
              align-items: center;
              display: flex;
              .but {
                color: #fff;
                cursor: pointer;
                margin: 0 10px;
                padding: 20px 10px;
                box-sizing: border-box;
                width: 48px;
                height: 54px;
                overflow: hidden;
                position: relative;
                .getUp {
                  width: 100%;
                  height: 100%;
                  position: absolute;
                  top: 0;
                  left: 0;
                  opacity: 0;
                }
              }
            }
          }
          // 小程序
          .applet {
            margin-top: 6px;
            padding: 5px 10px;
            border-top: 1px solid #ccc;
            .iconAppletImg {
              vertical-align: top;
              width: 17px;
              height: 17px;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .text {
              line-height: 17px;
            }
          }
          .row {
            padding: 3px 10px;
          }
        }
      }
      .countWord {
        width: 80%;
        right: 4px;
        bottom: 2px;
        margin-right: 15px;
      }
    }
    // 说明
    .description {
      box-sizing: border-box;
      width: 1068px;
      margin-top: 44px;
      background: #f4f8ff;
      padding: 14px 16px;
      .row {
        padding: 5px 0;
      }
    }
    .directions {
      .countWord {
        width: 90%;
      }
    }
    .del {
      color: #ff4747 !important;
    }
  }
  .in-b {
    display: inline-block;
  }
  .el-textarea {
    textarea:disabled {
      background: #fff;
      border: 1px solid #fff;
    }
  }
  .el-input {
    input:disabled {
      border: 1px solid #fff;
    }
  }
  .count {
    position: relative;
    .countWord {
      position: absolute;
      width: 95%;
      right: 4px;
      box-sizing: border-box;
      text-align: right;
      bottom: 2px;
      font-size: 12px;
      background: #fff;
      color: rgba($color: #000, $alpha: 0.54);
      height: 16px;
      line-height: 16px;
      // user-select: none;
      // cursor: text;
    }
    .error {
      color: #dc4233;
    }
  }
  textarea {
    box-sizing: border-box;
    padding-bottom: 20px;
  }
  .special {
    position: relative;
  }
  .special::before {
    position: absolute;
    content: "*";
    color: #dc4233;
    left: -0.7em;
    top: 0.1em;
  }
  // 文字溢出隐藏并显示 "..."   //仅限于-webkit内核
  .ovh {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; //几行之后就显示 "..."
    -webkit-box-orient: vertical;
  }
  .el-input.is-disabled .el-input__inner {
    background-color: #fff;
    border: none;
    color: #333;
  }
}
</style>


