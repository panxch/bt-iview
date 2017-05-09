<template>
   <div class="layout-main">
        <div class="layout-content">
            <Alert>班级管理
                <template slot="desc">消息提示的描述文案消息提示的描述文案消息提示的描述文案消息提示的描述文案消息提示的描述文案</template>
            </Alert>
            <bt_school_filter ref="bt_school_filter" update_url="/class/update" import_url="/class/import" @selection="selection"></bt_school_filter>
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
                     <Page :total="page_count" @on-change="handle_page_change" :page-size="20" :current="page_index"></Page>
                 </div>
             </i-col>
        </Row>
    </div>
</template>
<script type="text/javascript">
    import table_columns from '../../config/table_columns';
    import api_class from '../../config/api/class'
    import bt_school_filter from '../../components/public/bt_school_filter.vue'
    export default {
        data(){
            return {
                table_columns : table_columns.class.call(this),
                table_data : [],
                selection : __.get_selection([]),
                page_index : window.config.page_index,
                page_count : window.config.page_count,
            }
        },
        created(){
            window.config.active = 'class';
            window.config.active_name = '班级管理';
        },
        methods :{
            set_page : function(index){
                __.loading();
                var param = {school_ids : this.$refs.bt_school_filter.get_school_id(),page_index : index};
                api_class.get_class_by_school(param,(result)=>{
                    result = JSON.parse(result);
                    this.table_data = result.list;
                    if(this.page_count === 0){
                        this.page_count = window.config.page_count = result.page_count;
                    }
                    __.closeAll();
                });
                __.bind_list_dblclick(this,'class/update');
            },
            // check勾选
            selection_change : function(selection){
                this.selection = __.get_selection(selection);
            },
            // 翻页
            handle_page_change : function(index){
                window.config.page_index = index;
                this.set_page(index);
            },            
        },
        mounted(){
            this.set_page(this.page_index);
        },
        components : { bt_school_filter },
    }
</script>