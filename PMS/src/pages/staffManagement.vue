<template>
  <div class="sM-container">
    <bread-crumb :child-msg='router'></bread-crumb>
    <el-row class="optionsBtn">
      <el-button class="btn" type="primary" size="small" @click="addPopup">新增</el-button>
      <!-- <el-button class="btn" size="small">停用</el-button>
      <el-button class="btn" size="small" @click="del">删除</el-button>
      <el-button class="btn" size="small" :loading="false">保存</el-button> -->
    </el-row>
    <el-table ref="multipleTable" v-loading="loading" :data="tableData" tooltip-effect="dark" height='85%' style="width: 1750px" border @selection-change="handleSelectionChange">
      <!-- <el-table-column type="selection" width="56"></el-table-column> -->
      <el-table-column label="用户名" width="155">
        <template slot-scope="scope">
          <el-input type="text" v-model="scope.row.username" :disabled='scope.row.disable' placeholder="请输入用户名" clearable size="small"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="120">
        <template slot-scope="scope">
          <el-input type="text" v-model="scope.row.name" :disabled='scope.row.disable' placeholder="请输入姓名" clearable size="small"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="部门" width="130">
        <template slot-scope="scope">
          <el-select v-model="scope.row.department_id" placeholder="请选择" :disabled='scope.row.disable' size="small">
            <el-option v-for="item in department" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="岗位" width="150">
        <template slot-scope="scope">
          <el-select v-model="scope.row.job_id" placeholder="请选择" :disabled='scope.row.disable' size="small">
            <el-option v-for="item in station" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="性别" width="110">
        <template slot-scope="scope">
          <el-select v-model="scope.row.sex" placeholder="请选择" :disabled='scope.row.disable' size="small">
            <el-option v-for="item in sex" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="身份证" width="220">
        <template slot-scope="scope">
          <el-input type="text" v-model="scope.row.idcard" :disabled='scope.row.disable' placeholder="请输入身份证号码" clearable size="small"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="手机" width="160">
        <template slot-scope="scope">
          <el-input type="tel" v-model="scope.row.mobile" :disabled='scope.row.disable' placeholder="请输入手机号码" clearable size="small"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="角色" width="200">
        <template slot-scope="scope">
          <el-select v-model="scope.row.role_id" multiple placeholder="请选择" :disabled='scope.row.disable' size="small">
            <el-option v-for="item in role" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="邮箱" width="220">
        <template slot-scope="scope">
          <el-input type="email" v-model="scope.row.email" :disabled='scope.row.disable' placeholder="请输入邮箱" clearable size="small"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="120">
        <template slot-scope="scope">
          <el-select v-model="scope.row.status" placeholder="请选择" :disabled='scope.row.disable' size="small">
            <el-option v-for="item in status" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="163" fixed="right">
        <template slot-scope="scope">
          <div class="option" v-if="scope.row.id">
            <el-button type="text" @click="scope.row.disable = !scope.row.disable" v-if="scope.row.disable">编辑</el-button>
            <el-button type="text" @click="save(scope.row)" v-else>完成</el-button>
            <el-button type="text" @click="del(scope.row.id)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-pagination class="pagination" background :page-size='20' layout="prev, pager, next" :total="1000"></el-pagination> -->
    <popup ref="popup" :popup="popup" @popupOp="popupOp" class="popup-staff">
      <el-form :model="newStaff" :rules="rules" ref="ruleForm" label-width="100px" class="popup-container">
        <el-form-item label="用户名：" prop="username">
          <el-input v-model="newStaff.username" @change="userReg(newStaff.username)" :placeholder="userRegMsg" size="small"></el-input>
        </el-form-item>
        <el-form-item label="姓名：" prop="name">
          <el-input v-model="newStaff.name" size="small"></el-input>
        </el-form-item>
        <el-form-item label="部门：" prop="department_id">
          <el-select v-model="newStaff.department_id" placeholder="请选择" size="small">
            <el-option v-for="item in department" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="岗位：" prop="station_id">
          <el-select v-model="newStaff.job_id" placeholder="请选择" size="small">
            <el-option v-for="item in station" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="性别：" prop="sex">
          <el-select v-model="newStaff.sex" placeholder="请选择" size="small">
            <el-option v-for="item in sex" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机：" prop="mobile">
          <el-input v-model="newStaff.mobile" type="tel" @change="telReg(newStaff.tel)" :placeholder="telRegMsg" size="small"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" prop="email">
          <el-input v-model="newStaff.email" type="email" @change="emailReg(newStaff.email)" :placeholder="emailRegMsg" size="small"></el-input>
        </el-form-item>
        <el-form-item label="身份证号：" prop="idcard">
          <el-input v-model="newStaff.idcard" type="text" @change="idReg(newStaff.idcard)" :placeholder="idRegMsg" size="small"></el-input>
        </el-form-item>
        <el-form-item label="角色：" prop="role_id">
          <el-select v-model="newStaff.role_id" multiple placeholder="请选择" size="small">
            <el-option v-for="item in role" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input v-model="newStaff.password" type="text" size="small"></el-input>
        </el-form-item>
      </el-form>
      <div class="status">
        <span>是否启用</span>
        <el-radio-group v-model="newStaff.status">
          <el-radio v-for="item in status" :label="item.value" :key="item.key">{{item.label}}</el-radio>
        </el-radio-group>
      </div>
    </popup>
  </div>
