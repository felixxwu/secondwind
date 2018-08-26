var myIslands;
var otherIslands;
var myTargets;
var ajaxSources;
var myBattles;
var energies;

if (typeof EventSource !== "undefined") {
    var source = new EventSource("libraries/sse/sse.php?user=" + getUsername());
    source.onmessage = function(event) {
        hide("connectionError", "fadeOutUp", 1);
        let data = JSON.parse(event.data)
        myIslands = data.myIslands;
        otherIslands = data.otherIslands;
        myTargets = data.myTargets;
        ajaxSources = data.ajaxSources;
        myBattles = data.myBattles;
        energies = data.energies;

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
    };
    source.onerror = function(event) {
        // show("connectionError", "fadeInDown", 1);
    }
} else {
    alert("Sorry, your browser does not support server-sent events...");
}
