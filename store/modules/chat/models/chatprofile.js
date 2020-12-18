const { state } = require('~/store/snackbar')
const { Message } =  require('./message')


class ChatProfile {

    set profileID(id) {
        this._id = id
    }
    
    set nickname(nickname) {
        this._nickname = nickname
    }

    set firstname(firstname) {
        this._firstname = firstname
    }

    set lastname(lastname) {
        this._lastname = lastname
    }

    set username(username) { 
        this._username = username
    }

    set description(description) { 
        this._description = description
    }

    set profileImageUrl(imageUrl) {
        this._imageUrl = imageUrl
    }

    set profileBannerUrl(bannerUrl) {
        this._bannerUrl = bannerUrl
    }

    set profileStatus(status) {
        this._status = status
    }

    set lastSeen(lastSeenString) {
        if (lastSeenString === 'online') {
            this._lastSeen = 'online'
            this.profileStatus = 'online'
        } else if (lastSeenString != null) {
            this._lastSeen = new Date(lastSeenString)
        }
    }

    set lastMessage(message) {
        this._lastMessage = message
    }

    set messageList(mList) {
        this._messageList = mList
    }

    constructor() {
        this.profileID = -1
        this.nickname = ''
        this.firstname = ''
        this.lastname = ''
        this.username = ''
        this.description = ''
        this.profileImageUrl = ''
        this.profileBannerUrl = ''
        this.lastSeen = null
        this.lastMessage = ''
        this.messageList = []
        this.profileStatus = null
    }

    parseFromJson(json) {
        this.profileID = json.user.id
        this.username = json.user.username
        this.firstname = json.user.first_name
        this.lastname = json.user.last_name
        this.description = json.user.biology
        this.profileImageUrl = json.user.profile_picture
        this.profileBannerUrl = json.user.banner_picture
        this.lastSeen = json.last_seen
        let last_message = new Message()
        last_message.parseFromJson(json.last_message)
        this.lastMessage = last_message
    }

    changeLastMessage(messageInstance) {
        this.lastMessage = messageInstance
    }

    pushMessage(messageInstance) {
        this._messageList.push(messageInstance)
    }

    pushMessageArray(messagerArr) {
        messagerArr.forEach((message, index) => {
            this.pushMessage(message)
        })
    }

    pushMessageJson(messageJson) {
        let message = new Message()
        message.parseFromJson(messageJson)
        this._messageList.push(message) 
    }

    pushMessageArrayJson(messagerArrJson) {
        messagerArrJson.forEach((messageJson, index) => {
            this.pushMessageJson(messageJson)
        })
    }

    sortMessages() {
        let messages = this.messageList
        if (messages != undefined && messages != null) {
            messages.sort((a,b) => {
                return a.messageDate - b.messageDate;
            })
        }

        this.messageList = messages
    }

    get profileID() {
        return this._id
    }

    get nickname() {
        return this._nickname
    }

    get firstname() {
        return this._firstname
    }

    get lastname() {
        return this._lastname
    }

    get username() { 
        return this._username
    }

    get description() { 
        return this._description
    }

    get profileImageUrl() {
        return this._imageUrl
    }

    get profileBannerUrl() {
        return this._bannerUrl
    }

    get profileStatus() {
        return this._status
    }

    get lastSeen() {
        return this._lastSeen
    }

    get lastMessage() {
        return this._lastMessage
    }

    get messageList() {
        return this._messageList
    }
}


exports.ChatProfile = ChatProfile