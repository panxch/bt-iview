<style type="text/css">
    .layout-main .ivu-row-flex h5{line-height: 30px;}
</style>
<template>
<div class="layout-main">
    <div class="layout-content">
        <Alert>学生管理
                <template slot="desc">学生管理的添加、修改、审核与删除</template>
        </Alert>
        <bt_school_filter ref="bt_school_filter" update_url="/student/update" import_url="/student/import" @selection="selection">
            <bt_search ref="student_search" @on-search="search_handle" placeholder="姓名或#年级"></bt_search>
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
    import api_student from '../../config/api/student'
    import bt_school_filter from '../../components/public/bt_school_filter.vue'
    import bt_search from '../../components/public/bt_search.vue'

    export default {
        data(){
            return {
                table_columns : table_columns.student.call(this),
                table_data : [],
                page_count : window.config.page_count,
                page_index : window.config.page_index,
                page_size : setting.get_page_size,
                tags : [],
                data_count : '当前数据总量：0条',
                selection : __.get_selection([]),
            }
        },
        created(){
            window.config.active = 'student';
            window.config.active_name = '学生管理';
        },
        methods :{
            column_render : function(row,column,index){
                if(column.key == 'is_by'){
                    if(row.is_by == '1')
                        return '<span style="color:rgb(214, 214, 213)">是</span>';
                    else if(row.is_by == '0')
                        return '<span style="color:rgb(115, 107, 3)">否</span>';
                    return '<span style="color:#ff0000">-</span>';
                }
            },
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
                api_student.get_student_by_school_ids(param,(result)=>{
                    result = JSON.parse(result);
                    this.table_data = result.list;
                    if(this.page_count === 0 || result.page_count > 0){
                        this.page_count = window.config.page_count = result.page_count;
                        this.data_count = `当前数据总量：${result.page_count}条`;
                    }
                    __.closeAll();
                });
                __.bind_list_dblclick(this,'student/update');
            },
            // search world
            search_handle(keyword){
                this.set_page(1,keyword);
            },  
        },
        mounted(){
            this.set_page(this.page_index,window.config.keyword || '');
        },
        components : { bt_school_filter,bt_search },
    }
</script>