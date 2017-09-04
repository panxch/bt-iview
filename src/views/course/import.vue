<template>   
      <base_import ref="import" @init="init" :table_columns="table_columns" :fields_array="fields_array" @import_paset="import_paset" @set_table_data="set_table_data">
        <Alert>课程批量上传
                <template slot="desc">消息提示的描述文案消息提示的描述文案消息提示的描述文案消息提示的描述文案消息提示的描述文案<br>
                <a href="/public/templates/tpl_course.xlsx"><Button type="dashed" icon="arrow-down-a">模板下载</Button></a>
                </template>
        </Alert>
    </base_import>
</template>
<script type="text/javascript">
    import base_import from '../../components/base_import.vue'
    import api from '../../config/api/course'
    import table_columns from '../../config/table_columns'
    
    export default {
        data(){
            return {
                table_columns : table_columns.course.call(this),
                fields_array : ['code','name','type','credit','teaching_method','assessment_method','study_section','full_marks'],
                table_data : [],
            }
        },
        methods : {
            init : function(){
                window.config.active = 'course';
                window.config.active_name = '课程管理';
            },
            // 剪贴板导入
            import_paset : function(object){
                var param = {
                            data : JSON.stringify(this.table_data),
                            grade_id : object.grade_id,
                            school_id : object.school_id,
                            school_district:object.school_district
                        };
                api.do_import_course_paset(param,(result)=>{
                    result = eval(result);
                    if(result.length === 0){
                        this.$refs.import.import_success();
                    }
                })
            },            
            // 从子组件拿到数据进行包装
            set_table_data : function(value){
                if(value){
                    this.table_data.push(value);
                }else{
                    this.table_data = [];
                }
            }
        },
        components : { base_import },
    }
</script>