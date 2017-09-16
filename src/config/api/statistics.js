/**
 * 登陆API
 */

import '../../libs/units';
import setting from '../setting';

var get = setting.get_api_setting;
export default {
	// 返回单个或多个学校的所有class
	get_school_sale(func = null){
		return __.post( get('basics/statistics/get_school_sale'),func );
	},
    get_school_week(func = null){
		return __.post( get('basics/statistics/get_school_week_hot'),func );
	},
	
}
