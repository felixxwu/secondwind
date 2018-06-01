function closeMinigame() {
    hide("minigame", "fadeOut", 1);
}

function initBoardButtons(xTiles, yTiles) {
    for (let y = 0; y < yTiles; y++) {
        for (let x = 0; x < xTiles; x++) {
            let boardButton = document.createElement("a");
            boardButton.classList.add("boardButton");

            if (y == 0) {
                boardButton.classList.add("baseTile");
                boardButton.classList.add("borderBottom");
            }
            
            if (y == yTiles - 1) {
                boardButton.classList.add("baseTile");
                boardButton.classList.add("borderTop");
            }
            
            boardButton.setAttribute("onclick", "alert([" + x + ", " + y + "])");
            console.log([x, y]);
            
            element("board").appendChild(boardButton);
        }
    }
}