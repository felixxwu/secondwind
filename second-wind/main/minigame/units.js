// #############################################################################
// note on how we should write and maintain the units now and in the future:
// units should be able to be described just from a single json object. This includes:
// name, health, defence function, attack function, attack cost, images, movement costs, movement locations
// for the attack and defence functions, we can't have a function (or can we??) so this must be described using objects
// once we have all the units in json form, it can all be written in php and does not need to exist in js
// then when a user logs in, they will download all the json unit descriptors and the js code will decode these objects so that they can be used on the board
// we might need to modify this file heavily to accomodate for this system, althought a lot of the unit class might be able to be used as it is


//structures that hold the units in game as well as their state (location, health...)
var enemyUnits = [];
var ownUnits = [];

//querries the database and updates enemyUnits and ownUnits
function updateLocalUnits() {

}

//parent class for all units
class Unit {
    constructor (
        healthPoints,
        level,
        attackCost,
        facingDirection,
        idleImgFront,
        moveImgFront,
        idleImgBack,
        moveImgBack,
        stepCost,
        location,
        attackFunction,
        defenseFunction
    ) {
        this.healthPoints=healthPoints;
        this.level = level;
        this.attackCost = attackCost;
        this.facingDirection=facingDirection;
        this.idleImgFront = idleImgFront;
        this.moveImgFront = moveImgFront; //either forward or backward
        this.idleImgBack = idleImgBack;
        this.moveImgBack = moveImgBack;
        this.stepCost = stepCost;
        this.location = location; // {x, y}
        this.attackFunction = attackFunction;
        this.defenseFunction = defenseFunction; //defense is called when the unit gets an incoming attack
    }
    move(location) {
        //doesn't account for the possibility of the board being reversed
        let direction = null;
        if(this.location.y>location.y){
            direction="forward";
        }
        if(this.location.y<location.y){
            direction="backward";
        } 
        let validMove = false;
        //check if target location is in an adjacent square
        if (this.location.x == location.x && this.location.y == location.y + 1) { validMove = true; }
        if (this.location.x == location.x && this.location.y == location.y - 1) { validMove = true; }
        if (this.location.x == location.x + 1 && this.location.y == location.y) { validMove = true; }
        if (this.location.x == location.x - 1 && this.location.y == location.y) { validMove = true; }

        if (!this.location && isSpawnTile(location)) {
            validMove = true;
        }

        //checks if the target location is empty
        //iterates through enemylist and if it encounters an enemy in the target location then validMove=false
        enemyUnits.forEach(enemy => {
            if (enemy.location) {

                if (enemy.location.x == location.x && enemy.location.y == location.y) {
                    console.error('invalid move as there is a unit in the target location');
                    validMove = false;
                }
            }
        });
        //iterates through ownunits and if it encounters a unit in the target location then validMove=false
        ownUnits.forEach(unit => {
            if (unit.location) {
                if (unit.location.x == location.x && unit.location.y == location.y) {
                    console.error('invalid move as there is a unit in the target location');
                    validMove = false;
                }
            }
        });
        //if there are no units in the target location then move
        if (validMove) {
            let id = "unit-at-" + this.location.x + "-" + this.location.y;
            let unit = element(id);
            
            //sets moving animation and facing direction after movement is finished
            if(this.facingDirection=="forward"){
                cachedAnimation=this.idleImgBack;
            }
            if(this.facingDirection=="backward"){
                cachedAnimation=this.idleImgFront;
            }

            if(direction=="forward"){
                unit.src=this.moveImgBack;
            }
            if(direction=="backward"){
                unit.src=this.moveImgFront;
            }
            if(direction==null){ //if the unit is moving sidewards then don't change the facing direction whilst moving
                if(this.facingDirection=="forward"){
                    unit.src=this.moveImgBack;
                }
                if(this.facingDirection=="backward"){
                    unit.src=this.moveImgFront;
                }
            }

            // animate the movement
            unitMoveAnimation(this.location, location);
            
            // update the id of the unit html element, so that it matches with its target location
            unit.id = "unit-at-" + location.x + "-" + location.y;
   
            //update the location of the js object
            this.location = location;
        }
    }
    //goes through the enemy troops to check if there's any at the target location and if there is 
    //... then perform the attackFunction on them
    attack(location){ //CHANGE TO ATTACK LOCATION RATHER THAN ATTACK DIRECTION
        //iterates through enemylist and if it encounters an enemy in the target location attacks them
        enemyUnits.forEach(enemy => {
            if(enemy.location.x==location.x && enemy.location.y==location.y){
                log('enemy attacked');
                this.attackFunction(enemy);
            }
        });
    }
    die(){//remove unit from list and board

    }
}

//####################################################
//#####       Subclasses for each unit          ######
//####################################################

//subclasses for each unit
class shitTroop extends Unit {
    constructor(location, level, facingDirection) {
        //function that is performed on the enemy once its targeted 
        function shitAttack(enemy) {
            const attackDamage = 5;
            enemy.defenseFunction(this.level*attackDamage); //pass attack to enemy unit
        }
        function shitDefense(damage) { //reduce healthpoints
            this.healthPoints=this.healthPoints-damage;
            if(this.healthPoints<=0){
                let id ="unit-at-" + this.location.x + "-" + this.location.y;
                log(id);
                removeUnit(id);
                this.location=undefined;
            }
        }
        super (
            10 * level,
            level,
            1,
            facingDirection,
            "main/minigame/units/shitUnitIdleFront.svg",
            "main/minigame/units/shitUnitMoveFront.svg",
            "main/minigame/units/shitUnitIdleBack.svg",
            "main/minigame/units/shitUnitMoveBack.svg",
            1,
            location,
            shitAttack,
            shitDefense
        );
    }
}

//example of how to create an use an instance of a shitTroop
var goodShit = new shitTroop({ x: 1, y: 4 }, 1,'forward');
var badShit = new shitTroop({ x: 1, y: 2 }, 1,'backward');
ownUnits.push(goodShit);
enemyUnits.push(badShit);

ownUnits.push(new shitTroop(undefined, 1,'forward'));
ownUnits.push(new shitTroop(undefined, 1,'forward'));

// goodShit.attack('up');
// goodShit.move({ x: 2, y: 1 });