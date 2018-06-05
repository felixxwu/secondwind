function showMoveAction() {
    let action = document.createElement("a");
    action.id = "quickMove";
    // action.classList.add("button");
    action.innerHTML = "MOVE HERE";
    action.setAttribute("onclick", "addTarget()");
    
    element("quickActionCard").appendChild(action);
}

function showPlayerAction(player) {
    if (inAttackRange(currentIsland().x, currentIsland().y, player.x, player.y)) {
        element("quickActionCard").appendChild(playerButton(player));
    }
}

function setUpActionContainer(x, y) {
    element("quickActionCard").innerHTML = "";
    element("quickActionContainer").style.marginLeft = zoomPoint([x, y])[0] + "%";
    element("quickActionContainer").style.marginTop = zoomPoint([x, y])[1] + "%";
}
