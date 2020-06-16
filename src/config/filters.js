import Vue from 'vue'

//人名币过滤器
Vue.filter('moneyFormat',(value)=>{
    return '¥' +Number(value).toFixed(2);
})