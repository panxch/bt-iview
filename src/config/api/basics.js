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
	do_import_grade_paset(array,func = null){
		return __.post( get('basics/_class/paset',array),func );
	},
	do_import_grade_excel(array,func = null){
		return __.post( get('basics/_class/excel',array),func );	
	},
	do_import_course_paset(array,func = null){
		return __.post( get('basics/course/paset',array),func );
	},
	do_import_course_excel(array,func = null){
		return __.post( get('basics/course/excel',array),func );	
	},
}
