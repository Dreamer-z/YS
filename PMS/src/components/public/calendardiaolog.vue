<template>
  <div class="calendardiaolog">
    <div class="contain">
      <header class="clearfix">
        <p class="fl">办理入住</p>
        <span @click="calendarDiaoloBenone" class="fr">×</span>
      </header>
      <div class="text">
        <ul class="head-list">
          <li class="two">
            <nav style="margin-right: 42px;" class="middle">
              <span class="middle">客源渠道</span>
              <span class="middle">：<span class="red">*</span></span>
              <el-select v-model="sourceChannel" size="mini" filterable placeholder="请选择">
                <el-option
                  v-for="item in sourceChannelArr"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </nav>
            <nav style="margin-right: 42px;" class="middle">
              <span class="middle">会员卡号</span>
              <span class="middle">：<span class="red">*</span></span>
              <el-select v-model="cardNumber" size="mini" filterable placeholder="请选择">
                <el-option
                  v-for="item in cardNum"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </nav>
            <nav style="margin-right: 42px;" class="middle">
              <span class="middle">协议单位</span>
              <span class="middle">：<span class="red">*</span></span>
              <el-select v-model="agreement" size="mini" filterable placeholder="请选择">
                <el-option
                  v-for="item in agreementUnit"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </nav>
          </li>
          <li class="two">
            <nav class="middle">
              <span class="middle">入住时间</span>
              <span style="margin-right: 14px;" class="middle red">*</span>
              <el-date-picker value-format="yyyy-MM-dd HH:mm" size="mini" type="datetime">
              </el-date-picker>
            </nav>
            <div style="margin: 0 30px;" class="middle">
              <span class="middle dele">
                <span class="del"></span>
              </span>
              <span class="middle num">11</span>
              <span>天</span>
              <span class="middle add">＋</span>
            </div>
            <nav class="middle">
              <span class="middle">离店时间</span>
              <span style="margin-right: 14px;" class="middle red">*</span>
              <el-date-picker value-format="yyyy-MM-dd HH:mm" size="mini" type="datetime">
              </el-date-picker>
            </nav>
          </li>
          <li class="two">
            <nav style="margin-right: 50px;" class="middle">
              <span style="width: 56px; text-align: right" class="middle">预定人</span>
              <span class="middle">：<span class="red">*</span></span>
              <input style="width: 168px;" class="middle" type="text">
            </nav>
            <nav style="margin-right: 50px;" class="middle">
              <span style="width: 56px; text-align: right" class="middle">预定手机</span>
              <span class="middle">：<span class="red">*</span></span>
              <input style="width: 168px;" class="middle" type="text">
            </nav>
            <nav style="margin-right: 50px;" class="middle">
              <span style="width: 56px; text-align: right" class="middle">保留时效</span>
              <span class="middle">：<span class="red">*</span></span>
              <el-select v-model="retentionTime" size="mini" filterable placeholder="请选择">
                <el-option
                  v-for="item in retentionTimeArr"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </nav>
          </li>
          <li>
            <nav style="margin-right: 50px;" class="middle">
              <span style="width: 56px; text-align: right" class="middle">支付定金</span>
              <span style="margin-right: 6px;" class="middle">：</span>
              <input style="width: 168px;" class="middle" type="text">
            </nav>
            <nav style="margin-right: 50px;" class="middle">
              <span style="width: 56px; text-align: right" class="middle">备注</span>
              <span style="margin-right: 6px;" class="middle">：</span>
              <input style="width: 486px;" class="middle" type="text">
            </nav>
          </li>
        </ul>
      </div>
      <div class="table-list">
        <table class="table-head">
          <tr>
            <td class="one">
              <div style="width: 40px;">序号</div>
            </td>
            <td>
              <div style="width: 120px;">房型</div>
            </td>
            <td>
              <div style="width: 120px;">房号</div>
            </td>
            <td>
              <div style="width: 66px;">房价</div>
            </td>
            <td>
              <div style="width: 80px;">价格方案</div>
            </td>
            <td>
              <div style="width: 180px;">入住时间</div>
            </td>
            <td>
              <div style="width: 180px;">预离时间</div>
            </td>
            <td>
              <div style="width: 100px;">入住人</div>
            </td>
            <td>
              <div style="width: 60px;">操作</div>
            </td>
          </tr>
        </table>
        <div class="table-body">
          <table v-for="item in 10" class="table-head">
            <tr>
              <td class="one">
                <div style="width: 40px;">1</div>
              </td>
              <td>
                <div style="width: 120px;">2</div>
              </td>
              <td>
                <div style="width: 120px;"></div>
              </td>
              <td>
                <div style="width: 66px;"></div>
              </td>
              <td>
                <div style="width: 80px;"></div>
              </td>
              <td>
                <div style="width: 180px;"></div>
              </td>
              <td>
                <div style="width: 180px;"></div>
              </td>
              <td>
                <div style="width: 100px;"></div>
              </td>
              <td>
                <div style="width: 60px;"></div>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="foot">
        <nav style="margin-right: 16px;" class="foot-dele middle">取消</nav>
        <footer class="middle">确定</footer>
      </div>
    </div>
  </div>
