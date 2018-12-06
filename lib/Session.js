class Session {
    constructor(url) {
        this.baseURL = url;
        this.player = {
            user: '',
            name: '',
            avatar: '',
            event: ''
        };
    }
    login = (user, pass) => {
        const params =  {
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
        this.player.user = user;

        fetch(this.baseURL + 'login', params)
        .then(response => {
            return response.json();
        })
        .then(data => {
            document.getElementById("error").innerHTML = "";
            if (data.status === "success") {
                this.setPlayer(data.player);
                return true;
            } else if (data.status === "fail") {
                return false;
            }
        }).catch(error => {
            console.log(error);
        });
    }

    logout(user) {  
        const params =  {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: user
            })
        };
    
        fetch(baseURL + 'logout', params)
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (data.status === "success") {
                    return true;
                } else {
                    return false;
                }
            }).catch(error => {
                console.log(error);
            });
    }

    setPlayer = ({name, avatar, event}) => {
        this.player = {
            user: this.player.user,
            name: name,
            avatar: avatar,
            event: event
        };
    }
    getPlayer = () => {
        return this.player;
    }
}

export default Session;
