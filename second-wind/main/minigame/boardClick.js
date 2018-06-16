var selectedTile;   // when you click a tile, that tile gets selected
var selectedUnit;   // in select mode, a unit that is in the selected tile get put as the selected unit
var clickMode;      // select / action    -- defined what should happen when a tile is clicked
                    //... select is when you want to select a troop to use
                    //... action is moving or attacking
var blockClicks = false;

// boardClick is activated by every button on the board with onclick
function boardClick(x, y) {
    if (blockClicks) {return;}

    switch (clickMode) {
        case "select":
            boardSelectClick(x, y);
            break;

        case "action":
            boardActionClick(x, y);
            break;
    
        default:
            break;
    }
    
    
}

// click behaviour when in select mode
function boardSelectClick(x, y) {
    selectedTile = {x: x, y: y};
    selectedUnit = selectUnit();  // might be undefined if tile has no own units
    
    if (selectedUnit) {
        clickMode = "action";
        highlightTiles([
            getTileElement(x + 1, y),
            getTileElement(x - 1, y),
            getTileElement(x, y + 1),
            getTileElement(x, y - 1)
        ]);
        return;
    }

    
    if (isBaseTile() || isSpawnTile()) {
        show("chooseUnitOverlay", "fadeIn", 1);
    }
}

// click behaviour when in action mode
function boardActionClick(x, y) {
    selectedUnit.move({x: x, y: y});
    clickMode = "select";
    clearTileHighlights();
}

// highlight an array of tiles
function highlightTiles(tiles) {
    for (let i = 0; i < tiles.length; i++) {
        const tile = tiles[i];
        if (tile) { tile.classList.add("highlightedTile"); }
    }
}

// clear tile highlighting
function clearTileHighlights() {
    for (let x = 0; x < boardWidth; x++) {
        for (let y = 0; y < boardHeight; y++) {
            let tile = getTileElement(x, y)
            tile.classList.remove("highlightedTile");
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

// check if selected tile is a span tile (not including base tile)
function isSpawnTile() {
    return selectedTile.y == boardHeight - 2;
}

// take the selected tile, and find the unit that is on that tile and return it
function selectUnit() {
    for (let i = 0; i < ownUnits.length; i++) {
        const unit = ownUnits[i];
        
        // if the unit is on the selected tile
        if (unit.location.x == selectedTile.x && unit.location.y == selectedTile.y) {
            return unit;
        }
    }
}

function spawn(unit) {
    
}