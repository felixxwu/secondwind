var selectedPoint, selectedIsland;

function mapVarInit() {
    element("selectIslands").setAttribute("onchange", "setLocation(islands[this.value])");
    islands.forEach(function (island, index) {
        // add option to select box
        let option = document.createElement("option");
        option.id = "island-" + island.island;
        option.value = index;
        option.innerHTML = "Island " + island.island;
        element("selectIslands").appendChild(option);

    });

    // add your location
    setLocation(islands[0]);

    setupPerimeter();
}

function fetchPositions() {
    ajaxSecureLoadVariables("positions", {"fetchPositions": null});
}