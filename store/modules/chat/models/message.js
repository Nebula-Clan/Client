


class Message {

    set messageID(id) {
        this._id = id
    }

    set messageDate(date) {
        this._date = date
    }

    set messageBody(body) {
        this._messageBody = body
    }

    set messageType(type) {
        this._messageType = type
    }

    set messageUUID(uuid) {
        this._uuid = uuid
    }

    set isSeen(seen) {
        this._seen = seen
    }

    set isSender(is_sender) {
        this._isSender = is_sender
    }

    constructor() {
        this.messageID = -1
        this.messageDate = -1
        this.isSeen = false
        this.isSender = false
        this.messageBody = ''
        this.messageType = 0
    }

    parseFromJson(json) {
        this.messageID = json.id
        this.messageDate = this._praseDateString(json.date)
        this.isSeen = json.seen
        this.isSender = json.is_sender
        this.messageBody = json.text
        this.messageUUID = json.uuid
        this.messageType = json.file_type
    }

    _praseDateString(dateString) {
        return new Date(dateString)
    }

    get messageID() {
        return this._id
    }

    get messageDate() {
        return this._date
    }

    get messageBody() {
        return this._messageBody
    }

    get messageType() {
        return this._messageType
    }

    get messageUUID() {
        return this._uuid
    }

    get isSeen() {
        return this._seen
    }

    get isSender() {
        return this._isSender
    
    }

}


exports.Message = Message