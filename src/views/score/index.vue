<template>
    <div class="layout-main">
        <div class="layout-content">
            <Alert>成绩管理
                    <template slot="desc">消息提示的描述文案消息提示的描述文案消息提示的描述文案消息提示的描述文案消息提示的描述文案</template>
            </Alert>
            <Row type="flex">
                <i-col span="20"></i-col>
                <i-col span="1"></i-col>
                <i-col span="3">
                    <div class="float_right">
                        <Button type="success"><router-link to="/score/import">导入</router-link></Button>
                    </div>
                </i-col>
            </Row>
        </div>
    </div>
</template>
<script type="text/javascript">
    export default {
        data(){
            return {
                
            }
        },
        created(){
            window.config.active = 'score';
            window.config.active_name = '成绩管理';
        },
        methods :{
            
        },
        mounted(){
        },
    }
</script>