import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './config/router';
import Setting from './config/setting';
import App from './app.vue';
import VueValidator from './libs/plugs/validator/validator.js'
import 'iview/dist/styles/iview.css';
// js tools
import './libs/units';
// layer
import './libs/layer/layer.js'
import './libs/layer/need/layer.css'
// marquee
import './libs/plugs/marquee/scroll.js';
// globla
import './styles/common.css'
// login backgound cloud
import './libs/cloud/common.js';
import './libs/cloud/style.css';
// 自己的模块
import 'bt-utils';

Vue.use(VueRouter);
Vue.use(iView);
Vue.use(VueValidator);

// routs setting
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
    next();
});

router.afterEach((to, from, next) => {
    // iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

// 根据页高来设置page size;
Setting.get_page_size = function(_w){
    if(_w > 900)
        return 20;
    else if(_w > 800)
        return 15;
    return 10;
}(bt.window.height);
// 基础全局配置项
window.config = {
	userinfo : { id : null },
    active : 'home',
    menu : Setting.get_menu.base,
    active_name : '应用中心',
    // 下拉框中最后选择的一位学校
    last_school : null,
    last_school_district : null,
    page_index : 1,
    page_count : 0,
    spanLeft : bt.window.width <= 1280 ? 4 : 3,
    disabled : disabled,
    keyword : '',
};

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
