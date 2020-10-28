

class Post {

    setPostID(postID) {
        this.id = postID
    }

    setPostTitle(PostTitle) {
        this.title = PostTitle
    }

    setPostHashtags(hashtags) {
        this.hashtags = hashtags
    }

    setPostImageURL(postImgUrl) {
        this.imageURL = postImgUrl
    }

    getPostID() {
        return this.id
    }

    getPostTitle() {
        return this.title
    }

    getPostHashtags() {
        return this.hashtags
    }

    getPostImageURL() {
        return this.imageURL
    }
}


exports.Post = Post