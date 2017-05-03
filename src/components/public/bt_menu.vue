<template>
    <Menu :active-name="config.active" theme="dark" width="auto" :open-names="['1']"  @on-select="handleSelect" accordion>
        <div class="layout-logo-left">
            <img src="/public/vue/dist/logo.png" class="logo">
        </div>
        <slot></slot>
        <Submenu name="1">
            <template slot="title">
                <Icon type="ios-navigate"></Icon>
                基础数据
            </template>
            <Menu-item name="school"><Icon type="ios-home"></Icon>学校管理</Menu-item>
            <Menu-item name="class"><Icon type="bookmark"></Icon>班级管理</Menu-item>
            <Menu-item name="course"><Icon type="compose"></Icon>课程管理</Menu-item>
            <Menu-item name="teacher"><Icon type="person-stalker"></Icon>教师管理</Menu-item>
            <Menu-item name="student"><Icon type="person"></Icon>学生管理</Menu-item>
            <Menu-item name="score"><Icon type="android-clipboard"></Icon>成绩管理</Menu-item>
        </Submenu>
        <Submenu name="2">
            <template slot="title">
                <Icon type="ios-keypad"></Icon>
                权限分配
            </template>
            <Menu-item name="role">角色管理</Menu-item>
        </Submenu>
        <!-- <Submenu name="3">
            <template slot="title">
                <Icon type="ios-analytics"></Icon>
                导航三
            </template>
            <Menu-item name="3-1">选项 1</Menu-item>
            <Menu-item name="3-2">选项 2</Menu-item>
        </Submenu> -->
    </Menu>
</template>

<script type="text/javascript">
export default {
	name: 'bt_menu',
	data () {
		return {
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