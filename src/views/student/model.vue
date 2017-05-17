<template>   
    <div class="layout-main">
         <Form :label-width="100" inline id="form">
            <div class="layout-content">
            <Row type="flex">
                <Col span="18"></Col>
                <Col span="6">
                    <div class="float_right">
                        <event_button @click="save" type="info" icon="checkmark-round">保存</event_button>
                        <back></back>
                    </div>
                </Col>
            </Row>
            <div class="line" v-if="msg_error.length > 0"></div>
            <Row type="flex" v-if="msg_error.length > 0">
                <Col span="24">
                    <Alert type="error" width="100%">
                        <span style="color:#ff0000">验证提醒</span>
                        <span slot="desc" v-html="msg_error"></span>
                    </Alert>
                </Col>
            </Row>
            <div class="line"><h3>角色/学校信息</h3></div>
            <Row type="flex">
                <Col>
                    <Form-item label="所属校区">
                        <drop_school_district ref="school_district" @handle_school_district_change="handle_school_district_change"></drop_school_district>
                    </Form-item>
                    <Form-item label="所属班级">
                        <drop_grade_class ref="grade_class" @handle_grade_class_change="handle_grade_class_change"></drop_grade_class>
                    </Form-item>
                </Col>
            </Row>
            <div class="line"><h3>基础信息</h3></div>
            <Row type="flex">
                <Col>
                    <Form-item label="学生姓名">
                        <input placeholder="请输入..." class="ivu-input" v-model="student_info.student_name" name="name" v-bt-validator:rules="['required','chinese']" empty_err="学生姓名" err="学生姓名必须为中文"><span class="red">*</span>
                    </Form-item>
                    <Form-item label="性别">
                        <Radio-group v-model="student_info.gender" type="button" size="small">
                            <Radio label="男"></Radio>
                            <Radio label="女"></Radio>
                        </Radio-group>
                    </Form-item>
                    <Form-item label="联系手机">
                        <input placeholder="请输入手机号..." class="ivu-input" v-model="student_info.mobile" name="mobile">
                    </Form-item>
                </Col>
            </Row>
            <Row type="flex">
                <Col>
                    <Form-item label="身份证">
                        <input placeholder="请输入..." class="ivu-input" v-model="student_info.card_id" name="card_id"><span class="red"></span>
                    </Form-item>
                    <Form-item label="出生日期">
                        <Date-picker type="date" placeholder="选择日期" v-model="student_info.birthday" format="yyyy-MM-dd" style="width: 200px" @on-change="date_change"></Date-picker>
                    </Form-item>
                    <Form-item label="身高">
                        <input placeholder="请输入..." class="ivu-input" v-model="student_info.v_height" name="v_height">
                    </Form-item>
                </Col>
            </Row>
            <Row type="flex">
                <Col>
                    <Form-item label="体重">
                        <input placeholder="请输入..." class="ivu-input" v-model="student_info.v_weight" name="v_weight"><span class="red"></span>
                    </Form-item>
                    <Form-item label="肺活量">
                        <input placeholder="请输入..." class="ivu-input" v-model="student_info.v_lung" name="v_lung">
                    </Form-item>
                    <Form-item label="视力">
                        <input placeholder="请输入..." class="ivu-input" v-model="student_info.v_vision" name="v_vision">
                    </Form-item>
                </Col>
            </Row>
            <div class="line"><h3>编制设置</h3></div>
            <Row type="flex">
                <Col>
                    <Form-item label="学籍编号">
                        <input placeholder="请输入..." class="ivu-input" v-model="student_info.school_no" name="school_no"><span class="red"></span>
                    </Form-item>
                    <Form-item label="学生生源">
                        <Select v-model="student_info.student_stype" style="width:200px">
                            <Option v-for="item in student_stype_list" :value="item.value" :key="item">{{ item.label }}</Option>
                        </Select>
                    </Form-item>
                    <Form-item label="毕业初中">
                        <input placeholder="请输入..." class="ivu-input" v-model="student_info.middle_school" name="middle_school">
                    </Form-item>
                </Col>
            </Row>
            <Row type="flex">
                <Col>
                    <Form-item label="中考分/排名">
                        <input placeholder="中考分/排名,如580/12" class="ivu-input" v-model="student_info.zk_ranking" name="zk_ranking"><span class="red"></span>
                    </Form-item>
                    <Form-item label="学号">
                        <input placeholder="请输入..." class="ivu-input" v-model="student_info.student_no" name="student_no">
                    </Form-item>
                    <Form-item label="是否毕业">
                        <i-switch v-model="student_info.is_by">
                            <span slot="open">是</span>
                            <span slot="close">否</span>
                        </i-switch>
                    </Form-item>
                </Col>
            </Row>
            </div>
            <input type="hidden" name="id" :value="query.id" v-if="query">
            <input type="hidden" name="gender" :value="student_info.gender == '女' ? 2 : 1">
            <input type="hidden" name="school_id" :value="student_info.school_id">
            <input type="hidden" name="school_district" :value="student_info.school_district">
            <input type="hidden" name="grade_id" :value="student_info.grade_id">
            <input type="hidden" name="class_id" :value="student_info.class_id">
            <input type="hidden" name="is_by" :value="student_info.is_by ? 1 : 0">
            <input type="hidden" name="member_id" :value="student_info.member_id">
            <input type="hidden" name="student_id" :value="student_info.tid">
            <input type="hidden" name="birthday" :value="student_info.birthday">
            <input type="hidden" name="student_stype" :value="student_info.student_stype">
        </Form>
    </div>
