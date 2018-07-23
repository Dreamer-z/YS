<template>
  <div class="hotel-room">
    <clum-bread :redStar="true" :data="['当前位置','基本资料','房型']"></clum-bread>
    <div class="room-name">
      <p style="color: #6a9df6;">房型名称<span class="sp">*</span></p>
      <input v-model="name" type="text" placeholder="请输入房型名称">
    </div>
    <div class="room-name">
      <p style="color: #6a9df6;">房型代码</p>
      <input @focus="chineseCode = false" @blur="checkCode(code)" v-model="code" class="room-num" type="text" placeholder="请输入英文字母代号">
      <p v-show="!chineseCode" class="ft-12">（注：代号将显示在房间名后缀，此处最好填写房型的简称）</p>
      <span style="color: red;" v-show="chineseCode">(请不要输入中文)</span>
    </div>
    <div class="room-price">
      <p style="color: #6a9df6;">房型价格<span class="sp">*</span></p>
      <div class="mark-pricr middle">
        <p>门市价：</p>
        <input @blur="checkPriceNumber(price)" v-model="price" type="number">
        <span style="color: red;" v-show="priceNumberError">(输入的内容有误)</span>
      </div>
      <div class="mark-pricr middle">
        <p>押金：</p>
        <input @blur="checkDepositNumber(deposit)" v-model="deposit" type="number">
        <span style="color: red;" v-show="depositNumberError">(输入的内容有误)</span>
      </div>
      <div class="free-price">
        <p>积分兑换：</p>
        <el-switch class="switch"
          v-model="support_ponit"
          inactive-text="否"
          active-text="是">
        </el-switch>
      </div>
    </div>
    <div class="room-derective">
      <p style="color: #6a9df6;">房型描述<span class="sp">*</span></p>
      <ul class="list">
        <li>
          <p>可入住人数：<span style="color: red;">*</span></p>
          <!-- <el-select size="medium" v-model="has_bathroom" placeholder="请选择">
            <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select> -->
          <div class="check middle">
            <input @blur="checkOccupancy(occupancy)" v-model="occupancy" readonly style="width: 100%;height: 100%;vertical-align: top;text-indent: 6px;" type="text">
            <nav class="check-nav">
              <div @click="occupancy++" class="check-nav-add">
                <img style="transform: rotate(180deg)" src="@/assets/images/sjx.png" alt="">
              </div>
              <section @click="deleOccupancy" class="check-nav-dele">
                <img src="@/assets/images/sjx.png" alt="">
              </section>
            </nav>
          </div>
        </li>
        <li>
          <p>面积：</p>
          <input @blur="measureOne = Math.floor(measureOne)" v-model="measureOne" class="short" type="number">
          <p>至</p>
          <input @blur="measureTwo = Math.floor(measureTwo)" v-model="measureTwo" class="short" type="number">
          <p>平方米</p>
          <p v-show="numberOne" class="wardtitle">(输入的内容有误)</p>
        </li>
        <li class="margnnone">
          <p>床型尺寸：</p>
          <input @focus="Bed_lengthError = false;" @blur="checkBed_length(bed_length)" v-model="bed_length" class="middle" type="text" placeholder="例：1.8*2.0">
          <p>米/张</p>
          <span style="color: red;" v-show="Bed_lengthError">(输入的内容有误)</span>
        </li>
        <li class="bed">
          <div @click="bed_type = 1">
            <i :class="{'cg-bor': bed_type == 1}"><em :class="{'cg-bj': bed_type == 1}"></em></i>
            <p>大床</p>
          </div>
          <div @click="bed_type = 2">
            <i :class="{'cg-bor': bed_type == 2}"><em :class="{'cg-bj': bed_type == 2}"></em></i>
            <p>双床</p>
          </div>
        </li>
        <li>
          <p>窗户：</p>
          <el-select size="medium" v-model="has_window" placeholder="请选择">
            <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </li>
        <li>
          <p>卫浴：</p>
          <el-select size="medium" v-model="has_bathroom" placeholder="请选择">
            <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </li>
      </ul>
      <user-self-add  :childpagename="pagename" :allFacs="facs" :userSelectFac="selectedFacs"></user-self-add>
      <footer style="width: 330px; margin: 0 auto;">
        <div @click="goBack" style="margin-right: 16px;" class="foot-btn middle">返回</div>
        <div @click="postAndGoback" class="foot-btn middle">确定</div>
      </footer>
    </div>
  </div>
