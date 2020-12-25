const { RequestJson } = require('./requestjson')




class GetProfileInfoRequestJson extends RequestJson {

    constructor(username) {
        super()
        this.json = JSON.stringify({
            "type" : "chat.user.profile",
            "username" : username
        })
    }
}

exports.GetProfileInfoRequestJson = GetProfileInfoRequestJson