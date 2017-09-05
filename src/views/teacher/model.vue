<style type="text/css">
    .col-my-width{width:100%;}
    .col-my-width .ivu-form-item{width:100%;}
    .col-my-width .ivu-form-item .ivu-input{width:100%;}
    .ivu-form-item .ivu-radio-group{display: block;width:200px;}
</style>
<template>   
    <div class="layout-main">
         <Form :label-width="100" inline id="form">
            <div class="layout-content">
            <Row type="flex">
                <Col span="18"></Col>
                <Col span="6">
                    <div class="float_right">
                        <event_button @click="save" type="info" load="true" icon="checkmark-round">保存</event_button>
                        <back></back>
                    </div>
                </Col>
            </Row>
            <div class="line" v-if="msg_error.length > 0"></div>
            <Row type="flex" v-if="msg_error.length > 0">
                <Col span="24">
                    <Alert type="error" width="100%">
                        <span style="color:#ff0000">验证提醒</span>
                        <span slot="desc" v-html="msg_error"></span>
                    </Alert>
                </Col>
            </Row>
            <div class="line"><h3>角色设置</h3></div>
            <Row type="flex">
                <Col>
                    <Form-item label="所属校区">
                        <drop_school_district ref="school_district" @handle_school_district_change="handle_school_district_change"></drop_school_district>
                    </Form-item>
                    <Form-item label="教师角色">
                        <Select style="width:200px" v-model="role_value" v-bt-validator:rules="['required']" empty_err="教师角色">
                            <Option v-for="item in role_list" :value="item.id" :key="item">{{ item.name }}</Option>
                        </Select>
                    </Form-item>
                    <Form-item label="登陆帐号" v-if="show_username">
                        <input placeholder="请输入..." class="ivu-input" :value="info.m_username" name="username" v-bt-validator:rules="['required']" empty_err="登录帐号">
                    </Form-item>
                </Col>
            </Row>
            <div class="line"><h3>基础设置</h3></div>
            <Row type="flex">
                <Col>
                    <Form-item label="教师姓名">
                        <input placeholder="请输入..." class="ivu-input" v-model="info.name" name="name" v-bt-validator:rules="['required','chinese']" empty_err="教师姓名" err="教师姓名必须为中文"><span class="red">*</span>
                    </Form-item>
                    <Form-item label="教师性别">
                        <Radio-group v-model="info.gender" type="button" size="small">
                            <Radio label="男"></Radio>
                            <Radio label="女"></Radio>
                        </Radio-group>
                    </Form-item>
                    <Form-item label="联系手机">
                        <input placeholder="请输入手机号..." class="ivu-input" v-model="info.tel" name="tel">
                    </Form-item>
                </Col>
            </Row>
            <Row type="flex">
                <Col>
                    <Form-item label="办公电话">
                        <input placeholder="请输入..." class="ivu-input" v-model="info.phone" name="phone"><span class="red"></span>
                    </Form-item>
                    <Form-item label="电子邮箱">
                        <input placeholder="请输入..." class="ivu-input" v-model="info.mailbox" name="mailbox">
                    </Form-item>
                    <Form-item label="身份证号">
                        <input placeholder="请输入..." class="ivu-input" v-model="info.card_id" name="card_id">
                    </Form-item>
                </Col>
            </Row>
            <div class="line"><h3>编制设置</h3></div>
            <Row type="flex">
                <Col span="7">
                    <Form-item label="所带班级">
                         <Cascader :data="class_list" @on-change="class_change" trigger="hover" :closeer="true" :auto-close="false"></Cascader>
                    </Form-item>
                </Col>
                <Col span="17">
                    <Tag closable v-for="item in tag_class_list" :key="item" :name="item.name" @on-close="handle_tag_close($event,item.name,'tag_class_list')">{{item.name}}</Tag>
                </Col>
            </Row>
            <Row type="flex">
                <Col span="7">
                    <Form-item label="所带学科">
                         <Cascader :data="course_list" @on-change="course_change" trigger="hover" :closeer="true" :auto-close="false"></Cascader>
                    </Form-item>
                </Col>
                <Col span="17">
                    <Tag closable v-for="item in tag_course_list" :key="item" :name="item.name" @on-close="handle_tag_close($event,item.name,'tag_course_list')">{{item.name}}</Tag>
                </Col>
            </Row>
            <div class="line"><h3>导师设置</h3></div>
            <Row type="flex">
                <Col>
                    <Form-item label="是否导师">
                        <i-switch v-model="info.is_assist">
                            <span slot="open">是</span>
                            <span slot="close">否</span>
                        </i-switch>
                    </Form-item>
                </Col>
            </Row>
            <Row type="flex">
                <Col class="col-my-width">
                    <Form-item label="导师简介">
                        <Input type="textarea" placeholder="请输入..." style="width:100%;" v-model="info.assist_introduction" name="assist_introduction"></Input>
                    </Form-item>
                </Col>
            </Row>
            </div>
            <input type="hidden" name="id" :value="query.id" v-if="query">
            <input type="hidden" name="school_id" :value="info.school_id">
            <input type="hidden" name="school_district" :value="info.school_district" v-bt-validator:rules="['required']" empty_err="校区">
            <input type="hidden" name="is_assist" v-model="info.is_assist">
            <input type="hidden" name="type" :value="role_value" v-bt-validator:rules="['required']" empty_err="角色">
            <input type="hidden" name="class_ids" :value="rever_tag_class_list">
            <input type="hidden" name="subject_id" :value="rever_tag_course_list">
            <input type="hidden" name="gender" :value="info.gender == '女' ? 2 : 1">
            <input type="hidden" name="member_id" :value="info.member_id">
        </Form>
    </div>
