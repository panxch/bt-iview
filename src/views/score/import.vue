<template>   
    <div class="layout-main">
        <div class="layout-content">
            <Row type="flex">
                <i-col>
                    <Form :label-width="80" inline>
                        <Form-item label="入学年份">
                            <Select placeholder="请选择" style="width:200px" @on-change="do_grade_select">
                                <Option :value="info.name" v-for="info in grade_list">{{info.name}}</Option>
                            </Select>
                        </Form-item>
                        <Form-item label="所在年级">
                            <Select placeholder="请选择" style="width:200px" :clearable="true" @on-change="do_grade_nianji_select">
                                <Option :value="info.id" v-for="info in grade_nianji_list">{{info.name}}</Option>
                            </Select>
                        </Form-item>
                        <Form-item label="所在学期">
                            <Select placeholder="请选择" style="width:200px">
                                <Option :value="info.name" v-for="info in semester_list">{{info.name}}</Option>
                            </Select>
                        </Form-item>
                    </Form>
                </i-col>
            </Row>
             <Row type="flex">
                <i-col>
                    <Form :label-width="80" inline>
                        <Form-item label="考试类型">
                            <Select placeholder="请选择" style="width:200px">
                                <Option :value="info.name" v-for="info in exam_type_list">{{info.name}}</Option>
                            </Select>
                        </Form-item>
                        <Form-item label="考试时间">
                            <Date-picker type="date" placeholder="选择日期" style="width: 200px"></Date-picker>
                        </Form-item>
                        <Form-item label="班级类型">
                            <Select placeholder="请选择" style="width:200px">
                                <Option :value="info.name" v-for="info in class_type_list">{{info.name}}</Option>
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
                    <div class="space"></div>
                    <Row>
                         <i-col>
                             <div style="float:right;">
                                 Page
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
    export default {
        data(){
            return {
                table_data : [],
                table_columns : [
                        {
                            type: 'index',
                            width: 70,
                            align: 'center'
                        },
                        {
                            title : '学号',
                            key : 'student_no',
                            render : this.column_render
                        },
                        {
                            title: '姓名',
                            key: 'name',
                            width: 90,
                            align : 'center',
                        },
                        {
                            title: '班级',
                            key: 'class',
                            width: 70,
                            align : 'center'
                        },
                        {
                            title: '总分',
                            key: 'sum_socre',
                            width: 70,
                            align : 'center'
                        },
                        {
                            title: '语文',
                            width: 70,
                            key: 'yuwen',
                            align : 'center',
                        },
                        {
                            title : '数学',
                            key : 'shuxue',
                            width: 70,
                            align : 'center',
                        },
                        {
                            title: '英语',
                            width: 70,
                            key: 'yingyue'
                        },
                        {
                            title : '物理',
                            key : 'wuli',
                            width: 70,
                            align : 'center'                            
                        },
                        {
                            title : '化学',
                            key : 'huaxue',
                            width: 70,
                            align : 'center'                            
                        },
                        {
                            title : '生物',
                            key : 'shengwu',
                            width: 70,
                            align : 'center'                            
                        },
                        {
                            title : '政治',
                            key : 'zhengzhi',
                            width: 70,
                            align : 'center'                            
                        },
                        {
                            title : '历史',
                            key : 'lishi',
                            width: 70,
                            align : 'center'                            
                        },
                        {
                            title : '地理',
                            key : 'dili',
                            width: 70,
                            align : 'center'                            
                        },
                        {
                            title : '技术',
                            key : 'jishu',
                            width: 70,
                            align : 'center'                            
                        }],
                grade_list : [],
                grade_nianji_list : [],
                page_size : setting.get_page_size,
                all_data : [],
                course_list : [],
                semester_list : [{id : '02' , name : '上学期'},{id : '01' , name : '下学期'}],
                class_type_list : [{id : 1 , name : '行政班'},{id : 2 , name : '教学班'}],
                exam_type_list : [{id:5,name :'1月考'},{id:7,name :'3月考'},{id:9,name :'5月考'},{id:1,name :'9月考'},{id:2,name :'10月考'},{id:4,name :'12月考'},{id:3,name :'期中考'},{id:6,name :'期末考'},{id:8,name :'期中考'},{id:10,name :'期末考'}],
                fields_array : ['name','student_no','class','sum_socre','yuwen','shuxue','yingyue','wuli','huaxue','shengwu','zhengzhi','lishi','dili','jishu'],
                fields_text_array : [{cn:'语文',en:'yuwen'},{cn:'数学',en:'shuxue'},{cn:'外语',en:'yingyue'},{cn:'物理',en:'wuli'},{cn:'化学',en:'huaxue'},{cn:'生物',en:'shengwu'},{cn:'政治',en:'zhengzhi'},{cn:'历史',en:'lishi'},{cn:'地理',en:'dili'},{cn:'技术',en:'jishu'}],
                grade_current_array : [],
                class_list : [],
                msg_error : '',
            }
        },
        created(){
            this._init();
            window.config.active = 'score';
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
            import_paset : function(){},
            // 完成粘贴板的匹配
            handle_paste : function(data){
                var line_match = data.match(/([\W\w]*?)RR/g);
                var result = __.pasteMatch(line_match,this.fields_array);
                if(result.length > 0){
                    this.table_data = result;
                }else{
                    this.$Message.warning('格式检查失败~');
                }
            },
            // 入学年份选择
            do_grade_select : function(c){
                this.grade_nianji_list = []
                this.all_data.grade[c].forEach((c,i)=>{
                    this.grade_nianji_list.push( {id : c.id,name : c.grade_name} );
                })
            },
            // 所有年级选择
            do_grade_nianji_select : function(grade_id){
                log(grade_id);
                this.grade_current_array = [];
                this.course_list.forEach((c,i)=>{
                    if(c.grade_id == grade_id){
                        //log(c.name + '/' + c.id);
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
            column_render : function(row,column,index){
                var r = this.table_data[index];
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
                // 检测学号
                api_member.get_student_by_no(row.student_no,(result)=>{
                    let info = JSON.parse(result);
                    if(! info.id){
                        this.table_data[index].reg_username = 1;
                        this.msg_error += '<br>学号' + row.student_no + '验证失败';
                    }
                }) 
                return row.student_no;
            },
        },
        mounted(){
            __.loading();
            // 取所有课目
            api.get_course(window.config.userinfo.school_id,(result)=>{
                this.course_list = result.data;
            });
            // 取所有班级
            // api.get_class(window.config.userinfo.school_id,(result)=>{
            //     this.class_list = result.data;
            // });
            // 取所有角色
            api.get_grade_group(window.config.userinfo.school_id,(result)=>{
                this.all_data = result.data;
                for(let grade in this.all_data.grade){
                    this.grade_list.push({name : grade});
                }
                __.closeAll();
            });            
        },
        components : {  },
    }
</script>