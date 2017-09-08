<template>
   <div class="layout-main">
        <div class="layout-content">
            <Alert>课程管理
                <template slot="desc">学校对课程的添加，修改和编辑</template>
            </Alert>
            <bt_school_filter ref="bt_school_filter" update_url="/course/update" import_url="/course/import" @selection="selection"></bt_school_filter>
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
    import api_course from '../../config/api/course'
    import bt_school_filter from '../../components/public/bt_school_filter.vue'
    export default {
        data(){
            return {
                table_columns : table_columns.course.call(this),
                table_data : [],
                selection : __.get_selection([]),
                page_index : window.config.page_index,
                page_count : window.config.page_count,
                page_size : setting.get_page_size,
                 data_count : '当前数据总量：0条',
            }
        },
        created(){
            window.config.active = 'course';
            window.config.active_name = '课程管理';
            this.table_columns.splice(2,1);
            this.table_columns.splice(5,2);
        },
        methods :{
            set_page : function(index){
                __.loading();
                var param = {school_ids : this.$refs.bt_school_filter.get_school_id(),page_index : index};
                api_course.get_course_by_school(param,(result)=>{
                    result = JSON.parse(result);
                    this.table_data = result.list;
                    if(this.page_count === 0){
                        this.page_count = window.config.page_count = result.page_count;
                        this.data_count = `当前数据总量：${result.page_count}条`;
                    }
                    __.closeAll();
                });
                __.bind_list_dblclick(this,'course/update');
            },
            // check勾选
            selection_change : function(selection){
                this.selection = __.get_selection(selection);
            },
            // 翻页
            handle_page_change : function(index){
                window.config.page_index = index;
                this.set_page(index);
            },
            column_render : function(row,column){
                // 授课方式
                if(column.row.teaching_method == 'onLine')
                    this.table_data[column.index].teaching_method = '线上';
                else if(column.row.teaching_method == 'faceToFace')
                    this.table_data[column.index].teaching_method = '面授';
                // 课程类别
                if(column.row.type == 'required')
                    this.table_data[column.index].type = '必修';
                else if(column.row.type == 'elective')
                    this.table_data[column.index].type = '选修';
                // 考核方式
                if(column.row.assessment_method == 'examination')
                    this.table_data[column.index].assessment_method = '考试';
                else if(column.row.assessment_method == 'other')
                    this.table_data[column.index].assessment_method = '其他';
                //学期
                if(column.row.study_section == '02')
                    this.table_data[column.index].study_section = '上学期';
                else if(column.row.study_section == '01')
                    this.table_data[column.index].study_section = '下学期';
                return `${column.row.id}`;
            },
        },
        mounted(){
            this.set_page(this.page_index);
        },
        components : { bt_school_filter },
    }
</script>