<template>
    <div class="pro">
        <img v-lazy="pro.thumb_url" class="pro_img">
        <div class="pro_text">
            <p><em>{{ pro.price / 100 }}</em></p>
            <p>{{ pro.short_name }}</p>
            <p>重庆商城自营店</p>
        </div>
        <div class="add_btn">
            <a @click="goDetail(pro.goods_id)"><el-button type="danger">查看详情</el-button></a>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        pro:{
            type:Object,//参数类型必须是一个对象
            required:true//表示参数是必须的
        }
    },
    methods: {
        goDetail(id){
            this.$router.replace('/goods/'+id);
        }
    }
}
</script>
<style scoped>
.pro>.pro_img{
	margin: 20px;
	width: 120px;
	height: 120px;
}
.pro>.pro_text{
    float:right;
	height: 170px;
	width: 140px;
	line-height: 25px;
}
.pro_text>p:first-child{
    color: red;
    font-family: 900;
}
.pro_text>p:nth-child(2){
	font-size: 13px;
}
.pro_text>p:nth-child(3){
	font-size: 12px;
	color: #999;
}
.pro>.add_btn{
    height: 30px;
    width: 90px; 
    clear: right;
    float: right;
    margin-right: 30px;
}
.add_btn>a>button{
	width: 90px;
	height: 30px;
    padding: 0px;    
}

</style>