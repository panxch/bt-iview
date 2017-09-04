<template>
<div class="layout-breadcrumb">
    <Breadcrumb>
        <Breadcrumb-item href="/">首页</Breadcrumb-item>
        <Breadcrumb-item>{{config.active_name}}</Breadcrumb-item>
    </Breadcrumb>
</div>
</template>

<script type="text/javascript">
	export default {
		props : ['config'],
		data(){
			return {
				
			}
		}
	} 
</script>