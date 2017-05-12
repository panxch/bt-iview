<template>   
    <div class="layout-main">
         <Form :label-width="80" inline id="form">
            <div class="layout-content">
            <Row type="flex">
                <i-col span="18"></i-col>
                <i-col span="6">
                    <div class="float_right">
                        <event_button @click="save" type="info" load="true" icon="checkmark-round">保存</event_button>
                        <back></back>
                    </div>
                </i-col>
            </Row>
            <div class="line"><h3>基础设置</h3></div>
            <Row type="flex" v-if="msg_error.length > 0">
                <i-col span="24">
                    <Alert type="error" width="100%">
                        <span style="color:#ff0000">验证提醒</span>
                        <span slot="desc" v-html="msg_error"></span>
                    </Alert>
                </i-col>
            </Row>
            <Row type="flex">
                <i-col>
                    <Form-item label="所在校区">
                        <drop_school_district ref="school_district" @handle_school_district_change="handle_school_district_change"></drop_school_district>
                    </Form-item>
                    <Form-item label="所在年级">
                        <drop_grade ref="drop_grade" @handle_grade_change="handle_grade_change"></drop_grade>
                    </Form-item>
                    <Form-item label="班级名称">
                        <input placeholder="请输入..." class="ivu-input" v-model="info.name" name="name" v-bt-validator:rules="['required']" empty_err="班级名称">
                    </Form-item>
                </i-col>
            </Row>
            <div class="line"><h3>其他</h3></div>
            <Row type="flex">
                <i-col>
                    <Form-item label="班主任">
                        <drop_teacher ref="drop_teacher" @handle_teacher_change="handle_teacher_change"></drop_teacher>
                    </Form-item>
                    <Form-item label="班级人数">
                        <input placeholder="请输入..." class="ivu-input" v-model="info.student_cnt">
                    </Form-item>
                </i-col>
            </Row>
            </div>
            <input type="hidden" name="id" :value="query.id" v-if="query">
            <input type="hidden" name="school_id" :value="info.school_district[0]">
            <input type="hidden" name="school_district" :value="info.school_district[1]" v-bt-validator:rules="['required']" empty_err="所在校区">
            <input type="hidden" name="grade_id" :value="info.grade_id" v-bt-validator:rules="['required']" empty_err="所在年级">
            <input type="hidden" name="teacher_id" :value="info.teacher_id" v-bt-validator:rules="['required']" empty_err="班主任">
            <input type="hidden" name="teachers" :value="info.teachers">
            <input type="hidden" name="student_cnt" :value="info.student_cnt" v-bt-validator:rules="['required','number']" empty_err="班级人数" err="班级人数格式输入错误">
            
        </Form>
    </div>
</template>
<script type="text/javascript">
    import api_class from '../../config/api/class'
    import back from '../../components/public/bt_back.vue'
    import drop_school_district from '../../components/drop_school_district.vue'
    import event_button from '../../components/public/bt_save.vue'
    import drop_grade from '../../components/drop_grade.vue'
    import drop_teacher from '../../components/drop_teacher.vue'

    export default {
        data(){
            return {
                msg_error : [],
                info : { school_district : ['','']},
                query : null,
            }
        },
        created(){
            this._init();
            window.config.active = 'class';
            window.config.active_name = '班级管理';
        },
        methods : {
            _init : function(){
                // 新增 or 更新
                if(this.$route.query.hasOwnProperty('id')){
                    this.query = this.$route.query
                    this.update(this.query.id);
                }
            },
            // 校区回调
            handle_school_district_change : function(value){
                this.info.school_district = value;
                this.$refs.drop_grade.data_bind(value);
                // 回调取老师
                this.$refs.drop_teacher.data_bind({school_id : value[0],school_district : value[1]});
            },
            // 年级选择
            handle_grade_change : function(value){
                this.info.grade_id = value;
            },
            // 教师选择
            handle_teacher_change : function(object){
                this.info.teacher_id = object.value;
                let t_exec = /([^|]*?)\//g.exec(object.label);
                if(t_exec){
                    this.info.teachers = t_exec[1];
                }
            },
            clear : function(){
                __.byId('form').reset();
            },
            update : function(id){
                api_class.get_class(id,result =>{
                    this.info = JSON.parse(result);
                    this.info.school_district = [this.info.school_id,this.info.school_district];
                    this.$refs.school_district.set_value(this.info.school_district);
                    this.$refs.drop_grade.set_value(this.info.grade_id);
                    this.$refs.drop_teacher.set_value(this.info.teacher_id);
                    this.handle_school_district_change(this.info.school_district);
                })
            },
            // 保存或更新
            save : function(){
                let rules = {
                    school_district : this.info.school_district[1],
                    name : this.info.name,
                    student_cnt : this.info.student_cnt,
                    grade_id : this.info.grade_id,
                    teacher_id : this.info.teacher_id
                };
                this.msg_error = this.validator(this.$data,rules);
                if(this.is_validator()){
                    api_class.save(result =>{
                        result = JSON.parse(result)
                        if(result.status){
                            __.go_success(this);
                        }
                    })
                };
            },

        },
        mounted(){
        },
        components : { back,drop_school_district,event_button,drop_grade,drop_teacher },
    }
</script>