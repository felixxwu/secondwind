function ajaxLoop() {
    setTimeout(function () {
        ajaxSecureLoadVariables("ajaxLoop", {
            "islands": null,
            "myTargets": null
        }, function () {
            setLocation(islands[element("selectIslands").value]);
            
            ajaxLoop();
        });
    }, 1000);
};