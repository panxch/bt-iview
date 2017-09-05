<template>
    <Row>
        <i-col span="12">
            <Input v-model="keyword" :placeholder="placeholder" style="width: 100%"></Input>
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
        props : ['placeholder'],
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