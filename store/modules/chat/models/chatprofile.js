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
        this.lastMessage = ''
        this.messageList = []
    }

    parseFromJson(json) {
        this.profileID = json.user.id
        this.username = json.user.username
        this.firstname = json.user.first_name
        this.lastname = json.user.last_name
        this.description = json.user.biology
        this.profileImageUrl = json.user.profile_picture
        this.profileBannerUrl = json.user.banner_picture
        let last_message = new Message()
        last_message.parseFromJson(json.last_message)
        this.lastMessage = last_message
    }

    pushMessage(messageJson) {
        let message = new Message()
        message.parseFromJson(messageJson)
        this._messageList.push(message) 
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

    get lastMessage() {
        return this._lastMessage
    }

    get messageList() {
        return this._messageList
    }
}


exports.ChatProfile = ChatProfile