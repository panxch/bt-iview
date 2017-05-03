/**
 * 登陆API
 */

import '../../libs/units';
import setting from '../setting';

var get = setting.get_api_setting;
export default {
	get_student_by_school_ids(array,func = null){
		array.page_size = setting.get_page_size
		return __.post( get('basics/student/get_student_by_school_ids',array),func );
	},
	get_student(id,func = null){
		return __.get( get('basics/student/get_teacher?id=' + id),func );
	},
	save(func = null){
		return __.post( get('basics/teacher/do_save'),func );
	},
}
