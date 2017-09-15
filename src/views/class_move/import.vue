<template>   
    <div class="layout-main">
        <div class="layout-content">
         <Alert>教学班批量上传
                <template slot="desc">教学班管理的添加、修改、删除<br>
                <a href="/public/templates/tpl_class_move.xlsx"><Button type="dashed" icon="arrow-down-a">模板下载</Button></a>
                </template>
        </Alert>
            <Row type="flex">
                <i-col>
                    <Form :label-width="80" inline>
                        <Form-item label="所属校区">
                            <drop_school_district ref="school_district" @handle_school_district_change="handle_school_district_change" name="district_id" v-bt-validator:rules="['required']" empty_err="所属校区"></drop_school_district>
                        </Form-item>
                        <Form-item label="年级">
                           <drop_grade ref="drop_grade" @handle_grade_change="handle_grade_change"></drop_grade>
                        </Form-item>
                        <Form-item label="学期">
                            <Select style="width:200px" v-model="semester">
                                <Option v-for="item in semester_list" :value="item.id" :key="item">{{ item.name }}</Option>
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
                        <i-col span="15"><Input type="text" placeholder="请直接Control + V" :readonly="true"></Input></i-col>
                        <i-col span="1"></i-col>
                        <i-col span="8">
                            <div class="float_right">
                                <event_button @click="clear" type="warning" icon="android-close" :disabled="table_data.length == 0">清除</event_button>
                                <event_button @click="import_paset" type="info" icon="android-arrow-down" load="true" :disabled="table_data.length == 0">导入</event_button>
                                <back></back>
                            </div>
                        </i-col>
                    </Row>
                    </div>
                    <div class="space"></div>
                    <div><Table border highlight-row :columns="table_columns" :data="table_data" v-if="table_data.length > 0"></Table></div>
                    <div class="space"></div>
                    <Row>
                         <i-col>
                             <div style="float:right;">
                                 <Page :total="page_count" :page-size="page_size"  @on-change="handle_page_change" v-if="temp_table_data.length > 0"></Page>
                             </div>
                         </i-col>
                    </Row>
                </Tab-pane>
            </Tabs>
        </div>
    </div>
