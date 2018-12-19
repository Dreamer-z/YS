<template>
  <div class="layer-container">
    <common-header @getLeftMenu="getLeftMenu"></common-header>
    <div class="layer-container-content">
      <div class="layer-menu" v-show="route.path != 'systemMessage' && route.path != 'checkOutRequest' &&!view  && leftMenu.children &&leftMenu.children.length > 0">
        <div class="layer-menu-box">
          <div class="layer-menu-row" :class="[item.active?'active':'']" v-for="(item, index) in leftMenu.children" :key="index">
            <router-link tag="div" :to="{path:item.url}" v-if="!item.children">
              <div class="layer-menu-title" @click="menuClick(item.id)">
                <i class="layer-menu-icon iconfont":class="[item.icon]"></i>
                <div class="layer-menu-name">{{item.name}}</div>
              </div>
            </router-link>
            <div
              class="layer-menu-title"
              v-else
              @click="menuClick(item.id)"
            >
              <i class="layer-menu-icon iconfont":class="[item.icon]"></i>
              <div class="layer-menu-name">{{item.name}}</div>
              <i class="layer-menu-open el-icon-caret-right" :class="[parentRouteIndex == index?'active':'']"></i>
            </div>
            <el-collapse-transition>
              <div
                class="layer-menu-child"
                :class="[parentRouteIndex == index?'active':'']"
                v-show="parentRouteIndex == index"
                v-if="item.children"
              >
                <router-link
                  class="layer-menu-child-link"
                  tag="div"
                  v-for="(ite, ind) in item.children"
                  :key="ind"
                  :to="{path:ite.url}"
                >
                  <div
                    class="layer-menu-child-title"
                    :class="[ite.active?'active':'']"
                    @click="menuChildClick(item.id,ite.id)"
                  >
                    <div class="line-vertival"></div>
                    <div class="line-horizontal"></div>
                    <div class="circle"></div>
                    <div class="layer-menu-name">{{ite.name}}</div>
                  </div>
                </router-link>
              </div>
            </el-collapse-transition>
          </div>
        </div>
      </div>
      <div class="layer-container-top">
        <div
          class="layer-container-bread-crumb"
          v-if="route.path != 'newhello'"
        >
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <span class="layer-container-bread-crumb-box">当前位置：</span>
            <el-breadcrumb-item
              class="bread-crumb-item"
              v-for="(item,index) in route.nowRoute"
              :key="index"
            >{{item}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <router-view
          ref="view"
          :class="{'change-padding': !isShow}"
          class="app-main"
        >
        </router-view>
      </div>
    </div>
  </div>
</template>

<script>
import CommonHeader from "@/components/public/commonHeader";
import { route } from "@/assets/js/menu.js";
import { mapGetters,mapActions } from "vuex";
import API from "@/store/API/index";
export default {
  name: "layerContainer",
  components: {
    CommonHeader
  },
  computed: {
    ...mapGetters({
      route: "route",
      hotel: "currHotel",
      leftMenuId:"leftMenuId",
      route:'route'
    }),
  },
  data() {
    return {
      leftMenu:{},
      view:false,
      parentRouteIndex:null,
      layerMenuShow:true,
      isShow: true,
      path: null,
      nowRoute: null,
      someArr: [],
      oneArr: [],
      routeInd: {},
      height: 0
    };
  },
  created() {  
    if (this.$router.history.current.name == "addHotel") {
      this.isShow = false;
    }
  },
  methods: {
    ...mapActions(["setLeftMenuId"]),
    getLeftMenu(e,i){
      this.view = false;
      if(e){
        this.leftMenu = e;
        if(typeof e.view != "undefined"){
          this.view = e.view;
        }
      };
      this.parentRouteIndex = i;
    },
    menuClick(id) {
      this.setLeftMenuId(id);
      this.leftMenu.children.forEach((e, i) => {
        if (e.id == id) {
          if( this.parentRouteIndex == i){
            this.parentRouteIndex = null;
            e.active = false;
          }else{
            this.parentRouteIndex = i;
            e.active = !e.active;
          }
        } else {
          e.active = false;
        };
        if (e.children) {
          e.children.forEach((a, j) => {
            a.active = false;
          });
        }
      });
    },
    menuChildClick(pid, cid) {
      this.setLeftMenuId(cid);
      this.leftMenu.children.forEach((e, i) => {
        e.active = false;
        if (e.children) {
          e.children.forEach((a, j) => {
            if(e.id == pid && a.id == cid){
              this.parentRouteIndex = i;
              a.active = true;
            }else{
              a.active = false;
            };
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scope>
.layer-container {
  box-sizing: border-box;
  min-width: 1280px;
  background-color: #fff;
  height: 100%;
  display: flex;
  flex-direction: column;
  .layer-container-content{
    flex:1;
    display: flex;
  }
  .layer-menu {
    box-sizing: border-box;
    height: 100%;
    width: 150px;
    padding-top: 15px;
    background-color: #192138;
    color: #fff;
    display: flex;
    flex-direction: column;
    user-select: none;
    .layer-menu-box {
      flex: 1;
      overflow-y: auto;
      &::-webkit-scrollbar-track-piece {
        background-color: #292f45;
      }
      &::-webkit-scrollbar-thumb {
        background-color: #f2f2f2;
      }
      // IE
      &::scrollbar-track-color,
      &::scrollbar-dark-shadow-color {
        background-color: #292f45;
      }
      &::scrollbar-base-color {
        background-color: #f2f2f2;
      }
      .layer-menu-row {
        box-sizing: border-box;
        height: auto;
        width: 100%;
        .layer-menu-title {
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 50px;
          width: 100%;
          padding: 0 8px 0 20px;
          border-left: 4px solid transparent;
          cursor: pointer;
          &:hover {
            background-color: #383f5a;
            border-left: 4px solid #383f5a;
          }
        }
        &.active {
          .layer-menu-title {
            background-color: #383f5a;
            border-left: 4px solid #667bde;
          }
        }
        .layer-menu-child {
          box-sizing: border-box;
          width: 100%;
          height: auto;
          overflow: hidden;
          &.active {
            background-color: rgb(41, 47, 69);
          }
          // background-color: #292f45;
          .layer-menu-child-title {
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 40px;
            width: 100%;
            padding: 0 8px 0 25px;
            border-left: 4px solid transparent;
            cursor: pointer;
            color: #ccc;
            &:hover {
              background-color: #383f5a;
              border-left: 4px solid #383f5a;
            }
            &.active {
              background-color: #383f5a;
              border-left: 4px solid #667bde;
              color: #fff;
              .circle {
                background-color: #667bde;
                opacity: 1;
              }
            }
            .line-vertival {
              box-sizing: border-box;
              width: 1px;
              height: 100%;
              border-left: 1px solid #e6e6e6;
              opacity: 0.2;
              &:nth-last-of-type(1) {
                height: 50%;
                align-self: flex-start;
              }
            }
            .line-horizontal {
              box-sizing: border-box;
              height: 1px;
              width: 20px;
              border-top: 1px dashed #e6e6e6;
              opacity: 0.2;
            }
            .circle {
              width: 5px;
              height: 5px;
              border-radius: 50%;
              background-color: #292f45;
              opacity: 0;
            }
            .layer-menu-name {
              margin-right: 0;
            }
          }
        }
        // .layer-menu-child-link:nth-last-of-type(1){
        //   .line-vertival{
        //     height: 50%;
        //     align-self: flex-start;
        //   }
        // }
        .layer-menu-name {
          box-sizing: border-box;
          flex: 1;
          text-align: left;
          margin: 0 10px;
        }
        .layer-menu-icon {
          font-size: 20px;
          transition: all ease 0.1s;
        }
        .layer-menu-open {
          font-size: 12px;
          transition: all ease 0.1s;
          &.active {
              transform: rotateZ(90deg);
            }
        }
      }
    }
    .el-submenu .el-menu-item {
      min-width: 100%;
    }
  }
  .layer-container-top {
    flex: 1;
    box-sizing: border-box;
    background-color: #fff;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    &.have-left-menu {
      box-sizing: border-box;
      padding-left: 200px;
    }
    .layer-container-bread-crumb {
      box-sizing: border-box;
      padding: 15px 35px;
      background-color: #f2f2f2;
      color: #333;
      .layer-container-bread-crumb-box {
        float: left;
      }
    }
  }
  .app-main {
    flex: 1;
    color: #626262;
    height: 100%;
    overflow-y: auto;
  }
  .change-padding {
    box-sizing: border-box;
    padding: 20px 50px;
  }
}
.list-enter-active,
.list-leave-active {
  transition: all 0.1s;
}
.list-enter {
  height: auto;
}
.list-leave-to {
  height: 0;
}
</style>
