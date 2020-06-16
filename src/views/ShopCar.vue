<template>
    <div id="shop">
        <div id="content">
            <div class="header">
                <img src="../images/shop.jpg" class="header_logo" />
                <span>购物车</span>
            </div>
            <div class="cont_title">
                <el-tabs v-model="activeName" @tab-click="handleClick" >
                    <el-tab-pane label="全部商品" name="first">
                        <div class="con_selet">
                            <input type="checkbox" class="con_selectAll" :checked="isSelectedAll" @click.stop="selectedAll(isSelectedAll)"/>
                            <label for="con_selectAll">全选</label>
				        </div>
                        <ul class="cont_title_ul">
                            <li>商品信息</li>
                            <li>单价</li>
                            <li>数量</li>
                            <li>金额</li>
                            <li>操作</li>
                        </ul>
                        <div class="pro_box" v-if="cartgoods.length">
                           <div class="goods" v-for="(goods, index) in cartgoods" :key="index">
                               <ul class="item_content">
                                    <li><input type="checkbox" class="checkBox" :checked="goods.checked" @click="singleSelected(goods)"/></li>
                                    <li><img :src="goods.thumb_url"/><div class="commodity">{{goods.goods_name}}</div</li>
                                    <li><div class="boxs">{{goods.price / 100 | moneyFormat}}</div></li>
                                    <li><el-input-number v-model="goods.buy_count" :min="1" :max="goods.counts" ></el-input-number></li>
                                    <li class="price"><div class="boxs"><strong>{{goods.buy_count * goods.price /100 | moneyFormat}}</strong></div></li>
                                    <li><div class="boxs"><a @click="clickTrash(goods)">删除</a></div></li>
                               </ul>
                           </div>
                        </div>
                        <div class="pro_box" v-else>购物车里空空如也</div>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <div id="footer">
                <div class="foot_select">
                    <input type="checkbox" class="foot_selectAll" name="foot_selectAll" :checked="isSelectedAll" @click.stop="selectedAll(isSelectedAll)"/>
                    <label for="foot_selectAll">全选</label>
                </div>
                <div class="foot_op">
                    <a class="foot_remove" @click.prevent="emptyCart">清空购物车</a>
                </div>
                <div class="foot_total">
                    <div class="amout-sum">
                        <span class="txt">已选商品</span>
                        <strong id="selected_amout">{{totalAmount}}</strong>
                        <span class="txt">件</span>
                    </div>
                    <div class="price-sum">
                        <span class="txt">合计（不含运费）：</span>
                        <strong class="selected_price">{{totalPrice | moneyFormat(totalPrice)}}</strong>
                    </div>
                    <div class="btn-area">
                        <a class="btn-sumbit" :class="{'btn-allow': totalAmount}">结&nbsp;算</a>
                    </div>
                </div>
		    </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data() {
        return {
            activeName:'first',
            totalPrice:0,// 商品总价
            totalAmount:0,//已选商品个数
            isSelectedAll: false
        }
    },
    computed: {
        ...mapState(['account','cartgoods'])
    },
    methods:{
        //删除单个商品
        clickTrash(goods){
            this.$confirm('您确定删除该商品吗?','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                let user_id=this.account.user_id;
                this.$store.dispatch('delSingleGoods',{goods,user_id});
            }).catch(()=>{
                this.$message({
                    type: 'info',
                    message: '已取消删除'
               });
            })
        },
        // 计算商品总价
        getAllGoodsPrice(){
            let totalPrice = 0;
            this.cartgoods.forEach((goods, index)=>{
            if(goods.checked){
                totalPrice += goods.price / 100 * goods.buy_count;
            }
            });
            this.totalPrice = totalPrice;
        },
        //判断是否全选
        hasSelectedAll(){
            let flag=true;
            let totalNum=0;
            this.cartgoods.forEach((goods,index)=>{
                if(!goods.checked){
                    flag = false;
                }else{
                    totalNum += 1;
                }
            });
            this.totalAmount = totalNum;
            this.isSelectedAll = flag;
        },
        //选取全部商品
        selectedAll(isSelectedAll){
            this.isSelectedAll = !isSelectedAll;
            this.$store.dispatch('selectedAll',{isSelectedAll});
            this.getAllGoodsPrice();
            this.hasSelectedAll();
        },
        //选取单个商品
        singleSelected(goods){
            this.$store.dispatch('singleSelected',{goods});
            this.getAllGoodsPrice();
            this.hasSelectedAll();
        }
    },
    mounted() {
        let user_id = this.account.user_id;
        // 请求商品数据
        this.$store.dispatch('reqCartGoods',{user_id});
    }
}
</script>

<style scoped>
.header{
    margin: 15px 0px 0px 15px;
}
.header_logo{
    width: 100px;
    height: 100px;
    border-radius: 50px;
}
.header span{
    position: relative;
    top:-30px;
    left: 20px;
    font-weight: 1000;
    color: red;
    font-size:x-large;
}
.cont_title{
    margin-left: 10%;
    margin-right: 10%;
}
.cont_title_ul li{
    height: 20px;
    float: left;
    padding-left: 250px;
    list-style-type: none;
} 
.con_selet{
    float: left;
}
.pro_box{
    clear: left;
}
.goods{
    background: #fcfcfc;
	height: 130px;
	border: 1px solid #CCCCCC;
}
.pro_box ul li:not(:first-child){
    list-style-type: none;
    float: left;
    padding-left: 200px;
}
.pro_box ul li{
    list-style-type: none;
    float: left;
}
.pro_box ul:first-child{
    background-color: red;
    padding-left: 0px;
}
.pro_box ul li img{
    width: 80px;
    height: 80px;
}
.commodity{
    clear: left;
    font-size: 10px;
    width: 80px;
    float:right;
    margin-left: 10px;
}
.price{
    color: red;
}
.boxs{
    width: 50px;
}
.boxs a{
    cursor: pointer;
}
.boxs a:hover{
    color: red;
}

#footer{
	width: 80%;
	height: 50px;
	position: fixed;
	bottom: 0;
	left: 10%;
	background: #E5E5E5;
	z-index: 9999;
}
#footer div{
	display: inline-block;
}
#footer>.foot_select{
	width: 50px;
    height: 50px;
    line-height: 50px;
    padding-left: 5px;
    cursor: pointer;
    font-size: 14px;
}
.foot_select input,.foot_select label{
	cursor: pointer;
}
.foot_op{
	line-height: 50px;
    height: 50px;
}
.foot_op>.foot_remove{
	margin-left: 25px;
	font-size: 14px;
	cursor: pointer;
}
.foot_remove:hover{
	color: #f40;
}
.foot_total{
	float: right;
}
.foot_total>.amout-sum{
	cursor: pointer;
	height: 50px;
    color: #3c3c3c;
}
.foot_total .txt{
	line-height: 50px;
	font-size: 14px;
}
.amout-sum>#selected_amout{
	padding: 0 5px;
	color: #f40;
    font-weight: 700;
    font-size: 18px;
}
.price-sum{
	margin-left: 50px;
}
.price-sum>.selected_price{
	color: #f40;
    font-weight: 700;
    font-size: 20px;
    line-height: 50px;
}
.btn-area>.btn-sumbit{
	display: inline-block;
	background: #B0B0B0;
    color: #fff;
    border-left: 1px solid #e7e7e7;
    width: 119px;
    height: 50px;
    cursor: not-allowed;
    text-align: center;
    line-height: 50px;
    font-size: 20px;
}
.btn-area>.btn-sumbit.btn-allow{
	background: #f22d00;
	cursor: pointer;
}
</style>