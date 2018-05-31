function mapClick(event) {
    let XY = getXY(event);
    if (!XY) {
        return;
    }
    let x = XY[0];
    let y = XY[1];

    if (!isWithinPerimeter(x, y)) {
        return;
    }

    element("markers").innerHTML = "";

    element("selectedPlayers").innerHTML = "<br>Selected marker is near the following players:<br>";
    element("selectedPlayers").style.display = "none";
    for (let i = 0; i < otherIslands.length; i++) {
        const player = otherIslands[i];
        if (inHitBox(XY, player.x, player.y)) {
            element("selectedPlayers").style.display = "";
            let playerActionButton = document.createElement("a");
            playerActionButton.classList.add("button");
            playerActionButton.innerHTML = player.username;
            element("selectedPlayers").appendChild(playerActionButton);
        }
    }
    element("selectedPlayers").innerHTML += "<hr>";

    // if you click near one of your islands it will change your island selection to that island
    for (let i = 0; i < myIslands.length; i++) {
        const myIsland = myIslands[i];
        if (inHitBox(XY, myIsland.x, myIsland.y)) {
            element("island-" + myIsland.island).selected = true;
            chooseIsland(myIsland);
            return;
        }
    }

    addMarker(XY);
}

function inHitBox(XY, x2, y2) {
    const hitBoxRadius = 4;

    let x1 = XY[0];
    let y1 = XY[1];
    let distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    if (distance < hitBoxRadius) {
        return true;
    } else {
        return false;
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

function addTarget() {
    // console.log(selectedPoint);
    element("movehere").innerHTML = "please wait...";

    ajaxSecureCall(
        "addTarget",
        {
            island: selectedIsland.island,
            x: selectedPoint[0],
            y: selectedPoint[1]
        },
        function() {
            let island = myIslands[element("selectIslands").value];
            addLine(island.x, island.y, selectedPoint[0], selectedPoint[1]);

            let icon = document.createElement("img");
            icon.classList.add("invert");
            icon.src = "material-icons/move.svg";
            element("movehere").innerHTML = "move here";
            element("movehere").appendChild(icon);
            removeMarker();
        }
    );
}

// returns the x and y position on the map (0-100)
function getXY(event) {
    let scrolled = element("mapGrid").scrollTop;
    let x = event.clientX;
    let y = event.clientY + scrolled; // to account for the scroll position
    let mapSideLength = element("markers").offsetWidth;
    x = x * 100 / mapSideLength;
    y = y * 100 / mapSideLength;

    if (x > 100 || y > 100 || x < 0 || y < 0) {
        return null;
    }

    // console.log([x, y]);
    selectedPoint = [x, y];
    return [x, y];
}

function showMap() {
    show("mapGrid", "fadeInUp", 1, "grid");
    forward("map", function() {
        hide("mapGrid", "fadeOutDown", 1);
    });
}

function hideMap() {
    hide("mapGrid", "fadeOutDown", 1);
    window.history.pushState("", "", "./");
}
