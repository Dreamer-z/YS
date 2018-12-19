// pages/hotelService/page/roomControl/roomControl.js
import { Slide } from "./../../../../utils/slide.js";
let slide1 = new Slide("vertical");
let slide2 = new Slide("horizontal");
Page({
  /* 页面的初始数据 */
  data: {
    allLamp: false,
    tableLamp: false,
    otherLamp: false,
    ceilingLamp: false,
    luminance: 0,
    // 空调按钮
    controlBtnList: ['冷风', '热风', '排气', '去湿', '自动', '强风'],
    controlBtnChoose:'',
    tempNum:24,
    maxTempNum:40,
    tempType:'',
    // 窗帘
    curtain:false,
    curtainNum:51,
    oLeft: 51,
    ipX: 0, 
    pX: 0,
  },
  /* 生命周期函数--监听页面加载 */
  onLoad: function (options) {

  },
  // 所有灯开关
  allLamp: function () {
    this.setData({ allLamp: !this.data.allLamp });
  },
  // 台灯开关
  tableLamp: function () {
    this.setData({ tableLamp: !this.data.tableLamp });
  },
  // 其他灯开关
  otherLamp: function () {
    this.setData({ otherLamp: !this.data.otherLamp });
  },
  // 吊灯开关
  ceilingLamp: function () {
    this.setData({ ceilingLamp: !this.data.ceilingLamp });
  },
  // 亮度调节
  // 滑动开始
  luminanceInit: function (e) {
    slide1.initPlace(e);
  },
  // 滑动结束
  luminanceEnd: function (e) {
    let result = slide1.endPlace(e, this.data.luminance, 450,0);
    this.setData({ luminance: result })
  },
  // 点击亮度调节
  luminanceClick: function (e){
    let result = slide1.clickComp(e, 225); 
    this.setData({ luminance: result });
  },
  // 温度
  temperature:function(e){
    let type = e.currentTarget.dataset.type;
    let tempNum = this.data.tempNum;
    let maxTempNum = this.data.maxTempNum;
    if (type == 'sub'){
      tempNum--;
      if (tempNum <=16 ){
        tempNum = 16;
      }
      this.setData({ 
        tempNum: tempNum,
        tempType:'sub'
      });
    }else{
      tempNum++; 
      if (tempNum >= maxTempNum) {
        tempNum = maxTempNum;
      };
      this.setData({ 
        tempNum: tempNum,
        tempType:'add'
      });
    }
  },
  // 空调按钮
  controlBtn:function(e){
    let ind = e.currentTarget.dataset.index;
    this.setData({ controlBtnChoose:ind});
  },
  // 窗帘调节
  // 滑动开始
  curtainInit: function (e) {
    slide2.initPlace(e);
  },
  // 滑动结束
  curtainEnd: function (e) {
    let curtain = this.data.curtain;
    let x = e.changedTouches[0].clientX; 
    let y = e.changedTouches[0].clientY;
    let result = slide2.endPlace(e, this.data.curtainNum, 464,51);
    if (result >= 464){
      curtain = true
    }else{
      curtain = false;
    }
    this.setData({ curtainNum: result, curtain: curtain })
  },

})