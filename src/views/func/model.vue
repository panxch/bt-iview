<template>   
    <div class="layout-main">
         <Form :label-width="120" inline id="form">
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
                    <Form-item label="Name">
                        <input placeholder="请输入..." class="ivu-input" v-model="info.name" name="name" v-bt-validator:rules="['required']" empty_err="Name">
                    </Form-item>
                    <Form-item label="Url">
                        <input placeholder="请输入..." class="ivu-input" v-model="info.url" name="url" v-bt-validator:rules="['required']" empty_err="url">
                    </Form-item>
                    <Form-item label="Menu Key">
                        <input placeholder="请输入..." class="ivu-input" v-model="info.menu_key" name="menu_key" v-bt-validator:rules="['required']" empty_err="MenuKey">
                    </Form-item>
                </i-col>
            </Row>
            <Row type="flex">
                <i-col>
                    <Form-item label="Menu Label">
                        <input placeholder="请输入..." class="ivu-input" v-model="info.menu_label" name="menu_label" v-bt-validator:rules="['required']" empty_err="Menu Label">
                    </Form-item>
                    <Form-item label="Menu Level">
                        <input placeholder="请输入..." class="ivu-input" v-model="info.menu_level" name="menu_level" v-bt-validator:rules="['required']" empty_err="Menu Level">
                    </Form-item>
                    <Form-item label="Menu Parent">
                        <input placeholder="请输入..." class="ivu-input" v-model="info.menu_parent" name="menu_parent" v-bt-validator:rules="['required']" empty_err="Menu Parent">
                    </Form-item>
                </i-col>
            </Row>
            <Row type="flex">
                <i-col>
                    <Form-item label="Menu Group">
                        <input placeholder="请输入..." class="ivu-input" v-model="info.menu_group" name="menu_group" v-bt-validator:rules="['required']" empty_err="Menu Group">
                    </Form-item>
                    <Form-item label="Menu Order">
                        <input placeholder="请输入..." class="ivu-input" v-model="info.menu_order" name="menu_order" v-bt-validator:rules="['required']" empty_err="Menu Order">
                    </Form-item>
                    <Form-item label="Menu Icon">
                        <input placeholder="请输入..." class="ivu-input" v-model="info.icon" name="icon" v-bt-validator:rules="['required']" empty_err="Menu Icon">
                    </Form-item>
                </i-col>
            </Row>
            <Row type="flex">
                <i-col>
                    <Form-item label="Group Label">
                        <input placeholder="请输入..." class="ivu-input" v-model="info.group_label" name="group_label" v-bt-validator:rules="['required']" empty_err="Group Label">
                    </Form-item>
                    <Form-item label="Display">
                        <input placeholder="请输入..." class="ivu-input" v-model="info.display" name="display" v-bt-validator:rules="['required']" empty_err="Display">
                    </Form-item>
                    <Form-item label="Jw Display">
                        <input placeholder="请输入..." class="ivu-input" v-model="info.jw_display" name="jw_display" v-bt-validator:rules="['required']" empty_err="Jw Display">
                    </Form-item>
                </i-col>
            </Row>
             <Row type="flex">
                <i-col>
                    <Form-item label="Group Key">
                        <input placeholder="请输入..." class="ivu-input" v-model="info.group_key" name="group_key" v-bt-validator:rules="['required']" empty_err="Group Key">
                    </Form-item>
                    <Form-item label="Group Value">
                        <input placeholder="请输入..." class="ivu-input" v-model="info.group_val" name="group_val" v-bt-validator:rules="['required']" empty_err="Group Value">
                    </Form-item>
                </i-col>
            </Row>
             <Row>
                <Col class="col-my-width">
                    <Form-item label="说明">
                        <Input type="textarea" placeholder="请输入..." style="width:100%;" :value="info.description" name="description"></Input>
                    </Form-item>
                </Col>
            </Row>
            </div>
            <input type="hidden" name="id" :value="query.id" v-if="query">
            
        </Form>
    </div>
</template>
<script type="text/javascript">
    import setting from '../../config/setting';    
    import api from '../../config/api/func'
    import back from '../../components/public/bt_back.vue'
    import drop_school_district from '../../components/drop_school_district.vue'
    import event_button from '../../components/public/bt_save.vue'

    export default {
        data(){
            return {
                msg_error : [],
                info : { },
                query : null,
            }
        },
        created(){
            this._init();
            window.config.active = 'func';
            window.config.active_name = '模块管理';
        },
        methods : {
            _init : function(){
                // 新增 or 更新
                if(this.$route.query.hasOwnProperty('id')){
                    this.query = this.$route.query
                    this.update(this.query.id);
                }
            },
            clear : function(){
                __.byId('form').reset();
            },
            update : function(id){
                api.get_func(id,result =>{
                    this.info = result.data;
                })
            },
            // 保存或更新
            save : function(){
                let rules = {
                    name : this.info.name,
                    url : this.info.url,
                    group_key : this.info.group_key,
                    group_val : this.info.group_val,
                    menu_level : this.info.menu_level,
                    menu_parent : this.info.menu_parent,
                    icon : this.info.icon
                };
                this.msg_error = this.validator(this.$data,rules);
                if(this.is_validator()){
                    api.save(result =>{
                        result = JSON.parse(result)
                        if(result.status){
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