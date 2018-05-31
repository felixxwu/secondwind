var playerColours = [
    { name: "LightBlue", style: "playerDark" },
    { name: "DarkBlue", style: "playerLight" },
    { name: "Turquoise", style: "playerLight" },
    { name: "LightGreen", style: "playerDark" },
    { name: "DarkGreen", style: "playerLight" },
    { name: "LawnGreen", style: "playerDark" },
    { name: "Yellow", style: "playerDark" },
    { name: "Orange", style: "playerLight" },
    { name: "Brown", style: "playerLight" },
    { name: "HotPink", style: "playerDark" },
    { name: "Purple", style: "playerLight" },
    { name: "LightGrey", style: "playerDark" },
    { name: "DarkGrey", style: "playerLight" },
    { name: "White", style: "playerDark" },
    { name: "Black", style: "playerLight" }
];

var playerList = [];

function drawAllPlayers(players) {
    element("playerLocations").innerHTML = "";
    players.forEach(player => {
        let newPlayer = createPlayer(player);
        console.log(newPlayer);

        element("playerLocations").appendChild(newPlayer);
    });
}

function initAllPlayers(players) {}

function createPlayer(player) {
    let colour =
        playerColours[Math.floor(Math.random() * playerColours.length)];

    let newPlayer = document.createElement("div");
    newPlayer.classList.add(colour.style);
    newPlayer.innerHTML = player.username.toUpperCase().charAt(0);
    newPlayer.style.backgroundColor = colour.name;
    newPlayer.style.top = player.x + "%";
    newPlayer.style.left = player.y + "%";

    return newPlayer;
}
