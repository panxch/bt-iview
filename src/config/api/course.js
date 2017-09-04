/**
 * 登陆API
 */

import '../../libs/units';
import setting from '../setting';

var get = setting.get_api_setting;
export default {
	// 返回单个或多个学校的所有class
	get_course_by_school(array,func = null){
		array.page_size = setting.get_page_size
		return __.post( get('basics/course/get_course_by_school',array),func );
	},
	// 返回当前用户所在学校的所有课目
	get_course(school_id,district_id,func = null) {
		return __.get( get('basics/base/get_course/?school_id=' + school_id + '&school_district=' + district_id),func );
	},
	// 剪贴板课程导入
	do_import_course_paset(array,func = null){
		return __.post( get('basics/course/paset',array),func );
	},
	// 返回单个class
	get_course_info(course_id,func = null){
		return __.post( get('basics/course/get_course?course_id=' + course_id),func );
	},
	save(func = null){
		return __.post( get('basics/course/do_save'),func );
	},
}
