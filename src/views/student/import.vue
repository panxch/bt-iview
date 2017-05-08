<template>   
    <div class="layout-main">
        <div class="layout-content">
        <Alert>学生批量上传
                <template slot="desc">消息提示的描述文案消息提示的描述文案消息提示的描述文案消息提示的描述文案消息提示的描述文案<br>
                <a href="/public/templates/tpl_student.xlsx"><Button type="dashed" icon="arrow-down-a">模板下载</Button></a>
                </template>
        </Alert>
            <Row type="flex">
                <i-col>
                    <Form :label-width="80" inline>
                        <Form-item label="所属校区">
                            <drop_school_district ref="school_district" @handle_school_district_change="handle_school_district_change" name="district_id" v-bt-validator:rules="['required']" empty_err="所属校区"></drop_school_district>
                        </Form-item>
                        <Form-item label="所属班级">
                            <drop_grade_class ref="grade_class" @handle_grade_class_change="handle_grade_class_change" name="class_id" v-bt-validator:rules="['required']" empty_err="所属班级"></drop_grade_class>
                        </Form-item>
                        <Form-item label="角色">
                            <Select placeholder="请选择" style="width:200px" v-model="info.role_id" name="role_id" v-bt-validator:rules="['required']" empty_err="角色">
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
                                <event_button @click="clear" type="warning" icon="android-close" :disabled="table_data.length == 0">清除</event_button>
                                <event_button @click="import_paset" type="info" icon="android-arrow-down" :disabled="table_data.length == 0">导入</event_button>
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
    import api from '../../config/api/basics'
    import api_member from '../../config/api/member'
    import api_student from '../../config/api/student'
    import back from '../../components/public/bt_back.vue'
    import table_columns from '../../config/table_columns'
    import drop_school_district from '../../components/drop_school_district.vue'
    import drop_grade_class from '../../components/drop_grade_class.vue'
    import event_button from '../../components/public/bt_save.vue'
    export default {
        data(){
            return {
                temp_table_data : [],
                table_data : [],
                table_columns : table_columns.student_import.call(this),
                fields_array : ['username','name','gender','student_no','student_stype','v_height','v_weight','v_lung','v_vision'],
                role_list : [],
                page_count : 0,
                page_size : setting.get_page_size,
                msg_error : '',
                info : {},
            }
        },
        created(){
            this._init();
            window.config.active = 'student';
            window.config.active_name = '学生数据导入';
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
                    this.$router.push({ path: '/student' });
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
                        this.temp_table_data.push(c);
                    })
                    this.page_count = this.temp_table_data.length;
                    this.table_data = __.set_page(1,this.page_size,this.temp_table_data);
                }else{
                     this.msg_error = '格式检查失败~';
                }
            },
            // 年级、班级数据同步更新
            class_bind : function(school_id,district_id){
                this.$refs.grade_class.bind(school_id,district_id);
            },
            // 班级回调
            handle_grade_class_change : function(value){
                this.info.grade_id = value[0];
                this.info.class_id = value[1];
            },
            // 校区回调
            handle_school_district_change : function(value){
                this.info.school_id = value[0];
                this.info.district_id = value[1];
                this.$refs.grade_class.$children[0].toggleOpen();
                this.class_bind(this.info.school_id,this.info.district_id);
                this.handle_school_change(this.info.school_id);
            },
            // 数据分页
            handle_page_change : function(index){
                this.table_data = __.set_page(index,this.page_size,this.temp_table_data);
            },
            // 数据导入
            import_paset : function(){
                let rules = {
                    district_id : this.info.district_id,
                    class_id : this.info.class_id,
                    role_id : this.info.role_id
                };
                this.msg_error = this.validator(this.$data,rules);
                if(this.is_validator()){
                    var param = {
                                data : JSON.stringify(this.temp_table_data),
                                school_id : this.info.school_id,
                                school_district : this.info.district_id,
                                grade_id : this.info.grade_id,
                                class_id : this.info.class_id,
                                role_id : this.info.role_id
                            };
                    api_student.do_import_student_paset(param,(result)=>{
                        this.import_success();
                    })
                }
            },
            column_render : function(row,columns,index){
                api_member.get_member(row.username,(result)=>{
                    let info = JSON.parse(result);
                    if(info.id){
                        this.temp_table_data[index].reg_username = 'F';
                        this.msg_error += row.username + '已经存在<br>';
                    }
                })
                return row.username;
            },
            // 获取学校所有的角色
            handle_school_change : function(value){
                __.loading();
                // 取所有角色
                api.get_role(value,(result)=>{
                    this.role_list = result.data;
                    __.closeAll();
                });
            },
        },
        mounted(){
        },
        components : { back,drop_school_district,drop_grade_class,event_button},
    }
</script>