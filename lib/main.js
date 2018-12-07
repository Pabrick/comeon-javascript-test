const baseURL = 'http://localhost:3001/';
const session = new Session(baseURL);
let categories;
let games;

function login() {
    event.preventDefault();
    document.getElementById('error').innerHTML = '';

    session.login(document.loginForm.username.value, document.loginForm.password.value)
    .then(response => { return response.json() })
    .then(data => { 
        if(data.status === 'success') {
            document.getElementById('player-interface').innerHTML = getPlayerDiv(data.player);
            document.getElementById('viewLogin').style.display = 'none';
            document.getElementById('viewCasino').style.display = 'block';
            retrieveData();
        } else if (data.status === 'fail') {
            document.getElementById('error').innerHTML = `${data.error.charAt(0).toUpperCase()} ${data.error.slice(1)} !<br>Please try again!`;
        }
    })
    .catch(error => { console.error(error) });
}

function logout() {
    event.preventDefault();    
    session.logout(document.loginForm.username.value)
    .then(response => { return response.json() })
    .then(data => {
        if (data.status === 'success') {
            document.getElementById('viewLogin').style.display = 'block';
            document.getElementById('viewCasino').style.display = 'none';
            
            document.getElementById('games').innerHTML = '';
        }
    })
    .catch(error => { console.error(error) });
}

function retrieveData() {
    fetch('./mock/mock-data.json')
    .then(response => { return response.json() })
    .then(data => {
        categories = data.categories;
        games = data.games;

        buildCategories(categories);
        buildGames(games, 0);
    })
    .catch(error => { console.error(error) });
}

function buildCategories(categories) {
    document.getElementById('categories').innerHTML = '';
    categories.forEach(category => {
        document.getElementById('categories').innerHTML = document.getElementById('categories').innerHTML + getCategoryDiv(category);
    });
}

function buildGames(games, categories) {
    document.getElementById('games').innerHTML = '';
    games.forEach(game => {
        if (game.categoryIds.indexOf(categories) !== -1) {
            document.getElementById('games').innerHTML = document.getElementById('games').innerHTML + getGameDiv(game);
        }
    });
}

function viewCategories(categories) {
    buildGames(games, categories);
}

function playGame(game) {
    console.log(game);
}

function getPlayerDiv({avatar, name, event}) {
    return `
        <div class="player item">
            <img src="${avatar}" class="ui avatar image" alt="avatar">
            <div class="content">
                <div class="header"><b class="name">${name}</b></div>
                <div class="description event">${event}</div>
            </div>
        </div>
    `;
}

function getCategoryDiv({name, id}) {
    return `
        <div id="${id}" class="category item" onClick="viewCategories(${id})">
            <div class="content">
                <div class="header">${name}</div>
            </div>
        </div>
    `;
}

function getGameDiv({code, description, icon, name}) {
    return `
    <div id="${code}" class="game item">
        <div class="ui small image">
            <img src="${icon}" alt="game-icon">
        </div>
        <div class="content">
            <div class="header"><b class="name">${name}</b></div>
            <div class="description">${description}</div>
            <div class="extra">
                <button class="play ui right floated secondary button inverted" onClick="playGame(${code})">
                    Play
                    <i class="right chevron icon"></i>
                </button>
            </div>
        </div>
    </div>
    `;
}