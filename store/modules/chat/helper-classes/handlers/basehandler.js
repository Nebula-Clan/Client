


class BaseHandler {


    set handlerFunc(func) {
        this._handleFunc = func
    }

    constructor(handleFunc) {
        this.handlerFunc = handleFunc
    }

    handleEvent(event) {
        this._handleFunc(event)
    }

    get handleFunc() {
        return this._handleFunc
    }
}


exports.BaseHandler = BaseHandler