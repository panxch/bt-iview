<template>
<div class="layout-main">
    <div class="layout-content">
        <Alert>教师管理
                <template slot="desc">消息提示的描述文案消息提示的描述文案消息提示的描述文案消息提示的描述文案消息提示的描述文案</template>
        </Alert>
        <Row type="flex">
            <i-col span="1">
                <h4>筛选：</h4>
            </i-col>
            <i-col span="5">
                <drop_school @handle_school_change="handle_school_change" ref="drp_school"></drop_school>
            </i-col>
            <i-col span="8">
                <Tag closable color="blue" @on-close="handle_tag_close" :key="tag" :name="tag.name" v-for="tag in tags">{{tag.name}}</Tag>
            </i-col>
            <i-col span="10">
                <div class="float_right">
                    <Button type="info" @click="go_update">修改</Button>
                    <Button type="success"><router-link to="/teacher/import">导入</router-link></Button>
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
    <Row>
         <i-col>
             <div style="float:right;">
                 <Page :total="page_count" @on-change="handle_page_change" :page-size="20" :current="page_index"></Page>
             </div>
         </i-col>
    </Row>
</div>
</template>
<script type="text/javascript">
    import setting from '../../config/setting';
    import table_columns from '../../config/table_columns';
    import api from '../../config/api/basics'
    import api_teacher from '../../config/api/teacher'
    import drop_school from '../../components/drop_school.vue'
    export default {
        data(){
            return {
                table_columns : table_columns.teacher,
                table_data : [],
                page_count : window.config.page_count,
                page_index : window.config.page_index,
                tags : [],
                selection : __.get_selection([]),
            }
        },
        created(){
            window.config.active = 'teacher';
            window.config.active_name = '教师管理';
            let info = window.config.userinfo;
            this.tags = [{id : info.school_id,name:'test',name : info.school}];
        },
        methods :{
            handle_page_change : function(index){
                window.config.page_index = index;
                this.set_page(index);
            },
            // 选择事件
            selection_change : function(selection){
                this.selection = __.get_selection(selection);
            },
            // 修改
            go_update : function(){
                let info = __.get_list_update_check(this.selection);
                if(! info.pass){
                    this.$Message.error(info.error);
                    return;
                }
                this.$router.push({ path: 'teacher/update',query : {id : info.ids }});
            },
            // 分页
            set_page : function(index){
                __.loading();
                var param = {school_ids : this.tags._join('id'),page_index : index};
                if(!this.tags._join('id')){
                    param.school_ids = window.config.userinfo.school_id;
                }
                api_teacher.get_teacher_by_school_ids(param,(result)=>{
                    result = JSON.parse(result);
                    this.table_data = result.list;
                    if(this.page_count === 0){
                        this.page_count = window.config.page_count = result.page_count;
                    }
                    __.closeAll();
              });
            },
            // 学校选择
            handle_school_change : function(value){
                if(this.tags.length <3){
                    let last = window.config.last_school;
                    this.tags.push({id : last.id,name : last.name});
                    this.page_count = 0;
                    this.set_page(1);
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
                this.set_page(1);
            },
        },
        mounted(){
            this.set_page(this.page_index);
        },
        components : { drop_school },
    }
</script>