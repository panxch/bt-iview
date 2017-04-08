<template>
       <div class="layout-main">
        <div class="layout-content">
        Welcome
    </div>
    </div>
</template>
<script type="text/javascript">
    export default {
        created(){
            window.config.active = 'home';
            window.config.active_name = '应用中心';
        }
    }
</script>