<template>
   <div class="layout-main">
        <div class="layout-content">
            <Alert>学校管理
                    <template slot="desc">消息提示的描述文案消息提示的描述文案消息提示的描述文案消息提示的描述文案消息提示的描述文案</template>
            </Alert>
            <Row type="flex">
                        <i-col span="20"></i-col>
                        <i-col span="1"></i-col>
                        <i-col span="3">
                            <div class="float_right">
                                <Button type="warning"><router-link to="/school/role">角色</router-link></Button>
                                <Button type="success"><router-link to="/school/add">添加</router-link></Button>
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
    import api from '../../config/api/basics'
    export default {
        data(){
            return {
                table_columns : [
                        {
                            type: 'selection',
                            width: 60,
                            align: 'center'
                        },
                        {
                            title : '#',
                            key : 'id',
                            width: 80,
                            align: 'center',
                            sortable: true
                        },
                        {
                            title: '学校名称',
                            key: 'name',
                            width : 200,
                            sortable: true
                        },
                        {
                            title: '学校地址',
                            key: 'address',
                        },
                        {
                            title : '校长',
                            key : 'principal',
                            width : 140,
                            align: 'center',
                        },
                        {
                            title: '联系方式',
                            key: 'mobile',
                            width: 160,
                            sortable: true,
                            align: 'center',
                        },
                        {
                            title : '地址',
                            key : 'location',
                            width: 160,
                            align: 'center',
                            sortable: true
                        },
                    ],
                table_data : [],
                temp_table_data : [],
                page_count : 0,
                page_index : 1,
                page_size : setting.get_page_size,
            }
        },
        created(){
            window.config.active = 'school';
            window.config.active_name = '学校管理';
        },
        methods :{
            handle_page_change : function(index){
                this.set_page(index);
            },
            set_page : function(index){
               this.table_data = __.set_page(index,this.page_size,this.temp_table_data);
            }
        },
        mounted(){
            __.loading();
            api.get_school((result)=>{
                this.temp_table_data = result.data;
                this.page_count = result.data.length;
                __.closeAll();
                this.set_page(this.page_index);
          });
        },
    }
</script>