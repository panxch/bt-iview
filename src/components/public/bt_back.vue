<template>
	 <Button type="primary" @click="history">返回</Button>
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