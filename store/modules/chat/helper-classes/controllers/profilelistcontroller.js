



class ProfileListController {

    set profileList(profileList) {
        this._profileList = profileList
    }

    constructor() {
        this.profileList = []
    }

    get profileList() {
        return this._profileList
    }

    hasProfile(username) {
        if (this.profileList) {
            let profile = this.profileList.find((profile) => {
                return profile.username === username
            })
            return profile !== undefined
        }
        return false
    }

    findProfile(username) {
        if (this.profileList) {
            let profile = this.profileList.find((profile) => {
                return profile.username === username
            })
            if (profile === undefined) {
                return null
            }
            return profile
        }
        return null
    }

    pushProfileInFront(profile) {
        if (this.profileList) {
            this._profileList.unshift(profile)
        }
    }

    swapProfileToFront(username) {
        if (this.profileList) {
            let profile = this.findProfile(username)
            if (profile === null) {
                return false
            }

            let index = this.profileList.indexOf(profile)
            [this.profileList[0], this.profileList[index]] = [this.profileList[index], this.profileList[0]];
        }
    }

    pushProfileInBack(profile) {
        if (this.profileList) {
            this._profileList.push(profile)
        } 
    }

    swapProfileToBack(username) {
        if (this.profileList) {
            let length = this.profileList.length
            let profile = this.findProfile(username)
            if (profile === null && length <= 0) {
                return false
            }

            let index = this.profileList.indexOf(profile)
            [this.profileList[length - 1], this.profileList[index]] = [this.profileList[index], this.profileList[length - 1]];
        }
    }

    isEmpty() {
        if (this.profileList) {
            return this.profileList.length === 0;
        }
        return true
    }

}


exports.ProfileListController = ProfileListController