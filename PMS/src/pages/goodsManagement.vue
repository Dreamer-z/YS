<template>
  <div class="gM-container">
    <bread-crumb :child-msg='router'></bread-crumb>
    <el-row class="optionsBtn">
      <el-button class="btn" type="primary" size="small" @click="add">新增</el-button>
      <!-- <el-button class="btn" size="small">停用</el-button>
      <el-button class="btn" size="small" @click="del">删除</el-button> -->
      <el-button class="btn" size="small" :disabled="disableClick" @click="addGoods">保存</el-button>
    </el-row>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" height='85%' style="width: 1030px" border @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="58"></el-table-column>
      <el-table-column label="编号" width="100">
        <template slot-scope="scope">
          <!-- {{scope.row.num}} -->
          <el-input type="number" v-model="scope.row.num" :disabled='scope.row.disable' placeholder="请输入编号" clearable size="small"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="所属类目" width="160">
        <template slot-scope="scope">
          <el-select v-model="scope.row.category_id" placeholder="请选择或输入" :disabled='scope.row.disable' clearable size="small">
            <el-option v-for="item in type" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" width="280">
        <template slot-scope="scope">
          <el-input type="text" v-model="scope.row.name" :disabled='scope.row.disable' placeholder="请输入商品名称" clearable size="small"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="价格" width="160">
        <template slot-scope="scope">
          <el-input type="text" v-model="scope.row.price" :disabled='scope.row.disable' placeholder="请输入价格" clearable size="small"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="130">
        <template slot-scope="scope">
          <el-select v-model="scope.row.status" placeholder="请选择" :disabled='scope.row.disable' size="small">
            <el-option v-for="item in status" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="140" fixed="right">
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
import Reg from '@/assets/js/RegEx'
import { mapGetters } from 'vuex'
import API from '@/store/API'
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
      router: [routs.index, routs.goodsManagement],
      // 表单数据
      tableData: [],
      // 选中表单条目数据
      multipleSelection: [],
      // 类型下拉菜单选项
      type: [],
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
      canAdd: true,
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
          if (arr[i].num == '' || Reg.number(arr[i].num) == false || arr[i].num == undefined) {
            this.$message({
              type: 'warning',
              message: '请检查，编号为必填项且必须为数字！'
            })
            return false
          } else if (arr[i].category_id == '' || arr[i].category_id == undefined) {
            this.$message({
              type: 'warning',
              message: '请检查，所属类别为必填项！'
            })
            return false
          } else if (arr[i].name == '' || arr[i].name == undefined) {
            this.$message({
              type: 'warning',
              message: '请检查，商品名称为必填项！'
            })
            return false
          } else if (arr[i].price == '' || arr[i].price == undefined || Reg.price(arr[i].price) == false) {
            this.$message({
              type: 'warning',
              message: '请检查，价格为必填项,且少于7位数，小数点后最多两位！'
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
          message: '该商品已存在或编号重复，请不要重复添加！'
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
      if (!this.canAdd) {
        this.$alert(
          '您还没有设置商品类型，请先添加商品类型再执行添加商品的操作！',
          '提示',
          {
            confirmButtonText: '确定',
            showCancelButton: false
          }
        )
        return
      }
      this.tableData.unshift({
        num: this.tableData.length + 1,
        category_id: '',
        name: '',
        price: '',
        status: 1,
        hotel_id: this.hotel.id,
        disable: false
      })
      this.$refs.multipleTable.toggleRowSelection(this.tableData[0])
    },
    goodsTypeList() {
      var requestGoodsType = API.goodsTypeList({
        id: this.hotel.id
      })
      return Promise.all([requestGoodsType])
    },
    // 请求商品列表
    async goods() {
      try {
        var result = await this.goodsTypeList()
        if (result.length != 1) {
          this.$message({
            type: 'warning',
            message: '请求数据失败'
          })
          return
        }
        var res = result[0]
        let type = []
        if (res.error_code == 0) {
          if (res.data.length == 0) {
            this.canAdd = false
            this.$alert(
              '您还没有设置商品类型，请先添加商品类型在执行添加商品的操作！',
              '提示',
              {
                confirmButtonText: '确定',
                showCancelButton: false
                // callback: action => {
                //   if(action == 'confirm'){
                //     this.$router.push('/container/goodsType');
                //   }
                // }
              }
            )
          }
          for (let i = 0; i < res.data.length; i++) {
            type.push({
              label: res.data[i].name,
              value: parseInt(res.data[i].id)
            })
          }
          this.type = type
        } else {
          this.$message({
            type: 'warning',
            message: '请求商品分类列表失败'
          })
        }
      } catch (e) {
        console.log(e)
      }

      this.goodsList()
    },
    goodsList(){
      let _this = this
      API.goodsList({
        id: this.hotel.id
      })
        .then(function(res) {
          if (res.error_code == 0) {
            _this.tableData = res.data
          } else {
            _this.$message({
              type: 'warning',
              message: '请求商品列表失败'
            })
          }
          _this.disableClick = false
        })
        .catch(function() {
          _this.$message({
            type: 'warning',
            message: '请求商品列表失败'
          })
          _this.disableClick = false
        })
    },
    addGoods() {      
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
      API.goodsAdd(sj)
        .then(function(res) {
          if (res.error_code == 0) {
            _this.goodsList()
            _this.$message({
              type: 'success',
              message: '新增商品成功!'
            })
          } else {
            // _this.goodsList()
            _this.$message({
              type: 'warning',
              message: '新增商品失败'
            })
            _this.disableClick = false
          }
        })
        .catch(function() {
          // _this.goodsList()
          _this.$message({
            type: 'warning',
            message: '新增商品失败'
          })
        })
    },
    //更改
    save(row) {
      let _this = this
      let arr = []
      arr.push(row)
      let b = this.judgeMsg(arr)
      if (b == false) {
        // this.goodsList()
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
          API.goodsAmend(row.id, {
            status: row.status,
            name: row.name,
            describe: row.describe,
            price: row.price,
            category_id: row.category_id,
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
                // _this.goodsList()
                _this.$message({
                  type: 'warning',
                  message: '修改失败'
                })
              }
            })
            .catch(function() {
              // _this.goodsList()
              _this.$message({
                type: 'warning',
                message: '修改失败'
              })
            })
        })
        .catch(() => {
          _this.goodsList()
          _this.$message({
            type: 'info',
            message: '已取消更改'
          })
        })
    },
    //删除商品
    del(id) {
      let _this = this
      this.$confirm('此操作将删除该条目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          API.goodsDel(id)
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
                _this.goodsList()
                _this.$message({
                  type: 'warning',
                  message: '删除失败'
                })
              }
            })
            .catch(function() {
              _this.goodsList()
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
    this.goods()
    this.goodsTypeList()
  }
}
</script>

<style lang="scss" scoped>
.gM-container {
  box-sizing: border-box;
  height: 100%;
  font-size: 14px;
  overflow: auto !important;
  .el-table td .option {
    color: #e6e6e6;
  }
  .el-table td .option span {
    color: #6a9df6;
  }
}
</style>
