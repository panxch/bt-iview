<template>
    <div class="layout-main">
        <div class="layout-content">
            Welcome<br>
            <input placeholder="请输入..." class="ivu-input" v-model="m_address" name="address" v-bt-validator:rules="['required']" empty_err="学校地址"><br>
            <button @click="regex">Regex</button>
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