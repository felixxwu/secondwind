// converts the js unit class instances into visible html elements
function drawAllUnits() {
    element("unitSprites").innerHTML = "";
    for (let i = 0; i < ownUnits.length; i++) {
        const myUnit = ownUnits[i];
        drawUnit(myUnit);
    }
}

function drawUnit(unit) {
    const unitPosition = getTileXYPosition(unit.location);
    let sprite = document.createElement("img");
    sprite.id = "unit-at-" + unit.location.x + "-" + unit.location.y;
    sprite.src = unit.img;
    sprite.style.top = unitPosition.top + "px";
    sprite.style.left = unitPosition.left + "px";
    element("unitSprites").appendChild(sprite);
}

// x and y are the tile location (top left is 0, 0)
function getTileXYPosition(XY) {
    const tile = element("tile-" + XY.x + "-" + XY.y);
    let tileRect = tile.getBoundingClientRect();
    return {
        top: tileRect.top + tileRect.height / 2,
        left: tileRect.left + tileRect.width / 2,
        y: tileRect.top + tileRect.height / 2,
        x: tileRect.left + tileRect.width / 2
    };
}

function unitMoveAnimation(origin, target) {
    const animationDuration = 1000; // in milliseconds
    const animationFrames = 100; // numbers of frames in the animation (frames per second if animationDuration is 1000)
    const frameLength = (animationDuration * 1.0) / animationFrames;

    // find the html unit to be animated
    let unit = element("unit-at-" + origin.x + "-" + origin.y);
    console.log(unit);
    console.log(unit.style.top);

    const originPosition = getTileXYPosition(origin);
    const targetPosition = getTileXYPosition(target);
    const xDistance = targetPosition.x - originPosition.x;
    const yDistance = targetPosition.y - originPosition.y;

    let i = 0;
    let animation = setInterval(frame, frameLength);
    function frame() {
        if (i >= animationFrames) {
            clearInterval(animation);
        } else {
            i++;
            unit.style.left =
                originPosition.x + (i / animationFrames) * xDistance + "px";
            unit.style.top =
                originPosition.y + (i / animationFrames) * yDistance + "px";
        }
    }
}
