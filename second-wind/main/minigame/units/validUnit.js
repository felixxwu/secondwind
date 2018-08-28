// takes an array of json units and checks if they are valid
function checkValidUnits() {
    let units = unitsManual;

    
    for (const key in units) {
        if (units.hasOwnProperty(key)) {
            const unit = units[key];

            function unitError(text) {console.error("Error in unit " + unit.name + ": " + text);}

            // check for the correct type of this object
            function checkType(object, string, type) {
                if (type == "array") {
                    if (!Array.isArray(object)) {
                        unitError(string + " is not an array");
                    }
                    return;
                }
                if (type == "int" || type == "integer") {
                    if (!Number.isInteger(object)) {
                        unitError(string + " is not an integer");
                    }
                    return;
                }
                if (typeof object != type) {
                        unitError(string + " is not of type " + type);
                }
            }

            checkDuplicate(unit.name, units);
            
            checkType(unit.image, "unit.image", "object");
            checkType(unit.image.front, "unit.image.front", "object");
            checkType(unit.image.front.idle, "unit.image.front.idle", "string");
            checkType(unit.image.front.moving, "unit.image.front.moving", "string");
            checkType(unit.image.back, "unit.image.back", "object");
            checkType(unit.image.back.idle, "unit.image.back.idle", "string");
            checkType(unit.image.back.moving, "unit.image.back.moving", "string");
            checkType(unit.baseHealth, "unit.baseHealth", "int");
            checkType(unit.movePoints, "unit.movePoints", "int");
            checkType(unit.targetOptions, "unit.targetOptions", "array");
            checkType(unit.moveOptions, "unit.moveOptions", "array");
            checkType(unit.triggers, "unit.triggers", "array");
            
            checkValidTriggerTypes(unit);
            
            for (let i = 0; i < unit.triggers.length; i++) {
                const trigger = unit.triggers[i];
                checkType(trigger.type, "unit.triggers[].type", "string");
                checkType(trigger.actions, "unit.triggers[].actions", "array");
                checkValidActions(trigger.actions);
            }
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

    function checkValidActions(actions) {
        for (let i = 0; i < actions.length; i++) {
            const action = actions[i];
            if (action.type == "healthStat") {
                // checkHealthStatAction(action);
            } else if (action.type == "attackStat") {
                // checkAttackStatAction(action);
            } else if (action.type == "moveStat") {
                // checkMoveStatAction(action);
            } else if (action.type == "spawnUnit") {
                // checkSpawnUnitAction(action);
            } else if (action.type == "moveUnit") {
                // checkMoveUnitAction(action);
            } else if (action.type == "removeAbility") {
                checkRemoveAbilityAction(action);
            } else {
                unitError("action type '" + action.type + "' does not exist");
            }
        }
    }

    function checkRemoveAbilityAction(action) {
        if (!isTurnObject(action.turn)) {
            unitError("removeAbility action.turn is not an int >= 0 or 'all'");
        }
        if (!isTargetObject(action.target)) {
            unitError("removeAbility action.target is not a target object");
        }
        if (!isFilterObject(action.unitFilter)) {
            unitError("removeAbility action.unitFilter is not a filter object");
        }
    }

    function isTurnObject(turn) {
        return turn == "all" || (Number.isInteger(turn) && turn >= 0);
    }

    function isTargetObject(target) {
        if (target != "target" && target != "self") {
            if (!isLocationObject(target.location)) {
                return false;
            }
        }
        return true;
    }

    function isLocationObject(location) {
        if (location.type == "relative" || location.type == "absolute") {
            if (Number.isInteger(location.x) && Number.isInteger(location.y)) {
                return true;
            }
        }
        return false;
    }

    function isFilterObject(unitFilter) {
        return (
            (
                unitFilter.side == "enemy" ||
                unitFilter.side == "friendly" ||
                unitFilter.side == "all"
            ) && (
                unitFilter.faction == "warriors" ||
                unitFilter.faction == "mages" ||
                unitFilter.faction == "healers" ||
                unitFilter.faction == "poison" ||
                unitFilter.faction == "all"
            )
        );
    }

}