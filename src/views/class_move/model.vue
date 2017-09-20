<template>
    <div class="layout-main">
        <Form :label-width="80" inline id="form">
            <div class="layout-content">
                <Row type="flex">
                    <i-col span="18"></i-col>
                    <i-col span="6">
                        <div class="float_right">
                            <event_button @click="save" type="info" load="true" icon="checkmark-round">保存</event_button>
                            <event_button @click="import_class_move_student_click" type="success" icon="android-arrow-down">导入学生</event_button>
                            <back></back>
                        </div>
                    </i-col>
                </Row>
                <div class="line">
                    <h3>基础设置</h3></div>
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
                            <input placeholder="请输入..." class="ivu-input" v-model="info.name" name="class" v-bt-validator:rules="['required']" empty_err="班级名称">
                        </Form-item>
                    </i-col>
                </Row>
                <div class="line">
                    <h3>其他</h3></div>
                <Row type="flex">
                    <i-col>
                        <form-item label="所属课程">
                            <Select placeholder="请选择" style="width:200px" filterable v-model="info.course_id">
                                <Option :key="info.id" :value="info.id" :label="'#' + info.id + '/' + info.name" v-for="info in course_list">
                                </Option>
                            </Select>
                        </form-item>
                        <Form-item label="任课教师">
                            <drop_teacher ref="drop_teacher" @handle_teacher_change="handle_teacher_change"></drop_teacher>
                        </Form-item>
                        <Form-item label="班级人数">
                            <input placeholder="请输入..." class="ivu-input" v-model="info.student_cnt" name="student_cnt">
                        </Form-item>
                    </i-col>
                </Row>
                <Row type="flex">
                    <i-col>
                        <Form-item label="所在教室">
                            <drop_room ref="drop_room" @handle_room_change="handle_room_change"></drop_room>
                        </Form-item>
                        <Form-item label="所在学期">
                            <Select placeholder="请选择" style="width:200px" v-model="info.semester" name="semester" v-bt-validator:rules="['required']" empty_err="所在学期">
                                <Option :value="info.id" v-for="info in semester_list" :key="info.id">{{info.name}}</Option>
                            </Select>
                        </Form-item>
                        <Form-item label="分层">
                            <input placeholder="请输入..." class="ivu-input" v-model="info.layered" name="layered">
                        </Form-item>
                    </i-col>
                </Row>
                <div class="line"><h3>关联学生</h3></div>
                <div style="overflow-y:scroll;height:100%;">
                    <Table border highlight-row :columns="table_columns_student" :data="student_data" v-if="student_data.length > 0"></Table>
                </div>
            </div>
            <div v-if="is_update">
                <div class="dialog -hide">
                    <div class="close" onclick="__.dialog_close();">
                        <Icon type="ios-close-empty"></Icon>
                    </div>
                    <div class="box">
                        <Alert>教学班批量上传
                            <template slot="desc">教学班管理的添加、修改、删除
                                <br>
                                <a href="/public/templates/tpl_class_move_student.xlsx">
                                    <Button type="dashed" icon="arrow-down-a">模板下载</Button>
                                </a>
                            </template>
                        </Alert>
                        <Tabs>
                            <Tab-pane label="剪贴板导入" name="name1" icon="clipboard">
                                <div>
                                    <Row type="flex" v-if="dialog_msg_error != ''">
                                        <i-col span="24">
                                            <Alert type="error" width="100%">
                                                <span style="color:#ff0000">验证提醒</span>
                                                <span slot="desc" v-html="dialog_msg_error"></span>
                                            </Alert>
                                        </i-col>
                                    </Row>
                                    <Row type="flex">
                                        <i-col span="17">
                                            <Input type="text" placeholder="请直接Control + V" :readonly="true"></Input>
                                        </i-col>
                                        <i-col span="7">
                                            <div class="float_right">
                                                <event_button @click="clear" type="warning" icon="android-close" :disabled="table_data.length == 0">清除</event_button>
                                                <event_button @click="import_paset" type="info" icon="android-arrow-down" load="true" :disabled="table_data.length == 0">导入</event_button>
                                            </div>
                                        </i-col>
                                    </Row>
                                </div>
                                <div class="space"></div>
                                <div style="overflow-y:scroll;height:280px;">
                                    <Table border highlight-row :columns="table_columns" :data="table_data" v-if="table_data.length > 0"></Table>
                                </div>
                                <div class="space"></div>
                            </Tab-pane>
                        </Tabs>
                    </div>
                </div>
            </div>
            <input type="hidden" name="id" :value="query.id" v-if="query">
            <input type="hidden" name="school_id" :value="info.school_district[0]">
            <input type="hidden" name="school_district" :value="info.school_district[1]" v-bt-validator:rules="['required']" empty_err="所在校区">
            <input type="hidden" name="grade_id" :value="info.grade_id" v-bt-validator:rules="['required']" empty_err="所在年级">
            <input type="hidden" name="teacher_id" :value="info.teacher_id" v-bt-validator:rules="['required']" empty_err="班主任">
            <input type="hidden" name="student_cnt" :value="info.student_cnt" v-bt-validator:rules="['required','number']" empty_err="班级人数" err="班级人数格式输入错误">
            <input type="hidden" name="course_id" :value="info.course_id" v-bt-validator:rules="['required']" empty_err="课程">
            <input type="hidden" name="semester" :value="info.semester">
            <input type="hidden" name="classroom_id" :value="info.classroom_id">
        </Form>
    </div>
