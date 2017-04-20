/**
 * 登陆API
 */

import '../../libs/units';
import setting from '../setting';

var get = setting.get_api_setting;
export default {
	// 剪贴板教师导入
	do_import_score_upload_paset(array,func = null){
		return __.post( get('scores/score/do_import_score_upload_paset',array),func );
	},
	// 获取当前学校的有教师
	get_score_upload(school_id = null,page_index,func = null){
		return __.get( get('scores/score/get_score_upload/?school_id=' + school_id + '&page_size='+ setting.get_page_size +'&page_index=' + page_index),func );
	}
	
}
