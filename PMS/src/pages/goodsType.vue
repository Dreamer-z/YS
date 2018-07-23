<template>
  <div class="gT-container">
    <bread-crumb :child-msg='router'></bread-crumb>
    <el-row class="optionsBtn">
      <el-button class="btn" type="primary" size="small" @click="add">新增</el-button>
      <!-- <el-button class="btn" size="small">停用</el-button> -->
      <!-- <el-button class="btn" size="small" @click="del">删除</el-button> -->
      <el-button class="btn" size="small" :disabled="disableClick" @click="goodsTypeAdd">保存</el-button>
    </el-row>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" height='85%' style="width: 894px" border @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="58"></el-table-column>
      <el-table-column label="编号" width="100">
        <template slot-scope="scope">
          <!-- {{scope.row.num}} -->
          <el-input type="number" v-model="scope.row.num" :disabled='scope.row.disable' placeholder="请输入编号" clearable size="small"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="类目名称" width="160">
        <template slot-scope="scope">
          <el-input type="text" v-model="scope.row.name" :disabled='scope.row.disable' placeholder="请输入类型" clearable size="small"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="154">
        <template slot-scope="scope">
          <el-select v-model="scope.row.status" placeholder="请选择" :disabled='scope.row.disable' size="small">
            <el-option v-for="item in status" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="描述" width="300">
        <template slot-scope="scope">
          <el-input type="text" v-model="scope.row.describe" :disabled='scope.row.disable' placeholder="请输入描述" size="small"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120" fixed="right">
        <template slot-scope="scope">
          <div class="option" v-if="scope.row.id">
            <el-button type="text" @click="scope.row.disable = !scope.row.disable" v-if="scope.row.disable">编辑</el-button>
            <!-- <span @click="scope.row.disable = !scope.row.disable" v-if="scope.row.disable">编辑</span> -->
            <el-button type="text" @click="save(scope.row)" v-else>完成</el-button>
            <!-- <span @click="save(scope.row,scope.row.disable = !scope.row.disable)" v-else>完成</span> -->
            <el-button type="text" @click="del(scope.row.id)">删除</el-button>
          </div>
          <div class="option" v-else>
            <el-button type="text" @click="localDel(scope.row.num)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-pagination class="pagination" background :page-size='20' layout="prev, pager, next" :total="1000"></el-pagination> -->
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
      router: [routs.index, routs.goodsType],
      // 表单数据
      tableData: [],
      newTableData: [],
      // 选中表单条目数据
      multipleSelection: [],
      // 状态下拉菜单选项
      status: [
        {
          label: '禁用',
          value: 0
        },
        {
          label: '启用',
          value: 1
        }
      ],
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
          if (arr[i].num == '' || (/^[0-9]*$/).test(arr[i].num) == false || arr[i].num ==  undefined) {
            this.$message({
              type: 'warning',
              message: '请检查，编号为必填项且必须是数字！'
            })
            return false
          }
          if (arr[i].name == '' || arr[i].name == undefined) {
            this.$message({
              type: 'warning',
              message: '请检查，类型为必填项！'
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
            if (arr[i].name == tableData[j].name || arr[i].num == tableData[j].num) {
              n++;
            }
          }
        }
      }
      if (n > 1) {
        this.$message({
          type: 'warning',
          message: '该商品分类已存在或编号重复，请不要重复添加！'
        })
        return false
      }
    },
    // 选中表单条目数据
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    //添加商品
    add() {
      this.tableData.unshift({
        num: this.tableData.length + 1,
        name: '',
        status: 1,
        describe: '',
        hotel_id: this.hotel.id,
        disable: false
      })
      this.$refs.multipleTable.toggleRowSelection(this.tableData[0])
    },
    // 请求列表
    goodsTypeList() {
      let _this = this
      API.goodsTypeList({
        id: this.hotel.id
      })
        .then(function(res) {
          if (res.error_code == 0) {
            _this.tableData = res.data
          } else {
            _this.$message({
              type: 'warning',
              message: '请求商品分类列表失败'
            })
          }
          _this.disableClick = false
        })
        .catch(function(err) {
          console.log(err);
          _this.$message({
            type: 'warning',
            message: '请求商品分类列表失败'
          })
          _this.disableClick = false
        })
    },
    // 添加分类
    goodsTypeAdd() {      
      if(this.multipleSelection.length == 0){
        this.$message({
          type: 'warning',
          message: '请先新增条目'
        })
        return
      };
      let sj = { data: this.multipleSelection }
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
      API.goodsTypeAdd(sj)
        .then(function(res) {
          if (res.error_code == 0) {
            _this.goodsTypeList()
            _this.$message({
              type: 'success',
              message: '新增成功!'
            })
          } else {
            // _this.goodsTypeList()
            _this.$message({
              type: 'warning',
              message: '新增分类失败'
            })
            _this.disableClick = false
          }
        })
        .catch(function(err) {
          console.log(err);
          // _this.goodsTypeList()
          _this.$message({
            type: 'warning',
            message: '新增分类失败'
          })
          _this.disableClick = false
        })
    },
    // 修改分类
    save(row) {
      let _this = this
      let arr = [];
      arr.push(row);
      let b = this.judgeMsg(arr)
      if(b == false){
        // this.goodsTypeList()
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
          API.goodsTypeAmend(row.id, {
            status: row.status,
            name: row.name,
            describe: row.describe,
            num: row.num
          })
            .then(function(res) {
              if (res.error_code == 0) {
                _this.$message({
                  type: 'success',
                  message: '修改成功!'
                })
                row.disable = !row.disable
              } else {
                // _this.goodsTypeList()
                _this.$message({
                  type: 'warning',
                  message: '修改失败'
                })
              }
            })
            .catch(function(err) {
              console.log(err);
              // _this.goodsTypeList()
              _this.$message({
                type: 'warning',
                message: '修改失败'
              })
            })
        })
        .catch(() => {
          _this.goodsTypeList()
          _this.$message({
            type: 'info',
            message: '已取消更改'
          })
        })
    },
    //删除分类
    del(id) {
      let _this = this
      this.$confirm('此操作将删除该条目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          API.goodsTypeDel(id)
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
    this.goodsTypeList()
  }
}
</script>

<style lang="scss" scoped>
.gT-container {
  box-sizing: border-box;
  height: 100%;
  font-size: 14px;
  overflow: auto !important;
  .el-table td .option {
    color: #e6e6e6;
  }
  .el-table td .option input {
    color: #6a9df6;
  }
}
</style>