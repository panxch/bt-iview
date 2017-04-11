<template>
    <Menu :active-name="config.active" theme="dark" width="auto" :open-names="['1']"  @on-select="handleSelect" accordion>
        <div class="layout-logo-left">
            <img src="/src/images/logo.png" class="logo">
        </div>
        <Submenu name="1">
            <template slot="title">
                <Icon type="ios-navigate"></Icon>
                基础数据
            </template>
            <Menu-item name="class"><span>班级管理</span></Menu-item>
            <Menu-item name="course">课程管理</Menu-item>
            <Menu-item name="teacher">教师管理</Menu-item>
        </Submenu>
        <Submenu name="2">
            <template slot="title">
                <Icon type="ios-keypad"></Icon>
                导航二
            </template>
            <Menu-item name="2-1">选项 1</Menu-item>
            <Menu-item name="2-2">选项 2</Menu-item>
        </Submenu>
        <Submenu name="3">
            <template slot="title">
                <Icon type="ios-analytics"></Icon>
                导航三
            </template>
            <Menu-item name="3-1">选项 1</Menu-item>
            <Menu-item name="3-2">选项 2</Menu-item>
        </Submenu>
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