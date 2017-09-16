<template>
   <div class="layout-main">
        <div class="layout-content">
            <Alert>教学班管理
                <template slot="desc">教学班设置的添加、修改、删除</template>
            </Alert>
            <bt_school_filter ref="bt_school_filter" update_url="/class_move/update" import_url="/class_move/import" @selection="selection"></bt_school_filter>
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
                     <Page :total="page_count" @on-change="handle_page_change" :page-size="page_size" :current="page_index"></Page>
                 </div>
             </i-col>
        </Row>
    </div>
</template>
<script type="text/javascript">
    import setting from '../../config/setting';
    import table_columns from '../../config/table_columns';
    import api_class from '../../config/api/class_move'
    import bt_school_filter from '../../components/public/bt_school_filter.vue'
    export default {
        data(){
            return {
                table_columns : table_columns.class_move.call(this),
                table_data : [],
                selection : __.get_selection([]),
                page_index : window.config.page_index,
                page_count : window.config.page_count,
                data_count : '当前数据总量：0条',
                page_size : setting.get_page_size,
            }
        },
        created(){
            window.config.active = 'class_move';
            window.config.active_name = '教学班管理';
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
                        this.data_count = `当前数据总量：${result.page_count}条`;
                    }
                    __.closeAll();
                });
                __.bind_list_dblclick(this,'class_move/update');
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