function mapClick(event) {
    let XY = getXY(event);
    if (!XY) {
        return;
    }

    let x = XY[0];
    let y = XY[1];

    // the action container contains the quick actions that will be appended
    setUpActionContainer(x, y);

    element("markers").innerHTML = "";
    element("selectedSources").innerHTML = "";
    // add players in range to mapUI
    element("selectedPlayers").innerHTML =
        "<br>Selected marker is near the following players:<br><br>";
    element("selectedPlayers").style.display = "none";
    for (let i = 0; i < otherIslands.length; i++) {
        const player = otherIslands[i];
        if (
            inAttackRange(
                currentIsland().x,
                currentIsland().y,
                player.x,
                player.y
            ) &&
            inHitBox(XY, player.x, player.y)
        ) {
            element("selectedPlayers").style.display = "";  // default is shown
            element("selectedPlayers").appendChild(playerButton(player));

            showPlayerAction(player);
        }
    }
    element("selectedPlayers").innerHTML += "<br>";


    //add sources in range to mapUI for selection
    for (let i = 0; i < ajaxSources.length; i++) {
        const source = ajaxSources[i];
        if (
            inSourceRange(
                currentIsland().x,
                currentIsland().y,
                source.x,
                source.y
            ) &&
            inHitBox(XY, source.x, source.y)
        ) {
            displaySourceUI(source);
            

            // showSourceAction(source);
        }
    }
    // element("selectedPlayers").innerHTML += "<hr>";

    // if you click near one of your islands it will change your island selection to that island
    for (let i = 0; i < myIslands.length; i++) {
        const myIsland = myIslands[i];
        if (
            inHitBox(XY, myIsland.x, myIsland.y) &&
            myIsland.island != currentIsland().island
        ) {
            element("island-" + myIsland.island).selected = true;
            chooseIsland(myIsland);
            hide("movehere", "fadeOut", 1);
            return;
        }
    }

    showMoveAction();
    showZoomAction();
    showQuickCloseAction();

    setMarker(XY);
}

function inAttackRange(x1, y1, x2, y2) {
    const attackRadius = 5;

    let distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    if (distance < attackRadius) {
        return true;
    } else {
        return false;
    }
}

function inSourceRange(x1, y1, x2, y2){
    const extractRadius = 10;

    let distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    if (distance < extractRadius) {
        return true;
    } else {
        return false;
    }
}
function inHitBox(XY, x2, y2) {
    const hitBoxRadius = 2;

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

// adds a target on the database that will be automatically followed
function addTarget() {
    // console.log(selectedPoint);
    // element("movehere").innerHTML = "PLEASE WAIT...";
    // element("quickMove").innerHTML = "PLEASE WAIT...";

    ajaxSecureCall(
        "addTarget",
        {
            island: selectedIsland.island,
            x: selectedPoint[0],
            y: selectedPoint[1]
        },
        function() {
            let island = currentIsland();
            addLine(island.x, island.y, selectedPoint[0], selectedPoint[1]);

            // let icon = document.createElement("img");
            // icon.classList.add("invert");
            // icon.src = "material-icons/move.svg";
            // element("movehere").innerHTML = "MOVE TO MARKER";
            // element("movehere").appendChild(icon);
            removeMarker();

            // hide the quick action
            element("quickActionCard").innerHTML = "";
        }
    );
}

function currentIsland() {
    return myIslands[element("selectIslands").value];
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

    // scale back the point if zoomed in
    let XY = reverseZoomPoint([x, y]);
    // console.log([x, y]);

    if (!isWithinPerimeter(XY[0], XY[1])) {
        return null;
    }

    selectedPoint = XY;

    return XY;
}

function showMap() {
    show("mapGrid", "fadeIn", 1, "grid");
    forward("map", function() {
        hide("mapGrid", "fadeOutDown", 1);
    });
    setupPerimeter();
}

function hideMap() {
    hide("mapGrid", "fadeOut", 1);
    window.history.pushState("", "", "./");
}

function removeSources(){
    ajaxSecureCall(
        "ajaxRemoveSources",
        {
        },
        function() {
          log("sources removed");
        }
      );
}