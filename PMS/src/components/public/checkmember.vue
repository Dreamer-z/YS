<template>
  <div class="stay-money">
    <div class="contain">
      <header class="clearfix">
        <p class="fl">选择会员</p>
				<span @click="setNone" class="fr spa">×</span>
      </header>
      <div class="text">
        <p style="text-align:right;">
          <span>操作员：{{curUser.name}}</span>
        </p>
        <div style="marginBottom: 10px;">
          <!-- <input placeholder="输入身份证号/手机号" style="width: 472px;height: 28px;marginBottom: 10px;" class="middle" type="text"> -->
          <el-input style="width: 472px;height:28px;" size="small" type="text" placeholder="输入身份证号/手机号"></el-input>
          <!-- <p style="width:60px;height:30px;background:#437ff9;lineHeight:30px;textAlign:center;marginBottom: 10px;marginLeft:12px;borderRadius: 4px;color:#fff;cursor:pointer;" class="middle">
            <span>搜索</span>
          </p> -->
          <el-button size="small">搜索</el-button>
        </div>
        <table style="border-color:#e6e6e6;" border="0">
          <tbody>
            <tr style="background: #f2f2f2;border:1px solid #e6e6e6;">
              <td style="width: 56px;">
                <!-- <div class="btn"></div> -->
              </td>
              <td style="height: 40px;" colspan="3">会员卡号</td>
              <td style="height: 40px;" colspan="2">会员等级</td>
              <td style="height: 40px;" colspan="3">会员姓名</td>
              <td style="height: 40px;" colspan="4">会员手机</td>
              <td style="height: 40px;" colspan="6">会员身份证</td>
            </tr>
            <tr style="border:1px solid #e6e6e6;" @click="setMemberIndex(index,item)" v-for="(item, index) in memberList" :key="index">
              <td style="width: 56px;">
                <!-- <div class="btn-box">
                  <nav :class="{'cg-bj': memberIndex == index}" class="box"></nav>
                </div> -->
                <el-checkbox :checked="memberIndex == index"></el-checkbox>
              </td>
              <td style="height: 40px;" colspan="3">{{item.card_number}}</td>
              <td style="height: 40px;" colspan="2">{{item.card_level}}</td>
              <td style="height: 40px;" colspan="3">{{item.name}}</td>
              <td style="height: 40px;" colspan="4">{{item.mobile}}</td>
              <td style="height: 40px;" colspan="6">{{item.idcard}}</td>
            </tr>
          </tbody>
        </table>
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
        <div style="width: 220px;margin:0 auto;" class="clearfix">
          <!-- <p @click="setNone" style="color: #437ff9;" class="fl">取消</p> -->
          <el-button style="width:100px;" @click="setNone">取消</el-button>
          <!-- <p @click="getMember" style="color:#fff;background: #437ff9;" class="fr">确定</p> -->
          <el-button type="primary" style="width:100px;" @click="getMember">确定</el-button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import API from "@/store/API"
import { mapGetters } from 'vuex'
  export default {
    name: 'checkMember',
    props: ['val'],
    data() {
      return {
        oneMember: {},
        memberIndex: -1,
        memberList: [],
        totalCount: 0,
        currentPage: 1,
        pageNum: 5
      }
    },
    methods: {
      getMember() {
        this.$emit('checkMemberNone', this.oneMember)
      },
      setMemberIndex(i,e) {
        this.memberIndex = i
        if (e.card_status_id === -1) {
          this.$alert('该会员卡已经被停用',{
            confirmButtonText: '确定',
            callback: ()=>{
            }
          })
          return
        }
        this.oneMember = {...e}
      },
      setNone() {
        this.$emit('checkMemberNone')
      },
      getMemberList(n) {
        API.get(`/pms/member?id=${this.hotel.id}&page=${n}&num=${this.pageNum}`).then(res => {
          if (res.error_code == 0) {
            // let arr = res.data.data
            // this.memberList = arr.filter((e) => {
            //   return e.card_status_id !== -1

            // })
            // console.log('007008',this.memberList)
            this.memberList = res.data.data
            this.totalCount = res.data.total_count
          } else {
          if (res.msg) {
            this.$message.error(`${res.msg}`)
          }
        }
        })
      },
      currentChange(n) {
        this.getMemberList(n)
      }
    },
    created() {
      this.getMemberList(1)
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
			width: 1000px;
			background: #fff;
      header{
        font-size: 14px;
				width: 100%;
				overflow: hidden;
				box-sizing: border-box;
				padding: 0 20px;
				line-height: 40px;
				background: #437ff9;
				color: #fff;
				.spa{
					font-size: 30px;
					cursor: pointer;
				}
			}
    }
    .text{
      box-sizing: border-box;
      padding: 20px 40px 16px;
    }
    .btn-box{
      line-height: 17px;
      .box{
        display: inline-block;
        width: 10px;
        height: 10px;
        border:1px solid #ccc;
        border-radius: 1px;
      }
      .cg-bj{
        background: #437ff9;
      }
    }
    .btn-box,.btn{
      width: 16px;
      height: 16px;
      border: 1px solid #ccc;
      border-radius: 1px;
      background: #fff;
      display: inline-block;
      position: relative;
    }
    table{
      table-layout:fixed;
      word-break:break-all;
    }
    td{
      text-align: center;
      height: 40px;
      // word-wrap: break-word;
      // overflow: hidden;
      // white-space: nowrap;
      // text-overflow:ellipsis;
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




