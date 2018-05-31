function showMoveAction() {
    let action = document.createElement("a");
    action.id = "quickMove";
    action.classList.add("button");
    action.innerHTML = "move here";
    action.setAttribute("onclick", "addTarget()");
    console.log(action);
    
    element("quickActionContainer").appendChild(action);
    element("quickActionContainer").innerHTML += "<br>";
}

function showPlayerAction(player) {
    element("quickActionContainer").appendChild(playerButton(player));
    element("quickActionContainer").innerHTML += "<br>";
}

function setUpActionContainer(x, y) {
    element("quickActionContainer").style.top = y + "%";
    element("quickActionContainer").style.left = x + "%";
    element("quickActionContainer").innerHTML = "";
}