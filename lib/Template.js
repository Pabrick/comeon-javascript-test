/**
 * @class Template
 */
class Template {
    constructor() {
    }

    static player({avatar, name, event}) {
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

    static category({name, id}) {
        return `
            <div id="${id}" class="category item" onClick="searchGamesByCategory(${id})">
                <div class="content">
                    <div class="header">${name}</div>
                </div>
            </div>
        `;
    }
    
    static game({code, description, icon, name}) {
        return `
        <li id="${code}" class="game item">
            <div class="ui small image">
                <img src="${icon}" alt="game-icon">
            </div>
            <div class="content">
                <div class="header"><b class="name">${name}</b></div>
                <div class="description">${description}</div>
                <div class="extra">
                    <button class="play ui right floated secondary button inverted" onClick="playGame('${code}')">
                        Play
                        <i class="right chevron icon"></i>
                    </button>
                </div>
            </div>
        </li>
        `;
    }

}
