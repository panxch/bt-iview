<template>
	 <Row type="flex">
        <i-col span="1">
        <h5>筛选：</h5>
        </i-col>
        <i-col span="5">
            <drop_school @handle_school_change="handle_school_change" ref="drp_school"></drop_school>
        </i-col>
        <i-col span="8">
            <Tag closable color="blue" @on-close="handle_tag_close" :key="tag" :name="tag.name" v-for="tag in tags">{{tag.name}}</Tag>
        </i-col>
        <i-col span="10">
            <div class="float_right">
                <event_button @click="go_update" type="info" icon="ios-checkmark-outline" v-if="update_url">修改</event_button>
                <event_button @click="go_add" type="success" icon="plus-round" v-if="add_url">添加</event_button>
                <event_button @click="go_import" type="success" icon="android-arrow-down" v-if="import_url">导入</event_button>
            </div>
        </i-col>
    </Row>
</template>
<script type="text/javascript">
	import drop_school from '../drop_school.vue'
	import event_button from '../public/bt_save.vue'

	export default {
		data(){
	        return {
	            tags : [],
	        }
	    },
	    props : ['add_url','update_url','import_url','selection'],
	    methods :{
	    	// 学校选择
            handle_school_change : function(value){
                if(this.tags.length <3){
                    let last = window.config.last_school;
                    this.tags.push({id : last.id,name : last.name});
                    // 页码 reset
                    this.$parent.page_count = 0;
                    this.$parent.set_page();
                }else{
                    this.$Message.warning('多学校筛选最多同时只能选择3所~');
                }
            },
            // 关闭Tag
            handle_tag_close : function(event, name){
                var index = (function(tags){
                    let j = null;
                    var t = tags.find((c,i)=>{
                        if(c.name == name){
                            j = i;
                            return false;
                        }
                    });
                    return j;
                })(this.tags);
                this.tags.splice(index, 1);

                // 页码 reset
                this.$parent.page_count = 0;
                this.$parent.set_page(1);
            },
            go_add : function(){
            	__.go(this,this.add_url);
            },
            go_update : function(){
            	let info = __.get_list_update_check(this.$parent.selection);
                if(! info.pass){
                    this.$Message.error(info.error);
                    return;
                }
                __.go(this,this.update_url,{id : info.ids });
            },
            go_import : function(){
                __.go(this,this.import_url);
            },
            get_school_id : function(){
                return this.tags._join('id') || window.config.userinfo.school_id;
            },
	    },
	    created(){
	    	if(localStorage.school_tags){
	    		this.tags = JSON.parse(localStorage.school_tags);
	    	}
	    },
	    watch : {
            tags : function(){
                localStorage.school_tags = JSON.stringify(this.tags);
            }
        },
	    components : { drop_school,event_button },
	}
</script>