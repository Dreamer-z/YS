<template>
  <div class="leftmenu">
    <h3 class="title"></h3>
    <div class="scroll-bar">
      <el-row class="">
        <el-col :span="24">
          <el-menu style="text-align:center; border: none; font-size: 18px;" default-active="2" class="el-menu-vertical-demo" background-color="#2e3740" text-color="#acaeb1" active-text-color="#6a9df6" unique-opened>
            <el-submenu index="1">
              <template color: red; slot="title">
                <span>酒店管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1">
                  <router-link tag="div" to="/container/roomtypelist">添加房型</router-link>
                </el-menu-item>
                <el-menu-item index="1-2">
                  <router-link tag="div" to="/container/addroom">添加房间</router-link>
                </el-menu-item>
                <el-menu-item index="1-3">
                  <router-link tag="div" to="/container/hotelphotos">酒店相册</router-link>
                </el-menu-item>
                <el-menu-item index="1-4">
                  <router-link tag="div" to="/container/roomtypephotos">房型相册</router-link>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <span>房态中心</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="2-1">
                  <router-link tag="div" to="/container/fangtai">房态图</router-link>
                </el-menu-item>
                <el-menu-item index="2-2">
                  <router-link tag="div" to="/containerwhite/forwardcalendar">远期房态</router-link>
                </el-menu-item>
                <!-- <el-menu-item index="2-3">
                  <router-link tag="div" to="/containerwhite/hotelCalendar">房态日历</router-link>
                </el-menu-item> -->
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <span>预定管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="3-1">
                  <router-link tag="div" to="/containerwhite/quickpreorder">快速预定</router-link>
                </el-menu-item>
                <el-menu-item index="3-2">
                  <router-link tag="div" to="/containerwhite/batchpreorder">批量预定</router-link>
                </el-menu-item>
                <el-menu-item index="3-3">
                  <router-link tag="div" to="/containerwhite/orderlist">预订单列表</router-link>
                </el-menu-item>
                <!-- <el-menu-item index="3-4">
                  <router-link tag="div" to="/containerwhite/oneorderlist">排房显示</router-link>
                </el-menu-item> -->
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <span>账号管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="4-1">
                  <router-link tag="div" to="/container/department">部门设置</router-link>
                </el-menu-item>
                <el-menu-item index="4-2">
                  <router-link tag="div" to="/container/station">岗位设置</router-link>
                </el-menu-item>
                <el-menu-item index="4-3">
                  <router-link tag="div" to="/container/roleManagement">角色管理</router-link>
                </el-menu-item>
                <el-menu-item index="4-4">
                  <router-link tag="div" to="/container/staffManagement">员工管理</router-link>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title">
                <span>系统设置</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="5-1">
                  <router-link tag="div" to="/container/addMenu">添加菜单</router-link>
                </el-menu-item>
                <el-menu-item index="5-2">
                  <router-link tag="div" to="/container/backgroundMenu">后台菜单</router-link>
                </el-menu-item>
                <el-menu-item index="5-3">
                  <router-link tag="div" to="/container/classes">班次设置</router-link>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="6">
              <template slot="title">
                <span>会员系统</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="6-1">
                  <router-link tag="div" to="/containerwhite/taskmanagement">住客详情</router-link>
                </el-menu-item>
                <el-menu-item index="6-2">
                  <router-link tag="div" to="/container/addMember">添加会员</router-link>
                </el-menu-item>
                <el-menu-item index="6-3">
                  <router-link tag="div" to="/container/memberCard">会员卡级设置</router-link>
                </el-menu-item>
                <el-menu-item index="6-4">
                  <router-link tag="div" to="/container/cooperator">合作单位管理</router-link>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="7">
              <template slot="title">
                <span>系统财报</span>
              </template>
            </el-submenu>
            <el-menu-item index="8">
              <router-link slot="title" tag="div" to="/container/auntManagement">阿姨管理</router-link>
            </el-menu-item>
            <el-submenu index="9">
              <template slot="title">
                <span>商品管理</span>
              </template>
              <el-menu-item index="9-1">
                <router-link tag="div" to="/container/goodsType">商品类型设置</router-link>
              </el-menu-item>
              <el-menu-item index="9-2">
                <router-link tag="div" to="/container/goodsManagement">商品设置</router-link>
              </el-menu-item>
            </el-submenu>
            <el-menu-item index="10">
              <router-link slot="title" tag="div" to="/container/checkInManagement">入住管理</router-link>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'leftMenu',
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.leftmenu {
  .router-link-exact-active {
    color: #6a9df6;
  }
  position: fixed;
  width: 200px;
  overflow: hidden;
  min-height: 800px;
  height: 100%;
  background: #2e3740;
  z-index: 91;
  h3 {
    font-weight: nomal;
    font-size: 20px;
    height: 50px;
    line-height: 100px;
    text-align: center;
    background: #1f262e;
    color: #fff;
  }
}

.el-menu-item,
.el-submenu__title {
  height: 45px;
  line-height: 45px;
}
</style>