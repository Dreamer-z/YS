<template>
  <div class="menber-card">
    <bread-crumb :child-msg='router'></bread-crumb>
    <el-row class="optionsBtn">
      <el-button class="btn" type="primary" size="small" @click="add">新增</el-button>
      <el-button class="btn" size="small" :disabled="disableClick" @click="addMemberCard">保存</el-button>
    </el-row>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" height='85%' style="width: 903px" border @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="58"></el-table-column>
      <el-table-column label="等级" width="180">
        <template slot-scope="scope">
          <el-input type="text" v-model="scope.row.level" placeholder="数字越大等级越高" :disabled="scope.row.disable" clearable size="small"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="名称" width="200">
        <template slot-scope="scope">
          <el-input type="text" v-model="scope.row.name" placeholder="请输入" :disabled="scope.row.disable" clearable size="small"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="等级折扣" width="160">
        <template slot-scope="scope">
          <el-input type="text" v-model="scope.row.discount" placeholder="请输入，如0.98" :disabled="scope.row.disable" clearable size="small"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="年费" width="140">
        <template slot-scope="scope">
          <el-input type="number" v-model="scope.row.annual_fee" placeholder="请输入" :disabled="scope.row.disable" clearable size="small"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="163" fixed="right">
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
import { routs } from '@/assets/js/routs' //面包屑导航栏地址

import { mapGetters } from 'vuex'
import API from '@/store/API/index'
import RegEx from '@/assets/js/RegEx'//正则验证
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
      router: [routs.index, routs.memberCard],
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
          if (arr[i].level == '' || RegEx.number(arr[i].level) == false || arr[i].level == undefined) {
            this.$message({
              type: 'warning',
              message: '请检查，会员等级为必填项且必须为数字！'
            })
            return false
          } else if (arr[i].name == '' || arr[i].name == undefined) {
            this.$message({
              type: 'warning',
              message: '请检查，会员名称为必填项！'
            })
            return false
          } else if (arr[i].discount  == '' || RegEx.discount(arr[i].discount) == false || arr[i].discount  == undefined) {
            this.$message({
              type: 'warning',
              message: '请检查，折扣为必填项且必须为小于等于1的数字，如0.98！'
            })
            return false
          }else if (arr[i].annual_fee == '' || RegEx.number(arr[i].level) == false || arr[i].annual_fee == undefined) {
            this.$message({
              type: 'warning',
              message: '请检查，年费为必填项且必须为数字！'
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
            if (arr[i].name == tableData[j].name || arr[i].level == tableData[j].level) {
              n++;
            }
          }
        }
      }
      if (n > 1) {
        this.$message({
          type: 'warning',
          message: '该会员等级或名称已存在，请不要重复添加！'
        })
        return false
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
        level: '',
        name: '',
        discount: '',
        annual_fee: '',
        hotel_id: this.hotel.id,
        disable: false
      })
      this.$refs.multipleTable.toggleRowSelection(this.tableData[0])
    },
    // 获取会员等级列表
    memberLevelList() {
      let _this = this
      API.memberLevelList({
        id: this.hotel.id
      })
        .then(function(res) {
          if (res.error_code == 0) {
            _this.tableData = res.data
          } else {
            _this.$message({
              type: 'warning',
              message: '获取会员等级列表失败'
            })
          }
          _this.disableClick = false
        })
        .catch(function(err) {
          console.log(err)
          _this.$message({
            type: 'warning',
            message: '获取会员等级列表失败'
          })
          _this.disableClick = false
        })
    },
    // 添加保存
    addMemberCard() {      
      if(this.multipleSelection.length == 0){
        this.$message({
          type: 'warning',
          message: '请先新增条目'
        })
        return
      };
      let _this = this
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
      API.memberLevelAdd(sj)
        .then(function(res) {
          if (res.error_code == 0) {
            _this.memberLevelList()
            _this.$message({
              type: 'success',
              message: '新增成功!'
            })
          } else {
            // _this.memberLevelList()
            _this.$message({
              type: 'warning',
              message: '新增分类失败'
            })
            _this.disableClick = false
          }
        })
        .catch(function() {
          // _this.memberLevelList()
          _this.$message({
            type: 'warning',
            message: '新增分类失败'
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
        // this.memberLevelList()
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
            API.memberLevelAmend(row.id, row)
              .then(function(res) {
                if (res.error_code == 0) {
                  _this.$message({
                    type: 'success',
                    message: '修改成功!'
                  })
                  row.disable = !row.disable
                } else {
                  // _this.memberLevelList();
                  _this.$message({
                    type: 'warning',
                    message: '修改失败'
                  })
                }
              })
              .catch(function() {
                // _this.memberLevelList();
                _this.$message({
                  type: 'warning',
                  message: '修改失败'
                })
              })
        })
        .catch(() => {
          _this.memberLevelList()
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
            API.memberLevelDel(id)
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
              .catch(function() {
                _this.memberLevelList()
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
  },
  created() {
    this.memberLevelList()
  }
}
</script>

<style lang="scss">
.menber-card {
  box-sizing: border-box;
  height: 100%;
  font-size: 14px;
  overflow: auto !important;
}
</style>
