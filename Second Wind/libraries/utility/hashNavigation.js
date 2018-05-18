var navigationStack;

function forward(hash, callback) {
    location.hash = hash;
    navigationStack.push(callback);
}

window.addEventListener("hashchange", function(e) {
    var callback = navigationStack.pop();
    callback();
});