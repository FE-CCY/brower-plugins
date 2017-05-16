import {axios} from './fetch'

export default {
    check(){
        return axios.get('/plugin/version');
    }
}