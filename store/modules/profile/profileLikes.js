import axious from 'axios'
import { Like } from './classes/like'

const state = () => ({
    likes: [new Like(), ]
})

const getters = {
    getLikes: (state) => {
        return state.likes
    },
}

const mutations = {

}

const actions = {

}


export default {
    state,
    getters,
    mutations,
    actions
}
