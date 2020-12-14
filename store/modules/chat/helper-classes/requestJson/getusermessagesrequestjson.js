const { RequestJson } = require('./requestjson')




class GetUserMessagesRequestJson extends RequestJson {
    
    constructor(username) {
        super()
        this.json = JSON.stringify({
            "type" : "chat.message.get",
            "from" : username
        })
    }

}

exports.GetUserMessagesRequestJson = GetUserMessagesRequestJson