import _rules from './rules';

var btv = {};

// 验证规则
btv.rules_validator = _rules;

// 遍历验证
btv.check = function(info){
  if(info.rule === 'required'){
    info.err = info.empty_err + '不能为空';
  }
	//return btv.rules_validator[info.rule](info.dom.value);
  return btv.rules_validator[info.rule](info.dom);
}
// 返回默认规则
btv.default = function(){
  let info = { empty_err:'未知',rules:["required"] };
  return info;
}

btv.install = function(Vue, options){
    Vue.directive('bt-validator',{
        bind:function(el, binding, vnode){
        	// VUE实例
          	var vm = vnode.context
          	// 定义对象，存储验证规则及验证对象
          	vm.vals = vm.vals || {};
      		// 将惟一Name带入对存储对象中
          	let info = vm.vals[el.getAttribute('name')] = {};
          	// 将规则带入对存储对象中
          	info['rules'] = binding.value;
          	// 将错误提示文字带入对存储对象中
          	info['err'] = el.getAttribute('err');
            // 默认空错误提醒
            info['empty_err'] = el.getAttribute('empty_err') || el.getAttribute('name');
      },
    });

    var _valid = Vue.prototype;

    _valid.validator = function($data = null,$rules){
      btv.$data = $data;
      btv.$rules = $rules;
      if(Object.prototype.toString.call($data) === '[object Object]'){
        let errors = [];
        for(let i in $rules){
          let dom = $rules[i];
          let dobule_reg = true;
          let model = null;//btv.default();
          if(Object.prototype.toString.call(this.vals[i]) == '[object Object]'){
            model = this.vals[i];
          }
          if(model){
            // 规则遍历验证
            model.rules.forEach((c)=>{
              let info = {
              dom : dom,
              rule : c,
              err : model.err,
              empty_err : model.empty_err
            };
               // 如果验证未通过，将错误信息带入错误池
              if(! btv.check(info) && dobule_reg == true){
                 dobule_reg = false
                 errors.push(info.err);
              }
            })
          }
        }
        return errors;
      };
	};
	// 全局是否验证通过
	_valid.is_validator = function(){
		return this.validator(btv.$data,btv.$rules).length > 0 ? false : true;
	}
};

export default btv