</template>

<script>
import clumBread from "@/components/public/clumbread"
// import selfAdd from "./public/selfadd"
import userSelfAdd from "@/components/public/userselfadd"
import API from "@/store/API"
import { mapGetters } from 'vuex'
export default{
  name:'addroomtype',
  data(){
    return {
      isFill: false,
      deposit: '',  //押金
      depositNumberError: false,
      occupancy: 2, // 可入住的人数
      chineseCode: false,
      Bed_lengthError: false,
      priceNumberError: false,
      mode:'',//新增:add  编辑:edit
      romm_type_id:0,
      name: '',//  是 string  房型名称
      code: '', //  否 string  房型代码
      price: '',  // 是 int 价格
      is_point: this.support_ponit,  //是 int 是否积分兑换 0：否 1：是
      area: this.measureOne * this.measureTwo,   //是 string  面积
      bed_length: '',      //是 string  床型尺寸
      window: this.has_window,   // 是 int 是否有窗户 0：没有，1：有
      bed_type: 1,   //  是 int 床型 1：单床，2：双床
      bathroom: this.has_bathroom,    ///  是 int 是否独立卫浴 0：公共，1：独立
      facility: [],   //  是 array 房间设施id
      custom_facility: [],   //yonghu tianjiad 
      forchild: [
      ],
      iconName: [
        'icon-xiaoshireshui',
        'icon-baoxiangui',
        'icon-chuifengji',
        'icon-dicheng',
        'icon-dianshi',
        'icon-kongtiao',
        'icon-maojin',
        'icon-reshuihu',
        'icon-tuoxie',
        'icon-xishutaozhuang',
        'icon-yigui',
        'icon-yijia',
        'icon-yusan',
        'icon-yugang',
        'icon-dianshi'
      ],
      pagename: '房型',
      support_ponit:1,
      has_window: 1,
      has_bathroom: 1,
      numberOne: false,
      numberTwo: false,
      measureOne: '',
      measureTwo: '',
      options1: [{label:'有',value: 1}, {label:'无',value: 0}],
      options2: [{label:'独立',value: 1}, {label:'公用',value: 0}],
      facs:[],
      selectedFacs:[]     
    }
  },
  watch: {
    //dont remove this function
    '$route' (to, from) {
      
      console.log('------',this.$route.query)
    },
    measureOne:function(newval, oldval){
      // console.log(newval, oldval)
      if(Math.floor(newval) <= 0){
        // console.log('cuowu')
        this.numberOne = true;
      }else{
        this.numberOne = false;
      }
    },
    measureTwo:function(newval, oldval){
      // console.log(newval, oldval)
      if(Math.floor(newval) <= 0){
        // console.log('cuowu')
        this.numberOne = true;
      }else{
        this.numberOne = false;
      }
    }
  },
  computed:{
			...mapGetters({
				// 映射 `this.doneCount` 为 `store.getters.doneTodosCount`
				hotel:'currHotel'
			})
	},
  mounted() {
    //this.getfacility()
    this.mode = this.$route.query.mode
    this.getfacility()

    
    //console.log(this.$route.query)
  },
  methods: {
    checkOccupancy(e) {

    },
    deleOccupancy() {
      if(this.occupancy > 1) {
        this.occupancy--
      }
    },
    goBack() {
      this.$router.back()
    },
    checkCode(e) {
      let reg = new RegExp("[\\u4E00-\\u9FFF]+","g")
      reg.test(e)? this.chineseCode = true : this.chineseCode = false
    },
    checkBed_length(e) {
      if(e.indexOf('*') == -1) {
        return this.Bed_lengthError = true
      }
      let arr = e.split('*')
      arr.forEach((e,i)=>{
        if(Math.floor(e) <= 0) {
          this.Bed_lengthError = true
        }
        return
      })
    },
    checkDepositNumber(e) {
      if(!e.length){return}
      e = Math.floor(e)
      if(e <= 0 ){
        this.depositNumberError = true
      }else{
        this.depositNumberError = false
        this.deposit = Math.floor(this.deposit)
      }
    },
    checkPriceNumber(e) {
      if(!e.length){return}
      e = Math.floor(e)
      if(e <= 0 ){
        this.priceNumberError = true
      }else{
        this.priceNumberError = false
        this.price = Math.floor(this.price)
      }
    },
    async getfacility() {
      let _this = this;
       var res = await API.getRoomFacility({id:this.hotel.id})
       var userRequest = null
      if(res.error_code != 0) return
  
       this.facs = res.data

       if(this.mode == 'edit'){
          this.romm_type_id = this.$route.query.roomTypeId
          userRequest = await API.getRoomTypeById(this.romm_type_id) 
           if(userRequest.error_code != 0) return
           this.setRoomType(userRequest.data)   
        }

    },
    setRoomType(info){ 
      this.name = info.name
      this.code = info.code
      this.support_ponit =  info.is_point
      this.price = info.price
      this.area = info.area
      this.bed_length = info.bed_length
      this.has_window = info.window=='无窗'?0:1
      this.bed_type = info.bed_type
      this.selectedFacs = info.facility
      this.measureOne = info.area.split('-')[0]
      this.measureTwo = info.area.split('-')[1]
      this.occupancy = info.people_num,
      this.deposit = info.deposit
    },
    postAndGoback() {
       var self = this
       this.facility = []
       this.selectedFacs.forEach(el=>{
        self.facility.push(el.id)
       })
      let obj = {
        hotel_id: this.hotel.id,   ///  jiudian id
        name: this.name,//  是 string  房型名称
        code: this.code, //  否 string  房型代码
        price: parseInt(this.price),  // 是 int 价格
        is_point: this.support_ponit?1:0,  //是 int 是否积分兑换 0：否 1：是
        area: this.measureOne +'-'+ this.measureTwo,   //是 string  面积
        bed_length: this.bed_length,      //是 string  床型尺寸
        window: this.has_window,   // 是 int 是否有窗户 0：没有，1：有
        bed_type: this.bed_type,   //  是 int 床型 1：单床，2：双床
        bathroom: this.has_bathroom,    ///  是 int 是否独立卫浴 0：公共，1：独立
        facility: this.facility,   //  是 array 房间设施id
        custom_facility: this.custom_facility,
        deposit: this.deposit,
        people_num: this.occupancy
      }
      for (let name in obj) {
        if (obj[name] === '') {
          this.$message({
            message: '有必填项没有填写',
            type: 'warning'
          })
          return
        }
      }
      if (this.mode == 'add') {
        API.addRoomType(obj).then(res => {
          if(res.error_code == 0){
            window.history.back()
          }
        })
      }else{
        API.changeRoomType(this.romm_type_id, obj).then(res => {
          if(res.error_code == 0){
            window.history.back()
          }
        })
      }
      // window.history.back()
    },
    childMessage(e){
     
      let self = this; 
      this.facility = []
      /*
      this.custom_facility = []
      e.message.ys.forEach( function(element, index) {
        _this.facility.push(element.id)        
      });
      e.message.user.forEach( function(element, index) {
        _this.custom_facility.push(element.name)
      });
      */
     this.selectedFacs.forEach(el=>{
        self.facility.push(el.id)
     })
    }
    // bechangeRoom() {
    //   // 取到路由带过来的参数 
    //     let routerParams = this.$router.params.dataObj
    //     // 将数据放在当前组件的数据内
    //     console.log(11111111)
    // }
  },
  components:{
    clumBread,
    userSelfAdd
  }
}
  
