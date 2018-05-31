

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


