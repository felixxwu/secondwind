function showMoveAction() {
    let action = document.createElement("a");
    action.id = "quickMove";
    action.classList.add("button");
    action.innerHTML = "MOVE HERE";
    action.setAttribute("onclick", "addTarget()");
    
    element("quickActionContainer").appendChild(action);
    element("quickActionContainer").innerHTML += "<br>";
}

function showPlayerAction(player) {
    if (inAttackRange(currentIsland().x, currentIsland().y, player.x, player.y)) {
        element("quickActionContainer").appendChild(playerButton(player));
        element("quickActionContainer").innerHTML += "<br>";
    }
}

function setUpActionContainer(x, y) {
    element("quickActionContainer").innerHTML = "";
    element("quickActionContainer").style.left = zoomPoint([x, y])[0] + "%";
    element("quickActionContainer").style.top = zoomPoint([x, y])[1] + "%";
}
