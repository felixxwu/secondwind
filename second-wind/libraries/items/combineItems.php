<?

//NEW
function getAmount($username,$item,$level){
  //get amount of el1 and el2
   $result = sqlSelect('usersItems','amount',"username='$username' and item = '$item' and level ='$level'","amount");
   return $result;
  
}

function enoughItems(){ //checks if there are enough of the items to combine them
    global $username, $el1, $el2, $level1, $level2, $el1Result, $el2Result;
    //this accounts for the case in which you are trying to combine one item with itself but you only have 1
    if($el1==$el2&$level1==$level2&$el1Result[0]['amount']==1){
      echo("<script>notEnoughItems()</script>");
     
      exit;
    }
  
    //this account for the case in which you don't have enough items
    if($el1Result[0]['amount']<1 or $el2Result[0]['amount']<1){
      echo("<script>notEnoughItems()</script>");
      exit;
    }
  }

//NEW
  function subtractQuantities($username,$item,$level){ //subtracts quantities from used itemList
    
    //updates element with -1 quantity
    $amount = sqlSelect('usersItems','amount',"username='$username' and item = '$item' and level ='$level'","amount");
    $updatedAmount = $amount[0]['amount']-1;
    return sqlUpdate("usersItems", "username='$username' and item = '$item' and level='$level'",'amount', $updatedAmount);
    
  }

  function getCombinationTime($item1,$item2,$level1,$level2){
    $combiningFactor=1;
    //sum of energies of item1
    $energyValues1=newGetEnergyValues($item1,$level1);
    $energiesSum1=$energyValues1['human']+$energyValues1['attack']+$energyValues1['power']+$energyValues1['intelligence']+$energyValues1['building'];
    echo("<script>console.log('$energiesSum1')</script>");

    //sum of energies of item2
    $energyValues2=newGetEnergyValues($item2,$level2);
    $energiesSum2=$energyValues2['human']+$energyValues2['attack']+$energyValues2['power']+$energyValues2['intelligence']+$energyValues2['building'];
    echo("<script>console.log('$energiesSum2')</script>");
    //return the time it takes to combine item1 and item2
    $combinationTime=($energiesSum1+$energiesSum2)*$combiningFactor;
    echo("<script>console.log('$combinationTime')</script>");
    return $combinationTime;
  }
  //adds itemCombinations database with a new combination
  function startCombination($id,$item1,$item2,$level1,$level2,$username){ 
    $combinationTime=getCombinationTime($item1,$item2,$level1,$level2);
    $startTime = time();
    $finishTime = $startTime + $combinationTime;
    sqlInsert("itemCombinations","$id","$username","$item1","$level1","$item2","$level2","$startTime","$finishTime");

  }

  //behaves as getEnergyValues but instead of updating global variables returns them.
  //gets item and level and returns json of energy values corresponding to the item
  function newGetEnergyValues($item,$level){

    //if the item is not a shit
    $cols = 'human, attack, power, intelligence, building';
    $energyValues  = sqlSelect('items',$cols,"name = '".$item."'","name")[0];

    //if the item is a shit (in which case the previous querry would have returned null)
    if(substr( $item, 0, 5 ) === "shit@"){
      $energies = explode("@", $item);
      $energyValues=array('human'=>$energies[1],'attack'=>$energies[2],'power'=>$energies[3],'intelligence'=>$energies[4],'building'=>$energies[5]);
    }

    //multiplies by level to get energy levels (instead of the ratios)
    foreach($energyValues as &$value){
      $value=$value*$level;
    }
    return $energyValues;
  }

  function getEnergyValues(){ //gets the energy values corresponding to el1 and el2
    global $username, $el1, $el2, $level1, $level2, $el1Result, $el2Result, $el1Amount, $el2Amount, $el1Energies, $el2Energies;
  
  
    //gets the ratios for both items and stores them in $el1Energies and $el2Energies
    $cols = 'human, attack, power, intelligence, building';
    $el1Energies  = sqlSelect('items',$cols,"name = '".$el1."'","name")[0];
    $el2Energies  = sqlSelect('items',$cols,"name = '".$el2."'","name")[0];
  
  
    //this is the case the items are shits (not predefined items) in which ratios are separated by @
    if(substr( $el1, 0, 5 ) === "shit@"){
      $energies = explode("@", $el1);
      $el1Energies=array('human'=>$energies[1],'attack'=>$energies[2],'power'=>$energies[3],'intelligence'=>$energies[4],'building'=>$energies[5]);
    }
    if(substr( $el2, 0, 5 ) === "shit@"){
      $energies = explode("@", $el2);
      $el2Energies=array('human'=>$energies[1],'attack'=>$energies[2],'power'=>$energies[3],'intelligence'=>$energies[4],'building'=>$energies[5]);
    }
  
    //multiplies by level to get energy levels (instead of the ratios)
    foreach($el1Energies as &$value){
      $value=$value*$level1;
    }
    foreach($el2Energies as &$value){
      $value=$value*$level2;
    }
  }

  function newEnergyValues(){//creates the new energy values
    global $username, $el1, $el2, $level1, $level2, $el1Result, $el2Result, $el1Amount, $el2Amount, $el1Energies, $el2Energies, $sumEnergies;
  
    $sumEnergies = array($el1Energies['human']+$el2Energies['human'],$el1Energies['attack']+$el2Energies['attack'],
                $el1Energies['power']+$el2Energies['power'],$el1Energies['intelligence']+$el2Energies['intelligence'],
                $el1Energies['building']+$el2Energies['building']);
  }
  function gcd($a, $b){//returns greatest common divior between two numbers
      if ($a == 0 || $b == 0)
          return abs( max(abs($a), abs($b)) );
  
      $r = $a % $b;
      return ($r != 0) ?
          gcd($b, $r) :
          abs($b);
  }
  function gcd_array($array, $a = 0){
      $b = array_pop($array);
      return ($b === null) ?
          (int)$a :
          gcd_array($array, gcd($a, $b));
  }
  function newRatio(){ //calculates the ratio of the combination
    global $username, $el1, $el2, $level1, $level2, $el1Result, $el2Result, $el1Amount, $el2Amount, $el1Energies, $el2Energies, $sumEnergies,$level,$ratio;
  
    // removes 0s from array as if not the gcd of an item with some energy values 0 will return 0 as gcd
    $energiesWithout0s = array();
    foreach ($sumEnergies as &$value) {
        if($value!=0){
  
          array_push($energiesWithout0s,$value);
        }else{
  
        }
    }
  
    // returns gdc of an array of numbers
    $level=gcd_array($energiesWithout0s);
  
    //calculate ratio of new element gcd as level and energies/gcd as ratio
    $ratio=array();
  
    foreach($sumEnergies as &$value){
  
      array_push($ratio,$value/$level);
    }
  
  }

  //NEW
  function newItem($username,$item,$level){ //creates/updates the new/existing item's quantity with ratio: newRatio
    //gets the number of $newItem the user already has
    $itemInfo = sqlSelect('usersItems','amount',"username='$username' and item = '".$item."' and level = '".$level."'","amount")[0];
    if($itemInfo==null){//if the user has no item of that sort
      sqlInsert("usersItems","$username",$item,"1",$level);
    }
    else{ //if the user has at least 0 newItem already (no need to create entry, just +1)
      $amount = $itemInfo['amount']+1;
      sqlUpdate("usersItems", "username='$username' and item = '".$item."' and level = '".$level."'",'amount', $amount);
    }
  }
?>