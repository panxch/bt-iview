<template>
   <div class="layout-main">
        <div class="layout-content">
            <Alert>年级管理
                <template slot="desc">消息提示的描述文案消息提示的描述文案消息提示的描述文案消息提示的描述文案消息提示的描述文案</template>
            </Alert>
            <Row type="flex">
                <i-col span="1">
                <h5>筛选：</h5>
                </i-col>
                <i-col span="5">
                    <drop_school @handle_school_change="handle_school_change" ref="drp_school"></drop_school>
                </i-col>
                <i-col span="8">
                    <Tag closable color="blue" @on-close="handle_tag_close" :key="tag" :name="tag.name" v-for="tag in tags">{{tag.name}}</Tag>
                </i-col>
                <i-col span="10">
                    <div class="float_right">
                        <event_button @click="go_update" type="info" icon="ios-checkmark-outline">修改</event_button>
                        <event_button @click="go_add" type="success" icon="plus-round">添加</event_button>
                    </div>
                </i-col>
            </Row>
        </div>
        <Row>
             <i-col>
                 <Table border highlight-row :columns="table_columns" :data="table_data" stripe @on-selection-change="selection_change"></Table>
             </i-col>
        </Row>
        <div class="space"></div>
    </div>
</template>
<script type="text/javascript">
    import setting from '../../config/setting';
    import table_columns from '../../config/table_columns';
    import api from '../../config/api/basics'
    import drop_school from '../../components/drop_school.vue'
    import event_button from '../../components/public/bt_save.vue'
    export default {
        data(){
            return {
                table_columns : table_columns.grade.call(this),
                table_data : [],
                selection : __.get_selection([]),
                tags : [],
            }
        },
        created(){
            window.config.active = 'grade';
            window.config.active_name = '年级管理';
            this.tags = JSON.parse(localStorage.school_tags);
        },
        methods :{
            set_page : function(){
                __.loading();
                var param = {school_id : this.tags._join('id')};
                if(!this.tags._join('id')){
                    param.school_id = window.config.userinfo.school_id;
                }

                api.get_grade(param.school_id,null,(result)=>{
                    this.table_data = result.data;
                    __.closeAll();
                });
                __.bind_list_dblclick(this,'grade/update');
            },
            selection_change : function(selection){
                this.selection = __.get_selection(selection);
            },
            go_update : function(){
                let info = __.get_list_update_check(this.selection);
                if(! info.pass){
                    this.$Message.error(info.error);
                    return;
                }
                __.go(this,'grade/update',{id : info.ids });
            },
            go_add : function(){
                __.go(this,'/grade/add');
            },
            // 学校选择
            handle_school_change : function(value){
                if(this.tags.length <3){
                    let last = window.config.last_school;
                    this.tags.push({id : last.id,name : last.name});
                    this.set_page();
                }else{
                    this.$Message.warning('多学校筛选最多同时只能选择3所~');
                }
            },
            // 关闭Tag
            handle_tag_close : function(event, name){
                var index = (function(tags){
                    let j = null;
                    var t = tags.find((c,i)=>{
                        if(c.name == name){
                            j = i;
                            return false;
                        }
                    });
                    return j;
                })(this.tags);
                this.tags.splice(index, 1);
                this.page_count = 0;
                this.set_page();
            },
        },
        mounted(){
         this.set_page();
        },
        // 计算器
        watch : {
            tags : function(){
                localStorage.school_tags = JSON.stringify(this.tags);
            }
        },
        components : { drop_school,event_button },
    }
</script>