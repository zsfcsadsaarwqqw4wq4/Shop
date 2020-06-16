import ajax from './ajax'

const method="POST";
//请求轮播图
export const getHomeCasual = (url) => ajax({url});
//请求商品类别
export const getCategory = (url) => ajax({url});
//请求指定类别和页码商品数据
export const getShoppingList = (url,data) => ajax({url,method,data});
//搜索商品
export const getGoods = (url,data) => ajax({url,method,data});
//请求各类商品总数，返回数组
export const getShoppingCount = (url) => ajax({url,method});
//请求商品数据
export const getRecommendAll = (url) => ajax({url,method});
//请求商品数据，根据商品id获取
export const getGoodsDetail=(url,data)=> ajax({url,method,data});
//添加商品到购物车
export const addGoodsToCart=(url,data)=>ajax({url,method,data});
//根据用户id请求购物车商品数据
export const getCartGoods=(url,data)=>ajax({url,method,data});
//根据用户名和商品id删除商品
export const delSingleGoods=(url,data)=>ajax({url,method,data});
