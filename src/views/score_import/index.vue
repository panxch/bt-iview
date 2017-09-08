<template>
    <div class="layout-main">
        <div class="layout-content">
            <Alert>成绩管理
                    <template slot="desc">成绩综合管理</template>
            </Alert>
           <bt_school_filter ref="bt_school_filter" import_url="/score_import/import" update_url="/score_import/view" @selection="selection"></bt_school_filter>
        </div>
        <Row>
             <i-col>
                 <Table border highlight-row :columns="table_columns" :data="table_data" stripe @on-selection-change="selection_change"></Table>
             </i-col>
        </Row>
        <div class="space"></div>
        <Row>
            <i-col :span="12">
              <Badge :count="data_count" class-name="demo-badge-alone" v-if="this.page_count > 0"></Badge>&nbsp;
            </i-col>
             <i-col :span="12">
                 <div style="float:right;">
                     <Page :total="page_count" @on-change="handle_page_change" :page-size="page_size"></Page>
                 </div>
             </i-col>
        </Row>
    </div>
</template>
<script type="text/javascript">
    import setting from '../../config/setting';
    import table_columns from '../../config/table_columns';
    import api from '../../config/api/scores'
    import event_button from '../../components/public/bt_save.vue'
    import bt_school_filter from '../../components/public/bt_school_filter.vue'
    export default {
        data(){
            return {
                table_columns : table_columns.score.call(this),
                table_data : [],
                page_count : 0,
                page_index : 1,
                page_size : setting.get_page_size,
                data_count : '当前数据总量：0条',
                selection : __.get_selection([]),
            }
        },
        created(){
            window.config.active = 'score_import';
            window.config.active_name = '成绩上传管理';
        },
        methods :{
            handle_page_change : function(index){
                this.set_page(index);
            },
            go_import : function(){
                __.go(this,'/score_import/import');
            },
            go_update : function(){
                let info = __.get_list_update_check(this.selection);
                if(! info.pass){
                    this.$Message.error(info.error);
                    return;
                }
                __.go(this,'score_import/view',{id : info.ids });
            },
            selection_change : function(selection){
                this.selection = __.get_selection(selection);
            },
            set_page : function(index){
                __.loading();
                var param = {school_ids : this.$refs.bt_school_filter.get_school_id(),page_index : index};
                api.get_score_upload(param,(result)=>{
                    result = JSON.parse(result);
                    this.table_data = result.list;
                    if(this.page_count === 0){
                        this.page_count = result.page_count;
                        this.data_count = `当前数据总量：${result.page_count}条`;
                    }
                    __.closeAll();
                });
                __.bind_list_dblclick(this,'score_import/view');
            },
            column_render : function(row,column){
                let exam_list = [{id:5,name :'1月考'},{id:7,name :'3月考'},{id:9,name :'5月考'},{id:1,name :'9月考'},{id:2,name :'10月考'},{id:4,name :'12月考'},{id:3,name :'期中考'},{id:6,name :'期末考'},{id:8,name :'期中考'},{id:10,name :'期末考'}];
                let info = __.info(exam_list,'id',column.row.exam_type);
                if(info){
                    return info.name;
                }
                return '-';
            },
            column_render_type : function(row,column){
                return column.row.file_name_ori === 'paset' ? '剪贴板' : 'Excel';
            },
        },
        mounted(){
           this.set_page(this.page_index);
        },
        components : { event_button,bt_school_filter },
    }
</script>