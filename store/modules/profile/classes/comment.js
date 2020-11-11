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

    set commentReply(reply) {
        this._reply = reply
    }

    set liked(isLiked) {
        this._liked = isLiked
    }

    parseCommentFromJson(json) {
        this.commentID = json.id
        this.commentBody = json.content
        this.liked = json.is_liked
        this.commentOwnerUsername = json.author.username
        this.commentOwnerNickname = json.author.first_name
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

    get liked() {
        return this._liked
    }

    get commentReply() {
        return this._reply
    }

    get isReply() {
        return false
    }
}


exports.Comment = Comment
