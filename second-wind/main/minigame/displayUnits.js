// converts the js unit class instances into visible html elements
function drawAllUnits() {
    for (let i = 0; i < ownUnits.length; i++) {
        const myUnit = ownUnits[i];
        drawUnit(myUnit);
    }
    
}

function drawUnit(unit) {
    const unitPosition = getTileXYPosition(unit.location.x, unit.location.y);
    let sprite = document.createElement("img");
    sprite.src = unit.img;
    sprite.style.top = unitPosition.top;
    sprite.style.left = unitPosition.left;
}

// x and y are the tile location (top left is 0, 0)
function getTileXYPosition(x, y) {
    const tile = element("tile-" + x + "-" + y);
    let tileRect = tile.getBoundingClientRect();
    return tileRect;    
}