import axios from 'axios'

const state = () => ({
    
})

const getters = {
    
}

const mutations = {
    
}

const actions = {
    reportPost({state, commit}, {description, subjects, postID}) {
        return this.$axios.post('api/report/send_report', {
            'post_id': postID,
            'subjects': subjects,
            'description': description
        }).then(({ data }) => {
            return true
        }).catch((error) => {
            throw error
        })
    }
}


export default {
    state,
    getters,
    mutations,
    actions
}