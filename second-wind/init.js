// used to disable rightclick capabilities (useful for mobile so you can long press and simulate hover)
document.addEventListener('contextmenu', event => event.preventDefault());

window.onload = function() {
    window.history.pushState("", "", "./");

    setTimeout(() => {
        secureLoad("main", "main/main.php", undefined, function() {

            // this piece of code waits for all images to load, then hides the loading screen
            
            // at this point, the html files have finished loading, now waiting for the images to load
            // element("loadingtext").innerHTML = "Loading images...";
            
            var docImages = document.images, // gets all images from the document (will have loaded by now but not displayed)
            counter = 0;
            
            [].forEach.call( docImages, function( img ) {
                img.addEventListener( 'load', incrementCounter, false );
            } );
            
            function incrementCounter() {
                counter++;

                // second half of the loading process
                element("loadingtext").innerHTML = "Loading " + (Math.floor((counter/docImages.length) * 50) + 50) + "%";
                // element("loadingtext").innerHTML = "Loading images (" + counter + "/" + docImages.length + ")";

                if ( counter === docImages.length ) {
                    // console.log( 'All images loaded!' );
                    // once loaded, hide loading screen and show the island floating up
                    hide("loading", "fadeOut", 6);
                    element("loadingtext").innerHTML = "";
                    show('floatUp','fadeInUp',10);
                }
            }
        });
    }, 0);
};



