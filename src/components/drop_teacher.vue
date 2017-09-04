<template>
	<Select placeholder="请选择" style="width:200px" @on-change="teacher_change" filterable v-model="value" label-in-value>
        <Option :key="info.id" :value="info.id" :label="info.name + '/' + (info.gender == 1 ?'男' : '女') + '/' + info.username" v-for="info in teacher_list">
            <span>{{info.name}}/{{info.gender == 1 ?'男' : '女'}}/{{info.username}}</span>
            <span style="float:right;color:#ccc">#{{info.id}}</span>
        </Option>
    </Select>
</template>
<script type="text/javascript">
	import api from '../config/api/teacher'
	export default {
		data() {
			return {
				teacher_list : [],
				value : '',
			}
		},
		methods : {
			// 年级选择
            teacher_change : function(value){
                this.$emit('handle_teacher_change',value);
            },
            data_bind : function(value){
            	__.loading();
            	let param = {
            		page_size : 1000,
            		page_index : 1,
            		school_id : value.school_id,
            		school_district : value.school_district,
            	}
	            api.get_teacher_by_school_district(param,(result)=>{
	            	this.teacher_list = JSON.parse(result);
	                __.closeAll();
	            });
            },
            set_value(value){
            	this.value = value;
            },
		},
		 mounted(){
           
        },
	}
</script>