<template>   
    <div class="layout-main">
        <div class="layout-content">
            <Alert>班级批量上传
                <template slot="desc">消息提示的描述文案消息提示的描述文案消息提示的描述文案消息提示的描述文案消息提示的描述文案</template>
            </Alert>
            <div class="line"></div>
            <Row type="flex">
                <i-col span="10">
                    <Form :label-width="80" inline>
                        <Form-item label="年级">
                            <Select  placeholder="请选择" style="width:200px">
                                <Option :value="info.id" v-for="info in class_list">{{info.name}}/{{info.grade_name}}</Option>
                            </Select>
                        </Form-item>
                    </Form>
                </i-col>
            </Row>
        </div>
    </div>
</template>
<script type="text/javascript">
    import api from '../../config/api/basics'
    export default {
        data(){
            return {
                class_list : [],
            }
        },
        created(){
            window.config.active = 'class';
            window.config.active_name = '班级管理';
        },
        methods : {
            instance : function(){
                const title = '对话框的标题';
                const content = '<p>一些对话框内容</p><p>一些对话框内容</p>';
                this.$Modal.info({title: title,content: content});
            }
        },
        mounted(){
          //   __.loading();
          //   api.get_grade(window.config.userinfo.school_id,(result)=>{
          //       this.class_list = result.data;
          //       __.closeAll();
          // });
        },
        components : { },
    }
</script>