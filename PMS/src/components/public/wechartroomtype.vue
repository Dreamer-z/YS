<template>
  <div class="stay-money">
    <div class="contain">
      <header class="clearfix">
        <p class="fl">批量设置房态</p>
				<span @click="setNone" class="fr spa">×</span>
      </header>
      <div class="text">
        <p style="text-align:right;">
          <span>操作员：{{curUser.name}}</span>
        </p>
        <div style="marginTop: 16px">
          <p class="middle" style="width:80px;">
            <span>日期范围：</span>
          </p>
          <el-date-picker style="width:396px;" placeholder="选择日期" size="mini" type="daterange" 
          range-separator="至" :picker-options="pickerOptions" value-format="yyyy-MM-dd" v-model="dateTimes"></el-date-picker>
        </div>
        <div style="margin: 20px 0">
          <p class="middle" style="width: 80px;">
            <span>房态状态:</span>
          </p>
          <el-radio-group v-model="canReject">
            <el-radio style="width:60px;" :label="0">开启</el-radio>
            <el-radio style="width:60px;" :label="1">关闭</el-radio>
          </el-radio-group>
          <!-- <p @click="canReject = true" class="reject middle"> -->
            <!-- <span :class="{'can-reject-border': canReject}" class="middle circular">
              <span :class="{'can-reject': canReject}" class="middle in-circular"></span>
            </span>
            <span class="middle">开启</span> -->
            <!-- <el-radio v-model="canReject" label="1">开启</el-radio> -->
          <!-- </p> -->
          <!-- <p @click="canReject = false" class="reject middle"> -->
            <!-- <span :class="{'can-reject-border': !canReject}" class="middle circular">
              <span :class="{'can-reject': !canReject}" class="middle in-circular"></span>
            </span>
            <span class="middle">关闭</span> -->
            <!-- <el-radio v-model="canReject" label="1">关闭</el-radio> -->
          <!-- </p> -->
        </div>
        <div v-if="!canReject" style="margin: 20px 0">
          <p class="middle" style="width: 80px;">
            <span>房量设置:</span>
          </p>
          <el-radio-group v-model="isInfinite">
            <el-radio style="width:60px;" :label="0">无限量</el-radio>
            <el-radio style="width:60px;" :label="1">限量</el-radio>
          </el-radio-group>
          <!-- <p @click="isInfinite = 0" class="reject middle">
            <span :class="{'can-reject-border': isInfinite === 0}" class="middle circular">
              <span :class="{'can-reject': isInfinite === 0}" class="middle in-circular"></span>
            </span>
            <span class="middle">无限量</span>
          </p>
          <p @click="isInfinite = 1" class="reject middle">
            <span :class="{'can-reject-border': isInfinite === 1}" class="middle circular">
              <span :class="{'can-reject': isInfinite === 1}" class="middle in-circular"></span>
            </span>
            <span class="middle">限量</span>
          </p> -->
        </div>
        <div style="marginBottom:20px;">
          <p class="middle" style="width: 80px;">
            <span>选择房型：</span>
          </p>
          <el-select style="width: 396px" v-model="roomTypes" size="small" multiple placeholder="请选择">
            <el-option
              v-for="item in typeArr"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div v-if="listArr.length && !canReject && isInfinite === 1" style="margin: 20px 0;">
          <p style="width: 112px;marginBottom:10px;">
            <span>设置房数：</span>
          </p>
          <div style="border:1px solid #e5e5e5;borderBottom:none;">
            <table style="border-color:#f2f2f2;" border="0">
              <tbody>
                <tr style="background: #f2f2f2;borderBottom:1px solid #e5e5e5;">
                  <td>房型名称</td>
                  <td>房数</td>
                </tr>
                <tr style="borderBottom:1px solid #e5e5e5;" v-for="(item,index) in listArr" :key="index">
                  <td>{{item.name}}</td>
                  <td>
                    <input v-model="item.num" style="height:28px;width:200px;textAlign:center;" type="text">
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p v-if="isPriceWrong" style="color:red;textAlign:center;marginBottom:10px;">请输入小于1000正确的房数</p>
        <div>
          <p style="width: 80px;margin-top: 10px;display:inline-block;vertical-align:top">
            <span>设置说明：</span>
          </p>
          <textarea v-model="remark" class="remark"></textarea>
        </div>
      </div>
      <nav class="shadow"></nav>
      <footer>
        <div style="width: 220px;margin:0 auto;" class="clearfix">
          <!-- <p @click="setNone" class="fl">关闭</p> -->
          <el-button style="width:100px;" @click="setNone">关闭</el-button>
          <!-- <p @click="givePost" style="color:#fff;background: #437ff9;" class="fr">提交</p> -->
          <el-button style="width:100px;" type="primary" @click="givePost">提交</el-button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import API from "@/store/API"
