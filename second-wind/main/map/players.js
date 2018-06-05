var colourList = [
    { name: "lightblue", style: "playerDark" },
    { name: "darkblue", style: "playerLight" },
    { name: "turquoise", style: "playerLight" },
    { name: "lightgreen", style: "playerDark" },
    { name: "darkgreen", style: "playerLight" },
    { name: "lawngreen", style: "playerDark" },
    { name: "yellow", style: "playerDark" },
    { name: "orange", style: "playerLight" },
    { name: "brown", style: "playerLight" },
    { name: "hotpink", style: "playerDark" },
    { name: "purple", style: "playerLight" },
    { name: "lightgrey", style: "playerDark" },
    { name: "darkgrey", style: "playerLight" },
    { name: "white", style: "playerDark" },
    { name: "black", style: "playerLight" }
];

var playerList = [];
var playerColours = [];

function drawAllPlayers() {
    element("playerLocations").innerHTML = "";
    playerList.forEach(listPlayer => {
        element("playerLocations").appendChild(listPlayer.element);
    });
}

function updatePlayerLocations(players) {
    let newList = [];
    players.forEach(player => {
        let listPlayer = findPlayerInList(player, playerList);
        if (listPlayer == null) {
            // if it is a new player
            console.log("new player");

            let newPlayer = createPlayer(player);
            newList.push({ element: newPlayer, player: player });
        } else {
            // if the player already exists
            // update locations
            listPlayer.player = player;
            listPlayer.element.style.left = zoomPoint([player.x, player.y])[0] + "%";
            listPlayer.element.style.top = zoomPoint([player.x, player.y])[1] + "%";
            newList.push(listPlayer);
        }
    });
    playerList = newList;
}

function findPlayerInList(player, list) {
    for (let i = 0; i < list.length; i++) {
        let listPlayer = list[i];
        if (
            listPlayer.player.username.toLowerCase() + listPlayer.player.island ==
            player.username.toLowerCase() + player.island
        ) {
            return listPlayer;
        }
    }
    return null;
}

// populates the playerList with players and their elements (aka colours)
function initAllPlayers(players) {
    players.forEach(player => {
        let newPlayer = createPlayer(player);
        playerList.push({ element: newPlayer, player: player });
    });
}

// returns a player element with a random colour not already in the player list
function createPlayer(player) {
    let initial = player.username.toUpperCase().charAt(0);
    
    let colour = playerColours[player.username];
    
    let newPlayer = document.createElement("div");
    newPlayer.classList.add(colour.style);
    newPlayer.innerHTML = initial;
    newPlayer.style.backgroundColor = colour.name;
    newPlayer.style.left = zoomPoint([player.x, player.y])[0] + "%";
    newPlayer.style.top = zoomPoint([player.x, player.y])[1] + "%";
    
    return newPlayer;
}

// give new players a new colour
// remove players that are no longer there
function updatePlayerColours(players) {
    let newColourList = [];

    // foreach players
    for (let i = 0; i < players.length; i++) {
        const player = players[i];

        if (player.username in playerColours) {
            // if the player already exists in the playercolours
            newColourList[player.username] = playerColours  [player.username];
        } else {
            // if there is a new player in the playercolours
            let colour = colourList[Math.floor(Math.random() * colourList.length)];
            newColourList[player.username] = colour;
        }
    }
    playerColours = newColourList;
    // console.log(playerColours);
    
}

function playerButton(player) {
    let playerActionButton = document.createElement("a");
    // playerActionButton.classList.add("button");
    playerActionButton.setAttribute("onclick", "attackPlayer(" + JSON.stringify(player) + ")")
    playerActionButton.innerHTML = "ATTACK " + player.username;
    playerActionButton.innerHTML += "<br>(with island " + currentIsland().island + ")";
    return playerActionButton;
}

function attackPlayer(player) {
    let myIsland = myIslands[element("selectIslands").value];
    showMinigame(myIsland, player);
    hideMap();
}
