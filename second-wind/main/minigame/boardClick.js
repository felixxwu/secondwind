var selectedTile; // when you click a tile, that tile gets selected
var selectedUnit; // in select mode, a unit that is in the selected tile get put as the selected unit
var clickMode; // select / action    -- defined what should happen when a tile is clicked
//... select is when you want to select a troop to use
//... action is moving or attacking
var blockClicks = false;

// boardClick is activated by every button on the board with onclick
function boardClick(x, y) {
    if (!yourTurn()) {
        return;
    }
    switch (clickMode) {
        case "select":
            boardSelectClick(x, y);
            break;

        case "action":
            boardActionClick(x, y);
            break;

        case "spawn":
            spawn(x, y);
            break;

        default:
            break;
    }
}

// click behaviour when in select mode
function boardSelectClick(x, y) {
    selectedTile = { x: x, y: y };
    selectedUnit = selectUnit(selectedTile,ownUnits); // might be undefined if tile has no own units

    if (selectedUnit) { //if clicked on a unit of your own
        clickMode = "action";
        //highlight tiles according to what's on them
        highlightTile({x:x+1,y:y},getTileElement(x + 1, y));
        highlightTile({x:x-1,y:y},getTileElement(x - 1, y));
        highlightTile({x:x,y:y+1},getTileElement(x, y + 1));
        highlightTile({x:x,y:y-1},getTileElement(x, y - 1));
        return;
    }

    if (isSpawnTile(selectedTile)) {
        show("chooseUnitOverlay", "fadeIn", 1);
        listSpawnableUnits();
    }
}

// click behaviour when in action mode
function boardActionClick(xCoord, yCoord) {
    let location = { x: xCoord, y: yCoord };
    // block any action from happening while an animation is ongoing (can still select tiles)
    if (blockClicks) {
        return;
    }
    //attack if there's an enemy on the target location or move if there's not.
    if(typeAtTile(location)=='enemy'){
        log('attacking enemy');
        selectedUnit.attack(location);
    }else{
        log('moving');
        selectedUnit.move(location);
    }

    clickMode = "select";
    clearTileHighlights();
}

//highlights a tile according to what's on it
function highlightTile(location,tile){
    if(tile==null){return;}
    let typeOfUnit = typeAtTile(location); //returns either 'own' or 'enemy' depending the unit at location
    if(typeOfUnit=='enemy'){ //if there's an enemy unit in the tile then set highlight to attack
        tile.classList.add("highlightedTileAttack");
    }else if(typeOfUnit=='own'){ //if there's no units at the tile then set highlight to move
        tile.classList.add("highlightedTileOwn");
    }else{
        tile.classList.add("highlightedTileMove");

    }
}

//returns either 'enemy' or 'own' according to whats on the given location
function typeAtTile(location){
    let type = null;
    ownUnitAtTile = selectUnit(location,ownUnits); // might be undefined if tile has no own units
    enemyUnitAtTile = selectUnit(location,enemyUnits); // might be undefined if tile has no own units
    if(enemyUnitAtTile!=null){ 
        type='enemy';
    }else if(ownUnitAtTile==null){ 
         type='own';
    }
    return type;
}
// clear tile highlighting
function clearTileHighlights() {
    for (let x = 0; x < boardWidth; x++) {
        for (let y = 0; y < boardHeight; y++) {
            let tile = getTileElement(x, y);
            tile.classList.remove("highlightedTileMove");
            tile.classList.remove("highlightedTileAttack");
            tile.classList.remove("highlightedTileOwn");
        }
    }
}

// returns the html elemenet of a tile (x-y coordinates)
function getTileElement(x, y) {
    return element("tile-" + x + "-" + y);
}

// check if selected tile is a base tile
function isBaseTile() {
    return selectedTile.y == boardHeight - 1;
}

// check if selected tile is a span tile
function isSpawnTile(tile) {
    return tile.y == boardHeight - 2 || tile.y == boardHeight - 1;
}

// take the selected tile, and find the unit that is on that tile and return it
function selectUnit(location,unitList) { //unitList could be either ownUnits or enemyUnits
    for (let i = 0; i < unitList.length; i++) {
        const unit = unitList[i];

        if (unit.location) {
            // if the unit is on the selected tile
            if (
                unit.location.x == location.x &&
                unit.location.y == location.y
            ) {
                return unit;
            }
        }
    }
}

// populate the list of spawnable units in the choose units popup menu
function listSpawnableUnits() {
    element("unitList").innerHTML = "";
    let isEmpty = true;
    for (let i = 0; i < ownUnits.length; i++) {
        const unit = ownUnits[i];

        // for all own units that do not have a location
        if (!unit.location) {
            isEmpty = false;
            let spawnable = document.createElement("a");
            spawnable.classList.add("spawnableUnit");
            // note: Beware! If you're minifying the JavaScript the name of the constructor will change
            spawnable.innerHTML = unit.constructor.name + " level: " + unit.level;
            spawnable.setAttribute(
                "onclick",
                "spawn(" + i + ", " + JSON.stringify(selectedTile) + ")"
            );
            element("unitList").appendChild(spawnable);
        }
    }
    if (isEmpty) {
        element("unitList").innerHTML = "No more units to spawn";
    }
}

function spawn(index, tile) {
    selectedUnit = ownUnits[index];
    hide("chooseUnitOverlay", "fadeOut", 1);
    selectedUnit.location = tile;
    drawUnit(selectedUnit,'backward');
}
