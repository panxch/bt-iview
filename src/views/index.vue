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