/*
    实现Jquery链式查询的基本处理
    create by brandon fang 2017-05-25
*/
var log = function(val){
    console.log("%O",val);
}

~(function(W){
    var fn = (function(){

        var self = function($el){
            return new query($el);
        }

        var query = function($el){
            return this.init($el);
        }

        var p = query.prototype;

        p.init = function($el){
            this.$el = document.querySelector($el);
            this.render();
            return this;
        }
        // 渲染
        p.render = function(){
            // 样式渲染
            var style_funcs = ['size|font-size','color|color'];
            for(let info of style_funcs){
                let infos = info.split('|');
                p[ infos[0] ] = val => {
                    this.$el.style.setProperty(infos[1], `${val}`);
                    return this;
                }
            }

            // 文本渲染
            var txt_funcs = ['val|value','text|innerText','html|innerHTML'];
            for(let info of txt_funcs){
                let infos = info.split('|');
                p[ infos[0] ] = val => {
                    this.$el[ infos[1] ] = `${val}`;
                    return this;
                }
            }
        }
        
        return self;

    })();

    W._ = fn;
})(window)

let info = _("#jq").color('#ff0000').size('40px');
log(info);
// _("#p").color('blue').size('30px');