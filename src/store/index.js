import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";
import {getCategory,getShoppingList,getShoppingCount,getHomeCasual,getRecommendAll,getGoodsDetail,getCartGoods,delSingleGoods,getGoods} from "../api";

Vue.use(Vuex);
Vue.use(VueAxios,axios)
//配置路由状态管理
export default new Vuex.Store({
  state: {
    //登录状态
    status: '',
    // 首页轮播图
    listcasual: [],
    //商品类型
    categoryList:[],
    //所有商品
    shopList:[],
    //商品详情
    goodsDetail:[],
    // 推荐的商品列表
    recommendshoplist: [],
    //获取推荐商品总数目
    recommendshopcount:[],
    //购物车数据
    cartgoods: [],
    // 搜索商品数据
    searchresults:[],
    //jwt验证token
    token: localStorage.getItem('token') || '',
    //基础路由
    baseURL:'http://192.168.255.14/',
    //登录账户
    account:{
      username:localStorage.getItem('username') || '',
      password:'',
      user_id:localStorage.getItem('user_id')|| 0
    }
  },
  getters: {
    
  },
  mutations: {
    auth_success(state, token) {     
      state.status = 'login';
      state.token = token;
    },
    auth_error(state) {
      state.status = 'error';
    },
    loginUser(state,{user}){
      state.account.username=user["UserName"];   
      window.localStorage.setItem('username',user["UserName"]);
      state.account.user_id=user["ID"]; 
      window.localStorage.setItem('user_id',user["ID"]);


    },
    //获取商品类别
    category_list(state,{categoryList}){
      state.categoryList = categoryList;
    },
    // 获取推荐的商品数据
    recommend_shop_list(state,{recommendshoplist}){
      state.recommendshoplist = recommendshoplist;
    },
    // 获取推荐商品总数
    recommend_shop_count(state,{recommendshopcount}){
      state.recommendshopcount = recommendshopcount;
    },
    // 获取首页轮播图
    list_casual(state,{listcasual}){
      state.listcasual = listcasual;
    },
    // 获取商品，按商品类别分组
    recommend_shop_all(state,{shopList}){
      state.shopList = shopList;
    },
    // 获取商品详情
    regoods_detail(state,{goodsDetail}){
      state.goodsDetail=goodsDetail;
    },
    //购物车数据
    recart_goods(state,{cartgoods}){
      state.cartgoods=cartgoods;
    },
    //删除购物车中商品
    delSingleGoods(state,{goods}){
      const index=state.cartgoods.indexOf(goods);
      state.cartgoods.splice(index,1);
    },
    //是否选中单个商品
    singleSelected(state,{goods}){
      const index=state.cartgoods.indexOf(goods);
      if(!goods.checked){
        state.cartgoods[index].checked = true;
      }else{
        state.cartgoods[index].checked = !state.cartgoods[index].checked;
      }
    },
    // 是否选中全部商品
    selectedAll(state,{isSelectedAll}){
      state.cartgoods.forEach((goods)=>{
        goods.checked=!isSelectedAll;
      })
    },
    // 搜索商品
    research_detail(state,{searchresults}){
      state.searchresults=searchresults;
    }
  },
  actions: {
    loginInfo(context, account){
      let accounts=new FormData();
      accounts.append('username',account.username);
      accounts.append('password',account.password);
      return new Promise((resolve,reject )=>{
        //向后端发送请求，验证用户名密码是否正确，请求成功接收后端返回的token值，利用commit修改store的state属性，并将token存放在localStorage中
        axios.post(context.state.baseURL+'User/LoginInfo',accounts).then(Response =>{
          const token=Response.data.data.token;
          // 每次请求接口时，需要在headers添加对应的Token验证
          window.localStorage.setItem('token',token);
          axios.defaults.headers.common['Authorization'] = token;
          // 更新token
          context.commit('auth_success', token);
          resolve(Response);
        })
        .catch(err => {
          context.commit('auth_error');
          localStorage.removeItem('token');
          reject(err);
        })
      })
    },
    //获取分类数组
    async reqCategory(context){
      const url='Category/GetCategory';
      const result=await getCategory(url);
      context.commit('category_list',{categoryList:result.data.data})
    },
    // 获取首页的轮播图
    async reqHomeCasual(context) {
      const url='HomeCasual/GetHomeCasual';
      const result = await getHomeCasual(url);
      context.commit('list_casual', {listcasual: result.data.data})
    },
    // 获取推荐的商品数据 
    async reqShoppingList(context,params){   
      const url='Recommend/GetRecommend';
      let data=new FormData();
      data.append('cateId',params.cateId);
      data.append('pageIndex',params.pageIndex);
      data.append('pageSize',params.pageSize);
      const result=await getShoppingList(url,data);
      context.commit('recommend_shop_list',{recommendshoplist:result.data.data})
    },
    // 获取商品，按商品类别分组 
    async reqShopList(context){   
      const url='Recommend/GetRecommendAll';
      const result=await getRecommendAll(url);
      context.commit('recommend_shop_all',{shopList:result.data.data})
    },
    // 获取各类商品总数，并组成数组
    async reqShoppingCount(context){   
      const url='Recommend/GetRecommendCount';
      const result=await getShoppingCount(url);
      context.commit('recommend_shop_count',{recommendshopcount:result.data})
    },
    // 获取商品详细信息
    async reqGoodsDetail(context,params){
      let data=new FormData();
      data.append('goodsId',params.goodsId);
      const url='GoodsDetail/GoodsDetail';
      const result=await getGoodsDetail(url,data);
      context.commit('regoods_detail',{goodsDetail:result.data.data})
    },
    // 搜索商品
    async reqSearch(context,{keywords}){
      let data=new FormData();
      data.append('keywords',keywords);
      const url='Recommend/GetRecommends';
      const result=await getGoods(url,data);
      console.log(result);
      context.commit('research_detail',{searchresults:result.data.data})
    },
    // 根据用户id请求购物车商品数据
    async reqCartGoods(context,params){
      let data=new FormData();
      data.append('user_id',params.user_id);
      const url='Cart/QueryCart';
      const result=await getCartGoods(url,data);
      context.commit('recart_goods',{cartgoods:result.data.data})
    },
    // 删除购物车中的商品
    async delSingleGoods(context,{goods,user_id}){
      let url='Cart/DeleteCartGoods';
      let data=new FormData();
      data.append('user_id',user_id);
      data.append('goods_id',goods.goods_id);
      const result=await delSingleGoods(url,data);
      if(result.data.res===200){
        context.commit('delSingleGoods', {goods});
      }
    },
    // 是否选中单个商品
    async singleSelected(context, {goods}){
      context.commit('singleSelected', {goods});
    },
    // 是否选中全部商品
    async selectedAll(context, {isSelectedAll}){
      context.commit('selectedAll', {isSelectedAll});
    }
  }
})

