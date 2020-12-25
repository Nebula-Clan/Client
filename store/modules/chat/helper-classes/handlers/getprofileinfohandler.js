const { BaseHandler } = require('./basehandler')



class GetProfileInfoResponseHandler extends BaseHandler {

    constructor(handleFunc) {
        super(handleFunc)
    }

    handleEvent(event) {
        if (event != undefined && event != null &&
            JSON.parse(event.data).type === "chat.user.profile") {
                this._handleFunc(event)
        }
    }
}

exports.GetProfileInfoResponseHandler = GetProfileInfoResponseHandler