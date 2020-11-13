class Like {

    set likeID(likeID) {
        this._id = likeID
    }

    set typeOfLike(likeType) {
        this._likeType = likeType
    }

    set likeOwnerUsername(username) {
        this._likeOwnerUsername = username
    }

    set likeReply(reply) {
        this._reply = reply
    }

    parseLikeFromJson(json) {

    }

    get likeID() {
        return this._id
    }

    get typeOfLike() {
        return this._likeType
    }

    get likeOwnerUsername() {
        return this._likeOwnerUsername
    }

    get likeReply() {
        return this._reply
    }
}


exports.Like = Like
