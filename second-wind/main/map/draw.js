// ANY JS FUNCTIONS TO DO WITH DRAWING THINGS ON THE MAP

// choose one of your islands and set your location to be that
function chooseIsland(island) {
    // console.log("setting location to: ");
    // console.log(island);

    // create the island img to be displayed
    let myLocation = document.createElement("img");
    myLocation.src = "material-icons/myLocation.svg";
    myLocation.style.left = zoomPoint([island.x, island.y])[0] + "%";
    myLocation.style.top = zoomPoint([island.x, island.y])[1] + "%";
    element("myLocation").innerHTML = "";
    element("myLocation").appendChild(myLocation);

    // create unselected island imgs
    for (let i = 0; i < myIslands.length; i++) {
        const myIsland = myIslands[i];
        let unselectedLocation = document.createElement("img");
        unselectedLocation.src = "material-icons/myLocation.svg";
        unselectedLocation.style.left = zoomPoint([myIsland.x, myIsland.y])[0] + "%";
        unselectedLocation.style.top = zoomPoint([myIsland.x, myIsland.y])[1] + "%";
        unselectedLocation.style.opacity = 0.3;
        element("myLocation").appendChild(unselectedLocation);
}

    selectedIsland = island; // update the global

    element("line").innerHTML = ""; // remove any previous lines

    // add a line to the target if there is one
    target = getTargetWithIslandNo(island.island);
    if (target) {
        addLine(island.x, island.y, target.x, target.y);
    }
}

// moves your marker to the point on the map (within the perimeter)
function setMarker(XY) {
    // create a new div element
    
    let x = XY[0];
    let y = XY[1];

    let marker = document.createElement("img");
    marker.src = "material-icons/place.svg";
    marker.style.left = zoomPoint([x, y])[0] + "%";
    marker.style.top = zoomPoint([x, y])[1] + "%";

    element("markers").innerHTML = "";
    element("markers").appendChild(marker);

    // addLine(selectedIsland.x, selectedIsland.y, x, y);

    show("movehere", "fadeIn", 1);

}

function removeMarker() {
    element("markers").innerHTML = "";
    hide("movehere", "fadeOut", 1);
    element("quickActionContainer").innerHTML = "";
}

// create a line from your island to your marker
function addLine(x1, y1, x2, y2) {
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.classList.add("mapSquare");

    let line = createLine(x1, y1, x2, y2);

    svg.appendChild(line);
    element("line").innerHTML = "";
    element("line").appendChild(svg);
}

//return a line element
function createLine(x1, y1, x2, y2, colour) {

    if (colour == undefined) {
        colour = "white";
    }

    x1 = zoomPoint([x1, y1])[0];
    y1 = zoomPoint([x1, y1])[1];
    x2 = zoomPoint([x2, y2])[0];
    y2 = zoomPoint([x2, y2])[1];
    
    let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x1 + "%");
    line.setAttribute("y1", y1 + "%");
    line.setAttribute("x2", x2 + "%");
    line.setAttribute("y2", y2 + "%");
    line.setAttribute("stroke", colour);
    line.setAttribute("stroke-width", "1px");

    return line;
}