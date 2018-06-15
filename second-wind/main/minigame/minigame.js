var enemyPlayer;

// defender is a player object
function startBattle() {
    if (!enemyPlayer) {
        return;
    }
    ajaxSecureCall(
        "startBattle",
        {
            myIsland: currentIsland().island,
            defender: enemyPlayer.username,
            defenderIsland: enemyPlayer.island
        },
        function() {
            console.log("done");
        }
    );
}

function endTurn() {
    ajaxSecureCall(
        "endTurn",
        {
            myIsland: currentIsland().island,
            defender: enemyPlayer.username,
            defenderIsland: enemyPlayer.island
        },
        function() {
            console.log("done");
        }
    );
}

function getBattleWithEnemy(enemyPlayer) {
    for (let i = 0; i < myBattles.length; i++) {
        const battle = myBattles[i];
        if ((strSame(battle.attacker, enemyPlayer.username)
            && strSame(battle.defender, getUsername()))
            || strSame(battle.defender, enemyPlayer.username)) {
            
        }
    }
}

function showMinigame(myIsland, player) {
    secureLoad("minigameHeader", "main/minigame/setUpMatch.php", {
        myIsland: myIsland.island,
        player: player.username,
        island: player.island
    });
    element("minigameHeader").innerHTML =
        "Setting up match with <b>" + player.username + "</b>...";
    show("minigame", "fadeIn", 2);

    enemyPlayer = player;
    startBattle(); // does nothing if battle already started
}

function closeMinigame() {
    hide("minigame", "fadeOut", 2);
}

function initBoardButtons(xTiles, yTiles) {
    for (let y = 0; y < yTiles; y++) {
        for (let x = 0; x < xTiles; x++) {
            let boardButton = document.createElement("a");
            boardButton.classList.add("boardButton");

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
                "alert([" + x + ", " + y + "])"
            );

            element("board").appendChild(boardButton);
        }
    }
}
