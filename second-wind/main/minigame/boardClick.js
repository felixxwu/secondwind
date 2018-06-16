var selectedTile;   // when you click a tile, that tile gets selected

function boardClick(x, y) {
    selectedTile = {x: x, y: y};
    if (isBaseTile(y) || isSpawnTile(y)) {
        show("chooseUnitOverlay", "fadeIn", 1);
    }
}

function isBaseTile(y) {
    return y == boardHeight - 1;
}

function isSpawnTile(y) {
    return y == boardHeight - 2;
}

function spawn(unit) {
    
}