<template>
   <div class="layout-main">
        <div class="layout-content">
            <Alert>角色管理
                <template slot="desc">角色权限添加、删除、修改与查询</template>
            </Alert>
            <bt_school_filter ref="bt_school_filter" update_url="/role/update" add_url="/role/add" @selection="selection"></bt_school_filter>
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
    import api_role from '../../config/api/role'
    import bt_school_filter from '../../components/public/bt_school_filter.vue'
    export default {
        data(){
            return {
                table_columns : table_columns.role.call(this),
                table_data : [],
                selection : __.get_selection([]),
                page_index : window.config.page_index,
                page_count : window.config.page_count,
                page_size : setting.get_page_size,
            }
        },
        created(){
            window.config.active = 'role';
            window.config.active_name = '角色管理';
        },
        methods :{
            set_page : function(index){
                __.loading();
                var param = {school_ids : this.$refs.bt_school_filter.get_school_id(),page_index : index};
                api_role.get_role_by_school(param,(result)=>{
                    result = JSON.parse(result);
                    this.table_data = result.list;
                    log(result)
                    if(this.page_count === 0){
                        this.page_count = window.config.page_count = result.page_count;
                    }
                    __.closeAll();
                });
                __.bind_list_dblclick(this,'role/update');
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