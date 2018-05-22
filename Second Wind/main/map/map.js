function getXY() {
    var x = event.clientX;
    var y = event.clientY;
    var mapSideLength = element("markers").offsetWidth;
    var mapXCenter = document.documentElement.clientWidth / 2;
    var mapYCenter = document.documentElement.clientHeight / 2;
    var centeredX = x - mapXCenter;
    var centeredY = y - mapYCenter;
    var scaledX = centeredX * 100 / mapSideLength;
    var scaledY = centeredY * 100 / mapSideLength;
    var x = scaledX + 50;
    var y = scaledY + 50;

    if (x > 100 || y > 100 || x < 0 || y < 0) { return null; }
    
    console.log([x, y]);
    return [x, y];
}

function addMarker() {
    // create a new div element 
    var XY = getXY();
    if (!XY) {
        return;
    }
    var x = XY[0];
    var y = XY[1];
    var marker = document.createElement("img");
    marker.setAttribute("src", "material-icons/place.svg");
    marker.setAttribute("style", "left: " + x + "%; top: " + y + "%;");

    document.getElementById('markers').appendChild(marker);
}

function clickme() {
    addMarker();
}