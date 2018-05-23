var selectedPoint;

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
}

function setLocation(island) {
    // console.log("setting location to: ");
    // console.log(island);
    let myLocation = document.createElement("img");
    myLocation.src = "material-icons/myLocation.svg";
    myLocation.style.left = island.x + "%";
    myLocation.style.top = island.y + "%";
    element("myLocation").innerHTML = "";
    element("myLocation").appendChild(myLocation);
}

function getXY(event) {
    let scrolled = element("mapGrid").scrollTop;
    let x = event.clientX;
    let y = event.clientY + scrolled;
    let mapSideLength = element("markers").offsetWidth;
    let mapXCenter = document.documentElement.clientWidth / 2;
    let mapYCenter = document.documentElement.clientHeight / 2;
    x = x * 100 / mapSideLength;
    y = y * 100 / mapSideLength;

    if (x > 100 || y > 100 || x < 0 || y < 0) { return null; }

    console.log([x, y]);
    selectedPoint = [x, y];
    return [x, y];
}

function addMarker(event) {
    // create a new div element 
    var XY = getXY(event);
    if (!XY) {
        return;
    }
    var x = XY[0];
    var y = XY[1];
    var marker = document.createElement("img");
    marker.src = "material-icons/place.svg";
    marker.style.left = x + "%";
    marker.style.top = y + "%";

    element('markers').innerHTML = "";
    element('markers').appendChild(marker);
}

function showMap() {
    show('mapGrid', 'fadeInUp', 1, 'grid');
    forward("map", function () {
        hide("mapGrid", "fadeOutDown", 1);
    })
}

function hideMap() {
    hide("mapGrid", "fadeOutDown", 1);
    window.history.pushState('', '', './');
}