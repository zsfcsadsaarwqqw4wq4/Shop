<template>
    <div class="header_container">
        <div class="header_search"> 
            <div>
                <input type="text" placeholder="搜索  商品名称" v-model="keywords"/>
                <el-button type="danger" icon="el-icon-search" @click="postSearch"></el-button>
            </div>
            <p>
                <a>自营日满减</a>
                <a>运动满减</a>
                <a>品牌闪购</a>
                <a>家用电器</a>
                <a>家用电脑</a>
            </p>
        </div>
        <div class="shopping_bag"> 
            <a @click.prevent="goShoppingCar"><i class="iconfont icon-shopping-cargouwuche"></i>我的购物车</a>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            keywords:''
        }
    },
    methods:{
        goShoppingCar(){
            this.$router.replace('/shopcar');
        },
        async postSearch(){
            if(this.keywords){
                let keywords = this.keywords;
                this.$store.dispatch('reqSearch',{keywords});
                this.$router.replace('/searchdetail');
        }
      }
    }
}
</script>

<style scoped>
.header_container{
    height: 150px;
    width: 100%;
    margin: 0px;
    padding: 0px;
}
.header_search{
	position: absolute;
	left: 35%;
	margin-top: 50px;
}
.header_search div{
    display: flex;
    align-items: center;
}
.header_search input{
	padding-left: 10px;
	width: 490px;
	height: 35px;
	font-size: 14px;
	line-height: 35px;
	border: 2px solid #FF0236;
    border-right: none;
	outline: none;
}
.header_search button.el-button{
    width: 60px;
    height: 41px;
    font-size: 15px;
    border-radius: 0px;
    padding: 0px;
}
.header_search>p>a{
    padding: 5px 10px;
    font-size: 15px;
    color: #999;
}
.shopping_bag{
    position: absolute;
    width: 120px;
    height: 40px;
    font-size: 13px;  
    cursor: pointer;
    text-align: center;
    line-height: 40px;
    margin-top: 50px;
    color: red;    
    background: #f8f9fa;
    right: 20%;
}
</style>