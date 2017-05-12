import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './config/router';
import Setting from './config/setting';
import App from './app.vue';
import $ from './libs/jquery-vendor';
import VueValidator from './libs/plugs/validator/validator.js'
import 'iview/dist/styles/iview.css';
import './libs/units';
import './libs/layer/layer.js'
import './libs/layer/need/layer.css'
import './libs/plugs/marquee/scroll.js';
import './styles/common.css'
import './styles/loading/demo.css'
import './styles/loading/loaders.css'

window.$ = $;
Vue.use(VueRouter);
Vue.use(iView);
Vue.use(VueValidator);

// 路由配置
const RouterConfig = {
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    // 路由拦截，重新加入分页首index
    let tos = to.path.split('/');
    let froms = from.path.split('/');
    if(tos[1] != froms[1]){
        window.config.page_index = 1;
        window.config.page_count = 0;
    }
    iView.LoadingBar.start();
    next();
});

router.afterEach((to, from, next) => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

//log($(window).width())
window.config = {
	userinfo : { id : null },
    active : 'home',
    active_name : '应用中心',
    left_width : 4,
    right_width : 20,
    // 下拉框中最后选择的一位学校
    last_school : null,
    last_school_district : null,
    page_index : 1,
    page_count : 0,
    spanLeft : 3,
    disabled : disabled,
};
//document.title = Setting.title;

if($(window).width() <= 1024){
    window.config.spanLeft = 4;
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