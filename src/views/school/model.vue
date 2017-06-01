<template>   
    <div class="layout-main">
         <Form :label-width="80" inline id="form">
            <div class="layout-content">
            <Row type="flex">
                <i-col span="18"></i-col>
                <i-col span="6">
                    <div class="float_right">
                        <save @click="save" icon="checkmark-round" type="info">保存</save>
                        <back></back>
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
                    <Form-item label="学校名称">
                        <input placeholder="请输入..." class="ivu-input" v-model="school_info.name" name="name" v-bt-validator:rules="['required']" empty_err="学校名称">
                    </Form-item>
                    <Form-item label="学校类别">
                        <Select class="ivu-select-options" name="school_type" v-model="school_info.school_type" v-bt-validator:rules="['required']" empty_err="学校类别">
                            <Option :value="info.id" v-for="info in school_type_list" :key="info.id">{{info.name}}</Option>
                        </Select>
                    </Form-item>
                    <Form-item label="所在地区">
                        <Cascader :data="city_list" v-model="school_info.location" @on-change="location_change" name="city" trigger="hover" empty_err="所在地区" v-bt-validator:rules="['required']" placeholder="请选择学校所在地区"></Cascader>
                    </Form-item>
                </i-col>
            </Row>
            <div class="line"></div>
            <Row type="flex">
                <i-col>
                    <Form-item label="学校地址">
                        <input placeholder="请输入..." class="ivu-input" v-model="school_info.address" name="address" v-bt-validator:rules="['required']" empty_err="学校地址">
                    </Form-item>
                    <Form-item label="联系人">
                        <input placeholder="请输入..." class="ivu-input" v-model="school_info.principal" name="principal" v-bt-validator:rules="['required']" empty_err="联系人">
                    </Form-item>
                    <Form-item label="联系电话">
                        <input placeholder="请输入手机号..." class="ivu-input" v-model="school_info.mobile" name="mobile" v-bt-validator:rules="['required']" empty_err="联系电话" err="电话号码格式错误">
                    </Form-item>
                </i-col>
            </Row>
            <div v-if="query">
                <div class="line"><h3>校区信息</h3></div>
                <Row type="flex">
                    <Col>
                        <Form-item label="校区名称">
                        <input placeholder="请输入..." class="ivu-input" v-model="school_district_name">
                        </Form-item>
                        <Form-item label="负责人">
                        <input placeholder="请输入负责人姓名..." class="ivu-input" v-model="school_district_official">
                        </Form-item>
                        <Form-item label="联系方式">
                        <input placeholder="请输入联系电话..." class="ivu-input" v-model="school_district_tel">
                        </Form-item>
                    </Col>
                    <Col>
                        <Button icon="plus" @click="add_school_district">添加</Button>
                    </Col>
                </Row>
                <Row type="flex">
                    <Col>
                    <Form-item label="校区列表">
                        <ol class="school_district_list">
                            <li v-for="info in school_district_list">
                                {{info.campus_name}}/{{info.official}}/{{info.tel}}
                            </li>
                        </ol>
                        </Form-item>
                    </Col>
                </Row>
            </div>
            </div>
            <input type="hidden" name="school_type" :value="school_info.school_type">
            <input type="hidden" name="location" :value="school_info.location[1]">
            <input type="hidden" name="id" :value="query.id" v-if="query">
            <input type="hidden" name="school_district" :value="JSON.stringify(school_district_list)">
        </Form>
    </div>
</template>
<script type="text/javascript">
    import setting from '../../config/setting';    
    import api_school from '../../config/api/school'
    import back from '../../components/public/bt_back.vue'
    import save from '../../components/public/bt_save.vue'
    export default {
        data(){
            return {
                school_type_list : [{id : '1',name : '小学'},{id : 2,name : '初中'},{id : 3,name : '高中'}],
                msg_error : [],
                city_list : [],
                school_district_list : [],
                school_district_name : '',school_district_official : '',school_district_tel :'',
                school_info : { school_type : '',location : ['','']},
                query : null,
            }
        },
        created(){
            this._init();
            this.data_bind();
            window.config.active = 'school';
            window.config.active_name = '学校管理';
        },
        methods : {
            _init : function(){
                // 新增 or 更新
                if(this.$route.query.hasOwnProperty('id')){
                    this.query = this.$route.query
                    this.update(this.query.id);
                }
            },
            data_bind : function(){
                //city_list
                api_school.get_school_group((result)=>{
                    this.city_list = eval(result);
                });
            },
            clear : function(){
                __.byId('form').reset();
            },
            location_change : function(value){
                this.school_info.location = value;
            },
            update : function(id){
                api_school.get_school_by_id(id,(result)=>{
                    let info = result.data;
                    bt.log(info);
                    this.school_info = info;
                    this.school_info.school_type = parseInt(info.school_type);
                    if(this.school_info.location && this.school_info.location.split(',').length == 1){
                        this.school_info.location = ['',this.school_info.location];
                    }else{
                        this.school_info.location = ['',''];
                    }
                });
                api_school.get_school_district(id,(result)=>{
                    this.school_district_list = result.data;
                })
            },
            save : function(){
                let rules = {
                    name : this.school_info.name,
                    address : this.school_info.address,
                    principal : this.school_info.principal,
                    mobile : this.school_info.mobile,
                    school_type : this.school_info.school_type,
                    city : this.school_info.location[1],
                };
                this.msg_error = this.validator(this.$data,rules);
                if(this.is_validator()){
                    api_school.save((result)=>{
                        result = JSON.parse(result);
                        if(result.id){
                            __.go_success(this);
                        }
                    })
                }
            },
            // 添加校区
            add_school_district : function(){
                if(__.check_string(this.school_district_name.toString())){
                    let info = { campus_name : this.school_district_name,official : this.school_district_official,tel : this.school_district_tel};
                    this.school_district_list.push(info);
                    this.school_district_name = this.school_district_official = this.school_district_tel = null;
                }
            },
        },
        mounted(){
        },
        components : { back,save},
    }
</script>