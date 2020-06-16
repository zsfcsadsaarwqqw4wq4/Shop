import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/iconfont/iconfont.css';


Vue.use(ElementUI);
Vue.config.productionTip = false;
//配置图片懒加载
import VueLazyLoad from 'vue-lazyload';
import loading from './images/loading.gif';
import error from './images/error.jpg';
//引入全局过滤器
import './config/filters';
Vue.use(VueLazyLoad,{
  loading,
  error
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
