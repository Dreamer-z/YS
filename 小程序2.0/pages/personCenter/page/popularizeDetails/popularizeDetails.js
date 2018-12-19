// pages/personCenter/page/popularizeDetails/popularizeDetails.js
import newRes from "../../../../utils/api.js";
import {
  request
} from "../../../../utils/api.js";
import hosts from "../../../../utils/hosts.js";
let app = getApp();
Page({
  /* 页面的初始数据 */
  data: {
    user: null,
    width: 300,
    height: 450,
    hotel_id: null,
    hotel_msg: null,
    room_id: null,
    type: null,
    share_qrcode: null,
    text: null,
    text_pop: false,
    poster_bg: '',
    poster_img: {},
    hotel_img: ''
  },
  /* 生命周期函数--监听页面加载 */
  onLoad: function(options) {
    let _this = this;
    let user = app.globalData.userInfo;
    let poster_bg = this.data.poster_bg;
    let poster_text = this.data.poster_text;
    let poster_img = this.data.poster_img;
    let hotel_img = options.hotel_img;
    let hotel_msg = options.type == 2 ? JSON.parse(options.hotel_msg) : JSON.parse(options.goods_msg);
    let pText = options.type == 2 ? hotel_msg.share_info.hotel_share_des : hotel_msg.share_info.room_share_des;
    wx.showLoading({
      title: '海报生成中...',
      mask: true
    });
    // this.getBg(hotel_img);
    let avatar_url = app.globalData.userInfo.avatarUrl;
    Promise.all([this.getBg(hotel_img), this.getUserImg(avatar_url), this.getQrcode(options.type, options.hotel_id, options.room_id)]).then(res => {
      wx.hideLoading()
      _this.drawBg(res[0].tempFilePath, res[1].tempFilePath, res[2].tempFilePath);
    }).catch(err => {
      console.log(err)
      wx.showToast({
        title: '图片生成失败',
        icon: "none",
        mask: true
      })
    })
    this.setData({
      hotel_id: options.hotel_id,
      hotel_msg: hotel_msg,
      room_id: options.room_id,
      type: options.type,
      text: pText,
      // hotel_img: hotel_img,
      user: user
    });
  },
  getBg(share_img) {
    let _this = this;
    return new Promise((resole, reject) => {
      wx.downloadFile({
        url: share_img,
        success: function(sres) {
          resole(sres)
        },
        fail: function(fres) {
          reject(fres)
        }
      })
    })

    // wx.downloadFile({
    //   url: share_img,
    //   success: function(sres) {
    //     _this.setData({
    //       poster_bg: sres.tempFilePath
    //     })
    //     let avatar_url = app.globalData.userInfo.avatarUrl;
    //     _this.getUserImg(avatar_url);
    //   },
    //   fail: function(fres) {
    //     wx.showToast({
    //       title: '图片生成失败',
    //       icon: "none"
    //     })
    //   }
    // })
  },
  getUserImg(avatar_url) {
    let _this = this;
    return new Promise((resole, reject) => {
      wx.downloadFile({
        url: avatar_url,
        success: function(sres) {
          resole(sres)
        },
        fail: function(fres) {
          reject(fres)
        }
      })
    })
    // wx.downloadFile({
    //   url: avatar_url,
    //   success: function(sres) {
    //     _this.setData({
    //       poster_img: {
    //         avatar_url: sres.tempFilePath
    //       }
    //     });
    //     _this.getQrcode();
    //   },
    //   fail: function(fres) {
    //     wx.showToast({
    //       title: '图片生成失败',
    //       icon: "none"
    //     })
    //   }
    // });
  },
  getQrcode(type, hotel_id, room_id) {
    let _this = this;
    // let hotel_id = this.data.hotel_id;
    // let room_id = this.data.room_id;
    // let type = this.data.type;
    return new Promise((resole, reject) => {
      wx.downloadFile({
        url: type == 2 ? hosts.getHost() + "/api/sale/share-img?hid=" + hotel_id + "&type=" + 1 + "&token=" + wx.getStorageSync("token") : hosts.getHost() + "/api/sale/share-img?hid=" + hotel_id + "&type=" + 2 + "&rid=" + room_id + "&token=" + wx.getStorageSync("token"),
        success: function(sres) {
          resole(sres)
        },
        fail: function(fres) {
          reject(fres)
        }
      })
    })

    // wx.downloadFile({
    //   url: type == 1 ? hosts.getHost() + "/api/sale/share-img?hid=" + hotel_id + "&type=" + 1 + "&token=" + wx.getStorageSync("token") : hosts.getHost() + "/api/sale/share-img?hid=" + hotel_id + "&type=" + 2 + "&rid=" + room_id + "&token=" + wx.getStorageSync("token"),
    //   success: function(sres) {
    //     _this.setData({
    //       share_qrcode: sres.tempFilePath
    //     });
    //     wx.hideLoading()
    //     _this.drawBg();
    //   },
    //   fail: function(fres) {
    //     wx.showToast({
    //       title: '图片生成失败',
    //       icon: "none"
    //     })
    //   }
    // });
  },
  getText() {
    if (this.data.text == '' || this.data.text == null || !this.data.text) {
      wx.showToast({
        title: '暂未提供推广文案',
        icon: "none",
        mask: true
      });
      return;
    };
    this.setData({
      text_pop: !this.data.text_pop
    })
  },
  copy() {
    let text = this.data.text;
    wx.setClipboardData({
      data: text.toString(),
      success: function(res) {
        wx.showToast({
          title: '已复制到粘贴板',
          icon: 'none',
          mask: true
        })
      }
    });
    this.getText();
  },
  drawBg(headUrl, poster_img, share_qrcode) {
    // let headUrl = this.data.poster_bg;
    let width = this.data.width;
    let height = this.data.height;
    let msg = this.data.hotel_msg;
    let user = this.data.user;
    let type = this.data.type;
    // let poster_img = this.data.poster_img;
    // let share_qrcode = this.data.share_qrcode;
    let _this = this;
    let ctx = wx.createContext();
    ctx.save(); // 保存当前ctx的状态
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(headUrl, 0, 70, width, 240);
    // 绘制一个裁剪区域，并绘制用户头像
    ctx.arc(35, 35, 25, 0, 2 * Math.PI, false);
    ctx.strokeStyle = '#fff';
    ctx.stroke();
    ctx.clip(); //裁剪上面的圆形 
    ctx.drawImage(poster_img, 10, 10, 50, 50); // 在刚刚裁剪的园上画图  
    ctx.restore();
    // 绘制用户姓名，酒店小程序姓名
    ctx.save();
    ctx.font = "12px/18 Microsoft YaHei";
    ctx.fillStyle = "#333";
    ctx.fillText(user.nickName, 70, 30);
    ctx.font = "10px/18 Microsoft YaHei";
    ctx.fillStyle = "#808080";
    let mini = '分享一张卡片  ' + msg.share_info.mini_name;
    ctx.fillText(mini, 70, 50);
    ctx.restore();
    // 绘制酒店信息
    ctx.save();
    if (type == 1){
      ctx.font = "16px/20 Microsoft YaHei";
      ctx.fillStyle = "#1a1a1a";
      if (msg.name.length > 10) {
        let room_name_1 = msg.name.slice(0, 10);
        let room_name_2 = msg.name.slice(10, 20);
        ctx.fillText(room_name_1, 10, 340);
        ctx.fillText(room_name_2, 10, 360);
        ctx.font = "14px/16 Microsoft YaHei";
        ctx.fillStyle = "red";
        let price = msg.price + "元";
        ctx.fillText(price, 10, 385);
        ctx.font = "12px/14 Microsoft YaHei";
        ctx.fillStyle = "#999";
        let hotel_name = msg.share_info.hotel_name.length > 11 ? msg.share_info.hotel_name.slice(0, 11) : msg.share_info.hotel_name.slice(0, msg.share_info.hotel_name.length);
        ctx.fillText(hotel_name, 10, 405);
        let addr = '地址：' + msg.share_info.address;
        if (addr.length > 14) {
          for (let i = 0; i < addr.length / 14; i++) {
            let txt = addr.slice(i * 14, i * 14 + 14);
            ctx.fillText(txt, 10, 425 + i * 16);
          };
        } else {
          ctx.fillText(addr, 10, 425);
        };
      } else {
        ctx.fillText(msg.name, 10, 340);
        ctx.font = "14px/16 Microsoft YaHei";
        ctx.fillStyle = "red";
        let price = msg.price + "元";
        ctx.fillText(price, 10, 365);
        ctx.font = "12px/14 Microsoft YaHei";
        ctx.fillStyle = "#999";
        let hotel_name = msg.share_info.hotel_name.length > 11 ?msg.share_info.hotel_name.slice(0, 11) : msg.share_info.hotel_name.slice(0, msg.share_info.hotel_name.length);
        ctx.fillText(hotel_name, 10, 385);
        let addr = '地址：' + msg.share_info.address;
        if (addr.length > 14) {
          for (let i = 0; i < addr.length / 14; i++) {
            let txt = addr.slice(i * 14, i * 14 + 14);
            ctx.fillText(txt, 10, 405 + i * 16);
          };
        } else {
          ctx.fillText(addr, 10, 405);
        };
      }
    } else if (type == 2){
      ctx.font = "16px/20 Microsoft YaHei";
      ctx.fillStyle = "#1a1a1a";
      if (msg.share_info.hotel_name.length > 10) {
        let hotel_name_1 = msg.share_info.hotel_name.slice(0, 10);
        let hotel_name_2 = '';
        if (msg.share_info.hotel_name.length > 20) {
          hotel_name_2 = msg.share_info.hotel_name.slice(10, 20)+"...";
        }else{
          hotel_name_2 = msg.share_info.hotel_name.slice(10, msg.share_info.hotel_name.length);
        };
        ctx.fillText(hotel_name_1, 10, 340);
        ctx.fillText(hotel_name_2, 10, 360);
        ctx.font = "12px/14 Microsoft YaHei";
        ctx.fillStyle = "#808080";
        let tel = '电话：' + msg.share_info.tel;
        ctx.fillText(tel, 10, 395);
        let addr = '地址：' + msg.share_info.address;
        if (addr.length > 14) {
          for (let i = 0; i < addr.length / 14; i++) {
            let txt = addr.slice(i * 14, i * 14 + 14);
            ctx.fillText(txt, 10, 410 + i * 16);
          };
        } else {
          ctx.fillText(addr, 10, 410);
        };
      } else {
        ctx.fillText(msg.share_info.hotel_name, 10, 340);
        ctx.font = "12px/14 Microsoft YaHei";
        ctx.fillStyle = "#808080";
        let tel = '电话：' + msg.share_info.tel;
        ctx.fillText(tel, 10, 365);
        let addr = '地址：' + msg.share_info.address;
        if (addr.length > 14) {
          for (let i = 0; i < addr.length / 14; i++) {
            let txt = addr.slice(i * 14, i * 14 + 14);
            ctx.fillText(txt, 10, 385 + i * 16);
          };
        } else {
          ctx.fillText(addr, 10, 385);
        };
      }
    }
    ctx.restore();
    // 绘制小程序二维码
    ctx.save();
    ctx.drawImage(share_qrcode, 200, 320, 90, 90);
    ctx.font = "8px/12 Microsoft YaHei";
    ctx.fillText('长按二维码', 224, 422);
    ctx.fillText('分享有钱拿', 224, 434);
    ctx.restore();
    wx.drawCanvas({
      canvasId: 'poster',
      actions: ctx.getActions()
    })
  },
  preview() {
    wx.canvasToTempFilePath({
      canvasId: 'poster',
      quality: 1,
      success(res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success() {
            wx.showToast({
              title: '已保存到相册',
              mask: true
            })
          },
          fail() {
            wx.showToast({
              title: '保存图片失败',
              icon: 'none',
              mask: true
            })
          }
        })
      },
      fail() {
        wx.showToast({
          title: '获取图片失败',
          icon: 'none',
          mask: true
        })
      }
    }, this)
  },
})