<template>
  <div class="rm-container">
    <el-row class="optionsBtn">
      <el-button class="btn" type="primary" size="mini" @click="add">新增</el-button>
      <el-button class="btn" size="mini" :disabled="disableClick" @click="addRool">保存</el-button>
    </el-row>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" height='85%' style="width: 100%"  @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="58"></el-table-column>
      <el-table-column label="角色名称">
        <template slot-scope="scope">
          <el-input type="text" v-model="scope.row.name" placeholder="请输入角色名称" :disabled="scope.row.disable" clearable size="small"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="描述">
        <template slot-scope="scope">
          <el-input type="text" v-model="scope.row.description" placeholder="请输入描述" :disabled="scope.row.disable" clearable size="small"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-select v-model="scope.row.status" placeholder="请选择" :disabled="scope.row.disable" default-first-option size="small">
            <el-option v-for="item in status" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="属性">
        <template slot-scope="scope">{{ scope.row.attribute_name}}</template>
      </el-table-column>
      <el-table-column label="权限设置">
        <template slot-scope="scope">
          <el-button v-if="scope.row.attribute != 0" type="primary" size="mini" @click="permission(scope.row.id)" v-show="scope.row.accredit">权限设置</el-button>
        </template>
      </el-table-column>
      <el-table-column label="授权系统">
        <template slot-scope="scope">
          <el-select v-if="scope.row.attribute != 0" v-model="scope.row.sys_right" multiple placeholder="请选择" :disabled='scope.row.disable' size="small">
          <!-- <el-select v-if="scope.row.attribute != 0" v-model="scope.row.sys_right" @change="accredit(scope.row)" multiple placeholder="请选择" :disabled='scope.row.disable' size="small"> -->
            <el-option v-for="item in service" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div class="option" v-if="scope.row.id && scope.row.attribute != 0">
            <el-button type="text" @click="scope.row.disable = !scope.row.disable" v-if="scope.row.disable">编辑</el-button>
            <el-button type="text" @click="save(scope.row)" v-else>完成</el-button>
            <el-button type="text" @click="del(scope.row.id)">删除</el-button>
          </div>
          <div class="option" v-else-if="!scope.row.id">
            <el-button type="text" @click="localDel(scope.row.num)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <popup :popup="popup" ref="popup" @popupOp="popupOp" class="popup-role">
      <el-tree class="el-tree" :data="treeData" default-expand-all show-checkbox node-key="id" ref="tree" highlight-current :props="defaultProps" @check-change='getCheckedNodes'></el-tree>
    </popup>
  </div>
</template>

<script>
import Popup from '@/components/public/popup' //弹窗
import { mapGetters } from 'vuex'
import API from '@/store/API/index'

