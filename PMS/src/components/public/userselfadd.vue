<template>
  <div class="self-add">
    <ol class="clearfix">
      <li class="left">
        <p style="color: #6a9df6;">{{childpagename}}设施<span>*</span></p>
      </li>
      <!-- <li class="right" @click="centerDialogVisible = true">
        <img src="../../assets/images/add.png" alt=""/>
        <p>新增</p>
      </li> -->
    </ol>
    <div @click="centerDialogVisible = false" v-show="centerDialogVisible" class="dialog">
      <div @click.stop="" class="container">
        <header>{{childpagename}}设施</header>
        <section>
          <p>点击标签添加，可多选<i></i></p>
          <ul ref="lislength">
            <li :class="{'change-bj': isSelected(item.id)}" @click="select(item.id)" :id="item.id" :key="index" v-for="(item, index) in allFacs">
              <span style="vertical-align: middle;display: inline-block;"
               class="iconfont iconFontSize" :class="item.icon"></span>
              <p style="display: inline-block; vertical-align: middle;">{{item.name}}</p>
            </li>
          </ul>
          <!-- <button @click="checkedAll">一键全部添加</button> -->
          <el-button style="width:150px;" @click="checkedAll" type="primary">一键全部添加</el-button>
        </section>
        <div class="self-nav">
          <!-- <button class="dele" @click="centerDialogVisible = false">取消</button> -->
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <!-- <button class="arge" @click="save">确定</button> -->
          <el-button @click="centerDialogVisible = false" type="primary">确定</el-button>
        </div>
      </div>
    </div>
    <section>
      <ul>
        <li :key="index" v-for="(item, index) in userSelectFac ">
          <span class="iconfont iconFontSize middle" :class="item.icon" ></span>
          <div class="middle">{{item.name}}</div>
          <span @click="remove(item.id)" style="fontSize:14px;cursor: pointer;marginLeft:6px;" class="el-icon-close middle"></span>
          <!-- <nav @click="remove(item.id)" class="delete">×</nav> -->
        </li>
      </ul>
    </section>
    <nav style="marginTop:25px;color: #437ff9;cursor:pointer;" @click="centerDialogVisible = true">
      <!-- <img class="middle" src="../../assets/images/add.png" alt=""/> -->
      <p style="fontSize:14px;" class="middle el-icon-circle-plus-outline"></p>
      <p class="middle">新增</p>
    </nav>
  </div>
</template>

<script>
import API from "@/store/API"
  export default{
    name: 'userselfadd',
    data(){
      return {
        messageObj: {},
        addList: '',
        userDefine:[],
        centerDialogVisible: false
      }
    },
    props: ['childpagename', 'allFacs','userSelectFac'],
    methods:{
      isSelected(id){
        var find = false 
        this.userSelectFac.forEach((element,index) => {
          if(element.id == id){
            find = true
          }
        })
        return find
      },
      getSelectIndex(arr,id){
        var index = -1
        arr.forEach((element,i) => {
              if(element.id == id){
                index = i
              }
        })
        return index
      },
      remove(id){
         var index = this.getSelectIndex(this.userSelectFac,id)
          //console.log('--3--',index)
          this.userSelectFac.splice(index,1)
      },
      save() {
        this.centerDialogVisible = false;
        //this.$emit('messageFromUserSelfAdd', {'message': this.userSelectFac})
   
      },
      select(id){
        if(this.isSelected(id)){
          this.remove(id)
        }else{
          var index = this.getSelectIndex(this.allFacs,id)
          this.userSelectFac.push(this.allFacs[index])
        }
      }
        ,
      checkedAll(){
        var self = this 
        this.allFacs.forEach( function(element, index) {
           if(!self.isSelected(element.id))
              self.userSelectFac.push(element)
        });
        console.log(this.userSelectFac)
      },delCustom(index){

      },addUserFac(){

      }
    
    },
    created() {
      // API.get('/pms/facility').then(res =>{
      //   console.log(res.data)
      //   this.list = res.data;
      // })
    }
  }
</script>

<style lang="scss" scoped> 
::-webkit-input-placeholder { /* WebKit browsers */
    color:    #f2f2f2;
    }
    :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color:    #f2f2f2;
    }
    ::-moz-placeholder { /* Mozilla Firefox 19+ */
        color:    #f2f2f2;
    }
    :-ms-input-placeholder { /* Internet Explorer 10+ */
        color:    #f2f2f2;
    }
  .self-add{
    font-size: 12px;
    color:#333;
    .dialog{
      position: fixed;
      top: 0;left: 0; right: 0;bottom: 0;
      background: rgba(0,0,0,.3);
      z-index: 600;
      display: flex;
      align-items:center;/*垂直居中*/
      justify-content: center;/*水平居中*/
      .container{
        .change-bj{
          color: #437ff9;
          background:rgba(0, 168, 255, .06);
          border-color:rgba(0, 168, 255, .3);
        }
        position: absolute;
        width: 1000px;
        background: #fff;
        header{
          width: 100%;
          height: 60px;
          line-height: 60px;
          text-align: center;
          color: #fff;
          background: #437ff9;
        }
        section{
          box-sizing: border-box;
          padding: 0 32px;
          p{
            line-height: 68px;
          }
          ul{
            max-height: 240px;
            overflow-y: auto;
            li{
              position: relative;
              width: 120px;
              height: 38px;
              font-size: 12px;
              text-align: center;
              border-radius: 3px;
              margin-right: 14px;
              margin-bottom: 10px;
              background: #fff;
              border: 1px solid #e2e2e2;
              p{
                line-height: 38px;
                span{
                  margin-right: 18px;
                }
              }
            }
          }
          // button{
          //   width: 198px;
          //   height: 46px;
          //   border: 1px solid #e2e2e2;
          //   border-radius: 3px;
          //   background: #fff;
          //   outline: none;
          // }
          .self{
            p{
              line-height: 50px;
            }
            button{
              background:#6a9df6;
              width: 100px;
              margin-left: 20px;
              color: #fff;
            }
            input{
              width: 150px;
              height: 46px;
              line-height: 50px;
              box-sizing: border-box;
              padding-left: 10px;
              border: 1px solid #e2e2e2;
            }
          }
        }
        .self-nav{
          width: 220px;
          height: 50px;
          margin: 26px auto;
          .arge,.dele{
            width: 98px;
            height: 48px;
          }
          .dele{
            background: #fff;
            outline: none;
            border: 1px solid #6a9df6;
            color: #6a9df6;
          }
          .arge{
            background: #6a9df6;
            outline: none;
            border: 1px solid #6a9df6;
            color: #fff;
          }
        }
      }
    }
    overflow: hidden;
    ol{
      // height: 36px;
      // line-height: 36px;
      // line-height: 19px;
      .left{
        float: left;
        span{
          color: red;
          margin-left: 4px;
        }
      }
      .right{
        cursor: pointer;
        float: right;
        img{
          vertical-align:middle;
        }
        p{
          display: inline-block;
          vertical-align:middle;
        }
      }
    }
    section{
      box-sizing: border-box;
      background: #fff;
      ul{
        li{
          display: inline-block;
          text-align: center;
          width: 120px;
          height: 38px;
          border-radius: 3px;
          margin-right: 16px;
          margin-top: 20px;
          border:1px solid;
          color: #437ff9;
          background:rgba(0, 168, 255, .06);
          border-color:rgba(0, 168, 255, .3);
          img{
            vertical-align: middle;
            margin-right: 20px;
          }
          div{
            display: inline-block;
            vertical-align:middle;
            height:38px;
            line-height: 38px;
          }
        }
      }
    }
  }
</style>