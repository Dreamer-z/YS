<el-tree
  :data="data2"
  show-checkbox
  default-expand-all
  node-key="id"
  ref="tree"
  highlight-current
  :props="defaultProps">
</el-tree>

<div class="buttons">
  <el-button @click="getCheckedNodes">通过 node 获取</el-button>
  <el-button @click="getCheckedKeys">通过 key 获取</el-button>
  <el-button @click="setCheckedNodes">通过 node 设置</el-button>
  <el-button @click="setCheckedKeys">通过 key 设置</el-button>
  <el-button @click="resetChecked">清空</el-button>
</div>

<script>
  export default {
    methods: {
      getCheckedNodes() {
        console.log(this.$refs.tree.getCheckedNodes());
      },
      getCheckedKeys() {
        console.log(this.$refs.tree.getCheckedKeys());
      },
      setCheckedNodes() {
        this.$refs.tree.setCheckedNodes([{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 9,
          label: '三级 1-1-1'
        }]);
      },
      setCheckedKeys() {
        this.$refs.tree.setCheckedKeys([3]);
      },
      resetChecked() {
        this.$refs.tree.setCheckedKeys([]);
      }
    },

    data() {
      return {
        data2: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    }
  };
</script>


 this.orderListArr = [
          {
            "id": 15,
            "order_no": "15305890554121829390009",
            "from": 2,
            "is_assure": "未担保",
            "set_status": "未排房",
            "mobile": "17775799888",
            "order_status": "已预订",
            "sum": "0.00",
            "come_time": "2018-07-03 11:33:12",
            "leave_time": "2018-07-04 11:33:12",
            "days": 1,
            "user": {
                "id": 9,
                "nickname": "李志华 "
            },
            "from_name": "门店"
          },
          {
            "id": 14,
            "order_no": "15305889421739704690004",
            "from": 2,
            "is_assure": "未担保",
            "set_status": "未排房",
            "mobile": "15266666663",
            "order_status": "已预订",
            "sum": "0.00",
            "come_time": "2018-07-03 11:31:39",
            "leave_time": "2018-07-04 11:31:39",
            "days": 1,
            "user": {
                "id": 4,
                "nickname": "地方"
            },
            "from_name": "门店"
          },
          {
            "id": 13,
            "order_no": "15305888772220535000004",
            "from": 2,
            "is_assure": "未担保",
            "set_status": "未排房",
            "mobile": "15266666663",
            "order_status": "已预订",
            "sum": "0.00",
            "come_time": "2018-07-03 11:30:15",
            "leave_time": "2018-07-04 11:30:15",
            "days": 1,
            "user": {
                "id": 4,
                "nickname": "地方"
            },
            "from_name": "门店"
          },
          {
            "id": 12,
            "order_no": "15305379962114003100005",
            "from": 1,
            "is_assure": "未担保",
            "set_status": "未排房",
            "mobile": "13308481671",
            "order_status": "已预订",
            "sum": "100.00",
            "come_time": "2018-07-02 00:00:00",
            "leave_time": "2018-07-03 00:00:00",
            "days": 1,
            "user": {
                "id": 5,
                "nickname": "屌丝2"
            },
            "from_name": "小程序"
          },
          {
            "id": 11,
            "order_no": "15305265604974750250001",
            "from": 1,
            "is_assure": "未担保",
            "set_status": "未排房",
            "mobile": "15266666666",
            "order_status": "已预订",
            "sum": "0.00",
            "come_time": "2018-07-02 18:12:02",
            "leave_time": "2018-07-03 18:12:02",
            "days": 1,
            "user": {
                "id": 1,
                "nickname": "屌丝"
            },
            "from_name": "小程序"
          },
          {
            "id": 10,
            "order_no": "15305264421669718390001",
            "from": 2,
            "is_assure": "未担保",
            "set_status": "未排房",
            "mobile": "15266666666",
            "order_status": "已预订",
            "sum": "0.00",
            "come_time": "2018-07-02 18:10:01",
            "leave_time": "2018-07-03 18:10:01",
            "days": 1,
            "user": {
                "id": 1,
                "nickname": "屌丝"
            },
            "from_name": "门店"
          },
          {
            "id": 9,
            "order_no": "15305263300734978030008",
            "from": 2,
            "is_assure": "未担保",
            "set_status": "未排房",
            "mobile": "13808454644",
            "order_status": "已预订",
            "sum": "0.00",
            "come_time": "2018-07-02 18:08:12",
            "leave_time": "2018-07-03 18:08:12",
            "days": 1,
            "user": {
                "id": 8,
                "nickname": "ADC"
            },
            "from_name": "门店"
          },
          {
            "id": 8,
            "order_no": "15305260380646926030001",
            "from": 1,
            "is_assure": "未担保",
            "set_status": "未排房",
            "mobile": "15266666666",
            "order_status": "已预订",
            "sum": "0.00",
            "come_time": "2018-07-02 18:03:10",
            "leave_time": "2018-07-03 18:03:10",
            "days": 1,
            "user": {
                "id": 1,
                "nickname": "屌丝"
            },
            "from_name": "小程序"
          },
          {
            "id": 7,
            "order_no": "15305022596473803560005",
            "from": 3,
            "is_assure": "未担保",
            "set_status": "未排房",
            "mobile": "17775799888",
            "order_status": "已预订",
            "sum": "0.00",
            "come_time": "2018-07-02 11:19:31",
            "leave_time": "2018-07-03 11:19:31",
            "days": 1,
            "user": {
                "id": 5,
                "nickname": "屌丝2"
            },
            "from_name": "会员"
          },
          {
            "id": 5,
            "order_no": "15302822282634606350005",
            "from": 1,
            "is_assure": "未担保",
            "set_status": "未排房",
            "mobile": "17775799888",
            "order_status": "已预订",
            "sum": "100.00",
            "come_time": "2018-06-29 00:00:00",
            "leave_time": "2018-06-30 00:00:00",
            "days": 1,
            "user": {
                "id": 5,
                "nickname": "屌丝2"
            },
            "from_name": "小程序"
          },

          {
            "id": 15,
            "order_no": "15305890554121829390009",
            "from": 2,
            "is_assure": "未担保",
            "set_status": "未排房",
            "mobile": "17775799888",
            "order_status": "已预订",
            "sum": "0.00",
            "come_time": "2018-07-03 11:33:12",
            "leave_time": "2018-07-04 11:33:12",
            "days": 1,
            "user": {
                "id": 9,
                "nickname": "李志华 "
            },
            "from_name": "门店"
          },
          {
            "id": 14,
            "order_no": "15305889421739704690004",
            "from": 2,
            "is_assure": "未担保",
            "set_status": "未排房",
            "mobile": "15266666663",
            "order_status": "已预订",
            "sum": "0.00",
            "come_time": "2018-07-03 11:31:39",
            "leave_time": "2018-07-04 11:31:39",
            "days": 1,
            "user": {
                "id": 4,
                "nickname": "地方"
            },
            "from_name": "门店"
          },
          {
            "id": 13,
            "order_no": "15305888772220535000004",
            "from": 2,
            "is_assure": "未担保",
            "set_status": "未排房",
            "mobile": "15266666663",
            "order_status": "已预订",
            "sum": "0.00",
            "come_time": "2018-07-03 11:30:15",
            "leave_time": "2018-07-04 11:30:15",
            "days": 1,
            "user": {
                "id": 4,
                "nickname": "地方"
            },
            "from_name": "门店"
          },
          {
            "id": 12,
            "order_no": "15305379962114003100005",
            "from": 1,
            "is_assure": "未担保",
            "set_status": "未排房",
            "mobile": "13308481671",
            "order_status": "已预订",
            "sum": "100.00",
            "come_time": "2018-07-02 00:00:00",
            "leave_time": "2018-07-03 00:00:00",
            "days": 1,
            "user": {
                "id": 5,
                "nickname": "屌丝2"
            },
            "from_name": "小程序"
          },
          {
            "id": 11,
            "order_no": "15305265604974750250001",
            "from": 1,
            "is_assure": "未担保",
            "set_status": "未排房",
            "mobile": "15266666666",
            "order_status": "已预订",
            "sum": "0.00",
            "come_time": "2018-07-02 18:12:02",
            "leave_time": "2018-07-03 18:12:02",
            "days": 1,
            "user": {
                "id": 1,
                "nickname": "屌丝"
            },
            "from_name": "小程序"
          },
          {
            "id": 10,
            "order_no": "15305264421669718390001",
            "from": 2,
            "is_assure": "未担保",
            "set_status": "未排房",
            "mobile": "15266666666",
            "order_status": "已预订",
            "sum": "0.00",
            "come_time": "2018-07-02 18:10:01",
            "leave_time": "2018-07-03 18:10:01",
            "days": 1,
            "user": {
                "id": 1,
                "nickname": "屌丝"
            },
            "from_name": "门店"
          },
          {
            "id": 9,
            "order_no": "15305263300734978030008",
            "from": 2,
            "is_assure": "未担保",
            "set_status": "未排房",
            "mobile": "13808454644",
            "order_status": "已预订",
            "sum": "0.00",
            "come_time": "2018-07-02 18:08:12",
            "leave_time": "2018-07-03 18:08:12",
            "days": 1,
            "user": {
                "id": 8,
                "nickname": "ADC"
            },
            "from_name": "门店"
          },
          {
            "id": 8,
            "order_no": "15305260380646926030001",
            "from": 1,
            "is_assure": "未担保",
            "set_status": "未排房",
            "mobile": "15266666666",
            "order_status": "已预订",
            "sum": "0.00",
            "come_time": "2018-07-02 18:03:10",
            "leave_time": "2018-07-03 18:03:10",
            "days": 1,
            "user": {
                "id": 1,
                "nickname": "屌丝"
            },
            "from_name": "小程序"
          },
          {
            "id": 7,
            "order_no": "15305022596473803560005",
            "from": 3,
            "is_assure": "未担保",
            "set_status": "未排房",
            "mobile": "17775799888",
            "order_status": "已预订",
            "sum": "0.00",
            "come_time": "2018-07-02 11:19:31",
            "leave_time": "2018-07-03 11:19:31",
            "days": 1,
            "user": {
                "id": 5,
                "nickname": "屌丝2"
            },
            "from_name": "会员"
          },
          {
            "id": 5,
            "order_no": "15302822282634606350005",
            "from": 1,
            "is_assure": "未担保",
            "set_status": "未排房",
            "mobile": "17775799888",
            "order_status": "已预订",
            "sum": "100.00",
            "come_time": "2018-06-29 00:00:00",
            "leave_time": "2018-06-30 00:00:00",
            "days": 1,
            "user": {
                "id": 5,
                "nickname": "屌丝2"
            },
            "from_name": "小程序"
          }
 ]
 
this.totalCount = 20













<!--
  <router-link 
    :to="{
        path: 'yourPath', 
        params: { 
            name: 'name', 
            dataObj: data
        },
        query: {
            name: 'name', 
            dataObj: data
        }
    }">
