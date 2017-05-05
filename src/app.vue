</style>
<style scoped>
    @import 'styles/common.css';
</style>
<template>
    <div class="wrapper">
       <div class="layout" :class="{'layout-hide-text': spanLeft < 5}">
            <Row type="flex">
                <i-col :span="spanLeft" class="layout-menu-left" v-if="config.userinfo.id != null">
                    <bt_menu v-if="config.userinfo.id  != null " :config="config">
                         <Row>
                            <Col span="14">&nbsp;</Col>
                            <Col span="10">
                                <i-button type="text" @click="toggleClick" class="menu-toggle">
                                    <Icon type="chevron-left" size="15">afdasf</Icon>
                                    收缩菜单
                                </i-button>
                            </Col>
                        </Row>
                    </bt_menu>
                </i-col>
                <i-col :span="spanRight">
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
                config : window.config,
                spanLeft : 3,
                spanRight : 21,
            }
        },
        methods: {
            toggleClick () {
                let self = this;
                setTimeout(function(){
                    let left = $('.wrapper .layout-menu-left');
                    left.addClass('menu-open').animate({'left' : left.width() * -1 + 5});
                    left.mouseover(function(){
                        left.unbind('mouseover');
                        left.removeClass('menu-open').animate({'left':'0px'});
                        self.spanLeft = 3;
                        self.spanRight = 21;
                    })
                },50)
                this.spanLeft = 0;
                this.spanRight = 24;
            }
        },
        created(){
        },
        components : { bt_header,bt_menu,bt_breadcrumb },
    }
</script>