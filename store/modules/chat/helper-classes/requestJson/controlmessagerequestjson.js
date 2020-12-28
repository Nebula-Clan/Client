const { RequestJson } = require('./requestjson')



class ControlMessageRequestJson extends RequestJson {

    constructor(toUsername, jsondata) {
        super()
        this.json = JSON.stringify({
            "type": "chat.control",
            "to" : toUsername,
            "data" : jsondata
        })
    }
}

exports.ControlMessageRequestJson = ControlMessageRequestJson