</router-link>

 1. path -> 是要跳转的路由路径,也可以是路由文件里面配置的 name 值,两者都可以进行路由导航
 2. params -> 是要传送的参数,参数可以直接key:value形式传递
 3. query -> 是通过 url 来传递参数的同样是key:value形式传递

 // 2,3两点皆可传递
1
2

2. $router方式跳转
// 组件 a
<template>
    <button @click="sendParams">传递</button>
</template>
<script>
  export default {
    name: '',
    data () {
      return {
        msg: 'test message'
      }
    },
    methods: {
      sendParams () {
        this.$router.push({
            path: 'yourPath', 
            name: '要跳转的路径的 name,在 router 文件夹下的 index.js 文件内找',
            params: { 
                name: 'name', 
                dataObj: this.msg
            }
            /*query: {
                name: 'name', 
                dataObj: this.msg
            }*/
        })
      }
    },
    computed: {

    },
    mounted () {

    }
  }
</script>
<style scoped></style>
// 组件b
<template>
    <h3>msg</h3>
</template>
<script>
  export default {
    name: '',
    data () {
      return {
        msg: ''
      }
    },
    methods: {
      getParams () {
        // 取到路由带过来的参数 
        let routerParams = this.$route.params.dataobj
        // 将数据放在当前组件的数据内
        this.msg = routerParams
      }
    },
    watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
      '$route': 'getParams'
    }
  }
