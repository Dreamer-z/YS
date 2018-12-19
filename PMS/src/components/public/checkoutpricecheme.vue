<template>
  <div class="stay-money">
    <div class="contain">
      <header class="clearfix">
        <p class="fl">批量设置价格</p>
				<span @click="setNone" class="fr spa">×</span>
      </header>
      <div class="text">
        <p style="text-align:right;">
          <span>操作员：{{curUser.name}}</span>
        </p>
        <div>
          <p class="middle" style="width: 108px;">
            <span style="color:red;">*</span>
            <span>日期范围：</span>
          </p>
          <el-date-picker style="width:396px;"
             placeholder="选择日期" size="mini"
              type="daterange" range-separator="至" 
              :picker-options="pickerOptions" 
              value-format="yyyy-MM-dd" 
              v-model="dateTimes"></el-date-picker>
          <!-- <el-date-picker
            size="small"
            @change="cheackDate"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd"
            v-model="startDateTime"
            type="date"
            placeholder="选择日期时间">
          </el-date-picker>
          <span style="margin: 0 4px;">至</span>
          <el-date-picker
            @change="cheackDate"
            size="small"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd"
            v-model="endDateTime"
            type="date"
            placeholder="选择日期时间">
          </el-date-picker> -->
        </div>
        <div style="margin: 10px 0;">
          <p  class="middle" style="width: 108px;">
            <span style="color: red;">*</span>
            <span>客户类型：</span>
          </p>
          <p @click="setTypeListIndex(index,item.type)" :class="[typeListIndex == index?'cg-bj':'']" v-for="(item, index) in typeList" :key="index" style="margin-right: 10px;cursor:pointer;" class="middle peolist">{{item.name}}</p>
        </div>
        <div v-if="isMember" style="margin-bottom: 10px;">
          <p class="middle" style="width: 108px;">
            <span style="color:red;">*</span>
            <span>会员类型：</span>
          </p>
          <el-select style="width: 400px" v-model="members" size="small" multiple placeholder="请选择">
            <el-option
              v-for="item in memberArr"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div>
          <p class="middle" style="width: 108px;">
            <span style="color:red;">*</span>
            <span>选择房型：</span>
          </p>
          <el-select style="width: 400px" v-model="roomTypes" size="small" multiple placeholder="请选择">
            <el-option
              v-for="item in roomTyeArr"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div style="display:flex;margin: 20px 0;">
          <p style="width: 112px;margin-top: 10px;">
            <span style="color:red;">*</span>
            <span>设置价格：</span>
          </p>
          <div style="flex:1;border:1px solid #e5e5e5;borderBottom:none;">
            <table style="border-color:#f2f2f2;" border="0">
              <tbody>
                <tr style="background: #f2f2f2;borderBottom:1px solid #e5e5e5;">
                  <td>房型名称</td>
                  <td>设置方式</td>
                  <td>具体价格（元）</td>
                </tr>
                <tr style="borderBottom:1px solid #e5e5e5;" v-for="(item,index) in listArr" :key="index">
                  <td>{{item.name}}</td>
                  <td>固定方式</td>
                  <td>
                    <input v-model="item.price" style="height:28px;width:200px;textAlign:center;" type="text">
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p v-if="isPriceWrong" style="color:red;textAlign:center;marginBottom:10px;">请输入正确的价格</p>
        <div>
          <p style="width: 108px;margin-top: 10px;display:inline-block;vertical-align:top">
            <span style="margin-left: 9px;">设置说明：</span>
          </p>
          <!-- <textarea v-model="remark" class="remark"></textarea> -->
          <el-input :autosize="{ minRows: 5}" style="width:396px;" v-model="remark" type="textarea"></el-input>
        </div>
      </div>
      <nav class="shadow"></nav>
      <footer>
        <div style="width: 220px;margin:0 auto;" class="clearfix">
          <!-- <p @click="setNone" class="fl">关闭</p>
          <p @click="givePost" style="color:#fff;background: #437ff9;" class="fr">提交</p> -->
          <el-button style="width:100px;" @click="setNone">关闭</el-button>
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
    name: 'checkoutPriceCheme',
    props: ['val', 'typeList'],
    data() {
      return {
        dateTimes: [],
        isPriceWrong: false,
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < (Date.now() - 24*60*60*1000)  //Date.now()
          }
        },
        peoType: '',
        isMember: false,
        typeListIndex: 0,
        memberArr: [],
        roomTyeArr: [],
        startDateTime: '',
        endDateTime: '',
        roomTypes: [],
        members: [],
        listArr: [],
        remark: '',
        onece: true
      }
    },
    watch: {
      'listArr': {
        handler:function(newval) {
            let arr = []
        newval.forEach(e => {
          if (!isNaN(e.price)) {
            arr.push(e)
          }
        })
        if (arr.length == newval.length) {
          this.isPriceWrong = false
        } else {
          this.isPriceWrong = true
        }
        console.log(newval)
        },
        deep: true
      },
      roomTypes(newval) {
        let arr = []
        newval.forEach(e =>{
          this.roomTyeArr.forEach(v => {
            if (v.id == e) {
              arr.push({...v})
            }
          })
        })
        this.listArr = arr
        arr = null
      }
    },
    methods: {
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
        if (!this.dateTimes.length) {
          this.$message.error('请选择日期时间')
          return
        }
        if (!this.onece){return}
        this.onece = false
        let obj = { 
          hotelId: this.hotel.id, 
          userType: this.peoType,
          start: this.dateTimes[0], 
          end: this.dateTimes[1], 
          roomTypeIds: this.listArr, 
          memberIds: this.members,
          remark: this.remark 
        }
        API.post("/pms/price/create", obj).then(res => {
          if (res.error_code == 0) {
            this.$message({
              message: '设置成功',
              type: 'success'
            })
            this.$emit('checkoutNone', 'hahahahahhaahah')
          } else {
            this.onece = false
            if (res.msg) {
              this.$message.error(`${res.msg}`)
              // this.$alert(`${res.msg}`, '', {
              //   confirmButtonText: '确定',
              //   callback: ()=>{
              //     this.$emit('checkoutNone')
              //   }
              // })
            }
          }
        })
      },
      setTypeListIndex(i,type) {
        this.typeListIndex = i
        switch(type) {
          case 0:
            this.isMember = false
            this.peoType = type
            break;
          case 1:
            this.isMember = true
            this.peoType = type
            break;
        }
      },
      setNone() {
        this.$emit('checkoutNone')
      }
    },
    created() {
      this.peoType = this.typeList[0].type
      API.get("/pms/price/member?id=" + this.hotel.id).then(res => {
        if (res.error_code == 0) {
          this.roomTyeArr = res.data.roomTypes
          this.memberArr = res.data.members
        }
      })
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
			width: 950px;
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
      padding: 20px 40px 24px;
      max-height: 400px;
      overflow-y: auto;
    }
    .peolist{
      height: 30px;
      line-height: 30px;
      text-align: center;
      padding: 0 16px;
      background: #e6e6e6;
    }
    p.cg-bj{
      background: #fcdc6d;
    }
    .remark{
      width: 394px;
      height: 98px;
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

