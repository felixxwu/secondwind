window.onload = function() {
    
    secureLoad("main", "main/main.php", undefined, function() {
        hide("loading","fadeOut", 6);
    });
    
    window.history.pushState('', '', './');
}