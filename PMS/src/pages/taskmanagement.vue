<template>
  <div class="taskmanagement">
    <div ref="whitetext" class="whitetext">
      <clum-bread :redStar="false" :data="['当前位置','住客管理','住客详情']"></clum-bread>
      <div style="margin: 10px 0;" class="list">
        <p style="margin-right: 30px; color: #f7a947;" class="middle">查看类型：</p>
        <ul class="list-ul middle">
          <li v-for="(item, index) in memberTypeArr" class="list-ul-li middle">
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
          <li @click="searMember" class="last middle">搜索预订</li>
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
        <ul v-for="(item, index) in memberListArr" class="tab-body">
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
    beforeRouteLeave(to, from, next){
        // let pageY = window.pageYOffset ||document.documentElement.scrollTop || document.body.scrollTop
        let pageY = document.documentElement.scrollTop
        console.log('?><??><><???><>0',pageY)
        let _Array = ['memberDetailsEdit','ordinaryDetailsEdit','memberDetails','ordinaryDetails']
        if (_Array.includes(to.name)) {
          sessionStorage.setItem('barCoordinate', pageY)
        } else {
          sessionStorage.removeItem('barCoordinate')
        }
        next()
    },
    computed:{
      ...mapGetters({
        hotel:'currHotel'
      })
    },
    methods: {
      searMember() {
        this.searjson.hotel_id = this.hotel.id
        API.searMember(this.searjson).then(res=>{
          // console.log(res)
          if (res.error_code == 0) {
            this.memberListArr = res.data
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
        API.getMemberList(this.hotel.id).then(res=>{
          if(res.error_code == 0) {
            this.memberListArr = res.data
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
      setTimeout(()=>{
        window.scrollTo(0,150)
        // this.$refs.whitetext.scrollTo(0,150)
        console.log('barCoordinate')
      },20)
      // this.$nextTick().then(()=>{
      //   window.scrollTo(0,150)
      //   // this.$refs.whitetext.scrollTo(0,150)
      //   console.log('barCoordinate')
      // })
      // let barCoordinate = sessionStorage.getItem('barCoordinate')
      // if (barCoordinate != null) {
      //   // this.$nextTick().then(()=>{
      //   //   document.documentElement.scrollTop = barCoordinate + 'px'
      //   // })
      //   // document.documentElement.scrollTop = barCoordinate
      //   // this.$nextTick(()=>{
      //   //   document.documentElement.scrollTop = barCoordinate
      //   // })
      // }
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