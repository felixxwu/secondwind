function showMap() {
    show('map', 'fadeIn', 1, 'flex');
    forward("map", function () {
        hide("map", "fadeOut", 1);
    })
}