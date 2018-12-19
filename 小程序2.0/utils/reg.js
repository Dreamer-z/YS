export default{
  regTel(tel){
    let reg = /^[1][0-9]{10}$/;
    return reg.test(tel);
  },
  regIdCard(idcard) {
    let reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
    return reg.test(idcard);
  },
  // 小数点后两位
  float(n) {
    let reg = /^[1-9]{1}[0-9]*(\.\d{0,2})?$/
    return reg.test(n)
  },
}