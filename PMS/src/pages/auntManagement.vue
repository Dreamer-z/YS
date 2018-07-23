<template>
  <div class="aunt-container">
    <bread-crumb :child-msg='router'></bread-crumb>
    <div class="box bg-fff" v-if="auntbox">
      <div class="aunt-list">
        <span class="title" style="width:120px;text-align:right;margin-right:10px;">全部保洁员：</span>
        <el-row>
          <el-button type="primary" size="mini" round v-for="(value,key) in aunt" :key="key" :plain="key === chooseAuntIndex?false:true" @click="chooseAunt(key)">{{value.name}}</el-button>
        </el-row>
      </div>
      <div class="now-choose">
        <span style="display:inline-block;width:120px;text-align:right;margin-right:10px;">当前选择保洁员：</span>
        <span>{{aunt[chooseAuntIndex].name}}</span>
      </div>
      <div class="choose-aunt"></div>
      <div style="text-align: center">
        <el-transfer style="text-align: left; display: inline-block" v-model="assignRoomList" :titles="['全部未指派房间', aunt[chooseAuntIndex].name+'需要打扫的房间']" :button-texts="['取消当前指派', '指派给保洁员']" @change="handleChange" :data="roomData">
          <!-- <span slot-scope="{ option }">{{ option.label }}</span> -->
          <!-- <el-button class="transfer-footer" slot="left-footer" size="small">操作</el-button>
                    <el-button class="transfer-footer" slot="right-footer" size="small">操作</el-button> -->
        </el-transfer>
      </div>
      <div class="assign-box">
        <el-button type="primary" size="medium" :disabled="assignRoomList.length > 0 ?false:true" :plain="assignRoomList.length > 0 ?false:true" @click="assignAunt()">确定</el-button>
      </div>
    </div>
    <div class="box" v-else>
      <span class="empty">暂未添加保洁人员，
        <router-link tag="span" class="to-staff" to="/container/staffManagement">添加</router-link>以后进行指派</span>
    </div>
  </div>
</template>

<script>
import BreadCrumb from '@/components/public/breadcrumb' //面包屑导航栏
import { routs } from '@/assets/js/routs'
import { mapGetters } from 'vuex'
import API from '@/store/API/index'
export default {
  computed: {
    ...mapGetters({
      hotel: 'currHotel'
    })
  },
  components: {
    BreadCrumb
  },
  data() {
    return {
      // 面包屑导航路径及名称
      router: [routs.index, routs.auntManagement],
      aunt: [],
      auntbox: false,
      chooseAuntIndex: 0,
      chooseAuntId: null,
      roomData: [],
      assignRoomList: [],
      checkRoom: []
    }
  },
  methods: {
    //   获取阿姨列表
    auntList() {
      let aunt = API.auntList({
        id: this.hotel.id
      });
      return Promise.all([aunt]);
    },
    async auntListRes(){
            try{
      let result = await this.auntList();
      if(result.length != 1){
        this.$message({
          type: 'warning',
          message: '请求保洁员列表失败'
        })
        return
      };
      let auntData = result[0];
      if(auntData.error_code == 0){
        if(auntData.data.length == 0){
          this.auntbox = false;
          this.aunt = auntData.data;
        }else{
          this.auntbox = true;
          this.aunt = auntData.data;
          this.chooseAuntId = auntData.data[0].id;
          
          this.roomList()
        }
      } else {
          this.$message({
            type: 'warning',
            message: '请求保洁员列表失败'
          })
        }
      }catch(e){
        console.log(e);
        this.$message({
          type: 'warning',
          message: '请求保洁员列表失败'
        })
      };
    },
    //   选择阿姨
    chooseAunt(key) {
      this.chooseAuntIndex = key
      this.chooseAuntId = this.aunt[key].id            
      this.roomData = []
      this.assignRoomList = []
      this.roomList()
    },
    // 获取房间列表
    roomList() {
      let _this = this
      API.roomList({
        id: this.hotel.id,
        staff_id: this.chooseAuntId
      })
        .then(function(res) {
          if (res.error_code == 0) {
            let data = []
            let assignRoomList = []
            for (let i = 0; i < res.data.length; i++) {
              data.push({});
              data[i].key = res.data[i].id;
              if(res.data[i].build_num == '默认楼栋'){
                data[i].label = res.data[i].build_num + res.data[i].floor_num + '楼' + res.data[i].name;
              }else{
                data[i].label = res.data[i].build_num + '栋' + res.data[i].floor_num + '楼' + res.data[i].name;
              }
              if (res.data[i].set) {
                if (res.data[i].staff_id == _this.chooseAuntId) {
                  assignRoomList.push(res.data[i].id)
                } else {
                  data[i].disabled = true
                }
              }
            }
            _this.roomData = data
            _this.assignRoomList = assignRoomList
          } else {
            _this.$message({
              type: 'warning',
              message: '查询房间列表失败'
            })
          }
        })
        .catch(function(err) {
          console.log(err);
          _this.$message({
            type: 'warning',
            message: '查询房间列表失败'
          })
        })
    },
    // 指派阿姨
    assignAunt() {
      let _this = this
      let assignRoomList = this.assignRoomList.join(',')
      this.$confirm('是否确认指派, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          API.assignAunt({
            id: this.chooseAuntId,
            ids: assignRoomList
          })
            .then(function(res) {
              if (res.error_code == 0) {
                _this.roomList()
                _this.$message({
                  type: 'success',
                  message: '指派成功'
                })
              } else {
                _this.$message({
                  type: 'warning',
                  message: '指派成功失败'
                })
                _this.roomList()
              }
            })
            .catch(function(err) {
              console.log(err);
              _this.$message({
                type: 'warning',
                message: '指派成功失败'
              })
              _this.roomList()
            })
        })
        .catch(() => {
          this.roleList()
          this.$message({
            type: 'info',
            message: '已取消指派'
          })
        })
    },
    //   转移到右侧的选项数组、方向、移动的选项的key值
    handleChange(value, direction, movedKeys) {
      // console.log(value, direction, movedKeys)
    }
  },
  mounted() {
    this.auntListRes();
  }
}
</script>

<style lang="scss">
.aunt-container {
  box-sizing: border-box;
  height: 100%;
  font-size: 14px;
  overflow: auto !important;
  .box {
    border-radius: 4px;
    padding-bottom: 30px;
    .aunt-list {
      display: flex;
      padding: 20px;
      border-bottom: 1px solid #e6e6e6;
      .title {
        line-height: 28px;
        width: 120px;
      }
      .el-row {
        flex: 1;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        margin: 0;
        button {
          margin-left: 0;
          margin-right: 10px;
          margin-bottom: 10px;
        }
      }
    }
    .now-choose {
      padding: 20px;
      margin-bottom: 20px;
      & > span:last-of-type {
        color: #000;
      }
    }
    .assign-box {
      margin-top: 20px;
      text-align: center;
    }
    .empty {
      font-size: 16px;
      .to-staff {
        color: #6a9df6;
        & {
          cursor: pointer;
        }
      }
    }
  }
}
.el-transfer-panel {
  height: 443px;
  width: 260px;
  .el-transfer-panel__body {
    height: 401px;
    .el-transfer-panel__list,
    .el-transfer-panel__list.is-filterable {
      height: 401px;
    }
  }
}
.transfer-footer {
  margin-left: 20px;
  padding: 6px 5px;
}
</style>
