<template>   
    <base_import @init="init" :table_columns="table_columns" :fields_array="fields_array">
        <Alert>课程批量上传
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
            }
        },
        methods : {
            init : function(){
                log('init/course');
                window.config.active = 'course';
                window.config.active_name = '课程管理';
            }
        },
        components : { base_import },
    }
</script>