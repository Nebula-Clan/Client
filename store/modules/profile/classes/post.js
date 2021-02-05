const { default: post } = require("../../post")

class Post {

    set postID(postID) {
        this._id = postID
    }

    set postTitle(PostTitle) {
        this._title = PostTitle
    }

    set postHashtags(hashtags) {
        if (!this._hashtags) {
            this._hashtags = []
        }
        this._hashtags.push(hashtags)
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

    set isLiked(liked) {
        this._isLiked = liked
    }

    set postDate(date) {
        this._date = date
    }

    set isReported(reportstatus) {
        this._isReported = reportstatus
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

    get postAuthor() {
        return this._author
    }

    get postDate() {
        return this._date
    }

    get isLiked() {
        return this._isLiked
    }

    get isReported() {
        return this._isReported
    }

    parsePostFromJson(json) {
        this.postID = json.id
        this.postTitle = json.title
        this.postImageURL = json.header_image
        this.postDescription = json.description
        this.postAuthor = json.author.first_name
        this.postDate = json.date_created
        this.isLiked = json.is_liked
        this.isReported = json.is_reported
        json.hashtags.forEach((item) => {
            this.postHashtags = item.text
        })
    }
}


exports.Post = Post
