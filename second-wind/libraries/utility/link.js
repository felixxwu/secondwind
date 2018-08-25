var totalLinks = 0;
var loadedLinks = 0;

function linkJs(file) {
    let script = document.createElement("script");
    script.setAttribute("type","text/javascript");
    script.setAttribute("src", file);
    script.setAttribute("onload", "linkLoaded()");
    document.getElementById("links").appendChild(script);
    totalLinks++;
}

function linkCss(file) {
    let css = document.createElement("link");
    css.setAttribute("rel", "stylesheet");
    css.setAttribute("href", file);
    css.setAttribute("onload", "linkLoaded()");
    document.getElementById("links").appendChild(css);
    totalLinks++;
}

function linkLoaded() {
    loadedLinks++;
    element("loadingtext").innerHTML = "Loading game files (" + loadedLinks + "/" + totalLinks + ")";
}