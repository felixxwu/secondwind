function getXY() {
    var x = event.clientX;
    var y = event.clientY;
    var screenWidth = document.documentElement.clientWidth;
    var screenHeight = document.documentElement.clientHeight;
    var spaceLeft = Math.max(screenWidth - screenHeight, 0);
    var spaceTop = Math.max(screenHeight - screenWidth, 0);
    x = x - (spaceLeft / 2);
    y = y - (spaceTop / 2);
    var sqaureEdgeLength = Math.min(screenHeight, screenWidth);
    var scaleRatio = 100 / sqaureEdgeLength;
    x = x * scaleRatio;
    y = y * scaleRatio;
    return [x, y];
}

function addMarker() {
    // create a new div element 
    var XY = getXY();
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