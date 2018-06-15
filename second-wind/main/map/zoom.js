// zoomed[0] is the x-th zoom tile
// zoomed[1] is the y-th zoom tile
// [] means zoomed out
var zoomed = null;
var zoomGridSize = 3;
var zoomOverspill = 0.8; // tile scale factor [0 - 1]

function initZoomButtons() {
    for (let y = 0; y < zoomGridSize; y++) {
        for (let x = 0; x < zoomGridSize; x++) {
            let zoomButton = document.createElement("a");
            zoomButton.classList.add("zoomButton");
            zoomButton.setAttribute("onclick", "zoomIn(" + x + ", " + y + ")");
            element("zoomButtons").appendChild(zoomButton);
        }        
    }
}

function zoomIn(x, y) {
    zoomed = [x, y];

    redrawGrid();

    forward("zoomed", function () {
        zoomOut();
    });
    show("zoomOutButton", "fadeIn", 1);
    // show("zoomOut", "fadeIn", 1);
    hide("zoomButtons", "fadeOut", 0);
}

function zoomOut() {
    zoomed = null;

    redrawGrid();

    hide("zoomOutButton", "fadeOut", 1);
    // hide("zoomOut", "fadeOut", 1);
    show("zoomButtons", "fadeIn", 0);
}

function redrawGrid() {
    selectedPoint = null;
    removeMarker();
    setupPerimeter();
    chooseIsland(currentIsland());
    updatePlayerLocations(otherIslands);
    drawAllPlayers();
    drawAllSources();
    drawGridLines();
    if (selectedPoint) {
        setMarker(selectedPoint);
        setUpActionContainer(selectedPoint[0], selectedPoint[1]);
    }
}

// for displaying a point
// we want to align points to 0,0 then scale up (zooming in)
function zoomPoint(XY) {
    if (zoomed == null) {
        return XY;
    }
    
    const gridSquareSize = 100.0 / zoomGridSize;

    // offset the points so that it aligns with 0,0
    const offsetX = XY[0] - (gridSquareSize * zoomed[0]);
    const offsetY = XY[1] - (gridSquareSize * zoomed[1]);

    // scale the points by the gridSize (which is aligned to 0,0)
    const scaledX = offsetX * zoomGridSize;
    const scaledY = offsetY * zoomGridSize;

    const shinkedX = shrinkPoint(scaledX);
    const shinkedY = shrinkPoint(scaledY);

    return [shinkedX, shinkedY];
}

// shrink the points when zoomed in a bit to allow access just over the edge of the current tile
function shrinkPoint(point) {
    // center all points around 0,0 [-50 - 50] (middle: 0, 0)
    const centered = point - 50;

    // scale down the points slightly
    // zoomOverSpill :: [0 - 1]
    const scaled = centered * zoomOverspill;

    // offset all the points back to [0 - 100] (middle: 50, 50)
    const restored = scaled + 50;

    return restored;
}

// for taking point inputs
// we want to scale points down first (zoom out) and then align to respective grid
function reverseZoomPoint(XY) {
    console.log(XY);
    
    if (zoomed == null) {
        return XY;
    }
    
    const gridSquareSize = 100.0 / zoomGridSize;

    const expandedX = reverseShrinkPoint(XY[0]);
    const expandedY = reverseShrinkPoint(XY[1]);

    // scale the points by the gridSize (which is aligned to 0,0)
    const scaledX = expandedX * 1.0 / zoomGridSize;
    const scaledY = expandedY * 1.0 / zoomGridSize;

    // offset the points so that it aligns with 0,0
    const offsetX = scaledX + (gridSquareSize * zoomed[0]);
    const offsetY = scaledY + (gridSquareSize * zoomed[1]);

    return [offsetX, offsetY];
}


// shrink the points when zoomed in a bit to allow access just over the edge of the current tile
function reverseShrinkPoint(point) {
    // center all points around 0,0 [-50 - 50] (middle: 0, 0)
    const centered = point - 50;

    // scale up the points slightly
    // zoomOverSpill :: [0 - 1]
    const scaled = centered * 1.0 / zoomOverspill;

    // offset all the points back to [0 - 100] (middle: 50, 50)
    const restored = scaled + 50;

    return restored;
}