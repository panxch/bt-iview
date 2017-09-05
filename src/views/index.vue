<template>
    <div class="layout-main">
        <div class="layout-content">
            <div class="box">
                <Row>
                    <Col span="12">
                        <div class="charts" >
                            <div id="chart_school_sale" style="width:100%;height:400px"></div>
                        </div>
                    </Col>
                    <Col span="12">
                        <div class="charts" >
                            <div id="chart_school_week" style="width:100%;height:400px"></div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
    import echarts from 'echarts'
    import statistics_config from '../config/statistics';
    import api from '../config/api/statistics';
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
            // 月销售
            let mainChart = echarts.init(document.getElementById('chart_school_sale'))
            api.get_school_sale((result) =>{
                result = JSON.parse(result);
                statistics_config.school_line.xAxis[0].data = [];
                statistics_config.school_line.series[0].data = [];
                for(let info of result){
                    statistics_config.school_line.xAxis[0].data.push(info.time);
                    statistics_config.school_line.series[0].data.push(info.count);
                }
                mainChart.setOption(statistics_config.school_line, true)
            });
            // 周活跃
            let chart_week = echarts.init(document.getElementById('chart_school_week'))
            api.get_school_week((result) =>{
                result = JSON.parse(result);
                statistics_config.school_sale.xAxis[0].data = [];
                statistics_config.school_sale.series[0].data = [];
                for(let info of result){
                    bt.log(info);
                    statistics_config.school_sale.xAxis[0].data.push(info.name);
                    statistics_config.school_sale.series[0].data.push(info.day);
                }
                chart_week.setOption(statistics_config.school_sale, true)
            });
        },
    }
</script>