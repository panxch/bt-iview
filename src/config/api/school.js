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
	
}
