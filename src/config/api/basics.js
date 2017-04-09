/**
 * 登陆API
 */

import '../../libs/units';
import setting from '../setting';

var get = setting.get_api_setting;
export default {
	// 返回当前用户所在学校的所有年级
	get_grade(school_id,func = null) {
		return __.get( get('basics/get_grade/?school_id=' + school_id),func );
	},
	do_import(array,func = null){
		return __.post( get('index/login',array),func );
	}
}