</script>

<style lang="scss" scoped>
::-webkit-input-placeholder { /* WebKit browsers */
    color:    #f2f2f2;
    }
    :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color:    #f2f2f2;
    }
    ::-moz-placeholder { /* Mozilla Firefox 19+ */
        color:    #f2f2f2;
    }
    :-ms-input-placeholder { /* Internet Explorer 10+ */
        color:    #f2f2f2;
    }
  .hotel-room{
    font-size: 16px;
    background: #f2f2f2;
    min-height: 800px;
    .room-name{
      margin: 20px 0;
      p{
        display: inline-block;
        margin-right: 24px;
        vertical-align: middle;
      }
      .ft-12{
        font-size: 12px;
      }
      input{
        height: 36px;
        width: 50%;
        box-sizing: border-box;
        padding-left: 18px;
      }
      .room-num{
        width: 20%;
        margin-left: 16px;
      }
    }
    .mark-pricr{
      margin: 20px 0;
      p{
        display: inline-block;
        vertical-align: middle;
        margin-left: 26px;
        margin-right: 16px;
      }
      input{
        height: 36px;
        width: 270px;
        text-indent: 6px;
      }
    }
    .free-price{
      margin: 20px 0;
      p{
        display: inline-block;
        vertical-align: middle;
        margin-left: 26px;
        margin-right: 16px;
      }
      .switch{
        display: inline-block;
        vertical-align: middle;
      }
    }
    .room-derective{
      margin: 20px 0;
      border-top:1px solid #f2f2f2;
      .list{
        .margnnone{
          width: 396px;
        }
        .bed{
          .cg-bor{
            border-color: #6a9df6;
          }
          .cg-bj{
            background: #6a9df6;
          }
          vertical-align: top;
          padding-top: 3px;
          width: 150px;
          overflow: hidden;
          div{
            margin: 0 4px;
            box-sizing: border-box;
            display: inline-block;
            height: 36px;
            p{
              display: inline-block;
              vertical-align: middle;
            }
            i{
              width: 20px;
              height: 20px;
              display: inline-block;
              box-sizing: border-box;
              padding: 4px;
              border-radius: 50%;
              border: 1px solid #e2e2e2;
              text-align: center;
              line-height: 8px;
              em{
                width: 10px;
                height: 10px;
                background: #e2e2e2;
                border-radius: 50%;
                display: inline-block;
              }
            }
          }
        }
        .wardtitle{
          font-size: 9px;
          display: inline-block;
          color: red;
        }
        margin: 20px 36px 0;
        li{
          margin:0px 60px 20px 0;
          width: 360px;
          height: 36px;
          line-height: 36px;
          display: inline-block;
          p{
            display: inline-block;
            vertical-align: middle;
          }
          input{
            display: inline-block;
            vertical-align: middle;
            height: 36px;
            font-size: 16px;
            width: 110px;
          }
          .short{
            width: 60px;
          }
        }
      }
    }
    .foot-btn{
      width: 148px;
      height: 48px;
      border-radius: 3px;
      color: #000;
      line-height: 48px;
      text-align: center;
      background: #437ff9;
      margin: 50px auto;
      color: #fff;
      cursor: pointer;
    }
    .check{
      position: relative;
      width: 160px;
      height: 36px;
      border: 1px solid #e6e6e6;
      border-radius: 4px;
      .check-nav{
        width: 22px;
        height: 100%;
        height: 36px;
        position: absolute;
        top: 0;
        right: 0;
        .check-nav-add,.check-nav-dele{
          width: 22px;
          height: 17px;
          line-height: 12px;
          text-align: center;
          background: #e6e6e6;
          position: absolute;
          &:active{
            background: #ccc;
          }
        }
        .check-nav-add{
          top: 0;
        }
        .check-nav-dele{
          bottom: 0;
        }
      }
    }
  }
</style>