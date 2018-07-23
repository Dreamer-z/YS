export default {
    // 手机号验证
    telReg(tel) {
        let reg = /^[1][0-9]{10}$/
        return reg.test(tel);
    },
    // 身份证号验证
    idReg(idcard) {
        let reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/
        return reg.test(idcard)
    },
    // 账号验证
    account(account) {
        let reg = /^[a-zA-Z0-9]|([a-zA-Z0-9]|_|@|.){6,20}$/
        return reg.test(account)
    },
    // 邮箱验证
    email(email) {
        let reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        return reg.test(email)
    },
    // 中文验证
    name(account) {
        let reg = /^[\u4e00-\u9fa5]{0,}$/
        return reg.test(account)
    },
    // 数字验证
    number(num) {
        let reg = /^[0-9]*$/
        return reg.test(num)
    },
    // 价格验证
    price(price) {
        let reg = /^\d{1,6}(\.\d{1,2})?$/
        return reg.test(price)
    },
    // 折扣验证
    discount(n) {
        let reg = /^0(\.\d{1,2})$/
        return reg.test(n)
    },
    // QQ验证
    qq(qq) {
        let reg = /[1-9][0-9]{4,}/
        return reg.test(qq)
    },
};