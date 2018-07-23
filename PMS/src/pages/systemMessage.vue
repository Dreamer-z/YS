<template>
  <div class="system-message">
    <bread-crumb :child-msg='router'></bread-crumb>
    <div class="message-box">
      <!-- 标签taps -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!-- 标签条目 -->
        <el-tab-pane label="未读消息" name="unread">
          <!-- 标签下的内容 -->
          <!-- 内容标题 -->
          <sys-msg :list="list"></sys-msg>
        </el-tab-pane>
        <el-tab-pane label="已读消息" name="read">
          <!-- 内容标题 -->
          <sys-msg :list="list"></sys-msg>
        </el-tab-pane>
        <el-tab-pane label="全部消息" name="all">
          <!-- 内容标题 -->
          <sys-msg :list="list"></sys-msg>
        </el-tab-pane>
      </el-tabs>
      <div class="all-read"><el-button type="text">全部标记为已读</el-button></div>
    </div>
  </div>
</template>

<script>
import BreadCrumb from '@/components/public/breadcrumb' //面包屑导航栏
import { routs } from '@/assets/js/routs' //面包屑导航栏地址
import SysMsg from '@/components/public/sysMessage' //消息列表

import { mapGetters } from 'vuex'
import API from '@/store/API/index'
export default {
  components: {
    BreadCrumb,
    SysMsg
  },
  computed: {
    ...mapGetters({
      hotel: 'currHotel'
    })
  },
  data() {
    return {
      // 面包屑导航路径及名称
      router: [routs.index, routs.systemMessage],
      activeName: 'unread',
      list:[{
        title:'您的商户试用版本还有3天即将到期，请您及时开通正式版',
        source:'系统提醒',
        time:'2018-05-20  11:23',
        content:'与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；',
        noRead:true
      }]
    }
  },
  methods: {
    handleClick() {}
  }
}
</script>

<style lang="scss">
.system-message {
  box-sizing: border-box;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto !important;
  font-size: 14px;
  // .pane-title-box{
  //   display: flex;
  //   align-items: center;
  //   width: 100%;
  //   height: 40px;
  //   background-color: #f4f9ff;
  //   .pane-title {
  //     box-sizing: border-box;
  //     display: flex;
  //     align-items: center;
  //     text-align: center;
  //     height: 40px;
  //     width: 100%;
  //     flex: 1;
  //     padding:0 30px;
  //     .pane-title-cont {
  //       width: 40%;
  //     }
  //     .pane-title-source {
  //       width: 20%;
  //     }
  //     .pane-title-time {
  //       width: 30%;
  //     }
  //   }
  //   .empty {
  //     width: 21px;
  //     height: 100%;
  //   }
  // }
  // .item-title {
  //   box-sizing: border-box;
  //   position: relative;
  //   display: flex;
  //   align-items: center;
  //   height: 100%;
  //   padding:0 30px;
  //   &.no-read::after {
  //     content: '·';
  //     font-weight:bold;
  //     position:absolute; 
  //     left:12px; 
  //     width:10px; 
  //     color:#dc4233;
  //   }
  //   .cont {
  //     height: 100%;
  //     width: 40%;
  //   }
  //   .source {
  //     height: 100%;
  //     width: 20%;
  //     text-align: center;
  //   }
  //   .time {
  //     height: 100%;
  //     width: 30%;
  //     text-align: center;
  //   }
  // }
  // .item-content{
  //   box-sizing: border-box;
  //   padding-left:30px;
  //   width: 40%;
  // }
  .el-tabs__header{
    .el-tabs__nav-scroll{
      box-sizing: border-box;
      padding-right: 120px;
    }
  }
  .message-box{
    position: relative;
    .all-read{
      position: absolute;
      right: 5px;
      top: 0;
    }
  }
}
</style>
