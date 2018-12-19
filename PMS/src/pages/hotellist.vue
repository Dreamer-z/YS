<template>
  <div class="choice">
    <header>
      <img class="middle" src="../assets/images/ys.png" alt=""/>
      <p style="fontSize: 24px; color:#333;" class="middle">云宿智能酒店管理系统</p>
    </header>
    <footer style="marginBottom:5px;" v-if="user.is_admin" @click="addHotel">
      <el-button size="mini" type="primary">创建酒店</el-button>
    </footer>
    <div class="contain">
      <div class="head clearfix">
        <p class="fl">请选择酒店</p>
        <router-link to="">
          <p @click="goBack" class="back fr">返回</p>
        </router-link>
      </div>
      <ul>
          <li class="hover" v-for="item in hotelList"   :key="item.id"  @click="go(item.id)">
            <div class="middle">
              <img v-bind:src="item.logo"  width="120" heigth="74" />
            </div>
            <nav class="middle">
              <p style="marginBottom:12px;marginTop:20px;">
                <span class="fontcolor">{{item.hotel_name}}</span>
              </p>
              <p style="color:#b2b2b2;">
                <span>{{item.address}}</span>
              </p>
            </nav>
          </li>
      </ul>
    </div>
  </div>
</template>

<script>
 import API from '@/store/API'
 import { mapGetters } from 'vuex'
	export default {
		name: 'hotelList',
		data() {
			return {
          hotelList :[]
			}
    }
    ,mounted:function () {
      var self = this 
      API.getHotelList().then(res=>{
          if(res.error_code != 0) return 
          self.hotelList = res.data
          self.$store.dispatch('setHotelList',self.hotelList)
          console.log(self.hotelList)
      })
    },
    computed:{
			...mapGetters({
				user:'user'
			})
		},
    methods:{
      goBack() {
        this.$router.back()
      },
      go:function(id){
          var self = this 
          this.hotelList.forEach((el,i)=>{
            if(el.id == id){
              document.title = el.hotel_name
              self.$store.dispatch('setCurrHotel',el)
            }
             
          })
          //this.$store.dispatch('setHotelList',this.hotelList)
          this.$router.push({path:'/layerContainer/newhello',param:{ ///container/fangtai
            id:id
          }})
      },
      addHotel:function(){
        this.$router.push({path:'/layerContainer/addhotel'})
      }
    }
	}
</script>

<style lang="scss" scoped>
  .choice{
    font-size: 12px;
    box-sizing: border-box;
    padding: 40px 50px;
    .middle{
      display: inline-block;
      vertical-align: middle;
    }
    .back{
      font-size: 16px;
      color: #6a9df6;      
      cursor: pointer;
    }
    .hover:hover{
      background: #f0f9fe;
    }
    ul{
      width: 100%;
      .bj{
        background: #f0f5ff;
      }
      li{
        box-sizing: border-box;
        width: 100%;
        border: 1px solid #f2f2f2;
        border-top: none;
        padding: 0 20px;
        height: 100px;
        cursor: pointer;
        div{
          height: 76px;
          width: 152px;
          margin-top: 10px;
          margin-right: 20px;
          text-align: center;
          img{
            display: inline-block;
            height: 80px;
            width: 150px;
          }
        }
        .fontcolor{
          color: #00a8ff;
          font-size: 16px;
        }
      }
    }
    header{
      margin-bottom: 40px;;      
      img{
        margin-right: 10px;
      }
      h3{
        font-size: 28px;
      }
    }
    .head{
      width: 100%;
      height: 68px;
      line-height: 68px;
      background: #f2f2f2;
      box-sizing: border-box;
      padding: 0 20px;
      font-size: 22px;
    }
    footer{
      cursor: pointer;
      width: 100%;
      text-align: right;
      color: #6da0f7;
      p{
        margin-right: 10px;
      }
      span{
        font-size: 22px;
      }
    }
  }
</style>