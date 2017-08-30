<template>   
    <base_import ref="import" @init="init" :table_columns="table_columns" :fields_array="fields_array" @import_paset="import_paset" @set_table_data="set_table_data">
        <Alert>班级批量上传
                <template slot="desc">消息提示的描述文案消息提示的描述文案消息提示的描述文案消息提示的描述文案消息提示的描述文案<br>
                <a href="/public/templates/tpl_class.xlsx"><Button type="dashed" icon="arrow-down-a">模板下载</Button></a>    
                </template>
        </Alert>
         <Form :label-width="80" inline>
            <Form-item label="更新班主任">
                <i-switch v-model="is_update"></i-switch>
            </Form-item>
        </Form>                
    </base_import>
</template>
<script type="text/javascript">
    import base_import from '../../components/base_import.vue'
    import api from '../../config/api/basics'
    import table_columns from '../../config/table_columns'
    export default {
        data(){
            return {
                name : 'class_import',
                table_columns : table_columns.class.call(this),
                fields_array : ['name','student_cnt','teachers','class_room'],
                table_data : [],
                is_update : false
            }
        },
        methods : {
            init : function(){
                window.config.active = 'class';
                window.config.active_name = '班级管理';
            },
            // 剪贴板导入
            import_paset : function(object){
                var param = {
                    data : JSON.stringify(this.table_data),
                    grade_id : object.grade_id,
                    school_id : object.school_id,
                    school_district : object.school_district,
                    is_update : this.is_update
                };
                api.do_import_grade_paset(param,(result)=>{
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
            column_render : function(row,column,index){
                if(this.is_update){
                    let list = this.$refs.import.teacher_list;
                    if(list.length == 0){
                        this.$refs.import.msg_error = ['教师匹配失败'];
                    }else{
                        var info = __.info(list,'name',row.teachers);
                        if(! info){
                            let err = row.teachers + '匹配失败';
                            this.$refs.import.msg_error.push(err);
                        }else{
                            this.table_data[index].teacher_id = info.id;
                        }
                    }
                }
                return row.teachers;
            },
        },
        components : { base_import },
    }
</script>