var table_columns = {
	school : [
	            {
	                type: 'selection',
	                width: 60,
	                align: 'center'
	            },
	            {
	                title : '#',
	                key : 'id',
	                width: 80,
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
    teacher : [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center',
                },
                {
                    title : '#',
                    key : 'id',
                    width: 80,
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
                    width: 120,
                    align: 'center',
                },
                {
                    title: '手机号',
                    key: 'tel',
                    width: 160,
                    sortable: true,
                    align: 'center',
                },
                {
                    title : '创建时间',
                    key : 'create_time',
                    width: 160,
                    align: 'center',
                    sortable: true
                },
                {
                    title: '班级关系',
                    key: 'class_mapping'
                },
                {
                    title: '学科关系',
                    key: 'course_mapping'
                }
            ],
    teacher_import : [
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
                    ],
    score : [
                        {
                            type: 'selection',
                            width: 60,
                            align: 'center',
                        },
                        {
                            title : '#',
                            key : 'id',
                            width: 80,
                            align: 'center',
                        },
                        {
                            title: '导入方式',
                            key: 'file_name_new',
                            sortable: true
                        },
                        {
                            title: '创建人',
                            key: 'name',
                            width: 200,
                            align: 'center',
                        },
                        {
                            title: '入学时间',
                            key: 'year',
                            width: 160,
                            align: 'center',
                        },
                        {
                            title: '学期',
                            width: 140,
                            key: 'semester',
                            align: 'center',
                        },
                        {
                            title: '考试时间',
                            width: 140,
                            key: 'examTime',
                            align: 'center',
                        },
                        {
                            title : '创建时间',
                            key : 'create_time',
                            width: 160,
                            align: 'center',
                            sortable: true
                        }
                ],
    score_import : [
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
                ],
            class : [
                        {
                            type: 'index',
                            width: 60,
                            align: 'center'
                        },
                        {
                            title: '班级名称',
                            key: 'name'
                        },
                        {
                            title: '班级人数',
                            key: 'student_cnt'
                        },
                        {
                            title: '班主任',
                            key: 'teachers'
                        },
                        {
                            title: '教室',
                            key: 'class_room'
                        }
                    ],
            course : [
                        {
                            type: 'index',
                            width: 60,
                            align: 'center'
                        },
                        {
                            title: '课程码',
                            key: 'code'
                        },
                        {
                            title: '课程名',
                            key: 'name'
                        },
                        {
                            title: '课程类别',
                            key: 'type'
                        },
                        {
                            title: '学分',
                            key: 'credit'
                        },
                        {
                            title: '授课方式',
                            key: 'teaching_method'
                        },
                        {
                            title: '考核方式',
                            key: 'assessment_method'
                        },
                        {
                            title: '学期',
                            key: 'study_section'
                        },
                        {
                            title: '总分',
                            key: 'full_marks'
                        }
                    ],
}

export default table_columns