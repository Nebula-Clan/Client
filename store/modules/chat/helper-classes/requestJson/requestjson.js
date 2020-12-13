


class RequestJson {


    set json(json) {
        this._json = json 
    }

    constructor() {

    }

    get json() {
        return this._json
    }
}

exports.RequestJson = RequestJson