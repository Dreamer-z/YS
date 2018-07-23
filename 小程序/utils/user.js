import { hosts, api, request } from "./api.js";
class User {
  constructor() {

  }
  // 查询联系人
  queryList(callback) {
    // callback回调
    wx.showToast({
      title: '',
      icon: "loading",
      duration: 1000
    });
    request({
      url: api.queryList,
      method: 'GET',
      header: { 'token': wx.getStorageSync("token") }
    }).then(function (res) {
      let userLi = res.data;
      for (let i = 0; i < userLi.length; i++) {
        userLi[i].choose = false;
      };
      callback(userLi);
    });
  }

  // 添加联系人
  addToUser(userName, userTel, userIdCard, callback) {
    // 用户输入的姓名、电话、身份证号码，回调函数callback
    let _this = this;
    let name = userName;
    let tel = userTel;
    let idcard = userIdCard;
    // let userLi = userLi;
    if (name != "" && tel != "" && idcard != "") {
      request({
        url: api.add,
        method: 'POST',
        data: {
          name: name,
          idcard: idcard,
          mobile: tel
        },
        header: { 'token': wx.getStorageSync("token") }
      }).then(function (res) {
        wx.showToast({
          title: '添加成功',
        });
        setTimeout(() => {
          _this.queryList(callback);
        }, 500)
      }).catch(function (res) {
        wx.showToast({
          title: "添加失敗",
          icon: 'none'
        });
        setTimeout(() => {
          _this.queryList(callback);
        }, 500)
      });
    } else {
      wx.showToast({
        title: '输入有误！',
        icon: "none",
      });
    }
  }
  // 编辑联系人
  editUser(url, e) {
    // 跳转地址，element为了获取联系人id
    wx.navigateTo({
      url: url + e.target.id,
    });
  }
  // 获取联系人信息
  getInfo(userId, callBack) {
    // 用户id，回调函数
    request({
      url: api.query + userId,
      method: "GET",
      header: { 'token': wx.getStorageSync("token") }
    }).then(function (res) {
      callBack(res);
    }).catch(function () {
      wx.showToast({
        title: '获取信息失败',
        icon: "none"
      })
    });
  }
  // 更新并提交新数据
  finish(id, newName, newTel, newIdCard) {
    // 联系人id，获取的新的名字、电话、身份证
    let _this = this;
    request({
      url: api.amend + id,
      method: "PUT",
      data: {
        name: newName,
        idcard: newIdCard,
        mobile: newTel,
      },
      header: { 'token': wx.getStorageSync("token") }
    }).then(function (res) {
      wx.showToast({
        title: '修改成功',
        duration: 1000,
      });
      setTimeout(() => {
        wx.navigateBack({
          delta: 1
        });
      }, 800)
    }).catch(function (res) {
      wx.showToast({
        title: '修改失败',
        duration: 1000,
        icon: "none"
      });
      setTimeout(() => {
        wx.navigateBack({
          delta: 1
        });
      }, 800)
    });
  }
}

export { User }