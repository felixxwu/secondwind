window.onload = function() {
    window.history.pushState("", "", "./");

    setTimeout(() => {
        secureLoad("main", "main/main.php", undefined, function() {

            // this piece of code waits for all images to load, then hides the loading screen
            
            console.log("HTML files loaded, waiting for images...");
            // hide("loading", "fadeOut", 1);

            // at this point, the html files have finished loading, now waiting for the images to load
            element("loadingtext").innerHTML = "Loading images...";
            
            var imgs = document.images,
            len = imgs.length,
            counter = 0;
            
            [].forEach.call( imgs, function( img ) {
                img.addEventListener( 'load', incrementCounter, false );
            } );
            
            function incrementCounter() {
                counter++;
                if ( counter === len ) {
                    console.log( 'All images loaded!' );
                    hide("loading", "fadeOut", 6);
                    element("loadingtext").innerHTML = "";
                }
            }
        });
    }, 0);
};


