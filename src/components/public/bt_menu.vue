<style type="text/css">
    .wrapper li.ivu-menu-item{padding: 6px 24px;}
    .wrapper div.ivu-menu-vertical,.wrapper div.ivu-menu-item-group-title{height: 35px;line-height: 35px;}
</style>
<template>
    <Menu :active-name="config.active" theme="dark" width="auto" :open-names="['1']"  @on-select="handleSelect" accordion>
        <slot></slot>
            <Menu-group>
                <Menu-item :name="menu.key" v-for="menu in config.menu"><Icon :type="menu.icon"></Icon>{{menu.name}}</Menu-item>
            </Menu-group>
    </Menu>
</template>

<script type="text/javascript">
import 'bt-utils';
export default {
	name: 'bt_menu',
	data () {
		return {
            is_admin : this.config.userinfo.is_admin
		}
	},
    props: ['config'],
    methods : {
        handleSelect : function(name){
            this.$router.push('/' + name);
        }
    }
}

</script>