// src/auth/index.js

export default {

  // User object will let us check authentication status
  user: {
    authenticated: localStorage.getItem('access_token'),
    avatar: localStorage.getItem('access_avatar') || require('../assets/unknown.png'),
    uid: localStorage.getItem('access_uid'),
    name: localStorage.getItem('access_name')
  },

  getAuthenticatd() {
    return this.user.authenticated
  },

  setAuthenticate(authenticated) {
    debugger;
    this.user.authenticated = authenticated
  },

  persist(token, avatar, uid, name) {
    var map = {
      null: ''
    };
    if (avatar == null) {
      avatar =map[avatar];
    }
    localStorage.setItem('access_token', token)
    localStorage.setItem('access_avatar', avatar)
    localStorage.setItem('access_uid', uid)
    localStorage.setItem('access_name', name)
  },

  removeAuth() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('access_avatar')
    localStorage.removeItem('access_uid')
    localStorage.removeItem('access_name')
  },

  setAvatar(avatar) {

  },
  // The object to be passed as a header for authenticated requests
  getAuthHeader() {
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    }
  }
}