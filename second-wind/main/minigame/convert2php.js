var enemyUnits = [];
var ownUnits = [];
class Unit {
    constructor(healthPoints,level, attackCost, facingDirection,idleImgFront, moveImgFront, idleImgBack, moveImgBack, stepCost, location, attackFunction, defenseFunction) {
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
        let direction = null;
        if (this.location.y > location.y) {
            direction = "forward";
        }
        if (this.location.y < location.y) {
            direction = "backward";
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


        enemyUnits.forEach(enemy => {
            if (enemy.location) {

                if (enemy.location.x == location.x && enemy.location.y == location.y) {
                    console.error('invalid move as there is a unit in the target location');
                    validMove = false;
                }
            }
        });

        ownUnits.forEach(unit => {
            if (unit.location) {
                if (unit.location.x == location.x && unit.location.y == location.y) {
                    console.error('invalid move as there is a unit in the target location');
                    validMove = false;
                }
            }
        });

        if (validMove) {
            
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

            //update the location of the js object
            this.location = location;
        }
    }
    attack(location){ //CHANGE TO ATTACK LOCATION RATHER THAN ATTACK DIRECTION
        //iterates through enemylist and if it encounters an enemy in the target location attacks them
        enemyUnits.forEach(enemy => {
            if(enemy.location.x==location.x && enemy.location.y==location.y){
                this.attackFunction(enemy);
            }
        });
    }
    die(){//remove unit from list and board

    }
}

class shitTroop extends Unit {
    constructor(location, level, facingDirection) {
        //function that is performed on the enemy once its targeted 
        function shitAttack(enemy) {
            const attackDamage = 5;
            enemy.defenseFunction(this.level * attackDamage); //pass attack to enemy unit
        }
        function shitDefense(damage) { //reduce healthpoints
            this.healthPoints = this.healthPoints - damage;
            if (this.healthPoints <= 0) {
                let id = "unit-at-" + this.location.x + "-" + this.location.y;
                log(id);
                removeUnit(id);
                this.location = undefined;
            }
        }
        super(10 * level, level, 1, facingDirection, "main/minigame/units/shitUnitIdleFront.svg", "main/minigame/units/shitUnitMoveFront.svg", "main/minigame/units/shitUnitIdleBack.svg", "main/minigame/units/shitUnitMoveBack.svg", 1, location, shitAttack, shitDefense);
    }
}

var goodShit = new shitTroop({ x: 1, y: 4 }, 1,'forward');
var badShit = new shitTroop({ x: 1, y: 2 }, 1,'backward');
ownUnits.push(goodShit);
enemyUnits.push(badShit);

ownUnits.push(new shitTroop(undefined, 1,'forward'));
ownUnits.push(new shitTroop(undefined, 1,'forward'));

goodShit.move({x:1,y:1});