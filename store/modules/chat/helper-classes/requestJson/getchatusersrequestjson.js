const { RequestJson } = require('./requestjson')




class GetChatUsersRequestJson extends RequestJson {

    constructor() {
        super()
        this.json = JSON.stringify({
            "type": "chat.users"
        })
    }
}

exports.GetChatUsersRequestJson = GetChatUsersRequestJson