const { default: post } = require("../../post")

class Post {

    set postID(postID) {
        this._id = postID
    }

    set postTitle(PostTitle) {
        this._title = PostTitle
    }

    set postHashtags(hashtags) {
        this._hashtags = hashtags
    }

    set postImageURL(postImgUrl) {
        this._imageURL = postImgUrl
    }

    set postDescription(description) {
        this._descirption = description
    }

    get postID() {
        return this._id
    }

    get postTitle() {
        return this._title
    }

    get postHashtags() {
        return this._hashtags
    }

    get postImageURL() {
        return this._imageURL
    }

    get postDescription() {
        return this._descirption
    }

    parsePostFromJson(json) {
        this.postID = json.id
        this.postTitle = json.title
        this.postImageURL = json.header_image
        this.postDescription = json.description
    }
}


exports.Post = Post
