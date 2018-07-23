<template>
  <div class="self-add">
    <ol>
      <li class="left">
        <p style="color: #6a9df6;">{{childpagename}}设施<span>*</span></p>
      </li>
      <li class="right" @click="centerDialogVisible = true">
        <img src="../../assets/images/add.png" alt=""/>
        <p>新增</p>
      </li>
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
            <!---->
            <!-- <li class=change-bj ref="index" :id="item.id" v-for="(item, index) in userDefine">
              <p><span>哈</span>{{item.name}}</p>   自定义设施
              <div @click="delCustom(index)" class="add-delete">×</div>
            </li> -->
          </ul>
          <button @click="checkedAll">一键全部添加</button>
          <!-- <div class="self">
            <p>自定义</p>
            <input ref="addInput" v-model="addList" type="text" placeholder="输入设施">
            <button @click="addUserFac">添加</button>
          </div> -->
        </section>
        <div class="self-nav">
          <button class="dele" @click="centerDialogVisible = false">取消</button>
          <button class="arge" @click="save">确定</button>
        </div>
      </div>
    </div>
    <section>
      <ul>
        <li v-for="(item, index) in userSelectFac ">
          <span style="vertical-align: middle;display: inline-block;color: #fff;"
               class="iconfont iconFontSize " :class="item.icon" ></span>
          <div>{{item.name}}</div>
          <nav @click="remove(item.id)" class="delete">×</nav>
        </li>
      </ul>
    </section>
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
    .add-delete{
      width: 20px;
      height: 20px;
      text-align: center;
      line-height: 20px;
      position: absolute;
      top: 0; right: 0;
      background:red;
      border-radius: 50%;
      transform: translate(50%,-50%);
    }
    .dialog{
      position: fixed;
      top: 0;left: 0; right: 0;bottom: 0;
      background: rgba(0,0,0,.3);
      z-index: 1000;
      .container{
        .change-bj{
              color: #fff;
              background: #6a9df6;
            }
        position: absolute;
        width: 80%;
        top: 50%;
        left: 50%;
        transform: translate(-41%, -50%);
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
              width: 140px;
              height: 50px;
              font-size: 16px;
              text-align: center;
              border-radius: 3px;
              margin-right: 34px;
              margin-bottom: 30px;
              background: #fff;
              border: 1px solid #e2e2e2;
              p{
                line-height: 50px;
                span{
                  margin-right: 18px;
                }
              }
            }
          }
          button{
            width: 198px;
            height: 46px;
            border: 1px solid #e2e2e2;
            border-radius: 3px;
            background: #fff;
            outline: none;
          }
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
      height: 36px;
      line-height: 36px;
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
      padding: 36px 16px;
      background: #fff;
      ul{
        li{
          cursor: pointer;;
          position: relative;
          display: inline-block;
          text-align: center;
          width: 140px;
          height: 50px;
          border-radius: 3px;
          background: #6a9df6;
          margin-right: 16px;
          margin-bottom: 36px;
          img{
            vertical-align: middle;
            margin-right: 20px;
          }
          div{
            display: inline-block;
            color: #fff;
            vertical-align:middle;
            height: 50px;
            line-height: 50px;
          }
          nav{
            width: 20px;
            height: 20px;
            line-height: 20px;
            text-align: center;
            border-radius: 50%;
            background: red;
            color: #fff;
            position: absolute;
            transform: translate(10px, -10px);
            top: 0;
            right: 0;
          }
        }
      }
    }
  }
</style>