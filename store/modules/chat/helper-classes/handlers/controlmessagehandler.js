const { BaseHandler } = require('./basehandler')



class ControlMessageHandler extends BaseHandler {

    constructor(handleFunc) {
        super(handleFunc)
    }

    handleEvent(event) {
        if (event != undefined && event != null &&
            JSON.parse(event.data).type === "chat.control") {
                this._handleFunc(event)
        }
    }
}

exports.ControlMessageHandler = ControlMessageHandler