</template>
<script type="text/javascript">
    import setting from '../../config/setting';    
    import api_teacher from '../../config/api/teacher'
    import api from '../../config/api/basics'
    import back from '../../components/public/bt_back.vue'
    import event_button from '../../components/public/bt_save.vue'
    import drop_school_district from '../../components/drop_school_district.vue'
    export default {
        data(){
            return {
                role_list : [],
                class_list : [],
                tag_class_list : [],
                m_class : [],
                msg_error : [],
                course_list : [],
                tag_course_list : [],
                info : { school_district : ['',''],role_id : 0,m_username : ''},
                role_value : '',
                query : null,
            }
        },
        created(){
            this._init();
            window.config.active = 'teacher';
            window.config.active_name = '教师管理';
        },
        methods : {
            _init : function(){
                // 新增 or 更新
                if(this.$route.query.hasOwnProperty('id')){
                    this.query = this.$route.query
                    this.update(this.query.id);
                }
                
            },
            role_bind : function(value){
                api.get_role(value,result =>{
                    let list = result.data;
                    this.role_list = list.filter((c,i)=>{
                        if(parseInt(c.type) == 3 || parseInt(c.type) == 2)return true;
                    });
                })
            },
            // school change comeback
            handle_school_district_change : function(value){
                this.info.school_id = value[0];
                this.info.school_district = value[1];
                let school_district = {school_id : this.info.school_id ,school_district : this.info.school_district};

                this.class_bind(school_district);
                this.course_bind(school_district);
            },
            course_bind : function(info){
                api.get_grade_course_union(info.school_id,info.school_district,(result)=>{
                    this.course_list = result.data;
                });
            },
            course_show_bind : function(info){
                var param = {ids : JSON.stringify(info.subject_id)};
                api.get_grade_course_union_by_ids(param,result=>{
                    result = JSON.parse(result);
                    this.tag_course_list = result;
                })
            },
            class_bind : function(info){
                api.get_grade_class_union(info.school_id,info.school_district,(result)=>{
                    this.class_list = result.data;
                });
            },
            class_show_bind : function(info){
                var param = {ids : JSON.stringify(info.class_ids)};
                api.get_grade_class_union_by_ids(param,result=>{
                    result = JSON.parse(result);
                    this.tag_class_list = result;
                })
            },
            course_change : function(value,data){
                if( !this.tag_course_list.find(info=>{return info.id == data[1].value}) ){
                    this.tag_course_list.push({name : data[0].label + '/' + data[1].label , id : data[1].value});
                }
            }, 
            class_change : function(value,data){
                if( !this.tag_class_list.find(info=>{return info.id == data[1].value}) ){
                    this.tag_class_list.push({name : data[0].label + '/' + data[1].label , id : data[1].value});
                }
            },
            // 关闭Tag
            handle_tag_close : function(event, name,object){
                let list = eval('this.' + object);
                var index = (function(tags){
                    let j = null;
                    var t = tags.find((c,i)=>{
                        if(c.name == name){
                            j = i;
                            return false;
                        }
                    });
                    return j;
                })(list);
                list.splice(index, 1);
            },
            clear : function(){
                __.byId('form').reset();
            },
            update : function(id){
                api_teacher.get_teacher(id,(result)=>{
                    let info = this.info = result.data;
                    this.info.gender = parseInt(info.gender) ==  1 ? '男' : '女';
                    this.info.is_assist = parseInt(info.is_assist) > 0 ? true : false;
                    this.role_value = this.info.role_id = info.type.split(',')[1];

                    this.role_bind(info.school_id);
                    this.class_bind(info);
                    this.class_show_bind(info);
                    this.course_bind(info);
                    this.course_show_bind(info);
                    this.$refs.school_district.set_value([info.school_id,info.school_district])
                })
            },
            save : function(){
                let rules = {
                    name : this.info.name,
                    type : this.role_value,
                    school_district : this.info.school_district
                };
                this.msg_error = this.validator(this.$data,rules);
                if(this.is_validator()){
                    api_teacher.save(result=>{
                        result = JSON.parse(result);
                        if(result.status == -1){
                            this.$Notice.error({title: '消息',desc: `${result.username}用户帐号已经存在`});
                        }else{
                            __.go_success(this);
                        }
                    })
                }
            }
        },
        // 计算器
        computed : {
            rever_tag_class_list : function(){
                return this.tag_class_list._join('id');
            },
            rever_tag_course_list : function(){
                return this.tag_course_list._join('id');  
            },
            show_username : function(){
                return this.info.m_username.indexOf('copy') > -1 ? true : false;
            }
        },
        mounted(){
            
        },
        components : { back ,event_button,drop_school_district },
    }
</script>