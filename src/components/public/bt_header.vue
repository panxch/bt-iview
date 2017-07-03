<style type="text/css">
.list_lh{ height:30px; overflow:hidden;}
.list_lh li p{ height:24px; line-height:24px;}
.wrapper li.ivu-menu-item{padding: none;}
.wrapper .ivu-menu-horizontal{height: 50px;line-height: 50px;}
.wrapper .ivu-menu-primary{background: none;}
</style>
<template>
	<div class="layout-header">
		<Row>
			<Col span="3">
				<div class="layout-logo-left margin-remove">
					<img src="/public/vue/dist/logo.png" class="logo">
				</div>
			</Col>
	        <Col span="15" class="padding-left">
	        	<!--<div class="list_lh">
					<ul>
						<li>通知：软件更新中...</li>
						<li>通知：软件更新中...</li>
					</ul>
				</div>-->
				<Menu mode="horizontal" theme="primary" active-name="base" @on-select="handleSelect">
					<Menu-item name="base">
						<Icon type="ios-paper"></Icon>
						基础数据
					</Menu-item>
					<Submenu name="3">
						<template slot="title">
							<Icon type="stats-bars"></Icon>
							统计分析
						</template>
						<Menu-group title="使用">
							<Menu-item name="3-1">新增和启动</Menu-item>
							<Menu-item name="3-2">活跃分析</Menu-item>
							<Menu-item name="3-3">时段分析</Menu-item>
						</Menu-group>
						<Menu-group title="留存">
							<Menu-item name="3-4">用户留存</Menu-item>
							<Menu-item name="3-5">流失用户</Menu-item>
						</Menu-group>
					</Submenu>
					<Menu-item name="setting" v-if="is_admin">
						<Icon type="settings"></Icon>
						综合设置
					</Menu-item>
				</Menu>
	        </Col>
	        <Col span="6">
	        	<div class="user-info margin-right">
	        		<a href="###"><img :src="userInfo.photo" class="face"></a>
		        	<h3 class="padding-left">{{userInfo.name}},欢迎您登录</h3>
		        	<h3 class="padding-left logout"><a @click="logout">退出</a></h3>
	        	</div>
	        </Col>
    	</Row>
	</div>
</template>

<script type="text/javascript">
import api from '../../config/api/login';
import setting from '../../config/setting';

export default {
	name: 'bt_header',
	data () {
		return { 
			userInfo : window.config.userinfo,
			is_admin :  window.config.userinfo.is_admin
		}
	},
	methods : {
		logout : function(){
			api.loginOut();
			localStorage.removeItem('userinfo');
			localStorage.removeItem('school_tags');
			window.config.last_school = null;
			window.config.userinfo.id = null;
			bt.https.go('/');
		},
		handleSelect(name){
			window.config.menu = setting.get_menu[ name ];
		}
	},
	mounted(){
		// 消息通知
		// $('.list_lh li:even').addClass('lieven');
		// $("div.list_lh").myScroll({speed:40,rowHeight:68});
	}
}		
</script>