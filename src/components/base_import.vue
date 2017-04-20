<template>   
    <div class="layout-main">
        <div class="layout-content">
            <slot></slot>
            <div class="line"></div>
            <Row type="flex">
                <i-col>
                    <Form :label-width="80" inline>
                        <drop_school @handle_school_change="handle_school_change"></drop_school>
                        <Form-item label="年级">
                            <Select placeholder="请选择" style="width:200px" v-model="grade_value" @on-change="handle_grade_change">
                                <Option :value="info.id" v-for="info in grade_list">{{info.name}}/{{info.grade_name}}</Option>
                            </Select>
                        </Form-item>
                    </Form>
                </i-col>
            </Row>
            <div class="line"></div>
            <Tabs>
                <Tab-pane label="剪贴板导入" name="name1" icon="clipboard">
                    <div>
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
                    <div><Table border highlight-row :columns="table_columns" :data="table_data" v-if="table_data.length > 0" :height="table_height"></Table></div>
                </Tab-pane>
                <Tab-pane label="Excel导入" name="name2" icon="android-attach">
                    <div>
                        <Row type="flex">
                        <i-col span="23">
                             <Upload :action="api_url + 'api.php/basics/handle/up_grade_excel'" :on-success="success_event" :format="['xls','xlsx']" 
                             :on-format-error="handle_format_error" :max-size="2048" :on-exceeded-size="handle_maxize">
                                <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
                            </Upload>
                        </i-col>
                        <i-col span="1">
                            <div class="float_right">
                                <Button type="success" @click="import_excel" :disabled="excel_file == null">导入</Button>
                            </div>
                        </i-col>
                    </Row>
                    </div>
                </Tab-pane>
            </Tabs>
        </div>
    </div>
</template>
<script type="text/javascript">
    import setting from '../config/setting';
    import api from '../config/api/basics'
    import drop_school from '../components/drop_school.vue'
    var $ = window.$;

    export default {
        props : ['table_columns','fields_array'],
        data(){
            return {
                grade_list : [],
                grade_value_copy : this.grade_value,
                grade_value : null,
                table_data : [],
                excel_file : null,
                api_url : setting.get_api_url,
                table_height : $(window).height() - 310,
                school_id : null,
            }
        },
        created(){
            this._init();
            this.$emit('init')
        },
        methods : {
            instance : function(){
                const title = '对话框的标题';
                const content = '<p>一些对话框内容</p><p>一些对话框内容</p>';
                this.$Modal.info({title: title,content: content});
            },
            _init : function(){
                // 设置剪贴板侦听
                __.pasteListen((data)=>{
                    this.handle_paste(data + 'RR');
                })
            },
            // 完成粘贴板的匹配
            handle_paste : function(data){
                var line_match = data.match(/([\W\w]*?)RR/g);
                var result = __.pasteMatch(line_match,this.fields_array);
                if(result.length > 0){
                    result.forEach((c,i)=>{
                        this.table_data.push(c);
                        this.$emit('set_table_data',c);
                    })
                }else{
                    this.$Message.warning('格式检查失败~');
                }
            },
            // 年级选择
            handle_grade_change : function(value){
                this.$emit('set_grade_value',value);
            },
            // 学校选择回调
            handle_school_change : function(value){
                this.school_id = value;
                api.get_grade(value,(result)=>{
                    this.grade_list = result.data;
                    __.closeAll();
                });
            },
            // 清除粘贴数据
            clear : function(){
                this.table_data = [];
                this.$emit('set_table_data',null);
            },
            // 上传Excel附件
            success_event : function(response){
                this.excel_file = response.file;
                this.$emit('set_excel_file',this.excel_file);                
            },
            // 年级选择验证
            reg_grade_select : function(){
                if(! this.grade_value){
                    this.$Message.warning('请选择一个年级~');
                    return false;
                }
                return true;
            },
            // 导入成功后
            import_success : function(){
                this.$Notice.success({title: '消息',desc:'导入任务已经全部完成',duration : 10,top:500});
                this.clear();
                this.excel_file = null;
            },
            // 粘贴板导入
            import_paset : function(){
                if(this.reg_grade_select()){
                    this.$emit('import_paset');
                }
            },
            // Excel导入
            import_excel : function(){
                if(this.reg_grade_select()){
                    this.$emit('import_excel');
                }
            },
            // Excel文件选择类型判断
            handle_format_error : function(){
                this.$Message.warning('文件格式不正确，请上传xls或xlsx格式的图片~');
            },
            // Excel文件超出大小
            handle_maxize : function(){
                this.$Message.warning('文件太大，不能超过2M~');  
            },
        },
        mounted(){
        },
        components : { drop_school },
    }
</script>