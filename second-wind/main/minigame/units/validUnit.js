// takes an array of json units and checks if they are valid
function checkValidUnits() {
    let units = unitsManual;

    
    for (const key in units) {
        if (units.hasOwnProperty(key)) {
            const unit = units[key];

            function unitError(text) {console.error("Error in unit " + unit.name + ": " + text);}

            // check for the correct type of this object
            function check(object, string, type) {
                if (type == "array") {
                    if (!Array.isArray(object)) {
                        unitError(string + " is not of type " + type);
                    }
                    return;
                }
                if (typeof object != type) {
                        unitError(string + " is not of type " + type);
                }
            }

            checkDuplicate(unit.name, units);
            checkValidTriggerTypes(unit);

            check(unit.image, "unit.image", "object");
            check(unit.image.front, "unit.image.front", "object");
            check(unit.image.front.idle, "unit.image.front.idle", "string");
            check(unit.image.front.moving, "unit.image.front.moving", "string");
            check(unit.image.back, "unit.image.back", "object");
            check(unit.image.back.idle, "unit.image.back.idle", "string");
            check(unit.image.back.moving, "unit.image.back.moving", "string");
            check(unit.baseHealth, "unit.baseHealth", "number");
            check(unit.movePoints, "unit.movePoints", "number");
            check(unit.targetOptions, "unit.targetOptions", "array");
            check(unit.moveOptions, "unit.moveOptions", "array");
            check(unit.triggers, "unit.triggers", "array");
            
            
        }
    }

    function checkDuplicate(name, units) {
        let count = 0;
        
        for (const key in units) {
            if (units.hasOwnProperty(key)) {
                const unit = units[key];

                if (unit.name == name) {
                    count++;

                    // if two of the same name is found that means its a duplicate
                    if (count > 1) {
                        unitError("duplicate name")
                        return;
                    }
                }
                
            }
        }
    }

    function checkValidTriggerTypes(unit) {
        for (let i = 0; i < unit.triggers.length; i++) {
            const trigger = unit.triggers[i];
            if (
                trigger.type != "move" &&
                trigger.type != "target" &&
                trigger.type != "takeDamage" &&
                trigger.type != "death" &&
                trigger.type != "spawn"
            ) {
                unitError("trigger type '" + trigger.type + "' does not exist");
            }
        }
    }

    function isValidAction(action) {

    }
    
}