<template>
   <div class="layout-main">
        <div class="layout-content">
            <Alert>模块管理
                <template slot="desc">消息提示的描述文案消息提示的描述文案消息提示的描述文案消息提示的描述文案消息提示的描述文案</template>
            </Alert>
            <Row type="flex">
                <i-col span="1">
                <h5></h5>
                </i-col>
                <i-col span="5">
                    
                </i-col>
                <i-col span="8">
                    
                </i-col>
                <i-col span="10">
                    <div class="float_right">
                        <event_button @click="go_update" type="info" icon="ios-checkmark-outline">修改</event_button>
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
                                 <Page :total="page_count" :page-size="page_size"  @on-change="handle_page_change" v-if="temp_table_data.length > 0"></Page>
                             </div>
                         </i-col>
                    </Row>
        <div class="space"></div>
    </div>
</template>
<script type="text/javascript">
    import setting from '../../config/setting';
    import api from '../../config/api/func'
    import table_columns from '../../config/table_columns';
    import event_button from '../../components/public/bt_save.vue'

    
    export default {
        data(){
            return {
                table_columns : table_columns.func.call(this),
                table_data : [],
                temp_table_data : [],
                page_count : 0,
                page_size : setting.get_page_size,
                selection : __.get_selection([]),
            }
        },
        created(){
            window.config.active = 'func';
            window.config.active_name = '模块管理';
        },
        methods :{
            set_page : function(index){
                __.loading();
                api.get_func_all((result)=>{
                    this.temp_table_data = result.data;
                    this.page_count = this.temp_table_data.length;
                    this.handle_page_change(1);
                    __.closeAll();
                });
                __.bind_list_dblclick(this,'func/update');
            },
            go_update : function(){
                let info = __.get_list_update_check(this.selection);
                if(! info.pass){
                    this.$Message.error(info.error);
                    return;
                }
                __.go(this,'/func/update',{id : info.ids });
            },
            selection_change : function(selection){
                this.selection = __.get_selection(selection);
            },
            // 数据分页
            handle_page_change : function(index){
                this.table_data = __.set_page(index,this.page_size,this.temp_table_data);
            },
        },
        mounted(){
            this.set_page();
        },
        components : { event_button },
    }
</script>