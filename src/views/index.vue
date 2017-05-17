<template>
    <div class="layout-main">
        <div class="layout-content">
            <div class="box">
                Hello World ~
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
    var fn = function () {
            this.x = 99;
        };
    var f = new fn();
    f.x = 100;
    log(f)
    log(new fn)
    export default {
        data(){
            return {
            }
        },
        created(){
            window.config.active = 'home';
            window.config.active_name = '应用中心';
        },
        methods : {           
            init : function(){
               
            },
        },
        mounted(){
            
        },
    }
</script>