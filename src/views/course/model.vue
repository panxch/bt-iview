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
                    <Form-item label="课程名称">
                        <input placeholder="请输入..." class="ivu-input" v-model="info.name" name="name" v-bt-validator:rules="['required']" empty_err="班级名称">
                    </Form-item>
                </i-col>
            </Row>
            <div class="line"><h3>课程设置</h3></div>
            <Row type="flex">
                <i-col>
                    <Form-item label="课程类别">
                        <Select v-model="info.type" style="width:200px">
                            <Option v-for="item in type_list" :value="item.value" :key="item">{{ item.label }}</Option>
                        </Select>
                    </Form-item>
                    <Form-item label="课程码">
                        <input placeholder="请输入..." class="ivu-input" v-model="info.code">
                    </Form-item>
                    <Form-item label="学分">
                        <input placeholder="请输入..." class="ivu-input" name="credit" v-model="info.credit" v-bt-validator:rules="['required']" empty_err="学分">
                    </Form-item>
                </i-col>
            </Row>
            <Row type="flex">
                <Col>
                    <Form-item label="满分">
                        <input placeholder="请输入..." class="ivu-input" name="full_marks" v-model="info.full_marks" v-bt-validator:rules="['required']" empty_err="满分">
                    </Form-item>
                </Col>
            </Row>
            <div class="line"><h3>授课设置</h3></div>
            <Row type="flex">
                <Col>
                    <Form-item label="授课方式">
                        <Select v-model="info.teaching_method" style="width:200px">
                            <Option v-for="item in teaching_method_list" :value="item.value" :key="item">{{ item.label }}</Option>
                        </Select>
                    </Form-item>
                    <Form-item label="考核方式">
                         <Select v-model="info.assessment_method" style="width:200px">
                            <Option v-for="item in tassessment_method_list" :value="item.value" :key="item">{{ item.label }}</Option>
                        </Select>
                    </Form-item>
                    <Form-item label="学期">
                        <Select v-model="info.study_section" style="width:200px">
                            <Option v-for="item in tstudy_section_list" :value="item.value" :key="item">{{ item.label }}</Option>
                        </Select>
                    </Form-item>
                </Col>
            </Row>
            </div>
            <input type="hidden" name="id" :value="query.id" v-if="query">
            <input type="hidden" name="school_id" :value="info.school_district[0]">
            <input type="hidden" name="school_district" :value="info.school_district[1]" v-bt-validator:rules="['required']" empty_err="所在校区">
            <input type="hidden" name="grade_id" :value="info.grade_id" v-bt-validator:rules="['required']" empty_err="所在年级">
            <input type="hidden" name="type" :value="info.type" v-bt-validator:rules="['required']" empty_err="课程类别">
            <input type="hidden" name="teaching_method" :value="info.teaching_method" v-bt-validator:rules="['required']" empty_err="授课方式">
            <input type="hidden" name="assessment_method" :value="info.assessment_method" v-bt-validator:rules="['required']" empty_err="考核方式">
            <input type="hidden" name="study_section" :value="info.study_section" v-bt-validator:rules="['required']" empty_err="学期">
        </Form>
    </div>
</template>
<script type="text/javascript">
    import api_course from '../../config/api/course'
    import back from '../../components/public/bt_back.vue'
    import drop_school_district from '../../components/drop_school_district.vue'
    import event_button from '../../components/public/bt_save.vue'
    import drop_grade from '../../components/drop_grade.vue'

    export default {
        data(){
            return {
                msg_error : [],
                info : { school_district : ['','']},
                type_list : [{value : 'elective',label : '选修'},{value : 'required',label : '必修'}],
                teaching_method_list : [{value : 'faceToFace',label : '面授'},{value : 'onLine',label : '线上'}],
                tassessment_method_list : [{value : 'examination',label : '考试'},{value : 'other',label : '其他'}],
                tstudy_section_list : [{value : '02',label : '上学期'},{value : '01',label : '下学期'}],
                query : null,
            }
        },
        created(){
            this._init();
            window.config.active = 'course';
            window.config.active_name = '课程管理';
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
            },
            // 年级选择
            handle_grade_change : function(value){
                this.info.grade_id = value;
            },
            clear : function(){
                __.byId('form').reset();
            },
            update : function(id){
                api_course.get_course_info(id,result =>{
                    this.info = JSON.parse(result);
                    this.info.school_district = [this.info.school_id,this.info.school_district];
                    this.$refs.school_district.set_value(this.info.school_district);
                    this.$refs.drop_grade.set_value(this.info.grade_id);
                    this.handle_school_district_change(this.info.school_district);
                })
            },
            // 保存或更新
            save : function(){
                let rules = {
                    school_district : this.info.school_district[1],
                    name : this.info.name,
                    credit : this.info.credit,
                    grade_id : this.info.grade_id,
                    full_marks : this.info.full_marks,
                    type : this.info.type,
                    teaching_method : this.info.teaching_method,
                    assessment_method : this.info.assessment_method,
                    study_section : this.info.study_section
                };
                this.msg_error = this.validator(this.$data,rules);
                if(this.is_validator()){
                    api_course.save(result =>{
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
        components : { back,drop_school_district,event_button,drop_grade },
    }
</script>