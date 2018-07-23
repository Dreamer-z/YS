<template>
  <div class="cooperator">
    <bread-crumb :child-msg='router'></bread-crumb>
    <el-row class="optionsBtn">
      <el-button class="btn" type="primary" size="small" @click="add">新增</el-button>
      <el-button class="btn" size="small" :disabled="disableClick" @click="addCooperator">保存</el-button>
    </el-row>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" height='85%' style="width: 1933px" border @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="58"></el-table-column>
      <el-table-column label="序号" width="60">
        <template slot-scope="scope">{{scope.row.num}}</template>
      </el-table-column>
      <el-table-column label="合作单位名称" width="180">
        <template slot-scope="scope">
          <el-input type="text" v-model="scope.row.name" placeholder="请输入" :disabled="scope.row.disable" clearable size="small"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="合作类型" width="140">
        <template slot-scope="scope">
          <el-select v-model="scope.row.type" placeholder="请选择" :disabled="scope.row.disable" default-first-option size="small">
            <el-option v-for="item in type" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="优惠折扣" width="100">
        <template slot-scope="scope">
          <el-input type="text" v-model="scope.row.discount" placeholder="请输入" :disabled="scope.row.disable" clearable size="small"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="联系人" width="120">
        <template slot-scope="scope">
          <el-input type="text" v-model="scope.row.contact" placeholder="请输入" :disabled="scope.row.disable" clearable size="small"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="手机号码" width="160">
        <template slot-scope="scope">
          <el-input type="number" v-model="scope.row.mobile" placeholder="请输入" :disabled="scope.row.disable" clearable size="small"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="地址" width="200">
        <template slot-scope="scope">
          <el-input type="text" v-model="scope.row.address" placeholder="请输入" :disabled="scope.row.disable" clearable size="small"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="合作有效期" width="370">
        <template slot-scope="scope">
          <el-date-picker v-if="!scope.row.disable" v-model="scope.row.time" type="daterange" range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期" size="small"></el-date-picker>
          <div v-else>{{scope.row.time[0]}} ~ {{scope.row.time[1]}}</div>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="140">
        <template slot-scope="scope">
          <el-select v-model="scope.row.status" placeholder="请选择" :disabled="scope.row.disable" default-first-option size="small">
            <el-option v-for="item in status" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="创建人" width="120">
        <template slot-scope="scope">{{scope.row.staff_name}}</template>
      </el-table-column>
      <el-table-column label="创建日期" width="120">
        <template slot-scope="scope">{{scope.row.create_time}}</template>
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
    <!-- <el-pagination class="pagination" background :page-size='20' layout="prev, pager, next" :total="1000"></el-pagination> -->
  </div>
</template>

<script>
import BreadCrumb from '@/components/public/breadcrumb' //面包屑导航栏
import { routs } from '@/assets/js/routs' //面包屑导航栏地址

