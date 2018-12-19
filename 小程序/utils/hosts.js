const hosts = {
  develop: "https://demo.phpst.cn",
  online: "https://test.yunsuit.com",
  key: '20180824154708284802400001',
  version: '1.1.0.1019',
  shareMessage:"云宿",
};

let environment = 1
function getHost() {
  if (environment == 0) {
    return hosts.develop
  }
  return hosts.online
};

export default {
  getHost,
  hosts
}