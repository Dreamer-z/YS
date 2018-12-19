<template>
  <div class="ys-container">
    <p style="marginTop:25px; marginBottom:20px;">基本信息</p>
    <el-form size="mini" label-position="left" :model="ruleForm" status-icon :rules="rules2" ref="ruleForm" label-width="110px" class="demo-ruleForm">
      <el-form-item label="酒店名称：" prop="hotelName">
        <el-input size="mini" type="text" v-model="ruleForm.hotelName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="开业时间：" prop="open_year">
        <el-date-picker
          v-model="ruleForm.open_year"
          type="date"
          size="mini"
          value-format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <template>
        <el-form-item style="marginRight:360px;" class="middle" label="前台电话：" prop="reception_phone">
          <el-input  style="width:180px;" size="mini" type="number" v-model.lazy="ruleForm.reception_phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item class="middle" label="客户中心电话：" prop="dervice_phone">
          <el-input style="width:180px;" size="mini" type="number" v-model.lazy="ruleForm.dervice_phone" autocomplete="off"></el-input>
        </el-form-item>
      </template>
      <el-form-item label="酒店地址：" prop="province">
        <div>
          <el-select @change="getcity" size="mini" v-model="ruleForm.province">
            <el-option v-for="item in provinces" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <el-select @change="getconty" size="mini" v-model="ruleForm.city">
            <el-option v-for="item in citys" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <el-select @change="getconty" size="mini" v-model="ruleForm.region">
            <el-option v-for="item in citys" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </div>
      </el-form-item>
      <template>
        <el-form-item class="middle" style="width:360px;margin-right:190px;" label="" prop="address">
          <div id="change" style="width:360px;margin-right:190px;">
            <el-input v-model="ruleForm.address" class="w360" placeholder="请输入酒店的详细地址" size="mini" type="text"></el-input>
          </div>
        </el-form-item>
        <el-form-item class="middle" style="width:600px;">
          <el-input style="width:180px;" v-model="ruleForm.lat" placeholder="地理经度" size="mini" type="text"></el-input>
          <el-input style="width:180px;" v-model="ruleForm.lng" placeholder="地理纬度" size="mini" type="text"></el-input>
          <el-button @click="map = true" type="primary" size="mini">获取坐标</el-button>
        </el-form-item>
      </template>
    </el-form>
    <div class="line"></div>
    <!-- <div class="hotelname">
      <p>酒店地址<span>*</span></p>
      <ul class="hote-address">
        <li>
          <el-select @change="getcity" size="medium" v-model="province">
            <el-option v-for="item in provinces" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </li>
        <li class="add-margin">
          <el-select @change="getconty" size="medium" v-model="city">
            <el-option v-for="item in citys" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </li>
        <li>
          <el-select @change="getcontyId" size="medium" v-model="region">
            <el-option v-for="item in contys" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </li>
      </ul>
    </div> -->
    <!-- <ul class="hotel-add">
      <li>
        <div class="hotel-add-time">
          <span class="sp">*</span>
          <input v-model="address" placeholder="请输入酒店的详细地址" type="text">
        </div>
      </li>
      <li class="three">
        <span class="sp">*</span>
        <input v-model="lat" placeholder="地理经度" type="text">
        <input v-model="lng" placeholder="地理纬度" type="text">
        <button @click="map = true">获取坐标</button>
      </li>
    </ul> -->
    <qq-map @givelng="getlng" @nomap="mapNone" :addressname="newAddress" @messageFromQqmap="lngMessage" v-if="map"></qq-map>
    <p style="marginTop:25px;marginBottom:20px;">
      <span>个性化信息</span>
    </p>
    <div class="hotelstar">
      <p style="color: #6a9df6;">酒店星级</p>
      <ul>
        <li @click="starNum = element" :key="index" v-for="(element, index) in 5">
          <i :class="{'iconstar': (element) <= starNum}" class="iconfont icon-star iconstarfz"/>
        </li>
      </ul>
      <p>{{starNum}}星</p>
    </div>
    <div class="hotel-price">
      <p style="color: #6a9df6;">酒店类型<span>*</span></p>
      <ul class="">
        <li :class="{'setindex': hotel_type == item.name}" @click="setIndex(item.name)" :key="index" v-for="(item, index) in stayroom">{{item.name}}</li>
      </ul>
    </div>
    <div>
      <self-add :allFacs="forchild" :userSelectFac="selectedFacs"  :childpagename="pagename"></self-add>  <!-- list -->
    </div>
    <div class="policy">
      <p style="color: #6a9df6;" class="policy-head">酒店政策<span class="red">*</span><span class="gray">（此选项之显示在酒详情里）</span></p>
      <nav>
        <p>入住时间</p>
        <el-select v-model="come_time" @change="textComeTime" size="mini" placeholder="请选择时间">
            <el-option v-for="(item,index) in options" :key="index" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
      </nav>
      <nav>
        <p>离店时间</p>
        <el-select v-model="leave_time" @change="textLeaveTime" size="mini" placeholder="请选择时间">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </nav>
      <div class="reject">
        <div>
          <p class="middle">取消订单规则</p>
          <p @click="canReject = true" style="marginLeft: 48px;marginRight: 30px;" class="middle">
            <span :class="{'can-reject-border':canReject}" class="middle circular">
              <span :class="{'can-reject':canReject}" class="middle in-circular"></span>
            </span>
            <span class="middle">允许取消</span>
          </p>
          <p @click="canReject = false" class="middle">
            <span :class="{'can-reject-border': !canReject}" class="middle circular">
              <span :class="{'can-reject': !canReject}" class="middle in-circular"></span>
            </span>
            <span class="middle">不允许取消</span>
          </p>
        </div>
        <div v-show="canReject" class="rule-time">
          <span>小程序用户在入住前</span>
          <!-- <input v-model="rejectDays" style="width:136px;height:38px;border:1px solid #ccc;borderRadius:4px;" type="text"> -->
          <el-input-number :min="0" class="inputNum" v-model="rejectDays" size="mini"></el-input-number>
          <span>天</span>
          <!-- <el-time-picker style="width:136px;" v-model="rejectTime" value-format="HH:mm:ss" placeholder="请选择时间"></el-time-picker> -->
          <el-select v-model="rejectTime" @change="textLeaveTime" size="mini" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.label">
            </el-option>
          </el-select>
          <span>时可自行取消预订单且全额退款，否则不允许取消订单</span>
        </div>
      </div>
      <div class="switch">
        <span>是否可以携带宠物</span>
        <el-switch @change="activeSwitch(is_pet)"
          v-model="is_pet"
          inactive-text="否"
          active-text="是">
        </el-switch>
      </div>
      <section>
        <p>酒店可以选择的支付方式</p>
        <ul>
          <li :class="{'pay': pay_way.includes(item.id)}" v-for="(item, index) in payway" @click="changePayway(item.id)" :id="item.id" :key="index">{{item.name}}</li>
        </ul>
      </section>
      <ul class="three-policy">
        <li>
          <p style="display: inline-block;color: #6a9df6;">入住政策<span>*</span></p><p style="font-size: 9px; color:red; display: inline-block;">请填写4-200字</p>
          <!-- <textarea style="font-size: 14px;" ref="textareaone" v-model="textareaone" placeholder="提醒用户酒店几点办理当天入住" name="" id="" cols="30" rows="10"></textarea> -->
          <el-input ref="textareaone" v-model="textareaone" placeholder="提醒用户酒店几点办理当天入住" type="textarea"></el-input>
        </li>
        <li>
          <p style="display: inline-block;color: #6a9df6;">取消规则<span>*</span></p><p style="font-size: 9px; color:red; display: inline-block;">请填写4-200字</p>
          <!-- <textarea v-model="cancel_rule" ref="cancel_rule" style="font-size: 14px;" placeholder="根据酒店自定的政策规定可否取消" name="" id="" cols="30" rows="10"></textarea> -->
          <el-input ref="cancel_rule" v-model="cancel_rule" placeholder="根据酒店自定的政策规定可否取消" type="textarea"></el-input>
        </li>
        <li>
          <p style="display: inline-block;color: #6a9df6;">使用规则<span>*</span></p><p style="font-size: 9px; color:red; display: inline-block;">请填写4-200字</p>
          <!-- <textarea v-model="use_rule" ref="use_rule" style="font-size: 14px;" placeholder="用户以什么凭证办理入住，如身份证，预定号，预定短信等" name="" id="" cols="30" rows="10"></textarea> -->
          <el-input ref="use_rule" v-model="use_rule" placeholder="用户以什么凭证办理入住，如身份证，预定号，预定短信等" type="textarea"></el-input>
        </li>
      </ul>
    </div>
    <footer>
      <div style="width: 330px; margin: 0 auto;">
        <!-- <div @click="goBack" style="margin-right: 12px;" class="button middle">
          <span>返回</span>
        </div> -->
        <el-button style="width:100px;" @click="goBack">返回</el-button>
        <!-- <div @click="testPost" class="button middle">
          <span>确定</span>
        </div> -->
        <el-button style="width:100px;" @click="testPost" type="primary">确定</el-button>
      </div>
    </footer>
  </div>
