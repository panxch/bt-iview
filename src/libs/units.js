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
// 过滤重复数据 
Array.prototype.distinct = function () {    
  var newArr = [],obj = {};    
  for(var i=0, len = this.length; i < len; i++){    
    if(!obj[typeof(this[i]) + this[i]]){    
      newArr.push(this[i]);    
      obj[typeof(this[i]) + this[i]] = 'new';    
    }    
  }    
  return newArr;  
}
// 自定义Join，将数组中的指定属性拼接返回
Array.prototype._join = function(filed){
  var str = '';
  this.forEach((c,i)=>{
    //str += eval('c.' + filed) + ',';
    str += c[filed] + ',';
  })
  return str.substring(0,str.length - 1);
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
      loading : function(_text = '数据加载中...'){
        //layer.open( {type: 2 ,content: _text,shadeClose:false,shade: 'background-color: rgba(0,0,0,.5)'} );
        let content = '<div class="loader"><div class="loader-inner square-spin"><div></div></div></div><br><span style="color:#fff;">加载中...</span>';
        layer.open({shadeClose : false,style: 'border:none; background:rgba(0,0,0,0);width:120px;',content:content})
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
      byName : function(_name){
        return document.getElementsByName(_name)[0];
      },
      // 在Array中返回指定value的info
      info : function(array,key,value){
        var info = array.find(function(c, index, arr){
          return c[key] == value;
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
                    //eval('info.' + _array_key[i] + '= "' + c + '"');
                    info[ _array_key[i] ] = c;
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
      },
      set_page : function (pageNo, pageSize, array) {  
          var offset = (pageNo - 1) * pageSize;  
          return (offset + pageSize >= array.length) ? array.slice(offset, array.length) : array.slice(offset, offset + pageSize);  
      },
      // iView专用验证数据打包
      iview_rule_serialize : function(_data){
        let list = {};
        for(let i in _data){
            list[i] = _data[i];
        };
        return list;
      },
      // iView全选或单选下的值返
      get_selection : function(selection){
        var info = {count : 0,ids : ''};
        if(selection.length > 0){
          info.count = selection.length;
        }
        for(let i in selection){
          if(selection[i].id){
            info.ids += selection[i].id  + ',';
          }
        };
        if(selection.length > 0){
          info.ids = info.ids.substring(0,info.ids.length - 1);
        }
        return info;
      },
      // iView中首页列表中的多列选择判断
      get_list_update_check : function(list){
        list.pass = true;
        if(list.count == 0){
          list.error = '未选择任何数据,请选择后再次操作~';
          list.pass = false;
        }else if(list.count > 1){
          list.error = '本次操作，只允许选择1条数据~';
          list.pass = false;
        }
        return list;
      },
      // 重定向路由
      go : function(self,url,query = null){
        let param = { path: url};
        if(query){
          param.query = query;
        }
        self.$router.push(param);
      },
      // 双击更新跳转
      bind_list_dblclick : function(self,url){
        let _this = this;
        setTimeout(function(){
            $('div.ivu-table-body table tr').dblclick((c,i)=>{
                let info = $(c.currentTarget);
                let id = info.find('td:eq(1) span').html();
                _this.go(self,url, {id : id })
            })
        },1000);
      },
      // 更新完成跳转
      go_success(self,desc = '任务已经全部完成'){
        self.$Notice.success({title: '消息',desc:desc,duration : 1.5,top:500});
        self.clear();
        setTimeout(()=>{
            __.go(self,'/' + window.config.active);
        },1500)
      },
    }
    return new fn();
  })();
  window.__ = __;
})()