<template>
		<Select placeholder="请选择" v-model="value" style="width:200px" @on-change="school_change" filterable>
            <Option :key="info.id" :value="info.id" :label="info.name" v-for="info in school_list">
	            <span>{{info.name}}</span>
	            <span style="float:right;color:#ccc">#{{info.id}}</span>
	        </Option>
        </Select>
</template>
<script type="text/javascript">
	import api from '../config/api/basics'
	export default {
		data() {
			return {
				school_list : [],
				grade_list : [],
				value : '',
			}
		},
		methods : {
			// 学校选择
            school_change : function(value){
            	window.config.last_school = (this._data.school_list.find((c)=>{
            		return c.id == value;
            	}));
                this.$emit('handle_school_change',value);
            },
            set_value : function(value){
            	this.value = value;
            },
		},
		 mounted(){
            __.loading();
            api.get_school((result)=>{
                this.school_list = JSON.parse(result);
                __.closeAll();
                if(window.config.last_school){
	            	this.school_list.unshift(window.config.last_school);
	            }
            });
        },
	}
</script>