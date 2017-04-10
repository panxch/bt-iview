import axios from 'axios'
/**
 * @author brandon fang (Q:1206144309)
 * @dateTime 2017-02-28T17:32:10+0800
 * @desc 自建工具类
 * @return   {[type]}
 */
function log(val){
	console.log(val);
}
// Globle
Array.prototype.filter_attr = function(){
  var array = [];
  this.forEach(function(c,i){
    if(c.replace(/\s\S/g,'') != ''){
      c = c.replace(/\"/g,'');
      array.push(c);
    }
  });
  return array;
};

(function(){
  var __ = (function(){

    var fn = function(){
      return fn.prototype.init();
    };
    fn.prototype = {
      init : function(){
        return this;
      },
      // 将当前时间戳 转换成日期
      getLocalTime : function(_nS){
        return new Date(parseInt(_nS)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
      },
      // 将DIV滚动条移到最后
      getScrollBottom : function($info){
        $info.scrollTop( $info.height());
      },
      // 字符串空验证
      check_string : function(_str){
        if (_str.trim().replace(/(^s*)|(s*$)/g, "").length ==0){
            return false;
        }
        return true;
      },
      // 过滤Ojbect中的重复数据 
      filter : function(_target){
        var result = [];
        result.push(_target.shift());
        for(var i = 0;i<_target.length;i++){
            if(result.length > i && result[i].id != _target[i].id){
                result.push(_target[i]);
            }
        }
        return result;
      },
      loading : function(){
        layer.open( {type: 2 ,content: '数据加载中...',shadeClose:false,shade: 'background-color: rgba(0,0,0,.5)'} );
      },
      msg : function(_text,_func){
        layer.closeAll();
        layer.open({content: 'hello layer',skin: 'msg',time: 2});
      },
      // AJAX
      get : function(_args,_func){
        axios.get(_args.url).then(function(result){
          _func(result);
        })
      },
      post : function(_args,_func){
        $.ajax(
          {
            url: _args.url,
            data : _args.data,
            type: "post", 
            // dataType: 'jsonp',
            success: function (result) {
              return _func ? _func(result) : result;
            }
          }
        )
      },
      // 关闭所有window，依赖layer
      closeAll : function(){
        layer.closeAll();
      },
      // 根据id获取Dom
      byId : function(_id){
        return document.getElementById(_id);
      },
      // 在Array中返回指定value的info
      info : function(array,key,value){
        var info = array.find(function(c, index, arr){
          //log(eval('c.key') + '/' + value)
          return eval('c.key') == value;
        })
        return info || null;
      },
      // 剪贴板 数据匹配
      pasteMatch : function(_match,_array_key){
        var table_data = [];
        _match.forEach((c,i)=>{
            if( c.indexOf('TT') > -1){
                var column_match = c.replace('RR','').split('TT');
                var info = {};
                column_match.forEach((c,i)=>{
                    c = c.replace(/[\r\n]/g, ""); 
                    eval('info.' + _array_key[i] + '= "' + c + '"');
                });
                table_data.push( info );
            }
        });
        this.closeAll();
        return table_data
      },
      // 剪贴板侦听
      pasteListen : function(_func){
        var self = this;
        $(document.body).bind({  
          paste: function(e) {//paste事件
              self.loading();  
              var eve = e.originalEvent  
              var cp = eve.clipboardData;  
              var data = null;  
              var clipboardData = window.clipboardData; // IE  
              if (!clipboardData) { //chrome  
                  clipboardData = e.originalEvent.clipboardData  
              }  
              data = clipboardData.getData('Text');  
              data = data.replace(/[\t]/g, "TT");
              data = data.replace(/[\r]/g, "RR");
              setTimeout(()=>{
                _func(data);
              },500)
          }  
        });
      }
    }
    return new fn();
  })();
  window.__ = __;
})()