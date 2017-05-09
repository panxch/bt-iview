<style type="text/css">
    .box{width:381px;height:381px;border-bottom:1px solid #ccc;border-right:1px solid #ccc;margin:auto;}
    .box .ge{width:20px;height:20px;border-left:1px solid #ccc;border-top:1px solid #ccc;float:left;}
</style>
<template>
    <div class="layout-main">
        <div class="layout-content">
            <div class="box"></div>
        </div>
    </div>
</template>
<script type="text/javascript">
    export default {
        data(){
            return {
                m_address : '',
                xcell : 20,
                ycell : 20,
                ges : [],
                food : [],
                shes : [],
                n : 1
            }
        },
        created(){
            window.config.active = 'home';
            window.config.active_name = '应用中心';
        },
        methods : {
            regex : function(){
                log(this.validator(this.$data));
            },
            init : function(){
                this.food = this.ges[ Math.ceil(Math.random()* this.xcell - 1) ][Math.ceil(Math.random()* this.ycell - 1)];
                this.food.css('background','rgb(228, 81, 81)');
                this.shes = [[1,1]];
            },
            run : function(){
                for (let i = 1; i < this.xcell; i++) {
                    for (let j = 1; j < this.ycell; j++) {
                        this.shes.forEach((c,o)=>{
                            let x = c[0];
                            let y = c[1];
                            let she = this.ges[ x ][ y ];
                            //she.css('background','#fff');
                            if(i == x && j == y){
                                she.css('background','#ccc');  
                            }
                        })
                    }
                }
            },
        },
        mounted(){
            // loading setting
            for (let i = 1; i < this.xcell; i++) {
                this.ges[i] = [];
                for (let j = 1; j < this.ycell; j++) {
                    let $ge = $('<div class="ge"></div>');
                    this.ges[i][j] = $ge;
                    $('.box').append($ge);
                }
            };
            // this.init();
            // setInterval(()=>{
            //     this.run();
            // },1000)
        },
    }
</script>