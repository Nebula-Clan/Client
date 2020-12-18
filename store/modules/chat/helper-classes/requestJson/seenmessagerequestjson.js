const { RequestJson } = require('./requestjson')



class SeenMessageRequestJson extends RequestJson {

    constructor(messageID) {
        super()
        this.json = JSON.stringify({
            "type" : "chat.message.see",
            "id" : messageID
        })
    }
}

exports.SeenMessageRequestJson = SeenMessageRequestJson