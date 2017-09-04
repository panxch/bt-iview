<template>   
    <div class="layout-main">
         <Form :label-width="80" inline id="form">
            <div class="layout-content">
            <Row type="flex">
                 <i-col span="1">
                    <h5>筛选：</h5>
                    </i-col>
                <i-col span="3">
                    <input placeholder="请输入学生姓名..." class="ivu-input" v-model="search_world">
                </i-col>
                 <i-col span="2">
                        &nbsp;<Button type="primary" icon="ios-search" @click="search">搜索</Button>
                </i-col>
                <i-col span="18">
                    <div class="float_right">
                        <back></back>
                    </div>
                </i-col>
            </Row>
            <div class="line"></div>
            <div class="space"></div>
            <div><Table border highlight-row :columns="table_columns" :data="table_data"></Table></div>
            <div class="space"></div>
                <Row>
                     <i-col>
                         <div style="float:right;">
                             <Page :total="page_count" :page-size="page_size"  @on-change="handle_page_change" v-if="temp_table_data.length > 0"></Page>
                         </div>
                     </i-col>
                </Row>
            </div>
            <input type="hidden" name="id" :value="query.id" v-if="query">
        </Form>
    </div>
</template>
<script type="text/javascript">
    import setting from '../../config/setting';    
    import api from '../../config/api/scores'
    import back from '../../components/public/bt_back.vue'
    import table_columns from '../../config/table_columns'
    export default {
        data(){
            return {
                query : null,
                table_columns : table_columns.score_view.call(this),
                temp_table_data : [],
                table_data : [],
                page_count : 0,
                page_size : setting.get_page_size,
                search_world : '',
            }
        },
        created(){
            this._init();
            window.config.active = 'score_import';
            window.config.active_name = '成绩导入管理';
        },
        methods : {
            _init : function(){
                // 新增 or 更新
                if(this.$route.query.hasOwnProperty('id')){
                    this.query = this.$route.query
                    this.update(this.query.id);
                }
            },
            clear : function(){
                __.byId('form').reset();
            },
            update : function(id){
                let param = {id : id,search_world : this.search_world};
                __.loading();
                api.get_student_score_list(param,(result)=>{
                    result = JSON.parse(result);
                    if(result.length > 0){
                        this.temp_table_data = result ;
                        this.page_count = result.length;
                        this.handle_page_change(1);
                    }
                    __.closeAll();
                });
                
            },
            search : function(){
                this.update(this.query.id);
            },
            // 数据分页
            handle_page_change : function(index){
                this.table_data = __.set_page(index,this.page_size,this.temp_table_data);
            },
            column_render : function(row,column){
                return column.row.name;
            }
        },
        components : { back},
    }
</script>