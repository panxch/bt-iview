<template>
	<div class="layout-header">
		<Row>
	        <Col span="16 padding-left">
	        	通知：系统更新中...
	        </Col>
	        <Col span="8">
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
import api from '../../config/api/login'
import $ from '../../libs/jquery-vendor';
export default {
	name: 'bt_header',
	data () {
		return { 
			userInfo : window.config.userinfo
		}
	},
	methods : {
		logout : function(){
			api.loginOut();
			localStorage.removeItem('userinfo');
			window.config.userinfo.id = null;
			this.$router.push({ path: '/login' });
		},
	}
}		
</script>