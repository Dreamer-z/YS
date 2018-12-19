<template>
  <div class="system-message">
    <div class="message-box">
      <!-- 标签taps -->
      <el-tabs v-model="activeName" @tab-click="tabClick">
        <!-- 标签条目 -->
        <el-tab-pane label="未读消息" name="unread">
          <!-- 标签下的内容 -->
          <!-- 内容标题 -->
          <sys-msg :list="noRead" :pagination="noReadPagination" @fn="readedFn" @changePage="currentPage"></sys-msg>
        </el-tab-pane>
        <el-tab-pane label="已读消息" name="readed">
          <!-- 内容标题 -->
          <sys-msg :list="readed" :pagination="readedPagination" @fn="readedFn" @changePage="currentPage"></sys-msg>
        </el-tab-pane>
        <el-tab-pane label="全部消息" name="all">
          <!-- 内容标题 -->
          <sys-msg :list="all" :pagination="allPagination" @fn="readedFn" @changePage="currentPage"></sys-msg>
        </el-tab-pane>
      </el-tabs>
      <div class="all-read" v-show="allReadBtn" @click="allRead">
        <el-button type="text">全部标记为已读</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import SysMsg from '@/components/public/sysMessage' //消息列表

import { mapGetters,mapActions  } from 'vuex'
import API from '@/store/API/index'

