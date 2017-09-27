<template>   
    <div class="layout-main">
        <div class="layout-content">
            <slot></slot>
            <div class="line"></div>
            <Row type="flex">
                <i-col>
                    <Form :label-width="80" inline>
                        <Form-item label="学校">
                            <drop_school_district ref="school_district" @handle_school_district_change="handle_school_district_change"></drop_school_district>
                        </Form-item>
                        <Form-item label="年级">
                            <drop_grade ref="drop_grade" @handle_grade_change="handle_grade_change"></drop_grade>
                        </Form-item>
                    </Form>
                </i-col>
            </Row>
            <div class="line"></div>
            <Row type="flex" v-if="msg_error.length > 0">
                <i-col span="24">
                    <Alert type="error" width="100%">
                        <span style="color:#ff0000">验证提醒</span>
                        <span slot="desc" v-html="msg_error"></span>
                    </Alert>
                </i-col>
            </Row>
            <Tabs>
                <Tab-pane label="剪贴板导入" name="name1" icon="clipboard">
                    <div>
                        <Row type="flex">
                        <i-col span="15"><Input type="text" placeholder="请直接Ctrl + V" :readonly="true"></Input></i-col>
                        <i-col span="1"></i-col>
                        <i-col span="8">
                            <div class="float_right">
                                <event_button @click="clear" type="warning" icon="android-close" :disabled="table_data.length == 0">清除</event_button>
                                <event_button @click="import_paset" type="info" load="true" icon="android-arrow-down" :disabled="table_data.length == 0 || msg_error.length > 0">导入</event_button>
                                <back></back>
                            </div>
                        </i-col>
                    </Row>
                    </div>
                    <div class="space"></div>
                    <div><Table border highlight-row :columns="table_columns" :data="table_data" v-if="table_data.length > 0" :height="table_height"></Table></div>
                </Tab-pane>
            </Tabs>
        </div>
        <input type="hidden" name="school_district" :value="info.school_district[1]" v-bt-validator:rules="['required']" empty_err="所在校区">
        <input type="hidden" name="grade_id" :value="info.grade_id" v-bt-validator:rules="['required']" empty_err="所在年级">
    </div>
</template>
<script type="text/javascript">
    import back from './public/bt_back.vue'
    import event_button from './public/bt_save.vue'
    import drop_school_district from './drop_school_district.vue'
    import drop_grade from './drop_grade.vue'
    import api_teacher from '../config/api/teacher'

    export default {
        props : ['table_columns','fields_array'],
        data(){
            return {
                table_data : [],
                table_height : $(window).height() - 310,
                msg_error : [],
                info : { school_district : ['','']},
                teacher_list : [],
            }
        },
        created(){
            this._init();
            this.$emit('init')
        },
        methods : {
            _init : function(){
                // 设置剪贴板侦听
                __.pasteListen((data)=>{
                    this.handle_paste(data + 'RR');
                })
            },
            // 完成粘贴板的匹配
            handle_paste : function(data){
                var line_match = data.match(/([\W\w]*?)RR/g);
                var result = __.pasteMatch(line_match,this.fields_array);
                if(result.length > 0){
                    this.msg_error = [];
                    result.forEach((c,i)=>{
                        this.table_data.push(c);
                        this.$emit('set_table_data',c);
                    })
                }else{
                    this.msg_error.push('格式检查失败~');
                }
            },
            // 年级选择
            handle_grade_change : function(value){
                this.info.grade_id = value;
            },
            // 校区回调
            handle_school_district_change : function(value){
                this.info.school_district = value;
                this.info.grade_id = null;
                this.$refs.drop_grade.data_bind(value);
                // 如果是班级导入则请求所有老师,并对剪贴板的老师进行验证;
                if('name' in this.$parent){
                    if(this.$parent.name == 'class_import'){
                        let param = {
                            page_size : 1000,
                            page_index : 1,
                            school_id : value[0],
                            school_district : value[1],
                        }
                        api_teacher.get_teacher_by_school_district(param,(result)=>{
                            this.teacher_list = JSON.parse(result);
                        });
                    }
                }
            },
            // 清除粘贴数据
            clear : function(){
                this.table_data = [];
                this.msg_error = [];
                this.$emit('set_table_data',null);
                this.$parent.paste_list = [];
            },
            // 导入成功后
            import_success : function(){
                __.go_success(this);
            },
            // 粘贴板导入
            import_paset : function(){
                let rules = {
                    school_district : this.info.school_district[1],
                    grade_id : this.info.grade_id
                };
                this.msg_error = this.validator(this.$data,rules);
                if(this.is_validator()){
                    let param = {school_id : this.info.school_district[0],school_district:this.info.school_district[1],grade_id : this.info.grade_id};
                    this.$emit('import_paset',param);
                }
            },
            
        },
        mounted(){
        },
        components : { event_button,back,drop_school_district,drop_grade },
    }
</script>