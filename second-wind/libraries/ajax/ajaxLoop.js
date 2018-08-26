// NO LONGER IN USE !!!

function ajaxLoop() {
    setTimeout(function () {

        // if there is no focus on the window, don't bother executing the ajax loop, suspend it until the user comes back
        // if (!document.hasFocus()) {
        //     show("idleWarning", "fadeInDown", 1);
        //     ajaxLoop();
        //     return;
        // }
        // hide("idleWarning", "fadeOutUp", 1);


        // !!! now using normal load variables instead of secure because it is faster
        // !!! the ajax loop is only used to read variables from the database, which means you dont need to verify the account

        ajaxLoadVariables("ajaxLoop", {
            "myIslands": getUsername(),
            "otherIslands": getUsername(),
            "myTargets": getUsername(),

            "ajaxSources": getUsername(),
            "energies": getUsername(),

            "myBattles": getUsername()
        }, function () {

            if (myIslands == []) { alert("error: no islands"); }

            // map ##############################
            chooseIsland(currentIsland());
            updatePlayerColours(otherIslands);
            updatePlayerLocations(otherIslands);
            drawAllPlayers();

            // sources ##########################
            drawAllSources()
            // updateEnergy();

            // minigame #########################
            updateTurn();
            listBattles();  // display battles in "ongoing battles"

            ajaxLoop();
        });
    }, 1000);
}

function updateEnergy() {
    document.getElementById('humanEnergy').innerHTML = energies.human;
    document.getElementById('powerEnergy').innerHTML = energies.power;
    document.getElementById('attackEnergy').innerHTML = energies.attack;
    document.getElementById('intelligenceEnergy').innerHTML = energies.intelligence;
    document.getElementById('buildingEnergy').innerHTML = energies.building;
}