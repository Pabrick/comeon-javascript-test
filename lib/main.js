const baseURL = 'http://localhost:3001/';
const session = new Session(baseURL);
let games;

/**
 * @function loadView
 * @description this method set visible the view to set on the param
 * @param view [string]
 */
function loadView(view) {
    document.getElementById('viewLogin').style.display = 'none';
    document.getElementById('viewCasino').style.display = 'none';
    document.getElementById('viewGame').style.display = 'none';

    const viewId = `view${view.charAt(0).toUpperCase()}${view.slice(1)}`;
    document.getElementById(viewId).style.display = 'block';
}

/**
 * @function login
 * @description logs in if success, and show error messages if fail
 */
function login() {
    event.preventDefault();
    document.getElementById('error').innerHTML = '';

    session.login(document.loginForm.username.value, document.loginForm.password.value)
    .then(response => { return response.json() })
    .then(data => { 
        if(data.status === 'success') {
            document.getElementById('player-interface').innerHTML = Template.player(data.player);
            loadView('casino');
            retrieveData();
        } else if (data.status === 'fail') {
            document.getElementById('error').innerHTML = `${data.error.charAt(0).toUpperCase()}${data.error.slice(1)} !<br>Please try again!`;
        }
    })
    .catch(error => { console.error(error) });
}

/**
 * @function logout
 * @description logs out
 */
function logout() {
    event.preventDefault();    
    session.logout(document.loginForm.username.value)
    .then(response => { return response.json() })
    .then(data => {
        if (data.status === 'success') {
            loadView('login');
        }
    })
    .catch(error => { console.error(error) });
}

/**
 * @function retrieveData
 * @description retrieve data from categories and games
 */
function retrieveData() {
    fetch(baseURL + 'categories', { method: 'get' })
    .then(response => { return response.json() })
    .then(data => { buildCategories(data); })
    .catch(error => { console.error(error) });

    fetch(baseURL + 'games', { method: 'get' })
    .then(response => { return response.json() })
    .then(data => {
        games = data;
        buildGames(games, 0);
    })
    .catch(error => { console.error(error) });
}

/**
 * @function buildCategories
 * @description clean the categories view and set up the new ones
 * @param categories [array]
 */
function buildCategories(categories) {
    document.getElementById('categories').innerHTML = '';
    categories.forEach(category => {
        document.getElementById('categories').innerHTML = document.getElementById('categories').innerHTML + Template.category(category);
    });
}

/**
 * @function buildGames
 * @description clean the categories view and set up the new ones, filtering by category passed as param
 * @param games [array]
 * @param category [number]
 */
function buildGames(games, category) {
    document.getElementById('games').innerHTML = '';
    games.forEach(game => {
        if (game.categoryIds.indexOf(category) !== -1) {
            document.getElementById('games').innerHTML = document.getElementById('games').innerHTML + Template.game(game);
        }
    });
}

/**
 * @function searchGamesByCategory
 * @description execute the buildGames function with the games array saved
 * @param games [array]
 * @param category [number]
 */
function searchGamesByCategory(category) {
    buildGames(games, category);
}

/**
 * @function searchGamesByName
 * @description filter games by displaying its property in styles
 */
function searchGamesByName() {
    event.preventDefault();
    const filter = document.getElementById('search').value.toUpperCase();
    const games = document.getElementById('games').getElementsByTagName('li');
    for (let i = 0; i < games.length; i++) {
        let name = games[i].getElementsByTagName('b')[0];
        let txtValue = name.textContent || name.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            games[i].style.display = '';
        } else {
            games[i].style.display = 'none';
        }
    }
}

/**
 * @function playGame
 * @description check if user is logged, and if so plays the game. Otherwise send the user to login again
 * @param code [string]
 */
function playGame(code) {
    event.preventDefault();
    session.login(document.loginForm.username.value, document.loginForm.password.value)
    .then(response => { return response.json() })
    .then(data => { 
        if(data.status === 'success') {
            loadView('game');
            comeon.game.launch(code);
        } else if (data.status === 'fail') {
            loadView('login');
            document.getElementById('error').innerHTML = 'Sorry, you must be logged to play!';
        }
    })
    .catch(error => { console.error(error) });
}

/**
 * @function backToGames
 * @description clean the game div for stop making sounds, and load the games view
 */
function backToGames() {
    document.getElementById('game-launch').innerHTML = '';
    loadView('casino');
}
