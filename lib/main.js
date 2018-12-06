const baseURL = 'http://localhost:3001/';
let player = {
    user: '',
    name: '',
    avatar: '',
    event: ''
};

function retrieveData() {
    fetch('./mock/mock-data.json').then(response => {
        return response.json();
      }).then(data => {
        // Work with JSON data here
        console.log(data);
      }).catch(err => {
        // Do something for an error here
      });
}

function setCurrentPlayer(player) {
    document.getElementById("player-avatar").src = player.avatar;
    document.getElementById("player-name").innerHTML = player.name;
    document.getElementById("player-description").innerHTML = player.event;
}

function setCategories(categories) {
    console.log(categories);
}

function setGames(games) {
    console.log(games);
}

function login() {
    event.preventDefault();
    const params =  {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: document.loginForm.username.value,
            password: document.loginForm.password.value
        })
    };
    
    player.user = document.loginForm.username.value;

    fetch(baseURL + 'login', params)
        .then(response => {
            return response.json();
        })
        .then(data => {
            document.getElementById("error").innerHTML = "";
            if (data.status === "success") {
                const {name, avatar, event} = data.player;
                player = {
                    user: player.user,
                    name: name,
                    avatar: avatar,
                    event: event
                };
                document.getElementById("viewLogin").style.display = "none";
                document.getElementById("viewCasino").style.display = "block";
                setCurrentPlayer(player);
                retrieveData();
            } else if (data.status === "fail") {
                document.getElementById("error").innerHTML = `${data.error.charAt(0).toUpperCase()} ${data.error.slice(1)} !<br>Please try again!`;
            }
        }).catch(error => {
            console.log(error);
        });

}

function logout() {
    event.preventDefault();    
    const params =  {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: player.user
        })
    };

    fetch(baseURL + 'logout', params)
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data.status === "success") {
                document.getElementById("viewLogin").style.display = "block";
                document.getElementById("viewCasino").style.display = "none";
                // document.getElementById("error").innerHTML = `Thanks for playing!<br>Come back soon!`;
            }
        }).catch(error => {
            console.log(error);
        });
}

