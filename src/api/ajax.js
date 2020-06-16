import axios from 'axios'
// export default function ajax(url='',params={},type='GET'){
//     //1. 定义promise对象
//     let promise;
//     return new Promise((resolve,reject)=>{
//         //2. 判断请求的方式
//         if('GET' === type){
//             // 2.1 拼接请求字符串
//             promise=axios.get(url,params);   
//         }else if(type==='POST'){
//             promise = axios.post(url, params)
//         }
//         promise.then((response)=>{
//             resolve(response.data);                   
//         }).catch(error => {
//             reject(error);
//         })
//     })
// }
const ajax=({
    url='',
    data={},
    method="GET",
    type='json',
    timeout=10000    
})=>new Promise((resolved, rejectd)=>{
        try{
            const token=window.localStorage.getItem('token');
            const res=axios({
                url,
                method,
                baseURL:'http://192.168.255.25/',
                data,
                timeout,
                headers:{
                    token:typeof token==='string'?token:''
                },
                responseType:type
            });
            resolved(res);
        }catch(err){
            const errStr = err.toString();
            if(errStr === 'Error: Network Error') return rejectd('连接失败');
            if(errStr.includes('500')) return rejectd('服务器错误');
            if(errStr.includes('timeout')) return rejectd('连接超时'); 
            rejectd(err);
        }
    })
export default ajax;