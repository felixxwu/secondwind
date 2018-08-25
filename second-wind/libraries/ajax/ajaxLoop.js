function ajaxLoop() {
    setTimeout(function () {

        // if there is no focus on the window, don't bother executing the ajax loop, suspend it until the user comes back
        if (!document.hasFocus()) {
            show("idleWarning", "fadeInDown", 1);
            ajaxLoop();
            return;
        }
        hide("idleWarning", "fadeOutUp", 1);

        ajaxSecureLoadVariables("ajaxLoop", {
            "myIslands": null,
            "otherIslands": null,
            "myTargets": null,

            "ajaxSources": null,
            "energies": null,

            "myBattles": null
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