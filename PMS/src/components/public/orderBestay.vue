<template>
  <div class="bestay">
    <div class="contain">
      <header>
        <p class="fl">办理入住</p>
        <span @click="beNone" class="fr">×</span>
      </header>
      <div class="text">
        <p class="middle did">
          操作员：456
        </p>
        <p v-if="total.notice" style="width: 100%;text-align: center;color: red;">{{total.notice?total.notice:''}}</p>
        <div class="staymessage">
          <p>入住信息</p>
          <div style="margin-bottom: 10px;" class="name middle">
            <nav class="middle">
              <p class="middle">入住类型</p>
              <span class="middle mgr">：</span>
            </nav>
            <!-- <input v-model="peopleSex" class="middle" type="text"> -->
            <nav class="bed middle">
              <div class="middle" @click="hourRoom = false">
                <i class="middle" :class="{'cg-bor': !hourRoom}"><em :class="{'cg-bj': !hourRoom}"></em></i>
                <span class="middle">普通房</span>
              </div>
            </nav>
            <!-- <nav class="bed middle">
              <div class="middle" @click="hourRoom = true">
                <i class="middle" :class="{'cg-bor': hourRoom}"><em :class="{'cg-bj': hourRoom}"></em></i>
                <span class="middle">钟点房</span>
              </div> 
            </nav> -->
          </div>

          <div class="phonenumber">
            <div class="phone middle mgR">
              <nav style="width: 85px;" class="middle">
                <p class="middle">客源类型</p>
                <span class="middle">：<span style="color: red;">*</span></span>
              </nav>
              <input style="text-indent: 6px;" v-model="total.from_name" class="middle" readonly type="text">
            </div>
            <div style="position: relative;" class="num middle">
              <nav class="middle ">
                <p class="middle">订单号码</p>
                <span style="margin-right: 4px;" class="middle">：<span style="color: red;">*</span></span>
              </nav>
              <div style="position: relative;" class="middle">
                <input :title="total.order_no" style="white-space: nowrap;text-overflow:ellipsis;text-indent: 8px;" readonly v-model="total.order_no" class="middle" type="text">
                <!-- <div @click="getOrderList(orderMobileNum)" class="icon-sear">
                  <span></span>
                </div> -->
              </div>
            </div>
            <!-- <div v-show="isMember" style="position: relative;" class="num middle">
              <nav class="middle ">
                <p class="middle">会员号</p>
                <span style="margin-right: 4px;" class="middle">：<span style="color: red;">*</span></span>
              </nav>
              <div style="position: relative;" class="middle">
                <input style="text-indent: 8px;" v-model="memberNum" class="middle" type="text">
                <div @click="getMemberDiscount" class="icon-sear">
                  <span></span>
                </div>
              </div>
            </div>
            <div v-show="isAgreementUnit" style="position: relative;" class="num middle">
              <nav class="middle ">
                <p class="middle">协议单位</p>
                <span style="margin-right: 4px;" class="middle">：<span style="color: red;">*</span></span>
              </nav>
              <el-select @change="getagreementUnit(agreementUnit)" v-model="agreementUnit" size="mini">
                <el-option v-for="item in agreementUnitArr" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </div> -->
            <div style="margin-left: 50px;" class="way middle">
              <p class="middle">单日房费</p>
              <span class="middle mgr">：<span style="color: red;">*</span></span>
              <input readonly style="text-indent: 8px;" v-model="total.price" class="middle" type="text">
            </div>
          </div>
          <div class="staydate">
            <div style="margin-bottom: 10px;">
              <p style="margin-right: 24px;" class="middle">入住日期<span style="color: red;">*</span></p>
              <div class="middle">
                <div style="margin-right: 30px;" class="middle">
                  <!-- <p class="middle readonly">{{taday}}</p>
                  <span class="middle readonlyspan">{{nowTime}}</span> -->
                  <el-date-picker :disabled="true" value-format="yyyy-MM-dd HH:mm" size="mini" type="datetime" v-model="total.come_time">
                  </el-date-picker>
                </div>
                <nav class="middle addday">
                  <!-- <div @click="deleOneDay" class="middle">
                    <span class="middle"></span>
                  </div> -->
                  <p class="middle">
                    <nav class="middle ">{{total.days}}</nav>
                    <span class="middle">天</span>
                  </p>
                  <!-- <section @click="addOneDay" class="middle">
                    <span class="middle"></span>
                    <p class="middle"></p>
                  </section> -->
                </nav>
                <section class="middle">
                  <p style="margin-right: 10px;" class="middle">离店日期</p>
                  <div class="middle">
                    <el-date-picker :disabled="true" value-format="yyyy-MM-dd HH:mm" size="mini" type="datetime" v-model="total.leave_time">
                    </el-date-picker>
                  </div>
                </section>
                <!-- <input class="selectnav middle" type="text"> -->
              </div>
            </div>
          </div>
          <div class="phonenumber">
            <div class="phone middle mgR">
              <nav class="middle with85">
                <p class="middle">房型</p>
                <span class="middle mgr">：<span style="color: red;">*</span></span>
              </nav>
              <input v-model="total.room_type_name" class="middle" readonly type="text">
            </div>
            <div class="num middle">
              <nav class="middle ">
                <p class="middle">房间数量</p>
                <span style="margin-right: 4px;" class="middle">：<span style="color: red;">*</span></span>
              </nav>
              <input value="1" class="middle" readonly type="text">
            </div>
            <!-- <div style="margin-left: 50px;" class="way middle">
              <p class="middle">来源渠道</p>
              <span class="middle mgr">：<span style="color: red;">*</span></span>
              <el-select v-model="fromWay" size="mini">
                <el-option v-for="item in wayList" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
               </el-select>
            </div> -->
          </div>
          <div class="phonenumber">
            <div class="phone middle mgR">
              <nav class="middle with85">
                <p class="middle">楼层</p>
                <span class="middle mgr">：<span style="color: red;">*</span></span>
              </nav>
              <input v-model="total.floor_num" class="middle" readonly type="text">
            </div>
            <div class="num middle">
              <nav class="middle with85">
                <p class="middle">房间号</p>
                <span class="middle mgr">：<span style="color: red;">*</span></span>
              </nav>
              <input v-model="total.room_name" class="middle" readonly type="text">
            </div>
            <!-- <div class="way middle">
              <p class="middle">价格方案</p>
              <span class="middle mgr">：</span>
              <el-select v-model="price" size="mini">
                <el-option v-for="item in wayList" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
               </el-select>
            </div> -->
          </div>
        </div>
        <div class="line"></div>
        <div class="manmessage">   <!-- v-for="(item, index) in total.member" -->
          <div class="head clearfix">
            <p class="fl">住客信息</p>
            <nav class="fr">
              <span>请放置身份证</span>
            </nav>
          </div>
          <div class="mesinput">
            <div class="name middle">
              <nav class="middle">
                <p class="middle">姓名</p>
                <span class="middle mgr">：<span style="color: red;">*</span></span>
              </nav>
              <input v-model="peopleJson.name" class="middle" type="text">
            </div>
            <div class="name middle">
              <nav class="middle">
                <p class="middle">姓别</p>
                <span class="middle mgr">：</span>
              </nav>
              <!-- <input v-model="peopleSex" class="middle" type="text"> -->
              <nav class="bed middle">
                <div class="middle" @click="peopleJson.sex = 0">
                  <i class="middle" :class="{'cg-bor': peopleJson.sex==0}"><em :class="{'cg-bj': peopleJson.sex==0?'男':'' == '男'}"></em></i>
                  <span class="middle">男</span>
                </div>
              </nav>
              <nav class="bed middle">
                <div class="middle" @click="peopleJson.sex = 1">
                  <i class="middle" :class="{'cg-bor': peopleJson.sex==1?'女':'' == '女'}"><em :class="{'cg-bj': peopleJson.sex==1?'女':'' == '女'}"></em></i>
                  <span class="middle">女</span>
                </div>
              </nav>
            </div>
            <div class="idben">
              <div class="middle mgR">
                <nav class="middle">
                  <p class="middle">证件类型</p>
                  <span style="margin-right: 4px;" class="middle mgr">：<span style="color: red;">*</span></span>
                </nav>
                <el-select v-model="peopleJson.certificate_type" size="mini">
                  <el-option v-for="item in cardtypeArr" :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
              </div>
              <div style="position: relative;" class="middle">
                <nav class="middle with85">
                  <p class="middle">证件号</p>
                  <span class="middle mgr">：<span style="color: red;">*</span></span>
                </nav>
                <input @blur="checkPeopleId(peopleJson.idcard)" v-model="peopleJson.idcard" class="middle idnumber" type="text">
                <span v-show="peopleIdErrorText == peopleJson.idcard && peopleJson.idcard != ''" style="position: absolute;bottom:-10px;left: 88px;color: red;">请输入正确的身份证号码</span>
              </div>
            </div>
            <div style="position: relative;" class="phonenumber">
              <div class="phone middle mgR">
                <nav class="middle with85">
                  <p class="middle">手机号</p>
                  <span class="middle mgr">：<span style="color: red;">*</span></span>
                </nav>
                <input @blur="checkPhone(peopleJson.mobile)" v-model="peopleJson.mobile" class="middle" type="text">
                <span v-show="phoneErrorText == peopleJson.mobile && peopleJson.mobile != ''" style="position: absolute;bottom: -12px;left: 88px; color: red;">请输入正确的手机号码</span>
              </div>
              <!-- <div style="position: relative;" class="num middle">
                <nav class="middle with85">
                  <p class="middle">会员卡号</p>
                  <span class="middle mgr">：</span>
                </nav>
                <input @blur="checkCardNumber(peopleJson.member_num)" v-model="stayHowManyDay" class="middle" type="text">
                <div class="middle ico">
                  <span></span>
                </div>
                <span style="position: absolute;bottom: -12px;left: 88px; color: red;">{{cardNumberErrorText}}</span>
              </div> -->
            </div>
            <span v-show="isPeopleMessageError" style="position: absolute; bottom: 0; right: 0; color: red;">有必选项未填写</span>
          </div>
          <div  class="newadd">
            <div @click="addOnePeople" class="middle">  
              <p class="middle">新增入住人</p>
              <span class="middle">＋</span>
            </div>
          </div>
        </div>
        <ul v-show="howManyMan.length" class="tabel clearfix">
          <li class="one fl">姓名</li>
          <li class="two fl">性别</li>
          <li class="three fl">证件类型</li>
          <li class="fl four">证件号</li>
          <li class="fl five">手机号</li>
          <li class="fl six">会员卡号</li>
          <li class="fl seven">操作</li>
        </ul>
        <ul :class="{'tabelbotom': index == howManyMan.length - 1}" :key="index" v-for="(item, index) in howManyMan" class="tabel clearfix">
          <li class="one fl">{{item.name}}</li>
          <li class="two fl">{{item.sex == 0?'男':'女'}}</li>
          <li class="three fl">{{item.cardtypeName?item.cardtypeName:'--'}}</li> <!-- {{item.cardtypeName}} -->
          <li class="fl four">{{item.idcard?item.idcard:'--'}}</li>
          <li class="fl five">{{item.mobile?item.mobile:'--'}}</li>
          <li class="fl six">{{item.member_num?item.member_num:'--'}}</li>
          <li @click="deleHowManyMan(index)" style="color: #437ff9; cursor: pointer;" class="fl seven">删除</li>
        </ul>
        <div class="textare">
          <p class="middle">备注</p>
          <textarea v-model="total.remark" class="middle"></textarea>
        </div>
        <p class="mesforpay">收款信息</p>
        <div class="howmuchtopay">
          <nav class="middle">
            <div class="width85 middle">
              <p class="middle">应收金额</p>
              <span class="middle">：<span style="color: red;">*</span></span>
              <span style="margin-left: 12px;" class="middle">￥</span>
            </div>
            <input :value="total.price * total.days + total.deposit" readonly class="middle" type="text">
          </nav>
          <nav class="middle">
            <div class="width85 middle">
              <p class="middle">已收金额</p>
              <span class="middle">：<span style="color: red;">*</span></span>
              <span style="margin-left: 12px;" class="middle">￥</span>
            </div>
            <input :value="total.sum" readonly class="middle" type="text">
          </nav>
          <section class="middle">
            <div class="width85 middle">
              <p class="middle">实收金额</p>
              <span class="middle">：<span style="color: red;">*</span></span>
              <span style="margin-left: 12px;" class="middle">￥</span>
            </div>
            <input @blur="checkAmountCollected(amountCollected)" v-model="amountCollected" class="middle" type="text">
            <span style="color: red;">{{amountCollectedErrorText}}</span>
          </section>
        </div>
        <div class="howmuchtopay">
          <nav class="middle">
            <div class="width85 middle">
              <p class="middle">付款方式</p>
              <span class="middle">：<span style="color: red; margin-right: 37px;">*</span></span>
              <!-- <span style="margin-left: 12px;" class="middle">￥</span> -->
            </div>
            <el-select v-model="priceWay" size="mini">
              <el-option v-for="item in payWayList" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </nav>
          <section class="middle">
            <div class="width85 middle">
              <p class="middle">单号</p>
              <span style="margin-right: 65px;" class="middle">：</span>
            </div>
            <input class="middle" type="text">          
          </section>
        </div>
        <div v-show="isLeakage" style="width: 200px;margin: 0 auto;color: red;">有必填项没有填写</div>
        <footer @click="givePost">完成</footer>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import bus from "@/store/bus"
