<template>   
    <div class="layout-main">
        <div class="layout-content">
            <Row type="flex">
                <i-col span="10">
                    <Form :label-width="80" inline>
                        <Form-item label="年级">
                            <Select placeholder="请选择" style="width:200px" >
                                
                            </Select>
                        </Form-item>
                    </Form>
                </i-col>
            </Row>
            <div class="line"></div>
            <Tabs>
                <Tab-pane label="剪贴板导入" name="name1" icon="clipboard">
                    <div>
                        <Row type="flex">
                        <i-col span="20"><Input type="text" placeholder="请直接Control + V" :readonly="true"></Input></i-col>
                        <i-col span="1"></i-col>
                        <i-col span="3">
                            <div class="float_right">
                                <Button type="warning" @click="clear" :disabled="table_data.length == 0">清除</Button>
                                <Button type="success" @click="import_paset" :disabled="table_data.length == 0">导入</Button>
                            </div>
                        </i-col>
                    </Row>
                    </div>
                    <div class="space"></div>
                    <div><Table border highlight-row :columns="table_columns" :data="table_data" v-if="table_data.length > 0"></Table></div>
                </Tab-pane>
            </Tabs>
        </div>
    </div>
</template>
<script type="text/javascript">
    import base_import from '../../components/base_import.vue'
    import api from '../../config/api/basics'
    export default {
        data(){
            return {
                table_data : [],
                table_columns : [
                        {
                            type: 'index',
                            width: 60,
                            align: 'center'
                        },
                        {
                            title: '登陆名称',
                            key: 'username',
                            width: 140,
                            align : 'center'
                        },
                        {
                            title: '姓名',
                            key: 'name',
                            width: 120,
                            align : 'center'
                        },
                        {
                            title: '手机号',
                            key: 'tel',
                            width: 120,
                            align : 'center'
                        },
                        {
                            title: '性别',
                            key: 'gender',
                            width: 80,
                            align : 'center'
                        },
                        {
                            title: '身份证号码',
                            key: 'card',
                            width : 160,
                        },
                        {
                            title: '所带科目',
                            key: 'course_mapping'
                        },
                        {
                            title : '科目是通过',
                            key : 'course_mapping_pass'
                        },
                        {
                            title: '所带班级',
                            key: 'class_mapping'
                        }
                    ],
                fields_array : ['username','name','tel','gender','card','course_mapping','class_mapping'],
                grade_list : [],
                course_list : []
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
            clear : function(){
                this.table_data = [];
            },
            handle_paste : function(data){
                var line_match = data.match(/([\W\w]*?)RR/g);
                var result = __.pasteMatch(line_match,this.fields_array);
                if(result.length > 0){
                    result.forEach((c,i)=>{
                        c.course_mapping_pass = this.reg_course(c.course_mapping) ? '通过' : '<span style="color:#ff0000;">不通过</span>';
                        this.table_data.push(c);
                    })
                }else{
                    this.$Message.warning('格式检查失败~');
                }
            },
            // 检测科目匹配
            reg_course : function(data){
                var pass = false;
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
                        var courses = infos[1].split('#');
                        pass = true;
                        courses.forEach((c)=>{
                            var info = this.course_list.find(function(w){
                                //log(c + '/' + w.name + '/' + w.grade_id + '/' + grade.id)
                                if(c == w.name && w.grade_id == grade.id){
                                    return c;
                                }
                            });
                            if(! info){
                                pass = false;
                            }
                        });
                    }
                });
                return pass;
            },
            import_paset : function(){

            },
        },
        mounted(){
            __.loading();
            // 取所有年级
            api.get_grade(window.config.userinfo.school_id,(result)=>{
                this.grade_list = result.data;
                // log('-------this.grade_list------')
                // log(this.grade_list);
                __.closeAll();
            });
            // 取所有课目
            api.get_course(window.config.userinfo.school_id,(result)=>{
                this.course_list = result.data;
                __.closeAll();
            });
        },
        components : {  },
    }
</script>