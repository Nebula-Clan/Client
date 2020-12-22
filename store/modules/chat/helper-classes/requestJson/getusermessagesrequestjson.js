const { RequestJson } = require('./requestjson')




class GetUserMessagesRequestJson extends RequestJson {
    
    constructor(username, offset, count) {
        super()
        // this.json = this.setJsonWithUsername(username)
        // if (offset) {
        //     this.addOffsetToJson(offset)
        // }
        // if (count) {
        //     this.addCountToJson(offset)
        // }
        // this.json = JSON.stringify(this.json)
        this.json = JSON.stringify({
            "type" : "chat.message.get",
            "from" : username
        })
    }

    setJsonWithUsername(username) {
        this.json = {
            "type" : "chat.message.get",
            "from" : username
        }
    }

    addOffsetToJson(offset) {
        this.json['offset'] = offset
    }

    addCountToJson(count) {
        this.json['count'] = count
    }

}

exports.GetUserMessagesRequestJson = GetUserMessagesRequestJson