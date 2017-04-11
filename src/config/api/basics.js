/**
 * 登陆API
 */

import '../../libs/units';
import setting from '../setting';

var get = setting.get_api_setting;
export default {
	// 返回当前用户所在学校的所有年级
	get_grade(school_id,func = null) {
		return __.get( get('basics/base/get_grade/?school_id=' + school_id),func );
	},
	// 返回当前用户所在学校的所有课目
	get_course(school_id,func = null) {
		return __.get( get('basics/base/get_course/?school_id=' + school_id),func );
	},
	// 剪贴板年级导入
	do_import_grade_paset(array,func = null){
		return __.post( get('basics/_class/paset',array),func );
	},
	// Excel年级导入
	do_import_grade_excel(array,func = null){
		return __.post( get('basics/_class/excel',array),func );	
	},
	// 剪贴板课程导入
	do_import_course_paset(array,func = null){
		return __.post( get('basics/course/paset',array),func );
	},
	// Excel年级导入
	do_import_course_excel(array,func = null){
		return __.post( get('basics/course/excel',array),func );	
	},
	// 获取当前学校的有教师
	get_school_teacher(school_id = null,page_index,func = null){
		return __.get( get('basics/teacher/get_school_teacher/?school_id=' + school_id + '&page_size='+ setting.get_page_size +'&page_index=' + page_index),func );
	}
}
