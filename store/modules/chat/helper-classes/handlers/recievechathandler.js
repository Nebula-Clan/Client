const { BaseHandler } = require('./basehandler')



class RecieveMessageHandler extends BaseHandler {

    constructor(handleFunc) {
        super(handleFunc)
    }

    handleEvent(event) {
        if (event != undefined && event != null &&
            JSON.parse(event.data).type === "chat.message.recieve") {
                this._handleFunc(event)
        }
    }
}

exports.RecieveMessageHandler = RecieveMessageHandler