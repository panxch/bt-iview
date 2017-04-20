<template>
	 <Form-item label="学校">
        <Select placeholder="请选择" style="width:200px" @on-change="school_change">
            <Option :value="info.id" :label="info.name" v-for="info in school_list">
	            <span>{{info.name}}</span>
	            <span style="float:right;color:#ccc">#{{info.id}}</span>
	        </Option>

        </Select>
    </Form-item>
</template>
<script type="text/javascript">
	import api from '../config/api/basics'
	export default {
		data() {
			return {
				school_list : [],
				grade_list : [],
			}
		},
		methods : {
			// 学校选择
            school_change : function(value){
            	window.config.last_school = (this._data.school_list.find((c)=>{
            		return c.id == value;
            	}));
            	//log(window.config.last_school)
                this.$emit('handle_school_change',value);
            },
		},
		 mounted(){
            __.loading();
            api.get_school((result)=>{
                this.school_list = result.data;
                __.closeAll();
                if(window.config.last_school){
	            	this.school_list.unshift(window.config.last_school);
	            }
            });
        },
	}
</script>