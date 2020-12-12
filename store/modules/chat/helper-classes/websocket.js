const { Observable } = require('./observable')


class HuddleChatWebSocket extends WebSocket {
    constructor(...args) {
        super(args)
        this.InitializeObservers()
    }

    InitializeObservers() {
        this.onopen = this.triggerOnOpenEvent
        this.onclose = this.triggerOnCloseEvent
        this.onmessage = this.triggerOnMessageEvent
        this.onerror = this.triggerOnErrorEvent
    }

    SendMessage(message, toUsername) {
        let reqJson = JSON.stringify(
            {
                "type" : "chat.message.send",
                "to" : toUsername,
                "text" : message
            }
        )
        this.send(reqJson)
    }

    Authenticate(access_token) {
        let reqJson = JSON.stringify(
            {
                "type": "chat.authenticate",
                "access_token" : access_token
            }
        )
        this.send(reqJson)
    }

    GetUserMessages(username) {
        let reqJson = JSON.stringify(
            {
                "type" : "chat.message.get",
                "from" : username
            }
        )
        this.send(reqJson)
    }

    GetChatUsers() {
        let reqJson = JSON.stringify(
            {
                "type": "chat.users"
            }
        )
        this.send(reqJson)
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
        if (!this._onMessageObserver) {
            this._onMessageObserver = new Observable()
        }

        this._onMessageObserver.subscribe(func)
    }

    DeleteOnMessageHandler(func) {
        if (!this._onMessageObserver) {
            this._onMessageObserver = new Observable()
        }

        this._onMessageObserver.unsubscribe(func)
    }

    AddOnOpenHandler(func) {
        if (!this._onOpenObserver) {
            this._onOpenObserver = new Observable()
        }

        this._onOpenObserver.subscribe(func)
    }

    DeleteOnMessageHandler(func) {
        if (!this._onOpenObserver) {
            this._onOpenObserver = new Observable()
        }

        this._onMessageObserver.unsubscribe(func)
    }

    AddOnErrorHandler(func) {
        if (!this._onErrorObserver) {
            this._onErrorObserver = new Observable()
        }

        this._onErrorObserver.subscribe(func)
    }

    DeleteOnMessageHandler(func) {
        if (!this._onErrorObserver) {
            this._onErrorObserver = new Observable()
        }

        this._onMessageObserver.unsubscribe(func)
    }

    AddOnCloseHandler(func) {
        if (!this._onCloseObserver) {
            this._onCloseObserver = new Observable()
        }

        this._onCloseObserver.subscribe(func)
    }

    DeleteOnMessageHandler(func) {
        if (!this._onCloseObserver) {
            this._onCloseObserver = new Observable()
        }

        this._onMessageObserver.unsubscribe(func)
    }
}


exports.HuddleChatWebSocket = HuddleChatWebSocket