<template>   
    <base_import ref="import" @init="init" :table_columns="table_columns" :fields_array="fields_array" @import_paset="import_paset" @import_excel="import_excel" @set_table_data="set_table_data" @set_grade_value="set_grade_value" @set_excel_file="set_excel_file">
        <Alert>班级批量上传
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
                            title: '班级名称',
                            key: 'name'
                        },
                        {
                            title: '班级人数',
                            key: 'student_cnt'
                        },
                        {
                            title: '班主任',
                            key: 'teachers'
                        },
                        {
                            title: '教室',
                            key: 'class_room'
                        }
                    ],
                fields_array : ['name','student_cnt','teachers','class_room'],
                table_data : [],
                grade_value : null,
                excel_file : null
            }
        },
        methods : {
            init : function(){
                log('init/class');
                window.config.active = 'class';
                window.config.active_name = '班级管理';
            },
            // 剪贴板导入
            import_paset : function(){
                var param = {data : JSON.stringify(this.table_data),grade_id : this.grade_value,school_id : window.config.userinfo.school_id};
                api.do_import_grade_paset(param,(result)=>{
                    result = eval(result);
                    if(result.length === 0){
                        this.$refs.import.import_success();
                    }
                })
            },
            // Excel导入
            import_excel : function(){
                var param = {grade_id : this.grade_value,school_id : window.config.userinfo.school_id,file : this.excel_file};
                api.do_import_grade_excel(param,(result)=>{
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