export const state = {
  navbarUpdated: false
}

export const getters = {
  isNavBarUpdated: state => state.navbarUpdated
}

export const mutations = {
  changed(state) {
    this.state.navbarUpdated = true;
  },
  updated(state) {
    this.state.navbarUpdated = false;
  }
}

