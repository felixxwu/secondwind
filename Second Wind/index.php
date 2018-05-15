
<html>
  <head>
    <title>Second Wind</title>
    <link rel="stylesheet" href="css/style.css"/>
    <link rel="stylesheet" href="css/animate.css"/>
    <link rel="stylesheet" href="css/mainStyle.css"/>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    <script src="libraries/ajax/AjaxHelper.js"></script>
    <script src="libraries/account/functions.js"></script>
    <script src="libraries/account/secureLoad.js"></script>
    <script src="libraries/utility/general.js"></script>
    <script src="libraries/utility/animation.js"></script>
    <script src="libraries/energy/energy.js"></script>
    <script src="libraries/items/items.js"></script>
    <script src="libraries/slider/sliderdemo.js"></script>
  </head>
  <body>
    <div id="ghost"> </div>
    <div id="loading">
      <text>loading...</text>
    </div>
    <div id="main"></div>
    <script>
      secureLoad("main", "main/main.php", undefined, function() {
          hide("loading","fadeOut", 0.5);
      });
      
      
    </script>
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