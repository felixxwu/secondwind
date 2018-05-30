function ajaxLoop() {
    setTimeout(function () {
        ajaxSecureLoadVariables("ajaxLoop", {
            "islands": null,
            "myTargets": null
        }, function () {
            if (!islands.length == 0) {
                setLocation(islands[element("selectIslands").value]);
            }
            
            ajaxLoop();
        });
    }, 1000);
};