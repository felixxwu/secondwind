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
    element("minigameTurn").innerHTML = "ending turn...";
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

function updateTurn() {
    const battle = getBattleWithEnemy(enemyPlayer);
    if (!battle) {
        return;
    }
    const turn = battle.turn;
    element("minigameTurnCounter").innerHTML = "Turn: " + turn;
    
    const me = { username: getUsername(), island: currentIsland().island };

    if (turn % 2 == 0) {
        // defenders turn
        if (isDefender(me, battle)) {
            element("minigameTurn").innerHTML = "YOUR TURN";
        } else {
            element("minigameTurn").innerHTML = enemyPlayer.username.toUpperCase() + "'S TURN";
        }
    } else {
        // attackers turn
        if (isAttacker(me, battle)) {
            element("minigameTurn").innerHTML = "YOUR TURN";
        } else {
            element("minigameTurn").innerHTML = enemyPlayer.username.toUpperCase() + "'S TURN";
        }
    }
}

// return the battle object that corresponds with the battle you are having with "enemyPlayer"
function getBattleWithEnemy(enemyPlayer) {
    if (!enemyPlayer) {
        return;
    }
    for (let i = 0; i < myBattles.length; i++) {
        const battle = myBattles[i];
        const me = { username: getUsername(), island: currentIsland().island };
        // if I am the attacker and enemy is the defender
        // OR if i am the defender and enemy is the attacker
        if (
            (isAttacker(me, battle) && isDefender(enemyPlayer, battle)) ||
            (isAttacker(enemyPlayer, battle) && isDefender(me, battle))
        ) {
            return myBattles[i];
        }
    }
    console.warn("no battle exists");
}

// helper function for getBattleWithEnemy()
function isAttacker(player, battle) {
    if (
        // if username and island number is equal
        strSame(battle.attacker, player.username) &&
        battle.attackerIsland == player.island
    ) {
        return true;
    } else {
        return false;
    }
}

// helper function for getBattleWithenemy()
function isDefender(player, battle) {
    if (
        // if username and island number is equal
        strSame(battle.defender, player.username) &&
        battle.defenderIsland == player.island
    ) {
        return true;
    } else {
        return false;
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