</template>

<script>
import BreadCrumb from '@/components/public/breadcrumb' //面包屑导航栏
import { routs } from '@/assets/js/routs'
import Popup from '@/components/public/popup' //弹窗
import { mapGetters } from 'vuex'
import API from '@/store/API'
import Reg from '@/assets/js/RegEx'
export default {
  components: {
    BreadCrumb,
    Popup
  },
  computed: {
    ...mapGetters({
      hotel: 'currHotel'
    })
  },
  data() {
    return {
      // 面包屑导航路径及名称
      router: [routs.index, routs.staff],
      // 表单数据
      tableData: [],
      // 加载动画
      loading: true,
      // 选中表单条目数据
      multipleSelection: [],
      canAdd: true,
      // 部门下拉菜单选项
      department: [],
      // 岗位下拉菜单选项
      station: [],
      // 性别下拉菜单选项
      sex: [{ label: '男', value: 0 }, { label: '女', value: 1 }],
      // 角色下拉菜单选项
      role: [],
      // 状态下拉菜单选项
      status: [{ label: '禁用', value: 0 }, { label: '启用', value: 1 }],
      // 弹窗
      popup: {
        title: '添加员工',
        width: 625,
        confirmText: '完成',
        cancelText: '取消'
      },
      newStaff: {
        username: '',
        name: '',
        department_id: '',
        job_id: '',
        sex: '',
        idcard: '',
        mobile: '',
        role_id: '',
        email: '',
        password: '',
        status: 1
      },
      rules: {
        username: [
          {
            required: true,
            message: '请用6-20位数字字母和_或.或@',
            trigger: 'blur'
          }
        ],
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        department_id: [
          { required: true, message: '请选择部门', trigger: 'change' }
        ],
        job_id: [{ required: true, message: '请选择岗位', trigger: 'change' }],
        sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
        mobile: [
          { required: true, message: '请填写正确号码', trigger: 'blur' },
          { min: 11, max: 11, message: '请填写正确号码', trigger: 'blur' }
        ],
        email: [{ required: false, message: '请输入邮箱', trigger: 'blur' }],
        idcard: [
          { required: true, message: '请输入正确身份证号码', trigger: 'blur' },
          { min: 15, max: 18, message: '请填写正确身份证号码', trigger: 'blur' }
        ],
        role_id: [{ required: true, message: '角色', trigger: 'change' }]
      },
      userRegMsg: '',
      telRegMsg: '',
      idRegMsg: '',
      emailRegMsg: ''
    }
  },
  methods: {
    // 选中表单条目数据
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 判断选中条目信息是否完整
    judgeMsg(arr) {
      if (arr) {
        for (let i = 0; i < arr.length; i++) {
          if (
            arr[i].username == '' ||
            arr[i].username == undefined ||
            Reg.account(arr[i].username) == false
          ) {
            this.$message({
              type: 'warning',
              message:
                '请检查，用户名为必填项，请用4-20位数字字母和_、.、@的组合！'
            })
            return false
          }
          if (arr[i].name == '' || arr[i].name == undefined) {
            this.$message({
              type: 'warning',
              message: '请检查，姓名为必填项！'
            })
            return false
          }
          if (arr[i].department_id == '' || arr[i].department_id == undefined) {
            this.$message({
              type: 'warning',
              message: '请检查，部门为必填项！'
            })
            return false
          }
          if (arr[i].job_id == '' || arr[i].job_id == undefined) {
            this.$message({
              type: 'warning',
              message: '请检查，岗位为必填项！'
            })
            return false
          }
          if (
            arr[i].idcard == '' ||
            Reg.idReg(arr[i].idcard) == false ||
            arr[i].idcard == undefined
          ) {
            this.$message({
              type: 'warning',
              message: '请检查身份证号格式，身份证号为必填项！'
            })
            return false
          }
          if (
            arr[i].mobile == '' ||
            Reg.telReg(arr[i].mobile) == false ||
            arr[i].mobile == undefined
          ) {
            this.$message({
              type: 'warning',
              message: '请检查手机号格式，手机号为必填项！'
            })
            return false
          }
          if (arr[i].role_id == '' || arr[i].role_id == undefined) {
            this.$message({
              type: 'warning',
              message: '请检查，角色为必填项！'
            })
            return false
          }
          // if (arr[i].status == '' || arr[i].status == undefined) {
          //   this.$message({
          //     type: 'warning',
          //     message: '请检查，状态为必填项！'
          //   })
          //   return false
          // }
        }
      }
    },
    // 验证是否重复
    judgeRep(arr,num) {
      let tableData = this.tableData
      let n = 0
      if (arr) {
        for (let i = 0; i < arr.length; i++) {
          for (let j = 0; j < tableData.length; j++) {
            if (arr[i].username == tableData[j].username) {
              n++
            }
          }
        }
      }
      if (n >= num) {
        this.$message({
          type: 'warning',
          message: '该用户已存在，请不要重复添加！'
        })
        return false
      }
    },
    // 获取部门/岗位/角色
    selectList() {
      var requestDepartment = API.departmentList({
        id: this.hotel.id
      })
      var requestStation = API.stationList({
        id: this.hotel.id
      })
      var requestRole = API.roleList({
        id: this.hotel.id
      })
      return Promise.all([requestDepartment, requestStation, requestRole])
    },
    // 请求员工列表数据
    async staffList() {
      try {
        var result = await this.selectList()
        if (result.length != 3) {
          this.$message({
            type: 'warning',
            message: '请求数据失败'
          })
          return
        }
        var res = result[0]
        if (res.error_code == 0) {
          if (res.data.length == 0) {
            this.canAdd = false
          }
          for (let i = 0; i < res.data.length; i++) {
            this.department[i] = {}
            this.department[i].label = res.data[i].name
            this.department[i].value = res.data[i].id
          }
        } else {
          this.$message({
            type: 'warning',
            message: '请求部门列表失败'
          })
        }
        res = result[1]
        if (res.error_code == 0) {
          if (res.data.length == 0) {
            this.canAdd = false
          }
          for (let i = 0; i < res.data.length; i++) {
            this.station[i] = {}
            this.station[i].label = res.data[i].name
            this.station[i].value = res.data[i].id
          }
        } else {
          this.$message({
            type: 'warning',
            message: '请求岗位列表失败'
          })
        }
        res = result[2]
        if (res.error_code == 0) {
          if (res.data.length == 0) {
            this.canAdd = false
          }
          for (let i = 0; i < res.data.length; i++) {
            this.role[i] = {}
            this.role[i].label = res.data[i].name
            this.role[i].value = res.data[i].id
          }
        } else {
          this.$message({
            type: 'warning',
            message: '请求角色列表失败'
          })
        }
        this.staff();
      } catch (e) {
        console.log(e)
        this.$message({
          type: 'warning',
          message: '请求数据失败'
        })
      }

    },
    // 请求员工列表
    staff(){
      let _this = this
      API.staffList({
        id: this.hotel.id
      })
        .then(function(res) {
          if (res.error_code == 0) {
            _this.loading = false
            let data = []
            for (let i = 0; i < res.data.length; i++) {
              data[i] = {}
              data[i].username = res.data[i].username
              data[i].name = res.data[i].name
              data[i].department_id = res.data[i].department_id
              data[i].job_id = res.data[i].job_id
              data[i].sex = res.data[i].sex
              data[i].id = res.data[i].id
              data[i].idcard = res.data[i].idcard
              data[i].mobile = res.data[i].mobile
              let role_id = []
              let roleArr = res.data[i].role_id.split(',')
              for (let s = 0; s < roleArr.length; s++) {
                role_id.push(Number(roleArr[s]))
              }
              data[i].role_id = role_id
              data[i].email = res.data[i].email
              data[i].password = res.data[i].password
              data[i].status = res.data[i].status
              data[i].disable = res.data[i].disable
            }
            _this.tableData = data
          } else {
            _this.$message({
              type: 'warning',
              message: '请求员工列表失败'
            })
          }
        })
        .catch(function(err) {
          console.log(err)
          _this.$message({
            type: 'warning',
            message: '请求员工列表失败'
          })
        })
    },
    // 新增表单条目弹出窗口
    addPopup() {
      this.hasParent()
      this.$refs.popup.close()
    },
    // 岗位部门角色是否已经设置
    hasParent() {
      if (!this.canAdd) {
        this.$confirm(
          '请您先设置好部门、岗位、角色再执行添加员工操作操作！',
          '提示',
          {
            confirmButtonText: '确定',
            type: 'warning',
            showCancelButton: false
          }
        )
        // return
      }
    },
    // 弹窗点击按钮状态
    popupOp: function(type) {
      if (type == 'confirm') {
        //确认按钮,保存
        this.submitForm('ruleForm')
      } else {
        //取消保存
        this.resetForm('ruleForm')
        this.$refs.popup.close()
      }
    },
    // 更改
    save(row) {
      let _this = this
      let arr = []
      arr.push(row)
      let b = this.judgeMsg(arr)
      if (b == false) {
        // this.staffList()
        return
      }
      let p = this.judgeRep(arr,2)
      if (p == false) {
        return
      }
      this.$confirm('此操作将更改该条目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          API.staffAmend(row.id, {
            username: row.username,
            name: row.name,
            department_id: row.department_id,
            job_id: row.job_id,
            sex: row.sex,
            idcard: row.idcard,
            mobile: row.mobile,
            role_id: row.role_id,
            email: row.email,
            password: row.password,
            status: row.status
          })
            .then(function(res) {
              if (res.error_code == 0) {
                _this.$message({
                  type: 'success',
                  message: '修改成功!'
                })
                row.disable = !row.disable
              } else {
                // _this.staff()
                _this.$message({
                  type: 'warning',
                  message: '修改失败'
                })
              }
            })
            .catch(function(err) {
              console.log(err)
              // _this.staff()
              _this.$message({
                type: 'warning',
                message: '修改失败'
              })
            })
        })
        .catch(() => {
          _this.staff()
          _this.$message({
            type: 'info',
            message: '已取消更改'
          })
        })
    },
    // 删除表单选中条目
    del(id) {
      let _this = this
      this.$confirm('此操作将删除该条目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          API.staffDel(id)
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
              _this.staff()
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
    // 用户名验证
    userReg(account) {
      if (!Reg.account(account)) {
        this.newStaff.username = ''
        this.userRegMsg = '请用4-20位数字字母和_、.、@的组合'
      } else {
        this.userRegMsg = ''
      }
    },
    // 手机号验证
    telReg(tel) {
      if (!Reg.telReg(tel)) {
        this.newStaff.tel = ''
        this.telRegMsg = '手机号格式错误'
      } else {
        this.telRegMsg = ''
      }
    },
    // 身份证号验证
    idReg(idcard) {
      if (!Reg.idReg(idcard)) {
        this.newStaff.idcard = ''
        this.idRegMsg = '身份证号格式错误'
      } else {
        this.idRegMsg = ''
        if (idcard.toString().length == 15) {
          this.newStaff.password = idcard.toString().slice(-6)
        } else {
          this.newStaff.password = idcard.toString().slice(-6)
        }
      }
    },
    // 邮箱验证
    emailReg(email) {
      if (!Reg.email(email)) {
        this.newStaff.email = ''
        this.emailRegMsg = '邮箱格式错误'
      } else {
        this.emailRegMsg = ''
      }
    },
    // 重置验证状态
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 新增员工验证
    submitForm(formName) {
      let _this = this
      this.$refs[formName].validate(valid => {
        if (valid) {
          let arr = [this.newStaff]
          let p = this.judgeRep(arr,1)
          if (p == false) {
            return
          }
          // 验证成功提交数据
          API.addStaff({
            data: [
              {
                hotel_id: this.hotel.id,
                username: this.newStaff.username,
                name: this.newStaff.name,
                department_id: this.newStaff.department_id,
                job_id: this.newStaff.job_id,
                sex: this.newStaff.sex,
                idcard: this.newStaff.idcard,
                mobile: this.newStaff.mobile,
                role_id: this.newStaff.role_id,
                email: this.newStaff.email,
                password: this.newStaff.password,
                status: this.newStaff.status
              }
            ]
          })
            .then(function(res) {
              if (res.error_code == 0) {
                _this.$message({
                  type: 'success',
                  message: '新增成功!'
                })
              } else {
                _this.$message({
                  type: 'warning',
                  message: '新增失败'
                })
              }
              _this.staff()
            })
            .catch(function(err) {
              console.log(err)
              _this.$message({
                type: 'warning',
                message: '新增失败'
              })
              _this.staff()
            })
          this.newStaff = {
            username: '',
            name: '',
            department_id: '',
            station_id: '',
            sex: '',
            idcard: '',
            mobile: '',
            role_id: '',
            email: '',
            password: '',
            status: ''
          }
          this.$refs.popup.close()
        } else {
          return false
        }
      })
    }
  },
  mounted() {
    this.staffList()
    this.hasParent()
  }
}
</script>

<style lang="scss">
.sM-container {
  box-sizing: border-box;
  height: 100%;
  font-size: 14px;
  overflow: auto !important;
}
.popup-container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.status {
  padding-left: 30px;
  padding-top: 10px;
  span {
    margin-right: 10px;
  }
}
.el-form-item {
  width: 50%;
  margin-bottom: 20px;
  // height: 33px;
  line-height: 33px;
  .el-input {
    box-sizing: border-box;
  }
}
.popup-staff {
  .popup {
    height: 80%;
    max-height: 490px;
    .content {
      height: 100%;
      overflow-y: auto !important;
    }
  }
}
</style>
