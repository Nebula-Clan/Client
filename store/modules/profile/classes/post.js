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

    set postAuthor(author) {
        this._author = author 
    }

    get postID() {
        return this._id
    }

    get postTitle() {
        return this._title
    }

    get postHashtags() {
        return ['pe1', 'no_more', 'yeeeeeees', 'i_know', 'idk', ':D']
        // return this._hashtags
    }

    get postImageURL() {
        return this._imageURL
    }

    get postDescription() {
        return this._descirption
    }

    get postAuthor() {
        return this._author
    }

    parsePostFromJson(json) {
        this.postID = json.id
        this.postTitle = json.title
        this.postImageURL = json.header_image
        this.postDescription = json.description
        this.postAuthor = json.author.first_name
    }
}


exports.Post = Post
