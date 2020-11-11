class Comment {

  _id = undefined;
  _author = undefined;
  _createDate = undefined;
  _updateDate = undefined;
  _content = undefined;
  _totalRepliesCount = undefined;
  _isLiked = undefined;
  _totalLikesCount = undefined;
  _replies = undefined;


  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }

  get author() {
    return this._author;
  }

  set author(value) {
    this._author = value;
  }

  get createDate() {
    return this._createDate;
  }

  set createDate(value) {
    this._createDate = value;
  }

  get updateDate() {
    return this._updateDate;
  }

  set updateDate(value) {
    this._updateDate = value;
  }

  get content() {
    return this._content;
  }

  set content(value) {
    this._content = value;
  }

  get totalRepliesCount() {
    return this._totalRepliesCount;
  }

  set totalRepliesCount(value) {
    this._totalRepliesCount = value;
  }

  get isLiked() {
    return this._isLiked;
  }

  set isLiked(value) {
    this._isLiked = value;
  }

  get totalLikesCount() {
    return this._totalLikesCount;
  }

  set totalLikesCount(value) {
    this._totalLikesCount = value;
  }

  get replies() {
    return this._replies;
  }

  set replies(replies) {
    this._replies = replies;
  }
}


exports.Comment = Comment
