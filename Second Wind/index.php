
<html>
  <head>
    <title>Second Wind</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link rel="stylesheet" href="css/style.css?v=<?=time()?>"/>
    <link rel="stylesheet" href="css/animate.css?v=<?=time()?>"/>
    <link rel="stylesheet" href="css/mainStyle.css?v=<?=time()?>"/>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js?v=<?=time()?>"></script>
    <script src="https://code.jquery.com/jquery-3.2.1.min.js?v=<?=time()?>"></script>
    <script src="libraries/ajax/AjaxHelper.js?v=<?=time()?>"></script>
    <script src="libraries/account/functions.js?v=<?=time()?>"></script>
    <script src="libraries/account/secureLoad.js?v=<?=time()?>"></script>
    <script src="libraries/utility/general.js?v=<?=time()?>"></script>
    <script src="libraries/utility/animation.js?v=<?=time()?>"></script>
    <script src="libraries/energy/energy.js?v=<?=time()?>"></script>
    <script src="libraries/items/items.js?v=<?=time()?>"></script>
    <script src="libraries/slider/sliderdemo.js?v=<?=time()?>"></script>
  </head>
  <body>
    <div id="ghost"> </div>
    <div id="loading">
      <text>loading...</text>
    </div>
    <div id="showhidetest">
      <div id="testbox">hello, I am content</div><a onclick="show('main','slideInDown',0.5)">
        <button>show</button></a><a onclick="hide('main','fadeOutDown',0.5)">
        <button>hide</button></a><a onclick="hide('showhidetest','fadeOutUp',1)">
        <button>hide me</button></a>
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