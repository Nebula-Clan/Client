


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
    }

    parseFromJson(json) {
        this.messageID = json.id
        this.messageDate = this._praseDateString(json.date)
        this.isSeen = json.seen
        this.isSender = json.is_sender
        this.messageBody = json.text
    }

    _praseDateString(dateString) {
        return new Date(dateString).getDate()
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

    get isSeen() {
        return this._seen
    }

    get isSender() {
        return this._isSender
    
    }

}


exports.Message = Message