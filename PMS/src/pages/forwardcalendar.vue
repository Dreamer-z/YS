<template>
  <div class="forwardcalendar">
    <div class="whitetext">
      <header style="margin-bottom: 10px;">
        <span class="middle">当前位置</span>
        <span style="margin-right: 18px;" class="middle">：</span>
        <span style="margin-right: 18px;" class="middle">房态中心</span>
        <span style="margin-right: 18px;" class="middle">></span>
        <span style="color: #437ff9;" class="middle">远期房态</span>
      </header>
      <div class="tab-tatal clearfix">
        <div class="tab-left fl">
          <ul>
            <li style="background: #ccc;" class="tab-left-time">
              <span class="middle">2011-00-00</span>
              <span class="middle">ican</span>
            </li>
            <li v-for="(item,index) in roomTypeArr" class="tab-left-text clearfix">
              <div class="fl text-left">{{item.name}}</div>
              <div class="fl text-right">
                <div class="text-right-top">可售数</div>
                <nav class="text-right-bottom">预订数</nav>
              </div>
            </li>
          </ul>
        </div>
        <div class="tab-right fl">
          <div class="tab-head">
            <table>
              <tr>
                <td v-for="item in 10" class="tab-head-td">
                  <div style="height: 40px;line-height: 40px; width: 110px;background: #ccc;">   <!-- width: 130px; -->
                    <span class="middle">0000</span>
                    <span class="middle">ican</span>
                  </div>
                </td>
              </tr>
            </table>
          </div>
          <div class="tab-head">
            <table>
              <tr v-for="item in (roomTypeArr.length*2)">
                <td style="border-top:0;" v-for="item in 10" class="tab-head-td">
                  <div style="height: 35px;line-height: 35px; width: 110px;">   <!-- width: 130px; -->
                    <span class="middle">0000</span>
                    <span class="middle">ican</span>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API from "@/store/API"
  export default{
    name: 'forwardCalendar',
    data() {
      return {
        roomTypeArr: [],
        hotelId: 1
      }
    },
    methods: {
      getRoomType() {
        API.getRoomType(this.hotelId).then(res=>{
          if(res.error_code == 0) {
            this.roomTypeArr = res.data
            console.log('12315155',this.roomtypeArr)
          }
        })
      }
    },
    created() {
      this.getRoomType()
    }
  }
</script>

<style lang="scss" scoped>
  .forwardcalendar{
    padding-top: 50px;
    font-size: 14px;
    background: #f2f2f2;
    position: relative;
    overflow: hidden;
    user-select: none;
    .whitetext{
      box-sizing: border-box;
      padding-top: 20px;
      width: 100%;
      box-sizing: border-box;
      padding-left: 210px;
      padding-right: 50px;
      background: #fff;
    }
    .tab-left{
      width: 140px;
      border: 1px solid #f2f2f2;
      border-right: 0;
      text-align: center;
    }
    .tab-left-time{
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #f2f2f2;  
    }
    .tab-left-text{
      width: 140px;
      height: 71px;
      background: #d5d5d5;
      border-bottom: 1px solid #f2f2f2;
      .text-left{
        width: 89px;
        line-height: 71px;
        border-right: 1px solid #f2f2f2;
      }
      .text-right{
        font-size: 12px;
        width: 50px;
        .text-right-top{
          height: 35px;
          line-height: 35px;
          border-bottom: 1px solid #f2f2f2;
        }
        .text-right-bottom{
          height: 35px;
          line-height: 35px;
        }
      }
    }
    td{
      border:1px solid #f2f2f2;
      text-align: center;
    }
  }
</style>