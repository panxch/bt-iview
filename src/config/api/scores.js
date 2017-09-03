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
	get_score_upload(array,func = null){
		array.page_size = setting.get_page_size
		//return __.post( get('basics/role/get_role_by_school',array),func );
		return __.post( get('scores/score/get_score_upload',array),func );
	},
	// 获取某个上传成绩的所有学生成绩
	get_student_score_list(array,func = null){
		array.page_size = setting.get_page_size
		//return __.post( get('basics/role/get_role_by_school',array),func );
		return __.post( get('scores/score/get_student_score_list',array),func );
	}	
}
