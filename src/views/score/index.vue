<template>
    <div class="layout-main">
        <div class="layout-content">
            <Alert>成绩管理
                    <template slot="desc">成绩综合管理</template>
            </Alert>
           <bt_school_filter ref="bt_school_filter" import_url="/score/import" @selection="selection"></bt_school_filter>
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
                table_columns : table_columns.score,
                table_data : [],
                page_count : 0,
                page_index : 1,
                page_size : setting.get_page_size,
                selection : __.get_selection([]),
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
            go_import : function(){
                __.go(this,'/score/import');
            },
            set_page : function(index){
                __.loading();
                var param = {school_ids : this.$refs.bt_school_filter.get_school_id(),page_index : index};
                api.get_score_upload(param,(result)=>{
                    result = JSON.parse(result);
                    this.table_data = result.list;
                    if(this.page_count === 0){
                        this.page_count = result.page_count;
                    }
                    __.closeAll();
              });
            }
        },
        mounted(){
           this.set_page(this.page_index);
        },
        components : { event_button,bt_school_filter },
    }
</script>