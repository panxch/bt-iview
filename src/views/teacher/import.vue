<template>   
    <div class="layout-main">
        <div class="layout-content">
            <Row type="flex">
                <i-col span="10">
                    <Form :label-width="80" inline>
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
                        <Row type="flex">
                        <i-col span="20"><Input type="text" placeholder="请直接Control + V" :readonly="true"></Input></i-col>
                        <i-col span="1"></i-col>
                        <i-col span="3">
                            <div class="float_right">
                                <Button type="warning" @click="clear" :disabled="table_data.length == 0">清除</Button>
                                <Button type="success" @click="import_paset" :disabled="table_data.length == 0">导入</Button>
                                <bt_back></bt_back>
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
    import bt_back from '../../components/public/bt_back.vue'
    import api from '../../config/api/basics'
    import api_teacher from '../../config/api/teacher'
    import api_member from '../../config/api/member'
    export default {
        data(){
            return {
                temp_table_data : [],
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
                            align : 'center',
                            render : this.column_render
                        },
                        {
                            title : '验证用户',
                            key : 'reg_username',
                            width : 100,
                            align : 'center',
                            render : this.column_render,
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
                            title: '所带科目',
                            key: 'course_mapping'
                        },
                        {
                            title : '科目验证',
                            key : 'course_mapping_pass',
                            width : 90,
                            align : 'center',
                            render : this.column_render
                        },
                        {
                            title: '所带班级',
                            key: 'class_mapping'
                        },
                        {
                            title : '班级验证',
                            key : 'class_mapping_pass',
                            width : 90,
                            align : 'center',
                            render : this.column_render
                        }
                    ],
                fields_array : ['username','name','tel','gender','course_mapping','class_mapping'],
                grade_list : [],
                course_list : [],
                class_list : [],
                role_list : [],
                page_count : 0,
                role_value : '',
                page_size : setting.get_page_size,
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
                    this.table_data = this.set_page(1,this.page_size,this.temp_table_data);
                }else{
                    this.$Message.warning('格式检查失败~');
                }
            },
            // 数据分页
            handle_page_change : function(index){
                this.table_data = this.set_page(index,this.page_size,this.temp_table_data);
            },
            // array分页显示
            set_page : function (pageNo, pageSize, array) {  
                var offset = (pageNo - 1) * pageSize;  
                return (offset + pageSize >= array.length) ? array.slice(offset, array.length) : array.slice(offset, offset + pageSize);  
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
                var info = '';
                if (column._index === 7) info = row.course_mapping_pass;
                else if(column._index === 9) info = row.class_mapping_pass;
                // 验证课目或班级的规则
                if( Object.prototype.toString.call(info) === '[object Boolean]' ){
                    if(info)
                        return '<span style="color:rgb(17,144,10)">Y</span>';
                    else{
                        return '<span style="color:#ff0000">N</span>';
                    }
                }
                else if( column._index ===2 ){
                    if (row.reg_username === undefined)
                        return '<span style="color:rgb(17,144,10)">Y</span>';
                    return '<span style="color:#ff0000">N</span>';
                }
                else{
                     //__.loading('正在验证用户名...');
                    if(! this.temp_table_data[index].reg_username){
                        api_member.get_member(row.username,(result)=>{
                            info = JSON.parse(result);
                            if(info.id){
                                this.temp_table_data[index].username = this.temp_table_data[index].username + ' ';
                                this.temp_table_data[index].reg_username = 'F';
                                __.closeAll();
                            }
                        })
                    }
                    return row.username
                }
            },
            import_paset : function(){
                var pass = true;
                this.temp_table_data.forEach((c,i)=>{
                    if(c.reg_username === 'F' || ! c.course_mapping_pass  || ! c.class_mapping_pass ){
                        this.$Message.warning('格式检查失败,请修改后再次导入~');
                        pass = false;
                        return pass;
                    }
                });
                if(pass){
                    if(! this.role_value){
                        this.$Message.warning('请选择一个角色~');
                        return;
                    }
                    var param = {data : JSON.stringify(this.temp_table_data),school_id : window.config.userinfo.school_id ,role_id : this.role_value};
                    api_teacher.do_import_teacher_paset(param,(result)=>{
                        this.import_success();
                    })
                }
            },
        },
        mounted(){
            __.loading();
            // 取所有年级
            api.get_grade(window.config.userinfo.school_id,(result)=>{
                this.grade_list = result.data;
                __.closeAll();
            });
            // 取所有课目
            api.get_course(window.config.userinfo.school_id,(result)=>{
                this.course_list = result.data;
                __.closeAll();
            });
            // 取所有班级
            api.get_class(window.config.userinfo.school_id,(result)=>{
                this.class_list = result.data;
                __.closeAll();
            });
            // 取所有角色
            api.get_role(window.config.userinfo.school_id,(result)=>{
                this.role_list = result.data;
                __.closeAll();
            });            
        },
        components : { bt_back },
    }
</script>