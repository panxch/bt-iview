/**
 * 登陆API
 */

import '../../libs/units';
import setting from '../setting';

var get = setting.get_api_setting;
export default {
	// 剪贴板教师导入
	save(func = null){
		return __.post( get('basics/grade/do_save'),func );
	},
	// 返回当前用户所在学校的所有年级
	get_grade(grade_id,func = null) {
		return __.get( get('basics/grade/get_grade/?grade_id=' + grade_id),func );
	},
}
