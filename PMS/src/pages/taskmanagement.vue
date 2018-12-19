<template>
  <div class="taskmanagement">
    <div ref="whitetext" class="whitetext">
      <clum-bread :redStar="false" :data="['当前位置','住客管理','住客详情']"></clum-bread>
      <div style="margin: 10px 0;" class="list">
        <p style="margin-right: 30px; color: #f7a947;" class="middle">查看类型：</p>
        <ul class="list-ul middle">
          <li v-for="(item, index) in memberTypeArr" :key="index"  class="list-ul-li middle">
            <div @click="setChoosedArr(item)" style="cursor: pointer;" class="middle">
              <div class="checkbox middle">
                <nav style="margin-left: -2px;font-size: 20px;font-weight: bold; color: #6a9df6;" :class="{'icon-gou' : choosedArr.includes(item)}" class="iconfont"></nav>
              </div>
              <span class="middle">{{item.name}}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="search">
        <ul>
          <li class="middle" style="margin-right: 36px;">
            <span>卡号：</span>
            <input v-model="searjson.idcard" type="text">
          </li>
          <li class="middle" style="margin-right: 36px;">
            <span>姓名：</span>
            <input v-model="searjson.name" type="text">
          </li>
          <li class="middle" style="margin-right: 36px;">
            <span>手机号：</span>
            <input v-model="searjson.mobile" type="text">
          </li>
          <li class="middle" style="margin-right: 36px;">
            <span>会员号：</span>
            <input v-model="searjson.card_number" type="text">
          </li>
          <li class="middle" style="margin-right: 36px;">
            <span>会员级别：</span>
            <el-select v-model="searjson.member_level_id" size="mini" filterable placeholder="请选择">
              <el-option
                v-for="item in memberLevelArr"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </li>
          <li @click="searMember(1)" class="last middle">搜索预订</li>
        </ul>
      </div>
      <div class="line"></div>
      <div class="member">
        <router-link to="/container/addMember" class="member-span middle active">新增会员</router-link>
        <!-- <span class="member-span middle">会员充值</span> -->
      </div>
      <div class="tab">
        <ul class="tab-head">
          <li class="one">序号</li>
          <li class="two">姓名</li>
          <li class="four">手机号码</li>
          <li class="two">证件类型</li>
          <li class="six">证件号码</li>
          <!-- <li class="two">累计充值</li>
          <li class="two">累计赠送</li>
          <li class="two">累计消费</li> -->
          <li class="two">是否会员</li>
          <li class="two">卡号</li>
          <li class="two">等级</li>
          <!-- <li class="two">余额</li> -->
          <li class="six">操作</li>
        </ul>
        <ul v-for="(item, index) in memberListArr" :key="index" class="tab-body">
          <li class="one">{{index + 1}}</li>
          <li class="two">{{item.name}}</li>
          <li class="four">{{item.mobile}}</li>
          <li class="two">{{item.certificate_type}}</li>
          <li class="six">{{item.idcard}}</li>
          <!-- <li class="two"></li>
          <li class="two"></li>
          <li class="two"></li> -->
          <li class="two">{{item.type?'是':'否'}}</li>
          <li class="two">{{item.card?item.card.number:''}}</li>
          <li class="two">{{item.card?item.card.level_name:''}}</li>
          <!-- <li class="two"></li> -->
          <li style="color: #6a9df6;" class="six">
            <p class="middle">
              <span @click="viewTheDetails(item)" style="cursor: pointer;" class="middle">查看详情</span>
              <span @click="editDetails(item)" style="margin: 0 28px;cursor: pointer;" class="middle">编辑</span>
              <span @click="beMember(item)" v-show="!item.type" style="cursor: pointer;" class="middle">转会员</span>
            </p>
          </li>
        </ul>
      </div>
      <div style="text-align: center; margin-top: 100px;">
        <el-pagination
          @current-change="currentChange"
          @prev-click="currentChange"
          @next-click="currentChange"
          :page-size="10"
          :current-page="currentPage"
          layout="prev, pager, next"
          :total="totalCount">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import API from "@/store/API"
