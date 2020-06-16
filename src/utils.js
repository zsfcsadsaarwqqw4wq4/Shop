export default {
    //去掉前后空格
    trim(str){
        if(str===null){
            return '';
        }
        return str.replace(/^\s*(.*?)\s*$/g, '$1');
    }
}