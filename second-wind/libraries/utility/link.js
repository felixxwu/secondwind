function linkJs(file) {
    let script = document.createElement("script");
    script.setAttribute("type","text/javascript");
    script.setAttribute("src", file);
    document.getElementById("links").appendChild(script);
}

function linkCss(file) {
    let css = document.createElement("link");
    css.setAttribute("rel", "stylesheet");
    css.setAttribute("href", file);
    document.getElementById("links").appendChild(css);
}