import Vue from 'vue'
import Vuex from 'vuex'
import version from './version'
import user from './user'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        version,
        user
    },
    strict: debug
})