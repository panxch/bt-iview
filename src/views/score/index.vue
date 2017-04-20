<template>
    <div class="layout-main">
        <div class="layout-content">
            <Alert>成绩管理
                    <template slot="desc">消息提示的描述文案消息提示的描述文案消息提示的描述文案消息提示的描述文案消息提示的描述文案</template>
            </Alert>
            <Row type="flex">
                <i-col span="20"></i-col>
                <i-col span="1"></i-col>
                <i-col span="3">
                    <div class="float_right">
                        <Button type="success"><router-link to="/score/import">导入</router-link></Button>
                    </div>
                </i-col>
            </Row>
        </div>
        <Row>
             <i-col>
                 <Table border highlight-row :columns="table_columns" :data="table_data" stripe></Table>
             </i-col>
        </Row>
        <div class="space"></div>
        <Row>
             <i-col>
                 <div style="float:right;">
                     <Page :total="page_count" @on-change="handle_page_change" :page-size="20"></Page>
                 </div>
             </i-col>
        </Row>
    </div>
</template>
<script type="text/javascript">
    import setting from '../../config/setting';
    import api from '../../config/api/scores'
    export default {
        data(){
            return {
                table_columns : [
                        {
                            type: 'selection',
                            width: 60,
                            align: 'center',
                        },
                        {
                            title : '#',
                            key : 'id',
                            width: 80,
                            align: 'center',
                        },
                        {
                            title: '导入方式',
                            key: 'file_name_new',
                            sortable: true
                        },
                        {
                            title: '创建人',
                            key: 'name',
                            width: 200,
                            align: 'center',
                        },
                        {
                            title: '入学时间',
                            key: 'year',
                            width: 160,
                            align: 'center',
                        },
                        {
                            title: '学期',
                            width: 140,
                            key: 'semester',
                            align: 'center',
                        },
                        {
                            title: '考试时间',
                            width: 140,
                            key: 'examTime',
                            align: 'center',
                        },
                        {
                            title : '创建时间',
                            key : 'create_time',
                            width: 160,
                            align: 'center',
                            sortable: true
                        }
                    ],
                table_data : [],
                page_count : 0,
                page_index : 1,
            }
        },
        created(){
            window.config.active = 'score';
            window.config.active_name = '成绩上传管理';
        },
        methods :{
            handle_page_change : function(index){
                this.set_page(index);
            },
            set_page : function(index){
                __.loading();
                api.get_score_upload(window.config.userinfo.school_id,index,(result)=>{
                    this.table_data = result.data.list;
                    if(this.page_count === 0){
                        this.page_count = result.data.page_count;
                    }
                    __.closeAll();
              });
            }
        },
        mounted(){
           this.set_page(this.page_index);
        },
    }
</script>