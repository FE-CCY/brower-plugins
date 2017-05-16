import api from '../api'

const types = {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    INIT:'INIT'

}

// initial state
const state = {
    isLogin: false,
    info:{}
}

// getters
const getters = {
    isLogin: state => state.isLogin,
    user: state => state.info
}

// actions
const actions = {
    init({commit}) {
        api.user.init().then(res =>{
            var res = res.data;
            if(res.status){
                commit(types.INIT, res.data)
                commit(types.LOGIN)
            }else{
                commit(types.LOGOUT)
            }
        });
    },
    login({commit}){
        commit(types.LOGIN)
    },
    logout({commit}){
        commit(types.LOGOUT)
    }
}

// mutations
const mutations = {
    [types.INIT](state, data) {
        state.info = data
    },
    [types.LOGIN](state) {
        localStorage.authenticated = true;
        state.isLogin = true
    },
    [types.LOGOUT](state) {
        localStorage.authenticated = false
        state.isLogin = false
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}