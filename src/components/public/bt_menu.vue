<style type="text/css">
    .wrapper li.ivu-menu-item{padding: 6px 24px;}
    .wrapper div.ivu-menu-vertical,.wrapper div.ivu-menu-item-group-title{height: 35px;line-height: 35px;}
</style>
<template>
    <Menu :active-name="config.active" theme="dark" width="auto" :open-names="['1']"  @on-select="handleSelect" accordion>
        <slot></slot>
            <Menu-group>
                <Menu-item name="school" v-if="is_admin"><Icon type="ios-home"></Icon>学校管理</Menu-item>
                <Menu-item name="grade"><Icon type="cube"></Icon>年级管理</Menu-item>
                <Menu-item name="course"><Icon type="compose"></Icon>课程管理</Menu-item>
                
                <Menu-item name="class"><Icon type="bookmark"></Icon>行政班</Menu-item>

                <Menu-item name="teacher"><Icon type="person"></Icon>教师管理</Menu-item>
                <Menu-item name="student"><Icon type="person-stalker"></Icon>学生管理</Menu-item>

                <Menu-item name="score_import"><Icon type="android-clipboard"></Icon>导入管理</Menu-item>

                <Menu-item name="role"><Icon type="ios-people"></Icon>角色管理</Menu-item>
                <Menu-item name="func"><Icon type="settings"></Icon>模块管理</Menu-item>

            </Menu-group>
    </Menu>
</template>

<script type="text/javascript">
export default {
	name: 'bt_menu',
	data () {
		return {
            is_admin : window.config.userinfo.is_admin,
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