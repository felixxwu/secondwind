window.onload = function() {
    
    window.history.pushState('', '', './');

    setTimeout(() => {
        secureLoad("main", "main/main.php", undefined, function() {
            hide("loading","fadeOut", 6);
        });
    }, 0);

}