</template>

<script>
import qqMap from '@/components/public/qqmap'
import selfAdd from '@/components/public/userselfadd'
import clumBread from '@/components/public/clumbread'
import API from '@/store/API'
export default{
  name: 'addHotel',
  data() {
      var validateHotelName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入酒店名称'));
        } else {
          callback();
        }
      };
      var validateOpenYear = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入酒店开业时间'));
        } else {
          callback();
        }
      };
      var checkPhone = (rule, value, callback) => {
        value = Number(value)
        if (value.length==0) {
          return callback(new Error('号码不能为空'));
        }
        if (Number.isInteger(value)) {
          if (value.toString().length < 8 ||value.toString().length > 11) {
            return callback(new Error('长度在 8 到 11 个数字'));
          } else {
            callback()
          }
        } else {
          return callback(new Error('号码不能是小数'));
        }
      };
    return {
      ruleForm: {
        hotelName:'',
        open_year:'',
        dervice_phone:'',
        reception_phone:'',
        province:'',
        city:'',
        region:'',
        address:'',
        lat:'',
        lng:''
      },
      rules2: {
        province:[{required: true}],
        address: [{required: true, message: '请输入区/县之后的详细地址'}],
        reception_phone:[
          {required: true, validator: checkPhone, trigger: 'blur' }
        ],
        dervice_phone:[
          {required: true, validator: checkPhone, trigger: 'blur' }
        ],
        hotelName: [
          {required: true, validator: validateHotelName, trigger: 'blur' }
        ],
        open_year: [
          {required: true, validator: validateOpenYear, trigger: 'blur' }
        ],
      },
      rejectDays: '',
      canReject: true,
      rejectTime: '',
      isPhoneTrue1: false,
      isPhoneTrue2: false,
      starNum: 0,
      map: false,
      // hotel_type: -1,
      hotel_name: '',
      open_year: '',
      reception_phone: '',
      dervice_phone: '',
      address: '',
      lng: '',
      lat: '',
      stayroom: [
        {
          id: '',
          name: '经济型'
        },
        {
          id: '',
          name: '舒适型'
        },
        {
          id: '',
          name: '豪华型'
        },
        {
          id: '',
          name: '高档型'
        }
      ],
      forchild: [],
      pagename: '酒店',
      come_time: '',
      leave_time:'',
      provinces: [],
      payway: [],
      pay_way: [],
      citys: [],
      contys: [],
      cpntyId: '',
      options:[
        {'label': '01:00', 'value': 24},
        {'label': '02:00', 'value': 23},
        {'label': '03:00', 'value': 22},
        {'label': '04:00', 'value': 21},
        {'label': '05:00', 'value': 20},
        {'label': '06:00', 'value': 19},
        {'label': '07:00', 'value': 18},
        {'label': '08:00', 'value': 17},
        {'label': '09:00', 'value': 16},
        {'label': '10:00', 'value': 15},
        {'label': '11:00', 'value': 14},
        {'label': '12:00', 'value': 13},
        {'label': '13:00', 'value': 12},
        {'label': '14:00', 'value': 11},
        {'label': '15:00', 'value': 10},
        {'label': '16:00', 'value': 9},
        {'label': '17:00', 'value': 8},
        {'label': '18:00', 'value': 7},
        {'label': '19:00', 'value': 6},
        {'label': '20:00', 'value': 5},
        {'label': '21:00', 'value': 4},
        {'label': '22:00', 'value': 3},
        {'label': '23:00', 'value': 2},
        {'label': '24:00', 'value': 1}
      ],
      iconname:[
        {
          name: 'icon-wifi'
        },
        {
          name: 'icon-tingchechang'
        },
        {
          name: 'icon-canting'
        },
        {
          name: 'icon-jianshenfang'
        },
        {
          name: 'icon-hanglijicun'
        },
        {
          name: 'icon-shangwuzhongxin'
        },
        {
          name: 'icon-youyongchi'
        },
        {
          name: 'icon-zuchefuwu'
        },
        {
          name: 'icon-kafeiting'
        },
        {
          name: 'icon-yanhuiting'
        },
        {
          name: 'icon-spa'
        },
        {
          name: 'icon-chashi'
        },
        {
          name: 'icon-huiyishi'
        },
        {
          name: 'icon-jiejifuwu'
        },
        {
          name: 'icon-youxianwangluo'
        }
      ],
      province: '请选择省份',
      city: '请选择城市',
      region: '请选择区/县',
      is_pet: false,
      value: 0,
      facility: [],
      custom_facility: [],
      hotel_type: '',
      textareaone: '',
      cancel_rule: '',
      use_rule: '',
      selectedFacs:[],
      onece: true
    };
  },
  components:{
    selfAdd,
    clumBread,
    qqMap
  },
  methods:{
    goBack() {
      this.$router.back()
    },
    checkPhone2(e) {
     // let reg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$|^0\d{2,3}-?\d{7,8}$/;
      //reg.test(e)? this.isPhoneTrue2 = false : this.isPhoneTrue2 = true
      // /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/
      this.isPhoneTrue2 =  !(e.length >0)
    },
    checkPhone(e) {
     // let reg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$|^0\d{2,3}-?\d{7,8}$/;
      //reg.test(e)? this.isPhoneTrue1 = false : this.isPhoneTrue1 = true
      this.isPhoneTrue1 = !(e.length >0)
    },
    textComeTime() {
      // console.log(this.come_time)
      let _this = this;
      this.options.forEach( function(element, index) {
        if(element.value == _this.come_time) {
          _this.come_time = element.label
          console.log(_this.come_time)
        }
      });
    },
    textLeaveTime() {
      let _this = this;
      this.options.forEach( function(element, index) {
        if(element.value == _this.leave_time) {
          _this.leave_time = element.label
        }
      });
    },
    getlng(e){
      this.ruleForm.lat = e.lng.lat;
      this.ruleForm.lng = e.lng.lng;
      this.ruleForm.address = e.newaddress;
    },
    mapNone() {
      this.map = false;
    },
    lngMessage() {

    },
    testPost() {
      if (this.textareaone.length < 4 || this.textareaone.length > 200) {
        this.$message.error('请填写4-200字的入住政策')
        return
      }
      if (this.cancel_rule.length < 4 || this.cancel_rule.length > 200) {
        this.$message.error('请填写4-200字的取消规则')
        return
      }
      if (this.use_rule.length < 4 || this.use_rule.length > 200) {
        this.$message.error('请填写4-200字的使用规则')
        return
      }
      if (!this.onece) {
        return
      }
      let obj = {
        // token:'',
        hotel_name: this.ruleForm.hotel_name,
        open_year: this.ruleForm.open_year,
        reception_phone: this.ruleForm.reception_phone,  
        service_phone: this.ruleForm.dervice_phone,    
        province: this.province,
        city: this.ruleForm.city,
        region: this.ruleForm.region,
        address: this.ruleForm.address,
        lng: this.ruleForm.lng,            
        lat: this.ruleForm.lat,            
        star: this.starNum,
        hotel_type: this.hotel_type,   
        intro: this.ruleForm.hotel_name,       
        facility: this.selectedFacs,   
        // custom_facility: this.custom_facility,   
        come_time: this.come_time,
        leave_time: this.leave_time,
        is_pet: this.is_pet? 1 : 0,
        pay_way: this.pay_way,
        check_notice: this.textareaone,   
        use_rule: this.use_rule,       
        cancel_rule: this.cancel_rule,
        is_cancel: this.canReject?1:0,
        // cancel_day: this.rejectDays,
        // cancel_hour: this.rejectTime
      }
      // console.log(obj)
      for(let name in obj) {
        if (obj[name] === '') {
          this.$alert('有必填项没有填写', '操作提示', {
            confirmButtonText: '确定'
          })
          return
        }
      }
      obj.cancel_day = this.rejectDays
      obj.cancel_hour = this.rejectTime
      this.onece = false
      API.addHotel(obj).then(res => {
        if (res.error_code == 0) {
          this.$alert(`创建酒店成功`, '操作提示', {
            confirmButtonText: '确定',
            callback: () => {
              this.$router.push("/hotellist")
            }
          })
        } else {
          this.$alert(`${res.msg}`, '操作提示', {
            confirmButtonText: '确定'
          })
          this.onece = true
        }
      })
    },
    setIndex(i) {
      this.hotel_type = i
    },
    // childMessage(e) {
    //   let _this = this;
    //   this.facility = []
    //   this.custom_facility = []
    //   e.message.ys.forEach( function(element, index) {
    //     _this.facility.push(element.id)        
    //   });
    //   e.message.user.forEach( function(element, index) {
    //     _this.custom_facility.push(element.name)
    //   });
    // },
    activeSwitch(e) {
      console.log(e)
    },
    getprov() {
      // API.get("/pms/area").then(res =>{
      //   this.provinces = res.data
      // })
      API.getProvince().then(res => {
        this.provinces = res.data
      })
    },
    getcity(a) {
      // API.get(`/pms/area/id/${a}`).then(res =>{
      //   this.citys = res.data
      // })
      API.getCitys(a).then(res => {
        this.citys = res.data
      })
    },
    getconty(a) {
      // API.get(`/pms/area/id/${a}`).then(res =>{
      //   this.contys = res.data
      // })
      API.getConty(a).then(res => {
        this.contys = res.data
      })
    },
    getcontyId(a){
      this.cpntyId = a
    },
    getpayway(){
      API.getPayway().then(res => {
        if (res.error_code == 0) {
          this.payway = res.data
        }
      })
    },
    getFacility() {
      // API.get("/pms/facility").then(res =>{
      //   this.forchild = res.data;
      // })
      API.getFacility().then(res => {
        // this.forchild = res.data
        if (res.error_code == 0) {
          var arr = res.data;
          // this.iconname.forEach(function (element, index) {
          //   arr[index].iconname = element.name
          // })
          // console.log('aaaaaaaaaaa',arr)
          this.forchild = arr;
          arr = []
        }
      })
    },
    changePayway(index){
      if (this.pay_way.includes(index)) {
        let a = this.pay_way.indexOf(index)
        this.pay_way.splice(a,1)
        a = ''
      }else{
        this.pay_way.push(index)
      }
    }
  },
  computed: {
    newAddress() {
      let str;
      this.provinces.forEach((e,i) =>{
        if(e.id == this.ruleForm.province) {
          str = e.name
        }
      })
      this.citys.forEach((e,i)=>{
        if(e.id == this.ruleForm.city) {
          str += e.name
        }
      })
      this.contys.forEach((e,i)=>{
        if(e.id == this.ruleForm.region) {
          str += e.name
        }
      })
      return str + this.ruleForm.address
    }
  },
  created(){
    this.getprov(),
    this.getpayway(),
    this.getFacility()
  },
  watch: {
    textareaone(){
      if(this.textareaone.length > 150){
        this.$refs.textareaone.blur();
      }
    },
    use_rule(){
      if(this.use_rule.length > 150){
        this.$refs.use_rule.blur()
      }
    },
    cancel_rule(){
      if(this.cancel_rule.length > 150){
        this.$refs.cancel_rule.blur()
      }
    }
  },
  mounted() {
    // window.scroll(0, 500)
  }
}  
</script>