import Bus from '@/store/bus'
export default {
  components: {
    SysMsg
  },
  computed: {
    ...mapGetters({
      hotel: 'currHotel',
      sysMessage:"sysMessage"
    })
  },
  data() {
    return {
      activeName: 'unread',
      noRead: [],
      readed: [],
      all: [],
      noReadPagination: {},
      readedPagination: {},
      allPagination: {},
      allReadBtn: true,
      needChangeMessageId: []
    }
  },
  methods: {      
    ...mapActions([
      'setSysMsg'
    ]),
    msgCom(){
      let sys = this.sysMessage;
      this.setSysMsg(--sys);
    },
    // 全部消息
    allMessage(page, num, init, callback) {
      let _this = this
      API.systemMessage({
        id: this.hotel.id,
        page: page,
        num: num
      })
        .then(function(res) {
          _this.all = res.data.data
          _this.allPagination = {
            num: num,
            page: page,
            total: res.data.total_count,
            init: init
          }
          callback && callback(true)
        })
        .catch(function(err) {
          console.log(err)
          _this.$message({
            type: 'warning',
            message: '请求消息列表失败'
          })
          callback && callback(false)
        })
    },
    // 未读消息
    noReadMessage(page, num, init, callback) {
      let _this = this
      API.noReadMessage({
        id: this.hotel.id,
        page: page,
        num: num,
        status: 0
      })
        .then(function(res) {
          _this.noRead = res.data.data
          _this.noReadPagination = {
            num: num,
            page: page,
            total: res.data.total_count,
            init: init
          }
          callback && callback(true)
        })
        .catch(function(err) {
          console.log(err)
          _this.$message({
            type: 'warning',
            message: '请求消息列表失败'
          })
          callback && callback(false)
        })
    },
    // 已读消息
    readedMessage(page, num, init, callback) {
      let _this = this
      API.noReadMessage({
        id: this.hotel.id,
        page: page,
        num: num,
        status: 1
      })
        .then(function(res) {
          _this.readed = res.data.data
          _this.readedPagination = {
            num: num,
            page: page,
            total: res.data.total_count,
            init: init
          }
          callback && callback(true)
        })
        .catch(function(err) {
          console.log(err)
          _this.$message({
            type: 'warning',
            message: '请求消息列表失败'
          })
          callback && callback(false)
        })
    },
    tabClick() {
      let active = this.activeName
      this.changeArr()
      if (active == 'unread') {
        this.allReadBtn = true
      }
      if (active == 'readed') {
        this.allReadBtn = false
      }
      if (active == 'all') {
        this.allReadBtn = true
      }
    },
    changeArr() {
      let arr = this.needChangeMessageId
      for (let j = 0; j < arr.length; j++) {
        for (let i = 0; i < this.noRead.length; i++) {
          if (arr[j] == this.noRead[i].id) {
            this.noRead.splice(i, 1)
          }
        }
        for (let s = 0; s < this.all.length; s++) {
          if (arr[j] == this.all[s].id) {
            this.all[s].status = 1
          }
        }
      }
      this.needChangeMessageId = []
    },
    readedFn(val) {
      if (!val) {
        return
      }
      let active = this.activeName
      let _this = this
      if (active == 'unread') {
        let ind = ''
        for (let i = 0; i < this.noRead.length; i++) {
          if (this.noRead[i].id == val) {
            ind = i
          }
        }
        if (this.noRead[ind] && this.noRead[ind].status == 0) {
          this.changeReaded(this.noRead[ind].id, function(res) {
            if (res == true) {
              _this.noRead[ind].status = 1
              let arr = _this.noRead[ind]
              _this.readed.push(arr)
              _this.needChangeMessageId.push(_this.noRead[ind].id)
              _this.msgCom();
            }
          })
        } else {
          return
        }
      }
      if (active == 'readed') {
        return
      }
      if (active == 'all') {
        let ind = ''
        for (let i = 0; i < this.all.length; i++) {
          if (this.all[i].id == val) {
            ind = i
          }
        }
        if (this.all[ind] && this.all[ind].status == 0) {
          console.log(1)
          this.changeReaded(_this.all[ind].id, function(res) {
            if (res == true) {
              _this.all[ind].status = 1
              let arr = _this.all[ind]
              _this.readed.push(arr)
              _this.needChangeMessageId.push(_this.all[ind].id)
              _this.msgCom();
            }
          })
        } else {
          return
        }
      }
    },
    changeReaded(id, callback) {
      API.systemMessageOfRead(id)
        .then(function(res) {
          callback && callback(true)
        })
        .catch(function(err) {
          console.log(err)
          callback && callback(false)
        })
    },
    currentPage(n) {
      let active = this.activeName
      if (active == 'unread') {
        this.noReadPagination.page = n
        this.noReadMessage(
          this.noReadPagination.page,
          this.noReadPagination.num
        )
      }
      if (active == 'readed') {
        this.readedPagination.page = n
        this.readedMessage(
          this.readedPagination.page,
          this.readedPagination.num
        )
      }
      if (active == 'all') {
        this.allPagination.page = n
        this.allMessage(this.allPagination.page, this.allPagination.num)
      }
    },
    allRead() {
      let _this = this
      API.allSystemMessageOfRead({
        id: this.hotel.id
      })
        .then(function(res) {
          _this.noRead = []
          for (let i = 0; i < _this.all.length; i++) {
            if (_this.all[i].status == 0) {
              _this.all[i].status = 1
            }
          }
          _this.readed = _this.all
          _this.$message({
            type: 'success',
            message: '标记成功！'
          })
          _this.setSysMsg(0);
        })
        .catch(function(err) {
          console.log(err)
          _this.$message({
            type: 'warning',
            message: '标记失败！'
          })
        })
    },
    messageRouter(res,id) {
      let _this = this;
      let ind = ''
      if (res == true) {
        _this.activeName = 'unread';
        for (let i = 0; i < _this.noRead.length; i++) {
          if (_this.noRead[i].id == id) {
            ind = i
          console.log(ind);
          }
        }
        if (_this.noRead[ind] && _this.noRead[ind].status == 0) {
          _this.changeReaded(_this.noRead[ind].id, function(res) {
            if (res == true) {
              _this.noRead[ind].status = 1
              let arr = _this.noRead[ind]
              _this.readed.push(arr)
              _this.needChangeMessageId.push(_this.noRead[ind].id)
            }
          })
        }
      }
    }
  },
  mounted() {
    let _this = this
    let params = this.$route.params
    if (params.id) {
      _this.noReadMessage(1, 10, Number(params.id),function(res) {
        _this.messageRouter(res,params.id);
        _this.msgCom();
      });
      _this.readedMessage(1, 10, -1)
      _this.allMessage(1, 10, -1)
    } else {
      this.noReadMessage(1, 10, -1);
      this.readedMessage(1, 10, -1)
      this.allMessage(1, 10, -1)
    }
    Bus.ev.$on('headerMsgSys', function(id) {
      _this.noReadMessage(1, 10, Number(id),function(res) {
        _this.messageRouter(res,id);
        _this.msgCom();
      });
      _this.readedMessage(1, 10, -1)
      _this.allMessage(1, 10, -1)
    })
  },
  destroyed() {
    Bus.ev.$off('headerMsgSys')
  }
}
</script>

<style lang="scss">
.system-message {
  box-sizing: border-box;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px 35px;
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
  .el-tabs__header {
    .el-tabs__nav-scroll {
      box-sizing: border-box;
      padding-right: 120px;
    }
  }
  .message-box {
    position: relative;
    .all-read {
      position: absolute;
      right: 5px;
      top: 0;
    }
  }
}
</style>
