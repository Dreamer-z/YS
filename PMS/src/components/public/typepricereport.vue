<template>
  <div class="stay-money">
    <div class="contain">
      <header class="clearfix">
        <p class="fl">日志记录</p>
				<span @click="setNone" class="fr spa">×</span>
      </header>
      <div class="text">
        <div style="border:1px solid #e5e5e5;borderBottom:none;">
          <table border="0">
            <tbody>
              <tr style="background: #f4f8ff;">
                <td style="height: 40px;" colspan="3">操作员</td>
                <td style="height: 40px;" colspan="4">设置时间</td>
                <td style="height: 40px;" colspan="3">客户类型</td>
                <td style="height: 40px;" colspan="6">类型</td>
                <td style="height: 40px;" colspan="5">日期范围</td>
                <td style="height: 40px;" colspan="4">设置说明</td>
                <td style="height: 40px;" colspan="6">设置房型</td>
                <td style="height: 40px;" colspan="3">设置价格</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style="border:1px solid #e5e5e5;borderBottom:none;">
          <table border="0">
          <tbody>
            <tr class="hover" style="borderBottom:1px solid #e5e5e5;" v-for="(item, index) in orderListArr" :key="index">
              <td style="height: 60px;" colspan="3">{{item.username}}</td>
              <td style="height: 60px;" colspan="4">
                <p>{{item.create_time.split(' ')[0]}}</p>
                <p>{{item.create_time.split(' ')[1]}}</p>
              </td>
              <td style="height: 60px;" colspan="3">{{item.type}}</td>
              <td class="pre-alert-box" style="height: 60px;position:relative;overflow:visible;" colspan="6">
                <div class="test-world">{{item.member_names}}</div>
                <div v-if="item.member_names.length >0" style="textAlign:center;width:150px;" class="alert-box">
                  <!-- <span>{{item.member_names}}</span> -->
                  <p style="marginBottom:8px;" v-for="(data,index) in item.member_names.split(',')" :key="index" class="clearfix"><span>{{data}}</span></p>
                </div>
              </td>
              <td style="height: 60px;" colspan="5">
                <p>{{item.setting_time | settingTimeOne}}</p>
                <p v-if="item.setting_time.indexOf('-') > 0">-</p>
                <p v-if="item.setting_time.indexOf('-') > 0">{{item.setting_time | settingTimeTwo}}</p>
              </td>
              <td class="pre-alert-box" style="height: 60px;position:relative;overflow:visible;" colspan="4">
                <div class="test-world">{{item.remark}}</div>
                <div v-if="item.remark.length > 0" style="textAlign:left;width:200px;" class="alert-box">
                  <span>{{item.remark}}</span>
                </div>
              </td>
              <!---->
              <td class="pre-alert-box" style="height: 60px;position:relative;overflow:visible;" colspan="6">
                <div class="test-world">{{item.room_type_names}}</div>
                <div style="textAlign:left;width:200px;" class="alert-box">
                  <p style="marginBottom:8px;" v-for="(data,index) in item.room_type_pirces" :key="index" class="clearfix">
                    <span class="fl">{{data.name}}</span>
                    <span class="fr">{{data.price}}</span>
                  </p>
                </div>
              </td>
              <td style="height: 60px;position:relative;overflow:visible;" class="pre-alert-box" colspan="3">
                <div class="test-world">{{item.price}}</div>
                <div style="textAlign:left;width:200px;" class="alert-box">
                  <p style="marginBottom:8px;" v-for="(data,index) in item.room_type_pirces" :key="index" class="clearfix">
                    <span class="fl">{{data.name}}</span>
                    <span class="fr">{{data.price}}</span>
                  </p>
                </div>
              </td>
              <!---->
            </tr>
          </tbody>
        </table>
        </div>
      </div>
      <div style="text-align: center; margin-top: -20px;">
        <el-pagination
          @current-change="currentChange"
          @prev-click="currentChange"
          @next-click="currentChange"
          :page-size="pageNum"
          :current-page.sync="currentPage"
          layout="prev, pager, next"
          :total="totalCount">
        </el-pagination>
      </div>
      <nav class="shadow"></nav>
      <footer>
        <div style="width: 220px;margin:0 auto;text-align:center;" class="clearfix">
          <!-- <p @click="setNone" class="middle">关闭</p> -->
          <el-button @click="setNone" style="width:100px;">关闭</el-button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import API from "@/store/API"
import { mapGetters } from 'vuex'
  export default {
    name: 'typePriceReport',
    props: ['val'],
    data() {
      return {
        orderListArr: [],
        totalCount: 0,
        currentPage: 1,
        startDateTime: '',
        roomTypes: [],
        pageNum: 5
      }
    },
    created() {
      API.get(`/pms/price/log?id=${this.hotel.id}&page=0&num=${this.pageNum}`).then(res => {
        if (res.error_code == 0) {
          this.totalCount =  res.data.totalCount
          this.orderListArr = []
          this.orderListArr = res.data.data
        }
      })
    },
    filters: {
      settingTimeOne(str) {
        let arr = str.split('-')
        return arr[0]
      },
      settingTimeTwo(str) {
        let arr = str.split('-')
        if (arr.length == 2) {
          return arr[1]
        }
      }
    },
    methods: {
      setNone() {
        this.$emit('typePriceNone')
      },
      currentChange(n) {
        API.get(`/pms/price/log?id=${this.hotel.id}&page=${n}&num=${this.pageNum}`).then(res=>{
          if(res.error_code == 0) {
            this.orderListArr = []
            this.orderListArr = res.data.data
          }
        })
      }
    },
    computed: {
			...mapGetters({
        hotel:'currHotel',
        curUser: 'user'
      })
    }
  }
</script>

<style lang="scss" scoped>
  .stay-money{
    position: fixed;
		top: 0; left: 0; right: 0; bottom: 0;
		background: rgba(0,0,0,.4);
		font-size: 12px;
		z-index: 666;
    display: flex;
    align-items:center;
    justify-content: center;
    .contain{
			width: 1010px;
			background: #fff;
      header{
        font-size: 14px;
				width: 100%;
				overflow: hidden;
				box-sizing: border-box;
				padding: 0 30px;
				line-height: 40px;
				background: #437ff9;
				color: #fff;
				.spa{
					font-size: 30px;
					cursor: pointer;
				}
			}
    }
    .pre-alert-box:hover .alert-box{
      display: block;
    }
    .hover:hover{
      background: #f0f9fe;
    }
    .alert-box{
      display: none;
      position: absolute;
      top: 60%;
      left: 80%;
      box-sizing: border-box;
      padding: 20px;
      background: #666;
      color: #fff;
      white-space: normal;
      word-wrap: break-word;
    }
    .text{
      box-sizing: border-box;
      padding: 20px 40px 34px;
    }
    table{
      table-layout:fixed;
      word-break:break-all;
    }
    .test-world{
      width: 100%;
      height: 60px;
      line-height: 60px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow:ellipsis;
    }
    td{
      text-align: center;
      // word-wrap: break-word;
      overflow: hidden;
      white-space: nowrap;
      text-overflow:ellipsis;
    }
    .shadow{
      width: 100%;
      border-bottom: 4px solid #f6f6f6;
    }
    footer{
      padding: 10px 0;
      p{
        width: 98px;
        height: 33px;
        line-height: 33px;
        text-align: center;
        border: 1px solid #437ff9;
        border-radius: 4px;
        cursor: pointer;
      }
    }
    input,textarea{
      border: 1px solid #cccccc;
      border-radius: 4px;
      text-indent: 6px;
    }
  }
</style>