import TreeMeun from '@/assets/js/treeMeun'
export default {
  computed: {
    ...mapGetters({
      hotel: 'currHotel'
    })
  },
  components: {
    Popup
  },
  data() {
    return {
      // 表单数据
      tableData: [],
      // 选中表单条目数据
      multipleSelection: [],
      // 状态下拉菜单选项
      status: [{ label: '禁用', value: 0 }, { label: '启用', value: 1 }],
      //弹窗部分数据
      popup: {
        title: '权限设置',
        width: 625,
        confirmText: '确认',
        cancelText: '取消'
      },
      //树形菜单数据结构形式
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      //弹窗树形菜单数据
      treeData: [],
      chooseTreeData: {
        id: '',
        ids: ''
      },
      service: [
        {
          id: 1,
          name: 'PMS系统'
        },
        {
          id: 2,
          name: '酒店管家APP'
        }
      ],
      disableClick: false
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
          if (arr[i].sys_right == '' || arr[i].sys_right == undefined) {
            this.$message({
              type: 'warning',
              message: '请检查，授权系统为必填项！'
            })
            return false
          }
        }
      }
    },
    // 验证是否重复
    judgeRep(arr) {
      let tableData = this.tableData
      let n = []
      if (arr) {
        for (let i = 0; i < arr.length; i++) {
          n[i] = 0
          for (let j = 0; j < tableData.length; j++) {
            if (arr[i].name == tableData[j].name) {
              n[i]++;
            }
          }
        }
      }
      for (let i = 0; i < n.length; i++) {
        if (n[i] > 1) {
          this.$message({
            type: 'warning',
            message: '该角色已存在，请不要重复添加！'
          })
          return false
        }
      }
    },
    // 选中表单条目数据
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 新增
    add() {
      this.tableData.unshift({
        num: this.tableData.length,
        name: '',
        description: '',
        status: 1,
        hotel_id: this.hotel.id,
        attribute: 0,
        sys_right: '',
        attribute: 1,
        accredit: false,
        disable: false
      })
      this.$refs.multipleTable.toggleRowSelection(this.tableData[0])
    },
    // 权限设置开启弹窗,获取权限列表数据
    permission(id) {
      this.chooseTreeData.id = id
      this.$refs.popup.close()
      let _this = this
      API.findMenu({
        id: id
      })
        .then(function(res) {
          let arr = _this.recursionMenu(res.data)
          _this.$refs.tree.setCheckedKeys(arr)
          _this.treeData = res.data
        })
        .catch(function(err) {
          _this.$message({
            type: 'warning',
            message: '请求权限列表失败'
          })
          console.log(err)
        })
    },
    recursionMenu(data) {
      let newData = []
      function recursion(data) {
        for (let i in data) {
          if (data[i].children) {
            recursion(data[i].children)
          } else {
            if (data[i].checked) {
              newData.push(data[i].id)
            }
          }
        }
      }
      recursion(data)
      return newData
    },
    // accredit(row) {
    //   let accredit = false;
    //   for (let i = 0; i < row.sys_right.length; i++) {
    //     if (row.sys_right[i] == 1) {
    //       accredit = true;
    //     }
    //   }
    //   row.accredit = accredit;
    // },
    // 弹窗点击按钮状态
    popupOp: function(type) {
      let _this = this
      if (type == 'confirm') {
        //确认按钮,保存
        this.$refs.popup.close()
        // this.$refs.tree.setCheckedKeys([]);
        API.deployMenu(this.chooseTreeData)
          .then(function(res) {
            if (res.error_code == 0) {
              _this.$message({
                type: 'success',
                message: '配置成功'
              })
            } else {
              _this.$message({
                type: 'warning',
                message: '权限配置失败'
              })
            }
          })
          .catch(function(err) {
            console.log(err)
            _this.$message({
              type: 'warning',
              message: '权限配置失败'
            })
          })
      } else {
        //取消保存
        this.$refs.popup.close()
        this.$refs.tree.setCheckedKeys([])
      }
    },
    // 属性菜单选中列表
    getCheckedNodes() {
      let newArr = this.$refs.tree.getCheckedKeys().join(',')
      this.chooseTreeData.ids = newArr
    },
    // 获取岗位列表
    roleList() {
      let _this = this
      API.roleList({
        id: this.hotel.id
      })
        .then(function(res) {
          if (res.error_code == 0) {
            let data = res.data
            for (let i = 0; i < res.data.length; i++) {
              if (res.data[i].attribute == 1) {
                let arr = res.data[i].sys_right.split(',')
                data[i].sys_right = []
                for (let s = 0; s < arr.length; s++) {
                  data[i].sys_right.push(Number(arr[s]))
                  if(Number(arr[s]) == 1){
                    data[i].accredit = true;
                  };
                }
              }
            }
            _this.tableData = data
          } else {
            _this.$message({
              type: 'warning',
              message: '请求列表失败'
            })
            console.log(res)
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
    // 添加角色
    addRool() {
      console.log(this.multipleSelection)
      if (this.multipleSelection.length == 0) {
        this.$message({
          type: 'warning',
          message: '请先新增条目'
        })
        return
      }
      let _this = this
      let sj = { data: this.multipleSelection }
      let ctb = this.multipleSelection
      this.judgeColumn()
      let b = this.judgeMsg(ctb)
      if (b == false) {
        return
      }
      let p = this.judgeRep(ctb)
      if (p == false) {
        return
      }
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
      API.roleAdd(sj)
        .then(function(res) {
          if (res.error_code == 0) {
            _this.roleList()
            _this.$message({
              type: 'success',
              message: '新增成功!'
            })
          } else {
            // _this.stationList()
            _this.$message({
              type: 'warning',
              message: '新增分类失败'
            })
            _this.disableClick = false
          }
        })
        .catch(function(err) {
          console.log(err)
          // _this.stationList()
          _this.$message({
            type: 'warning',
            message: '新增分类失败'
          })
          _this.disableClick = false
        })
    },
    // 更改
    save(row) {
      console.log(row)
      let _this = this
      let arr = []
      arr.push(row)
      let b = this.judgeMsg(arr)
      if (b == false) {
        //  this.roleList()
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
          API.roleAmend(row.id, {
            name: row.name,
            description: row.description,
            sys_right: row.sys_right,
            status: row.status
          })
            .then(function(res) {
              if (res.error_code == 0) {
                _this.$message({
                  type: 'success',
                  message: '修改成功!'
                })
                _this.roleList()
              } else {
                // _this.roleList()
                _this.$message({
                  type: 'warning',
                  message: '修改失败'
                })
              }
            })
            .catch(function() {
              // _this.roleList()
              _this.$message({
                type: 'warning',
                message: '修改失败'
              })
            })
        })
        .catch(() => {
          _this.roleList()
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
          API.roleDel(id)
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
              console.log(err)
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
    // 未保存添加条目删除
    localDel(num) {
      for (let j = 0; j < this.tableData.length; j++) {
        if (num == this.tableData[j].num) {
          this.tableData.splice(j, 1)
        }
      }
    }
    // // 清除条目选中
    // clear() {
    //   this.$refs.multipleTable.clearSelection()
    // },
  },
  created() {
    this.roleList()
  }
}
</script>

<style lang="scss">
.rm-container {
  box-sizing: border-box;
  padding: 10px 35px;
  overflow-y: auto;
}
.el-tree {
  height: 415px;
  border: 1px solid #e6e6e6;
  overflow-y: auto;
}
.popup-role {
  .popup {
    height: 80%;
    max-height: 571px;
    .content {
      height: 100%;
      overflow-y: auto !important;
    }
  }
}
</style>
