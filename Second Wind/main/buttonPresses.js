function showMap() {
    show('mapGrid', 'fadeIn', 1, 'grid');
    forward("map", function () {
        hide("map", "fadeOut", 1);
    })
}