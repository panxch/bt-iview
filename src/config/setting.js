// 基础配置类

var api_url = 'http://localhost:9087/';
if(window.location.host == 'www.yishengya.cn'){
	api_url = 'http://api2.yishengya.cn/';
}

export default {
	get_api_url : api_url,
	get_page_size : 20,
	title : '翼生涯',
	get_api_setting : (url,data)=>{
		data = data || window.$("#form").serialize();
		return { url : api_url + ''+ (window.location.host != 'localhost:8080' ? 'index' : 'api') +'.php/' + url ,data : data };
	},
};