</script>
<style scoped></style>
-->

以上   组件    





<!-- <template>
  <div class="self-add">
    <div class="head">
      <p>房型设施<span class="sp">*</span></p>
      <nav>
        <img src="../../assets/images/add.png" alt=""/>
        <p>新增</p>
      </nav>
    </div>
    <textarea class="self-add-area" name="" id=""></textarea>
  </div>
</template>

<script>
export default{
  name:'selfAdd',
  data(){
    return {
 
    }
  }
}
</script>

<style lang="scss" scped>
  .self-add{
    width: 100%;
    .head{
      overflow: hidden;
      p{
        float:left;
      }
      nav{
        float: right;
        img{
          vertical-align: middle;
        }
        p{
          display: inline-block;
          vertical-align: middle;
        }
      }
    }
    .self-add-area{
      width: 100%;
      box-sizing: border-box;
      padding: 10px 100px;
      margin-top: 6px;
    }
  }
</style> -->














<template>
  <div class="dialog">
    <div class="mapsize">
      <div id="allmap">
      
    </div>
    </div>
  </div>
</template>

<script>
import API from "../API"
  export default {
    name: 'baiduMap',
    data() {
      return {

      }
    },
    methods: {
      getaddressNum() {
        // API.get("http://api.map.baidu.com/geocoder/v2/?address=长沙市万达广场&output=json&ak=EN38BNv9HqBDV2u605oQBVyobQ0ZElHv").then(res =>{
        //  console.log(res.result)
        // })
      },
      creatMap(BMap) {
        let map = new BMap.Map('allmap')
        let point = new BMap.Point(116.331398,39.897445)
        let geolocation = new BMap.Geolocation()
        map.centerAndZoom(point, 18)
        map.enableScrollWheelZoom();//启用地图滚轮放大缩小
        map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
        map.enableKeyboard();//启用键盘上下左右键移动地图
        //向地图中添加缩放控件
        var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
        map.addControl(ctrl_nav);
        //向地图中添加缩略图控件
        var ctrl_ove = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:1});
        map.addControl(ctrl_ove);
        //向地图中添加比例尺控件
        var ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
        map.addControl(ctrl_sca);
        map.addControl(new BMap.MapTypeControl());          //添加地图类型控件

        let myGeo = new BMap.Geocoder()
        myGeo.getPoint('北京市',  function(point) {
          if(point) {
            map.centerAndZoom(point, 18)
          }else{
            alert('输入的不是有效的地址')
          }
        }, '北京市')
        map.addEventListener("click", function(e){        
          var pt = e.point;
          myGeo.getLocation(pt, function(rs){
              var addComp = rs.addressComponents;
              alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
          });        
        })
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.creatMap(BMap)
      })
      this.getaddressNum()
    }
  }
