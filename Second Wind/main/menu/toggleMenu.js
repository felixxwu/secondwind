function toggleMenu() {
    toggle('menu', 'fadeInDown', 'fadeOutUp', 0.5, function () {
        show('closeicon', 'fadeIn', 0);
        hide('menuicon', 'fadeOut', 0);
    }, function () {
        show('menuicon', 'fadeIn', 0);
        hide('closeicon', 'fadeOut', 0);
    });
}