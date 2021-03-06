<template>   
    <div class="layout-main">
        <div class="layout-content">
        <Alert>学生批量上传
                <template slot="desc">学生管理的添加、修改、审核与删除<br>
                <a href="/public/templates/tpl_student.xlsx"><Button type="dashed" icon="arrow-down-a">模板下载</Button></a>
                </template>
        </Alert>
            <Row type="flex">
                <i-col>
                    <Form :label-width="80" inline>
                        <Form-item label="所属校区">
                            <drop_school_district ref="school_district" @handle_school_district_change="handle_school_district_change" name="district_id" v-bt-validator:rules="['required']" empty_err="所属校区"></drop_school_district>
                        </Form-item>
                        <Form-item label="角色">
                            <Select placeholder="请选择" style="width:200px" v-model="info.role_id" name="role_id" v-bt-validator:rules="['required']" empty_err="角色">
                                <Option :value="info.id" v-for="info in role_list" :key="info.id">{{info.name}}</Option>
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
                                <event_button @click="import_paset" type="info" icon="android-arrow-down" load="true" :disabled="table_data.length == 0 || msg_error.length > 0">导入</event_button>
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
    import api from '../../config/api/basics'
    import api_member from '../../config/api/member'
    import api_student from '../../config/api/student'
    import back from '../../components/public/bt_back.vue'
    import table_columns from '../../config/table_columns'
    import drop_school_district from '../../components/drop_school_district.vue'
    import event_button from '../../components/public/bt_save.vue'
    export default {
        data(){
            return {
                table_height : $(window).height() - 350,
                temp_table_data : [],
                table_data : [],
                table_columns : table_columns.student_import.call(this),
                fields_array : ['username','name','gender','student_no','student_stype','v_height','v_weight','v_lung','v_vision','year_name','grade_name','class_name'],
                role_list : [],
                page_count : 0,
                page_size : setting.get_page_size,
                msg_error : '',
                info : {},
                paste_list : [],
                class_list : [],
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
                this.paste_list = [];
            },
            // 匹配数据
            handle_paste : function(data){
                var line_match = data.match(/([\W\w]*?)RR/g);
                var result = __.pasteMatch(line_match,this.fields_array);
                if(result.length > 0){
                    result.forEach((c,i)=>{
                        this.temp_table_data.push(c);
                    })
                    this.table_data = this.temp_table_data;
                }else{
                     this.msg_error = '格式检查失败~';
                }
            },
            // 年级、班级数据同步更新
            class_bind : function(school_id,district_id){
                 // 取所有班级
                api.get_class(school_id,(result)=>{
                    this.class_list = [];
                    if(result.data.length > 0){
                        this.class_list = result.data;
                    }
                });
            },
            // 校区回调
            handle_school_district_change : function(value){
                this.info.school_id = value[0];
                this.info.district_id = value[1];
                this.class_bind(this.info.school_id,this.info.district_id);
                this.handle_school_change(this.info.school_id);
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
            column_render : function(row,column){
                if(this.paste_list.indexOf(column.index) == -1){
                    api_member.get_member(column.row.username,(result)=>{
                        let info = JSON.parse(result);
                        if(info.id){
                            this.temp_table_data[column.index].reg_username = 'F';
                            this.msg_error += column.row.username + '已经存在<br>';
                        }
                    });
                    let year_name,grade_name,class_name;
                    year_name = column.row.year_name;
                    grade_name = column.row.grade_name;
                    class_name = column.row.class_name;
                    let info = this.class_list.find((info) => {
                        return info.year_name == year_name && info.grade_name == grade_name && info.name == class_name;
                    });
                    if( ! info ){
                        this.msg_error += column.row.username + '所在班级不存在<br>';
                    }else{
                        this.temp_table_data[column.index].class_id = info.id;
                        this.temp_table_data[column.index].grade_id = info.grade_id;
                    }
                    this.paste_list.push(column.index);
                }
                return column.row.username;
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
        components : { back,drop_school_district,event_button},
    }
</script>