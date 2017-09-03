<template>
	 <Button type="primary" class="ivu-btn-back" icon="ios-undo" @click="history">返回</Button>
</template>
<script type="text/javascript">
	export default {
		methods : {
			history : function(){
				window.history.back();
			}
		}
	}
</script>