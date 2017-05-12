<template>
	 <Button :type="type" :icon="icon" @click="save" :loading="loading" :disabled="disabled"><slot></slot></Button>
</template>
<script type="text/javascript">
	export default {
		props : ['icon','type','load'],
		data : function(){
			return {
				loading : false,
				disabled : window.config.disabled,
			}
		},
		methods : {
			save : function(){
				if(this.load){
					this.loading = true;
					setTimeout(()=>{
						this.loading = false;
					},1200)
				}
				this.$emit('click');
			}
		}
	}
</script>