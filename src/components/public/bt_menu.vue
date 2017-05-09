<style type="text/css">
    .wrapper li.ivu-menu-item{padding: 6px 24px;}
    .wrapper div.ivu-menu-vertical,.wrapper div.ivu-menu-item-group-title{height: 35px;line-height: 35px;}
</style>
<template>
    <Menu :active-name="config.active" theme="dark" width="auto" :open-names="['1']"  @on-select="handleSelect" accordion>
        <div class="layout-logo-left">
            <img src="/public/vue/dist/logo.png" class="logo">
        </div>
        <slot></slot>
        <Submenu name="1">
            <template slot="title">
                <Icon type="ios-navigate"></Icon>
                基础设置
            </template>
            <Menu-group title="学校">
                <Menu-item name="school"><Icon type="ios-home"></Icon>学校管理</Menu-item>
                <Menu-item name="grade"><Icon type="ios-home"></Icon>年级管理</Menu-item>
                <Menu-item name="course"><Icon type="compose"></Icon>课程管理</Menu-item>
            </Menu-group>
            <Menu-group title="班级">
                <Menu-item name="class"><Icon type="bookmark"></Icon>行政班</Menu-item>
                <Menu-item name="z_class"><Icon type="bookmark"></Icon>走班</Menu-item>
            </Menu-group>
            <Menu-group title="帐号">
                <Menu-item name="teacher"><Icon type="person-stalker"></Icon>教师管理</Menu-item>
                <Menu-item name="student"><Icon type="person"></Icon>学生管理</Menu-item>
            </Menu-group>
            <Menu-group title="成绩">
                <Menu-item name="score"><Icon type="android-clipboard"></Icon>成绩管理</Menu-item>
            </Menu-group>
        </Submenu>
        <Submenu name="2">
            <template slot="title">
                <Icon type="ios-keypad"></Icon>
                权限设置
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