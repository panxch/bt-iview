<style type="text/css">
    .wrapper .ivu-tree ul li{margin:0;}
    .wrapper .ivu-checkbox-wrapper{margin: 0;}
    .wrapper .ivu-form-item-content{line-height: 25px;}
</style>
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
                    <Form-item label="所在学校">
                        <drop_school ref="drop_school" @handle_school_change="handle_school_change"></drop_school>
                    </Form-item>
                    <Form-item label="角色类别">
                        <Select placeholder="老师、学生、教务？" style="width:200px" v-model="info.type">
                            <Option :value="info.value" :label="info.label" v-for="info in type_list" :key="info.value">
                            </Option>
                        </Select>
                    </Form-item>
                    <Form-item label="角色名称">
                        <input placeholder="请输入..." class="ivu-input" v-model="info.name" name="name" v-bt-validator:rules="['required']" empty_err="角色名称">
                    </Form-item>
                </i-col>
            </Row>
            <Row>
                <Col class="col-my-width">
                    <Form-item label="角色说明">
                        <Input type="textarea" placeholder="请输入..." style="width:100%;" :value="info.description" name="description"></Input>
                    </Form-item>
                </Col>
            </Row>
            <div class="line"><h3>模块设置</h3></div>
            <Row type="flex">
                <Col>
                    <Form-item label="选择模块">
                        <Tree ref="tree" :data="tree_data" show-checkbox :multiple="false"></Tree>
                    </Form-item>
                </Col>
            </Row>
            </div>
            <input type="hidden" name="id" :value="query.id" v-if="query">
            <input type="hidden" name="school_id" :value="info.school_id" v-bt-validator:rules="['required']" empty_err="学校">
            <input type="hidden" name="type" :value="info.type" v-bt-validator:rules="['required']" empty_err="角色">
            <input type="hidden" name="func_id" :value="func_id">
        </Form>
    </div>
</template>
<script type="text/javascript">
    import api_role from '../../config/api/role'
    import back from '../../components/public/bt_back.vue'
    import event_button from '../../components/public/bt_save.vue'
    import drop_school from '../../components/drop_school.vue'

    export default {
        data(){
            return {
                msg_error : [],
                info : { school_id:'',type:'' },
                func_id : '',
                type_list : [{value:'1',label:'学生'},{value:'2',label:'教务'},{value:'3',label:'老师'}],
                query : null,
                tree_data: [],
            }
        },
        created(){
            this._init();
            window.config.active = 'role';
            window.config.active_name = '角色/功能管理';
        },
        methods : {
            _init : function(){
                // 新增 or 更新
                if(this.$route.query.hasOwnProperty('id')){
                    this.query = this.$route.query
                    this.update(this.query.id);
                }else{
                    this.tree_bind();
                }
            },
            // 校区回调
            handle_school_change : function(value){
                this.info.school_id = value;
            },            
            clear : function(){
                __.byId('form').reset();
            },
            update : function(id){
                api_role.get_role(id,result =>{
                    this.info = JSON.parse(result);
                    this.$refs.drop_school.set_value(this.info.school_id);
                    this.tree_bind();
                })
            },
            // 将已知选择的模块加入到选择项中
            tree_select : function(){
            //     let funcs_id = this.info.funcs.func_id.split(',');
            //     let _base = this.tree_data;
            //         ~function(tree_data){
            //             function get_parent(tree_data,_self){
            //                 let p = _self;
            //                 tree_data.forEach((c,i)=>{
            //                     if(funcs_id.indexOf(c.id) > -1){
            //                         c.checked = true;
            //                         _self.checked = true;
            //                         let base = __.info(_base,'id',_self.menu_parent);
            //                         if(base){
            //                             base.checked = true;
            //                         }
            //                     }
            //                     if(c.children){
            //                         if(c.children.length > 0){
            //                             get_parent(c.children,c);
            //                         }
            //                     }
            //                 })
            //             }
            //             get_parent(tree_data,this);
            //         }.bind(this)(this.tree_data);
            },
            tree_bind : function(){
                api_role.get_funcs(this.info.funcs || null,result =>{
                    result = JSON.parse(result);
                    this.tree_data = result;
                })
            },
            // 保存或更新
            save : function(){
                let funcs = this.$refs.tree.getCheckedNodes();
                
                let funcs_list = function(){
                    let funcs_array = [];
                    function get_parent(funcs){
                        funcs.forEach((c,i)=>{
                            funcs_array.push(c.id);
                        })
                    };
                   get_parent(funcs);
                   return funcs_array;
                 }.bind(this);
                this.func_id = funcs_list().join();
                
                let rules = {
                    name : this.info.name,
                    school_id : this.info.school_id,
                    type : this.info.type
                };
                this.msg_error = this.validator(this.$data,rules);
                if(this.is_validator()){
                    setTimeout(()=>{
                        api_role.save(result =>{
                            result = JSON.parse(result)
                            if(result.status){
                                __.go_success(this);
                            }
                        })
                    },100)
                };
            },

        },
        mounted(){
        },
        components : { back,event_button,drop_school },
    }
</script>