<template>
		<Cascader :data="class_list" ref="cascader_class" v-model="value" trigger="hover" @on-change="class_change"></Cascader>
</template>
<script type="text/javascript">
	import api from '../config/api/basics'
	export default {
		data() {
			return {
				class_list : [],
				value : [],
			}
		},
		methods : {
			// 学校选择
            class_change : function(value){
            	this.$emit('handle_grade_class_change',value);
            },
            // 设置默认选择值
            set_value : function(value){
            	this.value = value;
            	//this.$refs.cascader_class.toggleOpen();
            },
            // 初始绑定
            bind : function(school_id,district_id){
            	api.get_grade_class_union(school_id,district_id,result=>{
                    this.class_list = result.data;
                })
            },
		}
	}
</script>