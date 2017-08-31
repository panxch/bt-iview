<template>
		<Cascader :data="school_list" v-model="value" trigger="hover" @on-change="school_change" filterable></Cascader>
</template>
<script type="text/javascript">
	import api from '../config/api/school'
	export default {
		data() {
			return {
				school_list : [],
				value : [],
			}
		},
		methods : {
			// 学校选择
            school_change : function(value){
            	this.$emit('handle_school_district_change',value);
            },
            set_value : function(value){
            	this.value = value;
            }
		},
		mounted(){
            __.loading();
            api.get_school_district_union((result)=>{
                this.school_list = JSON.parse(result);
                __.closeAll();
            });
        },
	}
</script>