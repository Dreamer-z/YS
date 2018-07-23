<template>
  <div class="aM-container">
    <bread-crumb :child-msg='router'></bread-crumb>
    <ul class="menuCloumn" v-loading="loading">
      <li class="cloumn">
        <div class="title require">上级：</div>
        <el-select v-model="formData.parent_id" placeholder="请选择" default-first-option>
          <el-option v-for="item in level" :key="item.key" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </li>
      <li class="cloumn">
        <div class="title require">名称：</div>
        <el-input placeholder="请输入菜单名称" v-model="formData.name" clearable size="small"></el-input>
      </li>
      <li class="cloumn">
        <div class="title require">路由：</div>
        <el-input v-model="formData.url" clearable size="small"></el-input>
      </li>
      <li class="cloumn">
        <div class="title">参数：</div>
        <el-input v-model="formData.prams" clearable size="small"></el-input>
      </li>
      <li class="cloumn">
        <div class="title">图标：</div>
        <!-- <el-input v-model="formData.icon.name" clearable></el-input> -->
        <el-input clearable size="small"></el-input>
        <!-- <div class="option" @click="chooseIcon">选择图标</div> -->
      </li>
      <li class="cloumn remind">
        <div class="title">备注：</div>
        <el-input type="textarea" resize='none' placeholder="请输入内容" v-model="formData.remind" clearable :autosize='{minRows: 2, maxRows: 6}' size="small"></el-input>
      </li>
      <li class="cloumn">
        <div class="title">状态：</div>
        <el-select v-model="formData.status" placeholder="请选择" default-first-option size="small">
          <el-option v-for="item in status" :key="item.key" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </li>
    </ul>
    <el-row class="optionsBtn">
      <el-button class="btn" type="primary" size="small" @click="add">添加</el-button>
      <el-button class="btn" size="small" @click="back">返回</el-button>
    </el-row>
  </div>
</template>

<script>
import BreadCrumb from '@/components/public/breadcrumb' //面包屑导航栏
import { routs } from '@/assets/js/routs'
import { mapGetters } from 'vuex'
import API from '@/store/API'

import TreeMeun from '@/assets/js/treeMeun'
export default {
  components: {
    BreadCrumb
  },
  computed: {
    ...mapGetters({
      hotel: 'currHotel'
    })
  },
  data() {
    return {
      // 面包屑导航路径及名称
      router: [routs.index, routs.addMenu],
      prams: null,
      formData: {
        parent_id: '',
        name: '',
        url: '',
        prams: '',
        icon: '',
        remind: '',
        status: 1
      },
      // 加载
      loading: true,
      //   菜单选项
      level: [],
      //   状态选项
      status: [
        {
          value: 1,
          label: '显示'
        },
        {
          value: 0,
          label: '不显示'
        }
      ]
      //   类型选项
      // type: ['一级菜单', '二级菜单', '三级菜单']
    }
  },
  methods: {
    // 验证
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
          if (arr[i].url == '' || arr[i].url == undefined) {
            this.$message({
              type: 'warning',
              message: '请检查，路由地址为必填项！'
            })
            return false
          }
        }
      }
    },
    // 验证是否重复
    judgeRep(arr) {
      let level = this.level
      let n = 0
      if (arr) {
        for (let j = 0; j < level.length; j++) {
          if (arr.name == level[j].label) {
            n++
          }
        }
      }
      if (n >= 1) {
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
          _this.formData.parent_id = 0
          if (res.error_code == 0) {
            _this.loading = false
            let level = []
            level.push({ label: '无', value: 0 })
            let data = TreeMeun.recursionMenu(res.data)
            for (let i = 0; i < data.length; i++) {
              level.push({
                label: data[i].name,
                value: data[i].id
              })
            }
            _this.level = level
            _this.newData()
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
    newData() {
      if (this.$route.query.id) {
        this.formData.parent_id = this.$route.query.id
      } else {
        return
      }
    },
    //选择图标
    chooseIcon() {
      alert('选择图标')
    },
    //添加
    add() {
      let _this = this
      this.formData.hotel_id = this.hotel.id
      let data = this.formData
      let jud = [this.formData]
      let b = this.judgeMsg(jud)
      if (b == false) {
        return
      }
      let p = this.judgeRep(data)
      if (p == false) {
        return
      }
      this.$confirm('是否添加?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          API.addbackgroundMenu(data)
            .then(function(res) {
              if (res.error_code == 0) {
                _this.list()
                _this.$message({
                  type: 'success',
                  message: '新增成功!'
                })
                _this.formData = {
                  parent_id: 0,
                  name: '',
                  url: '',
                  prams: '',
                  icon: '',
                  remind: '',
                  status: 1
                }
              } else {
                _this.list()
                _this.$message({
                  type: 'warning',
                  message: '新增失败'
                })
              }
            })
            .catch(function() {
              _this.list()
              _this.$message({
                type: 'warning',
                message: '新增失败'
              })
            })
          // this.formData = {
          //   parent_id: 0,
          //   name: '',
          //   url: '',
          //   prams: '',
          //   icon: '',
          //   remind: '',
          //   status: 1
          // }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消添加'
          })
        })
    },
    back() {
      this.$router.push({
        path: '/container/backgroundMenu'
      })
    }
  },
  mounted() {
    this.list()
  }
}
</script>

<style lang="scss">
.aM-container {
  box-sizing: border-box;
  height: 100%;
  font-size: 14px;
  overflow: auto !important;
  .menuCloumn {
    display: flex;
    flex-direction: column;
    font-size: 14px;
    color: #333;
    .cloumn {
      display: flex;
      align-items: center;
      margin-bottom: 8px;
      .title {
        box-sizing: border-box;
        padding-right: 30px;
        width: 100px;
        text-align: right;
        position: relative;
      }
      .title.require::after {
        content: '*';
        color: #dc4233;
        position: absolute;
        right: 20px;
      }
      .el-input {
        width: auto;
      }
      & input {
        box-sizing: border-box;
        width: 300px;
        height: 30px;
        padding: 0 10px;
        border: solid 1px #e6e6e6;
        border-radius: 4px;
      }
      .option {
        color: #6a9df6;
        margin-left: 20px;
        cursor: pointer;
      }
    }
    .remind {
      .el-textarea {
        width: 857px;
      }
    }
  }
  .optionsBtn {
    box-sizing: border-box;
    padding-left: 100px;
    margin-top: 60px;
    button {
      width: 100px;
      height: 30px;
    }
  }
}
</style>
