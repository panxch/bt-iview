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
            <div class="line"></div>
            <Tabs value="name1">
                <Tab-pane label="剪贴板导入" name="name1" icon="clipboard">
                    <Row type="flex">
                        <i-col span="19"><Input type="text" placeholder="请直接Control + V" :readonly="true"></Input></i-col>
                        <i-col span="1"></i-col>
                        <i-col span="2"><Button type="warning" @click="clear">清除</Button></i-col>
                        <i-col span="2"><Button type="success">导入</Button></i-col>
                    </Row>
                    <div class="space"></div>
                    <Table highlight-row :columns="table_columns" :data="table_data" v-if="table_data.length > 0"></Table>
                </Tab-pane>
                <Tab-pane label="Excel导入" name="name2" icon="android-attach">标签二的内容</Tab-pane>
            </Tabs>
        </div>
    </div>
</template>
<script type="text/javascript">
    import api from '../../config/api/basics'
    var $ = window.$;
    export default {
        data(){
            return {
                class_list : [],
                table_columns : [
                        {
                            type: 'index',
                            width: 60,
                            align: 'center'
                        },
                        {
                            title: '用户名',
                            key: 'name'
                        },
                        {
                            title: '密码',
                            key: 'passwd'
                        },
                        {
                            title: '学校',
                            key: 'school'
                        }
                    ],
                table_data : []
            }
        },
        created(){
            window.config.active = 'class';
            window.config.active_name = '班级管理';
            this._init();
        },
        methods : {
            instance : function(){
                const title = '对话框的标题';
                const content = '<p>一些对话框内容</p><p>一些对话框内容</p>';
                this.$Modal.info({title: title,content: content});
            },
            _init : function(){
                // 设置剪贴板侦听
                __.pasteListen((data)=>{
                    this.hald_paste(data + 'RR');
                })
            },
            // 完成粘贴板的匹配
            hald_paste : function(data){
                var line_match = data.match(/([\W\w]*?)RR/g);
                var array_key = ['name','passwd','school'];
                line_match.forEach((c,i)=>{
                    var column_match = c.replace('RR','').split('TT');
                    var info = {};
                    column_match.forEach((c,i)=>{
                        eval('info.' + array_key[i] + '= "' + c + '"');
                    });
                    this.table_data.push( info );
                });
            },
            // 清除粘贴数据
            clear : function(){
                this.table_data = [];
            },
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