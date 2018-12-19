// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
// import "@/plugs/tab"
// import 'element-ui/lib/theme-chalk/index.css'
import "@/assets/css/baseRoot.scss";
import './assets/reset.css';
import "@/assets/icon/iconfont.css";
import "@/assets/icon/iconfont2.css";
import "@/assets/css/base.styl";
import "@/assets/css/el-base.styl";
import Print from '@/plugs/print';
import store from './store';

Vue.use(Print) // 注册
Vue.use(ElementUI)

Vue.config.productionTip = false

store.dispatch('setToken', sessionStorage.getItem('token'))

router.beforeEach((to, from, next) => {

    let isLogin = function() {
            return store.getters.token
        }
        //console.log('---', isLogin())
    if (to.path == '/login') {
        return next()

    } else if (!isLogin()) {
        return next({
            path: '/login',
        })
    } else {
        /*
		//console.log('---get router', store.getters.routers.length)
		if (store.getters.routers.length <= 0) {
				// console.log('---on routers')
				store.dispatch('generateRoutes').then((res) => {
						//console.log('---gen routers')
						//console.log(store.getters.routers)
						router.addRoutes(store.getters.routers)
						next({...to, replace: true })
				})
		} else {
				return next()
		}
}
*/
        return next()
    }
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    router,
    components: {
        App
    },
    template: '<App/>'
})