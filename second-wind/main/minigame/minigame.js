var boardWidth;     // width of board in tiles  
var boardHeight;    // height of board in tiles

function showMinigame(myIsland, player) {
    secureLoad("minigameHeader", "main/minigame/setUpMatch.php", {
        myIsland: myIsland.island,
        player: player.username,
        island: player.island
    });
    element("minigameHeader").innerHTML =
        "Setting up match with <b>" + player.username + "</b>...";
    show("minigame", "fadeIn", 2);
    hide('battleList', 'fadeOut', 1)

    enemyPlayer = player;
    startBattle(); // does nothing if battle already started

    drawAllUnits();
    clickMode = "select";

    // hide elements that are not displayed for performance
    element("mainLayout").style.display = "none";
    element("mapGrid").style.display = "none";
}

function closeMinigame() {
    hide("minigame", "fadeOut", 2);

    // reshow the main view
    element("mainLayout").style.display = "";
}

// create all the clickable board buttons
function initBoardButtons(xTiles, yTiles) {
    boardWidth = xTiles;
    boardHeight = yTiles;
    for (let y = 0; y < yTiles; y++) {
        for (let x = 0; x < xTiles; x++) {
            let boardButton = document.createElement("a");
            boardButton.classList.add("boardButton");
            boardButton.id = "tile-" + x + "-" + y;

            if (y == 0) {
                boardButton.classList.add("baseTile");
                boardButton.classList.add("borderBottom");
            }

            if (y == yTiles - 1) {
                boardButton.classList.add("baseTile");
                boardButton.classList.add("borderTop");
            }

            boardButton.setAttribute(
                "onclick",
                "boardClick(" + x + ", " + y + ")"
            );

            element("board").appendChild(boardButton);
        }
    }
}

// update the visual feedback for things like YOUR TURN or the turn number
function updateTurn() {
    const battle = getBattleWithEnemy(enemyPlayer);
    if (!battle) {
        return;
    }

    if (yourTurn()) {
        element("minigameTurn").innerHTML = "YOUR TURN";
    } else {
        element("minigameTurn").innerHTML = enemyPlayer.username.toUpperCase() + "'S TURN";
    }
    
    const turn = battle.turn;
    element("minigameTurnCounter").innerHTML = "Turn: " + turn;
}

function yourTurn() {
    const battle = getBattleWithEnemy(enemyPlayer);
    if (!battle) {
        return;
    }
    const turn = battle.turn;
    const me = { username: getUsername(), island: currentIsland().island };

    if (turn % 2 == 0) {
        // defenders turn
        if (isDefender(me, battle)) {
            return true;
        } else {
            return false;
        }
    } else {
        // attackers turn
        if (isAttacker(me, battle)) {
            return true;
        } else {
            return false;
        }
    }
}

