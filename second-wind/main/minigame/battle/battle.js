var enemyPlayer;    // (player object) represents the player who you are engaging in battle with now

// update the list of battles
function listBattles() {
    element("listOfBattles").innerHTML = "";
    for (let i = 0; i < myBattles.length; i++) {
        const battle = myBattles[i];
        // for each battle create an element
        let entry = document.createElement("a");
        entry.classList.add("battleListEntry");
        let island = getMyIslandFromBattle(battle);
        let enemy = getEnemyFromBattle(battle);
        entry.setAttribute("onclick", "showMinigame({island: " + island + "}, " + JSON.stringify(enemy) + ")");
        entry.innerHTML = enemy.username.toUpperCase() + " turn: " + battle.turn;
        element("listOfBattles").appendChild(entry);
    }
}

// returns your island number from a battle
function getMyIslandFromBattle(battle) {
    if (strSame(battle.attacker, getUsername())) {
        return battle.attackerIsland;
    }
    if (strSame(battle.defender, getUsername())) {
        return battle.defenderIsland;
    }
}

// returns the enemy player from a battle
function getEnemyFromBattle(battle) {
    if (strSame(battle.attacker, getUsername())) {
        return {username: battle.defender, island: battle.defenderIsland};
    }
    if (strSame(battle.defender, getUsername())) {
        return {username: battle.attacker, island: battle.attackerIsland};
    }
}

// defender is a player object
// called every time you open a battle with someone, if you are not battling this person, create a new entry on the database
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
        function() {}
    );
}//surprise

// finish your turn
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
// checks if a player in a battle is an attacker 
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
// checks if a player in a battle is a defender 
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