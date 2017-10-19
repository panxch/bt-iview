var table_columns = {
	school : [
	            {
	                type: 'selection',
	                width: 30,
	                align: 'center'
	            },
	            {
	                title : '#',
	                key : 'id',
	                width: 60,
	                align: 'center',
	                sortable: true
	            },
	            {
	                title: '学校名称',
	                key: 'name',
	                width : 200,
	                sortable: true
	            },
	            {
	                title: '学校地址',
	                key: 'address',
	            },
	            {
	                title : '校长',
	                key : 'principal',
	                width : 140,
	                align: 'center',
	            },
	            {
	                title: '联系方式',
	                key: 'mobile',
	                width: 160,
	                sortable: true,
	                align: 'center',
	            },
	            {
	                title : '地址',
	                key : 'location',
	                width: 160,
	                align: 'center',
	                sortable: true
	            },
            ],
    student : function(){
        return [
                {
                    type: 'selection',
                    width: 30,
                    align: 'center',
                },
                {
                    title : '#',
                    key : 'id',
                    width: 60,
                    align: 'center',
                },
                {
                    title: '学生姓名',
                    key: 'student_name',
                    sortable: true,
                    align: 'center',
                    width:80,
                },
                {
                    title: '登陆用户名',
                    key: 'username',
                    align : 'center',
                    width: 140,
                    sortable: true
                },
                {
                    title: '学号',
                    key: 'student_no',
                    align : 'center',
                    width: 140,
                    sortable: true
                },
                {
                    title: '年级',
                    key: 'grade_name',
                    align: 'center',
                    width:140,
                },
                {
                    title: '班级',
                    key: 'class_name',
                    align: 'center',
                    width:120,
                },
                {
                    title: '是否毕业',
                    key: 'is_by',
                    align: 'center',
                    width:60,
                    render : this.column_render
                },
                {
                    title: '所属学校',
                    key: 'school_name',
                },
                {
                    title: '校区',
                    key: 'campus_name',
                    align: 'center',
                },
                {
                    title : '创建时间',
                    key : 'create_time',
                    width: 140,
                    align: 'center',
                    sortable: true
                },
            ];
    },
    student_import : function(){
        return [
                    {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '登陆帐号',
                        key: 'username',
                        align : 'center',
                        render : this.column_render
                    },                    
                    {
                        title: '姓名',
                        key: 'name',
                        align : 'center'
                    },
                    {
                        title: '性别',
                        key: 'gender',
                        width: 80,
                        align : 'center'
                    },
                    {
                        title: '学号',
                        key: 'student_no',
                        align : 'center'
                    },
                    {
                        title: '学生类型',
                        key: 'student_stype',
                        align: 'center'
                    },                        
                    {
                        title: '身高',
                        key: 'v_height',
                        align: 'center'
                    },
                    {
                        title: '体重',
                        key: 'v_weight',
                        align: 'center'
                    },
                    {
                        title: '肺活量',
                        key: 'v_lung',
                        align: 'center'
                    },
                    {
                        title: '视力',
                        key: 'v_vision',
                        align: 'center'
                    },
                    {
                        title: '年级(届)',
                        key: 'year_name',
                        align: 'center'
                    },
                    {
                        title: '年级(名)',
                        key: 'grade_name',
                        align: 'center'
                    },
                    {
                        title: '所在班级',
                        key: 'class_name',
                        align: 'center'
                    }
                ];
    },
    teacher : [
                {
                    type: 'selection',
                    width: 30,
                    align: 'center',
                },
                {
                    title : '#',
                    key : 'id',
                    width: 60,
                    align: 'center',
                },
                {
                    title: '登陆用户名',
                    key: 'username',
                    width: 140,
                    sortable: true
                },
                {
                    title: '教师姓名',
                    key: 'name',
                    width: 100,
                    align: 'center',
                },
                {
                    title: '手机号',
                    key: 'tel',
                    width: 100,
                    sortable: true,
                    align: 'center',
                },
                {
                    title: '班级关系',
                    key: 'class_mapping'
                },
                {
                    title: '学科关系',
                    key: 'course_mapping'
                },
                {
                    title: '学校',
                    key: 'school_name',
                },
                {
                    title: '校区',
                    key: 'campus_name',
                    align: 'center',
                },
                {
                    title: '创建时间',
                    key: 'create_time',
                    align: 'center',
                    width : 140
                },
            ],
    teacher_import : function(){
        return [
                    {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '登陆帐号',
                        key: 'username',
                        width: 140,
                        align : 'center',
                        render : this.column_render
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
                        title: '所带班级',
                        key: 'class_mapping'
                    }
                ];
    },
    score : function(){
        return  [
                        {
                            type: 'selection',
                            width: 30,
                            align: 'center',
                        },
                        {
                            title : '#',
                            key : 'id',
                            width: 60,
                            align: 'center',
                        },
                        {
                            title: '导入名称',
                            key: 'file_name_new',
                            sortable: true
                        },
                        {
                            title: '导入方式',
                            key: 'file_name_ori',
                            width:80,
                            align: 'center',
                            render : this.column_render_type
                        },
                        {
                            title: '创建人',
                            key: 'name',
                            width: 100,
                            align: 'center',
                        },
                        {
                            title: '入学时间',
                            key: 'year',
                            width: 60,
                            align: 'center',
                        },
                        {
                            title: '学期',
                            width: 60,
                            key: 'semester',
                            align: 'center',
                        },
                        {
                            title: '考试时间',
                            width: 100,
                            key: 'examTime',
                            align: 'center',
                        },
                        {
                            title: '考试类型',
                            width: 100,
                            key: 'exam_type',
                            align: 'center',
                            render : this.column_render
                        },
                        {
                            title : '创建时间',
                            key : 'create_time',
                            width: 140,
                            align: 'center',
                            sortable: true
                        }
                ];
    },
    score_import : function(){
        return [
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
                    }
                ];
    },
    score_import_class_move : function(){
        return [
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
                        width: 120,
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
                        key: 'yingyue',
                        align : 'center',
                    },
                    {
                        title : '物理A',
                        key : 'wuli_A',
                        width: 70,
                        align : 'center'                            
                    },
                    {
                        title : '物理B',
                        key : 'wuli_B',
                        width: 70,
                        align : 'center'                            
                    },
                    {
                        title : '化学A',
                        key : 'huaxue_A',
                        width: 70,
                        align : 'center'                            
                    },
                    {
                        title : '化学B',
                        key : 'huaxue_B',
                        width: 70,
                        align : 'center'                            
                    },
                    {
                        title : '生物A',
                        key : 'shengwu_A',
                        width: 70,
                        align : 'center'                            
                    },
                    {
                        title : '生物B',
                        key : 'shengwu_B',
                        width: 70,
                        align : 'center'                            
                    },
                    {
                        title : '政治A',
                        key : 'zhengzhi_A',
                        width: 70,
                        align : 'center'                            
                    },
                    {
                        title : '政治B',
                        key : 'zhengzhi_B',
                        width: 70,
                        align : 'center'                            
                    },
                    {
                        title : '历史A',
                        key : 'lishi_A',
                        width: 70,
                        align : 'center'                            
                    },
                    {
                        title : '历史B',
                        key : 'lishi_B',
                        width: 70,
                        align : 'center'                            
                    },
                    {
                        title : '地理A',
                        key : 'dili_A',
                        width: 70,
                        align : 'center'                            
                    },
                    {
                        title : '地理B',
                        key : 'dili_B',
                        width: 70,
                        align : 'center'
                    }
                ];
    },
    score_view : function(){
        return [
                    {
                        type: 'index',
                        width: 70,
                        align: 'center'
                    },
                    {
                        title : '姓名',
                        key : 'name',
                        width: 140,
                        render : this.column_render
                    },
                    {
                        title: '成绩',
                        key : 'tip',
                    },
                ];
    },
    class : function(){
        return [
                 {
                    type: 'selection',
                    width: 30,
                    align: 'center'
                },
                {
                    title : '#',
                    key : 'id',
                    width: 60,
                    align: 'center',
                    sortable: true
                },
                {
                    title: '班级名称',
                    key: 'name',
                    width: 140,
                    align: 'center'
                },
                {
                    title: '年级',
                    width: 100,
                    key: 'grade_name',
                    align: 'center',
                    sortable: true
                },
                {
                    title: '班级人数',
                    key: 'student_cnt',
                    width: 70,
                    align: 'center'
                },
                {
                    title: '班主任',
                    key: 'tname',
                    width: 140,
                    align: 'center',
                    render : this.column_render
                },
                {
                    title: '学校',
                    key: 'school_name',
                },
                {
                    title: '校区',
                    key: 'campus_name',
                    width: 140,
                    align: 'center'
                },
                {
                    title: '创建时间',
                    key: 'create_time',
                    width: 140,
                    align: 'center'
                }

            ];
    },
    class_move : function(){
        return [
                 {
                    type: 'selection',
                    width: 30,
                    align: 'center'
                },
                {
                    title : '#',
                    key : 'id',
                    width: 60,
                    align: 'center',
                    sortable: true
                },
                {
                    title: '班级名称',
                    key: 'name',
                    width: 80,
                    align: 'center'
                },
                {
                    title: '分层',
                    width: 60,
                    key: 'layered',
                    align: 'center',
                    sortable: true
                },
                {
                    title: '年级',
                    width: 100,
                    key: 'grade_name',
                    align: 'center',
                    sortable: true
                },
                {
                    title: '学期',
                    width: 80,
                    key: 'semester',
                    align: 'center',
                    sortable: true
                },
                {
                    title: '课程名称',
                    width: 100,
                    key: 'course_name',
                    align: 'center',
                    sortable: true
                },
                {
                    title: '任课教师',
                    width: 100,
                    key: 'teacher_name',
                    align: 'center',
                    sortable: true,
                    render : this.column_render
                },
                {
                    title: '班级人数',
                    key: 'student_cnt',
                    width: 70,
                    align: 'center'
                },
                {
                    title: '教室',
                    key: 'roon_name',
                    width: 140,
                    align: 'center'
                },
                {
                    title: '学校',
                    key: 'school_name',
                },
                {
                    title: '校区',
                    key: 'school_district_name',
                    width: 80,
                    align: 'center'
                },
                // {
                //     title: '创建时间',
                //     key: 'create_time',
                //     width: 140,
                //     align: 'center'
                // }

            ];
    },
    course : function(){
        return [
                {
                    type: 'selection',
                    width: 30,
                    align: 'center'
                },
                {
                    title : '#',
                    key : 'id',
                    width: 60,
                    align: 'center',
                    sortable: true,
                    render : this.column_render
                },
                {
                    title: '课程码',
                    key: 'code',
                    width: 80,
                    align: 'center',
                },
                {
                    title: '课程名',
                    key: 'name',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '课程类别',
                    key: 'type',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '学分',
                    key: 'credit',
                    width: 40,
                    align: 'center'
                },
                {
                    title: '授课方式',
                    key: 'teaching_method',
                    width: 90,
                    align: 'center'
                },
                {
                    title: '考核方式',
                    key: 'assessment_method',
                    width: 90,
                    align: 'center'
                },
                {
                    title: '学期',
                    key: 'study_section',
                    width: 80,
                    align: 'center'
                },
                {
                    title: '总分',
                    key: 'full_marks',
                    width: 40,
                    align: 'center'
                },
                {
                    title: '年级',
                    key: 'grade_name',
                    align: 'center',
                },
                {
                    title: '学校',
                    key: 'school_name',
                },
                {
                    title: '校区',
                    key: 'campus_name',
                    align: 'center'
                },
                {
                    title: '创建时间',
                    key: 'create_time',
                    width: 140,
                    align: 'center'
                }
            ];
    },
    room : function(){
        return [
                {
                    type: 'selection',
                    width: 30,
                    align: 'center'
                },
                {
                    title : '#',
                    key : 'id',
                    width: 60,
                    align: 'center',
                    sortable: true,
                },
                {
                    title: '教室名称',
                    key: 'name',
                    width: 80,
                    align: 'center'
                },
                {
                    title: '座位数',
                    key: 'number',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '教室类别',
                    key: 'type',
                    width: 80,
                    align: 'center'
                },
                {
                    title: '所在年级',
                    key: 'grade_name',
                    width: 100,
                    align: 'center'
                },
                {
                    title: '教室地点',
                    key: 'classroom_location',
                    width: 200,
                    align: 'center'
                },
                {
                    title: '学校',
                    key: 'school_name',
                },
                {
                    title: '校区',
                    key: 'campus_name',
                    align: 'center'
                },
                {
                    title: '创建时间',
                    key: 'create_time',
                    width: 140,
                    align: 'center'
                }
            ];
    }, 
    import_class_move_student : function(){
        return  [
                    {
                        title: '姓名',
                        width: 100,
                        key: 'name',
                        align: 'center',
                        sortable: true,
                        render : this.column_render
                    },
                    {
                        title: 'TQ',
                        width: 100,
                        key: 'temp',
                        align: 'center',
                        sortable: true
                    },
            ]
    }, 
    class_move_student : function(){
        return  [
                    {
                        title: '姓名',
                        width: 100,
                        key: 'name',
                        align: 'center',
                        sortable: true,
                    },
                    {
                        title: '帐号',
                        width: 200,
                        key: 'username',
                        align: 'center',
                        sortable: true
                    },
                    {
                        title: '学号',
                        width: 200,
                        key: 'student_no',
                        align: 'center',
                        sortable: true
                    }
            ]
    },   
    grade : function(){
        return  [
                    {
                        type: 'selection',
                        width: 30,
                        align: 'center',
                    },
                    
                    {
                        title: '#',
                        width: 60,
                        key: 'id',
                        align: 'center',
                        sortable: true
                    },
                    {
                        title: '年级',
                        width: 100,
                        key: 'name',
                        align: 'center',
                        sortable: true
                    },
                    {
                        title: '年级名称',
                        width: 100,
                        key: 'grade_name',
                        align: 'center',
                        sortable: true
                    },
                    {
                        title: '学年',
                        width: 100,
                        key: 'school_year',
                        align: 'center',
                        sortable: true
                    },
                     {
                        title: '入学年份',
                        width: 100,
                        key: 'entrance',
                        align: 'center',
                        sortable: true
                    },
                    {
                        title: '所属学校',
                        key: 'school_name',
                        sortable: true
                    },
                    {
                        title: '校区',
                        key: 'campus_name',
                        align: 'center',
                    },
                    {
                        title: '创建时间',
                        key: 'create_time',
                        align: 'center',
                        width : 140
                    },
            ]
    },
    role : function(){
        return [
                    {
                    type: 'selection',
                    width: 30,
                    align: 'center'
                },
                {
                    title : '#',
                    key : 'id',
                    width: 60,
                    align: 'center',
                    sortable: true
                },
                {
                    title: '角色名称',
                    key: 'name',
                    align: 'left',
                    width: 200,
                },
                {
                    title: '学校名称',
                    key: 'school_name',
                    align: 'left',
                    width: 200,
                },
                {
                    title: '角色说明',
                    key: 'description',
                },
            ];
    },
    func : function(){
        return [
                    {
                    type: 'selection',
                    width: 30,
                    align: 'center'
                },
                {
                    title : '#',
                    key : 'id',
                    width: 60,
                    align: 'center',
                    sortable: true
                },
                {
                    title: '模块名称',
                    key: 'name',
                    align: 'left',
                    width: 140,
                },
                {
                    title: 'KEY',
                    key: 'group_key',
                    align: 'center',
                    width: 120,
                },
                {
                    title: '级别',
                    key: 'menu_level',
                    align: 'center',
                    width: 40,
                },
                {
                    title: '说明',
                    key: 'description',
                },
            ];
    },
}

export default table_columns