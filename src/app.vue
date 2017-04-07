<style scoped>
    @import 'styles/common.css';
</style>
<template>
    <div class="wrapper">
        <router-view></router-view>
    </div>
</template>
<script type="text/javascript">
    //import bt_header from './components/public/bt_header.vue'
    export default {
        data () {
            return {
                userInfo : window.config.userinfo
            }
        }
    }
</script>
