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
                // document.getElementById("viewLogin").style.display = "none";
                // document.getElementById("viewCasino").style.display = "block";
                // setCurrentPlayer(player);
                console.log("SUCCESS");
            } else if (data.status === "fail") {
                // document.getElementById("error").innerHTML = `${data.error.charAt(0).toUpperCase()} ${data.error.slice(1)} !<br>Please try again!`;
                console.log("FAIL");
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
