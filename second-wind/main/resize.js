// var timeout;

window.onresize = function () {
    setupPerimeter();
    drawAllUnits();

    // clearTimeout(timeout);
    // timeout = setTimeout(function() {
    //     setupPerimeter();
    //     console.log("window was resized");
    // }, 100);
}
