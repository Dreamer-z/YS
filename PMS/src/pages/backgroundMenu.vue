<template>
  <div class="bM-container">
    <bread-crumb :child-msg='router'></bread-crumb>
    <!-- <el-row class="optionsBtn">
      <el-button class="btn" type="primary" size="small" @click="addMenu">保存</el-button>
    </el-row> -->
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" height="88%" style="width: 1340px" border>
        <el-table-column class="sort-cloumn" label="排序" width="180">
          <template slot-scope="scope">
            <span :class="[scope.row.children?'el-icon-caret-bottom':'el-icon-caret-right']" :style="{textIndent:+(scope.row.level - 1)+'em'}"></span>
            <input type="number" v-model="scope.row.num" :disabled='scope.row.disable' placeholder="序号">
          </template>
        </el-table-column>
        <el-table-column label="菜单名称" width="160">
          <template slot-scope="scope">
            <el-input type="text" v-model="scope.row.name" :disabled='scope.row.disable' placeholder="请输入菜单名称" clearable size="small"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="路由" width="280">
          <template slot-scope="scope">
            <el-input type="text" v-model="scope.row.url" :disabled='scope.row.disable' placeholder="请输入" clearable size="small"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="参数" width="120">
          <template slot-scope="scope">
            <el-input type="text" v-model="scope.row.parms" :disabled='scope.row.disable' placeholder="请输入" clearable size="small"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="图标" width="120">
          <template slot-scope="scope">
            <el-input type="text" v-model="scope.row.icon" :disabled='scope.row.disable' placeholder="请输入" clearable size="small"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="备注" width="120">
          <template slot-scope="scope">
            <el-input type="text" v-model="scope.row.remark" :disabled='scope.row.disable' placeholder="请输入" clearable size="small"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100">
          <template slot-scope="scope">
            <el-select v-model="scope.row.status" placeholder="请选择" :disabled='scope.row.disable' default-first-option size="small">
              <el-option v-for="item in status" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="240" fixed="right">
          <template slot-scope="scope">
            <div class="option" v-if="scope.row.id">
              <el-button type="text" @click="addChildMeun(scope.row.id,scope.row.name)">添加子菜单</el-button> 丨
              <el-button type="text" @click="scope.row.disable = !scope.row.disable" v-if="scope.row.disable">编辑</el-button>
              <el-button type="text" @click="save(scope.row)" v-else>完成</el-button> 丨
              <el-button type="text" @click="del(scope.row.id)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>


<script>
import BreadCrumb from '@/components/public/breadcrumb' //面包屑导航栏
import { mapGetters } from 'vuex'
import API from '@/store/API/index'

import TreeMeun from '@/assets/js/treeMeun'
import RegEx from '@/assets/js/RegEx' //正则验证
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
      router: [
        {
          url: '/',
          name: '首页'
        },
        {
          url: '/container/backgroundMenu',
          name: '后台菜单'
        }
      ],
      // 表单数据
      tableData: [],
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
      ]
    }
  },
  methods: {
    // 判断选中条目信息是否完整
    judgeMsg(arr) {
      if (arr) {
        for (let i = 0; i < arr.length; i++) {
          if (
            arr[i].num == '' ||
            RegEx.number(arr[i].num) == false ||
            arr[i].num == undefined
          ) {
            this.$message({
              type: 'warning',
              message: '请检查，序号为必填项且必须为数字！'
            })
            return false
          } else if (arr[i].name == '' || arr[i].name == undefined) {
            this.$message({
              type: 'warning',
              message: '请检查，菜单名称为必填项！'
            })
            return false
          } else if (arr[i].url == '' || arr[i].url == undefined) {
            this.$message({
              type: 'warning',
              message: '请检查，路由为必填项！'
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
          message: '该菜单已存在，请不要重复添加！'
        })
        return false
      }
    },
    // 获取菜单列表
    list() {
      let _this = this
      API.backgroundMenuList({
        id: this.hotel.id
      })
        .then(function(res) {
          if (res.error_code == 0) {
            let data = TreeMeun.recursionMenu(res.data)
            _this.tableData = data
          } else {
            _this.$message({
              type: 'warning',
              message: '请求列表失败'
            })
          }
        })
        .catch(function(err) {
          console.log(err)
          _this.$message({
            type: 'warning',
            message: '请求列表失败'
          })
        })
    },
    // 处理菜单列表数据
    recursionMenu(data) {
      let newData = []
      function recursion(data) {
        for (let i in data) {
          if (data.hasOwnProperty(i)) {
            data[i].num = i
            newData.push(data[i])
            if (data[i].children) {
              recursion(data[i].children)
            }
          }
        }
      }
      recursion(data)
      return newData
    },
    // 更改保存
    save(row) {
      let _this = this
      let arr = []
      arr.push(row)
      let b = this.judgeMsg(arr)
      if (b == false) {
        // this.list()
        return
      }
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
          API.backgroundMenuAmend(row.id, {
            num: row.num,
            parent_id: row.parent_id,
            name: row.name,
            url: row.url,
            parms: row.parms,
            remark: row.remark,
            icon: row.icon,
            status: row.status,
            hotel_id: this.hotel_id
          })
            .then(function(res) {
              if (res.error_code == 0) {
                _this.$message({
                  type: 'success',
                  message: '修改成功!'
                })
                row.disable = !row.disable
              } else {
                // _this.list()
                _this.$message({
                  type: 'warning',
                  message: '修改失败'
                })
              }
            })
            .catch(function() {
              // _this.list()
              _this.$message({
                type: 'warning',
                message: '修改失败'
              })
            })
        })
        .catch(() => {
          _this.list()
          _this.$message({
            type: 'info',
            message: '已取消更改'
          })
        })
    },
    del(id) {
      let _this = this
      this.$confirm('此操作将删除该条目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          API.backgroundMenuDel(id)
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
                _this.list()
                _this.$message({
                  type: 'warning',
                  message: '删除失败'
                })
              }
            })
            .catch(function() {
              _this.list()
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
    addChildMeun(id, menuName) {
      this.$router.push({
        path: '/container/addMenu',
        query: {
          id: id,
          menuName: menuName
        }
      })
    }
  },
  mounted() {
    this.list()
  }
}
</script>


<style lang="scss">
.bM-container {
  box-sizing: border-box;
  height: 100%;
  font-size: 14px;
  padding-bottom: 30px;
  overflow: auto !important;
  .el-table td .option {
    color: #e6e6e6;
  }
  .el-table td .option span {
    color: #6a9df6;
  }
  .el-table td:nth-of-type(1) {
    text-align: left;
  }
  .el-table td input[type='number'] {
    width: 60px;
    height: 30px;
    border: 1px solid #e6e6e6;
    border-radius: 4px;
  }
  .el-button + .el-button {
    margin-left: 0;
  }
}
</style>
