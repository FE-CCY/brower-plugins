import {axios,convertToURLSearchParams} from './fetch'

export default {
    init(){
        return axios.get('/user/init');
    },
    login(data){
        return axios.post('/user/login',convertToURLSearchParams(data));
    },
    logout(){
        return axios.get('/user/logout');
    },
    auth(){
        var authenticated = localStorage.authenticated;
        return authenticated && authenticated == 'true';
    }
}