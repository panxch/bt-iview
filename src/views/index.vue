<template>
   <div class="layout" >
        <Row type="flex">
            <i-col span="4" class="layout-menu-left">
                <bt_menu></bt_menu>
            </i-col>
            <i-col span="20">
                <bt_header></bt_header>
                <bt_breadcrumb>应用中心</bt_breadcrumb>
                <div class="layout-content">
                    <div class="layout-content-main">
                    	Welcome !
                    </div>
                </div>
            </i-col>
        </Row>
    </div>
</template>
<script type="text/javascript">
    import bt_header from '../components/public/bt_header.vue'
    import bt_menu from '../components/public/bt_menu.vue'
    import bt_breadcrumb from '../components/public/bt_breadcrumb.vue'
    export default {
        created(){
            window.config.active = 'home';
        },
        components : { bt_header,bt_menu,bt_breadcrumb },
    }
</script>