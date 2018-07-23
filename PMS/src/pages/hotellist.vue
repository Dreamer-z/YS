<template>
  <div class="choice">
    <header>
      <img class="middle" src="../assets/images/ys.png" alt=""/>
      <h3 class="middle">云宿智能酒店管理系统</h3>
    </header>
    <div class="contain">
      <div class="head clearfix">
        <p class="fl">请选择酒店</p>
        <router-link to="">
          <p @click="goBack" class="back fr">返回</p>
        </router-link>
      </div>
      <ul>
          <li v-for="item in hotelList"   :key="item.id"  @click="go(item.id)">
            <div class="middle">
              <img v-bind:src="item.logo"  width="120" heigth="74" />
            </div>
            <p class="middle">
              <span>{{item.address}}</span><span class="fontcolor">{{item.hotel_name}}</span>
            </p>
          </li>
      </ul>
      <footer @click="addHotel">
        <p class="middle">创建酒店</p>
        <span class="middle">＋</span>
      </footer>
    </div>
  </div>
</template>

<script>
 import API from '@/store/API'

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
    methods:{
      goBack() {
        this.$router.back()
      },
      go:function(id){
          var self = this 
          this.hotelList.forEach((el,i)=>{
            if(el.id == id){
                self.$store.dispatch('setCurrHotel',el)
            }
             
          })
          //this.$store.dispatch('setHotelList',this.hotelList)
          this.$router.push({path:'/container/fangtai',param:{
            id:id
          }})
      },
      addHotel:function(){
        this.$router.push({path:'/container/addhotel'})
      }
    }
	}
</script>

<style lang="scss" scoped>
  .choice{
    box-sizing: border-box;
    padding: 2%;
    .middle{
      display: inline-block;
      vertical-align: middle;
    }
    .back{
      font-size: 16px;
      color: #6a9df6;      
      cursor: pointer;
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
        font-size: 16px;
        cursor: pointer;
        div{
          height: 76px;
          width: 152px;
          margin-top: 13px;
          margin-right: 20px;
          text-align: center;
          img{
            display: inline-block;
            height: 70px;
            width: 150px;
          }
        }
        .fontcolor{
          color: #6a9df6;
        }
      }
    }
    header{
      margin-bottom: 3%;      
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