</template>

<script>
import bus from "@/store/bus"
import API from "@/store/API"
  export default{
    name: 'calendarDiaolog',
    data() {
      return{
        retentionTime: '',
        agreement: '',
        cardNumber: '',
        sourceChannel: '',
        roomTypeArr: [],       //房型
        sourceChannelArr: [],  //客源渠道
        arrivalTimeArr: [],    //预抵时间
        retentionTimeArr: [],  //保留失效
        guaranteeArr: [],      //担保
        cardNum: [],            // 会员卡号
        agreementUnit: []
      }
    },
    methods: {
      calendarDiaoloBenone() {
        bus.ev.$emit('calendarDiaoloBenone')
      },
      getSourceChannelArr() { //客源渠道
        API.get("/pms/from").then(res=>{
          if(res.error_code == 0) {
            let arr = res.data
            arr.forEach((e, i)=>{
              this.sourceChannelArr.push({
                label: e.name,
                value: e.id
              })
            })
          }
        })
      }
    },
    created() {
      this.getSourceChannelArr()
    }
  }
</script>

<style lang="scss" scoped>
  .calendardiaolog{
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,.4);
    font-size: 14px;
    z-index: 666;
    .red{
      color: red;
    }
    input{
      height: 28px;
      border: 1px solid #f2f2f2;
      border-radius: 4px;
    }
    .two{
      margin-bottom: 10px;
    }
    .middle{
      display: inline-block;
      vertical-align: middle;
    }
    .num{
      height: 26px;
      line-height: 26px;
      padding: 0 10px;
      color: #6a9df6;
      border: 1px solid #f2f2f2;
      border-radius: 2px;
    }
    .add{
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: #6a9df6;
      color: #fff;
      font-size: 26px;
      line-height: 22px;
      margin-left: 10px;
    }
    .dele{
      width: 24px;
      height: 24px;
      position: relative;
      border: 1px solid #f2f2f2;
      border-radius: 50%;
      margin-right: 10px;
      .del{
        width: 14px;
        border-bottom: 1px solid #d9d9d9;
        position: absolute;
        top: 50%;left: 50%;
        margin-left: -7px;
      }
    }
    .contain{
      width: 1050px;
      max-height: 600px;
      overflow-y: auto;
      position: absolute;
      background: #fff;
      top: 8%;
      left: 22%;
      header{
        width: 100%;
        overflow: hidden;
        line-height: 40px;
        box-sizing: border-box;
        padding: 0 30px;
        background: #437ff9;
        color: #fff;
        span{
          font-size: 30px;
          cursor: pointer;
        }
      }
    }
    .text{
      box-sizing: border-box;
      padding: 20px 30px 0 30px;
    }
    .head-list{
      box-sizing: border-box;
      padding-bottom: 10px;
      border-bottom: 1px solid #f2f2f2;
    }
    .table-head{
      width: 920px;
      td{
        border: 1px solid #f2f2f2;
        height: 40px;
        text-align: center;
      }
    }
    .table-list{
      box-sizing: border-box;
      padding: 20px 30px 0 30px;
    }
    .table-body{
      height: 294px;
      overflow-y: auto;
    }
    .foot-dele,footer{
      width: 110px;
      hegiht: 30px;
      text-align: center;
      line-height: 30px;
      color: #fff;
      background: #6a9df6;
      border-radius: 4px;
      cursor: pointer;
    }
    .foot{
      width: 260px;
      text-align: center;
      margin: 50px auto 30px;
    }
  }
</style>