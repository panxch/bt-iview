<template>
   <div class="layout-main">
        <div class="layout-content">
            <Alert>年级管理
                <template slot="desc">年级段设置的添加、修改、删除</template>
            </Alert>
            <bt_school_filter ref="bt_school_filter" add_url="/grade/add" update_url="/grade/update" @selection="selection"></bt_school_filter>
        </div>
        <Row>
             <i-col>
                 <Table border highlight-row :columns="table_columns" :data="table_data" stripe @on-selection-change="selection_change"></Table>
             </i-col>
        </Row>
        <div class="space"></div>
    </div>
</template>
<script type="text/javascript">
    import api from '../../config/api/basics'
    import table_columns from '../../config/table_columns';
    import bt_school_filter from '../../components/public/bt_school_filter.vue'
    
    export default {
        data(){
            return {
                table_columns : table_columns.grade.call(this),
                table_data : [],
                selection : __.get_selection([]),
            }
        },
        created(){
            window.config.active = 'grade';
            window.config.active_name = '年级管理';
        },
        methods :{
            set_page : function(index){
                __.loading();
                api.get_grade(this.$refs.bt_school_filter.get_school_id(),null,(result)=>{
                    this.table_data = result.data;
                    __.closeAll();
                });
                __.bind_list_dblclick(this,'grade/update');
            },
            selection_change : function(selection){
                this.selection = __.get_selection(selection);
            },
        },
        mounted(){
            this.set_page();
        },
        components : { bt_school_filter },
    }
</script>