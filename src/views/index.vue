<template>
    <div class="layout-main">
        <div class="layout-content">
            Welcome<br>
        </div>
    </div>
</template>
<script type="text/javascript">
    export default {
        data(){
            return {
                m_address : ''
            }
        },
        created(){
            window.config.active = 'home';
            window.config.active_name = '应用中心';
        },
        methods : {
            regex : function(){
                log(this.validator(this.$data));
            }
        },
        mounted(){
            //this.validator.all();
        },
    }
</script>