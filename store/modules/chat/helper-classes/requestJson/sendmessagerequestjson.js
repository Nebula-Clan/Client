const { RequestJson } = require('./requestjson')




class SendMessageRequestJson extends RequestJson {

    constructor(message, toUsername, uuid) {
        super()
        this.json = JSON.stringify({
            "type" : "chat.message.send",
            "to" : toUsername,
            "text" : message,
            "uuid": uuid
        })
    }
}

exports.SendMessageRequestJson = SendMessageRequestJson