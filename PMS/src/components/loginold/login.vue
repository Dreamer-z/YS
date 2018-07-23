<template>
  <div class="applogin">  
    <div class="left">
      <header>
        <img class="middle" src="../../assets/images/ys.png" alt=""/>
        <h3 class="middle">湖南云宿智能酒店管理系统</h3>
      </header>
      <div class="text">
        <ul ref="autoplay">
          <transition-group name="fade">            
            <li :key="1" v-show="autoplay == 1">
              <img src="../../assets/images/rz.png" alt="">
            </li>
            <li :key="2" v-show="autoplay == 2">
              <img src="../../assets/images/ds.png" alt="">
            </li>
            <li :key="3" v-show="autoplay == 3">
              <img src="../../assets/images/bh.png" alt="">
            </li>
          </transition-group>
        </ul>
        <ol>
          <li :class="{'bj': autoplay == 1}" class="middle"></li>
          <li :class="{'bj': autoplay == 2}" class="middle"></li>
          <li :class="{'bj': autoplay == 3}" class="middle"></li>
        </ol>
      </div>
      <footer>
        <div>
          <nav class="middle">
            <p>长沙市开福区通泰街街道中山路589号开福万达广场B区商业综合体</p>
            <p>
              <span class="middle mgr">备案号：湘ICP156486465-1</span>
              <span class="middle">电话：0731-89722930</span>
            </p>
          </nav>
        </div>
      </footer>
    </div>
    <div class="right">
      <div class="log">
        <h3>注册</h3>
        <ul>
          <li>
            <input placeholder="手机号" type="text">
          </li>
          <li>
            <input placeholder="手机号" type="text">
            <div @click="getMobileCode" class="get">
              获取验证码
            </div>
          </li>
          <li>
            <input placeholder="手机号" type="text">
          </li>
          <li>
            <input placeholder="手机号" type="text">
          </li>
          <li>
            <input placeholder="手机号" type="text">
          </li>
          <li>
            <input placeholder="手机号" type="text">
          </li>
          <li class="bornone">
            注册
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script src="./index.js"></script>

<style src="./style.scss" lang="scss" scoped></style>