import API from "@/store/API"
  export default {
    name: 'orderBestay',
    data() {
      return {
        total: {
          snap_id: '',
          nowIndex: -1,
          arrive_time: "18:00:00",
          come_time: "2018-06-22 09:26:59",
          days: 1,
          deposit: 200,
          floor_num: 2,
          from: 2,
          from_name: "门店",
          hotel_id: 1,
          id: 7,
          is_assure: "未担保",
          leave_time: "2018-06-23 09:26:59",
          member: [
            {
              certificate_type: "身份证",
              hotel_id: 1,
              id: 12,
              idcard: "",
              mobile: "",
              name: "11",
              sex: 0,
              type: 0   //  会员类型
            }
          ],
          member_id: 0,
          mobile: "15266666664",
          order_no: "15296310418723167800006",
          order_status: "已预订",
          partner_id:0,pay_status: "未支付",
          pay_way: 0,
          people_num: 2,
          prepay_id: "",
          price: "100.00",
          remark: "",
          room_name: "114",
          room_type_name: "测试房型",
          set_status: "已排房",
          sum: "0.00",
          total_count: 2,
          total_price: "200.00"
        },
        orderTypeArr: [],   // 入住类型
        agreementUnit: '',     // 协议单位
        agreementUnitArr: [], // 协议单位
        memberNum : '',   //会员号 
        orderMobileNum: '18888888888',   //小程序的订单手机号码
        roomPrice: '',
        isSmallProgram: false,   // 是不是   小程序
        isAgreementUnit: false,  //   xieyidanwei
        isMember: false,         //  是不是会员
        hourRoom: false,
        cardtypeArr: [],
        isLeakage: false,
        amountCollectedErrorText: '',
        amountCollected: '',
        // sex: '',
        cardNumberErrorText: '',
        peopleIdErrorText: '-1',
        phoneErrorText: '-1',
        isPeopleMessageError: false,
        fromWay: '',
        peopleJson: {
          name: '',
          sex: 0,
          mobile: '',
          idcard: '',
          member_num: '',
          certificate_type: ''
        },
        remark: '',
        howManyMan: [],
        isDatepickerClick: 'false',
        stayHowManyDay: 0,
        nowTime: '',
        taday: '',
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < (Date.now() - 24*60*60*1000)
          }
        },
        dateValue: '',
        clickRadio: 0,
        clickBor: 0,
        howToPayList: [
        ],
        priceWay: '',   // 付款方式
        wayList: [
        ],
        payWayList: [],
        headjson: {
          "id": 148,
          "name": "1204",
          "room_type_id": 12,
          "floor_id": 40,
          "price": "128.00",
          "floor_num": 2
        }
      }
    },
    computed: {
      ...mapGetters({
        hotel:'currHotel'
      })
    },
    methods: {
      getOrderList(e) {
        API.getOrderList(e).then(res=>{  //  shoujihaoma de
          if (res.error_code == 0) {
            // this.headjson = res.data
            // this.howManyMan = 
            console.log('aaaabbbzzz',res.data)
          }
        })
      },
      getCardtypeArr() {
        API.getCardtypeArr().then(res=>{
          if (res.error_code == 0) {
            this.cardtypeArr = res.data
          }
        })
      },
      getOrderType() {
        API.getOrderType().then(res=>{
          if(res.error_code == 0) {
            this.orderTypeArr = res.data
          }
        })
      },
      getagreementUnit(e) {
        this.agreementUnitArr.forEach((v,i)=>{
          if(v.id == e) {
            this.roomPrice = this.headjson.price * v.discount
          }
        })
      },
      getagreementUnitArr() {
        API.getagreementUnitArr(this.hotel.id).then(res=>{
          if (res.error_code == 0) {
            this.agreementUnitArr = res.data
          }
        })
      },
      checkFromWay(e) {
        switch(e) {
          case 1:       //小程序
            this.isSmallProgram = true;
            this.isAgreementUnit = false;
            this.isMember = false;
            this.roomPrice = ''
            break;
          case 2:       //门店
            this.isMember = false;
            this.isAgreementUnit = false;
            this.isSmallProgram = false;
            this.roomPrice = this.headjson.price
            break;
          case 3:       //  会员
            this.isAgreementUnit = false;
            this.isSmallProgram = false;
            this.isMember = true;
            break;
           case 4:      // 协议
            this.isSmallProgram = false;
            this.isMember = false;
            this.isAgreementUnit = true;
            this.roomPrice = ''
            break;
          default:
        }
      },
      getMemberDiscount() {
        API.get("/pms/order/member_discount?number=" + 123).then(res=>{  //this.memberNum
          if (res.error_code == 0) {
            let count = res.data.discount
            this.roomPrice = this.headjson.price * count
            // console.log(this.roomPrice)
          }
        })
      },
      deleHowManyMan(i) {
        this.howManyMan.splice(i, 1)
      },
      checkAmountCollected(e) {
        if(e.length == 0){return this.amountCollectedErrorText = ''}
        if(e.indexOf('.') == e.lastIndexOf('.')) {
          let reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
          reg.test(e)?this.amountCollectedErrorText = '': this.amountCollectedErrorText = '请输入正确的金额格式'
        } else {
          this.amountCollectedErrorText = '请输入正确的金额格式'
        }
      },
      getPayway() {
        API.getPayway().then(res=>{
          this.payWayList = res
          // if(res.error_code) {
          //  this.payWayList = res.data
          // }
        })
      },  
      checkCardNumber(e) {
        if (e.length == 0){return}  // && isPostAll 价格判断条件是不是  post 提交所有的时候
          let reg = /^[a-zA-Z\d]+$/
          reg.test(e)?this.cardNumberErrorText = '': this.cardNumberErrorText = '请输入正确的会员号码'
      },
      checkPeopleId(e) {
        if(e.length == 0){
         this.peopleIdErrorText = '-1'
         return
       }
        let reg = /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/
        reg.test(e)? this.peopleIdErrorText = '' : this.peopleIdErrorText = e
        // this.nowIndex = i
      },
      addOnePeople() {
        if(this.peopleJson.name == '' || this.peopleJson.certificate_type == '' || this.peopleJson.mobile == '' || this.peopleJson.idcard == ''){
          return this.isPeopleMessageError = true
        }
        this.isPeopleMessageError = false;
        if(this.cardNumberErrorText != '' && this.peopleIdErrorText != '' && this.phoneErrorText != ''){return}
        let obj = {...this.peopleJson}
        this.cardtypeArr.forEach((e,i)=>{
          if(e.id == obj.certificate_type) {
            obj.cardtypeName = e.name
          }
        })
        this.howManyMan.push(obj)
        this.peopleJson.name = ''
        this.peopleJson.sex = 0
        this.peopleJson.certificate_type = ''
        this.peopleJson.idcard = ''
        this.peopleJson.mobile = ''
        this.peopleJson.member_num = ''
      },
      getWayList() {
        API.getFromWay().then(res => {
          this.wayList = res.data
        })
      },
      checkPhone(e) {
        if (e.length == 0){return this.phoneErrorText = '-1'}
        let reg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$|^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
        reg.test(e)? this.phoneErrorText = '' : this.phoneErrorText = e
      },
      dateChange() {
        this.isDatepickerClick = true;
        let getDateTime = new Date(this.dateValue.split(' ')[0]).getTime()
        let nowDateTime = new Date().getTime()
        this.stayHowManyDay = Math.ceil((getDateTime - nowDateTime)/(24*60*60*1000))
      },
      givePost() {
        let obj= {
          "preorder_id": this.total.id,
          "hotel_id": this.total.hotel_id,
          "room_id": this.total.room_id,
          // "customer": customer,
          "remark": this.total.remark,
          "pay_way": this.priceWay,
          "sum": this.amountCollected,
          "snap_id": this.snap_id
        }

        // from  是 int 预定来源 1:小程序，2：门店,3:会员，4：协议
        // console.log('>>>',this.total)
        // return
        //  this.price == '' || 
        if(this.priceWay == '' || this.amountCollected == '') {return this.isLeakage = true}
        this.isLeakage = false
        let arr = []
        let lock = false
        // this.total.member.forEach((e,i)=>{
        //   if (e.name == '' || e.mobile == '' || e.idcard == '' || e.certificate_type == '') {
        //     this.$alert('住客信息不完整', '', {
        //       confirmButtonText: '确定'
        //     })
        //     return
        //   } else {
        //     arr.push({
        //       "member_id": e.id,
        //       "name": e.name,
        //       "mobile": e.mobile,
        //       "idcard": e.idcard,
        //       "certificate_type": 1,
        //       "sex": e.sex          
        //     })
        //   }
        // })
        // if (lock) {return}
        // if (arr.length == 0) {
        //   this.$alert('住客信息不完整', '', {
        //     confirmButtonText: '确定'
        //   })
        //   return
        // }


        if (this.howManyMan.length) {
          obj.customer = this.howManyMan
        } else {
          if(this.peopleJson.name == '' || this.peopleJson.certificate_type == '' || this.peopleJson.mobile == '' || this.peopleJson.idcard == '') {
            this.$alert('请填写入住人', '', {
              confirmButtonText: '确定'
            });
            return
          }
        }
        if(this.peopleJson.name != '' && this.peopleJson.certificate_type != '' && this.peopleJson.mobile != '' && this.peopleJson.idcard != ''){
          let o = {...this.peopleJson}
          this.cardtypeArr.forEach((e,i)=>{
            if(e.id == o.certificate_type) {
              o.cardtypeName = e.name
            }
          })
          if (this.howManyMan.length) {
            this.howManyMan.push(o)
            obj.customer = this.howManyMan
          } else {
            obj.customer = [o]
          }
          this.peopleJson.name = ''
          this.peopleJson.certificate_type = ''
          this.peopleJson.mobile = ''
          this.peopleJson.idcard = ''
        } 


        let strArr = []
        obj.customer.forEach((e,i)=>{
          strArr.push(e.name)
        })
        if (obj.customer.length > this.total.member.length) {
          this.total.member.forEach((e,i)=>{
            obj.customer[i].member_id = e.id
          })
        } else {
          obj.customer.forEach((e,i)=>{
            e.member_id = this.total.member[i].id
          })
        }

        
        API.post("/pms/order/preorder", obj).then(res=>{
          if (res.error_code == 0) {
            this.$alert('操作成功', '', {
              confirmButtonText: '确定',
              callback: ()=>{
                Object.assign(this.$data, this.$options.data())
                // this.$data = JSON.parse(JSON.stringify(this.$data))
                this.total.nameStr = strArr.join('|')
                this.total.order_id = res.data.order_id
                this.$emit('getStayBeNone',this.total)
              }
            })
          }
        })
      },
      addOneDay() {
        if(this.stayHowManyDay < 28) {
          this.stayHowManyDay++
          let mydate = new Date()
          let year = mydate.getFullYear()
          let month = Math.floor(mydate.getMonth())
          let date = mydate.getDate()   
          let days = new Date(year, month + 1, 0).getDate()
          let newdate;
          if((Math.floor(date) + Math.floor(this.stayHowManyDay)) > Math.floor(days)) {
            month = (month + 2) < 10 ? '0' + (month + 2) :(month + 2)
            if(Math.floor(month) < 12) {
              newdate = Math.floor(this.stayHowManyDay) - (Math.floor(days) - Math.floor(date))
              newdate = newdate < 10? '0' + newdate : newdate
              this.dateValue = `${year}-${month}-${newdate}${' ' + this.nowTime}`
            }else{
              year = Math.floor(mydate.getFullYear()) + 1
              month = '01'
              newdate = Math.floor(this.stayHowManyDay) - (Math.floor(days) - Math.floor(date))
              newdate = newdate < 10? '0' + newdate : newdate
              this.dateValue = `${year}-${month}-${newdate}${' ' + this.nowTime}`
            }
          }else{
            newdate =  (Math.floor(date) + Math.floor(this.stayHowManyDay))
            this.dateValue = `${year}-${month + 1 < 10?'0'+(month + 1):month + 1}-${newdate < 10?'0'+newdate:newdate}${' ' + this.nowTime}`
          }
        }
      },
      deleOneDay() {
        if (this.stayHowManyDay > 0) {
          this.stayHowManyDay--
          let mydate = new Date()
          let year = mydate.getFullYear()
          let month = mydate.getMonth()
          let date = mydate.getDate()   
          let days = new Date(year, month + 1, 0).getDate()
          let newdate;
          if((Math.floor(date) + Math.floor(this.stayHowManyDay)) > Math.floor(days)) {
            month = (Math.floor(month) + 2) < 10 ? '0' + (Math.floor(month) + 2) :(Math.floor(month) + 2)
            if(Math.floor(month)<12) {
              newdate = Math.floor(this.stayHowManyDay) - (Math.floor(days) - Math.floor(date))
              newdate = newdate < 10? '0' + newdate : newdate
              this.dateValue = `${year}-${month}-${newdate}${' ' + this.nowTime}`
            }else{
              year = Math.floor(mydate.getFullYear()) + 1
              month = '01'
              newdate = Math.floor(this.stayHowManyDay) - (Math.floor(days) - Math.floor(date))
              newdate = newdate < 10? '0' + newdate : newdate
              this.dateValue = `${year}-${month}-${newdate}${' ' + this.nowTime}`
            }
          }else{
            newdate =  (Math.floor(date) + Math.floor(this.stayHowManyDay))
            this.dateValue = `${year}-${month + 1<10?'0'+(month + 1):month + 1}-${newdate < 10?'0'+newdate:newdate}${' ' + this.nowTime}`
          }
        }
      },
      getDateNow() {
        let mydate = new Date()
        let year = mydate.getFullYear()
        let month = (mydate.getMonth() + 1) < 10 ? '0' + (mydate.getMonth() + 1) : mydate.getMonth() + 1
        let date = mydate.getDate() < 10 ? '0' + mydate.getDate() : mydate.getDate()
        let taday = `${year}-${month}-${date}`
        let hour = mydate.getHours()
        let minutes = mydate.getMinutes()
        this.taday = taday;
        this.nowTime = `${hour<10?'0'+hour:hour}:${minutes<10?'0'+minutes:minutes}`
        this.dateValue = [taday, `${hour<10?'0'+hour:hour}:${minutes<10?'0'+minutes:minutes}`].join(' ');
      },
      beNone() {
        Object.assign(this.$data, this.$options.data())
        // this.$data = JSON.parse(JSON.stringify(this.$data))
        this.$emit('getStayBeNone')
      }
    },
    created() {
      bus.ev.$on('willBeOrderBestay', (e)=>{
        console.log('willBeOrderBestay',e)
        this.snap_id = e.id
        this.member_id = e.member_id
        API.get(`/pms/order/preorder?preorder_id=${e.preorder_id}&room_id=${e.room_id}&snap_id=${e.id}`).then(res=>{
          console.log(res)
          if (res.error_code == 0) {
            this.total = res.data
            if (this.total.member.length) {
              if (this.total.member.length == 1) {
                this.peopleJson.name = this.total.member[0].name
                this.peopleJson.sex = this.total.member[0].sex
                this.peopleJson.certificate_type = this.total.member[0].certificate_type
                this.peopleJson.member_num = this.total.member[0].member_num?this.total.member[0].member_num:''
                this.peopleJson.idcard = this.total.member[0].idcard
                this.peopleJson.mobile = this.total.member[0].mobile
              } else {
                this.peopleJson.name = this.total.member[0].name
                this.peopleJson.sex = this.total.member[0].sex
                this.peopleJson.certificate_type = this.total.member[0].certificate_type
                this.peopleJson.member_num = this.total.member[0].member_num?this.total.member[0].member_num:''
                this.peopleJson.idcard = this.total.member[0].idcard
                this.peopleJson.mobile = this.total.member[0].mobile

                this.howManyMan = this.total.member.splice(1,this.total.member.length-1)
                // let arr = this.total.member.splice(1,this.total.member.length-1)
                // arr.forEach((e,i)=>{
                //   if (e.idcard) {
                //     this.howManyMan.push(e)
                //   }
                // })
              }
              // this.peopleJson.name = this.total.member[0].name
              // this.peopleJson.sex = this.total.member[0].sex
            } 
            // else {

            // }
          }
        })
        this.getDateNow()
        this.getWayList()
        this.getPayway()
        this.getagreementUnitArr()
        this.getOrderType()
        this.getCardtypeArr()
      })
    },
    destroyed(){
      bus.ev.$off('willBeOrderBestay')
    }
  }
