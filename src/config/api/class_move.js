/**
 * 登陆API
 */

import '../../libs/units';
import setting from '../setting';

var get = setting.get_api_setting;
export default {
	// 返回单个或多个学校的所有class
	get_class_by_school(array,func = null){
		array.page_size = setting.get_page_size
		return __.post( get('basics/_class_move/get_class_by_school',array),func );
	},
	// 返回单个class
	get_class(class_id,func = null){
		return __.post( get('basics/_class_move/get_class?class_id=' + class_id),func );
	},
	save(func = null){
		return __.post( get('basics/_class_move/do_save'),func );
	},
	do_import_paset(array,func = null){
		return __.post( get('basics/_class_move/paset',array),func );
	},
	get_student_by_motive_id(id,func = null){
		return __.get( get('basics/_class_move/get_student_by_motive_id?id=' + id),func );
	}
}
