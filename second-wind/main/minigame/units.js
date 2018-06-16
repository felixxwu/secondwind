//structures that hold the units in game as well as their state (location, health...)
var enemyUnits = [];
var ownUnits = [];

//querries the database for enemyUnits and ownUnits
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
        this.location = location; // {x: x,y: y}
        this.attack = attackFunction;
        this.defense = defenseFunction;
    }
    move(direction) { //direction could be: top, down, left, right
        switch (direction) {
            case "up": this.location.y++; break;
            case "down": this.location.y--; break;
            case "right": this.location.x++; break;
            case "left": this.location.x--; break;
        }
        log('moved');
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
    function shitAttack(direction) {
        const attackDamage = 2;
        //creates the target location at which the attack is going to be aimed
        let targetLocation = {x:this.location.x, y:this.location.y};
        switch (direction) {
            case "up": targetLocation.y++; break;
            case "down": targetLocation.y--; break;
            case "right": targetLocation.x++; break;
            case "left": targetLocation.x--; break;
        }
        //iterates through enemylist and if it encounters an enemy in the target location attack them
        enemyUnits.forEach(enemy => {
            log(enemy.location);
            log(targetLocation);
            if(enemy.location.x==targetLocation.x && enemy.location.y==targetLocation.y){
                log('enemy attacked');
                enemy.defense(this.level*attack);
            }
        });
        
    }
    function shitDefense(damage) { //reduce healthpoints
        this.healthPoints=this.healthPoints-damage;
    }
    super(10*level,level, 1, "shit.svg", 1, location, shitAttack, shitDefense);
    }
}

//example of how to create an use an instance of a shitTroop
var goodShit = new shitTroop({ x: 1, y: 1 }, 1);
var badShit = new shitTroop({ x: 1, y: 2 }, 1);
enemyUnits.push(badShit);
goodShit.attack('up');
