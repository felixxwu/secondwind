// spawnedUnits :: [{id: id, unit: unit}]
// unit :: corresponding json file
var spawnedUnits = [];

// desired functionality:

// use this to function execute some action that the unit has, such as moving or attacking
// "trigger" will be specified to determine which action(s) should be performed
// "options" has information about the action that the user specified like target locations (available for move, target, and spawn triggers)
// note: the actions on each unit will be different so need to check the effects in the json file first
// note 2: to spawn a unit onto the board we will have a "pseudo unit" calles base.json which has spawn capabilities
function performUnitAction(unitID, triggerType, options) {
    let unit = getUnitWithID(unitID);
    let actions = getActions(unit.triggers, triggerType);

    // perform each action in the array of actions
    for (let i = 0; i < actions.length; i++) {
        const action = actions[i];
        performSingleAction(unitID, action, options);
    }
}

// performs a single action form the list of actions in a trigger
function performSingleAction(unitID, action, options) {
    switch (action.type) {
        case "healthStat":      performHealthStat(unitID, action, options); break;
        case "attackStat":      performAttackStat(unitID, action, options); break;
        case "moveStat":        performMoveStat(unitID, action, options); break;
        case "spawnUnit":       performSpawnUnit(unitID, action, options); break;
        case "moveUnit":        performMoveUnit(unitID, action, options); break;
        case "removeAbility":   performRemoveAbility(unitID, action, options); break;
    
        default: console.error("action type does not exist"); break;
    }
}

// functions for individual actions ############################################

function performHealthStat(unitID, action, options) {

}

function performAttackStat(unitID, action, options) {

}

function performMoveStat(unitID, action, options) {

}

function performSpawnUnit(unitID, action, options) {

}

function performMoveUnit(unitID, action, options) {

}

function performRemoveAbility(unitID, action, options) {

}

// useful library functions ####################################################

// returns the unit object with that id
function getUnitWithID(id) {
    // for each unit in spawnedUnits
    for (let i = 0; i < spawnedUnits.length; i++) {
        const unit = spawnedUnits[i];
        if (unit.id == id) {
            return unit.unit;
        }
    }
    console.error("unit with id ${id} does not exist in the spawedUnits array");
}

// returns the action object(s) that corresponds with the trigger
function getActions(triggers, triggerType) {
    // for each trigger that the unit has
    for (let i = 0; i < triggers.length; i++) {
        const trigger = triggers[i];
        if (trigger.type == triggerType) {
            return trigger.actions;
        }
    }
    console.error("trigger not found");
}

// remove a unit from the spawnedUnits array when it is killed
function removeUnitWithID(id) {
    // for each unit in spawnedUnits
    for (let i = 0; i < spawnedUnits.length; i++) {
        const unit = spawnedUnits[i];
        if (unit.id == id) {
            // remove unit from the array (test if this works properly)
            spawnedUnits.splice(i, 1);
        }
    }
}
