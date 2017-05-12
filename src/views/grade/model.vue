<template>   
    <div class="layout-main">
         <Form :label-width="80" inline id="form">
            <div class="layout-content">
            <Row type="flex">
                <i-col span="18"></i-col>
                <i-col span="6">
                    <div class="float_right">
                        <event_button @click="save" type="info" load="true" icon="checkmark-round">保存</event_button>
                        <back></back>
                    </div>
                </i-col>
            </Row>
            <div class="line"><h3>基础设置</h3></div>
            <Row type="flex" v-if="msg_error.length > 0">
                <i-col span="24">
                    <Alert type="error" width="100%">
                        <span style="color:#ff0000">验证提醒</span>
                        <span slot="desc" v-html="msg_error"></span>
                    </Alert>
                </i-col>
            </Row>
            <Row type="flex">
                <i-col>
                    <Form-item label="所在校区">
                        <drop_school_district ref="school_district" @handle_school_district_change="handle_school_district_change"></drop_school_district>
                    </Form-item>
                    <Form-item label="所在学年">
                        <Select style="width:200px" v-model="info.name">
                            <Option v-for="item in year_list" :value="item.id" :key="item">{{ item.name }}</Option>
                        </Select>
                    </Form-item>
                    <Form-item label="年级名称">
                        <Select style="width:200px" v-model="info.grade_name">
                            <Option v-for="item in grade_list" :value="item.name" :key="item">{{ item.name }}</Option>
                        </Select>
                    </Form-item>
                </i-col>
            </Row>
            <div class="line"><h3>编制设置</h3></div>
            <Row type="flex">
                <i-col>
                    <Form-item label="规定学制">
                        <Select style="width:200px" v-model="info.school_year">
                            <Option v-for="item in xyear_list" :value="item.id" :key="item">{{ item.name }}</Option>
                        </Select>
                    </Form-item>
                    <Form-item label="毕业学历">
                        <Select style="width:200px" v-model="info.graduation_diploma">
                            <Option v-for="item in graduation_list" :value="item.name" :key="item">{{ item.name }}</Option>
                        </Select>
                    </Form-item>
                    <Form-item label="学期总数">
                        <Select style="width:200px" v-model="info.total_semester">
                            <Option v-for="item in semester_list" :value="item.id" :key="item">{{ item.name }}</Option>
                        </Select>
                    </Form-item>
                </i-col>
            </Row>
            <div class="line"><h3>其他</h3></div>
            <Row type="flex">
                <i-col>
                    <Form-item label="入学日期">
                        <Date-picker format="yyyy-MM-dd" type="date" placeholder="选择日期" style="width: 200px" @on-change="date_change" v-model="info.entrance"></Date-picker>
                    </Form-item>
                    <Form-item label="负责人">
                        <input placeholder="请输入..." class="ivu-input" name="head_name" v-model="info.head_name">
                    </Form-item>
                    <Form-item label="联系方式">
                        <Input placeholder="请输入..." name="tel" v-model="info.tel"></Input>
                    </Form-item>
                </i-col>
            </Row>
            </div>
            <input type="hidden" name="id" :value="query.id" v-if="query">
            <input type="hidden" name="school_id" :value="info.school_district[0]">
            <input type="hidden" name="school_district" :value="info.school_district[1]" v-bt-validator:rules="['required']" empty_err="所在校区">
            <input type="hidden" name="name" :value="info.name" v-bt-validator:rules="['required']" empty_err="学年">
            <input type="hidden" name="grade_name" :value="info.grade_name" v-bt-validator:rules="['required']" empty_err="年级名称">
            <input type="hidden" name="school_year" :value="info.school_year" v-bt-validator:rules="['required']" empty_err="规定学制">
            <input type="hidden" name="graduation_diploma" :value="info.graduation_diploma" v-bt-validator:rules="['required']" empty_err="学历">
            <input type="hidden" name="total_semester" :value="info.total_semester" v-bt-validator:rules="['required']" empty_err="学期总数">
            <input type="hidden" name="entrance" :value="info.entrance" v-bt-validator:rules="['required']" empty_err="入学日期">
        </Form>
    </div>
</template>
<script type="text/javascript">
    import setting from '../../config/setting';    
    import api_grade from '../../config/api/grade'
    import back from '../../components/public/bt_back.vue'
    import drop_school_district from '../../components/drop_school_district.vue'
    import event_button from '../../components/public/bt_save.vue'

    export default {
        data(){
            return {
                year_list : [{id : '2012',name : '2012级'},{id : '2013',name : '2013级'},{id : '2014',name : '2014级'},{id : '2015',name : '2015级'},{id : '2016',name : '2016级'},{id : '2017',name : '2017级'}],
                grade_list : [{id:10,name:'高一'},{id:11,name:'高二'},{id:12,name:'高三'},{id:7,name:'初一'},{id:8,name:'初二'},{id:9,name:'初三'},{id:1,name:'小学一年级'},{id:2,name:'小学二年级'},{id:3,name:'小学三年级'},{id:4,name:'小学四年级'},{id:5,name:'小学五年级'},{id:6,name:'小学六年级'}],
                xyear_list : [{id:3,name:'3年'},{id:6,name:'6年'}],
                graduation_list : [{name:'小学文凭'},{name:'初中文凭'},{name:'高中文凭'}],
                semester_list : [{"id":6,"name":"6学期"},{"id":12,"name":"12学期"}],
                msg_error : [],
                info : { school_district : ['',''],name:null,grade_name:null,school_year:null,graduation_diploma:null,total_semester:null,entrance:null,head_name:null},
                query : null,
            }
        },
        created(){
            this._init();
            window.config.active = 'grade';
            window.config.active_name = '年级管理';
        },
        methods : {
            _init : function(){
                // 新增 or 更新
                if(this.$route.query.hasOwnProperty('id')){
                    this.query = this.$route.query
                    this.update(this.query.id);
                }
            },
            // 校区回调
            handle_school_district_change : function(value){
                this.info.school_district = value;
            },
            clear : function(){
                __.byId('form').reset();
            },
            update : function(id){
                api_grade.get_grade(id,result =>{
                    this.info = result.data;
                    this.info.school_district = [this.info.school_id,this.info.school_district]
                    this.info.school_year = parseInt(this.info.school_year);
                    this.info.total_semester = parseInt(this.info.total_semester);

                    this.$refs.school_district.set_value(this.info.school_district);
                })
            },
            date_change : function(value){
                this.info.entrance = value
            },
            // 保存或更新
            save : function(){
                let rules = {
                    school_district : this.info.school_district[1],
                    name : this.info.name,
                    grade_name : this.info.grade_name,
                    school_year : this.info.school_year,
                    graduation_diploma : this.info.graduation_diploma,
                    total_semester : this.info.total_semester,
                    entrance : this.info.entrance
                };
                this.msg_error = this.validator(this.$data,rules);
                log(rules);
                if(this.is_validator()){
                    api_grade.save(result =>{
                        result = JSON.parse(result)
                        if(result.id > 0){
                            __.go_success(this);
                        }
                    })
                };
            },

        },
        mounted(){
        },
        components : { back,drop_school_district,event_button },
    }
</script>