</template>
<script type="text/javascript">
    import setting from '../../config/setting';
    import base_import from '../../components/base_import.vue'
    import drop_school_district from '../../components/drop_school_district.vue'
    import drop_grade from '../../components/drop_grade.vue'
    import api from '../../config/api/basics'
    import api_teacher from '../../config/api/teacher'
    import api_class from '../../config/api/class_move'
    import api_room from '../../config/api/room'
    import api_course from '../../config/api/course'
    import drop_school from '../../components/drop_school.vue'
    import back from '../../components/public/bt_back.vue'
    import table_columns from '../../config/table_columns'
    import event_button from '../../components/public/bt_save.vue'
    export default {
        data(){
            return {
                temp_table_data : [],
                table_data : [],
                table_columns : table_columns.class_move.call(this),
                fields_array : ['name','layered','grade_name','teacher_name','course_name','semester','student_cnt','roon_name'],
                semester_list : [{id : '02' , name : '上学期'},{id : '01' , name : '下学期'}],
                grade_list : [],
                course_list : [],
                class_list : [],
                grade_list : [],
                room_list:[],
                teacher_list : [],
                page_count : 0,
                grade_value : '',
                page_size : setting.get_page_size,
                school_id : null,
                district_id : null,
                semester : null,
                msg_error : '',
                paste_list : []
            }
        },
        created(){
            this._init();
            window.config.active = 'class_move';
            window.config.active_name = '教学班数据导入';
        },
        methods : {
            _init : function(){
                // 设置剪贴板侦听
                __.pasteListen((data)=>{
                    this.paste_list = [];
                    this.handle_paste(data + 'RR');
                })
            },
            // 导入成功后
            import_success : function(){
                this.$Notice.success({title: '消息',desc:'导入任务已经全部完成',duration : 10,top:500});
                this.clear();
                setTimeout(()=>{
                    this.$router.push({ path: '/class_move' });
                },3000)
            },
            clear : function(){
                this.temp_table_data = this.table_data = [];
                this.msg_error = '';
            },
            // 匹配数据
            handle_paste : function(data){
                var line_match = data.match(/([\W\w]*?)RR/g);
                var result = __.pasteMatch(line_match,this.fields_array);
                if(result.length > 0){
                    result.forEach((c,i)=>{
                        let grades = c.grade_name.split('/');
                        // 学课
                        var reg_course_info = this.reg_data(c.course_name,this.course_list,item => {return item.name == c.course_name && item.grade_first_name == grades[0] && item.grade_name == grades[1];});
                        c.course_pass = reg_course_info.pass;
                        c.course_data = reg_course_info.data;
                        // 年级
                        var reg_grade_info = this.reg_data(grades,this.grade_list,item => {return item.name == grades[0] && item.grade_name == grades[1];});
                        c.grade_pass = reg_grade_info.pass;
                        c.grade_data = reg_grade_info.data;
                        // 老师
                        var reg_teacher_info = this.reg_data(c.teacher_name,this.teacher_list,item => {return item.name == c.teacher_name;});
                        c.teacher_pass = reg_teacher_info.pass;
                        c.teacher_data = reg_teacher_info.data;
                        // 教室
                        var reg_room_info = this.reg_data(c.roon_name,this.room_list,item => {return item.name == c.roon_name;});
                        c.room_pass = reg_room_info.pass;
                        c.room_data = reg_room_info.data;

                        this.temp_table_data.push(c);
                    })
                    this.page_count = this.temp_table_data.length;
                    this.table_data = __.set_page(1,this.page_size,this.temp_table_data);
                }else{
                     this.msg_error = '格式检查失败~';
                }
            },
            // 数据分页
            handle_page_change : function(index){
                this.table_data = __.set_page(index,this.page_size,this.temp_table_data);
            },
            // 检测数据
            reg_data : function(room,list,fn){
                var pass = false , pass_array = null;
                let info = (function(list){
                    return list.find( item => {
                        return fn(item);
                    })
                })(list);
                if( info ){
                    pass = true;
                    pass_array = info.id;
                    //pass_array.push(info.id);
                }
                return { pass : pass, data : pass_array};
            },
            // 列检测规则验证
            column_render : function(row,column){
                if(this.paste_list.indexOf(column.index) == -1){
                    if(! column.row.course_pass){
                        this.msg_error += column.row.teacher_name + '所带科目匹配失败<br>';
                    }
                    if(! column.row.grade_pass){
                        this.msg_error += column.row.teacher_name + '年级匹配失败<br>';
                    }
                    if(! column.row.teacher_pass){
                        this.msg_error += column.row.teacher_name + '匹配失败<br>';
                    }
                    if(! column.row.room_pass){
                        this.msg_error += column.row.teacher_name + '教室匹配失败<br>';
                    }
                    this.paste_list.push(column.index);
                }
                return column.row.teacher_name;
            },
            // 数据导入
            import_paset : function(){
                var pass = true;
                if(this.msg_error != '' ){
                    //this.$Message.warning('格式检查失败,请修改后再次导入~');
                    pass = false;
                    return pass;
                }
                if(pass){
                    if(! this.grade_value){
                        this.msg_error = '请选择一个年级~';
                        return;
                    }
                    var param = {
                        data : JSON.stringify(this.temp_table_data),
                        school_id : this.school_id,
                        district_id:this.district_id,
                        grade_id : this.grade_value,
                        semester : this.semester,
                    };
                    api_class.do_import_paset(param,(result)=>{
                        this.import_success();
                    })
                }
            },
            handle_grade_change(value){
                this.grade_value = value;
            },
            // 获取学校所有的角色
            handle_school_district_change : function(value){
                this.school_id = value[0];
                this.district_id = value[1];

                this.$refs.drop_grade.data_bind(value);
                
                // 取所有课目
                api_course.get_course(this.school_id,this.district_id,(result)=>{
                    this.course_list = result.data
                });
                // 取所有班级
                api.get_class(this.school_id,(result)=>{
                    this.class_list = [];
                    if(result.data.length > 0){
                        this.class_list = result.data;
                    }
                });
                // 取所有年级
                api.get_grade(this.school_id,this.district_id,(result)=>{
                     this.grade_list = result.data;
                    __.closeAll();
                }); 
                // 取所有教室
                api_room.get_room_by_school_district(this.school_id,this.district_id,(result)=>{
                     this.room_list = result.data;
                    __.closeAll();
                }); 
                // 取老师
                __.loading();
            	let param = {
            		page_size : 1000,
            		page_index : 1,
            		school_id : this.school_id,
            		school_district : this.district_id,
            	}
                __.loading();
	            api_teacher.get_teacher_by_school_district(param,(result)=>{
	            	this.teacher_list = JSON.parse(result);
	                __.closeAll();
	            });
            },
        },
        mounted(){
        },
        components : { drop_school,back,event_button,drop_school_district,drop_grade},
    }
</script>