import axios from 'axios';
const debug = process.env.NODE_ENV !== 'production';
axios.defaults.baseURL = debug ? 'http://192.168.31.121/taoapi/index.php' : 'http://api.hikingnet.cn/index.php';

function convertToURLSearchParams(data){
    var params = new URLSearchParams();
    for(let key in data){
        params.append(key, data[key]);
    }
    return params;
}

export {
    axios,
    convertToURLSearchParams
}
