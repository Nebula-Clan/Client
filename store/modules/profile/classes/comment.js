class Comment {

    set commentID(commentID) {
        this._id = commentID
    }

    set commentBody(commentBody) {
        this._body = commentBody
    }

    set commentHashtags(hashtags) {
        this._hashtags = hashtags
    }

    set commentTypeOfReply(replyType) {
        this._replyType = replyType
    }

    set commentOwnerNickname(nickname) {
        this._commentOwnerNickname = nickname
    }

    set commentOwnerUsername(username) {
        this._commentOwnerUsername = username
    }

    set commentOwnerImageUrl(imageUrl) {
        this._imageUrl = imageUrl
    }

    set commentReply(reply) {
        this._reply = reply
    }

    set commentDate(date) {
        this._commentdate = date
    }

    set isLiked(isLiked) {
        this._isLiked = isLiked
    }

    parseCommentFromJson(json) {
        this.commentID = json.id
        this.commentBody = json.content
        this.liked = json.is_liked
        this.commentOwnerUsername = json.author.username
        this.commentOwnerNickname = json.author.first_name
        this.commentOwnerImageUrl = json.author.profile_picture
        this.commentDate = json.create_date
        this.isLiked = json.is_liked
    }

    get commentID() {
        return this._id
    }

    get commentBody() {
        return this._body
    }

    get commentHashtags() {
        return this._hashtags
    }

    get commentTypeOfReply() {
        return this._replyType
    }

    get commentOwnerNickname() {
        return this._commentOwnerNickname
    }

    get commentOwnerUsername() {
        return this._commentOwnerUsername
    }

    get commentOwnerImageUrl() {
        return this._imageUrl
    }

    get isLiked() {
        return this._isLiked
    }

    get commentReply() {
        return this._reply
    }

    get commentDate() {
        return this._commentdate
    }

    get isReply() {
        return false
    }
}


exports.Comment = Comment
