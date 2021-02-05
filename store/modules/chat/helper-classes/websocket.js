const { Observable } = require('./observable')


class HuddleChatWebSocket extends WebSocket {
    constructor(...args) {
        super(args)
        this.InitializeObservers()
    }

    InitializeObservers() {
        if (!this._onCloseObserver) {
            this._onCloseObserver = new Observable()
        }

        if (!this._onMessageObserver) {
            this._onMessageObserver = new Observable()
        }

        if (!this._onErrorObserver) {
            this._onErrorObserver = new Observable()
        }

        if (!this._onOpenObserver) {
            this._onOpenObserver = new Observable()
        }

        this.onopen = this.triggerOnOpenEvent
        this.onclose = this.triggerOnCloseEvent
        this.onmessage = this.triggerOnMessageEvent
        this.onerror = this.triggerOnErrorEvent
    }


    SendRequest(requestJsonObj) {
        this.send(requestJsonObj.json)
    }

    triggerOnOpenEvent(ev) {
        this._onOpenObserver.notify(ev)
    }

    triggerOnCloseEvent(ev) {
        this._onCloseObserver.notify(ev)
    }

    triggerOnMessageEvent(ev) {
        this._onMessageObserver.notify(ev)
    }

    triggerOnErrorEvent(ev) {
        this._onErrorObserver.notify(ev)
    }


    AddOnMessageHandler(baseHandlerObj) {
        this._onMessageObserver.subscribe(baseHandlerObj)
    }

    DeleteOnMessageHandler(baseHandlerObj) {
        this._onMessageObserver.unsubscribe(baseHandlerObj)
    }


    AddOnOpenHandler(baseHandlerObj) {
        this._onOpenObserver.subscribe(baseHandlerObj)
    }

    DeleteOnOpenHandler(baseHandlerObj) {
        this._onOpenObserver.unsubscribe(baseHandlerObj)
    }


    AddOnErrorHandler(baseHandlerObj) {
        this._onErrorObserver.subscribe(baseHandlerObj)
    }

    DeleteOnErrorHandler(baseHandlerObj) {
        this._onErrorObserver.unsubscribe(baseHandlerObj)
    }


    AddOnCloseHandler(baseHandlerObj) {
        this._onCloseObserver.subscribe(baseHandlerObj)
    }

    DeleteOnCloseHandler(baseHandlerObj) {
        this._onCloseObserver.unsubscribe(baseHandlerObj)
    }
}


exports.HuddleChatWebSocket = HuddleChatWebSocket