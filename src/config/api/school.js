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
	
}
