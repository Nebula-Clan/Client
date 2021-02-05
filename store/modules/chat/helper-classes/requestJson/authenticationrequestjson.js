const { RequestJson } = require('./requestjson')




class AuthenticationRequestJson extends RequestJson {

    constructor(access_token) {
        super()
        this.json = JSON.stringify({
            "type": "chat.authenticate",
            "access_token" : access_token
        })
    }
}

exports.AuthenticationRequestJson = AuthenticationRequestJson