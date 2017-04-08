<template>
	<div class="login">
        <Card>
            <p slot="title">翼生涯 - 用户登录</p>
            <Form id="form">
		        <Form-item label="用户名">
		            <Input placeholder="请输入登录用户名" v-model="form.username" :maxlength="maxlength" name="username"></Input>
		        </Form-item>
		        <Form-item label="密码">
		            <Input placeholder="请输入登录密码" v-model="form.passwd" type="password" :maxlength="maxlength" name="password"></Input>
		        </Form-item>
		        <Form-item>
		            <Button type="primary" :loading="loading" @click="handleSubmit()">{{primary_text}}</Button>
		        </Form-item>
		    </Form>
        </Card>
	</div>
</template>
<script type="text/javascript">
    import api from '../config/api/login'
    import setting from '../config/setting';

    export default {
    	data(){
    		return {
    			maxlength : 15,
    			loading : false,
    			primary_text : '登录',
    			form: {
                    username: 'weiyujiaowu4',
                    passwd: '12345'
                }
    		}
    	},
        created(){
            var $ = window.$;
            setTimeout(function(){
                $('.login').css('left',($(window).width() - $('.login').width()) / 2)
            },10);
        },
    	methods : {
    		handleSubmit : function(){
    			if(! this.form.username){
    				this.$Message.warning('请输入登录用户名');
    				return false;
    			};
    			if(! this.form.passwd){
    				this.$Message.warning('请输入登录密码');
    				return false;
    			}
    			this.primary_text = '登录中...' , this.loading = true;
                window.config.userinfo.id = 123;
                this.$router.push({ path: '/' });
                return;
    			api.login(this.form.username,this.form.passwd,(result)=>{
    				if( result.id ){
    					this.primary_text = '登录成功，正在跳转...';
	    				setTimeout(()=>{
	    					window.config.userinfo = result;
                            window.config.userinfo.photo = window.config.userinfo.photo ? 
                                                           setting.get_api_url + window.config.userinfo.photo : '/src/images/face.jpg';
                            // 存储到本地
                            localStorage.userinfo = JSON.stringify(window.config.userinfo);                                                           
	    					log(window.config.userinfo)
	    					this.$router.push({ path: '/' });
	    				},1000)
    				}else{
    					this.primary_text = '登录',this.loading = false;
    					this.$Message.warning('登录用户名或密码错误，请重新输入');
    				}
    			})
    		}
    	},
        components : {  },
    }
</script>