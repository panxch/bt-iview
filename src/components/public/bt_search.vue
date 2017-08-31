<template>
    <Row>
        <i-col span="12">
            <Input v-model="keyword" placeholder="请输入姓名..." style="width: 100%"></Input>
        </i-col>
        <i-col span="12">
            <Button type="primary" icon="ios-search" @click="search_handle">搜索</Button>
        </i-col>
    </Row>
</template>
<script type="text/javascript">
	export default {
        data(){
            return {
                keyword : window.config.keyword
            }
        },
		methods : {
			search_handle : function(){
                //if(! this.worlds.is_empty()){
                window.config.keyword = this.keyword
                this.$emit('on-search',this.keyword); 
                //}
			}
		}
	}
</script>