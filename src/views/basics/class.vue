<template>   
    <base_import @init="init" :table_columns="table_columns" :fields_array="fields_array">
        <Alert>班级批量上传
                <template slot="desc">消息提示的描述文案消息提示的描述文案消息提示的描述文案消息提示的描述文案消息提示的描述文案</template>
        </Alert>
    </base_import>
</template>
<script type="text/javascript">
    import base_import from '../../components/base_import.vue'
    var $ = window.$;

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
            }
        },
        methods : {
            init : function(){
                log('init/class');
                window.config.active = 'class';
                window.config.active_name = '班级管理';
            }
        },
        components : { base_import },
    }
</script>