/**
 * 登陆API
 */

import '../../libs/units';
import setting from '../setting';

var get = setting.get_api_setting;
export default {
	login(username,passwd,func = null) {
		return __.post( get('index/login'),func );
	},
	loginOut(){
		__.post( get('index/loginOut'));
	}
}
