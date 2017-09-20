<template>
		<Select placeholder="请选择" style="width:200px" @on-change="room_change" filterable v-model="value">
            <Option  :key="info.id" :value="info.id" :label="'#' + info.id + '/' + info.name" v-for="info in room_list">
	        </Option>
        </Select>
</template>
<script type="text/javascript">
	import api from '../config/api/room'
	export default {
		data() {
			return {
				room_list : [],
				value : '',
			}
		},
		methods : {
			// 年级选择
            room_change : function(value){
                this.$emit('handle_room_change',value);
            },
            data_bind : function(value){
            	 __.loading();
	            api.get_room_by_school_district(value[0],value[1],(result)=>{
	                this.room_list = result.data;
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