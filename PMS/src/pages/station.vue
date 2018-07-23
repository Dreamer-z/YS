<template>
  <div class="station-container">
    <bread-crumb :child-msg='router'></bread-crumb>
    <el-row class="optionsBtn">
      <el-button class="btn" type="primary" size="small" @click="add">新增</el-button>
      <el-button class="btn" size="small" :disabled="disableClick" @click="addStation">保存</el-button>
    </el-row>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" height='85%' style="width: 1060px" border @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="58"></el-table-column>
      <el-table-column label="岗位名称" width="140">
        <template slot-scope="scope">
          <el-input type="text" v-model="scope.row.name" :disabled='scope.row.disable' placeholder="请输入名称" clearable size="small"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="描述" width="300">
        <template slot-scope="scope">
          <el-input type="text" v-model="scope.row.description" :disabled='scope.row.disable' placeholder="请输入描述" clearable size="small"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="最近更新人" width="140">
        <template slot-scope="scope">{{scope.row.staff_name}}</template>
      </el-table-column>
      <el-table-column label="更新时间" width="300">
        <template slot-scope="scope">{{scope.row.update_time}}</template>
      </el-table-column>
      <el-table-column label="操作" width="120" fixed="right">
        <template slot-scope="scope">
          <div class="option" v-if="scope.row.id">
            <el-button type="text" @click="scope.row.disable = !scope.row.disable" v-if="scope.row.disable">编辑</el-button>
            <el-button type="text" @click="save(scope.row)" v-else>完成</el-button>
            <el-button type="text" @click="del(scope.row.id)">删除</el-button>
          </div>
          <div class="option" v-else>
            <el-button type="text" @click="localDel(scope.row.num)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

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
      router: [routs.index, routs.station],
      // 表单数据
      tableData: [],
      // 选中表单条目数据
      multipleSelection: [],
      disableClick:false
    }
  },
  methods: {
    // 判断是否选中条目
    judgeColumn() {
      if (this.multipleSelection.length == 0) {
        this.$message({
          type: 'warning',
          showClose: true,
          message: '请先选择条目',
          center: true
        })
        return
      }
    },
    // 判断选中条目信息是否完整
    judgeMsg(arr) {
      if (arr) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].name == '' || arr[i].name == undefined) {
            this.$message({
              type: 'warning',
              message: '请检查，名称为必填项！'
            })
            return false
          }
        }
      }
    },
    // 验证是否重复
    judgeRep(arr) {
      let tableData = this.tableData
      let n = 0
      if (arr) {
        for (let i = 0; i < arr.length; i++) {
          for (let j = 0; j < tableData.length; j++) {
            if (arr[i].name == tableData[j].name) {
              n++;
            }
          }
        }
      }
      if (n > 1) {
        this.$message({
          type: 'warning',
          message: '该岗位已存在，请不要重复添加！'
        })
        return false
      }
    },
    // 选中表单条目数据
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    //添加部门
    add() {
      this.tableData.unshift({
        num: this.tableData.length + 1,
        name: '',
        description: '',
        staff: '',
        update_time: '',
        hotel_id: this.hotel.id,
        disable: false
      })
      this.$refs.multipleTable.toggleRowSelection(this.tableData[0])
    },
    // 获取岗位列表
    stationList() {
      let _this = this
      API.stationList({
        id: this.hotel.id
      })
        .then(function(res) {
          if (res.error_code == 0) {
            _this.tableData = res.data
          } else {
            _this.$message({
              type: 'warning',
              message: '请求列表失败'
            })
          }
          _this.disableClick = false
        })
        .catch(function(err) {
          _this.$message({
            type: 'warning',
            message: '请求部门列表失败'
          })
          _this.disableClick = false
          console.log(err)
        })
    },
    // 添加部门
    addStation() {      
      if(this.multipleSelection.length == 0){
        this.$message({
          type: 'warning',
          message: '请先新增条目'
        })
        return
      };
      let list = []
      for (let i = 0; i < this.multipleSelection.length; i++) {
        list[i] = {}
        list[i].name = this.multipleSelection[i].name
        list[i].description = this.multipleSelection[i].description
        list[i].hotel_id = this.multipleSelection[i].hotel_id
      }
      let sj = { data: list }
      let ctb = this.multipleSelection
      this.judgeColumn()
      let b = this.judgeMsg(ctb)
      if(b == false){
        return;
      };
      let p = this.judgeRep(ctb)
      if (p == false) {
        return
      }
      let _this = this
      for (let i = 0; i < ctb.length; i++) {
        if (ctb[i].id) {
          this.$message({
            type: 'warning',
            message: '修改项目请点击条目右侧按钮'
          })
          return false
        }
      }
      this.disableClick = true
      API.stationAdd(sj)
        .then(function(res) {
          if (res.error_code == 0) {
            _this.stationList()
            _this.$message({
              type: 'success',
              message: '新增成功!'
            })
          } else {
            // _this.stationList()
            _this.$message({
              type: 'warning',
              message: '新增岗位失败'
            })
            _this.disableClick = false
          }
          console.log(res)
        })
        .catch(function(err) {
          console.log(err);
            // _this.stationList()
          _this.$message({
            type: 'warning',
            message: '新增岗位失败'
          })
          _this.disableClick = false
        })
    },
    // 更改
    save(row) {
      let _this = this
      let arr = [];
      arr.push(row);
      let b = this.judgeMsg(arr)
      if(b == false){
        // this.stationList()
        return;
      };
      let p = this.judgeRep(arr)
      if (p == false) {
        return
      }
      this.$confirm('此操作将更改该条目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          API.stationAmend(row.id, {
            name: row.name,
            description: row.description
          })
            .then(function(res) {
              if (res.error_code == 0) {
                _this.$message({
                  type: 'success',
                  message: '修改成功!'
                })
                row.disable = !row.disable
              } else {
                // _this.stationList()
                _this.$message({
                  type: 'warning',
                  message: '修改失败'
                })
              }
            })
            .catch(function(err) {
              console.log(err);
              // _this.stationList()
              _this.$message({
                type: 'warning',
                message: '修改失败'
              })
            })
        })
        .catch(() => {
          _this.stationList()
          _this.$message({
            type: 'info',
            message: '已取消更改'
          })
        })
    },
    // 删除
    del(id) {
      let _this = this
      this.$confirm('此操作将删除该条目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          API.stationDel(id)
            .then(function(res) {
              if (res.error_code == 0) {
                for (let j = 0; j < _this.tableData.length; j++) {
                  if (id == _this.tableData[j].id) {
                    _this.tableData.splice(j, 1)
                  }
                }
                _this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
              } else {
                _this.$message({
                  type: 'warning',
                  message: '删除失败'
                })
              }
            })
            .catch(function(err) {
              console.log(err);
              _this.goodsTypeList()
              _this.$message({
                type: 'warning',
                message: '删除失败'
              })
            })
        })
        .catch(() => {
          _this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 清除条目选中
    clear() {
      this.$refs.multipleTable.clearSelection()
    },
    // 未保存添加条目删除
    localDel(num) {
      for (let j = 0; j < this.tableData.length; j++) {
        if (num == this.tableData[j].num) {
          this.tableData.splice(j, 1)
        }
      }
    }
  },
  mounted() {
    this.stationList()
  }
}
</script>


<style lang="scss" scoped>
.station-container {
  box-sizing: border-box;
  height: 100%;
  font-size: 14px;
  overflow: auto !important;
}
</style>