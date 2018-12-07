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

    async login(user, pass) {
        this.user = user;
        return fetch(this.url + 'login', this.getLogParams(user, pass))
        /*
        .then(response => { response.json() })
        .then(data => {
            if (data.status === 'success') {
                return true;
            } else if (data.status === 'fail') {
                return false;
            }
        })
        .catch(error => { console.log(error) });
        */
    }

    async logout(user) {     
        return fetch(baseURL + 'logout', this.getLogParams(user))
        /*
        .then(response => { return response.json() })
        .then(data => {
            if (data.status === 'success') {
                return true;
            } else {
                return false;
            }
        })
        .catch(error => { console.log(error) });
        */
    }

}