</template>
<script type="text/javascript">
    import setting from '../../config/setting';    
    import api_student from '../../config/api/student'
    import api from '../../config/api/basics'
    import back from '../../components/public/bt_back.vue'
    import drop_school_district from '../../components/drop_school_district.vue'
    import drop_grade_class from '../../components/drop_grade_class.vue'
    import event_button from '../../components/public/bt_save.vue'
    
    export default {
        data(){
            return {
                msg_error : [],
                student_info : {},
                student_stype_list : [{value:'考入',label:'考入'},{value:'借读生',label:'借读生'},{value:'推优',label:'推优'},{value:'自主招生',label:'自主招生'},{value:'名额分配',label:'名额分配'},{value:'零志愿',label:'零志愿'},{value:'新疆生',label:'新疆生'}],
                query : null,
            }
        },
        created(){
            this._init();
            window.config.active = 'student';
            window.config.active_name = '学生管理';
        },
        methods : {
            _init : function(){
                // 新增 or 更新
                if(this.$route.query.hasOwnProperty('id')){
                    this.query = this.$route.query
                    this.update(this.query.id);
                }
            },
            // 班级回调
            handle_grade_class_change : function(value){
                this.student_info.grade_id = value[0];
                this.student_info.class_id = value[1];
            },
            // 校区回调
            handle_school_district_change : function(value){
                this.$refs.grade_class.$children[0].toggleOpen();
                this.class_bind(value[0],value[1]);
                this.student_info.school_id = value[0];
                this.student_info.school_district = value[1];
            },
            date_change : function(value){
                this.student_info.birthday = value;
            },
            // 年级、班级数据同步更新
            class_bind : function(school_id,district_id){
                this.$refs.grade_class.bind(school_id,district_id);
            },
            clear : function(){
                __.byId('form').reset();
            },
            update : function(id){
                api_student.get_student(id,(result)=>{
                    let info = this.student_info = result.data;
                    this.student_info.gender = parseInt(info.gender) ==  1 ? '男' : '女';
                    this.student_info.is_by = parseInt(info.is_by) > 0 ? true : false;
                    this.class_bind(info.school_id,info.school_district);
                    this.$refs.school_district.set_value([info.school_id,info.school_district])
                    this.$refs.grade_class.set_value([info.grade_id,info.class_id]);
                })
            },
            save : function(){
                let rules = {
                    name : this.student_info.student_name,
                };
                this.msg_error = this.validator(this.$data,rules);
                if(this.is_validator()){
                    api_student.save(result=>{
                        __.go_success(this);
                    })
                }
            }
        },
        // 计算器
        computed : {
        },
        mounted(){
            $(document.body).unbind('paste');
        },
        components : { back,drop_school_district,drop_grade_class,event_button },
    }
</script>