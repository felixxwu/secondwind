function showMap() {
    show('map', 'fadeIn', 0.5, 'flex');
    forward("map", function () {
        hide("map", "fadeOut", 0.5);
    })
}