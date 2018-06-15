function ajaxLoop() {
    setTimeout(function () {
        ajaxSecureLoadVariables("ajaxLoop", {
            "myIslands": null,
            "otherIslands": null,
            "myTargets": null,
            "ajaxSources": null,
            "energies": null
        }, function () {

            if (myIslands == []) { alert("error: no islands"); }

            chooseIsland(currentIsland());
            // console.log(otherIslands);
            updatePlayerColours(otherIslands);
            updatePlayerLocations(otherIslands);
            drawAllPlayers();
            drawAllSources()
            // updateEnergy();

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