</script>

<style lang="scss" scoped>
.dialog{
  position: fixed;
  top: 0;left: 0;right: 0;bottom: 0;
  backgrouund: rgba(0,0,0,.3);
  z-index: 1000;
  .mapsize{
    position: absolute;
    width: 600px;
    height: 600px;
    top: 50%;left: 50%;
    transform: translate(-300px, -300px);
  }
  #allmap{
    width: 600px;
    height: 600px;
    position: absolute;
  }
}
</style>





<!--

-->









<!-- <template>
	<div class="self-add">
		<div class="head">
			<p>房型设施<span class="sp">*</span></p>
			<nav>
				<img src="../../assets/images/add.png" alt=""/>
        <p>新增</p>
			</nav>
		</div>
		<textarea class="self-add-area" name="" id=""></textarea>
	</div>
</template>

<script>
export default{
	name:'selfAdd',
	data(){
		return {
 
		}
	}
}
</script>

<style lang="scss" scped>
	.self-add{
		width: 100%;
		.head{
			overflow: hidden;
			p{
				float:left;
			}
			nav{
				float: right;
				img{
					vertical-align: middle;
				}
				p{
					display: inline-block;
					vertical-align: middle;
				}
			}
		}
		.self-add-area{
			width: 100%;
			box-sizing: border-box;
			padding: 10px 100px;
			margin-top: 6px;
		}
	}
