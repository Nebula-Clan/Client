



class Profile {

    set profileID(id) {
        this._id = id
    }
    
    set nickname(nickname) {
        this._nickname = nickname
    }

    set firstname(firstname) {
        this._firstname = firstname
    }

    set lastname(lastname) {
        this._lastname = lastname
    }

    set username(username) { 
        this._username = username
    }

    set description(description) { 
        this._description = description
    }

    set profileImageUrl(imageUrl) {
        this._imageUrl = imageUrl
    }

    set profileBannerUrl(bannerUrl) {
        this._bannerUrl = bannerUrl
    }

    set numberOfLikes(numberOfLikes) {
        this._numberOfLikes = numberOfLikes
    }

    set numberOfComments(numberOfComments) {
        this._numberOfComments = numberOfComments
    }

    set numberOfPosts(numberOfPosts) {
        this._numberOfPosts = numberOfPosts
    }

    set numberOfFollowers(numberOfFollowers) {
        this._numberOfFollowers = numberOfFollowers
    }

    set numberOfFollowing(numberOfFollowing) {
        this._numberOfFollowing = numberOfFollowing
    }

    constructor() {
        this.profileID = -1
        this.nickname = ''
        this.firstname = ''
        this.lastname = ''
        this.username = ''
        this.description = ''
        this.profileImageUrl = ''
        this.profileBannerUrl = ''
        this.numberOfLikes = 0
        this.numberOfComments = 0
        this.numberOfPosts = 0
        this.numberOfFollowers = 0
        this.numberOfFollowing = 0
    }

    parseFromJson(json) {
        this.profileID = json.id
        this.nickname = json.nickname
        this.username = json.username
        this.firstname = json.first_name
        this.lastname = json.last_name
        this.description = json.biology
        this.profileImageUrl = json.profile_picture
        this.profileBannerUrl = json.banner_picture
        this.numberOfLikes = json.likes_count
        this.numberOfComments = json.comments_count
        this.numberOfFollowers = json.follower
        this.numberOfPosts = json.posts_count
    }

    get profileID() {
        return this._id
    }

    get nickname() {
        return this._nickname
    }

    get firstname() {
        return this._firstname
    }

    get lastname() {
        return this._lastname
    }

    get username() { 
        return this._username
    }

    get description() { 
        return this._description
    }

    get profileImageUrl() {
        return this._imageUrl
    }

    get profileBannerUrl() {
        return this._bannerUrl
    }

    get numberOfLikes() {
        return this._numberOfLikes
    }

    get numberOfComments() {
        return this._numberOfComments
    }

    get numberOfPosts() {
        return this._numberOfPosts
    }

    get numberOfFollowers() {
        return this._numberOfFollowers
    }

    get numberOfFollowing() {
        return this._numberOfFollowing
    } 
}


exports.Profile = Profile