<template>   
    <div class="layout-main">
        <div class="layout-content">
            <Row type="flex">
                        <i-col span="20"></i-col>
                        <i-col span="1"></i-col>
                        <i-col span="3">
                            <div class="float_right">
                                <Button type="info" @click="save">保存</Button>
                            </div>
                        </i-col>
            </Row>
            <div class="line"></div>
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
                    <Form :label-width="80" inline>
                        <Form-item label="学校名称">
                            <input placeholder="请输入..." class="ivu-input" v-model="m_name" name="name" v-bt-validator:rules="['required']" empty_err="学校名称">

                        </Form-item>
                        <Form-item label="学校类别">
                            <select class="ivu-select-options" name="school_type" v-model="m_school_type" v-bt-validator:rules="['required']" empty_err="学校类别">
                                <option :value="info.id" v-for="info in school_type_list">{{info.name}}</option>
                            </select>
                        </Form-item>
                    </Form>
                </i-col>
            </Row>
            <div class="line"></div>
            <Row type="flex">
                <i-col>
                    <Form :label-width="80" inline>
                        <Form-item label="学校地址">
                            <input placeholder="请输入..." class="ivu-input" v-model="m_address" name="address" v-bt-validator:rules="['required']" empty_err="学校地址">
                        </Form-item>
                        <Form-item label="联系人">
                            <input placeholder="请输入..." class="ivu-input" v-model="m_principal" name="principal" v-bt-validator:rules="['required']" empty_err="联系人">
                        </Form-item>
                        <Form-item label="联系电话">
                            <input placeholder="请输入..." class="ivu-input" v-model="m_mobile" name="mobile" v-bt-validator:rules="['required','telphone']" empty_err="联系电话" err="电话号码格式错误">
                        </Form-item>
                    </Form>
                </i-col>
            </Row>
        </div>
    </div>
</template>
<script type="text/javascript">
    import setting from '../../config/setting';    
    import api_school from '../../config/api/school'
    export default {
        data(){
            return {
                school_type_list : [{id : '1',name : '小学'},{id : 2,name : '初中'},{id : 3,name : '高中'}],
                msg_error : [],
                m_name : '',m_address : '',m_principal : '',m_mobile : '',m_school_type : ''
            }
        },
        created(){
            this._init();
            window.config.active = 'school';
            window.config.active_name = '添加学校';
        },
        methods : {
            _init : function(){
            },
            save : function(){
                this.msg_error = this.validator(this.$data);
            },
        },
        mounted(){
        },
        components : {  },
    }
</script>