<template>
    <div id="list">
        <div id="container">
            <el-row>
                <!--商品菜单-->
                <el-col :span=4 :offset="1" calss="cateList">
                    <div class="cate_img">
                        <i class="el-icon-office-building"></i>
                        商品分类
                    </div>
                    <el-menu class="el-menu-vertical-demo"
                        background-color="#545c64"
                        text-color="#fff">
                        <el-menu-item index="cate.id" v-for="(cate) in categoryList" :key="cate.id" @click="getProductList(cate.id)"><span slot="title">{{cate.catename}}</span></el-menu-item>                
                    </el-menu>
                </el-col> 
                <!--轮播图-->
                <el-col :span=12>
                    <el-carousel v-if="listcasual.length > 0">
                        <el-carousel-item v-for="(casual) in listcasual" :key="casual.id">
                            <img :src="casual.imgurl" alt="">
                        </el-carousel-item>
                    </el-carousel>
                </el-col>
                <!--用户登录信息-->
                <el-col :span=6 class="right">
                    <ul>
                        <li>Hi~ 欢迎来到重庆商城</li>
                        <li v-if="!account.username"><router-link to="/login">登录</router-link></li>
                        <li v-else class="user">您好,{{ account.username }}<br><router-link to="/me" class="me">个人中心</router-link></li>
                        <li><button class="welfare">新人福利</button><button class="vip">加入会员</button></li>
                    </ul>
                </el-col>
            </el-row>  
            <!--商品展示区域 -->
            <div class="product" v-for="(cate) in categoryList" :key="cate.id">
                <div class="pro_top">
                    <h3>{{ cate.catename }}</h3>
                </div>
                <div class="pro_show">
                    <ProductItem v-for="(pro) in shopList[cate.id - 1]" :key="pro.goods_id" :pro="pro"/>
                </div>
            </div>               
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import ProductItem from '../components/ProductItem'
export default {
    computed: {
        ...mapState(['categoryList','listcasual','account','shopList'])
    },
    components:{
        ProductItem
    },
    methods: {
        getProductList(id){
            this.$router.replace('/search/'+id+'/1');
        }
    },
    mounted() {
        // 请求轮播图数据
        this.$store.dispatch('reqHomeCasual');
        // 请求分类数据
        this.$store.dispatch('reqCategory');
        // 请求所有商品数据
        this.$store.dispatch('reqShopList');
    }
}
</script>

<style scoped>
    .container{
		position: relative;
		margin: 60px auto;
		width: 100%;
		background: rgba(245, 245, 245, 0.5);
	}   
    .el-row .el-col .cate_img{
		width: 100%;
		text-indent: 14px;
		height: 40px;
		color: white;
		line-height: 40px;
		font-size: 16px;
		background: #F10215;
	}
    .el-row .el-col{
        height: 320px;
    }
    .el-row .el-col a{
        text-decoration: none;
	}
    /*自动播放图片区域*/
    .el-col .el-carousel{
		height: 100%;
	}
	.el-carousel .el-carousel__item img{
		height: 100%;
		width: 100%;
	}
    .me:hover{
        color: red;
    }
    .right{
        border: 1px solid #999;
    }
    .right ul{
        list-style: none;
        padding-top: 30px; 
    }
    .right ul li{
        line-height: 40px;
    }
    .right ul>li:first-child{
        color: #999;
    }
    .right ul li button{
        border-radius: 15px;
    }
    .welfare{
        color: red;
    }
    .vip{
        color: yellow;
        background: black;
    }
    /*每类产品的简单展示*/
	#container>.product{
		margin-top: 50px;
		width: 100%;
		height: 300px;
        margin-left: 20%;
	}
    .pro_show{
		width: 980px;
		height: 200px;
    }
    .product .pro_top{
        margin-left: 18%;
    }
    .pro_show>.pro{
        float: left;
        margin-right: 20px;
        margin-bottom: 20px;
        width: 300px;
        height: 210px;
        border: 1px solid gainsboro;
    }
</style>

