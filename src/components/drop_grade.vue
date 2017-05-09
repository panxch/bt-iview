<template>
		<Select placeholder="请选择" style="width:200px" @on-change="grade_change" filterable v-model="value">
            <Option :value="info.id" :label="info.name + '/' + info.grade_name" v-for="info in grade_list">
	        </Option>
        </Select>
</template>
<script type="text/javascript">
	import api from '../config/api/basics'
	export default {
		data() {
			return {
				grade_list : [],
				value : '',
			}
		},
		methods : {
			// 年级选择
            grade_change : function(value){
                this.$emit('handle_grade_change',value);
            },
            data_bind : function(value){
            	 __.loading();
	            api.get_grade(value[0],value[1],(result)=>{
	                this.grade_list = result.data;
	                __.closeAll();
	            });
            },
            set_value : function(value){
            	this.value = value;
            },
		},
		 mounted(){
           
        },
	}
</script>