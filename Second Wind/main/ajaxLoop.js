function ajaxLoop() {
    setTimeout(function () {
        ajaxSecureLoadVariables("ajaxLoop", {
            "islands": null
        }, function () {
            setLocation(islands[element("selectIslands").value]);
            ajaxLoop();
        });
    }, 0);
};