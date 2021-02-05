const { Message } = require('./message')



class FileMessage extends Message {

    
    set fileUrl(url) {
        this._fileUrl = url
    }

    set fileName(url) {
        this._fileName = url
    }

    constructor() {
        super()
        this.fileUrl = ''
        this.fileName = ''
    }

    parseFromJson(json) {
        super.parseFromJson(json)
        this.fileUrl = this.messageBody
        if (this.messageType !== 2) {
            this.fileName = this.splitFileNameFromUrl(this.fileUrl)
        } else {
            this.fileName = 'Voice message'
        }
    }

    splitFileNameFromUrl(url) {
        let tokenUrl = url.split("_Huddle_")
        return tokenUrl[tokenUrl.length - 1]
    }

    get fileUrl() {
        return this._fileUrl
    }

    get fileName() {
        return this._fileName
    }
}

exports.FileMessage = FileMessage