var navigationStack = [];
var hashStack = [];

function forward(hash, callback) {
    hashStack.push(hash);
    navigationStack.push(callback);
    location.hash = hash;
}

window.addEventListener("hashchange", function(e) {
    // this check is so when forward is called, the hashchange listener is activated, but nothing happens
    // because the current hash is the last element in the hashstack
    // if it wasnt, we know that the user changed it, not forward()
    if (location.hash != "#" + hashStack[hashStack.length - 1]) {
        hashStack.pop();
        var callback = navigationStack.pop();
        callback();
    }
});