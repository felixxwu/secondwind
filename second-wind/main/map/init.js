var selectedPoint, selectedIsland;

function mapVarInit() {
    myIslands.forEach(function (island, index) {
        // add option to select box
        let option = document.createElement("option");
        option.id = "island-" + island.island;
        option.value = index;
        option.innerHTML = "Island " + island.island;
        element("selectIslands").appendChild(option);
        
    });
    
    setupPerimeter();
    
    if (myIslands.length == 0) { alert("error: no islands"); }

    element("selectIslands").setAttribute("onchange", "setLocation(islands[this.value])");
    
    // add your location
    setLocation(myIslands[0]);

}

function fetchPositions() {
    ajaxSecureLoadVariables("positions", {"fetchPositions": null});
}