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
	get_student_by_school(school_id,district_id = null,func = null) {
		return __.get( get('basics/student/get_student_by_school/?school_id=' + school_id + '&district_id=' + district_id),func );
	},
	get_student(id,func = null){
		return __.get( get('basics/student/get_student?id=' + id),func );
	},
	save(func = null){
		return __.post( get('basics/student/do_save'),func );
	},
	do_import_student_paset(array,func = null){
		return __.post( get('basics/student/do_import_student_paset',array),func );
	},
	do_import_paset_save(array,func = null){
		return __.post( get('basics/student/do_import_paset_save',array),func );
	},
}
