<template>   
      <base_import ref="import" @init="init" :table_columns="table_columns" :fields_array="fields_array" @import_paset="import_paset" @import_excel="import_excel" @set_table_data="set_table_data" @set_grade_value="set_grade_value" @set_excel_file="set_excel_file">
        <Alert>课程批量上传
                <template slot="desc">消息提示的描述文案消息提示的描述文案消息提示的描述文案消息提示的描述文案消息提示的描述文案</template>
        </Alert>
    </base_import>
</template>
<script type="text/javascript">
    import base_import from '../../components/base_import.vue'
    import api from '../../config/api/basics'
    
    export default {
        data(){
            return {
               table_columns : [
                        {
                            type: 'index',
                            width: 60,
                            align: 'center'
                        },
                        {
                            title: '课程码',
                            key: 'code'
                        },
                        {
                            title: '课程名',
                            key: 'name'
                        },
                        {
                            title: '课程类别',
                            key: 'type'
                        },
                        {
                            title: '学分',
                            key: 'credit'
                        },
                        {
                            title: '授课方式',
                            key: 'teaching_method'
                        },
                        {
                            title: '考核方式',
                            key: 'assessment_method'
                        },
                        {
                            title: '学期',
                            key: 'study_section'
                        },
                        {
                            title: '总分',
                            key: 'full_marks'
                        }
                    ],
                fields_array : ['code','name','type','credit','teaching_method','assessment_method','study_section','full_marks'],
                table_data : [],
                grade_value : null,
                excel_file : null
            }
        },
        methods : {
            init : function(){
                log('init/course');
                window.config.active = 'course';
                window.config.active_name = '课程管理';
            },
            // 剪贴板导入
            import_paset : function(){
                var param = {data : JSON.stringify(this.table_data),grade_id : this.grade_value,school_id : this.$refs.import.school_id};
                api.do_import_course_paset(param,(result)=>{
                    result = eval(result);
                    if(result.length === 0){
                        this.$refs.import.import_success();
                    }
                })
            },
            // Excel导入
            import_excel : function(){
                var param = {grade_id : this.grade_value,school_id : this.$refs.import.school_id,file : this.excel_file};
                api.do_import_course_excel(param,(result)=>{
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
            },
            // 从子组合中拿到所选择的年级
            set_grade_value : function(value){
                this.grade_value = value;
            },
            // 从子组合中拿到所选择的Excel文件
            set_excel_file : function(value){
                this.excel_file = value;
            }
        },
        components : { base_import },
    }
</script>