import { mapGetters } from 'vuex'
  export default {
    name: 'wechartRoomType',
    props: ['typeArr'],
    data() {
      return {
        dateTimes: [],
        isInfinite: 0, //0无限1有限
        canReject: 0,  //0开启1关闭
        isPriceWrong: false,
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > (Date.now() - 24*60*60*1000)  //Date.now()
          }
        },
        startDateTime: '',
        endDateTime: '',
        roomTypes: [],
        remark: '',
        listArr: [],
        onece: true
      }
    },
    watch: {
      'listArr': {
        handler:function(newval) {
         
           const isInteger= (obj)=>{
              return typeof obj === 'number' && obj%1 === 0;      //是整数，则返回true，否则返回false
          }
          newval.forEach(e => {
            if(e.num === '') return 
            let num = Number(e.num)
             if (isNaN(num)) {
                this.isPriceWrong = true
                return 
              }
              if(!isInteger(num) || num <= 0 || num > 999){
                this.isPriceWrong = true
                return
              }
              this.isPriceWrong = false
              /*
            if (e.num.toString().indexOf('.') == -1 && e.num < 1000 && 0 < e.num) {
              if (!isNaN(e.num)) {
                arr.push(e)
              }
            }
            */
          })
          /*
          if (arr.length == newval.length) {
            this.isPriceWrong = false
          } else {
            this.isPriceWrong = true
          }
          */
          
        },
        deep: true
      },
      roomTypes(newval) {
        let arr = []
        newval.forEach(e =>{
          this.typeArr.forEach(v => {
            if (v.id == e) {
              arr.push(Object.assign({...v},{num:''}))
            }
          })
        })
        this.listArr = arr
        arr = null
      }
    },
    methods: {
      // cheackDate(e) {
      //   if (!this.dateTimes.length) {
      //     return
      //   }
      //   let start = new Date(this.startDateTime).getTime()
      //   let end = new Date(this.endDateTime).getTime()
      //   if (end < start) {
      //     this.$alert(`请选择正确的结束时间`, '', {
      //       confirmButtonText: '确定',
      //       callback: ()=>{
      //         this.endDateTime = ''
      //       }
      //     })
      //   }
      // },
      givePost() {
        if (!this.dateTimes.length) {
          this.$message.error('请选择正确的时间')
          return
        }
        if (!this.onece) {
          return
        }
        // this.onece = false
        let arr = []
        let isOk = true
        if (this.isInfinite === 1) {
          this.listArr.forEach(e => {
            if (e.num === '') {
              this.$message.error('请输入正确的房间数量')
              isOk = false
              return
            }
            arr.push({
              id: e.id,
              num: Number(e.num)
            })
          })
        } else {
          this.listArr.forEach(e => {
            arr.push({
              id: e.id,
              num: 0
            })
          })
        }
        if (!isOk) {
          return
        }
        this.onece = false
        let obj = {
          id: this.hotel.id,
          start: this.dateTimes[0],
          end: this.dateTimes[1],
          roomTypeIds: arr,
          isClose: this.canReject,//?0:1,
          remark: this.remark
        }
        // console.log(obj)
        // return
        API.post("/pms/num/create", obj).then(res => {
          if (res.error_code == 0) {
            this.$emit('checkoutNone','hahhahahah')
          } else {
            this.onece = true
            if (res.msg) {
              this.$message.error(`${res.msg}`)
            }
          }
        })
      },
      setNone() {
        this.$emit('checkoutNone')
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
			width: 550px;
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
    table{
      table-layout:fixed;
      word-break:break-all;
    }
    td{
      height: 40px;
      text-align: center;
      word-wrap: break-word;
      // overflow: hidden;
      // white-space: nowrap;
      // text-overflow:ellipsis;
    }
    .text{
      box-sizing: border-box;
      padding: 20px 40px 15px;
      max-height: 400px;
      overflow-y: auto;
    }
    .remark{
      width: 394px;
      height: 98px;
    }
    .reject{
      width: 82px;
      .circular{
        width: 18px;height: 18px;
        line-height: 16px;
        text-align: center;
        border: 1px solid #d3d3d3;
        border-radius: 50%;
      }
      .in-circular{
        width: 10px;height: 10px;
        border-radius: 50%;
        background: #d3d3d3;
      }
      .rule-time{
        margin-left: 150px;
        margin-top:12px;
      }
      .can-reject{
        background: #437ff9;
      }
      .can-reject-border{
        border-color: #437ff9;
      }
    }
    .shadow{
      padding-top:10px;
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

