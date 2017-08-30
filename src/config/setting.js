// 基础配置类

var __host = 'http://manage.yishengya.cn/';
var __index = 'index.php/';
if(dist){
	__host = 'http://localhost:9087/';
	__index = 'api.php/';
}


export default {
	get_host : __host,
	get_api_url : __host + __index,
	get_page_size : 10,
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
			if(Object.prototype.toString.call(data) == '[object String]'){
				data += '&safe_school_id=' + school_id;
			}
			else if(Object.prototype.toString.call(data) == '[object Object]'){
				data.safe_school_id = school_id;
			}
		}
		return { url : __host + __index + url ,data : data };
	},
	get_menu : {
			base : [
				{name : '年级管理',key : 'grade',icon : 'cube'},
				{name : '课程管理',key : 'course',icon : 'compose'},
				{name : '行政班级',key : 'class',icon : 'bookmark'},
				{name : '教师管理',key : 'teacher',icon : 'person'},
				{name : '学生管理',key : 'student',icon : 'person-stalker'},
				{name : '导入管理',key : 'score_import',icon : 'android-clipboard'}
			],
			setting : [
				{name : '学校管理',key : 'school',icon : 'ios-home'},
				{name : '角色管理',key : 'role',icon : 'ios-people'},
				{name : '模块管理',key : 'func',icon : 'settings'}
			],
	},
	get_school_type : [{id : '1',name : '小学'},{id : 2,name : '初中'},{id : 3,name : '高中'}]
};