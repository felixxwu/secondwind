// has all functions related to show and hide animations

var types = [
    // in types
    "fadeIn",
    "fadeInLeft",
    "fadeInRight",
    "fadeInUp",
    "fadeInDown",
    "slideInLeft",
    "slideInRight",
    "slideInUp",
    "slideInDown",
    // out types
    "fadeOut",
    "fadeOutLeft",
    "fadeOutRight",
    "fadeOutUp",
    "fadeOutDown",
    "slideOutLeft",
    "slideOutRight",
    "slideOutUp",
    "slideOutDown"
];

function show(id, type, duration, displayType) {
    console.log("showing: " + id);
    
    // if the element is already showing, do nothing
    if (element(id).style.display != "none") {
        // console.warn("already shown");
        // return;
    }
    

    // remove all animate.css classes
    for (let i = 0; i < types.length; i++) {
        element(id).classList.remove(types[i]);
    }

    // return if no such type exists
    if (!types.includes(type)) {
        console.error("type " + type + " is not a valid type");
        return;
    }

    element(id).classList.add("animated");
    if (!type) {
        element(id).classList.add("fadeIn");
    } else {
        element(id).classList.add(type);
    }
    if (duration) {
        element(id).setAttribute("style", "-webkit-animation-duration: " + duration + "s;");
    }
    element(id).classList.remove("hidden");
    if (displayType) {
        element(id).style.display = displayType;
    } else {
        element(id).style.display = "block"; 
    }
}

function hide(id, type, duration) {
    // if the element is already hidden, do nothing    
    if (element(id).classList.contains("hidden")
        || element(id).style.display == "none") {
        return;
    }
    
    console.log("hiding: " + id);
    
    // remove all animate.css classes
    for (let i = 0; i < types.length; i++) {
        element(id).classList.remove(types[i]);
    }

    // return if no such type exists
    if (!types.includes(type)) {
        console.error("type " + type + " is not a valid type");
        return;
    }

    element(id).classList.add("animated");
    if (!type) {
        element(id).classList.add(fadeOut);
    } else {
        element(id).classList.add(type);
    }
    if (duration) {
        element(id).setAttribute("style", "-webkit-animation-duration: " + duration + "s;");
    }
    setTimeout(function () {
        // element(id).classList.add("hidden");
        element(id).style.display = "none";
    }, duration * 1000);
}

function toggle(id, inType, outType, duration, showCallback, hideCallback, displayType) {
    if (element(id).style.display == "none") {
        show(id, inType, duration, displayType);
        if (showCallback) {
            showCallback();
        }
    } else {
        hide(id, outType, duration);
        if (hideCallback) {
            hideCallback();
        }
    }
}