</template>
<script type="text/javascript">
import api_class from '../../config/api/class_move'
import api_course from '../../config/api/course'
import api_student from '../../config/api/student'
import back from '../../components/public/bt_back.vue'
import drop_school_district from '../../components/drop_school_district.vue'
import event_button from '../../components/public/bt_save.vue'
import drop_grade from '../../components/drop_grade.vue'
import drop_room from '../../components/drop_room.vue'
import drop_teacher from '../../components/drop_teacher.vue'
import table_columns from '../../config/table_columns'
import setting from '../../config/setting';

export default {
    data() {
        return {
            msg_error: [],
            dialog_msg_error: [],
            info: { school_district: ['', ''], course_value: '' },
            semester_list: [{ id: '02', name: '上学期' }, { id: '01', name: '下学期' }],
            table_columns: table_columns.import_class_move_student.call(this),
            table_columns_student: table_columns.class_move_student.call(this),
            fields_array: ['name', 'temp'],
            course_list: [],
            paste_list: [],
            student_list: [],
            temp_table_data: [],
            table_data: [],
            student_data : [],
            page_count: 0,
            page_size: setting.get_page_size,
            query: null,
            is_update: false,
        }
    },
    created() {
        this._init();
        window.config.active = 'class_move';
        window.config.active_name = '教学班管理';
    },
    methods: {
        _init: function() {
            // 新增 or 更新
            if (this.$route.query.hasOwnProperty('id')) {
                this.query = this.$route.query
                this.update(this.query.id);
                this.is_update = true;
            }
        },
        // 校区回调
        handle_school_district_change: function(value) {
            this.info.school_district = value;
            this.$refs.drop_grade.data_bind(value);
            // 回调取老师
            this.$refs.drop_teacher.data_bind({ school_id: value[0], school_district: value[1] });
            // 教室回调
            this.$refs.drop_room.data_bind(this.info.school_district);
        },
        // 年级选择
        handle_grade_change: function(value) {
            this.info.grade_id = value;
            this.course_bind(value);
        },
        // 教室选择
        handle_room_change(value) {
            this.info.classroom_id = value;
        },
        // 教师选择
        handle_teacher_change: function(object) {
            this.info.teacher_id = object.value;
            let t_exec = /([^|]*?)\//g.exec(object.label);
            if (t_exec) {
                this.info.teachers = t_exec[1];
            }
        },
        // 数据导入
        import_paset: function() {
            var pass = true;
            if (this.dialog_msg_error != '') {
                pass = false;
                return pass;
            }
            if (pass) {
                var param = {
                    data: JSON.stringify(this.temp_table_data),
                    class_motive_id: this.info.id,
                    school_id: this.info.school_district[0],
                    semester: this.info.semester,
                    course_id: this.info.course_id,
                    grade_id: this.info.grade_id,
                    layered: this.info.layered,
                    class_motive_label: this.info.label
                };
                api_student.do_import_paset_save(param, (result) => {
                    this.$Notice.success({ title: '消息', desc: '导入工作已完成', duration: 1.5, top: 500 });
                    __.dialog_close();
                    this.clear();
                    location.reload();
                })
            }
        },
        // 导入教学学生
        import_class_move_student_click() {
            __.dialog_show();
            // 设置剪贴板侦听
            __.pasteListen((data) => {
                this.paste_list = [];
                this.handle_paste(data + 'RR');
            })
            api_student.get_student_by_school(this.info.school_district[0], this.info.school_district[1], (result) => {
                this.student_list = result.data.list;
            });
        },
        // 匹配数据
        handle_paste: function(data) {
            bt.log(111);
            bt.log(this.dialog_msg_error)
            var line_match = data.match(/([\W\w]*?)RR/g);
            var result = __.pasteMatch(line_match, this.fields_array);
            bt.log(result);
            if (result.length > 0) {
                result.forEach((c, i) => {
                    var reg_info = this.reg_data(this.student_list, item => { return item.student_name == c.name; });
                    c.pass = reg_info.pass;
                    c.data = reg_info.data;
                    this.temp_table_data.push(c);
                })
                this.page_count = this.temp_table_data.length;
                this.table_data = this.temp_table_data;
            } else {
                this.dialog_msg_error = '格式检查失败~';
            }
        },
        // 检测数据
        reg_data: function(list, fn) {
            var pass = false,
                pass_array = null;
            let info = (function(list) {
                return list.find(item => {
                    return fn(item);
                })
            })(list);
            if (info) {
                pass = true;
                pass_array = info.tid;
            }
            return { pass: pass, data: pass_array };
        },
        // 课程选择
        course_bind(grade_id) {
            api_course.get_course_by_grade(grade_id, result => {
                this.course_list = result.data;
            })
        },
        clear: function() {
            this.temp_table_data = this.table_data = [];
            this.msg_error = this.dialog_msg_error = '';
        },
        // 列检测规则验证
        column_render: function(row, column) {
            if (this.paste_list.indexOf(column.index) == -1) {
                if (!column.row.pass) {
                    this.dialog_msg_error += column.row.name + '匹配失败<br>';
                }
                this.paste_list.push(column.index);
            }
            return column.row.name;
        },
        // 获取关联的学生
        student_bind(move_id){
            api_class.get_student_by_motive_id(move_id,result => {
                this.student_data = result.data;
            })
        },
        update: function(id) {
            api_class.get_class(id, result => {
                this.info = JSON.parse(result);
                this.info.school_district = [this.info.school_id, this.info.school_district];
                this.$refs.school_district.set_value(this.info.school_district);
                this.$refs.drop_grade.set_value(this.info.grade_id);
                this.$refs.drop_teacher.set_value(this.info.teacher_id);
                this.$refs.drop_room.set_value(this.info.classroom_id);
                this.handle_school_district_change(this.info.school_district);
                this.student_bind(id);
            })
        },
        // 保存或更新
        save: function() {
            let rules = {
                school_district: this.info.school_district[1],
                class: this.info.name,
                student_cnt: this.info.student_cnt,
                grade_id: this.info.grade_id,
                teacher_id: this.info.teacher_id,
                course_id: this.info.course_id
            };
            this.msg_error = this.validator(this.$data, rules);
            if (this.is_validator()) {
                api_class.save(result => {
                    result = JSON.parse(result)
                    if (result.status) {
                        __.go_success(this);
                    }
                })
            };
        },

    },
    components: { back, drop_school_district, event_button, drop_grade, drop_teacher, drop_room },
}
</script>