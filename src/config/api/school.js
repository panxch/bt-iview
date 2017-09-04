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
	// 根据school_id获取特定学校
	get_school_by_id(school_id,func = null){
		return __.get( get('basics/base/get_school_by_id?school_id=' + school_id),func );
	},
	// 获取指定学校的所有校区
	get_school_district(school_id,func = null){
		return __.get( get('school/school/get_school_district?school_id=' + school_id),func );
	},
	// 获取所有学校和校区的关系
	get_school_district_union(func = null){
		return __.post( get('school/school/get_school_district_union'),func );
	}
}
