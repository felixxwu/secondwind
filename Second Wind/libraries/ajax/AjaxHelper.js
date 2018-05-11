// SETUP ##############################################################

// Link jquery and ajax libraries:
// script(src="https://code.jquery.com/jquery-3.2.1.min.js")
// script(src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js")

// Initialise a new AjaxHelper 
// var ajax = new AjaxHelper();

// USAGE ###############################################################

// To load a php page into a div (getting an output from the server)
// ajax.load("id","page.php", {"arg1": "hi","arg2": 69}, function(){
//     console.log("done");
// });

// To call a php function (execute php without output)
// ajax.call("functionName", {"arg1": "hello tere", "arg2": 200}, function(){
//     console.log("done");
// });

// To load variables from the server (and also execute function using those immediately)
// ... with no arguments
// ajax.loadVariables("id", {"var1": null, "var2": null}, function() {
//     console.log(var1);
//     console.log(var2);
// })
// ... with 1 argument
// ajax.loadVariables("id", {"var1": "arg", "var2": "arg"}, function() {
//      console.log(var1);
//      console.log(var2);
// })
// ... with multiple arguments
// ajax.loadVariables("id", {"var1": ["arg1","arg2","arg3"], "var2": "arg"}, function() {
//     console.log(var1);
//     console.log(var2);
// })

// Use undefined if you don't need arguments (does not apply to loadVariables)

class AjaxHelper {
    constructor() {

        this.load = function (id, page, args, callback) {
            console.log("loading " + page + " into #" + id + " with args: ", args);

            if (this.countID(id) != 1) {
                console.error("there are " + this.countID(id) + " number of elements with ID: " + id);
            }

            if (typeof callback == "undefined") {
                $("#" + id).load(page, args);      // load without callback if not defined
            } else {
                $("#" + id).load(page, args, function(){   // load with callback
                    callback();
                });
            }
        }

        this.call = function (func, args, callback) {
            var newArgs = Object.assign({"func": func}, args);  // add func as an arg in args
            // call has a list of functions that will be called according to func
            this.load("ghost", "libraries/ajax/call.php", newArgs, callback); // load call to ghost
        }

        this.loadVariables = function (id, variables, callback) {
            this.load(id, "libraries/ajax/variables.php", variables, callback); // load call to ghost
        }

        this.countID = function(id) {
            return $("[id=" + id + "]").length;
        }

    }
}






