// choose one of your islands and set your location to be that
function setLocation(island) {
    // console.log("setting location to: ");
    // console.log(island);

    // create the island img to be displayed
    let myLocation = document.createElement("img");
    myLocation.src = "material-icons/myLocation.svg";
    myLocation.style.left = island.x + "%";
    myLocation.style.top = island.y + "%";
    element("myLocation").innerHTML = "";
    element("myLocation").appendChild(myLocation);

    selectedIsland = island;    // update the global
    
    element("line").innerHTML = ""; // remove any previous lines

    // add a line to the target if there is one
    target = getTargetWithIslandNo(island.island);
    if (target) {
        addLine(island.x, island.y, target.x, target.y);
    }
}

// returns the target with that island number
// (myTargets only contains targets from the current user, so islands are unique)
function getTargetWithIslandNo(number) {
    for (let i = 0; i < myTargets.length; i++) {
        if (myTargets[i].island == number) {
            return myTargets[i];
        }
    }
}

// returns the x and y position on the map (0-100)
function getXY(event) {
    let scrolled = element("mapGrid").scrollTop;
    let x = event.clientX;
    let y = event.clientY + scrolled;   // to account for the scroll position
    let mapSideLength = element("markers").offsetWidth;
    x = x * 100 / mapSideLength;
    y = y * 100 / mapSideLength;

    if (x > 100 || y > 100 || x < 0 || y < 0) { return null; }

    // console.log([x, y]);
    selectedPoint = [x, y];
    return [x, y];
}

// moves your marker to the point on the map (within the perimeter)
function addMarker(event) {
    // create a new div element 
    let XY = getXY(event);
    if (!XY) {
        return;
    }
    let x = XY[0];
    let y = XY[1];

    if (!isWithinPerimeter(x, y)) {
        return;
    }

    let marker = document.createElement("img");
    marker.src = "material-icons/place.svg";
    marker.style.left = x + "%";
    marker.style.top = y + "%";

    element('markers').innerHTML = "";
    element('markers').appendChild(marker);

    // addLine(selectedIsland.x, selectedIsland.y, x, y);

    show("movehere","fadeIn",1);
}

function removeMarker() {
    element('markers').innerHTML = "";
    hide("movehere","fadeOut",1);
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
function createLine(x1, y1, x2, y2) {
    let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x1 + "%");
    line.setAttribute("y1", y1 + "%");
    line.setAttribute("x2", x2 + "%");
    line.setAttribute("y2", y2 + "%");
    line.setAttribute('stroke', "white");
    line.setAttribute('stroke-width', "1px");

    return line;
}

function showMap() {
    show('mapGrid', 'fadeInUp', 1, 'grid');
    forward("map", function () {
        hide("mapGrid", "fadeOutDown", 1);
    });
}

function hideMap() {
    hide("mapGrid", "fadeOutDown", 1);
    window.history.pushState('', '', './');
}

function addTarget() {
    // console.log(selectedPoint);
    element("movehere").innerHTML = "please wait...";
    
    ajaxSecureCall("addTarget", {"island": selectedIsland.island, "x": selectedPoint[0], "y": selectedPoint[1]}, function () {
        let island = myIslands[element("selectIslands").value]
        addLine(island.x, island.y, selectedPoint[0], selectedPoint[1]);
        element("movehere").innerHTML = "move here";
        removeMarker();
    });
}