<style lang="scss">
    ::-webkit-input-placeholder { /* WebKit browsers */
    color:    #ccc;
    }
    :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color:    #ccc;
    }
    ::-moz-placeholder { /* Mozilla Firefox 19+ */
        color:    #ccc;
    }
    :-ms-input-placeholder { /* Internet Explorer 10+ */
        color:    #ccc;
    }
  .ys-container{
    .el-form-item__label{
      font-size: 12px;
    }
    .el-input--mini{
      width: 180px;
    }
    .sp{
      color: red;
      margin: 0px 4px;
      vertical-align: top;
      display: inline-block;
    }
    .middle{
      display: inline-block;
      vertical-align: middle;
    }
    box-sizing: border-box;
    min-width: 1024px;
    // padding-bottom: 230px;
    padding-right:35px;
    font-size: 12px;
    .hotelname{
      overflow: hidden;
      margin: 20px 0;
      p{
        color: #6a9df6;
        float: left;
        vertical-align: middle;
        line-height: 36px;
        span{
          color: red;
          margin: 0 4px;
        }
      }
      input{
        float: left;
        font-size: 12px;
        margin-left: 24px;
        height: 36px;
        width: 40%;
        box-sizing: border-box;
        padding-left: 20px;
      }
    }
    .helpPhone{
      overflow: hidden;
      .helpNum{
        width: 50%;
        float: left;
        box-sizing: border-box;
        padding-right: 14%;
        p{
          display: inline-block;
          margin-right: 20px;
          span{
            color: red;
            margin: 0 4px;
          }
        }
        input{
          height: 36px;
          width: 53%;
          box-sizing: border-box;
          padding-left: 20px;
        }
      }
    }
    #change{
      .el-input--mini {
        width: 360px;
        .el-input__inner{
          width: 360px;
        }
      }
    }
    .reject{
      margin-top:26px;
      .circular{
        width: 18px;height: 18px;
        line-height: 14px;
        text-align: center;
        border: 1px solid #d3d3d3;
        border-radius: 50%;
      }
      .in-circular{
        width: 10px;height: 10px;
        border-radius: 50%;
        background: #d3d3d3;
      }
      .rule-time{
        .inputNum{
          .el-input__inner{
             width: 130px;
          }
        }
        .el-select, .el-select--mini{
          .el-input, .el-input--mini, .el-input--suffix,.el-input__inner{
            width: 100px;
          }
        }
        margin-left: 150px;
        margin-top:12px;
      }
      .can-reject{
        background: #437ff9;
      }
      .can-reject-border{
        border-color: #437ff9;
      }
    }
    .hote-address{
      width: 710px;
      overflow: hidden;
      margin-left: 100px;
      .add-margin{
        margin: 0 30px;
      }
      li{
        float: left;
        height: 38px;
        line-height: 36px;
        width: 212px;
      }
    }
    .line{
      width: 100%;
      border-bottom:1px solid #e5e5e5;
    }
    .hotel-add{
      overflow: hidden;
      margin-bottom: 10px;
      .hotel-add-time{
        input{
          height: 36px;
          width: 80%;
          box-sizing: border-box;
          padding-left: 20px;
        }
      }
      li{
        float:left;
        width: 50%;
        box-sizing: border-box;
        overflow: hidden;
      }
      .three{
        overflow: hidden;
        span{
          float: left;
        }
        input{
          width: 30%;
          height: 36px;
          margin-right: 2%;
          float: left;
          box-sizing: border-box;
          padding-left: 20px;
        }
        button{
          float: left;
          width: 30%;
          height: 36px;
          background: #6a9df6;
          border: 0;
          color: #fff;
          border-radius: 3px;
        }
      }
    }
    .hotelstar{
      .iconstarfz{
        font-size: 20px;
        color: #d9d9d9;
      }
      .iconstar{
         color: #6a9df6;
      }
      p,ul,li{
        display: inline-block;
        vertical-align: middle;
      }
      p{
        margin-right: 40px;
      }
      img{
        margin-left: 14px;
      }
      ul{
        margin-right: 26px;
      }
    }
    .hotel-price{
      p{
        display: inline-block;
        span{
          color: red;
          margin-left: 4px; 
        }
      }
      ul{
        display: inline-block;
        margin: 20px 0;
        margin-left: 24px;
        .setindex{
          background: #ffdd7c;
          border-color: #ffdd7c;
        }
        li{
          display: inline-block;
          padding: 0 25px;
          height: 28px;
          line-height: 28px;
          text-align: center;
          border: 1px solid #d9d9d9;
          border-radius: 3px;
          background: #fff;
          margin-right: 20px;
          &:hover{
            cursor: pointer;
          }
        }
      }
    }
    .policy{
      margin-top: 20px;
      .policy-head{
        .red{
          color: red;
          margin-left: 4px;
          margin-right: 12px;
        }
        .gray{
          color: #b8b8b8;
        }
      }
      nav{
        margin-right: 134px;
        display: inline-block;
        height: 36px;
        line-height: 36px;
        margin-top: 10px;
        p{
          display: inline-block;
          margin-right: 38px;
        }
      }
      .switch{
        margin: 20px 0;
        // span{
        //   margin-right: 44px;
        // }
      }
      section{
        margin-bottom: 10px;
        p{
          margin-bottom: 20px;
        }
        ul{
          display: inline-block;
          .pay{
            background: #ffdd7c;
            border-color: #ffdd7c;
          }
          li{
            margin-right: 20px;
            display: inline-block;
            padding: 0 25px;
            height: 28px;
            line-height: 28px;
            text-align: center;
            border: 1px solid #e6e6e6;
            background: #fff;
            border-radius: 3px;
            cursor: pointer;
            // &:hover{
            //   background: #6a9df6;
            //   color: #fff;
            //   border-color: #6a9df6;
            // }
          }
        }
      }
      .three-policy{
        li{
          margin-bottom: 10px;
          p{
            span{
              color: red;
              margin-left: 4px;
            }
          }
          textarea{
            margin-top: 10px;
            width: 100%;
            box-sizing: border-box;
            padding: 20px;
          }
        }
      }
    }
    .button{
      width: 150px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      color: #fff;
      background:#437ff9;
      border-radius: 3px;
      margin: 40px auto 0;
      cursor: pointer;
    }
  }
</style>