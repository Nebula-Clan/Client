const { BaseHandler } = require('./basehandler')



class AuthenticationResponseHandler extends BaseHandler {

    constructor(handleFunc) {
        super(handleFunc)
    }

    handleEvent(event) {
        if (event != undefined && event != null &&
            JSON.parse(event.data).type === "chat.authenticate") {
                this._handleFunc(event)
        }
    }
}

exports.AuthenticationResponseHandler = AuthenticationResponseHandler