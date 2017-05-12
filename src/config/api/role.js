/**
 * 登陆API
 */

import '../../libs/units';
import setting from '../setting';

var get = setting.get_api_setting;
export default {
	// 返回单个或多个学校的所有class
	get_role_by_school(array,func = null){
		array.page_size = setting.get_page_size
		return __.post( get('basics/role/get_role_by_school',array),func );
	},
	get_funcs(funcs,func = null){
		let array = {funcs : null};
		if(funcs){
			array.funcs = funcs.func_id;
		}
		return __.post( get('basics/role/get_funcs',array),func );
	},
	// 返回单个class
	get_role(role_id,func = null){
		return __.post( get('basics/role/get_role?role_id=' + role_id),func );
	},
	save(func = null){
		return __.post( get('basics/role/do_save'),func );
	},
}
