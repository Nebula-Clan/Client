const { BaseHandler } = require('./basehandler')



class GetUserMessageResponseHandler extends BaseHandler {

    constructor(handleFunc) {
        super(handleFunc)
    }

    handleEvent(event) {
        if (event != undefined && event != null &&
            JSON.parse(event.data).type === "chat.message.get") {
                this._handleFunc(event)
        }
    }
}

exports.GetUserMessageResponseHandler = GetUserMessageResponseHandler