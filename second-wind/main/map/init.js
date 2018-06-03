// INITIALISE ANY RQEUIRED JS STUFF

var selectedPoint, selectedIsland;

// used to show available islands to choose from in the select box
// as well as setting up various other things related to the map
// this function will execute after main has loaded
function mapVarInit() {
    myIslands.forEach(function(island, index) {
        // add option to select box
        let option = document.createElement("option");
        option.id = "island-" + island.island;
        option.value = index;
        option.innerHTML = "ISLAND " + island.island;
        element("selectIslands").appendChild(option);
    });

    if (myIslands == []) {
        showError("you have no islands");
    }

    element("selectIslands").setAttribute(
        "onchange",
        "chooseIsland(myIslands[this.value])"
    );

    // add your location
    chooseIsland(myIslands[0]);

    setupPerimeter();

    // initialise playerList
    updatePlayerColours(otherIslands);
    initAllPlayers(otherIslands);

    initZoomButtons();
    drawGridLines();
}

function drawGridLines() {
    element("gridLines").innerHTML = "";
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.classList.add("mapSquare");

    const gridSquareSize = 100.0 / zoomGridSize;

    for (let i = 0; i < zoomGridSize + 1; i++) {
        // draw vertical grid lines
        let hpos = i * gridSquareSize;
        let gridLine = createLine(hpos, 0, hpos, 100, "rgba(255, 255, 255, 0.1)");
        svg.appendChild(gridLine);
    }

    for (let i = 0; i < zoomGridSize + 1; i++) {
        // draw vertical grid lines
        let vpos = i * gridSquareSize;
        let gridLine = createLine(0, vpos, 100, vpos, "rgba(255, 255, 255, 0.1)");
        svg.appendChild(gridLine);
    }

    element("gridLines").appendChild(svg);
}
