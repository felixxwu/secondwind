window.onload = function() {
    
    secureLoad("main", "main/main.php", undefined, function() {
        hide("loading","fadeOut", 2);
    });
    
    window.history.pushState('', '', './');
}