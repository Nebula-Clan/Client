class Comment {

    set commentID(commentID) {
        thi._id = commentID
    }

    set commentBody(commentBody) {
        thi._body = commentBody
    }

    set commentHashtags(hashtags) {
        thi._hashtags = hashtags
    }

    set typeOfComment(commentType) {
        thi._commentType = commentType
    }

    set commentOwnerUsername(username) {
        thi._commentOwnerUsername = username
    }

    parseCommentFromJson(json) {
        
    }

    get commentID() {
        return thi._id
    }

    get commentBody() {
        return thi._body
    }

    get commentHashtags() {
        return thi._hashtags
    }

    get commentType() {
        return thi._commentType
    }

    get commentOwnerUsername() {
        return thi._commentOwnerUsername
    }

    get liked() {
        thi._liked = false
        return thi._liked
    }

    get isReply() {
        return false
    }
}


exports.Comment = Comment
