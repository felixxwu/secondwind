<?
//retrieves energy allocation values from database
function getEnergyAllocation(){
	$resourceAlloc = sqlSelect("resourceAllocation","*","`username` = 'test'","`username`")[0];
	if (!$resourceAlloc) {
		$humanAlloc = "0";
		$powerAlloc = "0";
		$attackAlloc = "0";
		$intelAlloc = "0";
		$buildAlloc = "0";
	} else {
		$humanAlloc = $resourceAlloc["human"];
		$powerAlloc = $resourceAlloc["power"];
		$attackAlloc = $resourceAlloc["attack"];
		$intelAlloc = $resourceAlloc["intelligence"];
		$buildAlloc = $resourceAlloc["building"];
	}

//initializes the energy allocation values in the input boxes
	echo("
		<script> var energyAllocations = ".json_encode($resourceAlloc, JSON_PRETTY_PRINT).";
		document.getElementById('human').value = energyAllocations.human;
		document.getElementById('power').value = energyAllocations.power;
		document.getElementById('attack').value = energyAllocations.attack;
		document.getElementById('intelligence').value = energyAllocations.intelligence;
		document.getElementById('building').value = energyAllocations.building;
		</script>");
}
?>
<html>
  <head>
    <title>Second Wind</title>
    <link rel="stylesheet" href="css/style.css"/>
    <link rel="stylesheet" href="css/animate.css"/>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    <script src="libraries/ajax/AjaxHelper.js"></script>
    <script src="libraries/account/functions.js"></script>
    <script src="libraries/account/secureLoad.js"></script>
    <script src="libraries/utility/general.js"></script>
    <script src="libraries/utility/animation.js"></script>
    <script src="main/js_functions/energy.js"></script>
    <script src="main/js_functions/items.js"></script>
    <script src="main/js_functions/energy.js"></script>
  </head>
  <body>
    <div id="ghost"> </div>
    <div id="testbox">hello, I am content</div><a onclick="show('main','slideInDown',0.5)">
      <button>show</button></a><a onclick="hide('main','fadeOut',0.5)">
      <button>hide</button></a>
    <div id="main"></div>
    <script>secureLoad("main","main/main.php");</script>
    <script>
      function getFive() {
          var ajax = new AjaxHelper("libraries/ajax");
          ajax.loadVariables("output", {"variableExample": null, "variableWithArgExample": "heyo", "variableMultipleArgsExample": ["foo", "bar"]}, function() {
              console.log(variableExample);
              console.log(variableWithArgExample);
              console.log(variableMultipleArgsExample);
          })
      
          ajax.call("argsExample",{0: "hey", 1: "there"}, function() {
              console.log("call done");
          });
          
      }
    </script>
  </body>
</html>