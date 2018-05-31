// JS FUNCTIONS RELATED TO THE MAP PERIMETER

var points = [
    [10, 10],
    [50, 40],
    [90, 20],
    [90, 90],
    [30, 80]
];

// initialise the perimeter based on the points
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