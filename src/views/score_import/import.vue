<template>   
    <div class="layout-main">
        <div class="layout-content">
        <Alert>成绩批量上传
                <template slot="desc">请先选择基本信息和考试信息，然后再上传成绩<br>
                <a href="/public/templates/tpl_score.xlsx"><Button type="dashed" icon="arrow-down-a">模板下载</Button></a>
                </template>
        </Alert>
            <Row type="flex">
                <i-col>
                    <Form :label-width="80" inline>
                        <Form-item label="学校">
                            <drop_school @handle_school_change="handle_school_change"></drop_school>
                        </Form-item>
                    </Form>
                </i-col>
            </Row>
            <Row type="flex">
                <i-col>
                    <Form :label-width="80" inline>
                        <Form-item label="入学年份">
                            <Select placeholder="请选择" style="width:200px" @on-change="do_grade_select">
                                <Option :value="info.name" v-for="info in grade_list" :key="info.name">{{info.name}}</Option>
                            </Select>
                        </Form-item>
                        <Form-item label="所在年级">
                            <Select placeholder="请选择" style="width:200px" :clearable="true" @on-change="do_grade_nianji_select" v-model="m_grade_value" name="grade_value" v-bt-validator:rules="['required']" empty_err="所在年级">
                                <Option :value="info.id" v-for="info in grade_nianji_list" :key="info.id">{{info.name}}</Option>
                            </Select>
                        </Form-item>
                        <Form-item label="所在学期">
                            <Select placeholder="请选择" style="width:200px" v-model="m_semester_value" name="semester_value" v-bt-validator:rules="['required']" empty_err="所在学期">
                                <Option :value="info.id" v-for="info in semester_list" :key="info.id">{{info.name}}</Option>
                            </Select>
                        </Form-item>
                    </Form>
                </i-col>
            </Row>
             <Row type="flex">
                <i-col>
                    <Form :label-width="80" inline>
                        <Form-item label="考试类型">
                            <Select placeholder="请选择" style="width:200px" v-model="m_exam_value" name="exam_value" empty_err="考试类型" v-bt-validator:rules="['required']">
                                <Option :value="info.id" v-for="info in exam_type_list" :key="info.id">{{info.name}}</Option>
                            </Select>
                        </Form-item>
                        <Form-item label="考试时间">
                            <Date-picker type="date" placeholder="选择日期" style="width: 200px" format="yyyy-MM-dd" @on-change="do_time_change" v-bt-validator:rules="['required']" name="time_value" v-model="m_time_value" empty_err="考试时间"></Date-picker>
                        </Form-item>
                        <Form-item label="班级类型">
                            <Select placeholder="请选择" style="width:200px" v-model="m_class_value" name="class_value" empty_err="班级类型" v-bt-validator:rules="['required']">
                                <Option :value="info.id" v-for="info in class_type_list" :key="info.id">{{info.name}}</Option>
                            </Select>
                        </Form-item>
                    </Form>
                </i-col>
            </Row>
            <div class="line"></div>
            <Tabs>
                <Tab-pane label="剪贴板导入" name="name1" icon="clipboard">
                    <div>
                        <Row type="flex" v-if="msg_error != ''">
                            <i-col span="24">
                                <Alert type="error" width="100%">
                                    <span style="color:#ff0000">验证提醒</span>
                                    <span slot="desc" v-html="msg_error"></span>
                                </Alert>
                            </i-col>
                        </Row>
                        <Row type="flex">
                            <i-col span="18"><Input type="text" placeholder="请直接Control + V" :readonly="true"></Input></i-col>
                            <i-col span="1"></i-col>
                            <i-col span="5">
                                <div class="float_right">
                                    <Button type="warning" @click="clear" :disabled="table_data.length == 0">清除</Button>
                                    <Button type="success" @click="import_paset" :disabled="table_data.length == 0" :loading="loading">{{primary_text}}</Button>
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
    </div>
