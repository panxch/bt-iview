let statistics_config = {
    school_sale : {
                    color: ['#2d8cf0'],
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
                            data : [],
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
                    title : {
                        text : '最近活跃学校',
                        left: 'center',
                    },
                    series : [
                        {
                            name:'活跃用户数',
                            type:'bar',
                            barWidth: '30%',
                            data:[]
                        }
                    ]
            },
    school_line : {
            visualMap: [{
                show: false,
                type: 'continuous',
                seriesIndex: 0,
                min: 0,
                max: 400
            }],
            title: [{
                left: 'center',
                text: '学校销售量'
            }],
            tooltip: {
                trigger: 'axis'
            },
            xAxis: [{
                data: []
            }],
            yAxis: [{
                splitLine: {show: true}
            }],
            grid: [{
                bottom: '10%'
            }, {
                top: '60%'
            }],
            series: [{
                type: 'line',
                name : '开通数量',
                showSymbol: false,
                data: []
            }]
    }
};

export default statistics_config;