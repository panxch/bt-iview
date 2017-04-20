import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './config/router';
import App from './app.vue';
import $ from './libs/jquery-vendor';
import 'iview/dist/styles/iview.css';
import './libs/units';
import './libs/layer/layer.js'
import './libs/layer/need/layer.css'

// window.$ = $;
// window.jQuery = $;

Vue.use(VueRouter);
Vue.use(iView);
Vue.directive('focus', {
  // 当绑定元素插入到 DOM 中。
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})

// 路由配置
const RouterConfig = {
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    next();
});

router.afterEach((to, from, next) => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

window.config = {
	userinfo : { id : null },
    active : 'home',
    active_name : '应用中心',
    left_width : 4,
    right_width : 20,
    // 下拉框中最后选择的一位学校
    last_school : null,
}

var vue = new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});

// 如果已经登陆
if(localStorage.userinfo){
    window.config.userinfo = JSON.parse(localStorage.userinfo);  
}
if( window.config.userinfo != null && Object.prototype.toString.call(window.config.userinfo.id) === '[object Null]' ){
    vue.$router.push({ path: '/login' });
}