</style> -->













<template>
  <div class="self-add">
    <ol>
      <li class="left">
        <p>酒店设施<span>*</span></p>
      </li>
      <li class="right" @click="centerDialogVisible = true">
        <img src="../../assets/images/add.png" alt=""/>
        <p>新增</p>
      </li>
    </ol>
    <div @click="centerDialogVisible = false" v-show="centerDialogVisible" class="dialog">
      <div @click.stop="" class="container">
        <header>酒店设施</header>
        <section>
          <p>点击标签添加，可多选<i></i></p>
          <ul ref="lislength">
            <li :class="{'change-bj': listclass[index] ==item.id}" @click="changeBj(item.id)" :id="item.id" :key="index" v-for="(item, index) in list">
              <p><span>哈</span>{{item.name}}</p>
            </li>
            <!---->
            <li class=change-bj ref="index" :id="item.id" v-for="(item, index) in listAddArr">
              <p><span>哈</span>{{item.name}}</p>
              <div @click="deleListAddArr(index)" class="add-delete">×</div>
            </li>
          </ul>
          <button @click="checkedAll">一键全部添加</button>
          <div class="self">
            <p>自定义</p>
            <input ref="addInput" v-model="addList" type="text" placeholder="输入设施">
            <button @click="listAdd">添加</button>
          </div>
        </section>
        <div class="self-nav">
          <button class="dele" @click="centerDialogVisible = false">取消</button>
          <button class="arge" @click="setMessage">确定</button>
        </div>
      </div>
    </div>
    <section>
      <ul>
        <li>
          <img src="../../assets/images/wifi.png" alt="">
          <div>电风</div>
          <nav class="delete">×</nav>s
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import API from "../API"
  export default{
    name: 'userselfadd',
    data(){
      return {
        messageObj: {},
        listAddArr: [],
        listclass: [],
        addList: '',
        centerDialogVisible: false,
        list: [{
          name:'停车场0',
          id: '0000'
        },
        {
          name:'停车场1',
          id: '1111'
        },
        {
          name:'停车场2',
          id: '2222'
        },
        {
          name:'停车场3',
          id: '3333'
        },
        {
          name:'停车场4',
          id: '4444'
        },{
          name:'停车场5',
          id: '5555'
        },
        {
          name:'停车场6',
          id: '6666'
        }]
      }
    },
    // computed: {
    //   setMessage() {
    //     let _this =this;
    //     let arr = []
    //     this.centerDialogVisible = false;
    //     this.list.forEach( function(element, index) {
    //       if(element.id = _this.listclass[index]){
    //         arr.push(element)
    //       }
    //     })
    //     this.messageObj = {'ys': arr, 'user': this.listAddArr}
    //     this.$emit('messageFromUserSelfAdd', {'message': this.messageObj})
    //     arr = []
    //     _this = ''
    //   }
    // },
    methods:{
      setMessage() {
        let _this =this;
        let arr = []
        this.centerDialogVisible = false;
        this.list.forEach( function(element, index) {
          if(element.id = _this.listclass[index]){
            arr.push(element)
          }
        })
        this.messageObj = {'ys': arr, 'user': this.listAddArr}
        this.$emit('messageFromUserSelfAdd', {'message': this.messageObj})
        this.listclass = [];
        // arr = []
        // _this = ''
      },
      changeBj(meg){
        if(this.listclass.includes(meg)){
          let a = this.listclass.indexOf(meg)
          this.listclass.splice(a,1) 
        }else{
          this.listclass.push(meg)
        }
      },
      listAdd(){
        if(this.addList.length) {
          this.listAddArr.push({
            id: "",
            name: this.addList
          })
        }
        this.addList = '';
        this.$refs.addInput.focus();
      },
      deleListAddArr(index){
        this.listAddArr.splice(index,1)
      },
      checkedAll(){
        let arr = [];
        // this.listclass.splice(0,this.listclass.length);
        this.list.forEach( function(element, index) {
          arr.push(element.id)
        });
         this.listclass = [...arr];
         arr=[];
        console.log('aaaaa', this.listclass)
      }
    },
    created() {
      // API.get('/pms/facility').then(res =>{
      //   console.log(res.data)
      //   this.list = res.data;
      // })
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
  .self-add{
    // overflower: hidden;
    .add-delete{
      width: 20px;
      height: 20px;
      text-align: center;
      line-height: 20px;
      position: absolute;
      top: 0; right: 0;
      background:red;
      border-radius: 50%;
      transform: translate(50%,-50%);
    }
    .dialog{
      position: fixed;
      top: 0;left: 0; right: 0;bottom: 0;
      background: rgba(0,0,0,.3);
      z-index: 1000;
      .container{
        .change-bj{
              color: #fff;
              background: #6a9df6;
            }
        position: absolute;
        width: 80%;
        top: 50%;
        left: 50%;
        transform: translate(-41%, -50%);
        background: #fff;
        header{
          width: 100%;
          height: 60px;
          line-height: 60px;
          text-align: center;
          color: #fff;
          background: #437ff9;
        }
        section{
          box-sizing: border-box;
          padding: 0 32px;
          p{
            line-height: 68px;
          }
          ul{
            li{
              position: relative;
              width: 140px;
              height: 50px;
              font-size: 16px;
              text-align: center;
              border-radius: 3px;
              margin-right: 34px;
              margin-bottom: 30px;
              background: #fff;
              border: 1px solid #e2e2e2;
              p{
                line-height: 50px;
                span{
                  margin-right: 18px;
                }
              }
            }
          }
          button{
            width: 198px;
            height: 46px;
            border: 1px solid #e2e2e2;
            border-radius: 3px;
            background: #fff;
            outline: none;
          }
          .self{
            p{
              line-height: 50px;
            }
            button{
              background:#6a9df6;
              width: 100px;
              margin-left: 20px;
              color: #fff;
            }
            input{
              width: 150px;
              height: 46px;
              line-height: 50px;
              box-sizing: border-box;
              padding-left: 10px;
              border: 1px solid #e2e2e2;
            }
          }
        }
        .self-nav{
          width: 220px;
          height: 50px;
          margin: 26px auto;
          .arge,.dele{
            width: 98px;
            height: 48px;
          }
          .dele{
            background: #fff;
            outline: none;
            border: 1px solid #6a9df6;
            color: #6a9df6;
          }
          .arge{
            background: #6a9df6;
            outline: none;
            border: 1px solid #6a9df6;
            color: #fff;
          }
        }
      }
    }
    overflower: hidden;
    ol{
      height: 36px;
      line-height: 36px;
      .left{
        float: left;
        span{
          color: red;
          margin-left: 4px;
        }
      }
      .right{
        cursor: pointer;
        float: right;
        img{
          vertical-align:middle;
        }
        p{
          display: inline-block;
          vertical-align:middle;
        }
      }
    }
    section{
      box-sizing: border-box;
      padding: 36px 16px;
      background: #fff;
      ul{
        li{
          cursor: pointer;;
          position: relative;
          display: inline-block;
          text-align: center;
          width: 140px;
          height: 50px;
          border-radius: 3px;
          background: #6a9df6;
          margin-right: 16px;
          margin-bottom: 36px;
          img{
            vertical-align: middle;
            margin-right: 20px;
          }
          div{
            display: inline-block;
            color: #fff;
            vertical-align:middle;
            height: 50px;
            line-height: 50px;
          }
          nav{
            width: 20px;
            height: 20px;
            line-height: 20px;
            text-align: center;
            border-radius: 50%;
            background: red;
            color: #fff;
            position: absolute;
            transform: translate(10px, -10px);
            top: 0;
            right: 0;
          }
        }
      }
    }
  }
</style>











500000000000000000000000000000000000000





<template>
  <div class="self-add">
    <ol>
      <li class="left">
        <p>酒店设施<span>*</span></p>
      </li>
      <li class="right" @click="centerDialogVisible = true">
        <img src="../../assets/images/add.png" alt=""/>
        <p>新增</p>
      </li>
    </ol>
    <div @click="centerDialogVisible = false" v-show="centerDialogVisible" class="dialog">
      <div @click.stop="" class="container">
        <header>酒店设施</header>
        <section>
          <p>点击标签添加，可多选<i></i></p>
          <ul ref="lislength">
            <li ref="index" @click="changeBj(index)" :id="item.id" :key="index" v-for="(item, index) in list">
              <p><span>哈</span>{{item.name}}</p>
            </li>
            <!-- <li class="change-Bj" id="1" @click="changeBj">
              <p><span>哈</span>停车场</p>
            </li><li>
              <p><span>哈</span>停车场</p>
            </li><li>
              <p><span>哈</span>停车场</p>
            </li><li>
              <p><span>哈</span>停车场</p>
            </li><li>
              <p><span>哈</span>停车场</p>
            </li> -->
            <li class=change-bj ref="index" :id="item.id" v-for="(item, index) in listAddArr">
              <p><span>哈</span>{{item.name}}</p>
              <div @click="deleListAddArr(index)" class="add-delete">×</div>
            </li>
          </ul>
          <button @click="checkedAll">一键全部添加</button>
          <div class="self">
            <p>自定义</p>
            <input v-model="addList" type="text" placeholder="输入设施">
            <button @click="listAdd">添加</button>
          </div>
        </section>
        <div class="self-nav">
          <button class="dele" @click="centerDialogVisible = false">取消</button>
          <button class="arge" @click="centerDialogVisible = false">确定</button>
        </div>
      </div>
    </div>
    <section>
      <ul>
        <li>
          <img src="../../assets/images/wifi.png" alt="">
          <div>电风</div>
          <nav class="delete">×</nav>s
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import API from "../API"
  export default{
    name: 'userselfadd',
    data(){
      return {
        listclass: [],
        listAddArr: [],
        addList: '',
        // checkedAll: false,
        centerDialogVisible: false,
        list: [{
          name:'停车场',
          id: '0000'
        },
        {
          name:'停车场',
          id: '1111'
        },
        {
          name:'停车场',
          id: '2222'
        },
        {
          name:'停车场',
          id: '3333'
        },
        {
          name:'停车场',
          id: '4444'
        },{
          name:'停车场',
          id: '5555'
        },
        {
          name:'停车场',
          id: '6666'
        }]
      }
    },
    methods:{
      changeBj(index){
        if(this.$refs.index[index].className == "change-bj"){
          this.$refs.index[index].className = ""
          console.log(this.$refs.index[index].id)
        }else{
          this.$refs.index[index].className = "change-bj";
        }
      },
      listAdd(){
        if(this.addList.length) {
          this.listAddArr.push({
            id: "",
            name: this.addList
          })
        }
        this.addList = '';
      },
      deleListAddArr(index){
        this.listAddArr.splice(index,1);
      },
      checkedAll(){
        // let arr = Array.prototype.slice.call(this.$refs.lislength.children);
        let that = this;
        let array = [];
        let arr = Array.from(this.$refs.lislength.children);
        arr.forEach( function(element, index) {
          array.push(element.id)
          if(!(element.className == "change-bj")){
              element.className = "change-bj";
              that.listclass.push(element.id)
          }
        })
        this.listclass = [...arr]
        console.log(this.listclass[0])
      }
    },
    created() {
      // API.get('/pms/facility').then(res =>{
      //   console.log(res.data)
      //   this.list = res.data;
      // })
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
  .self-add{
    // overflower: hidden;
    .add-delete{
      width: 20px;
      height: 20px;
      text-align: center;
      line-height: 20px;
      position: absolute;
      top: 0; right: 0;
      background:red;
      border-radius: 50%;
      transform: translate(50%,-50%);
    }
    .dialog{
      position: fixed;
      top: 0;left: 0; right: 0;bottom: 0;
      background: rgba(0,0,0,.3);
      z-index: 1000;
      .container{
        .change-bj{
              color: #fff;
              background: #6a9df6;
            }
        position: absolute;
        width: 80%;
        top: 50%;
        left: 50%;
        transform: translate(-41%, -50%);
        background: #fff;
        header{
          width: 100%;
          height: 60px;
          line-height: 60px;
          text-align: center;
          color: #fff;
          background: #437ff9;
        }
        section{
          box-sizing: border-box;
          padding: 0 32px;
          p{
            line-height: 68px;
          }
          ul{
            li{
              position: relative;
              width: 140px;
              height: 50px;
              font-size: 16px;
              text-align: center;
              border-radius: 3px;
              margin-right: 34px;
              margin-bottom: 30px;
              background: #fff;
              border: 1px solid #e2e2e2;
              p{
                line-height: 50px;
                span{
                  margin-right: 18px;
                }
              }
            }
          }
          button{
            width: 198px;
            height: 46px;
            border: 1px solid #e2e2e2;
            border-radius: 3px;
            background: #fff;
            outline: none;
          }
          .self{
            p{
              line-height: 50px;
            }
            button{
              background:#6a9df6;
              width: 100px;
              margin-left: 20px;
            }
            input{
              width: 150px;
              height: 46px;
              line-height: 50px;
              box-sizing: border-box;
              padding-left: 10px;
              border: 1px solid #e2e2e2;
            }
          }
        }
        .self-nav{
          width: 220px;
          height: 50px;
          margin: 26px auto;
          .arge,.dele{
            width: 98px;
            height: 48px;
          }
          .dele{
            background: #fff;
            outline: none;
            border: 1px solid #6a9df6;
            color: #6a9df6;
          }
          .arge{
            background: #6a9df6;
            outline: none;
            border: 1px solid #6a9df6;
            color: #fff;
          }
        }
      }
    }
    overflower: hidden;
    ol{
      height: 36px;
      line-height: 36px;
      .left{
        float: left;
        span{
          color: red;
          margin-left: 4px;
        }
      }
      .right{
        cursor: pointer;
        float: right;
        img{
          vertical-align:middle;
        }
        p{
          display: inline-block;
          vertical-align:middle;
        }
      }
    }
    section{
      box-sizing: border-box;
      padding: 36px 16px;
      background: #fff;
      ul{
        li{
          cursor: pointer;;
          position: relative;
          display: inline-block;
          text-align: center;
          width: 140px;
          height: 50px;
          border-radius: 3px;
          background: #6a9df6;
          margin-right: 16px;
          margin-bottom: 36px;
          img{
            vertical-align: middle;
            margin-right: 20px;
          }
          div{
            display: inline-block;
            color: #fff;
            vertical-align:middle;
            height: 50px;
            line-height: 50px;
          }
          nav{
            width: 20px;
            height: 20px;
            line-height: 20px;
            text-align: center;
            border-radius: 50%;
            background: red;
            color: #fff;
            position: absolute;
            transform: translate(10px, -10px);
            top: 0;
            right: 0;
          }
        }
      }
    }
  }
</style>