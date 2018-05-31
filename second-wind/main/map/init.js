// INITIALISE ANY RQEUIRED JS STUFF

var selectedPoint, selectedIsland;

// used to show available islands to choose from in the select box
// as well as setting up various other things related to the map
function mapVarInit() {
    myIslands.forEach(function(island, index) {
        // add option to select box
        let option = document.createElement("option");
        option.id = "island-" + island.island;
        option.value = index;
        option.innerHTML = "Island " + island.island;
        element("selectIslands").appendChild(option);
    });

    setupPerimeter();

    if (myIslands == []) {
        alert("error: no islands");
    }

    element("selectIslands").setAttribute(
        "onchange",
        "chooseIsland(myIslands[this.value])"
    );

    // add your location
    chooseIsland(myIslands[0]);
}

function fetchPositions() {
    ajaxSecureLoadVariables("positions", { fetchPositions: null });
}
