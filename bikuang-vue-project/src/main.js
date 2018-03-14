// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import HeaderView from '@/components/HeaderView'
// import FootView from '@/components/FootView'
import axios from 'axios'
import infiniteScroll from 'vue-infinite-scroll'

Vue.use(infiniteScroll)

Vue.use(ElementUI)
Vue.component('header-view', () => import('@/components/HeaderView'))
Vue.component('footer-view', () => import('@/components/FootView'))
// Vue.component('header-view', HeaderView)
// Vue.component('footer-view', FootView)

Vue.config.productionTip = false
axios.defaults.baseURL = "http://120.78.185.128:3020/";

axios.interceptors.response.use( (response) => {
    // 返回响应时做一些处理
    return response;
  }, (error) => {
    // 当响应异常时做一些处理
    debugger;
    if ( error.response.status == 401 ) {
    	Vue.prototype.eventBus.$emit('notAuthed');
    }
    return Promise.reject(error);
  });

Vue.prototype.$http = axios;
Vue.prototype.bikuang_user = {};
Vue.prototype.eventBus = new Vue();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
