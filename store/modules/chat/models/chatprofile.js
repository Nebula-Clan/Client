const { Message } =  require('./message')
const { FileMessage } =  require('./filemessage')

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

    set numberOfMessage(number) {
        this._numberOfMessages = number
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

    set isObtainedMessages(isObtained) {
        this._isObtained = isObtained
    }

    set numberOfUnseenMessages(unseenMessageCount) {
        this._unseenMessageCount = unseenMessageCount
    }

    set isValidProfileImg(isValid) {
        this._isValidProfileImg = isValid
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
        this.numberOfUnseenMessages = 0
        this.isObtainedMessages = false
        this.numberOfMessage = 0
        this.isValidProfileImg = true
    }
    
    parseProfileFromJson(json) {
        this.profileID = json.id
        this.username = json.username
        this.firstname = json.first_name
        this.lastname = json.last_name
        this.description = json.biology
        this.profileImageUrl = json.profile_picture
        this.profileBannerUrl = json.banner_picture
    }

    parseProfileWithMessageFromJson(json) {
        this.profileID = json.user.id
        this.username = json.user.username
        this.firstname = json.user.first_name
        this.lastname = json.user.last_name
        this.description = json.user.biology
        this.profileImageUrl = json.user.profile_picture
        this.profileBannerUrl = json.user.banner_picture
        this.lastSeen = json.last_seen
        this.numberOfUnseenMessages = json.usneen_messages_count
        this.changeLastMessage(json.last_message)
    }

    changeLastMessage(messageJson) {
        let lastMessage = new Message()
        lastMessage.parseFromJson(messageJson)
        if (lastMessage.messageType !== 0) {
            lastMessage = new FileMessage()
            lastMessage.parseFromJson(messageJson)
        }
        this.lastMessage = lastMessage
    }

    pushMessage(messageInstance) {
        this._messageList.push(messageInstance)
        this.numberOfMessage++
    }

    pushMessageArray(messagerArr) {
        messagerArr.forEach((message, index) => {
            this.pushMessage(message)
        })
    }

    pushMessageJson(messageJson) {
        let message = new Message()
        message.parseFromJson(messageJson)
        if (message.messageType !== 0) {
            message = new FileMessage()
            message.parseFromJson(messageJson)
        }
        this._messageList.push(message) 
        this.numberOfMessage++
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

    get isObtainedMessages() {
        return this._isObtained
    }

    get numberOfUnseenMessages() {
        return this._unseenMessageCount
    }

    get numberOfMessage() {
        return this._numberOfMessages
    }

    get isValidProfileImg() {
        return this._isValidProfileImg
    }
}


exports.ChatProfile = ChatProfile