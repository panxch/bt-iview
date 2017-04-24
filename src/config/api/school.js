/**
 * 登陆API
 */

import '../../libs/units';
import setting from '../setting';

var get = setting.get_api_setting;
export default {
	// 剪贴板教师导入
	save(func = null){
		return __.post( get('school/school/do_save'),func );
	},
	get_school_group(func = null){
		return __.post( get('basics/base/get_city_group'),func );
	},
	get_school_by_id(school_id,func = null){
		return __.get( get('basics/base/get_school_by_id?school_id=' + school_id),func );
	}
}
