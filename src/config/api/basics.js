/**
 * 登陆API
 */

import '../../libs/units';
import setting from '../setting';

var get = setting.get_api_setting;
export default {
	get_grade(school_id,func = null) {
		return __.get( get('basics/get_grade/?school_id=' + school_id),func );
	},
}
