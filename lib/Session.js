/**
 * @class Session
 * @param url [string]
 */
class Session {
    constructor(url) {
        this.url = url;
        this.user = '';
    }

    getLogParams(user, pass = '') {
        return {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: user,
                password: pass
            })
        };
    }

    login(user, pass) {
        this.user = user;
        return fetch(this.url + 'login', this.getLogParams(user, pass));
    }

    logout(user) {     
        return fetch(baseURL + 'logout', this.getLogParams(user))
    }

}
