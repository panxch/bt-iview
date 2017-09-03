<template>   
      <base_import ref="import" @init="init" :table_columns="table_columns" :fields_array="fields_array" @import_paset="import_paset" @set_table_data="set_table_data">
        <Alert>教室批量上传
                <template slot="desc">学校对教室的添加，修改和编辑<br>
                <a href="/public/templates/tpl_course.xlsx"><Button type="dashed" icon="arrow-down-a">模板下载</Button></a>
                </template>
        </Alert>
    </base_import>
</template>
<script type="text/javascript">
    import base_import from '../../components/base_import.vue'
    import api from '../../config/api/room'
    import table_columns from '../../config/table_columns'
    
    export default {
        data(){
            return {
                table_columns : table_columns.room.call(this),
                fields_array : ['name','classroom_location','number','type'],
                table_data : [],
            }
        },
        methods : {
            init : function(){
                window.config.active = 'room';
                window.config.active_name = '教室管理';
            },
            // 剪贴板导入
            import_paset : function(object){
                var param = {
                            data : JSON.stringify(this.table_data),
                            grade_id : object.grade_id,
                            school_id : object.school_id,
                            school_district:object.school_district
                        };
                api.do_import_room_paset(param,(result)=>{
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