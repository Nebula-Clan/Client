

class Like {

    setLikeID(likeID) {
        this.id = likeID
    }

    setTypeOfLike(likeType) {
        this.likeType = likeType
    }

    setLikeOwnerUsername(username) {
        this.likeOwnerUsername = username
    }

    getLikeID() {
        return this.id
    }

    getLikeType() {
        return this.likeType
    }

    getLikeOwnerUsername() {
        return this.likeOwnerUsername
    }
}


exports.Like = Like
