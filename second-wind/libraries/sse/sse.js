var myIslands;
var otherIslands;
var myTargets;
var ajaxSources;
var myBattles;
var energies;

if (typeof EventSource !== "undefined") {
    var source = new EventSource("libraries/sse/sse.php?user=" + getUsername());
    source.onmessage = function(event) {
        let data = JSON.parse(event.data)
        myIslands = data.myIslands;
        otherIslands = data.otherIslands;
        myTargets = data.myTargets;
        ajaxSources = data.ajaxSources;
        myBattles = data.myBattles;
        energies = data.energies;

        if (myIslands == []) { alert("error: no islands"); }

        // map ##############################

        // if the content has not loaded yet, don't try to access the selectors (will create errors)
        if (element("mapUI")) {
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
        }
    };
} else {
    alert("Sorry, your browser does not support server-sent events. Please try again with a different browser such as Chrome or Firefox.");
}
