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

function show(id, type, duration) {
    console.log("showing: " + id);
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
        element(id).setAttribute("style","-webkit-animation-duration: " + duration + "s;");
    }
    element(id).style.display = "block";
}

function hide(id, type, duration) {
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
        element(id).setAttribute("style","-webkit-animation-duration: " + duration + "s;");
    }
    setTimeout(function(){
        element(id).style.display = "none";
    }, duration * 1000);
}