<style type="text/css">

.wrapper .login .ivu-card{border-radius: 5px;}
.wrapper .login .ivu-card-head{border-radius: 5px 5px 0 0;}
.wrapper .login .ivu-card-head p{color:#fff;}
.wrapper .login .ivu-form-item-content button{float: right;}
.wrapper .login .ivu-form-item .ivu-input{width:100%;}
</style>
<template>
    <div>
        <div id="mainBody">
            <div id="cloud1" class="cloud"></div>
            <div id="cloud2" class="cloud"></div>
        </div>
        <div class="login">
        <Card>
            <p slot="title"><Icon type="person-stalker"></Icon>&nbsp;&nbsp;翼生涯 - 用户登录</p>
            <Form id="form">
                <Form-item label="帐号">
                    <Input placeholder="请输入登录帐号" v-model="form.username" :maxlength="maxlength" name="username"></Input>
                </Form-item>
                <Form-item label="密码">
                    <Input placeholder="请输入登录密码" v-model="form.passwd" type="password" :maxlength="maxlength" name="password"></Input>
                </Form-item>
                <Form-item><br>
                    <Button type="primary" icon="android-done" :loading="loading" @click="handleSubmit()">{{primary_text}}</Button>
                </Form-item>
            </Form>
        </Card>
    </div>

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
                    username: '',
                    passwd: ''
                }
    		}
    	},
        created(){
            var $ = window.$;
            let self = this;;
            setTimeout(function(){
                //$('.login').css('left',($(window).width() - $('.login').width()) / 2)
                document.onkeydown = (e)=>{
                    var theEvent = e || window.event;  
                    var code = theEvent.keyCode || theEvent.which || theEvent.charCode;  
                    if (code == 13) {   
                        self.handleSubmit();
                    }  
                }; 
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
    			api.login(this.form.username,this.form.passwd,(result)=>{
                    result = JSON.parse(result);
    				if( result.id ){
                        if(result.role_id != '0,999,0' && result.role_source_id.toString() != '2'){
                            this.$Message.warning('登录失败,平台只限教务使用~');
                            this.primary_text = '登录',this.loading = false;
                            return;
                        }

    					this.primary_text = '登录成功，正在跳转...';
	    				setTimeout(()=>{
	    					window.config.userinfo = result;
                            window.config.userinfo.is_admin = result.role_id == '0,999,0' ? true : false;
                            window.config.userinfo.photo = window.config.userinfo.photo ? 
                                                           
                            (!dist ?'http://www.yishengya.cn/' : 'http://localhost:9087/')
                                                            + window.config.userinfo.photo : '/public/vue/dist/face.jpg';
                            // 存储到本地
                            localStorage.userinfo = JSON.stringify(window.config.userinfo);
	    					$('.wrapper .layout').css('background','#f5f7f9');
                            $('body').css('background','none');
	    					__.go(this,'/');
	    				},0)
    				}else{
    					this.primary_text = '登录',this.loading = false;
    					this.$Message.warning('登录用户名或密码错误，请重新输入');
    				}
    			})
    		}
    	},
        mounted(){
            $('.wrapper .layout').css('background','none');
        },
        components : {  },
    }
</script>