// 基础配置类

var api_url = 'http://api2.yishengya.cn/';
if(dist){
	api_url = 'http://localhost:9087/';	
}

function get_page_size(){
	let _w = window.screen.height;
	if(_w > 900)
		return 20;
	else if(_w > 800)
		return 15;
	return 10;
}

export default {
	get_api_url : api_url,
	get_page_size : get_page_size(),
	title : '翼生涯',
	get_api_setting : (url,data)=>{
		data = data || window.$("#form").serialize();
		if(!data){
			data = {};
		}
		let role_id = window.config.userinfo.role_id;
		let school_id = window.config.userinfo.school_id;
		let pass_route = ['school/school/get_school_district_union','basics/base/get_school/'];
		if(role_id != '0,999,0' && pass_route.indexOf(url) > -1){
			log(data)
			if(Object.prototype.toString.call(data) == '[object String]'){
				data += '&safe_school_id=' + school_id;
			}
			else if(Object.prototype.toString.call(data) == '[object Object]'){
				data.safe_school_id = school_id;
			}
		}
		return { url : api_url + ''+ (!dist ? 'index' : 'api') +'.php/' + url ,data : data };
	},
};