</script>

<style lang="scss" scoped>
  .bestay{
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,.4);
    font-size: 14px;
    z-index: 666;
    .tabelbotom{
      border-bottom: 1px solid #a9bfd6;
    }
    .tabel{
      width: 100%;
      height: 39px;
      background: #f4f8ff;
      border-top: 1px solid #a9bfd6;
      display: flex;
      li{
        text-align: center;
        line-height: 39px;
        border-left: 1px solid #a9bfd6;
      }
      .one{
        flex: 2;
      }
      .two{
        flex: 2;
      }
      .three{
        flex: 3;
      }
      .four{
        flex: 5;
      }
      .five{
        flex: 3;
      }
      .six{
        flex: 2;
      }
      .seven{
        flex: 2;
        border-right: 1px solid #a9bfd6;
      }
    }
    .did{
      width: 100%;
      line-height: 28px;
      text-align: right;
    }
    .line{
      width: 100%;
      border-bottom: 1px solid #e6e6e6;
      margin-top: 20px;
      margin-bottom: 14px;
    }
    footer{
      width: 100px;
      height: 40px;
      text-align:center;
      line-height: 40px;
      background: #437ff9;
      border-radius: 4px;
      margin: 0 auto;
      margin-top: 34px;
      color: #fff;
      cursor: pointer;
    }
    .howtopay{
      margin-bottom: 10px;
    }
    .mesforpay{
      margin-top: 20px;
    }
    .mgr{
      margin-right: 10px;
    }
    .middle{
      display: inline-block;
      vertical-align: middle;
    }
    .contain{
      width: 1000px;
      max-height: 80%;
      overflow-y: auto;
      position: absolute;
      background: #fff;
      top: 10%;
      left: 22%;
      header{
        width: 100%;
        overflow: hidden;
        box-sizing: border-box;
        padding: 0 30px;
        line-height: 40px;
        background: #437ff9;
        color: #fff;
        span{
          font-size: 30px;
          cursor: pointer;
        }
      }
    }
    .text{
      padding: 0 30px 34px 30px;
    }
    .list{
      margin-bottom: 20px;
      .listlength{
        .listtitle{
          cursor: pointer;
          margin-right: 44px;
        }
        div.clickradio{
          border-color: #6a9df6;
          i{
            background: #6a9df6;
          }
        }
        .radio{
          width: 18px;
          height: 18px;
          line-height: 16px;
          text-align: center;
          border-radius: 50%;
          border: 1px solid #eee;
          margin-right: 8px;
          margin-left: 20px;
          i{
            width: 10px;
            height: 10px;
            background: #eee;
            border-radius: 50%;
          }
        }
      }
    }
    .way{
      // width: 100%;
      // border-bottom: 1px solid #f7f7f7;
      box-sizing: border-box;
      height: 30px;
      margin-left: 57px;
      // padding-bottom: 20px;
    }
    .manmessage{
      position: relative;
      padding: 0 16px;
      width: 100%;
      border-top: 1px solid #f7f7f7;
      box-sizing: border-box;
      padding-top: 20px;
      background: #fafafa;
      padding-bottom: 10px;
      margin-bottom: 10px;
      .head{
        p,nav{
          width: 50%;
        }
        nav{
          span{
            display: inline-block;
            width: 120px;
            line-height: 30px;
            text-align: center;
            border-radius: 4px;
            background: #6a9df6;
            color: #fff;
            cursor: pointer;
          }
          text-align: right;
        }
      }
    }
    .deleone{
      position: absolute;
      right: 0;
      bottom: 0;
      background: cyan;
      width: 30px;
      height: 30px;
    }
    .with85{
      width: 85px;
    }
    .idben{
      margin-bottom: 10px;
    }
    .mesinput{
      position: relative;
      .name{
        margin-right: 56px;
        margin-bottom: 10px;
        nav{
          width: 85px;
        }
        input{
          border: 1px solid #f7f7f7;
          border-radius: 4px;
          height: 28px;
          width: 176px;
        }
      }
    }
    .mgR{
      margin-right: 57px;
    }
    .idnumber{
      border: 1px solid #f7f7f7;
      border-radius: 4px;
      height: 28px;
      width: 350px;
    }
    .phonenumber{
      margin-bottom: 10px;
      input{
        border: 1px solid #f7f7f7;
        border-radius: 4px;
        height: 28px;
        width: 176px;
      }
    }
    .ico{
      width: 26px;
      height: 26px;
      margin-left: 10px;
      background: cyan;
    }
    .newadd{
      text-align: right;
      color: #8ab2f9;
      div{
        cursor: pointer;
      }
      span{
        font-size: 22px;
      }
    }
    .textare{
      margin-top: 20px;
      box-sizing: border-box;
      padding-bottom: 20px;
      border-bottom: 1px solid #f7f7f7;
      p{
        width: 85px;
      }
      textarea{
        border: 1px solid #f7f7f7;
        border-radius: 4px;
        height: 66px;
        width: 90%;
      }
    }
    .howmuchtopay{
      margin-bottom: 20px;
      nav{
        width: 300px;
      }
      margin-top: 10px;
      input{
        border: 1px solid #f7f7f7;
        border-radius: 4px;
        height: 28px;
        width: 176px;
        margin-left: 6px;
      }
    }
    .howtopaylist{
      .clickbor{
        border-color: #6a9df6;
        color: #6a9df6;
      }
      li{
        cursor: pointer;
        display: inline-block;
        width: 122px;
        height: 38px;
        line-height: 20px;
        overflow: hidden;
        border: 1px solid #f7f7f7;
        border-radius: 4px;
        box-sizing: border-box;
        padding: 8px 14px 10px 13px;
        border-radius: 4px;
        margin-right: 18px;
        text-align: center;
        div{
          width: 20px;
          height: 20px;
          border-radius: 50%;
          line-height: 16px;
          // background: #f6a215;
          margin-right: 12px;
          img{
            width: 20px;
            height: 20px;
          }
          i{
            color: #fff;
          }
        }
      }
    }
    .totalpay{
      width: 100%;
      text-align: right;
      nav{
        margin-bottom: 10px;
      }
      section{
        color: #6dc5ec;
      }
    }
    .clearfoot{
      width: 100%;
      box-sizing: border-box;
      padding-bottom: 28px;
      border-bottom: 1px solid #f7f7f7;
      div{
        margin-bottom: 12px;
      }
      nav,div{
        cursor: pointer;
        p{
          width: 12px;
          height: 12px;
          border-radius: 2px;
          border: 1px solid #eee;
          margin-right: 8px;
        }
      }
    }
    .staymessage{
      box-sizing: border-box;
    }
    .readonly{
      width: 130px;
      line-height: 30px;
      text-align: center;
      border: 1px solid #d9d9d9;
      border-radius: 4px;
      margin-right: 10px;
    }
    .readonlyspan{
      width: 70px;
      line-height: 30px;
      text-align: center;
      border: 1px solid #d9d9d9;
      border-radius: 4px;
    }
    .selectnav{
      border: 1px solid #f7f7f7;
      border-radius: 4px;
      height: 28px;
      width: 90px;
      box-sizing: border-box;
      margin-left: 23px;
    }
    .addday{
      margin-right: 26px;
      p{
        margin: 0 6px;
        nav{
          height: 26px;
          box-sizing: border-box;
          padding: 0 12px;
          text-align: center;
          line-height: 26px;
          color: #6a9df6;
          border: 1px solid #ccc;
          border-radius: 2px;
          margin-right: 2px;
        }
      }
      div{
        border-color: #cdcdcd;
        color: #d9d9d9;
        line-height: 20px;
        text-align:center;
        span{
          width: 14px;
          border-bottom: 2px solid #d9d9d9;
        }
      }
      section{
        color: #fff;
        border-color: #6a9df6;
        background: #6a9df6;
        line-height: 20px;
        text-align:center;
        span,p{
          width: 14px;
          border-bottom: 2px solid #fff;
        }
        p{
          transform: rotate(90deg);
          position:absolute;
          top: 49%;
          left: 50%;
          margin-left: -7px;
        }
      }
      section,div{
        position: relative;
        width: 24px;
        height: 24px;
        border: 1px solid;
        border-radius: 50%;
        box-sizing: border-box;
      }
    }
    .bed{
      .cg-bor{
        border-color: #6a9df6;
      }
      .cg-bj{
        background: #6a9df6;
      }
      width: 85px;
      overflow: hidden;
      div{
        margin: 0 4px;
        box-sizing: border-box;
        display: inline-block;
        // height: 36px;
        p{
          display: inline-block;
          vertical-align: middle;
        }
        i{
          width: 16px;
          height: 16px;
          display: inline-block;
          box-sizing: border-box;
          padding: 2px;
          border-radius: 50%;
          border: 1px solid #e2e2e2;
          text-align: center;
          line-height: 8px;
          em{
            width: 8px;
            height: 8px;
            background: #e2e2e2;
            border-radius: 50%;
            display: inline-block;
          }
        }
      }
    }
    .icon-sear{
      width: 28px;
      height: 28px;
      background: cyan;
      position: absolute;
      top:0;right:0;
      cursor: pointer;
    }
  }
</style>