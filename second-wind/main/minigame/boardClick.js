var selectedTile;   // when you click a tile, that tile gets selected
var selectedUnit;   // in select mode, a unit that is in the selected tile get put as the selected unit
var clickMode;      // select / move / attack    -- defined what should happen when a tile is clicked

function boardClick(x, y) {
    switch (clickMode) {
        case "select":
            boardSelectClick(x, y);
            break;

        case "move":
            boardMoveClick(x, y);
            break;
    
        default:
            break;
    }
    
    
}

function boardSelectClick(x, y) {
    selectedTile = {x: x, y: y};
    selectedUnit = selectUnit();  // might be undefined if tile has no own units
    // console.log(selectedUnit);
    
    if (selectedUnit) {
        clickMode = "move";
        return;
    }
    if (isBaseTile() || isSpawnTile()) {
        show("chooseUnitOverlay", "fadeIn", 1);
    }
}

function boardMoveClick(x, y) {
    selectedUnit.move({x: x, y: y});
    clickMode = "select";
}

function isBaseTile() {
    return selectedTile.y == boardHeight - 1;
}

function isSpawnTile() {
    return selectedTile.y == boardHeight - 2;
}

function selectUnit() {
    for (let i = 0; i < ownUnits.length; i++) {
        const unit = ownUnits[i];
        console.log(unit);
        console.log(selectedTile);
        
        
        // if the unit is on the selected tile
        if (unit.location.x == selectedTile.x && unit.location.y == selectedTile.y) {
            return unit;
        }
    }
}

function spawn(unit) {
    
}