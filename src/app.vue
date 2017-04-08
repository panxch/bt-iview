<style scoped>
    @import 'styles/common.css';
</style>
<template>
    <div class="wrapper">
       <div class="layout" >
            <Row type="flex">
                <i-col span="4" class="layout-menu-left" v-if="config.userinfo.id != null">
                    <bt_menu v-if="config.userinfo.id  != null " :config="config"></bt_menu>
                </i-col>
                <i-col span="20">
                    <bt_header v-if="config.userinfo.id  != null "></bt_header>
                    <bt_breadcrumb v-if="config.userinfo.id  != null " :config="config"></bt_breadcrumb>
                    <div class="layout-box">
                        <router-view></router-view>
                    </div>
                </i-col>
            </Row>
        </div>
    </div>
</template>
<script type="text/javascript">
    import bt_header from './components/public/bt_header.vue'
    import bt_menu from './components/public/bt_menu.vue'
    import bt_breadcrumb from './components/public/bt_breadcrumb.vue'
    export default {
        data () {
            return {
                config : window.config
            }
        },
        created(){
        },
        components : { bt_header,bt_menu,bt_breadcrumb },
    }
</script>