import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './config/router';
import App from './app.vue';
import $ from 'jquery'
import 'iview/dist/styles/iview.css';
import './libs/units';
import './libs/layer/layer.js'
import './libs/layer/need/layer.css'

window.$ = $;

Vue.use(VueRouter);
Vue.use(iView);

// 路由配置
const RouterConfig = {
    mode: 'history',
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