import { mapGetters } from 'vuex'
import API from '@/store/API/index'
import Reg from '@/assets/js/RegEx'
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
      router: [routs.index, routs.cooperator],
      // 表单数据
      tableData: [],
      disableClick: false,
      // 选中表单条目数据
      multipleSelection: [],
      //   合作类型
      type: [],
      // 状态下拉菜单选项
      status: [{ label: '禁用', value: 0 }, { label: '启用', value: 1 }]
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
          } else if (arr[i].type == '' || arr[i].type == undefined) {
            this.$message({
              type: 'warning',
              message: '请检查，合作类型为必填项！'
            })
            return false
          } else if (
            arr[i].discount == '' ||
            /^(0.)([0-9]{2})|[0-9]{1}/g.test(arr[i].discount) == false ||
            arr[i].discount == undefined
          ) {
            this.$message({
              type: 'warning',
              message: '请检查，则扣率为必填项且必须是数字，如：0.9！'
            })
            return false
          } else if (arr[i].contact == '' || arr[i].contact == undefined) {
            this.$message({
              type: 'warning',
              message: '请检查，联系人为必填项！'
            })
            return false
          } else if (
            arr[i].mobile == '' ||
            Reg.telReg(arr[i].mobile) == false ||
            arr[i].mobile == undefined
          ) {
            this.$message({
              type: 'warning',
              message: '请检查手机号码是否有误，手机号为必填项！'
            })
            return false
          } else if (arr[i].address == '' || arr[i].address == undefined) {
            this.$message({
              type: 'warning',
              message: '请检查，地址为必填项！'
            })
            return false
          } else if (arr[i].time == '' || arr[i].time == undefined) {
            this.$message({
              type: 'warning',
              message: '请检查，合作有效期为必填项！'
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
          message: '该合作单位已存在，请不要重复添加！'
        })
        return false
      }
    },
    // 选中表单条目数据
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 入住客源渠道列表
    getFromWay() {
      let FromWay = API.getFrom()
      return Promise.all([FromWay])
    },
    // 合作单位列表
    async list() {
      try {
        var result = await this.getFromWay()
        if (result.length != 1) {
          this.$message({
            type: 'warning',
            message: '请求客源列表失败'
          })
          return
        }
        var res = result[0]
        if (res.error_code == 0) {
          if (res.data.length == 0) {
            this.$message({
              type: 'warning',
              message: '请求客源列表为空'
            })
          }
          for (let i = 0; i < res.data.length; i++) {
            this.type[i] = {}
            this.type[i].label = res.data[i].name
            this.type[i].value = res.data[i].id
          }
        } else {
          this.$message({
            type: 'warning',
            message: '请求部门列表失败'
          })
        }
        this.cooperatorList();
      } catch (e) {
        this.$message({
          type: 'warning',
          message: '请求合作单位列表失败'
        })
      }
    },
    cooperatorList() {
      let _this = this
      API.cooperatorList({
        id: this.hotel.id
      })
        .then(function(res) {
          if (res.error_code == 0) {
            let data = res.data
            for (let i = 0; i < data.length; i++) {
              let start_time = res.data[i].start_time.split(' ')[0]
              let end_time = res.data[i].end_time.split(' ')[0]
              data[i].time = {}
              // data[i].time[0] = new Date(start_time);
              // data[i].time[1] = new Date(end_time);
              data[i].time[0] = start_time
              data[i].time[1] = end_time
            }
            _this.tableData = data
          } else {
            _this.$message({
              type: 'warning',
              message: '请求合作单位列表失败'
            })
          }
          _this.disableClick = false
        })
        .catch(function(err) {
          console.log(err)
          this.$message({
            type: 'warning',
            message: '请求合作单位列表失败'
          })
          _this.disableClick = false
        })
    },
    // 新增
    add() {
      this.tableData.unshift({
        num: this.tableData.length,
        name: '',
        type: '',
        discount: '',
        contact: '',
        mobile: '',
        address: '',
        status: 1,
        time: '',
        hotel_id: this.hotel.id,
        staff_name: '',
        create_time: '',
        disable: false
      })
      this.$refs.multipleTable.toggleRowSelection(this.tableData[0])
    },
    // 添加保存
    addCooperator() {
      let _this = this
      if (this.multipleSelection.length == 0) {
        this.$message({
          type: 'warning',
          message: '请先新增条目'
        })
        return
      }
      let ms = this.multipleSelection
      this.judgeColumn()
      let b = this.judgeMsg(ms)
      if (b == false) {
        return
      }
      let p = this.judgeRep(ms)
      if (p == false) {
        return
      }
      for (let i = 0; i < ms.length; i++) {
        if (ms[i].id) {
          this.$message({
            type: 'warning',
            message: '修改项目请点击条目右侧按钮'
          })
          return false
        }
      }
      this.disableClick = true
      let data = []
      for (let i = 0; i < ms.length; i++) {
        data[i] = {}
        data[i].name = ms[i].name
        data[i].type = ms[i].type
        data[i].discount = ms[i].discount
        data[i].contact = ms[i].contact
        data[i].mobile = ms[i].mobile
        data[i].address = ms[i].address
        data[i].status = ms[i].status
        data[i].start_time = ms[i].time[0]
          .toLocaleDateString()
          .replace(/\//g, '-')
        data[i].end_time = ms[i].time[1]
          .toLocaleDateString()
          .replace(/\//g, '-')
        data[i].hotel_id = ms[i].hotel_id
      }
      let sj = { data: data }
      API.cooperatorAdd(sj)
        .then(function(res) {
          if (res.error_code == 0) {
            _this.$message({
              type: 'success',
              message: '新增合作单位成功!'
            })
            _this.cooperatorList()
          } else {
            // _this.cooperatorList()
            _this.$message({
              type: 'warning',
              message: '新增合作单位失败'
            })
            _this.disableClick = false
          }
        })
        .catch(function() {
          // _this.cooperatorList()
          _this.$message({
            type: 'warning',
            message: '新增合作单位失败'
          })
          _this.disableClick = false
        })
    },
    // 更改
    save(row) {
      let _this = this
      let arr = []
      arr.push(row)
      let b = this.judgeMsg(arr)
      if (b == false) {
        // this.cooperatorList()
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
          let data = row
          let start_time = row.start_time.split(' ')[0]
          let end_time = row.end_time.split(' ')[0]
          data.start_time = start_time
          data.end_time = end_time
          API.cooperatorAmend(row.id, data)
            .then(function(res) {
              if (res.error_code == 0) {
                _this.$message({
                  type: 'success',
                  message: '修改成功!'
                })
                row.disable = !row.disable
              } else {
                // _this.cooperatorList()
                _this.$message({
                  type: 'warning',
                  message: '修改失败'
                })
              }
            })
            .catch(function() {
              // _this.cooperatorList()
              _this.$message({
                type: 'warning',
                message: '修改失败'
              })
            })
        })
        .catch(() => {
          _this.cooperatorList()
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
          API.cooperatorDel(id)
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
                _this.cooperatorList()
                _this.$message({
                  type: 'warning',
                  message: '删除失败'
                })
              }
            })
            .catch(function() {
              _this.cooperatorList()
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
  mounted() {
    this.list()
  }
}
</script>

<style lang="scss">
.cooperator {
  box-sizing: border-box;
  height: 100%;
}
</style>