import api from '../api'
import {version} from '@/../package'

const types = {
    UPDATE: 'UPDATE'
}

// initial state
const state = {
    current: version,
    newest: '',
    renewable:false
}

// getters
const getters = {
    version: state => state
}

// actions
const actions = {
    check({commit}){
        api.version.check().then( res => {
            var res = res.data;
            commit(types.UPDATE,res.version)
        })
    }
}

// mutations
const mutations = {
    [types.UPDATE](state, version) {
        state.newest = version;
        state.renewable = JSON.parse(version.replace(/\./g,'')) > JSON.parse(state.current.replace(/\./g,''))
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}