import clumBread from "@/components/public/clumbread"
// let loc = window.localStorage
// let _Array = ['memberDetailsEdit','ordinaryDetailsEdit','memberDetails','ordinaryDetails']
  export default{
    name: 'taskManagement',
    data() {
      return {
        isSearch: false,
        totalCount: 1,    //  总条目数   后台传来
        currentPage: 1,   //  当前的页码   搜索的时候变为1
        searjson: {
          name: '',
          idcard: '',
          mobile: '',
          member_level_id: '',
          card_number: ''
        },
        choosedArr: [],
        memberListArr: [],
        memberTypeArr: [],
        memberLevelArr: [],
        memberLevel: ''
      }
    },
    computed:{
      ...mapGetters({
        hotel:'currHotel'
      })
    },
    methods: {
      currentChange(num) {
        if(this.isSearch) {
         this.listCheckTable(num)  // 后台的分页还没有做完  所以没
        } else {
         API.get(`/pms/member?id=${this.hotel.id}&page=${num}&num=10`).then(res=>{
            // console.log('121311323123132131231321',res)
            if(res.error_code == 0) {
              // this.memberListArr =
              this.memberListArr = res.data.data
              this.totalCount = res.data.total_count
            }
          })
        }
      },
      searMember(num) {
        if (this.choosedArr.length) {
          switch (this.choosedArr[0].id) {
            case 3:
              this.searjson.type = 0
              break;
            case 2:
              this.searjson.type = 1
              break;
            case 1:
              this.searjson.type = 2
              break;
            default:
              if (typeof this.searjson.type != 'undefined') {
                delete this.searjson['type']
              }
              break;
          }
        }
        this.currentPage = num
        this.isSearch = true
        this.searjson.hotel_id = this.hotel.id
        API.searMember(this.searjson).then(res=>{
          // console.log('010101010101',res)
          if (res.error_code == 0) {
            this.memberListArr = res.data.data
            this.totalCount = res.data.total_count
          } else {
            if (res.msg) {
              this.$message({
                message: `${res.msg}`,
                type: 'warning'
              })
            }
          }
        })
      },
      beMember(e) {
        this.$router.push({
            path: '/container/routeraddmember',
            query: e
        })
      },
      setChoosedArr(e) {
        if (this.choosedArr.includes(e)) {
          let a = this.choosedArr.indexOf(e)
          this.choosedArr.splice(a,1)
        } else {
          let a = this.choosedArr.indexOf(e)
          this.choosedArr.splice(a,1)
          this.choosedArr.push(e)
        }
      },
      editDetails(e) {
        if(e.type) {
          this.$router.push({
              path: '/containerwhite/memberdetailsedit',
              query: {mes: e}
          })
        }else{
          this.$router.push({
              path: '/containerwhite/ordinarydetailsedit',
              query: {mes: e}
          })
        }
      },
      viewTheDetails(e) {
        if(e.type) {
          this.$router.push({
              path: '/containerwhite/memberdetails',
              query: {mes: e}
          })
        }else{
          this.$router.push({
              path: '/containerwhite/ordinarydetails',
              query: {mes: e}
          })
        }
      },
      getMemberType() {
        API.getMemberType().then(res=>{
          if (res.error_code == 0) {
            this.memberTypeArr = res.data
          }
        })
      },
      getMemberList() {
        // API.getMemberList(this.hotel.id).then(res=>{
        API.get(`/pms/member?id=${this.hotel.id}&page=1&num=10`).then(res => {
          if(res.error_code == 0) {
            this.memberListArr = res.data.data
            this.totalCount = res.data.total_count
          }
        })
      },
      getMemberLevel() {
        API.getMemberLevel(this.hotel.id).then(res=>{
          if(res.error_code == 0) {
            let arr = res.data
            arr.forEach((e,i)=>{
              this.memberLevelArr.push({
                name: e.name,
                id: e.id
              })
            })
            this.memberLevelArr.push({
              name: '非会员',
              id: 0
            })
          }
        })
      }
    },
    mounted() {
    },
    created() {
      this.getMemberList()
      this.getMemberType()
      this.getMemberLevel()
    },
    components: {
      clumBread
    }
  }
</script>

<style lang="scss" scoped>
  .taskmanagement{
    padding-top: 50px;
    font-size: 14px;
    background: #f2f2f2;
    position: relative;
    input{
      border: 1px solid #ccc;
      border-radius: 2px;
      width: 178px;
      height: 26px;
      text-indent: 4px;
    }
    .whitetext{
      width: 100%;
      box-sizing: border-box;
      padding-left: 250px;
      padding-top: 10px;
      background: #fff;
      padding-right: 50px;
    }
    .list-ul{
      width: 93%;
      .list-ul-li{
        margin-right: 46px;
      }
      .checkbox{
        width: 18px;
        height: 18px;
        border: 1px solid #e5e5e5;
        border-radius: 2px;
        box-sizing: border-box;
      }
    }
    .last{
      width: 100px;
      height: 28px;
      background: #437ff9;
      color: #fff;
      cursor: pointer;
      line-height: 28px;
      text-align: center;
      border-radius: 3px;
    }
    .line{
      width: 100%;
      margin-top: 20px;
      border-top: 1px solid #ccc;
    }
    .member{
      margin-top: 20px;
      margin-bottom: 10px;
    }
    .member-span{
      width: 98px;
      height: 28px;
      line-height: 28px;
      text-align: center;
      border: 1px solid #6a9df6;
      border-radius: 4px;
      color: #6a9df6;
      margin-right: 10px;
    }
    .active{
      background: #6a9df6;
      color: #fff;
    }
    .tab-head{
      background: #4b5967;
      color: #fff;
    }
    .tab-body{
      background: #fff;
    }
    .tab-head,.tab-body{
      border-left: 1px solid #a9bfd6;
      li{
        height: 54px;
        line-height: 54px;
        text-align: center;
        border-right: 1px solid #a9bfd6;
        border-bottom: 1px solid #a9bfd6;
      }
      display: flex;
      .one{
        flex: 1;
      }
      .two{
        flex: 2;
      }
      .four{
        flex: 4;
      }
      .six{
        flex: 6;
      }
    }
  }
</style>