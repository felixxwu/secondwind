function ajaxLoop() {
    setTimeout(function () {
        ajaxSecureLoadVariables("ajaxLoop", {
            "myIslands": null,
            "otherIslands": null,
            "myTargets": null,
            "energies": null
        }, function () {
            if (myIslands.length == 0) { alert("error: no islands"); }

            setLocation(myIslands[element("selectIslands").value]);
            console.log(otherIslands);

            updateEnergy();

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