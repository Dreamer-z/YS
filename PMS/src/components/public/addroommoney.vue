<template>
  <div class="stay-money">
    <div class="contain">
      <header class="clearfix">
        <p class="fl">添加房费</p>
				<span @click="letAddRoomManeyNOne" class="fr spa">×</span>
      </header>
      <div class="text">
        <div class="gray">
          <p style="textAlign:right;fontWeight:bold;">操作员：{{curUser.name}}</p>
          <div class="mg-b-22">
            <p class="middle gray-p-right">房型：</p>
            <p class="middle">豪华大床房</p>
          </div>
          <div class="mg-b-22">
            <p class="middle gray-p-right">房号：</p>
            <p class="middle">002</p>
          </div>
          <div class="mg-b-22">
            <p class="middle gray-p-right">入住人姓名：</p>
            <p class="middle">002</p>
          </div>
          <div class="mg-b-22">
            <p class="middle gray-p-right">入住方式：</p>
            <p style="cursor:pointer;" class="middle">
              <span class="middle">
                <span class="middle empty-circle">
                  <span class="middle real-circle real-circle-fill"></span>
                </span>
                <span>全日租</span>
              </span>
            </p>
            <p style="marginLeft:36px;cursor:pointer;" class="middle">
              <span class="middle">
                <span class="middle empty-circle">
                  <span class="middle real-circle real-circle-fill"></span>
                </span>
                <span>半日租</span>
              </span>
            </p>
            <p style="marginLeft:36px;cursor:pointer;" class="middle">
              <span class="middle">
                <span class="middle empty-circle">
                  <span class="middle real-circle real-circle-fill"></span>
                </span>
                <span>钟点房</span>
              </span>
            </p>
          </div>
          <div>
            <p class="middle gray-p-right">入住标准：</p>
            <p class="middle">002</p>
          </div>
        </div>
        <div class="white">
          <p style="marginLeft:30px;">
            <span style="fontWeight:bold;marginRight:22px;">房间费用：</span>
            <span style="color: #f4703c;">￥</span><span style="fontWeight:bold;fontSize:18px;color: #f4703c;">001</span>
          </p>
          <p style="marginLeft:15px;marginTop: 20px;marginBottom:10px;">
            <span style="color:red; marginRight: 8px;">*</span><span style="marginRight:24px;">实收金额：</span>
            <input v-model="receivable" style="width: 178px; height: 28px;border: 1px solid #e6e6e6;borderRadius: 4px;" type="text"><span>元</span>
          </p>
          <p style="marginLeft:15px;">
            <span style="color:red; marginRight: 8px;">*</span><span style="marginRight:24px;">支付方式：</span>
            <el-select v-model="payWay" style="width: 400px" size="small" filterable>
              <el-option v-for="item in [{id:1,name:'aaa'}]" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </p>
          <p style="margin: 10px 0 10px 26px;">
            <span style="marginRight:56px;">单号：</span>
            <input v-model="orderNum" style="width: 397px; height: 28px;border: 1px solid #e6e6e6;borderRadius: 4px;" type="text">
          </p>
          <div style="marginLeft: 26px;">
            <span class="middle" style="marginRight:56px;">备注：</span>
            <textarea v-model="payRemark" class="beizhu middle"></textarea>
          </div>
        </div>
      </div>
      <nav class="shadow"></nav>
      <footer>
        <div style="width: 220px;margin:0 auto;" class="clearfix">
          <p @click="letAddRoomManeyNOne" class="fl">取消</p>
          <p style="color:#fff;background: #437ff9;" class="fr">确定</p>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import API from "@/store/API"
import { mapGetters } from 'vuex'
  export default {
    name: 'addRoomMoney',
    props: ['val'],
    data() {
      return {
        payWayList: [],
        payWay: '',
        receivable: '',
        orderNum: '',
        payRemark: ''
      }
    },
    computed: {
			...mapGetters({
        hotel:'currHotel',
        curUser: 'user'
      })
    },
    methods: {
      letAddRoomManeyNOne() {
        this.$emit('letAddRoomManeyNOne')
      }
    },
    created() {
    }
  }
</script>

<style lang="scss" scoped>
  .stay-money{
    position: fixed;
		top: 0; left: 0; right: 0; bottom: 0;
		background: rgba(0,0,0,.4);
		font-size: 14px;
		z-index: 666;
    .contain{
			width: 600px;
			// max-height: 80%;
			// overflow-y: auto;
			position: absolute;
			background: #fff;
			top: 20%;
			left: 36%;
      header{
				width: 100%;
				overflow: hidden;
				box-sizing: border-box;
				padding: 0 16px;
				line-height: 40px;
				background: #437ff9;
				color: #fff;
				.spa{
					font-size: 30px;
					cursor: pointer;
				}
			}
    }
    .mg-b-22{
      margin-bottom: 22px;
    }
    .gray-p-right{
      width: 100px;
      font-weight: bold;
    }
    .text{
      box-sizing: border-box;
      padding: 16px 16px 0;
    }
    .gray{
      box-sizing: border-box;
      padding: 10px 30px 16px;
      background: #f0f0f0;
      .box-list{
        box-sizing: border-box;
        padding-top: 16px;
        padding-bottom: 10px; 
      }
      .box-list-border{
        border-bottom: 1px solid #808080
      }
    }
    .shadow{
      width: 100%;
      border-bottom: 4px solid #f6f6f6;
    }
    .white{
      box-sizing: border-box;
      padding: 20px 0px 16px;
      // font-size: 16px;
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
      text-indent: 6px;
    }
    .beizhu{
      width: 397px;
      height: 58px;
      border: 1px solid #e6e6e6;
      border-radius: 4px;
    }
    .empty-circle{
      width: 18px;height: 18px;
      line-height: 16px;
      text-align: center;
      border: 1px solid #b8b8b8;
      border-radius: 50%;
      .real-circle{
        width: 10px;height: 10px;
        border-radius: 50%;
      }
      .real-circle-fill{
        background: #437ff9;
      }
    }
  }
</style>

