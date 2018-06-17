var cachedAnimation = null; //the animation that was playing before the troop moved
// converts the js unit class instances into visible html elements on the board
function drawAllUnits() {
    element("unitSprites").innerHTML = "";
    for (let i = 0; i < ownUnits.length; i++) {
        const myUnit = ownUnits[i];
        drawUnit(myUnit,'backward');
    }
    for (let i = 0; i < enemyUnits.length; i++) {
        const enemyUnit = enemyUnits[i];
        drawUnit(enemyUnit,'forward');
    }
    drawPlusSigns();
}

// draws a single unit on the board
function drawUnit(unit,facingDirection) { //facingDirection can either be backward or forward
    if (!unit.location) {return;}
    const unitPosition = getTileXYPosition(unit.location);
    let sprite = document.createElement("img");
    sprite.id = "unit-at-" + unit.location.x + "-" + unit.location.y;
    if(facingDirection=='backward'){
        sprite.src = unit.idleImgBack; 
    }
    if(facingDirection=='forward'){
        sprite.src = unit.idleImgFront; 
    }
    sprite.style.top = unitPosition.top + "px";
    sprite.style.left = unitPosition.left + "px";
    element("unitSprites").appendChild(sprite);
}

// draw the plus signs on the spawnable areas
function drawPlusSigns() {
    element("plusSigns").innerHTML = "";
    for (let x = 0; x < boardWidth; x++) {
        for (let y = 0; y < boardHeight; y++) {
            if (isSpawnTile({x, y})) {
                drawPlus({x: x, y: y});
            }
        }
    }

    function drawPlus(tile) {
        const plusPosition = getTileXYPosition(tile);
        let sprite = document.createElement("img");
        sprite.src = "material-icons/add.svg";
        sprite.style.top = plusPosition.top + "px";
        sprite.style.left = plusPosition.left + "px";
        element("plusSigns").appendChild(sprite);
    }
}

// gets the position on pixels of the middle of a tile
// x and y are the tile coordinates (top left is 0, 0)
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

function removeUnit(id){
    let unitHolder = document.getElementById("unitSprites");
    log(unitHolder);
    let unit = document.getElementById(id);
    log(unit);

    unitHolder.removeChild(unit);
}
// starts a movement animation for a unit that is located at "origin"
// the animation moves the actual html element from origin to target, and leaves it there
function unitMoveAnimation(origin, target) {
    
    blockClicks = true;

    if (!origin) {
        origin = {x: boardWidth - 1, y: boardHeight - 1};
    }
    
    const animationDuration = 1000; // in milliseconds
    const animationFrames = 100; // numbers of frames in the animation (frames per second if animationDuration is 1000)
    const frameLength = (animationDuration * 1.0) / animationFrames;

    // find the html unit to be animated
    let unit = element("unit-at-" + origin.x + "-" + origin.y);
    
    const originPosition = getTileXYPosition(origin);
    const targetPosition = getTileXYPosition(target);
    const xDistance = targetPosition.x - originPosition.x;
    const yDistance = targetPosition.y - originPosition.y;

    let i = 0;
    let animation = setInterval(frame, frameLength);
    function frame() {
        if (i >= animationFrames) {
            blockClicks = false;
            clearInterval(animation);
            log(cachedAnimation);
            unit.src=cachedAnimation;

        } else {
            i++;
            unit.style.left =
                originPosition.x + (i / animationFrames) * xDistance + "px";
            unit.style.top =
                originPosition.y + (i / animationFrames) * yDistance + "px";
        }
    }

}
