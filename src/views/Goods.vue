<template>
    <div id="container">
        <div class="pro_detail">
            <div class="pro_img">
                <div class="tb_booth">
                    <img :src="goodsDetail[0].image_url" class="pro_middle_img" />
                </div>
            </div>
            <div class="pro_meg">
                <div class="pro_meg_hd">
                    <h1>
                        {{ goodsDetail[0].goods_name }}
                    </h1>
                </div>
                <div class="peo_meg_price">
                    <dl>
                        <dt>促销价</dt>
                        <dd>
                            <div class="promo_price">
                                <span class="tm-price">{{ goodsDetail[0].price / 100 | moneyFormat}}</span>&nbsp;
                                <b>优惠促销</b>
                            </div>
                        </dd>
                    </dl>
                    <dl>
                        <dt>市场价</dt>
                        <dd class="nor_price">{{ goodsDetail[0].normal_price / 100 | moneyFormat}}</dd>
                    </dl>
                    <dl>
                        <dt>本店优惠</dt>
                        <dd>包邮</dd>
                    </dl>
                    <dl>
                        <dt class="sale_tip">{{ goodsDetail[0].sales_tip }}</dt>
                    </dl>
                    <dl>
                        <dt>服务承诺</dt>
                        <dd>
                            <span>正品保证</span>
                            <span>极速退货</span>
                        </dd>
                    </dl>
                </div>
                <div class="pro_meg_deliver">
                    <dl>
                        <dt>运费</dt>
                        <dd>福建福州&nbsp;&nbsp;至&nbsp;&nbsp;福建福州&nbsp;&nbsp;&nbsp;快递:0.00</dd>
                    </dl>
                </div>
                <div class="pro_meg_console">
                    <dl class="tb-sku">
                        <dt>数量</dt>
                        <dd>
                            <div class="item-amout">
                                <el-input-number v-model="shopNum" :min=1 :max="goodsDetail[0].counts"></el-input-number>
                            </div>
                            <span>库存<em>{{ goodsDetail[0].counts }}</em></span><span>件</span>
                        </dd>
                    </dl>
                    <div class="shopping_car">
                        <el-button type="danger" @click.prevent="dealWithCellBtnClick(goodsDetail[0])">加入购物车</el-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="pro_comment">
            <h3>商品评价</h3>
            <div>
                <div class="media">

                </div>
            </div>
            <div class="media">
                <div class="media-body">
                    本商品暂无评价
                </div>
            </div>
        </div>
        <div class="pro_judge" v-if="account.username">
            <h3>评价该商品</h3>
            <span>为该商品评分</span>
            <el-rate
              v-model="score"
              :colors="colors"
            ></el-rate>
            <el-input type="textarea" autosize placeholder="请输入内容" v-model="textarea" >
            </el-input>
            <el-button type="primary">发布<i class="el-icon-edit" slot="append"></i></el-button>
        </div>
        <div class="pro_judge" v-else>
            <h3>评价该商品</h3>
            <span class="judge_erro_tip">登录后才可以发表评论</span>
        </div>
    </div>
</template>

<script>
import {addGoodsToCart} from '../api/index'
import { MessageBox } from 'element-ui';
import {mapState} from 'vuex'
export default {
    data() {
        return {
            textarea: '',
            shopNum:1,
            score: 0,
            colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
            goodsId:0           
        }
    },
    computed: {
        ...mapState(['goodsDetail','account'])
    },
    methods: {
        //监听添加购物车按钮
        async dealWithCellBtnClick(goods){
            if(this.account.username){
                const url="Cart/AddCart";
                let data=new FormData();
                data.append('user_id',this.account.user_id);
                data.append('goods_id',goods.goods_id);
                data.append('goods_name',goods.short_name);
                data.append('thumb_url',goods.thumb_url);
                data.append('price',goods.price);
                data.append('buy_count',this.shopNum);
                data.append('counts',goods.counts);          
                let result=await addGoodsToCart(url,data);
                if(result.data.res===200){
                    MessageBox({
                        type: 'success',
                        message: result.data.msg,
                        showClose: true,
                    });
                }
            }
            else{
                window.alert('请先登录');
            }
        }
    },
    created(){
        this.goodsId=Number(this.$route.params.id);
        this.$store.dispatch('reqGoodsDetail',{goodsId:this.goodsId});
    }
}
</script>
<style scoped>
#container>.pro_detail{
    width: 980px;
    z-index: 1;
    margin: 20px auto;
}
#container>.pro_comment{
	width: 60%;
    margin: 40px auto 0;
    padding: 20px;
    border: 1px solid #ccc;
    border-bottom: none;
}
#container>.pro_judge{
	width: 60%;
    margin: 0 auto 60px;
    padding: 20px;
    border-top: none;
    border: 1px solid #ccc;
}
.pro_detail>.pro_img{
    float: left;
    padding: 100px 0px;
    width: 520px;
}
.pro_middle_img{
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
}
.pro_img>.tb_booth{
    z-index: 1;
}
.pro_meg{
    color: #666;
    margin: 0 0 0 550px;
}
.pro_meg>.pro_meg_hd{
    padding: 0px 10px 12px;
    color: #000;
}
.pro_meg_hd>h1{
    font-size: 16px;
    font-weight: 900;
    color: #000;
}
.pro_meg>.peo_meg_price{
    padding: 5px 20px;
    height: 250px;
    background-color: rgba(247, 244, 244, 0.6);
    display: flex;
    flex-direction: column;
}
.peo_meg_price dl{
    display: flex;
    align-items: center;
}
.peo_meg_price dl dd div{
    color: red;
    font-size: 20px;
}
.peo_meg_price dl dd span{
    color: red;
    font-size: 20px;
}
.nor_price{
  text-decoration: line-through;
}
.sale_tip{
    color: red;
}
.pro_meg_deliver dl{
    padding: 5px;
	font-size: 14px;
	color: black;
}
.pro_meg_deliver dl dt{
    color: #999;
    font-size: 14px;
    text-align: left;
    width: 80px;
    margin: 0 0 0 15px;
    float: left;
}
.pro_meg_console dl{
    padding: 5px;
	font-size: 14px;
	color: black;
}
.pro_meg_console dl dt{
    color: #999;
    font-size: 14px;
    text-align: left;
    width: 69px;
    margin: 0 0 0 15px;
    float: left;
}
.pro_meg_console dd div{
	display: inline-block;
	margin-right: 20px;
}
.shopping_car {
    position: relative;
    left: 200px;
}
</style>