// 基础配置类

var api_url = 'http://localhost:9087/';

export default {
	get_api_url : api_url,
	get_api_setting : (url)=>{
		return { url : api_url + 'api.php/' + url ,data : window.$("#form").serialize() };
	},
};