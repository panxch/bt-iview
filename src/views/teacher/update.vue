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
                <i-col span="20"></i-col>
                <i-col span="1"></i-col>
                <i-col span="3">
                    <div class="float_right">
                        <Button type="info" @click="save">保存</Button>
                        <back></back>
                    </div>
                </i-col>
            </Row>
            <div class="line" v-if="msg_error.length > 0"></div>
            <Row type="flex" v-if="msg_error.length > 0">
                <i-col span="24">
                    <Alert type="error" width="100%">
                        <span style="color:#ff0000">验证提醒</span>
                        <span slot="desc" v-html="msg_error"></span>
                    </Alert>
                </i-col>
            </Row>
            <div class="line"><h3>角色信息</h3></div>
            <Row type="flex">
                <i-col>
                    <Form-item label="教师角色">
                        <Select style="width:200px" name="role_select" v-model="m_role_select" v-bt-validator:rules="['required']" empty_err="教师角色">
                            <Option v-for="item in role_list" :value="item.id" :key="item">{{ item.name }}</Option>
                        </Select>
                    </Form-item>
                </i-col>
            </Row>
            <div class="line"><h3>基础信息</h3></div>
            <Row type="flex">
                <i-col>
                    <Form-item label="教师姓名">
                        <input placeholder="请输入..." class="ivu-input" v-model="m_name" name="name" v-bt-validator:rules="['required']" empty_err="教师姓名">
                    </Form-item>
                    <Form-item label="教师性别">
                        <Radio-group v-model="m_gender" type="button" size="small">
                            <Radio label="男"></Radio>
                            <Radio label="女"></Radio>
                        </Radio-group>
                    </Form-item>
                    <Form-item label="联系手机">
                        <input placeholder="请输入手机号..." class="ivu-input" v-model="m_tel" name="tel">
                    </Form-item>
                </i-col>
            </Row>
            <Row type="flex">
                <i-col>
                    <Form-item label="办公电话">
                        <input placeholder="请输入..." class="ivu-input" v-model="m_phone" name="phone">
                    </Form-item>
                    <Form-item label="电子邮箱">
                        <input placeholder="请输入..." class="ivu-input" v-model="m_mailbox" name="mailbox">
                    </Form-item>
                    <Form-item label="身份证号">
                        <input placeholder="请输入..." class="ivu-input" v-model="m_card_id" name="card_id">
                    </Form-item>
                </i-col>
            </Row>
            <div class="line"><h3>导师设置</h3></div>
            <Row type="flex">
                <i-col>
                    <Form-item label="是否导师">
                        <i-switch v-model="m_is_assist">
                            <span slot="open">是</span>
                            <span slot="close">否</span>
                        </i-switch>
                    </Form-item>
                </i-col>
            </Row>
            <Row type="flex">
                <i-col class="col-my-width">
                    <Form-item label="导师简介">
                        <Input type="textarea" placeholder="请输入..." style="width:100%;" v-model="m_assist_introduction" name="assist_introduction"></Input>
                    </Form-item>
                </i-col>
            </Row>
            </div>
            <input type="hidden" name="id" :value="query.id" v-if="query">
            <input type="hidden" name="is_assist" v-model="m_is_assist">
            <input type="hidden" name="type" v-model="m_role_select">
        </Form>
    </div>
</template>
<script type="text/javascript">
    import setting from '../../config/setting';    
    import api_teacher from '../../config/api/teacher'
    import api from '../../config/api/basics'
    import back from '../../components/public/bt_back.vue'
    export default {
        data(){
            return {
                role_list : [],
                msg_error : [],
                m_name : '',m_gender : '',m_tel : '',m_mobile : '',m_phone : '',m_mailbox : '',m_card_id:'',m_is_assist:false,m_assist_introduction:'',m_role_select:'',
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
                        if(parseInt(c.type) == 3)return true;
                    });
                })
            },
            clear : function(){
                __.byId('form').reset();
            },
            update : function(id){
                api_teacher.get_teacher(id,(result)=>{
                    let info = result.data;
                    log(info);
                    this.m_name = info.name;
                    this.m_gender = parseInt(info.gender) ==  1 ? '男' : '女';
                    this.m_tel = info.tel;
                    this.m_phone = info.phone;
                    this.m_mailbox = info.mailbox;
                    this.m_card_id = info.card_id;
                    this.m_is_assist = parseInt(info.is_assist) > 0 ? true : false;
                    this.m_assist_introduction = info.assist_introduction;
                    this.m_role_select = info.type.split(',')[1];
                    this.role_bind(info.school_id);
                })
            },
            save : function(){
                this.msg_error = this.validator(this.$data);
                if(this.is_validator()){
                    api_teacher.save(result=>{
                        log(result);
                    })
                }
            }
        },
        mounted(){
        },
        components : { back },
    }
</script>