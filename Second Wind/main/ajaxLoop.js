function ajaxLoop() {
    setInterval(function () {
        ajaxSecureLoadVariables("ajaxLoop", { "islands": null }, function () {
            setLocation(islands[element("selectIslands").value]);
        });
    }, 5000);
};