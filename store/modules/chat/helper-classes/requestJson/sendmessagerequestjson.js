const { RequestJson } = require('./requestjson')




class SendMessageRequestJson extends RequestJson {

    constructor(message, toUsername) {
        super()
        this.json = JSON.stringify({
            "type" : "chat.message.send",
            "to" : toUsername,
            "text" : message
        })
    }
}

exports.SendMessageRequestJson = SendMessageRequestJson