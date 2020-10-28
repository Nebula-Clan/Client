

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
}


exports.Comment = Comment