<template>
   <div class="layout-main">
        <div class="layout-content">
            <Alert>学校管理
                <template slot="desc">学校信息的添加、修改、审核与删除</template>
            </Alert>
            <Row type="flex">
                <i-col span="10"></i-col>
                <i-col span="14">
                    <div class="float_right">
                        <event_button @click="go_update" type="info" icon="ios-checkmark-outline">修改</event_button>
                        <event_button @click="go_add" type="success" icon="plus-round">添加</event_button>
                    </div>
                </i-col>
            </Row>
        </div>
        <Row>
             <i-col>
                 <Table border highlight-row :columns="table_columns" :data="table_data" stripe @on-selection-change="selection_change"></Table>
             </i-col>
        </Row>
        <div class="space"></div>
        <Row>
             <i-col>
                 <div style="float:right;">
                     <Page :total="page_count" @on-change="handle_page_change" :page-size="page_size" :current="page_index"></Page>
                 </div>
             </i-col>
        </Row>
    </div>
</template>
<script type="text/javascript">
    import setting from '../../config/setting';
    import table_columns from '../../config/table_columns';
    import api from '../../config/api/basics'
    import event_button from '../../components/public/bt_save.vue'
    export default {
        data(){
            return {
                table_columns : table_columns.school,
                table_data : [],
                temp_table_data : [],
                page_count : 0,
                page_index : window.config.page_index,
                page_size : setting.get_page_size,
                selection : __.get_selection([]),

            }
        },
        created(){
            window.config.active = 'school';
            window.config.active_name = '学校管理';
        },
        methods :{
            handle_page_change : function(index){
                window.config.page_index = index;
                this.set_page(index);
            },
            set_page : function(index){
                this.table_data = __.set_page(index,this.page_size,this.temp_table_data);
                __.bind_list_dblclick(this,'school/update');
            },
            selection_change : function(selection){
                this.selection = __.get_selection(selection);
            },
            go_update : function(){
                let info = __.get_list_update_check(this.selection);
                if(! info.pass){
                    this.$Message.error(info.error);
                    return;
                }
                __.go(this,'school/update',{id : info.ids });
            },
            go_add : function(){
                __.go(this,'/school/add');
            },
        },
        mounted(){
            __.loading();
            api.get_school((result)=>{
                this.temp_table_data = JSON.parse(result);
                this.page_count = this.temp_table_data.length;
                __.closeAll();
                this.set_page(this.page_index);
          });
        },
        components : { event_button},
    }
</script>