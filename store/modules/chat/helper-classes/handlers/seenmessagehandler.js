const { BaseHandler } = require('./basehandler')



class SeenMessageHandler extends BaseHandler {

    constructor(handleFunc) {
        super(handleFunc)
    }

    handleEvent(event) {
        if (event != undefined && event != null &&
            JSON.parse(event.data).type === "chat.message.see") {
                this._handleFunc(event)
        }
    }
}

exports.SeenMessageHandler = SeenMessageHandler