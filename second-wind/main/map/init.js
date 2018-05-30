var selectedPoint, selectedIsland;

function mapVarInit() {
    islands.forEach(function (island, index) {
        // add option to select box
        let option = document.createElement("option");
        option.id = "island-" + island.island;
        option.value = index;
        option.innerHTML = "Island " + island.island;
        element("selectIslands").appendChild(option);
        
    });
    
    setupPerimeter();
    
    if (islands.length == 0) {
        let noIslands = document.createElement("option");
        noIslands.innerHTML = "No Islands";
        element("selectIslands").appendChild(noIslands);
    } else {
        element("selectIslands").setAttribute("onchange", "setLocation(islands[this.value])");
        
        // add your location
        setLocation(islands[0]);
    }

}

function fetchPositions() {
    ajaxSecureLoadVariables("positions", {"fetchPositions": null});
}