</template>
<script type="text/javascript">
    import setting from '../../config/setting';
    import table_columns from '../../config/table_columns';
    import base_import from '../../components/base_import.vue'
    import api from '../../config/api/basics'
    import api_scores from '../../config/api/scores'
    import api_member from '../../config/api/member'
    import api_course from '../../config/api/course'
    import drop_school from '../../components/drop_school.vue'
    import back from '../../components/public/bt_back.vue'
    var $ = window.$;
    export default {
        data(){
            return {
                table_data : [],
                table_columns : table_columns.score_import.call(this),
                grade_list : [],
                grade_nianji_list : [],
                page_size : setting.get_page_size,
                all_data : [],
                course_list : [],
                semester_list : [{id : '02' , name : '上学期'},{id : '01' , name : '下学期'}],
                class_type_list : [{id : 2 , name : '教学班'}],//{id : 1 , name : '行政班'},
                exam_type_list : [{id:5,name :'1月考'},{id:7,name :'3月考'},{id:9,name :'5月考'},{id:1,name :'9月考'},{id:2,name :'10月考'},{id:4,name :'12月考'},{id:3,name :'期中考'},{id:6,name :'期末考'},{id:8,name :'期中考'},{id:10,name :'期末考'}],
                fields_array : ['name','student_no','class','sum_socre','yuwen','shuxue','yingyue','wuli','huaxue','shengwu','zhengzhi','lishi','dili','jishu'],
                fields_text_array : [{cn:'语文',en:'yuwen'},{cn:'数学',en:'shuxue'},{cn:'外语',en:'yingyue'},{cn:'物理',en:'wuli'},{cn:'化学',en:'huaxue'},{cn:'生物',en:'shengwu'},{cn:'政治',en:'zhengzhi'},{cn:'历史',en:'lishi'},{cn:'地理',en:'dili'},{cn:'技术',en:'jishu'}],
                grade_current_array : [],
                class_list : [],
                msg_error : '',
                time_value : '',
                m_semester_value : '',
                m_exam_value : '',
                m_time_value : '',
                m_class_value : '',
                m_time_value : '',
                year_value : '',
                m_grade_value : '',
                primary_text : '导入',
                loading : false,
                paste_list : [],
                table_height : $(window).height() - 400,
            }
        },
        created(){
            this._init();
            window.config.active = 'score_import';
            window.config.active_name = '成绩数据导入';
        },
        methods : {
            _init : function(){
                 // 设置剪贴板侦听
                __.pasteListen((data)=>{
                    this.handle_paste(data + 'RR');
                })
            },
            clear : function(){
                this.table_data = [];
                this.msg_error = '';
            },
            // 导入成功后
            import_success : function(){
                __.go_success(this);
                this.primary_text = '导入';
                this.loading = false;
            },
            // 数据导入
            import_paset : function(){
                if(this.msg_error == ''){
                    this.msg_error = this.validator(this.$data);
                }
                if(this.is_validator() && this.msg_error == ''){
                    var param = {data : JSON.stringify(this.table_data),
                        member_id : window.config.userinfo.id ,
                        semester : this.m_semester_value,
                        exam_type : this.m_exam_value,
                        exam_time : this.time_value,
                        class_type : this.m_class_value,
                        grade_id : this.grade_id,
                        year : this.year_value
                    };
                    this.primary_text = '导入中...';
                    this.loading = true;
                    api_scores.do_import_score_upload_paset(param,(result)=>{
                        this.import_success();
                    })
                }
            },
            // 考试时间发现变化
            do_time_change : function(date){
                this.time_value = date;
            },
            // 学校选择
            handle_school_change : function(value){
                __.loading();
                // 取所有课目
                api_course.get_course(value,(result)=>{
                    this.course_list = [];
                    if(result.data.length > 0){
                        this.course_list = result.data;
                    }
                });
                // 取所有班级
                api.get_class(value,(result)=>{
                    this.class_list = [];
                    if(result.data.length > 0){
                        this.class_list = result.data;
                    }
                });
                // 取所有角色
                api.get_grade_group(value,(result)=>{
                    this.grade_list = [];
                    this.all_data = result.data;
                    if(this.all_data != null && this.all_data.hasOwnProperty('grade')){
                        for(let grade in this.all_data.grade){
                            this.grade_list.push({name : grade});
                        }
                    }
                    __.closeAll();
                });                       
            },
            // 完成粘贴板的匹配
            handle_paste : function(data){
                var line_match = data.match(/([\W\w]*?)RR/g);
                var result = __.pasteMatch(line_match,this.fields_array);
                if(result.length > 0){
                    this.msg_error = '';
                    this.table_data = result;
                }else{
                    this.msg_error = '格式检查失败~';
                }
            },
            // 入学年份选择
            do_grade_select : function(c){
                this.year_value = c;
                this.grade_nianji_list = []
                this.all_data.grade[c].forEach((c,i)=>{
                    this.grade_nianji_list.push( {id : c.id,name : c.grade_name} );
                })
            },
            // 所有年级选择
            do_grade_nianji_select : function(grade_id){
                this.grade_id = grade_id;
                this.grade_current_array = [];
                this.course_list.forEach((c,i)=>{
                    if(c.grade_id == grade_id){
                        this.grade_current_array.push({name : c.name,id : c.id})
                    }
                });
                this.grade_current_array.forEach((m,n)=>{
                    this.fields_text_array.forEach((c,i)=>{
                        if(c.cn == m.name){
                            c.id = m.id;
                            return;
                        }
                    })
                });
            },
            // 列检测规则验证
            column_render : function(row,column){
                if(this.paste_list.indexOf(column.index) == -1){
                    var r = this.table_data[column.index];
                    var pass_msg = '';
                    var course_array = this.fields_array.slice(4,this.fields_array.length);
                    course_array.forEach((c,i)=>{
                        // 获取各课成绩
                        var score = eval('row.' + c);
                        if(parseInt(score)){
                            this.fields_text_array.forEach((m,n)=>{
                                if(c == m.en){
                                    if(m.id == '' || m.id == undefined){
                                        pass_msg += m.cn + '匹配失败&nbsp;&nbsp;';
                                        this.msg_error = pass_msg;
                                    }else{
                                        // 验证通过 赋值
                                        eval('r.' + m.en +'_code = m.id');
                                    }
                                }
                            });
                        };
                    });
                    // 检测班年
                    var pass_class = false;
                    this.class_list.forEach((c,i)=>{
                        if(c.name == column.row.class){
                            pass_class = true;
                            this.table_data[column.index].class_code = c.id;
                            return true;
                        }
                    });;
                    if(! pass_class){
                        this.msg_error += '<br>学号'  + column.row.student_no + '班级验证失败';
                    }
                    //检测学号
                    api_member.get_student_by_no(column.row.student_no,(result)=>{
                        let info = JSON.parse(result);
                        if(! info.id){
                            this.table_data[index].reg_username = 1;
                            this.msg_error += '<br>学号' + column.row.student_no + '验证失败';
                        }else{
                            this.table_data[column.index].student_id = info.id;
                        }
                    }) 
                    this.paste_list.push(column.index);
                    }
                return column.row.student_no;
            },
        },
        mounted(){
            
        },
        components : { drop_school,back },
    }
</script>