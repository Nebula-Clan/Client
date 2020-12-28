
const getDefaultState = () => {
    
}

const state = getDefaultState()
  
const getters = {
    
}
  
const mutations = {
    
}
  
const actions = {
    uploadMessageWithFile({ commit }, {toUsername, messageInstance, file}) {
        console.log(file)
        console.log(messageInstance)
        let messageFormData = new FormData()
        messageFormData.append('username', toUsername)
        messageFormData.append('file_type', messageInstance.messageType)
        messageFormData.append('uuid', messageInstance.messageUUID)
        messageFormData.append('data', file)

        return this.$axios.post('api/chat/upload', messageFormData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        })
        .then(({ data }) => {
            return data.url
        })
        .catch((error) => {
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