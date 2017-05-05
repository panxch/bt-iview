var rules = {
	required : function(value){
		if(!value){
			return false;
		}
		return __.check_string(value.toString());
	},
	mobile : function(value){
		let patter = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
		return patter.test(value);
	},
	email : function(value){
		let patter = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
		return patter.test(value);
	},
	telphone : function(value){
		let patter = /\d{3}-\d{8}|\d{4}-\d{7}/;
		return patter.test(value);
	},
	card : function(value){
		let patter = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
		return patter.test(value);
	},
	user_safe : function(value){
		let patter = /^[a-zA-Z][a-zA-Z0-9_]{4,10}$/;
		return patter.test(value);
	},
	chinese : function(value){
		let patter = /[\u4e00-\u9fa5]{2,10}/;
		return patter.test(value);
	},
};

export default rules;