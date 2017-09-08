<style type="text/css">
    .wrapper li.ivu-menu-item{padding: 6px 24px;}
    .wrapper div.ivu-menu-vertical,.wrapper div.ivu-menu-item-group-title{height: 35px;line-height: 35px;}
</style>
<template>
    <Menu :active-name="config.active" theme="dark" width="auto" :open-names="['1']"  @on-select="handleSelect" accordion >
        <slot></slot>
            <Menu-group>
                <Menu-item :name="menu.key" v-for="menu in config.menu" :class="menu.is_sub"><Icon :type="menu.icon"></Icon>{{menu.name}}
                    <div class="menu" v-if="menu.sub">
                        <li v-for="sub in menu.sub" @click='handleSelect(sub.key)'>
                            <Icon :type="sub.icon"></Icon>{{sub.name}}
                        </li>
                    </div>
                </Menu-item>
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
            if(name){
                this.$router.push('/' + name);
            }
        }
    }
}

</script>