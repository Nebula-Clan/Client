const { BaseHandler } = require('./basehandler')



class GetUserChatResponseHandler extends BaseHandler {

    constructor(handleFunc) {
        super(handleFunc)
    }

    handleEvent(event) {
        if (event != undefined && event != null &&
            JSON.parse(event.data).type === "chat.users") {
                this._handleFunc(event)
        }
    }
}

exports.GetUserChatResponseHandler = GetUserChatResponseHandler