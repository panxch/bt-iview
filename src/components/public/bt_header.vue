<style type="text/css">
.list_lh{ height:30px; overflow:hidden;}
.list_lh li p{ height:24px; line-height:24px;}


</style>
<template>
	<div class="layout-header">
		<Row>
	        <Col span="16 padding-left">
	        	<div class="list_lh">
					<ul>
						<li>通知：软件更新中...</li>
						<li>通知：软件更新中...</li>
					</ul>
				</div>
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
import api from '../../config/api/login';

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
			localStorage.removeItem('school_tags');
			window.config.last_school = null;
			window.config.userinfo.id = null;
			location.href = '/'
		},
	},
	mounted(){
		// 消息通知
		$('.list_lh li:even').addClass('lieven');
		$("div.list_lh").myScroll({speed:40,rowHeight:68});
	}
}		
</script>