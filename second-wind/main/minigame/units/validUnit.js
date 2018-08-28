// takes an array of json units and checks if they are valid
function checkValidUnits() {
    let units = unitsManual;
    
    // loop through all units from the manual
    for (const key in units) {
        if (units.hasOwnProperty(key)) {
            const unit = units[key];

            // helper function to also display unit name
            function unitError(text) {console.error("Error in unit " + unit.name + ": " + text);}
            
            // check for uplicate names
            checkDuplicate(unit.name, units);
            
            // check if the basic descriptors are corrent
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
            
            // for the triggers check if the types are valid
            checkValidTriggerTypes(unit);

            if (!isListOfLocations(unit.targetOptions)) {
                unitError("unit.targetOptions is not a list of locations");
            }
            if (!isListOfLocations(unit.moveOptions)) {
                unitError("unit.moveOptions is not a list of locations");
            }
            
            // for each trigger check if its action is a valid action
            for (let i = 0; i < unit.triggers.length; i++) {
                const trigger = unit.triggers[i];
                checkType(trigger.type, "unit.triggers[].type", "string");
                checkType(trigger.actions, "unit.triggers[].actions", "array");
                checkValidActions(trigger.actions);
            }

            // helper function to check for the correct type of an object
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
        }
    }

    // error if a duplicate name is found
    function checkDuplicate(name, units) {
        let count = 0;
        
        // loop through the units
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

    // error if any of the triggers is not a valid trigger type
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

    function isListOfLocations(list) {
        for (let i = 0; i < list.length; i++) {
            const location = list[i];
            if (!isLocationObject(location)) {
                return false;
            }
        }
        return true;
    }

    // for each of the action types, check if it is valid
    function checkValidActions(actions) {
        for (let i = 0; i < actions.length; i++) {
            const action = actions[i];
            if (action.type == "healthStat") {
                checkHealthStatAction(action);
            } else if (action.type == "attackStat") {
                checkAttackStatAction(action);
            } else if (action.type == "moveStat") {
                checkMoveStatAction(action);
            } else if (action.type == "spawnUnit") {
                checkSpawnUnitAction(action);
            } else if (action.type == "moveUnit") {
                checkMoveUnitAction(action);
            } else if (action.type == "removeAbility") {
                checkRemoveAbilityAction(action);
            } else {
                unitError("action type '" + action.type + "' does not exist");
            }
        }
    }

    // healthStat action
    function checkHealthStatAction(action) {
        // if                                   then
        !isTurnObject(action.turn) ?            unitError("healthStat action.turn is not an int >= 0 or 'all'"):
        !isTargetObject(action.target) ?        unitError("healthStat action.target is not a target object"):
        !isFilterObject(action.unitFilter) ?    unitError("healthStat action.unitFilter is not a filter object"):
        !Number.isInteger(action.amount) ?      unitError("healthStat action.amount is not an integer"):
        typeof action.relative != "boolean" ?   unitError("healthStat action.relative is not a boolean"):
        !isChanceObject(action.chance) ?        unitError("healthStat action.chance is not a number between 0 and 1"): null;
    }

    // attackStat action
    function checkAttackStatAction(action) {
        // if                                   then
        !isTurnObject(action.turn) ?            unitError("attackStat action.turn is not an int >= 0 or 'all'"):
        !isTurnObject(action.affectedTurn) ?    unitError("attackStat action.affectedTurn is not an int >= 0 or 'all'"):
        !isTargetObject(action.target) ?        unitError("attackStat action.target is not a target object"):
        !isFilterObject(action.unitFilter) ?    unitError("attackStat action.unitFilter is not a filter object"):
        !Number.isInteger(action.amount) ?      unitError("attackStat action.amount is not an integer"):
        typeof action.relative != "boolean" ?   unitError("attackStat action.relative is not a boolean"):
        !isChanceObject(action.chance) ?        unitError("attackStat action.chance is not a number between 0 and 1"): null;
    }

    // moveStat action
    function checkMoveStatAction(action) {
        // if                                   then
        !isTurnObject(action.turn) ?            unitError("moveStat action.turn is not an int >= 0 or 'all'"):
        !isTargetObject(action.target) ?        unitError("moveStat action.target is not a target object"):
        !isFilterObject(action.unitFilter) ?    unitError("moveStat action.unitFilter is not a filter object"):
        !Number.isInteger(action.amount) ?      unitError("moveStat action.amount is not an integer"):
        typeof action.relative != "boolean" ?   unitError("moveStat action.relative is not a boolean"):
        !isChanceObject(action.chance) ?        unitError("moveStat action.chance is not a number between 0 and 1"): null;
    }

    // spawnUnit action
    function checkSpawnUnitAction(action) {
        // if                                   then
        !isTurnObject(action.turn) ?            unitError("spawnUnit action.turn is not an int >= 0 or 'all'"):
        !isLocationObject(action.location) ?    unitError("spawnUnit action.location is not a location object"):
        !isSpawnUnitObject(action.unit) ?       unitError("spawnUnit action.unit is not a valid unit"):
        !isChanceObject(action.chance) ?        unitError("spawnUnit action.chance is not a number between 0 and 1"): null;
    }

    // moveUnit action
    function checkMoveUnitAction(action) {
        // if                                   then
        !isTurnObject(action.turn) ?            unitError("moveUnit action.turn is not an int >= 0 or 'all'"):
        !isTargetObject(action.target) ?        unitError("moveUnit action.target is not a target object"):
        !isFilterObject(action.unitFilter) ?    unitError("moveUnit action.unitFilter is not a filter object"):
        !isLocationObject(action.location) ?    unitError("moveUnit action.location is not a location object"):
        !isChanceObject(action.chance) ?        unitError("moveUnit action.chance is not a number between 0 and 1"): null;
    }

    // removeAbility action
    function checkRemoveAbilityAction(action) {
        // if                                   then
        !isTurnObject(action.turn) ?            unitError("removeAbility action.turn is not an int >= 0 or 'all'"):
        !isTargetObject(action.target) ?        unitError("removeAbility action.target is not a target object"):
        !isFilterObject(action.unitFilter) ?    unitError("removeAbility action.unitFilter is not a filter object"):
        !isAbility(action.ability) ?            unitError("removeAbility action.ability is not an ability"):
        !isChanceObject(action.chance) ?        unitError("removeAbility action.chance is not a number between 0 and 1"): null;
    }

    // turn is 'all' or an integer >= 0
    function isTurnObject(turn) {
        return turn == "all" || (Number.isInteger(turn) && turn >= 0);
    }

    // target is 'target', 'self' or a location object
    function isTargetObject(target) {
        if (target != "target" && target != "self") {
            if (!isLocationObject(target.location)) {
                return false;
            }
        }
        return true;
    }

    // location has .type, .x and .y of types 'relative' || 'absolute', int, and int respectively
    function isLocationObject(location) {
        if (!location) { return false; }
        if (location.type == "relative" || location.type == "absolute") {
            if (Number.isInteger(location.x) && Number.isInteger(location.y)) {
                return true;
            }
        }
        return false;
    }

    // filter has .side and .faction each with set strings
    function isFilterObject(unitFilter) {
        if (!unitFilter) {return false;}
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

    // ability is one of the possible actions
    function isAbility(ability) {
        if (!ability) {return false;}
        return (
            ability == "healthStat" ||
            ability == "attackStat" ||
            ability == "moveStat" ||
            ability == "spawnUnit" ||
            ability == "moveUnit" ||
            ability == "removeAbility"
        );
    }

    // chance is a float between 0 and 1
    function isChanceObject(chance) {
        return typeof chance == "number" && chance >= 0 && chance <= 1;
    }

    // spawnUnit has .name and .level which are string and int > 0
    function isSpawnUnitObject(unit) {
        if (!unit) {return false;}
        if (!unit.name || !unit.level) {return false;}
        if (typeof unit.name != "string") {return false;}
        if (!Number.isInteger(unit.level) || unit.level < 1) {return false;}
        return true;
    }

}