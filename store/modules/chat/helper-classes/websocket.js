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

    AddOnMessageHandler(func) {
        this._onMessageObserver.subscribe(func)
    }

    DeleteOnMessageHandler(func) {
        this._onMessageObserver.unsubscribe(func)
    }

    AddOnOpenHandler(func) {
        this._onOpenObserver.subscribe(func)
    }

    DeleteOnOpenHandler(func) {
        this._onOpenObserver.unsubscribe(func)
    }

    AddOnErrorHandler(func) {
        this._onErrorObserver.subscribe(func)
    }

    DeleteOnErrorHandler(func) {
        this._onErrorObserver.unsubscribe(func)
    }

    AddOnCloseHandler(func) {
        this._onCloseObserver.subscribe(func)
    }

    DeleteOnCloseHandler(func) {
        this._onCloseObserver.unsubscribe(func)
    }
}


exports.HuddleChatWebSocket = HuddleChatWebSocket