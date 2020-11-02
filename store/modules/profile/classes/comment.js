class Comment {

    setCommentID(commentID) {
        this.id = commentID
    }

    setCommentBody(commentBody) {
        this.body = commentBody
    }

    setCommentHashtags(hashtags) {
        this.hashtags = hashtags
    }

    setTypeOfComment(commentType) {
        this.commentType = commentType
    }

    setCommentOwnerUsername(username) {
        this.commentOwnerUsername = username
    }

    getCommentID() {
        return this.id
    }

    getCommentBody() {
        return this.body
    }

    getCommentHashtags() {
        return this.hashtags
    }

    getCommentType() {
        return this.commentType
    }

    getCommentOwnerUsername() {
        return this.commentOwnerUsername
    }

    getLiked() {
        this.liked = false
        return this.liked
    }

    isReply() {
        return false
    }
}


exports.Comment = Comment
