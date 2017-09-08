<style type="text/css">
    .layout-main .ivu-row-flex h5{line-height: 30px;}
</style>
<template>
<div class="layout-main">
    <div class="layout-content">
        <Alert>教师管理
                <template slot="desc">教师管理的添加、修改、删除</template>
        </Alert>
        <bt_school_filter ref="bt_school_filter" @copy_handle="copy_handle" update_url="/teacher/update" import_url="/teacher/import" copy_url="/teacher">
            <bt_search ref="teacher_search" @on-search="search_handle" placeholder="请输入老师姓名"></bt_search>
        </bt_school_filter>
    </div>
    <Row>
         <i-col>
             <Table border highlight-row :columns="table_columns" :data="table_data" stripe @on-selection-change="selection_change"></Table>
         </i-col>
    </Row>
    <div class="space"></div>
    <Row>
         <i-col :span="12">
              <Badge :count="data_count" class-name="demo-badge-alone" v-if="this.page_count > 0"></Badge>&nbsp;
         </i-col>
         <i-col :span="12">
             <div style="float:right;">
                 <Page :total="page_count" @on-change="handle_page_change" :page-size="page_size" :current="page_index"></Page>
             </div>
         </i-col>
    </Row>
</div>
</template>
<script type="text/javascript">
    import setting from '../../config/setting';
    import table_columns from '../../config/table_columns';
    import api_teacher from '../../config/api/teacher'
    import bt_school_filter from '../../components/public/bt_school_filter.vue'
    import bt_search from '../../components/public/bt_search.vue'
    export default {
        data(){
            return {
                table_columns : table_columns.teacher,
                table_data : [],
                page_count : window.config.page_count,
                page_index : window.config.page_index,
                page_size : setting.get_page_size,
                data_count : '当前数据总量：0条',
                selection : __.get_selection([]),
            }
        },
        created(){
            window.config.active = 'teacher';
            window.config.active_name = '教师管理';
        },
        methods :{
            // page change
            handle_page_change : function(index){
                window.config.page_index = index;
                this.set_page(index,window.config.keyword || '');
            },
            // checked change
            selection_change : function(selection){
                this.selection = __.get_selection(selection);
            },            
            // set page
            set_page : function(index,keyword){
                __.loading();
                var param = {school_ids : this.$refs.bt_school_filter.get_school_id(),page_index : index,keyword : keyword};
                api_teacher.get_teacher_by_school_ids(param,(result)=>{
                    result = JSON.parse(result);
                    this.table_data = result.list;
                    if(this.page_count === 0 || result.page_count > 0){
                        this.page_count = window.config.page_count = result.page_count;
                        this.data_count = `当前数据总量：${result.page_count}条`;
                    }
                    __.closeAll();
                });
                __.bind_list_dblclick(this,'teacher/update');
            },
            // search world
            search_handle(keyword){
                this.set_page(1,keyword);
            },
            // copy
            copy_handle(){
                api_teacher.do_copy(this.selection.ids,result => {
                    this.set_page(this.page_index,window.config.keyword);
                })
            }
        },
        mounted(){
            this.set_page(this.page_index,window.config.keyword);
        },        
        components : { bt_school_filter,bt_search},
    }
</script>