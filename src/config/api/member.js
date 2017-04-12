/**
 * 登陆API
 */

import '../../libs/units';
import setting from '../setting';

var get = setting.get_api_setting;
export default {
	// 剪贴板教师导入
	get_member(username,func = null){
		return __.post( get('basics/member/get_member?username=' + username),func );
	},
	
}
