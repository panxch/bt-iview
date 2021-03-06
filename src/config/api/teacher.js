/**
 * 登陆API
 */

import '../../libs/units';
import setting from '../setting';

var get = setting.get_api_setting;
export default {
	// 剪贴板教师导入
	do_import_teacher_paset(array,func = null){
		return __.post( get('basics/teacher/do_import_teacher_paset',array),func );
	},
	// 复制一条数据
	do_copy(id,func = null){
		return __.post( get(`basics/teacher/do_copy?id=${id}`),func );
	},
	get_teacher_by_school_ids(array,func = null){
		array.page_size = setting.get_page_size;
		return __.post( get('basics/teacher/get_teacher_by_school_ids',array),func );
	},
	get_teacher_by_school_district(array,func = null){
		if(! array.page_size){
			array.page_size = setting.get_page_size
		}
		return __.post( get('basics/teacher/get_teacher_by_school_district',array),func );
	},
	get_teacher(id,func = null){
		return __.get( get('basics/teacher/get_teacher?id=' + id),func );
	},
	save(func = null){
		return __.post( get('basics/teacher/do_save'),func );
	}
}
