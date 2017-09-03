<template>
    <div class="layout-main">
        <div class="layout-content">
            <div class="box">
                Hello World ~
            </div>
            <div class="charts" >
            <div id="myChart" style="width:1000px;height:500px"></div>
        </div>

        </div>
    </div>
</template>
<script type="text/javascript">
    export default {
        data(){
            return {
            }
        },
        created(){
            window.config.active = 'home';
            window.config.active_name = '应用中心';
        },
        methods : {           
            init : function(){
               
            },
        },
        mounted(){
            let mainChart = this.$echarts.init(document.getElementById('myChart'))
            var option = null;
            // 指定图表的配置项和数据
            option = {
    color: ['#3398DB'],
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'直接访问',
            type:'bar',
            barWidth: '60%',
            data:[10, 52, 200, 334, 390, 330, 220]
        }
    ]
};
            mainChart.setOption(option, true)
        },
    }
</script>