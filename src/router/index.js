import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

Vue.use(VueRouter);

//路由配置
const routes = [
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },
  {
    path: "/list",
    name: "List",
    component: ()=>
      import("../views/List.vue"),
    meta: {
      requireAuth: true,
      showHeaderTop: true,
      showHeaderSreach:true
    }
  },
  {
    path: "/",
    name: "List",
    component: ()=>
    import("../views/List.vue"),
    meta: {
      requireAuth: true,
      showHeaderTop: true,
      showHeaderSreach:true
    }
  },
  {
    path: "/search/:id/:pageNo",
    name: "search",
    component: ()=>import("../views/Search.vue"),
    meta:{
      showHeaderTop: true,
      showHeaderSreach:true
    }
  },
  {
	  path: '/shopcar',
	  component: ()=>import("../views/ShopCar.vue"),
	  meta: {showHeaderTop: true}
  },
  {
	  path: '/searchdetail',
	  component: ()=>import("../views/SearchDetail.vue"),
	  meta: {showHeaderTop: true,showHeaderSreach:true}
	},
  {
    path: "/goods/:id",
    name: "goods",
    component:()=>import("../views/Goods.vue"),
    meta:{
      requireAuth: true,
      showHeaderTop:true,
      showHeaderSreach:false
    }
  }
];
//跳转后设置scroll为原点
// router.afterEach((to, from, next) => {
//   window.scrollTo(0, 0);
// });
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
//用router.beforeEach控制路由跳转时访问页面的权限
//跳转前设置title
router.beforeEach((to, from, next) => {
  //判断将要进入的路由是否需要登录
  if(to.meta.requireAuth){
    if(store.state.token !=''){
      next()
    }else{
      next('/login')
    }
  }else{
    next()//不需要登录直接进入页面
  }
});
export default router