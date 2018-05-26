var selectedPoint, selectedIsland;
var points = [
    [10, 10],
    [90, 50],
    [90, 90],
    [30, 80]
];

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

function setLocation(island) {
    // console.log("setting location to: ");
    // console.log(island);
    let myLocation = document.createElement("img");
    myLocation.src = "material-icons/myLocation.svg";
    myLocation.style.left = island.x + "%";
    myLocation.style.top = island.y + "%";
    element("myLocation").innerHTML = "";
    element("myLocation").appendChild(myLocation);

    element("line").innerHTML = "";
    selectedIsland = [island.x, island.y];
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
    let XY = getXY(event);
    if (!XY) {
        return;
    }
    let x = XY[0];
    let y = XY[1];

    if (!isWithinPerimeter(x, y)) {
        return;
    }

    let marker = document.createElement("img");
    marker.src = "material-icons/place.svg";
    marker.style.left = x + "%";
    marker.style.top = y + "%";

    element('markers').innerHTML = "";
    element('markers').appendChild(marker);

    addLine(selectedIsland[0], selectedIsland[1], x, y);
}

function addLine(x1, y1, x2, y2) {
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.classList.add("mapSquare");

    let line = createLine(x1, y1, x2, y2);

    svg.appendChild(line);
    element("line").innerHTML = "";
    element("line").appendChild(svg);
}

function createLine(x1, y1, x2, y2) {
    let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x1 + "%");
    line.setAttribute("y1", y1 + "%");
    line.setAttribute("x2", x2 + "%");
    line.setAttribute("y2", y2 + "%");
    line.setAttribute('stroke', "white");
    line.setAttribute('stroke-width', "1px");

    return line;
}

function setupPerimeter() {
    element("perimeter").innerHTML = "";
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.classList.add("mapSquare");

    for (let i = 0; i < points.length; i++) {
        let current = points[i];
        let next = function () {
            if (i == points.length - 1) {
                return points[0];
            } else {
                return points[i + 1];
            }
        }();
        let line = createLine(current[0], current[1], next[0], next[1]);
        svg.appendChild(line);
    }
    element("perimeter").appendChild(svg);
}

function isWithinPerimeter(x, y) {
    let crossovers = 0;
    for (let i = 0; i < points.length; i++) {
        let current = points[i];
        let next = function () {
            if (i == points.length - 1) {
                return points[0];
            } else {
                return points[i + 1];
            }
        }();
        let crossed = intersects(current[0], current[1], next[0], next[1], 0, y, x, y);
        if (crossed) { crossovers++; }
    }
    if (crossovers % 2 == 1) {
        return true;
    } else {
        return false;
    }
}

// returns true iff the line from (a,b)->(c,d) intersects with (p,q)->(r,s)
function intersects(a, b, c, d, p, q, r, s) {
    var det, gamma, lambda;
    det = (c - a) * (s - q) - (r - p) * (d - b);
    if (det === 0) {
        return false;
    } else {
        lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
        gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
        return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
    }
};

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