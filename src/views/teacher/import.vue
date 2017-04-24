<template>   
    <div class="layout-main">
        <div class="layout-content">
            <Row type="flex">
                <i-col>
                    <Form :label-width="80" inline>
                        <drop_school @handle_school_change="handle_school_change"></drop_school>
                        <Form-item label="角色">
                            <Select placeholder="请选择" style="width:200px" v-model="role_value">
                                <Option :value="info.id" v-for="info in role_list">{{info.name}}</Option>
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
                                <Button type="success" @click="import_paset" :disabled="table_data.length == 0">导入</Button>
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
    import api from '../../config/api/basics'
    import api_teacher from '../../config/api/teacher'
    import api_member from '../../config/api/member'
    import drop_school from '../../components/drop_school.vue'
    import back from '../../components/public/bt_back.vue'
    import table_columns from '../../config/table_columns'
    export default {
        data(){
            return {
                temp_table_data : [],
                table_data : [],
                table_columns : table_columns.teacher_import,
                fields_array : ['username','name','tel','gender','course_mapping','class_mapping'],
                grade_list : [],
                course_list : [],
                class_list : [],
                role_list : [],
                page_count : 0,
                role_value : '',
                page_size : setting.get_page_size,
                school_id : null,
                msg_error : '',
            }
        },
        created(){
            this._init();
            window.config.active = 'teacher';
            window.config.active_name = '教师数据导入';
        },
        methods : {
            _init : function(){
                // 设置剪贴板侦听
                __.pasteListen((data)=>{
                    this.handle_paste(data + 'RR');
                })
            },
            // 导入成功后
            import_success : function(){
                this.$Notice.success({title: '消息',desc:'导入任务已经全部完成',duration : 10,top:500});
                this.clear();
                setTimeout(()=>{
                    this.$router.push({ path: '/teacher' });
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
                        var reg_course_info = this.reg_course(c.course_mapping,this.course_list);
                        var reg_class_info = this.reg_course(c.class_mapping,this.class_list);
                        c.course_mapping_pass = reg_course_info.pass;
                        c.class_mapping_pass = reg_class_info.pass;
                        c.course_mapping_data = reg_course_info.data;
                        c.class_mapping_data = reg_class_info.data;
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
            // 检测科目匹配
            reg_course : function(data,list){
                var pass = false , pass_array = [],pass_count = 0;
                var items = data.split(',');
                items.forEach((c,i)=>{
                    var infos = c.split('/');
                    var grade_name = infos[0];
                    // 高三 - 2014 是否可以找到
                    var grade = function(grade_list){
                        var t = grade_list.find(function(t){
                            if(t.name + '-' + t.grade_name == grade_name){
                                return t;
                            }
                        });
                        return t;
                    }(this.grade_list);
                    // 如果找到年级对应关系,再匹配课目
                    if(grade){
                        log(list);
                        var courses = infos[1].split('#');
                        pass = true;
                        courses.forEach((c)=>{
                            var info = list.find(function(w){
                                //log(c + '/' + w.name + '/' + w.grade_id + '/' + grade.id)
                                if(c == w.name && w.grade_id == grade.id){
                                    pass_array.push(w.id);
                                    return c;
                                }
                            });
                            if(! info){
                                pass = false;
                                return false;
                            }
                        });
                    }
                    if( pass ) pass_count += 1 ;
                });
                pass = false;
                if(items.length === pass_count) pass = true;
                if(pass || data == '') pass = true;
                return { pass : pass, data : pass_array};
            },
            // 列检测规则验证
            column_render : function(row,column,index){
                if(! row.course_mapping_pass){
                    this.msg_error += row.username + '所带科目匹配失败<br>';
                }
                if(! row.class_mapping_pass){
                    this.msg_error += row.username + '所带班级匹配失败<br>';
                }
                api_member.get_member(row.username,(result)=>{
                    let info = JSON.parse(result);
                    if(info.id){
                        this.temp_table_data[index].reg_username = 'F';
                        this.msg_error += row.username + '已经存在<br>';
                        __.closeAll();
                    }
                })
                return row.username;
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
                    if(! this.role_value){
                        this.msg_error = '请选择一个角色~';
                        return;
                    }
                    var param = {data : JSON.stringify(this.temp_table_data),school_id : this.school_id,role_id : this.role_value};
                    api_teacher.do_import_teacher_paset(param,(result)=>{
                        this.import_success();
                    })
                }
            },
            // 获取学校所有的角色
            handle_school_change : function(value){
                this.school_id = value;
                __.loading();
                // 取所有角色
                api.get_role(value,(result)=>{
                    this.role_list = result.data;
                    __.closeAll();
                });
                // 取所有课目
                api.get_course(value,(result)=>{
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
                api.get_grade(value,(result)=>{
                     this.grade_list = result.data;
                    __.closeAll();
                }); 
            },
        },
        mounted(){
        },
        components : { drop_school,back},
    }
</script>