<template>
    <div v-if="categoryList.length">
        <div id="container">
            <div class="product">
                <div class="pro_line">
                    <h3 v-text="this.categoryList[this.cateId-1].catename"></h3>
                    <el-dropdown @command="handleCommand">
                        <span class="el-dropdown-link">
                            下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item v-for="(cate,index) in categoryList" :key="index" :command="index+1">{{ cate.catename }}</el-dropdown-item>
                        </el-dropdown-menu>                   
                    </el-dropdown>
                    <router-link to="/list" class="golist">返回首页</router-link>
                </div>
                <div class="pro_show">
                    <ProductItem v-for="(goods) in recommendshoplist" :key="goods.goods_id" :pro="goods" />
                </div>
            </div>
        </div>
        <div id="footer">
            <ul class="pagination">
                <li><a class="pag_back" @click="getMore(pageIndex - 1)">«</a></li>
				<li><a class="pag_a" v-for="index in catePages[this.cateId - 1]" :key="index" :class="{pag_active: pageIndex === index}" @click="getMore(index)">{{index}}</a></li>
				<li><a class="pag_go" @click="getMore(pageIndex + 1)">»</a></li>
            </ul>
        </div>
    </div>
</template>

<script>
import ProductItem from '../components/ProductItem'
import {mapState} from 'vuex'
export default {
    data() {
        return {
            cateId:1,//商品分类id
            pageIndex:1,//当前页码
            pageSize:6,//每页显示大小
        }
    },
    components:{
        ProductItem
    },
    computed:{
      ...mapState(['categoryList','account','recommendshoplist','recommendshopcount']),
      catePages(){
        let arr = [];
        this.recommendshopcount.forEach((item, index)=>{
                    let page = Math.ceil(item / this.pageSize);
					arr.push(page);
        });      
        return arr;
      }
    },
    created() {        
        this.cateId=Number(this.$route.params.id);
        this.pageIndex=Number(this.$route.params.pageNo);
        //请求商品分类数据，再刷新页面后必须重新请求，否者vuex里面数据会为空
        this.$store.dispatch('reqCategory');
        //根据商品分类id和当前页码和每页大小查询数据
        this.$store.dispatch('reqShoppingList',{cateId:this.cateId,pageIndex:this.pageIndex,pageSize:this.pageSize});
        //获取各类商品总数数组
        this.$store.dispatch('reqShoppingCount');
    },
    methods:{
        handleCommand(context){
            this.$store.dispatch('reqShoppingList',{cateId:context,pageIndex:1,pageSize:this.pageSize});
            this.cateId=context;
            this.pageIndex=1;
            this.$router.replace('/search/'+this.cateId+'/'+this.pageIndex);
            
        },
        getMore(index){
            console.log(index);
            if(index && index<=this.catePages[this.cateId-1]){
                this.$store.dispatch('reqShoppingList',{cateId:this.cateId,pageIndex:index,pageSize:this.pageSize}); 
                this.pageIndex=index;
                this.$router.replace('/search/'+this.cateId+'/'+this.pageIndex);             
            };
        }
    }
}
</script>
<style scoped>
#container{
    margin: auto;
    width: 100%;
}
.product{
	margin: auto;
	width: 980px;
}
.product>.pro_line{
	margin-bottom: 20px;
	width: 100%;
	height: 50px;
	line-height: 10px;
	font-size: 23px;
    font-family: sans-serif;
    font-weight: normal;
    color: #222;
}
.pro_line>h3{
	display: inline-block;
}
.pro_line>a{
    margin: 0px 0px 0px 20  px;
	text-decoration: none;
}
.el-dropdown-link {
	display: inline-block;
    cursor: pointer;
    color: #409EFF;
}
.el-icon-arrow-down {
    font-size: 12px;
}
.product>.pro_show{
	margin: 0 auto;
	width: 980px;
	height: 300px;
}
.pro_show>.pro{
	position: relative;
	float: left;
	margin-right: 20px;
	margin-bottom: 20px;
	width: 300px;
	height: 210px;
	border: 1px solid gainsboro;
}
#footer{
	height: 50px;
	width: 100%;
	display: flex;
}
#footer>ul.pagination{

	margin: 0 auto;
}
ul.pagination li{
	float: left;
    list-style-type :none;
}
ul.pagination li a{
    padding: 8px 16px;
    color: black;
    border: 1px solid #ddd;
}
ul.pagination li a.pag_active{
    background-color:  #c40000;
    color: white;
    border: 1px solid #c40000;
}
ul.pagination li a:hover:not(.pag_active){
    background-color: #ddd;
}
</style>