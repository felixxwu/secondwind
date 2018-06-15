// shows the move icon action in the quick actions box
function showMoveAction() {
    let container = document.createElement("container");
    let action = document.createElement("img");
    action.id = "quickMove";
    // action.classList.add("button");
    // action.innerHTML = "MOVE HERE";
    action.classList.add("invert");
    action.src = "material-icons/move.svg";
    action.setAttribute("onclick", "addTarget()");

    container.appendChild(action);
    element("quickActionCard").appendChild(container);
}

// shows the zoom out icon action in the quick actions box
function showZoomAction() {
    let container = document.createElement("container");
    let action = document.createElement("img");
    action.id = "quickZoom";
    action.classList.add("invert");
    action.src = "material-icons/zoomOut.svg";
    action.setAttribute("onclick", "zoomOut()");

    container.appendChild(action);
    element("quickActionCard").appendChild(container);
}

// shows the close icon action in the quick actions box
function showQuickCloseAction() {
    let container = document.createElement("container");
    let action = document.createElement("img");
    action.id = "quickClose";
    action.classList.add("invert");
    action.src = "material-icons/close.svg";
    action.setAttribute("onclick", "removeMarker()");

    container.appendChild(action);
    element("quickActionCard").appendChild(container);
}

function showPlayerAction(player) {
    if (inAttackRange(currentIsland().x, currentIsland().y, player.x, player.y)) {
        element("quickActionCard").appendChild(playerButton(player));
    }
}

function showSourceAction(source) {
    if (inSourceRange(currentIsland().x, currentIsland().y, source.x, source.y)) {
        element("quickActionCard").appendChild(sourceButton(source));
    }
}



function setUpActionContainer(x, y) {
    element("quickActionCard").innerHTML = "";
    element("quickActionContainer").style.marginLeft = zoomPoint([x, y])[0] + "%";
    element("quickActionContainer").style.marginTop = zoomPoint([x, y])[1] + "%";
}
