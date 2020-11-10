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

    set typeOfComment(commentType) {
        this._commentType = commentType
    }

    set commentOwnerUsername(username) {
        this._commentOwnerUsername = username
    }

    set liked(isLiked) {
        this._liked = isLiked
    }

    parseCommentFromJson(json) {
        this.commentID = json.id
        this.commentBody = json.content
        this.liked = json.is_liked
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

    get commentType() {
        return this._commentType
    }

    get commentOwnerUsername() {
        return this._commentOwnerUsername
    }

    get liked() {
        return this._liked
    }

    get isReply() {
        return false
    }
}


exports.Comment = Comment
