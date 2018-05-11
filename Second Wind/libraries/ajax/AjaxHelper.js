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
            this.load("ghost", "ajax/call.php", newArgs, callback); // load call to ghost
        }

        this.loadVariables = function (id, variables, callback) {
            
        }
        
        // this.execute = function ()

        this.countID = function(id) {
            return $("[id=" + id + "]").length;
        }

    }
}






