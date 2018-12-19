<template>
  <div class="cl-container ">
    <el-row class="optionsBtn">
      <el-button class="btn" type="primary" size="small" @click="add">新增</el-button>
      <el-button class="btn" size="small">停用</el-button>
      <el-button class="btn" size="small" @click="del">删除</el-button>
      <el-button class="btn" size="small" :loading="false">保存</el-button>
    </el-row>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" height="85%" style="width: 980px" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="58"></el-table-column>
      <el-table-column label="班次号" width="100">
        <template slot-scope="scope">
          <el-input type="text" v-model="scope.row.classes" :disabled='scope.row.disable' clearable size="small"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="班次名称" width="120">
        <template slot-scope="scope">
          <el-input type="text" v-model="scope.row.classesName" :disabled='scope.row.disable' clearable size="small"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="开始时间" width="300">
        <template slot-scope="scope">
          <!-- <el-time-select v-model="scope.row.startTime" :picker-options="{start: '00:00',step: '00:30',end: '23:30'}" placeholder="选择时间" :disabled="scope.row.disable"></el-time-select> -->
          <el-time-select placeholder="开始时间" v-model="scope.row.startTime" :picker-options="{start: '00:00',step: '00:30',end: '23:30'}" :disabled="scope.row.disable" size="small">
          </el-time-select>
        </template>
      </el-table-column>
      <el-table-column label="结束时间" width="300">
        <template slot-scope="scope">
          <!-- <el-time-select v-model="scope.row.endTime" :picker-options="{start: '00:00',step: '00:30',end: '23:30'}" placeholder="选择时间" :disabled="scope.row.disable"></el-time-select> -->
          <el-time-select placeholder="结束时间" v-model="scope.row.endTime" :picker-options="{start: '00:00',step: '00:30',end: '23:30',minTime: scope.row.startTime}" :disabled="scope.row.disable" size="small">
          </el-time-select>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="scope.row.disable = !scope.row.disable">{{scope.row.disable?'编辑':'完成'}}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 表单数据
      tableData: [
        {
          id: '0',
          classes: '001',
          classesName: '凌晨班',
          startTime: '13:30',
          endTime: '13:30',
          disable: true
        },
        {
          id: '1',
          classes: '002',
          classesName: '晚班班',
          startTime: '13:30',
          endTime: '13:30',
          disable: true
        },
        {
          id: '2',
          classes: '003',
          classesName: '中班班',
          startTime: '13:30',
          endTime: '13:30',
          disable: true
        }
      ],
      // 选中表单条目数据
      multipleSelection: []
    }
  },
  methods: {
    // 选中表单条目数据
    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val
    },    
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
      let n = []
      if (arr) {
        for (let i = 0; i < arr.length; i++) {
          n[i] = 0
          for (let j = 0; j < tableData.length; j++) {
            if (arr[i].name == tableData[j].name) {
              n[i]++
            }
          }
        }
      }
      for (let i = 0; i < n.length; i++) {
        if (n[i] > 1) {
          this.$message({
            type: 'warning',
            message: '该班次已存在，请不要重复添加！'
          })
          return false
        }
      }
    },
    add() {
      this.tableData.unshift({
        id: this.tableData.length,
        classes: '',
        classesName: '',
        startTime: '',
        endTime: '',
        disable: false
      });
      this.$refs.multipleTable.toggleRowSelection(this.tableData[0]);
    },
    del() {
      if (this.multipleSelection.length == 0) {
        this.$message({
          type: 'warning',
          showClose: true,
          message: '请先选择条目',
          center: true
        })
        return
      }
      this.$confirm('此操作将删除该条目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          console.log(this.multipleSelection)
          let arr = this.multipleSelection

          for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < this.tableData.length; j++) {
              if (arr[i].id == this.tableData[j].id) {
                this.tableData.splice(j, 1)
              }
            }
          }
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.cl-container {
  box-sizing: border-box;
  height: 100%;
}
</style>
