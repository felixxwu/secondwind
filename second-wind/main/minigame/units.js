//structures that hold the units in game as well as their state (location, health...)
var enemyUnits = [];
var ownUnits = [];

//querries the database and updates enemyUnits and ownUnits
function updateLocalUnits() {

}

//parent class for all units
class Unit {
    constructor(healthPoints,level, attackCost, img, stepCost, location, attackFunction, defenseFunction) {
        this.healthPoints=healthPoints;
        this.level = level;
        this.attackCost = attackCost;
        this.img = img;
        this.stepCost = stepCost;
        this.location = location; // {x, y}
        this.attackFunction = attackFunction;
        this.defenseFunction = defenseFunction; //defense is called when the unit gets an incoming attack
    }
    move(location) { 
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
            // animate the movement
            unitMoveAnimation(this.location, location);
            //hey you see me
            // yes
            // update the id of the unit html element, so that it matches with its location
            let unit = element("unit-at-" + this.location.x + "-" + this.location.y);
            unit.id = "unit-at-" + location.x + "-" + location.y;
            
            this.location = location;
        }
    }
    //goes through the enemy troops to check if there's any at the target location and if there is 
    //... then perform the attackFunction on them
    attack(direction){ //CHANGE TO ATTACK LOCATION RATHER THAN ATTACK DIRECTION
        //creates the target location at which the attack is going to be aimed
        let targetLocation = {x:this.location.x, y:this.location.y};
        switch (direction) {
            case "up": targetLocation.y++; break;
            case "down": targetLocation.y--; break;
            case "right": targetLocation.x++; break;
            case "left": targetLocation.x--; break;
        }
        //iterates through enemylist and if it encounters an enemy in the target location attacks them
        enemyUnits.forEach(enemy => {
            if(enemy.location.x==targetLocation.x && enemy.location.y==targetLocation.y){
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
  constructor(location, level) {
    //function that is performed on the enemy once its targeted 
    function shitAttack(enemy) {
        const attackDamage = 2;
        enemy.defenseFunction(this.level*attackDamage); //pass attack to enemy unit
    }
    function shitDefense(damage) { //reduce healthpoints
        this.healthPoints=this.healthPoints-damage;
    }
    super(10*level,level, 1, "material-icons/myLocation.svg", 1, location, shitAttack, shitDefense);
    }
}

//example of how to create an use an instance of a shitTroop
var goodShit = new shitTroop({ x: 1, y: 1 }, 1);
var badShit = new shitTroop({ x: 1, y: 2 }, 1);
ownUnits.push(goodShit);
enemyUnits.push(badShit);

ownUnits.push(new shitTroop(undefined, 1));
ownUnits.push(new shitTroop(undefined, 1));

// goodShit.attack('up');
// goodShit.move({ x: 2, y: 1 });