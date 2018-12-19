// pages/components/commonUser/commonUser.js
Component({
  /* 组件的属性列表 */
  properties: {
    choseMode:{
      type:Boolean,
      default:false,
    },
    list:{
      type:Array,
      default:[],
    }
  },
  /* 组件的初始数据 */
  data: {
    personNumber:1,
    userArr:[],
    chooseNumber:0,
  },
  ready() {
    
  },
  /* 组件的方法列表 */
  methods: {
    addUser(){
      this.triggerEvent('addUser');
    },
    // 选择常用联系人
    chooseUser: function (e) {
      if (!this.properties.choseMode){
        return;
      };
      let personNumber = this.data.personNumber;
      let userArr = this.data.userArr;
      let listIndex = e.currentTarget.dataset.index;
      let list = this.data.list;
      let chooseNumber = this.data.chooseNumber;
      if (list[listIndex].choose == true) {
        if (chooseNumber < 0) {
          return;
        };
        list[listIndex].choose = !list[listIndex].choose;
        chooseNumber--;
        this.setData({
          chooseNumber: chooseNumber,
          list: list,
        });
      } else {
        if (chooseNumber > personNumber - 1) {
          wx.showToast({
            title: '只能选取' + personNumber + '位哦',
            icon: 'none',
            mask: true
          });
          return;
        } else {
          chooseNumber++;
          list[listIndex].choose = !list[listIndex].choose;
          this.setData({
            chooseNumber: chooseNumber,
            list: list,
          });
        }
      };

    },
    navigateBack: function () {
      let list = this.data.list;
      let personNumber = this.data.personNumber;
      let user = [];
      for (let i = 0; i < list.length; i++) {
        if (list[i].choose) {
          user.push(list[i]);
        }
      };
      for (let j = 0; j < personNumber; j++) {
        if (user.length < personNumber) {
          user.push({});
        }
      };
      wx.setStorageSync("user", user);
      // 选中返回上一页
      wx.navigateBack({
        delta: 1
      });
    },
    // 编辑联系人
    editUser: function (e) {
      let ind = e.currentTarget.dataset.index;
      let id = this.data.list[ind].id;
      this.setData({
        chooseNumber: 0
      });
      this.triggerEvent('editUser', id);
    }
  }
})
