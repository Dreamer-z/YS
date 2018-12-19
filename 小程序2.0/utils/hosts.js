let authKey = wx.getExtConfigSync().key
let name = wx.getExtConfigSync().name
let ext = wx.getExtConfigSync();
const hosts = {
  develop: "https://demo.phpst.cn",
  online: "https://test.yunsuit.com",
  pms: "https://test.yunsuit.com",
  key: typeof authKey != 'undefined' ? authKey:'',                   
  version: '2.0.0.126',
  shareMessage: name,
};
let environment = 1;
function getHost() {
  // if (environment == 0) {
  //   return ext.host[0]
  // } 
  // if (environment == 1) {
  //   return ext.host[1]
  // }
  return ext.host
};

export default {
  getHost,
  hosts
}