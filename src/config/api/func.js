/**
 * 登陆API
 */

import '../../libs/units';
import setting from '../setting';

var get = setting.get_api_setting;
export default {
	// 剪贴板教师导入
	save(func = null){
		return __.post( get('basics/func/do_save'),func );
	},
	// 返回当前用户所在学校的所有年级
	get_func_all(func = null) {
		return __.get( get('basics/func/get_func_all'),func );
	},
	get_func(id,func = null) {
		return __.get( get('basics/func/get_func?id=' + id),func );
	},
}
