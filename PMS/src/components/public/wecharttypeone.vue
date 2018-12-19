<template>
  <div class="stay-money">
    <div class="contain">
      <header class="clearfix">
        <p class="fl">设置房态</p>
				<span @click="setNone" class="fr spa">×</span>
      </header>
      <div class="text">
        <p style="text-align:right;">
          <span>操作员：{{curUser.name}}</span>
        </p>
        <p style="marginBottom: 20px;">
          <span style="width: 80px;" class="middle">房型名称：</span>
          <span>{{val.roomTypeName}}</span>
        </p>
        <p>
          <span style="width: 80px;" class="middle">日期：</span>
          <span>{{val.date}}</span>
        </p>
        <div class="line"></div>
        <div style="margin: 20px 0">
          <p class="middle" style="width: 80px;">
            <span>房态状态:</span>
          </p>
          <el-radio-group v-model="canReject">
            <el-radio style="width:60px;" :label="0">开启</el-radio>
            <el-radio style="width:60px;" :label="1">关闭</el-radio>
          </el-radio-group>
          <!-- <p @click="canReject = true" class="reject middle">
            <span :class="{'can-reject-border': canReject}" class="middle circular">
              <span :class="{'can-reject': canReject}" class="middle in-circular"></span>
            </span>
            <span class="middle">开启</span>
          </p>
          <p @click="setCan" class="reject middle">
            <span :class="{'can-reject-border': !canReject}" class="middle circular">
              <span :class="{'can-reject': !canReject}" class="middle in-circular"></span>
            </span>
            <span class="middle">关闭</span>
          </p> -->
        </div>
        <div v-show="!canReject" style="margin: 20px 0">
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
        <div v-show="!canReject && isInfinite == 1" style="marginBottom:20px;">
          <p class="middle" style="width: 80px;">
            <span>房数：</span>
          </p>
          <input v-model.lazy="roomNum" style="width: 396px;height:28px;" type="text">
        </div>
        <p v-if="isPriceWrong" style="color:red;textAlign:center;marginBottom:10px;">请输入正确的房数</p>
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
          <p @click="setNone" class="fl">关闭</p>
          <p @click="givePost" style="color:#fff;background: #437ff9;" class="fr">提交</p>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import API from "@/store/API"
import { mapGetters } from 'vuex'
  export default {
    name: 'wechartTypeOne',
    props: ['val'],
    data() {
      return {
        isInfinite: 0, //0无限1有限
        canReject: 0,  //0开启1关闭
        isPriceWrong: false,
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < (Date.now() - 24*60*60*1000)  //Date.now()
          }
        },
        startDateTime: '',
        endDateTime: '',
        roomTypes: [],
        remark: '',
        listArr: [],
        onece: true,
        roomNum: ''
      }
    },
    watch: {
      roomNum(newval) {
        if (this.roomNum === ''){return}
        // let num =  Number(newval)
        if (newval < 0) {
          this.$message.error('请填写正确的数值')
          this.roomNum = ''
          return
        }
        if (!isNaN(newval)) {
          this.isPriceWrong = false
          if (this.isInfinite == 0 && newval == 0) {
            return
          }
          if (newval < this.val.bookingNum) {
            
            this.$alert('不能填写小于已预定的数值', {
              confirmButtonText: '确定',
              callback: ()=>{
                this.roomNum = '' //this.val.roomNum
              }
            })
          }
        } else {
          this.isPriceWrong = true
        }
      }
    },
    methods: {
      // setCan() {
      //   // this.roomNum = 0
      //   this.canReject = false
      // },
      cheackDate(e) {
        if (!this.startDateTime.length) {
          return
        }
        if (!this.endDateTime.length) {
          return
        }
        let start = new Date(this.startDateTime).getTime()
        let end = new Date(this.endDateTime).getTime()
        if (end < start) {
          this.$alert(`请选择正确的结束时间`, '', {
            confirmButtonText: '确定',
            callback: ()=>{
              this.endDateTime = ''
            }
          })
        }
      },
      givePost() {
        if (this.isInfinite === 1 && this.roomNum <= 0 && this.canReject) {
          this.$message.error('请填写正确的数值')
          return
        }
        if (!this.onece) {
          return
        }
        this.onece = false
        this.onece = false
        this.roomNum = this.isInfinite === 0?0:Number(this.roomNum)
        let obj = {
          id: this.hotel.id,
          start: this.val.date,
          end: this.val.date,
          roomTypeIds: [{id:this.val.roomTypeId,num:this.roomNum}],
          isClose: this.canReject,//?0:1,
          remark: this.remark
        }
        API.post("/pms/num/create", obj).then(res => {
          if (res.error_code == 0) {
            if (!this.canReject) {
              this.val.isClose = 1
              this.$emit('doubleNone',this.val)
            } else {
              this.val.isClose = 0
              this.val.roomNum = this.roomNum
              this.$emit('doubleNone',this.val)
            }
          } else {
            this.onece = true
            if (res.msg) {
              this.$message.error(`${res.msg}`)
            }
          }
        })
      },
      setNone() {
        this.$emit('doubleNone')
      }
    },
    created() {
      console.log(this.val)
      this.roomNum = this.val.roomNum ==0?'':this.val.roomNum
      this.isInfinite = this.val.roomNum ==0?0:1
      this.val.isClose === 1? this.canReject = 1:this.canReject = 0
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
			width:550px;
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
    .line{
      border-bottom: 1px solid #f2f2f2;
      margin-top: 20px;
    }
    .text{
      box-sizing: border-box;
      padding: 20px 50px 34px;
      max-height: 400px;
      overflow-y: auto;
    }
    .remark{
      width: 394px;
      height: 98px;
    }
    .reject{
      width: 100px;
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

